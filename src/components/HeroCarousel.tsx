import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDeviceCapabilities } from "@/hooks/useDeviceCapabilities";

interface HeroImage {
  src: string;
  alt: string;
}

interface HeroCarouselProps {
  images: HeroImage[];
  interval?: number;
  transitionDuration?: number;
}

// Global image cache for instant transitions
const heroImageCache = new Map<string, boolean>();

export const HeroCarousel = ({ 
  images, 
  interval = 5000,
  transitionDuration = 0.8 
}: HeroCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imagesReady, setImagesReady] = useState(false);
  const { isLowEnd, prefersReducedMotion } = useDeviceCapabilities();
  
  const adjustedTransitionDuration = isLowEnd ? 0.5 : transitionDuration;

  // Preload all images immediately on mount
  const preloadAllImages = useCallback(() => {
    let loadedCount = 0;
    
    images.forEach((img, index) => {
      if (heroImageCache.has(img.src)) {
        loadedCount++;
        if (loadedCount >= 1) setImagesReady(true);
        return;
      }
      
      const image = new Image();
      image.onload = () => {
        heroImageCache.set(img.src, true);
        loadedCount++;
        if (loadedCount >= 1) setImagesReady(true);
      };
      image.onerror = () => {
        heroImageCache.set(img.src, true);
        loadedCount++;
        if (loadedCount >= 1) setImagesReady(true);
      };
      image.fetchPriority = index === 0 ? 'high' : 'low';
      image.decoding = 'async';
      image.src = img.src;
    });
  }, [images]);

  useEffect(() => {
    preloadAllImages();
  }, [preloadAllImages]);

  useEffect(() => {
    if (!imagesReady || prefersReducedMotion) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval, imagesReady, prefersReducedMotion]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
      } else if (e.key === 'ArrowRight') {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [images.length]);

  // Get previous index for crossfade layering
  const prevIndex = (currentIndex - 1 + images.length) % images.length;

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Base dark background - prevents any flash */}
      <div className="absolute inset-0 bg-slate-900" />
      
      {/* Previous image layer (underneath) - stays visible during transition */}
      {imagesReady && (
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${images[prevIndex].src})` }}
        />
      )}
      
      {/* Current image with fade-in (on top) */}
      <AnimatePresence initial={false}>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: adjustedTransitionDuration,
            ease: [0.4, 0, 0.2, 1]
          }}
          className="absolute inset-0"
        >
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${images[currentIndex].src})` }}
            role="img"
            aria-label={images[currentIndex].alt}
          />
        </motion.div>
      </AnimatePresence>

      {/* Screen Reader Announcement */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        Showing image {currentIndex + 1} of {images.length}: {images[currentIndex]?.alt}
      </div>
    </div>
  );
};
