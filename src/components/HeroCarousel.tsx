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
  // Single image: use native <img> for instant browser discovery
  if (images.length === 1) {
    return (
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={images[0].src}
          alt={images[0].alt}
          // @ts-expect-error - fetchpriority is a valid HTML attribute
          fetchpriority="high"
          loading="eager"
          decoding="sync"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Stack all images - first image instant, others transition */}
      {images.map((image, index) => (
        <img
          key={image.src}
          src={image.src}
          alt={image.alt}
          fetchPriority={index === 0 ? "high" : "low"}
          loading={index === 0 ? "eager" : "lazy"}
          decoding={index === 0 ? "sync" : "async"}
          className={`absolute inset-0 w-full h-full object-cover ${index === 0 ? '' : 'transition-opacity duration-700'}`}
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
    image.src = img.src;
  });
};
