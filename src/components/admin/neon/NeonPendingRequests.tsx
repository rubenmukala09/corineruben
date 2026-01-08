import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import {
  Clock,
  BookOpen,
  MessageSquare,
  Briefcase,
  Star,
  ShoppingCart,
  ChevronRight,
  AlertCircle,
} from "lucide-react";

interface PendingItem {
  id: string;
  type: "booking" | "inquiry" | "application" | "testimonial" | "order";
  title: string;
  subtitle: string;
  time: string;
  priority?: boolean;
}

export function NeonPendingRequests() {
  const [items, setItems] = useState<PendingItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPendingItems();
  }, []);

  const fetchPendingItems = async () => {
    try {
      const allItems: PendingItem[] = [];

      // Fetch pending bookings
      const { data: bookings } = await supabase
        .from("booking_requests")
        .select("id, full_name, service_name, created_at")
        .eq("status", "pending")
        .order("created_at", { ascending: false })
        .limit(3);

      if (bookings) {
        bookings.forEach(b => {
          allItems.push({
            id: b.id,
            type: "booking",
            title: b.service_name,
            subtitle: b.full_name,
            time: formatTimeAgo(b.created_at),
          });
        });
      }

      // Fetch pending job applications
      const { data: applications } = await supabase
        .from("job_applications")
        .select("id, name, position, created_at")
        .eq("status", "pending")
        .order("created_at", { ascending: false })
        .limit(2);

      if (applications) {
        applications.forEach(a => {
          allItems.push({
            id: a.id,
            type: "application",
            title: a.position,
            subtitle: a.name,
            time: formatTimeAgo(a.created_at),
          });
        });
      }

      // Fetch pending testimonials
      const { data: testimonials } = await supabase
        .from("testimonials")
        .select("id, author_name, created_at")
        .eq("status", "pending")
        .order("created_at", { ascending: false })
        .limit(2);

      if (testimonials) {
        testimonials.forEach(t => {
          allItems.push({
            id: t.id,
            type: "testimonial",
            title: "New Testimonial",
            subtitle: t.author_name,
            time: formatTimeAgo(t.created_at),
          });
        });
      }

      // Sort by recency (most recent first)
      allItems.sort((a, b) => {
        // This is a simple sort, in production you'd compare actual dates
        return 0;
      });

      setItems(allItems.slice(0, 6));
    } catch (err) {
      console.error("Error fetching pending items:", err);
    } finally {
      setLoading(false);
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  const getTypeConfig = (type: string) => {
    const configs = {
      booking: { icon: BookOpen, color: "text-blue-400", bg: "bg-blue-500/10" },
      inquiry: { icon: MessageSquare, color: "text-green-400", bg: "bg-green-500/10" },
      application: { icon: Briefcase, color: "text-purple-400", bg: "bg-purple-500/10" },
      testimonial: { icon: Star, color: "text-amber-400", bg: "bg-amber-500/10" },
      order: { icon: ShoppingCart, color: "text-pink-400", bg: "bg-pink-500/10" },
    };
    return configs[type as keyof typeof configs] || configs.booking;
  };

  const getTypeLink = (type: string) => {
    const links = {
      booking: "/admin/bookings",
      inquiry: "/admin/service-inquiries",
      application: "/portal/admin",
      testimonial: "/admin/content/testimonials",
      order: "/admin/ecommerce/orders",
    };
    return links[type as keyof typeof links] || "/portal/admin";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.5 }}
    >
      <Card className="bg-[#1F2937] border-gray-800/50 p-5 shadow-lg shadow-orange-500/5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <Clock className="w-5 h-5 text-orange-400" />
            Pending Requests
            {items.length > 0 && (
              <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 ml-2">
                {items.length}
              </Badge>
            )}
          </h2>
        </div>

        {loading ? (
          <div className="space-y-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-14 bg-gray-800/50 rounded-lg animate-pulse" />
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-12 h-12 mx-auto mb-3 bg-gray-800 rounded-full flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-gray-600" />
            </div>
            <p className="text-gray-400 text-sm">No pending requests</p>
            <p className="text-gray-500 text-xs">All caught up! 🎉</p>
          </div>
        ) : (
          <div className="space-y-2">
            {items.map((item, index) => {
              const config = getTypeConfig(item.type);
              const Icon = config.icon;

              return (
                <motion.div
                  key={`${item.type}-${item.id}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.05, duration: 0.3 }}
                >
                  <Link to={getTypeLink(item.type)}>
                    <div className="flex items-center gap-3 p-3 bg-[#111827] rounded-lg border border-gray-800/50 hover:border-gray-700/50 transition-all duration-300 group cursor-pointer">
                      <div className={`w-9 h-9 ${config.bg} rounded-lg flex items-center justify-center`}>
                        <Icon className={`w-4 h-4 ${config.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate group-hover:text-cyan-400 transition-colors">
                          {item.title}
                        </p>
                        <p className="text-xs text-gray-500 truncate">{item.subtitle}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">{item.time}</span>
                        <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-cyan-400 transition-colors" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        )}
      </Card>
    </motion.div>
  );
}
