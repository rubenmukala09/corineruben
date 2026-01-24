import { useState, useEffect } from "react";

interface RotatingMessage {
  headline: string;
  subheadline: string;
}

interface RotatingHeroTextProps {
  messages: RotatingMessage[];
  interval?: number;
}

// Pure CSS rotating text - no framer-motion
export const RotatingHeroText = ({ messages, interval = 5000 }: RotatingHeroTextProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % messages.length);
        setVisible(true);
      }, 200);
    }, interval);

    return () => clearInterval(timer);
  }, [messages.length, interval]);

  const current = messages[currentIndex];

  return (
    <div 
      className={`space-y-3 sm:space-y-4 md:space-y-6 transition-opacity duration-200 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <h1 className="text-white mb-3 sm:mb-4 md:mb-6 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl [text-shadow:0_4px_20px_rgba(139,92,246,0.4)] leading-tight">
        {current.headline}
      </h1>
      <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/95 max-w-2xl [text-shadow:0_2px_10px_rgba(0,0,0,0.3)]">
        {current.subheadline}
      </p>
    </div>
  );
};
