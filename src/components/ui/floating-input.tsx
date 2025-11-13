import * as React from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

export interface FloatingInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  showCharCount?: boolean;
}

const FloatingInput = React.forwardRef<HTMLInputElement, FloatingInputProps>(
  ({ className, label, error, showCharCount, maxLength, value, onChange, ...props }, ref) => {
    const [charCount, setCharCount] = React.useState(0);
    const [hasValue, setHasValue] = React.useState(false);

    React.useEffect(() => {
      const currentValue = value?.toString() || '';
      setCharCount(currentValue.length);
      setHasValue(currentValue.length > 0);
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setCharCount(e.target.value.length);
      setHasValue(e.target.value.length > 0);
      if (onChange) onChange(e);
    };

    const getCharCountClass = () => {
      if (!maxLength) return '';
      const percentage = (charCount / maxLength) * 100;
      if (percentage >= 100) return 'danger';
      if (percentage >= 80) return 'warning';
      return '';
    };

    return (
      <div className="floating-label-container">
        <input
          ref={ref}
          className={cn(
            "flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-transparent disabled:cursor-not-allowed disabled:opacity-50",
            "form-input floating-input transition-all duration-300",
            "focus-visible:outline-none focus-visible:border-2 focus-visible:border-primary focus-visible:shadow-[0_0_0_3px_hsl(var(--primary)/0.1)]",
            error && "error",
            hasValue && "has-value",
            className
          )}
          placeholder=" "
          value={value}
          onChange={handleChange}
          maxLength={maxLength}
          aria-invalid={error ? "true" : "false"}
          {...props}
        />
        <Label
          className="floating-label"
          htmlFor={props.id}
        >
          {label}
        </Label>
        
        {error && (
          <p className="text-sm text-destructive mt-1 animate-fade-in-up">
            {error}
          </p>
        )}
        
        {showCharCount && maxLength && (
          <p className={cn("character-counter", getCharCountClass())}>
            {charCount} / {maxLength}
          </p>
        )}
      </div>
    );
  }
);

FloatingInput.displayName = "FloatingInput";

export { FloatingInput };
