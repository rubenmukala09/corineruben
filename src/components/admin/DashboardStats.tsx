import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { DashboardStatCard } from "./DashboardStatCard";
import { Users, DollarSign, RefreshCw, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DashboardData {
  totalClients: number;
  revenueThisMonth: number;
  activeSubscriptions: number;
  pendingActions: number;
  newClientsThisMonth: number;
  revenueGrowth: number;
  expiringSoon: number;
}

export function DashboardStats() {
  const [data, setData] = useState<DashboardData>({
    totalClients: 0,
    revenueThisMonth: 0,
    activeSubscriptions: 0,
    pendingActions: 0,
    newClientsThisMonth: 0,
    revenueGrowth: 0,
    expiringSoon: 0,
  });
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchDashboardData();

    // Set up realtime subscriptions
    const channel = supabase
      .channel('dashboard-updates')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'testimonials' }, fetchDashboardData)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'booking_requests' }, fetchDashboardData)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'website_inquiries' }, fetchDashboardData)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'partner_orders' }, fetchDashboardData)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'clients' }, fetchDashboardData)
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      // Get current month dates
      const now = new Date();
      const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);

      // Fetch total clients
      const { count: totalClients } = await supabase
        .from("clients")
        .select("*", { count: "exact", head: true });

      // Fetch new clients this month
      const { count: newClientsThisMonth } = await supabase
        .from("clients")
        .select("*", { count: "exact", head: true })
        .gte("created_at", firstDayOfMonth.toISOString());

      // Fetch active subscriptions
      const { count: activeSubscriptions } = await supabase
        .from("subscriptions")
        .select("*", { count: "exact", head: true })
        .eq("status", "active");

      // Fetch subscriptions expiring in next 30 days
      const thirtyDaysFromNow = new Date();
      thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
      
      const { count: expiringSoon } = await supabase
        .from("subscriptions")
        .select("*", { count: "exact", head: true })
        .eq("status", "active")
        .lte("end_date", thirtyDaysFromNow.toISOString())
        .gte("end_date", now.toISOString());

      // Calculate revenue this month (from order_items)
      const { data: orderItemsThisMonth } = await supabase
        .from("order_items")
        .select("total")
        .gte("created_at", firstDayOfMonth.toISOString());

      const revenueThisMonth = orderItemsThisMonth?.reduce(
        (sum, item) => sum + Number(item.total || 0),
        0
      ) || 0;

      // Calculate revenue last month for growth comparison
      const { data: orderItemsLastMonth } = await supabase
        .from("order_items")
        .select("total")
        .gte("created_at", lastMonth.toISOString())
        .lte("created_at", endOfLastMonth.toISOString());

      const revenueLastMonth = orderItemsLastMonth?.reduce(
        (sum, item) => sum + Number(item.total || 0),
        0
      ) || 0;

      const revenueGrowth = revenueLastMonth > 0
        ? ((revenueThisMonth - revenueLastMonth) / revenueLastMonth) * 100
        : 0;

      // Count pending actions (pending testimonials, booking requests, inquiries)
      const { count: pendingTestimonials } = await supabase
        .from("testimonials")
        .select("*", { count: "exact", head: true })
        .eq("status", "pending");

      const { count: pendingBookings } = await supabase
        .from("booking_requests")
        .select("*", { count: "exact", head: true })
        .eq("status", "pending");

      const { count: newInquiries } = await supabase
        .from("website_inquiries")
        .select("*", { count: "exact", head: true })
        .eq("status", "new");

      const pendingActions = (pendingTestimonials || 0) + (pendingBookings || 0) + (newInquiries || 0);

      setData({
        totalClients: totalClients || 0,
        revenueThisMonth,
        activeSubscriptions: activeSubscriptions || 0,
        pendingActions,
        newClientsThisMonth: newClientsThisMonth || 0,
        revenueGrowth,
        expiringSoon: expiringSoon || 0,
      });
    } catch (error: any) {
      console.error("Error fetching dashboard data:", error);
      toast({
        title: "Error",
        description: "Failed to load dashboard statistics",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 admin-stats-grid">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="h-40 sm:h-48 rounded-xl bg-muted/50 animate-shimmer"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 admin-stats-grid">
      <DashboardStatCard
        icon={Users}
        iconBgColor="bg-gradient-to-br from-accent/80 to-accent"
        title="Total Clients"
        value={data.totalClients}
        subtitle={`+${data.newClientsThisMonth} this month ↑`}
        subtitleColor="success"
        gradientFrom="hsl(var(--accent) / 0.1)"
        gradientTo="hsl(var(--accent) / 0.05)"
        index={0}
        link="/admin/clients"
      />

      <DashboardStatCard
        icon={DollarSign}
        iconBgColor="bg-gradient-to-br from-success/80 to-success"
        title="Revenue This Month"
        value={Math.round(data.revenueThisMonth)}
        subtitle={`${data.revenueGrowth >= 0 ? '+' : ''}${(data.revenueGrowth ?? 0).toFixed(1)}% vs last month ${data.revenueGrowth >= 0 ? '↑' : '↓'}`}
        subtitleColor={data.revenueGrowth >= 0 ? "success" : "destructive"}
        gradientFrom="hsl(var(--success) / 0.1)"
        gradientTo="hsl(var(--success) / 0.05)"
        index={1}
        prefix="$"
        showSparkline={true}
        link="/admin/orders"
      />

      <DashboardStatCard
        icon={RefreshCw}
        iconBgColor="bg-gradient-to-br from-primary/80 to-primary"
        title="Active Subscriptions"
        value={data.activeSubscriptions}
        subtitle={`${data.expiringSoon} expiring soon ⚠️`}
        subtitleColor="warning"
        gradientFrom="hsl(var(--primary) / 0.1)"
        gradientTo="hsl(var(--primary) / 0.05)"
        index={2}
        link="/admin/subscriptions"
      />

      <DashboardStatCard
        icon={AlertTriangle}
        iconBgColor="bg-gradient-to-br from-yellow-500/80 to-yellow-600"
        title="Requires Attention"
        value={data.pendingActions}
        subtitle="View all →"
        subtitleColor="warning"
        gradientFrom="hsl(var(--teal-100))"
        gradientTo="hsl(var(--teal-300))"
        index={3}
        isPulsing={data.pendingActions > 0}
        link="/admin/pending"
      />
    </div>
  );
}
