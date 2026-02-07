import { useState, useEffect } from "react";

interface RotatingHeadlinesProps {
  headlines: string[];
  interval?: number;
  className?: string;
}

// Simplified - no framer-motion, just CSS transitions
export const RotatingHeadlines = ({ 
  headlines, 
  interval = 4000,
  className = "text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
}: RotatingHeadlinesProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = () => setReduceMotion(mediaQuery.matches);
    handleChange();
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (reduceMotion) return;
    const timer = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % headlines.length);
        setIsVisible(true);
      }, 300);
    }, interval);
    return () => clearInterval(timer);
  }, [headlines.length, interval, reduceMotion]);

  // Returns a span, not h1 - parent should wrap in h1
  return (
    <span
      className={`${className} transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      {headlines[reduceMotion ? 0 : currentIndex]}
    </span>
  );
};
