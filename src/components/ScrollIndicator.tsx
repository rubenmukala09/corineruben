import { ChevronDown } from "lucide-react";

const ScrollIndicator = () => {
  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight - 80, // Account for navbar height
      behavior: 'smooth'
    });
  };

  return (
    <button
      onClick={scrollToContent}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/80 hover:text-white transition-all duration-300 group cursor-pointer animate-bounce hover:animate-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 rounded-full p-2"
      aria-label="Scroll down to see more content"
    >
      <span className="text-sm font-medium tracking-wider">SCROLL</span>
      <div className="w-8 h-8 rounded-full border-2 border-white/50 flex items-center justify-center group-hover:border-white group-hover:scale-110 transition-all duration-300">
        <ChevronDown className="w-5 h-5" />
      </div>
    </button>
  );
};

export default ScrollIndicator;
