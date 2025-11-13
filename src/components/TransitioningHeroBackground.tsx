import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useImagePreload } from "@/hooks/useImagePreload";

interface TransitioningHeroBackgroundProps {
  images: string[];
  transitionDuration?: number; // in seconds
}

const TransitioningHeroBackground = ({ 
  images, 
  transitionDuration = 8 
}: TransitioningHeroBackgroundProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Preload all images
  const imagesPreloaded = useImagePreload(images);

  useEffect(() => {
    if (!imagesPreloaded || images.length <= 1) return;

    const interval = setInterval(() => {
      // Switch to next image
      const next = (currentIndex + 1) % images.length;
      setNextIndex(next);
      setIsTransitioning(true);
      
      // After crossfade completes, update current index
      setTimeout(() => {
        setCurrentIndex(next);
        setIsTransitioning(false);
      }, 1500); // 1.5 second smooth crossfade
      
    }, transitionDuration * 1000);

    return () => clearInterval(interval);
  }, [imagesPreloaded, images.length, currentIndex, transitionDuration]);

  return (
    <div className="absolute inset-0">
      {/* All images stack on top of each other */}
      {images.map((image, idx) => (
        <div
          key={idx}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-[1500ms] ease-in-out"
          style={{
            backgroundImage: `url(${image})`,
            opacity: currentIndex === idx ? 1 : (isTransitioning && nextIndex === idx ? 1 : 0),
            zIndex: currentIndex === idx ? 2 : (nextIndex === idx ? 1 : 0),
          }}
        />
      ))}
    </div>
  );
};

export default TransitioningHeroBackground;
