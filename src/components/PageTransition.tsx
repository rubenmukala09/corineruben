import { ReactNode, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

interface PageTransitionProps {
  children: ReactNode;
  variant?: "fade" | "slide" | "scale" | "slideUp" | "crossfade" | "auto";
}

// Instant page transition - no delays, no blinking
export const PageTransition = ({ children }: PageTransitionProps) => {
  return (
    <div className="min-h-screen">
      {children}
    </div>
  );
};
