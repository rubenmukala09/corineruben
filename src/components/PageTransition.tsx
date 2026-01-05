import { ReactNode, memo } from "react";
import { motion } from "framer-motion";
import { EASING, TIMING } from "@/lib/premium-animations";

interface PageTransitionProps {
  children: ReactNode;
  variant?: "fade" | "slide" | "scale" | "auto" | "crossfade";
}

// Premium page transition with smooth crossfade
const variants = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  slide: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  },
  scale: {
    initial: { opacity: 0, scale: 0.98 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.98 },
  },
  crossfade: {
    initial: { opacity: 0, scale: 0.995 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.995 },
  },
  auto: {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -8 },
  },
};

export const PageTransition = memo(({ 
  children, 
  variant = "auto" 
}: PageTransitionProps) => {
  const selectedVariant = variants[variant] || variants.auto;

  return (
    <motion.div
      initial={selectedVariant.initial}
      animate={selectedVariant.animate}
      exit={selectedVariant.exit}
      transition={{
        duration: TIMING.normal / 1000,
        ease: [0.22, 1, 0.36, 1], // premium easing
      }}
      className="page-transition-wrapper"
      style={{
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </motion.div>
  );
});

PageTransition.displayName = 'PageTransition';
