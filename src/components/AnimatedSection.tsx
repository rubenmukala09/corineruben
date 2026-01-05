import { ReactNode, memo, CSSProperties } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { cn } from '@/lib/utils';
import { STAGGER } from '@/lib/premium-animations';

type AnimationType = 
  | 'fade-up' 
  | 'fade-down' 
  | 'fade-left' 
  | 'fade-right' 
  | 'fade-in'
  | 'scale' 
  | 'blur';

type DurationType = 'fast' | 'normal' | 'slow';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  animation?: AnimationType;
  duration?: DurationType;
  delay?: number;
  stagger?: boolean;
  staggerDelay?: number;
  threshold?: number;
  as?: 'div' | 'section' | 'article' | 'aside' | 'main';
}

const animationClasses: Record<AnimationType, string> = {
  'fade-up': 'reveal-up',
  'fade-down': 'reveal-down',
  'fade-left': 'reveal-left',
  'fade-right': 'reveal-right',
  'fade-in': 'reveal-fade',
  'scale': 'reveal-scale',
  'blur': 'reveal-blur',
};

const durationClasses: Record<DurationType, string> = {
  fast: 'reveal-fast',
  normal: 'reveal-normal',
  slow: 'reveal-slow',
};

/**
 * AnimatedSection - A premium scroll-reveal wrapper component
 * 
 * Features:
 * - Multiple animation types (fade-up, scale, blur, etc.)
 * - Configurable duration and delay
 * - Optional stagger effect for children
 * - GPU-accelerated animations
 * - Reduced motion support
 */
export const AnimatedSection = memo(({
  children,
  className,
  animation = 'fade-up',
  duration = 'normal',
  delay = 0,
  stagger = false,
  staggerDelay = STAGGER.normal,
  threshold = 0.1,
  as: Component = 'div',
}: AnimatedSectionProps) => {
  const { ref, isVisible } = useScrollReveal({ 
    threshold, 
    triggerOnce: true,
  });

  const style: CSSProperties = delay > 0 ? { 
    transitionDelay: `${delay}ms`,
    animationDelay: `${delay}ms`,
  } : {};

  return (
    <Component
      ref={ref}
      className={cn(
        animationClasses[animation],
        durationClasses[duration],
        stagger && 'stagger-children',
        isVisible && 'reveal-visible',
        className
      )}
      style={style}
      data-stagger-delay={stagger ? staggerDelay : undefined}
    >
      {children}
    </Component>
  );
});

AnimatedSection.displayName = 'AnimatedSection';

/**
 * Stagger container for animating multiple children in sequence
 */
interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  threshold?: number;
}

export const StaggerContainer = memo(({
  children,
  className,
  staggerDelay = STAGGER.normal,
  threshold = 0.1,
}: StaggerContainerProps) => {
  const { ref, isVisible } = useScrollReveal({ 
    threshold, 
    triggerOnce: true,
  });

  return (
    <div
      ref={ref}
      className={cn(
        'stagger-container',
        isVisible && 'stagger-visible',
        className
      )}
      style={{ '--stagger-delay': `${staggerDelay}ms` } as CSSProperties}
    >
      {children}
    </div>
  );
});

StaggerContainer.displayName = 'StaggerContainer';
