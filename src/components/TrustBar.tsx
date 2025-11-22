import { Shield, MapPin, Award, UserCheck, BadgeCheck } from "lucide-react";
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
    { icon: Shield, text: "500+ Families Protected", useCounter: true, count: familiesCount, pulse: true },
    { icon: MapPin, text: "Based in Kettering, Ohio", shimmer: true },
    { icon: Award, text: "Veteran Supportive Business", float: true },
    { icon: UserCheck, text: "Expert Cybersecurity Team", shimmer: true },
    { icon: BadgeCheck, text: "Certified Security Experts", pulse: true },
  ];

  return (
    <div ref={counterRef} className="relative z-10 px-4 -mt-10" role="complementary" aria-label="Trust indicators">
      <div className="container mx-auto">
        <div className="relative mx-auto max-w-7xl group/trust">
          {/* Enhanced gradient card matching website colors */}
          <div className="relative rounded-[2rem] py-4 sm:py-5 md:py-6 px-4 sm:px-6 md:px-10 backdrop-blur-xl border-2 border-white/90 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.3),0_8px_32px_rgba(139,92,246,0.35),0_16px_64px_rgba(139,92,246,0.25),0_4px_12px_rgba(0,0,0,0.1),inset_0_0_80px_rgba(255,255,255,0.12)] transition-all duration-500 overflow-hidden before:absolute before:inset-0 before:rounded-[2rem] before:shadow-[inset_24px_0_48px_-20px_rgba(0,0,0,0.4),inset_-24px_0_48px_-20px_rgba(0,0,0,0.4)] before:pointer-events-none after:absolute after:inset-0 after:rounded-[2rem] after:bg-gradient-to-br after:from-white/10 after:via-transparent after:to-transparent after:pointer-events-none" style={{ backgroundImage: 'linear-gradient(135deg, hsl(270, 65%, 45%), hsl(260, 70%, 50%), hsl(190, 75%, 48%))', transform: 'translateZ(0)' }}>
            {/* Desktop: Single row layout */}
            <div className="hidden sm:flex justify-center items-center gap-0.5 md:gap-1 lg:gap-1.5 xl:gap-1.5 relative z-10">
              {trustIndicators.map((item, index) => (
                <div 
                  key={index} 
                  className={`flex items-center gap-1 group/badge flex-shrink-0 opacity-0 animate-trust-badge-in cursor-pointer relative ${item.float ? 'animate-float' : ''} ${item.pulse ? 'animate-pulse-glow' : ''}`}
                  style={{ 
                    animationDelay: `${index * 0.12}s`,
                    animationFillMode: 'forwards',
                    willChange: 'transform'
                  }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  role="listitem"
                >
                  {item.shimmer && (
                    <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                      <div className="absolute inset-0 animate-shimmer-translate bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                    </div>
                  )}
                  
                  <div 
                    className="relative w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover/badge:scale-110 group-hover/badge:rotate-3 transition-all duration-500 shadow-[inset_0_2px_4px_rgba(0,0,0,0.2),0_6px_32px_rgba(139,92,246,0.6),0_0_0_1px_rgba(255,255,255,0.2)] group-hover/badge:shadow-[inset_0_2px_4px_rgba(0,0,0,0.2),0_10px_48px_rgba(139,92,246,0.9),0_0_60px_rgba(139,92,246,0.4)] border-2 border-white/80 group-hover/badge:border-white overflow-hidden before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br before:from-white/20 before:via-transparent before:to-transparent before:opacity-60"
                    style={{ 
                      animationDelay: `${index * 200 + 500}ms`,
                      backgroundImage: index % 4 === 0 ? 'linear-gradient(135deg, hsl(270, 75%, 50%), hsl(260, 80%, 55%))' :
                                       index % 4 === 1 ? 'linear-gradient(135deg, hsl(250, 70%, 52%), hsl(240, 75%, 55%))' :
                                       index % 4 === 2 ? 'linear-gradient(135deg, hsl(190, 72%, 50%), hsl(180, 75%, 53%))' :
                                       'linear-gradient(135deg, hsl(270, 80%, 48%), hsl(270, 75%, 55%))',
                      transform: 'translateZ(0)'
                    }}
                    aria-hidden="true"
                  >
                    <item.icon className="w-6 h-6 md:w-7 md:h-7 text-white drop-shadow-[0_3px_16px_rgba(255,255,255,0.9)] group-hover/badge:scale-110 group-hover/badge:drop-shadow-[0_5px_20px_rgba(255,255,255,1)] transition-all duration-500 z-10 filter brightness-110" />
                  </div>
                  <span className="text-xs md:text-sm font-bold text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)] group-hover/badge:scale-105 transition-all duration-300 group-hover/badge:drop-shadow-[0_2px_12px_rgba(255,255,255,0.5)] filter brightness-105">
                    {item.useCounter ? `${item.count}+ Families Protected` : item.text}
                  </span>
                </div>
              ))}
            </div>

            {/* Mobile: vertical layout */}
            <div className="flex sm:hidden flex-col gap-3 relative z-10">
              {trustIndicators.map((item, index) => (
                <div 
                  key={index} 
                  className={`flex items-center gap-3 group/badge opacity-0 animate-trust-badge-in min-h-[44px] px-3 py-2 rounded-xl active:bg-white/10 transition-all duration-300 relative cursor-pointer ${item.float ? 'animate-float' : ''} ${item.pulse ? 'animate-pulse-glow' : ''}`}
                  style={{ 
                    animationDelay: `${index * 0.08}s`,
                    animationFillMode: 'forwards',
                    willChange: 'transform'
                  }}
                  role="listitem"
                >
                  {item.shimmer && (
                    <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
                      <div className="absolute inset-0 animate-shimmer-translate bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                    </div>
                  )}
                  
                  <div className="relative w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 group-active/badge:scale-110 transition-all duration-500 shadow-[inset_0_2px_4px_rgba(0,0,0,0.2),0_6px_32px_rgba(139,92,246,0.6),0_0_0_1px_rgba(255,255,255,0.2)] group-active/badge:shadow-[inset_0_2px_4px_rgba(0,0,0,0.2),0_10px_48px_rgba(139,92,246,0.9),0_0_60px_rgba(139,92,246,0.4)] border-2 border-white/80 group-active/badge:border-white overflow-hidden before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br before:from-white/20 before:via-transparent before:to-transparent before:opacity-60" 
                    style={{ 
                      backgroundImage: index % 4 === 0 ? 'linear-gradient(135deg, hsl(270, 75%, 50%), hsl(260, 80%, 55%))' :
                                       index % 4 === 1 ? 'linear-gradient(135deg, hsl(250, 70%, 52%), hsl(240, 75%, 55%))' :
                                       index % 4 === 2 ? 'linear-gradient(135deg, hsl(190, 72%, 50%), hsl(180, 75%, 53%))' :
                                       'linear-gradient(135deg, hsl(270, 80%, 48%), hsl(270, 75%, 55%))',
                      transform: 'translateZ(0)'
                    }}
                    aria-hidden="true"
                  >
                    <item.icon className="w-6 h-6 text-white drop-shadow-[0_3px_16px_rgba(255,255,255,0.9)] group-active/badge:scale-110 group-active/badge:drop-shadow-[0_5px_20px_rgba(255,255,255,1)] transition-all duration-500 z-10 filter brightness-110" />
                  </div>
                  <span className="text-sm font-bold text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)] flex-1 transition-all duration-300 filter brightness-105">
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
