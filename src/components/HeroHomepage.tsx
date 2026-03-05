import { Link } from "react-router-dom";
import { ArrowRight, Shield, Star, CheckCircle, Phone, Zap, Users, Lock, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE } from "@/config/site";
import { motion } from "framer-motion";
import heroImage from "@/assets/hero-homepage-premium.jpg";

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
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
});

export const HeroHomepage = () => {
  return (
    <section className="relative min-h-[100vh] overflow-hidden bg-[hsl(270_30%_6%)]">
      {/* Ambient background glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/4 w-[80vw] h-[80vw] rounded-full bg-[hsl(270_60%_20%/0.15)] blur-[120px]" />
        <div className="absolute -bottom-1/3 -left-1/4 w-[60vw] h-[60vw] rounded-full bg-[hsl(320_50%_20%/0.1)] blur-[100px]" />
        <div className="absolute top-1/4 left-1/2 w-[40vw] h-[40vw] rounded-full bg-[hsl(200_60%_25%/0.08)] blur-[80px]" />
      </div>

      <div className="relative z-10">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-[100vh] py-24 lg:py-28">

            {/* LEFT — Text content */}
            <div className="order-2 lg:order-1">
              {/* Live badge */}
              <motion.div {...fadeUp(0)} className="mb-8">
                <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/[0.06] backdrop-blur-xl border border-white/[0.08]">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                  </span>
                  <span className="text-[13px] font-semibold text-white/80 tracking-wide">
                    Protecting Ohio Families — Active Now
                  </span>
                </div>
              </motion.div>

              {/* Headline */}
              <motion.h1
                {...fadeUp(0.1)}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-[3.5rem] xl:text-7xl font-black text-white leading-[1.05] mb-6"
              >
                Stop AI Scams{" "}
                <br className="hidden sm:block" />
                <span className="relative">
                  <span className="bg-gradient-to-r from-[hsl(18_85%_65%)] via-[hsl(340_65%_68%)] to-[hsl(270_55%_68%)] bg-clip-text text-transparent">
                    Before They Start
                  </span>
                </span>
              </motion.h1>

              {/* Subheadline */}
              <motion.p
                {...fadeUp(0.2)}
                className="text-lg md:text-xl text-white/60 leading-relaxed max-w-xl mb-8"
              >
                Expert cybersecurity training and real-time protection for families
                and businesses. Detect deepfakes, voice cloning, and phishing —
                backed by veterans who understand the mission.
              </motion.p>

              {/* Trust checklist */}
              <motion.div {...fadeUp(0.3)} className="space-y-3 mb-10">
                {trustPoints.map((point) => (
                  <div key={point.text} className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-primary/15 flex items-center justify-center flex-shrink-0">
                      <point.icon className="w-3.5 h-3.5 text-primary" />
                    </div>
                    <span className="text-sm font-medium text-white/70">{point.text}</span>
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
                <Button asChild variant="heroOutline" size="xl">
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
                {stats.map((stat, i) => (
                  <div key={stat.label} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/[0.06] backdrop-blur-sm border border-white/[0.08] flex items-center justify-center">
                      <stat.icon className="w-4.5 h-4.5 text-white/60" />
                    </div>
                    <div>
                      <div className="text-xl font-black text-white leading-none tracking-tight">{stat.value}</div>
                      <div className="text-[10px] font-semibold text-white/40 uppercase tracking-[0.12em] mt-0.5">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* RIGHT — Hero image with glassmorphic overlay card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, x: 30 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="order-1 lg:order-2 relative"
            >
              {/* Main image container */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-black/30">
                <img
                  src={heroImage}
                  alt="Multigenerational family safely using digital devices together in a modern living room"
                  className="w-full h-auto aspect-[4/3] lg:aspect-[3/4] xl:aspect-[4/5] object-cover"
                  loading="eager"
                  decoding="sync"
                  fetchPriority="high"
                />
                {/* Subtle gradient on image */}
                <div className="absolute inset-0 bg-gradient-to-t from-[hsl(270_30%_6%/0.5)] via-transparent to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[hsl(270_30%_6%/0.2)]" />
              </div>

              {/* Floating glassmorphic card — top right */}
              <motion.div
                initial={{ opacity: 0, y: -10, x: 10 }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="absolute -top-4 -right-4 lg:-top-5 lg:-right-5"
              >
                <div className="px-5 py-3.5 rounded-2xl bg-white/[0.08] backdrop-blur-2xl border border-white/[0.12] shadow-xl shadow-black/20">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                      <Lock className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">Protected</div>
                      <div className="text-[10px] text-white/50 font-medium">Real-time shield active</div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Floating glassmorphic card — bottom left */}
              <motion.div
                initial={{ opacity: 0, y: 10, x: -10 }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="absolute -bottom-4 -left-4 lg:-bottom-5 lg:-left-5"
              >
                <div className="px-5 py-3.5 rounded-2xl bg-white/[0.08] backdrop-blur-2xl border border-white/[0.12] shadow-xl shadow-black/20">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">5.0 Rating</div>
                      <div className="text-[10px] text-white/50 font-medium">Trusted by Ohio families</div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Decorative ring behind image */}
              <div className="absolute -inset-4 rounded-[2rem] border border-white/[0.04] -z-10" />
              <div className="absolute -inset-8 rounded-[2.5rem] border border-white/[0.02] -z-10" />
            </motion.div>

          </div>
        </div>

        {/* Bottom trust strip */}
        <div className="border-t border-white/[0.06] bg-white/[0.02] backdrop-blur-lg">
          <div className="container mx-auto px-6 lg:px-12 py-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-sm font-semibold text-white/70">
                  Rated 5.0 by Ohio families
                </span>
              </div>
              <div className="hidden md:flex items-center gap-5">
                {[
                  `${SITE.veteranDiscountPercent}% Veteran Discount`,
                  `${SITE.moneyBackGuaranteeDays}-Day Guarantee`,
                  "Privacy-First Approach",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.06]">
                    <CheckCircle className="w-3 h-3 text-emerald-400/80" />
                    <span className="text-[11px] font-medium text-white/60">{item}</span>
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
