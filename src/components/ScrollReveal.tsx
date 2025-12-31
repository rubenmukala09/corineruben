import { ReactNode, memo } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { cn } from '@/lib/utils';

type AnimationType = 
  | 'blur-up' 
  | 'blur-in' 
  | 'slide-left' 
  | 'slide-right' 
  | 'elastic' 
  | 'flip' 
  | 'sweep' 
  | 'fade-up' 
  | 'fade-in' 
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
  stagger?: number;
}

// Optimized animation classes that use CSS transitions for instant rendering
const animationClasses: Record<AnimationType, string> = {
  'blur-up': 'scroll-blur-up',
  'blur-in': 'scroll-blur-in',
  'slide-left': 'scroll-slide-left',
  'slide-right': 'scroll-slide-right',
  'elastic': 'scroll-elastic',
  'flip': 'scroll-flip',
  'sweep': 'scroll-sweep',
  'fade-up': 'scroll-blur-up',
  'fade-in': 'scroll-blur-in',
  'scale-in': 'scroll-elastic',
  'rise': 'scroll-rise',
  'reveal': 'scroll-reveal',
};

const durationClasses = {
  'fast': 'scroll-duration-fast',
  'normal': 'scroll-duration-normal',
  'slow': 'scroll-duration-slow',
};

export const ScrollReveal = memo(({
  children,
  className,
  animation = 'blur-up',
  delay = 0,
  threshold = 0.1,
  duration = 'normal',
}: ScrollRevealProps) => {
  const { ref, isVisible } = useScrollReveal({ 
    threshold, 
    triggerOnce: true, 
    delay,
    rootMargin: '0px 0px -30px 0px',
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
      style={{
        transitionDelay: delay > 0 ? `${delay}ms` : undefined,
      }}
    >
      {children}
    </div>
  );
});

ScrollReveal.displayName = 'ScrollReveal';
