import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { BookingModal } from "@/components/BookingModal";
import { useToast } from "@/hooks/use-toast";
import { useSubscription } from "@/contexts/SubscriptionContext";
import { useDashboardMetrics } from "@/hooks/useDashboardMetrics";

// Dashboard Components
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { ProtectionStatusHero } from "@/components/dashboard/ProtectionStatusHero";
import { ThreatActivityTimeline } from "@/components/dashboard/ThreatActivityTimeline";
import { QuickActionsGrid } from "@/components/dashboard/QuickActionsGrid";
import { TrainingProgressCard } from "@/components/dashboard/TrainingProgressCard";
import { UpcomingAppointmentsCard } from "@/components/dashboard/UpcomingAppointmentsCard";
import { SubscriptionStatus } from "@/components/SubscriptionStatus";

function SeniorDashboard() {
  const [profile, setProfile] = useState<any>(null);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { subscriptions } = useSubscription();
  const { data: metrics } = useDashboardMetrics();

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

  // Get active subscription info
  const activeSubscription = subscriptions.find(s => s.status === "active");
  const planName = activeSubscription?.plan_name || "ScamShield Starter";
  const protectionStatus = activeSubscription ? "active" : "pending";

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto rounded-full bg-primary/20 animate-pulse" />
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10">
      <DashboardHeader
        firstName={profile?.first_name}
        lastName={profile?.last_name}
        title="Family Protection Dashboard"
        onSignOut={handleSignOut}
      />

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Hero Protection Status */}
        <div>
          <ProtectionStatusHero 
            planName={planName}
            status={protectionStatus}
            protectionScore={metrics?.protectionScore || 0}
            threatsBlocked={metrics?.threatsBlocked || 0}
            daysProtected={metrics?.daysProtected || 0}
          />
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Threat Activity */}
          <div className="lg:col-span-2">
            <ThreatActivityTimeline userId={profile?.id} />
          </div>

          {/* Right Column - Training Progress */}
          <div>
            <TrainingProgressCard userId={profile?.id} />
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <QuickActionsGrid onBookAppointment={() => setBookingModalOpen(true)} />
        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Appointments */}
          <div>
            <UpcomingAppointmentsCard 
              appointments={appointments}
              onBookAppointment={() => setBookingModalOpen(true)}
            />
          </div>

          {/* Subscription Status */}
          <div>
            <SubscriptionStatus />
          </div>
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
}

export default SeniorDashboard;
