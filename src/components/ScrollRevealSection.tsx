import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ScrollRevealSectionProps {
  children: ReactNode;
  className?: string;
  staggerChildren?: boolean;
  threshold?: number;
  animation?: "fade" | "blur" | "sweep" | "cascade";
}

// Simplified - no animations, just render children
export const ScrollRevealSection = ({
  children,
  className = "",
}: ScrollRevealSectionProps) => {
  return <div className={cn(className)}>{children}</div>;
};
