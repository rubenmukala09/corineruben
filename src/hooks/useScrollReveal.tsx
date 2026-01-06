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

  // Check if element is already in viewport on mount - deferred to idle time
  useEffect(() => {
    const element = ref.current;
    if (!element || hasTriggered.current) return;
    
    // Use requestIdleCallback to defer layout read until browser is idle
    const checkVisibility = () => {
      requestAnimationFrame(() => {
        if (!element || hasTriggered.current) return;
        const rect = element.getBoundingClientRect();
        const isAboveFold = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isAboveFold) {
          setIsVisible(true);
          if (triggerOnce) hasTriggered.current = true;
        }
      });
    };
    
    let idleHandle: number | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    
    if ('requestIdleCallback' in window) {
      idleHandle = requestIdleCallback(checkVisibility, { timeout: 200 });
    } else {
      timeoutId = setTimeout(checkVisibility, 100);
    }
    
    return () => {
      if (idleHandle !== undefined && 'cancelIdleCallback' in window) {
        cancelIdleCallback(idleHandle);
      }
      if (timeoutId !== undefined) clearTimeout(timeoutId);
    };
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
