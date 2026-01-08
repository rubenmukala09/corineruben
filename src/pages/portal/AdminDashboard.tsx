import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Settings, Bell, Search, LogOut, User, ChevronDown, Command } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AdminSidebar } from "@/components/AdminSidebar";
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
import { ThreatActivityChart } from "@/components/admin/neon/ThreatActivityChart";
import { NeonDashboardStats } from "@/components/admin/neon/NeonDashboardStats";

function AdminDashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [tasks, setTasks] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [adminName, setAdminName] = useState("Admin");
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
    loadUserProfile();
    loadModuleStats();
  }, []);

  const loadUserProfile = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("first_name, last_name")
        .eq("id", user.id)
        .single();
      
      if (profile) {
        setAdminName(`${profile.first_name || ''} ${profile.last_name || ''}`.trim() || 'Admin');
      }
    }
  };

  const loadModuleStats = async () => {
    try {
      // Count pending bookings
      const { count: bookingsCount } = await supabase
        .from("booking_requests")
        .select("*", { count: "exact", head: true })
        .eq("status", "pending");

      // Count pending job applications
      const { count: applicationsCount } = await supabase
        .from("job_applications")
        .select("*", { count: "exact", head: true })
        .eq("status", "pending");

      // Count unread messages
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

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      toast({ 
        title: "👋 Signed Out Successfully",
        description: "You've been securely logged out. See you next time!"
      });
      navigate("/auth");
    } catch (error: any) {
      toast({
        title: "Error signing out",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const loadDashboardData = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    // Load user's tasks
    const { data: tasksData } = await supabase
      .from("admin_tasks")
      .select("*")
      .eq("user_id", user.id)
      .order("due_date", { ascending: true })
      .limit(5);

    if (tasksData) setTasks(tasksData);

    // Load user's events
    const { data: eventsData } = await supabase
      .from("admin_events")
      .select("*")
      .eq("user_id", user.id)
      .gte("start_time", new Date().toISOString())
      .order("start_time", { ascending: true })
      .limit(5);

    if (eventsData) setEvents(eventsData);

    // Count staff members from user_roles table
    const { count: staffCount } = await supabase
      .from("user_roles")
      .select("*", { count: "exact", head: true })
      .in("role", ["staff", "trainer", "developer", "analyst", "healthcare", "caregiver"]);

    // Count active jobs as projects
    const { count: projectsCount } = await supabase
      .from("jobs")
      .select("*", { count: "exact", head: true })
      .in("status", ["Pending", "In Progress"]);

    // Count newsletter subscribers
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
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <div className="flex min-h-screen bg-[#111827] w-full">
      {/* Sidebar */}
      <AdminSidebar 
        isOpen={sidebarOpen} 
        isMobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />

      {/* Main Content */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen ? 'md:ml-[260px]' : 'md:ml-[80px]'}`}>
        {/* Top Bar */}
        <header className="sticky top-0 z-40 h-16 bg-[#111827]/95 backdrop-blur-xl border-b border-gray-800/50 flex items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-gray-400 hover:text-white hover:bg-gray-800/50"
              onClick={() => setMobileOpen(true)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </Button>
            
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <Input
                placeholder="Search everything..."
                className="w-80 pl-10 bg-[#1F2937] border-gray-800/50 text-gray-300 placeholder:text-gray-500 focus:border-purple-500/50 focus:ring-purple-500/20"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Notifications */}
            <Button
              variant="ghost"
              size="icon"
              className="relative text-gray-400 hover:text-white hover:bg-gray-800/50"
            >
              <Bell className="w-5 h-5" />
              {(moduleStats.pendingBookings + moduleStats.pendingApplications) > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {moduleStats.pendingBookings + moduleStats.pendingApplications}
                </span>
              )}
            </Button>

            {/* Settings */}
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:text-white hover:bg-gray-800/50"
              onClick={() => navigate("/admin/settings/site")}
            >
              <Settings className="w-5 h-5" />
            </Button>

            {/* Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 text-gray-300 hover:text-white hover:bg-gray-800/50">
                  <Avatar className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600">
                    <AvatarFallback className="text-xs text-white bg-transparent">
                      {getInitials(adminName)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden md:inline text-sm">{adminName}</span>
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-[#1F2937] border-gray-800">
                <DropdownMenuItem className="text-gray-300 focus:bg-gray-800 focus:text-white cursor-pointer">
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="text-gray-300 focus:bg-gray-800 focus:text-white cursor-pointer"
                  onClick={() => navigate("/admin/settings/site")}
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-gray-800" />
                <DropdownMenuItem 
                  className="text-red-400 focus:bg-red-500/20 focus:text-red-400 cursor-pointer"
                  onClick={handleSignOut}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <div className="flex items-center gap-3 mb-1">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center shadow-lg shadow-purple-500/20">
                <Command className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white">Command Center</h1>
                <p className="text-gray-400 text-sm">Central hub for all administrative operations</p>
              </div>
            </div>
          </motion.div>

          {/* Security Stats (from /admin) */}
          <div className="mb-6">
            <NeonDashboardStats />
          </div>

          {/* Admin Modules Grid */}
          <div className="mb-6">
            <NeonAdminModules stats={moduleStats} />
          </div>

          {/* Operations Stats */}
          <div className="mb-6">
            <NeonOperationsStats stats={stats} />
          </div>

          {/* Threat Activity Chart */}
          <div className="mb-6">
            <ThreatActivityChart />
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
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;
