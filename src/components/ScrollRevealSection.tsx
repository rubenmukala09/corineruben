import { ReactNode } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";

interface ScrollRevealSectionProps {
  children: ReactNode;
  className?: string;
  staggerChildren?: boolean;
  threshold?: number;
  animation?: 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'scale' | 'blur' | 'fade';
  duration?: 'fast' | 'normal' | 'slow';
}

const animationClasses = {
  'fade-up': 'reveal-up',
  'fade-down': 'reveal-down',
  'fade-left': 'reveal-left',
  'fade-right': 'reveal-right',
  'scale': 'reveal-scale',
  'blur': 'reveal-blur',
  'fade': 'reveal-fade',
};

const durationClasses = {
  fast: 'reveal-fast',
  normal: 'reveal-normal',
  slow: 'reveal-slow',
};

// Simplified wrapper component for backward compatibility
export const ScrollRevealSection = ({ 
  children, 
  className = "",
  staggerChildren = false,
  threshold = 0.08,
  animation = 'fade-up',
  duration = 'normal',
}: ScrollRevealSectionProps) => {
  const { ref, isVisible } = useScrollReveal({ 
    threshold,
    triggerOnce: true,
  });

  return (
    <div
      ref={ref}
      className={cn(
        animationClasses[animation],
        durationClasses[duration],
        staggerChildren && "stagger-container",
        isVisible && (staggerChildren ? "stagger-visible reveal-visible" : "reveal-visible"),
        className
      )}
    >
      {children}
    </div>
  );
};
