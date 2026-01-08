import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, Search, ChevronDown, ChevronLeft, ChevronRight, User, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { CyberSidebar } from "@/components/admin/neon/CyberSidebar";
import { NotificationBell } from "@/components/NotificationBell";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

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
  onSearch
}: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [adminName, setAdminName] = useState("Admin User");
  const [adminEmail, setAdminEmail] = useState("");
  
  const profileRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const getUserInfo = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setAdminEmail(user.email || "");
        const { data: profile } = await supabase
          .from("profiles_safe")
          .select("first_name, last_name")
          .eq("id", user.id)
          .single();
        
        if (profile?.first_name || profile?.last_name) {
          setAdminName(`${profile.first_name || ''} ${profile.last_name || ''}`.trim());
        }
      }
    };
    getUserInfo();
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      toast({ title: "Signed Out", description: "You've been successfully logged out." });
      navigate("/auth");
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  const getInitials = (name: string) => {
    return name.split(" ").map(part => part[0]).join("").toUpperCase().slice(0, 2);
  };

  return (
    <div className="flex min-h-screen bg-[#0B0F19] w-full">
      <CyberSidebar 
        isOpen={sidebarOpen} 
        isMobileOpen={mobileSidebarOpen}
        onMobileClose={() => setMobileSidebarOpen(false)}
      />
      
      {/* Top Header Bar */}
      <header className={`fixed top-0 right-0 left-0 h-16 bg-[#111827]/95 backdrop-blur-xl border-b border-gray-800 z-40 
        transition-all duration-300 ${sidebarOpen ? 'md:left-[260px]' : 'md:left-[70px]'}`}>
        <div className="flex items-center justify-between h-full px-4 lg:px-6">
          {/* Left Section: Menu, Nav, Search */}
          <div className="flex items-center gap-4 flex-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => window.innerWidth < 768 ? setMobileSidebarOpen(!mobileSidebarOpen) : setSidebarOpen(!sidebarOpen)}
              className="text-[#9CA3AF] hover:text-[#F9FAFB] hover:bg-gray-800"
            >
              <Menu className="w-5 h-5" />
            </Button>
            
            {/* Back/Forward Navigation */}
            <div className="flex items-center gap-1">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => window.history.back()} 
                className="text-[#9CA3AF] hover:text-[#F9FAFB] hover:bg-gray-800 h-9 w-9"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => window.history.forward()} 
                className="text-[#9CA3AF] hover:text-[#F9FAFB] hover:bg-gray-800 h-9 w-9"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
            
            {/* Search */}
            <div className="relative hidden sm:block max-w-md flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9CA3AF]" />
              <Input 
                type="text" 
                placeholder={searchPlaceholder} 
                onChange={(e) => onSearch?.(e.target.value)}
                className="pl-10 bg-[#374151] border-gray-700 text-[#F9FAFB] placeholder:text-[#9CA3AF] h-10 rounded-lg" 
              />
            </div>
          </div>

          {/* Right Section: Notifications & Profile */}
          <div className="flex items-center gap-3">
            <NotificationBell />
            
            {/* Profile Dropdown */}
            <div className="relative" ref={profileRef}>
              <Button 
                variant="ghost" 
                className="flex items-center gap-2 h-10 text-[#9CA3AF] hover:text-[#F9FAFB] hover:bg-gray-800" 
                onClick={() => setProfileOpen(!profileOpen)}
              >
                <Avatar className="h-8 w-8 bg-gradient-to-br from-[#3B82F6] to-[#06B6D4]">
                  <AvatarFallback className="bg-transparent text-white text-sm font-medium">
                    {getInitials(adminName)}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden md:inline text-sm font-medium text-[#F9FAFB]">{adminName}</span>
                <ChevronDown className="h-4 w-4 hidden sm:block" />
              </Button>

              {profileOpen && (
                <div className="absolute right-0 top-full mt-2 w-64 bg-[#1F2937] border border-gray-700 rounded-lg shadow-xl z-50">
                  <div className="p-4 border-b border-gray-700">
                    <p className="font-medium text-[#F9FAFB]">{adminName}</p>
                    <p className="text-xs text-[#9CA3AF]">{adminEmail}</p>
                  </div>
                  <div className="p-2">
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start text-[#9CA3AF] hover:text-[#F9FAFB] hover:bg-gray-800" 
                      onClick={() => { navigate("/admin/settings"); setProfileOpen(false); }}
                    >
                      <User className="mr-2 h-4 w-4" />Profile
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start text-[#9CA3AF] hover:text-[#F9FAFB] hover:bg-gray-800" 
                      onClick={() => { navigate("/admin/settings"); setProfileOpen(false); }}
                    >
                      <Settings className="mr-2 h-4 w-4" />Settings
                    </Button>
                  </div>
                  <div className="p-2 border-t border-gray-700">
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-500/10" 
                      onClick={handleSignOut}
                    >
                      <LogOut className="mr-2 h-4 w-4" />Sign Out
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className={`flex-1 transition-all duration-300 pt-16 w-full ${sidebarOpen ? 'md:ml-[260px]' : 'md:ml-[70px]'}`}>
        <div className="p-6 lg:p-8">
          {/* Page Header */}
          {(title || headerActions) && (
            <div className="flex items-center justify-between mb-8">
              <div>
                {title && <h1 className="text-3xl font-bold text-[#F9FAFB]">{title}</h1>}
                {subtitle && <p className="text-[#9CA3AF]">{subtitle}</p>}
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
