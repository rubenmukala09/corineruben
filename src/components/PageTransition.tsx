import { ReactNode, forwardRef } from "react";

interface PageTransitionProps {
  children: ReactNode;
  variant?: "fade" | "slide" | "scale" | "slideUp" | "crossfade" | "auto";
}

export const PageTransition = forwardRef<HTMLDivElement, PageTransitionProps>(
  ({ children, variant: _variant = "auto" }, _ref) => {
    return <>{children}</>;
  }
);

PageTransition.displayName = "PageTransition";
