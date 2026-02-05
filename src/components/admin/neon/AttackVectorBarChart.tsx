import { Card } from "@/components/ui/card";
import { Shield } from "lucide-react";
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
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

// Empty state - will be populated from threat_events when available
const emptyAttackData = [
  { name: "Phishing", value: 0 },
  { name: "Deepfake Voice", value: 0 },
  { name: "Smishing", value: 0 },
  { name: "Malware", value: 0 },
  { name: "Ransomware", value: 0 },
];

export function AttackVectorBarChart() {
  const [attackData, setAttackData] = useState(emptyAttackData);
  const [hasData, setHasData] = useState(false);
  const [totalAttacks, setTotalAttacks] = useState(0);

  useEffect(() => {
    loadAttackData();
  }, []);

  const loadAttackData = async () => {
    try {
      const { count } = await supabase
        .from("threat_events")
        .select("*", { count: "exact", head: true });
      
      if (count && count > 0) {
        setHasData(true);
        setTotalAttacks(count);
        // TODO: Group by threat_type when real data exists
      } else {
        setHasData(false);
        setAttackData(emptyAttackData);
        setTotalAttacks(0);
      }
    } catch (err) {
      setHasData(false);
    }
  };

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
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

        {/* Vertical Bar Chart */}
        <div className="h-64 relative">
          {!hasData && (
            <div className="absolute inset-0 flex items-center justify-center z-10 bg-[#111827]/80 rounded-lg">
              <div className="text-center p-4">
                <p className="text-[#9CA3AF] text-sm">No attack data yet</p>
                <p className="text-xs text-gray-500 mt-1">Threat data will populate automatically</p>
              </div>
            </div>
          )}
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={attackData}
              margin={{ top: 10, right: 10, left: -10, bottom: 5 }}
            >
              <defs>
                {/* Orange to Pink gradient for danger bars */}
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
                {attackData.map((entry, index) => (
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
        </div>

        {/* Summary */}
        <div className="mt-4 pt-4 border-t border-gray-800 flex justify-between items-center">
          <span className="text-sm text-[#9CA3AF]">Total Attacks</span>
          <span className="text-xl font-bold bg-gradient-to-r from-[#F97316] to-[#EC4899] bg-clip-text text-transparent">
            {hasData ? totalAttacks.toLocaleString() : "—"}
          </span>
        </div>
      </Card>
    </motion.div>
  );
}
