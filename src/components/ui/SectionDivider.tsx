import { cn } from "@/lib/utils";

interface SectionDividerProps {
  variant?: "wave" | "gradient" | "dots" | "chevron" | "line";
  className?: string;
  flip?: boolean;
}

export const SectionDivider = ({ 
  variant = "gradient", 
  className,
  flip = false 
}: SectionDividerProps) => {
  if (variant === "wave") {
    return (
      <div className={cn("w-full overflow-hidden", flip && "rotate-180", className)}>
        <svg 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none" 
          className="w-full h-8 md:h-12"
        >
          <path 
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C57.1,118.92,156.63,69.08,321.39,56.44Z" 
            className="fill-primary/10"
          />
        </svg>
      </div>
    );
  }

  if (variant === "dots") {
    return (
      <div className={cn("flex justify-center gap-2 py-6", className)}>
        {[...Array(5)].map((_, i) => (
          <div 
            key={i} 
            className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-accent"
            style={{ opacity: 1 - (Math.abs(2 - i) * 0.2) }}
          />
        ))}
      </div>
    );
  }

  if (variant === "chevron") {
    return (
      <div className={cn("flex justify-center py-4", className)}>
        <svg 
          width="60" 
          height="20" 
          viewBox="0 0 60 20" 
          className="text-primary/30"
        >
          <path 
            d="M0 0 L30 15 L60 0" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
          />
        </svg>
      </div>
    );
  }

  if (variant === "line") {
    return (
      <div className={cn("flex items-center gap-4 py-6", className)}>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="w-2 h-2 rounded-full bg-primary/50" />
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>
    );
  }

  // Default gradient
  return (
    <div className={cn("w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent", className)} />
  );
};
