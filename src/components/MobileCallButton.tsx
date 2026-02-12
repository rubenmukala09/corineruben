import { Phone } from "lucide-react";
import { SITE } from "@/config/site";

/**
 * Sticky mobile "Call Now" button for seniors
 * Always visible at bottom of screen on mobile devices
 * Note: Removed framer-motion animation to improve LCP score
 */
const MobileCallButton = () => {
  return (
    <a
      href={SITE.phone.tel}
      className="fixed bottom-4 left-4 right-4 z-fab md:hidden flex items-center justify-center gap-3 py-4 px-6 rounded-full shadow-lg shadow-coral-400/30 hover:shadow-xl transition-all font-bold text-lg text-white bg-gradient-to-br from-coral-400 to-lavender-500"
      aria-label={`Call Now: ${SITE.phone.display}`}
    >
      <div className="p-2 bg-white/20 rounded-full">
        <Phone className="w-5 h-5" />
      </div>
      <span className="whitespace-nowrap">{SITE.phone.display}</span>
    </a>
  );
};

export default MobileCallButton;
