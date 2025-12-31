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

export const ScrollRevealSection = ({ 
  children, 
  className = "",
  staggerChildren = false,
  threshold = 0.2,
  animation = 'blur'
}: ScrollRevealSectionProps) => {
  const { ref, isVisible } = useScrollReveal({ 
    threshold,
    triggerOnce: true 
  });

  const animationClasses = {
    'fade': 'section-reveal-fade',
    'blur': 'section-reveal-blur',
    'sweep': 'section-reveal-sweep',
    'cascade': 'section-reveal-cascade',
  };

  return (
    <div
      ref={ref}
      className={cn(
        animationClasses[animation],
        staggerChildren && "stagger-cascade",
        isVisible && "section-visible",
        className
      )}
    >
      {children}
    </div>
  );
};
