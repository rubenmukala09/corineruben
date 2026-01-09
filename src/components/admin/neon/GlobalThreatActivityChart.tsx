import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, AlertTriangle, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { format, subDays, startOfDay, eachDayOfInterval } from "date-fns";

type TimeFrame = "7d" | "30d" | "90d";

export function GlobalThreatActivityChart() {
  const [timeFrame, setTimeFrame] = useState<TimeFrame>("7d");

  const days = timeFrame === "7d" ? 7 : timeFrame === "30d" ? 30 : 90;

  // Fetch threat events data
  const { data: threatEvents, isLoading } = useQuery({
    queryKey: ['threat-activity', timeFrame],
    queryFn: async () => {
      const startDate = subDays(new Date(), days);
      const { data, error } = await supabase
        .from('threat_events')
        .select('created_at, status')
        .gte('created_at', startDate.toISOString())
        .order('created_at', { ascending: true });
      if (error) throw error;
      return data || [];
    },
    refetchInterval: 60000,
  });

  // Process data for chart
  const chartData = useMemo(() => {
    const endDate = new Date();
    const startDate = subDays(endDate, days - 1);
    const interval = eachDayOfInterval({ start: startOfDay(startDate), end: startOfDay(endDate) });

    // Initialize counts for each day
    const dayCounts: Record<string, { scamsBlocked: number; threatsDetected: number }> = {};
    interval.forEach(date => {
      const key = format(date, 'yyyy-MM-dd');
      dayCounts[key] = { scamsBlocked: 0, threatsDetected: 0 };
    });

    // Count events per day
    threatEvents?.forEach(event => {
      const eventDate = format(new Date(event.created_at), 'yyyy-MM-dd');
      if (dayCounts[eventDate]) {
        dayCounts[eventDate].threatsDetected += 1;
        if (event.status === 'resolved') {
          dayCounts[eventDate].scamsBlocked += 1;
        }
      }
    });

    // Convert to array format for chart
    return interval.map(date => {
      const key = format(date, 'yyyy-MM-dd');
      const dayLabel = days <= 7 
        ? format(date, 'EEE') 
        : days <= 30 
          ? format(date, 'MMM d') 
          : format(date, 'M/d');
      return {
        day: dayLabel,
        scamsBlocked: dayCounts[key].scamsBlocked,
        threatsDetected: dayCounts[key].threatsDetected,
      };
    });
  }, [threatEvents, days]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#111827] border border-gray-800 rounded-lg shadow-xl p-4">
          <p className="text-sm font-medium text-[#F9FAFB] mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: <span className="font-bold">{entry.value.toLocaleString()}</span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const hasData = threatEvents && threatEvents.length > 0;

  return (
    <Card className="p-6 bg-[#111827] border border-gray-800 rounded-xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          {/* Live Badge */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#10B981]/10 border border-[#10B981]/30">
            <span className="w-2 h-2 rounded-full bg-[#10B981]" />
            <span className="text-xs font-medium text-[#10B981]">LIVE</span>
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#F9FAFB]">Global Threat Activity</h2>
            <p className="text-sm text-[#9CA3AF]">Threat Neutralization History</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Time Frame Tabs */}
          <div className="flex gap-1 bg-[#0B0F19] rounded-lg p-1 border border-gray-800">
            {[
              { value: "7d" as TimeFrame, label: "7D" },
              { value: "30d" as TimeFrame, label: "30D" },
              { value: "90d" as TimeFrame, label: "90D" },
            ].map((tab) => (
              <Button
                key={tab.value}
                variant="ghost"
                size="sm"
                onClick={() => setTimeFrame(tab.value)}
                className={`h-8 px-3 text-xs ${
                  timeFrame === tab.value
                    ? "bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-white"
                    : "text-[#9CA3AF] hover:text-white hover:bg-gray-800"
                }`}
              >
                {tab.label}
              </Button>
            ))}
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="text-[#9CA3AF] hover:text-white hover:bg-gray-800"
          >
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Chart */}
      <div className="h-80">
        {isLoading ? (
          <div className="h-full flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-[#06B6D4]" />
          </div>
        ) : !hasData ? (
          <div className="h-full flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-full bg-[#374151]/30 flex items-center justify-center mb-4">
              <AlertTriangle className="h-8 w-8 text-[#9CA3AF]" />
            </div>
            <h3 className="text-lg font-medium text-[#F9FAFB] mb-2">No Threat Data Yet</h3>
            <p className="text-sm text-[#9CA3AF] max-w-xs">
              Threat events will appear here once your security systems detect activity.
            </p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#06B6D4" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="#06B6D4" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="orangeGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#F97316" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="#F97316" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} vertical={false} />
              <XAxis
                dataKey="day"
                stroke="#9CA3AF"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#9CA3AF"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
              />
              <Tooltip content={<CustomTooltip />} />
              
              <Area
                type="monotone"
                dataKey="scamsBlocked"
                name="Scams Blocked"
                stroke="#06B6D4"
                strokeWidth={3}
                fill="url(#blueGradient)"
                dot={false}
                activeDot={{ r: 6, fill: "#06B6D4", stroke: "#0B0F19", strokeWidth: 2 }}
              />
              
              <Area
                type="monotone"
                dataKey="threatsDetected"
                name="New Threats Detected"
                stroke="#F97316"
                strokeWidth={3}
                fill="url(#orangeGradient)"
                dot={false}
                activeDot={{ r: 6, fill: "#F97316", stroke: "#0B0F19", strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Legend */}
      <div className="mt-4 flex justify-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-gradient-to-r from-[#3B82F6] to-[#06B6D4]" />
          <span className="text-sm text-[#9CA3AF]">Scams Blocked</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-gradient-to-r from-[#F97316] to-[#EC4899]" />
          <span className="text-sm text-[#9CA3AF]">New Threats Detected</span>
        </div>
      </div>
    </Card>
  );
}
