import { Link } from "react-router-dom";
import { ArrowRight, Shield, Star, CheckCircle, Zap, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE } from "@/config/site";
import { motion } from "framer-motion";

const heroImage = "/images/hero-3d-cybersecurity.webp";
const shieldIcon = "/images/3d-shield-icon.webp";

const trustBadges = [
  { label: "Ohio-Based Team" },
  { label: `${SITE.veteranDiscountPercent}% Veteran Discount` },
  { label: `${SITE.moneyBackGuaranteeDays}-Day Guarantee` },
  { label: "24/7 Support" },
];

export const HeroHomepage = () => {
  return (
    <section className="relative min-h-[90vh] lg:min-h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Senior couple protected with digital security"
          width={1920}
          height={1080}
          loading="eager"
          decoding="sync"
          fetchPriority="high"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/76 via-slate-900/52 to-slate-900/18" />
        {/* Subtle animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-primary/10" />
      </div>

      {/* Floating 3D Shield — right side decorative */}
      <motion.div
        className="absolute right-[5%] top-[15%] w-48 h-48 md:w-72 md:h-72 lg:w-96 lg:h-96 hidden md:block z-10 pointer-events-none"
        initial={{ opacity: 0, scale: 0.6, rotateY: -30 }}
        animate={{ opacity: 0.6, scale: 1, rotateY: 0 }}
        transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
      >
        <motion.img
          src={shieldIcon}
          alt=""
          className="w-full h-full object-contain drop-shadow-2xl"
          animate={{ y: [0, -15, 0], rotateZ: [0, 2, -2, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Floating glassmorphism widgets */}
      <motion.div
        className="absolute right-[8%] bottom-[25%] hidden lg:block z-20"
        initial={{ opacity: 0, x: 40, rotateY: -15 }}
        animate={{ opacity: 1, x: 0, rotateY: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <motion.div
          className="glass-dark rounded-2xl p-4 shadow-3d-lg"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformStyle: "preserve-3d", perspective: 600 }}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
              <Zap className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-black text-white leading-none">2,847</p>
              <p className="text-[10px] text-white/60 font-medium uppercase tracking-wider">Scams Blocked</p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute left-[60%] top-[18%] hidden lg:block z-20"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.3 }}
      >
        <motion.div
          className="glass-dark rounded-2xl p-4 shadow-3d-lg"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
              <Users className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="text-2xl font-black text-white leading-none">5,000+</p>
              <p className="text-[10px] text-white/60 font-medium uppercase tracking-wider">Families Safe</p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 min-h-[90vh] lg:min-h-screen flex items-center">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-2xl py-24 lg:py-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm mb-8">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-[0.15em] text-white/80">
                  Protecting Ohio Families Since 2024
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05] mb-6">
                Stop AI Scams{" "}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Before They Start
                </span>
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-lg mb-10">
                Veteran-supporting cybersecurity for families and businesses. We train you to spot deepfakes, voice cloning, and phishing attacks.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <Button asChild size="xl">
                  <Link to="/training#pricing">
                    Get Protected <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="xl"
                  className="border-2 border-white/40 bg-white/10 text-white hover:bg-white/20 hover:text-white hover:border-white/60"
                >
                  <Link to="/business">For Businesses</Link>
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="flex flex-wrap gap-3">
                {trustBadges.map((badge) => (
                  <div
                    key={badge.label}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/15"
                  >
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-xs font-medium text-white/80">{badge.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Trust Bar */}
      <div className="absolute bottom-0 left-0 right-0 z-20 bg-white/18 backdrop-blur-md border-t border-white/25">
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
                  <div className="text-[10px] font-medium text-white/75 uppercase tracking-wider">{stat.label}</div>
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
