import { 
  Phone, 
  Calendar, 
  FileText, 
  Shield, 
  GraduationCap, 
  MessageCircle,
  Settings,
  HelpCircle
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

export function QuickActionsGrid({ onBookAppointment }: { onBookAppointment: () => void }) {
  const navigate = useNavigate();

  const quickActions: QuickAction[] = [
    {
      icon: Phone,
      label: "Emergency Support",
      description: "24/7 hotline",
      color: "from-red-500 to-rose-600",
      action: () => window.location.href = "tel:+1-800-SCAM-HELP"
    },
    {
      icon: Calendar,
      label: "Book Training",
      description: "1-on-1 session",
      color: "from-blue-500 to-cyan-600",
      action: onBookAppointment
    },
    {
      icon: GraduationCap,
      label: "My Courses",
      description: "Your training",
      color: "from-purple-500 to-violet-600",
      action: () => navigate("/portal/my-courses")
    },
    {
      icon: Calendar,
      label: "My Bookings",
      description: "Appointments",
      color: "from-teal-500 to-cyan-600",
      action: () => navigate("/portal/my-bookings")
    },
    {
      icon: Shield,
      label: "Report a Scam",
      description: "Help others",
      color: "from-orange-500 to-amber-600",
      action: () => navigate("/contact")
    },
    {
      icon: FileText,
      label: "Resources",
      description: "Guides & tools",
      color: "from-green-500 to-emerald-600",
      action: () => navigate("/resources")
    },
    {
      icon: MessageCircle,
      label: "Get Help",
      description: "Chat support",
      color: "from-pink-500 to-rose-600",
      action: () => navigate("/contact")
    },
  ];

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-primary" />
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
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
