import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Shield, GraduationCap, Code, Headphones, Users } from "lucide-react";

const teamConfig = [
  {
    role: "Analysts",
    count: 0,
    icon: Shield,
    gradient: "from-cyan-500 to-blue-600",
    glow: "shadow-cyan-500/30",
    bgGlow: "bg-cyan-500/10",
  },
  {
    role: "Trainers",
    count: 0,
    icon: GraduationCap,
    gradient: "from-green-500 to-emerald-600",
    glow: "shadow-green-500/30",
    bgGlow: "bg-green-500/10",
  },
  {
    role: "Developers",
    count: 0,
    icon: Code,
    gradient: "from-purple-500 to-pink-600",
    glow: "shadow-purple-500/30",
    bgGlow: "bg-purple-500/10",
  },
  {
    role: "Support",
    count: 1,
    icon: Headphones,
    gradient: "from-amber-500 to-orange-600",
    glow: "shadow-orange-500/30",
    bgGlow: "bg-orange-500/10",
  },
];

export function NeonTeamOverview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7, duration: 0.5 }}
    >
      <Card className="bg-[#1F2937] border-gray-800/50 p-6 shadow-lg">
        <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-6">
          <Users className="w-5 h-5 text-blue-400" />
          Team Overview
        </h2>
        
        <div className="grid grid-cols-2 gap-4">
          {teamConfig.map((team, index) => {
            const Icon = team.icon;
            
            return (
              <motion.div
                key={team.role}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + index * 0.1, duration: 0.3 }}
                className="relative overflow-hidden p-4 bg-[#111827] rounded-lg border border-gray-800/50 hover:border-gray-700/50 transition-all duration-300 group"
              >
                {/* Background glow */}
                <div className={`absolute top-0 right-0 w-20 h-20 ${team.bgGlow} blur-2xl rounded-full -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                <div className="relative z-10 flex items-center gap-3">
                  <div className={`w-10 h-10 bg-gradient-to-br ${team.gradient} rounded-lg flex items-center justify-center shadow-lg ${team.glow}`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-white">{team.count}</p>
                    <p className="text-sm text-gray-400">{team.role}</p>
                  </div>
                </div>
                
                {/* Mini bar visualization */}
                <div className="mt-3 flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: i < team.count ? 16 : 8 }}
                      transition={{ delay: 0.8 + index * 0.1 + i * 0.05, duration: 0.3 }}
                      className={`flex-1 rounded-sm ${i < team.count ? `bg-gradient-to-t ${team.gradient}` : 'bg-gray-800'}`}
                    />
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </Card>
    </motion.div>
  );
}
