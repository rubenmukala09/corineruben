import { useRef, useState, useEffect } from 'react';

export const useImageParallax = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let ticking = false;

    const handleMouseMove = (e: MouseEvent) => {
      if (ticking) return;
      
      ticking = true;
      requestAnimationFrame(() => {
        if (!element) {
          ticking = false;
          return;
        }
        const rect = element.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        
        setTransform({ x: x * 15, y: y * 15 });
        ticking = false;
      });
    };

    const handleMouseLeave = () => {
      setTransform({ x: 0, y: 0 });
    };

    element.addEventListener('mousemove', handleMouseMove, { passive: true });
    element.addEventListener('mouseleave', handleMouseLeave, { passive: true });

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return { ref, transform };
};
