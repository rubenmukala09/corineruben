import { ReactNode, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Shield } from "lucide-react";
import ScrollIndicator from "./ScrollIndicator";
import { ParticleBackground } from "./ParticleBackground";
import { FloatingShapes } from "./FloatingShapes";
import { useImagePreload } from "@/hooks/useImagePreload";

interface HeroProps {
  backgroundImage?: string;
  headline?: string;
  subheadline?: string;
  children?: ReactNode;
  className?: string;
  overlay?: boolean;
  showScrollIndicator?: boolean;
  showPrivacyDisclaimer?: boolean;
}

const Hero = ({ backgroundImage, headline, subheadline, children, className, overlay = false, showScrollIndicator = false, showPrivacyDisclaimer = false }: HeroProps) => {
  const [showDisclaimer, setShowDisclaimer] = useState(true);
  
  // Preload background image
  const imagePreloaded = useImagePreload(backgroundImage ? [backgroundImage] : []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowDisclaimer(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={cn("relative min-h-[80vh] md:min-h-[90vh] flex items-center overflow-hidden", className)}>
      {/* Static Background - no parallax for performance */}
      <div className="absolute inset-0">
        {backgroundImage && (
          <div
            className={cn(
              "absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-300",
              imagePreloaded ? "opacity-100" : "opacity-0"
            )}
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
        )}
        
        {/* Gradient Overlay - dark to transparent */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        
        {/* Additional overlay for better text contrast */}
        {overlay && (
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50" />
        )}
      </div>
      
      {/* Particle Network Background */}
      <ParticleBackground />
      
      {/* Floating Abstract Shapes */}
      <FloatingShapes />
      
      {/* Floating Particles (existing) */}
      <div className="absolute inset-0 pointer-events-none hidden md:block" style={{ zIndex: 1 }}>
        <div className="floating-orb" style={{ width: '150px', height: '150px', top: '20%', left: '10%', animationDelay: '0s' }} />
        <div className="floating-orb" style={{ width: '100px', height: '100px', top: '60%', right: '15%', animationDelay: '4s' }} />
        <div className="floating-orb" style={{ width: '120px', height: '120px', bottom: '25%', left: '40%', animationDelay: '8s' }} />
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto md:mx-0">
          {headline && (
            <h1 className="text-white mb-6 [text-shadow:0_4px_20px_rgba(139,92,246,0.4)] leading-tight">
              {headline}
            </h1>
          )}
          {subheadline && (
            <p className="text-white/90 text-xl md:text-2xl mb-8 leading-relaxed">
              {subheadline}
            </p>
          )}
          {children && (
            <div>
              {children}
            </div>
          )}
        </div>
      </div>
      
      {/* Scroll Indicator */}
      {showScrollIndicator && <ScrollIndicator />}
      
      {/* AI Disclaimer - Professional privacy badge */}
      {showPrivacyDisclaimer && showDisclaimer && (
        <div className="absolute bottom-6 left-6 z-10">
          <div className="bg-black/80 backdrop-blur-md text-white/95 text-xs px-4 py-2 rounded-lg border border-white/10 shadow-lg max-w-xs">
            <div className="flex items-start gap-2">
              <Shield className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" />
              <div>
                <p className="font-semibold mb-0.5">Privacy-First Design</p>
                <p className="text-[10px] text-white/80 leading-relaxed">
                  These AI-generated images illustrate our services while protecting your privacy. 
                  We never use personal photos or information for any purpose.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hero;
