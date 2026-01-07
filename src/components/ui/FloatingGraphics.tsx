import { motion } from "framer-motion";

interface FloatingGraphicsProps {
  variant?: "orbs" | "shapes" | "particles" | "mesh" | "hexagons" | "cubes3d" | "shields" | "circuits" | "waves";
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
        {/* Additional smaller orbs */}
        <motion.div
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className={`absolute top-[50%] right-[30%] w-[150px] h-[150px] rounded-full bg-emerald-500 blur-[60px] ${baseOpacity}`}
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
        {/* Triangle */}
        <motion.div
          animate={{ rotate: [0, 180, 360] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute top-[60%] left-[10%]"
        >
          <svg width="40" height="40" viewBox="0 0 40 40" className={`text-accent/15 ${baseOpacity}`}>
            <polygon points="20,5 35,35 5,35" fill="currentColor" />
          </svg>
        </motion.div>
        {/* Diamond */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: 45 }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className={`absolute top-[30%] right-[40%] w-10 h-10 bg-gradient-to-br from-primary/10 to-accent/10 ${baseOpacity}`}
        />
      </div>
    );
  }

  if (variant === "particles") {
    return (
      <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ 
              y: [0, -40, 0],
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{ 
              duration: 4 + i * 0.5, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: i * 0.3,
            }}
            className={`absolute rounded-full ${i % 2 === 0 ? 'bg-primary/20' : 'bg-accent/20'}`}
            style={{
              width: `${4 + (i % 4) * 2}px`,
              height: `${4 + (i % 4) * 2}px`,
              left: `${5 + i * 8}%`,
              top: `${15 + (i % 4) * 20}%`,
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
        {/* Smaller hexagon */}
        <motion.div
          animate={{ rotate: 60, scale: [1, 1.1, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className={`absolute top-[50%] right-[30%] w-16 h-16 ${baseOpacity}`}
          style={{
            clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
            background: "linear-gradient(180deg, hsl(var(--primary)) 0%, transparent 100%)",
          }}
        />
      </div>
    );
  }

  if (variant === "cubes3d") {
    return (
      <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
        {/* 3D Cube illusion - top right */}
        <motion.div
          animate={{ rotateY: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[15%] right-[15%]"
          style={{ perspective: "500px", transformStyle: "preserve-3d" }}
        >
          <svg width="80" height="80" viewBox="0 0 80 80" className={baseOpacity}>
            {/* Cube faces */}
            <polygon points="40,10 70,25 70,55 40,70 10,55 10,25" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5" opacity="0.3" />
            <polygon points="40,10 70,25 40,40 10,25" fill="hsl(var(--primary))" opacity="0.1" />
            <polygon points="40,40 70,25 70,55 40,70" fill="hsl(var(--accent))" opacity="0.15" />
            <polygon points="40,40 10,25 10,55 40,70" fill="hsl(var(--primary))" opacity="0.2" />
          </svg>
        </motion.div>
        
        {/* 3D Cube - bottom left */}
        <motion.div
          animate={{ rotateX: [0, 360] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[20%] left-[10%]"
        >
          <svg width="60" height="60" viewBox="0 0 60 60" className={baseOpacity}>
            <polygon points="30,5 55,20 55,45 30,60 5,45 5,20" fill="none" stroke="hsl(var(--accent))" strokeWidth="1.5" opacity="0.3" />
            <polygon points="30,5 55,20 30,35 5,20" fill="hsl(var(--accent))" opacity="0.1" />
            <polygon points="30,35 55,20 55,45 30,60" fill="hsl(var(--primary))" opacity="0.15" />
          </svg>
        </motion.div>

        {/* Floating 3D sphere illusion */}
        <motion.div
          animate={{ y: [-10, 10, -10], scale: [1, 1.05, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[45%] right-[40%]"
        >
          <div className={`w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 via-transparent to-accent/20 ${baseOpacity}`} 
            style={{ boxShadow: "inset -4px -4px 20px rgba(0,0,0,0.1), inset 4px 4px 20px rgba(255,255,255,0.1)" }} 
          />
        </motion.div>
      </div>
    );
  }

  if (variant === "shields") {
    return (
      <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
        {/* Shield icon - top */}
        <motion.div
          animate={{ y: [-5, 5, -5], rotate: [-5, 5, -5] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[12%] right-[20%]"
        >
          <svg width="50" height="60" viewBox="0 0 50 60" className={baseOpacity}>
            <path d="M25 5 L45 15 L45 35 Q45 50 25 55 Q5 50 5 35 L5 15 Z" 
              fill="none" stroke="hsl(var(--primary))" strokeWidth="2" opacity="0.4" />
            <path d="M25 15 L35 20 L35 32 Q35 42 25 45 Q15 42 15 32 L15 20 Z" 
              fill="hsl(var(--primary))" opacity="0.15" />
          </svg>
        </motion.div>
        
        {/* Shield - bottom left */}
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[25%] left-[12%]"
        >
          <svg width="40" height="48" viewBox="0 0 40 48" className={baseOpacity}>
            <path d="M20 4 L36 12 L36 28 Q36 40 20 44 Q4 40 4 28 L4 12 Z" 
              fill="hsl(var(--accent))" opacity="0.2" stroke="hsl(var(--accent))" strokeWidth="1.5" />
          </svg>
        </motion.div>

        {/* Lock icon */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[55%] right-[8%]"
        >
          <svg width="30" height="36" viewBox="0 0 30 36" className={baseOpacity}>
            <rect x="3" y="14" width="24" height="18" rx="3" fill="hsl(var(--primary))" opacity="0.2" />
            <path d="M8 14 L8 10 Q8 4 15 4 Q22 4 22 10 L22 14" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" opacity="0.3" />
            <circle cx="15" cy="23" r="3" fill="hsl(var(--primary))" opacity="0.4" />
          </svg>
        </motion.div>
      </div>
    );
  }

  if (variant === "circuits") {
    return (
      <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
        {/* Circuit lines */}
        <svg className={`absolute inset-0 w-full h-full ${baseOpacity}`}>
          {/* Horizontal circuit line */}
          <motion.path
            d="M0 100 L100 100 L120 80 L200 80 L220 100 L350 100"
            stroke="hsl(var(--primary))"
            strokeWidth="1.5"
            fill="none"
            opacity="0.3"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
          {/* Nodes */}
          <circle cx="100" cy="100" r="4" fill="hsl(var(--primary))" opacity="0.4" />
          <circle cx="200" cy="80" r="3" fill="hsl(var(--accent))" opacity="0.4" />
          <circle cx="350" cy="100" r="4" fill="hsl(var(--primary))" opacity="0.4" />
          
          {/* Vertical branch */}
          <path d="M200 80 L200 40 L250 40" stroke="hsl(var(--accent))" strokeWidth="1" fill="none" opacity="0.25" />
          <circle cx="250" cy="40" r="3" fill="hsl(var(--accent))" opacity="0.3" />
        </svg>
        
        {/* Chip/processor icon */}
        <motion.div
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[30%] right-[15%]"
        >
          <svg width="50" height="50" viewBox="0 0 50 50" className={baseOpacity}>
            <rect x="12" y="12" width="26" height="26" rx="3" fill="hsl(var(--primary))" opacity="0.2" stroke="hsl(var(--primary))" strokeWidth="1" />
            {/* Pins */}
            {[0, 1, 2].map(i => (
              <g key={i}>
                <line x1={18 + i * 7} y1="8" x2={18 + i * 7} y2="12" stroke="hsl(var(--primary))" strokeWidth="2" opacity="0.4" />
                <line x1={18 + i * 7} y1="38" x2={18 + i * 7} y2="42" stroke="hsl(var(--primary))" strokeWidth="2" opacity="0.4" />
                <line x1="8" y1={18 + i * 7} x2="12" y2={18 + i * 7} stroke="hsl(var(--primary))" strokeWidth="2" opacity="0.4" />
                <line x1="38" y1={18 + i * 7} x2="42" y2={18 + i * 7} stroke="hsl(var(--primary))" strokeWidth="2" opacity="0.4" />
              </g>
            ))}
          </svg>
        </motion.div>
      </div>
    );
  }

  if (variant === "waves") {
    return (
      <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
        <svg className={`absolute bottom-0 left-0 w-full h-40 ${baseOpacity}`} viewBox="0 0 1200 120" preserveAspectRatio="none">
          <motion.path
            d="M0,60 C200,100 400,20 600,60 C800,100 1000,20 1200,60 L1200,120 L0,120 Z"
            fill="hsl(var(--primary))"
            opacity="0.1"
            animate={{ d: [
              "M0,60 C200,100 400,20 600,60 C800,100 1000,20 1200,60 L1200,120 L0,120 Z",
              "M0,60 C200,20 400,100 600,60 C800,20 1000,100 1200,60 L1200,120 L0,120 Z",
              "M0,60 C200,100 400,20 600,60 C800,100 1000,20 1200,60 L1200,120 L0,120 Z",
            ]}}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
        <svg className={`absolute bottom-0 left-0 w-full h-32 ${baseOpacity}`} viewBox="0 0 1200 100" preserveAspectRatio="none">
          <motion.path
            d="M0,50 C150,80 350,20 500,50 C650,80 850,20 1000,50 C1100,70 1150,40 1200,50 L1200,100 L0,100 Z"
            fill="hsl(var(--accent))"
            opacity="0.08"
            animate={{ d: [
              "M0,50 C150,80 350,20 500,50 C650,80 850,20 1000,50 C1100,70 1150,40 1200,50 L1200,100 L0,100 Z",
              "M0,50 C150,20 350,80 500,50 C650,20 850,80 1000,50 C1100,30 1150,60 1200,50 L1200,100 L0,100 Z",
              "M0,50 C150,80 350,20 500,50 C650,80 850,20 1000,50 C1100,70 1150,40 1200,50 L1200,100 L0,100 Z",
            ]}}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
        </svg>
      </div>
    );
  }

  return null;
};

export default FloatingGraphics;
