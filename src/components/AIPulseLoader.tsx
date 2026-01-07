import { motion } from "framer-motion";

interface AIPulseLoaderProps {
  message?: string;
  fullScreen?: boolean;
}

export const AIPulseLoader = ({ 
  message = "Verifying Security...", 
  fullScreen = true 
}: AIPulseLoaderProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex flex-col items-center justify-center gap-6 ${
        fullScreen ? "fixed inset-0 z-[9999] bg-background backdrop-blur-sm" : "py-10"
      }`}
    >
      {/* AI Pulse Animation Container */}
      <div className="relative flex items-center justify-center w-32 h-32">
        {/* Outer ripple ring 1 */}
        <motion.div
          className="absolute w-full h-full rounded-full border-2 border-primary/40"
          initial={{ scale: 0.6, opacity: 0.8 }}
          animate={{ scale: 1.8, opacity: 0 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeOut",
          }}
          style={{ filter: "blur(2px)" }}
        />

        {/* Outer ripple ring 2 (delayed) */}
        <motion.div
          className="absolute w-full h-full rounded-full border-2 border-primary/30"
          initial={{ scale: 0.6, opacity: 0.6 }}
          animate={{ scale: 1.6, opacity: 0 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeOut",
            delay: 0.6,
          }}
          style={{ filter: "blur(1px)" }}
        />

        {/* Inner glow ring */}
        <motion.div
          className="absolute w-20 h-20 rounded-full bg-primary/20"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ filter: "blur(12px)" }}
        />

        {/* Central glowing orb */}
        <motion.div
          className="relative w-12 h-12 rounded-full bg-gradient-to-br from-primary via-primary/80 to-accent"
          animate={{
            scale: [1, 1.08, 1],
            boxShadow: [
              "0 0 20px hsl(var(--primary) / 0.4), 0 0 40px hsl(var(--primary) / 0.2)",
              "0 0 30px hsl(var(--primary) / 0.6), 0 0 60px hsl(var(--primary) / 0.3)",
              "0 0 20px hsl(var(--primary) / 0.4), 0 0 40px hsl(var(--primary) / 0.2)",
            ],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {/* Inner bright core */}
          <motion.div
            className="absolute inset-2 rounded-full bg-white/30"
            animate={{ opacity: [0.4, 0.7, 0.4] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ filter: "blur(4px)" }}
          />
        </motion.div>
      </div>

      {/* Loading text */}
      <motion.span
        className="text-sm font-medium text-muted-foreground tracking-wide"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        {message}
      </motion.span>
    </motion.div>
  );
};
