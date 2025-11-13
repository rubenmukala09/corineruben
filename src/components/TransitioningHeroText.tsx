import { useState, useEffect } from 'react';

interface HeroTextContent {
  headline: string;
  subheadline: string;
}

const textContent: HeroTextContent[] = [
  {
    headline: "Protect Your Family from AI-Powered Scams",
    subheadline: "Ohio's trusted source for scam prevention training and 24/7 protection services"
  },
  {
    headline: "Empowering Seniors with AI Protection",
    subheadline: "Expert training and real-time defense against sophisticated digital threats"
  },
  {
    headline: "Business Intelligence Through AI Innovation",
    subheadline: "Transform your operations with cutting-edge artificial intelligence solutions"
  },
  {
    headline: "Comprehensive Training Programs",
    subheadline: "Master scam detection, AI tools, and digital safety for all ages"
  },
  {
    headline: "24/7 ScamShield Protection",
    subheadline: "Professional monitoring and instant response to suspicious activities"
  },
  {
    headline: "Building Safer Digital Communities",
    subheadline: "Serving Ohio families with privacy-first cybersecurity education"
  }
];

interface TransitioningHeroTextProps {
  interval?: number; // milliseconds between transitions
}

const TransitioningHeroText = ({ interval = 5000 }: TransitioningHeroTextProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const transitionTimer = setInterval(() => {
      // Fade out
      setIsVisible(false);
      
      // Wait for fade out, then change text and fade in
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % textContent.length);
        setIsVisible(true);
      }, 500); // Half second for fade out
    }, interval);

    return () => clearInterval(transitionTimer);
  }, [interval]);

  return (
    <div
      className={`transition-opacity duration-500 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <h1 className="text-white mb-6 animate-fade-in-up [text-shadow:0_4px_20px_rgba(139,92,246,0.4)] leading-tight">
        {textContent[currentIndex].headline}
      </h1>
      <p className="text-white/90 text-xl md:text-2xl mb-8 leading-relaxed animate-fade-in-up stagger-1">
        {textContent[currentIndex].subheadline}
      </p>
    </div>
  );
};

export default TransitioningHeroText;
