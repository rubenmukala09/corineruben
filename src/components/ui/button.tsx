import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl font-semibold ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 select-none transition-all duration-200",
  {
    variants: {
      variant: {
        default: [
          "bg-gradient-to-r from-primary via-primary to-primary/90 text-primary-foreground",
          "border border-primary/20",
          "shadow-[0_10px_22px_-14px_hsl(var(--primary)/0.65)]",
          "hover:brightness-105",
        ].join(" "),
        gold: [
          "bg-gradient-to-r from-coral-400 to-coral-500 text-white",
          "border border-coral-300/30",
          "shadow-[0_10px_22px_-14px_hsl(var(--coral-600)/0.7)]",
          "hover:brightness-105",
        ].join(" "),
        outline: [
          "bg-white/85 text-foreground border border-border",
          "shadow-sm hover:bg-white",
        ].join(" "),
        outlineGold: [
          "bg-coral-100/70 text-coral-600 border border-coral-200",
          "shadow-sm hover:bg-coral-100",
        ].join(" "),
        outlineLight: [
          "bg-primary/10 text-primary border border-primary/20",
          "shadow-sm hover:bg-primary/15",
        ].join(" "),
        destructive: [
          "bg-gradient-to-r from-destructive to-destructive/90 text-destructive-foreground",
          "border border-destructive/20",
          "shadow-[0_10px_22px_-14px_hsl(var(--destructive)/0.7)]",
          "hover:brightness-105",
        ].join(" "),
        secondary: [
          "bg-secondary text-secondary-foreground border border-border/70",
          "shadow-sm hover:bg-secondary/85",
        ].join(" "),
        ghost: "hover:bg-muted/50 hover:text-foreground",
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
