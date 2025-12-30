import { useState, useEffect, useCallback, useRef, useMemo } from "react";
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
const heroImageCache = new Map<string, HTMLImageElement>();

// Preload image and store in cache
const preloadImageWithPromise = (src: string, priority: 'high' | 'low' = 'low'): Promise<void> => {
  return new Promise((resolve) => {
    if (heroImageCache.has(src)) {
      resolve();
      return;
    }
    
    const img = new Image();
    img.onload = () => {
      heroImageCache.set(src, img);
      resolve();
    };
    img.onerror = () => {
      heroImageCache.set(src, img);
      resolve();
    };
    img.fetchPriority = priority;
    img.decoding = 'async';
    img.src = src;
  });
};

// Check if image is already cached
const isImageCached = (src: string) => heroImageCache.has(src);

export const HeroCarousel = ({ 
  images, 
  interval = 5000,
  transitionDuration = 0.8 
}: HeroCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imagesReady, setImagesReady] = useState(() => 
    images.length > 0 && isImageCached(images[0].src)
  );
  const { isLowEnd, prefersReducedMotion } = useDeviceCapabilities();
  const mountedRef = useRef(true);
  
  const adjustedTransitionDuration = isLowEnd ? 0.5 : transitionDuration;

  // Memoize previous index calculation
  const prevIndex = useMemo(() => 
    (currentIndex - 1 + images.length) % images.length, 
    [currentIndex, images.length]
  );

  // Preload all images immediately on mount
  const preloadAllImages = useCallback(async () => {
    if (images.length === 0) return;
    
    // Check if first image is already cached
    if (isImageCached(images[0].src)) {
      setImagesReady(true);
    } else {
      // Load first image with high priority
      await preloadImageWithPromise(images[0].src, 'high');
      if (mountedRef.current) {
        setImagesReady(true);
      }
    }
    
    // Load remaining images in background immediately
    images.slice(1).forEach(img => {
      if (!isImageCached(img.src)) {
        preloadImageWithPromise(img.src, 'low');
      }
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
    if (!imagesReady || prefersReducedMotion || images.length <= 1) return;

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

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Base dark background - prevents any flash */}
      <div className="absolute inset-0 bg-slate-900" />
      
      {/* Elegant skeleton loader while first image loads */}
      <AnimatePresence>
        {!imagesReady && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-slate-900"
          >
            {/* Subtle animated gradient overlay */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Previous image layer (underneath) - prevents flash during transition */}
      {imagesReady && images.length > 1 && (
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${images[prevIndex].src})` }}
        />
      )}
      
      {/* Current image with smooth crossfade */}
      <AnimatePresence initial={false} mode="sync">
        {imagesReady && (
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
        )}
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
