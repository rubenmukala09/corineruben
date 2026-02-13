import { useState, useEffect } from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

export function NotificationBell() {
  const navigate = useNavigate();
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    fetchUnreadCount();

    // Set up realtime subscriptions
    const channel = supabase
      .channel("notification-updates")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "testimonials",
          filter: "status=eq.pending",
        },
        fetchUnreadCount,
      )
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "booking_requests",
          filter: "status=eq.pending",
        },
        fetchUnreadCount,
      )
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "website_inquiries",
          filter: "status=in.(new,pending)",
        },
        fetchUnreadCount,
      )
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "job_applications",
          filter: "status=eq.pending",
        },
        fetchUnreadCount,
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchUnreadCount = async () => {
    try {
      const [testimonials, bookings, inquiries, applications] =
        await Promise.all([
          supabase
            .from("testimonials")
            .select("id", { count: "exact", head: true })
            .eq("status", "pending"),
          supabase
            .from("booking_requests")
            .select("id", { count: "exact", head: true })
            .eq("status", "pending"),
          supabase
            .from("website_inquiries")
            .select("id", { count: "exact", head: true })
            .in("status", ["new", "pending"]),
          supabase
            .from("job_applications")
            .select("id", { count: "exact", head: true })
            .eq("status", "pending"),
        ]);

      const total =
        (testimonials.count || 0) +
        (bookings.count || 0) +
        (inquiries.count || 0) +
        (applications.count || 0);

      setUnreadCount(total);
    } catch (error) {
      console.error("Error fetching unread count:", error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {unreadCount > 9 ? "9+" : unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel>Pending Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => navigate("/admin/pending")}>
          <div className="flex flex-col gap-1">
            <div className="font-medium">View All Pending Items</div>
            <div className="text-xs text-muted-foreground">
              {unreadCount} {unreadCount === 1 ? "item" : "items"} need your
              attention
            </div>
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => navigate("/admin/pending?tab=testimonials")}
        >
          Pending Testimonials
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => navigate("/admin/pending?tab=bookings")}
        >
          Pending Bookings
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => navigate("/admin/pending?tab=inquiries")}
        >
          New Inquiries
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate("/admin/team/applications")}>
          Job Applications
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
