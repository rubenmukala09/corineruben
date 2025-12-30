import { useState, useEffect, useCallback, useRef } from "react";
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

// Preload all hero images immediately
const preloadImageWithPromise = (src: string, priority: 'high' | 'low' = 'low'): Promise<void> => {
  return new Promise((resolve) => {
    if (heroImageCache.has(src)) {
      resolve();
      return;
    }
    
    const img = new Image();
    img.onload = () => {
      heroImageCache.set(src, true);
      resolve();
    };
    img.onerror = () => {
      heroImageCache.set(src, true);
      resolve();
    };
    img.fetchPriority = priority;
    img.decoding = 'async';
    img.src = src;
  });
};

export const HeroCarousel = ({ 
  images, 
  interval = 5000,
  transitionDuration = 0.9 
}: HeroCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imagesReady, setImagesReady] = useState(() => 
    images.length > 0 && heroImageCache.has(images[0].src)
  );
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const { isLowEnd, prefersReducedMotion } = useDeviceCapabilities();
  const mountedRef = useRef(true);
  
  const adjustedTransitionDuration = isLowEnd ? 0.6 : transitionDuration;

  // Preload all images immediately on mount
  const preloadAllImages = useCallback(async () => {
    if (images.length === 0) return;
    
    // Load first image with high priority
    await preloadImageWithPromise(images[0].src, 'high');
    
    if (mountedRef.current) {
      setImagesReady(true);
      // Slight delay before removing blur effect
      setTimeout(() => {
        if (mountedRef.current) setIsFirstLoad(false);
      }, 100);
    }
    
    // Load remaining images in background
    images.slice(1).forEach(img => {
      preloadImageWithPromise(img.src, 'low');
    });
  }, [images]);

  useEffect(() => {
    mountedRef.current = true;
    preloadAllImages();
    
    return () => {
      mountedRef.current = false;
    };
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
      
      {/* Shimmer loader while first image loads */}
      <AnimatePresence>
        {!imagesReady && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 animate-shimmer"
            style={{ backgroundSize: '200% 100%' }}
          />
        )}
      </AnimatePresence>
      
      {/* Previous image layer (underneath) - stays visible during transition */}
      {imagesReady && (
        <motion.div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${images[prevIndex].src})` }}
          initial={false}
          animate={{ 
            filter: isFirstLoad ? 'blur(10px)' : 'blur(0px)',
            scale: isFirstLoad ? 1.05 : 1
          }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        />
      )}
      
      {/* Current image with smooth crossfade (on top) */}
      <AnimatePresence initial={false}>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            filter: isFirstLoad ? 'blur(10px)' : 'blur(0px)'
          }}
          transition={{
            opacity: { duration: adjustedTransitionDuration, ease: [0.4, 0, 0.2, 1] },
            scale: { duration: adjustedTransitionDuration * 1.2, ease: [0.4, 0, 0.2, 1] },
            filter: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
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

// Export preload function for route prefetching
export const preloadHeroImages = (images: HeroImage[]) => {
  images.forEach(img => preloadImageWithPromise(img.src, 'low'));
};
