import { useState, useEffect } from 'react';
import eldersHero1 from '@/assets/elders-hero-1.jpg';
import eldersHero2 from '@/assets/elders-hero-2.jpg';
import eldersHero3 from '@/assets/elders-hero-3.jpg';
import eldersHero4 from '@/assets/elders-hero-4.jpg';
import eldersHero5 from '@/assets/elders-hero-5.jpg';
import eldersHero6 from '@/assets/elders-hero-6.jpg';
import eldersHero7 from '@/assets/elders-hero-7.jpg';
import eldersHero8 from '@/assets/elders-hero-8.jpg';
import eldersHero9 from '@/assets/elders-hero-9.jpg';
import eldersHero10 from '@/assets/elders-hero-10.jpg';

const defaultImages = [eldersHero1, eldersHero2, eldersHero3, eldersHero4, eldersHero5, eldersHero6, eldersHero7, eldersHero8, eldersHero9, eldersHero10];

interface TransitioningBackgroundProps {
  images?: string[]; // array of image URLs to transition between
  interval?: number; // milliseconds between transitions
  className?: string;
  opacity?: number; // opacity level (0-1), default 1
}

const TransitioningBackground = ({ images = defaultImages, interval = 10000, className = '', opacity = 1 }: TransitioningBackgroundProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransitioning(true);
      
      setTimeout(() => {
        setCurrentIndex(nextIndex);
        setNextIndex((nextIndex + 1) % images.length);
        setIsTransitioning(false);
      }, 4000); // Ultra-smooth 4-second transition with optimized easing
    }, interval);

    return () => clearInterval(timer);
  }, [interval, nextIndex]);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Current Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${images[currentIndex]})`,
          opacity: isTransitioning ? 0 : opacity,
          transform: isTransitioning ? 'scale(1.1)' : 'scale(1.05)',
          filter: 'brightness(1.1) contrast(1.15) saturate(1.3)',
          transition: 'opacity 4000ms cubic-bezier(0.4, 0, 0.2, 1), transform 4000ms cubic-bezier(0.4, 0, 0.2, 1)',
          willChange: 'opacity, transform',
        }}
      />
      
      {/* Next Image (for smooth transition) */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${images[nextIndex]})`,
          opacity: isTransitioning ? opacity : 0,
          transform: isTransitioning ? 'scale(1.05)' : 'scale(1.1)',
          filter: 'brightness(1.1) contrast(1.15) saturate(1.3)',
          transition: 'opacity 4000ms cubic-bezier(0.4, 0, 0.2, 1), transform 4000ms cubic-bezier(0.4, 0, 0.2, 1)',
          willChange: 'opacity, transform',
        }}
      />
      
      {/* Enhanced Multi-layer Overlay for depth and readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/85 to-background/75" style={{ opacity }} />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/30" style={{ opacity }} />
    </div>
  );
};

export default TransitioningBackground;
