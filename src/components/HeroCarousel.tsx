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
  interval = 5000
}: HeroCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState<boolean[]>([]);
  const mountedRef = useRef(true);
  
  // Initialize loaded state and preload first image immediately
  useEffect(() => {
    mountedRef.current = true;
    
    if (images.length === 0) return;
    
    // Mark first image as ready immediately for fastest LCP
    setImagesLoaded(new Array(images.length).fill(false));
    
    // Preload first image with high priority
    const firstImg = new Image();
    firstImg.onload = () => {
      if (mountedRef.current) {
        setImagesLoaded(prev => {
          const next = [...prev];
          next[0] = true;
          return next;
        });
      }
    };
    firstImg.src = images[0].src;
    
    // Lazy load remaining images
    images.slice(1).forEach((image, idx) => {
      const img = new Image();
      img.onload = () => {
        if (mountedRef.current) {
          setImagesLoaded(prev => {
            const next = [...prev];
            next[idx + 1] = true;
            return next;
          });
        }
      };
      img.src = image.src;
    });
    
    return () => {
      mountedRef.current = false;
    };
  }, [images]);

  // Auto-advance only after first image loads
  useEffect(() => {
    if (!imagesLoaded[0] || images.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval, imagesLoaded]);

  if (images.length === 0) return null;

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Base dark background for instant paint */}
      <div className="absolute inset-0 bg-slate-900" />
      
      {/* Images with CSS opacity transition - faster transitions */}
      {images.map((image, index) => (
        <div
          key={index}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-300"
          style={{ 
            backgroundImage: imagesLoaded[index] ? `url(${image.src})` : 'none',
            opacity: index === currentIndex && imagesLoaded[index] ? 1 : 0,
            willChange: index === currentIndex ? 'opacity' : 'auto'
          }}
          role="img"
          aria-label={image.alt}
          aria-hidden={index !== currentIndex}
        />
      ))}

      {/* Screen Reader Announcement */}
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
