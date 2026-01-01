import { motion } from "framer-motion";

// Diagonal stripe accent - like the green angular shapes in reference
export const DiagonalStripes = ({ 
  position = "top-right",
  color = "primary"
}: { 
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  color?: "primary" | "accent";
}) => {
  const positionClasses = {
    "top-right": "-top-10 -right-10 rotate-12",
    "top-left": "-top-10 -left-10 -rotate-12",
    "bottom-right": "-bottom-10 -right-10 rotate-12",
    "bottom-left": "-bottom-10 -left-10 -rotate-12",
  };
  
  const colorClasses = {
    primary: "bg-primary/10",
    accent: "bg-accent/10",
  };

  return (
    <div className={`absolute ${positionClasses[position]} w-40 h-40 pointer-events-none`}>
      <div className={`absolute inset-0 ${colorClasses[color]} transform skew-x-12`} />
      <div className={`absolute inset-2 ${colorClasses[color]} transform skew-x-12 opacity-50`} />
      <div className={`absolute inset-4 ${colorClasses[color]} transform skew-x-12 opacity-25`} />
    </div>
  );
};

// Hexagon icon container - like the service icons in reference
export const HexagonIcon = ({ 
  children, 
  className = "",
  size = "md",
  gradient = false,
  animated = false
}: { 
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
  gradient?: boolean;
  animated?: boolean;
}) => {
  const sizeClasses = {
    sm: "w-14 h-14",
    md: "w-20 h-20",
    lg: "w-28 h-28",
  };

  if (animated) {
    return (
      <motion.div
        className={`relative ${sizeClasses[size]} ${className}`}
        style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ type: "spring" as const, stiffness: 300 }}
      >
        <div className={`absolute inset-0 ${gradient ? 'bg-gradient-to-br from-primary to-accent' : 'bg-primary/10'}`} />
        <div className="absolute inset-0 flex items-center justify-center">
          {children}
        </div>
      </motion.div>
    );
  }

  return (
    <div
      className={`relative ${sizeClasses[size]} ${className}`}
      style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
    >
      <div className={`absolute inset-0 ${gradient ? 'bg-gradient-to-br from-primary to-accent' : 'bg-primary/10'}`} />
      <div className="absolute inset-0 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
};

// Dotted line pattern decoration
export const DottedPattern = ({ 
  direction = "horizontal",
  length = 8,
  className = ""
}: { 
  direction?: "horizontal" | "vertical" | "diagonal";
  length?: number;
  className?: string;
}) => {
  const dots = Array.from({ length }, (_, i) => i);
  
  const directionClasses = {
    horizontal: "flex-row",
    vertical: "flex-col",
    diagonal: "flex-row -rotate-45",
  };

  return (
    <div className={`flex ${directionClasses[direction]} gap-2 ${className}`}>
      {dots.map((i) => (
        <motion.div
          key={i}
          className="w-2 h-2 rounded-full bg-primary/30"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: i * 0.05 }}
        />
      ))}
    </div>
  );
};

// Angular badge/tag accent - like the "We Serve" tag in reference
export const AngularBadge = ({
  children,
  variant = "primary",
  className = ""
}: {
  children: React.ReactNode;
  variant?: "primary" | "accent" | "outline";
  className?: string;
}) => {
  const variantClasses = {
    primary: "bg-primary text-primary-foreground",
    accent: "bg-accent text-accent-foreground",
    outline: "border-2 border-primary bg-transparent text-primary",
  };

  return (
    <div 
      className={`inline-flex items-center gap-2 px-4 py-2 ${variantClasses[variant]} ${className}`}
      style={{ 
        clipPath: "polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)",
      }}
    >
      {children}
    </div>
  );
};

