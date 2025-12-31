import { ReactNode } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { cn } from '@/lib/utils';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  animation?: 'blur-up' | 'blur-in' | 'slide-left' | 'slide-right' | 'elastic' | 'flip' | 'sweep' | 'fade-up' | 'fade-in' | 'scale-in';
  delay?: number;
  threshold?: number;
  duration?: 'fast' | 'normal' | 'slow';
}

export const ScrollReveal = ({
  children,
  className,
  animation = 'blur-up',
  delay = 0,
  threshold = 0.15,
  duration = 'normal',
}: ScrollRevealProps) => {
  const { ref, isVisible } = useScrollReveal({ threshold, triggerOnce: true, delay });

  // Map old animation names to new ones for backward compatibility
  const animationMap: Record<string, string> = {
    'blur-up': 'scroll-blur-up',
    'blur-in': 'scroll-blur-in',
    'slide-left': 'scroll-slide-left',
    'slide-right': 'scroll-slide-right',
    'elastic': 'scroll-elastic',
    'flip': 'scroll-flip',
    'sweep': 'scroll-sweep',
    // Legacy mappings
    'fade-up': 'scroll-blur-up',
    'fade-in': 'scroll-blur-in',
    'scale-in': 'scroll-elastic',
  };

  const durationClasses = {
    'fast': 'scroll-duration-fast',
    'normal': 'scroll-duration-normal',
    'slow': 'scroll-duration-slow',
  };

  return (
    <div
      ref={ref}
      className={cn(
        animationMap[animation] || 'scroll-blur-up',
        durationClasses[duration],
        isVisible && 'scroll-visible',
        className
      )}
    >
      {children}
    </div>
  );
};
