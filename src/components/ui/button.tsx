import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl font-semibold ring-offset-background transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 select-none",
  {
    variants: {
      variant: {
        default: [
          "bg-gradient-to-b from-primary to-primary/90 text-primary-foreground",
          "shadow-[0_2px_4px_rgba(0,0,0,0.12),0_4px_8px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.15),inset_0_-1px_0_rgba(0,0,0,0.1)]",
          "hover:shadow-[0_4px_8px_rgba(0,0,0,0.15),0_8px_16px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.2),inset_0_-1px_0_rgba(0,0,0,0.1)]",
          "hover:-translate-y-0.5",
          "active:translate-y-0 active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.2),inset_0_1px_2px_rgba(0,0,0,0.15)]"
        ].join(" "),
        gold: [
          "bg-gradient-to-b from-coral-400 to-coral-500 text-white",
          "shadow-[0_2px_4px_hsl(var(--coral-600)/0.25),0_4px_8px_hsl(var(--coral-600)/0.15),inset_0_1px_0_hsl(var(--coral-300)/0.4),inset_0_-1px_0_hsl(var(--coral-600)/0.3)]",
          "hover:from-coral-300 hover:to-coral-400",
          "hover:shadow-[0_4px_8px_hsl(var(--coral-600)/0.3),0_8px_16px_hsl(var(--coral-600)/0.2),inset_0_1px_0_hsl(var(--coral-200)/0.5),inset_0_-1px_0_hsl(var(--coral-600)/0.3)]",
          "hover:-translate-y-0.5",
          "active:translate-y-0 active:shadow-[inset_0_2px_4px_hsl(var(--coral-600)/0.3),inset_0_1px_2px_hsl(var(--coral-700)/0.2)]"
        ].join(" "),
        outline: [
          "bg-gradient-to-b from-white to-slate-50 text-foreground border border-slate-200",
          "shadow-[0_1px_2px_rgba(0,0,0,0.06),0_2px_4px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,1),inset_0_-1px_0_rgba(0,0,0,0.04)]",
          "hover:from-white hover:to-slate-100",
          "hover:shadow-[0_2px_4px_rgba(0,0,0,0.08),0_4px_8px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,1),inset_0_-1px_0_rgba(0,0,0,0.04)]",
          "hover:-translate-y-0.5",
          "active:translate-y-0 active:shadow-[inset_0_1px_3px_rgba(0,0,0,0.1)]"
        ].join(" "),
        outlineGold: [
          "bg-gradient-to-b from-coral-50 to-white text-coral-600 border border-coral-200",
          "shadow-[0_1px_2px_hsl(var(--coral-400)/0.1),inset_0_1px_0_rgba(255,255,255,0.9)]",
          "hover:from-coral-100 hover:to-coral-50",
          "hover:shadow-[0_2px_4px_hsl(var(--coral-400)/0.15),inset_0_1px_0_rgba(255,255,255,1)]",
          "hover:-translate-y-0.5"
        ].join(" "),
        outlineLight: [
          "bg-white/10 text-white border border-white/30 backdrop-blur-sm",
          "shadow-[0_2px_4px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.2)]",
          "hover:bg-white/20 hover:border-white/40",
          "hover:shadow-[0_4px_8px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.3)]",
          "hover:-translate-y-0.5"
        ].join(" "),
        destructive: [
          "bg-gradient-to-b from-destructive to-destructive/90 text-destructive-foreground",
          "shadow-[0_2px_4px_rgba(220,38,38,0.25),0_4px_8px_rgba(220,38,38,0.15),inset_0_1px_0_rgba(255,255,255,0.15)]",
          "hover:shadow-[0_4px_8px_rgba(220,38,38,0.3),0_8px_16px_rgba(220,38,38,0.2)]",
          "hover:-translate-y-0.5",
          "active:translate-y-0 active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]"
        ].join(" "),
        secondary: [
          "bg-gradient-to-b from-lavender-100 to-lavender-200 text-lavender-700",
          "shadow-[0_1px_2px_hsl(var(--lavender-400)/0.15),inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-1px_0_hsl(var(--lavender-300)/0.3)]",
          "hover:from-lavender-50 hover:to-lavender-100",
          "hover:shadow-[0_2px_4px_hsl(var(--lavender-400)/0.2),inset_0_1px_0_rgba(255,255,255,1)]",
          "hover:-translate-y-0.5"
        ].join(" "),
        ghost: "hover:bg-muted/50 hover:text-foreground hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.5)]",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2 text-sm",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-11 rounded-lg px-6 text-base",
        xl: "h-12 rounded-lg px-8 text-base",
        icon: "h-10 w-10",
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
