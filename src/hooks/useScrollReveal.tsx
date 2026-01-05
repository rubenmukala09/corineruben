import { useEffect, useRef, useState, useCallback } from 'react';

type RevealDirection = 'up' | 'down' | 'left' | 'right' | 'scale' | 'blur' | 'fade';

interface UseScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  delay?: number;
  direction?: RevealDirection;
}

interface UseScrollRevealReturn {
  ref: React.RefObject<HTMLDivElement>;
  isVisible: boolean;
  direction: RevealDirection;
}

export const useScrollReveal = (options: UseScrollRevealOptions = {}): UseScrollRevealReturn => {
  const {
    threshold = 0.1,
    rootMargin = '50px 0px 0px 0px',
    triggerOnce = true,
    direction = 'up',
  } = options;

  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const hasTriggered = useRef(false);

  // Check if element is already in viewport on mount - deferred to avoid forced reflow
  useEffect(() => {
    const element = ref.current;
    if (!element || hasTriggered.current) return;
    
    // Defer layout read to next frame to avoid forced reflow during initial render
    const frameId = requestAnimationFrame(() => {
      const rect = element.getBoundingClientRect();
      const isAboveFold = rect.top < window.innerHeight && rect.bottom > 0;
      
      if (isAboveFold) {
        setIsVisible(true);
        if (triggerOnce) hasTriggered.current = true;
      }
    });
    
    return () => cancelAnimationFrame(frameId);
  }, [triggerOnce]);

  const handleIntersection = useCallback(([entry]: IntersectionObserverEntry[]) => {
    if (entry.isIntersecting && !hasTriggered.current) {
      setIsVisible(true);
      if (triggerOnce) hasTriggered.current = true;
    } else if (!triggerOnce && !entry.isIntersecting) {
      setIsVisible(false);
    }
  }, [triggerOnce]);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(handleIntersection, { 
      threshold, 
      rootMargin 
    });

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold, rootMargin, handleIntersection]);

  return { ref, isVisible, direction };
};

// Stagger hook for animating multiple elements
export const useStaggerReveal = (
  itemCount: number,
  options: UseScrollRevealOptions & { staggerDelay?: number } = {}
) => {
  const { staggerDelay = 50, ...revealOptions } = options;
  const { ref, isVisible } = useScrollReveal(revealOptions);

  const getItemDelay = useCallback((index: number) => {
    return isVisible ? index * staggerDelay : 0;
  }, [isVisible, staggerDelay]);

  const getItemStyle = useCallback((index: number) => ({
    transitionDelay: `${getItemDelay(index)}ms`,
    animationDelay: `${getItemDelay(index)}ms`,
  }), [getItemDelay]);

  return {
    containerRef: ref,
    isVisible,
    getItemDelay,
    getItemStyle,
  };
};
