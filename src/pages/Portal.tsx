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
  UserCog,
  Headphones,
} from "lucide-react";

type UserRole =
  | "admin"
  | "secretary"
  | "training_coordinator"
  | "business_consultant"
  | "support_specialist"
  | "staff"
  | "moderator"
  | "user";

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
    const timeout = setTimeout(() => {
      if (loading) setLoading(false);
    }, 5000);
    loadUserData();
    return () => clearTimeout(timeout);
  }, []);

  const loadUserData = async () => {
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) { navigate("/auth"); return; }

      const [
        { data: profileData },
        { data: rolesData },
      ] = await Promise.all([
        supabase.from("profiles_safe").select("*").eq("id", user.id).single(),
        supabase.from("user_roles").select("role").eq("user_id", user.id),
      ]);

      if (profileData) setProfile(profileData);

      const userRoles: UserRole[] = rolesData?.map((r) => r.role as UserRole) || [];
      setRoles(userRoles);

      // Auto-redirect if user has only one role
      if (userRoles.length === 1) {
        const roleRedirects: Record<string, string> = {
          admin: "/admin",
          secretary: "/portal/secretary",
          training_coordinator: "/portal/coordinator",
          business_consultant: "/portal/staff",
          support_specialist: "/portal/staff",
          staff: "/portal/staff",
          moderator: "/portal/staff",
          user: "/portal/staff",
        };
        navigate(roleRedirects[userRoles[0]] || "/portal");
        return;
      }
    } catch (error: any) {
      toast({ title: "Error Loading Portal", description: "Unable to load portal data.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast({ title: "👋 Signed Out Successfully" });
    navigate("/auth");
  };

  const roleCards = [
    {
      role: "admin" as UserRole,
      title: "Admin Command Center",
      description: "Full system access — manage team, approve, delete, control everything",
      icon: UserCog,
      path: "/admin",
      color: "from-red-500 to-orange-500",
    },
    {
      role: "secretary" as UserRole,
      title: "Office Manager",
      description: "Bookings, client management, messages, appointments",
      icon: Users,
      path: "/portal/secretary",
      color: "from-blue-500 to-cyan-500",
    },
    {
      role: "training_coordinator" as UserRole,
      title: "Training Coordinator",
      description: "Articles, courses, testimonials, knowledge base content",
      icon: GraduationCap,
      path: "/portal/coordinator",
      color: "from-teal-500 to-green-500",
    },
    {
      role: "business_consultant" as UserRole,
      title: "Staff & Support",
      description: "Tasks, tickets, client directory, activity log",
      icon: Headphones,
      path: "/portal/staff",
      color: "from-amber-500 to-yellow-500",
    },
    {
      role: "support_specialist" as UserRole,
      title: "Staff & Support",
      description: "Tasks, tickets, client directory, activity log",
      icon: Headphones,
      path: "/portal/staff",
      color: "from-amber-500 to-yellow-500",
    },
    {
      role: "staff" as UserRole,
      title: "Staff & Support",
      description: "Tasks, tickets, client directory, activity log",
      icon: Headphones,
      path: "/portal/staff",
      color: "from-amber-500 to-yellow-500",
    },
    {
      role: "moderator" as UserRole,
      title: "Staff & Support",
      description: "Tasks, tickets, client directory, activity log",
      icon: Headphones,
      path: "/portal/staff",
      color: "from-amber-500 to-yellow-500",
    },
  ];

  // Deduplicate cards that point to the same path
  const seen = new Set<string>();
  const availableRoles = roleCards.filter((card) => {
    if (!roles.includes(card.role)) return false;
    if (seen.has(card.path)) return false;
    seen.add(card.path);
    return true;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0B1120]">
        <div className="text-center space-y-6">
          <Shield className="w-16 h-16 text-purple-400 mx-auto animate-pulse" />
          <h3 className="text-xl font-semibold text-white">Loading Your Dashboard</h3>
          <div className="flex justify-center gap-2">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B1120]">
      <header className="border-b border-gray-800/60 bg-[#111827]/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">InVision Network</h1>
                <p className="text-sm text-gray-500">Welcome back, {profile?.first_name || "User"}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button asChild variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-white/5">
                <Link to="/"><Home className="w-4 h-4 mr-2" />Home</Link>
              </Button>
              <Button variant="ghost" size="sm" onClick={handleSignOut} className="text-gray-400 hover:text-white hover:bg-white/5">
                <LogOut className="w-4 h-4 mr-2" />Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 sm:py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">Select Your Dashboard</h2>
            <p className="text-gray-500">Choose the workspace you want to access</p>
          </div>

          {availableRoles.length === 0 ? (
            <Card className="bg-[#1F2937] border-gray-800/50 p-8 sm:p-12 text-center">
              <Shield className="w-16 h-16 mx-auto text-gray-600 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No Role Assigned</h3>
              <p className="text-gray-500 mb-6">Please contact your administrator to assign you a role.</p>
              <Button asChild className="bg-purple-600 hover:bg-purple-700 text-white">
                <Link to="/">Return to Home</Link>
              </Button>
            </Card>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {availableRoles.map((card) => {
                const Icon = card.icon;
                return (
                  <Card
                    key={card.role}
                    className="bg-[#1F2937] border-gray-800/50 group hover:border-gray-700 transition-all cursor-pointer overflow-hidden"
                    onClick={() => navigate(card.path)}
                  >
                    <div className={`h-1.5 bg-gradient-to-r ${card.color}`} />
                    <div className="p-6">
                      <div className={`w-12 h-12 bg-gradient-to-br ${card.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-105 transition-transform`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-white mb-1">{card.title}</h3>
                      <p className="text-sm text-gray-500 mb-4">{card.description}</p>
                      <Button className="w-full bg-white/5 border border-gray-700 text-gray-300 hover:bg-white/10 hover:text-white">
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
}

export default Portal;
