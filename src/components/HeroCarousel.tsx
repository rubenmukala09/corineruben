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
  
  // Preload remaining images in background after first renders
  useEffect(() => {
    mountedRef.current = true;
    // Skip first image since it's already loading with high priority
    images.slice(1).forEach((image) => {
      const img = new Image();
      img.src = image.src;
    });
    return () => { mountedRef.current = false; };
  }, [images]);

  // Simple auto-advance
  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, interval);
    return () => clearInterval(timer);
  }, [images.length, interval]);

  if (images.length === 0) return null;

  // For single image, render immediately with native img for instant discovery
  if (images.length === 1) {
    return (
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={images[0].src}
          alt={images[0].alt}
          fetchPriority="high"
          loading="eager"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Stack all images with native img tags for better browser discovery */}
      {images.map((image, index) => (
        <img
          key={image.src}
          src={image.src}
          alt={image.alt}
          fetchPriority={index === 0 ? "high" : "low"}
          loading={index === 0 ? "eager" : "lazy"}
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
          style={{ 
            opacity: index === currentIndex ? 1 : 0,
            zIndex: index === currentIndex ? 1 : 0
          }}
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
    image.fetchPriority = "high";
    image.src = img.src;
  });
};
