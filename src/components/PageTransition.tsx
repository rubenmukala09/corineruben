import { motion, Transition } from "framer-motion";
import { ReactNode, useMemo } from "react";
import { useLocation } from "react-router-dom";

interface PageTransitionProps {
  children: ReactNode;
  variant?: "fade" | "slide" | "scale" | "auto";
}

// Smooth easing
const smoothEase: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

// Route-specific transition mapping - simpler, cleaner
const routeTransitions: Record<string, string> = {
  "/": "fade",
  "/business": "fade",
  "/training": "slide",
  "/resources": "fade",
  "/about": "fade",
  "/careers": "fade",
  "/faq": "fade",
  "/contact": "fade",
  "/auth": "scale",
  "/login": "scale",
  "/shop": "fade",
  "/services": "fade",
};

const variants = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.2, ease: smoothEase } as Transition,
  },
  slide: {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -4 },
    transition: { duration: 0.25, ease: smoothEase } as Transition,
  },
  scale: {
    initial: { opacity: 0, scale: 0.98 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.99 },
    transition: { duration: 0.2, ease: smoothEase } as Transition,
  },
};

export const PageTransition = ({ 
  children, 
  variant = "auto" 
}: PageTransitionProps) => {
  const location = useLocation();
  
  const resolvedVariant = useMemo(() => {
    if (variant !== "auto") return variant;
    const routeVariant = routeTransitions[location.pathname];
    return (routeVariant as keyof typeof variants) || "fade";
  }, [variant, location.pathname]);

  const selectedVariant = variants[resolvedVariant];

  return (
    <motion.div
      initial={selectedVariant.initial}
      animate={selectedVariant.animate}
      exit={selectedVariant.exit}
      transition={selectedVariant.transition}
      style={{ 
        willChange: "opacity",
      }}
    >
      {children}
    </motion.div>
  );
};
