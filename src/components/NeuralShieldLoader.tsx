import { useState, useEffect } from 'react';
import shieldLogo from "@/assets/shield-logo.png";

interface NeuralShieldLoaderProps {
  isVisible: boolean;
}

const NeuralShieldLoader = ({ isVisible }: NeuralShieldLoaderProps) => {
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    if (!isVisible && shouldRender) {
      setIsFadingOut(true);
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 700);
      return () => clearTimeout(timer);
    }
    if (isVisible) {
      setShouldRender(true);
      setIsFadingOut(false);
    }
  }, [isVisible, shouldRender]);

  if (!shouldRender) return null;

  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/95 backdrop-blur-md"
      style={{ 
        opacity: isFadingOut ? 0 : 1,
        transition: 'opacity 700ms ease-out',
        pointerEvents: isFadingOut ? 'none' : 'auto',
      }}
    >
      <div className="relative flex flex-col items-center justify-center">
        
        {/* Ring 1: The "Oval" Scanner (Rotates on a tilt) */}
        <div 
          className="absolute h-40 w-40 rounded-[100%] border-[3px]"
          style={{ 
            borderColor: 'hsl(var(--primary) / 0.15)',
            animation: 'spin 3s linear infinite' 
          }}
        />
        
        {/* Ring 2: The Active Pulse Ring */}
        <div 
          className="absolute h-36 w-36 rounded-full"
          style={{ 
            borderWidth: '2px',
            borderStyle: 'solid',
            borderTopColor: 'hsl(var(--primary))',
            borderRightColor: 'transparent',
            borderBottomColor: 'transparent',
            borderLeftColor: 'transparent',
            animation: 'spin 1s ease-in-out infinite' 
          }}
        />
        
        {/* Ring 3: The Glowing Core Backdrop */}
        <div 
          className="absolute h-24 w-24 rounded-full"
          style={{
            backgroundColor: 'hsl(var(--primary) / 0.05)',
            boxShadow: '0 0 30px hsl(var(--primary) / 0.2)',
            animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
          }}
        />

        {/* Logo Container */}
        <div 
          className="relative z-10 h-20 w-20 flex items-center justify-center rounded-full bg-background shadow-xl p-4"
          style={{ border: '1px solid hsl(var(--primary) / 0.15)' }}
        >
          <img 
            src={shieldLogo}
            alt="InVision Network" 
            className="h-full w-full object-contain"
          />
        </div>

        {/* Text Layer */}
        <div className="mt-20 text-center space-y-2">
          <h2 className="text-xl font-bold text-foreground tracking-tight">InVision Network</h2>
          
          <div className="flex items-center justify-center gap-2">
            <span className="relative flex h-2 w-2">
              <span 
                className="absolute inline-flex h-full w-full rounded-full opacity-75"
                style={{ 
                  backgroundColor: 'hsl(142 76% 36%)',
                  animation: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite' 
                }}
              />
              <span 
                className="relative inline-flex rounded-full h-2 w-2"
                style={{ backgroundColor: 'hsl(142 71% 45%)' }}
              />
            </span>
            <p 
              className="text-xs font-semibold uppercase tracking-[0.2em]"
              style={{ color: 'hsl(var(--primary))' }}
            >
              Establishing Secure Connection
            </p>
          </div>
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
          50% { opacity: 0.5; }
        }
        @keyframes ping {
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default NeuralShieldLoader;
