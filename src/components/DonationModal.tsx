import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { 
  Heart, DollarSign, Loader2, CheckCircle, Shield, 
  Users, Sparkles, Gift, Calendar, CreditCard, QrCode, 
  Smartphone, ArrowLeft, Clock, RefreshCw, PartyPopper
} from "lucide-react";
import { donationFormSchema } from "@/utils/formValidation";
import { z } from "zod";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import confetti from "canvas-confetti";
import donationHeroImage from "@/assets/donation-hero.jpg";

interface DonationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type?: 'sponsor' | 'monthly' | 'corporate' | 'general' | 'children';
  cause?: string;
}

type DonationFormData = z.infer<typeof donationFormSchema>;

// Stripe promise - cached
let stripePromise: Promise<Stripe | null> | null = null;
const getStripe = async () => {
  if (!stripePromise) {
    const key = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
    if (key) {
      stripePromise = loadStripe(key);
    } else {
      // Fallback: fetch from edge function
      const { data } = await supabase.functions.invoke('get-stripe-key');
      if (data?.publishableKey) {
        stripePromise = loadStripe(data.publishableKey);
      }
    }
  }
  return stripePromise;
};

const impactInfo: Record<string, { 
  icon: React.ReactNode; 
  title: string;
  impacts: { amount: number; description: string }[];
  color: string;
}> = {
  children: {
    icon: <Heart className="w-6 h-6" />,
    title: "Support Children with Cancer",
    impacts: [
      { amount: 25, description: "Provides art therapy supplies for 1 child" },
      { amount: 50, description: "Funds 1 week of meal support for a family" },
      { amount: 100, description: "Covers transportation for 5 hospital visits" },
      { amount: 250, description: "Sponsors a child's treatment for 1 month" },
    ],
    color: "from-rose-500/20 to-pink-500/20"
  },
  sponsor: {
    icon: <Users className="w-6 h-6" />,
    title: "Sponsor a Seat",
    impacts: [
      { amount: 50, description: "Sponsors 1 senior for training" },
      { amount: 100, description: "Covers a family's protection setup" },
      { amount: 200, description: "Funds a community workshop" },
      { amount: 500, description: "Sponsors an entire class" },
    ],
    color: "from-blue-500/20 to-cyan-500/20"
  },
  monthly: {
    icon: <Calendar className="w-6 h-6" />,
    title: "Monthly Ally Program",
    impacts: [
      { amount: 10, description: "Provides ongoing scam alerts" },
      { amount: 25, description: "Funds monthly security updates" },
      { amount: 50, description: "Supports continuous community education" },
      { amount: 100, description: "Enables 24/7 helpline support" },
    ],
    color: "from-emerald-500/20 to-teal-500/20"
  },
  general: {
    icon: <Gift className="w-6 h-6" />,
    title: "Make a Difference",
    impacts: [
      { amount: 25, description: "Helps protect 1 senior from scams" },
      { amount: 50, description: "Funds security awareness materials" },
      { amount: 100, description: "Supports family protection services" },
      { amount: 250, description: "Sponsors community outreach" },
    ],
    color: "from-purple-500/20 to-violet-500/20"
  }
};

// ===== CARD PAYMENT FORM (Embedded Stripe Elements) =====
interface CardPaymentFormProps {
  amount: number;
  donorName: string;
  email: string;
  onSuccess: () => void;
  onBack: () => void;
}

