import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SecurityBorderProps {
  children: ReactNode;
  className?: string;
  animated?: boolean;
}

export const SecurityBorder = ({ children, className, animated = true }: SecurityBorderProps) => {
  return (
    <div className={cn("relative p-6 rounded-xl", className)}>
      <div className={cn(
        "absolute inset-0 rounded-xl bg-gradient-to-r from-primary/20 to-accent/20 border-2 border-primary/30",
        animated && "animate-pulse"
      )} />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};
