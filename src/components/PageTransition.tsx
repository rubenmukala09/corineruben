import { motion, Easing } from "framer-motion";
import { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
}

// Premium easing curve for smooth, natural motion
const premiumEasing: Easing = [0.25, 0.1, 0.25, 1.0];

export const PageTransition = ({ children }: PageTransitionProps) => {
  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        scale: 0.98,
        filter: "blur(10px)",
        y: 24
      }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        filter: "blur(0px)",
        y: 0
      }}
      exit={{ 
        opacity: 0, 
        scale: 0.98,
        filter: "blur(10px)",
        y: -24
      }}
      transition={{
        duration: 0.4,
        ease: premiumEasing,
      }}
      style={{
        willChange: "opacity, transform, filter",
      }}
    >
      {children}
    </motion.div>
  );
};
