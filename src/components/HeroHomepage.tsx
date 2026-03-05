import { Link } from "react-router-dom";
import { ArrowRight, Shield, Star, CheckCircle, Phone, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE } from "@/config/site";
import { motion } from "framer-motion";
import heroFamily from "@/assets/hero-family-protected.jpg";
import shieldLogo from "@/assets/shield-logo.png";

export const HeroHomepage = () => {
  return (
    <section className="relative min-h-[90vh] lg:min-h-screen overflow-hidden bg-[hsl(260_30%_6%)]">
      {/* Ambient background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-primary/12 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[50%] rounded-full bg-accent/8 blur-[100px]" />
      </div>

      {/* Main Content — two-column layout */}
      <div className="relative z-10 min-h-[90vh] lg:min-h-screen flex items-center">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center py-24 lg:py-0">

            {/* Left — Text Content */}
            <div className="order-2 lg:order-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm mb-8">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-[0.15em] text-primary">
                    Protecting Ohio Families Since 2024
                  </span>
                </div>
              </motion.div>

              <motion.h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-[3.5rem] xl:text-7xl font-black text-white leading-[1.05] mb-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Your Family's{" "}
                <span className="bg-gradient-to-r from-primary via-[hsl(280_80%_65%)] to-accent bg-clip-text text-transparent">
                  Digital Shield
                </span>{" "}
                Against AI Scams
              </motion.h1>

              <motion.p
                className="text-lg md:text-xl text-white/70 leading-relaxed max-w-xl mb-10"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Veteran-founded cybersecurity that trains families and businesses to detect deepfakes, voice cloning, and phishing — before they cause damage.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 mb-10"
              >
                <Button asChild size="xl">
                  <Link to="/training#pricing">
                    Start Protection <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button asChild variant="heroOutline" size="xl">
                  <a href={SITE.phone.tel}>
                    <Phone className="mr-2 w-5 h-5" /> {SITE.phone.display}
                  </a>
                </Button>
              </motion.div>

              {/* Inline social proof */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="flex items-center gap-4"
              >
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-sm text-white/60">
                  Trusted by <strong className="text-white/90">100+</strong> Ohio families
                </span>
              </motion.div>
            </div>

            {/* Right — Image Composition */}
            <motion.div
              className="order-1 lg:order-2 relative"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Main image with styled frame */}
              <div className="relative">
                <div className="relative rounded-3xl overflow-hidden shadow-[0_30px_80px_-20px_hsl(var(--primary)/0.4)]">
                  <img
                    src={heroFamily}
                    alt="Multigenerational family safely using digital devices together"
                    className="w-full h-auto object-cover aspect-[4/3]"
                    width={960}
                    height={720}
                    loading="eager"
                    decoding="sync"
                    fetchPriority="high"
                  />
                  {/* Subtle gradient overlay at edges */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[hsl(260_30%_6%/0.3)] via-transparent to-transparent" />
                  <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-3xl" />
                </div>

                {/* Floating shield logo badge */}
                <motion.div
                  className="absolute -top-5 -left-5 lg:-top-6 lg:-left-6 z-20"
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-2xl bg-[hsl(260_25%_12%)] border border-white/15 shadow-2xl flex items-center justify-center backdrop-blur-xl">
                    <img src={shieldLogo} alt="" className="w-10 h-10 lg:w-12 lg:h-12 object-contain" />
                  </div>
                </motion.div>

                {/* Floating "Protected" badge — bottom right */}
                <motion.div
                  className="absolute -bottom-4 -right-4 lg:-bottom-5 lg:-right-5 z-20"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="px-5 py-3 rounded-2xl bg-[hsl(260_25%_12%)]/95 border border-white/15 shadow-2xl backdrop-blur-xl"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/15 flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-emerald-400" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white leading-none">Family Protected</p>
                        <p className="text-[11px] text-white/50 mt-0.5">All devices secured</p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Floating stat — top right */}
                <motion.div
                  className="absolute -top-3 -right-3 lg:top-4 lg:-right-6 z-20 hidden sm:block"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1 }}
                >
                  <motion.div
                    animate={{ y: [0, -7, 0] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                    className="px-4 py-3 rounded-2xl bg-[hsl(260_25%_12%)]/95 border border-white/15 shadow-2xl backdrop-blur-xl"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-lg bg-primary/15 flex items-center justify-center">
                        <Shield className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-lg font-black text-white leading-none">99%</p>
                        <p className="text-[10px] text-white/50 font-medium">Detection Rate</p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>

      {/* Bottom Trust Bar — KEPT AS REQUESTED */}
      <div className="absolute bottom-0 left-0 right-0 z-20 bg-white/10 backdrop-blur-md border-t border-white/15">
        <div className="container mx-auto px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-sm font-medium text-white/90">Trusted by 100+ Ohio Families</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              {[
                { value: "99%", label: "Success Rate" },
                { value: "24/7", label: "Monitoring" },
                { value: "100+", label: "Families" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-xl font-black text-white">{stat.value}</div>
                  <div className="text-[10px] font-medium text-white/60 uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
            <div className="hidden lg:flex items-center gap-3">
              {[
                { icon: Shield, label: "Verified Experts" },
                { icon: Shield, label: "Ohio Based" },
              ].map((badge) => (
                <div
                  key={badge.label}
                  className="flex items-center gap-2 px-3 py-2 bg-white/10 rounded-xl border border-white/15"
                >
                  <badge.icon className="w-3.5 h-3.5 text-white/80" />
                  <span className="text-xs font-medium text-white/90">{badge.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroHomepage;
