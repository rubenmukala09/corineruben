import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl font-semibold ring-offset-background transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 relative overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-primary to-primary/90 text-primary-foreground shadow-[0_4px_20px_-4px_rgba(0,0,0,0.15)] hover:shadow-[0_12px_30px_-8px_rgba(0,0,0,0.2)] hover:from-primary/95 hover:to-accent/80 hover:-translate-y-1 active:translate-y-0 active:scale-[0.98]",
        gold: "bg-gradient-to-r from-accent to-accent/90 text-accent-foreground shadow-[0_4px_20px_-4px_rgba(0,0,0,0.15)] hover:shadow-[0_12px_30px_-8px_rgba(0,0,0,0.2)] hover:from-accent/95 hover:to-teal-500/80 hover:-translate-y-1 active:translate-y-0 active:scale-[0.98]",
        outline: "border-2 border-primary/30 text-primary bg-white shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] hover:border-primary hover:bg-primary/5 hover:-translate-y-1 hover:shadow-[0_12px_30px_-8px_rgba(0,0,0,0.1)] active:translate-y-0 active:scale-[0.98]",
        outlineGold: "border-2 border-accent/30 text-accent bg-white shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] hover:border-accent hover:bg-accent/5 hover:-translate-y-1 hover:shadow-[0_12px_30px_-8px_rgba(0,0,0,0.1)] active:translate-y-0 active:scale-[0.98]",
        outlineLight: "border-2 border-white/40 text-white bg-white/5 backdrop-blur-sm hover:border-white hover:bg-white/10 hover:-translate-y-1 active:translate-y-0 active:scale-[0.98]",
        destructive: "bg-destructive text-destructive-foreground shadow-[0_4px_20px_-4px_rgba(0,0,0,0.15)] hover:bg-destructive/90 hover:shadow-[0_12px_30px_-8px_rgba(0,0,0,0.2)] hover:-translate-y-1 active:translate-y-0 active:scale-[0.98]",
        secondary: "bg-white text-secondary-foreground shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] hover:bg-secondary/80 hover:shadow-[0_12px_30px_-8px_rgba(0,0,0,0.1)] hover:-translate-y-1 active:translate-y-0 active:scale-[0.98]",
        ghost: "hover:bg-primary/10 hover:text-primary active:scale-[0.98]",
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
