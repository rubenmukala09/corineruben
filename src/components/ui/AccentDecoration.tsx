import { motion } from "framer-motion";

interface AccentDecorationProps {
  variant?: "corner" | "orb" | "grid" | "ring" | "dots" | "quote" | "shield3d" | "cubeStack" | "gradient-blob" | "tech-lines";
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

  if (variant === "shield3d") {
    return (
      <motion.div
        animate={{ rotateY: [0, 15, 0, -15, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className={`absolute ${posClass} pointer-events-none ${className}`}
        style={{ perspective: "400px" }}
      >
        <svg width="100" height="120" viewBox="0 0 100 120" className="opacity-30">
          {/* 3D Shield with gradient */}
          <defs>
            <linearGradient id="shield3dGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--primary))" />
              <stop offset="100%" stopColor="hsl(var(--accent))" />
            </linearGradient>
            <filter id="shadow3d">
              <feDropShadow dx="3" dy="3" stdDeviation="3" floodOpacity="0.2" />
            </filter>
          </defs>
          <path 
            d="M50 10 L90 25 L90 55 Q90 90 50 110 Q10 90 10 55 L10 25 Z" 
            fill="url(#shield3dGrad)" 
            opacity="0.3"
            filter="url(#shadow3d)"
          />
          <path 
            d="M50 25 L75 35 L75 55 Q75 78 50 92 Q25 78 25 55 L25 35 Z" 
            fill="white" 
            opacity="0.2" 
          />
          {/* Checkmark */}
          <path d="M35 55 L45 68 L68 42" stroke="hsl(var(--primary))" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
        </svg>
      </motion.div>
    );
  }

  if (variant === "cubeStack") {
    return (
      <motion.div
        animate={{ y: [-5, 5, -5] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className={`absolute ${posClass} pointer-events-none ${className}`}
      >
        <svg width="80" height="100" viewBox="0 0 80 100" className="opacity-25">
          {/* Bottom cube */}
          <polygon points="40,85 70,70 70,50 40,65 10,50 10,70" fill="hsl(var(--primary))" opacity="0.4" />
          <polygon points="40,65 70,50 40,35 10,50" fill="hsl(var(--primary))" opacity="0.2" />
          
          {/* Top cube */}
          <polygon points="40,50 70,35 70,15 40,30 10,15 10,35" fill="hsl(var(--accent))" opacity="0.4" />
          <polygon points="40,30 70,15 40,0 10,15" fill="hsl(var(--accent))" opacity="0.3" />
          
          {/* Edges */}
          <path d="M40,65 L40,85 M10,50 L10,70 M70,50 L70,70" stroke="hsl(var(--primary))" strokeWidth="1" opacity="0.3" />
          <path d="M40,30 L40,50 M10,15 L10,35 M70,15 L70,35" stroke="hsl(var(--accent))" strokeWidth="1" opacity="0.3" />
        </svg>
      </motion.div>
    );
  }

  if (variant === "gradient-blob") {
    return (
      <motion.div
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className={`absolute ${posClass} pointer-events-none ${className}`}
      >
        <div 
          className="w-40 h-40 opacity-30"
          style={{
            background: "radial-gradient(ellipse at 30% 30%, hsl(var(--primary)) 0%, transparent 50%), radial-gradient(ellipse at 70% 70%, hsl(var(--accent)) 0%, transparent 50%)",
            borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
            filter: "blur(30px)",
          }}
        />
      </motion.div>
    );
  }

  if (variant === "tech-lines") {
    return (
      <div className={`absolute ${posClass} pointer-events-none ${className}`}>
        <svg width="150" height="150" viewBox="0 0 150 150" className="opacity-20">
          {/* Circuit-like lines */}
          <motion.path
            d="M10 75 L40 75 L50 50 L90 50 L100 75 L140 75"
            stroke="hsl(var(--primary))"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.path
            d="M75 10 L75 40 L100 60 L100 90 L75 110 L75 140"
            stroke="hsl(var(--accent))"
            strokeWidth="1.5"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          />
          {/* Nodes */}
          <circle cx="40" cy="75" r="4" fill="hsl(var(--primary))" opacity="0.5" />
          <circle cx="100" cy="75" r="4" fill="hsl(var(--primary))" opacity="0.5" />
          <circle cx="75" cy="60" r="3" fill="hsl(var(--accent))" opacity="0.4" />
          <circle cx="75" cy="110" r="3" fill="hsl(var(--accent))" opacity="0.4" />
          
          {/* Data points */}
          <motion.circle
            cx="70"
            cy="75"
            r="2"
            fill="hsl(var(--primary))"
            animate={{ cx: [40, 100, 40] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
        </svg>
      </div>
    );
  }

  return null;
};

export default AccentDecoration;
