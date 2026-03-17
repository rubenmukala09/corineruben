import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border border-primary/20 bg-primary/10 text-primary backdrop-blur-sm",
        secondary: "border border-secondary/30 bg-secondary/60 text-secondary-foreground backdrop-blur-sm",
        destructive:
          "border border-destructive/20 bg-destructive/10 text-destructive",
        outline: "border border-border/50 text-foreground bg-background/60 backdrop-blur-sm",
        success: "border border-success/20 bg-success/10 text-success",
        premium:
          "border border-primary/20 bg-gradient-to-r from-primary/10 to-accent/10 text-primary backdrop-blur-sm",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
