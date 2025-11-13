import { useState, useEffect } from "react";
import { Calendar, AlertTriangle, User, Bell, CheckCircle2, Eye, Edit, Trash2, Clock, Plus, ArrowUpDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatDistanceToNow, addDays, isToday, isThisWeek, isPast, isFuture } from "date-fns";

type TaskStatus = "scheduled" | "expiring" | "pending" | "urgent";
type TaskPriority = "high" | "medium" | "low";
type SortOption = "priority" | "date" | "type";

interface Task {
  id: string;
  type: "article" | "subscription" | "approval" | "followup";
  icon: React.ComponentType<{ className?: string }>;
  text: string;
  date: Date;
  status: TaskStatus;
  priority: TaskPriority;
  actionable?: boolean;
  metadata?: any;
  completed?: boolean;
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
  const [sortBy, setSortBy] = useState<SortOption>("date");
  const [loading, setLoading] = useState(true);
  const [completingTasks, setCompletingTasks] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  useEffect(() => {
    fetchTasks();

    // Auto-refresh every 60 seconds
    const interval = setInterval(() => {
      fetchTasks();
    }, 60000);

    return () => clearInterval(interval);
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
          priority: "high",
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
          priority: "medium",
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
          priority: "low",
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
          priority: "high" as TaskPriority,
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

  const handleComplete = async (task: Task) => {
    setCompletingTasks((prev) => new Set(prev).add(task.id));

    // Show strikethrough animation
    setTimeout(() => {
      toast({
        title: "Task completed!",
        description: task.text,
      });

      // Remove task after animation
      setTimeout(() => {
        setTasks((prev) => prev.filter((t) => t.id !== task.id));
        setCompletingTasks((prev) => {
          const next = new Set(prev);
          next.delete(task.id);
          return next;
        });
      }, 2000);
    }, 300);
  };

  const handleDelete = async (task: Task) => {
    setTasks((prev) => prev.filter((t) => t.id !== task.id));
    toast({
      title: "Task deleted",
      description: "Task has been removed",
    });
  };

  const handleSnooze = async (task: Task) => {
    // Update task date to tomorrow
    setTasks((prev) =>
      prev.map((t) =>
        t.id === task.id ? { ...t, date: addDays(new Date(), 1) } : t
      )
    );
    toast({
      title: "Task snoozed",
      description: "Reminder set for tomorrow",
    });
  };

  const filteredTasks = tasks
    .filter((task) => !completingTasks.has(task.id))
    .filter((task) => {
      if (filter === "today") return isToday(task.date);
      if (filter === "week") return isThisWeek(task.date, { weekStartsOn: 0 });
      return true;
    });

  // Sort tasks
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === "priority") {
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    if (sortBy === "date") {
      return a.date.getTime() - b.date.getTime();
    }
    if (sortBy === "type") {
      return a.type.localeCompare(b.type);
    }
    return 0;
  });

  const getDateDisplay = (date: Date) => {
    if (isToday(date)) {
      return "Today";
    }
    return formatDistanceToNow(date, { addSuffix: true });
  };

  const getDateColor = (date: Date) => {
    if (isPast(date) && !isToday(date)) {
      return "text-red-500"; // Overdue
    }
    if (isToday(date)) {
      return "text-yellow-600"; // Due today
    }
    if (isThisWeek(date, { weekStartsOn: 0 })) {
      return "text-blue-500"; // Upcoming this week
    }
    return "text-muted-foreground"; // Future
  };

  const getIconColor = (date: Date) => {
    if (isPast(date) && !isToday(date)) {
      return "text-red-500 bg-red-50"; // Overdue
    }
    if (isToday(date)) {
      return "text-yellow-600 bg-yellow-50"; // Due today
    }
    if (isThisWeek(date, { weekStartsOn: 0 })) {
      return "text-blue-500 bg-blue-50"; // Upcoming this week
    }
    return "text-muted-foreground bg-muted/50"; // Future
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

        <div className="flex items-center gap-2">
          {/* Sort Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-9">
                <ArrowUpDown className="h-4 w-4 mr-2" />
                Sort
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setSortBy("priority")}>
                By Priority
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("date")}>
                By Due Date
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("type")}>
                By Type
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Filter Dropdown */}
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
        ) : sortedTasks.length > 0 ? (
          <AnimatePresence mode="popLayout">
            {sortedTasks.map((task, index) => {
              const Icon = task.icon;
              const statusInfo = statusConfig[task.status];
              const isCompleting = completingTasks.has(task.id);

              return (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ 
                    opacity: isCompleting ? 0.5 : 1, 
                    x: 0,
                    scale: isCompleting ? 0.98 : 1,
                  }}
                  exit={{ opacity: 0, x: 100, height: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="flex items-start gap-3 py-3 px-2 border-b border-border hover:bg-muted/30 transition-colors group"
                >
                  {/* Checkbox */}
                  <Checkbox
                    checked={isCompleting}
                    onCheckedChange={() => handleComplete(task)}
                    className="mt-1.5"
                  />

                  {/* Icon */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${getIconColor(task.date)}`}>
                    <Icon className="h-4 w-4" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium mb-1 ${
                      isCompleting ? "line-through text-muted-foreground" : "text-foreground"
                    }`}>
                      {task.text}
                    </p>
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className={`text-xs ${getDateColor(task.date)}`}>
                        {getDateDisplay(task.date)}
                      </p>
                      <Badge variant="secondary" className={`text-xs ${statusInfo.color}`}>
                        {statusInfo.label}
                      </Badge>
                    </div>

                    {/* Action Buttons for Approvals */}
                    {task.actionable && !isCompleting && (
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

                  {/* Action Buttons */}
                  {!isCompleting && (
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 w-7 p-0 md:w-auto md:px-2"
                        onClick={() => {}}
                      >
                        <Eye className="h-3.5 w-3.5" />
                        <span className="hidden md:inline ml-1 text-xs">View</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 w-7 p-0 md:w-auto md:px-2"
                        onClick={() => {}}
                      >
                        <Edit className="h-3.5 w-3.5" />
                        <span className="hidden md:inline ml-1 text-xs">Edit</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 w-7 p-0 md:w-auto md:px-2"
                        onClick={() => handleSnooze(task)}
                      >
                        <Clock className="h-3.5 w-3.5" />
                        <span className="hidden md:inline ml-1 text-xs">Snooze</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 w-7 p-0 md:w-auto md:px-2 text-red-500 hover:text-red-600"
                        onClick={() => handleDelete(task)}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        <span className="hidden md:inline ml-1 text-xs">Delete</span>
                      </Button>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        ) : (
          <div className="text-center py-12">
            <div className="text-5xl mb-3">🎉</div>
            <p className="text-sm font-medium text-foreground mb-1">
              All done!
            </p>
            <p className="text-sm text-muted-foreground">
              No upcoming tasks
            </p>
          </div>
        )}
      </div>

      {/* Add Task Button */}
      <Button
        variant="outline"
        className="w-full mt-4 border-dashed"
        onClick={() => {
          toast({
            title: "Add Task",
            description: "Task creation feature coming soon!",
          });
        }}
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Task
      </Button>

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
