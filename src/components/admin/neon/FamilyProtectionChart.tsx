import { Card } from "@/components/ui/card";
import { Users, RefreshCw } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface Device {
  id: string;
  device_name: string;
  device_type: string;
  status: string;
  protection_level: number;
}

const COLORS = ["#10b981", "#06b6d4", "#8b5cf6", "#f97316", "#3b82f6", "#ec4899"];

export function FamilyProtectionChart() {
  const { data: devices = [], isLoading } = useQuery({
    queryKey: ["user-devices-chart"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("user_devices")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(6);

      if (error) throw error;
      return data as Device[];
    },
  });

  // Transform real data into chart format
  const chartData = devices.length > 0
    ? devices.map((device, index) => ({
        name: device.device_name,
        value: device.protection_level,
        status: device.status === "protected" ? "safe" : "needs-update",
        color: COLORS[index % COLORS.length],
      }))
    : [
        { name: "No devices", value: 100, status: "none", color: "#374151" },
      ];

  const totalDevices = devices.length;
  const safeDevices = devices.filter(d => d.status === "protected").length;
  const securityScore = totalDevices > 0 ? Math.round((safeDevices / totalDevices) * 100) : 0;

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      if (data.status === "none") return null;
      return (
        <div className="bg-[#1F2937] border border-cyan-500/30 rounded-lg shadow-lg shadow-cyan-500/10 p-3">
          <p className="text-sm font-medium text-white">{data.name}</p>
          <p className={`text-sm font-bold ${data.status === "safe" ? "text-emerald-400" : "text-orange-400"}`}>
            {data.status === "safe" ? "✓ Protected" : "⚠ Needs Update"}
          </p>
          <p className="text-xs text-gray-400 mt-1">Protection: {data.value}%</p>
        </div>
      );
    }
    return null;
  };

  if (isLoading) {
    return (
      <Card className="p-6 bg-[#1F2937] border-gray-700/50 rounded-xl shadow-lg shadow-emerald-500/5 h-full flex items-center justify-center">
        <RefreshCw className="h-8 w-8 animate-spin text-cyan-500" />
      </Card>
    );
  }

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
            <p className="text-sm text-gray-400">
              {totalDevices > 0 ? `${totalDevices} device${totalDevices > 1 ? 's' : ''} connected` : 'No devices connected'}
            </p>
          </div>
        </div>

        {/* Donut Chart with Center Text */}
        <div className="relative h-52">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <defs>
                {chartData.map((entry, index) => (
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
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={devices.length > 0 ? 3 : 0}
                dataKey="value"
                stroke="none"
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    style={{
                      filter: entry.status !== "none" ? `drop-shadow(0 0 6px ${entry.color})` : undefined,
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
          {devices.length === 0 ? (
            <div className="text-center py-4">
              <p className="text-sm text-gray-400">Add devices to see protection status</p>
            </div>
          ) : (
            devices.slice(0, 5).map((device, index) => (
              <motion.div
                key={device.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="flex items-center justify-between py-2 px-3 rounded-lg bg-[#111827]/50"
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{
                      backgroundColor: COLORS[index % COLORS.length],
                      boxShadow: `0 0 8px ${COLORS[index % COLORS.length]}`,
                    }}
                  />
                  <span className="text-sm text-gray-300">{device.device_name}</span>
                </div>
                <span className={`text-xs font-medium ${device.status === "protected" ? "text-emerald-400" : device.status === "warning" ? "text-orange-400" : "text-red-400"}`}>
                  {device.status === "protected" ? "Safe" : device.status === "warning" ? "Update" : "At Risk"}
                </span>
              </motion.div>
            ))
          )}
        </div>
      </Card>
    </motion.div>
  );
}
