import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { 
  X, 
  Lock, 
  Shield, 
  CreditCard, 
  Wallet, 
  Building2,
  QrCode,
  Apple,
  Loader2,
  Check,
  Heart,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import confetti from "canvas-confetti";
import medicalCourierHero from "@/assets/medical-courier-hero.jpg";

// ===== SCHEMA =====
const paymentFormSchema = z.object({
  name: z.string().trim().min(2, "Name is required").max(100),
  email: z.string().trim().email("Valid email required").max(255),
});

type PaymentFormData = z.infer<typeof paymentFormSchema>;

// ===== TYPES =====
interface ExodusPaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode?: "payment" | "donation";
  defaultAmount?: number;
  onSuccess?: () => void;
}

// ===== TRUST BADGES COMPONENT =====
const TrustBadges = () => (
  <div className="flex items-center justify-center gap-4 mt-6">
    <div className="flex items-center gap-1.5 text-white/80 text-xs">
      <Lock className="h-4 w-4" />
      <span>SSL Secure</span>
    </div>
    <div className="flex items-center gap-1.5 text-white/80 text-xs">
      <Shield className="h-4 w-4" />
      <span>HIPAA Compliant</span>
    </div>
  </div>
);

const CardLogos = () => (
  <div className="flex items-center justify-center gap-2 mt-4">
    <img 
      src="https://js.stripe.com/v3/fingerprinted/img/visa-729c05c240c4bdb47b03ac81d9945bfe.svg" 
      alt="Visa" 
      className="h-5 opacity-70 hover:opacity-100 transition-opacity" 
    />
    <img 
      src="https://js.stripe.com/v3/fingerprinted/img/mastercard-4d8844094130711885b5e41b28c9848f.svg" 
      alt="Mastercard" 
      className="h-5 opacity-70 hover:opacity-100 transition-opacity" 
    />
    <img 
      src="https://js.stripe.com/v3/fingerprinted/img/amex-a49b82f46c5cd6a96a6e418a6ca1717c.svg" 
      alt="Amex" 
      className="h-5 opacity-70 hover:opacity-100 transition-opacity" 
    />
    <img 
      src="https://js.stripe.com/v3/fingerprinted/img/discover-ac52cd46f89fa40a29a0bfb954e33173.svg" 
      alt="Discover" 
      className="h-5 opacity-70 hover:opacity-100 transition-opacity" 
    />
  </div>
);

// ===== AMOUNT SELECTOR =====
interface AmountSelectorProps {
  amounts: number[];
  selectedAmount: number | null;
  customAmount: string;
  onSelectAmount: (amount: number) => void;
  onCustomAmountChange: (value: string) => void;
}

const AmountSelector = ({ 
  amounts, 
  selectedAmount, 
  customAmount, 
  onSelectAmount, 
  onCustomAmountChange 
}: AmountSelectorProps) => (
  <div className="grid grid-cols-4 gap-2">
    {amounts.map((amount) => (
      <button
        key={amount}
        type="button"
        onClick={() => onSelectAmount(amount)}
        className={`py-3 px-4 rounded-full font-semibold text-sm transition-all duration-200 ${
          selectedAmount === amount
            ? "bg-exodus text-white shadow-lg scale-105"
            : "bg-muted text-muted-foreground hover:bg-muted/80"
        }`}
      >
        ${amount}
      </button>
    ))}
    <div className="relative col-span-4 mt-2">
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">$</span>
      <Input
        type="number"
        placeholder="Custom amount"
        value={customAmount}
        onChange={(e) => onCustomAmountChange(e.target.value)}
        className="pl-8 text-center h-12 rounded-full border-2 border-border focus:border-exodus"
      />
    </div>
  </div>
);

// ===== QR CODE SECTION =====
interface QRCodeSectionProps {
  amount: number;
  email: string;
  name: string;
  onSuccess: () => void;
}

