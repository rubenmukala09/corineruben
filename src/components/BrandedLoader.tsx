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
      className={`flex flex-col items-center justify-center gap-6 ${
        fullScreen ? "fixed inset-0 z-[9999] bg-background/95 backdrop-blur-sm" : "py-12"
      }`}
    >
      {/* Animated Shield Logo */}
      <div className="relative">
        {/* Outer glow ring */}
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-primary via-accent to-primary"
          style={{ padding: "3px", margin: "-12px" }}
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            rotate: { duration: 3, repeat: Infinity, ease: "linear" },
            scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <div className="w-full h-full rounded-full bg-background" />
        </motion.div>

        {/* Pulsing background glow */}
        <motion.div
          className="absolute inset-0 rounded-full bg-primary/20 blur-xl"
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
          className="relative z-10 w-20 h-20 object-contain"
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Loading text with gradient */}
      <motion.div
        className="flex flex-col items-center gap-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <span className="text-lg font-medium bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent bg-[length:200%_100%] animate-gradient-x">
          {message}
        </span>

        {/* Animated dots */}
        <div className="flex gap-1">
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
      </motion.div>

      {/* Progress bar */}
      <motion.div
        className="w-48 h-1 bg-muted rounded-full overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <motion.div
          className="h-full bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%]"
          animate={{
            x: ["-100%", "100%"],
            backgroundPosition: ["0% 50%", "100% 50%"],
          }}
          transition={{
            x: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
            backgroundPosition: { duration: 2, repeat: Infinity, ease: "linear" },
          }}
        />
      </motion.div>
    </motion.div>
  );
};
