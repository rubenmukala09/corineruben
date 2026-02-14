import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { HeroHomepage } from "@/components/HeroHomepage";
import { WorkshopsPromo } from "@/components/home/WorkshopsPromo";
import { AIBusinessPromo } from "@/components/home/AIBusinessPromo";
import { ResourcesPromo } from "@/components/home/ResourcesPromo";
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
import seniorCoupleActive from "@/assets/senior-couple-active.jpg";
import { FamilyTrustSection } from "@/components/home/FamilyTrustSection";
import { SITE } from "@/config/site";
const LiveSecurityStats = lazy(
  () => import("@/components/home/LiveSecurityStats"),
);
const SocialProofTicker = lazy(() => import("@/components/SocialProofTicker"));
const PremiumGlassmorphismWidgets = lazy(
  () => import("@/components/home/PremiumGlassmorphismWidgets"),
);
const Index = () => {
  const [scamShieldOpen, setScamShieldOpen] = useState(false);
  const [enableLiveWidgets, setEnableLiveWidgets] = useState(false);
  const [enableStats, setEnableStats] = useState(false);
  const statsRef = useRef<HTMLElement | null>(null);

  // Combined effect for performance optimization - handles both widget loading and stats observer
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const saveData =
      "connection" in navigator &&
      (
        navigator as Navigator & {
          connection?: {
            saveData?: boolean;
          };
        }
      ).connection?.saveData;

    if (prefersReducedMotion || saveData) return;

    // Setup lazy widget loading
    const enableWidgets = () => setEnableLiveWidgets(true);
    let idleId: number | ReturnType<typeof setTimeout>;
    if ("requestIdleCallback" in window) {
      idleId = (window as any).requestIdleCallback(enableWidgets, {
        timeout: 2000,
      });
    } else {
      idleId = setTimeout(enableWidgets, 1500);
    }

    // Setup stats intersection observer
    const element = statsRef.current;
    let observer: IntersectionObserver | null = null;

    if (element) {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries[0]?.isIntersecting) {
            setEnableStats(true);
            observer?.disconnect();
          }
        },
        { rootMargin: "200px" },
      );
      observer.observe(element);
    }

    // Cleanup both
    return () => {
      if ("cancelIdleCallback" in window && typeof idleId === "number") {
        (window as any).cancelIdleCallback(idleId);
      } else {
        clearTimeout(idleId as ReturnType<typeof setTimeout>);
      }
      observer?.disconnect();
    };
  }, []);
  return (
    <PageTransition variant="fade">
      <div className="min-h-screen">
        <SEO {...PAGE_SEO.home} />
        <Navigation />
        <SectionNav />

        {/* Floating widgets */}
        {enableLiveWidgets && (
          <Suspense fallback={null}>
            <SocialProofTicker />
          </Suspense>
        )}

        <main>
          {/* Hero Section */}
          <section id="hero">
            <HeroHomepage />
          </section>

          {/* Live Security Stats - NEW */}
          <section id="stats" ref={statsRef}>
            {enableStats ? (
              <Suspense
                fallback={<div className="min-h-[320px]" aria-hidden="true" />}
              >
                <LiveSecurityStats />
              </Suspense>
            ) : (
              <div className="min-h-[320px]" aria-hidden="true" />
            )}
          </section>

          {/* Workshops Promo - Learn & Train Introduction */}
          <section id="workshops">
            <WorkshopsPromo />
          </section>

          {/* AI & Business Promo */}
          <section id="business">
            <AIBusinessPromo />
          </section>

          {/* Current Scam Alerts - Immediate Value */}
          <section id="alerts">
            <ScamAlertsSection onSubmitThreat={() => setScamShieldOpen(true)} />
          </section>

          {/* Resources Promo */}
          <section id="resources">
            <ResourcesPromo />
          </section>

          {/* Why Families Trust Us */}
          <section id="trust">
            <FamilyTrustSection />
          </section>

          {/* Working Process */}
          <WorkingProcess />

          {/* FAQ Section */}
          <FAQPreview />

          {/* Quick Links */}
          <section id="quick-links">
            <QuickLinksSection />
          </section>

          {/* Final CTA */}
          <CTASection
            headline="Join Our Protected Community"
            variant="image"
            backgroundImage={seniorCoupleActive}
          >
            <p className="text-lg text-white/90 mb-6">
              Join families across Ohio who live confidently, knowing they're
              protected from AI scams.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 flex-wrap justify-center">
              <Button
                asChild
                size="lg"
                className="h-12 px-8 text-sm font-bold rounded-full bg-gradient-to-r from-primary to-accent text-white hover:opacity-90"
              >
                <Link to="/training#pricing" className="text-white">
                  Get Protected Today
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-12 px-8 text-sm font-bold rounded-full border-2 border-white/30 text-white hover:bg-white/10"
              >
                <Link to="/business">Business Solutions</Link>
              </Button>
            </div>
            <p className="text-white/80 mt-4 text-sm">
              ✓ {SITE.veteranDiscountPercent}% Veteran Discount ✓ Privacy-First
              Practices ✓ {SITE.moneyBackGuaranteeDays}-Day Money-Back Guarantee
            </p>
          </CTASection>

          <Footer />

          <ScamShieldSubmission
            open={scamShieldOpen}
            onOpenChange={setScamShieldOpen}
          />
        </main>
      </div>
    </PageTransition>
  );
};
export default Index;
