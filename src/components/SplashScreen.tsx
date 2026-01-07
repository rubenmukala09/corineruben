import { useEffect, useState, useRef } from "react";
import { Shield } from "lucide-react";

interface SplashScreenProps {
  isVisible: boolean;
}

export const SplashScreen = ({ isVisible }: SplashScreenProps) => {
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);
  const wasVisible = useRef(isVisible);

  useEffect(() => {
    // Detect when isVisible changes from true to false
    if (wasVisible.current && !isVisible) {
      // Start fade out
      setIsFadingOut(true);
      // Remove from DOM after 800ms fade animation completes
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 800);
      return () => clearTimeout(timer);
    }
    wasVisible.current = isVisible;
  }, [isVisible]);

  // Reset state when becoming visible again
  useEffect(() => {
    if (isVisible) {
      setShouldRender(true);
      setIsFadingOut(false);
    }
  }, [isVisible]);

  if (!shouldRender) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ 
        backgroundColor: '#F8F9FC',
        opacity: isFadingOut ? 0 : 1,
        transition: 'opacity 800ms ease-out',
        pointerEvents: isFadingOut ? 'none' : 'auto',
      }}
    >
      {/* Glassmorphism Shield Loader */}
      <div className="relative flex items-center justify-center">
        {/* Outer breathing glow */}
        <div
          className="absolute w-40 h-40 rounded-full animate-pulse"
          style={{
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, transparent 70%)',
            filter: 'blur(20px)',
            animation: 'breathe 2.5s ease-in-out infinite',
          }}
        />

        {/* Ripple ring 1 */}
        <div
          className="absolute w-32 h-32 rounded-full border-2"
          style={{ 
            borderColor: 'rgba(139, 92, 246, 0.3)',
            animation: 'ripple 2.5s ease-out infinite',
          }}
        />

        {/* Ripple ring 2 (delayed) */}
        <div
          className="absolute w-32 h-32 rounded-full border-2"
          style={{ 
            borderColor: 'rgba(139, 92, 246, 0.2)',
            animation: 'ripple 2.5s ease-out infinite 0.8s',
          }}
        />

        {/* Glassmorphism shield container */}
        <div
          className="relative w-24 h-24 rounded-2xl flex items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.6) 100%)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.8)',
            boxShadow: `
              0 8px 32px rgba(139, 92, 246, 0.25),
              0 0 60px rgba(139, 92, 246, 0.15),
              inset 0 1px 0 rgba(255,255,255,0.9)
            `,
            animation: 'pulse-scale 2.5s ease-in-out infinite',
          }}
        >
          {/* Shield icon with purple glow */}
          <div
            style={{
              animation: 'glow-pulse 2.5s ease-in-out infinite',
            }}
          >
            <Shield 
              className="w-12 h-12 text-primary" 
              strokeWidth={1.5}
            />
          </div>
        </div>
      </div>

      {/* CSS Keyframes */}
      <style>{`
        @keyframes breathe {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.2); opacity: 0.5; }
        }
        @keyframes ripple {
          0% { transform: scale(0.5); opacity: 0.6; }
          100% { transform: scale(1.8); opacity: 0; }
        }
        @keyframes pulse-scale {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes glow-pulse {
          0%, 100% { filter: drop-shadow(0 0 8px rgba(139, 92, 246, 0.5)); }
          50% { filter: drop-shadow(0 0 20px rgba(139, 92, 246, 0.7)); }
        }
      `}</style>
    </div>
  );
};