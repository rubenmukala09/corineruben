import { Card } from "@/components/ui/card";
import { Shield } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { motion } from "framer-motion";

// Device Security Data with exact colors from spec
const deviceData = [
  { name: "Mobile Protected", value: 65, color: "#10B981" }, // Neon Green
  { name: "Desktop Protected", value: 25, color: "#3B82F6" }, // Neon Blue  
  { name: "Vulnerable", value: 10, color: "#EF4444" }, // Neon Red
];

const safetyScore = 90; // Center text value

export function DeviceSecurityShield() {
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-[#111827] border border-gray-800 rounded-lg shadow-xl p-3">
          <p className="text-sm font-medium text-[#F9FAFB]">{data.name}</p>
          <p className="text-lg font-bold" style={{ color: data.color }}>
            {data.value}%
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
      <Card className="p-6 bg-[#111827] border border-gray-800 rounded-xl h-full">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#10B981] to-[#06B6D4] flex items-center justify-center">
            <Shield className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-[#F9FAFB]">Device Security Shield</h2>
            <p className="text-sm text-[#9CA3AF]">Protection coverage</p>
          </div>
        </div>

        {/* Thick Donut Chart with hollow center */}
        <div className="relative h-56">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={deviceData}
                cx="50%"
                cy="50%"
                innerRadius={65}
                outerRadius={95}
                paddingAngle={2}
                dataKey="value"
                stroke="none"
              >
                {deviceData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    style={{
                      filter: `drop-shadow(0 0 10px ${entry.color}80)`,
                    }}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>

          {/* Center Text - Big white number with label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
              className="text-4xl font-bold text-[#F9FAFB]"
            >
              {safetyScore}%
            </motion.span>
            <span className="text-sm text-[#9CA3AF]">Safety Score</span>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-4 space-y-2">
          {deviceData.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="flex items-center justify-between py-2 px-3 rounded-lg bg-[#0B0F19] border border-gray-800"
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{
                    backgroundColor: item.color,
                    boxShadow: `0 0 8px ${item.color}`,
                  }}
                />
                <span className="text-sm text-[#9CA3AF]">{item.name}</span>
              </div>
              <span className="text-sm font-semibold" style={{ color: item.color }}>
                {item.value}%
              </span>
            </motion.div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
