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

  // Rely solely on IntersectionObserver - no synchronous layout reads
  // This eliminates forced reflows during initial page load

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
