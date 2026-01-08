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

const attackData = [
  { name: "Phishing Email", value: 456, color: "#f97316" },
  { name: "SMS Smishing", value: 312, color: "#ec4899" },
  { name: "Voice Deepfake", value: 189, color: "#a855f7" },
  { name: "Malicious URL", value: 234, color: "#8b5cf6" },
  { name: "QR Code Scam", value: 98, color: "#6366f1" },
];

export function AttackVectorChart() {
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-[#1F2937] border border-purple-500/30 rounded-lg shadow-lg shadow-purple-500/10 p-4">
          <p className="text-sm font-medium text-white mb-1">{data.name}</p>
          <p className="text-2xl font-bold" style={{ color: data.color }}>
            {data.value.toLocaleString()}
          </p>
          <p className="text-xs text-gray-400 mt-1">attacks detected</p>
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
      <Card className="p-6 bg-[#1F2937] border-gray-700/50 rounded-xl shadow-lg shadow-purple-500/5 h-full">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-pink-600 flex items-center justify-center">
            <Shield className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Attack Vector Analysis</h2>
            <p className="text-sm text-gray-400">Types of threats detected</p>
          </div>
        </div>

        {/* Chart */}
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={attackData}
              layout="vertical"
              margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
            >
              <defs>
                {attackData.map((entry, index) => (
                  <linearGradient key={`gradient-${index}`} id={`barGradient-${index}`} x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor={entry.color} stopOpacity={0.8} />
                    <stop offset="100%" stopColor={entry.color} stopOpacity={1} />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} horizontal={false} />
              <XAxis
                type="number"
                stroke="#9ca3af"
                fontSize={11}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                type="category"
                dataKey="name"
                stroke="#9ca3af"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                width={100}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.05)" }} />
              <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
                {attackData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={`url(#barGradient-${index})`}
                    style={{
                      filter: `drop-shadow(0 0 8px ${entry.color}40)`,
                    }}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Legend with glow effect */}
        <div className="mt-4 flex flex-wrap gap-3 justify-center">
          {attackData.slice(0, 3).map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{
                  backgroundColor: item.color,
                  boxShadow: `0 0 8px ${item.color}`,
                }}
              />
              <span className="text-xs text-gray-400">{item.name}</span>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
