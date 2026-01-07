import { Bot, Zap, TrendingUp, Clock, CheckCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

interface AutomationStatusHeroProps {
  planName?: string;
  status?: "active" | "setup" | "pending";
  automationScore?: number;
  tasksAutomated?: number;
  hoursSaved?: number;
}

export function AutomationStatusHero({ 
  planName = "AI Automation Suite", 
  status = "active",
  automationScore = 87,
  tasksAutomated = 1247,
  hoursSaved = 156
}: AutomationStatusHeroProps) {
  const isActive = status === "active";

  return (
    <Card className="relative overflow-hidden bg-gradient-to-br from-violet-500/10 via-purple-500/5 to-background border-purple-500/20">
      {/* Animated background */}
      {isActive && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-violet-500/5 to-purple-500/10"
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
      
      <div className="relative p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          {/* Bot Icon */}
          <div className="relative">
            <motion.div
              className={`w-20 h-20 rounded-2xl flex items-center justify-center ${
                isActive 
                  ? "bg-gradient-to-br from-violet-500 to-purple-600" 
                  : "bg-muted"
              }`}
              animate={isActive ? { rotate: [0, 5, -5, 0] } : {}}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Bot className="w-10 h-10 text-white" />
            </motion.div>
            {isActive && (
              <motion.div
                className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-background"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                <CheckCircle className="w-4 h-4 text-white" />
              </motion.div>
            )}
          </div>

          {/* Status Info */}
          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold">{planName}</h2>
              <Badge className={`${
                isActive 
                  ? "bg-green-500/20 text-green-600" 
                  : "bg-yellow-500/20 text-yellow-600"
              }`}>
                {isActive ? "Active" : status === "setup" ? "Setting Up" : "Pending"}
              </Badge>
            </div>
            
            <p className="text-muted-foreground">
              {isActive 
                ? "Your AI automations are running smoothly, handling tasks 24/7."
                : "Complete setup to activate your AI automation suite."}
            </p>

            {/* Automation Efficiency */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="flex items-center gap-1">
                  <Zap className="w-4 h-4 text-violet-500" />
                  Automation Efficiency
                </span>
                <span className="font-semibold text-violet-600">{automationScore}%</span>
              </div>
              <Progress value={automationScore} className="h-2" />
            </div>
          </div>

          {/* Live Stats */}
          <div className="grid grid-cols-2 md:grid-cols-1 gap-3">
            <div className="flex items-center gap-2 bg-card/80 rounded-lg p-3">
              <div className="w-8 h-8 rounded-full bg-violet-500/20 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-violet-500" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Tasks Automated</p>
                <p className="font-bold text-lg">{tasksAutomated.toLocaleString()}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-card/80 rounded-lg p-3">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <Clock className="w-4 h-4 text-emerald-500" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Hours Saved</p>
                <p className="font-bold text-lg">{hoursSaved}h</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
