import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon?: ReactNode;
  emoji?: string;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export function EmptyState({
  icon,
  emoji,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <Card className={cn("py-16", className)}>
      <div className="text-center px-4">
        {emoji && <div className="text-6xl mb-4 animate-bounce">{emoji}</div>}
        {icon && (
          <div className="flex justify-center mb-4 text-muted-foreground">
            {icon}
          </div>
        )}
        <h3 className="text-xl font-semibold mb-2 text-foreground">{title}</h3>
        {description && (
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            {description}
          </p>
        )}
        {action && <Button onClick={action.onClick}>{action.label}</Button>}
      </div>
    </Card>
  );
}

interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorState({
  title = "Failed to Load Data",
  description = "Please check your connection and try again",
  onRetry,
  className,
}: ErrorStateProps) {
  return (
    <Card className={cn("py-16 border-destructive/50", className)}>
      <div className="text-center px-4">
        <div className="text-6xl mb-4">⚠️</div>
        <h3 className="text-xl font-semibold mb-2 text-destructive">{title}</h3>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          {description}
        </p>
        {onRetry && (
          <Button onClick={onRetry} variant="outline">
            Try Again
          </Button>
        )}
      </div>
    </Card>
  );
}
