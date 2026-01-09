import { Card } from "@/components/ui/card";
import { Shield, AlertTriangle, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

export function AttackVectorBarChart() {
  // Fetch threat events grouped by type
  const { data: attackData, isLoading } = useQuery({
    queryKey: ['attack-vectors'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('threat_events')
        .select('threat_type');
      if (error) throw error;
      
      // Group and count by threat_type
      const typeCounts: Record<string, number> = {};
      data?.forEach(event => {
        const type = event.threat_type || 'Unknown';
        typeCounts[type] = (typeCounts[type] || 0) + 1;
      });

      // Convert to array and sort by count descending
      return Object.entries(typeCounts)
        .map(([name, value]) => ({ name, value }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 5); // Top 5
    },
    refetchInterval: 60000,
  });

  const totalAttacks = attackData?.reduce((sum, item) => sum + item.value, 0) || 0;
  const hasData = attackData && attackData.length > 0;

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-[#111827] border border-gray-800 rounded-lg shadow-xl p-4">
          <p className="text-sm font-medium text-[#F9FAFB] mb-1">{data.name}</p>
          <p className="text-2xl font-bold bg-gradient-to-r from-[#F97316] to-[#EC4899] bg-clip-text text-transparent">
            {data.value.toLocaleString()}
          </p>
          <p className="text-xs text-[#9CA3AF] mt-1">attacks detected</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="p-6 bg-[#111827] border border-gray-800 rounded-xl h-full">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#F97316] to-[#EC4899] flex items-center justify-center">
          <Shield className="h-5 w-5 text-white" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-[#F9FAFB]">Attack Vector Analysis</h2>
          <p className="text-sm text-[#9CA3AF]">Types of threats detected</p>
        </div>
      </div>

      {/* Chart */}
      <div className="h-64">
        {isLoading ? (
          <div className="h-full flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-[#F97316]" />
          </div>
        ) : !hasData ? (
          <div className="h-full flex flex-col items-center justify-center text-center">
            <div className="w-14 h-14 rounded-full bg-[#374151]/30 flex items-center justify-center mb-3">
              <AlertTriangle className="h-7 w-7 text-[#9CA3AF]" />
            </div>
            <h3 className="text-base font-medium text-[#F9FAFB] mb-1">No Attacks Detected</h3>
            <p className="text-xs text-[#9CA3AF] max-w-[200px]">
              Attack data will appear here when threats are detected.
            </p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={attackData}
              margin={{ top: 10, right: 10, left: -10, bottom: 5 }}
            >
              <defs>
                <linearGradient id="dangerBarGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#F97316" stopOpacity={1} />
                  <stop offset="100%" stopColor="#EC4899" stopOpacity={0.8} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} horizontal={true} vertical={false} />
              <XAxis
                dataKey="name"
                stroke="#9CA3AF"
                fontSize={10}
                tickLine={false}
                axisLine={false}
                angle={-15}
                textAnchor="end"
                height={50}
              />
              <YAxis
                stroke="#9CA3AF"
                fontSize={11}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.05)" }} />
              <Bar
                dataKey="value"
                fill="url(#dangerBarGradient)"
                radius={[4, 4, 0, 0]}
                barSize={40}
              >
                {attackData?.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill="url(#dangerBarGradient)"
                    style={{
                      filter: "drop-shadow(0 0 8px rgba(249, 115, 22, 0.4))",
                    }}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Summary */}
      <div className="mt-4 pt-4 border-t border-gray-800 flex justify-between items-center">
        <span className="text-sm text-[#9CA3AF]">Total Attacks</span>
        <span className="text-xl font-bold bg-gradient-to-r from-[#F97316] to-[#EC4899] bg-clip-text text-transparent">
          {totalAttacks.toLocaleString()}
        </span>
      </div>
    </Card>
  );
}
