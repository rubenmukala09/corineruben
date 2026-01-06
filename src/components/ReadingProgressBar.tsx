import { useState, useEffect } from "react";

interface ReadingProgressBarProps {
  showPercentage?: boolean;
}

export const ReadingProgressBar = ({ 
  showPercentage = true 
}: ReadingProgressBarProps) => {
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    let ticking = false;
    
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 0;
      setPercentage(progress);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateProgress);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    
    // Defer initial read to avoid forced reflow during paint
    const timeoutId = setTimeout(() => requestAnimationFrame(updateProgress), 100);
    
    return () => {
      window.removeEventListener('scroll', onScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-1">
      <div
        className="h-full bg-gradient-to-r from-primary via-accent to-primary origin-left"
        style={{ transform: `scaleX(${percentage / 100})` }}
      />
      {showPercentage && percentage > 0 && (
        <div className="absolute top-2 right-4 bg-background/90 backdrop-blur-sm border border-border/50 rounded-full px-3 py-1 text-xs font-medium text-foreground shadow-sm animate-fade-in">
          {percentage}% read
        </div>
      )}
    </div>
  );
};

export default ReadingProgressBar;
