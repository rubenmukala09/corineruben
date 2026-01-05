import { ReactNode } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";

interface ScrollRevealSectionProps {
  children: ReactNode;
  className?: string;
  staggerChildren?: boolean;
  threshold?: number;
  animation?: 'fade' | 'blur' | 'sweep' | 'cascade';
}

// Simplified wrapper component for backward compatibility
export const ScrollRevealSection = ({ 
  children, 
  className = "",
  staggerChildren = false,
  threshold = 0.08,
}: ScrollRevealSectionProps) => {
  const { ref, isVisible } = useScrollReveal({ 
    threshold,
    triggerOnce: true,
  });

  return (
    <div
      ref={ref}
      className={cn(
        "scroll-fade-up scroll-duration-normal",
        staggerChildren && "stagger-cascade",
        isVisible && "scroll-visible section-visible",
        className
      )}
    >
      {children}
    </div>
  );
};
