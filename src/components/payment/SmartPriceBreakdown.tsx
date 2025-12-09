import { motion, AnimatePresence } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';

interface PriceItem {
  label: string;
  amount: number;
  isDiscount?: boolean;
}

interface SmartPriceBreakdownProps {
  items: PriceItem[];
  total: number;
  savings?: number;
  currency?: string;
}

export function SmartPriceBreakdown({ items, total, savings, currency = '$' }: SmartPriceBreakdownProps) {
  return (
    <motion.div 
      className="bg-muted/50 rounded-xl p-4 border border-border/50"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="space-y-2">
        {items.map((item, index) => (
          <motion.div 
            key={item.label}
            className="flex justify-between items-center text-sm"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <span className={item.isDiscount ? 'text-green-600 dark:text-green-400 font-medium' : 'text-muted-foreground'}>
              {item.label}
            </span>
            <span className={item.isDiscount ? 'text-green-600 dark:text-green-400 font-medium' : ''}>
              {item.isDiscount ? '-' : ''}{currency}{Math.abs(item.amount).toFixed(2)}
            </span>
          </motion.div>
        ))}
      </div>
      
      <div className="border-t border-border/50 mt-3 pt-3">
        <div className="flex justify-between items-center">
          <span className="font-semibold text-foreground">Total</span>
          <motion.span 
            className="text-xl font-bold text-foreground"
            key={total}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
          >
            {currency}{total.toFixed(2)}
          </motion.span>
        </div>
      </div>

      <AnimatePresence>
        {savings && savings > 0 && (
          <motion.div 
            className="mt-3 flex items-center gap-2 text-sm text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 rounded-lg px-3 py-2"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <Sparkles className="h-4 w-4" />
            <span className="font-medium">You save {currency}{savings.toFixed(2)}!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
