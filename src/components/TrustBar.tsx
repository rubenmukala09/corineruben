import { Shield, Star, Award, Lock } from "lucide-react";
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
    const duration = 2000;
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
    {
      icon: Shield,
      text: "Families Protected",
      prefix: `${familiesCount}+`,
      useCounter: true
    },
    {
      icon: Star,
      text: "Star Rating",
      prefix: "4.9/5"
    },
    {
      icon: Award,
      text: "Cybersecurity Expert-Founded",
      prefix: ""
    },
    {
      icon: Lock,
      text: "Privacy-First",
      prefix: ""
    }
  ];

  return (
    <div ref={counterRef} className="relative z-20 px-4 -mt-12 md:-mt-16" role="complementary" aria-label="Trust indicators">
      <div className="container mx-auto">
        <div className="relative mx-auto max-w-4xl">
          {/* Arrow/Triangle shaped bar */}
          <div 
            className="bg-accent py-4 px-6 md:px-10 flex flex-wrap justify-center md:justify-between items-center gap-4 md:gap-6"
            style={{
              clipPath: "polygon(3% 0%, 100% 0%, 100% 100%, 0% 100%)",
              borderRadius: "0 12px 12px 0"
            }}
          >
            {trustIndicators.map((indicator, index) => (
              <div 
                key={index}
                className="flex items-center gap-2 text-accent-foreground"
              >
                <indicator.icon className="w-5 h-5 text-accent-foreground/90" />
                <span className="text-sm md:text-base font-medium whitespace-nowrap">
                  {indicator.prefix && <span className="font-bold">{indicator.prefix} </span>}
                  {indicator.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustBar;
