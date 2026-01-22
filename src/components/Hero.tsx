import { ReactNode, useRef, Children, isValidElement } from "react";
import { cn } from "@/lib/utils";
import ScrollIndicator from "./ScrollIndicator";
import { ProtectionBadge } from "./ProtectionBadge";
import { HeroCarousel } from "./HeroCarousel";
import { MagneticWrapper } from "./ui/magnetic-button";
import HeroPurpleOverlay from "./HeroPurpleOverlay";

interface HeroImage {
  src: string;
  alt: string;
}

interface HeroProps {
  backgroundImage?: string;
  backgroundImages?: HeroImage[];
  backgroundVideo?: string;
  headline?: string | ReactNode;
  subheadline?: string | ReactNode;
  children?: ReactNode;
  className?: string;
  overlay?: boolean;
  showScrollIndicator?: boolean;
  showProtectionBadge?: boolean;
  badgeText?: string;
  showTrustIndicators?: boolean;
  /** Disable the purple overlay for homepage */
  disablePurpleOverlay?: boolean;
}

const Hero = ({ 
  backgroundImage, 
  backgroundImages, 
  backgroundVideo, 
  headline, 
  subheadline, 
  children, 
  className, 
  overlay = false, 
  showScrollIndicator = false, 
  showProtectionBadge = false, 
  badgeText,
  disablePurpleOverlay = false,
}: HeroProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // No loading states - show immediately for instant page transitions
  const useCarousel = backgroundImages && backgroundImages.length > 0;
  const useVideo = !!backgroundVideo;

  return (
    <div 
      className={cn(
        "relative w-full min-h-[800px] sm:min-h-[900px] md:min-h-screen lg:min-h-[105vh] xl:min-h-[110vh] flex items-center overflow-hidden hero-mobile hero-instant", 
        className
      )}
    >
      {/* Instant background - no flash */}
      <div className="absolute inset-0 bg-background/5" />
      
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Video Background - Instant display */}
        {useVideo && (
          <div className="absolute inset-0">
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="absolute inset-0 w-full h-full object-cover brightness-[0.85]"
            >
              <source src={backgroundVideo} type="video/mp4" />
            </video>
          </div>
        )}

        {/* Image Carousel (if no video) */}
        {!useVideo && useCarousel ? (
          <HeroCarousel images={backgroundImages} />
        ) : !useVideo && backgroundImage && (
          <img
            src={backgroundImage}
            alt="Hero background"
            // @ts-expect-error - fetchpriority is a valid HTML attribute
            fetchpriority="high"
            loading="eager"
            decoding="sync"
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        
        {/* Simple dark tint for text readability on inner pages */}
        {!disablePurpleOverlay && <HeroPurpleOverlay />}
      </div>

      {/* Protection Badge (if enabled) */}
      {showProtectionBadge && (
        <div className="absolute top-4 right-4 md:top-8 md:right-8 z-20">
          <ProtectionBadge text={badgeText || "Family Protected"} size="md" />
        </div>
      )}
      
      {/* Content - CSS animations instead of framer-motion */}
      <div className="w-full max-w-[1920px] mx-auto px-6 sm:px-10 md:px-16 lg:px-20 xl:px-32 py-20 sm:py-24 md:py-28 lg:py-32 relative z-10">
        <div className="max-w-6xl animate-fade-in">
          {headline && (
            <h1 className="text-white mb-4 sm:mb-6 md:mb-8 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight font-bold">
              {headline}
            </h1>
          )}
          {subheadline && (
            <p className="text-white/95 text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl mb-8 md:mb-10 leading-relaxed max-w-3xl">
              {subheadline}
            </p>
          )}
          {children && (
            <div className="flex flex-wrap gap-4">
              {Children.map(children, (child) =>
                isValidElement(child) ? (
                  <MagneticWrapper strength={0.3}>{child}</MagneticWrapper>
                ) : (
                  child
                )
              )}
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