import { ReactNode, useEffect, useState, useRef, Children, isValidElement } from "react";
import { cn } from "@/lib/utils";
import ScrollIndicator from "./ScrollIndicator";
import { ProtectionBadge } from "./ProtectionBadge";
import { useImagePreload } from "@/hooks/useImagePreload";
import { HeroCarousel } from "./HeroCarousel";
import { MagneticWrapper } from "./ui/magnetic-button";

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
}: HeroProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // Preload background image(s)
  const singleImagePreloaded = useImagePreload(backgroundImage ? [backgroundImage] : []);
  const useCarousel = backgroundImages && backgroundImages.length > 0;
  const useVideo = !!backgroundVideo;

  // Track when single image is fully loaded
  useEffect(() => {
    if (singleImagePreloaded && backgroundImage) {
      const timer = setTimeout(() => setImageLoaded(true), 50);
      return () => clearTimeout(timer);
    }
  }, [singleImagePreloaded, backgroundImage]);

  return (
    <div 
      className={cn(
        "relative w-full min-h-[800px] sm:min-h-[900px] md:min-h-screen lg:min-h-[105vh] xl:min-h-[110vh] flex items-center overflow-hidden hero-mobile", 
        className
      )}
    >
      {/* Persistent background - prevents white flash */}
      <div className="absolute inset-0 bg-slate-900" />
      
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Video Background */}
        {useVideo && (
          <div
            className={cn(
              "absolute inset-0 transition-opacity duration-300",
              videoLoaded ? "opacity-100" : "opacity-0"
            )}
          >
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              onCanPlay={() => setVideoLoaded(true)}
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
          <div
            className={cn(
              "absolute inset-0 bg-cover bg-center bg-no-repeat brightness-115 transition-opacity duration-500",
              singleImagePreloaded ? "opacity-100" : "opacity-0"
            )}
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
        )}
        
        {/* Premium Gradient Overlay - cinematic effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
        
        {/* Additional overlay */}
        {overlay && (
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/30" />
        )}
      </div>

      {/* Subtle grid overlay */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.03]">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '80px 80px'
          }} 
        />
      </div>

      {/* Protection Badge (if enabled) */}
      {showProtectionBadge && (
        <div className="absolute top-4 right-4 md:top-8 md:right-8 z-20">
          <ProtectionBadge text={badgeText || "Family Protected"} size="md" />
        </div>
      )}
      
      {/* Content */}
      <div className="w-full max-w-[1920px] mx-auto px-6 sm:px-10 md:px-16 lg:px-20 xl:px-32 py-20 sm:py-24 md:py-28 lg:py-32 relative z-10">
        <div className="max-w-6xl">
          {headline && (
            <h1 className="text-white mb-4 sm:mb-6 md:mb-8 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl [text-shadow:0_4px_30px_rgba(139,92,246,0.5)] leading-tight font-bold animate-fade-in">
              {headline}
            </h1>
          )}
          {subheadline && (
            <p className="text-white/90 text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl mb-8 md:mb-10 leading-relaxed max-w-3xl animate-fade-in" style={{ animationDelay: '0.1s' }}>
              {subheadline}
            </p>
          )}
          {children && (
            <div className="flex flex-wrap gap-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
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
      
      {/* Bottom gradient removed for clean hero edge */}
      
      {/* Scroll Indicator */}
      {showScrollIndicator && <ScrollIndicator />}
    </div>
  );
};

export default Hero;
