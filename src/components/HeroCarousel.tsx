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
  interval = 6000,
}: HeroCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const mountedRef = useRef(true);

  // Only preload remaining images if there's a carousel (>1 image)
  useEffect(() => {
    mountedRef.current = true;
    if (images.length > 1) {
      // Use requestIdleCallback to avoid blocking main thread
      const preload = () => {
        images.slice(1).forEach((image) => {
          const img = new Image();
          img.src = image.src;
        });
      };
      if ("requestIdleCallback" in window) {
        const id = requestIdleCallback(preload);
        return () => {
          cancelIdleCallback(id);
          mountedRef.current = false;
        };
      } else {
        const id = setTimeout(preload, 200);
        return () => {
          clearTimeout(id);
          mountedRef.current = false;
        };
      }
    }
    return () => {
      mountedRef.current = false;
    };
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

  // For single image, render with native img for instant discovery
  if (images.length === 1) {
    return (
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={images[0].src}
          alt={images[0].alt}
          width={1920}
          height={1080}
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
      {images.map((image, index) => (
        <img
          key={image.src}
          src={image.src}
          alt={image.alt}
          width={1920}
          height={1080}
          fetchPriority={index === 0 ? "high" : "low"}
          loading={index === 0 ? "eager" : "lazy"}
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
          style={{
            opacity: index === currentIndex ? 1 : 0,
            zIndex: index === currentIndex ? 1 : 0,
          }}
        />
      ))}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        Showing image {currentIndex + 1} of {images.length}:{" "}
        {images[currentIndex]?.alt}
      </div>
    </div>
  );
};

// Export preload function for route prefetching — only first image gets high priority
export const preloadHeroImages = (images: HeroImage[]) => {
  images.forEach((img, i) => {
    const image = new Image();
    if (i === 0) image.fetchPriority = "high";
    image.src = img.src;
  });
};
