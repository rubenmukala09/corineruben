import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface PremiumFeatureShowcaseProps {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
  gradient?: string;
  delay?: number;
  accentColor?: string;
}

export const PremiumFeatureShowcase = ({
  icon: Icon,
  title,
  description,
  features,
  gradient = "from-coral-400 to-accent",
  delay = 0,
  accentColor = "hsl(var(--primary))",
}: PremiumFeatureShowcaseProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.7,
        delay,
        type: "spring",
        stiffness: 80,
      }}
      className="h-full"
    >
      {/* Neumorphism/Skeuomorphism card */}
      <div className="skeuo-card premium-crystal premium-border-glow premium-shine-sweep h-full rounded-3xl overflow-hidden group">
        {/* Aurora gradient header */}
        <div className={`premium-aurora relative p-8 bg-gradient-to-br ${gradient}`}>
          <div className="relative z-10 flex items-start gap-4">
            {/* 3D icon with neumorphism */}
            <motion.div
              className="neumorphism-circle premium-3d-icon w-16 h-16 flex items-center justify-center bg-white/90 backdrop-blur-sm flex-shrink-0"
              whileHover={{
                scale: 1.15,
                rotateY: 15,
                rotateX: -10,
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Icon className="w-8 h-8 text-primary" />
            </motion.div>

            <div>
              <h3 className="premium-hd-text text-2xl font-bold text-white mb-2 drop-shadow-lg">
                {title}
              </h3>
              <p className="text-white/90 text-sm leading-relaxed">
                {description}
              </p>
            </div>
          </div>
        </div>

        {/* Features list with micro-interactions */}
        <div className="p-6 space-y-3">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: delay + 0.1 * idx, duration: 0.4 }}
              className="tactile-button rounded-xl p-3 bg-gradient-to-r from-background to-muted/20 flex items-start gap-3 group/item"
            >
              {/* Animated checkmark with 3D effect */}
              <motion.div
                className="w-6 h-6 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center flex-shrink-0 shadow-lg"
                whileHover={{ scale: 1.2, rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </motion.div>

              <span className="premium-hd-text text-foreground leading-relaxed group-hover/item:translate-x-1 transition-transform duration-200">
                {feature}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Bottom accent with subtle 3D surface */}
        <div className="subtle-3d-surface h-2 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20" />
      </div>
    </motion.div>
  );
};

export default PremiumFeatureShowcase;
