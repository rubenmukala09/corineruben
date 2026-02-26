import { Link } from "react-router-dom";
import { ArrowRight, ClipboardCheck, FileSearch, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    num: "01",
    icon: FileSearch,
    title: "Free Assessment",
    desc: "We evaluate your current digital safety and identify vulnerabilities — no cost, no obligation.",
    gradient: "from-primary/15 to-accent/5",
  },
  {
    num: "02",
    icon: ClipboardCheck,
    title: "Custom Plan",
    desc: "Receive a tailored protection strategy designed specifically for your family or business needs.",
    gradient: "from-accent/15 to-primary/5",
  },
  {
    num: "03",
    icon: ShieldCheck,
    title: "Get Protected",
    desc: "Activate your defenses with hands-on training, AI-powered tools, and 24/7 expert support.",
    gradient: "from-primary/10 to-lavender-300/10",
  },
];

export const PromoStrip = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section className="py-16 md:py-24" ref={ref}>
      <div className="container mx-auto px-4 md:px-6 lg:px-12">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary mb-4">
            How It Works
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Three Steps to Safety
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            Getting protected is simple. We handle the complexity so you don't
            have to.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12" style={{ perspective: 1000 }}>
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              className="relative"
              initial={{ opacity: 0, y: 50, rotateX: 15 }}
              animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15, ease: "easeOut" }}
              whileHover={{
                y: -10,
                rotateX: -4,
                rotateY: 3,
                scale: 1.03,
                boxShadow: "0 30px 60px -15px hsl(288 25% 20% / 0.18)",
              }}
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-px border-t-2 border-dashed border-primary/30 z-10" />
              )}
              <div className="relative rounded-2xl border border-border/60 bg-card p-8 text-center overflow-hidden h-full shadow-md">
                {/* Background accent */}
                <div className={`absolute inset-0 bg-gradient-to-br ${step.gradient} opacity-50 pointer-events-none`} />
                {/* Top-lit highlight */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
                
                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5 shadow-sm border border-primary/10">
                    <step.icon className="w-7 h-7 text-primary" />
                  </div>
                  <span className="inline-block text-xs font-bold text-primary/60 tracking-widest mb-2">
                    STEP {step.num}
                  </span>
                  <h3 className="text-lg font-bold text-foreground mb-3">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">
                    {step.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Button
            asChild
            size="lg"
            className="h-12 px-8 text-sm font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
          >
            <Link to="/training#pricing">
              Start Your Free Assessment{" "}
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default PromoStrip;
