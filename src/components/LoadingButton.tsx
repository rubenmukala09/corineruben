import { ReactNode } from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import { Loader2, Check, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingButtonProps extends ButtonProps {
  loading?: boolean;
  loadingText?: string;
  success?: boolean;
  successText?: string;
  error?: boolean;
  errorText?: string;
  children: ReactNode;
}

export function LoadingButton({
  loading = false,
  loadingText,
  success = false,
  successText,
  error = false,
  errorText,
  children,
  className,
  disabled,
  ...props
}: LoadingButtonProps) {
  const showLoading = loading && !success && !error;
  const showSuccess = success && !loading && !error;
  const showError = error && !loading && !success;

  return (
    <Button
      className={cn(
        "relative transition-all duration-300",
        showError && "animate-shake",
        className
      )}
      disabled={disabled || loading || success}
      {...props}
    >
      {showLoading && (
        <span className="flex items-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin" />
          {loadingText || children}
        </span>
      )}
      
      {showSuccess && (
        <span className="flex items-center gap-2 text-success">
          <Check className="h-4 w-4" />
          {successText || "Success!"}
        </span>
      )}
      
      {showError && (
        <span className="flex items-center gap-2 text-destructive-foreground">
          <AlertCircle className="h-4 w-4" />
          {errorText || children}
        </span>
      )}
      
      {!showLoading && !showSuccess && !showError && children}
    </Button>
  );
}
