import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export const NavigationProgress = () => {
  const location = useLocation();
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    setProgress(0);

    // Fast start: 0 to 70% quickly
    const fastTimer = setTimeout(() => setProgress(70), 50);
    
    // Slow middle: 70 to 90%
    const slowTimer = setTimeout(() => setProgress(90), 350);

    // Complete and hide
    const completeTimer = setTimeout(() => {
      setProgress(100);
      
      setTimeout(() => {
        setIsVisible(false);
        setProgress(0);
      }, 300);
    }, 500);

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
          className="fixed top-0 left-0 right-0 h-[3px] z-[9999] overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Background track */}
          <div className="absolute inset-0 bg-muted/30" />
          
          {/* Main progress bar */}
          <motion.div
            className="h-full bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] relative"
            initial={{ width: "0%" }}
            animate={{ 
              width: `${progress}%`,
            }}
            transition={{
              width: {
                duration: progress < 70 ? 0.3 : progress < 90 ? 0.5 : 0.15,
                ease: progress < 70 ? [0.22, 1, 0.36, 1] : "linear",
              },
            }}
          >
            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
              animate={{
                x: ["-100%", "200%"],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            
            {/* Glow effect at the end */}
            <motion.div
              className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-primary/60 blur-md"
              animate={{
                opacity: [0.5, 1, 0.5],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>

          {/* Completion pulse */}
          {progress === 100 && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary"
              initial={{ opacity: 0.8 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};