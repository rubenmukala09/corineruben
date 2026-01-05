import { cn } from "@/lib/utils";

interface DecorativeCirclesProps {
  className?: string;
  variant?: "primary" | "accent" | "mixed";
}

export const DecorativeCircles = ({ 
  className,
  variant = "mixed" 
}: DecorativeCirclesProps) => {
  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      {variant === "primary" && (
        <>
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-primary/5 blur-3xl" />
        </>
      )}
      {variant === "accent" && (
        <>
          <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-accent/10 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 w-64 h-64 rounded-full bg-accent/10 blur-3xl" />
        </>
      )}
      {variant === "mixed" && (
        <>
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-accent/5 blur-3xl" />
        </>
      )}
    </div>
  );
};
