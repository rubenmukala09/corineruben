import { CheckCircle, Shield, Lock, Award } from "lucide-react";
import { cn } from "@/lib/utils";

interface TrustIndicatorProps {
  type?: "check" | "shield" | "lock" | "award";
  className?: string;
  text?: string;
  size?: "sm" | "md" | "lg";
}

export const TrustIndicator = ({ 
  type = "check", 
  className,
  text,
  size = "md"
}: TrustIndicatorProps) => {
  const icons = {
    check: CheckCircle,
    shield: Shield,
    lock: Lock,
    award: Award
  };

  const Icon = icons[type];

  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6"
  };

  if (text) {
    return (
      <div className={cn("inline-flex items-center gap-2", className)}>
        <Icon className={cn("text-success flex-shrink-0", sizeClasses[size])} />
        <span>{text}</span>
      </div>
    );
  }

  return <Icon className={cn("text-success", sizeClasses[size], className)} />;
};