function CardPaymentForm({ amount, donorName, email, onSuccess, onBack }: CardPaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

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
          return_url: `${window.location.origin}/payment-success?type=donation`,
          receipt_email: email,
        },
        redirect: "if_required",
      });

      if (confirmError) {
        throw new Error(confirmError.message);
      }

      if (paymentIntent?.status === "succeeded") {
        // Celebrate!
        confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
        toast({ title: "💖 Thank You!", description: "Your donation was successful!" });
        onSuccess();
      }
    } catch (err: any) {
      setError(err.message || "Payment failed");
      toast({ title: "Payment Failed", description: err.message, variant: "destructive" });
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="p-4 bg-muted/50 rounded-xl border">
        <PaymentElement 
          options={{
            layout: "tabs",
            business: { name: "InVision Network" },
          }}
        />
      </div>

      {error && (
        <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-lg">
          {error}
        </div>
      )}

      <div className="flex gap-3">
        <Button type="button" variant="outline" onClick={onBack} className="flex-1">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button 
          type="submit" 
          disabled={!stripe || processing} 
          className="flex-[2]"
        >
          {processing ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Heart className="w-4 h-4 mr-2" />
              Donate ${(amount / 100).toFixed(2)}
            </>
          )}
        </Button>
      </div>

      <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
        <Shield className="w-3 h-3" />
        <span>Secured by Stripe • 256-bit encryption</span>
      </div>
    </form>
  );
}

// ===== QR CODE PAYMENT SECTION =====
interface QRPaymentProps {
  amount: number;
  donorName: string;
  email: string;
  donationType: string;
  onSuccess: () => void;
  onBack: () => void;
}

