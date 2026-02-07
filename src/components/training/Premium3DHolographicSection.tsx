import type { ReactNode } from "react";
import { motion } from "framer-motion";

interface Premium3DHolographicSectionProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}

export const Premium3DHolographicSection = ({
  title,
  subtitle,
  children,
  className = "",
}: Premium3DHolographicSectionProps) => {
  return (
    <section className={`relative py-16 md:py-24 ${className}`}>
      {/* Premium section background with aurora */}
      <div className="premium-section-bg absolute inset-0" />

      <div className="container-responsive relative z-10">
        {/* Section header with holographic shimmer */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, type: "spring" }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="premium-holographic inline-block rounded-3xl p-12 relative">
            <h2 className="premium-hd-text text-4xl md:text-5xl lg:text-6xl font-black mb-4">
              <span className="premium-gradient-text">
                {title}
              </span>
            </h2>
            {subtitle && (
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto premium-hd-text">
                {subtitle}
              </p>
            )}

            {/* Decorative orbs */}
            <div className="premium-orb absolute -top-10 -left-10 w-32 h-32 opacity-30" />
            <div className="premium-orb absolute -bottom-10 -right-10 w-40 h-40 opacity-20" />
          </div>
        </motion.div>

        {/* Content */}
        <div className="premium-3d-scene relative">
          {children}
        </div>
      </div>

      {/* Premium grid dots pattern */}
      <div className="premium-grid-dots absolute inset-0 opacity-30 pointer-events-none" />
    </section>
  );
};

export default Premium3DHolographicSection;
