import { useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { HeroHomepage } from "@/components/HeroHomepage";
import { WorkshopsPromo } from "@/components/home/WorkshopsPromo";
import { AIBusinessPromo } from "@/components/home/AIBusinessPromo";
import { ResourcesPromo } from "@/components/home/ResourcesPromo";
import { CommunityImpact } from "@/components/home/CommunityImpact";
import { WorkingProcess } from "@/components/home/WorkingProcess";
import { ScamAlertsSection } from "@/components/home/ScamAlertsSection";
import { FAQPreview } from "@/components/home/FAQPreview";
import CTASection from "@/components/CTASection";
import { ScamShieldSubmission } from "@/components/ScamShieldSubmission";
import { PageTransition } from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import { SEO, PAGE_SEO } from "@/components/SEO";
import { SectionNav } from "@/components/SectionNav";
import { SectionDivider } from "@/components/ui/SectionDivider";
import seniorCoupleActive from "@/assets/senior-couple-active.jpg";
import { TrustedExpertsBar } from "@/components/home/TrustedExpertsBar";

function Index() {
  const [scamShieldOpen, setScamShieldOpen] = useState(false);
  
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
          
          {/* Trusted Experts Bar - Social Proof */}
          <TrustedExpertsBar />
          
          {/* Workshops Promo - Learn & Train Introduction */}
          <section id="workshops">
            <WorkshopsPromo />
          </section>
          
          <SectionDivider variant="curve" />
          
          {/* AI & Business Promo */}
          <section id="business">
            <AIBusinessPromo />
          </section>
          
          {/* Current Scam Alerts - Immediate Value */}
          <section id="alerts">
            <ScamAlertsSection />
          </section>
          
          <SectionDivider variant="drops" />
          
          {/* Resources Promo */}
          <section id="resources">
            <ResourcesPromo />
          </section>
          
          <SectionDivider variant="mountains" />
          
          {/* Community Impact - Veteran Support, Cancer Children, etc. */}
          <section id="community">
            <CommunityImpact />
          </section>

          {/* Working Process - How It Works */}
          <section id="process">
            <WorkingProcess />
          </section>

          {/* FAQ Section */}
          <section id="faq">
            <FAQPreview />
          </section>

          {/* Final CTA with Senior Couple Image */}
          <CTASection headline="Join Our Protected Community" variant="image" backgroundImage={seniorCoupleActive}>
            <p className="text-xl text-white/90 mb-8">Join families across Ohio who live confidently, knowing they're protected from AI scams.</p>
            <div className="flex flex-col sm:flex-row gap-4 flex-wrap justify-center">
              <Button asChild variant="gold" size="xl" className="w-full sm:w-auto">
                <Link to="/training#pricing">Get Protected Today</Link>
              </Button>
              <Button asChild variant="outlineLight" size="xl" className="w-full sm:w-auto">
                <Link to="/business">Business Solutions</Link>
              </Button>
            </div>
            <p className="text-white/80 mt-6 text-sm">
              ✓ Veteran-Supporting ✓ Ohio-Based ✓ 60-Day Money-Back Guarantee
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
