import { motion, AnimatePresence } from "framer-motion";
import shieldLogo from "@/assets/shield-logo.png";

interface UnifiedPageLoaderProps {
  isLoading: boolean;
  message?: string;
}

export const UnifiedPageLoader = ({ isLoading, message = "Loading..." }: UnifiedPageLoaderProps) => {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(6px)" }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background/98 backdrop-blur-md"
        >
          {/* Orbiting container */}
          <div className="relative w-24 h-24">
            {/* Outer orbit */}
            <motion.div
              className="absolute inset-0 rounded-full border border-dashed border-primary/25"
              animate={{ rotate: 360 }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            />
            
            {/* Inner orbit */}
            <motion.div
              className="absolute inset-2 rounded-full border border-accent/20"
              animate={{ rotate: -360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            />
            
            {/* Glow */}
            <motion.div
              className="absolute inset-4 rounded-full bg-gradient-to-br from-primary/20 to-accent/10 blur-lg"
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Logo */}
            <motion.img
              src={shieldLogo}
              alt="Loading"
              className="absolute inset-0 m-auto w-12 h-12 object-contain"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          {/* Message */}
          <motion.span
            className="mt-6 text-sm font-medium text-muted-foreground"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            {message}
          </motion.span>

          {/* Progress bar */}
          <div className="mt-4 w-32 h-0.5 bg-muted/30 rounded-full overflow-hidden">
            <motion.div
              className="h-full w-1/2 bg-gradient-to-r from-primary to-accent rounded-full"
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