function QRPaymentSection({ amount, donorName, email, donationType, onSuccess, onBack }: QRPaymentProps) {
  const [generating, setGenerating] = useState(false);
  const [qrUrl, setQrUrl] = useState<string | null>(null);
  const [paymentUrl, setPaymentUrl] = useState<string | null>(null);
  const [paymentLinkId, setPaymentLinkId] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(300);
  const [paid, setPaid] = useState(false);
  const { toast } = useToast();

  const generateQR = useCallback(async () => {
    setGenerating(true);
    setQrUrl(null);
    setCountdown(300);

    try {
      const { data, error } = await supabase.functions.invoke('generate-payment-link', {
        body: {
          amount: amount,
          items: [{ name: `${donationType === 'monthly' ? 'Monthly' : 'One-Time'} Donation`, price: amount / 100, quantity: 1 }],
          customerEmail: email,
          customerName: donorName,
        }
      });

      if (error) throw error;
      if (!data?.url) throw new Error('Failed to generate payment link');

      setPaymentLinkId(data.id);
      setPaymentUrl(data.url);
      setQrUrl(`https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(data.url)}&bgcolor=ffffff&color=7c3aed&margin=10`);
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setGenerating(false);
    }
  }, [amount, donorName, email, donationType, toast]);

  // Auto-generate on mount
  useEffect(() => {
    generateQR();
  }, [generateQR]);

  // Countdown
  useEffect(() => {
    if (!qrUrl || paid) return;
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setQrUrl(null);
          toast({ title: "QR Expired", description: "Generate a new one" });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [qrUrl, paid, toast]);

  // Poll for payment
  useEffect(() => {
    if (!paymentLinkId || paid) return;
    const poll = setInterval(async () => {
      try {
        const { data } = await supabase.functions.invoke('verify-payment-link', {
          body: { paymentLinkId }
        });
        if (data?.paid) {
          setPaid(true);
          clearInterval(poll);
          confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
          toast({ title: "💖 Thank You!", description: "Your donation was received!" });
          onSuccess();
        }
      } catch (e) {}
    }, 4000);
    return () => clearInterval(poll);
  }, [paymentLinkId, paid, onSuccess, toast]);

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

  if (paid) {
    return (
      <div className="text-center py-8 animate-fade-in">
        <div className="w-20 h-20 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-10 h-10 text-success" />
        </div>
        <h3 className="text-2xl font-bold mb-2">Payment Received!</h3>
        <p className="text-muted-foreground">Thank you for your generosity 💖</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 text-center">
      <div className="space-y-1">
        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
          <Smartphone className="w-6 h-6 text-primary" />
        </div>
        <h3 className="font-semibold">Scan to Pay</h3>
        <p className="text-sm text-muted-foreground">Use your phone camera to scan and pay</p>
      </div>

      <div className="flex justify-center">
        {qrUrl ? (
          <div className="relative bg-white p-3 rounded-2xl shadow-lg border-2 border-primary/20">
            <img src={qrUrl} alt="Payment QR" className="w-52 h-52" />
            <Badge 
              variant={countdown < 60 ? "destructive" : "secondary"} 
              className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex gap-1"
            >
              <Clock className="w-3 h-3" />
              {formatTime(countdown)}
            </Badge>
          </div>
        ) : (
          <div className="w-52 h-52 bg-muted/50 rounded-2xl border-2 border-dashed flex items-center justify-center">
            {generating ? (
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            ) : (
              <QrCode className="w-12 h-12 text-muted-foreground/40" />
            )}
          </div>
        )}
      </div>

      {qrUrl && (
        <div className="flex items-center gap-2 justify-center text-sm text-muted-foreground">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          Waiting for payment...
        </div>
      )}

      {paymentUrl && (
        <Button variant="ghost" size="sm" onClick={() => window.open(paymentUrl, '_blank')}>
          Or tap here to pay in browser →
        </Button>
      )}

      <div className="flex gap-3 pt-2">
        <Button variant="outline" onClick={onBack} className="flex-1">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button variant="outline" onClick={generateQR} disabled={generating} className="flex-1">
          <RefreshCw className={`w-4 h-4 mr-2 ${generating ? 'animate-spin' : ''}`} />
          New Code
        </Button>
      </div>

      <div className="text-center pt-2 border-t">
        <p className="text-sm text-muted-foreground">
          Amount: <span className="font-bold text-foreground">${(amount / 100).toFixed(2)}</span>
        </p>
      </div>
    </div>
  );
}

// ===== SUCCESS SCREEN =====
function SuccessScreen({ amount, donorName, onClose }: { amount: number; donorName: string; onClose: () => void }) {
  return (
    <div className="text-center py-8 space-y-6 animate-fade-in">
      <div className="w-24 h-24 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto shadow-lg shadow-primary/30">
        <PartyPopper className="w-12 h-12 text-primary-foreground" />
      </div>
      
      <div className="space-y-2">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Thank You, Hero! 💖
        </h2>
        <p className="text-lg text-muted-foreground">
          {donorName ? `${donorName}, your` : 'Your'} generous donation of <span className="font-bold text-foreground">${(amount / 100).toFixed(2)}</span> will make a real difference.
        </p>
      </div>

      <div className="bg-muted/50 rounded-xl p-4 max-w-xs mx-auto text-left space-y-2">
        <p className="text-sm font-medium">Your impact:</p>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-success" /> Protecting families from scams</li>
          <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-success" /> Supporting vulnerable seniors</li>
          <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-success" /> Building safer communities</li>
        </ul>
      </div>

      <p className="text-sm text-muted-foreground">A receipt has been sent to your email.</p>

      <Button onClick={onClose} size="lg">
        Close
      </Button>
    </div>
  );
}

// ===== MAIN DONATION MODAL =====
export const DonationModal = ({ open, onOpenChange, type = 'general', cause }: DonationModalProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<'form' | 'payment' | 'success'>('form');
  const [donationType, setDonationType] = useState<'one-time' | 'monthly'>(type === 'monthly' ? 'monthly' : 'one-time');
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'qr'>('card');
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [stripeInstance, setStripeInstance] = useState<Stripe | null>(null);
  const [formData, setFormData] = useState<DonationFormData | null>(null);
  const [donationId, setDonationId] = useState<string | null>(null);
  
  const info = impactInfo[type] || impactInfo.general;
  const amounts = info.impacts.map(i => i.amount);
  const finalAmount = selectedAmount || (customAmount ? parseFloat(customAmount) : 0);
  const amountInCents = Math.round(finalAmount * 100);
  
  const form = useForm<DonationFormData>({
    resolver: zodResolver(donationFormSchema),
    defaultValues: {
      donor_name: localStorage.getItem('checkout_name') || '',
      email: localStorage.getItem('checkout_email') || '',
      message: '',
      amount: 0,
    },
  });

  // Load Stripe on mount
  useEffect(() => {
    getStripe().then(setStripeInstance);
  }, []);

  // Reset on close
  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setStep('form');
        setClientSecret(null);
        setFormData(null);
        setDonationId(null);
        setSelectedAmount(null);
        setCustomAmount('');
      }, 300);
    }
  }, [open]);

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount('');
  };

  const handleCustomAmount = (value: string) => {
    setCustomAmount(value);
    setSelectedAmount(null);
  };

  const getImpactMessage = () => {
    if (!finalAmount) return null;
    return info.impacts.filter(i => i.amount <= finalAmount).pop()?.description || info.impacts[0]?.description;
  };

  const handleSubmit = async (data: DonationFormData) => {
    if (finalAmount < 5) {
      toast({ title: "Minimum $5", description: "Please enter at least $5.", variant: "destructive" });
      return;
    }

    setLoading(true);
    setFormData(data);
    localStorage.setItem('checkout_email', data.email);
    localStorage.setItem('checkout_name', data.donor_name);

    try {
      // Create donation record
      const { data: donation, error: insertError } = await supabase.from('donations').insert([{
        donor_name: data.donor_name,
        email: data.email,
        amount: finalAmount,
        donation_type: donationType,
        message: data.message || `Donation to ${info.title}`,
        payment_status: 'pending',
      }]).select().single();

      if (insertError) throw insertError;
      setDonationId(donation.id);

      if (paymentMethod === 'card') {
        // Create PaymentIntent for card
        const { data: piData, error: piError } = await supabase.functions.invoke('create-cart-payment-intent', {
          body: {
            amount: amountInCents,
            customerEmail: data.email,
            customerName: data.donor_name,
            items: [{ id: 'donation', name: `${donationType === 'monthly' ? 'Monthly' : 'One-Time'} Donation`, price: finalAmount, quantity: 1 }],
            metadata: { donation_id: donation.id, donation_type: donationType }
          }
        });

        if (piError) throw piError;
        if (!piData?.clientSecret) throw new Error('Failed to initialize payment');

        setClientSecret(piData.clientSecret);
      }

      setStep('payment');
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentSuccess = async () => {
    // Update donation status
    if (donationId) {
      await supabase.from('donations').update({ payment_status: 'completed' }).eq('id', donationId);
    }
    setStep('success');
  };

  const elementsOptions = clientSecret ? {
    clientSecret,
    appearance: {
      theme: 'stripe' as const,
      variables: {
        colorPrimary: '#7c3aed',
        borderRadius: '8px',
      },
    },
  } : undefined;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto p-0">
        {/* Hero Image Header */}
        <div className="relative h-36 overflow-hidden rounded-t-lg">
          <img src={donationHeroImage} alt="Making a difference" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
          <div className="absolute bottom-3 left-5 right-5">
            <DialogHeader>
              <div className="flex items-center gap-2 mb-1">
                <div className="p-2 bg-background/90 backdrop-blur rounded-lg text-primary">
                  {info.icon}
                </div>
                <Badge variant="secondary" className="bg-background/90 backdrop-blur text-xs">
                  {step === 'success' ? '✓ Complete' : donationType === 'monthly' ? 'Monthly' : 'One-time'}
                </Badge>
              </div>
              <DialogTitle className="text-xl font-bold">{cause || info.title}</DialogTitle>
            </DialogHeader>
          </div>
        </div>

        <div className="p-5">
          {/* STEP 1: FORM */}
          {step === 'form' && (
            <div className="space-y-5 animate-fade-in">
              {/* Donation Type Toggle */}
              {type !== 'monthly' && (
                <div className="flex gap-2 p-1 bg-muted rounded-lg">
                  <Button type="button" variant={donationType === 'one-time' ? 'default' : 'ghost'} className="flex-1 h-9" onClick={() => setDonationType('one-time')}>
                    <Gift className="w-4 h-4 mr-2" />One-time
                  </Button>
                  <Button type="button" variant={donationType === 'monthly' ? 'default' : 'ghost'} className="flex-1 h-9" onClick={() => setDonationType('monthly')}>
                    <Calendar className="w-4 h-4 mr-2" />Monthly
                  </Button>
                </div>
              )}

              {/* Amount Grid */}
              <div>
                <label className="text-sm font-medium mb-2 block">Select Amount</label>
                <div className="grid grid-cols-4 gap-2 mb-2">
                  {amounts.map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => handleAmountSelect(amt)}
                      className={`p-2.5 rounded-xl text-center font-semibold text-sm transition-all border-2 hover:scale-[1.02] ${
                        selectedAmount === amt
                          ? 'bg-primary text-primary-foreground border-primary shadow-md'
                          : 'bg-muted/50 border-transparent hover:border-primary/30'
                      }`}
                    >
                      ${amt}
                    </button>
                  ))}
                </div>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="number"
                    placeholder="Custom amount"
                    value={customAmount}
                    onChange={(e) => handleCustomAmount(e.target.value)}
                    className="pl-9 h-10"
                    min={5}
                  />
                </div>
              </div>

              {/* Impact Message */}
              {finalAmount >= 5 && (
                <div className="p-3 bg-success/10 border border-success/20 rounded-xl animate-fade-in">
                  <div className="flex items-center gap-2 text-success text-sm font-medium">
                    <Sparkles className="w-4 h-4" />Your Impact
                  </div>
                  <p className="text-xs mt-1 text-muted-foreground">{getImpactMessage()}</p>
                </div>
              )}

              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-3">
                  <FormField control={form.control} name="donor_name" render={({ field }) => (
                    <FormItem>
                      <FormControl><Input {...field} placeholder="Your Name *" className="h-10" /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem>
                      <FormControl><Input {...field} type="email" placeholder="Email * (for receipt)" className="h-10" /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="message" render={({ field }) => (
                    <FormItem>
                      <FormControl><Textarea {...field} placeholder="Leave a message (optional)" rows={2} className="resize-none" /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  {/* Payment Method */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Payment Method</label>
                    <Tabs value={paymentMethod} onValueChange={(v) => setPaymentMethod(v as 'card' | 'qr')}>
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="card" className="flex gap-2"><CreditCard className="w-4 h-4" />Card</TabsTrigger>
                        <TabsTrigger value="qr" className="flex gap-2"><QrCode className="w-4 h-4" />QR Code</TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>

                  {/* Total */}
                  <div className="p-3 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl border flex justify-between items-center">
                    <span className="font-medium text-sm">{donationType === 'monthly' ? 'Monthly' : 'Total'}</span>
                    <span className="text-2xl font-bold text-primary">
                      ${finalAmount.toFixed(2)}{donationType === 'monthly' && <span className="text-xs font-normal">/mo</span>}
                    </span>
                  </div>

                  <Button type="submit" disabled={loading || finalAmount < 5} className="w-full h-11" size="lg">
                    {loading ? (
                      <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Preparing...</>
                    ) : (
                      <><Heart className="w-4 h-4 mr-2" />Continue to Payment</>
                    )}
                  </Button>

                  <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                    <Shield className="w-3 h-3" /><span>Secure • 100% goes to the cause</span>
                  </div>
                </form>
              </Form>
            </div>
          )}

          {/* STEP 2: PAYMENT */}
          {step === 'payment' && formData && (
            <div className="animate-fade-in">
              {paymentMethod === 'card' && clientSecret && stripeInstance ? (
                <Elements stripe={stripeInstance} options={elementsOptions}>
                  <CardPaymentForm
                    amount={amountInCents}
                    donorName={formData.donor_name}
                    email={formData.email}
                    onSuccess={handlePaymentSuccess}
                    onBack={() => setStep('form')}
                  />
                </Elements>
              ) : paymentMethod === 'qr' ? (
                <QRPaymentSection
                  amount={amountInCents}
                  donorName={formData.donor_name}
                  email={formData.email}
                  donationType={donationType}
                  onSuccess={handlePaymentSuccess}
                  onBack={() => setStep('form')}
                />
              ) : (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
              )}
            </div>
          )}

          {/* STEP 3: SUCCESS */}
          {step === 'success' && (
            <SuccessScreen 
              amount={amountInCents} 
              donorName={formData?.donor_name || ''} 
              onClose={() => onOpenChange(false)} 
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
