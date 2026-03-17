import { ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MobileTableCardProps {
  children: ReactNode;
  className?: string;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
}

export function MobileTableCard({
  children,
  className,
  onSwipeLeft,
  onSwipeRight,
}: MobileTableCardProps) {
  return (
    <Card
      className={cn(
        "p-4 mb-4 active:scale-[0.98] transition-transform duration-200",
        "border border-border rounded-lg shadow-sm",
        "md:hidden", // Only show on mobile
        className,
      )}
    >
      {children}
    </Card>
  );
}

interface MobileCardFieldProps {
  label: string;
  value: ReactNode;
  className?: string;
}

export function MobileCardField({
  label,
  value,
  className,
}: MobileCardFieldProps) {
  return (
    <div className={cn("mb-3 last:mb-0", className)}>
      <div className="text-xs text-muted-foreground mb-1 font-medium">
        {label}
      </div>
      <div className="text-sm text-foreground break-words">{value}</div>
    </div>
  );
}

interface MobileCardHeaderProps {
  title: string;
  subtitle?: string;
  avatar?: ReactNode;
  badge?: ReactNode;
}

export function MobileCardHeader({
  title,
  subtitle,
  avatar,
  badge,
}: MobileCardHeaderProps) {
  return (
    <div className="flex items-start gap-3 mb-4 pb-4 border-b border-border">
      {avatar && <div className="flex-shrink-0">{avatar}</div>}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-base text-foreground truncate">
            {title}
          </h3>
          {badge && <div className="flex-shrink-0">{badge}</div>}
        </div>
        {subtitle && (
          <p className="text-sm text-muted-foreground mt-1 break-words">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}

interface MobileCardActionsProps {
  children: ReactNode;
  className?: string;
}

export function MobileCardActions({
  children,
  className,
}: MobileCardActionsProps) {
  return (
    <div
      className={cn(
        "flex gap-2 mt-4 pt-4 border-t border-border flex-wrap",
        className,
      )}
    >
      {children}
    </div>
  );
}
