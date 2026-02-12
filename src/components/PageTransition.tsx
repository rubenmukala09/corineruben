import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PageTransitionProps {
  children: ReactNode;
  variant?: "fade" | "slide" | "scale" | "slideUp" | "crossfade" | "auto";
}

export const PageTransition = ({
  children,
  variant = "auto"
}: PageTransitionProps) => {
  const variantClass = variant === "fade"
    ? "animate-fade-in"
    : "animate-slide-up";

  return (
    <div className={cn(variantClass)}>
      {children}
    </div>
  );
};
