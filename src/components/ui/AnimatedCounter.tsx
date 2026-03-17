import { useEffect, useRef, useState } from 'react';

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  decimals?: number;
}

/**
 * AnimatedCounter Component
 *
 * Animates a number from 0 to the target value when it enters the viewport.
 * Perfect for statistics, metrics, and achievement numbers.
 *
 * @param end - Target number to count to
 * @param duration - Animation duration in milliseconds (default: 2000)
 * @param suffix - Text to append (e.g., "+", "%", "K")
 * @param prefix - Text to prepend (e.g., "$", "#")
 * @param decimals - Number of decimal places (default: 0)
 */
export const AnimatedCounter = ({
  end,
  duration = 2000,
  suffix = '',
  prefix = '',
  className = '',
  decimals = 0,
}: AnimatedCounterProps) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (hasAnimated) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setHasAnimated(true);

          const startTime = Date.now();
          const startValue = 0;
          const endValue = end;

          const easeOutQuad = (t: number): number => {
            return t * (2 - t);
          };

          const animate = () => {
            const currentTime = Date.now();
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            const easedProgress = easeOutQuad(progress);
            const currentValue = startValue + (endValue - startValue) * easedProgress;

            setCount(currentValue);

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCount(endValue);
            }
          };

          requestAnimationFrame(animate);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, [end, duration, hasAnimated]);

  const formatNumber = (num: number): string => {
    return num.toFixed(decimals);
  };

  return (
    <span ref={counterRef} className={className}>
      {prefix}
      {formatNumber(count)}
      {suffix}
    </span>
  );
};
