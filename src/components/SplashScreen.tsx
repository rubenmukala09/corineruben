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
          className="fixed inset-0 z-50 flex items-center justify-center bg-white"
        >
          {/* Breathing Shield Icon */}
          <motion.div
            className="relative"
            animate={{
              scale: [1, 1.05, 1],
              filter: [
                "drop-shadow(0 0 20px hsl(var(--primary) / 0.3))",
                "drop-shadow(0 0 35px hsl(var(--primary) / 0.5))",
                "drop-shadow(0 0 20px hsl(var(--primary) / 0.3))",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <img
              src={shieldLogo}
              alt="InVision Network"
              className="w-20 h-20 object-contain"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
