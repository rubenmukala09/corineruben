import { motion, AnimatePresence } from "framer-motion";
import shieldLogo from "@/assets/shield-logo.png";

interface SplashScreenProps {
  isVisible: boolean;
}

export const SplashScreen = ({ isVisible }: SplashScreenProps) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background"
        >
          {/* Breathing Shield Icon with Pulsing Radar Effect */}
          <div className="relative flex items-center justify-center">
            {/* Outer ripple ring 1 */}
            <motion.div
              className="absolute w-32 h-32 rounded-full border-2 border-primary/30"
              initial={{ scale: 0.5, opacity: 0.6 }}
              animate={{ scale: 2, opacity: 0 }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
            
            {/* Outer ripple ring 2 (delayed) */}
            <motion.div
              className="absolute w-32 h-32 rounded-full border-2 border-primary/20"
              initial={{ scale: 0.5, opacity: 0.4 }}
              animate={{ scale: 1.6, opacity: 0 }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeOut",
                delay: 0.7,
              }}
            />

            {/* Soft glow behind logo */}
            <motion.div
              className="absolute w-24 h-24 rounded-full bg-primary/20"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{ filter: "blur(20px)" }}
            />

            {/* Shield Logo with breathing animation */}
            <motion.img
              src={shieldLogo}
              alt="InVision Network"
              className="relative z-10 w-20 h-20 object-contain"
              animate={{
                scale: [1, 1.05, 1],
                filter: [
                  "drop-shadow(0 0 15px hsl(var(--primary) / 0.4))",
                  "drop-shadow(0 0 30px hsl(var(--primary) / 0.6))",
                  "drop-shadow(0 0 15px hsl(var(--primary) / 0.4))",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
