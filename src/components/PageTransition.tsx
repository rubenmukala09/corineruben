import { motion } from "framer-motion";
import { ReactNode, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

interface PageTransitionProps {
  children: ReactNode;
  variant?: "fade" | "slide" | "scale" | "slideUp";
}

const variants = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  slide: {
    initial: { opacity: 0, x: 15 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -15 },
  },
  scale: {
    initial: { opacity: 0, scale: 0.98 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.99 },
  },
  slideUp: {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -8 },
  },
};

export const PageTransition = ({ 
  children, 
  variant = "slideUp" 
}: PageTransitionProps) => {
  const selectedVariant = variants[variant];
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Quick loading state for smooth transition
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 100);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      {/* Mini loading overlay during transition */}
      {isLoading && (
        <motion.div
          initial={{ opacity: 0.6 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-40 pointer-events-none bg-background/30 backdrop-blur-[2px]"
        />
      )}
      
      <motion.div
        initial={selectedVariant.initial}
        animate={selectedVariant.animate}
        exit={selectedVariant.exit}
        transition={{ 
          duration: 0.25, 
          ease: [0.25, 0.46, 0.45, 0.94] 
        }}
      >
        {children}
      </motion.div>
    </>
  );
};