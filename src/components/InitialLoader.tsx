import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import shieldLogo from "@/assets/shield-logo.png";

interface InitialLoaderProps {
  onComplete?: () => void;
  minDuration?: number;
}

export const InitialLoader = ({ 
  onComplete, 
  minDuration = 800 
}: InitialLoaderProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onComplete?.();
    }, minDuration);

    return () => clearTimeout(timer);
  }, [minDuration, onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-background"
        >
          <div className="flex flex-col items-center gap-4">
            {/* Simple shield logo with subtle pulse */}
            <motion.img
              src={shieldLogo}
              alt="InVision Network"
              className="w-16 h-16 object-contain"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Simple loading indicator */}
            <div className="flex gap-1.5">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-primary"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    delay: i * 0.15,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
