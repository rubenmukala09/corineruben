import { useRef, useState, useEffect } from "react";

interface UseParallaxOptions {
  speed?: number;
  offset?: number;
}

export const useParallax = ({ speed = 0.5, offset = 0 }: UseParallaxOptions = {}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [y, setY] = useState(offset);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    let ticking = false;
    
    const updateParallax = () => {
      if (!ref.current) return;
      
      const rect = ref.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const elementCenter = rect.top + rect.height / 2;
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

    window.addEventListener('scroll', onScroll, { passive: true });
    // Use requestIdleCallback to defer initial read until browser is idle
    let idleHandle: number | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    
    if ('requestIdleCallback' in window) {
      idleHandle = requestIdleCallback(() => {
        requestAnimationFrame(updateParallax);
      }, { timeout: 200 });
    } else {
      timeoutId = setTimeout(() => {
        requestAnimationFrame(updateParallax);
      }, 100);
    }
    
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (idleHandle !== undefined && 'cancelIdleCallback' in window) {
        cancelIdleCallback(idleHandle);
      }
      if (timeoutId !== undefined) clearTimeout(timeoutId);
    };
  }, [speed, offset]);

  return { ref, y, opacity };
};
