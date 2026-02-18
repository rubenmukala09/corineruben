import { lazy, Suspense, useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { HeroHomepage } from "@/components/HeroHomepage";
import { HomeIntroSection } from "@/components/HomeIntroSection";
import { ScamShieldSubmission } from "@/components/ScamShieldSubmission";
import { PageTransition } from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import { SEO, PAGE_SEO } from "@/components/SEO";
import seniorCoupleActive from "@/assets/senior-couple-active.jpg";
import { SITE } from "@/config/site";
import { TrustBadgesSection } from "@/components/home/TrustBadgesSection";
import SiteOrientationGrid from "@/components/home/SiteOrientationGrid";
import PromoStrip from "@/components/home/PromoStrip";
import { ThreatTicker } from "@/components/home/ThreatTicker";
import { ArrowRight } from "lucide-react";

const FAQPreview = lazy(() =>
  import("@/components/home/FAQPreview").then((m) => ({
    default: m.FAQPreview,
  })),
);

const TestimonialsSection = lazy(() =>
  import("@/components/home/TestimonialsSection").then((m) => ({
    default: m.TestimonialsSection,
  })),
);

const LazySection = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<div className="h-96" />}>{children}</Suspense>
);

const Index = () => {
  const [scamShieldOpen, setScamShieldOpen] = useState(false);

  return (
    <PageTransition variant="fade">
      <div className="min-h-screen">
        <SEO {...PAGE_SEO.home} />
        <Navigation />

        <main>
          {/* Hero */}
          <section id="hero">
            <HeroHomepage />
          </section>

          {/* Threat Ticker */}
          <ThreatTicker />

          {/* Stats Counter + Intro */}
          <HomeIntroSection />

          {/* Services directory */}
          <SiteOrientationGrid />

          {/* How It Works */}
          <PromoStrip />

          {/* Testimonials */}
          <section id="testimonials">
            <LazySection>
              <TestimonialsSection />
            </LazySection>
          </section>

          {/* Trust proof */}
          <TrustBadgesSection />

          {/* FAQ */}
          <section id="faq">
            <LazySection>
              <FAQPreview />
            </LazySection>
          </section>

          {/* Final CTA */}
          <section id="final-action" className="py-20 md:py-28 lg:py-32 relative overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${seniorCoupleActive})` }}
            />
            <div className="absolute inset-0 bg-foreground/80" />

            <div className="container mx-auto px-4 text-center relative z-10">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                Join Our Protected Community
              </h2>
              <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
                Join families across Ohio who live confidently, knowing they are
                protected from AI scams.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                <Button
                  asChild
                  size="lg"
                  className="h-12 px-8 text-sm font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <Link to="/training#pricing">
                    Get Protected Today <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="h-12 px-8 text-sm font-semibold rounded-lg border-2 border-white/30 text-white hover:bg-white/10"
                >
                  <Link to="/business">Business Solutions</Link>
                </Button>
              </div>
              <p className="text-white/60 text-sm">
                ✓ {SITE.veteranDiscountPercent}% Veteran Discount ✓
                Privacy-First ✓ {SITE.moneyBackGuaranteeDays}-Day Guarantee
              </p>
            </div>
          </section>

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
