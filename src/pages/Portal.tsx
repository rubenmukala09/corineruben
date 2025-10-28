import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import {
  LogOut,
  Home,
  Shield,
  Users,
  GraduationCap,
  Code,
  Palette,
  UserCog,
  LayoutDashboard,
} from "lucide-react";

type UserRole = "admin" | "staff" | "analyst" | "trainer" | "developer";

interface Profile {
  first_name: string;
  last_name: string;
  position: string;
}

const Portal = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [roles, setRoles] = useState<UserRole[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/auth");
        return;
      }

      // Load profile
      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (profileData) {
        setProfile(profileData);
      }

      // Load roles
      const { data: rolesData } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id);

      if (rolesData) {
        setRoles(rolesData.map((r) => r.role as UserRole));
      }
    } catch (error: any) {
      console.error("Error loading user data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Signed out successfully",
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

  const roleCards = [
    {
      role: "admin" as UserRole,
      title: "Administrator Dashboard",
      description: "Manage team, view all activities, system settings",
      icon: UserCog,
      path: "/portal/admin",
      color: "from-red-500 to-orange-500",
    },
    {
      role: "analyst" as UserRole,
      title: "Threat Analyst Dashboard",
      description: "Review ScamShield cases, analyze threats",
      icon: Shield,
      path: "/portal/analyst",
      color: "from-blue-500 to-cyan-500",
    },
    {
      role: "trainer" as UserRole,
      title: "Trainer Dashboard",
      description: "Manage training sessions, student progress",
      icon: GraduationCap,
      path: "/portal/trainer",
      color: "from-green-500 to-emerald-500",
    },
    {
      role: "developer" as UserRole,
      title: "Developer Dashboard",
      description: "Manage AI projects, client implementations",
      icon: Code,
      path: "/portal/developer",
      color: "from-purple-500 to-pink-500",
    },
    {
      role: "staff" as UserRole,
      title: "Staff Dashboard",
      description: "General operations, client support",
      icon: Users,
      path: "/portal/staff",
      color: "from-amber-500 to-yellow-500",
    },
  ];

  const availableRoles = roleCards.filter((card) => roles.includes(card.role));

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading portal...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold">InVision Network Portal</h1>
                <p className="text-sm text-muted-foreground">
                  Welcome back, {profile?.first_name || "User"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button asChild variant="ghost" size="sm">
                <Link to="/">
                  <Home className="w-4 h-4 mr-2" />
                  Home
                </Link>
              </Button>
              <Button variant="outline" size="sm" onClick={handleSignOut}>
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Select Your Dashboard</h2>
            <p className="text-lg text-muted-foreground">
              Choose the workspace you want to access
            </p>
          </div>

          {availableRoles.length === 0 ? (
            <Card className="p-12 text-center">
              <LayoutDashboard className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Role Assigned</h3>
              <p className="text-muted-foreground mb-6">
                Please contact your administrator to assign you a role.
              </p>
              <Button asChild>
                <Link to="/">Return to Home</Link>
              </Button>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {availableRoles.map((card) => {
                const Icon = card.icon;
                return (
                  <Card
                    key={card.role}
                    className="group hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer"
                    onClick={() => navigate(card.path)}
                  >
                    <div className={`h-2 bg-gradient-to-r ${card.color}`} />
                    <div className="p-6">
                      <div
                        className={`w-14 h-14 bg-gradient-to-br ${card.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                      >
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">{card.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{card.description}</p>
                      <Button className="w-full" variant="outline">
                        Access Dashboard
                      </Button>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Portal;
