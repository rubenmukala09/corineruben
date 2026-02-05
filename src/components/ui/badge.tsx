import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  // Skeuomorphism 2.0 - Raised badge with subtle depth
  "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: [
          "border border-primary/20 bg-gradient-to-b from-primary to-primary/90 text-primary-foreground",
          "shadow-[0_1px_2px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.15)]",
          "hover:shadow-[0_2px_4px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.2)]",
        ].join(" "),
        secondary: [
          "border border-gray-200/80 bg-gradient-to-b from-gray-50 to-gray-100/80 text-secondary-foreground",
          "shadow-[0_1px_2px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.9)]",
          "hover:shadow-[0_2px_4px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,1)]",
        ].join(" "),
        destructive: [
          "border border-destructive/20 bg-gradient-to-b from-destructive to-destructive/90 text-destructive-foreground",
          "shadow-[0_1px_2px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.12)]",
          "hover:shadow-[0_2px_4px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.15)]",
        ].join(" "),
        outline: [
          "border-2 border-border/60 text-foreground bg-gradient-to-b from-white to-gray-50/50",
          "shadow-[0_1px_2px_rgba(0,0,0,0.03),inset_0_1px_0_rgba(255,255,255,0.9)]",
        ].join(" "),
        success: [
          "border border-success/20 bg-gradient-to-b from-success to-success/90 text-success-foreground",
          "shadow-[0_1px_2px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.15)]",
          "hover:shadow-[0_2px_4px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.2)]",
        ].join(" "),
        premium: [
          "border border-primary/20 bg-gradient-to-r from-primary via-accent to-primary text-primary-foreground",
          "shadow-[0_1px_2px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.2)]",
          "hover:shadow-[0_2px_4px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.25)]",
        ].join(" "),
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
