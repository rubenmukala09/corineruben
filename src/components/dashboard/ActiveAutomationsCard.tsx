import { 
  Phone, 
  MessageSquare, 
  Mail, 
  Calendar,
  Pause,
  Play,
  Settings,
  MoreVertical
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { motion } from "framer-motion";

interface Automation {
  id: string;
  name: string;
  type: "receptionist" | "followup" | "scheduling" | "support";
  status: "active" | "paused" | "error";
  tasksToday: number;
  successRate: number;
}

const mockAutomations: Automation[] = [
  {
    id: "1",
    name: "AI Receptionist",
    type: "receptionist",
    status: "active",
    tasksToday: 47,
    successRate: 98
  },
  {
    id: "2",
    name: "Follow-Up Automation",
    type: "followup",
    status: "active",
    tasksToday: 23,
    successRate: 95
  },
  {
    id: "3",
    name: "Smart Scheduling",
    type: "scheduling",
    status: "active",
    tasksToday: 12,
    successRate: 100
  },
  {
    id: "4",
    name: "Support Bot",
    type: "support",
    status: "paused",
    tasksToday: 0,
    successRate: 92
  },
];

const getIcon = (type: string) => {
  switch (type) {
    case "receptionist": return Phone;
    case "followup": return Mail;
    case "scheduling": return Calendar;
    case "support": return MessageSquare;
    default: return Phone;
  }
};

const getGradient = (type: string) => {
  switch (type) {
    case "receptionist": return "from-blue-500 to-cyan-500";
    case "followup": return "from-orange-500 to-amber-500";
    case "scheduling": return "from-green-500 to-emerald-500";
    case "support": return "from-purple-500 to-violet-500";
    default: return "from-gray-500 to-gray-600";
  }
};

export function ActiveAutomationsCard() {
  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Settings className="w-5 h-5 text-primary animate-spin-slow" />
            Active Automations
          </CardTitle>
          <Badge variant="secondary" className="bg-green-500/10 text-green-600">
            {mockAutomations.filter(a => a.status === "active").length} Running
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {mockAutomations.map((automation, index) => {
          const Icon = getIcon(automation.type);
          const isActive = automation.status === "active";
          
          return (
            <motion.div
              key={automation.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 rounded-xl border transition-all ${
                isActive ? "bg-card hover:shadow-md" : "bg-muted/30 opacity-60"
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${getGradient(automation.type)} flex items-center justify-center`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold">{automation.name}</p>
                    {automation.status === "error" && (
                      <Badge variant="destructive" className="text-xs">Error</Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                    <span>{automation.tasksToday} tasks today</span>
                    <span>•</span>
                    <span className={automation.successRate >= 95 ? "text-green-600" : "text-yellow-600"}>
                      {automation.successRate}% success
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Switch checked={isActive} />
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </CardContent>
    </Card>
  );
}
