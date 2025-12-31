import { motion, Transition } from "framer-motion";
import { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
  variant?: "blur" | "slide" | "morph" | "curtain" | "zoom" | "fade" | "scale" | "slideUp";
}

// Define easing as proper tuples
const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1];
const standardEase: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];
const snappyEase: [number, number, number, number] = [0.16, 1, 0.3, 1];
const curtainEase: [number, number, number, number] = [0.76, 0, 0.24, 1];

const variants = {
  blur: {
    initial: { opacity: 0, filter: "blur(8px)", y: 12 },
    animate: { opacity: 1, filter: "blur(0px)", y: 0 },
    exit: { opacity: 0, filter: "blur(4px)", y: -8 },
    transition: { duration: 0.4, ease: smoothEase } as Transition,
    exitTransition: { duration: 0.25, ease: "easeIn" as const } as Transition,
  },
  slide: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -12 },
    transition: { duration: 0.35, ease: standardEase } as Transition,
    exitTransition: { duration: 0.2, ease: "easeIn" as const } as Transition,
  },
  morph: {
    initial: { opacity: 0, scale: 0.96 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.98 },
    transition: { duration: 0.5, ease: snappyEase } as Transition,
    exitTransition: { duration: 0.25 } as Transition,
  },
  curtain: {
    initial: { opacity: 0, clipPath: "inset(0 50% 0 50%)" },
    animate: { opacity: 1, clipPath: "inset(0 0% 0 0%)" },
    exit: { opacity: 0, clipPath: "inset(0 50% 0 50%)" },
    transition: { duration: 0.55, ease: curtainEase } as Transition,
    exitTransition: { duration: 0.3, ease: "easeIn" as const } as Transition,
  },
  zoom: {
    initial: { opacity: 0, scale: 1.04 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.97 },
    transition: { duration: 0.45, ease: smoothEase } as Transition,
    exitTransition: { duration: 0.2 } as Transition,
  },
  // Legacy variants for backward compatibility
  fade: {
    initial: { opacity: 0, filter: "blur(6px)" },
    animate: { opacity: 1, filter: "blur(0px)" },
    exit: { opacity: 0, filter: "blur(3px)" },
    transition: { duration: 0.35, ease: smoothEase } as Transition,
    exitTransition: { duration: 0.2, ease: "easeIn" as const } as Transition,
  },
  scale: {
    initial: { opacity: 0, scale: 0.97, filter: "blur(4px)" },
    animate: { opacity: 1, scale: 1, filter: "blur(0px)" },
    exit: { opacity: 0, scale: 0.98 },
    transition: { duration: 0.4, ease: smoothEase } as Transition,
    exitTransition: { duration: 0.2 } as Transition,
  },
  slideUp: {
    initial: { opacity: 0, y: 16, filter: "blur(4px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    exit: { opacity: 0, y: -8 },
    transition: { duration: 0.4, ease: smoothEase } as Transition,
    exitTransition: { duration: 0.2, ease: "easeIn" as const } as Transition,
  },
};

export const PageTransition = ({ 
  children, 
  variant = "blur" 
}: PageTransitionProps) => {
  const selectedVariant = variants[variant];

  return (
    <motion.div
      initial={selectedVariant.initial}
      animate={selectedVariant.animate}
      exit={selectedVariant.exit}
      transition={selectedVariant.transition}
    >
      {children}
    </motion.div>
  );
};
