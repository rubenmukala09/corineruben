import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useImagePreload } from "@/hooks/useImagePreload";
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
  transitionDuration = 1.0 
}: HeroCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  // Preload all images
  const imagesPreloaded = useImagePreload(images.map(img => img.src));

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
      className="absolute inset-0"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <AnimatePresence mode="wait" initial={false}>
        {images.map((image, index) => (
          index === currentIndex && (
            <motion.div
              key={`hero-image-${index}`}
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: 1,
                scale: [1, 1.05, 1]
              }}
              exit={{ opacity: 0 }}
              transition={{
                opacity: { duration: transitionDuration, ease: [0.4, 0, 0.2, 1] },
                scale: { duration: interval / 1000, ease: "linear" }
              }}
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${image.src})`,
                willChange: "opacity, transform",
                transform: 'translate3d(0, 0, 0)',
                backfaceVisibility: 'hidden'
              }}
              role="img"
              aria-label={image.alt}
            />
          )
        ))}
      </AnimatePresence>

      {/* Pause/Play Button */}
      <button
        onClick={() => setIsPaused(!isPaused)}
        className="absolute top-4 right-4 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-200"
        aria-label={isPaused ? "Play slideshow" : "Pause slideshow"}
      >
        {isPaused ? <Play className="w-5 h-5 text-white" /> : <Pause className="w-5 h-5 text-white" />}
      </button>

      {/* Screen Reader Announcement */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        Showing image {currentIndex + 1} of {images.length}: {images[currentIndex].alt}
      </div>

      {/* Progress Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {images.map((_, index) => (
          <button
            key={`indicator-${index}`}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? "w-8 bg-white" 
                : "w-2 bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
