import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import {
  LogOut,
  Home,
  Heart,
  Calendar,
  Users,
  Clock,
  Award,
  FileText,
} from "lucide-react";

function CaregiverDashboard() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/auth");
        return;
      }

      const { data: profileData } = await supabase
        .from("profiles_safe")
        .select("*")
        .eq("id", user.id)
        .single();

      const { data: caregiverData } = await supabase
        .from("caregiver_profiles")
        .select("*")
        .eq("user_id", user.id)
        .single();

      setProfile({ ...profileData, ...caregiverData });
    } catch (error: any) {
      console.error("Error loading profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      toast({ 
        title: "👋 Signed Out Successfully",
        description: "You've been securely logged out. See you next time!"
      });
      navigate("/auth");
    } catch (error: any) {
      toast({
        title: "❌ Sign Out Failed",
        description: error.message || "Unable to sign out",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Caregiver Portal</h1>
                <p className="text-sm text-muted-foreground">
                  Welcome, {profile?.first_name}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => navigate("/")}>
                <Home className="w-4 h-4 mr-2" />
                Home
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
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Profile */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-pink-500/10 rounded-full flex items-center justify-center">
                <Award className="w-6 h-6 text-pink-500" />
              </div>
              <div>
                <h3 className="font-semibold">My Credentials</h3>
                <p className="text-sm text-muted-foreground">Professional info</p>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <p><strong>Cert Type:</strong> {profile?.certification_type || "N/A"}</p>
              <p><strong>Cert #:</strong> {profile?.certification_number || "N/A"}</p>
              <p><strong>Experience:</strong> {profile?.years_experience || 0} years</p>
            </div>
          </Card>

          {/* Schedule */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center">
                <Calendar className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <h3 className="font-semibold">My Schedule</h3>
                <p className="text-sm text-muted-foreground">Appointments</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-3">No upcoming appointments</p>
            <Button size="sm" className="w-full" variant="default">
              <Calendar className="w-4 h-4 mr-2" />
              View Full Schedule
            </Button>
          </Card>

          {/* Availability */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <h3 className="font-semibold">Availability</h3>
                <p className="text-sm text-muted-foreground">Hours per week</p>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <p><strong>Available:</strong> {profile?.available_hours_per_week || 0} hrs/week</p>
              <div className="flex flex-wrap gap-1 mt-2">
                {profile?.availability_mornings && <span className="px-2 py-1 bg-primary/10 rounded text-xs">Mornings</span>}
                {profile?.availability_afternoons && <span className="px-2 py-1 bg-primary/10 rounded text-xs">Afternoons</span>}
                {profile?.availability_evenings && <span className="px-2 py-1 bg-primary/10 rounded text-xs">Evenings</span>}
                {profile?.availability_weekends && <span className="px-2 py-1 bg-primary/10 rounded text-xs">Weekends</span>}
              </div>
            </div>
          </Card>

          {/* Clients */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-purple-500/10 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-500" />
              </div>
              <div>
                <h3 className="font-semibold">My Clients</h3>
                <p className="text-sm text-muted-foreground">Active assignments</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-3">No active clients</p>
            <Button size="sm" className="w-full" variant="outline">
              <Users className="w-4 h-4 mr-2" />
              View All Clients
            </Button>
          </Card>

          {/* Training */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-orange-500/10 rounded-full flex items-center justify-center">
                <FileText className="w-6 h-6 text-orange-500" />
              </div>
              <div>
                <h3 className="font-semibold">Training</h3>
                <p className="text-sm text-muted-foreground">Courses & certs</p>
              </div>
            </div>
            <Button size="sm" className="w-full" variant="outline" onClick={() => navigate("/training")}>
              <FileText className="w-4 h-4 mr-2" />
              View Training
            </Button>
          </Card>

          {/* Documentation */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-yellow-500/10 rounded-full flex items-center justify-center">
                <FileText className="w-6 h-6 text-yellow-500" />
              </div>
              <div>
                <h3 className="font-semibold">Documentation</h3>
                <p className="text-sm text-muted-foreground">Reports & forms</p>
              </div>
            </div>
            <Button size="sm" className="w-full" variant="outline">
              <FileText className="w-4 h-4 mr-2" />
              Submit Report
            </Button>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default CaregiverDashboard;
