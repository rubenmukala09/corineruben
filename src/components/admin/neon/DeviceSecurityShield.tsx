import { Card } from "@/components/ui/card";
import { Shield, RefreshCw } from "lucide-react";
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

export function DeviceSecurityShield() {
  const { data: devices = [], isLoading } = useQuery({
    queryKey: ["user-devices-shield"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("user_devices")
        .select("*");

      if (error) throw error;
      return data as Device[];
    },
  });

  // Calculate device data from real devices
  const mobileDevices = devices.filter(d => d.device_type === "mobile" || d.device_type === "tablet");
  const desktopDevices = devices.filter(d => d.device_type === "desktop" || d.device_type === "laptop");
  const vulnerableDevices = devices.filter(d => d.status === "at_risk" || d.protection_level < 70);

  const totalDevices = devices.length || 1; // Prevent division by zero
  
  const deviceData = [
    { 
      name: "Mobile Protected", 
      value: totalDevices > 0 ? Math.round((mobileDevices.filter(d => d.status === "protected").length / totalDevices) * 100) : 0, 
      color: "#10B981" 
    },
    { 
      name: "Desktop Protected", 
      value: totalDevices > 0 ? Math.round((desktopDevices.filter(d => d.status === "protected").length / totalDevices) * 100) : 0, 
      color: "#3B82F6" 
    },
    { 
      name: "Vulnerable", 
      value: totalDevices > 0 ? Math.round((vulnerableDevices.length / totalDevices) * 100) : 0, 
      color: "#EF4444" 
    },
  ];

  // Ensure we have at least some data to show
  const chartData = devices.length > 0 
    ? deviceData.filter(d => d.value > 0)
    : [{ name: "No Data", value: 100, color: "#374151" }];

  // Calculate safety score
  const protectedDevices = devices.filter(d => d.status === "protected").length;
  const safetyScore = devices.length > 0 ? Math.round((protectedDevices / devices.length) * 100) : 0;

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      if (data.name === "No Data") return null;
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

  if (isLoading) {
    return (
      <Card className="p-6 bg-[#111827] border border-gray-800 rounded-xl h-full flex items-center justify-center">
        <RefreshCw className="h-8 w-8 animate-spin text-[#06B6D4]" />
      </Card>
    );
  }

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
            <p className="text-sm text-[#9CA3AF]">
              {devices.length > 0 ? `${devices.length} device${devices.length > 1 ? 's' : ''} monitored` : 'No devices'}
            </p>
          </div>
        </div>

        {/* Thick Donut Chart with hollow center */}
        <div className="relative h-56">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={65}
                outerRadius={95}
                paddingAngle={chartData.length > 1 ? 2 : 0}
                dataKey="value"
                stroke="none"
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    style={{
                      filter: entry.name !== "No Data" ? `drop-shadow(0 0 10px ${entry.color}80)` : undefined,
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
          {devices.length === 0 ? (
            <div className="text-center py-4">
              <p className="text-sm text-[#9CA3AF]">Add devices to see security breakdown</p>
            </div>
          ) : (
            deviceData.map((item, index) => (
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
            ))
          )}
        </div>
      </Card>
    </motion.div>
  );
}
