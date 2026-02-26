import { Link } from "react-router-dom";
import { ArrowRight, Phone, Shield, Zap, Users, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE } from "@/config/site";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

/* Animated counter hook */
function useCountUp(target: number, duration = 2000, suffix = "") {
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

  return { value, ref, suffix };
}

const stats = [
  { target: 5000, suffix: "+", label: "Families Protected", icon: Shield },
  { target: 99, suffix: "%", label: "Detection Rate", icon: Zap },
  { target: 24, suffix: "/7", label: "Expert Support", icon: Users },
  { target: 10, suffix: "%", label: "Veteran Discount", icon: Award },
];

const highlights = [
  {
    title: "AI-Powered Detection",
    desc: "Real-time threat analysis stops scams before they reach you.",
    gradient: "from-primary/15 to-accent/10",
  },
  {
    title: "Family Plans",
    desc: "Protect every member of your household under one plan.",
    gradient: "from-accent/15 to-primary/10",
  },
  {
    title: "Hands-On Training",
    desc: "Interactive workshops so you never fall for a scam again.",
    gradient: "from-primary/10 to-lavender-300/15",
  },
  {
    title: "Business Solutions",
    desc: "Security audits and AI automation for your organization.",
    gradient: "from-lavender-300/15 to-primary/10",
  },
];

export const HomeIntroSection = () => {
  const introRef = useRef(null);
  const isInView = useInView(introRef, { once: true, margin: "-50px" });

  return (
    <>
      {/* Stats Counter Bar — 3D floating cards */}
      <section className="py-16 md:py-20 relative overflow-hidden">
        {/* Decorative background */}
        <div className="absolute inset-0 bg-gradient-to-b from-muted/50 to-background pointer-events-none" />
        <div className="container mx-auto px-4 md:px-6 lg:px-12 relative">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {stats.map((stat, i) => (
              <StatCard key={stat.label} {...stat} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Intro Copy — 3D perspective */}
      <section className="py-16 md:py-24" ref={introRef}>
        <div className="container mx-auto px-4 md:px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left — Copy */}
            <motion.div
              initial={{ opacity: 0, x: -30, rotateY: 5 }}
              animate={isInView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
              transition={{ duration: 0.7, ease: "easeOut" }}
              style={{ perspective: 1000 }}
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

            {/* Right — 3D Value highlights grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5" style={{ perspective: 800 }}>
              {highlights.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30, rotateX: 10 }}
                  animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.15 * i, ease: "easeOut" }}
                  whileHover={{ 
                    y: -6, 
                    rotateX: -3, 
                    rotateY: 3,
                    boxShadow: "0 20px 40px -15px hsl(288 25% 20% / 0.15)",
                  }}
                  className={`relative p-5 rounded-2xl border border-border/60 bg-card overflow-hidden cursor-default`}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Background gradient accent */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-60 pointer-events-none`} />
                  <div className="relative">
                    <h3 className="text-base font-bold text-foreground mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
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
      {/* Subtle top-lit gradient */}
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
