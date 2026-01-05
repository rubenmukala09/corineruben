import { cn } from "@/lib/utils";
import { Shield, Lock, CheckCircle, Users, Award, Zap } from "lucide-react";

// Diagonal Stripes Background
export const DiagonalStripes = ({ className }: { className?: string }) => (
  <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
    <div 
      className="absolute inset-0 opacity-[0.03]"
      style={{
        backgroundImage: `repeating-linear-gradient(
          -45deg,
          transparent,
          transparent 10px,
          hsl(var(--primary)) 10px,
          hsl(var(--primary)) 11px
        )`
      }}
    />
  </div>
);

// Floating Icon Element
interface FloatingIconProps {
  icon: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const FloatingIcon = ({ icon, className, size = "md" }: FloatingIconProps) => {
  const sizes = {
    sm: "w-10 h-10",
    md: "w-14 h-14",
    lg: "w-20 h-20"
  };
  
  return (
    <div className={cn(
      "absolute rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 flex items-center justify-center backdrop-blur-sm shadow-lg",
      sizes[size],
      className
    )}>
      {icon}
    </div>
  );
};

// Dotted Grid Pattern
export const DottedGrid = ({ className }: { className?: string }) => (
  <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
    <div 
      className="absolute inset-0 opacity-[0.06]"
      style={{
        backgroundImage: `radial-gradient(circle, hsl(var(--primary)) 1px, transparent 1px)`,
        backgroundSize: '24px 24px'
      }}
    />
  </div>
);

// Hexagon Shape
export const HexagonShape = ({ className, filled = false }: { className?: string; filled?: boolean }) => (
  <div className={cn("absolute pointer-events-none", className)}>
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <polygon 
        points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5" 
        fill={filled ? "hsl(var(--primary) / 0.08)" : "none"}
        stroke="hsl(var(--primary) / 0.15)"
        strokeWidth="1"
      />
    </svg>
  </div>
);

// Triangle Accent
export const TriangleAccent = ({ className, direction = "up" }: { className?: string; direction?: "up" | "down" | "left" | "right" }) => {
  const rotations = {
    up: "rotate-0",
    down: "rotate-180",
    left: "-rotate-90",
    right: "rotate-90"
  };
  
  return (
    <div className={cn("absolute pointer-events-none", rotations[direction], className)}>
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <polygon 
          points="50,15 90,85 10,85" 
          fill="hsl(var(--primary) / 0.05)"
          stroke="hsl(var(--primary) / 0.12)"
          strokeWidth="1"
        />
      </svg>
    </div>
  );
};

// Corner Bracket Decoration
export const CornerBracket = ({ className, corner = "top-left" }: { className?: string; corner?: "top-left" | "top-right" | "bottom-left" | "bottom-right" }) => {
  const transforms = {
    "top-left": "",
    "top-right": "scale-x-[-1]",
    "bottom-left": "scale-y-[-1]",
    "bottom-right": "scale-[-1]"
  };
  
  return (
    <div className={cn("absolute w-16 h-16 pointer-events-none", className)} style={{ transform: transforms[corner] }}>
      <svg viewBox="0 0 64 64" className="w-full h-full">
        <path 
          d="M4 64 L4 4 L64 4" 
          fill="none"
          stroke="hsl(var(--primary) / 0.2)"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

// Circle Ring Decoration
export const CircleRing = ({ className, size = "md" }: { className?: string; size?: "sm" | "md" | "lg" | "xl" }) => {
  const sizes = {
    sm: "w-20 h-20",
    md: "w-32 h-32",
    lg: "w-48 h-48",
    xl: "w-64 h-64"
  };
  
  return (
    <div className={cn("absolute rounded-full border-2 border-primary/10 pointer-events-none", sizes[size], className)} />
  );
};

// Gradient Orb
export const GradientOrb = ({ className, variant = "primary" }: { className?: string; variant?: "primary" | "accent" | "mixed" }) => {
  const gradients = {
    primary: "from-primary/20 to-primary/5",
    accent: "from-accent/20 to-accent/5",
    mixed: "from-primary/15 via-accent/10 to-transparent"
  };
  
  return (
    <div className={cn(
      "absolute rounded-full bg-gradient-radial blur-3xl pointer-events-none",
      `bg-gradient-to-br ${gradients[variant]}`,
      className
    )} />
  );
};

// Line Connector
export const LineConnector = ({ className, direction = "horizontal" }: { className?: string; direction?: "horizontal" | "vertical" | "diagonal" }) => (
  <div className={cn("absolute pointer-events-none", className)}>
    {direction === "horizontal" && (
      <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
    )}
    {direction === "vertical" && (
      <div className="h-full w-px bg-gradient-to-b from-transparent via-primary/20 to-transparent" />
    )}
    {direction === "diagonal" && (
      <div className="w-full h-full">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
          <line x1="0" y1="100" x2="100" y2="0" stroke="hsl(var(--primary) / 0.15)" strokeWidth="0.5" />
        </svg>
      </div>
    )}
  </div>
);

// Animated Pulse Ring
export const PulseRing = ({ className }: { className?: string }) => (
  <div className={cn("absolute pointer-events-none", className)}>
    <div className="relative w-20 h-20">
      <div className="absolute inset-0 rounded-full border border-primary/30 animate-ping" style={{ animationDuration: '3s' }} />
      <div className="absolute inset-2 rounded-full border border-primary/20 animate-ping" style={{ animationDuration: '3s', animationDelay: '0.5s' }} />
      <div className="absolute inset-4 rounded-full bg-primary/10" />
    </div>
  </div>
);

// Stacked Cards Background
export const StackedCards = ({ className }: { className?: string }) => (
  <div className={cn("absolute pointer-events-none", className)}>
    <div className="relative w-48 h-32">
      <div className="absolute inset-0 bg-primary/5 rounded-xl transform rotate-6 translate-x-2 translate-y-2" />
      <div className="absolute inset-0 bg-primary/5 rounded-xl transform rotate-3 translate-x-1 translate-y-1" />
      <div className="absolute inset-0 bg-primary/10 rounded-xl border border-primary/10" />
    </div>
  </div>
);

// Full Page Decoration Layout for Training Page
export const TrainingPageDecorations = () => (
  <>
    {/* Top Section Decorations */}
    <div className="absolute top-0 left-0 w-full h-[600px] overflow-hidden pointer-events-none">
      <CircleRing className="top-20 -left-16" size="xl" />
      <CircleRing className="top-40 left-10" size="md" />
      <FloatingIcon 
        icon={<Shield className="w-6 h-6 text-primary/60" />} 
        className="top-32 right-[15%] hidden lg:flex"
        size="lg"
      />
      <HexagonShape className="top-24 right-[8%] w-24 h-24 hidden md:block" filled />
      <TriangleAccent className="top-48 left-[5%] w-16 h-16 hidden lg:block" direction="right" />
    </div>

    {/* Middle Section Decorations */}
    <div className="absolute top-[800px] left-0 w-full h-[400px] overflow-hidden pointer-events-none">
      <GradientOrb className="w-96 h-96 -left-48 top-0" variant="primary" />
      <GradientOrb className="w-72 h-72 -right-36 top-20" variant="accent" />
      <CornerBracket className="left-8 top-32 hidden lg:block" corner="top-left" />
      <CornerBracket className="right-8 bottom-32 hidden lg:block" corner="bottom-right" />
    </div>

    {/* Bottom Section Decorations */}
    <div className="absolute bottom-0 left-0 w-full h-[500px] overflow-hidden pointer-events-none">
      <FloatingIcon 
        icon={<Lock className="w-5 h-5 text-accent/60" />} 
        className="bottom-40 left-[10%] hidden lg:flex"
        size="md"
      />
      <FloatingIcon 
        icon={<Award className="w-6 h-6 text-primary/60" />} 
        className="bottom-60 right-[12%] hidden md:flex"
        size="lg"
      />
      <CircleRing className="bottom-20 right-10" size="lg" />
      <HexagonShape className="bottom-32 left-[20%] w-20 h-20 hidden lg:block" />
    </div>
  </>
);

// Section-specific decoration component
interface SectionDecorationsProps {
  variant?: "trust" | "training" | "scamshield" | "testimonials";
}

export const SectionDecorations = ({ variant = "trust" }: SectionDecorationsProps) => {
  switch (variant) {
    case "trust":
      return (
        <>
          <DiagonalStripes />
          <CircleRing className="-top-8 -right-8" size="lg" />
          <FloatingIcon 
            icon={<Shield className="w-5 h-5 text-primary/50" />} 
            className="top-20 right-[5%] hidden xl:flex"
            size="md"
          />
          <GradientOrb className="w-64 h-64 -left-32 top-1/2" variant="mixed" />
        </>
      );
    case "training":
      return (
        <>
          <DottedGrid />
          <HexagonShape className="-top-12 right-[10%] w-32 h-32 hidden lg:block" filled />
          <TriangleAccent className="bottom-20 left-[5%] w-20 h-20 hidden lg:block" direction="up" />
          <CircleRing className="bottom-10 -right-10" size="xl" />
        </>
      );
    case "scamshield":
      return (
        <>
          <DiagonalStripes />
          <GradientOrb className="w-96 h-96 -right-48 -top-24" variant="primary" />
          <FloatingIcon 
            icon={<Zap className="w-6 h-6 text-accent/60" />} 
            className="top-32 left-[8%] hidden xl:flex"
            size="lg"
          />
          <CornerBracket className="bottom-8 right-8 hidden lg:block" corner="bottom-right" />
        </>
      );
    case "testimonials":
      return (
        <>
          <DottedGrid />
          <CircleRing className="top-1/4 -left-16" size="xl" />
          <CircleRing className="bottom-1/4 -right-16" size="lg" />
          <StackedCards className="-bottom-8 left-[10%] hidden xl:block opacity-50" />
        </>
      );
    default:
      return null;
  }
};
