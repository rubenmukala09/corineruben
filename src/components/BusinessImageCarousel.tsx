import { useState, useEffect } from 'react';
import carousel1 from '@/assets/business-office-carousel-1.jpg';
import carousel2 from '@/assets/business-office-carousel-2.jpg';
import carousel3 from '@/assets/business-office-carousel-3.jpg';
import carousel4 from '@/assets/business-office-carousel-4.jpg';

const images = [carousel1, carousel2, carousel3, carousel4];

const BusinessImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = 5000; // 5 seconds per image
    
    const timer = setInterval(() => {
      setIsTransitioning(true);
      
      setTimeout(() => {
        setCurrentIndex(nextIndex);
        setNextIndex((nextIndex + 1) % images.length);
        setIsTransitioning(false);
      }, 800); // Match the CSS transition duration
    }, interval);

    return () => clearInterval(timer);
  }, [nextIndex]);

  return (
    <div className="relative w-full h-full overflow-hidden rounded-lg">
      {/* Current Image - fades out during transition */}
      <div
        className="absolute inset-0"
        style={{
          opacity: isTransitioning ? 0 : 1,
          transition: 'opacity 0.8s ease-in-out',
          zIndex: 1,
        }}
      >
        <img
          src={images[currentIndex]}
          alt="Business professional working with AI technology"
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      
      {/* Next Image - fades in during transition */}
      <div
        className="absolute inset-0"
        style={{
          opacity: isTransitioning ? 1 : 0,
          transition: 'opacity 0.8s ease-in-out',
          zIndex: 2,
        }}
      >
        <img
          src={images[nextIndex]}
          alt="Business professional working with AI technology"
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setIsTransitioning(true);
              setTimeout(() => {
                setCurrentIndex(index);
                setNextIndex((index + 1) % images.length);
                setIsTransitioning(false);
              }, 800);
            }}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-white w-6'
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`View image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default BusinessImageCarousel;
