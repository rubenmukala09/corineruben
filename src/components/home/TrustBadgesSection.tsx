import { Shield, Award, Clock, Heart, CheckCircle2, MapPin } from "lucide-react";
import { SITE } from "@/config/site";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const trustIndicators = [
  {
    icon: Shield,
    title: "Veteran-Founded",
    description:
      "Built by veterans who understand the importance of protecting what matters.",
    stat: "Est. 2024",
    gradient: "from-primary/15 to-lavender-300/10",
  },
  {
    icon: MapPin,
    title: "Ohio-Based",
    description: `Local, personalized cybersecurity for ${SITE.location.areaLabel}.`,
    stat: "Local Team",
    gradient: "from-accent/15 to-primary/5",
  },
  {
    icon: Clock,
    title: "24/7 Human Support",
    description: "Real people ready to help when you need us. No bots, ever.",
    stat: "Always On",
    gradient: "from-primary/10 to-accent/10",
  },
  {
    icon: Heart,
    title: "Family-First",
    description:
      "Every client is part of our extended family. Your safety is personal.",
    stat: "5,000+",
    gradient: "from-lavender-300/15 to-primary/10",
  },
];

const guarantees = [
  `${SITE.moneyBackGuaranteeDays}-Day Money-Back Guarantee`,
  "Privacy-First Practices",
  `${SITE.veteranDiscountPercent}% Veteran & Senior Discount`,
  "Same-Day Threat Response",
];

export const TrustBadgesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section className="py-16 md:py-24 bg-muted/30" ref={ref}>
      <div className="container mx-auto px-4 md:px-6 lg:px-12">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary mb-4">
            Why Choose Us
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Built on Trust & Integrity
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            We're your neighbors, committed to keeping Ohio families safe.
          </p>
        </motion.div>

        {/* Trust Grid — 3D hover cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12" style={{ perspective: 1000 }}>
          {trustIndicators.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40, rotateX: 12 }}
              animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
              whileHover={{
                y: -8,
                rotateX: -3,
                rotateY: 4,
                scale: 1.02,
                boxShadow: "0 25px 50px -12px hsl(288 25% 20% / 0.15)",
              }}
              className="relative p-6 rounded-2xl border border-border/60 bg-card text-center overflow-hidden shadow-sm cursor-default"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-60 pointer-events-none`} />
              {/* Top-lit highlight */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent" />

              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 shadow-sm">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-base font-bold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  {item.description}
                </p>
                <div className="pt-3 border-t border-border/50">
                  <p className="text-lg font-bold text-primary">{item.stat}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Guarantees Bar — 3D elevated */}
        <motion.div
          initial={{ opacity: 0, y: 20, rotateX: 5 }}
          animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          whileHover={{ y: -3, boxShadow: "0 16px 32px -8px hsl(288 25% 20% / 0.1)" }}
          className="rounded-2xl border border-border/60 bg-card p-6 shadow-md"
          style={{ transformStyle: "preserve-3d", perspective: 600 }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {guarantees.map((text) => (
              <div key={text} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm font-medium text-foreground">
                  {text}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
