import { useEffect, useRef, useState, useCallback } from 'react';

interface UseScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  delay?: number;
}

export const useScrollReveal = (options: UseScrollRevealOptions = {}) => {
  const {
    threshold = 0.15,
    rootMargin = '-50px',
    triggerOnce = true,
    delay = 0,
  } = options;

  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  const handleIntersection = useCallback(([entry]: IntersectionObserverEntry[]) => {
    if (entry.isIntersecting && !hasTriggered) {
      if (delay > 0) {
        setTimeout(() => setIsVisible(true), delay);
      } else {
        setIsVisible(true);
      }
      if (triggerOnce) {
        setHasTriggered(true);
      }
    } else if (!triggerOnce && !entry.isIntersecting) {
      setIsVisible(false);
    }
  }, [hasTriggered, triggerOnce, delay]);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // GPU acceleration hint
    element.style.willChange = 'transform, opacity, filter';

    const observer = new IntersectionObserver(handleIntersection, { 
      threshold, 
      rootMargin 
    });

    observer.observe(element);

    return () => {
      observer.disconnect();
      if (element) {
        element.style.willChange = 'auto';
      }
    };
  }, [threshold, rootMargin, handleIntersection]);

  // Cleanup will-change after animation
  useEffect(() => {
    if (isVisible && triggerOnce) {
      const element = ref.current;
      const timer = setTimeout(() => {
        if (element) {
          element.style.willChange = 'auto';
        }
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [isVisible, triggerOnce]);

  return { ref, isVisible };
};
