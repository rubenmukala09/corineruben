import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl font-semibold ring-offset-background transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 relative overflow-hidden select-none",
  {
    variants: {
      variant: {
        // Skeuomorphism 2.0 - Tactile, physical buttons with realistic depth
        default: [
          "bg-gradient-to-b from-primary via-primary to-primary/90 text-primary-foreground",
          "shadow-[0_1px_2px_rgba(0,0,0,0.07),0_2px_4px_rgba(0,0,0,0.07),0_4px_8px_rgba(0,0,0,0.07),inset_0_1px_0_rgba(255,255,255,0.15),inset_0_-1px_0_rgba(0,0,0,0.1)]",
          "hover:shadow-[0_2px_4px_rgba(0,0,0,0.08),0_4px_8px_rgba(0,0,0,0.08),0_8px_16px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.2),inset_0_-1px_0_rgba(0,0,0,0.1)]",
          "hover:-translate-y-0.5",
          "active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.15),inset_0_1px_2px_rgba(0,0,0,0.1)]",
          "active:translate-y-0",
        ].join(" "),
        gold: [
          "bg-gradient-to-b from-accent via-accent to-accent/90 text-accent-foreground",
          "shadow-[0_1px_2px_rgba(0,0,0,0.07),0_2px_4px_rgba(0,0,0,0.07),0_4px_8px_rgba(0,0,0,0.07),inset_0_1px_0_rgba(255,255,255,0.2),inset_0_-1px_0_rgba(0,0,0,0.08)]",
          "hover:shadow-[0_2px_4px_rgba(0,0,0,0.08),0_4px_8px_rgba(0,0,0,0.08),0_8px_16px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.25),inset_0_-1px_0_rgba(0,0,0,0.08)]",
          "hover:-translate-y-0.5",
          "active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.12),inset_0_1px_2px_rgba(0,0,0,0.08)]",
          "active:translate-y-0",
        ].join(" "),
        outline: [
          "border-2 border-border/60 text-primary bg-gradient-to-b from-white to-gray-50/80",
          "shadow-[0_1px_2px_rgba(0,0,0,0.04),0_2px_4px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-1px_0_rgba(0,0,0,0.03)]",
          "hover:shadow-[0_2px_4px_rgba(0,0,0,0.06),0_4px_8px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,1),inset_0_-1px_0_rgba(0,0,0,0.04)]",
          "hover:-translate-y-0.5 hover:border-primary/40",
          "active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.08),inset_0_1px_2px_rgba(0,0,0,0.05)]",
          "active:translate-y-0 active:bg-gradient-to-b active:from-gray-50 active:to-gray-100/80",
        ].join(" "),
        outlineGold: [
          "border-2 border-accent/40 text-accent bg-gradient-to-b from-white to-orange-50/30",
          "shadow-[0_1px_2px_rgba(0,0,0,0.04),0_2px_4px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.9)]",
          "hover:shadow-[0_2px_4px_rgba(0,0,0,0.06),0_4px_8px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,1)]",
          "hover:-translate-y-0.5 hover:border-accent/60",
          "active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.08)]",
          "active:translate-y-0",
        ].join(" "),
        outlineLight: [
          "border-2 border-white/40 text-white bg-white/10 backdrop-blur-sm",
          "shadow-[0_1px_2px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.15)]",
          "hover:shadow-[0_2px_4px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.2)]",
          "hover:-translate-y-0.5 hover:bg-white/15",
          "active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]",
          "active:translate-y-0",
        ].join(" "),
        destructive: [
          "bg-gradient-to-b from-destructive via-destructive to-destructive/90 text-destructive-foreground",
          "shadow-[0_1px_2px_rgba(0,0,0,0.07),0_2px_4px_rgba(0,0,0,0.07),0_4px_8px_rgba(0,0,0,0.07),inset_0_1px_0_rgba(255,255,255,0.12),inset_0_-1px_0_rgba(0,0,0,0.1)]",
          "hover:shadow-[0_2px_4px_rgba(0,0,0,0.08),0_4px_8px_rgba(0,0,0,0.08),0_8px_16px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.15)]",
          "hover:-translate-y-0.5",
          "active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]",
          "active:translate-y-0",
        ].join(" "),
        secondary: [
          "bg-gradient-to-b from-gray-50 to-gray-100/80 text-secondary-foreground border border-gray-200/60",
          "shadow-[0_1px_2px_rgba(0,0,0,0.04),0_2px_4px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.95)]",
          "hover:shadow-[0_2px_4px_rgba(0,0,0,0.06),0_4px_8px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,1)]",
          "hover:-translate-y-0.5",
          "active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.08)]",
          "active:translate-y-0 active:from-gray-100 active:to-gray-150/80",
        ].join(" "),
        ghost: [
          "hover:bg-gradient-to-b hover:from-gray-50 hover:to-gray-100/50 hover:text-primary",
          "hover:shadow-[0_1px_2px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.8)]",
          "active:shadow-[inset_0_1px_3px_rgba(0,0,0,0.08)]",
        ].join(" "),
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-6 py-2.5 text-sm",
        sm: "h-9 rounded-xl px-4 text-sm",
        lg: "h-12 rounded-2xl px-8 text-base",
        xl: "h-14 rounded-2xl px-10 text-lg",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