// Geometric corner accent
export const GeometricCorner = ({
  position = "top-right",
  variant = "lines"
}: {
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  variant?: "lines" | "dots" | "triangles";
}) => {
  const positionClasses = {
    "top-right": "top-0 right-0",
    "top-left": "top-0 left-0 -scale-x-100",
    "bottom-right": "bottom-0 right-0 -scale-y-100",
    "bottom-left": "bottom-0 left-0 scale-x-[-1] scale-y-[-1]",
  };

  if (variant === "lines") {
    return (
      <div className={`absolute ${positionClasses[position]} w-24 h-24 pointer-events-none`}>
        <div className="absolute top-4 right-0 w-16 h-0.5 bg-primary/20" />
        <div className="absolute top-8 right-0 w-12 h-0.5 bg-primary/15" />
        <div className="absolute top-12 right-0 w-8 h-0.5 bg-primary/10" />
        <div className="absolute top-0 right-4 w-0.5 h-16 bg-primary/20" />
        <div className="absolute top-0 right-8 w-0.5 h-12 bg-primary/15" />
        <div className="absolute top-0 right-12 w-0.5 h-8 bg-primary/10" />
      </div>
    );
  }

  if (variant === "dots") {
    return (
      <div className={`absolute ${positionClasses[position]} w-20 h-20 pointer-events-none`}>
        {[0, 1, 2].map((row) => (
          <div key={row} className="flex gap-2 justify-end" style={{ marginTop: row * 8 }}>
            {[0, 1, 2].slice(0, 3 - row).map((col) => (
              <motion.div
                key={col}
                className="w-1.5 h-1.5 rounded-full bg-primary/30"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: (row + col) * 0.2 }}
              />
            ))}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={`absolute ${positionClasses[position]} w-16 h-16 pointer-events-none`}>
      <div 
        className="absolute top-0 right-0 w-0 h-0"
        style={{
          borderTop: "40px solid hsl(var(--primary) / 0.1)",
          borderLeft: "40px solid transparent",
        }}
      />
    </div>
  );
};

// Animated arrow/chevron decoration
export const AnimatedArrow = ({
  direction = "right",
  className = ""
}: {
  direction?: "right" | "left" | "down" | "up";
  className?: string;
}) => {
  const rotations = {
    right: "rotate-0",
    down: "rotate-90",
    left: "rotate-180",
    up: "-rotate-90",
  };

  return (
    <motion.div 
      className={`flex items-center gap-0.5 ${rotations[direction]} ${className}`}
      animate={{ x: [0, 4, 0] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    >
      <div className="w-1.5 h-1.5 border-t-2 border-r-2 border-primary/40 rotate-45" />
      <div className="w-1.5 h-1.5 border-t-2 border-r-2 border-primary/60 rotate-45" />
      <div className="w-1.5 h-1.5 border-t-2 border-r-2 border-primary rotate-45" />
    </motion.div>
  );
};

// Circular progress ring decoration
export const CircularRing = ({
  size = 120,
  strokeWidth = 3,
  progress = 75,
  className = ""
}: {
  size?: number;
  strokeWidth?: number;
  progress?: number;
  className?: string;
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <motion.svg
      width={size}
      height={size}
      className={className}
      initial={{ rotate: 0 }}
      animate={{ rotate: 360 }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="hsl(var(--primary) / 0.1)"
        strokeWidth={strokeWidth}
      />
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="hsl(var(--primary) / 0.3)"
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        initial={{ strokeDashoffset: circumference }}
        animate={{ strokeDashoffset: offset }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />
    </motion.svg>
  );
};

// Grid pattern background
export const GridPattern = ({
  className = ""
}: {
  className?: string;
}) => {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--primary)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />
    </div>
  );
};

// Floating geometric shapes
export const FloatingShapes = ({
  className = ""
}: {
  className?: string;
}) => {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Triangle */}
      <motion.div
        className="absolute top-1/4 left-[10%]"
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 10, 0]
        }}
        transition={{ duration: 6, repeat: Infinity }}
      >
        <div 
          className="w-0 h-0"
          style={{
            borderLeft: "15px solid transparent",
            borderRight: "15px solid transparent",
            borderBottom: "26px solid hsl(var(--primary) / 0.1)",
          }}
        />
      </motion.div>
      
      {/* Square */}
      <motion.div
        className="absolute top-1/3 right-[15%] w-6 h-6 border-2 border-accent/20 rotate-45"
        animate={{ 
          y: [0, 15, 0],
          rotate: [45, 90, 45]
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      
      {/* Circle */}
      <motion.div
        className="absolute bottom-1/4 left-[20%] w-8 h-8 rounded-full border-2 border-primary/15"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      
      {/* Plus sign */}
      <motion.div
        className="absolute top-1/2 right-[25%]"
        animate={{ rotate: [0, 180, 360] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      >
        <div className="relative w-4 h-4">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-primary/20 -translate-y-1/2" />
          <div className="absolute left-1/2 top-0 w-0.5 h-full bg-primary/20 -translate-x-1/2" />
        </div>
      </motion.div>
    </div>
  );
};

export default {
  DiagonalStripes,
  HexagonIcon,
  DottedPattern,
  AngularBadge,
  GeometricCorner,
  AnimatedArrow,
  CircularRing,
  GridPattern,
  FloatingShapes,
};
