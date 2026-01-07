import { Bot, Phone, Mail, Calendar, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";

interface ActivityItem {
  id: string;
  type: "call" | "email" | "booking" | "lead";
  title: string;
  description: string;
  status: "success" | "pending" | "failed";
  timestamp: Date;
  automation: string;
}

const mockActivity: ActivityItem[] = [
  {
    id: "1",
    type: "call",
    title: "Inbound Call Handled",
    description: "New client inquiry - routed to sales",
    status: "success",
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    automation: "AI Receptionist"
  },
  {
    id: "2",
    type: "email",
    title: "Follow-up Sent",
    description: "Quote reminder to Acme Corp",
    status: "success",
    timestamp: new Date(Date.now() - 1000 * 60 * 23),
    automation: "Follow-Up Automation"
  },
  {
    id: "3",
    type: "booking",
    title: "Meeting Scheduled",
    description: "Demo call with TechStart Inc",
    status: "success",
    timestamp: new Date(Date.now() - 1000 * 60 * 45),
    automation: "Smart Scheduling"
  },
  {
    id: "4",
    type: "lead",
    title: "Lead Captured",
    description: "Website form submission processed",
    status: "pending",
    timestamp: new Date(Date.now() - 1000 * 60 * 60),
    automation: "AI Receptionist"
  },
  {
    id: "5",
    type: "call",
    title: "Voicemail Transcribed",
    description: "Message from returning customer",
    status: "success",
    timestamp: new Date(Date.now() - 1000 * 60 * 90),
    automation: "AI Receptionist"
  },
];

const getIcon = (type: string) => {
  switch (type) {
    case "call": return Phone;
    case "email": return Mail;
    case "booking": return Calendar;
    case "lead": return Bot;
    default: return Bot;
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "success": return CheckCircle;
    case "pending": return Clock;
    case "failed": return AlertCircle;
    default: return CheckCircle;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "success": return "text-green-500";
    case "pending": return "text-yellow-500";
    case "failed": return "text-red-500";
    default: return "text-gray-500";
  }
};

export function RecentActivityFeed() {
  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Bot className="w-5 h-5 text-primary" />
            Recent Activity
          </CardTitle>
          <Badge variant="outline">Live</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-1">
        {mockActivity.map((item, index) => {
          const Icon = getIcon(item.type);
          const StatusIcon = getStatusIcon(item.status);
          
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Icon className="w-4 h-4 text-primary" />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-sm truncate">{item.title}</p>
                  <StatusIcon className={`w-3 h-3 shrink-0 ${getStatusColor(item.status)}`} />
                </div>
                <p className="text-xs text-muted-foreground truncate">{item.description}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="secondary" className="text-[10px] h-5">
                    {item.automation}
                  </Badge>
                  <span className="text-[10px] text-muted-foreground/60">
                    {formatDistanceToNow(item.timestamp, { addSuffix: true })}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </CardContent>
    </Card>
  );
}
