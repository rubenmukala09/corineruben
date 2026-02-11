import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import {
  LogOut,
  Home,
  Stethoscope,
  Calendar,
  Users,
  FileText,
  Award,
  Activity,
} from "lucide-react";

function HealthcareDashboard() {
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

      // Use secure view - excludes sensitive DEA/license numbers
      const { data: healthcareData } = await supabase
        .from("healthcare_profiles_safe")
        .select("*")
        .eq("user_id", user.id)
        .single();

      setProfile({ ...profileData, ...healthcareData });
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
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                <Stethoscope className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Healthcare Professional Portal</h1>
                <p className="text-sm text-muted-foreground">
                  Dr. {profile?.first_name} {profile?.last_name}
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
          {/* Credentials */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center">
                <Award className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <h3 className="font-semibold">Professional Credentials</h3>
                <p className="text-sm text-muted-foreground">License information</p>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <p><strong>License Type:</strong> {profile?.license_type || "N/A"}</p>
              <p><strong>Specialty:</strong> {profile?.medical_specialty || "N/A"}</p>
              <p><strong>Experience:</strong> {profile?.years_in_practice || 0} years</p>
            </div>
          </Card>

          {/* Appointments */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center">
                <Calendar className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <h3 className="font-semibold">Appointments</h3>
                <p className="text-sm text-muted-foreground">Today's schedule</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-3">No appointments today</p>
            <Button size="sm" className="w-full" variant="default">
              <Calendar className="w-4 h-4 mr-2" />
              View Schedule
            </Button>
          </Card>

          {/* Patients */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-purple-500/10 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-500" />
              </div>
              <div>
                <h3 className="font-semibold">Patient Care</h3>
                <p className="text-sm text-muted-foreground">Active patients</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-3">0 active patients</p>
            <Button size="sm" className="w-full" variant="outline">
              <Users className="w-4 h-4 mr-2" />
              View Patient List
            </Button>
          </Card>

          {/* Medical Records */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-orange-500/10 rounded-full flex items-center justify-center">
                <FileText className="w-6 h-6 text-orange-500" />
              </div>
              <div>
                <h3 className="font-semibold">Medical Records</h3>
                <p className="text-sm text-muted-foreground">Patient documentation</p>
              </div>
            </div>
            <Button size="sm" className="w-full" variant="outline">
              <FileText className="w-4 h-4 mr-2" />
              Access Records
            </Button>
          </Card>

          {/* Consultations */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-indigo-500/10 rounded-full flex items-center justify-center">
                <Activity className="w-6 h-6 text-indigo-500" />
              </div>
              <div>
                <h3 className="font-semibold">Telehealth</h3>
                <p className="text-sm text-muted-foreground">Virtual consultations</p>
              </div>
            </div>
            <Button size="sm" className="w-full" variant="default">
              <Activity className="w-4 h-4 mr-2" />
              Start Consultation
            </Button>
          </Card>

          {/* Affiliation */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-yellow-500/10 rounded-full flex items-center justify-center">
                <Stethoscope className="w-6 h-6 text-yellow-500" />
              </div>
              <div>
                <h3 className="font-semibold">Hospital Affiliation</h3>
                <p className="text-sm text-muted-foreground">Network information</p>
              </div>
            </div>
            <p className="text-sm">
              {profile?.hospital_affiliation || "No affiliation on file"}
            </p>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default HealthcareDashboard;
