import { motion, AnimatePresence } from "framer-motion";
import { Shield } from "lucide-react";

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
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-6"
          style={{ backgroundColor: '#F8F9FC' }}
        >
          {/* Glassmorphism Shield Loader */}
          <div className="relative flex items-center justify-center">
            {/* Outer breathing glow */}
            <motion.div
              className="absolute w-36 h-36 rounded-full"
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.25, 0.45, 0.25],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                background: 'radial-gradient(circle, hsl(var(--primary) / 0.4) 0%, transparent 70%)',
                filter: 'blur(16px)',
              }}
            />

            {/* Ripple ring */}
            <motion.div
              className="absolute w-28 h-28 rounded-full border-2"
              style={{ borderColor: 'hsl(var(--primary) / 0.3)' }}
              initial={{ scale: 0.5, opacity: 0.6 }}
              animate={{ scale: 1.5, opacity: 0 }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />

            {/* Glassmorphism shield container */}
            <motion.div
              className="relative w-20 h-20 rounded-2xl flex items-center justify-center"
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.6) 100%)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.8)',
                boxShadow: `
                  0 8px 32px rgba(139, 92, 246, 0.25),
                  0 0 50px rgba(139, 92, 246, 0.12),
                  inset 0 1px 0 rgba(255,255,255,0.9)
                `,
              }}
            >
              {/* Shield icon with purple glow */}
              <motion.div
                animate={{
                  filter: [
                    'drop-shadow(0 0 6px hsl(var(--primary) / 0.5))',
                    'drop-shadow(0 0 16px hsl(var(--primary) / 0.7))',
                    'drop-shadow(0 0 6px hsl(var(--primary) / 0.5))',
                  ],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Shield 
                  className="w-10 h-10 text-primary" 
                  strokeWidth={1.5}
                />
              </motion.div>
            </motion.div>
          </div>

          {/* Loading text */}
          <motion.span
            className="text-sm font-medium text-muted-foreground tracking-wide"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            {message}
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
