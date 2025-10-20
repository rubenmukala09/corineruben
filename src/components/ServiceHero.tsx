import { ReactNode, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import ScrollIndicator from "./ScrollIndicator";
import { getHeroConfig } from "@/data/heroImages";

interface ServiceHeroProps {
  headline: string;
  subheadline?: string;
  children?: ReactNode;
  className?: string;
  overlay?: boolean;
  showScrollIndicator?: boolean;
  serviceType?: string;
  imageIndex?: number;
  isVisible?: boolean;
}

const ServiceHero = ({ 
  headline, 
  subheadline, 
  children, 
  className, 
  overlay = true, 
  showScrollIndicator = false,
  serviceType = "default",
  imageIndex = 0,
  isVisible = true
}: ServiceHeroProps) => {
  const [scrollY, setScrollY] = useState(0);
  const [currentImage, setCurrentImage] = useState("");
  const [nextImage, setNextImage] = useState("");
  const [showNext, setShowNext] = useState(false);
  
  // Get service-specific image or use elders images for homepage
  const getServiceImage = (index: number) => {
    const serviceRoutes: Record<string, string> = {
      'training': '/training',
      'business': '/business',
      'scamshield': '/scamshield',
      'resources': '/resources',
      'contact': '/contact',
      'about': '/about',
      'default': '/'
    };

    // On the homepage, always rotate through the homepage image set
    const isHome = typeof window !== 'undefined' && window.location?.pathname === '/';
    const route = isHome ? '/' : (serviceRoutes[serviceType] || '/');
    const config = getHeroConfig(route);

    // For homepage, use the index to cycle through multiple images
    if (route === '/' && config.images.length > 1) {
      return config.images[index % config.images.length];
    }

    return config.images[0];
  };

  // Initialize images
  useEffect(() => {
    setCurrentImage(getServiceImage(imageIndex));
  }, []);

  // Handle image transitions
  useEffect(() => {
    const newImage = getServiceImage(imageIndex);
    if (newImage !== currentImage) {
      setNextImage(newImage);
      setShowNext(true);
      
      // After fade-in completes, swap images
      const timer = setTimeout(() => {
        setCurrentImage(newImage);
        setShowNext(false);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [imageIndex]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={cn("relative min-h-[80vh] flex items-center overflow-hidden", className)}>
      {/* Background with smooth crossfade */}
      <div 
        className="absolute inset-0"
        style={{ 
          transform: `translateY(${scrollY * 0.5}px)`
        }}
      >
        {/* Current Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ease-in-out"
          style={{ 
            backgroundImage: `url(${currentImage})`,
            opacity: showNext ? 0 : 1,
            willChange: 'opacity, transform'
          }}
        />
        {/* Next Image (crossfades in) */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ease-in-out"
          style={{ 
            backgroundImage: `url(${nextImage})`,
            opacity: showNext ? 1 : 0,
            willChange: 'opacity, transform'
          }}
        />
      </div>
      
      {/* Animated Gradient Overlay */}
      {overlay && (
        <div 
          className="absolute inset-0 bg-gradient-hero-primary opacity-40"
          style={{ 
            backgroundSize: '400% 400%', 
            animation: 'gradient-shift 15s ease infinite'
          }}
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
          <h1 
            className={cn(
              "text-white mb-4 [text-shadow:0_4px_20px_rgba(139,92,246,0.4)] leading-tight transition-all duration-700",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
          >
            {headline}
          </h1>
          {subheadline && (
            <p 
              className={cn(
                "text-white/90 text-xl md:text-2xl mb-6 leading-relaxed transition-all duration-700 delay-100",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
            >
              {subheadline}
            </p>
          )}
          {children && (
            <div 
              className={cn(
                "transition-all duration-700 delay-200",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
            >
              {children}
            </div>
          )}
        </div>
      </div>
      
      {/* Scroll Indicator */}
      {showScrollIndicator && <ScrollIndicator />}
    </div>
  );
};

export default ServiceHero;
