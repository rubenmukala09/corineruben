import { cn } from "@/lib/utils";

interface AccentDecorationProps {
  variant?: "corner" | "orb" | "grid" | "ring";
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  className?: string;
}

export const AccentDecoration = ({ 
  variant = "orb", 
  position = "top-right",
  className 
}: AccentDecorationProps) => {
  const positionClasses = {
    "top-left": "top-0 left-0",
    "top-right": "top-0 right-0",
    "bottom-left": "bottom-0 left-0",
    "bottom-right": "bottom-0 right-0"
  };

  if (variant === "orb") {
    return (
      <div 
        className={cn(
          "absolute w-64 h-64 rounded-full blur-3xl pointer-events-none",
          "bg-gradient-to-br from-primary/10 to-accent/5",
          positionClasses[position],
          position.includes("right") ? "-translate-x-1/2" : "translate-x-1/2",
          position.includes("bottom") ? "-translate-y-1/2" : "translate-y-1/2",
          className
        )}
      />
    );
  }

  if (variant === "corner") {
    const rotations = {
      "top-left": "rotate-0",
      "top-right": "rotate-90",
      "bottom-right": "rotate-180",
      "bottom-left": "-rotate-90"
    };
    
    return (
      <div 
        className={cn(
          "absolute w-24 h-24 pointer-events-none",
          positionClasses[position],
          rotations[position],
          className
        )}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path 
            d="M0 0 L40 0 L0 40 Z" 
            className="fill-primary/10"
          />
          <path 
            d="M0 0 L25 0 L0 25 Z" 
            className="fill-accent/15"
          />
        </svg>
      </div>
    );
  }

  if (variant === "ring") {
    return (
      <div 
        className={cn(
          "absolute w-32 h-32 pointer-events-none",
          positionClasses[position],
          className
        )}
      >
        <div className="absolute inset-0 border-2 border-primary/10 rounded-full animate-pulse" />
        <div className="absolute inset-4 border border-accent/10 rounded-full" />
      </div>
    );
  }

  // Grid pattern
  return (
    <div 
      className={cn(
        "absolute w-40 h-40 pointer-events-none opacity-30",
        positionClasses[position],
        className
      )}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {[...Array(5)].map((_, i) => (
          <line 
            key={`h-${i}`}
            x1="0" 
            y1={i * 25} 
            x2="100" 
            y2={i * 25} 
            stroke="currentColor" 
            strokeWidth="0.5"
            className="text-primary"
          />
        ))}
        {[...Array(5)].map((_, i) => (
          <line 
            key={`v-${i}`}
            x1={i * 25} 
            y1="0" 
            x2={i * 25} 
            y2="100" 
            stroke="currentColor" 
            strokeWidth="0.5"
            className="text-primary"
          />
        ))}
      </svg>
    </div>
  );
};
