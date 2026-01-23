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
      // Remove from DOM after 500ms fade animation completes
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 500);
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-md"
      style={{ 
        opacity: isFadingOut ? 0 : 1,
        transition: 'opacity 500ms ease-out',
        pointerEvents: isFadingOut ? 'none' : 'auto',
      }}
    >
      {/* Animation Wrapper */}
      <div className="relative flex flex-col items-center justify-center">
        
        {/* Outer Orbit Ring (Spinning slowly) */}
        <div
          className="absolute h-32 w-32 rounded-full border"
          style={{ 
            borderColor: 'hsl(var(--primary) / 0.2)',
            animation: 'spin 3s linear infinite' 
          }}
        />
        
        {/* Middle Pulsing Ring */}
        <div
          className="absolute h-24 w-24 rounded-full border-2"
          style={{ 
            borderTopColor: 'hsl(var(--primary))',
            borderRightColor: 'transparent',
            borderBottomColor: 'hsl(var(--primary))',
            borderLeftColor: 'transparent',
            animation: 'spin 1.5s ease-in-out infinite' 
          }}
        />
        
        {/* Inner Glowing Core */}
        <div
          className="h-16 w-16 rounded-full flex items-center justify-center"
          style={{
            background: 'linear-gradient(to top right, hsl(var(--primary)), hsl(var(--accent)))',
            boxShadow: '0 0 30px hsl(var(--primary) / 0.5)',
            animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
          }}
        >
          <Shield className="w-8 h-8 text-white" strokeWidth={1.5} />
        </div>

        {/* Professional Loading Text */}
        <div className="mt-24 text-center">
          <p 
            className="text-sm font-medium tracking-[0.2em] uppercase"
            style={{ 
              color: 'hsl(var(--primary))',
              animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' 
            }}
          >
            System Initializing
          </p>
        </div>
        
      </div>

      {/* CSS Keyframes */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
      `}</style>
    </div>
  );
};
