import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export const NavigationProgress = () => {
  const location = useLocation();
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Start progress bar on route change
    setIsVisible(true);
    setProgress(0);

    // Premium timing: fast start, smooth middle, instant complete
    const fastTimer = setTimeout(() => setProgress(75), 100);
    const slowTimer = setTimeout(() => setProgress(92), 300);

    // Complete and hide
    const completeTimer = setTimeout(() => {
      setProgress(100);
      
      // Fade out after completion
      setTimeout(() => {
        setIsVisible(false);
        setProgress(0);
      }, 250);
    }, 450);

    return () => {
      clearTimeout(fastTimer);
      clearTimeout(slowTimer);
      clearTimeout(completeTimer);
    };
  }, [location.pathname]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed top-0 left-0 right-0 h-[2px] z-[9999] overflow-hidden bg-background/5 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          {/* Background gradient glow */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          
          {/* Main progress bar with enhanced gradient */}
          <motion.div
            className="relative h-full bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%]"
            style={{
              boxShadow: "0 0 20px hsl(var(--primary) / 0.5), 0 0 40px hsl(var(--accent) / 0.3)",
            }}
            initial={{ width: "0%", backgroundPosition: "0% 50%" }}
            animate={{ 
              width: `${progress}%`,
              backgroundPosition: "100% 50%"
            }}
            transition={{
              width: {
                duration: progress < 75 ? 0.25 : progress < 92 ? 0.3 : 0.15,
                ease: [0.25, 0.1, 0.25, 1],
              },
              backgroundPosition: {
                duration: 0.8,
                repeat: Infinity,
                ease: "linear"
              }
            }}
          />
          
          {/* Shimmer effect overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            initial={{ x: "-100%" }}
            animate={{ x: "200%" }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              width: "50%",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
