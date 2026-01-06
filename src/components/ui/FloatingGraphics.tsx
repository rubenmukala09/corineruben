import { motion } from "framer-motion";

interface FloatingGraphicsProps {
  variant?: "orbs" | "shapes" | "particles" | "mesh" | "hexagons";
  className?: string;
  intensity?: "light" | "medium" | "strong";
}

export const FloatingGraphics = ({ variant = "orbs", className = "", intensity = "light" }: FloatingGraphicsProps) => {
  const opacityMap = {
    light: "opacity-[0.03]",
    medium: "opacity-[0.06]",
    strong: "opacity-[0.10]",
  };

  const baseOpacity = opacityMap[intensity];

  if (variant === "orbs") {
    return (
      <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className={`absolute top-[10%] right-[10%] w-[300px] h-[300px] rounded-full bg-primary blur-[100px] ${baseOpacity}`}
        />
        <motion.div
          animate={{ 
            scale: [1.1, 1, 1.1],
            x: [0, -20, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className={`absolute bottom-[20%] left-[5%] w-[250px] h-[250px] rounded-full bg-accent blur-[80px] ${baseOpacity}`}
        />
      </div>
    );
  }

  if (variant === "shapes") {
    return (
      <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
        {/* Floating squares */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className={`absolute top-[15%] left-[20%] w-16 h-16 border-2 border-primary/10 rounded-lg ${baseOpacity}`}
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
          className={`absolute bottom-[25%] right-[15%] w-12 h-12 border-2 border-accent/10 rounded-lg ${baseOpacity}`}
        />
        {/* Floating circles */}
        <motion.div
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className={`absolute top-[40%] right-[25%] w-8 h-8 rounded-full border-2 border-primary/10 ${baseOpacity}`}
        />
      </div>
    );
  }

  if (variant === "particles") {
    return (
      <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ 
              y: [0, -40, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ 
              duration: 4 + i * 0.5, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: i * 0.3,
            }}
            className={`absolute w-2 h-2 rounded-full bg-primary/20`}
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
          />
        ))}
      </div>
    );
  }

  if (variant === "mesh") {
    return (
      <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
        <svg className={`absolute inset-0 w-full h-full ${baseOpacity}`} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="mesh" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-primary/30" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#mesh)" />
        </svg>
      </div>
    );
  }

  if (variant === "hexagons") {
    return (
      <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
        <motion.div
          animate={{ rotate: 30 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear", repeatType: "reverse" }}
          className={`absolute top-[10%] right-[10%] w-32 h-32 ${baseOpacity}`}
          style={{
            clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
            background: "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--accent)) 100%)",
          }}
        />
        <motion.div
          animate={{ rotate: -30 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear", repeatType: "reverse" }}
          className={`absolute bottom-[15%] left-[8%] w-24 h-24 ${baseOpacity}`}
          style={{
            clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
            background: "linear-gradient(135deg, hsl(var(--accent)) 0%, hsl(var(--primary)) 100%)",
          }}
        />
      </div>
    );
  }

  return null;
};

export default FloatingGraphics;
