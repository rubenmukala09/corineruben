import { Shield, MapPin, Award, UserCheck } from "lucide-react";
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
    { icon: UserCheck, text: "Expert Cybersecurity Team" },
  ];

  return (
    <div ref={counterRef} className="relative z-10 px-4 -mt-10" role="complementary" aria-label="Trust indicators">
      <div className="container mx-auto">
        <div className="relative mx-auto max-w-7xl group/trust">
          {/* Professional gradient card background with edge effects */}
          <div className="relative rounded-[2rem] py-4 sm:py-5 md:py-6 px-4 sm:px-6 md:px-10 backdrop-blur-lg border-2 border-white/80 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.25),0_6px_24px_rgba(30,58,138,0.25),0_12px_48px_rgba(30,58,138,0.15),0_2px_8px_rgba(0,0,0,0.08),inset_0_0_60px_rgba(255,255,255,0.1)] transition-all duration-500 overflow-hidden before:absolute before:inset-0 before:rounded-[2rem] before:shadow-[inset_20px_0_40px_-20px_rgba(0,0,0,0.35),inset_-20px_0_40px_-20px_rgba(0,0,0,0.35)] before:pointer-events-none" style={{ backgroundImage: 'linear-gradient(135deg, hsl(222, 47%, 25%), hsl(215, 55%, 35%), hsl(210, 60%, 42%))', transform: 'translateZ(0)' }}>
            {/* Desktop: Horizontal layout */}
            <div className="hidden sm:flex justify-center items-center gap-2 md:gap-4 lg:gap-6 relative z-10">
              {trustIndicators.map((item, index) => (
                <div 
                  key={index} 
                  className="flex items-center gap-1.5 sm:gap-2 group/badge flex-shrink-0 opacity-0 animate-trust-badge-in cursor-pointer relative" 
                  style={{ 
                    animationDelay: `${index * 0.15}s`,
                    animationFillMode: 'forwards',
                    willChange: 'transform'
                  }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  role="listitem"
                >
                  
                  <div 
                    className="relative w-10 h-10 sm:w-11 sm:h-11 md:w-14 md:h-14 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover/badge:scale-110 group-hover/badge:rotate-3 transition-all duration-500 shadow-[inset_0_1px_2px_rgba(0,0,0,0.15),0_4px_25px_rgba(30,58,138,0.5)] group-hover/badge:shadow-[inset_0_1px_2px_rgba(0,0,0,0.15),0_8px_40px_rgba(30,58,138,0.8)] border-2 border-white/75 group-hover/badge:border-white/95 overflow-hidden"
                    style={{ 
                      animationDelay: `${index * 200 + 500}ms`,
                      backgroundImage: index === 0 ? 'linear-gradient(135deg, hsl(215, 60%, 45%), hsl(205, 65%, 52%))' :
                                       index === 1 ? 'linear-gradient(135deg, hsl(205, 65%, 48%), hsl(195, 58%, 52%))' :
                                       index === 2 ? 'linear-gradient(135deg, hsl(195, 55%, 50%), hsl(185, 50%, 52%))' :
                                       'linear-gradient(135deg, hsl(215, 65%, 42%), hsl(215, 60%, 48%))',
                      transform: 'translateZ(0)'
                    }}
                    aria-hidden="true"
                  >
                    <item.icon className="relative w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white drop-shadow-[0_2px_12px_rgba(255,255,255,0.8)] group-hover/badge:scale-110 group-hover/badge:drop-shadow-[0_4px_16px_rgba(255,255,255,1)] transition-all duration-500 relative z-10" />
                  </div>
                  <span className="text-xs md:text-sm lg:text-base font-bold text-white drop-shadow-sm group-hover/badge:scale-105 transition-all duration-300 min-w-[160px] sm:min-w-[180px] md:min-w-[200px] group-hover/badge:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">
                    {item.useCounter ? `${item.count}+ Families Protected` : item.text}
                  </span>
                </div>
              ))}
            </div>

            {/* Mobile: 2x2 grid, vertical on very small screens */}
            <div className="flex sm:hidden flex-col gap-3 relative z-10">
              {trustIndicators.map((item, index) => (
                <div 
                  key={index} 
                  className="flex items-center gap-3 group/badge opacity-0 animate-trust-badge-in min-h-[44px] px-3 py-2 rounded-xl active:bg-white/10 transition-all duration-300 relative cursor-pointer" 
                  style={{ 
                    animationDelay: `${index * 0.1}s`,
                    animationFillMode: 'forwards',
                    willChange: 'transform'
                  }}
                  role="listitem"
                >
                  <div className="relative w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 group-active/badge:scale-110 transition-all duration-500 shadow-[inset_0_1px_2px_rgba(0,0,0,0.15),0_4px_25px_rgba(30,58,138,0.5)] group-active/badge:shadow-[inset_0_1px_2px_rgba(0,0,0,0.15),0_8px_40px_rgba(30,58,138,0.8)] border-2 border-white/75 group-active/badge:border-white/95 overflow-hidden" 
                    style={{ 
                      backgroundImage: index === 0 ? 'linear-gradient(135deg, hsl(215, 60%, 45%), hsl(205, 65%, 52%))' :
                                       index === 1 ? 'linear-gradient(135deg, hsl(205, 65%, 48%), hsl(195, 58%, 52%))' :
                                       index === 2 ? 'linear-gradient(135deg, hsl(195, 55%, 50%), hsl(185, 50%, 52%))' :
                                       'linear-gradient(135deg, hsl(215, 65%, 42%), hsl(215, 60%, 48%))',
                      transform: 'translateZ(0)'
                    }}
                    aria-hidden="true"
                  >
                    <item.icon className="relative w-6 h-6 text-white drop-shadow-[0_2px_12px_rgba(255,255,255,0.8)] group-active/badge:scale-110 group-active/badge:drop-shadow-[0_4px_16px_rgba(255,255,255,1)] transition-all duration-500 z-10" />
                  </div>
                  <span className="text-sm font-bold text-white drop-shadow-sm flex-1 transition-all duration-300">
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
