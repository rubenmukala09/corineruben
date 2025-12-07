import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/contexts/CartContext';
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Loader2, CreditCard, Smartphone, Shield, Lock, CheckCircle, Sparkles } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { OrderSummary } from '@/components/OrderSummary';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '');

interface EnhancedCheckoutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// QR Code Payment Component
function QRCodePayment({ total, onSuccess }: { total: number; onSuccess: () => void }) {
  const [loading, setLoading] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  const { items, clearCart } = useCart();

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
        // Generate QR code using a free API
        const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(data.url)}`;
        setQrCodeUrl(qrUrl);
      }
    } catch (error: any) {
      console.error('QR generation error:', error);
      toast.error('Failed to generate QR code');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-center space-y-6 py-4">
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-sm font-medium">
        <Smartphone className="w-4 h-4" />
        Pay with your phone
      </div>
      
      {!qrCodeUrl ? (
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Scan a QR code with your phone to complete payment using Apple Pay, Google Pay, or any mobile payment method.
          </p>
          <Button onClick={generateQRCode} disabled={loading} size="lg" className="min-w-[200px]">
            {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Smartphone className="mr-2 h-5 w-5" />}
            Generate QR Code
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-xl inline-block shadow-lg">
            <img src={qrCodeUrl} alt="Payment QR Code" className="w-[250px] h-[250px]" />
          </div>
          <p className="text-sm text-muted-foreground">
            Scan with your phone camera to pay <strong>${total.toFixed(2)}</strong>
          </p>
          <div className="flex items-center justify-center gap-2 text-xs text-success">
            <Lock className="w-3 h-3" />
            Secure Payment via Stripe
          </div>
        </div>
      )}
    </div>
  );
}

// Card Payment Form
function CardPaymentForm({ onSuccess }: { onSuccess: () => void }) {
  const stripe = useStripe();
  const elements = useElements();
  const { items, total, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!stripe || !elements) return;
    if (!formData.name || !formData.email || !formData.address) {
      toast.error('Please fill in all required fields');
      return;
    }

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
          phone: formData.phone,
          address: {
            line1: formData.address,
            city: formData.city,
            state: formData.state,
            postal_code: formData.zip
          }
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
          customerInfo: formData,
          items: items.map(item => ({
            productId: item.productId,
            name: item.name,
            quantity: item.quantity,
            price: item.price
          }))
        }
      });

      if (error) throw error;
      if (!data.success) throw new Error(data.error || 'Payment failed');

      toast.success('Payment successful! Check your email for receipt.');
      clearCart();
      onSuccess();
    } catch (error) {
      console.error('Payment error:', error);
      toast.error('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Contact Information */}
      <div className="space-y-3">
        <h3 className="font-semibold text-lg flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">1</span>
          Contact Information
        </h3>
        <Input
          placeholder="Full Name *"
          value={formData.name}
          onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
          required
          className="h-12"
        />
        <div className="grid md:grid-cols-2 gap-3">
          <Input
            type="email"
            placeholder="Email *"
            value={formData.email}
            onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
            required
            className="h-12"
          />
          <Input
            type="tel"
            placeholder="Phone (optional)"
            value={formData.phone}
            onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
            className="h-12"
          />
        </div>
      </div>

      {/* Billing Address */}
      <div className="space-y-3">
        <h3 className="font-semibold text-lg flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">2</span>
          Billing Address
        </h3>
        <Input
          placeholder="Street Address *"
          value={formData.address}
          onChange={e => setFormData(prev => ({ ...prev, address: e.target.value }))}
          required
          className="h-12"
        />
        <div className="grid grid-cols-6 gap-3">
          <Input className="col-span-3 h-12" placeholder="City *" value={formData.city} onChange={e => setFormData(prev => ({ ...prev, city: e.target.value }))} required />
          <Input className="col-span-2 h-12" placeholder="State *" value={formData.state} onChange={e => setFormData(prev => ({ ...prev, state: e.target.value }))} maxLength={2} required />
          <Input className="h-12" placeholder="ZIP *" value={formData.zip} onChange={e => setFormData(prev => ({ ...prev, zip: e.target.value }))} maxLength={5} required />
        </div>
      </div>

      {/* Payment Details */}
      <div className="space-y-3">
        <h3 className="font-semibold text-lg flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">3</span>
          Payment Details
        </h3>
        <div className="border-2 border-border rounded-xl p-4 bg-card shadow-sm">
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
        
        {/* Accepted Cards */}
        <div className="flex items-center justify-center gap-3 pt-2">
          <span className="text-xs text-muted-foreground">Accepted:</span>
          <div className="flex gap-2">
            {['💳 Visa', '💳 Mastercard', '💳 Amex', '💳 Discover'].map(card => (
              <span key={card} className="text-xs bg-muted px-2 py-1 rounded">{card}</span>
            ))}
          </div>
        </div>
      </div>

      <Button type="submit" disabled={!stripe || loading} className="w-full h-14 text-lg" size="lg">
        {loading ? (
          <><Loader2 className="mr-2 h-5 w-5 animate-spin" />Processing...</>
        ) : (
          <><CreditCard className="mr-2 h-5 w-5" />Pay ${total.toFixed(2)}</>
        )}
      </Button>
    </form>
  );
}

export function EnhancedCheckoutDialog({ open, onOpenChange }: EnhancedCheckoutDialogProps) {
  const { items, total } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'qr'>('card');

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[95vh] overflow-y-auto">
        <DialogHeader className="text-center pb-4 border-b">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="p-2 bg-gradient-to-br from-primary to-accent rounded-xl">
              <Shield className="w-6 h-6 text-white" />
            </div>
          </div>
          <DialogTitle className="text-2xl">Secure Checkout</DialogTitle>
          <DialogDescription className="flex items-center justify-center gap-4 pt-2">
            <span>{items.length} {items.length === 1 ? 'item' : 'items'}</span>
            <span>•</span>
            <span className="font-semibold text-foreground">${total.toFixed(2)}</span>
          </DialogDescription>
        </DialogHeader>

        {/* Trust Indicators */}
        <div className="flex flex-wrap items-center justify-center gap-3 py-4 border-b">
          <Badge variant="outline" className="gap-1.5 py-1.5">
            <Lock className="w-3.5 h-3.5 text-success" />
            256-bit SSL
          </Badge>
          <Badge variant="outline" className="gap-1.5 py-1.5">
            <Shield className="w-3.5 h-3.5 text-success" />
            Secure Payments
          </Badge>
          <Badge variant="outline" className="gap-1.5 py-1.5">
            <CheckCircle className="w-3.5 h-3.5 text-success" />
            30-Day Guarantee
          </Badge>
          <Badge variant="outline" className="gap-1.5 py-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            Instant Delivery
          </Badge>
        </div>

        <div className="grid md:grid-cols-3 gap-6 pt-4">
          <div className="md:col-span-2">
            {/* Payment Method Tabs */}
            <Tabs value={paymentMethod} onValueChange={(v) => setPaymentMethod(v as 'card' | 'qr')} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="card" className="gap-2">
                  <CreditCard className="w-4 h-4" />
                  Card Payment
                </TabsTrigger>
                <TabsTrigger value="qr" className="gap-2">
                  <Smartphone className="w-4 h-4" />
                  QR Code / Mobile
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
          <div className="hidden md:block">
            <div className="sticky top-4 bg-muted/50 rounded-xl p-4 border">
              <h4 className="font-semibold mb-4">Order Summary</h4>
              <div className="space-y-3 mb-4">
                {items.map(item => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{item.name} × {item.quantity}</span>
                    <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="text-primary">${total.toFixed(2)}</span>
                </div>
              </div>
              
              {/* Guest Checkout Notice */}
              <div className="mt-4 p-3 bg-success/10 rounded-lg text-xs text-center">
                <CheckCircle className="w-4 h-4 mx-auto mb-1 text-success" />
                <span className="text-success font-medium">No account required!</span>
                <p className="text-muted-foreground mt-1">Checkout as guest</p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
