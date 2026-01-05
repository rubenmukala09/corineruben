import { useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { HeroHomepage } from "@/components/HeroHomepage";
import { FeatureBar } from "@/components/home/FeatureBar";
import { ServicesShowcase } from "@/components/home/ServicesShowcase";
import { WorkingProcess } from "@/components/home/WorkingProcess";
import { ScamAlertsSection } from "@/components/home/ScamAlertsSection";
import { CompanyIntroSection } from "@/components/home/CompanyIntroSection";
import { FAQPreview } from "@/components/home/FAQPreview";
import { OhioImpactSection } from "@/components/home/OhioImpactSection";
import CTASection from "@/components/CTASection";
import { ScamShieldSubmission } from "@/components/ScamShieldSubmission";
import { PageTransition } from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import { SEO, PAGE_SEO } from "@/components/SEO";
import { SectionNav } from "@/components/SectionNav";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { useAdminStatus } from "@/hooks/useAdminStatus";
import seniorCoupleActive from "@/assets/senior-couple-active.jpg";
import { TrustedExpertsBar } from "@/components/home/TrustedExpertsBar";
import { TeamShowcase } from "@/components/home/TeamShowcase";

function Index() {
  const {
    isAdmin,
    isLoading
  } = useAdminStatus();
  const [scamShieldOpen, setScamShieldOpen] = useState(false);
  return <PageTransition variant="fade">
      <div className="min-h-screen bg-background">
        <SEO {...PAGE_SEO.home} />
        <Navigation />
        <SectionNav />
        <main id="main-content">
          {/* Hero Section */}
          <section id="hero">
            <HeroHomepage />
          </section>
          
          {/* Trusted Experts Bar - NEW */}
          <TrustedExpertsBar />
          
          {/* Numbered Features - NEW */}
          
          
          {/* Current Scam Alerts - Immediate Value */}
          <section id="alerts">
            <ScamAlertsSection />
          </section>
          
          <SectionDivider variant="curve" />
          
          <section id="features">
            <FeatureBar />
          </section>

          <SectionDivider variant="drops" />

          {/* Company Introduction - Who We Are & Why You Need Us */}
          <section id="intro">
            <CompanyIntroSection />
          </section>

          {/* Impact Stats Row - NEW */}
          

          {/* Services Showcase - Team of Experts */}
          <section id="services">
            <ServicesShowcase />
          </section>

          <SectionDivider variant="mountains" />

          {/* Ohio Community Impact */}
          <section id="ohio">
            <OhioImpactSection />
          </section>

          {/* Team Showcase - NEW */}
          <TeamShowcase />

          {/* Working Process - 4 Steps */}
          <section id="process">
            <WorkingProcess />
          </section>

          {/* FAQ Section */}
          <section id="faq">
            <FAQPreview />
          </section>

          {/* Final CTA with Senior Couple Image */}
          <CTASection headline="Join Our Protected Community" variant="image" backgroundImage={seniorCoupleActive}>
            <p className="text-xl text-white/90 mb-8">Join 100+ Ohio families who live confidently, knowing they're protected from AI scams.</p>
            <div className="flex flex-col sm:flex-row gap-4 flex-wrap justify-center">
              <Button asChild variant="gold" size="xl" className="w-full sm:w-auto">
                <Link to="/training#pricing">Get Protected Today</Link>
              </Button>
              <Button asChild variant="outlineLight" size="xl" className="w-full sm:w-auto">
                <Link to="/business">Business Solutions</Link>
              </Button>
            </div>
            <p className="text-white/80 mt-6 text-sm">
              ✓ Veteran-Owned ✓ Ohio-Based ✓ 60-Day Money-Back Guarantee
            </p>
          </CTASection>

          <Footer />
          
          <ScamShieldSubmission open={scamShieldOpen} onOpenChange={setScamShieldOpen} />
        </main>
      </div>
    </PageTransition>;
}
export default Index;