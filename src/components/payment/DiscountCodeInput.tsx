import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tag, Check, X, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';

interface DiscountCodeInputProps {
  onApply: (discount: { code: string; type: string; value: number }) => void;
  onRemove: () => void;
  appliedCode?: string | null;
  minPurchase?: number;
  currentTotal?: number;
}

export function DiscountCodeInput({ 
  onApply, 
  onRemove, 
  appliedCode,
  minPurchase = 0,
  currentTotal = 0
}: DiscountCodeInputProps) {
  const [code, setCode] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateCode = async () => {
    if (!code.trim()) {
      setError('Please enter a code');
      return;
    }

    setIsValidating(true);
    setError(null);

    try {
      const { data, error: fnError } = await supabase.functions.invoke('validate-discount-code', {
        body: { code: code.trim().toUpperCase(), orderTotal: currentTotal }
      });

      if (fnError || !data?.valid) {
        setError(data?.message || 'Invalid or expired code');
        return;
      }

      onApply({
        code: code.trim().toUpperCase(),
        type: data.type,
        value: data.value
      });
      setCode('');
    } catch {
      setError('Could not validate code');
    } finally {
      setIsValidating(false);
    }
  };

  if (appliedCode) {
    return (
      <motion.div 
        className="flex items-center justify-between p-3 bg-primary/5 border border-primary/20 rounded-xl"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-primary/10 rounded-lg">
            <Check className="h-4 w-4 text-primary" />
          </div>
          <div>
            <span className="text-sm font-medium text-primary">{appliedCode}</span>
            <p className="text-xs text-muted-foreground">Discount applied</p>
          </div>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onRemove}
          className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
        >
          <X className="h-4 w-4" />
        </Button>
      </motion.div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Discount code"
            value={code}
            onChange={(e) => {
              setCode(e.target.value.toUpperCase());
              setError(null);
            }}
            onKeyDown={(e) => e.key === 'Enter' && validateCode()}
            className="pl-10 h-11"
            disabled={isValidating}
          />
        </div>
        <Button 
          variant="outline" 
          onClick={validateCode}
          disabled={isValidating || !code.trim()}
          className="h-11 px-4"
        >
          {isValidating ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            'Apply'
          )}
        </Button>
      </div>
      
      <AnimatePresence>
        {error && (
          <motion.p 
            className="text-xs text-destructive"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
