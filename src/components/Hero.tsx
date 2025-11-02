import { ReactNode, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import TransitioningBackground from "./TransitioningBackground";
import TransitioningHeroText from "./TransitioningHeroText";
import ScrollIndicator from "./ScrollIndicator";

interface HeroProps {
  backgroundImage?: string;
  useTransitioningBackground?: boolean;
  useTransitioningText?: boolean;
  headline?: string;
  subheadline?: string;
  children?: ReactNode;
  className?: string;
  overlay?: boolean;
  showScrollIndicator?: boolean;
  showPrivacyDisclaimer?: boolean;
}

const Hero = ({ backgroundImage, useTransitioningBackground = false, useTransitioningText = false, headline, subheadline, children, className, overlay = false, showScrollIndicator = false, showPrivacyDisclaimer = false }: HeroProps) => {
  const [scrollY, setScrollY] = useState(0);
  const [showDisclaimer, setShowDisclaimer] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowDisclaimer(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={cn("relative min-h-[80vh] md:min-h-[90vh] flex items-center overflow-hidden", className)}>
      {/* Background */}
      <div 
        className="absolute inset-0"
        style={{ transform: `translateY(${scrollY * 0.5}px)` }}
      >
        {useTransitioningBackground ? (
          <TransitioningBackground />
        ) : backgroundImage ? (
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-500"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
        ) : null}
      </div>
      
      
      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none hidden md:block">
        <div className="floating-orb" style={{ width: '150px', height: '150px', top: '20%', left: '10%', animationDelay: '0s' }} />
        <div className="floating-orb" style={{ width: '100px', height: '100px', top: '60%', right: '15%', animationDelay: '4s' }} />
        <div className="floating-orb" style={{ width: '120px', height: '120px', bottom: '25%', left: '40%', animationDelay: '8s' }} />
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto md:mx-0">
          {useTransitioningText ? (
            <TransitioningHeroText />
          ) : (
            <>
              {headline && (
                <h1 className="text-white mb-6 animate-fade-in-up [text-shadow:0_4px_20px_rgba(139,92,246,0.4)] leading-tight">
                  {headline}
                </h1>
              )}
              {subheadline && (
                <p className="text-white/90 text-xl md:text-2xl mb-8 leading-relaxed animate-fade-in-up stagger-1">
                  {subheadline}
                </p>
              )}
            </>
          )}
          {children && <div className="animate-fade-in-up stagger-2">{children}</div>}
        </div>
      </div>
      
      {/* Scroll Indicator */}
      {showScrollIndicator && <ScrollIndicator />}
      
      {/* Privacy Disclaimer - Bottom of viewport */}
      {showPrivacyDisclaimer && showDisclaimer && (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-20 animate-fade-in px-4 max-w-2xl w-full"
             style={{ animationDelay: '1s' }}>
          <div className="bg-black/80 backdrop-blur-md px-6 py-3 rounded-lg border border-white/10 shadow-xl">
            <p className="text-white text-xs text-center font-medium leading-relaxed">
              Some images on this site may be AI-generated
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hero;
