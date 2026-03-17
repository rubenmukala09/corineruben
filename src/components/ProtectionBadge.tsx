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
  size = "md",
}: ProtectionBadgeProps) => {
  const sizeClasses = {
    sm: "text-xs px-2 py-1",
    md: "text-sm px-3 py-1.5",
    lg: "text-base px-4 py-2",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full bg-background/70 backdrop-blur-xl border border-border/30 shadow-[0_1px_3px_hsl(var(--coral-300)/0.1),0_2px_6px_hsl(var(--lavender-300)/0.08)]",
        sizeClasses[size],
        className,
      )}
    >
      <Shield
        className={cn(
          "text-primary",
          size === "sm" && "w-3 h-3",
          size === "md" && "w-4 h-4",
          size === "lg" && "w-5 h-5",
        )}
        aria-hidden="true"
      />
      <span className="font-semibold text-[#18305A]">{text}</span>
    </div>
  );
};
