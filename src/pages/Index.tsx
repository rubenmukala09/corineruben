import { useState, lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { HeroHomepage } from "@/components/HeroHomepage";
import { PageTransition } from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import { SEO, PAGE_SEO } from "@/components/SEO";
import { SectionNav } from "@/components/SectionNav";
import seniorCoupleActive from "@/assets/senior-couple-active.jpg";
import { TrustedExpertsBar } from "@/components/home/TrustedExpertsBar";

// Lazy load below-the-fold sections for reduced main-thread work
const WorkshopsPromo = lazy(() => import("@/components/home/WorkshopsPromo").then(m => ({ default: m.WorkshopsPromo })));
const AIBusinessPromo = lazy(() => import("@/components/home/AIBusinessPromo").then(m => ({ default: m.AIBusinessPromo })));
const ResourcesPromo = lazy(() => import("@/components/home/ResourcesPromo").then(m => ({ default: m.ResourcesPromo })));
const CommunityImpact = lazy(() => import("@/components/home/CommunityImpact").then(m => ({ default: m.CommunityImpact })));
const WorkingProcess = lazy(() => import("@/components/home/WorkingProcess").then(m => ({ default: m.WorkingProcess })));
const ScamAlertsSection = lazy(() => import("@/components/home/ScamAlertsSection").then(m => ({ default: m.ScamAlertsSection })));
const FAQPreview = lazy(() => import("@/components/home/FAQPreview").then(m => ({ default: m.FAQPreview })));
const QuickLinksSection = lazy(() => import("@/components/home/QuickLinksSection").then(m => ({ default: m.QuickLinksSection })));
const CTASection = lazy(() => import("@/components/CTASection"));
const ScamShieldSubmission = lazy(() => import("@/components/ScamShieldSubmission").then(m => ({ default: m.ScamShieldSubmission })));
const SectionDivider = lazy(() => import("@/components/ui/SectionDivider").then(m => ({ default: m.SectionDivider })));
const FloatingGraphics = lazy(() => import("@/components/ui/FloatingGraphics").then(m => ({ default: m.FloatingGraphics })));
const AccentDecoration = lazy(() => import("@/components/ui/AccentDecoration").then(m => ({ default: m.AccentDecoration })));

// Loading placeholders with reserved height to prevent CLS
// Heights match actual section heights to prevent layout shifts
const SectionLoader = () => <div className="min-h-[600px]" aria-hidden="true" />;
const LargeSectionLoader = () => <div className="min-h-[900px]" aria-hidden="true" />;
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
          <Suspense fallback={<LargeSectionLoader />}>
            <section id="workshops" className="relative">
              <FloatingGraphics variant="shields" intensity="light" />
              <AccentDecoration variant="shield3d" position="top-right" className="opacity-40" />
              <WorkshopsPromo />
            </section>
            
            <SectionDivider variant="curve" />
          </Suspense>
          
          {/* AI & Business Promo */}
          <Suspense fallback={<SectionLoader />}>
            <section id="business" className="relative">
              <FloatingGraphics variant="cubes3d" intensity="light" />
              <AccentDecoration variant="tech-lines" position="top-right" className="opacity-30" />
              <AccentDecoration variant="cubeStack" position="bottom-left" className="opacity-25" />
              <AIBusinessPromo />
            </section>
          </Suspense>
          
          {/* Current Scam Alerts - Immediate Value */}
          <Suspense fallback={<SectionLoader />}>
            <section id="alerts" className="relative">
              <FloatingGraphics variant="circuits" intensity="light" />
              <AccentDecoration variant="gradient-blob" position="top-left" className="opacity-20" />
              <ScamAlertsSection />
            </section>
            
            <SectionDivider variant="drops" />
          </Suspense>
          
          {/* Resources Promo */}
          <Suspense fallback={<SectionLoader />}>
            <section id="resources" className="relative">
              <FloatingGraphics variant="waves" intensity="light" />
              <AccentDecoration variant="orb" position="bottom-left" className="opacity-20" />
              <AccentDecoration variant="shield3d" position="bottom-right" className="opacity-30" />
              <ResourcesPromo />
            </section>
            <SectionDivider variant="mountains" />
          </Suspense>
          
          {/* Community Impact - Veteran Support, Cancer Children, etc. */}
          <Suspense fallback={<SectionLoader />}>
            <section id="community" className="relative">
              <FloatingGraphics variant="hexagons" intensity="light" />
              <AccentDecoration variant="cubeStack" position="top-right" className="opacity-25" />
              <CommunityImpact />
            </section>
          </Suspense>

          {/* Working Process - How It Works */}
          <Suspense fallback={<SectionLoader />}>
            <section id="process" className="relative">
              <FloatingGraphics variant="shields" intensity="light" />
              <AccentDecoration variant="corner" position="top-left" className="opacity-40" />
              <AccentDecoration variant="tech-lines" position="bottom-right" className="opacity-30" />
              <WorkingProcess />
            </section>
          </Suspense>

          {/* FAQ Section */}
          <Suspense fallback={<SectionLoader />}>
            <section id="faq" className="relative">
              <FloatingGraphics variant="particles" intensity="medium" />
              <AccentDecoration variant="gradient-blob" position="top-right" className="opacity-15" />
              <FAQPreview />
            </section>
          </Suspense>

          {/* Quick Links - FAQ, Contact, Careers */}
          <Suspense fallback={<SectionLoader />}>
            <section id="quick-links" className="relative">
              <FloatingGraphics variant="cubes3d" intensity="light" />
              <AccentDecoration variant="grid" position="top-right" className="opacity-20" />
              <AccentDecoration variant="dots" position="bottom-left" className="opacity-25" />
              <QuickLinksSection />
            </section>
          </Suspense>

          {/* Final CTA with Senior Couple Image */}
          <Suspense fallback={<SectionLoader />}>
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
          </Suspense>

          <Footer />
          
          <Suspense fallback={null}>
            <ScamShieldSubmission open={scamShieldOpen} onOpenChange={setScamShieldOpen} />
          </Suspense>
        </main>
      </div>
    </PageTransition>
  );
}

export default Index;
