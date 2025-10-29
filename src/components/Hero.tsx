import { ReactNode, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import TransitioningBackground from "./TransitioningBackground";
import ScrollIndicator from "./ScrollIndicator";

interface HeroProps {
  backgroundImage?: string;
  useTransitioningBackground?: boolean;
  transitionImages?: string[];
  headline: string;
  subheadline?: string;
  children?: ReactNode;
  className?: string;
  overlay?: boolean;
  showScrollIndicator?: boolean;
  fullHeight?: boolean;
}

const Hero = ({ 
  backgroundImage, 
  useTransitioningBackground = false, 
  transitionImages,
  headline, 
  subheadline, 
  children, 
  className, 
  overlay = true, 
  showScrollIndicator = false,
  fullHeight = true 
}: HeroProps) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={cn(
      "relative flex items-center justify-center overflow-hidden",
      fullHeight ? "min-h-screen" : "min-h-[90vh]",
      className
    )}>
      {/* Background */}
      <div 
        className="absolute inset-0"
        style={{ transform: `translateY(${scrollY * 0.3}px)` }}
      >
        {useTransitioningBackground ? (
          <TransitioningBackground images={transitionImages} />
        ) : backgroundImage ? (
          <>
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${backgroundImage})` }}
            />
            {/* Dark overlay for static images */}
            <div className="absolute inset-0 bg-black/40" />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-accent to-primary" />
        )}
      </div>
      
      {/* Additional gradient overlay (optional) */}
      {overlay && !useTransitioningBackground && (
        <div 
          className="absolute inset-0 bg-gradient-hero-primary opacity-20"
          style={{ backgroundSize: '400% 400%', animation: 'gradient-shift 15s ease infinite' }}
        />
      )}
      
      {/* Content Container - Centered */}
      <div className="w-full max-w-7xl mx-auto px-6 relative z-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 animate-fade-in-up [text-shadow:0_4px_20px_rgba(0,0,0,0.5)] leading-tight">
            {headline}
          </h1>
          {subheadline && (
            <p className="text-white/95 text-lg md:text-xl lg:text-2xl mb-8 leading-relaxed animate-fade-in-up stagger-1 [text-shadow:0_2px_10px_rgba(0,0,0,0.4)] max-w-3xl mx-auto">
              {subheadline}
            </p>
          )}
          {children && (
            <div className="animate-fade-in-up stagger-2 flex flex-col sm:flex-row gap-4 justify-center items-center">
              {children}
            </div>
          )}
        </div>
      </div>
      
      {/* Scroll Indicator */}
      {showScrollIndicator && <ScrollIndicator />}
    </div>
  );
};

export default Hero;
