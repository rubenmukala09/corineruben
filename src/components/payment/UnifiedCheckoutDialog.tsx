import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  CreditCard, 
  Check, 
  Loader2, 
  AlertCircle, 
  Star,
  ShieldCheck,
  PartyPopper,
  ArrowLeft
} from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useCheckout } from '@/contexts/CheckoutContext';
import { usePaymentFlow } from '@/hooks/usePaymentFlow';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';

// Step 1: Customer Information Form
const CustomerInfoStep: React.FC<{
  onNext: () => void;
}> = ({ onNext }) => {
  const { state, setCustomerInfo, setLoading, setError, total } = useCheckout();
  const { createPaymentIntent } = usePaymentFlow();
  const { customerInfo, items, isLoading } = state;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!customerInfo.email || !customerInfo.name) {
      toast.error('Please fill in all required fields');
      return;
    }

    const paymentItems = items.map(item => ({
      id: item.productId,
      name: item.product.name,
      price: item.discountedPrice,
      quantity: item.quantity
    }));

    const result = await createPaymentIntent({
      amount: total,
      customerEmail: customerInfo.email,
      customerName: customerInfo.name,
      isVeteran: customerInfo.isVeteran,
      items: paymentItems
    });

    if (result) {
      onNext();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name *</Label>
        <Input
          id="name"
          value={customerInfo.name}
          onChange={(e) => setCustomerInfo({ name: e.target.value })}
          placeholder="John Doe"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email Address *</Label>
        <Input
          id="email"
          type="email"
          value={customerInfo.email}
          onChange={(e) => setCustomerInfo({ email: e.target.value })}
          placeholder="john@example.com"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone (Optional)</Label>
        <Input
          id="phone"
          type="tel"
          value={customerInfo.phone || ''}
          onChange={(e) => setCustomerInfo({ phone: e.target.value })}
          placeholder="(555) 123-4567"
        />
      </div>

      <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
        <Checkbox
          id="veteran"
          checked={customerInfo.isVeteran}
          onCheckedChange={(checked) => setCustomerInfo({ isVeteran: !!checked })}
        />
        <div className="flex-1">
          <Label htmlFor="veteran" className="flex items-center gap-2 cursor-pointer">
            <Star className="h-4 w-4 text-amber-500" />
            <span>I am a Veteran or First Responder</span>
          </Label>
          <p className="text-xs text-muted-foreground mt-1">
            Save 10-17% on your purchase
          </p>
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Preparing checkout...
          </>
        ) : (
          <>
            Continue to Payment
            <CreditCard className="ml-2 h-4 w-4" />
          </>
        )}
      </Button>
    </form>
  );
};

