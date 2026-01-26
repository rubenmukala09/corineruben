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
      className="fixed bottom-4 left-4 right-4 z-50 md:hidden flex items-center justify-center gap-3 bg-primary text-white py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow font-semibold text-lg"
      aria-label="Call Now: (937) 301-8749"
    >
      <Phone className="w-6 h-6" />
      <span>Call Now: (937) 301-8749</span>
    </a>
  );
};

export default MobileCallButton;
