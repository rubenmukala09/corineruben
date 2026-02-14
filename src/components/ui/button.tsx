import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl font-bold ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 select-none transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden tracking-wide",
  {
    variants: {
      variant: {
        default: [
          "bg-gradient-to-br from-primary via-primary to-primary/90 text-white",
          "border border-white/20",
          "shadow-[0_2px_8px_hsl(var(--primary)/0.35),0_8px_20px_-6px_hsl(var(--primary)/0.25),inset_0_1px_0_hsl(0_0%_100%/0.2),inset_0_-1px_0_hsl(0_0%_0%/0.1)]",
          "hover:shadow-[0_4px_14px_hsl(var(--primary)/0.45),0_12px_28px_-6px_hsl(var(--primary)/0.3),inset_0_1px_0_hsl(0_0%_100%/0.25)]",
          "hover:brightness-110",
          "[text-shadow:0_1px_3px_rgba(0,0,0,0.35)]",
        ].join(" "),
        gold: [
          "bg-gradient-to-br from-coral-400 via-coral-500 to-coral-600 text-white",
          "border border-white/20",
          "shadow-[0_2px_8px_hsl(var(--coral-500)/0.35),0_8px_20px_-6px_hsl(var(--coral-500)/0.25),inset_0_1px_0_hsl(0_0%_100%/0.2),inset_0_-1px_0_hsl(0_0%_0%/0.1)]",
          "hover:shadow-[0_4px_14px_hsl(var(--coral-500)/0.45),0_12px_28px_-6px_hsl(var(--coral-500)/0.3)]",
          "hover:brightness-110",
          "[text-shadow:0_1px_3px_rgba(0,0,0,0.35)]",
        ].join(" "),
        outline: [
          "bg-white text-foreground",
          "border-2 border-border/80",
          "shadow-[0_1px_4px_hsl(258_20%_20%/0.1),inset_0_1px_0_hsl(0_0%_100%/0.9)]",
          "hover:bg-muted hover:border-primary/40 hover:text-primary hover:shadow-[0_2px_8px_hsl(var(--primary)/0.15),0_6px_16px_-4px_hsl(var(--lavender-400)/0.14)]",
          "[text-shadow:none]",
        ].join(" "),
        outlineGold: [
          "bg-coral-100/60 backdrop-blur-sm text-coral-600",
          "border border-coral-200/60",
          "shadow-[0_1px_3px_hsl(var(--coral-400)/0.08),inset_0_1px_0_hsl(0_0%_100%/0.8)]",
          "hover:bg-coral-100 hover:border-coral-300/50 hover:shadow-[0_2px_8px_hsl(var(--coral-400)/0.12)]",
        ].join(" "),
        outlineLight: [
          "bg-primary/8 backdrop-blur-sm text-primary",
          "border border-primary/15",
          "shadow-[0_1px_3px_hsl(var(--primary)/0.06),inset_0_1px_0_hsl(0_0%_100%/0.7)]",
          "hover:bg-primary/12 hover:border-primary/25 hover:shadow-[0_2px_8px_hsl(var(--primary)/0.1)]",
        ].join(" "),
        destructive: [
          "bg-gradient-to-br from-destructive via-destructive to-destructive/85 text-destructive-foreground",
          "border border-white/15",
          "shadow-[0_2px_8px_hsl(var(--destructive)/0.35),0_8px_20px_-6px_hsl(var(--destructive)/0.25),inset_0_1px_0_hsl(0_0%_100%/0.2)]",
          "hover:shadow-[0_4px_14px_hsl(var(--destructive)/0.45),0_12px_28px_-6px_hsl(var(--destructive)/0.3)]",
          "hover:brightness-110",
        ].join(" "),
        secondary: [
          "bg-secondary/90 backdrop-blur-sm text-secondary-foreground",
          "border border-border/50",
          "shadow-[0_1px_3px_hsl(258_20%_20%/0.04),inset_0_1px_0_hsl(0_0%_100%/0.85)]",
          "hover:bg-secondary/80 hover:shadow-[0_2px_8px_hsl(var(--lavender-400)/0.08)]",
        ].join(" "),
        ghost: "hover:bg-muted/50 hover:text-foreground hover:shadow-[0_1px_4px_hsl(258_20%_20%/0.04)]",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-5 py-2.5 text-base",
        sm: "h-10 rounded-md px-4 text-sm",
        lg: "h-12 rounded-lg px-6 text-base",
        xl: "h-14 rounded-lg px-8 text-lg",
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
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
