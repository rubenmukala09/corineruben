import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface RotatingHeadlinesProps {
  headlines: string[];
  interval?: number;
  className?: string;
}

export const RotatingHeadlines = ({ 
  headlines, 
  interval = 4000,
  className = "text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
}: RotatingHeadlinesProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % headlines.length);
    }, interval);
    return () => clearInterval(timer);
  }, [headlines.length, interval]);

  return (
    <AnimatePresence mode="wait">
      <motion.h1
        key={currentIndex}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className={className}
      >
        {headlines[currentIndex]}
      </motion.h1>
    </AnimatePresence>
  );
};
