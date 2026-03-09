import { Link } from "react-router-dom";
import { ArrowRight, Phone, Shield, Zap, Users, Award, CheckCircle, Lock, Eye, TrendingUp, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE } from "@/config/site";
import { useEffect, useRef, useState } from "react";
import { AnimatedSection } from "@/components/AnimatedSection";

const teamImage = "/images/team-cybersecurity-office.webp";

import seniorLearning from "@/assets/senior-learning.jpg";
import familyGathering from "@/assets/family-gathering.jpg";
import communityWorkshop from "@/assets/community-workshop-real.jpg";
import seniorDevice from "@/assets/senior-device-safety.jpg";

/* Animated counter hook */
function useCountUp(target: number, duration = 2000) {
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
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return { value, ref };
}

const stats = [
  { target: 5000, suffix: "+", label: "Families Protected", icon: Shield, color: "from-primary/20 to-primary/5" },
  { target: 99, suffix: "%", label: "Detection Rate", icon: Zap, color: "from-accent/20 to-accent/5" },
  { target: 24, suffix: "/7", label: "Expert Support", icon: Users, color: "from-primary/15 to-accent/10" },
  { target: 10, suffix: "%", label: "Veteran Discount", icon: Award, color: "from-accent/15 to-primary/10" },
];

function useInView(margin = "-50px") {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect(); } },
      { rootMargin: margin },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [margin]);
  return { ref, isInView: inView };
}

