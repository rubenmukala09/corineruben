import { Link } from "react-router-dom";
import { ArrowRight, Shield, Star, CheckCircle, Phone, Zap, Users, Eye, Lock, Award, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE } from "@/config/site";
import { motion } from "framer-motion";
import heroImage from "@/assets/hero-homepage-cinematic.jpg";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.2, delay: delay * 0.15, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
});

const scaleIn = (delay: number) => ({
  initial: { opacity: 0, scale: 0.97 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.2, delay: delay * 0.15, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
});

export const HeroHomepage = () => {
  return (
    <section className="relative min-h-[100vh] overflow-hidden">
      {/* ── Full-bleed background image ── */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Multi-generational family safely using technology together"
          className="w-full h-full object-cover"
          loading="eager"
          decoding="sync"
          fetchPriority="high"
        />
        {/* Cinematic overlay — gradient from left for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--background))] via-[hsl(var(--background)/0.85)] to-transparent lg:via-[hsl(var(--background)/0.7)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--background))] via-transparent to-[hsl(var(--background)/0.3)]" />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="min-h-[100vh] flex flex-col justify-center py-28 lg:py-32 max-w-3xl">

            {/* Live status badge */}
            <motion.div {...fadeUp(0)} className="mb-8">
              <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-card/80 backdrop-blur-xl border border-border/50 shadow-lg shadow-primary/5">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
                <span className="text-sm font-semibold text-foreground tracking-wide">
                  2,847 threats blocked this month
                </span>
                <div className="w-px h-4 bg-border" />
                <span className="text-xs font-bold text-primary uppercase tracking-wider">Live</span>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              {...fadeUp(0.1)}
              className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-black text-foreground leading-[1.05] mb-6 tracking-tight"
            >
              AI-Powered{" "}
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Scam Protection
              </span>
              <br className="hidden sm:block" />
              for Your Family
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              {...fadeUp(0.2)}
              className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mb-10"
            >
              Real-time deepfake detection, voice clone analysis, and phishing prevention.
              Veteran-founded in Ohio — protecting 500+ families and counting.
            </motion.p>

            {/* CTAs — stacked prominently */}
            <motion.div {...fadeUp(0.3)} className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button asChild size="xl" className="shadow-lg shadow-primary/20">
                <Link to="/training#pricing">
                  <Shield className="mr-2 w-5 h-5" />
                  Start Protection — From $79
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="xl" className="bg-card/60 backdrop-blur-sm border-border/60 shadow-lg">
                <a href={SITE.phone.tel}>
                  <Phone className="mr-2 w-5 h-5" /> Call {SITE.phone.display}
                </a>
              </Button>
            </motion.div>

            {/* Metric cards — horizontal glassmorphic strip */}
            <motion.div {...fadeUp(0.4)} className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { value: "500+", label: "Families Protected", icon: Users },
                { value: "$1.2M", label: "Saved From Scams", icon: TrendingUp },
                { value: "99.8%", label: "Detection Rate", icon: Shield },
                { value: "< 2min", label: "Response Time", icon: Zap },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl bg-card/90 border border-border/60 p-4 shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex items-center gap-3">
                    <stat.icon className="w-5 h-5 text-primary flex-shrink-0" />
                    <div>
                      <div className="text-lg font-extrabold text-foreground leading-none">{stat.value}</div>
                      <div className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mt-1">{stat.label}</div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* ── Bottom floating trust bar ── */}
        <div className="border-t border-border/40 bg-card/90">
          <div className="container mx-auto px-6 lg:px-12 py-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-sm font-bold text-foreground">
                  5.0 — Rated by Ohio Families
                </span>
              </div>
              <div className="hidden md:flex items-center gap-3">
                {[
                  { icon: Award, text: `${SITE.veteranDiscountPercent}% Veteran Discount` },
                  { icon: Lock, text: `${SITE.moneyBackGuaranteeDays}-Day Money Back` },
                  { icon: Shield, text: "Privacy-First Approach" },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted/60 border border-border/40">
                    <item.icon className="w-3.5 h-3.5 text-primary" />
                    <span className="text-[11px] font-semibold text-muted-foreground">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Right-side floating elements (desktop only) ── */}
      <motion.div
        {...scaleIn(0.8)}
        className="hidden xl:block absolute top-[20%] right-[5%] z-20"
      >
        <div className="px-5 py-4 rounded-2xl bg-card/80 backdrop-blur-2xl border border-border/40 shadow-2xl shadow-primary/10 max-w-[220px]">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center">
              <Shield className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <div className="text-sm font-bold text-foreground">Protected</div>
              <div className="text-[10px] text-emerald-600 font-semibold">Shield Active</div>
            </div>
          </div>
          <div className="h-px bg-border/60 mb-3" />
          <div className="space-y-2">
            {["Voice Cloning", "Deepfake AI", "Phishing"].map((threat) => (
              <div key={threat} className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{threat}</span>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span className="text-[10px] font-bold text-emerald-600">Blocked</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div
        {...scaleIn(1.0)}
        className="hidden xl:block absolute bottom-[22%] right-[8%] z-20"
      >
        <div className="px-5 py-4 rounded-2xl bg-card/80 backdrop-blur-2xl border border-border/40 shadow-2xl shadow-primary/10">
          <div className="flex items-center gap-3">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <div>
              <div className="text-sm font-bold text-foreground">5.0 Rating</div>
              <div className="text-[10px] text-muted-foreground font-medium">100+ verified reviews</div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroHomepage;
