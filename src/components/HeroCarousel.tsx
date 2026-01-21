import { useState, useEffect, useRef } from "react";

interface HeroImage {
  src: string;
  alt: string;
}

interface HeroCarouselProps {
  images: HeroImage[];
  interval?: number;
}

export const HeroCarousel = ({ 
  images, 
  interval = 6000
}: HeroCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const mountedRef = useRef(true);
  
  // Preload all images in background
  useEffect(() => {
    mountedRef.current = true;
    images.forEach((image) => {
      const img = new Image();
      img.src = image.src;
    });
    return () => { mountedRef.current = false; };
  }, [images]);

  // Simple auto-advance - no transitions
  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, interval);
    return () => clearInterval(timer);
  }, [images.length, interval]);

  if (images.length === 0) return null;

  // For single image, render immediately without any state tracking
  if (images.length === 1) {
    return (
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${images[0].src})` }}
          role="img"
          aria-label={images[0].alt}
        />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Stack all images, show active one with z-index */}
      {images.map((image, index) => (
        <div
          key={image.src}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-700"
          style={{ 
            backgroundImage: `url(${image.src})`,
            opacity: index === currentIndex ? 1 : 0,
            zIndex: index === currentIndex ? 1 : 0
          }}
          role="img"
          aria-label={image.alt}
        />
      ))}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        Showing image {currentIndex + 1} of {images.length}: {images[currentIndex]?.alt}
      </div>
    </div>
  );
};

// Export preload function for route prefetching
export const preloadHeroImages = (images: HeroImage[]) => {
  images.forEach(img => {
    const image = new Image();
    image.src = img.src;
  });
};
