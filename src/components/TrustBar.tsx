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
    { icon: MapPin, text: "Based in Kettering, Ohio" },
    { icon: Award, text: "Veteran Supportive Business" },
    { icon: Globe, text: "BBB A+ Rating • Supporting St. Jude" },
  ];

  return (
    <div ref={counterRef} className="relative z-10 px-4 -mt-10" role="complementary" aria-label="Trust indicators">
      <div className="container mx-auto">
        <div className="relative mx-auto max-w-7xl group/trust">
          {/* Vibrant multi-layer glow effects */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/40 via-purple-500/40 to-pink-500/40 blur-3xl opacity-70 group-hover/trust:opacity-100 transition-opacity duration-700 animate-pulse-slow" />
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-400/30 via-teal-400/30 to-emerald-400/30 blur-2xl opacity-60 group-hover/trust:opacity-90 transition-opacity duration-700" />
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-orange-400/20 via-yellow-400/20 to-lime-400/20 blur-xl opacity-50 group-hover/trust:opacity-80 transition-opacity duration-700" />
          
          {/* Rainbow shimmer border effect */}
          <div className="absolute inset-0 rounded-3xl overflow-hidden opacity-60 group-hover/trust:opacity-90 transition-opacity duration-500">
            <div 
              className="absolute inset-[-3px] rounded-3xl"
              style={{
                background: 'conic-gradient(from 0deg, #3b82f6 0%, #8b5cf6 15%, #ec4899 30%, #f59e0b 45%, #10b981 60%, #06b6d4 75%, #3b82f6 90%, #3b82f6 100%)',
                animation: 'spin 3s linear infinite',
              }}
            />
          </div>
          
          {/* Colorful gradient card background */}
          <div className="relative bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-3xl py-4 sm:py-5 md:py-6 px-4 sm:px-6 md:px-10 shadow-[0_8px_30px_rgb(139,92,246,0.25)] backdrop-blur-md border-2 border-white/60 group-hover/trust:shadow-[0_20px_60px_rgb(139,92,246,0.4)] group-hover/trust:border-purple-200/60 transition-all duration-500">
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
                  <div className="relative w-10 h-10 sm:w-11 sm:h-11 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br from-blue-400/60 via-purple-500/60 to-pink-500/60 backdrop-blur-md flex items-center justify-center flex-shrink-0 group-hover/badge:scale-110 group-hover/badge:rotate-3 transition-all duration-500 shadow-[0_4px_25px_rgba(139,92,246,0.4)] group-hover/badge:shadow-[0_8px_40px_rgba(139,92,246,0.7)] border border-white/40 group-hover/badge:border-white/60" 
                    style={{ 
                      animationDelay: `${index * 200 + 500}ms`,
                      backgroundImage: index === 0 ? 'linear-gradient(135deg, #3b82f6, #8b5cf6)' :
                                       index === 1 ? 'linear-gradient(135deg, #10b981, #06b6d4)' :
                                       index === 2 ? 'linear-gradient(135deg, #f59e0b, #ef4444)' :
                                       'linear-gradient(135deg, #ec4899, #8b5cf6)'
                    }}
                    aria-hidden="true"
                  >
                    {/* Vibrant icon glow effect */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/40 to-white/10 blur-lg opacity-0 group-hover/badge:opacity-100 transition-opacity duration-500" />
                    <item.icon className="relative w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white drop-shadow-[0_2px_12px_rgba(255,255,255,0.8)] group-hover/badge:scale-110 group-hover/badge:drop-shadow-[0_4px_16px_rgba(255,255,255,1)] transition-all duration-500" />
                  </div>
                  <span className="text-xs md:text-sm lg:text-base font-bold text-foreground drop-shadow-sm group-hover/badge:scale-105 group-hover/badge:text-primary transition-all duration-300 min-w-[160px] sm:min-w-[180px] md:min-w-[200px]">
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
                  <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-400/60 via-purple-500/60 to-pink-500/60 backdrop-blur-md flex items-center justify-center flex-shrink-0 group-active/badge:scale-110 transition-all duration-500 shadow-[0_4px_25px_rgba(139,92,246,0.4)] group-active/badge:shadow-[0_8px_40px_rgba(139,92,246,0.7)] border border-white/40 group-active/badge:border-white/60" 
                    style={{ 
                      animationDelay: `${index * 200 + 500}ms`,
                      backgroundImage: index === 0 ? 'linear-gradient(135deg, #3b82f6, #8b5cf6)' :
                                       index === 1 ? 'linear-gradient(135deg, #10b981, #06b6d4)' :
                                       index === 2 ? 'linear-gradient(135deg, #f59e0b, #ef4444)' :
                                       'linear-gradient(135deg, #ec4899, #8b5cf6)'
                    }}
                    aria-hidden="true"
                  >
                    {/* Vibrant icon glow effect */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/40 to-white/10 blur-lg opacity-0 group-active/badge:opacity-100 transition-opacity duration-500" />
                    <item.icon className="relative w-6 h-6 text-white drop-shadow-[0_2px_12px_rgba(255,255,255,0.8)] group-active/badge:scale-110 group-active/badge:drop-shadow-[0_4px_16px_rgba(255,255,255,1)] transition-all duration-500" />
                  </div>
                  <span className="text-sm font-bold text-foreground drop-shadow-sm flex-1">
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
