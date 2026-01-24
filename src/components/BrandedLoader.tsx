import { Shield } from "lucide-react";

interface BrandedLoaderProps {
  message?: string;
  fullScreen?: boolean;
}

// Pure CSS loader - no framer-motion overhead
export const BrandedLoader = ({ 
  message = "Loading", 
  fullScreen = true 
}: BrandedLoaderProps) => {
  return (
    <div
      className={`flex items-center justify-center bg-background/95 animate-fade-in ${
        fullScreen ? "fixed inset-0 z-[9999]" : "py-10"
      }`}
    >
      <div className="relative flex flex-col items-center justify-center">
        {/* Outer ring */}
        <div className="absolute h-20 w-20 rounded-full border border-primary/20 animate-spin-slow" />
        
        {/* Inner ring */}
        <div className="absolute h-14 w-14 rounded-full border-2 border-t-primary border-r-transparent border-b-primary border-l-transparent animate-spin" />
        
        {/* Core */}
        <div 
          className="h-10 w-10 rounded-full bg-gradient-to-tr from-primary to-accent flex items-center justify-center animate-pulse"
        >
          <Shield className="w-5 h-5 text-white" strokeWidth={2} />
        </div>

        {/* Text */}
        <p className="mt-16 text-xs font-medium tracking-widest text-primary uppercase animate-pulse">
          {message}
        </p>
      </div>
    </div>
  );
};
