import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Soft Modern Design System Components
 * 
 * These components implement the "Soft Modern" aesthetic:
 * - Floating cards with pure white backgrounds
 * - Heavy rounded corners (rounded-3xl)
 * - Diffused "presence" shadows
 * - Alive micro-interactions on hover
 */

// Soft Card - The floating container with presence shadow
const SoftCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    hover?: boolean;
  }
>(({ className, hover = true, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "bg-white rounded-3xl p-8",
      "shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)]",
      "border border-white/50",
      hover && [
        "transition-all duration-400 ease-out",
        "hover:translate-y-[-8px] hover:scale-[1.02]",
        "hover:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.12)]",
      ],
      className
    )}
    {...props}
  />
));
SoftCard.displayName = "SoftCard";

// Soft Image - Physical photo effect with depth
const SoftImage = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    hover?: boolean;
  }
>(({ className, hover = true, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-2xl overflow-hidden",
      "shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)]",
      "border border-white/50",
      hover && [
        "transition-all duration-400 ease-out",
        "hover:translate-y-[-8px] hover:scale-[1.02]",
        "hover:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.12)]",
      ],
      className
    )}
    {...props}
  >
    {children}
  </div>
));
SoftImage.displayName = "SoftImage";

// Soft Section - Container for page sections
const SoftSection = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
  <section
    ref={ref}
    className={cn(
      "bg-white rounded-3xl p-8 md:p-10",
      "shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)]",
      className
    )}
    {...props}
  />
));
SoftSection.displayName = "SoftSection";

// Soft Button wrapper - adds lift effect
const SoftButton = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "inline-block transition-all duration-300 ease-out",
      "hover:translate-y-[-4px]",
      "hover:shadow-[0_12px_30px_-8px_rgba(0,0,0,0.1)]",
      className
    )}
    {...props}
  >
    {children}
  </div>
));
SoftButton.displayName = "SoftButton";

export { SoftCard, SoftImage, SoftSection, SoftButton };