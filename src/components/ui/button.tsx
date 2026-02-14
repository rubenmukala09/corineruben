import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl font-semibold ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 select-none transition-[background-color,border-color,color,box-shadow,transform,filter] duration-200 hover:-translate-y-0.5 active:translate-y-0",
  {
    variants: {
      variant: {
        default: [
          "kabello-action-btn bg-gradient-to-r from-primary to-accent text-primary-foreground",
          "border border-white/15",
          "shadow-[0_12px_26px_-16px_hsl(var(--primary)/0.8)]",
          "hover:brightness-105 hover:shadow-[0_16px_30px_-14px_hsl(var(--accent)/0.7)]",
        ].join(" "),
        gold: [
          "bg-primary text-white",
          "border border-primary/40",
          "shadow-[0_12px_26px_-16px_hsl(var(--primary)/0.75)]",
          "hover:bg-primary/90",
        ].join(" "),
        outline: [
          "bg-white/[0.03] text-foreground border border-white/15 backdrop-blur-sm",
          "shadow-[0_8px_20px_-16px_rgba(0,0,0,0.8)] hover:bg-white/[0.06]",
        ].join(" "),
        outlineGold: [
          "bg-primary/12 text-primary border border-primary/40",
          "shadow-[0_8px_20px_-16px_hsl(var(--primary)/0.7)] hover:bg-primary/16",
        ].join(" "),
        outlineLight: [
          "bg-white/[0.02] text-foreground border border-white/12",
          "shadow-[0_8px_20px_-16px_rgba(0,0,0,0.75)] hover:bg-white/[0.05]",
        ].join(" "),
        destructive: [
          "bg-gradient-to-r from-destructive to-destructive/90 text-destructive-foreground",
          "border border-destructive/30",
          "shadow-[0_12px_26px_-16px_hsl(var(--destructive)/0.75)]",
          "hover:brightness-105",
        ].join(" "),
        secondary: [
          "bg-secondary/80 text-secondary-foreground border border-white/12",
          "shadow-[0_8px_20px_-16px_rgba(0,0,0,0.75)] hover:bg-secondary",
        ].join(" "),
        ghost:
          "text-muted-foreground hover:bg-white/[0.06] hover:text-foreground",
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
