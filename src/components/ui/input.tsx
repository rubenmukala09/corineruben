import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          // Skeuomorphism 2.0 - Inset, recessed input field
          "flex min-h-[48px] w-full rounded-xl border border-gray-300/80 px-4 py-3 text-[16px] sm:text-base",
          "bg-gradient-to-b from-gray-50/80 to-white",
          "shadow-[inset_0_1px_3px_rgba(0,0,0,0.08),inset_0_2px_6px_rgba(0,0,0,0.04),0_1px_0_rgba(255,255,255,0.8)]",
          "ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
          "placeholder:text-muted-foreground",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "transition-all duration-200 ease-out",
          "focus-visible:outline-none focus-visible:border-primary/50",
          "focus-visible:shadow-[inset_0_1px_3px_rgba(0,0,0,0.08),inset_0_2px_6px_rgba(0,0,0,0.04),0_0_0_3px_hsl(var(--primary)/0.1),0_1px_0_rgba(255,255,255,0.8)]",
          "hover:border-gray-400/80",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };