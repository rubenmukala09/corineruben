import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useImagePreload } from "@/hooks/useImagePreload";
import { useDeviceCapabilities } from "@/hooks/useDeviceCapabilities";
import { Play, Pause } from "lucide-react";

interface HeroImage {
  src: string;
  alt: string;
}

interface HeroCarouselProps {
  images: HeroImage[];
  interval?: number;
  transitionDuration?: number;
}

export const HeroCarousel = ({ 
  images, 
  interval = 5000,
  transitionDuration = 0.8 
}: HeroCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const { isLowEnd, prefersReducedMotion } = useDeviceCapabilities();
  
  // Preload all images
  const imageUrls = useMemo(() => images.map(img => img.src), [images]);
  const imagesPreloaded = useImagePreload(imageUrls);
  
  // Adjust transition duration for low-end devices
  const adjustedTransitionDuration = isLowEnd ? transitionDuration * 0.5 : transitionDuration;

  // Set initial load complete after first render
  useEffect(() => {
    if (imagesPreloaded) {
      const timer = setTimeout(() => setIsInitialLoad(false), 100);
      return () => clearTimeout(timer);
    }
  }, [imagesPreloaded]);

  useEffect(() => {
    // Don't start rotation until images are preloaded
    if (!imagesPreloaded || isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval, imagesPreloaded, isPaused]);

  // Respect prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      setIsPaused(true);
    }
  }, []);

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
    <div 
      className="absolute inset-0 bg-gradient-to-br from-primary/90 via-purple-800/80 to-accent/70"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Persistent gradient background - prevents white flash */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1e3a8a] via-[#3b0764] to-[#0d9488] opacity-100" />
      
      {/* Images with seamless crossfade */}
      <AnimatePresence initial={false}>
        {images.map((image, index) => (
          index === currentIndex && (
            <motion.div
              key={`hero-image-${index}-${image.src}`}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ 
                opacity: 1,
                scale: isLowEnd || prefersReducedMotion ? 1 : 1
              }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{
                opacity: { 
                  duration: adjustedTransitionDuration, 
                  ease: [0.4, 0, 0.2, 1]
                },
                scale: { 
                  duration: adjustedTransitionDuration * 1.5, 
                  ease: "easeOut" 
                }
              }}
              className="absolute inset-0"
              style={{ willChange: "opacity, transform" }}
            >
              {/* Image with smooth loading */}
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url(${image.src})`,
                  opacity: imagesPreloaded ? 1 : 0,
                  transition: 'opacity 0.3s ease-out'
                }}
                role="img"
                aria-label={image.alt}
              />
            </motion.div>
          )
        ))}
      </AnimatePresence>

      {/* Pause/Play Button with premium styling */}
      <motion.button
        onClick={() => setIsPaused(!isPaused)}
        className="absolute top-4 right-4 z-20 bg-white/10 hover:bg-white/25 backdrop-blur-md rounded-full p-3 transition-all duration-300 border border-white/20 shadow-lg"
        aria-label={isPaused ? "Play slideshow" : "Pause slideshow"}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {isPaused ? <Play className="w-5 h-5 text-white" /> : <Pause className="w-5 h-5 text-white" />}
      </motion.button>

      {/* Screen Reader Announcement */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        Showing image {currentIndex + 1} of {images.length}: {images[currentIndex]?.alt}
      </div>

      {/* Premium Progress Indicators with animation */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
        {images.map((_, index) => (
          <motion.button
            key={`indicator-${index}`}
            onClick={() => setCurrentIndex(index)}
            className={`relative h-2.5 rounded-full transition-all duration-500 overflow-hidden ${
              index === currentIndex 
                ? "w-10 bg-white shadow-lg" 
                : "w-2.5 bg-white/40 hover:bg-white/60"
            }`}
            aria-label={`Go to image ${index + 1}`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            {/* Progress fill for current indicator */}
            {index === currentIndex && !isPaused && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-accent to-primary rounded-full"
                initial={{ scaleX: 0, originX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: interval / 1000, ease: "linear" }}
              />
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
};
