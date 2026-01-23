import { Shield } from "lucide-react";

interface EnhancedPageLoaderProps {
  message?: string;
}

// Breathing AI Orb page loader
export const EnhancedPageLoader = ({ message = "System Initializing" }: EnhancedPageLoaderProps) => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/80 backdrop-blur-md">
      {/* Animation Wrapper */}
      <div className="relative flex flex-col items-center justify-center">
        
        {/* Outer Orbit Ring (Spinning slowly) */}
        <div className="absolute h-32 w-32 rounded-full border border-primary/20 animate-[spin_3s_linear_infinite]" />
        
        {/* Middle Pulsing Ring (The "Oval" effect) */}
        <div className="absolute h-24 w-24 rounded-full border-2 border-t-primary border-r-transparent border-b-primary border-l-transparent animate-[spin_1.5s_ease-in-out_infinite]" />
        
        {/* Inner Glowing Core (The "AI Bubble") */}
        <div 
          className="h-16 w-16 rounded-full bg-gradient-to-tr from-primary to-accent flex items-center justify-center animate-pulse"
          style={{ boxShadow: '0 0 30px hsl(var(--primary) / 0.5)' }}
        >
          <Shield className="w-8 h-8 text-white" strokeWidth={1.5} />
        </div>

        {/* Professional Loading Text */}
        <div className="mt-24 text-center">
          <p className="text-sm font-medium tracking-[0.2em] text-primary uppercase animate-pulse">
            {message}
          </p>
        </div>
        
      </div>
    </div>
  );
};
