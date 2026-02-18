import { Link } from "react-router-dom";
import { ArrowRight, Shield, Star, CheckCircle, Play, AlertTriangle, Users, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";
const heroImage = "/images/hero-corporate-protection.webp";
import { SITE } from "@/config/site";

const trustBadges = [
  { label: "Ohio-Based Team" },
  { label: `${SITE.veteranDiscountPercent}% Veteran Discount` },
  { label: `${SITE.moneyBackGuaranteeDays}-Day Guarantee` },
  { label: "24/7 Support" },
];

const rotatingThreats = [
  "Voice Cloning Scams",
  "Deepfake Videos",
  "Phishing Attacks",
  "Identity Theft",
  "AI-Powered Fraud",
];

function useTypingRotation(words: string[], typingSpeed = 80, pauseMs = 2200) {
  const [displayed, setDisplayed] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayed === current) {
      timeout = setTimeout(() => setIsDeleting(true), pauseMs);
    } else if (isDeleting && displayed === "") {
      setIsDeleting(false);
      setWordIndex((i) => (i + 1) % words.length);
    } else {
      const speed = isDeleting ? typingSpeed / 2 : typingSpeed;
      timeout = setTimeout(() => {
        setDisplayed(
          isDeleting
            ? current.slice(0, displayed.length - 1)
            : current.slice(0, displayed.length + 1)
        );
      }, speed);
    }

    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, wordIndex, words, typingSpeed, pauseMs]);

  return displayed;
}

function useCountUpHero(target: number, duration = 2000) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const step = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return { value, ref };
}

export const HeroHomepage = () => {
  const typedThreat = useTypingRotation(rotatingThreats);

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
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/92 via-slate-900/80 to-slate-900/50" />
      </div>

      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/5 blur-3xl hero-float-slow" />
        <div className="absolute bottom-1/3 right-1/4 w-48 h-48 rounded-full bg-accent/5 blur-3xl hero-float-delayed" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-[90vh] lg:min-h-screen flex items-center">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-2xl py-24 lg:py-0">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm mb-8">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-[0.15em] text-white/80">
                  Protecting Ohio Families Since 2024
                </span>
              </div>
            </div>

            <div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05] mb-4">
                Stop{" "}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  AI Scams
                </span>
                <br />
                <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
                  Before They Start
                </span>
              </h1>
            </div>

            {/* Typing threat rotation */}
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-500/10 border border-red-500/20 backdrop-blur-sm">
                <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0" />
                <span className="text-sm text-red-300 font-medium">
                  Current Threat:{" "}
                  <span className="text-white font-bold">
                    {typedThreat}
                    <span className="animate-pulse text-accent">|</span>
                  </span>
                </span>
              </div>
            </div>

            <div>
              <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-lg mb-10">
                Veteran-supporting cybersecurity for families and businesses. We train you to spot deepfakes, voice cloning, and phishing attacks.
              </p>
            </div>

            <div>
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <Button
                  asChild
                  size="lg"
                  className="h-14 px-10 text-base font-bold rounded-full bg-gradient-to-r from-primary to-accent text-white hover:opacity-90 shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95"
                >
                  <Link to="/training#pricing">
                    Get Protected <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="h-14 px-10 text-base font-bold rounded-full border-2 border-white/30 text-white hover:bg-white/10 transition-all hover:scale-105 active:scale-95"
                >
                  <Link to="/business">For Businesses</Link>
                </Button>
              </div>
            </div>

            <div>
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
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Trust Bar — interactive mini-stats */}
      <div className="absolute bottom-0 left-0 right-0 z-20 bg-white/10 backdrop-blur-md border-t border-white/15">
        <div className="container mx-auto px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center justify-between gap-6">
            {/* Stars + Rating */}
            <div className="flex items-center gap-3">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-sm font-medium text-white/80">Trusted by 100+ Ohio Families</span>
            </div>

            {/* Animated Stats */}
            <div className="hidden md:flex items-center gap-8">
              {[
                { target: 99, suffix: "%", label: "Success Rate", icon: Zap },
                { target: 24, suffix: "/7", label: "Monitoring", icon: Shield },
                { target: 500, suffix: "+", label: "Protected", icon: Users },
              ].map((stat) => (
                <HeroStat key={stat.label} {...stat} />
              ))}
            </div>

            {/* Badges */}
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

function HeroStat({ target, suffix, label, icon: Icon }: { target: number; suffix: string; label: string; icon: React.ElementType }) {
  const { value, ref } = useCountUpHero(target);
  return (
    <div ref={ref} className="text-center flex items-center gap-2">
      <Icon className="w-4 h-4 text-white/50" />
      <div>
        <div className="text-xl font-black text-white">
          {value}{suffix}
        </div>
        <div className="text-[10px] font-medium text-white/60 uppercase tracking-wider">{label}</div>
      </div>
    </div>
  );
}

export default HeroHomepage;
