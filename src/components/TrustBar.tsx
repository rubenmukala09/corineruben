import { Shield, MapPin, Award, Globe } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const TrustBar = () => {
  const [familiesCount, setFamiliesCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  // Counter animation
  useEffect(() => {
    const element = counterRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          setIsVisible(true);
          hasAnimated.current = true;
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2500;
    const startTime = performance.now();
    const end = 500;

    const easeOutQuad = (t: number) => t * (2 - t);

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutQuad(progress);
      
      const currentCount = Math.floor(end * easedProgress);
      setFamiliesCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible]);

  const trustIndicators = [
    { icon: Shield, text: "500+ Families Protected", useCounter: true, count: familiesCount },
    { icon: MapPin, text: "Ohio Based & Trusted" },
    { icon: Award, text: "Expert Cybersecurity Team" },
    { icon: Globe, text: "Available in English • Français • Español" },
  ];

  return (
    <div ref={counterRef} className="relative z-10 px-4 -mt-10" role="complementary" aria-label="Trust indicators">
      <div className="container mx-auto">
        <div className="relative mx-auto max-w-7xl group/trust">
          {/* Glow effect */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary/20 to-accent/20 blur-xl opacity-50 group-hover/trust:opacity-75 transition-opacity duration-500" />
          
          {/* Animated rolling light border */}
          <div className="absolute inset-0 rounded-3xl overflow-hidden">
            <div 
              className="absolute inset-[-2px] rounded-3xl opacity-75"
              style={{
                background: 'conic-gradient(from 0deg, transparent 0%, transparent 70%, rgba(255,255,255,0.8) 85%, rgba(255,255,255,0.4) 90%, transparent 100%)',
                animation: 'spin 3s linear infinite',
              }}
            />
          </div>
          
          {/* Main content with gradient background */}
          <div className="relative bg-gradient-to-r from-[hsl(260,70%,35%)] via-[hsl(220,70%,40%)] to-[hsl(180,80%,45%)] rounded-3xl py-3 px-4 sm:px-5 md:px-8 shadow-[0_12px_40px_rgba(139,92,246,0.5)] backdrop-blur-sm border border-white/20 group-hover/trust:shadow-[0_20px_60px_rgba(139,92,246,0.7)] transition-all duration-500">
            {/* Desktop: Horizontal layout */}
            <div className="hidden sm:flex justify-center items-center gap-2 md:gap-4 lg:gap-6">
              {trustIndicators.map((item, index) => (
                <div 
                  key={index} 
                  className="flex items-center gap-1.5 sm:gap-2 group/badge flex-shrink-0 opacity-0 animate-trust-badge-in cursor-pointer" 
                  style={{ 
                    animationDelay: `${index * 200 + 300}ms`,
                    animationFillMode: 'forwards',
                    opacity: hoveredIndex !== null && hoveredIndex !== index ? '0.7' : '1',
                    transition: 'opacity 0.3s ease'
                  }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  role="listitem"
                >
                  <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-xl bg-white/25 backdrop-blur-sm flex items-center justify-center flex-shrink-0 group-hover/badge:scale-110 group-hover/badge:rotate-6 group-hover/badge:bg-white/35 group-hover/badge:shadow-[0_8px_20px_rgba(255,255,255,0.3)] transition-all duration-300 animate-icon-pulse" 
                    style={{ animationDelay: `${index * 200 + 500}ms` }}
                    aria-hidden="true"
                  >
                    <item.icon className="w-4 h-4 sm:w-5 sm:h-5 text-white drop-shadow-lg group-hover/badge:scale-110 transition-transform duration-300" />
                  </div>
                  <span className="text-xs md:text-sm lg:text-base font-bold text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)] group-hover/badge:scale-105 transition-transform duration-300 min-w-[160px] sm:min-w-[180px] md:min-w-[200px]">
                    {item.useCounter ? `${item.count}+ Families Protected` : item.text}
                  </span>
                </div>
              ))}
            </div>

            {/* Mobile: 2x2 grid, vertical on very small screens */}
            <div className="flex sm:hidden flex-col gap-3">
              {trustIndicators.map((item, index) => (
                <div 
                  key={index} 
                  className="flex items-center gap-3 group/badge opacity-0 animate-trust-badge-in min-h-[44px] px-3 py-2 rounded-xl active:bg-white/10 transition-all duration-300" 
                  style={{ 
                    animationDelay: `${index * 200 + 300}ms`,
                    animationFillMode: 'forwards'
                  }}
                  role="listitem"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/25 backdrop-blur-sm flex items-center justify-center flex-shrink-0 group-active/badge:scale-110 group-active/badge:bg-white/35 transition-all duration-300 animate-icon-pulse" 
                    style={{ animationDelay: `${index * 200 + 500}ms` }}
                    aria-hidden="true"
                  >
                    <item.icon className="w-5 h-5 text-white drop-shadow-lg" />
                  </div>
                  <span className="text-sm font-bold text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)] flex-1">
                    {item.useCounter ? `${item.count}+ Families Protected` : item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustBar;
