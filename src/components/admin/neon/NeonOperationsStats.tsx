import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import {
  Users,
  MessageSquare,
  CheckSquare,
  Calendar,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { Link } from "react-router-dom";

interface StatsProps {
  stats: {
    totalStaff: number;
    newsletterSubscribers: number;
    pendingTasks: number;
    upcomingEvents: number;
  };
}

const statConfigs = [
  {
    key: "totalStaff",
    label: "Total Staff",
    icon: Users,
    gradient: "from-cyan-500 to-blue-600",
    glow: "shadow-cyan-500/20",
    sparklineColor: "#06b6d4",
    trend: { value: 12, isUp: true },
    link: null,
  },
  {
    key: "newsletterSubscribers",
    label: "Subscribers",
    icon: MessageSquare,
    gradient: "from-green-500 to-emerald-600",
    glow: "shadow-green-500/20",
    sparklineColor: "#10b981",
    trend: { value: 8, isUp: true },
    link: "/admin/newsletter",
  },
  {
    key: "pendingTasks",
    label: "Pending Tasks",
    icon: CheckSquare,
    gradient: "from-amber-500 to-orange-600",
    glow: "shadow-orange-500/20",
    sparklineColor: "#f59e0b",
    trend: { value: 3, isUp: false },
    link: null,
  },
  {
    key: "upcomingEvents",
    label: "Upcoming Events",
    icon: Calendar,
    gradient: "from-purple-500 to-pink-600",
    glow: "shadow-purple-500/20",
    sparklineColor: "#a855f7",
    trend: { value: 5, isUp: true },
    link: null,
  },
];

// Mini sparkline data
const sparklineData = [30, 45, 35, 50, 40, 60, 55, 70, 65, 80];

export function NeonOperationsStats({ stats }: StatsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {statConfigs.map((config, index) => {
        const Icon = config.icon;
        const value = stats[config.key as keyof typeof stats];
        const TrendIcon = config.trend.isUp ? TrendingUp : TrendingDown;

        const cardContent = (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <Card
              className={`relative overflow-hidden bg-[#1F2937] border-gray-800/50 p-5 hover:border-gray-700/50 transition-all duration-300 shadow-lg ${config.glow} ${config.link ? "cursor-pointer" : ""}`}
            >
              {/* Gradient glow effect */}
              <div
                className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${config.gradient} opacity-10 blur-2xl rounded-full -translate-y-1/2 translate-x-1/2`}
              />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`w-10 h-10 bg-gradient-to-br ${config.gradient} rounded-lg flex items-center justify-center shadow-lg ${config.glow}`}
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div
                    className={`flex items-center gap-1 text-xs ${config.trend.isUp ? "text-green-400" : "text-red-400"}`}
                  >
                    <TrendIcon className="w-3 h-3" />
                    <span>{config.trend.value}%</span>
                  </div>
                </div>

                <div className="mb-3">
                  <p className="text-2xl font-bold text-white">{value}</p>
                  <p className="text-xs text-gray-400">{config.label}</p>
                </div>

                {/* Mini Sparkline */}
                <div className="flex items-end gap-0.5 h-8">
                  {sparklineData.map((height, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${height}%` }}
                      transition={{
                        delay: index * 0.1 + i * 0.05,
                        duration: 0.3,
                      }}
                      className="flex-1 rounded-sm"
                      style={{
                        background: `linear-gradient(to top, ${config.sparklineColor}, transparent)`,
                        opacity: 0.7 + i * 0.03,
                      }}
                    />
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>
        );

        return config.link ? (
          <Link key={config.key} to={config.link}>
            {cardContent}
          </Link>
        ) : (
          <div key={config.key}>{cardContent}</div>
        );
      })}
    </div>
  );
}
