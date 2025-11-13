import { useState, useEffect, useRef } from 'react';
import eldersHero1 from '@/assets/elders-hero-1.jpg';
import eldersHero2 from '@/assets/elders-hero-2.jpg';
import eldersHero3 from '@/assets/elders-hero-3.jpg';
import eldersHero4 from '@/assets/elders-hero-4.jpg';
import eldersHero5 from '@/assets/elders-hero-5.jpg';
import eldersHero6 from '@/assets/elders-hero-6.jpg';
import eldersHero7 from '@/assets/elders-hero-7.jpg';
import eldersHero8 from '@/assets/elders-hero-8.jpg';
import heroHomepage from '@/assets/hero-homepage.jpg';
import heroAbout from '@/assets/hero-about-new.jpg';
import heroTraining from '@/assets/hero-training.jpg';
import heroBusiness from '@/assets/hero-business-new.jpg';

const images = [
  eldersHero1, 
  eldersHero2, 
  eldersHero3, 
  eldersHero4, 
  eldersHero5,
  eldersHero6,
  eldersHero7,
  eldersHero8,
  heroHomepage,
  heroAbout,
  heroTraining,
  heroBusiness
];

interface TransitioningBackgroundProps {
  interval?: number; // milliseconds between transitions
  className?: string;
  opacity?: number; // opacity level (0-1), default 1
}

const TransitioningBackground = ({ interval = 5000, className = '', opacity = 1 }: TransitioningBackgroundProps) => {
  const [activeLayer, setActiveLayer] = useState<'A' | 'B'>('A');
  const [imageA, setImageA] = useState(0);
  const [imageB, setImageB] = useState(1);
  const [isReady, setIsReady] = useState(false);
  const preloadedRef = useRef(false);

  // Preload all images immediately to prevent flashing
  useEffect(() => {
    if (!preloadedRef.current) {
      const promises = images.map((src) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.onload = resolve;
          img.onerror = resolve;
          img.src = typeof src === 'string' ? src : '';
        });
      });
      
      Promise.all(promises).then(() => {
        setIsReady(true);
      });
      
      preloadedRef.current = true;
    }
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      if (activeLayer === 'A') {
        // Layer A is visible, prepare Layer B with next image then fade to it
        const nextImageIndex = (imageA + 1) % images.length;
        setImageB(nextImageIndex);
        // Wait a tick for the image to be set, then transition
        setTimeout(() => setActiveLayer('B'), 50);
      } else {
        // Layer B is visible, prepare Layer A with next image then fade to it
        const nextImageIndex = (imageB + 1) % images.length;
        setImageA(nextImageIndex);
        // Wait a tick for the image to be set, then transition
        setTimeout(() => setActiveLayer('A'), 50);
      }
    }, interval);

    return () => clearInterval(id);
  }, [interval, activeLayer, imageA, imageB]);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Layer A - Ultra-smooth crossfade with no blinking */}
      <div
        className="absolute inset-0 bg-cover bg-center pointer-events-none"
        style={{
          backgroundImage: `url(${images[imageA]})`,
          opacity: isReady && activeLayer === 'A' ? opacity : (isReady ? 0 : opacity),
          transition: 'opacity 1500ms cubic-bezier(0.4, 0, 0.2, 1)',
          willChange: 'opacity',
          transform: 'translate3d(0, 0, 0)',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          imageRendering: 'crisp-edges',
        }}
      />

      {/* Layer B - Ultra-smooth crossfade with no blinking */}
      <div
        className="absolute inset-0 bg-cover bg-center pointer-events-none"
        style={{
          backgroundImage: `url(${images[imageB]})`,
          opacity: isReady && activeLayer === 'B' ? opacity : 0,
          transition: 'opacity 1500ms cubic-bezier(0.4, 0, 0.2, 1)',
          willChange: 'opacity',
          transform: 'translate3d(0, 0, 0)',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          imageRendering: 'crisp-edges',
        }}
      />

      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
    </div>
  );
};

export default TransitioningBackground;
