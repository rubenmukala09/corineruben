import { ReactNode } from "react";
import { motion, AnimatePresence, Transition } from "framer-motion";
import { useLocation } from "react-router-dom";

interface PageTransitionProps {
  children: ReactNode;
  variant?: "fade" | "slide" | "scale" | "slideUp" | "crossfade" | "auto";
}

// Smooth, professional page transition variants
const transitionVariants = {
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
    initial: { opacity: 0, scale: 0.98 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.02 },
  },
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  },
  crossfade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  auto: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
};

// Fast, clean transition - no purple flash, instant feel
const luxuryTransition: Transition = {
  duration: 0.15,
  ease: "easeOut",
};

export const PageTransition = ({ 
  children, 
  variant = "crossfade" 
}: PageTransitionProps) => {
  const location = useLocation();
  const selectedVariant = transitionVariants[variant] || transitionVariants.crossfade;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={selectedVariant.initial}
        animate={selectedVariant.animate}
        exit={selectedVariant.exit}
        transition={luxuryTransition}
        className="min-h-screen"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
