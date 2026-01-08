import { Card } from "@/components/ui/card";
import { Users } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { motion } from "framer-motion";

const deviceData = [
  { name: "Mom's Phone", value: 30, status: "safe", color: "#10b981" },
  { name: "Dad's Laptop", value: 25, status: "safe", color: "#06b6d4" },
  { name: "Kids' Tablet", value: 20, status: "safe", color: "#8b5cf6" },
  { name: "Home Wi-Fi", value: 15, status: "needs-update", color: "#f97316" },
  { name: "Smart TV", value: 10, status: "safe", color: "#3b82f6" },
];

const totalDevices = 5;
const safeDevices = deviceData.filter(d => d.status === "safe").length;
const securityScore = Math.round((safeDevices / totalDevices) * 100);

export function FamilyProtectionChart() {
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-[#1F2937] border border-cyan-500/30 rounded-lg shadow-lg shadow-cyan-500/10 p-3">
          <p className="text-sm font-medium text-white">{data.name}</p>
          <p className={`text-sm font-bold ${data.status === "safe" ? "text-emerald-400" : "text-orange-400"}`}>
            {data.status === "safe" ? "✓ Protected" : "⚠ Needs Update"}
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
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="p-6 bg-[#1F2937] border-gray-700/50 rounded-xl shadow-lg shadow-emerald-500/5 h-full">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-600 flex items-center justify-center">
            <Users className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Family Protection</h2>
            <p className="text-sm text-gray-400">Device coverage status</p>
          </div>
        </div>

        {/* Donut Chart with Center Text */}
        <div className="relative h-52">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <defs>
                {deviceData.map((entry, index) => (
                  <filter key={`glow-${index}`} id={`glow-${index}`} x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                ))}
              </defs>
              <Pie
                data={deviceData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={3}
                dataKey="value"
                stroke="none"
              >
                {deviceData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    style={{
                      filter: `drop-shadow(0 0 6px ${entry.color})`,
                    }}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>

          {/* Center Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
              className="text-3xl font-bold text-white"
            >
              {securityScore}%
            </motion.span>
            <span className="text-xs text-gray-400">Secure</span>
          </div>
        </div>

        {/* Device Status List */}
        <div className="mt-4 space-y-2">
          {deviceData.map((device, index) => (
            <motion.div
              key={device.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="flex items-center justify-between py-2 px-3 rounded-lg bg-[#111827]/50"
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{
                    backgroundColor: device.color,
                    boxShadow: `0 0 8px ${device.color}`,
                  }}
                />
                <span className="text-sm text-gray-300">{device.name}</span>
              </div>
              <span className={`text-xs font-medium ${device.status === "safe" ? "text-emerald-400" : "text-orange-400"}`}>
                {device.status === "safe" ? "Safe" : "Update"}
              </span>
            </motion.div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
