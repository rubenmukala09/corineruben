import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface HeroProps {
  backgroundImage: string;
  headline: string;
  subheadline?: string;
  children?: ReactNode;
  className?: string;
  overlay?: boolean;
}

const Hero = ({ backgroundImage, headline, subheadline, children, className, overlay = true }: HeroProps) => {
  return (
    <div className={cn("relative min-h-[90vh] flex items-center overflow-hidden", className)}>
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      
      {/* Animated Gradient Overlay */}
      {overlay && (
        <div 
          className="absolute inset-0 bg-gradient-hero-primary opacity-90"
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
          <h1 className="text-white mb-6 animate-fade-in-up [text-shadow:0_4px_20px_rgba(139,92,246,0.4)]">
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
    </div>
  );
};

export default Hero;
