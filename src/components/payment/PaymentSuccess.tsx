import { motion } from 'framer-motion';
import { Check, Mail, Download, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import confetti from 'canvas-confetti';
import { useEffect } from 'react';

interface PaymentSuccessProps {
  email: string;
  orderNumber?: string;
  isDigital?: boolean;
  onClose: () => void;
}

export function PaymentSuccess({ email, orderNumber, isDigital, onClose }: PaymentSuccessProps) {
  useEffect(() => {
    // Trigger confetti celebration
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#8B5CF6', '#06B6D4', '#10B981']
    });
  }, []);

  return (
    <motion.div 
      className="text-center py-6 space-y-6"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <motion.div 
        className="mx-auto w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", delay: 0.2 }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.4 }}
        >
          <Check className="h-10 w-10 text-green-600 dark:text-green-400" />
        </motion.div>
      </motion.div>

      <div className="space-y-2">
        <motion.h3 
          className="text-2xl font-bold text-foreground"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Payment Successful!
        </motion.h3>
        
        {orderNumber && (
          <motion.p 
            className="text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Order #{orderNumber}
          </motion.p>
        )}
      </div>

      <motion.div 
        className="bg-muted/50 rounded-xl p-4 space-y-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-center gap-3 text-left">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Mail className="h-4 w-4 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium">Confirmation sent to</p>
            <p className="text-sm text-muted-foreground">{email}</p>
          </div>
        </div>

        {isDigital && (
          <div className="flex items-center gap-3 text-left">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Download className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium">Download ready</p>
              <p className="text-sm text-muted-foreground">Check your email for download links</p>
            </div>
          </div>
        )}

        <div className="flex items-center gap-3 text-left">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Clock className="h-4 w-4 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium">
              {isDigital ? 'Arriving in 2-5 minutes' : 'Shipping in 1-3 business days'}
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <Button onClick={onClose} className="w-full">
          Continue Shopping
        </Button>
      </motion.div>
    </motion.div>
  );
}
