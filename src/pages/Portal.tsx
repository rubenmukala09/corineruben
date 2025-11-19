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
  UserCog,
  Heart,
  Stethoscope,
} from "lucide-react";

type UserRole = "admin" | "secretary" | "training_coordinator" | "business_consultant" | "support_specialist" | "staff" | "moderator" | "senior" | "caregiver" | "healthcare";

interface Profile {
  first_name: string;
  last_name: string;
  position: string;
}

function Portal() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [roles, setRoles] = useState<UserRole[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    loadUserData();
    
    // Set timeout fallback to prevent infinite loading
    const timeout = setTimeout(() => {
      console.error("Portal loading timeout - forcing loading state to false");
      setLoading(false);
    }, 10000);

    return () => clearTimeout(timeout);
  }, []);

  const loadUserData = async () => {
    console.log("Portal: Starting to load user data");
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      console.log("Portal: User loaded", user?.id);
      
      if (userError) {
        console.error("Portal: Error getting user", userError);
        navigate("/auth");
        return;
      }
      
      if (!user) {
        console.log("Portal: No user found, redirecting to auth");
        navigate("/auth");
        return;
      }

      // Load profile
      console.log("Portal: Loading profile");
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (profileError) {
        console.error("Portal: Error loading profile", profileError);
      } else if (profileData) {
        console.log("Portal: Profile loaded", profileData);
        setProfile(profileData);
      }

      // Load roles from user_roles table
      console.log("Portal: Loading roles from user_roles table");
      const { data: rolesData, error: rolesError } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id);

      if (rolesError) {
        console.error("Portal: Error loading roles", rolesError);
      }

      const userRoles: UserRole[] = rolesData?.map((r) => r.role as UserRole) || [];
      console.log("Portal: Roles from user_roles table", userRoles);

      // Check for profile-specific roles
      console.log("Portal: Checking for profile-specific roles");
      try {
        const { data: seniorProfile } = await supabase
          .from("senior_client_profiles")
          .select("id")
          .eq("user_id", user.id)
          .maybeSingle();
        
        if (seniorProfile) {
          console.log("Portal: Senior profile found");
          userRoles.push("senior");
        }
      } catch (err) {
        console.error("Portal: Error checking senior profile", err);
      }

      try {
        const { data: caregiverProfile } = await supabase
          .from("caregiver_profiles")
          .select("id")
          .eq("user_id", user.id)
          .maybeSingle();
        
        if (caregiverProfile) {
          console.log("Portal: Caregiver profile found");
          userRoles.push("caregiver");
        }
      } catch (err) {
        console.error("Portal: Error checking caregiver profile", err);
      }

      try {
        const { data: healthcareProfile } = await supabase
          .from("healthcare_professional_profiles")
          .select("id")
          .eq("user_id", user.id)
          .maybeSingle();
        
        if (healthcareProfile) {
          console.log("Portal: Healthcare profile found");
          userRoles.push("healthcare");
        }
      } catch (err) {
        console.error("Portal: Error checking healthcare profile", err);
      }

      console.log("Portal: Final roles array", userRoles);
      setRoles(userRoles);
    } catch (error: any) {
      console.error("Portal: Critical error loading user data:", error);
      toast({
        title: "Error Loading Portal",
        description: "Unable to load your portal data. Please try refreshing the page.",
        variant: "destructive",
      });
    } finally {
      console.log("Portal: Setting loading to false");
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "👋 Signed Out Successfully",
        description: "You've been securely logged out. See you next time!",
      });
      navigate("/auth");
    } catch (error: any) {
      toast({
        title: "❌ Sign Out Failed",
        description: error.message || "Unable to sign out. Please try again.",
        variant: "destructive",
      });
    }
  };

  const roleCards = [
    {
      role: "admin" as UserRole,
      title: "Administrator Dashboard",
      description: "Full system access, manage team, view all activities",
      icon: UserCog,
      path: "/portal/admin",
      color: "from-red-500 to-orange-500",
    },
    {
      role: "secretary" as UserRole,
      title: "Office Manager Dashboard",
      description: "Client management, messages, appointments",
      icon: Users,
      path: "/admin/clients/businesses",
      color: "from-blue-500 to-cyan-500",
    },
    {
      role: "training_coordinator" as UserRole,
      title: "Training Coordinator Dashboard",
      description: "Manage training programs, ScamShield, individual clients",
      icon: GraduationCap,
      path: "/portal/trainer",
      color: "from-teal-500 to-green-500",
    },
    {
      role: "business_consultant" as UserRole,
      title: "Business Consultant Dashboard",
      description: "Business clients, services, AI solutions, proposals",
      icon: Shield,
      path: "/admin/clients/businesses",
      color: "from-indigo-500 to-purple-500",
    },
    {
      role: "support_specialist" as UserRole,
      title: "Support Specialist Dashboard",
      description: "Client support, tickets, view logs, technical docs",
      icon: Users,
      path: "/portal/staff",
      color: "from-yellow-500 to-amber-500",
    },
    {
      role: "staff" as UserRole,
      title: "Staff Dashboard",
      description: "General operations, client support",
      icon: Users,
      path: "/portal/staff",
      color: "from-amber-500 to-yellow-500",
    },
    {
      role: "senior" as UserRole,
      title: "Senior/Family Portal",
      description: "Manage care, appointments, ScamShield protection",
      icon: Heart,
      path: "/portal/senior",
      color: "from-pink-500 to-rose-500",
    },
    {
      role: "caregiver" as UserRole,
      title: "Caregiver Portal",
      description: "Schedule, clients, training, documentation",
      icon: Heart,
      path: "/portal/caregiver",
      color: "from-green-500 to-emerald-500",
    },
    {
      role: "healthcare" as UserRole,
      title: "Healthcare Professional Portal",
      description: "Patient care, medical records, consultations",
      icon: Stethoscope,
      path: "/portal/healthcare",
      color: "from-purple-500 to-fuchsia-500",
    },
  ];

  const availableRoles = roleCards.filter((card) => roles.includes(card.role));

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading portal...</p>
          <p className="mt-2 text-xs text-muted-foreground">
            This should only take a moment
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container-responsive py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
            <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center flex-shrink-0">
                <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div className="min-w-0">
                <h1 className="text-lg sm:text-xl font-bold truncate">InVision Network Portal</h1>
                <p className="text-xs sm:text-sm text-muted-foreground truncate">
                  Welcome back, {profile?.first_name || "User"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Button asChild variant="ghost" size="sm" className="flex-1 sm:flex-none touch-target">
                <Link to="/">
                  <Home className="w-4 h-4 mr-2" />
                  Home
                </Link>
              </Button>
              <Button variant="outline" size="sm" onClick={handleSignOut} className="flex-1 sm:flex-none touch-target">
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container-responsive py-8 sm:py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Select Your Dashboard</h2>
            <p className="text-base sm:text-lg text-muted-foreground">
              Choose the workspace you want to access
            </p>
          </div>

          {availableRoles.length === 0 ? (
            <Card className="p-8 sm:p-12 text-center">
              <Shield className="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold mb-2">No Role Assigned</h3>
              <p className="text-sm sm:text-base text-muted-foreground mb-6">
                Please contact your administrator to assign you a role.
              </p>
              <Button asChild className="touch-target">
                <Link to="/">Return to Home</Link>
              </Button>
            </Card>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
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
