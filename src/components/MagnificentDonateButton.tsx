import { useState } from "react";
import { Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { DonationModal } from "./DonationModal";
import { useLocation } from "react-router-dom";

const HIDDEN_PATHS = ["/admin", "/portal"];

export const MagnificentDonateButton = () => {
  const [open, setOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const location = useLocation();

  // Hide on admin/portal pages
  if (HIDDEN_PATHS.some(path => location.pathname.startsWith(path))) {
    return null;
  }

  return (
    <>
      {/* Unified Donate Button - Desktop & Mobile */}
      <motion.button
        type="button"
        onClick={() => setOpen(true)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="fixed bottom-28 md:bottom-28 left-4 right-4 md:left-auto md:right-6 md:w-auto max-w-[calc(100vw-2rem)] z-fab flex items-center justify-center gap-2 md:gap-2 py-3 md:py-0 px-6 md:px-0 rounded-full shadow-3d-colored hover:shadow-3d-lg transition-all duration-300 border border-white/30 md:border-white/30 micro-tilt-3d tactile-button overflow-hidden group bg-gradient-to-br from-coral-400 to-lavender-500"
        style={{
          width: isHovered ? '140px' : undefined,
          height: '56px',
        }}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Donate to InVision Network"
      >
        <motion.div
          animate={isHovered ? { scale: [1, 1.1, 1] } : { scale: 1 }}
          transition={{ duration: 0.5 }}
          className="md:absolute md:left-1/2 md:-translate-x-1/2"
        >
          <Heart className="w-5 h-5 md:w-6 md:h-6 text-white" fill="white" />
        </motion.div>

        {/* Desktop: Show on hover */}
        <AnimatePresence>
          {isHovered && (
            <motion.span
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              className="hidden md:inline text-white font-bold text-sm whitespace-nowrap"
            >
              Donate
            </motion.span>
          )}
        </AnimatePresence>

        {/* Mobile: Always show text */}
        <span className="md:hidden text-white font-bold text-base">Support Our Mission</span>

        {/* Shine effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent premium-shine-sweep" />
      </motion.button>

      {/* Donation Modal */}
      <DonationModal
        open={open}
        onOpenChange={setOpen}
        type="general"
      />
    </>
  );
};
