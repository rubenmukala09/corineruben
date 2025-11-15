import { useState, useEffect, useRef } from "react";
import { Menu, X, Search, Bell, ChevronDown, User, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import invisionLogo from "@/assets/invision-logo.png";

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
    <div className="fixed top-0 left-0 right-0 h-16 bg-background border-b border-border z-[100] shadow-sm">
      <div className="flex items-center justify-between h-full px-4 md:px-6">
        {/* Left Section: Hamburger + Logo */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            {sidebarOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>

          <div className="flex items-center gap-2">
            <img 
              src={invisionLogo} 
              alt="InVision Network Logo" 
              className="h-8 w-8"
            />
            <span className="text-lg font-semibold text-foreground hidden sm:inline">
              InVision Network
            </span>
          </div>
        </div>

        {/* Center Section: Search Bar (hidden on mobile) */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
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
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <div className="relative" ref={notificationsRef}>
            <Button
              variant="ghost"
              size="icon"
              className="relative text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setNotificationsOpen(!notificationsOpen)}
            >
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-destructive text-destructive-foreground">
                  {unreadCount}
                </Badge>
              )}
            </Button>

            {/* Notifications Dropdown */}
            {notificationsOpen && (
              <div className="absolute right-0 top-full mt-2 w-80 bg-popover border border-border rounded-lg shadow-lg overflow-hidden animate-in fade-in-0 slide-in-from-top-2 duration-200">
                <div className="p-4 border-b border-border">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-foreground">Notifications</h3>
                    {unreadCount > 0 && (
                      <Button
                        variant="link"
                        size="sm"
                        onClick={handleMarkAllRead}
                        className="text-xs text-accent hover:text-accent/80"
                      >
                        Mark all as read
                      </Button>
                    )}
                  </div>
                </div>

                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 border-b border-border hover:bg-muted/50 transition-colors cursor-pointer ${
                        !notification.read ? "bg-muted/30" : ""
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
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
              className="flex items-center gap-2 hover:bg-muted transition-colors"
              onClick={() => setProfileOpen(!profileOpen)}
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src="" alt={adminName} />
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {getInitials(adminName)}
                </AvatarFallback>
              </Avatar>
              <span className="hidden md:inline-block text-sm font-medium text-foreground">
                {adminName}
              </span>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </Button>

            {/* Profile Dropdown Menu */}
            {profileOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-popover border border-border rounded-lg shadow-lg overflow-hidden animate-in fade-in-0 slide-in-from-top-2 duration-200">
                <div className="p-4 border-b border-border">
                  <p className="font-medium text-foreground">{adminName}</p>
                  <p className="text-xs text-muted-foreground truncate">{adminEmail}</p>
                  <p className="text-xs text-accent mt-1">Administrator</p>
                </div>

                <div className="py-2">
                  <button
                    onClick={() => {
                      setProfileOpen(false);
                      navigate("/admin/settings/account");
                    }}
                    className="w-full px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors flex items-center gap-2"
                  >
                    <User className="h-4 w-4" />
                    Account Settings
                  </button>
                  <button
                    onClick={() => {
                      setProfileOpen(false);
                      navigate("/admin/settings/site");
                    }}
                    className="w-full px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors flex items-center gap-2"
                  >
                    <Settings className="h-4 w-4" />
                    Site Settings
                  </button>
                </div>

                <div className="border-t border-border">
                  <button
                    onClick={handleSignOut}
                    className="w-full px-4 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors flex items-center gap-2"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
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
