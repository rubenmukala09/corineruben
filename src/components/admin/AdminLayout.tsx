import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  Menu,
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  User,
  Settings,
  LogOut,
  Home,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { PremiumSidebar } from "@/components/admin/PremiumSidebar";
import { NotificationBell } from "@/components/NotificationBell";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const INACTIVITY_TIMEOUT = 60 * 1000; // 1 minute

interface AdminLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  headerActions?: React.ReactNode;
  actions?: React.ReactNode;
  searchPlaceholder?: string;
  onSearch?: (value: string) => void;
}

export function AdminLayout({
  children,
  title,
  subtitle,
  headerActions,
  actions,
  searchPlaceholder = "Search...",
  onSearch,
}: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [adminName, setAdminName] = useState("Admin User");
  const [adminEmail, setAdminEmail] = useState("");

  const profileRef = useRef<HTMLDivElement>(null);
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignOut = useCallback(async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Signed Out",
        description: "You've been successfully logged out.",
      });
      navigate("/auth");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  }, [navigate, toast]);

  // Auto-logout after 1 minute of inactivity
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
    }
    inactivityTimerRef.current = setTimeout(() => {
      toast({
        title: "Session Expired",
        description: "You've been logged out due to inactivity.",
        variant: "destructive",
      });
      handleSignOut();
    }, INACTIVITY_TIMEOUT);
  }, [handleSignOut, toast]);

  useEffect(() => {
    const events = [
      "mousedown",
      "mousemove",
      "keydown",
      "scroll",
      "touchstart",
      "click",
    ];

    const handleActivity = () => resetInactivityTimer();

    events.forEach((event) => {
      document.addEventListener(event, handleActivity);
    });

    resetInactivityTimer(); // Start the timer

    return () => {
      events.forEach((event) => {
        document.removeEventListener(event, handleActivity);
      });
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
      }
    };
  }, [resetInactivityTimer]);

  useEffect(() => {
    const getUserInfo = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setAdminEmail(user.email || "");
        const { data: profile } = await supabase
          .from("profiles_safe")
          .select("first_name, last_name")
          .eq("id", user.id)
          .single();

        if (profile?.first_name || profile?.last_name) {
          setAdminName(
            `${profile.first_name || ""} ${profile.last_name || ""}`.trim(),
          );
        }
      }
    };
    getUserInfo();
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="flex min-h-screen bg-[#050508] w-full">
      {/* Premium background effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-violet-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[100px]" />
      </div>

      <PremiumSidebar
        isOpen={sidebarOpen}
        isMobileOpen={mobileSidebarOpen}
        onMobileClose={() => setMobileSidebarOpen(false)}
      />

      {/* Top Header Bar */}
      <header
        className={`fixed top-0 right-0 left-0 h-16 bg-[#0a0a0f]/90 backdrop-blur-2xl border-b border-white/[0.06] z-40 
        transition-all duration-500 ${sidebarOpen ? "md:left-[260px]" : "md:left-[70px]"}`}
      >
        <div className="flex items-center justify-between h-full px-4 lg:px-6">
          {/* Left Section: Menu, Nav, Search */}
          <div className="flex items-center gap-4 flex-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() =>
                window.innerWidth < 768
                  ? setMobileSidebarOpen(!mobileSidebarOpen)
                  : setSidebarOpen(!sidebarOpen)
              }
              className="text-white/60 hover:text-white hover:bg-white/10 rounded-xl"
            >
              <Menu className="w-5 h-5" />
            </Button>

            {/* Back/Forward Navigation */}
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => window.history.back()}
                className="text-white/60 hover:text-white hover:bg-white/10 h-9 w-9 rounded-xl"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => window.history.forward()}
                className="text-white/60 hover:text-white hover:bg-white/10 h-9 w-9 rounded-xl"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>

            {/* Search */}
            <div className="relative hidden sm:block max-w-md flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
              <Input
                type="text"
                placeholder={searchPlaceholder}
                onChange={(e) => onSearch?.(e.target.value)}
                className="pl-10 bg-white/[0.06] border-white/[0.08] text-white placeholder:text-white/40 h-10 rounded-xl focus:bg-white/[0.08] focus:border-white/[0.12] transition-all"
              />
            </div>
          </div>

          {/* Right Section: Home, Notifications & Profile */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/")}
              className="text-white/60 hover:text-white hover:bg-white/10 h-9 w-9 rounded-xl"
              title="Go to Home"
            >
              <Home className="h-5 w-5" />
            </Button>

            <NotificationBell />

            {/* Profile Dropdown */}
            <div className="relative" ref={profileRef}>
              <Button
                variant="ghost"
                className="flex items-center gap-2 h-10 text-white/60 hover:text-white hover:bg-white/10 rounded-xl"
                onClick={() => setProfileOpen(!profileOpen)}
              >
                <Avatar className="h-8 w-8 bg-gradient-to-br from-violet-500 to-fuchsia-500 shadow-lg shadow-violet-500/25">
                  <AvatarFallback className="bg-transparent text-white text-xs font-semibold">
                    {getInitials(adminName)}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden md:inline text-sm font-medium text-white">
                  {adminName}
                </span>
                <ChevronDown className="h-4 w-4 hidden sm:block text-white/40" />
              </Button>

              {profileOpen && (
                <div className="absolute right-0 top-full mt-2 w-64 bg-[#0f0f14]/95 backdrop-blur-2xl border border-white/[0.08] rounded-2xl shadow-2xl shadow-black/50 z-50 overflow-hidden">
                  {/* Decorative glow */}
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-violet-500/20 rounded-full blur-3xl pointer-events-none" />

                  <div className="relative p-4 border-b border-white/[0.06]">
                    <p className="font-medium text-white">{adminName}</p>
                    <p className="text-xs text-white/50">{adminEmail}</p>
                  </div>
                  <div className="relative p-2">
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-white/70 hover:text-white hover:bg-white/10 rounded-xl"
                      onClick={() => {
                        navigate("/admin/settings");
                        setProfileOpen(false);
                      }}
                    >
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-white/70 hover:text-white hover:bg-white/10 rounded-xl"
                      onClick={() => {
                        navigate("/admin/settings");
                        setProfileOpen(false);
                      }}
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Button>
                  </div>
                  <div className="relative p-2 border-t border-white/[0.06]">
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-xl"
                      onClick={handleSignOut}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main
        className={`relative flex-1 transition-all duration-500 pt-16 w-full ${sidebarOpen ? "md:ml-[260px]" : "md:ml-[70px]"}`}
      >
        <div className="p-6 lg:p-8">
          {/* Page Header */}
          {(title || headerActions) && (
            <div className="flex items-center justify-between mb-8">
              <div>
                {title && (
                  <h1 className="text-3xl font-bold text-white">{title}</h1>
                )}
                {subtitle && <p className="text-white/50">{subtitle}</p>}
              </div>
              {headerActions}
            </div>
          )}

          {/* Page Content */}
          {children}
        </div>
      </main>
    </div>
  );
}
