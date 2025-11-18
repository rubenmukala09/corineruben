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
  showProtectionBadge?: boolean;
  badgeText?: string;
  showTrustIndicators?: boolean;
}

const Hero = ({ backgroundImage, backgroundImages, headline, subheadline, children, className, overlay = false, showScrollIndicator = false, showProtectionBadge = false, badgeText, showTrustIndicators = false }: HeroProps) => {
  const { ref, y, opacity } = useParallax({ speed: 0.5 });
  
  // Preload background image(s)
  const singleImagePreloaded = useImagePreload(backgroundImage ? [backgroundImage] : []);
  const useCarousel = backgroundImages && backgroundImages.length > 0;

  return (
      <div 
      ref={ref}
      className={cn("relative min-h-[600px] sm:min-h-[700px] md:min-h-[850px] lg:min-h-[950px] xl:min-h-[1000px] flex items-center overflow-hidden hero-mobile bg-gradient-to-br from-primary/10 via-background to-accent/10", className)}
    >
      {/* Background with Parallax */}
      <motion.div 
        className="absolute inset-0 overflow-hidden"
        style={{ y }}
      >
        {useCarousel ? (
          <HeroCarousel images={backgroundImages} />
        ) : backgroundImage && (
          <motion.div
            className={cn(
              "absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-300 brightness-115",
              singleImagePreloaded ? "opacity-100" : "opacity-0"
            )}
            style={{ 
              backgroundImage: `url(${backgroundImage})`,
              opacity
            }}
          />
        )}
        
        {/* Gradient Overlay - stronger for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/35 to-black/45" />
        
        {/* Additional overlay */}
        {overlay && (
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/30" />
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
      <div className="absolute inset-0 pointer-events-none overflow-hidden hidden md:block" style={{ zIndex: 1 }}>
        <div className="floating-orb" style={{ width: '150px', height: '150px', top: '20%', left: '10%', animationDelay: '0s' }} />
        <div className="floating-orb" style={{ width: '100px', height: '100px', top: '60%', right: '15%', animationDelay: '4s' }} />
        <div className="floating-orb" style={{ width: '120px', height: '120px', bottom: '25%', left: '40%', animationDelay: '8s' }} />
      </div>
      
      {/* Content with Stagger Animation */}
      <div className="container mx-auto px-4 py-6 sm:py-8 md:py-12 lg:py-16 relative z-10">
        <div className="max-w-3xl mx-auto md:mx-0">
          {headline && (
            <motion.h1 
              className="text-white mb-3 sm:mb-4 md:mb-6 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl [text-shadow:0_4px_20px_rgba(139,92,246,0.4)] leading-tight"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {headline}
            </motion.h1>
          )}
          {subheadline && (
            <motion.p 
              className="text-white/90 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl mb-6 md:mb-8 leading-relaxed"
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
      
    </div>
  );
};

export default Hero;
