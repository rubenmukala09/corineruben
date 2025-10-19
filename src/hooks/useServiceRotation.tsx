import { useState, useEffect } from 'react';

interface ServiceMessage {
  headline: string;
  subheadline: string;
  service: string;
}

export const useServiceRotation = (messages: ServiceMessage[], interval: number = 8000) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const rotateInterval = setInterval(() => {
      setIsVisible(false);
      
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % messages.length);
        setIsVisible(true);
      }, 500); // Smooth fade transition
    }, interval);

    return () => clearInterval(rotateInterval);
  }, [messages.length, interval]);

  return {
    currentMessage: messages[currentIndex],
    currentIndex,
    isVisible,
  };
};
