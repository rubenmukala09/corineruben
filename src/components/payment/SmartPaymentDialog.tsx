import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Loader2, CreditCard, ChevronDown, ChevronUp } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { motion, AnimatePresence } from 'framer-motion';
import { ExpressCheckout } from './ExpressCheckout';
import { SmartPriceBreakdown } from './SmartPriceBreakdown';
import { QuickVeteranToggle } from './QuickVeteranToggle';
import { TrustIndicators, AcceptedCards } from './TrustIndicators';
import { PaymentSuccess } from './PaymentSuccess';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '');

export interface PaymentItem {
  id: string;
  name: string;
  price: number;
  quantity?: number;
  isDigital?: boolean;
}

interface SmartPaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: PaymentItem[];
  title?: string;
  description?: string;
  onSuccess?: () => void;
}

function SmartPaymentForm({ 
  items, 
  onSuccess 
}: { 
  items: PaymentItem[]; 
  onSuccess?: () => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isVeteran, setIsVeteran] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  // Auto-fill from localStorage or user session
  useEffect(() => {
    const savedEmail = localStorage.getItem('checkout_email');
    const savedName = localStorage.getItem('checkout_name');
    const savedVeteran = localStorage.getItem('checkout_veteran');
    
    if (savedEmail) setEmail(savedEmail);
    if (savedName) setName(savedName);
    if (savedVeteran === 'true') setIsVeteran(true);

    // Try to get user info from Supabase session
    supabase.auth.getUser().then(({ data }) => {
      if (data.user?.email && !savedEmail) {
        setEmail(data.user.email);
      }
    });
  }, []);

  // Calculate totals
  const subtotal = items.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  const discount = isVeteran ? subtotal * 0.1 : 0;
  const total = subtotal - discount;

  const priceItems = [
    ...items.map(item => ({
      label: `${item.name}${item.quantity && item.quantity > 1 ? ` x${item.quantity}` : ''}`,
      amount: item.price * (item.quantity || 1)
    })),
    ...(isVeteran ? [{ label: 'Veteran Discount (10%)', amount: discount, isDiscount: true }] : [])
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    
    if (!email) {
      toast.error('Please enter your email');
      return;
    }

    setLoading(true);

    // Save preferences for next time
    localStorage.setItem('checkout_email', email);
    if (name) localStorage.setItem('checkout_name', name);
    localStorage.setItem('checkout_veteran', isVeteran.toString());

    try {
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) throw new Error('Card element not found');

      const { error: pmError, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: {
          email,
          name: name || undefined
        }
      });

      if (pmError) {
        toast.error(pmError.message);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase.functions.invoke('process-payment', {
        body: {
          paymentMethodId: paymentMethod.id,
          amount: Math.round(total * 100),
          currency: 'usd',
          customerInfo: { name, email },
          items: items.map(item => ({
            productId: item.id,
            name: item.name,
            quantity: item.quantity || 1,
            price: item.price
          })),
          veteranDiscount: isVeteran
        }
      });

      if (error) throw error;
      if (!data.success) throw new Error(data.error || 'Payment failed');

      setOrderNumber(data.orderNumber || '');
      setStep('success');
      
    } catch (error) {
      console.error('Payment error:', error);
      toast.error('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    onSuccess?.();
  };

  const isDigital = items.some(item => item.isDigital);

  if (step === 'success') {
    return <PaymentSuccess email={email} orderNumber={orderNumber} isDigital={isDigital} onClose={handleClose} />;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <ExpressCheckout 
        amount={total} 
        disabled={loading}
      />

      <div className="space-y-3">
        <div>
          <Label htmlFor="email" className="text-sm font-medium">Email *</Label>
          <Input
            id="email"
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="mt-1"
          />
        </div>

        <Collapsible open={showDetails} onOpenChange={setShowDetails}>
          <CollapsibleTrigger asChild>
            <Button 
              type="button" 
              variant="ghost" 
              size="sm" 
              className="w-full text-muted-foreground hover:text-foreground"
            >
              {showDetails ? <ChevronUp className="h-4 w-4 mr-2" /> : <ChevronDown className="h-4 w-4 mr-2" />}
              {showDetails ? 'Hide' : 'Add'} billing details (optional)
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-3 pt-2">
            <div>
              <Label htmlFor="name" className="text-sm font-medium">Full Name</Label>
              <Input
                id="name"
                placeholder="John Doe"
                value={name}
                onChange={e => setName(e.target.value)}
                className="mt-1"
              />
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      <QuickVeteranToggle 
        isVeteran={isVeteran} 
        onToggle={setIsVeteran} 
      />

      <SmartPriceBreakdown 
        items={priceItems}
        total={total}
        savings={discount}
      />

      <div className="space-y-3">
        <Label className="text-sm font-medium">Card Details</Label>
        <div className="border rounded-xl p-4 bg-card focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all">
          <CardElement 
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: 'hsl(var(--foreground))',
                  '::placeholder': {
                    color: 'hsl(var(--muted-foreground))',
                  },
                },
              },
            }}
          />
        </div>
        <AcceptedCards />
      </div>

      <Button 
        type="submit" 
        disabled={!stripe || loading} 
        className="w-full h-12 text-base font-semibold"
        size="lg"
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <CreditCard className="mr-2 h-5 w-5" />
            Pay ${total.toFixed(2)}
          </>
        )}
      </Button>

      <TrustIndicators />
    </form>
  );
}

export function SmartPaymentDialog({ 
  open, 
  onOpenChange, 
  items,
  title = "Complete Your Purchase",
  description,
  onSuccess
}: SmartPaymentDialogProps) {
  const itemCount = items.reduce((sum, item) => sum + (item.quantity || 1), 0);
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">{title}</DialogTitle>
          <DialogDescription>
            {description || `${itemCount} ${itemCount === 1 ? 'item' : 'items'} in your order`}
          </DialogDescription>
        </DialogHeader>
        <Elements stripe={stripePromise}>
          <SmartPaymentForm 
            items={items} 
            onSuccess={() => {
              onOpenChange(false);
              onSuccess?.();
            }} 
          />
        </Elements>
      </DialogContent>
    </Dialog>
  );
}
