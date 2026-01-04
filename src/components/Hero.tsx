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
      className={cn("relative w-full min-h-[800px] sm:min-h-[900px] md:min-h-screen lg:min-h-[105vh] xl:min-h-[110vh] flex items-center overflow-hidden hero-mobile", className)}
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
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ 
              opacity: videoLoaded ? 1 : 0,
              scale: videoLoaded ? 1 : 1.1
            }}
            transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
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
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ 
              opacity: singleImagePreloaded ? 1 : 0,
              scale: imageLoaded ? 1 : 1.1
            }}
            transition={{ 
              opacity: { duration: 0.6, ease: "easeOut" },
              scale: { duration: 1.2, ease: [0.4, 0, 0.2, 1] }
            }}
            style={{ 
              backgroundImage: `url(${backgroundImage})`
            }}
          />
        )}
        
        {/* Premium Gradient Overlay - cinematic effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
        
        {/* Additional overlay */}
        {overlay && (
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/30" />
        )}
      </motion.div>

      {/* Animated gradient accent */}
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-40"
        animate={{
          background: [
            'radial-gradient(ellipse 80% 50% at 20% 40%, hsl(var(--primary) / 0.3) 0%, transparent 60%)',
            'radial-gradient(ellipse 80% 50% at 80% 60%, hsl(var(--accent) / 0.3) 0%, transparent 60%)',
            'radial-gradient(ellipse 80% 50% at 50% 30%, hsl(var(--primary) / 0.3) 0%, transparent 60%)',
            'radial-gradient(ellipse 80% 50% at 20% 40%, hsl(var(--primary) / 0.3) 0%, transparent 60%)',
          ]
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Geometric grid overlay */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.04]">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }} />
      </div>

      {/* Animated corner accents */}
      <div className="absolute top-0 left-0 w-64 h-64 pointer-events-none">
        <motion.div
          className="absolute top-8 left-8 w-32 h-[2px] bg-gradient-to-r from-primary/60 to-transparent"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          style={{ transformOrigin: 'left' }}
        />
        <motion.div
          className="absolute top-8 left-8 h-32 w-[2px] bg-gradient-to-b from-primary/60 to-transparent"
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          style={{ transformOrigin: 'top' }}
        />
      </div>
      <div className="absolute bottom-0 right-0 w-64 h-64 pointer-events-none">
        <motion.div
          className="absolute bottom-8 right-8 w-32 h-[2px] bg-gradient-to-l from-accent/60 to-transparent"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          style={{ transformOrigin: 'right' }}
        />
        <motion.div
          className="absolute bottom-8 right-8 h-32 w-[2px] bg-gradient-to-t from-accent/60 to-transparent"
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          style={{ transformOrigin: 'bottom' }}
        />
      </div>
      
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
      
      {/* Floating Particles - enhanced */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden hidden md:block" style={{ zIndex: 1 }}>
        <motion.div 
          className="floating-orb" 
          style={{ width: '180px', height: '180px', top: '15%', left: '8%' }}
          animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="floating-orb" 
          style={{ width: '120px', height: '120px', top: '55%', right: '12%' }}
          animate={{ y: [0, 15, 0], x: [0, -8, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.div 
          className="floating-orb" 
          style={{ width: '150px', height: '150px', bottom: '20%', left: '35%' }}
          animate={{ y: [0, -25, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        />
        <motion.div 
          className="floating-orb" 
          style={{ width: '100px', height: '100px', top: '30%', right: '25%' }}
          animate={{ y: [0, 12, 0], opacity: [0.6, 0.9, 0.6] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </div>

      {/* Decorative floating rings */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden hidden lg:block">
        <motion.div
          className="absolute top-1/4 right-[15%] w-48 h-48 rounded-full border border-white/10"
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-1/4 left-[10%] w-32 h-32 rounded-full border border-primary/20"
          animate={{ rotate: -360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
      </div>
      
      {/* Content with Stagger Animation */}
      <div className="w-full max-w-[1920px] mx-auto px-6 sm:px-10 md:px-16 lg:px-20 xl:px-32 py-20 sm:py-24 md:py-28 lg:py-32 relative z-10">
        <div className="max-w-6xl">
          {headline && (
            <motion.h1 
              className="text-white mb-4 sm:mb-6 md:mb-8 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl [text-shadow:0_4px_30px_rgba(139,92,246,0.5)] leading-tight font-bold"
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              {headline}
            </motion.h1>
          )}
          {subheadline && (
            <motion.p 
              className="text-white/90 text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl mb-8 md:mb-10 leading-relaxed max-w-3xl"
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            >
              {subheadline}
            </motion.p>
          )}
          {children && (
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
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
      
      {/* Bottom gradient fade for seamless transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
      
      {/* Scroll Indicator */}
      {showScrollIndicator && <ScrollIndicator />}
      
    </div>
  );
};

export default Hero;
