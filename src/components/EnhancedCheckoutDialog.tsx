import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/contexts/CartContext';
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { 
  Loader2, CreditCard, Smartphone, Shield, Lock, CheckCircle, 
  Sparkles, Package, ChevronRight, Zap, RefreshCw, Mail, User
} from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { QuickVeteranToggle } from '@/components/payment/QuickVeteranToggle';
import { SmartPriceBreakdown } from '@/components/payment/SmartPriceBreakdown';
import { TrustIndicators } from '@/components/payment/TrustIndicators';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartFeedback } from './CartFeedbackNotifications';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '');

interface EnhancedCheckoutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// QR Code Payment Component
function QRCodePayment({ total, onSuccess }: { total: number; onSuccess: () => void }) {
  const [loading, setLoading] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(240);
  const { items } = useCart();

  useEffect(() => {
    if (qrCodeUrl && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setQrCodeUrl(null);
    }
  }, [qrCodeUrl, timeLeft]);

  const generateQRCode = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-payment-link', {
        body: {
          amount: Math.round(total * 100),
          items: items.map(item => ({
            name: item.name,
            quantity: item.quantity,
            price: item.price
          }))
        }
      });

      if (error) throw error;
      
      if (data?.url) {
        const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(data.url)}`;
        setQrCodeUrl(qrUrl);
        setTimeLeft(240);
      }
    } catch (error: any) {
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
    <div className="text-center space-y-5 py-4">
      {!qrCodeUrl ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="p-4 bg-muted/50 rounded-xl">
            <Smartphone className="w-12 h-12 mx-auto mb-3 text-primary" />
            <h4 className="font-semibold mb-2">Pay with Your Phone</h4>
            <p className="text-sm text-muted-foreground">
              Scan a QR code to pay with Apple Pay, Google Pay, or any mobile wallet
            </p>
          </div>
          <Button onClick={generateQRCode} disabled={loading} size="lg" className="w-full">
            {loading ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              <Smartphone className="mr-2 h-5 w-5" />
            )}
            Generate QR Code
          </Button>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-4"
        >
          <div className="bg-white p-4 rounded-xl inline-block shadow-lg">
            <img src={qrCodeUrl} alt="Payment QR Code" className="w-[200px] h-[200px]" />
          </div>
          <div className="flex items-center justify-center gap-2">
            <Badge variant={timeLeft < 60 ? "destructive" : "secondary"}>
              <RefreshCw className="w-3 h-3 mr-1" />
              Expires in {formatTime(timeLeft)}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            Scan to pay <strong className="text-foreground">${total.toFixed(2)}</strong>
          </p>
          <Button variant="outline" onClick={generateQRCode} size="sm">
            Generate New Code
          </Button>
        </motion.div>
      )}
    </div>
  );
}

// Card Payment Form
function CardPaymentForm({ onSuccess }: { onSuccess: () => void }) {
  const stripe = useStripe();
  const elements = useElements();
  const { items, total, clearCart } = useCart();
  const { triggerThankYou } = useCartFeedback();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<'contact' | 'payment'>('contact');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: ''
  });

  // Auto-fill from localStorage
  useEffect(() => {
    const savedEmail = localStorage.getItem('checkout_email');
    const savedName = localStorage.getItem('checkout_name');
    if (savedEmail) setFormData(prev => ({ ...prev, email: savedEmail }));
    if (savedName) setFormData(prev => ({ ...prev, name: savedName }));
  }, []);

  const hasDigitalOnly = items.every(item => item.isDigital);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!stripe || !elements) return;
    if (!formData.name || !formData.email) {
      toast.error('Please fill in required fields');
      return;
    }

    // Save for auto-fill
    localStorage.setItem('checkout_email', formData.email);
    localStorage.setItem('checkout_name', formData.name);

    setLoading(true);
    try {
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) throw new Error('Card element not found');

      const { error: pmError, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: {
          name: formData.name,
          email: formData.email,
        }
      });

      if (pmError) {
        toast.error(pmError.message);
        return;
      }

      const { data, error } = await supabase.functions.invoke('process-payment', {
        body: {
          paymentMethodId: paymentMethod.id,
          amount: Math.round(total * 100),
          currency: 'usd',
          customerInfo: formData,
          items: items.map(item => ({
            productId: item.productId,
            name: item.name,
            quantity: item.quantity,
            price: item.price,
            stripe_price_id: (item as any).stripe_price_id
          }))
        }
      });

      if (error) throw error;
      if (!data.success) throw new Error(data.error || 'Payment failed');

      toast.success('Payment successful!');
      clearCart('purchase');
      triggerThankYou();
      onSuccess();
    } catch (error: any) {
      toast.error(error.message || 'Payment failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <AnimatePresence mode="wait">
        {step === 'contact' && (
          <motion.div
            key="contact"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center font-bold">
                1
              </div>
              <h3 className="font-semibold">Contact Information</h3>
            </div>

            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Your Name *"
                value={formData.name}
                onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="pl-10 h-12"
                required
              />
            </div>
            
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="email"
                placeholder="Email * (for receipt)"
                value={formData.email}
                onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="pl-10 h-12"
                required
              />
            </div>

            {!hasDigitalOnly && (
              <>
                <Input
                  placeholder="Street Address *"
                  value={formData.address}
                  onChange={e => setFormData(prev => ({ ...prev, address: e.target.value }))}
                  className="h-11"
                  required
                />
                <div className="grid grid-cols-6 gap-2">
                  <Input className="col-span-3 h-11" placeholder="City" value={formData.city} onChange={e => setFormData(prev => ({ ...prev, city: e.target.value }))} />
                  <Input className="col-span-2 h-11" placeholder="State" value={formData.state} onChange={e => setFormData(prev => ({ ...prev, state: e.target.value }))} maxLength={2} />
                  <Input className="h-11" placeholder="ZIP" value={formData.zip} onChange={e => setFormData(prev => ({ ...prev, zip: e.target.value }))} maxLength={5} />
                </div>
              </>
            )}

            <Button
              type="button"
              onClick={() => setStep('payment')}
              disabled={!formData.name || !formData.email}
              className="w-full h-11"
            >
              Continue to Payment
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        )}

        {step === 'payment' && (
          <motion.div
            key="payment"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-2 mb-4">
              <button
                type="button"
                onClick={() => setStep('contact')}
                className="text-sm text-primary hover:underline"
              >
                ← Back
              </button>
              <div className="w-7 h-7 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center font-bold ml-auto">
                2
              </div>
              <h3 className="font-semibold">Payment</h3>
            </div>

            <div className="p-3 bg-muted/50 rounded-lg text-sm flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Paying as <strong>{formData.email}</strong></span>
            </div>

            <div className="border-2 border-border rounded-xl p-4 bg-card">
              <CardElement options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: 'hsl(var(--foreground))',
                    '::placeholder': { color: 'hsl(var(--muted-foreground))' },
                  },
                },
              }} />
            </div>

            <div className="flex flex-wrap gap-2 justify-center">
              {['Visa', 'Mastercard', 'Amex'].map(card => (
                <Badge key={card} variant="outline" className="text-xs">
                  {card}
                </Badge>
              ))}
            </div>

            <Button 
              type="submit" 
              disabled={!stripe || loading} 
              className="w-full h-12 text-base font-semibold" 
              size="lg"
            >
              {loading ? (
                <><Loader2 className="mr-2 h-5 w-5 animate-spin" />Processing...</>
              ) : (
                <><Lock className="mr-2 h-5 w-5" />Pay ${total.toFixed(2)}</>
              )}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}

export function EnhancedCheckoutDialog({ open, onOpenChange }: EnhancedCheckoutDialogProps) {
  const { items, total } = useCart();
  const [isVeteran, setIsVeteran] = useState(false);
  const veteranDiscount = isVeteran ? total * 0.1 : 0;
  const finalTotal = total - veteranDiscount;
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'qr'>('card');

  const hasDigitalItems = items.some(item => item.isDigital);
  const hasPhysicalItems = items.some(item => !item.isDigital);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[95vh] overflow-y-auto p-0">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 p-6 border-b">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-primary/20 rounded-lg">
                <Package className="w-5 h-5 text-primary" />
              </div>
              <Badge variant="secondary">
                {items.length} {items.length === 1 ? 'item' : 'items'}
              </Badge>
            </div>
            <DialogTitle className="text-2xl font-bold">Checkout</DialogTitle>
          </DialogHeader>

          {/* Delivery Info */}
          <div className="flex flex-wrap gap-3 mt-4 text-sm">
            {hasDigitalItems && (
              <Badge variant="outline" className="gap-1">
                <Zap className="w-3 h-3" />
                Instant digital delivery
              </Badge>
            )}
            {hasPhysicalItems && (
              <Badge variant="outline" className="gap-1">
                <Package className="w-3 h-3" />
                Ships in 2-3 days
              </Badge>
            )}
          </div>
        </div>

        <div className="p-6 grid md:grid-cols-5 gap-6">
          {/* Main Form */}
          <div className="md:col-span-3">
            <Tabs value={paymentMethod} onValueChange={(v) => setPaymentMethod(v as 'card' | 'qr')} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="card" className="gap-2">
                  <CreditCard className="w-4 h-4" />
                  Card
                </TabsTrigger>
                <TabsTrigger value="qr" className="gap-2">
                  <Smartphone className="w-4 h-4" />
                  Mobile Pay
                </TabsTrigger>
              </TabsList>

              <TabsContent value="card">
                <Elements stripe={stripePromise}>
                  <CardPaymentForm onSuccess={() => onOpenChange(false)} />
                </Elements>
              </TabsContent>

              <TabsContent value="qr">
                <QRCodePayment total={total} onSuccess={() => onOpenChange(false)} />
              </TabsContent>
            </Tabs>
          </div>

          {/* Order Summary Sidebar */}
          <div className="md:col-span-2">
            <div className="sticky top-4 space-y-4">
              <div className="p-4 bg-muted/50 rounded-xl border">
                <h4 className="font-semibold mb-3">Order Summary</h4>
                <div className="space-y-2 mb-4 max-h-40 overflow-y-auto">
                  {items.map(item => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-muted-foreground truncate max-w-[150px]">
                        {item.name} × {item.quantity}
                      </span>
                      <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <QuickVeteranToggle
                  isVeteran={isVeteran}
                  onVeteranChange={setIsVeteran}
                  discountPercent={10}
                />

                <div className="border-t pt-3 mt-3">
                  {veteranDiscount > 0 && (
                    <div className="flex justify-between text-sm text-green-600 mb-1">
                      <span>Veteran Discount</span>
                      <span>-${veteranDiscount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="text-primary">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <TrustIndicators compact />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}