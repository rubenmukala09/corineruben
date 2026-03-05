import { Link } from "react-router-dom";
import { ArrowRight, Shield, Star, CheckCircle, Phone, Zap, Users } from "lucide-react";
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
  "AI-powered scam detection",
  "Veteran-founded & Ohio-based",
  "Free family consultation",
];

export const HeroHomepage = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Full-bleed background image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Multigenerational family safely using digital devices together in a modern living room"
          className="w-full h-full object-cover"
          loading="eager"
          decoding="sync"
          fetchPriority="high"
        />
        {/* Cinematic overlay — left-heavy for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[hsl(270_30%_8%/0.92)] via-[hsl(270_25%_10%/0.75)] to-[hsl(270_20%_12%/0.45)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(270_30%_6%/0.6)] via-transparent to-[hsl(270_20%_8%/0.3)]" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="min-h-[92vh] flex flex-col justify-center py-28 lg:py-32">
            <div className="max-w-3xl">

              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-8"
              >
                <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
                  </span>
                  <span className="text-sm font-semibold text-white/90 tracking-wide">
                    Protecting Ohio Families — Active Now
                  </span>
                </div>
              </motion.div>

              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.08] mb-7"
              >
                Stop AI Scams{" "}
                <br className="hidden sm:block" />
                <span className="bg-gradient-to-r from-[hsl(18_90%_69%)] via-[hsl(320_60%_70%)] to-[hsl(288_60%_65%)] bg-clip-text text-transparent">
                  Before They Start
                </span>
              </motion.h1>

              {/* Subheadline */}
              <motion.p
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg md:text-xl text-white/75 leading-relaxed max-w-2xl mb-8"
              >
                Expert cybersecurity training and real-time protection for families 
                and businesses. Detect deepfakes, voice cloning, and phishing — 
                backed by veterans who understand the mission.
              </motion.p>

              {/* Trust checklist */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-wrap gap-x-6 gap-y-2.5 mb-10"
              >
                {trustPoints.map((point) => (
                  <div key={point} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span className="text-sm font-medium text-white/80">{point}</span>
                  </div>
                ))}
              </motion.div>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="flex flex-col sm:flex-row gap-4 mb-14"
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

              {/* Stats row */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex flex-wrap gap-8 lg:gap-12"
              >
                {stats.map((stat) => (
                  <div key={stat.label} className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-white/10 backdrop-blur-sm border border-white/15 flex items-center justify-center">
                      <stat.icon className="w-5 h-5 text-white/80" />
                    </div>
                    <div>
                      <div className="text-2xl font-black text-white leading-none">{stat.value}</div>
                      <div className="text-[11px] font-medium text-white/55 uppercase tracking-wider mt-0.5">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </motion.div>

            </div>
          </div>
        </div>

        {/* Bottom trust bar */}
        <div className="bg-white/8 backdrop-blur-lg border-t border-white/10">
          <div className="container mx-auto px-6 lg:px-12 py-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-sm font-semibold text-white/90">
                  Rated 5.0 by Ohio families
                </span>
              </div>
              <div className="hidden md:flex items-center gap-6">
                {[
                  `${SITE.veteranDiscountPercent}% Veteran Discount`,
                  `${SITE.moneyBackGuaranteeDays}-Day Guarantee`,
                  "Privacy-First Approach",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/8 border border-white/12">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-xs font-medium text-white/80">{item}</span>
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
