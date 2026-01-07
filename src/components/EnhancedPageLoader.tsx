import { Shield } from "lucide-react";

interface EnhancedPageLoaderProps {
  message?: string;
}

// Glassmorphism page loader - matches splash screen
export const EnhancedPageLoader = ({ message = "Loading..." }: EnhancedPageLoaderProps) => {
  return (
    <div 
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-6"
      style={{ backgroundColor: '#F8F9FC' }}
    >
      {/* Glassmorphism shield container */}
      <div className="relative">
        {/* Breathing glow */}
        <div 
          className="absolute inset-0 w-20 h-20 rounded-2xl animate-pulse"
          style={{
            background: 'radial-gradient(circle, hsl(var(--primary) / 0.3) 0%, transparent 70%)',
            filter: 'blur(12px)',
            transform: 'scale(1.5)',
          }}
        />
        
        <div 
          className="relative w-20 h-20 rounded-2xl flex items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.6) 100%)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.8)',
            boxShadow: '0 8px 32px rgba(139, 92, 246, 0.25), inset 0 1px 0 rgba(255,255,255,0.9)',
          }}
        >
          <Shield 
            className="w-10 h-10 text-primary animate-pulse" 
            strokeWidth={1.5}
            style={{ filter: 'drop-shadow(0 0 10px hsl(var(--primary) / 0.5))' }}
          />
        </div>
      </div>
      
      <span className="text-sm font-medium text-muted-foreground tracking-wide animate-pulse">
        {message}
      </span>
    </div>
  );
};
