import { useState, useEffect, useRef } from "react";
import { Menu, X, Search, Bell, ChevronDown, User, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import invisionLogo from "@/assets/shield-logo.png";

interface AdminTopBarProps {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

interface Notification {
  id: string;
  type: "info" | "success" | "warning" | "error";
  title: string;
  time: string;
  read: boolean;
}

const mockNotifications: Notification[] = [
  { id: "1", type: "info", title: "New business inquiry received", time: "2 hours ago", read: false },
  { id: "2", type: "success", title: "Order #1234 completed", time: "4 hours ago", read: false },
  { id: "3", type: "warning", title: "Low inventory alert", time: "6 hours ago", read: true },
  { id: "4", type: "info", title: "New testimonial submitted", time: "8 hours ago", read: true },
];

export function AdminTopBar({ sidebarOpen, toggleSidebar }: AdminTopBarProps) {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [adminName, setAdminName] = useState("Admin User");
  const [adminEmail, setAdminEmail] = useState("");
  
  const notificationsRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    // Get user info
    const getUserInfo = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setAdminEmail(user.email || "");
        // Try to get profile info if available
        const { data: profile } = await supabase
          .from("profiles")
          .select("full_name")
          .eq("id", user.id)
          .single();
        
        if (profile?.full_name) {
          setAdminName(profile.full_name);
        }
      }
    };
    getUserInfo();
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMarkAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
    toast({
      title: "Marked as read",
      description: "All notifications marked as read",
    });
  };

  const handleSignOut = async () => {
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
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "success": return "✓";
      case "warning": return "⚠";
      case "error": return "✕";
      default: return "ℹ";
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(part => part[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="fixed top-0 left-0 right-0 h-16 bg-card/95 backdrop-blur-xl border-b border-border z-[100] shadow-sm">
      <div className="flex items-center justify-between h-full px-2 sm:px-4">
        {/* Left Section: Hamburger + Logo */}
        <div className="flex items-center gap-2 sm:gap-4 min-w-0">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="text-muted-foreground hover:text-foreground transition-colors h-10 w-10 flex-shrink-0"
          >
            <Menu className="h-5 w-5" />
          </Button>

          <div className="flex items-center gap-2 min-w-0">
            <img 
              src={invisionLogo} 
              alt="InVision Network Logo" 
              className="h-7 w-7 sm:h-8 sm:w-8 flex-shrink-0"
            />
            <span className="text-base sm:text-lg font-semibold text-foreground hidden sm:inline truncate">
              InVision Network
            </span>
          </div>
        </div>

        {/* Center Section: Search Bar - Icon on mobile, full on desktop */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden h-10 w-10"
        >
          <Search className="h-4 w-4" />
        </Button>
        <div className="hidden md:flex flex-1 max-w-md mx-4 lg:mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search clients, products, orders..."
              className="pl-10 rounded-full border-border bg-muted/50 focus:bg-background transition-colors"
            />
          </div>
        </div>

        {/* Right Section: Notifications + Profile */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Notifications */}
          <div className="relative" ref={notificationsRef}>
            <Button
              variant="ghost"
              size="icon"
              className="relative text-muted-foreground hover:text-foreground transition-colors h-10 w-10"
              onClick={() => setNotificationsOpen(!notificationsOpen)}
            >
              <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
              {unreadCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center p-0 text-[10px] sm:text-xs bg-destructive text-destructive-foreground">
                  {unreadCount}
                </Badge>
              )}
            </Button>

            {/* Notifications Dropdown */}
            {notificationsOpen && (
              <div className="absolute right-0 top-full mt-2 w-[calc(100vw-2rem)] sm:w-96 max-w-md bg-popover/95 backdrop-blur-xl border border-border rounded-lg shadow-2xl overflow-hidden animate-in fade-in-0 slide-in-from-top-2 duration-200 z-50">
                <div className="p-3 sm:p-4 border-b border-border">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-foreground text-sm sm:text-base">Notifications</h3>
                    {unreadCount > 0 && (
                      <Button
                        variant="link"
                        size="sm"
                        onClick={handleMarkAllRead}
                        className="text-xs text-accent hover:text-accent/80 h-8"
                      >
                        Mark all as read
                      </Button>
                    )}
                  </div>
                </div>

                <div className="max-h-[60vh] sm:max-h-96 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-3 sm:p-4 border-b border-border hover:bg-muted/50 transition-colors cursor-pointer active:scale-[0.98] ${
                        !notification.read ? "bg-muted/30" : ""
                      }`}
                    >
                      <div className="flex items-start gap-2 sm:gap-3">
                        <div className={`flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full flex-shrink-0 ${
                          notification.type === "success" ? "bg-success/20 text-success" :
                          notification.type === "warning" ? "bg-yellow-500/20 text-yellow-600" :
                          notification.type === "error" ? "bg-destructive/20 text-destructive" :
                          "bg-accent/20 text-accent"
                        }`}>
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">
                            {notification.title}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {notification.time}
                          </p>
                        </div>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-3 border-t border-border bg-muted/20">
                  <Button
                    variant="link"
                    size="sm"
                    className="w-full text-accent hover:text-accent/80"
                    onClick={() => setNotificationsOpen(false)}
                  >
                    View all notifications
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Profile Dropdown */}
          <div className="relative" ref={profileRef}>
            <Button
              variant="ghost"
              className="flex items-center gap-1 sm:gap-2 hover:bg-muted transition-colors h-10 px-2 sm:px-3"
              onClick={() => setProfileOpen(!profileOpen)}
            >
              <Avatar className="h-7 w-7 sm:h-8 sm:w-8">
                <AvatarImage src="" alt={adminName} />
                <AvatarFallback className="bg-primary text-primary-foreground text-xs sm:text-sm">
                  {getInitials(adminName)}
                </AvatarFallback>
              </Avatar>
              <span className="hidden lg:inline-block text-sm font-medium text-foreground max-w-[120px] truncate">
                {adminName}
              </span>
              <ChevronDown className="h-4 w-4 text-muted-foreground hidden lg:inline" />
            </Button>

            {/* Profile Dropdown Menu */}
            {profileOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-popover/95 backdrop-blur-xl border border-border rounded-lg shadow-2xl overflow-hidden animate-in fade-in-0 slide-in-from-top-2 duration-200 z-50">
                <div className="p-3 sm:p-4 border-b border-border">
                  <p className="font-medium text-foreground break-words text-sm sm:text-base">{adminName}</p>
                  <p className="text-xs text-muted-foreground truncate">{adminEmail}</p>
                  <p className="text-xs text-accent mt-1">Administrator</p>
                </div>

                <div className="py-2">
                  <button
                    onClick={() => {
                      setProfileOpen(false);
                      navigate("/admin/settings/account");
                    }}
                    className="w-full px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors flex items-center gap-2 touch-target"
                  >
                    <User className="h-4 w-4 flex-shrink-0" />
                    <span>Account Settings</span>
                  </button>
                  <button
                    onClick={() => {
                      setProfileOpen(false);
                      navigate("/admin/settings/site");
                    }}
                    className="w-full px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors flex items-center gap-2 touch-target"
                  >
                    <Settings className="h-4 w-4 flex-shrink-0" />
                    <span>Site Settings</span>
                  </button>
                </div>

                <div className="border-t border-border">
                  <button
                    onClick={handleSignOut}
                    className="w-full px-4 py-2.5 text-sm text-destructive hover:bg-destructive/10 transition-colors flex items-center gap-2 touch-target"
                  >
                    <LogOut className="h-4 w-4 flex-shrink-0" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
