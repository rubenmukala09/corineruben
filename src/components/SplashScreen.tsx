import { motion, AnimatePresence } from "framer-motion";
import { Shield } from "lucide-react";

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
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backgroundColor: '#F8F9FC' }}
        >
          {/* Glassmorphism Shield Loader */}
          <div className="relative flex items-center justify-center">
            {/* Outer breathing glow */}
            <motion.div
              className="absolute w-40 h-40 rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                background: 'radial-gradient(circle, hsl(var(--primary) / 0.4) 0%, transparent 70%)',
                filter: 'blur(20px)',
              }}
            />

            {/* Ripple ring 1 */}
            <motion.div
              className="absolute w-32 h-32 rounded-full border-2"
              style={{ borderColor: 'hsl(var(--primary) / 0.3)' }}
              initial={{ scale: 0.5, opacity: 0.6 }}
              animate={{ scale: 1.8, opacity: 0 }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />

            {/* Ripple ring 2 (delayed) */}
            <motion.div
              className="absolute w-32 h-32 rounded-full border-2"
              style={{ borderColor: 'hsl(var(--primary) / 0.2)' }}
              initial={{ scale: 0.5, opacity: 0.4 }}
              animate={{ scale: 1.5, opacity: 0 }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeOut",
                delay: 0.8,
              }}
            />

            {/* Glassmorphism shield container */}
            <motion.div
              className="relative w-24 h-24 rounded-2xl flex items-center justify-center"
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
                  0 0 60px rgba(139, 92, 246, 0.15),
                  inset 0 1px 0 rgba(255,255,255,0.9)
                `,
              }}
            >
              {/* Shield icon with purple glow */}
              <motion.div
                animate={{
                  filter: [
                    'drop-shadow(0 0 8px hsl(var(--primary) / 0.5))',
                    'drop-shadow(0 0 20px hsl(var(--primary) / 0.7))',
                    'drop-shadow(0 0 8px hsl(var(--primary) / 0.5))',
                  ],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Shield 
                  className="w-12 h-12 text-primary" 
                  strokeWidth={1.5}
                />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};