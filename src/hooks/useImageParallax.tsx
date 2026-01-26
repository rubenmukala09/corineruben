import { useRef, useState, useEffect, useCallback } from 'react';

export const useImageParallax = () => {
  const ref = useRef<HTMLDivElement>(null);
  const boundsRef = useRef<{ width: number; height: number; left: number; top: number } | null>(null);
  const [transform, setTransform] = useState({ x: 0, y: 0 });

  // Cache bounds on mouse enter to avoid forced reflows during mouse move
  const cacheBounds = useCallback(() => {
    const element = ref.current;
    if (!element) return;
    
    const rect = element.getBoundingClientRect();
    boundsRef.current = {
      width: rect.width,
      height: rect.height,
      left: rect.left,
      top: rect.top,
    };
  }, []);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseEnter = () => {
      cacheBounds();
    };

    // Use cached bounds - no layout reads during mouse move
    const handleMouseMove = (e: MouseEvent) => {
      if (!boundsRef.current) return;
      
      const x = (e.clientX - boundsRef.current.left) / boundsRef.current.width - 0.5;
      const y = (e.clientY - boundsRef.current.top) / boundsRef.current.height - 0.5;
      
      setTransform({ x: x * 15, y: y * 15 });
    };

    const handleMouseLeave = () => {
      setTransform({ x: 0, y: 0 });
      boundsRef.current = null;
    };

    element.addEventListener('mouseenter', handleMouseEnter, { passive: true });
    element.addEventListener('mousemove', handleMouseMove, { passive: true });
    element.addEventListener('mouseleave', handleMouseLeave, { passive: true });

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [cacheBounds]);

  return { ref, transform };
};
