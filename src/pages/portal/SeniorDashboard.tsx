import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SubscriptionStatus } from "@/components/SubscriptionStatus";
import { BookingModal } from "@/components/BookingModal";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import {
  LogOut,
  Home,
  Shield,
  Heart,
  Calendar,
  Phone,
  FileText,
  AlertCircle,
} from "lucide-react";

function SeniorDashboard() {
  const [profile, setProfile] = useState<any>(null);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    loadProfile();
    loadAppointments();
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

      // Use secure view - excludes sensitive emergency contact and medical data
      const { data: seniorData } = await supabase
        .from("senior_profiles_safe")
        .select("*")
        .eq("user_id", user.id)
        .single();

      setProfile({ ...profileData, ...seniorData });
    } catch (error: any) {
      console.error("Error loading profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadAppointments = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("appointments")
        .select("*")
        .eq("client_id", user.id)
        .gte("scheduled_start", new Date().toISOString())
        .order("scheduled_start", { ascending: true })
        .limit(5);

      if (error) throw error;
      setAppointments(data || []);
    } catch (error: any) {
      console.error("Error loading appointments:", error);
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
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Senior/Family Portal</h1>
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
          {/* Profile Summary */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <h3 className="font-semibold">My Profile</h3>
                <p className="text-sm text-muted-foreground">Personal information</p>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <p><strong>Name:</strong> {profile?.first_name} {profile?.last_name}</p>
              <p><strong>Relationship:</strong> {profile?.relationship || "N/A"}</p>
              <p><strong>Language:</strong> {profile?.preferred_language || "English"}</p>
            </div>
          </Card>

          {/* Emergency Contact - Note: Sensitive data accessed via secure function when needed */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center">
                <Phone className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <h3 className="font-semibold">Emergency Contact</h3>
                <p className="text-sm text-muted-foreground">24/7 support</p>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <p className="text-muted-foreground">Contact information available in secure settings</p>
              <Button size="sm" className="w-full mt-3" variant="outline">
                <Phone className="w-4 h-4 mr-2" />
                View Emergency Contacts
              </Button>
            </div>
          </Card>

          {/* Subscriptions */}
          <SubscriptionStatus />

          {/* Upcoming Appointments */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center">
                <Calendar className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <h3 className="font-semibold">Appointments</h3>
                <p className="text-sm text-muted-foreground">Schedule & manage</p>
              </div>
            </div>
            {appointments.length === 0 ? (
              <p className="text-sm text-muted-foreground mb-3">No upcoming appointments</p>
            ) : (
              <div className="space-y-2 mb-3">
                {appointments.slice(0, 2).map((apt) => (
                  <div key={apt.id} className="p-2 bg-muted/50 rounded text-sm">
                    <div className="font-semibold">{apt.title}</div>
                    <div className="text-xs text-muted-foreground">
                      {format(new Date(apt.scheduled_start), "PPp")}
                    </div>
                  </div>
                ))}
              </div>
            )}
            <Button 
              size="sm" 
              className="w-full" 
              variant="default"
              onClick={() => setBookingModalOpen(true)}
            >
              <Calendar className="w-4 h-4 mr-2" />
              Book Appointment
            </Button>
          </Card>

          {/* ScamShield Protection */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-purple-500/10 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-purple-500" />
              </div>
              <div>
                <h3 className="font-semibold">ScamShield</h3>
                <p className="text-sm text-muted-foreground">Protection status</p>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-green-500">
                <Shield className="w-4 h-4" />
                <span className="font-semibold">Active Protection</span>
              </div>
              <p className="text-muted-foreground">You're protected from AI-powered scams</p>
            </div>
          </Card>

          {/* Resources */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-orange-500/10 rounded-full flex items-center justify-center">
                <FileText className="w-6 h-6 text-orange-500" />
              </div>
              <div>
                <h3 className="font-semibold">Resources</h3>
                <p className="text-sm text-muted-foreground">Educational materials</p>
              </div>
            </div>
            <Button size="sm" className="w-full" variant="outline" onClick={() => navigate("/resources")}>
              <FileText className="w-4 h-4 mr-2" />
              View Resources
            </Button>
          </Card>

          {/* Support */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-yellow-500/10 rounded-full flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-yellow-500" />
              </div>
              <div>
                <h3 className="font-semibold">Need Help?</h3>
                <p className="text-sm text-muted-foreground">Contact support</p>
              </div>
            </div>
            <Button size="sm" className="w-full" variant="outline" onClick={() => navigate("/contact")}>
              <Phone className="w-4 h-4 mr-2" />
              Contact Support
            </Button>
          </Card>
        </div>
      </main>

      <BookingModal
        open={bookingModalOpen}
        onOpenChange={setBookingModalOpen}
        serviceType="training"
        serviceName="Personal Consultation"
        basePrice={79}
      />
    </div>
  );
};

export default SeniorDashboard;
