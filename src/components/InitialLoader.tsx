import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import shieldLogo from "@/assets/shield-logo.png";

interface InitialLoaderProps {
  onComplete?: () => void;
  minDuration?: number;
}

export const InitialLoader = ({ 
  onComplete, 
  minDuration = 1500 
}: InitialLoaderProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);

    const timer = setTimeout(() => {
      setIsVisible(false);
      onComplete?.();
    }, minDuration);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, [minDuration, onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-br from-background via-background to-primary/5"
        >
          {/* Background decoration */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div 
              className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
            <motion.div 
              className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-accent/10 to-transparent rounded-full blur-3xl"
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            />
          </div>

          <div className="relative z-10 flex flex-col items-center gap-8">
            {/* Animated Shield Logo */}
            <div className="relative">
              {/* Outer glow ring */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{ 
                  background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)), hsl(var(--primary)))",
                  padding: "4px", 
                  margin: "-16px",
                  filter: "blur(8px)",
                }}
                animate={{
                  rotate: 360,
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  rotate: { duration: 3, repeat: Infinity, ease: "linear" },
                  scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                }}
              />

              {/* Pulsing glow */}
              <motion.div
                className="absolute inset-0 rounded-full bg-primary/30 blur-2xl"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Shield logo */}
              <motion.img
                src={shieldLogo}
                alt="InVision Network"
                className="relative z-10 w-24 h-24 md:w-32 md:h-32 object-contain drop-shadow-2xl"
                animate={{
                  scale: [1, 1.05, 1],
                  rotateY: [0, 10, 0, -10, 0],
                }}
                transition={{
                  scale: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
                  rotateY: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                }}
              />
            </div>

            {/* Loading text */}
            <motion.div
              className="flex flex-col items-center gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] bg-clip-text text-transparent animate-gradient-x">
                InVision Network
              </h2>
              <p className="text-sm md:text-base text-muted-foreground">
                Protecting Ohio Families
              </p>
            </motion.div>

            {/* Progress bar */}
            <motion.div
              className="w-64 md:w-80 h-1.5 bg-muted rounded-full overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%]"
                initial={{ width: "0%" }}
                animate={{ 
                  width: `${Math.min(progress, 100)}%`,
                  backgroundPosition: ["0% 50%", "100% 50%"],
                }}
                transition={{
                  width: { duration: 0.3 },
                  backgroundPosition: { duration: 2, repeat: Infinity, ease: "linear" },
                }}
              />
            </motion.div>

            {/* Loading dots */}
            <div className="flex gap-2">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 rounded-full bg-primary"
                  animate={{
                    y: [0, -8, 0],
                    opacity: [0.5, 1, 0.5],
                  }}
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
