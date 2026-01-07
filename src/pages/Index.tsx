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
import { QuickLinksSection } from "@/components/home/QuickLinksSection";
import CTASection from "@/components/CTASection";
import { ScamShieldSubmission } from "@/components/ScamShieldSubmission";
import { PageTransition } from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import { SEO, PAGE_SEO } from "@/components/SEO";
import { SectionNav } from "@/components/SectionNav";
import { SectionDivider } from "@/components/ui/SectionDivider";
import seniorCoupleActive from "@/assets/senior-couple-active.jpg";
import { TrustedExpertsBar } from "@/components/home/TrustedExpertsBar";
import { FloatingGraphics } from "@/components/ui/FloatingGraphics";
import { AccentDecoration } from "@/components/ui/AccentDecoration";
const Index = () => {
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
          <section id="workshops" className="relative">
            <FloatingGraphics variant="shields" intensity="light" />
            <AccentDecoration variant="shield3d" position="top-right" className="opacity-40" />
            <WorkshopsPromo />
          </section>
          
          <SectionDivider variant="curve" />
          
          {/* AI & Business Promo */}
          <section id="business" className="relative">
            <FloatingGraphics variant="cubes3d" intensity="light" />
            <AccentDecoration variant="tech-lines" position="top-right" className="opacity-30" />
            <AccentDecoration variant="cubeStack" position="bottom-left" className="opacity-25" />
            <AIBusinessPromo />
          </section>
          
          {/* Current Scam Alerts - Immediate Value */}
          <section id="alerts" className="relative">
            <FloatingGraphics variant="circuits" intensity="light" />
            <AccentDecoration variant="gradient-blob" position="top-left" className="opacity-20" />
            <ScamAlertsSection />
          </section>
          
          <SectionDivider variant="drops" />
          
          {/* Resources Promo */}
          <section id="resources" className="relative">
            <FloatingGraphics variant="waves" intensity="light" />
            <AccentDecoration variant="orb" position="bottom-left" className="opacity-20" />
            <AccentDecoration variant="shield3d" position="bottom-right" className="opacity-30" />
            <ResourcesPromo />
          </section>
          <SectionDivider variant="mountains" />
          
          {/* Community Impact - Veteran Support, Cancer Children, etc. */}
          <section id="community" className="relative">
            <FloatingGraphics variant="hexagons" intensity="light" />
            <AccentDecoration variant="cubeStack" position="top-right" className="opacity-25" />
            <CommunityImpact />
          </section>

          {/* Working Process - How It Works */}
          <section id="process" className="relative">
            <FloatingGraphics variant="shields" intensity="light" />
            <AccentDecoration variant="corner" position="top-left" className="opacity-40" />
            <AccentDecoration variant="tech-lines" position="bottom-right" className="opacity-30" />
            <WorkingProcess />
          </section>

          {/* FAQ Section */}
          <section id="faq" className="relative">
            <FloatingGraphics variant="particles" intensity="medium" />
            <AccentDecoration variant="gradient-blob" position="top-right" className="opacity-15" />
            <FAQPreview />
          </section>

          {/* Quick Links - FAQ, Contact, Careers */}
          <section id="quick-links" className="relative">
            <FloatingGraphics variant="cubes3d" intensity="light" />
            <AccentDecoration variant="grid" position="top-right" className="opacity-20" />
            <AccentDecoration variant="dots" position="bottom-left" className="opacity-25" />
            <QuickLinksSection />
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
              ✓ 10% Veteran Discount ✓ HIPAA Compliant ✓ 30-Day Money-Back Guarantee
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
