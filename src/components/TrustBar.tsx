import { Shield, MapPin, Award, Users } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const TrustBar = () => {
  const [familiesCount, setFamiliesCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
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
    { icon: Users, text: "Expert Cybersecurity Team" },
  ];

  return (
    <div ref={counterRef} className="relative z-10 px-4 -mt-10" role="complementary" aria-label="Trust indicators">
      <div className="container mx-auto">
        <div className="relative mx-auto max-w-7xl">
          {/* Redesigned gradient bar matching screenshot */}
          <div 
            className="relative rounded-[2.5rem] py-5 md:py-6 px-6 md:px-10 backdrop-blur-sm overflow-hidden shadow-2xl"
            style={{ 
              background: 'linear-gradient(90deg, #9D4EDD 0%, #7B2CBF 25%, #5A67D8 50%, #14B8A6 75%, #0D9488 100%)',
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden'
            }}
          >
            {/* Desktop: Single row layout */}
            <div className="hidden sm:flex justify-around items-center gap-4 lg:gap-8 relative z-10">
              {trustIndicators.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <div 
                    key={index} 
                    className="flex items-center gap-3 lg:gap-4 group/badge flex-shrink-0 opacity-0 animate-trust-badge-in"
                    style={{ 
                      animationDelay: `${index * 0.15}s`,
                      animationFillMode: 'forwards',
                      transform: 'translateZ(0)',
                      backfaceVisibility: 'hidden'
                    }}
                    role="listitem"
                  >
                    <div 
                      className="relative w-14 h-14 lg:w-16 lg:h-16 rounded-full bg-white flex items-center justify-center flex-shrink-0 group-hover/badge:scale-110 transition-all duration-300 shadow-lg"
                      style={{ transform: 'translateZ(0)' }}
                      aria-hidden="true"
                    >
                      <IconComponent className="w-7 h-7 lg:w-8 lg:h-8 text-[#9D4EDD] group-hover/badge:scale-110 transition-all duration-300" />
                    </div>
                    <span className="text-sm lg:text-base font-bold text-white drop-shadow-md whitespace-nowrap">
                      {item.useCounter ? `${item.count}+ Families Protected` : item.text}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Mobile: Compact vertical layout */}
            <div className="flex sm:hidden flex-col gap-4 relative z-10">
              {trustIndicators.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <div 
                    key={index} 
                    className="flex items-center gap-3 opacity-0 animate-trust-badge-in"
                    style={{ 
                      animationDelay: `${index * 0.1}s`,
                      animationFillMode: 'forwards',
                      transform: 'translateZ(0)'
                    }}
                    role="listitem"
                  >
                    <div 
                      className="relative w-12 h-12 rounded-full bg-white flex items-center justify-center flex-shrink-0 shadow-lg"
                      style={{ transform: 'translateZ(0)' }}
                      aria-hidden="true"
                    >
                      <IconComponent className="w-6 h-6 text-[#9D4EDD]" />
                    </div>
                    <span className="text-sm font-bold text-white drop-shadow-md flex-1">
                      {item.useCounter ? `${item.count}+ Families Protected` : item.text}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustBar;
