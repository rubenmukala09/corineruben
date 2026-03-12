/* eslint-disable react-refresh/only-export-components */
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  // Base: all buttons get cursor + press feel + focus ring
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium cursor-pointer select-none ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.97] active:brightness-95 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        // Maps to the design-system pill buttons
        default:     "btn-primary",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-full px-6 py-2.5 font-medium shadow-sm",
        outline:     "btn-outline",
        secondary:   "btn-secondary",
        // Ghost — subtle hover tint, no border
        ghost: "rounded-full px-4 py-2 text-foreground/70 hover:bg-primary/8 hover:text-foreground transition-colors",
        link:  "text-primary underline-offset-4 hover:underline p-0",
      },
      size: {
        default: "",           // sizes come from btn-* classes
        sm:  "!text-xs !px-4 !py-2",
        lg:  "!text-base !px-8 !py-4",
        icon: "!h-10 !w-10 !p-0 !rounded-full",
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
