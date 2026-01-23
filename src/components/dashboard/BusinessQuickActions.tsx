import { 
  Plus,
  Settings,
  BarChart3,
  FileText,
  Phone,
  Headphones,
  Rocket
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface QuickAction {
  icon: React.ElementType;
  label: string;
  description: string;
  color: string;
  action: () => void;
}

export function BusinessQuickActions() {
  const navigate = useNavigate();

  const quickActions: QuickAction[] = [
    {
      icon: Plus,
      label: "Add Automation",
      description: "Create new workflow",
      color: "from-violet-500 to-purple-600",
      action: () => navigate("/business/ai-automation")
    },
    {
      icon: BarChart3,
      label: "View Analytics",
      description: "Performance reports",
      color: "from-blue-500 to-cyan-600",
      action: () => {}
    },
    {
      icon: Phone,
      label: "Test Receptionist",
      description: "Make a test call",
      color: "from-green-500 to-emerald-600",
      action: () => {}
    },
    {
      icon: FileText,
      label: "View Leads",
      description: "Recent captures",
      color: "from-orange-500 to-amber-600",
      action: () => {}
    },
    {
      icon: Settings,
      label: "Settings",
      description: "Configure AI",
      color: "from-slate-500 to-slate-600",
      action: () => {}
    },
    {
      icon: Headphones,
      label: "Get Support",
      description: "Talk to an expert",
      color: "from-pink-500 to-rose-600",
      action: () => navigate("/contact")
    },
  ];

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Rocket className="w-5 h-5 text-primary" />
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {quickActions.map((action, index) => (
            <motion.div
              key={action.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Button
                variant="outline"
                className="w-full h-auto flex flex-col items-center gap-2 p-4 hover:shadow-md transition-all group"
                onClick={action.action}
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <action.icon className="w-5 h-5 text-white" />
                </div>
                <div className="text-center">
                  <p className="font-medium text-sm">{action.label}</p>
                  <p className="text-xs text-muted-foreground">{action.description}</p>
                </div>
              </Button>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
