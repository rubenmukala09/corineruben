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
  return <div ref={counterRef} className="relative z-10 px-4 -mt-10" role="complementary" aria-label="Trust indicators">
      <div className="container mx-auto">
        <div className="relative mx-auto max-w-7xl group/trust">
          {/* Enhanced gradient card matching website colors */}
          
        </div>
      </div>
    </div>;
};
export default TrustBar;