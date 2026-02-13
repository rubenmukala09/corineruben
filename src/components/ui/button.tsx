import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl font-semibold ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 select-none micro-bounce active:scale-95 active:brightness-95 transition-transform",
  {
    variants: {
      variant: {
        default: [
          "bg-gradient-to-b from-primary to-primary/90 text-primary-foreground",
          "shadow-3d hover:shadow-3d-lg",
          "hover:-translate-y-1",
        ].join(" "),
        gold: [
          "bg-gradient-to-b from-coral-400 to-coral-500 text-white",
          "shadow-3d-colored",
          "hover:from-coral-300 hover:to-coral-400",
          "hover:-translate-y-1",
        ].join(" "),
        outline: ["glass-light text-foreground", "hover:-translate-y-1"].join(
          " ",
        ),
        outlineGold: [
          "glass-colored text-coral-600 border border-coral-200",
          "hover:-translate-y-1",
        ].join(" "),
        outlineLight: ["glass-dark text-white", "hover:-translate-y-1"].join(
          " ",
        ),
        destructive: [
          "bg-gradient-to-b from-destructive to-destructive/90 text-destructive-foreground",
          "shadow-3d",
          "hover:-translate-y-1",
        ].join(" "),
        secondary: [
          "glass-colored text-lavender-700",
          "hover:-translate-y-1",
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
