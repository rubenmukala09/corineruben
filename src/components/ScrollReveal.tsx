import { ReactNode, memo } from "react";
import { cn } from "@/lib/utils";

type AnimationType =
  | "fade-up"
  | "fade-in"
  | "scale"
  | "slide-left"
  | "slide-right"
  | "blur-up"
  | "blur-in"
  | "elastic"
  | "flip"
  | "sweep"
  | "scale-in"
  | "rise"
  | "reveal";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  animation?: AnimationType;
  delay?: number;
  threshold?: number;
  duration?: "fast" | "normal" | "slow";
}

// Simplified - no animations, just render children immediately
export const ScrollReveal = memo(
  ({ children, className }: ScrollRevealProps) => {
    return <div className={cn(className)}>{children}</div>;
  },
);

ScrollReveal.displayName = "ScrollReveal";
