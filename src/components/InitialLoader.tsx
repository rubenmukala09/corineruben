import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import shieldLogo from "@/assets/shield-logo.png";

// Background preload - non-blocking
const preloadImagesInBackground = () => {
  const images = [
    '/hero-home-1.jpg', '/hero-home-2.jpg', '/hero-home-3.jpg',
    '/hero-about-new.jpg', '/business-diverse-1.jpg'
  ];
  images.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  });
};

interface InitialLoaderProps {
  onComplete?: () => void;
  minDuration?: number;
}

export const InitialLoader = ({ onComplete, minDuration = 50 }: InitialLoaderProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Start background prefetch
    preloadImagesInBackground();
    
    // Instant completion - no blocking
    const timer = setTimeout(() => {
      setIsVisible(false);
      onComplete?.();
    }, minDuration);

    return () => clearTimeout(timer);
  }, [minDuration, onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.1 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-background"
        >
          <motion.img
            src={shieldLogo}
            alt="InVision Network"
            className="w-12 h-12 object-contain"
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.05 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
