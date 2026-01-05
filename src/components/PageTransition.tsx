import { ReactNode, memo } from "react";
import { motion } from "framer-motion";

interface PageTransitionProps {
  children: ReactNode;
  variant?: "fade" | "slide" | "scale" | "luxury" | "crossfade";
}

// Luxury page transition with silk-like easing
const variants = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  slide: {
    initial: { opacity: 0, x: 30 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -30 },
  },
  scale: {
    initial: { opacity: 0, scale: 0.96 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.96 },
  },
  luxury: {
    initial: { opacity: 0, y: 20, filter: 'blur(4px)' },
    animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
    exit: { opacity: 0, y: -10, filter: 'blur(4px)' },
  },
  crossfade: {
    initial: { opacity: 0, scale: 0.99 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.99 },
  },
};

// Silk-like easing curve
const luxuryEasing = [0.23, 1, 0.32, 1];

export const PageTransition = memo(({ 
  children, 
  variant = "luxury" 
}: PageTransitionProps) => {
  const selectedVariant = variants[variant] || variants.luxury;

  return (
    <motion.div
      initial={selectedVariant.initial}
      animate={selectedVariant.animate}
      exit={selectedVariant.exit}
      transition={{
        duration: 0.6,
        ease: luxuryEasing as [number, number, number, number],
      }}
      className="page-transition-wrapper"
      style={{
        willChange: 'opacity, transform, filter',
      }}
    >
      {children}
    </motion.div>
  );
});

PageTransition.displayName = 'PageTransition';
