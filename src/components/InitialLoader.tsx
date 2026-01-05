import { useState, useEffect } from "react";
import shieldLogo from "@/assets/shield-logo.png";

interface InitialLoaderProps {
  onComplete?: () => void;
  minDuration?: number;
}

// Ultra-fast initial loader - no animations, instant display
export const InitialLoader = ({ onComplete, minDuration = 50 }: InitialLoaderProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Instant completion
    const timer = setTimeout(() => {
      setIsVisible(false);
      onComplete?.();
    }, minDuration);

    return () => clearTimeout(timer);
  }, [minDuration, onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-background">
      <img
        src={shieldLogo}
        alt="InVision Network"
        width={48}
        height={48}
        loading="eager"
        decoding="async"
        className="w-12 h-12 object-contain"
      />
    </div>
  );
};
