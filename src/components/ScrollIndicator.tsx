import { ChevronDown } from "lucide-react";

const ScrollIndicator = () => {
  const scrollToContent = () => {
    // Use rAF to avoid forced reflow from innerHeight read
    requestAnimationFrame(() => {
      window.scrollTo({
        top: window.innerHeight - 80, // Account for navbar height
        behavior: 'smooth'
      });
    });
  };

  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-30 animate-smooth-bounce">
      <button
        onClick={scrollToContent}
        className="flex flex-col items-center gap-2 text-white/80 hover:text-white transition-colors duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 rounded-full p-2"
        aria-label="Scroll down to see more content"
      >
        <span className="text-sm font-medium tracking-wider">SCROLL</span>
        <div className="w-8 h-8 rounded-full border-2 border-white/50 hover:border-white flex items-center justify-center transition-colors duration-300">
          <ChevronDown className="w-5 h-5" />
        </div>
      </button>
    </div>
  );
};

export default ScrollIndicator;
