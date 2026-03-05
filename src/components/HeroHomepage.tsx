import { Link } from "react-router-dom";
import { ArrowRight, Shield, Star, CheckCircle, Phone, Zap, Users, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE } from "@/config/site";
import { motion } from "framer-motion";
import heroImage from "@/assets/hero-homepage-bright.jpg";

const stats = [
  { value: "500+", label: "Families Protected", icon: Users },
  { value: "99.8%", label: "Threat Detection", icon: Shield },
  { value: "24/7", label: "Active Monitoring", icon: Zap },
];

const trustPoints = [
  { text: "AI-powered scam detection", icon: Eye },
  { text: "Veteran-founded & Ohio-based", icon: Shield },
  { text: "Free family consultation", icon: Phone },
];

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
});

export const HeroHomepage = () => {
  return (
    <section className="relative min-h-[100vh] overflow-hidden bg-gradient-to-br from-background via-muted/30 to-background">
      {/* Soft ambient blurs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/3 -right-1/4 w-[60vw] h-[60vw] rounded-full bg-primary/[0.06] blur-[100px]" />
        <div className="absolute -bottom-1/4 -left-1/4 w-[50vw] h-[50vw] rounded-full bg-accent/[0.05] blur-[80px]" />
      </div>

      <div className="relative z-10">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center min-h-[100vh] py-24 lg:py-28">

            {/* LEFT — Text content */}
            <div className="order-2 lg:order-1">
              {/* Live badge */}
              <motion.div {...fadeUp(0)} className="mb-7">
                <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-primary/[0.08] border border-primary/[0.15]">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  <span className="text-[13px] font-semibold text-foreground/70 tracking-wide">
                    Protecting Ohio Families — Active Now
                  </span>
                </div>
              </motion.div>

              {/* Headline */}
              <motion.h1
                {...fadeUp(0.1)}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-[3.5rem] xl:text-7xl font-black text-foreground leading-[1.08] mb-6"
              >
                Stop AI Scams{" "}
                <br className="hidden sm:block" />
                <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                  Before They Start
                </span>
              </motion.h1>

              {/* Subheadline */}
              <motion.p
                {...fadeUp(0.2)}
                className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl mb-8"
              >
                Expert cybersecurity training and real-time protection for families
                and businesses. Detect deepfakes, voice cloning, and phishing —
                backed by veterans who understand the mission.
              </motion.p>

              {/* Trust checklist */}
              <motion.div {...fadeUp(0.3)} className="space-y-3 mb-10">
                {trustPoints.map((point) => (
                  <div key={point.text} className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <point.icon className="w-3.5 h-3.5 text-primary" />
                    </div>
                    <span className="text-sm font-medium text-foreground/70">{point.text}</span>
                  </div>
                ))}
              </motion.div>

              {/* CTAs */}
              <motion.div
                {...fadeUp(0.4)}
                className="flex flex-col sm:flex-row gap-4 mb-12"
              >
                <Button asChild size="xl">
                  <Link to="/training#pricing">
                    Get Protected Now <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="xl">
                  <a href={SITE.phone.tel}>
                    <Phone className="mr-2 w-5 h-5" /> Call {SITE.phone.display}
                  </a>
                </Button>
              </motion.div>

              {/* Stats */}
              <motion.div
                {...fadeUp(0.5)}
                className="flex flex-wrap gap-6 lg:gap-10"
              >
                {stats.map((stat) => (
                  <div key={stat.label} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-muted border border-border/60 flex items-center justify-center">
                      <stat.icon className="w-4.5 h-4.5 text-muted-foreground" />
                    </div>
                    <div>
                      <div className="text-xl font-black text-foreground leading-none tracking-tight">{stat.value}</div>
                      <div className="text-[10px] font-semibold text-muted-foreground uppercase tracking-[0.12em] mt-0.5">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* RIGHT — Hero image with floating cards */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="order-1 lg:order-2 relative"
            >
              {/* Main image */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-primary/10 border border-border/40">
                <img
                  src={heroImage}
                  alt="Diverse family safely using digital devices together in a bright modern living room"
                  className="w-full h-auto aspect-[4/3] lg:aspect-[3/4] xl:aspect-[4/5] object-cover"
                  loading="eager"
                  decoding="sync"
                  fetchPriority="high"
                />
                {/* Subtle bottom gradient for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-transparent" />
              </div>

              {/* Floating card — top right: Protected badge */}
              <motion.div
                initial={{ opacity: 0, y: -10, x: 10 }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="absolute -top-3 -right-3 lg:-top-4 lg:-right-4"
              >
                <div className="px-4 py-3 rounded-2xl bg-background/90 backdrop-blur-xl border border-border shadow-lg shadow-black/5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                      <Shield className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-foreground">Protected</div>
                      <div className="text-[10px] text-muted-foreground font-medium">Real-time shield active</div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Floating card — bottom left: Rating */}
              <motion.div
                initial={{ opacity: 0, y: 10, x: -10 }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="absolute -bottom-3 -left-3 lg:-bottom-4 lg:-left-4"
              >
                <div className="px-4 py-3 rounded-2xl bg-background/90 backdrop-blur-xl border border-border shadow-lg shadow-black/5">
                  <div className="flex items-center gap-2.5">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-foreground">5.0 Rating</div>
                      <div className="text-[10px] text-muted-foreground font-medium">Trusted by Ohio families</div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Decorative rings */}
              <div className="absolute -inset-3 rounded-[2rem] border border-border/20 -z-10" />
              <div className="absolute -inset-6 rounded-[2.5rem] border border-border/10 -z-10" />
            </motion.div>

          </div>
        </div>

        {/* Bottom trust strip */}
        <div className="border-t border-border/40 bg-muted/30 backdrop-blur-sm">
          <div className="container mx-auto px-6 lg:px-12 py-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-sm font-semibold text-foreground/70">
                  Rated 5.0 by Ohio families
                </span>
              </div>
              <div className="hidden md:flex items-center gap-4">
                {[
                  `${SITE.veteranDiscountPercent}% Veteran Discount`,
                  `${SITE.moneyBackGuaranteeDays}-Day Guarantee`,
                  "Privacy-First Approach",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted border border-border/50">
                    <CheckCircle className="w-3 h-3 text-emerald-500" />
                    <span className="text-[11px] font-medium text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroHomepage;
