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
  const [previousIndex, setPreviousIndex] = useState<number | null>(null);
  const [imagesLoaded, setImagesLoaded] = useState<boolean[]>([]);
  const [isTransitioning, setIsTransitioning] = useState(false);
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

  // Auto-advance with smooth transition
  useEffect(() => {
    if (!imagesLoaded[0] || images.length <= 1) return;

    const timer = setInterval(() => {
      setIsTransitioning(true);
      setPreviousIndex(currentIndex);
      
      // Start fade out, then switch
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
        
        // Clear previous after transition completes
        setTimeout(() => {
          setPreviousIndex(null);
          setIsTransitioning(false);
        }, 1200);
      }, 100);
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval, imagesLoaded, currentIndex]);

  if (images.length === 0) return null;

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Base dark background for instant paint */}
      <div className="absolute inset-0 bg-slate-900" />
      
      {/* Images with smooth crossfade and subtle Ken Burns effect */}
      {images.map((image, index) => {
        const isActive = index === currentIndex;
        const isPrevious = index === previousIndex;
        const shouldShow = (isActive || isPrevious) && imagesLoaded[index];
        
        return (
          <div
            key={index}
            className="absolute inset-0 overflow-hidden"
            style={{
              opacity: shouldShow ? (isActive ? 1 : isPrevious && isTransitioning ? 0 : 0) : 0,
              transition: 'opacity 1.2s ease-in-out',
              zIndex: isActive ? 2 : isPrevious ? 1 : 0,
            }}
          >
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ 
                backgroundImage: imagesLoaded[index] ? `url(${image.src})` : 'none',
                transform: isActive ? 'scale(1.05)' : 'scale(1)',
                transition: 'transform 8s ease-out',
                willChange: isActive ? 'transform' : 'auto'
              }}
              role="img"
              aria-label={image.alt}
              aria-hidden={!isActive}
            />
          </div>
        );
      })}

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
