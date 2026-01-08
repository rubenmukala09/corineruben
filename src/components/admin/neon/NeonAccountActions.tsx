import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  UserPlus,
  Key,
  Shield,
  Users,
  Settings,
  Lock,
  Mail,
  RefreshCw,
} from "lucide-react";

const accountActions = [
  {
    title: "Create User",
    description: "Add new admin or staff",
    icon: UserPlus,
    href: "/admin/settings/users",
    gradient: "from-green-500 to-emerald-600",
  },
  {
    title: "Manage Roles",
    description: "User permissions",
    icon: Shield,
    href: "/admin/settings/users",
    gradient: "from-purple-500 to-pink-600",
  },
  {
    title: "Reset Password",
    description: "Account recovery",
    icon: Key,
    href: "/admin/settings/users",
    gradient: "from-amber-500 to-orange-600",
  },
  {
    title: "Site Settings",
    description: "System configuration",
    icon: Settings,
    href: "/admin/settings/site",
    gradient: "from-cyan-500 to-blue-600",
  },
];

export function NeonAccountActions() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.5 }}
    >
      <Card className="bg-[#1F2937] border-gray-800/50 p-5 shadow-lg">
        <h2 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
          <Lock className="w-5 h-5 text-amber-400" />
          Account & Access
        </h2>

        <div className="space-y-2">
          {accountActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.3 }}
              >
                <Link to={action.href}>
                  <div className="flex items-center gap-3 p-3 bg-[#111827] rounded-lg border border-gray-800/50 hover:border-gray-700/50 transition-all duration-300 group cursor-pointer">
                    <div className={`w-9 h-9 bg-gradient-to-br ${action.gradient} rounded-lg flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white group-hover:text-cyan-400 transition-colors">
                        {action.title}
                      </p>
                      <p className="text-xs text-gray-500">{action.description}</p>
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
