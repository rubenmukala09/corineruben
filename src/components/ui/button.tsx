import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl font-semibold ring-offset-background transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 relative overflow-hidden group active:scale-[0.98]",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-primary to-[hsl(260,65%,40%)] text-primary-foreground hover:from-[hsl(260,75%,30%)] hover:to-[hsl(260,60%,45%)] shadow-medium hover:shadow-glow-purple hover:-translate-y-0.5 hover:scale-[1.02] before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/15 before:to-transparent before:-translate-x-full hover:before:translate-x-full before:transition-transform before:duration-700 before:ease-out",
        gold: "bg-secondary text-secondary-foreground hover:bg-[hsl(38,95%,45%)] shadow-medium hover:shadow-glow-gold hover:-translate-y-0.5 hover:scale-[1.02] before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/25 before:to-transparent before:-translate-x-full hover:before:translate-x-full before:transition-transform before:duration-700 before:ease-out",
        teal: "bg-accent text-accent-foreground hover:bg-[hsl(260,55%,55%)] shadow-medium hover:shadow-glow-accent hover:-translate-y-0.5 hover:scale-[1.02] before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/25 before:to-transparent before:-translate-x-full hover:before:translate-x-full before:transition-transform before:duration-700 before:ease-out",
        outline: "border-2 border-primary text-primary bg-transparent hover:bg-primary hover:text-primary-foreground hover:shadow-medium hover:-translate-y-0.5 hover:scale-[1.02] before:absolute before:inset-0 before:bg-gradient-to-r before:from-primary before:to-accent before:-z-10 before:translate-x-[-100%] hover:before:translate-x-0 before:transition-transform before:duration-500 before:ease-out",
        outlineGold: "border-2 border-secondary text-secondary bg-transparent hover:bg-secondary hover:text-secondary-foreground hover:shadow-glow-gold hover:-translate-y-0.5 hover:scale-[1.02] transition-all duration-300 ease-out",
        outlineLight: "border-2 border-white text-white bg-white/10 backdrop-blur-sm hover:bg-white hover:text-primary hover:shadow-glow-purple hover:-translate-y-0.5 hover:scale-[1.02] transition-all duration-300 ease-out",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-medium hover:shadow-strong hover:-translate-y-0.5 hover:scale-[1.02] transition-all duration-300 ease-out",
        secondary: "bg-muted text-foreground hover:bg-muted/80 hover:shadow-soft hover:-translate-y-0.5 hover:scale-[1.02] transition-all duration-300 ease-out",
        ghost: "hover:bg-primary/10 hover:text-primary relative after:absolute after:bottom-0 after:left-1/2 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-primary after:to-accent after:-translate-x-1/2 after:transition-all after:duration-300 after:ease-out hover:after:w-3/4 hover:scale-[1.02]",
        link: "text-primary underline-offset-4 hover:underline hover:scale-[1.02] transition-all duration-200 ease-out",
      },
      size: {
        default: "h-12 px-6 py-3 text-base",
        sm: "h-10 rounded-lg px-4 text-sm",
        lg: "h-14 rounded-xl px-8 text-lg",
        xl: "h-16 rounded-xl px-10 text-lg",
        icon: "h-12 w-12",
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
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
