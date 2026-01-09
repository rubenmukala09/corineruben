import { LucideIcon, ShieldAlert, Ban, Users, Database, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  ResponsiveContainer,
} from "recharts";
import { formatDistanceToNow } from "date-fns";

interface LiveMonitorCardProps {
  icon: LucideIcon;
  title: string;
  value: string;
  chartType: "bar" | "line";
  chartData: number[];
  accentColor: "blue" | "red" | "green" | "orange";
  index: number;
  isLoading?: boolean;
}

const colorConfig = {
  blue: {
    icon: "#3B82F6",
    gradient: "from-[#3B82F6] to-[#06B6D4]",
    glow: "shadow-[#3B82F6]/20",
    chartColor: "#06B6D4",
    border: "border-[#3B82F6]/20",
  },
  red: {
    icon: "#EF4444",
    gradient: "from-[#F97316] to-[#EC4899]",
    glow: "shadow-[#F97316]/20",
    chartColor: "#EC4899",
    border: "border-[#F97316]/20",
  },
  green: {
    icon: "#10B981",
    gradient: "from-[#10B981] to-[#06B6D4]",
    glow: "shadow-[#10B981]/20",
    chartColor: "#10B981",
    border: "border-[#10B981]/20",
  },
  orange: {
    icon: "#F97316",
    gradient: "from-[#F97316] to-[#FBBF24]",
    glow: "shadow-[#F97316]/20",
    chartColor: "#F97316",
    border: "border-[#F97316]/20",
  },
};

function LiveMonitorCard({
  icon: Icon,
  title,
  value,
  chartType,
  chartData,
  accentColor,
  isLoading,
}: LiveMonitorCardProps) {
  const config = colorConfig[accentColor];
  
  // Convert chartData array to recharts format
  const formattedData = chartData.map((val, i) => ({ value: val, index: i }));

  return (
    <Card
      className={`relative overflow-hidden p-5 bg-[#111827] border border-gray-800 rounded-xl 
        shadow-lg ${config.glow}`}
    >
      {/* Header Row */}
      <div className="flex items-center justify-between mb-3">
        <div
          className={`w-10 h-10 rounded-lg bg-gradient-to-br ${config.gradient} 
            flex items-center justify-center shadow-lg ${config.glow}`}
        >
          <Icon className="h-5 w-5 text-white" />
        </div>
        
        {/* Mini Chart */}
        <div className="w-20 h-8">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === "bar" ? (
              <BarChart data={formattedData}>
                <Bar
                  dataKey="value"
                  fill={config.chartColor}
                  radius={[2, 2, 0, 0]}
                  opacity={0.8}
                />
              </BarChart>
            ) : (
              <LineChart data={formattedData}>
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={config.chartColor}
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>

      {/* Value & Title */}
      <div>
        {isLoading ? (
          <div className="flex items-center gap-2">
            <Loader2 className="h-5 w-5 animate-spin text-[#9CA3AF]" />
            <span className="text-sm text-[#9CA3AF]">Loading...</span>
          </div>
        ) : (
          <>
            <p className="text-2xl font-bold text-[#F9FAFB] mb-1">{value}</p>
            <p className="text-sm text-[#9CA3AF]">{title}</p>
          </>
        )}
      </div>
    </Card>
  );
}

export function CyberGuardianStats() {
  // Fetch healthy services count
  const { data: heartbeatsData, isLoading: heartbeatsLoading } = useQuery({
    queryKey: ['heartbeats-stats'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('system_heartbeats')
        .select('status');
      if (error) throw error;
      const healthy = data?.filter(h => h.status === 'healthy').length || 0;
      const total = data?.length || 0;
      return { healthy, total };
    },
    refetchInterval: 30000,
  });

  // Fetch threat stats
  const { data: threatStats, isLoading: threatLoading } = useQuery({
    queryKey: ['threat-stats'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('threat_events')
        .select('status');
      if (error) throw error;
      const total = data?.length || 0;
      const resolved = data?.filter(t => t.status === 'resolved').length || 0;
      const rate = total > 0 ? ((resolved / total) * 100).toFixed(1) : '0';
      return { total, resolved, rate };
    },
    refetchInterval: 30000,
  });

  // Fetch new profiles this month
  const { data: profileStats, isLoading: profileLoading } = useQuery({
    queryKey: ['profile-stats'],
    queryFn: async () => {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      
      const { count, error } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', thirtyDaysAgo.toISOString());
      if (error) throw error;
      return count || 0;
    },
    refetchInterval: 60000,
  });

  // Fetch latest activity log timestamp
  const { data: latestActivity, isLoading: activityLoading } = useQuery({
    queryKey: ['latest-activity'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('activity_log')
        .select('created_at')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();
      if (error && error.code !== 'PGRST116') throw error;
      return data?.created_at ? new Date(data.created_at) : null;
    },
    refetchInterval: 10000,
  });

  // Format the latest activity time
  const getActivityTime = () => {
    if (!latestActivity) return "No activity";
    return formatDistanceToNow(latestActivity, { addSuffix: false });
  };

  // Format numbers nicely
  const formatNumber = (num: number) => {
    if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
    return num.toString();
  };

  const cards: LiveMonitorCardProps[] = [
    {
      icon: ShieldAlert,
      title: "Active Services",
      value: heartbeatsLoading ? "..." : `${heartbeatsData?.healthy || 0}/${heartbeatsData?.total || 0}`,
      chartType: "bar",
      chartData: [30, 50, 40, 70, 55, 80, 65, 90],
      accentColor: "blue",
      index: 0,
      isLoading: heartbeatsLoading,
    },
    {
      icon: Ban,
      title: "Threats Resolved",
      value: threatLoading ? "..." : `${threatStats?.rate || 0}%`,
      chartType: "line",
      chartData: [40, 55, 45, 60, 50, 75, 85, 95],
      accentColor: "red",
      index: 1,
      isLoading: threatLoading,
    },
    {
      icon: Users,
      title: "New Members (30d)",
      value: profileLoading ? "..." : formatNumber(profileStats || 0),
      chartType: "bar",
      chartData: [20, 35, 45, 30, 55, 40, 65, 50],
      accentColor: "green",
      index: 2,
      isLoading: profileLoading,
    },
    {
      icon: Database,
      title: "Last Activity",
      value: activityLoading ? "..." : getActivityTime(),
      chartType: "line",
      chartData: [60, 45, 55, 40, 50, 45, 55, 50],
      accentColor: "orange",
      index: 3,
      isLoading: activityLoading,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {cards.map((card) => (
        <LiveMonitorCard key={card.title} {...card} />
      ))}
    </div>
  );
}