const QRCodeSection = ({ amount, email, name, onSuccess }: QRCodeSectionProps) => {
  const [qrUrl, setQrUrl] = useState<string | null>(null);
  const [paymentLinkId, setPaymentLinkId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [polling, setPolling] = useState(false);
  const { toast } = useToast();

  const generateQR = async () => {
    if (amount < 1) {
      toast({ title: "Invalid Amount", description: "Please select an amount first", variant: "destructive" });
      return;
    }
    
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("generate-payment-link", {
        body: { 
          amount: Math.round(amount * 100),
          customerEmail: email,
          customerName: name,
          mode: "payment"
        }
      });
      
      if (error) throw error;
      
      setQrUrl(data.url);
      setPaymentLinkId(data.sessionId);
      setPolling(true);
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  // Poll for payment completion
  useEffect(() => {
    if (!polling || !paymentLinkId) return;

    const interval = setInterval(async () => {
      try {
        const { data } = await supabase.functions.invoke("verify-payment-link", {
          body: { sessionId: paymentLinkId }
        });
        
        if (data?.status === "complete" || data?.status === "paid") {
          setPolling(false);
          confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
          onSuccess();
        }
      } catch (err) {
        console.error("Polling error:", err);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [polling, paymentLinkId, onSuccess]);

  if (qrUrl) {
    return (
      <div className="text-center space-y-4">
        <div className="p-4 bg-card rounded-xl border-2 border-dashed border-border inline-block">
          <img 
            src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(qrUrl)}`}
            alt="Payment QR Code"
            className="w-44 h-44"
          />
        </div>
        <p className="text-sm text-muted-foreground">
          Scan with your phone camera to complete payment
        </p>
        {polling && (
          <div className="flex items-center justify-center gap-2 text-exodus">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="text-sm">Waiting for payment...</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <Button
      type="button"
      variant="outline"
      onClick={generateQR}
      disabled={loading || amount < 1}
      className="w-full h-12 rounded-xl border-2"
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin mr-2" />
      ) : (
        <QrCode className="h-4 w-4 mr-2" />
      )}
      Generate QR Code
    </Button>
  );
};

// ===== CARD PAYMENT FORM =====
interface CardPaymentFormProps {
  amount: number;
  name: string;
  email: string;
  isMonthly: boolean;
  onSuccess: () => void;
}

const CardPaymentForm = ({ amount, name, email, isMonthly, onSuccess }: CardPaymentFormProps) => {
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
      if (submitError) throw new Error(submitError.message);

      const { error: confirmError, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/payment-success?type=donation`,
          receipt_email: email,
        },
        redirect: "if_required",
      });

      if (confirmError) throw new Error(confirmError.message);

      if (paymentIntent?.status === "succeeded") {
        confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
        toast({ title: "💖 Thank You!", description: "Your payment was successful!" });
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
            business: { name: "Exodus Health Couriers" },
          }}
        />
      </div>

      {error && (
        <p className="text-sm text-destructive bg-destructive/10 p-3 rounded-lg">{error}</p>
      )}

      <Button
        type="submit"
        disabled={!stripe || processing}
        className="w-full h-14 bg-exodus hover:bg-exodus-dark text-white font-semibold text-lg rounded-xl shadow-lg"
      >
        {processing ? (
          <><Loader2 className="h-5 w-5 animate-spin mr-2" /> Processing...</>
        ) : (
          <>Pay ${amount.toFixed(2)} {isMonthly && "/month"}</>
        )}
      </Button>
    </form>
  );
};

// ===== SUCCESS SCREEN =====
const SuccessScreen = ({ amount, onClose }: { amount: number; onClose: () => void }) => (
  <div className="text-center py-8 space-y-6">
    <div className="w-20 h-20 mx-auto bg-success/10 rounded-full flex items-center justify-center">
      <Check className="h-10 w-10 text-success" />
    </div>
    <div>
      <h3 className="text-2xl font-bold text-foreground">Thank You!</h3>
      <p className="text-muted-foreground mt-2">
        Your ${amount.toFixed(2)} contribution helps us deliver vital healthcare supplies to those in need.
      </p>
    </div>
    <div className="flex items-center justify-center gap-2 text-exodus">
      <Heart className="h-5 w-5 fill-current" />
      <span className="font-medium">You're a healthcare hero!</span>
    </div>
    <Button onClick={onClose} className="bg-exodus hover:bg-exodus-dark">
      Close
    </Button>
  </div>
);

// ===== MAIN COMPONENT =====
export const ExodusPaymentModal = ({ 
  open, 
  onOpenChange, 
  mode = "donation",
  defaultAmount = 50,
  onSuccess 
}: ExodusPaymentModalProps) => {
  const { toast } = useToast();
  const [step, setStep] = useState<"form" | "payment" | "success">("form");
  const [isMonthly, setIsMonthly] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(defaultAmount);
  const [customAmount, setCustomAmount] = useState("");
  const [paymentTab, setPaymentTab] = useState("card");
  const [showQR, setShowQR] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [stripeInstance, setStripeInstance] = useState<Stripe | null>(null);
  const [loading, setLoading] = useState(false);

  const amounts = [25, 50, 100, 250];
  const finalAmount = selectedAmount || (customAmount ? parseFloat(customAmount) : 0);

  const form = useForm<PaymentFormData>({
    resolver: zodResolver(paymentFormSchema),
    defaultValues: {
      name: localStorage.getItem("checkout_name") || "",
      email: localStorage.getItem("checkout_email") || "",
    },
  });

  // Reset on close
  useEffect(() => {
    if (!open) {
      setStep("form");
      setClientSecret(null);
      setShowQR(false);
    }
  }, [open]);

  const handleSelectAmount = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    setSelectedAmount(null);
  };

  const handleContinueToPayment = async (data: PaymentFormData) => {
    if (finalAmount < 1) {
      toast({ title: "Invalid Amount", description: "Please select an amount of at least $1", variant: "destructive" });
      return;
    }

    setLoading(true);
    localStorage.setItem("checkout_name", data.name);
    localStorage.setItem("checkout_email", data.email);

    try {
      // Initialize Stripe
      const stripeKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
      if (!stripeKey) throw new Error("Stripe not configured");
      
      const stripe = await loadStripe(stripeKey);
      if (!stripe) throw new Error("Failed to load Stripe");
      setStripeInstance(stripe);

      // Create payment intent
      const { data: intentData, error } = await supabase.functions.invoke("create-cart-payment-intent", {
        body: {
          amount: Math.round(finalAmount * 100),
          currency: "usd",
          customerEmail: data.email,
          customerName: data.name,
          metadata: {
            type: mode,
            frequency: isMonthly ? "monthly" : "one-time"
          }
        }
      });

      if (error) throw error;
      
      setClientSecret(intentData.clientSecret);
      setStep("payment");
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleSuccess = () => {
    setStep("success");
    onSuccess?.();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden rounded-2xl border-0 shadow-2xl">
        <DialogTitle className="sr-only">Secure Payment</DialogTitle>
        
        <div className="grid md:grid-cols-[380px,1fr]">
          {/* ===== LEFT COLUMN - VISUALS ===== */}
          <div 
            className="hidden md:flex flex-col justify-between p-8 text-white relative overflow-hidden"
            style={{ 
              background: "linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #3b82f6 100%)"
            }}
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>

            {/* Content */}
            <div className="relative z-10 space-y-6">
              <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-lg border-2 border-white/20">
                <img 
                  src={medicalCourierHero} 
                  alt="Medical Courier" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div>
                <h2 className="text-2xl font-bold">Exodus Health Couriers</h2>
                <p className="text-white/80 text-sm mt-1">Delivering Healthcare, Saving Lives</p>
              </div>
            </div>

            <div className="relative z-10 space-y-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20">
                <p className="text-lg font-medium leading-relaxed">
                  "Your support helps us serve healthcare communities across the nation, ensuring critical medical supplies reach those who need them most."
                </p>
              </div>

              <TrustBadges />
              <CardLogos />
            </div>
          </div>

          {/* ===== RIGHT COLUMN - PAYMENT FORM ===== */}
          <div className="bg-card p-8 relative">
            {/* Close Button */}
            <button
              onClick={() => onOpenChange(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted transition-colors"
            >
              <X className="h-5 w-5 text-muted-foreground" />
            </button>

            {step === "success" ? (
              <SuccessScreen amount={finalAmount} onClose={() => onOpenChange(false)} />
            ) : step === "form" ? (
              <form onSubmit={form.handleSubmit(handleContinueToPayment)} className="space-y-6">
                {/* Header */}
                <div>
                  <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                    <Lock className="h-5 w-5 text-exodus" />
                    Secure Payment
                  </h3>
                  <p className="text-muted-foreground text-sm mt-1">All transactions are encrypted and secure</p>
                </div>

                {/* Step 1: Amount & Frequency */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium text-foreground">Payment Frequency</Label>
                    <div className="flex items-center gap-3">
                      <span className={`text-sm ${!isMonthly ? "font-semibold text-exodus" : "text-muted-foreground"}`}>
                        One-Time
                      </span>
                      <Switch
                        checked={isMonthly}
                        onCheckedChange={setIsMonthly}
                        className="data-[state=checked]:bg-exodus"
                      />
                      <span className={`text-sm ${isMonthly ? "font-semibold text-exodus" : "text-muted-foreground"}`}>
                        Monthly
                      </span>
                    </div>
                  </div>

                  <AmountSelector
                    amounts={amounts}
                    selectedAmount={selectedAmount}
                    customAmount={customAmount}
                    onSelectAmount={handleSelectAmount}
                    onCustomAmountChange={handleCustomAmountChange}
                  />
                </div>

                {/* Step 2: User Details */}
                <div className="space-y-4 pt-2">
                  <div>
                    <Label htmlFor="name" className="text-sm font-medium text-foreground">Full Name</Label>
                    <Input
                      id="name"
                      placeholder="John Smith"
                      {...form.register("name")}
                      className="mt-1.5 h-12 rounded-xl border-border"
                    />
                    {form.formState.errors.name && (
                      <p className="text-xs text-destructive mt-1">{form.formState.errors.name.message}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-sm font-medium text-foreground">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      {...form.register("email")}
                      className="mt-1.5 h-12 rounded-xl border-border"
                    />
                    {form.formState.errors.email && (
                      <p className="text-xs text-destructive mt-1">{form.formState.errors.email.message}</p>
                    )}
                  </div>
                </div>

                {/* Continue Button */}
                <Button
                  type="submit"
                  disabled={loading || finalAmount < 1}
                  className="w-full h-14 bg-exodus hover:bg-exodus-dark text-white font-semibold text-lg rounded-xl shadow-lg"
                >
                  {loading ? (
                    <><Loader2 className="h-5 w-5 animate-spin mr-2" /> Preparing Payment...</>
                  ) : (
                    <>Continue to Payment — ${finalAmount.toFixed(2)}{isMonthly && "/mo"}</>
                  )}
                </Button>

                {/* Footer */}
                <p className="text-center text-xs text-muted-foreground">
                  Powered by Stripe • Encrypted Security
                </p>
              </form>
            ) : (
              /* PAYMENT STEP */
              <div className="space-y-6">
                {/* Header */}
                <div>
                  <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-exodus" />
                    Complete Payment
                  </h3>
                  <p className="text-muted-foreground text-sm mt-1">
                    Amount: <span className="font-semibold text-foreground">${finalAmount.toFixed(2)}</span>
                    {isMonthly && <span className="text-exodus"> /month</span>}
                  </p>
                </div>

                {/* Payment Method Tabs */}
                <Tabs value={paymentTab} onValueChange={setPaymentTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-3 h-12 rounded-xl bg-muted">
                    <TabsTrigger value="card" className="rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Card
                    </TabsTrigger>
                    <TabsTrigger value="wallet" className="rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm">
                      <Wallet className="h-4 w-4 mr-2" />
                      Pay
                    </TabsTrigger>
                    <TabsTrigger value="bank" className="rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm">
                      <Building2 className="h-4 w-4 mr-2" />
                      Bank
                    </TabsTrigger>
                  </TabsList>

                  {/* Card Tab */}
                  <TabsContent value="card" className="mt-4 space-y-4">
                    {stripeInstance && clientSecret ? (
                      <Elements
                        stripe={stripeInstance}
                        options={{
                          clientSecret,
                          appearance: {
                            theme: "stripe",
                            variables: {
                              colorPrimary: "hsl(221, 69%, 33%)",
                              borderRadius: "12px",
                            }
                          }
                        }}
                      >
                        <CardPaymentForm
                          amount={finalAmount}
                          name={form.getValues("name")}
                          email={form.getValues("email")}
                          isMonthly={isMonthly}
                          onSuccess={handleSuccess}
                        />
                      </Elements>
                    ) : (
                      <div className="flex items-center justify-center py-8">
                        <Loader2 className="h-6 w-6 animate-spin text-exodus" />
                        <span className="ml-2 text-muted-foreground">Loading payment form...</span>
                      </div>
                    )}

                    {/* QR Code Toggle */}
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => setShowQR(!showQR)}
                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-exodus transition-colors mx-auto"
                      >
                        <QrCode className="h-4 w-4" />
                        Pay via QR Code
                        {showQR ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                      </button>
                      {showQR && (
                        <div className="mt-4">
                          <QRCodeSection
                            amount={finalAmount}
                            email={form.getValues("email")}
                            name={form.getValues("name")}
                            onSuccess={handleSuccess}
                          />
                        </div>
                      )}
                    </div>
                  </TabsContent>

                  {/* Digital Wallets Tab */}
                  <TabsContent value="wallet" className="mt-4 space-y-3">
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full h-14 rounded-xl border-2 hover:bg-muted flex items-center justify-center gap-3"
                    >
                      <Apple className="h-6 w-6" />
                      <span className="font-semibold text-lg">Apple Pay</span>
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full h-14 rounded-xl border-2 hover:bg-muted flex items-center justify-center gap-3"
                    >
                      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                      </svg>
                      <span className="font-semibold text-lg">Google Pay</span>
                    </Button>
                    <p className="text-center text-xs text-muted-foreground pt-2">
                      Digital wallets are processed securely via Stripe
                    </p>
                  </TabsContent>

                  {/* Bank Transfer Tab */}
                  <TabsContent value="bank" className="mt-4">
                    <div className="bg-muted/50 rounded-xl p-6 text-center space-y-4">
                      <Building2 className="h-12 w-12 text-muted-foreground mx-auto" />
                      <div>
                        <h4 className="font-semibold text-foreground">ACH Bank Transfer</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          For larger donations, bank transfers may save on processing fees.
                        </p>
                      </div>
                      <Button variant="outline" className="rounded-xl">
                        Contact Us for Bank Details
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>

                {/* Back Button */}
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setStep("form")}
                  className="w-full text-muted-foreground"
                >
                  ← Back to details
                </Button>

                {/* Footer */}
                <p className="text-center text-xs text-muted-foreground">
                  Powered by Stripe • Encrypted Security
                </p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExodusPaymentModal;
