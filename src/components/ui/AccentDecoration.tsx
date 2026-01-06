import { motion } from "framer-motion";

interface AccentDecorationProps {
  variant?: "corner" | "orb" | "grid" | "ring" | "dots" | "quote";
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  className?: string;
}

const positionClasses = {
  "top-left": "top-0 left-0",
  "top-right": "top-0 right-0",
  "bottom-left": "bottom-0 left-0",
  "bottom-right": "bottom-0 right-0",
};

export const AccentDecoration = ({ variant = "corner", position = "top-right", className = "" }: AccentDecorationProps) => {
  const posClass = positionClasses[position];

  if (variant === "corner") {
    return (
      <div className={`absolute ${posClass} pointer-events-none ${className}`}>
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none" className="text-primary/10">
          <path d="M0 0L120 0L120 120" stroke="currentColor" strokeWidth="2" fill="none" />
          <path d="M20 0L120 0L120 100" stroke="currentColor" strokeWidth="1.5" fill="none" />
          <path d="M40 0L120 0L120 80" stroke="currentColor" strokeWidth="1" fill="none" />
        </svg>
      </div>
    );
  }

  if (variant === "orb") {
    return (
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className={`absolute ${posClass} pointer-events-none ${className}`}
      >
        <div className="w-[200px] h-[200px] rounded-full bg-gradient-to-br from-primary/20 to-accent/20 blur-[60px]" />
      </motion.div>
    );
  }

  if (variant === "grid") {
    return (
      <div className={`absolute ${posClass} pointer-events-none ${className}`}>
        <div className="grid grid-cols-4 gap-2 p-4">
          {[...Array(16)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.1 }}
              className="w-2 h-2 rounded-full bg-primary/20"
            />
          ))}
        </div>
      </div>
    );
  }

  if (variant === "ring") {
    return (
      <div className={`absolute ${posClass} pointer-events-none ${className}`}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="w-32 h-32 border-2 border-dashed border-primary/10 rounded-full"
        />
      </div>
    );
  }

  if (variant === "dots") {
    return (
      <div className={`absolute ${posClass} pointer-events-none ${className}`}>
        <div className="flex flex-col gap-3 p-4">
          {[...Array(5)].map((_, row) => (
            <div key={row} className="flex gap-3">
              {[...Array(5)].map((_, col) => (
                <motion.div
                  key={col}
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    delay: (row + col) * 0.15,
                    ease: "easeInOut"
                  }}
                  className="w-1.5 h-1.5 rounded-full bg-primary/15"
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
};

export default AccentDecoration;
