import { lazy, Suspense, useState, useRef } from "react";
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
import { TestimonialCarousel } from "@/components/home/TestimonialCarousel";
import { LiveSecurityStats } from "@/components/home/LiveSecurityStats";
import { WorkshopsPromo } from "@/components/home/WorkshopsPromo";
import { FamilyTrustSection } from "@/components/home/FamilyTrustSection";
import { ArrowRight, CheckCircle, Sparkles } from "lucide-react";
import { motion, useInView } from "framer-motion";

const FAQPreview = lazy(() =>
  import("@/components/home/FAQPreview").then((m) => ({
    default: m.FAQPreview,
  })),
);

const BlogPreview = lazy(() =>
  import("@/components/home/BlogPreview").then((m) => ({
    default: m.BlogPreview,
  })),
);

const NewsletterSection = lazy(() =>
  import("@/components/home/NewsletterSection").then((m) => ({
    default: m.NewsletterSection,
  })),
);

const LazySection = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<div className="h-96" />}>{children}</Suspense>
);

const SectionDivider = ({ className = "" }: { className?: string }) => (
  <div className={`home-section-divider ${className}`.trim()} aria-hidden="true">
    <span />
  </div>
);

const Index = () => {
  const [scamShieldOpen, setScamShieldOpen] = useState(false);
  const ctaRef = useRef(null);
  const ctaInView = useInView(ctaRef, { once: true, margin: "-50px" });

  return (
    <PageTransition variant="fade">
      <div className="min-h-screen home-page-shell">
        <div className="home-page-backdrop" aria-hidden="true" />
        <SEO {...PAGE_SEO.home} />
        <Navigation />

        <main className="relative z-[1] home-page-main">
          {/* Hero */}
          <section id="hero" className="home-hero-shell">
            <HeroHomepage />
          </section>

          {/* Live Threat Ticker */}
          <div className="home-ticker-shell">
            <ThreatTicker />
          </div>

          {/* Stats + Visual Bento Intro + Real Results */}
          <SectionDivider className="home-divider-hero" />
          <div id="stats" className="home-section-surface home-surface-coral">
            <HomeIntroSection />
          </div>

          {/* Live Security Command Center */}
          <SectionDivider />
          <div id="live-security" className="home-section-surface">
            <LiveSecurityStats />
          </div>

          {/* Services with images */}
          <SectionDivider />
          <div id="services" className="home-section-surface home-surface-lavender">
            <SiteOrientationGrid />
          </div>

          {/* Protection Training Promo */}
          <SectionDivider />
          <div id="workshops" className="home-section-surface home-surface-sand">
            <WorkshopsPromo />
          </div>

          {/* How It Works */}
          <SectionDivider />
          <div id="get-protected" className="home-section-surface home-surface-coral">
            <PromoStrip />
          </div>

          {/* Family Trust Section */}
          <SectionDivider />
          <div id="trust" className="home-section-surface home-surface-lavender">
            <FamilyTrustSection />
          </div>

          {/* Testimonial Carousel */}
          <SectionDivider />
          <div id="testimonials" className="home-section-surface home-surface-card">
            <TestimonialCarousel />
          </div>

          {/* Trust Badges */}
          <SectionDivider />
          <div id="why-us" className="home-section-surface home-surface-coral">
            <TrustBadgesSection />
          </div>

          {/* Blog Preview */}
          <SectionDivider />
          <section id="blog" className="home-section-surface home-surface-sand">
            <LazySection>
              <BlogPreview />
            </LazySection>
          </section>

          {/* FAQ */}
          <SectionDivider />
          <section id="faq" className="home-section-surface home-surface-lavender">
            <LazySection>
              <FAQPreview />
            </LazySection>
          </section>

          {/* Newsletter */}
          <section id="newsletter">
            <LazySection>
              <NewsletterSection />
            </LazySection>
          </section>

          {/* Final CTA */}
          <section id="final-action" className="home-final-cta py-20 md:py-28 lg:py-32 relative overflow-hidden" ref={ctaRef}>
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${seniorCoupleActive})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/68 via-foreground/46 to-foreground/24" />
            <div className="absolute inset-0 home-final-cta-overlay" />
            <div className="absolute inset-0 home-final-cta-grid" />

            <div className="container mx-auto px-4 text-center relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={ctaInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, ease: "easeOut" }}
              >
                <div className="home-final-cta-panel max-w-4xl mx-auto rounded-[2rem] border border-white/28 bg-white/16 backdrop-blur-xl p-8 md:p-10 lg:p-14 shadow-[0_22px_56px_-24px_hsl(288_26%_18%_/_0.35)]">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/30 bg-white/15 backdrop-blur-sm mb-6">
                    <Sparkles className="w-4 h-4 text-accent" />
                    <span className="text-xs font-bold uppercase tracking-wider text-white/90">
                      Join Our Protected Community
                    </span>
                  </div>

                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                    Start Protecting Your Family{" "}
                    <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">Today</span>
                  </h2>
                  <p className="text-lg text-white/85 mb-8 max-w-2xl mx-auto">
                    Join families across Ohio who live confidently, knowing they are
                    protected from AI scams. Get started in minutes.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                    <Button
                      asChild
                      size="lg"
                      className="h-14 px-10 text-base font-bold rounded-full bg-gradient-to-r from-primary to-accent text-white hover:opacity-90 shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95"
                    >
                      <Link to="/training#pricing">
                        Get Protected Today <ArrowRight className="ml-2 w-5 h-5" />
                      </Link>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      size="lg"
                      className="h-14 px-10 text-base font-bold rounded-full border-2 border-white/35 text-white hover:bg-white/10 transition-all hover:scale-105 active:scale-95"
                    >
                      <Link to="/business">Business Solutions</Link>
                    </Button>
                  </div>

                  <div className="flex flex-wrap gap-4 justify-center">
                    {[
                      `${SITE.veteranDiscountPercent}% Veteran Discount`,
                      "Privacy-First",
                      `${SITE.moneyBackGuaranteeDays}-Day Guarantee`,
                      "24/7 Support",
                    ].map((item) => (
                      <div key={item} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                        <CheckCircle className="w-3.5 h-3.5 text-accent" />
                        <span className="text-xs font-medium text-white/90">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
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
