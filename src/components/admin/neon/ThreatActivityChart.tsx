import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, TrendingUp } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { motion } from "framer-motion";

// Mock weekly data for scam attempts vs blocked
const weeklyData = [
  { day: "Mon", attempted: 145, blocked: 142 },
  { day: "Tue", attempted: 168, blocked: 165 },
  { day: "Wed", attempted: 203, blocked: 198 },
  { day: "Thu", attempted: 178, blocked: 175 },
  { day: "Fri", attempted: 256, blocked: 251 },
  { day: "Sat", attempted: 189, blocked: 186 },
  { day: "Sun", attempted: 134, blocked: 132 },
];

type TimeFrame = "7d" | "30d" | "90d";

export function ThreatActivityChart() {
  const [timeFrame, setTimeFrame] = useState<TimeFrame>("7d");

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const attemptedValue = payload[0]?.value ?? 0;
      const blockedValue = payload[1]?.value ?? 0;
      const blockRate = attemptedValue > 0 ? ((blockedValue / attemptedValue) * 100) : 0;
      
      return (
        <div className="bg-[#111827] border border-gray-700 rounded-lg shadow-xl p-4">
          <p className="text-sm font-medium text-[#F9FAFB] mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: <span className="font-bold">{(entry.value ?? 0).toLocaleString()}</span>
            </p>
          ))}
          <p className="text-xs text-[#10B981] mt-2">
            Block rate: {blockRate.toFixed(1)}%
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="p-6 bg-[#1F2937] border-gray-700/50 rounded-xl shadow-lg shadow-cyan-500/5">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Threat Activity Overview</h2>
              <p className="text-sm text-gray-400">Scam attempts vs. blocked</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Time Frame Tabs */}
            <div className="flex gap-1 bg-[#111827] rounded-lg p-1">
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
                  className={`h-8 px-3 text-xs transition-all ${
                    timeFrame === tab.value
                      ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white"
                      : "text-gray-400 hover:text-white hover:bg-gray-700"
                  }`}
                >
                  {tab.label}
                </Button>
              ))}
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:text-white hover:bg-gray-700"
            >
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Chart */}
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={weeklyData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="attemptedGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f97316" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="blockedGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.5} />
              <XAxis
                dataKey="day"
                stroke="#9ca3af"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#9ca3af"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                wrapperStyle={{ paddingTop: "20px" }}
                formatter={(value) => <span className="text-gray-300 text-sm">{value}</span>}
              />
              <Area
                type="monotone"
                dataKey="attempted"
                name="Scams Attempted"
                stroke="#f97316"
                strokeWidth={2}
                fill="url(#attemptedGradient)"
                dot={{ fill: "#f97316", strokeWidth: 0, r: 4 }}
                activeDot={{ r: 6, fill: "#f97316", stroke: "#fff", strokeWidth: 2 }}
              />
              <Area
                type="monotone"
                dataKey="blocked"
                name="Scams Blocked"
                stroke="#06b6d4"
                strokeWidth={2}
                fill="url(#blockedGradient)"
                dot={{ fill: "#06b6d4", strokeWidth: 0, r: 4 }}
                activeDot={{ r: 6, fill: "#06b6d4", stroke: "#fff", strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Summary Stats */}
        <div className="mt-6 pt-4 border-t border-gray-700/50 grid grid-cols-3 gap-4">
          <div>
            <p className="text-xs text-gray-400 mb-1">Total Attempted</p>
            <p className="text-xl font-bold text-orange-400">1,273</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-1">Total Blocked</p>
            <p className="text-xl font-bold text-cyan-400">1,249</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-1">Block Rate</p>
            <p className="text-xl font-bold text-emerald-400">98.1%</p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
