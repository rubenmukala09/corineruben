import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { HeroHomepage } from "@/components/HeroHomepage";
import { FeatureBar } from "@/components/home/FeatureBar";
import { AboutSection } from "@/components/home/AboutSection";
import { ServicesShowcase } from "@/components/home/ServicesShowcase";
import { WorkingProcess } from "@/components/home/WorkingProcess";
import { TestimonialQuote } from "@/components/home/TestimonialQuote";
import { SecuritySolutions } from "@/components/home/SecuritySolutions";
import { BlogPreview } from "@/components/home/BlogPreview";
import { ScamAlertsSection } from "@/components/home/ScamAlertsSection";
import { ProtectionComparison } from "@/components/home/ProtectionComparison";
import { FAQPreview } from "@/components/home/FAQPreview";
import { OhioImpactSection } from "@/components/home/OhioImpactSection";
import TrustBar from "@/components/TrustBar";
import CTASection from "@/components/CTASection";
import { ScamShieldSubmission } from "@/components/ScamShieldSubmission";
import { PageTransition } from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { SEO, PAGE_SEO } from "@/components/SEO";
import { SectionNav } from "@/components/SectionNav";
import heroProtectionFamily from "@/assets/hero-protection-family-1.jpg";

function Index() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [scamShieldOpen, setScamShieldOpen] = useState(false);
  
  useEffect(() => {
    checkAdminStatus();
  }, []);
  
  const checkAdminStatus = async () => {
    try {
      const {
        data: { user }
      } = await supabase.auth.getUser();
      if (!user) {
        setIsAdmin(false);
        setIsLoading(false);
        return;
      }
      const {
        data: roles,
        error
      } = await supabase.from("user_roles").select("role").eq("user_id", user.id).in("role", ["admin", "staff"]);
      if (error) {
        console.error("Error checking admin status:", error);
        setIsAdmin(false);
      } else {
        setIsAdmin(roles && roles.length > 0);
      }
    } catch (error) {
      console.error("Error in checkAdminStatus:", error);
      setIsAdmin(false);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <PageTransition variant="fade">
      <div className="min-h-screen bg-background">
        <SEO {...PAGE_SEO.home} />
        <Navigation />
        <SectionNav />
        <main id="main-content">
          {/* Hero Section */}
          <section id="hero">
            <HeroHomepage />
          </section>
          
          {/* Current Scam Alerts - Immediate Value */}
          <section id="alerts">
            <ScamAlertsSection />
          </section>
          
          <section id="features">
            <FeatureBar />
          </section>

          {/* About Section */}
          <section id="about">
            <AboutSection />
          </section>

          {/* Protection Plans Comparison */}
          <section id="plans">
            <ProtectionComparison />
          </section>

          {/* Services Showcase - Team of Experts */}
          <section id="services">
            <ServicesShowcase />
          </section>

          {/* Ohio Community Impact */}
          <section id="ohio">
            <OhioImpactSection />
          </section>

          {/* Security Solutions - Portfolio */}
          <section id="portfolio">
            <SecuritySolutions />
          </section>

          {/* Working Process - 4 Steps */}
          <section id="process">
            <WorkingProcess />
          </section>

          {/* Testimonial Quote */}
          <section id="testimonials">
            <TestimonialQuote />
          </section>

          {/* FAQ Section */}
          <section id="faq">
            <FAQPreview />
          </section>

          {/* Blog Preview */}
          <section id="blog">
            <BlogPreview />
          </section>

          {/* Final CTA with Image Background */}
          <CTASection 
            headline="Protect What Matters Most" 
            variant="image"
            backgroundImage={heroProtectionFamily}
          >
            <p className="text-xl text-white/90 mb-8">Join 500+ Ohio families who sleep better knowing they're protected from AI scams.</p>
            <div className="flex flex-col sm:flex-row gap-4 flex-wrap justify-center">
              <Button asChild variant="gold" size="xl" className="w-full sm:w-auto">
                <Link to="/training">Schedule Consultation</Link>
              </Button>
              <Button asChild variant="secondary" size="xl" className="w-full sm:w-auto">
                <Link to="/training#pricing">Get Protection Now</Link>
              </Button>
              <Button asChild variant="outlineLight" size="xl" className="w-full sm:w-auto">
                <Link to="/business">Get Business Quote</Link>
              </Button>
            </div>
            <p className="text-white/80 mt-6 text-sm">
              ✓ No credit card required ✓ Cancel anytime ✓ 60-day money-back guarantee
            </p>
          </CTASection>

          <Footer />
          
          <ScamShieldSubmission open={scamShieldOpen} onOpenChange={setScamShieldOpen} />
        </main>
      </div>
    </PageTransition>
  );
}

export default Index;
