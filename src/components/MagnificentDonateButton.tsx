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
  if (HIDDEN_PATHS.some((path) => location.pathname.startsWith(path))) {
    return null;
  }

  return (
    <>
      {/* Unified Donate Button - Desktop & Mobile */}
      










































      {/* Donation Modal */}
      <DonationModal
        open={open}
        onOpenChange={setOpen}
        type="general" />

    </>);

};