// Step 2: Payment Form (Stripe)
const PaymentFormStep: React.FC<{
  onSuccess: () => void;
  onBack: () => void;
}> = ({ onSuccess, onBack }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { state, setLoading, setError, setOrderId } = useCheckout();
  const { verifyPayment, sendDigitalDownload } = usePaymentFlow();
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);
    setError(null);

    try {
      const { error: submitError } = await elements.submit();
      if (submitError) {
        throw new Error(submitError.message);
      }

      const { error: confirmError, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/payment-success`,
          receipt_email: state.customerInfo.email
        },
        redirect: 'if_required'
      });

      if (confirmError) {
        throw new Error(confirmError.message);
      }

      if (paymentIntent?.status === 'succeeded') {
        // Trigger confetti
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });

        // Verify payment and send digital downloads if applicable
        const digitalItems = state.items.filter(item => item.product.isDigital);
        if (digitalItems.length > 0) {
          await sendDigitalDownload(
            paymentIntent.id,
            state.customerInfo.email,
            digitalItems.map(item => item.productId)
          );
        }

        setOrderId(paymentIntent.id);
        onSuccess();
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Payment failed';
      setError(message);
      toast.error(message);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={onBack}
        className="mb-2"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to details
      </Button>

      <div className="border rounded-lg p-4">
        <PaymentElement 
          options={{
            layout: 'tabs'
          }}
        />
      </div>

      {state.error && (
        <div className="flex items-center gap-2 p-3 bg-destructive/10 text-destructive rounded-lg">
          <AlertCircle className="h-4 w-4" />
          <span className="text-sm">{state.error}</span>
        </div>
      )}

      <Button type="submit" className="w-full" disabled={!stripe || processing}>
        {processing ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing payment...
          </>
        ) : (
          <>
            <ShieldCheck className="mr-2 h-4 w-4" />
            Pay ${useCheckout().total.toFixed(2)}
          </>
        )}
      </Button>

      <p className="text-xs text-center text-muted-foreground">
        Your payment is secured with 256-bit SSL encryption
      </p>
    </form>
  );
};

// Step 3: Success
const SuccessStep: React.FC<{
  onClose: () => void;
}> = ({ onClose }) => {
  const { state, hasDigitalProducts, total } = useCheckout();

  return (
    <div className="text-center space-y-4 py-4">
      <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
        <PartyPopper className="h-8 w-8 text-green-600" />
      </div>

      <div>
        <h3 className="text-xl font-semibold">Payment Successful!</h3>
        <p className="text-muted-foreground mt-1">
          Thank you for your purchase
        </p>
      </div>

      <div className="bg-muted rounded-lg p-4 text-left space-y-2">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Order ID</span>
          <span className="font-mono text-sm">{state.orderId?.slice(0, 8)}...</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Amount Paid</span>
          <span className="font-semibold">${total.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Email</span>
          <span className="text-sm">{state.customerInfo.email}</span>
        </div>
      </div>

      {hasDigitalProducts && (
        <div className="flex items-center gap-2 p-3 bg-blue-50 text-blue-700 rounded-lg">
          <Check className="h-4 w-4" />
          <span className="text-sm">Digital products sent to your email</span>
        </div>
      )}

      <Button onClick={onClose} className="w-full">
        Continue Shopping
      </Button>
    </div>
  );
};

// Order Summary Component
const OrderSummary: React.FC = () => {
  const { state, subtotal, discount, total } = useCheckout();

  return (
    <div className="space-y-3">
      <h4 className="font-medium">Order Summary</h4>
      
      <div className="space-y-2">
        {state.items.map((item) => (
          <div key={item.productId} className="flex justify-between text-sm">
            <span className="flex-1 truncate">
              {item.product.name}
              {item.quantity > 1 && ` x${item.quantity}`}
            </span>
            <span>${item.originalPrice.toFixed(2)}</span>
          </div>
        ))}
      </div>

      <Separator />

      <div className="space-y-1 text-sm">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        
        {discount > 0 && (
          <div className="flex justify-between text-green-600">
            <span className="flex items-center gap-1">
              <Star className="h-3 w-3" />
              Veteran Discount
            </span>
            <span>-${discount.toFixed(2)}</span>
          </div>
        )}

        <Separator />

        <div className="flex justify-between font-semibold text-base">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      {state.type === 'subscription' && state.items[0]?.product.billingInterval && (
        <Badge variant="secondary" className="w-full justify-center">
          Billed {state.items[0].product.billingInterval}ly
        </Badge>
      )}
    </div>
  );
};

// Main Dialog Component
const UnifiedCheckoutDialog: React.FC = () => {
  const { state, closeCheckout, setStep, resetCheckout } = useCheckout();
  const [stripePromise, setStripePromise] = useState<ReturnType<typeof loadStripe> | null>(null);

  useEffect(() => {
    const initStripe = async () => {
      try {
        const { data } = await supabase.functions.invoke('get-stripe-key');
        if (data?.publishableKey) {
          setStripePromise(loadStripe(data.publishableKey));
        }
      } catch (err) {
        console.error('Failed to load Stripe:', err);
      }
    };

    if (state.isOpen) {
      initStripe();
    }
  }, [state.isOpen]);

  const handleClose = () => {
    if (state.step === 'success') {
      resetCheckout();
    }
    closeCheckout();
  };

  const stepTitles = {
    info: 'Checkout',
    payment: 'Payment',
    success: 'Order Complete'
  };

  return (
    <Dialog open={state.isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {state.step === 'success' ? (
              <Check className="h-5 w-5 text-green-600" />
            ) : (
              <CreditCard className="h-5 w-5" />
            )}
            {stepTitles[state.step]}
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-6 md:grid-cols-[1fr,auto]">
          <div className="order-2 md:order-1">
            {state.step === 'info' && (
              <CustomerInfoStep onNext={() => {}} />
            )}

            {state.step === 'payment' && stripePromise && state.clientSecret && (
              <Elements
                stripe={stripePromise}
                options={{
                  clientSecret: state.clientSecret,
                  appearance: {
                    theme: 'stripe',
                    variables: {
                      colorPrimary: 'hsl(var(--primary))'
                    }
                  }
                }}
              >
                <PaymentFormStep
                  onSuccess={() => setStep('success')}
                  onBack={() => setStep('info')}
                />
              </Elements>
            )}

            {state.step === 'success' && (
              <SuccessStep onClose={handleClose} />
            )}
          </div>

          {state.step !== 'success' && (
            <div className="order-1 md:order-2 md:w-48 md:border-l md:pl-6">
              <OrderSummary />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UnifiedCheckoutDialog;
