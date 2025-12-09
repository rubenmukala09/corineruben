import { motion } from 'framer-motion';
import { Shield, Check } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface QuickVeteranToggleProps {
  isVeteran: boolean;
  onToggle: (value: boolean) => void;
  discountPercent?: number;
}

export function QuickVeteranToggle({ isVeteran, onToggle, discountPercent = 10 }: QuickVeteranToggleProps) {
  return (
    <motion.div 
      className={`flex items-center justify-between p-3 rounded-xl border transition-all duration-300 ${
        isVeteran 
          ? 'bg-primary/5 border-primary/30' 
          : 'bg-muted/30 border-border/50 hover:border-border'
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg transition-colors ${isVeteran ? 'bg-primary/10' : 'bg-muted'}`}>
          <Shield className={`h-4 w-4 ${isVeteran ? 'text-primary' : 'text-muted-foreground'}`} />
        </div>
        <div>
          <Label htmlFor="veteran-toggle" className="text-sm font-medium cursor-pointer">
            Veteran Discount
          </Label>
          <p className="text-xs text-muted-foreground">
            Save {discountPercent}% on your order
          </p>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        {isVeteran && (
          <motion.span 
            className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full flex items-center gap-1"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
          >
            <Check className="h-3 w-3" />
            Applied
          </motion.span>
        )}
        <Switch 
          id="veteran-toggle"
          checked={isVeteran}
          onCheckedChange={onToggle}
        />
      </div>
    </motion.div>
  );
}
