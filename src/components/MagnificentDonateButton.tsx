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
      {/* Desktop FAB */}
      <motion.button
        type="button"
        onClick={() => setOpen(true)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="fixed bottom-28 right-6 z-fab hidden md:flex items-center justify-center gap-2 rounded-full shadow-3d-colored hover:shadow-3d-lg transition-all duration-300 border border-white/30 micro-tilt-3d tactile-button overflow-hidden group bg-gradient-to-br from-coral-400 to-lavender-500"
        style={{
          width: isHovered ? '140px' : '60px',
          height: '60px',
        }}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Donate to InVision Network"
      >
        <motion.div
          animate={isHovered ? { scale: [1, 1.1, 1] } : { scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Heart className="w-6 h-6 text-white" fill="white" />
        </motion.div>

        <AnimatePresence>
          {isHovered && (
            <motion.span
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              className="text-white font-bold text-sm whitespace-nowrap"
            >
              Donate
            </motion.span>
          )}
        </AnimatePresence>

        {/* Shine effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent premium-shine-sweep" />
      </motion.button>

      {/* Mobile Pill Button (above call button) */}
      <motion.button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-20 left-4 right-4 z-fab md:hidden flex items-center justify-center gap-3 py-3.5 px-6 rounded-full shadow-lg shadow-coral-400/30 hover:shadow-xl transition-all font-bold text-base text-white border border-white/20 bg-gradient-to-br from-coral-400 to-lavender-500"
        whileTap={{ scale: 0.95 }}
        aria-label="Donate to InVision Network"
      >
        <motion.div
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ repeat: Infinity, duration: 3 }}
        >
          <Heart className="w-5 h-5" fill="white" />
        </motion.div>
        <span>Support Our Mission</span>

        {/* Shine effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent premium-shine-sweep" />
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
