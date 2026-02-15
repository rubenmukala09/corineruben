import { Link } from "react-router-dom";
import { ArrowRight, Shield, Star, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
const heroImage = "/images/hero-corporate-protection.webp";
import { SITE } from "@/config/site";

const trustBadges = [
  { label: "Ohio-Based Team" },
  { label: `${SITE.veteranDiscountPercent}% Veteran Discount` },
  { label: `${SITE.moneyBackGuaranteeDays}-Day Guarantee` },
  { label: "24/7 Support" },
];

export const HeroHomepage = () => {
  return (
    <section className="relative min-h-[85vh] sm:min-h-[90vh] lg:min-h-screen overflow-hidden">
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
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/75 to-slate-900/50" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-[85vh] sm:min-h-[90vh] lg:min-h-screen flex items-center">
        <div className="container mx-auto px-5 sm:px-6 lg:px-12">
          <div className="max-w-2xl py-16 sm:py-20 lg:py-0">
            <div>
              <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm mb-5 sm:mb-8">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.12em] sm:tracking-[0.15em] text-white/80">
                  Protecting Ohio Families Since 2024
                </span>
              </div>
            </div>

            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-[1.08] mb-4 sm:mb-6">
                Stop AI Scams{" "}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Before They Start
                </span>
              </h1>
            </div>

            <div>
              <p className="text-base sm:text-lg md:text-xl text-white/80 leading-relaxed max-w-lg mb-6 sm:mb-10">
                Veteran-supporting cybersecurity for families and businesses. We train you to spot deepfakes, voice cloning, and phishing attacks.
              </p>
            </div>

            <div>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-10">
                <Button
                  asChild
                  size="lg"
                  className="h-12 sm:h-14 px-6 sm:px-10 text-sm sm:text-base font-bold rounded-full bg-gradient-to-r from-primary to-accent text-white hover:opacity-90 shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95 w-full sm:w-auto"
                >
                  <Link to="/training#pricing">
                    Get Protected <ArrowRight className="ml-2 w-4 sm:w-5 h-4 sm:h-5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="h-12 sm:h-14 px-6 sm:px-10 text-sm sm:text-base font-bold rounded-full border-2 border-white/30 text-white hover:bg-white/10 transition-all hover:scale-105 active:scale-95 w-full sm:w-auto"
                >
                  <Link to="/business">For Businesses</Link>
                </Button>
              </div>
            </div>

            <div>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {trustBadges.map((badge) => (
                  <div
                    key={badge.label}
                    className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/15"
                  >
                    <CheckCircle className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-emerald-400" />
                    <span className="text-[10px] sm:text-xs font-medium text-white/80">{badge.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Trust Bar */}
      <div className="absolute bottom-0 left-0 right-0 z-20 bg-white/10 backdrop-blur-md border-t border-white/15">
        <div className="container mx-auto px-5 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-6">
            {/* Stars + Rating */}
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 sm:w-4 h-3.5 sm:h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-xs sm:text-sm font-medium text-white/80">Trusted by 100+ Ohio Families</span>
            </div>

            {/* Stats — visible on tablet+ */}
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

            {/* Badges — visible on lg+ */}
            <div className="hidden lg:flex items-center gap-3">
              {[
                { icon: Shield, label: "Verified Experts" },
                { icon: Shield, label: "Ohio Based" },
              ].map((badge) => (
                <div
                  key={badge.label}
                  className="flex items-center gap-2 px-3 py-2 bg-white/10 rounded-xl border border-white/15"
                >
                  <badge.icon className="w-3.5 h-3.5 text-white/70" />
                  <span className="text-xs font-medium text-white/80">{badge.label}</span>
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
