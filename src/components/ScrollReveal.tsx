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
  | 'slide-left'
  | 'slide-right'
  // Legacy aliases for backwards compatibility
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
  duration?: 'fast' | 'normal' | 'slow';
}

// Map animation types to new CSS classes
const animationClasses: Record<AnimationType, string> = {
  'fade-up': 'reveal-up',
  'fade-down': 'reveal-down',
  'fade-left': 'reveal-left',
  'fade-right': 'reveal-right',
  'fade-in': 'reveal-fade',
  'scale': 'reveal-scale',
  'blur': 'reveal-blur',
  'slide-left': 'reveal-left',
  'slide-right': 'reveal-right',
  // Legacy mappings
  'blur-up': 'reveal-up',
  'blur-in': 'reveal-fade',
  'elastic': 'reveal-scale',
  'flip': 'reveal-up',
  'sweep': 'reveal-up',
  'scale-in': 'reveal-scale',
  'rise': 'reveal-up',
  'reveal': 'reveal-fade',
};

const durationClasses = {
  fast: 'reveal-fast',
  normal: 'reveal-normal',
  slow: 'reveal-slow',
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
        isVisible && 'reveal-visible',
        className
      )}
      style={delay > 0 ? { 
        transitionDelay: `${delay}ms`,
        animationDelay: `${delay}ms`,
      } : undefined}
    >
      {children}
    </div>
  );
});

ScrollReveal.displayName = 'ScrollReveal';
