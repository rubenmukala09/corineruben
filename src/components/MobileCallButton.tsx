import { Phone } from "lucide-react";

/**
 * Sticky mobile "Call Now" button for seniors
 * Always visible at bottom of screen on mobile devices
 * Note: Removed framer-motion animation to improve LCP score
 */
const MobileCallButton = () => {
  return (
    <a
      href="tel:9373018749"
      className="fixed bottom-4 left-4 right-4 z-50 md:hidden flex items-center justify-center gap-3 py-4 px-6 rounded-full shadow-lg shadow-coral-400/30 hover:shadow-xl transition-all font-bold text-lg text-white"
      style={{ background: 'linear-gradient(135deg, #F8926A 0%, #BB81B5 100%)' }}
      aria-label="Call Now: (937) 301-8749"
    >
      <div className="p-2 bg-white/20 rounded-full">
        <Phone className="w-5 h-5" />
      </div>
      <span className="whitespace-nowrap">(937) 301-8749</span>
    </a>
  );
};

export default MobileCallButton;
