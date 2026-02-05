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
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasAnimated.current) {
        setIsVisible(true);
        hasAnimated.current = true;
      }
    }, {
      threshold: 0.3
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!isVisible) return;
    const duration = 2500;
    const startTime = performance.now();
    const end = 100;
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
  const trustIndicators = [{
    icon: Shield,
    text: "100+ Families Protected",
    useCounter: true,
    count: familiesCount
  }, {
    icon: MapPin,
    text: "Serving Greater Dayton Area"
  }, {
    icon: Award,
    text: "Veteran Supportive Business"
  }, {
    icon: UserCheck,
    text: "Expert Cybersecurity Team"
  }];
  return (
    <div ref={counterRef} className="relative z-10 px-4 py-8" role="complementary" aria-label="Trust indicators">
      <div className="container mx-auto">
        <div className="relative mx-auto max-w-6xl">
          {/* Premium glassmorphism trust bar */}
          <div 
            className="relative rounded-2xl p-6 border border-white/30"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(250,249,247,0.98) 50%, rgba(255,245,240,0.95) 100%)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.6)',
            }}
          >
            {/* Decorative gradient accent */}
            <div 
              className="absolute -top-1 left-1/2 -translate-x-1/2 w-48 h-1 rounded-full"
              style={{
                background: 'linear-gradient(90deg, transparent, #F8926A, #BB81B5, transparent)',
              }}
            />
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {trustIndicators.map((item, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-3 group cursor-default transition-transform duration-200 hover:-translate-y-0.5"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Icon container with gradient */}
                  <div 
                    className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-200 group-hover:scale-105"
                    style={{
                      background: 'linear-gradient(135deg, hsl(var(--coral-100)) 0%, hsl(var(--lavender-100)) 100%)',
                      border: '1px solid hsl(var(--coral-200))',
                    }}
                  >
                    <item.icon 
                      className="w-5 h-5 transition-colors duration-200"
                      style={{ color: 'hsl(var(--coral-600))' }}
                    />
                  </div>
                  
                  {/* Text with gradient on hover */}
                  <span 
                    className="text-sm font-semibold transition-all duration-200"
                    style={{
                      background: hoveredIndex === index 
                        ? 'linear-gradient(135deg, hsl(var(--navy-600)) 0%, hsl(var(--lavender-600)) 100%)'
                        : 'linear-gradient(135deg, hsl(var(--foreground)) 0%, hsl(var(--foreground)) 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    {item.useCounter 
                      ? `${item.count}+ Families Protected`
                      : item.text
                    }
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