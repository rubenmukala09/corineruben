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
    // Defer initial read to avoid forced reflow during mount
    const timeoutId = setTimeout(() => {
      requestAnimationFrame(updateParallax);
    }, 50);
    
    return () => {
      window.removeEventListener('scroll', onScroll);
      clearTimeout(timeoutId);
    };
  }, [speed, offset]);

  return { ref, y, opacity };
};
