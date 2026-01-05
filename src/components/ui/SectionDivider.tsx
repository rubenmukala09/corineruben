import { cn } from "@/lib/utils";

interface SectionDividerProps {
  variant?: "wave" | "gradient" | "dots" | "chevron" | "line" | "curve" | "drops" | "mountains" | "clouds";
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

  if (variant === "curve") {
    return (
      <div className={cn("w-full overflow-hidden", flip && "rotate-180", className)}>
        <svg 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none" 
          className="w-full h-12 md:h-16"
        >
          <path 
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
            className="fill-muted/50"
          />
        </svg>
      </div>
    );
  }

  if (variant === "drops") {
    return (
      <div className={cn("w-full overflow-hidden", flip && "rotate-180", className)}>
        <svg 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none" 
          className="w-full h-10 md:h-14"
        >
          <path 
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" 
            className="fill-accent/10"
          />
        </svg>
      </div>
    );
  }

  if (variant === "mountains") {
    return (
      <div className={cn("w-full overflow-hidden", flip && "rotate-180", className)}>
        <svg 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none" 
          className="w-full h-10 md:h-16"
        >
          <path 
            d="M1200 0L0 0 598.97 114.72 1200 0z" 
            className="fill-primary/5"
          />
        </svg>
      </div>
    );
  }

  if (variant === "clouds") {
    return (
      <div className={cn("w-full overflow-hidden", flip && "rotate-180", className)}>
        <svg 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none" 
          className="w-full h-12 md:h-16"
        >
          <path 
            d="M0,0V7.23C0,65.52,268.63,112.77,600,112.77S1200,65.52,1200,7.23V0Z" 
            className="fill-muted/30"
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
