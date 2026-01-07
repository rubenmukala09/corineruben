import { useState, useEffect } from "react";
import { Shield } from "lucide-react";

interface InitialLoaderProps {
  onComplete?: () => void;
  minDuration?: number;
}

// Ultra-fast initial loader with soft grey background
export const InitialLoader = ({ onComplete, minDuration = 0 }: InitialLoaderProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Immediate completion - no delay blocking FCP
    if (minDuration === 0) {
      setIsVisible(false);
      onComplete?.();
      return;
    }
    const timer = setTimeout(() => {
      setIsVisible(false);
      onComplete?.();
    }, minDuration);

    return () => clearTimeout(timer);
  }, [minDuration, onComplete]);

  if (!isVisible) return null;

  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center transition-opacity duration-800"
      style={{ backgroundColor: '#F8F9FC' }}
    >
      <div 
        className="w-16 h-16 rounded-2xl flex items-center justify-center"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.6) 100%)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.8)',
          boxShadow: '0 8px 32px rgba(139, 92, 246, 0.2)',
        }}
      >
        <Shield 
          className="w-8 h-8 text-primary" 
          strokeWidth={1.5}
          style={{ filter: 'drop-shadow(0 0 8px hsl(var(--primary) / 0.4))' }}
        />
      </div>
    </div>
  );
};
