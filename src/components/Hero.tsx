import { ReactNode, useEffect, useState, useRef, Children, isValidElement } from "react";
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

const Hero = ({ backgroundImage, backgroundImages, backgroundVideo, headline, subheadline, children, className, overlay = false, showScrollIndicator = false, showProtectionBadge = false, badgeText, showTrustIndicators = false }: HeroProps) => {
  const { ref, y, opacity } = useParallax({ speed: 0.5 });
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // Preload background image(s)
  const singleImagePreloaded = useImagePreload(backgroundImage ? [backgroundImage] : []);
  const useCarousel = backgroundImages && backgroundImages.length > 0;
  const useVideo = !!backgroundVideo;

  // Track when single image is fully loaded for blur effect
  useEffect(() => {
    if (singleImagePreloaded && backgroundImage) {
      // Small delay for smoother blur-to-sharp transition
      const timer = setTimeout(() => setImageLoaded(true), 50);
      return () => clearTimeout(timer);
    }
  }, [singleImagePreloaded, backgroundImage]);

  return (
    <div 
      ref={ref}
      className={cn("relative min-h-[600px] sm:min-h-[700px] md:min-h-[800px] lg:min-h-[900px] xl:min-h-[950px] flex items-center overflow-hidden hero-mobile", className)}
    >
      {/* Persistent background gradient - prevents white flash */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1e3a8a] via-[#3b0764] to-[#0d9488]" />
      
      {/* Background with Parallax */}
      <motion.div 
        className="absolute inset-0 overflow-hidden"
        style={{ y }}
      >
        {/* Video Background */}
        {useVideo && (
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0, filter: 'blur(10px)', scale: 1.05 }}
            animate={{ 
              opacity: videoLoaded ? 1 : 0,
              filter: videoLoaded ? 'blur(0px)' : 'blur(10px)',
              scale: videoLoaded ? 1 : 1.05
            }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          >
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              onLoadedData={() => setVideoLoaded(true)}
              className="absolute inset-0 w-full h-full object-cover"
              style={{ filter: 'brightness(0.85)' }}
            >
              <source src={backgroundVideo} type="video/mp4" />
            </video>
          </motion.div>
        )}

        {/* Image Carousel (if no video) */}
        {!useVideo && useCarousel ? (
          <HeroCarousel images={backgroundImages} />
        ) : !useVideo && backgroundImage && (
          <motion.div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat brightness-115"
            initial={{ opacity: 0, filter: 'blur(15px)', scale: 1.05 }}
            animate={{ 
              opacity: singleImagePreloaded ? 1 : 0,
              filter: imageLoaded ? 'blur(0px)' : 'blur(15px)',
              scale: imageLoaded ? 1 : 1.05
            }}
            transition={{ 
              opacity: { duration: 0.4, ease: "easeOut" },
              filter: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
              scale: { duration: 0.8, ease: [0.4, 0, 0.2, 1] }
            }}
            style={{ 
              backgroundImage: `url(${backgroundImage})`
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
              className="flex flex-wrap gap-4"
            >
              {Children.map(children, (child) =>
                isValidElement(child) ? (
                  <MagneticWrapper strength={0.3}>{child}</MagneticWrapper>
                ) : (
                  child
                )
              )}
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
