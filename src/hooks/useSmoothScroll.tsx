import { useCallback, useRef } from 'react';
import { EASING, TIMING } from '@/lib/premium-animations';

interface SmoothScrollOptions {
  duration?: number;
  easing?: 'silk' | 'velvet' | 'cashmere' | 'satin';
  offset?: number;
}

// Easing functions for smooth scrolling
// Luxury easing functions for silk-like scrolling
const easingFunctions = {
  silk: (t: number) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t),
  velvet: (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
  cashmere: (t: number) => t === 1 ? 1 : 1 - Math.pow(2, -12 * t),
  satin: (t: number) => 1 - Math.pow(1 - t, 4),
};

export const useSmoothScroll = () => {
  const animationRef = useRef<number | null>(null);
  const isScrollingRef = useRef(false);

  const cancelScroll = useCallback(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
    isScrollingRef.current = false;
  }, []);

  const scrollTo = useCallback((target: number | HTMLElement | string, options: SmoothScrollOptions = {}) => {
    const {
      duration = TIMING.slow,
      easing = 'silk',
      offset = 0,
    } = options;

    // Cancel any existing scroll animation
    cancelScroll();

    // Calculate target position
    let targetPosition: number;
    
    if (typeof target === 'number') {
      targetPosition = target;
    } else if (typeof target === 'string') {
      const element = document.querySelector(target);
      if (!element) return;
      targetPosition = element.getBoundingClientRect().top + window.scrollY;
    } else {
      targetPosition = target.getBoundingClientRect().top + window.scrollY;
    }

    // Apply offset (for fixed headers, etc.)
    targetPosition -= offset;

    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;

    // Scale duration based on distance (but cap it)
    const scaledDuration = Math.min(
      Math.max(duration, Math.abs(distance) * 0.5),
      TIMING.verySlow
    );

    const startTime = performance.now();
    const easingFn = easingFunctions[easing];

    isScrollingRef.current = true;

    const animateScroll = (currentTime: number) => {
      if (!isScrollingRef.current) return;

      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / scaledDuration, 1);
      const easedProgress = easingFn(progress);

      window.scrollTo(0, startPosition + distance * easedProgress);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animateScroll);
      } else {
        isScrollingRef.current = false;
        animationRef.current = null;
      }
    };

    animationRef.current = requestAnimationFrame(animateScroll);
  }, [cancelScroll]);

  const scrollToTop = useCallback((options?: SmoothScrollOptions) => {
    scrollTo(0, options);
  }, [scrollTo]);

  const scrollToElement = useCallback((selector: string, options?: SmoothScrollOptions) => {
    scrollTo(selector, options);
  }, [scrollTo]);

  return {
    scrollTo,
    scrollToTop,
    scrollToElement,
    cancelScroll,
    isScrolling: isScrollingRef.current,
  };
};
