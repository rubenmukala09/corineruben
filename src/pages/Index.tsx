import { useEffect, useState } from "react";
import { SEO, PAGE_SEO } from "@/components/SEO";
import Footer from "@/components/Footer";
import { HomeHeader } from "@/components/homepage/HomeHeader";
import { HeroSection } from "@/components/homepage/HeroSection";
import { HowItWorksSection } from "@/components/homepage/HowItWorksSection";
import { ChoosePathSection } from "@/components/homepage/ChoosePathSection";
import { ServicesGrid } from "@/components/homepage/ServicesGrid";
import { PricingPreview } from "@/components/homepage/PricingPreview";
import { TestimonialsSection } from "@/components/homepage/TestimonialsSection";
import { FinalCTA } from "@/components/homepage/FinalCTA";
import { supabase } from "@/integrations/supabase/client";

function Index() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    checkAdminStatus();
  }, []);

  const checkAdminStatus = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        setIsAdmin(false);
        return;
      }

      const { data: roles, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .in("role", ["admin", "staff"]);

      if (error) {
        console.error("Error checking admin status:", error);
        setIsAdmin(false);
      } else {
        setIsAdmin(roles && roles.length > 0);
      }
    } catch (error) {
      console.error("Error in checkAdminStatus:", error);
      setIsAdmin(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO {...PAGE_SEO.home} />
      <HomeHeader />
      
      <main id="main-content">
        <HeroSection />
        <HowItWorksSection />
        <ChoosePathSection />
        <ServicesGrid />
        <PricingPreview />
        <TestimonialsSection />
        <FinalCTA />
      </main>

      <Footer />
    </div>
  );
}

export default Index;
