import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw, ExternalLink } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { formatDistanceToNow } from "date-fns";

interface Activity {
  id: string;
  type: "inquiry" | "booking" | "testimonial" | "order" | "subscription";
  icon: string;
  iconBg: string;
  description: string;
  timestamp: Date;
  link?: string;
}

export function RecentActivity() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [newActivityIds, setNewActivityIds] = useState<Set<string>>(new Set());
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    fetchActivities();

    // Auto-refresh every 30 seconds
    const interval = setInterval(() => {
      fetchActivities(true);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const fetchActivities = async (silent = false) => {
    try {
      if (!silent) {
        setLoading(true);
      } else {
        setRefreshing(true);
      }

      const allActivities: Activity[] = [];

      // Fetch website inquiries
      const { data: inquiries } = await supabase
        .from("website_inquiries")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(10);

      inquiries?.forEach((inquiry) => {
        allActivities.push({
          id: `inquiry-${inquiry.id}`,
          type: "inquiry",
          icon: "💬",
          iconBg: "bg-blue-500",
          description: `New contact form from ${inquiry.name || inquiry.email}`,
          timestamp: new Date(inquiry.created_at),
          link: `/admin/messages`,
        });
      });

      // Fetch booking requests
      const { data: bookings } = await supabase
        .from("booking_requests")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(10);

      bookings?.forEach((booking) => {
        allActivities.push({
          id: `booking-${booking.id}`,
          type: "booking",
          icon: "🛒",
          iconBg: "bg-green-500",
          description: `New booking request #${booking.request_number} - ${booking.service_name}`,
          timestamp: new Date(booking.created_at),
          link: `/admin/bookings`,
        });
      });

      // Fetch testimonials
      const { data: testimonials } = await supabase
        .from("testimonials")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(10);

      testimonials?.forEach((testimonial) => {
        allActivities.push({
          id: `testimonial-${testimonial.id}`,
          type: "testimonial",
          icon: "⭐",
          iconBg: "bg-yellow-500",
          description: `New testimonial from ${testimonial.name}`,
          timestamp: new Date(testimonial.created_at),
          link: `/admin/testimonials`,
        });
      });

      // Fetch recent subscriptions
      const { data: subscriptions } = await supabase
        .from("subscriptions")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(10);

      subscriptions?.forEach((subscription) => {
        allActivities.push({
          id: `subscription-${subscription.id}`,
          type: "subscription",
          icon: "✨",
          iconBg: "bg-purple-500",
          description: `New subscription: ${subscription.plan_name}`,
          timestamp: new Date(subscription.created_at),
          link: `/admin/subscriptions`,
        });
      });

      // Fetch recent order items
      const { data: orders } = await supabase
        .from("order_items")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(10);

      orders?.forEach((order) => {
        allActivities.push({
          id: `order-${order.id}`,
          type: "order",
          icon: "💳",
          iconBg: "bg-green-600",
          description: `Payment received - $${Number(order.total).toLocaleString()}`,
          timestamp: new Date(order.created_at),
          link: `/admin/orders`,
        });
      });

      // Sort by timestamp and take top 20
      const sortedActivities = allActivities
        .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
        .slice(0, 20);

      setActivities(sortedActivities);

      if (silent) {
        // Show a subtle notification for new activities and highlight them
        const newActivities = sortedActivities.filter(
          (activity) => !activities.find((a) => a.id === activity.id)
        );
        
        if (newActivities.length > 0) {
          const newIds = new Set(newActivities.map(a => a.id));
          setNewActivityIds(newIds);
          
          // Remove highlight after 3 seconds
          setTimeout(() => {
            setNewActivityIds(new Set());
          }, 3000);
          
          toast({
            title: "New Activity",
            description: `${newActivities.length} new ${newActivities.length === 1 ? 'activity' : 'activities'}`,
          });
        }
      }
    } catch (error: any) {
      console.error("Error fetching activities:", error);
      if (!silent) {
        toast({
          title: "Error",
          description: "Failed to load recent activities",
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleActivityClick = (activity: Activity) => {
    if (activity.link) {
      navigate(activity.link);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <Card className="p-5 mt-8 rounded-xl shadow-sm">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-foreground">Recent Activity</h2>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => fetchActivities()}
              disabled={refreshing}
              className="text-muted-foreground hover:text-foreground"
            >
              <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
            </Button>
            <Button
              variant="link"
              size="sm"
              onClick={() => navigate("/admin/activity")}
              className="text-accent hover:text-accent/80"
            >
              View All
            </Button>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
          {loading ? (
            // Loading skeleton with shimmer
            <div className="space-y-0">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-start gap-3 py-3 border-b border-border">
                  <div className="w-10 h-10 rounded-full bg-muted shimmer" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-muted rounded w-3/4 shimmer" />
                    <div className="h-3 bg-muted rounded w-1/4 shimmer" />
                  </div>
                </div>
              ))}
            </div>
          ) : activities.length > 0 ? (
            <AnimatePresence mode="popLayout">
              {activities.map((activity, index) => {
                const isNew = newActivityIds.has(activity.id);
                return (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ 
                      opacity: 1, 
                      x: 0,
                      backgroundColor: isNew ? "hsl(var(--accent) / 0.2)" : "transparent"
                    }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ 
                      duration: 0.3, 
                      delay: index * 0.05,
                      backgroundColor: { duration: 3, ease: "easeOut" }
                    }}
                    onClick={() => handleActivityClick(activity)}
                    className={`flex items-start gap-3 py-3 px-3 border-b border-border transition-all duration-200 ${
                      activity.link ? "cursor-pointer hover:bg-muted/50" : ""
                    }`}
                  >
                    {/* Icon */}
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${activity.iconBg}`}
                    >
                      <span className="text-lg">{activity.icon}</span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {activity.description}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {formatDistanceToNow(activity.timestamp, { addSuffix: true })}
                      </p>
                    </div>

                    {/* Link indicator */}
                    {activity.link && (
                      <ExternalLink className="h-4 w-4 text-muted-foreground flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          ) : (
            <div className="text-center py-12">
              <div className="text-5xl mb-3">📊</div>
              <p className="text-sm font-medium text-muted-foreground mb-1">
                No recent activity
              </p>
              <p className="text-sm text-muted-foreground">
                All caught up! 🎉
              </p>
            </div>
          )}
        </div>
      </Card>

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
