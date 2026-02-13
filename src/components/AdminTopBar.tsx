import { useState, useEffect, useRef } from "react";
import {
  Menu,
  Search,
  ChevronDown,
  User,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import invisionLogo from "@/assets/shield-logo.png";
import { NotificationBell } from "@/components/NotificationBell";

interface AdminTopBarProps {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

export function AdminTopBar({ sidebarOpen, toggleSidebar }: AdminTopBarProps) {
  const [profileOpen, setProfileOpen] = useState(false);
  const [adminName, setAdminName] = useState("Admin User");
  const [adminEmail, setAdminEmail] = useState("");

  const profileRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleBack = () => window.history.back();
  const handleForward = () => window.history.forward();

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

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="fixed top-0 left-0 right-0 h-16 bg-card/95 backdrop-blur-xl border-b border-border z-[100] shadow-sm">
      <div className="flex items-center justify-between h-full px-2 sm:px-4">
        <div className="flex items-center gap-2 sm:gap-4 min-w-0">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="h-10 w-10 flex-shrink-0"
          >
            <Menu className="h-5 w-5" />
          </Button>

          {/* Back/Forward Navigation */}
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleBack}
              className="h-11 w-11 md:h-9 md:w-9"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleForward}
              className="h-11 w-11 md:h-9 md:w-9"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex items-center gap-2 min-w-0">
            <img
              src={invisionLogo}
              alt="InVision Network Logo"
              className="h-7 w-7 sm:h-8 sm:w-8 flex-shrink-0"
            />
            <span className="text-base sm:text-lg font-semibold hidden sm:inline truncate">
              InVision Network
            </span>
          </div>
        </div>

        <div className="hidden md:flex flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-10 rounded-full"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <NotificationBell />

          <div className="relative" ref={profileRef}>
            <Button
              variant="ghost"
              className="flex items-center gap-2 h-10"
              onClick={() => setProfileOpen(!profileOpen)}
            >
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {getInitials(adminName)}
                </AvatarFallback>
              </Avatar>
              <ChevronDown className="h-4 w-4 hidden sm:block" />
            </Button>

            {profileOpen && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-popover border rounded-lg shadow-xl z-50">
                <div className="p-4 border-b">
                  <p className="font-medium">{adminName}</p>
                  <p className="text-xs text-muted-foreground">{adminEmail}</p>
                </div>
                <div className="p-2">
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
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
                    className="w-full justify-start"
                    onClick={() => {
                      navigate("/admin/settings");
                      setProfileOpen(false);
                    }}
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Button>
                </div>
                <div className="p-2 border-t">
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-destructive hover:bg-destructive/10"
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
    </div>
  );
}
