import { useState, useEffect } from 'react';

interface TextPair {
  headline: string;
  subheadline: string;
}

export const useRotatingText = (texts: TextPair[], interval: number = 20000) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const rotateInterval = setInterval(() => {
      setIsVisible(false);
      
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % texts.length);
        setIsVisible(true);
      }, 500); // Wait for fade out before changing text
    }, interval);

    return () => clearInterval(rotateInterval);
  }, [texts.length, interval]);

  return {
    currentText: texts[currentIndex],
    isVisible,
  };
};
