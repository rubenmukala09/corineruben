import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  CreditCard, 
  Check, 
  Loader2, 
  AlertCircle, 
  Star,
  ShieldCheck,
  PartyPopper,
  ArrowLeft,
  Smartphone,
  RefreshCw
} from 'lucide-react';
// Lazy load Stripe Elements to prevent 155KB from loading on page start
const LazyStripeElements = lazy(() => import('./LazyStripeElements'));
import { useCheckout } from '@/contexts/CheckoutContext';
import { useStripeKey } from '@/hooks/useStripeKey';
import { usePaymentFlow } from '@/hooks/usePaymentFlow';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'framer-motion';

// Lazy load Stripe hooks and components - only imported when payment step is reached
const LazyPaymentFormStep = lazy(() => import('./LazyPaymentFormStep'));

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
          placeholder="Your full name"
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
          placeholder="you@email.com"
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

// QR Code Payment Component
const QRCodePaymentStep: React.FC<{
  onSuccess: () => void;
}> = ({ onSuccess }) => {
  const { state, total } = useCheckout();
  const [loading, setLoading] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  const [paymentLinkId, setPaymentLinkId] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(240);
  const [checking, setChecking] = useState(false);

  // Countdown timer
  useEffect(() => {
    if (qrCodeUrl && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setQrCodeUrl(null);
      setPaymentLinkId(null);
    }
  }, [qrCodeUrl, timeLeft]);

  // Poll for payment status
  useEffect(() => {
    if (!paymentLinkId || !qrCodeUrl) return;
    
    const checkPayment = async () => {
      setChecking(true);
      try {
        const { data } = await supabase.functions.invoke('verify-payment-link', {
          body: { paymentLinkId }
        });
        
        if (data?.paid) {
          confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
          toast.success('Payment received!');
          onSuccess();
        }
      } catch (err) {
        console.log('Payment check:', err);
      } finally {
        setChecking(false);
      }
    };

    const interval = setInterval(checkPayment, 4000);
    return () => clearInterval(interval);
  }, [paymentLinkId, qrCodeUrl, onSuccess]);

  const generateQRCode = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-payment-link', {
        body: {
          amount: Math.round(total * 100),
          customerEmail: state.customerInfo.email,
          customerName: state.customerInfo.name,
          items: state.items.map(item => ({
            name: item.product.name,
            quantity: item.quantity,
            price: item.discountedPrice
          }))
        }
      });

      if (error) throw error;
      
      if (data?.url) {
        const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(data.url)}`;
        setQrCodeUrl(qrUrl);
        setPaymentLinkId(data.id);
        setTimeLeft(240);
        console.log('[QR Payment] Generated:', { id: data.id, requestId: data.requestId });
      }
    } catch (error: any) {
      console.error('[QR Payment] Error:', error);
      toast.error('Failed to generate QR code');
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="text-center space-y-4 py-2">
      <AnimatePresence mode="wait">
        {!qrCodeUrl ? (
          <motion.div
            key="generate"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            <div className="p-4 bg-muted/50 rounded-xl">
              <Smartphone className="w-10 h-10 mx-auto mb-3 text-primary" />
              <h4 className="font-semibold mb-1">Pay with Your Phone</h4>
              <p className="text-sm text-muted-foreground">
                Scan QR code with Apple Pay, Google Pay, or any mobile wallet
              </p>
            </div>
            <Button onClick={generateQRCode} disabled={loading} className="w-full">
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Smartphone className="mr-2 h-4 w-4" />
              )}
              Generate QR Code
            </Button>
          </motion.div>
        ) : (
          <motion.div
            key="qr"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="space-y-3"
          >
            <div className="bg-white p-3 rounded-xl inline-block shadow-md">
              <img src={qrCodeUrl} alt="Payment QR Code" className="w-[180px] h-[180px]" />
            </div>
            
            <div className="flex items-center justify-center gap-2">
              <Badge variant={timeLeft < 60 ? "destructive" : "secondary"}>
                {checking && <Loader2 className="w-3 h-3 mr-1 animate-spin" />}
                {!checking && <RefreshCw className="w-3 h-3 mr-1" />}
                {formatTime(timeLeft)}
              </Badge>
            </div>
            
            <p className="text-sm text-muted-foreground">
              Scan to pay <strong className="text-foreground">${total.toFixed(2)}</strong>
            </p>
            
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <Loader2 className="w-3 h-3 animate-spin" />
              Waiting for payment...
            </div>
            
            <Button variant="outline" onClick={generateQRCode} size="sm" disabled={loading}>
              {loading ? <Loader2 className="w-3 h-3 animate-spin" /> : 'Regenerate'}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// PaymentFormStep is now lazy-loaded from LazyPaymentFormStep.tsx

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
  const { stripePromise, initializeStripe } = useStripeKey();

  useEffect(() => {
    if (state.isOpen) {
      initializeStripe();
    }
  }, [state.isOpen, initializeStripe]);

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

            {state.step === 'payment' && (
              <Tabs defaultValue="card" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="card" className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4" />
                    Card
                  </TabsTrigger>
                  <TabsTrigger value="qr" className="flex items-center gap-2">
                    <Smartphone className="w-4 h-4" />
                    QR Code
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="card">
                  {stripePromise && state.clientSecret ? (
                    <Suspense fallback={
                      <div className="flex items-center justify-center py-8">
                        <Loader2 className="w-6 h-6 animate-spin text-primary" />
                        <span className="ml-2 text-sm text-muted-foreground">Loading payment form...</span>
                      </div>
                    }>
                      <LazyStripeElements
                        stripePromise={stripePromise}
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
                        <Suspense fallback={
                          <div className="flex items-center justify-center py-4">
                            <Loader2 className="w-5 h-5 animate-spin text-primary" />
                          </div>
                        }>
                          <LazyPaymentFormStep
                            onSuccess={() => setStep('success')}
                            onBack={() => setStep('info')}
                          />
                        </Suspense>
                      </LazyStripeElements>
                    </Suspense>
                  ) : (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="w-6 h-6 animate-spin text-primary" />
                      <span className="ml-2 text-sm text-muted-foreground">Loading payment...</span>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="qr">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setStep('info')}
                    className="mb-2"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to details
                  </Button>
                  
                  <QRCodePaymentStep onSuccess={() => setStep('success')} />
                </TabsContent>
              </Tabs>
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
