import { Shield } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProtectionBadgeProps {
  text?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const ProtectionBadge = ({ 
  text = "Family Protected", 
  className,
  size = "md" 
}: ProtectionBadgeProps) => {
  const sizeClasses = {
    sm: "text-xs px-2 py-1",
    md: "text-sm px-3 py-1.5",
    lg: "text-base px-4 py-2"
  };

  return (
    <div className={cn(
      "inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 backdrop-blur-sm border border-primary/30",
      sizeClasses[size],
      className
    )}>
      <Shield className={cn(
        "animate-pulse",
        size === "sm" && "w-3 h-3",
        size === "md" && "w-4 h-4",
        size === "lg" && "w-5 h-5"
      )} />
      <span className="font-semibold">{text}</span>
    </div>
  );
};
