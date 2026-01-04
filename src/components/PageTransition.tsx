import { motion, Transition } from "framer-motion";
import { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
  variant?: "fade" | "slide" | "scale" | "auto";
}

const variants = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.05 } as Transition,
  },
  slide: {
    initial: { opacity: 0, y: 2 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0 },
    transition: { duration: 0.06 } as Transition,
  },
  scale: {
    initial: { opacity: 0, scale: 0.995 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.05 } as Transition,
  },
};

export const PageTransition = ({ 
  children, 
  variant = "fade" 
}: PageTransitionProps) => {
  const resolvedVariant = variant === "auto" ? "fade" : variant;
  const selectedVariant = variants[resolvedVariant];

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
