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
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background/95 backdrop-blur-sm"
        >
          {/* Simple logo with subtle animation */}
          <div className="relative">
            <motion.div
              className="absolute inset-0 rounded-full bg-primary/15 blur-xl"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
            
            <motion.img
              src={shieldLogo}
              alt="Loading"
              className="relative w-14 h-14 object-contain"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          {/* Message */}
          <motion.span
            className="mt-4 text-sm font-medium text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            {message}
          </motion.span>

          {/* Simple progress line */}
          <div className="mt-3 w-24 h-0.5 bg-muted/30 rounded-full overflow-hidden">
            <motion.div
              className="h-full w-1/3 bg-primary rounded-full"
              animate={{ x: ["-100%", "300%"] }}
              transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
