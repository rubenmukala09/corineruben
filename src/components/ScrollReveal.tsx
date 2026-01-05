import { ReactNode, memo } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { cn } from '@/lib/utils';

type AnimationType = 
  | 'fade-up' 
  | 'fade-down'
  | 'fade-left'
  | 'fade-right'
  | 'fade-in' 
  | 'scale' 
  | 'blur'
  | 'float'
  | 'unveil'
  // Legacy aliases
  | 'slide-left'
  | 'slide-right'
  | 'blur-up' 
  | 'blur-in' 
  | 'elastic' 
  | 'flip' 
  | 'sweep' 
  | 'scale-in'
  | 'rise'
  | 'reveal';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  animation?: AnimationType;
  delay?: number;
  threshold?: number;
  duration?: 'fast' | 'normal' | 'slow' | 'luxurious';
}

// Map animation types to luxury CSS classes
const animationClasses: Record<AnimationType, string> = {
  'fade-up': 'luxury-reveal-up',
  'fade-down': 'luxury-reveal-down',
  'fade-left': 'luxury-reveal-left',
  'fade-right': 'luxury-reveal-right',
  'fade-in': 'luxury-reveal-fade',
  'scale': 'luxury-reveal-scale',
  'blur': 'luxury-reveal-blur',
  'float': 'luxury-reveal-float',
  'unveil': 'luxury-reveal-unveil',
  'slide-left': 'luxury-reveal-left',
  'slide-right': 'luxury-reveal-right',
  // Legacy mappings
  'blur-up': 'luxury-reveal-up',
  'blur-in': 'luxury-reveal-fade',
  'elastic': 'luxury-reveal-scale',
  'flip': 'luxury-reveal-up',
  'sweep': 'luxury-reveal-up',
  'scale-in': 'luxury-reveal-scale',
  'rise': 'luxury-reveal-float',
  'reveal': 'luxury-reveal-fade',
};

const durationClasses = {
  fast: 'luxury-duration-fast',
  normal: 'luxury-duration-normal',
  slow: 'luxury-duration-slow',
  luxurious: 'luxury-duration-luxurious',
};

export const ScrollReveal = memo(({
  children,
  className,
  animation = 'fade-up',
  delay = 0,
  threshold = 0.1,
  duration = 'normal',
}: ScrollRevealProps) => {
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
        isVisible && 'luxury-visible',
        className
      )}
      style={delay > 0 ? { 
        transitionDelay: `${delay}ms`,
      } : undefined}
    >
      {children}
    </div>
  );
});

ScrollReveal.displayName = 'ScrollReveal';
