import { useEffect, useRef, useState, useCallback } from 'react';

interface UseScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  delay?: number;
}

export const useScrollReveal = (options: UseScrollRevealOptions = {}) => {
  const {
    threshold = 0.1,
    rootMargin = '100px 0px 0px 0px',
    triggerOnce = true,
  } = options;

  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const hasTriggered = useRef(false);

  // Check if element is already in viewport on mount - deferred to avoid forced reflow
  useEffect(() => {
    const element = ref.current;
    if (!element || hasTriggered.current) return;
    
    // Defer layout read significantly to avoid blocking FCP
    const timeoutId = setTimeout(() => {
      requestAnimationFrame(() => {
        const rect = element.getBoundingClientRect();
        const isAboveFold = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isAboveFold) {
          setIsVisible(true);
          if (triggerOnce) hasTriggered.current = true;
        }
      });
    }, 50);
    
    return () => clearTimeout(timeoutId);
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

  return { ref, isVisible };
};
