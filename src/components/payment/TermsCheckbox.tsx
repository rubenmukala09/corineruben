import { motion } from 'framer-motion';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface TermsCheckboxProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  error?: boolean;
}

export function TermsCheckbox({ checked, onCheckedChange, error }: TermsCheckboxProps) {
  return (
    <motion.div 
      className={`flex items-start gap-3 p-3 rounded-xl border transition-colors ${
        error 
          ? 'border-destructive/50 bg-destructive/5' 
          : checked 
            ? 'border-primary/30 bg-primary/5' 
            : 'border-border/50 bg-muted/30'
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Checkbox
        id="terms-checkbox"
        checked={checked}
        onCheckedChange={(val) => onCheckedChange(val === true)}
        className="mt-0.5"
      />
      <Label 
        htmlFor="terms-checkbox" 
        className="text-xs text-muted-foreground leading-relaxed cursor-pointer"
      >
        I agree to the{' '}
        <a 
          href="/terms-of-service" 
          target="_blank" 
          className="text-primary hover:underline font-medium"
          onClick={(e) => e.stopPropagation()}
        >
          Terms of Service
        </a>{' '}
        and{' '}
        <a 
          href="/privacy-policy" 
          target="_blank" 
          className="text-primary hover:underline font-medium"
          onClick={(e) => e.stopPropagation()}
        >
          Privacy Policy
        </a>
        . I understand that my payment will be processed securely by Stripe.
      </Label>
    </motion.div>
  );
}
