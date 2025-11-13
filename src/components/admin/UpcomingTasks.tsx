import { useState, useEffect } from "react";
import { Calendar, AlertTriangle, User, Bell, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatDistanceToNow, addDays, isToday, isThisWeek } from "date-fns";

type TaskStatus = "scheduled" | "expiring" | "pending" | "urgent";

interface Task {
  id: string;
  type: "article" | "subscription" | "approval" | "followup";
  icon: React.ComponentType<{ className?: string }>;
  text: string;
  date: Date;
  status: TaskStatus;
  actionable?: boolean;
  metadata?: any;
}

const statusConfig = {
  scheduled: { label: "Scheduled", color: "bg-blue-100 text-blue-700" },
  expiring: { label: "Expiring", color: "bg-yellow-100 text-yellow-700" },
  pending: { label: "Pending", color: "bg-orange-100 text-orange-700" },
  urgent: { label: "Urgent", color: "bg-red-100 text-red-700" },
};

export function UpcomingTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<"all" | "today" | "week">("all");
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const allTasks: Task[] = [];

      // Fetch expiring subscriptions
      const { data: subscriptions } = await supabase
        .from("subscriptions")
        .select("*, profiles(first_name, last_name)")
        .eq("status", "active")
        .gte("end_date", new Date().toISOString())
        .lte("end_date", addDays(new Date(), 7).toISOString())
        .order("end_date", { ascending: true });

      subscriptions?.forEach((sub) => {
        const name = sub.profiles
          ? `${sub.profiles.first_name} ${sub.profiles.last_name}`
          : "Unknown Client";
        allTasks.push({
          id: `sub-${sub.id}`,
          type: "subscription",
          icon: AlertTriangle,
          text: `${name} subscription expires`,
          date: new Date(sub.end_date),
          status: "expiring",
          metadata: sub,
        });
      });

      // Fetch pending booking requests
      const { data: bookings } = await supabase
        .from("booking_requests")
        .select("*")
        .eq("status", "pending")
        .order("created_at", { ascending: false })
        .limit(5);

      bookings?.forEach((booking) => {
        allTasks.push({
          id: `booking-${booking.id}`,
          type: "approval",
          icon: User,
          text: `Booking request from ${booking.full_name}`,
          date: new Date(booking.created_at),
          status: "pending",
          actionable: true,
          metadata: booking,
        });
      });

      // Fetch pending testimonials
      const { data: testimonials } = await supabase
        .from("testimonials")
        .select("*")
        .eq("status", "pending")
        .order("submitted_at", { ascending: false })
        .limit(5);

      testimonials?.forEach((testimonial) => {
        allTasks.push({
          id: `testimonial-${testimonial.id}`,
          type: "approval",
          icon: User,
          text: `Testimonial approval from ${testimonial.name}`,
          date: new Date(testimonial.submitted_at),
          status: "pending",
          actionable: true,
          metadata: testimonial,
        });
      });

      // Add some mock follow-up tasks (in real app, these would come from a tasks table)
      const mockFollowups = [
        {
          id: "followup-1",
          type: "followup" as const,
          icon: Bell,
          text: "Follow up with high-value client inquiry",
          date: new Date(),
          status: "urgent" as TaskStatus,
        },
      ];

      allTasks.push(...mockFollowups);

      // Sort by date
      const sortedTasks = allTasks.sort((a, b) => a.date.getTime() - b.date.getTime());
      setTasks(sortedTasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      toast({
        title: "Error",
        description: "Failed to load upcoming tasks",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (task: Task) => {
    try {
      if (task.type === "approval") {
        if (task.metadata.status !== undefined) {
          // It's a booking request
          await supabase
            .from("booking_requests")
            .update({ status: "approved" })
            .eq("id", task.metadata.id);
        } else {
          // It's a testimonial
          await supabase
            .from("testimonials")
            .update({ status: "approved", approved_at: new Date().toISOString() })
            .eq("id", task.metadata.id);
        }

        toast({
          title: "Approved",
          description: "Task has been approved successfully",
        });

        // Remove from list
        setTasks((prev) => prev.filter((t) => t.id !== task.id));
      }
    } catch (error) {
      console.error("Error approving task:", error);
      toast({
        title: "Error",
        description: "Failed to approve task",
        variant: "destructive",
      });
    }
  };

  const handleDeny = async (task: Task) => {
    try {
      if (task.type === "approval") {
        if (task.metadata.status !== undefined) {
          // It's a booking request
          await supabase
            .from("booking_requests")
            .update({ status: "declined" })
            .eq("id", task.metadata.id);
        } else {
          // It's a testimonial
          await supabase
            .from("testimonials")
            .update({ status: "rejected" })
            .eq("id", task.metadata.id);
        }

        toast({
          title: "Denied",
          description: "Task has been denied",
        });

        // Remove from list
        setTasks((prev) => prev.filter((t) => t.id !== task.id));
      }
    } catch (error) {
      console.error("Error denying task:", error);
      toast({
        title: "Error",
        description: "Failed to deny task",
        variant: "destructive",
      });
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "today") return isToday(task.date);
    if (filter === "week") return isThisWeek(task.date, { weekStartsOn: 0 });
    return true;
  });

  const getDateDisplay = (date: Date) => {
    if (isToday(date)) {
      return "Today";
    }
    return formatDistanceToNow(date, { addSuffix: true });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="bg-background rounded-xl border border-border shadow-sm p-5 mt-8"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-bold text-foreground">Upcoming Tasks</h2>
        </div>

        <Select value={filter} onValueChange={(value: any) => setFilter(value)}>
          <SelectTrigger className="w-[130px] h-9">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="week">This Week</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Tasks List */}
      <div className="space-y-0 max-h-[500px] overflow-y-auto custom-scrollbar">
        {loading ? (
          // Loading skeleton
          <div className="space-y-0">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-start gap-3 py-3 border-b border-border">
                <div className="w-8 h-8 rounded-full bg-muted shimmer" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-muted rounded w-3/4 shimmer" />
                  <div className="h-3 bg-muted rounded w-1/4 shimmer" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredTasks.length > 0 ? (
          <AnimatePresence mode="popLayout">
            {filteredTasks.map((task, index) => {
              const Icon = task.icon;
              const statusInfo = statusConfig[task.status];

              return (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="flex items-start gap-3 py-3 px-2 border-b border-border hover:bg-muted/30 transition-colors"
                >
                  {/* Icon */}
                  <div className="w-8 h-8 rounded-full bg-muted/50 flex items-center justify-center flex-shrink-0 mt-1">
                    <Icon className="h-4 w-4 text-muted-foreground" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground mb-1">
                      {task.text}
                    </p>
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-xs text-muted-foreground">
                        {getDateDisplay(task.date)}
                      </p>
                      <Badge variant="secondary" className={`text-xs ${statusInfo.color}`}>
                        {statusInfo.label}
                      </Badge>
                    </div>

                    {/* Action Buttons for Approvals */}
                    {task.actionable && (
                      <div className="flex gap-2 mt-2">
                        <Button
                          size="sm"
                          variant="default"
                          onClick={() => handleApprove(task)}
                          className="h-7 text-xs"
                        >
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeny(task)}
                          className="h-7 text-xs"
                        >
                          Deny
                        </Button>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        ) : (
          <div className="text-center py-12">
            <CheckCircle2 className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-sm font-medium text-muted-foreground mb-1">
              No tasks found
            </p>
            <p className="text-sm text-muted-foreground">
              All caught up! 🎉
            </p>
          </div>
        )}
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: hsl(var(--muted));
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: hsl(var(--muted-foreground) / 0.3);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: hsl(var(--muted-foreground) / 0.5);
        }
        
        .shimmer {
          background: linear-gradient(
            90deg,
            hsl(var(--muted)) 0%,
            hsl(var(--muted-foreground) / 0.1) 50%,
            hsl(var(--muted)) 100%
          );
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
        }
        
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
      `}</style>
    </motion.div>
  );
}
