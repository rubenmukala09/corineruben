import { ReactNode, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import TransitioningBackground from "./TransitioningBackground";
import ScrollIndicator from "./ScrollIndicator";

interface HeroProps {
  backgroundImage?: string;
  useTransitioningBackground?: boolean;
  headline: string;
  subheadline?: string;
  children?: ReactNode;
  className?: string;
  overlay?: boolean;
  showScrollIndicator?: boolean;
  showPrivacyDisclaimer?: boolean;
}

const Hero = ({ backgroundImage, useTransitioningBackground = false, headline, subheadline, children, className, overlay = true, showScrollIndicator = false, showPrivacyDisclaimer = false }: HeroProps) => {
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
    <div className={cn("relative min-h-[90vh] flex items-center overflow-hidden", className)}>
      {/* Background */}
      <div 
        className="absolute inset-0"
        style={{ transform: `translateY(${scrollY * 0.5}px)` }}
      >
        {useTransitioningBackground ? (
          <TransitioningBackground />
        ) : backgroundImage ? (
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
        ) : null}
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
        <div className="floating-orb" style={{ width: '150px', height: '150px', top: '20%', left: '10%', animationDelay: '0s' }} />
        <div className="floating-orb" style={{ width: '100px', height: '100px', top: '60%', right: '15%', animationDelay: '4s' }} />
        <div className="floating-orb" style={{ width: '120px', height: '120px', bottom: '25%', left: '40%', animationDelay: '8s' }} />
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-white mb-6 animate-fade-in-up [text-shadow:0_4px_20px_rgba(139,92,246,0.4)] leading-tight">
            {headline}
          </h1>
          {subheadline && (
            <p className="text-white/90 text-xl md:text-2xl mb-8 leading-relaxed animate-fade-in-up stagger-1">
              {subheadline}
            </p>
          )}
          {children && <div className="animate-fade-in-up stagger-2">{children}</div>}
        </div>
      </div>
      
      {/* Privacy Disclaimer - Homepage Only */}
      {showPrivacyDisclaimer && showDisclaimer && (
        <div className="absolute top-24 right-6 z-20 max-w-sm animate-fade-in">
          <div className="glass-effect px-5 py-3.5 rounded-xl border border-white/20 shadow-elegant backdrop-blur-md">
            <p className="text-white text-sm font-medium leading-relaxed">
              <span className="inline-block mr-2 opacity-90">🔒</span>
              Safeguarding your privacy: We never utilize client photographs in our marketing materials. All imagery is exclusively AI-generated to protect confidentiality.
            </p>
          </div>
        </div>
      )}
      
      {/* Scroll Indicator */}
      {showScrollIndicator && <ScrollIndicator />}
    </div>
  );
};

export default Hero;
