import { useState, useEffect, useRef, useCallback } from "react";
import { Outlet, useNavigate, Navigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { CyberSidebar } from "@/components/admin/neon/CyberSidebar";
import { Search, Bell, Menu, ChevronLeft, ChevronRight, Settings, LogOut, User, ChevronDown, Home } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { ShieldAlert } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PageSkeleton } from "@/components/admin/PageSkeleton";

const INACTIVITY_TIMEOUT = 15 * 60 * 1000; // 15 minutes

export function AdminShell() {
  const { user, roleConfig, loading, initialized, signOut, adminName, adminEmail, isAdmin } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignOut = useCallback(async () => {
    try {
      await signOut();
      toast({ 
        title: "👋 Signed Out Successfully",
        description: "You've been securely logged out."
      });
      navigate("/auth");
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  }, [signOut, navigate, toast]);

  // Auto-logout after inactivity
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
    }
    inactivityTimerRef.current = setTimeout(() => {
      toast({ 
        title: "Session Expired", 
        description: "You've been logged out due to inactivity.",
        variant: "destructive"
      });
      handleSignOut();
    }, INACTIVITY_TIMEOUT);
  }, [handleSignOut, toast]);

  useEffect(() => {
    const events = ['mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart', 'click'];
    const handleActivity = () => resetInactivityTimer();
    
    events.forEach(event => document.addEventListener(event, handleActivity));
    resetInactivityTimer();
    
    return () => {
      events.forEach(event => document.removeEventListener(event, handleActivity));
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
      }
    };
  }, [resetInactivityTimer]);

  const getInitials = (name: string) => {
    return name.split(" ").map(part => part[0]).join("").toUpperCase().slice(0, 2);
  };

  const handleBack = () => window.history.back();
  const handleForward = () => window.history.forward();

  // Show skeleton while checking auth - shell stays visible
  if (!initialized || loading) {
    return (
      <div className="flex min-h-screen bg-[#0B0F19] w-full">
        <CyberSidebar 
          isOpen={sidebarOpen} 
          isMobileOpen={false}
          onMobileClose={() => {}}
        />
        <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'md:ml-[260px]' : 'md:ml-[70px]'}`}>
          <header className={`fixed top-0 right-0 left-0 h-16 bg-[#111827]/95 backdrop-blur-xl border-b border-gray-800 z-40 
            transition-all duration-300 ${sidebarOpen ? 'md:left-[260px]' : 'md:left-[70px]'}`}>
            <div className="flex items-center justify-between h-full px-4 lg:px-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-800 rounded animate-pulse" />
                <div className="w-64 h-10 bg-gray-800 rounded animate-pulse hidden sm:block" />
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-800 rounded animate-pulse" />
                <div className="w-32 h-10 bg-gray-800 rounded animate-pulse" />
              </div>
            </div>
          </header>
          <main className="pt-16 p-6">
            <PageSkeleton />
          </main>
        </div>
      </div>
    );
  }

  // Redirect if not authenticated
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // Show access denied if no role config (not an admin/staff)
  if (!roleConfig) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-[#0B0F19]">
        <Card className="max-w-md w-full bg-[#111827] border-gray-800">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <ShieldAlert className="h-12 w-12 text-red-500" />
              <h2 className="text-xl font-semibold text-white">Access Denied</h2>
              <p className="text-gray-400">
                Your account does not have permission to access the admin portal.
              </p>
              <Button onClick={() => navigate('/')} variant="outline" className="border-gray-700 text-gray-300">
                Return to Homepage
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div data-admin-layout className="flex min-h-screen bg-[#0B0F19] w-full overflow-x-hidden">
      {/* Persistent Sidebar - Never re-renders on navigation */}
      <CyberSidebar 
        isOpen={sidebarOpen} 
        isMobileOpen={mobileSidebarOpen}
        onMobileClose={() => setMobileSidebarOpen(false)}
      />
      
      {/* Persistent Top Header Bar */}
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
                placeholder="Search..."
                className="pl-10 bg-[#374151] border-gray-700 text-[#F9FAFB] placeholder:text-[#9CA3AF] 
                  focus:border-[#3B82F6] focus:ring-[#3B82F6]/20 h-10 rounded-lg"
              />
            </div>
          </div>

          {/* Right - Home + Notifications + Profile */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/")}
              className="text-[#9CA3AF] hover:text-[#F9FAFB] hover:bg-gray-800"
              title="Back to Website"
            >
              <Home className="h-5 w-5" />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/admin/notifications")}
              className="relative text-[#9CA3AF] hover:text-[#F9FAFB] hover:bg-gray-800"
            >
              <Bell className="h-5 w-5" />
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
      
      {/* Main Content Area - Instant render, no transitions */}
      <main className={`flex-1 pt-16 w-full ${sidebarOpen ? 'md:ml-[260px]' : 'md:ml-[70px]'}`}>
        <div className="min-h-[calc(100vh-4rem)]">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
