import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useCart } from '@/contexts/CartContext';
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Loader2, CreditCard, Shield } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { OrderSummary } from '@/components/OrderSummary';
import TrustBadges from '@/components/TrustBadges';
import { VeteranIdUpload } from '@/components/VeteranIdUpload';
import { RefundPolicyDisclaimer } from '@/components/RefundPolicyDisclaimer';
import { AcceptedCardsDisplay } from '@/components/AcceptedCardsDisplay';
import { QRCodePayment } from '@/components/QRCodePayment';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '');

interface CheckoutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function CheckoutForm({ onSuccess }: { onSuccess: () => void }) {
  const stripe = useStripe();
  const elements = useElements();
  const { items, total, clearCart, isVeteran, setIsVeteran, veteranDiscount } = useCart();
  const [loading, setLoading] = useState(false);
  const [veteranIdFile, setVeteranIdFile] = useState<File | null>(null);
  const [refundPolicyAccepted, setRefundPolicyAccepted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: ''
  });

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const uploadVeteranId = async (userId: string): Promise<string | null> => {
    if (!veteranIdFile) return null;
    try {
      const fileExt = veteranIdFile.name.split('.').pop();
      const fileName = `${userId}/${Date.now()}.${fileExt}`;
      const { error } = await supabase.storage.from('veteran-docs').upload(fileName, veteranIdFile);
      if (error) throw error;
      return fileName;
    } catch (error) {
      console.error("Error uploading veteran ID:", error);
      toast.error("Failed to upload veteran ID");
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!stripe || !elements) return;
    if (!formData.name || !formData.email || !formData.address) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (!refundPolicyAccepted) {
      toast.error('Please accept the refund policy to continue');
      return;
    }

    if (isVeteran && !veteranIdFile) {
      toast.error('Please upload your veteran ID for verification');
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

      const { data: { user } } = await supabase.auth.getUser();
      let veteranIdUrl = null;
      if (isVeteran && veteranIdFile && user) {
        veteranIdUrl = await uploadVeteranId(user.id);
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
          })),
          isVeteran,
          veteranIdUrl,
          veteranDiscount: veteranDiscount
        }
      });

      if (error) throw error;
      if (!data.success) throw new Error(data.error || 'Payment failed');

      const orderInfo = data.orderId && data.orderNumber 
        ? `Order #${data.orderNumber} created successfully!` 
        : 'Payment successful!';
      
      toast.success(orderInfo + ' Check your email for receipt.');
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
    <div className="grid md:grid-cols-3 gap-6">
      <form onSubmit={handleSubmit} className="space-y-6 md:col-span-2">
        <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
          <div className="flex items-center gap-2 text-sm font-medium mb-2">
            🔒 Secure Checkout
          </div>
          <p className="text-xs text-muted-foreground">
            Your payment information is encrypted and secure. We accept all major credit and debit cards.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Contact Information</h3>
          <Input
            placeholder="Full Name"
            value={formData.name}
            onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
            required
          />
          <div className="grid md:grid-cols-2 gap-4">
            <Input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
              required
            />
            <Input
              type="tel"
              placeholder="Phone"
              value={formData.phone}
              onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Billing Address</h3>
          <Input
            placeholder="Street Address"
            value={formData.address}
            onChange={e => setFormData(prev => ({ ...prev, address: e.target.value }))}
            required
          />
          <div className="grid grid-cols-6 gap-4">
            <Input className="col-span-3" placeholder="City" value={formData.city} onChange={e => setFormData(prev => ({ ...prev, city: e.target.value }))} required />
            <Input className="col-span-2" placeholder="State" value={formData.state} onChange={e => setFormData(prev => ({ ...prev, state: e.target.value }))} maxLength={2} required />
            <Input placeholder="ZIP" value={formData.zip} onChange={e => setFormData(prev => ({ ...prev, zip: e.target.value }))} maxLength={5} required />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              <Label htmlFor="veteran-checkout" className="text-base font-semibold cursor-pointer">
                I'm a Veteran (10% OFF)
              </Label>
            </div>
            <Switch
              id="veteran-checkout"
              checked={isVeteran}
              onCheckedChange={setIsVeteran}
            />
          </div>
          
          <VeteranIdUpload
            isVeteran={isVeteran}
            onFileUpload={setVeteranIdFile}
            uploadedFile={veteranIdFile}
          />
        </div>

        <RefundPolicyDisclaimer
          onAcknowledge={setRefundPolicyAccepted}
          type={items.some(i => i.productId.includes('digital')) ? 'digital' : 'physical'}
        />

        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Payment Method</h3>
          
          <div className="space-y-4">
            <div>
              <Label className="text-sm mb-2 block">Credit or Debit Card</Label>
              <div className="border-2 border-border rounded-lg p-4 bg-card">
                <CardElement options={{
                  style: {
                    base: {
                      fontSize: '16px',
                      color: '#424770',
                      '::placeholder': {
                        color: '#aab7c4',
                      },
                    },
                  },
                }} />
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or</span>
              </div>
            </div>

            <QRCodePayment
              amount={total}
              items={items.map(i => ({ name: i.name, quantity: i.quantity, price: i.price }))}
              customerEmail={formData.email}
            />
          </div>
        </div>

        <AcceptedCardsDisplay />

        <Button type="submit" disabled={!stripe || loading} className="w-full h-12" size="lg">
          {loading ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" />Processing...</> : <><CreditCard className="mr-2 h-5 w-5" />Pay ${total.toFixed(2)}</>}
        </Button>
        <TrustBadges />
      </form>

      <div className="hidden md:block">
        <div className="sticky top-4">
          <OrderSummary 
            items={items.map(item => ({ name: item.name, quantity: item.quantity, price: item.price }))} 
            subtotal={subtotal}
            discount={veteranDiscount}
            total={total} 
          />
          {isVeteran && (
            <div className="mt-4 p-3 bg-success/10 border border-success/20 rounded-lg text-sm text-success">
              ✓ Veteran discount applied (10% OFF)
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function CheckoutDialog({ open, onOpenChange }: CheckoutDialogProps) {
  const { items } = useCart();
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Complete Your Purchase</DialogTitle>
          <DialogDescription>{items.length} {items.length === 1 ? 'item' : 'items'} in your cart</DialogDescription>
        </DialogHeader>
        <Elements stripe={stripePromise}>
          <CheckoutForm onSuccess={() => onOpenChange(false)} />
        </Elements>
      </DialogContent>
    </Dialog>
  );
}
