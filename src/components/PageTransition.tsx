import { motion, Transition } from "framer-motion";
import { ReactNode, useMemo } from "react";
import { useLocation } from "react-router-dom";

interface PageTransitionProps {
  children: ReactNode;
  variant?: "blur" | "slide" | "morph" | "curtain" | "zoom" | "fade" | "scale" | "slideUp" | "auto";
}

// Premium easing curves
const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1];
const snappyEase: [number, number, number, number] = [0.16, 1, 0.3, 1];
const curtainEase: [number, number, number, number] = [0.76, 0, 0.24, 1];
const elasticEase: [number, number, number, number] = [0.34, 1.56, 0.64, 1];

// Route-specific transition mapping
const routeTransitions: Record<string, string> = {
  "/": "morph",
  "/business": "slide",
  "/training": "curtain",
  "/resources": "zoom",
  "/about": "blur",
  "/careers": "slideUp",
  "/faq": "fade",
  "/contact": "scale",
  "/auth": "morph",
  "/login": "morph",
};

const variants = {
  blur: {
    initial: { opacity: 0, filter: "blur(6px)", y: 8 },
    animate: { opacity: 1, filter: "blur(0px)", y: 0 },
    exit: { opacity: 0, filter: "blur(3px)", y: -4 },
    transition: { duration: 0.35, ease: smoothEase } as Transition,
  },
  slide: {
    initial: { opacity: 0, x: 16 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -8 },
    transition: { duration: 0.3, ease: snappyEase } as Transition,
  },
  morph: {
    initial: { opacity: 0, scale: 0.98 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.99 },
    transition: { duration: 0.35, ease: smoothEase } as Transition,
  },
  curtain: {
    initial: { opacity: 0, clipPath: "inset(0 40% 0 40%)" },
    animate: { opacity: 1, clipPath: "inset(0 0% 0 0%)" },
    exit: { opacity: 0, clipPath: "inset(0 30% 0 30%)" },
    transition: { duration: 0.4, ease: curtainEase } as Transition,
  },
  zoom: {
    initial: { opacity: 0, scale: 1.02 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.98 },
    transition: { duration: 0.35, ease: smoothEase } as Transition,
  },
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.25, ease: "easeOut" } as Transition,
  },
  scale: {
    initial: { opacity: 0, scale: 0.96 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.98 },
    transition: { duration: 0.3, ease: elasticEase } as Transition,
  },
  slideUp: {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -6 },
    transition: { duration: 0.3, ease: smoothEase } as Transition,
  },
};

export const PageTransition = ({ 
  children, 
  variant = "auto" 
}: PageTransitionProps) => {
  const location = useLocation();
  
  // Determine variant based on route or prop
  const resolvedVariant = useMemo(() => {
    if (variant !== "auto") return variant;
    
    // Get route-specific transition or default to morph
    const routeVariant = routeTransitions[location.pathname];
    return (routeVariant as keyof typeof variants) || "morph";
  }, [variant, location.pathname]);

  const selectedVariant = variants[resolvedVariant];

  return (
    <motion.div
      initial={selectedVariant.initial}
      animate={selectedVariant.animate}
      exit={selectedVariant.exit}
      transition={selectedVariant.transition}
      style={{ 
        willChange: "transform, opacity",
        backfaceVisibility: "hidden",
      }}
    >
      {children}
    </motion.div>
  );
};
