import { useRef, useState, useEffect } from "react";

interface UseParallaxOptions {
  speed?: number;
  offset?: number;
}

interface CachedBounds {
  top: number;
  height: number;
}

export const useParallax = ({ speed = 0.5, offset = 0 }: UseParallaxOptions = {}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [y, setY] = useState(offset);
  const [opacity, setOpacity] = useState(1);
  
  // Cache element bounds to avoid forced reflows during scroll
  const boundsRef = useRef<CachedBounds | null>(null);

  useEffect(() => {
    let ticking = false;
    
    // Cache bounds on mount/resize - only time we read from DOM
    const cacheBounds = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      boundsRef.current = {
        top: rect.top + window.scrollY,
        height: rect.height
      };
    };
    
    // Use cached bounds + scrollY to calculate parallax without reflow
    const updateParallax = () => {
      const bounds = boundsRef.current;
      if (!bounds) {
        ticking = false;
        return;
      }
      
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      
      // Calculate element's current visual position using cached bounds
      const currentTop = bounds.top - scrollY;
      const elementCenter = currentTop + bounds.height / 2;
      const progress = 1 - (elementCenter / viewportHeight);
      
      setY(offset + (progress * 100 * speed));
      setOpacity(Math.max(0.7, 1 - Math.abs(progress) * 0.3));
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };

    // Throttled resize handler to update cached bounds
    let resizeTimeout: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        requestAnimationFrame(cacheBounds);
      }, 150);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });
    
    // Defer initial bounds calculation until browser is idle
    let idleHandle: number | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    
    if ('requestIdleCallback' in window) {
      idleHandle = requestIdleCallback(() => {
        requestAnimationFrame(() => {
          cacheBounds();
          updateParallax();
        });
      }, { timeout: 200 });
    } else {
      timeoutId = setTimeout(() => {
        requestAnimationFrame(() => {
          cacheBounds();
          updateParallax();
        });
      }, 100);
    }
    
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      clearTimeout(resizeTimeout);
      if (idleHandle !== undefined && 'cancelIdleCallback' in window) {
        cancelIdleCallback(idleHandle);
      }
      if (timeoutId !== undefined) clearTimeout(timeoutId);
    };
  }, [speed, offset]);

  return { ref, y, opacity };
};
