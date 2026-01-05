import * as React from "react";

import { cn } from "@/lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[120px] w-full rounded-2xl border border-input bg-white px-4 py-3 text-sm ring-offset-background placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
        "shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)] transition-all duration-300",
        "focus-visible:outline-none focus-visible:border-2 focus-visible:border-primary focus-visible:shadow-[0_0_0_3px_hsl(var(--primary)/0.1)]",
        "hover:shadow-[0_6px_25px_-4px_rgba(0,0,0,0.08)]",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };