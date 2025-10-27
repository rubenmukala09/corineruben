import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface ImageCarouselProps {
  images: string[];
  interval?: number;
  className?: string;
}

const ImageCarousel = ({ images, interval = 5000, className }: ImageCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransitioning(true);
      
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
        setIsTransitioning(false);
      }, 800);
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval]);

  return (
    <div className={cn("relative overflow-hidden rounded-lg", className)}>
      {images.map((image, index) => (
        <div
          key={index}
          className={cn(
            "absolute inset-0 transition-opacity duration-[800ms] ease-in-out",
            index === currentIndex && !isTransitioning ? "opacity-100" : "opacity-0"
          )}
        >
          <img
            src={image}
            alt={`Slide ${index + 1}`}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      ))}
      
      {/* Ensure first image is visible on mount */}
      {images.length > 0 && (
        <img
          src={images[0]}
          alt="Base slide"
          className="w-full h-full object-cover opacity-0"
          aria-hidden="true"
        />
      )}
    </div>
  );
};

export default ImageCarousel;
