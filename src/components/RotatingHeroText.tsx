import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface RotatingMessage {
  headline: string;
  subheadline: string;
}

interface RotatingHeroTextProps {
  messages: RotatingMessage[];
  interval?: number;
}

export const RotatingHeroText = ({ messages, interval = 5000 }: RotatingHeroTextProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, interval);

    return () => clearInterval(timer);
  }, [messages.length, interval]);

  const currentMessage = messages[currentIndex];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="space-y-3 sm:space-y-4 md:space-y-6"
      >
        <motion.h1 
          className="text-white mb-3 sm:mb-4 md:mb-6 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl [text-shadow:0_4px_20px_rgba(139,92,246,0.4)] leading-tight"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {currentMessage.headline}
        </motion.h1>
        
        <motion.p 
          className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/95 max-w-2xl [text-shadow:0_2px_10px_rgba(0,0,0,0.3)]"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {currentMessage.subheadline}
        </motion.p>
      </motion.div>
    </AnimatePresence>
  );
};
