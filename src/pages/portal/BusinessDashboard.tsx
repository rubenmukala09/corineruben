import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

// Dashboard Components
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { AutomationStatusHero } from "@/components/dashboard/AutomationStatusHero";
import { ActiveAutomationsCard } from "@/components/dashboard/ActiveAutomationsCard";
import { BusinessMetricsGrid } from "@/components/dashboard/BusinessMetricsGrid";
import { RecentActivityFeed } from "@/components/dashboard/RecentActivityFeed";
import { BusinessQuickActions } from "@/components/dashboard/BusinessQuickActions";
import { SubscriptionStatus } from "@/components/SubscriptionStatus";

function BusinessDashboard() {
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

      setProfile(profileData);
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
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-background via-violet-500/5 to-purple-500/10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-4"
        >
          <div className="w-16 h-16 mx-auto rounded-full bg-violet-500/20 animate-pulse" />
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-violet-500/5 to-purple-500/10">
      <DashboardHeader
        firstName={profile?.first_name}
        lastName={profile?.last_name}
        title="Business Automation Hub"
        subtitle="Your AI is working 24/7"
        onSignOut={handleSignOut}
      />

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Hero Automation Status - No fake data, shows setup state */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <AutomationStatusHero 
            planName="AI Automation Suite"
            status="none"
            automationScore={null}
            tasksAutomated={null}
            hoursSaved={null}
          />
        </motion.div>

        {/* Metrics Grid - No fake data, shows setup state */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <BusinessMetricsGrid hasActiveAutomation={false} />
        </motion.div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Active Automations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <ActiveAutomationsCard />
          </motion.div>

          {/* Right Column - Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <RecentActivityFeed />
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <BusinessQuickActions />
        </motion.div>

        {/* Subscription Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="max-w-md"
        >
          <SubscriptionStatus />
        </motion.div>
      </main>
    </div>
  );
}

export default BusinessDashboard;
