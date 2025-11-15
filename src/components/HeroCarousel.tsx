import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useImagePreload } from "@/hooks/useImagePreload";

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
  interval = 6000,
  transitionDuration = 1.5 
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

  return (
    <div 
      className="absolute inset-0"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <AnimatePresence mode="sync">
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
                opacity: { duration: transitionDuration, ease: "easeInOut" },
                scale: { duration: interval / 1000, ease: "linear" }
              }}
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${image.src})`,
                willChange: "opacity, transform"
              }}
              role="img"
              aria-label={image.alt}
            />
          )
        ))}
      </AnimatePresence>

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
