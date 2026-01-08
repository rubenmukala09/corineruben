import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import {
  Shield,
  Users,
  Briefcase,
  GraduationCap,
  Code,
  Heart,
  Stethoscope,
  Activity,
} from "lucide-react";

const dashboards = [
  {
    title: "Security Center",
    description: "Threat monitoring",
    icon: Shield,
    href: "/admin",
    gradient: "from-cyan-500 to-blue-600",
    glow: "shadow-cyan-500/20",
  },
  {
    title: "Staff Portal",
    description: "General staff",
    icon: Users,
    href: "/portal/staff",
    gradient: "from-blue-500 to-indigo-600",
    glow: "shadow-blue-500/20",
  },
  {
    title: "Analyst Hub",
    description: "Data analysis",
    icon: Activity,
    href: "/portal/analyst",
    gradient: "from-purple-500 to-pink-600",
    glow: "shadow-purple-500/20",
  },
  {
    title: "Trainer Portal",
    description: "Training management",
    icon: GraduationCap,
    href: "/portal/trainer",
    gradient: "from-green-500 to-emerald-600",
    glow: "shadow-green-500/20",
  },
  {
    title: "Developer Hub",
    description: "Technical tools",
    icon: Code,
    href: "/portal/developer",
    gradient: "from-orange-500 to-red-600",
    glow: "shadow-orange-500/20",
  },
  {
    title: "Healthcare Portal",
    description: "Medical staff",
    icon: Stethoscope,
    href: "/portal/healthcare",
    gradient: "from-teal-500 to-cyan-600",
    glow: "shadow-teal-500/20",
  },
  {
    title: "Caregiver Portal",
    description: "Care coordination",
    icon: Heart,
    href: "/portal/caregiver",
    gradient: "from-pink-500 to-rose-600",
    glow: "shadow-pink-500/20",
  },
  {
    title: "Business Portal",
    description: "Business clients",
    icon: Briefcase,
    href: "/portal/business",
    gradient: "from-amber-500 to-orange-600",
    glow: "shadow-amber-500/20",
  },
];

export function NeonDashboardLinks() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7, duration: 0.5 }}
    >
      <Card className="bg-[#1F2937] border-gray-800/50 p-5 shadow-lg">
        <h2 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
          <Activity className="w-5 h-5 text-blue-400" />
          Role Dashboards
        </h2>

        <div className="grid grid-cols-2 gap-2">
          {dashboards.map((dashboard, index) => {
            const Icon = dashboard.icon;

            return (
              <motion.div
                key={dashboard.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + index * 0.05, duration: 0.3 }}
              >
                <Link to={dashboard.href}>
                  <div className={`flex items-center gap-2 p-2.5 bg-[#111827] rounded-lg border border-gray-800/50 hover:border-gray-700/50 transition-all duration-300 group cursor-pointer`}>
                    <div className={`w-8 h-8 bg-gradient-to-br ${dashboard.gradient} rounded-lg flex items-center justify-center shadow-md ${dashboard.glow} group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-white truncate group-hover:text-cyan-400 transition-colors">
                        {dashboard.title}
                      </p>
                      <p className="text-[10px] text-gray-500 truncate">{dashboard.description}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </Card>
    </motion.div>
  );
}
