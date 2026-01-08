import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Search, Bell, Menu, ChevronLeft, ChevronRight, Settings, LogOut, User, ChevronDown, Command } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { CyberSidebar } from "@/components/admin/neon/CyberSidebar";
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

export default function Admin() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [tasks, setTasks] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
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
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

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
  };

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      toast({ 
        title: "👋 Signed Out Successfully",
        description: "You've been securely logged out."
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

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const handleBack = () => window.history.back();
  const handleForward = () => window.history.forward();

  const totalNotifications = moduleStats.pendingBookings + moduleStats.pendingApplications + moduleStats.unreadMessages;

  return (
    <div className="flex min-h-screen bg-[#0B0F19] w-full overflow-x-hidden">
      {/* Cyber Sidebar */}
      <CyberSidebar 
        isOpen={sidebarOpen} 
        isMobileOpen={mobileSidebarOpen}
        onMobileClose={() => setMobileSidebarOpen(false)}
      />
      
      {/* Top Bar */}
      <header className={`fixed top-0 right-0 left-0 h-16 bg-[#111827]/95 backdrop-blur-xl border-b border-gray-800 z-40 
        transition-all duration-300 ${sidebarOpen ? 'md:left-[260px]' : 'md:left-[70px]'}`}>
        <div className="flex items-center justify-between h-full px-4 lg:px-6">
          {/* Left - Menu Toggle + Nav + Search */}
          <div className="flex items-center gap-4 flex-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                if (window.innerWidth < 768) {
                  setMobileSidebarOpen(!mobileSidebarOpen);
                } else {
                  setSidebarOpen(!sidebarOpen);
                }
              }}
              className="text-[#9CA3AF] hover:text-[#F9FAFB] hover:bg-gray-800"
            >
              <Menu className="w-5 h-5" />
            </Button>
            
            {/* Back/Forward Navigation */}
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleBack}
                className="text-[#9CA3AF] hover:text-[#F9FAFB] hover:bg-gray-800 h-9 w-9"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleForward}
                className="text-[#9CA3AF] hover:text-[#F9FAFB] hover:bg-gray-800 h-9 w-9"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
            
            {/* Search Bar */}
            <div className="relative hidden sm:block max-w-md flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9CA3AF]" />
              <Input
                type="text"
                placeholder="Search threats, devices..."
                className="pl-10 bg-[#374151] border-gray-700 text-[#F9FAFB] placeholder:text-[#9CA3AF] 
                  focus:border-[#3B82F6] focus:ring-[#3B82F6]/20 h-10 rounded-lg"
              />
            </div>
          </div>

          {/* Right - Notifications + Settings + Profile */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/admin/notifications")}
              className="relative text-[#9CA3AF] hover:text-[#F9FAFB] hover:bg-gray-800"
            >
              <Bell className="h-5 w-5" />
              {totalNotifications > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-[#EF4444] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {totalNotifications > 9 ? '9+' : totalNotifications}
                </span>
              )}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/admin/settings")}
              className="text-[#9CA3AF] hover:text-[#F9FAFB] hover:bg-gray-800"
            >
              <Settings className="h-5 w-5" />
            </Button>
            
            {/* Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 pl-3 border-l border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800/50">
                  <Avatar className="w-8 h-8 bg-gradient-to-br from-[#3B82F6] to-[#06B6D4]">
                    <AvatarFallback className="text-xs text-white bg-transparent">
                      {getInitials(adminName)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden md:inline text-sm">{adminName}</span>
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-[#1F2937] border-gray-800">
                <DropdownMenuItem 
                  className="text-gray-300 focus:bg-gray-800 focus:text-white cursor-pointer"
                  onClick={() => navigate("/admin/settings")}
                >
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="text-gray-300 focus:bg-gray-800 focus:text-white cursor-pointer"
                  onClick={() => navigate("/admin/settings")}
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
        </div>
      </header>
      
      {/* Main Content */}
      <main className={`flex-1 transition-all duration-300 pt-16 w-full ${sidebarOpen ? 'md:ml-[260px]' : 'md:ml-[70px]'}`}>
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

          {/* Live Monitor Cards - 4 Mini-Charts */}
          <CyberGuardianStats />

          {/* Admin Modules Grid */}
          <div className="mb-6">
            <NeonAdminModules stats={moduleStats} />
          </div>

          {/* Operations Stats */}
          <div className="mb-6">
            <NeonOperationsStats stats={stats} />
          </div>

          {/* Charts Grid - Main Row */}
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
      </main>
    </div>
  );
}
