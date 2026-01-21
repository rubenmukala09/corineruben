import { useState, useEffect } from "react";
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
  Users, Sparkles, Gift, Calendar, CreditCard, QrCode, Smartphone, ArrowRight
} from "lucide-react";
import { donationFormSchema } from "@/utils/formValidation";
import { z } from "zod";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import donationHeroImage from "@/assets/donation-hero.jpg";

interface DonationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type?: 'sponsor' | 'monthly' | 'corporate' | 'general' | 'children';
  cause?: string;
}

type DonationFormData = z.infer<typeof donationFormSchema>;

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

export const DonationModal = ({ open, onOpenChange, type = 'general', cause }: DonationModalProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<'form' | 'payment'>('form');
  const [donationType, setDonationType] = useState<'one-time' | 'monthly'>(type === 'monthly' ? 'monthly' : 'one-time');
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'qr'>('card');
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  const [qrPaymentUrl, setQrPaymentUrl] = useState<string | null>(null);
  const [formData, setFormData] = useState<DonationFormData | null>(null);
  const [checkingPayment, setCheckingPayment] = useState(false);
  const [paymentLinkId, setPaymentLinkId] = useState<string | null>(null);
  
  const info = impactInfo[type] || impactInfo.general;
  const amounts = info.impacts.map(i => i.amount);
  const finalAmount = selectedAmount || (customAmount ? parseFloat(customAmount) : 0);
  
  const form = useForm<DonationFormData>({
    resolver: zodResolver(donationFormSchema),
    defaultValues: {
      donor_name: '',
      email: '',
      message: '',
      amount: 0,
    },
  });

  // Reset state when modal closes
  useEffect(() => {
    if (!open) {
      setStep('form');
      setQrCodeUrl(null);
      setQrPaymentUrl(null);
      setPaymentLinkId(null);
      setFormData(null);
    }
  }, [open]);

  // Poll for QR payment completion
  useEffect(() => {
    if (!paymentLinkId || step !== 'payment' || paymentMethod !== 'qr') return;

    const interval = setInterval(async () => {
      setCheckingPayment(true);
      try {
        const { data } = await supabase.functions.invoke('verify-payment-link', {
          body: { paymentLinkId }
        });
        
        if (data?.paid) {
          clearInterval(interval);
          toast({
            title: "💖 Thank You!",
            description: "Your donation was successful. You're a hero!",
          });
          onOpenChange(false);
          window.location.href = `/payment-success?type=donation&amount=${finalAmount}`;
        }
      } catch (error) {
        console.error('Payment check error:', error);
      } finally {
        setCheckingPayment(false);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [paymentLinkId, step, paymentMethod, finalAmount, onOpenChange, toast]);

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
    const impact = info.impacts.find(i => i.amount <= finalAmount);
    if (!impact) return info.impacts[0]?.description;
    return info.impacts.filter(i => i.amount <= finalAmount).pop()?.description;
  };

  const generateQRCode = async (data: DonationFormData) => {
    setLoading(true);
    try {
      // Create donation record first
      const { data: donation, error: insertError } = await supabase.from('donations').insert([{
        donor_name: data.donor_name,
        email: data.email,
        amount: finalAmount,
        donation_type: donationType,
        message: data.message || `Donation to ${info.title}`,
        payment_status: 'pending',
      }]).select().single();

      if (insertError) throw insertError;

      // Generate QR payment link
      const { data: paymentData, error: paymentError } = await supabase.functions.invoke('generate-payment-link', {
        body: {
          amount: Math.round(finalAmount * 100), // Convert to cents
          items: [{ 
            name: donationType === 'monthly' ? 'Monthly Donation' : 'One-Time Donation', 
            price: finalAmount, 
            quantity: 1 
          }],
          customerEmail: data.email,
          customerName: data.donor_name,
        }
      });

      if (paymentError) throw paymentError;
      if (!paymentData?.url) throw new Error('Failed to generate payment link');

      // Generate QR code image
      const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(paymentData.url)}&bgcolor=ffffff&color=7c3aed`;
      
      setQrCodeUrl(qrImageUrl);
      setQrPaymentUrl(paymentData.url);
      setPaymentLinkId(paymentData.id);
      setFormData(data);
      setStep('payment');
      
      toast({
        title: "QR Code Ready!",
        description: "Scan with your phone to complete payment",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to generate QR code",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCardPayment = async (data: DonationFormData) => {
    setLoading(true);
    try {
      const { data: donation, error: insertError } = await supabase.from('donations').insert([{
        donor_name: data.donor_name,
        email: data.email,
        amount: finalAmount,
        donation_type: donationType,
        message: data.message || `Donation to ${info.title}`,
        payment_status: 'pending',
      }]).select().single();

      if (insertError) throw insertError;

      localStorage.setItem('checkout_email', data.email);
      localStorage.setItem('checkout_name', data.donor_name);

      const { data: paymentData, error: paymentError } = await supabase.functions.invoke('process-donation', {
        body: {
          donorName: data.donor_name,
          email: data.email,
          amount: finalAmount,
          donationType: donationType,
          message: data.message,
          donationId: donation?.id,
        }
      });

      if (paymentError) throw paymentError;

      if (paymentData?.url) {
        toast({
          title: "💖 Redirecting to Payment",
          description: "Taking you to secure checkout...",
        });
        window.location.href = paymentData.url;
      } else {
        throw new Error('No payment URL received');
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (data: DonationFormData) => {
    if (finalAmount < 5) {
      toast({
        title: "Minimum $5",
        description: "Please enter a donation of at least $5.",
        variant: "destructive",
      });
      return;
    }

    if (paymentMethod === 'qr') {
      await generateQRCode(data);
    } else {
      await handleCardPayment(data);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto p-0">
        {/* Hero Image */}
        <div className="relative h-40 overflow-hidden rounded-t-lg">
          <img 
            src={donationHeroImage} 
            alt="Making a difference together" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          <div className="absolute bottom-4 left-6 right-6">
            <DialogHeader>
              <div className="flex items-center gap-3 mb-1">
                <div className="p-2 bg-background/90 backdrop-blur rounded-lg text-primary">
                  {info.icon}
                </div>
                <Badge variant="secondary" className="bg-background/90 backdrop-blur">
                  {donationType === 'monthly' ? 'Monthly' : 'One-time'}
                </Badge>
              </div>
              <DialogTitle className="text-2xl font-bold text-foreground drop-shadow-sm">
                {cause || info.title}
              </DialogTitle>
            </DialogHeader>
          </div>
        </div>

        {step === 'form' ? (
          <div className="p-6">
            {/* Donation Type Toggle */}
            {type !== 'monthly' && (
              <div className="flex gap-2 p-1 bg-muted rounded-lg mb-6">
                <Button
                  type="button"
                  variant={donationType === 'one-time' ? 'default' : 'ghost'}
                  className="flex-1 h-10"
                  onClick={() => setDonationType('one-time')}
                >
                  <Gift className="w-4 h-4 mr-2" />
                  One-time
                </Button>
                <Button
                  type="button"
                  variant={donationType === 'monthly' ? 'default' : 'ghost'}
                  className="flex-1 h-10"
                  onClick={() => setDonationType('monthly')}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Monthly
                </Button>
              </div>
            )}

            {/* Amount Selection */}
            <div className="mb-6">
              <label className="text-sm font-medium mb-3 block">Select Amount</label>
              <div className="grid grid-cols-4 gap-2 mb-3">
                {amounts.map((amount) => (
                  <button
                    key={amount}
                    type="button"
                    onClick={() => handleAmountSelect(amount)}
                    className={`p-3 rounded-xl text-center font-semibold transition-all border-2 hover:scale-[1.02] active:scale-[0.98] ${
                      selectedAmount === amount
                        ? 'bg-primary text-primary-foreground border-primary shadow-lg'
                        : 'bg-muted/50 border-transparent hover:border-primary/30'
                    }`}
                  >
                    ${amount}
                  </button>
                ))}
              </div>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="number"
                  placeholder="Custom amount"
                  value={customAmount}
                  onChange={(e) => handleCustomAmount(e.target.value)}
                  className="pl-10 h-12 text-lg"
                  min={5}
                />
              </div>
            </div>

            {/* Impact Message */}
            {finalAmount > 0 && (
              <div className="mb-6 p-4 bg-success/10 border border-success/20 rounded-xl animate-fade-in">
                <div className="flex items-center gap-2 text-success">
                  <Sparkles className="w-5 h-5" />
                  <span className="font-medium">Your Impact</span>
                </div>
                <p className="text-sm mt-1 text-muted-foreground">
                  {getImpactMessage()}
                </p>
              </div>
            )}

            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="donor_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} placeholder="Your Name *" className="h-11" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} type="email" placeholder="Email * (for receipt)" className="h-11" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea 
                          {...field} 
                          placeholder="Leave a message (optional)" 
                          rows={2}
                          className="resize-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Payment Method Selection */}
                <div className="space-y-3">
                  <label className="text-sm font-medium block">Payment Method</label>
                  <Tabs value={paymentMethod} onValueChange={(v) => setPaymentMethod(v as 'card' | 'qr')}>
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="card" className="flex items-center gap-2">
                        <CreditCard className="w-4 h-4" />
                        Card
                      </TabsTrigger>
                      <TabsTrigger value="qr" className="flex items-center gap-2">
                        <QrCode className="w-4 h-4" />
                        QR Code
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>

                {/* Total */}
                <div className="p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl border">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">
                      {donationType === 'monthly' ? 'Monthly Donation' : 'Donation Total'}
                    </span>
                    <span className="text-3xl font-bold text-primary">
                      ${finalAmount.toFixed(2)}
                      {donationType === 'monthly' && <span className="text-sm font-normal">/mo</span>}
                    </span>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={loading || finalAmount < 5}
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
                      {paymentMethod === 'qr' ? (
                        <>
                          <QrCode className="mr-2 h-5 w-5" />
                          Generate QR Code
                        </>
                      ) : (
                        <>
                          <Heart className="mr-2 h-5 w-5" />
                          Donate ${finalAmount.toFixed(2)}{donationType === 'monthly' ? '/month' : ''}
                        </>
                      )}
                    </>
                  )}
                </Button>

                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                  <Shield className="w-4 h-4" />
                  <span>Secure payment via Stripe</span>
                  <span className="mx-2">•</span>
                  <span>100% goes to the cause</span>
                </div>
              </form>
            </Form>
          </div>
        ) : (
          /* QR Payment Step */
          <div className="p-6 text-center space-y-6">
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Scan to Pay</h3>
              <p className="text-sm text-muted-foreground">
                Use your phone camera to scan the QR code and complete your ${finalAmount.toFixed(2)} donation
              </p>
            </div>

            {/* QR Code Display */}
            <div className="relative inline-block p-4 bg-white rounded-2xl shadow-lg">
              {qrCodeUrl ? (
                <img 
                  src={qrCodeUrl} 
                  alt="Payment QR Code" 
                  className="w-56 h-56 mx-auto"
                />
              ) : (
                <div className="w-56 h-56 flex items-center justify-center">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
              )}
              {checkingPayment && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/80 rounded-2xl">
                  <div className="text-center">
                    <Loader2 className="w-6 h-6 animate-spin text-primary mx-auto mb-2" />
                    <span className="text-xs text-muted-foreground">Checking payment...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Or open on phone */}
            {qrPaymentUrl && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 justify-center text-sm text-muted-foreground">
                  <div className="h-px flex-1 bg-border" />
                  <span>or</span>
                  <div className="h-px flex-1 bg-border" />
                </div>
                
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => window.open(qrPaymentUrl, '_blank')}
                >
                  <Smartphone className="w-4 h-4 mr-2" />
                  Open Payment Link
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            )}

            {/* Back button */}
            <Button 
              variant="ghost" 
              className="w-full"
              onClick={() => setStep('form')}
            >
              ← Back to form
            </Button>

            {/* Security note */}
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <Shield className="w-4 h-4" />
              <span>Waiting for payment confirmation...</span>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
