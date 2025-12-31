import { useEffect, useRef, useState, useCallback } from 'react';

interface UseScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  delay?: number;
}

export const useScrollReveal = (options: UseScrollRevealOptions = {}) => {
  const {
    threshold = 0.08,
    rootMargin = '0px 0px -20px 0px',
    triggerOnce = true,
    delay = 0,
  } = options;

  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const hasTriggered = useRef(false);

  const handleIntersection = useCallback(([entry]: IntersectionObserverEntry[]) => {
    if (entry.isIntersecting && !hasTriggered.current) {
      const show = () => {
        requestAnimationFrame(() => {
          setIsVisible(true);
          if (triggerOnce) {
            hasTriggered.current = true;
          }
        });
      };
      
      if (delay > 0) {
        setTimeout(show, delay);
      } else {
        show();
      }
    } else if (!triggerOnce && !entry.isIntersecting) {
      setIsVisible(false);
    }
  }, [triggerOnce, delay]);

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
