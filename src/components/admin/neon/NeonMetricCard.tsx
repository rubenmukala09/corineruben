import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useCounterAnimation } from "@/hooks/useCounterAnimation";

interface NeonMetricCardProps {
  icon: LucideIcon;
  title: string;
  value: number;
  suffix?: string;
  prefix?: string;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  sparklineData?: number[];
  accentColor: "cyan" | "green" | "orange" | "purple" | "red";
  index: number;
  status?: "healthy" | "warning" | "critical";
}

const colorConfig = {
  cyan: {
    gradient: "from-cyan-500 to-blue-600",
    glow: "shadow-cyan-500/20",
    text: "text-cyan-400",
    sparkline: "#06b6d4",
    border: "border-cyan-500/20",
  },
  green: {
    gradient: "from-emerald-500 to-teal-600",
    glow: "shadow-emerald-500/20",
    text: "text-emerald-400",
    sparkline: "#10b981",
    border: "border-emerald-500/20",
  },
  orange: {
    gradient: "from-orange-500 to-red-600",
    glow: "shadow-orange-500/20",
    text: "text-orange-400",
    sparkline: "#f97316",
    border: "border-orange-500/20",
  },
  purple: {
    gradient: "from-purple-500 to-pink-600",
    glow: "shadow-purple-500/20",
    text: "text-purple-400",
    sparkline: "#a855f7",
    border: "border-purple-500/20",
  },
  red: {
    gradient: "from-red-500 to-rose-600",
    glow: "shadow-red-500/20",
    text: "text-red-400",
    sparkline: "#ef4444",
    border: "border-red-500/20",
  },
};

export function NeonMetricCard({
  icon: Icon,
  title,
  value,
  suffix = "",
  prefix = "",
  trend = "neutral",
  trendValue,
  sparklineData = [40, 60, 45, 70, 55, 80, 65, 90, 75, 85],
  accentColor,
  index,
  status = "healthy",
}: NeonMetricCardProps) {
  const config = colorConfig[accentColor];
  const { count: animatedValue } = useCounterAnimation({
    end: value,
    duration: 1500,
  });

  const statusIndicator = {
    healthy: "bg-emerald-500",
    warning: "bg-amber-500",
    critical: "bg-red-500 animate-pulse",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -4, scale: 1.02 }}
    >
      <Card
        className={`relative overflow-hidden p-5 bg-[#1F2937] border-gray-700/50 rounded-xl 
          shadow-lg ${config.glow} hover:${config.glow} transition-all duration-300
          hover:border-gray-600/50`}
      >
        {/* Glow Effect Background */}
        <div
          className={`absolute -top-20 -right-20 w-40 h-40 rounded-full 
            bg-gradient-to-br ${config.gradient} opacity-10 blur-3xl`}
        />

        {/* Header */}
        <div className="flex items-center justify-between mb-4 relative z-10">
          <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${config.gradient} 
            flex items-center justify-center shadow-lg ${config.glow}`}>
            <Icon className="h-5 w-5 text-white" />
          </div>
          
          {/* Status Indicator */}
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${statusIndicator[status]}`} />
            {trendValue && (
              <span className={`text-xs font-medium ${
                trend === "up" ? "text-emerald-400" : 
                trend === "down" ? "text-red-400" : 
                "text-gray-400"
              }`}>
                {trend === "up" ? "↑" : trend === "down" ? "↓" : ""} {trendValue}
              </span>
            )}
          </div>
        </div>

        {/* Value */}
        <div className="relative z-10">
          <p className={`text-3xl font-bold text-white mb-1`}>
            {prefix}{animatedValue.toLocaleString()}{suffix}
          </p>
          <p className="text-sm text-[#D1D5DB]">{title}</p>
        </div>

        {/* Mini Sparkline */}
        <div className="mt-4 h-8 flex items-end gap-[2px] relative z-10">
          {sparklineData.map((height, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              animate={{ height: `${height}%` }}
              transition={{ delay: index * 0.1 + i * 0.03, duration: 0.3 }}
              className="flex-1 rounded-t"
              style={{
                backgroundColor: config.sparkline,
                opacity: 0.3 + (i / sparklineData.length) * 0.7,
              }}
            />
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
