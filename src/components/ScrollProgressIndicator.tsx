import { useEffect, useState, useCallback } from "react";

export const ScrollProgressIndicator = () => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = docHeight > 0 ? scrollTop / docHeight : 0;
    setProgress(Math.min(scrollProgress, 1));
    setIsVisible(scrollTop > 100);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const circumference = 2 * Math.PI * 20;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <>
      {/* Top progress bar */}
      <div
        className="fixed top-0 left-0 right-0 h-1 z-[100] origin-left"
        style={{
          transform: `scaleX(${progress})`,
          background:
            "linear-gradient(90deg, hsl(var(--primary)) 0%, hsl(var(--accent)) 50%, hsl(265 55% 42%) 100%)",
        }}
      />

      {/* Glowing effect underneath */}
      <div
        className="fixed top-0 left-0 right-0 h-2 z-[99] origin-left blur-sm opacity-50"
        style={{
          transform: `scaleX(${progress})`,
          background:
            "linear-gradient(90deg, hsl(var(--primary)) 0%, hsl(var(--accent)) 100%)",
        }}
      />

      {/* Scroll to top button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full glass-heavy shadow-3d flex items-center justify-center hover:shadow-3d-lg transition-all duration-300 group ${
          isVisible ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-75 pointer-events-none"
        }`}
        aria-label="Scroll to top"
      >
        {/* Circular progress around button */}
        <svg className="absolute inset-0 w-12 h-12 -rotate-90">
          <circle
            cx="24"
            cy="24"
            r="20"
            fill="none"
            stroke="url(#progressGradient)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="opacity-80 transition-[stroke-dashoffset] duration-100"
          />
          <defs>
            <linearGradient
              id="progressGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="hsl(var(--primary))" />
              <stop offset="100%" stopColor="hsl(var(--accent))" />
            </linearGradient>
          </defs>
        </svg>

        {/* Arrow icon */}
        <svg
          className="w-5 h-5 text-foreground group-hover:text-primary transition-colors"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </button>
    </>
  );
};

export default ScrollProgressIndicator;
