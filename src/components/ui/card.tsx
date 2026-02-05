import * as React from "react";

import { cn } from "@/lib/utils";

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div 
    ref={ref} 
    className={cn(
      // Skeuomorphism 2.0 - Physical card with realistic layered shadows
      "rounded-2xl bg-gradient-to-b from-white via-white to-gray-50/50 text-card-foreground",
      "border border-gray-200/60",
      "shadow-[0_1px_1px_rgba(0,0,0,0.02),0_2px_2px_rgba(0,0,0,0.02),0_4px_4px_rgba(0,0,0,0.03),0_8px_8px_rgba(0,0,0,0.04),0_16px_16px_rgba(0,0,0,0.05),inset_0_1px_0_rgba(255,255,255,0.9)]",
      "transition-all duration-300 ease-out",
      "hover:translate-y-[-6px]",
      "hover:shadow-[0_2px_2px_rgba(0,0,0,0.02),0_4px_4px_rgba(0,0,0,0.03),0_8px_8px_rgba(0,0,0,0.04),0_16px_16px_rgba(0,0,0,0.05),0_32px_32px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,1)]",
      "dark:bg-gradient-to-b dark:from-card dark:via-card dark:to-card/90 dark:border-white/10",
      className
    )} 
    {...props} 
  />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6 lg:p-8", className)} {...props} />
  ),
);
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn("text-xl lg:text-2xl font-semibold leading-none tracking-tight", className)} {...props} />
  ),
);
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
  ),
);
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("p-6 lg:p-8 pt-0", className)} {...props} />,
);
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center p-6 lg:p-8 pt-0", className)} {...props} />
  ),
);
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };