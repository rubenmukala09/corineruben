import { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
  variant?: "fade" | "slide" | "scale" | "slideUp" | "crossfade" | "auto";
}

// EMERGENCY STABILIZATION: Zero animations, instant render
export const PageTransition = ({ children }: PageTransitionProps) => {
  return (
    <div className="min-h-screen bg-[#0B0F19]">
      {children}
    </div>
  );
};
