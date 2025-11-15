import { ReactNode, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import ScrollIndicator from "./ScrollIndicator";
import { ParticleBackground } from "./ParticleBackground";
import { FloatingShapes } from "./FloatingShapes";
import { ProtectionBadge } from "./ProtectionBadge";
import { useImagePreload } from "@/hooks/useImagePreload";
import { motion } from "framer-motion";
import { useParallax } from "@/hooks/useParallax";
import { HeroCarousel } from "./HeroCarousel";

interface HeroImage {
  src: string;
  alt: string;
}

interface HeroProps {
  backgroundImage?: string;
  backgroundImages?: HeroImage[];
  headline?: string;
  subheadline?: string;
  children?: ReactNode;
  className?: string;
  overlay?: boolean;
  showScrollIndicator?: boolean;
  showPrivacyDisclaimer?: boolean;
  showProtectionBadge?: boolean;
  badgeText?: string;
  showTrustIndicators?: boolean;
}

const Hero = ({ backgroundImage, backgroundImages, headline, subheadline, children, className, overlay = false, showScrollIndicator = false, showPrivacyDisclaimer = false, showProtectionBadge = false, badgeText, showTrustIndicators = false }: HeroProps) => {
  const [showDisclaimer, setShowDisclaimer] = useState(true);
  const { ref, y, opacity } = useParallax({ speed: 0.5 });
  
  // Preload background image(s)
  const singleImagePreloaded = useImagePreload(backgroundImage ? [backgroundImage] : []);
  const useCarousel = backgroundImages && backgroundImages.length > 0;

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowDisclaimer(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      ref={ref}
      className={cn("relative min-h-[400px] md:min-h-[500px] flex items-center overflow-hidden hero-mobile", className)}
    >
      {/* Background with Parallax */}
      <motion.div 
        className="absolute inset-0"
        style={{ y }}
      >
        {useCarousel ? (
          <HeroCarousel images={backgroundImages} />
        ) : backgroundImage && (
          <motion.div
            className={cn(
              "absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-300",
              singleImagePreloaded ? "opacity-100" : "opacity-0"
            )}
            style={{ 
              backgroundImage: `url(${backgroundImage})`,
              opacity
            }}
          />
        )}
        
        {/* Gradient Overlay - dark to transparent */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        
        {/* Additional overlay for better text contrast */}
        {overlay && (
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50" />
        )}
      </motion.div>
      
      {/* Particle Network Background */}
      <ParticleBackground />
      
      {/* Floating Abstract Shapes */}
      <FloatingShapes />
      
      {/* Protection Badge (if enabled) */}
      {showProtectionBadge && (
        <div className="absolute top-4 right-4 md:top-8 md:right-8 z-20">
          <ProtectionBadge text={badgeText || "Family Protected"} size="md" />
        </div>
      )}
      
      {/* Floating Particles (existing) */}
      <div className="absolute inset-0 pointer-events-none hidden md:block" style={{ zIndex: 1 }}>
        <div className="floating-orb" style={{ width: '150px', height: '150px', top: '20%', left: '10%', animationDelay: '0s' }} />
        <div className="floating-orb" style={{ width: '100px', height: '100px', top: '60%', right: '15%', animationDelay: '4s' }} />
        <div className="floating-orb" style={{ width: '120px', height: '120px', bottom: '25%', left: '40%', animationDelay: '8s' }} />
      </div>
      
      {/* Content with Stagger Animation */}
      <div className="container mx-auto px-4 py-6 sm:py-8 md:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto md:mx-0">
          {headline && (
            <motion.h1 
              className="text-white mb-4 md:mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl [text-shadow:0_4px_20px_rgba(139,92,246,0.4)] leading-tight"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {headline}
            </motion.h1>
          )}
          {subheadline && (
            <motion.p 
              className="text-white/90 text-base sm:text-lg md:text-xl lg:text-2xl mb-6 md:mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            >
              {subheadline}
            </motion.p>
          )}
          {children && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
            >
              {children}
            </motion.div>
          )}
        </div>
      </div>
      
      {/* Scroll Indicator */}
      {showScrollIndicator && <ScrollIndicator />}
      
      {/* Privacy trust badge */}
      {showPrivacyDisclaimer && showDisclaimer && (
        <div className="absolute bottom-6 left-6 z-10 group">
          <div className="relative bg-gradient-to-br from-primary/95 to-accent/95 backdrop-blur-xl text-white px-5 py-3 rounded-xl border border-white/20 shadow-2xl max-w-sm transition-all duration-300 hover:scale-105">
            {/* Decorative corner accent */}
            <div className="absolute -top-1 -right-1 w-8 h-8 bg-accent rounded-full opacity-50 blur-sm animate-pulse" />
            
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-sm mb-1 flex items-center gap-2">
                  Privacy-Protected Imagery
                  <Badge variant="secondary" className="text-[10px] px-2 py-0 bg-white/20">
                    100% Safe
                  </Badge>
                </p>
                <p className="text-xs text-white/90 leading-relaxed">
                  We use AI-generated illustrations to represent our services with complete privacy.
                  <span className="font-semibold"> Zero personal data. Zero risk.</span>
                </p>
              </div>
              <button
                onClick={() => setShowDisclaimer(false)}
                className="text-white/70 hover:text-white transition-colors flex-shrink-0 ml-2"
                aria-label="Dismiss privacy notice"
              >
                ✕
              </button>
            </div>
            
            {/* Bottom accent line */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-white/0 via-white/40 to-white/0 rounded-b-xl" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Hero;
