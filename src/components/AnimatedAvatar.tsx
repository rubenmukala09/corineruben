import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import loraAvatar from "@/assets/lora-avatar-animated.png";

interface AnimatedAvatarProps {
  isTalking?: boolean;
  isLoading?: boolean;
  className?: string;
}

export const AnimatedAvatar = ({ 
  isTalking = false, 
  isLoading = false,
  className 
}: AnimatedAvatarProps) => {
  return (
    <div className={cn("relative", className)}>
      {/* Glow effect when talking */}
      {isTalking && (
        <motion.div
          className="absolute inset-0 rounded-full bg-primary/30 blur-xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}
      
      {/* Avatar with breathing animation */}
      <motion.div
        className="relative z-10"
        animate={{
          scale: isTalking ? [1, 1.05, 1] : [1, 1.02, 1],
        }}
        transition={{
          duration: isTalking ? 1.5 : 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <motion.img
          src={loraAvatar}
          alt="Lora AI Assistant"
          className={cn(
            "w-16 h-16 rounded-full object-cover shadow-lg",
            isTalking && "ring-2 ring-primary ring-offset-2"
          )}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        />
        
        {/* Loading spinner */}
        {isLoading && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="w-full h-full rounded-full border-2 border-primary border-t-transparent animate-spin" />
          </motion.div>
        )}
      </motion.div>
      
      {/* Particle effects when talking */}
      {isTalking && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary rounded-full"
              initial={{ 
                x: "50%", 
                y: "50%",
                scale: 0,
                opacity: 0.8
              }}
              animate={{
                x: `${50 + (Math.random() - 0.5) * 100}%`,
                y: `${50 + (Math.random() - 0.5) * 100}%`,
                scale: [0, 1, 0],
                opacity: [0.8, 0.4, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.4,
                ease: "easeOut",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};