export const HomeIntroSection = () => {
  const { ref: introRef, isInView } = useInView("-50px");
  const { ref: bentoRef, isInView: bentoInView } = useInView("-50px");

  return (
    <>
      {/* Stats Counter Bar */}
      <section className="py-14 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-muted/60 to-background pointer-events-none" />
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-primary/8 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-accent/8 rounded-full blur-3xl pointer-events-none" />
        
        <div className="container mx-auto px-4 md:px-6 lg:px-12 relative">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {stats.map((stat, i) => (
              <StatCard key={stat.label} {...stat} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Visual Bento Grid */}
      <section className="py-16 md:py-28" ref={introRef as any}>
        <div className="container mx-auto px-4 md:px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left — Copy */}
            <AnimatedSection animation="fade-up" className={isInView ? "opacity-100" : "opacity-0"}>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary mb-4">
                Who We Are
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-[1.1] mb-6">
                Ohio's Trusted Partner in{" "}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Cybersecurity</span>
              </h2>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-4">
                Scammers are using AI to clone voices, create deepfakes, and
                target seniors. We give families and businesses the tools,
                training, and support to fight back.
              </p>
              <p className="text-muted-foreground text-base leading-relaxed mb-8">
                <strong className="text-foreground">Veteran-founded and community-driven</strong>, we've helped over 5,000 families across Ohio stay safe from digital threats.
              </p>

              {/* Trust points */}
              <div className="grid grid-cols-2 gap-3 mb-8">
                {[
                  { icon: Shield, text: "AI-Powered Detection" },
                  { icon: Users, text: "Family Plans Available" },
                  { icon: Lock, text: "Privacy-First" },
                  { icon: Eye, text: "24/7 Monitoring" },
                ].map((item) => (
                  <div
                    key={item.text}
                    className="flex items-center gap-2 p-2.5 rounded-xl bg-muted/50 border border-border/40 hover:scale-105 hover:-translate-y-0.5 transition-transform duration-200"
                  >
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/15 to-accent/10 flex items-center justify-center flex-shrink-0 shadow-sm">
                      <item.icon className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-sm font-medium text-foreground">{item.text}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button asChild size="lg">
                  <Link to="/training#pricing">
                    Get Started <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <a href={`tel:${SITE.phone.e164}`}>
                    <Phone className="w-4 h-4 mr-2" /> {SITE.phone.display}
                  </a>
                </Button>
              </div>
            </AnimatedSection>

            {/* Right — Image Bento Grid */}
            <AnimatedSection animation="fade-up" delay={200} className="relative">
              <div className="grid grid-cols-2 gap-3">
                {/* Large image */}
                <div className="col-span-2 relative rounded-2xl overflow-hidden shadow-3d-lg group">
                  <img
                    src={teamImage}
                    alt="Our cybersecurity operations center"
                    className="w-full h-48 md:h-64 object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/56 via-foreground/16 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-white font-bold text-sm">Expert-Led Security Operations</p>
                    <p className="text-white/70 text-xs">24/7 Monitoring & Threat Response</p>
                  </div>
                </div>

                {/* Two smaller images */}
                <div className="relative rounded-2xl overflow-hidden shadow-3d group">
                  <img
                    src={familyGathering}
                    alt="Family gathering for safety training"
                    className="w-full h-36 md:h-44 object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/44 to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <p className="text-white font-bold text-xs">Family Plans</p>
                  </div>
                </div>
                <div className="relative rounded-2xl overflow-hidden shadow-3d group">
                  <img
                    src={communityWorkshop}
                    alt="Community workshop"
                    className="w-full h-36 md:h-44 object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/44 to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <p className="text-white font-bold text-xs">Community Events</p>
                  </div>
                </div>
              </div>

              {/* Floating stat widget — top right */}
              <div className={`absolute -top-5 -right-5 md:-right-8 z-10 transition-all duration-700 ${isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
                <div className="glass rounded-2xl p-3 shadow-3d-colored">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center">
                      <Shield className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xl font-black text-foreground leading-none">99%</p>
                      <p className="text-[10px] text-muted-foreground font-medium">Detection</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating widget — bottom left */}
              <div className={`absolute -bottom-5 -left-5 md:-left-8 z-10 transition-all duration-700 delay-200 ${isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
                <div className="glass rounded-2xl p-3 shadow-3d-colored">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent/20 to-primary/10 flex items-center justify-center">
                      <Users className="w-4 h-4 text-accent" />
                    </div>
                    <div>
                      <p className="text-xl font-black text-foreground leading-none">5,000+</p>
                      <p className="text-[10px] text-muted-foreground font-medium">Protected</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating alert widget — mid right */}
              <div className={`absolute top-1/2 -right-3 md:-right-6 z-10 transition-all duration-500 delay-300 ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-5'}`}>
                <div className="glass rounded-xl p-2.5 shadow-3d">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-destructive/15 flex items-center justify-center">
                      <AlertTriangle className="w-3.5 h-3.5 text-destructive" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-foreground leading-none">Threat Blocked</p>
                      <p className="text-[9px] text-muted-foreground">Just now</p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Real Results Bento */}
      <section className="py-16 md:py-28 bg-muted/30 relative overflow-hidden" ref={bentoRef as any}>
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="container mx-auto px-4 md:px-6 lg:px-12 relative">
          <div className={`text-center mb-14 transition-all duration-500 ${bentoInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary mb-4">
              Real Results
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Protecting What Matters Most
            </h2>
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
              See how we're making a real difference for Ohio families every day.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-6xl mx-auto">
            {/* Large card with image */}
            <div
              className={`md:col-span-2 relative rounded-2xl overflow-hidden shadow-3d-lg group min-h-[300px] hover:-translate-y-2 hover:shadow-[0_30px_60px_-15px_hsl(288_25%_20%/0.2)] transition-all duration-500 ${bentoInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            >
              <img
                src={seniorDevice}
                alt="Senior couple using devices safely"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-foreground/70 via-foreground/38 to-transparent" />
              <div className="relative p-8 md:p-10 flex flex-col justify-end h-full">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/20 backdrop-blur-xl border border-primary/30 text-xs font-bold text-primary w-fit mb-4">
                  <Shield className="w-3 h-3" /> Success Story
                </span>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">$1.2M+ Saved for Families</h3>
                <p className="text-white/80 text-sm md:text-base max-w-md leading-relaxed">
                  Our detection systems have prevented over $1.2 million in losses from grandparent scams, phishing attacks, and AI voice cloning attempts.
                </p>
              </div>
            </div>

            {/* Stat card */}
            <div
              className={`rounded-2xl border border-border/60 bg-card p-7 shadow-3d flex flex-col justify-between overflow-hidden relative hover:-translate-y-2 hover:shadow-[0_30px_60px_-15px_hsl(288_25%_20%/0.18)] transition-all duration-500 delay-100 ${bentoInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 pointer-events-none" />
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/15 to-accent/10 flex items-center justify-center mb-5 shadow-sm">
                  <Zap className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">Instant Threat Analysis</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Forward any suspicious email, text, or call. Our AI analyzes it in seconds.
                </p>
              </div>
              <div className="relative mt-4 pt-4 border-t border-border/50">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">2,847</span>
                  <span className="text-xs text-muted-foreground font-medium">blocked this month</span>
                </div>
              </div>
            </div>

            {/* Two small cards */}
            <div
              className={`rounded-2xl border border-border/60 bg-card p-6 shadow-3d overflow-hidden relative hover:-translate-y-1.5 hover:scale-[1.02] hover:shadow-[0_20px_40px_-12px_hsl(288_25%_20%/0.15)] transition-all duration-500 delay-200 ${bentoInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-primary/5 pointer-events-none" />
              <div className="relative flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/20 to-primary/10 flex items-center justify-center shadow-sm">
                  <Award className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-black text-foreground">4.9★</p>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold">Client Rating</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground relative">Trusted by families across the Greater Dayton area with near-perfect reviews.</p>
            </div>

            <div
              className={`rounded-2xl border border-border/60 bg-card p-6 shadow-3d overflow-hidden relative hover:-translate-y-1.5 hover:scale-[1.02] hover:shadow-[0_20px_40px_-12px_hsl(288_25%_20%/0.15)] transition-all duration-500 delay-[250ms] ${bentoInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 pointer-events-none" />
              <div className="relative flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center shadow-sm">
                  <Lock className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-black text-foreground">100%</p>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold">Data Safe</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground relative">We never sell data. Privacy-first encryption keeps your information secure.</p>
            </div>

            {/* Wide testimonial card */}
            <div
              className={`rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 via-card to-accent/5 p-6 shadow-3d overflow-hidden relative hover:-translate-y-1 hover:shadow-[0_20px_40px_-12px_hsl(288_25%_20%/0.12)] transition-all duration-500 delay-300 ${bentoInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            >
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
              <div className="relative">
                <div className="flex gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <span key={s} className="text-accent text-sm">★</span>
                  ))}
                </div>
                <blockquote className="text-sm text-foreground italic leading-relaxed mb-3">
                  "InVision Network saved my mother from a $8,000 grandparent scam. The AI detected the voice clone instantly."
                </blockquote>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/30 to-accent/20 flex items-center justify-center">
                    <span className="text-xs font-bold text-primary">JM</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-foreground">Jennifer M.</p>
                    <p className="text-[10px] text-muted-foreground">Dayton, OH</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

function StatCard({
  target,
  suffix,
  label,
  icon: Icon,
  index,
  color,
}: {
  target: number;
  suffix: string;
  label: string;
  icon: any;
  index: number;
  color: string;
}) {
  const { value, ref } = useCountUp(target);
  return (
    <AnimatedSection animation="fade-up" delay={index * 120}>
      <div
        ref={ref}
        className="relative text-center p-6 md:p-8 rounded-2xl border border-border/40 bg-card shadow-3d hover:shadow-3d-lg hover:-translate-y-2.5 hover:scale-[1.03] transition-all duration-300 cursor-default overflow-hidden"
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${color} pointer-events-none rounded-2xl`} />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/15 to-transparent" />
        <div className="relative">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/15 to-accent/10 flex items-center justify-center mx-auto mb-4 shadow-sm">
            <Icon className="w-6 h-6 text-primary" />
          </div>
          <div className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-1">
            {value.toLocaleString()}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">{suffix}</span>
          </div>
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            {label}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
