import { useState, useEffect } from 'react';
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
  const [indexA, setIndexA] = useState(0);
  const [indexB, setIndexB] = useState(1);
  const [showA, setShowA] = useState(true);

  // Preload images to avoid flashes on swap
  useEffect(() => {
    images.forEach((src) => {
      const img = new Image();
      img.src = typeof src === 'string' ? src : '';
    });
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      const current = showA ? indexA : indexB;
      const next = (current + 1) % images.length;

      if (showA) {
        setIndexB(next); // prepare hidden layer
      } else {
        setIndexA(next);
      }

      // Use rAF to ensure style commit before toggling opacity
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setShowA(!showA));
      });
    }, interval);

    return () => clearInterval(id);
  }, [interval, showA, indexA, indexB]);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Layer A */}
      <div
        className="absolute inset-0 bg-cover bg-center pointer-events-none transition-opacity duration-[2500ms] ease-in-out"
        style={{
          backgroundImage: `url(${images[indexA]})`,
          opacity: showA ? opacity : 0,
          willChange: 'opacity',
          transform: 'translateZ(0)',
        }}
      />

      {/* Layer B */}
      <div
        className="absolute inset-0 bg-cover bg-center pointer-events-none transition-opacity duration-[2500ms] ease-in-out"
        style={{
          backgroundImage: `url(${images[indexB]})`,
          opacity: showA ? 0 : opacity,
          willChange: 'opacity',
          transform: 'translateZ(0)',
        }}
      />

      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
    </div>
  );
};

export default TransitioningBackground;
