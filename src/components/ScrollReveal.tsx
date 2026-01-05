import { ReactNode, memo } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { cn } from '@/lib/utils';

type AnimationType = 
  | 'fade-up' 
  | 'fade-in' 
  | 'scale' 
  | 'slide-left' 
  | 'slide-right'
  // Legacy aliases
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

// Map animation types to CSS classes
const animationClasses: Record<AnimationType, string> = {
  'fade-up': 'scroll-fade-up',
  'fade-in': 'scroll-fade-in',
  'scale': 'scroll-scale-in',
  'slide-left': 'scroll-slide-left',
  'slide-right': 'scroll-slide-right',
  // Legacy mappings
  'blur-up': 'scroll-fade-up',
  'blur-in': 'scroll-fade-in',
  'elastic': 'scroll-scale-in',
  'flip': 'scroll-fade-up',
  'sweep': 'scroll-fade-up',
  'scale-in': 'scroll-scale-in',
  'rise': 'scroll-fade-up',
  'reveal': 'scroll-fade-in',
};

const durationClasses = {
  fast: 'scroll-duration-fast',
  normal: 'scroll-duration-normal',
  slow: 'scroll-duration-slow',
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
        isVisible && 'scroll-visible',
        className
      )}
      style={delay > 0 ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
});

ScrollReveal.displayName = 'ScrollReveal';
