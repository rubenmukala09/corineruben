import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Command } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

import { CyberGuardianStats } from "@/components/admin/neon/CyberGuardianStats";
import { GlobalThreatActivityChart } from "@/components/admin/neon/GlobalThreatActivityChart";
import { AttackVectorBarChart } from "@/components/admin/neon/AttackVectorBarChart";
import { DeviceSecurityShield } from "@/components/admin/neon/DeviceSecurityShield";
import { CyberRecentAlerts } from "@/components/admin/neon/CyberRecentAlerts";
import { NeonOperationsStats } from "@/components/admin/neon/NeonOperationsStats";
import { NeonManagementTabs } from "@/components/admin/neon/NeonManagementTabs";
import { NeonTasksCard } from "@/components/admin/neon/NeonTasksCard";
import { NeonEventsCard } from "@/components/admin/neon/NeonEventsCard";
import { NeonTeamOverview } from "@/components/admin/neon/NeonTeamOverview";
import { NeonCalendarCard } from "@/components/admin/neon/NeonCalendarCard";
import { NeonQuickActions } from "@/components/admin/neon/NeonQuickActions";
import { NeonAdminModules } from "@/components/admin/neon/NeonAdminModules";
import { NeonSystemHealth } from "@/components/admin/neon/NeonSystemHealth";
import { NeonAccountActions } from "@/components/admin/neon/NeonAccountActions";
import { NeonPendingRequests } from "@/components/admin/neon/NeonPendingRequests";
import { NeonDashboardLinks } from "@/components/admin/neon/NeonDashboardLinks";
import { PageSkeleton } from "@/components/admin/PageSkeleton";

// Dashboard content - no shell wrapper (shell is in AdminShell via Outlet)
export default function AdminDashboardContent() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [tasks, setTasks] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [moduleStats, setModuleStats] = useState({
    pendingBookings: 0,
    pendingInquiries: 0,
    pendingApplications: 0,
    unreadMessages: 0,
    lowStockProducts: 0,
  });
  const [stats, setStats] = useState({
    totalStaff: 0,
    activeProjects: 0,
    pendingTasks: 0,
    upcomingEvents: 0,
    newsletterSubscribers: 0,
  });

  useEffect(() => {
    loadDashboardData();
    loadModuleStats();
  }, []);

  const loadModuleStats = async () => {
    try {
      const { count: bookingsCount } = await supabase
        .from("booking_requests")
        .select("*", { count: "exact", head: true })
        .eq("status", "pending");

      const { count: applicationsCount } = await supabase
        .from("job_applications")
        .select("*", { count: "exact", head: true })
        .eq("status", "pending");

      const { count: messagesCount } = await supabase
        .from("internal_messages")
        .select("*", { count: "exact", head: true })
        .eq("is_read", false);

      setModuleStats({
        pendingBookings: bookingsCount || 0,
        pendingInquiries: 0,
        pendingApplications: applicationsCount || 0,
        unreadMessages: messagesCount || 0,
        lowStockProducts: 0,
      });
    } catch (err) {
      console.error("Error loading module stats:", err);
    }
  };

  const loadDashboardData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setLoading(false);
        return;
      }

      const { data: tasksData } = await supabase
        .from("admin_tasks")
        .select("*")
        .eq("user_id", user.id)
        .order("due_date", { ascending: true })
        .limit(5);

      if (tasksData) setTasks(tasksData);

      const { data: eventsData } = await supabase
        .from("admin_events")
        .select("*")
        .eq("user_id", user.id)
        .gte("start_time", new Date().toISOString())
        .order("start_time", { ascending: true })
        .limit(5);

      if (eventsData) setEvents(eventsData);

      const { count: staffCount } = await supabase
        .from("user_roles")
        .select("*", { count: "exact", head: true })
        .in("role", ["staff", "trainer", "developer", "analyst", "healthcare", "caregiver"]);

      const { count: projectsCount } = await supabase
        .from("jobs")
        .select("*", { count: "exact", head: true })
        .in("status", ["Pending", "In Progress"]);

      const { count: subscriberCount } = await supabase
        .from("newsletter_subscribers")
        .select("*", { count: "exact", head: true });

      setStats({
        totalStaff: staffCount || 0,
        activeProjects: projectsCount || 0,
        pendingTasks: tasksData?.length || 0,
        upcomingEvents: eventsData?.length || 0,
        newsletterSubscribers: subscriberCount || 0,
      });
    } catch (err) {
      console.error("Error loading dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <PageSkeleton variant="dashboard" />;
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-gradient-to-br from-[#3B82F6] to-[#06B6D4] rounded-lg flex items-center justify-center shadow-lg shadow-[#3B82F6]/20">
            <Command className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold text-[#F9FAFB]">
                Security Command Center
              </h1>
              {/* Live Status Badge */}
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#10B981]/10 border border-[#10B981]/30">
                <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                <span className="text-xs font-medium text-[#10B981]">LIVE</span>
              </div>
            </div>
            <p className="text-[#9CA3AF]">
              Real-time threat monitoring and family protection overview
            </p>
          </div>
        </div>
      </motion.div>

      {/* Live Monitor Cards */}
      <CyberGuardianStats />

      {/* Admin Modules Grid */}
      <div className="mb-6">
        <NeonAdminModules stats={moduleStats} />
      </div>

      {/* Operations Stats */}
      <div className="mb-6">
        <NeonOperationsStats stats={stats} />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <GlobalThreatActivityChart />
        </div>
        <div className="lg:col-span-1">
          <DeviceSecurityShield />
        </div>
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <AttackVectorBarChart />
        <CyberRecentAlerts />
      </div>

      {/* Management Tabs */}
      <div className="mb-6">
        <NeonManagementTabs />
      </div>

      {/* Three Column Layout */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          <NeonPendingRequests />
          <NeonTasksCard tasks={tasks} />
          <NeonEventsCard events={events} />
        </div>

        {/* Middle Column */}
        <div className="space-y-6">
          <NeonSystemHealth />
          <NeonTeamOverview />
          <NeonAccountActions />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <NeonCalendarCard date={date} onSelect={setDate} />
          <NeonDashboardLinks />
          <NeonQuickActions />
        </div>
      </div>
    </div>
  );
}
