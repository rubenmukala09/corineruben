import { ReactNode } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { cn } from '@/lib/utils';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  animation?: 'fade-up' | 'fade-in' | 'slide-left' | 'slide-right' | 'scale-in';
  delay?: number;
  threshold?: number;
}

export const ScrollReveal = ({
  children,
  className,
  animation = 'fade-up',
  delay = 0,
  threshold = 0.1,
}: ScrollRevealProps) => {
  const { ref, isVisible } = useScrollReveal({ threshold, triggerOnce: true });

  const animationClasses = {
    'fade-up': 'scroll-reveal-fade-up',
    'fade-in': 'scroll-reveal-fade-in',
    'slide-left': 'scroll-reveal-slide-left',
    'slide-right': 'scroll-reveal-slide-right',
    'scale-in': 'scroll-reveal-scale-in',
  };

  return (
    <div
      ref={ref}
      className={cn(
        animationClasses[animation],
        isVisible && 'scroll-reveal-visible',
        className
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};
