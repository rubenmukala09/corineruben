import { ReactNode, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import TransitioningBackground from "./TransitioningBackground";
import ScrollIndicator from "./ScrollIndicator";
import { getHeroImages } from "@/data/heroImages";

interface HeroProps {
  backgroundImage?: string;
  useTransitioningBackground?: boolean;
  useRouteBasedImages?: boolean;
  headline: string;
  subheadline?: string;
  children?: ReactNode;
  className?: string;
  overlay?: boolean;
  showScrollIndicator?: boolean;
}

const Hero = ({ 
  backgroundImage, 
  useTransitioningBackground = false, 
  useRouteBasedImages = false,
  headline, 
  subheadline, 
  children, 
  className, 
  overlay = true, 
  showScrollIndicator = false 
}: HeroProps) => {
  const [scrollY, setScrollY] = useState(0);
  const location = useLocation();
  const heroImages = getHeroImages(location.pathname);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={cn("relative min-h-[80vh] flex items-center overflow-hidden", className)}>
      {/* Background */}
      <div 
        className="absolute inset-0"
        style={{ transform: `translateY(${scrollY * 0.5}px)` }}
      >
      {useRouteBasedImages && heroImages.length > 0 ? (
          <TransitioningBackground 
            images={heroImages.map(img => img.url)}
            interval={5000}
            opacity={0.3}
          />
        ) : useTransitioningBackground ? (
          <TransitioningBackground opacity={0.3} />
        ) : (
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ 
              backgroundImage: `url(${backgroundImage})`,
              opacity: 0.3
            }}
          />
        )}
      </div>
      
      {/* Animated Gradient Overlay */}
      {overlay && (
        <div 
          className="absolute inset-0 bg-gradient-hero-primary opacity-40"
          style={{ backgroundSize: '400% 400%', animation: 'gradient-shift 15s ease infinite' }}
        />
      )}
      
      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="floating-orb" style={{ width: '120px', height: '120px', top: '20%', left: '10%', animationDelay: '0s' }} />
        <div className="floating-orb" style={{ width: '80px', height: '80px', top: '60%', right: '15%', animationDelay: '4s' }} />
        <div className="floating-orb" style={{ width: '100px', height: '100px', bottom: '25%', left: '40%', animationDelay: '8s' }} />
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 py-16">
        <div className="max-w-3xl">
          <h1 className="text-white mb-4 animate-fade-in-up [text-shadow:0_4px_20px_rgba(139,92,246,0.4)] leading-tight transition-opacity duration-500">
            {headline}
          </h1>
          {subheadline && (
            <p className="text-white/90 text-xl md:text-2xl mb-6 leading-relaxed animate-fade-in-up stagger-1 transition-opacity duration-500">
              {subheadline}
            </p>
          )}
          {children && <div className="animate-fade-in-up stagger-2">{children}</div>}
        </div>
      </div>
      
      {/* Scroll Indicator */}
      {showScrollIndicator && <ScrollIndicator />}
    </div>
  );
};

export default Hero;
