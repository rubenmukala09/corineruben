import { useState, useEffect } from 'react';
import eldersHero1 from '@/assets/elders-hero-3d-1.jpg';
import eldersHero2 from '@/assets/elders-hero-3d-2.jpg';
import eldersHero3 from '@/assets/elders-hero-3d-3.jpg';
import eldersHero4 from '@/assets/elders-hero-3d-4.jpg';
import heroHomepage from '@/assets/hero-homepage-3d.jpg';

const defaultImages = [eldersHero1, eldersHero2, eldersHero3, eldersHero4, heroHomepage];

interface TransitioningBackgroundProps {
  images?: string[];
  interval?: number;
  className?: string;
  opacity?: number;
}

const TransitioningBackground = ({ 
  images, 
  interval = 5000, 
  className = '', 
  opacity = 1 
}: TransitioningBackgroundProps) => {
  const backgroundImages = images || defaultImages;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransitioning(true);
      
      setTimeout(() => {
        setCurrentIndex(nextIndex);
        setNextIndex((nextIndex + 1) % backgroundImages.length);
        setIsTransitioning(false);
      }, 1000); // 1-second transition
    }, interval);

    return () => clearInterval(timer);
  }, [interval, nextIndex, backgroundImages.length]);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Current Image - with Ken Burns zoom effect */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out"
        style={{
          backgroundImage: `url(${backgroundImages[currentIndex]})`,
          opacity: isTransitioning ? 0 : opacity,
          transform: isTransitioning ? 'scale(1.05)' : 'scale(1)',
        }}
      />
      
      {/* Next Image (for smooth transition) */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out"
        style={{
          backgroundImage: `url(${backgroundImages[nextIndex]})`,
          opacity: isTransitioning ? opacity : 0,
          transform: isTransitioning ? 'scale(1.05)' : 'scale(1)',
        }}
      />
      
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" style={{ opacity }} />
    </div>
  );
};

export default TransitioningBackground;
