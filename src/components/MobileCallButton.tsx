import { Phone } from "lucide-react";
import { motion } from "framer-motion";

/**
 * Sticky mobile "Call Now" button for seniors
 * Always visible at bottom of screen on mobile devices
 */
const MobileCallButton = () => {
  return (
    <motion.a
      href="tel:9373018749"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
      className="fixed bottom-4 left-4 right-4 z-50 md:hidden flex items-center justify-center gap-3 bg-primary text-primary-foreground py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow font-semibold text-lg"
      aria-label="Call Now: (937) 301-8749"
    >
      <Phone className="w-6 h-6" />
      <span>Call Now: (937) 301-8749</span>
    </motion.a>
  );
};

export default MobileCallButton;
