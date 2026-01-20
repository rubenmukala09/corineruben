import { motion } from "framer-motion";
import { LucideIcon, ShieldAlert, Ban, Users, Database } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useCounterAnimation } from "@/hooks/useCounterAnimation";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  ResponsiveContainer,
} from "recharts";

interface LiveMonitorCardProps {
  icon: LucideIcon;
  title: string;
  value: string;
  chartType: "bar" | "line";
  chartData: number[];
  accentColor: "blue" | "red" | "green" | "orange";
  index: number;
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
  index,
}: LiveMonitorCardProps) {
  const config = colorConfig[accentColor];
  
  // Convert chartData array to recharts format
  const formattedData = chartData.map((val, i) => ({ value: val, index: i }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -4, scale: 1.02 }}
    >
      <Card
        className={`relative overflow-hidden p-5 bg-[#111827] border border-gray-800 rounded-xl 
          shadow-lg ${config.glow} hover:${config.glow} transition-all duration-300`}
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
          <p className="text-2xl font-bold text-[#F9FAFB] mb-1">{value}</p>
          <p className="text-sm text-[#9CA3AF]">{title}</p>
        </div>
      </Card>
    </motion.div>
  );
}

export function CyberGuardianStats() {
  const cards: LiveMonitorCardProps[] = [
    {
      icon: ShieldAlert,
      title: "Active Scanners",
      value: "12,450",
      chartType: "bar",
      chartData: [30, 50, 40, 70, 55, 80, 65, 90],
      accentColor: "blue",
      index: 0,
    },
    {
      icon: Ban,
      title: "Threats Stopped",
      value: "98.2%",
      chartType: "line",
      chartData: [40, 55, 45, 60, 50, 75, 85, 95],
      accentColor: "red",
      index: 1,
    },
    {
      icon: Users,
      title: "New Family Members",
      value: "1.2k",
      chartType: "bar",
      chartData: [20, 35, 45, 30, 55, 40, 65, 50],
      accentColor: "green",
      index: 2,
    },
    {
      icon: Database,
      title: "Database Updates",
      value: "32ms Ago",
      chartType: "line",
      chartData: [60, 45, 55, 40, 50, 45, 55, 50],
      accentColor: "orange",
      index: 3,
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
