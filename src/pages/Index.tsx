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
import { ArrowRight, Shield, Phone, CheckCircle } from "lucide-react";
import { motion, useInView } from "framer-motion";

const FAQPreview = lazy(() =>
  import("@/components/home/FAQPreview").then((m) => ({
    default: m.FAQPreview,
  })),
);

const LazySection = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<div className="h-96" />}>{children}</Suspense>
);

const Index = () => {
  const [scamShieldOpen, setScamShieldOpen] = useState(false);
  const ctaRef = useRef(null);
  const ctaInView = useInView(ctaRef, { once: true, margin: "-50px" });

  return (
    <PageTransition variant="fade">
      <div className="min-h-screen">
        <SEO {...PAGE_SEO.home} />
        <Navigation />

        <main>
          {/* Hero — unchanged */}
          <section id="hero">
            <HeroHomepage />
          </section>

          {/* Stats Counter + Intro */}
          <HomeIntroSection />

          {/* Services directory */}
          <SiteOrientationGrid />

          {/* How It Works */}
          <PromoStrip />

          {/* Trust proof */}
          <TrustBadgesSection />

          {/* FAQ */}
          <section id="faq">
            <LazySection>
              <FAQPreview />
            </LazySection>
          </section>

          {/* Final CTA — 3D immersive style */}
          <section id="final-action" className="py-20 md:py-28 lg:py-32 relative overflow-hidden" ref={ctaRef}>
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${seniorCoupleActive})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/75 to-foreground/60" />

            <div className="container mx-auto px-4 text-center relative z-10" style={{ perspective: 800 }}>
              <motion.div
                initial={{ opacity: 0, y: 40, rotateX: 10 }}
                animate={ctaInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                transition={{ duration: 0.7, ease: "easeOut" }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm mb-6">
                  <Shield className="w-4 h-4 text-primary" />
                  <span className="text-xs font-bold uppercase tracking-wider text-white/80">
                    Join Our Protected Community
                  </span>
                </div>

                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                  Start Protecting Your Family{" "}
                  <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Today</span>
                </h2>
                <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
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
                    className="h-14 px-10 text-base font-bold rounded-full border-2 border-white/30 text-white hover:bg-white/10 transition-all hover:scale-105 active:scale-95"
                  >
                    <Link to="/business">Business Solutions</Link>
                  </Button>
                </div>

                {/* Trust indicators */}
                <div className="flex flex-wrap gap-4 justify-center">
                  {[
                    `${SITE.veteranDiscountPercent}% Veteran Discount`,
                    "Privacy-First",
                    `${SITE.moneyBackGuaranteeDays}-Day Guarantee`,
                    "24/7 Support",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/15">
                      <CheckCircle className="w-3.5 h-3.5 text-primary" />
                      <span className="text-xs font-medium text-white/80">{item}</span>
                    </div>
                  ))}
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
