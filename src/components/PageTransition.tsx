import { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
  variant?: "fade" | "slide" | "scale" | "slideUp" | "crossfade" | "auto";
}

// Zero-overhead page wrapper
export const PageTransition = ({ children }: PageTransitionProps) => (
  <>{children}</>
);
