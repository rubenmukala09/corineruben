import { Link } from "react-router-dom";
import { ArrowRight, Phone, Shield, Zap, Users, Award, CheckCircle, Lock, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE } from "@/config/site";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

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
  { target: 5000, suffix: "+", label: "Families Protected", icon: Shield },
  { target: 99, suffix: "%", label: "Detection Rate", icon: Zap },
  { target: 24, suffix: "/7", label: "Expert Support", icon: Users },
  { target: 10, suffix: "%", label: "Veteran Discount", icon: Award },
];

export const HomeIntroSection = () => {
  const introRef = useRef(null);
  const isInView = useInView(introRef, { once: true, margin: "-50px" });
  const bentoRef = useRef(null);
  const bentoInView = useInView(bentoRef, { once: true, margin: "-50px" });

  return (
    <>
      {/* Stats Counter Bar — 3D floating cards */}
      <section className="py-14 md:py-18 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-muted/50 to-background pointer-events-none" />
        <div className="container mx-auto px-4 md:px-6 lg:px-12 relative">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {stats.map((stat, i) => (
              <StatCard key={stat.label} {...stat} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Visual Bento Grid — images + floating widgets */}
      <section className="py-16 md:py-24" ref={introRef}>
        <div className="container mx-auto px-4 md:px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left — Copy */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary mb-4">
                Who We Are
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-[1.1] mb-6">
                Ohio's Trusted Partner in{" "}
                <span className="text-primary">Cybersecurity</span>
              </h2>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-4">
                Scammers are using AI to clone voices, create deepfakes, and
                target seniors. We give families and businesses the tools,
                training, and support to fight back.
              </p>
              <p className="text-muted-foreground text-base leading-relaxed mb-8">
                <strong className="text-foreground">Veteran-founded and community-driven</strong>, we've helped over 5,000 families across Ohio stay safe from digital threats. Our 99% detection rate means you can trust us with your family's safety.
              </p>

              {/* Trust points */}
              <div className="grid grid-cols-2 gap-3 mb-8">
                {[
                  { icon: Shield, text: "AI-Powered Detection" },
                  { icon: Users, text: "Family Plans Available" },
                  { icon: Lock, text: "Privacy-First" },
                  { icon: Eye, text: "24/7 Monitoring" },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-3.5 h-3.5 text-primary" />
                    </div>
                    <span className="text-sm font-medium text-foreground">{item.text}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  asChild
                  size="lg"
                  className="h-12 px-8 text-sm font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 w-full sm:w-auto"
                >
                  <Link to="/training#pricing">
                    Get Started <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="h-12 px-8 text-sm font-semibold rounded-lg w-full sm:w-auto"
                >
                  <a href={`tel:${SITE.phone.e164}`}>
                    <Phone className="w-4 h-4 mr-2" /> {SITE.phone.display}
                  </a>
                </Button>
              </div>
            </motion.div>

            {/* Right — Image Bento Grid with floating widgets */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-3">
                {/* Large image */}
                <div className="col-span-2 relative rounded-2xl overflow-hidden shadow-xl group">
                  <img
                    src={seniorLearning}
                    alt="Senior learning digital safety"
                    className="w-full h-48 md:h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-white font-bold text-sm">Expert-Led Training Sessions</p>
                    <p className="text-white/70 text-xs">Real-time scam detection workshops</p>
                  </div>
                </div>

                {/* Two smaller images */}
                <div className="relative rounded-2xl overflow-hidden shadow-lg group">
                  <img
                    src={familyGathering}
                    alt="Family gathering for safety training"
                    className="w-full h-36 md:h-44 object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <p className="text-white font-bold text-xs">Family Plans</p>
                  </div>
                </div>
                <div className="relative rounded-2xl overflow-hidden shadow-lg group">
                  <img
                    src={communityWorkshop}
                    alt="Community workshop"
                    className="w-full h-36 md:h-44 object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <p className="text-white font-bold text-xs">Community Events</p>
                  </div>
                </div>
              </div>

              {/* Floating stat widget — top right */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="absolute -top-4 -right-4 md:-right-6 z-10"
              >
                <div className="bg-card/95 backdrop-blur-xl border border-border/60 rounded-2xl p-3 shadow-xl">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-primary/15 flex items-center justify-center">
                      <Shield className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-lg font-black text-foreground leading-none">99%</p>
                      <p className="text-[10px] text-muted-foreground font-medium">Detection</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Floating widget — bottom left */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="absolute -bottom-4 -left-4 md:-left-6 z-10"
              >
                <div className="bg-card/95 backdrop-blur-xl border border-border/60 rounded-2xl p-3 shadow-xl">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-accent/15 flex items-center justify-center">
                      <Users className="w-4 h-4 text-accent" />
                    </div>
                    <div>
                      <p className="text-lg font-black text-foreground leading-none">5,000+</p>
                      <p className="text-[10px] text-muted-foreground font-medium">Protected</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Real Results Bento — visual impact section */}
      <section className="py-16 md:py-24 bg-muted/30" ref={bentoRef}>
        <div className="container mx-auto px-4 md:px-6 lg:px-12">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={bentoInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary mb-4">
              Real Results
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Protecting What Matters Most
            </h2>
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
              See how we're making a real difference for Ohio families every day.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {/* Large card with image */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={bentoInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="md:col-span-2 relative rounded-2xl overflow-hidden shadow-lg group min-h-[280px]"
            >
              <img
                src={seniorDevice}
                alt="Senior couple using devices safely"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/50 to-transparent" />
              <div className="relative p-8 flex flex-col justify-end h-full">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30 text-xs font-bold text-primary w-fit mb-3">
                  <Shield className="w-3 h-3" /> Success Story
                </span>
                <h3 className="text-2xl font-bold text-white mb-2">$1.2M+ Saved for Families</h3>
                <p className="text-white/80 text-sm max-w-md">
                  Our detection systems have prevented over $1.2 million in losses from grandparent scams, phishing attacks, and AI voice cloning attempts.
                </p>
              </div>
            </motion.div>

            {/* Stat card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={bentoInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="rounded-2xl border border-border/60 bg-card p-6 shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">Instant Threat Analysis</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Forward any suspicious email, text, or call. Our AI analyzes it in seconds and gives you a clear answer.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-border/50">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-primary">2,847</span>
                  <span className="text-xs text-muted-foreground font-medium">scams blocked this month</span>
                </div>
              </div>
            </motion.div>

            {/* Two small cards */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={bentoInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="rounded-2xl border border-border/60 bg-card p-6 shadow-md"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-accent/15 flex items-center justify-center">
                  <Award className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-black text-foreground">4.9★</p>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold">Client Rating</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">Trusted by families across the Greater Dayton area with near-perfect reviews.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={bentoInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="rounded-2xl border border-border/60 bg-card p-6 shadow-md"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center">
                  <Lock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-black text-foreground">100%</p>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold">Data Safe</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">We never sell data. Privacy-first encryption keeps your family's information secure.</p>
            </motion.div>

            {/* Wide testimonial card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={bentoInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 p-6 shadow-md"
            >
              <div className="flex gap-1 mb-3">
                {[1, 2, 3, 4, 5].map((s) => (
                  <span key={s} className="text-accent text-sm">★</span>
                ))}
              </div>
              <blockquote className="text-sm text-foreground italic leading-relaxed mb-3">
                "InVision Network saved my mother from a $8,000 grandparent scam. The AI detected the voice clone instantly. I can't thank them enough."
              </blockquote>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-xs font-bold text-primary">JM</span>
                </div>
                <div>
                  <p className="text-xs font-bold text-foreground">Jennifer M.</p>
                  <p className="text-[10px] text-muted-foreground">Dayton, OH</p>
                </div>
              </div>
            </motion.div>
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
}: {
  target: number;
  suffix: string;
  label: string;
  icon: any;
  index: number;
}) {
  const { value, ref } = useCountUp(target);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, rotateX: 15 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      whileHover={{ 
        y: -8, 
        rotateY: 5,
        boxShadow: "0 25px 50px -12px hsl(288 25% 20% / 0.18)",
      }}
      className="relative text-center p-6 rounded-2xl border border-border/60 bg-card shadow-md hover:shadow-xl transition-shadow cursor-default overflow-hidden"
      style={{ transformStyle: "preserve-3d", perspective: 600 }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none rounded-2xl" />
      <div className="relative">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-1">
          {value.toLocaleString()}
          <span className="text-primary">{suffix}</span>
        </div>
        <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          {label}
        </div>
      </div>
    </motion.div>
  );
}
