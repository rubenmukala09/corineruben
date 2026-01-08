import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, TrendingUp, Calendar, Zap } from "lucide-react";

const actions = [
  {
    label: "Manage Staff",
    icon: Users,
    gradient: "from-cyan-500 to-blue-600",
    hoverGradient: "hover:from-cyan-600 hover:to-blue-700",
  },
  {
    label: "View Reports",
    icon: TrendingUp,
    gradient: "from-green-500 to-emerald-600",
    hoverGradient: "hover:from-green-600 hover:to-emerald-700",
  },
  {
    label: "Schedule Meeting",
    icon: Calendar,
    gradient: "from-purple-500 to-pink-600",
    hoverGradient: "hover:from-purple-600 hover:to-pink-700",
  },
];

export function NeonQuickActions() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.9, duration: 0.5 }}
    >
      <Card className="bg-[#1F2937] border-gray-800/50 p-6 shadow-lg">
        <h2 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
          <Zap className="w-5 h-5 text-amber-400" />
          Quick Actions
        </h2>
        <div className="space-y-2">
          {actions.map((action, index) => {
            const Icon = action.icon;
            
            return (
              <motion.div
                key={action.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 + index * 0.1, duration: 0.3 }}
              >
                <Button
                  className={`w-full justify-start bg-[#111827] border border-gray-800/50 hover:border-gray-700/50 text-gray-300 hover:text-white transition-all duration-300 group`}
                  variant="outline"
                >
                  <div className={`w-8 h-8 mr-3 bg-gradient-to-br ${action.gradient} rounded-lg flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  {action.label}
                </Button>
              </motion.div>
            );
          })}
        </div>
      </Card>
    </motion.div>
  );
}
