import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl font-bold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 relative overflow-hidden group active:scale-95",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-primary to-purple-500 text-primary-foreground hover:from-purple-700 hover:to-purple-500 shadow-soft hover:shadow-glow-purple hover:-translate-y-1 hover:scale-105 before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:-translate-x-full hover:before:translate-x-full before:transition-transform before:duration-500",
        gold: "bg-gradient-to-r from-accent to-teal-400 text-accent-foreground hover:from-teal-500 hover:to-teal-400 shadow-soft hover:shadow-glow-teal hover:-translate-y-1 hover:scale-105 before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent before:-translate-x-full hover:before:translate-x-full before:transition-transform before:duration-500",
        outline: "border-2 border-primary text-primary bg-transparent hover:bg-primary hover:text-primary-foreground hover:shadow-medium hover:-translate-y-1 hover:scale-105 before:absolute before:inset-0 before:bg-gradient-to-r before:from-primary before:to-accent before:-z-10 before:translate-x-[-100%] hover:before:translate-x-0 before:transition-transform before:duration-300",
        outlineGold: "border-2 border-accent text-accent bg-transparent hover:bg-accent hover:text-accent-foreground hover:shadow-glow-teal hover:-translate-y-1 hover:scale-105",
        outlineLight: "border-2 border-white text-white bg-white/5 backdrop-blur-sm hover:bg-white hover:text-primary hover:shadow-glow-purple hover:-translate-y-1 hover:scale-105",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-soft hover:shadow-medium hover:-translate-y-0.5 hover:scale-105",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:shadow-soft hover:-translate-y-0.5 hover:scale-105",
        ghost: "hover:bg-primary/10 hover:text-primary relative after:absolute after:bottom-0 after:left-1/2 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-primary after:to-accent after:-translate-x-1/2 after:transition-all hover:after:w-full hover:scale-105",
        link: "text-primary underline-offset-4 hover:underline hover:scale-105",
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
  ({ className, variant, size, asChild = false, onClick, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      // Create ripple effect
      const button = e.currentTarget;
      const ripple = document.createElement('span');
      const rect = button.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      ripple.classList.add('ripple');
      
      button.appendChild(ripple);
      
      setTimeout(() => ripple.remove(), 600);
      
      if (onClick) onClick(e);
    };
    
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        onClick={handleClick}
        {...props}
      />
    )
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
