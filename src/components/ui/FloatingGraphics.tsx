import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface FloatingGraphicsProps {
  variant?: "orbs" | "shapes" | "particles" | "mesh" | "hexagons";
  className?: string;
  intensity?: "light" | "medium" | "strong";
}

export const FloatingGraphics = ({ 
  variant = "orbs", 
  className,
  intensity = "light"
}: FloatingGraphicsProps) => {
  const opacityMap = {
    light: 0.15,
    medium: 0.25,
    strong: 0.4
  };
  
  const baseOpacity = opacityMap[intensity];

  if (variant === "orbs") {
    return (
      <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
        {/* Large gradient orb - top right */}
        <motion.div
          className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-gradient-to-br from-primary/20 to-accent/10 blur-3xl"
          style={{ opacity: baseOpacity }}
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Medium orb - bottom left */}
        <motion.div
          className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-gradient-to-tr from-accent/15 to-primary/10 blur-3xl"
          style={{ opacity: baseOpacity * 0.8 }}
          animate={{
            scale: [1, 1.15, 1],
            x: [0, -20, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        
        {/* Small accent orb - center */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10 blur-3xl"
          style={{ opacity: baseOpacity * 0.5 }}
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>
    );
  }

  if (variant === "shapes") {
    return (
      <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
        {/* Floating triangles */}
        <motion.div
          className="absolute top-20 right-[15%]"
          style={{ opacity: baseOpacity }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 15, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <svg width="60" height="52" viewBox="0 0 60 52" fill="none">
            <path d="M30 0L60 52H0L30 0Z" className="fill-primary/20" />
          </svg>
        </motion.div>
        
        {/* Floating squares */}
        <motion.div
          className="absolute bottom-32 left-[10%]"
          style={{ opacity: baseOpacity }}
          animate={{
            y: [0, 15, 0],
            rotate: [0, 45, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        >
          <div className="w-16 h-16 border-2 border-accent/30 rounded-lg" />
        </motion.div>
        
        {/* Floating circles */}
        <motion.div
          className="absolute top-1/3 left-[80%]"
          style={{ opacity: baseOpacity }}
          animate={{
            y: [0, -25, 0],
            x: [0, 10, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        >
          <div className="w-12 h-12 border-2 border-primary/25 rounded-full" />
        </motion.div>
        
        {/* Cross shape */}
        <motion.div
          className="absolute bottom-1/4 right-[20%]"
          style={{ opacity: baseOpacity }}
          animate={{
            rotate: [0, 90, 180, 270, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path d="M17 0H23V40H17V0Z" className="fill-accent/20" />
            <path d="M0 17H40V23H0V17Z" className="fill-accent/20" />
          </svg>
        </motion.div>
        
        {/* Diamond */}
        <motion.div
          className="absolute top-1/2 left-[5%]"
          style={{ opacity: baseOpacity }}
          animate={{
            y: [0, -30, 0],
            rotate: [45, 45, 45],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="w-10 h-10 bg-gradient-to-br from-primary/15 to-accent/15 rotate-45" />
        </motion.div>
      </div>
    );
  }

  if (variant === "particles") {
    const particles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      size: Math.random() * 6 + 2,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5,
    }));

    return (
      <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-gradient-to-r from-primary/30 to-accent/30"
            style={{
              width: particle.size,
              height: particle.size,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              opacity: baseOpacity,
            }}
            animate={{
              y: [0, -50, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [baseOpacity * 0.3, baseOpacity, baseOpacity * 0.3],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: particle.delay,
            }}
          />
        ))}
      </div>
    );
  }

  if (variant === "mesh") {
    return (
      <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
        {/* Gradient mesh background */}
        <div 
          className="absolute inset-0"
          style={{ 
            opacity: baseOpacity * 0.7,
            background: `
              radial-gradient(at 40% 20%, hsl(var(--primary) / 0.15) 0px, transparent 50%),
              radial-gradient(at 80% 0%, hsl(var(--accent) / 0.1) 0px, transparent 50%),
              radial-gradient(at 0% 50%, hsl(var(--primary) / 0.1) 0px, transparent 50%),
              radial-gradient(at 80% 50%, hsl(var(--accent) / 0.12) 0px, transparent 50%),
              radial-gradient(at 0% 100%, hsl(var(--primary) / 0.08) 0px, transparent 50%),
              radial-gradient(at 80% 100%, hsl(var(--accent) / 0.1) 0px, transparent 50%)
            `
          }}
        />
        
        {/* Animated gradient overlay */}
        <motion.div
          className="absolute inset-0"
          style={{ opacity: baseOpacity * 0.5 }}
          animate={{
            background: [
              'radial-gradient(circle at 20% 50%, hsl(var(--primary) / 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 50%, hsl(var(--accent) / 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 50% 80%, hsl(var(--primary) / 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 50%, hsl(var(--primary) / 0.1) 0%, transparent 50%)',
            ]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>
    );
  }

  // Hexagons variant
  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      {/* Hexagon pattern */}
      <svg className="absolute inset-0 w-full h-full" style={{ opacity: baseOpacity * 0.5 }}>
        <defs>
          <pattern id="hexagons" width="50" height="43.4" patternUnits="userSpaceOnUse" patternTransform="scale(2)">
            <polygon 
              points="25,0 50,14.4 50,43.4 25,43.4 0,43.4 0,14.4" 
              fill="none" 
              stroke="url(#hexGradient)" 
              strokeWidth="0.5"
            />
          </pattern>
          <linearGradient id="hexGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 0.3 }} />
            <stop offset="100%" style={{ stopColor: 'hsl(var(--accent))', stopOpacity: 0.2 }} />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#hexagons)" />
      </svg>
      
      {/* Floating hexagon accents */}
      <motion.div
        className="absolute top-20 right-[10%]"
        style={{ opacity: baseOpacity }}
        animate={{
          y: [0, -15, 0],
          rotate: [0, 30, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <svg width="80" height="70" viewBox="0 0 80 70" fill="none">
          <polygon 
            points="40,0 80,17.5 80,52.5 40,70 0,52.5 0,17.5" 
            className="fill-primary/10 stroke-primary/30"
            strokeWidth="1"
          />
        </svg>
      </motion.div>
      
      <motion.div
        className="absolute bottom-32 left-[15%]"
        style={{ opacity: baseOpacity * 0.8 }}
        animate={{
          y: [0, 20, 0],
          rotate: [0, -15, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      >
        <svg width="60" height="52" viewBox="0 0 60 52" fill="none">
          <polygon 
            points="30,0 60,13 60,39 30,52 0,39 0,13" 
            className="fill-accent/10 stroke-accent/25"
            strokeWidth="1"
          />
        </svg>
      </motion.div>
    </div>
  );
};
