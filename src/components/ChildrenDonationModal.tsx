import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card } from '@/components/ui/card';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Loader2, Heart, CheckCircle2 } from 'lucide-react';
import { AcceptedCardsDisplay } from '@/components/AcceptedCardsDisplay';
import { QRCodePayment } from '@/components/QRCodePayment';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '');

const donationSchema = z.object({
  donationType: z.enum(['one-time', 'monthly']),
  amount: z.number().min(5, 'Minimum donation is $5'),
  donorName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  message: z.string().optional(),
});

type DonationFormData = z.infer<typeof donationSchema>;

interface ChildrenDonationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function DonationForm({ onSuccess }: { onSuccess: (confirmationNum: string) => void }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'qr'>('card');

  const form = useForm<DonationFormData>({
    resolver: zodResolver(donationSchema),
    defaultValues: {
      donationType: 'one-time',
      amount: 0,
      donorName: '',
      email: '',
      phone: '',
      message: '',
    },
  });

  const handleSubmit = async (data: DonationFormData) => {
    if (!stripe || !elements) return;

    if (!data.donorName || !data.email || !selectedAmount) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (selectedAmount < 5) {
      toast.error('Minimum donation amount is $5');
      return;
    }

    setLoading(true);

    try {
      // Create payment method
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        throw new Error('Card element not found');
      }

      const { error: pmError, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: {
          name: data.donorName,
          email: data.email,
          phone: data.phone || undefined,
        },
      });

      if (pmError) {
        toast.error(pmError.message);
        setLoading(false);
        return;
      }

      // Process donation via edge function
      const { data: result, error } = await supabase.functions.invoke('process-donation', {
        body: {
          paymentMethodId: paymentMethod.id,
          amount: Math.round(selectedAmount * 100), // Convert to cents
          currency: 'usd',
          donorInfo: {
            name: data.donorName.trim(),
            email: data.email.trim(),
            phone: data.phone?.trim() || null,
          },
          donationType: data.donationType,
          message: data.message?.trim() || null,
        },
      });

      if (error) throw error;
      if (!result.success) throw new Error(result.error || 'Payment failed');

      // Generate confirmation number
      const confirmNum = `DON-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
      
      toast.success('Payment successful! Thank you for your donation.');
      
      // Track analytics
      await supabase.functions.invoke('track-analytics-event', {
        body: {
          event_name: 'donation_completed',
          event_category: 'donation',
          event_data: {
            amount: selectedAmount,
            type: data.donationType,
            donation_id: result.donationId,
          },
        },
      });

      onSuccess(confirmNum);
    } catch (error: any) {
      console.error('Donation error:', error);
      toast.error(error.message || 'Failed to process donation. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const donationType = form.watch('donationType');
  const selectedAmountValue = selectedAmount || 0;

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
      {/* Donation Type */}
      <div className="space-y-3">
        <Label>Donation Type</Label>
        <RadioGroup
          value={form.watch('donationType')}
          onValueChange={(value) => form.setValue('donationType', value as 'one-time' | 'monthly')}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="one-time" id="one-time-children" />
            <Label htmlFor="one-time-children" className="cursor-pointer font-normal">
              One-time Donation
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="monthly" id="monthly-children" />
            <Label htmlFor="monthly-children" className="cursor-pointer font-normal">
              Monthly Donation
            </Label>
          </div>
        </RadioGroup>
      </div>

      {/* Amount Selection */}
      <div className="space-y-3">
        <Label>Select Amount</Label>
        <div className="grid grid-cols-4 gap-2">
          {[25, 50, 100, 250].map((amount) => (
            <Card
              key={amount}
              className={`p-3 text-center cursor-pointer transition-all ${
                selectedAmount === amount
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'hover:border-primary'
              }`}
              onClick={() => {
                setSelectedAmount(amount);
                form.setValue('amount', amount);
              }}
            >
              ${amount}
            </Card>
          ))}
        </div>
        <Input
          type="number"
          placeholder="Custom amount"
          value={selectedAmount || ''}
          onChange={(e) => {
            const val = Number(e.target.value);
            setSelectedAmount(val);
            form.setValue('amount', val);
          }}
          min={5}
        />
      </div>

      {/* Personal Information */}
      <div className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="donorName">Full Name *</Label>
            <Input
              id="donorName"
              {...form.register('donorName')}
              placeholder="John Doe"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              {...form.register('email')}
              placeholder="john@example.com"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone (Optional)</Label>
          <Input
            id="phone"
            type="tel"
            {...form.register('phone')}
            placeholder="(555) 123-4567"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">Message (Optional)</Label>
          <Input
            id="message"
            {...form.register('message')}
            placeholder="Share your thoughts..."
          />
        </div>
      </div>

      {/* Payment Method Selection */}
      <div className="space-y-3">
        <Label>Payment Method</Label>
        <RadioGroup value={paymentMethod} onValueChange={(value) => setPaymentMethod(value as 'card' | 'qr')}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="card" id="card-payment" />
            <Label htmlFor="card-payment" className="cursor-pointer font-normal">
              Credit/Debit Card
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="qr" id="qr-payment" />
            <Label htmlFor="qr-payment" className="cursor-pointer font-normal">
              QR Code Payment
            </Label>
          </div>
        </RadioGroup>
      </div>

      {paymentMethod === 'card' ? (
        <>
          <div className="space-y-2">
            <Label>Card Details</Label>
            <div className="border-2 border-border rounded-lg p-4 bg-card">
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: '16px',
                      color: '#424770',
                      '::placeholder': {
                        color: '#aab7c4',
                      },
                    },
                  },
                }}
              />
            </div>
          </div>
          <AcceptedCardsDisplay />
        </>
      ) : (
        <QRCodePayment
          amount={selectedAmountValue}
          items={[{ name: `${donationType === 'monthly' ? 'Monthly' : 'One-time'} Donation to Support Children with Cancer`, quantity: 1, price: selectedAmountValue }]}
          customerEmail={form.watch('email')}
        />
      )}

      {/* Action Buttons */}
      <div className="flex gap-3 pt-4">
        <Button
          type="submit"
          disabled={!stripe || loading || !selectedAmount || paymentMethod === 'qr'}
          className="flex-1"
          size="lg"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Heart className="mr-2 h-5 w-5" />
              {paymentMethod === 'card' ? `Donate $${selectedAmountValue}` : 'Pay with QR Code'}
            </>
          )}
        </Button>
      </div>
    </form>
  );
}

export function ChildrenDonationModal({ open, onOpenChange }: ChildrenDonationModalProps) {
  const [showThankYou, setShowThankYou] = useState(false);
  const [confirmationNumber, setConfirmationNumber] = useState('');

  const handleSuccess = (confirmNum: string) => {
    setConfirmationNumber(confirmNum);
    setShowThankYou(true);
  };

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      setShowThankYou(false);
      setConfirmationNumber('');
    }
    onOpenChange(isOpen);
  };

  if (showThankYou) {
    return (
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="max-w-md">
          <div className="text-center py-8 space-y-6">
            <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-12 h-12 text-green-600" />
            </div>
            <div className="space-y-3">
              <h3 className="text-2xl font-bold text-foreground">Thank You! ❤️</h3>
              <p className="text-muted-foreground">
                Your payment has been successfully processed.
              </p>
              <p className="text-sm text-muted-foreground">
                Confirmation #{confirmationNumber}
              </p>
              <p className="text-sm text-muted-foreground">
                You're making a real difference in the lives of children battling cancer.
              </p>
            </div>
            <Button onClick={() => handleOpenChange(false)} className="mt-6">
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Heart className="w-6 h-6 text-red-500" />
            Support Children with Cancer
          </DialogTitle>
          <DialogDescription>
            Your donation helps provide hope and support to children battling cancer
          </DialogDescription>
        </DialogHeader>

        <Elements stripe={stripePromise}>
          <DonationForm onSuccess={handleSuccess} />
        </Elements>
      </DialogContent>
    </Dialog>
  );
}
