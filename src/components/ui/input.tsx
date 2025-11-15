import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex min-h-[48px] w-full rounded-md border border-input bg-background px-3 py-2 text-[16px] sm:text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
          "form-input transition-all duration-300",
          "focus-visible:outline-none focus-visible:border-2 focus-visible:border-primary focus-visible:shadow-[0_0_0_3px_hsl(var(--primary)/0.1)]",
          "transform-gpu will-change-[border-color,box-shadow]",
          "touch-manipulation",
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
