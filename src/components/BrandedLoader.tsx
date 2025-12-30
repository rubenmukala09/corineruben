import { motion } from "framer-motion";
import shieldLogo from "@/assets/shield-logo.png";

interface BrandedLoaderProps {
  message?: string;
  fullScreen?: boolean;
}

export const BrandedLoader = ({ 
  message = "Loading...", 
  fullScreen = true 
}: BrandedLoaderProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className={`flex flex-col items-center justify-center gap-5 ${
        fullScreen ? "fixed inset-0 z-[9999] bg-background/98 backdrop-blur-sm" : "py-10"
      }`}
    >
      {/* Elegant logo with soft glow */}
      <div className="relative">
        {/* Soft ambient glow */}
        <motion.div
          className="absolute inset-0 bg-primary/15 rounded-full blur-xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ width: '80px', height: '80px', top: '-8px', left: '-8px' }}
        />

        {/* Shield logo */}
        <motion.img
          src={shieldLogo}
          alt="InVision Network"
          className="relative z-10 w-16 h-16 object-contain"
          animate={{ scale: [1, 1.03, 1] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Loading text */}
      <motion.span
        className="text-sm font-medium text-muted-foreground"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        {message}
      </motion.span>

      {/* Minimal progress line */}
      <motion.div
        className="w-32 h-0.5 bg-muted/30 rounded-full overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <motion.div
          className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
          animate={{ x: ["-100%", "100%"] }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ width: "50%" }}
        />
      </motion.div>
    </motion.div>
  );
};
