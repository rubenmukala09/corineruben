import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { 
  Loader2, Tag, Shield, CheckCircle, Zap, Clock, 
  CreditCard, RefreshCw, X, Sparkles, Users, Lock, Mail,
  ArrowRight, ArrowLeft
} from "lucide-react";
import { trackConversion } from "@/utils/analyticsTracker";
import { Badge } from "@/components/ui/badge";
import { TrustIndicators } from "@/components/payment/TrustIndicators";
import { TermsCheckbox } from "@/components/payment/TermsCheckbox";
import { QuickVeteranToggle } from "@/components/payment/QuickVeteranToggle";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const stripeKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
const stripePromise = stripeKey ? loadStripe(stripeKey) : null;

// Inner PaymentForm component with its own stripe/elements hooks
interface PaymentFormProps {
  clientSecret: string;
  finalAmount: number;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
  onSuccess: () => void;
  onBack: () => void;
  email: string;
  serviceName: string;
  planTier: string;
  styles: any;
}

function PaymentForm({
  clientSecret,
  finalAmount,
  loading,
  setLoading,
  error,
  setError,
  onSuccess,
  onBack,
  email,
  serviceName,
  planTier,
  styles,
}: PaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [isReady, setIsReady] = useState(false);

  const handleSubmit = async () => {
    if (!stripe || !elements || !clientSecret) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { error: submitError } = await elements.submit();
      if (submitError) {
        throw submitError;
      }

      const { error: confirmError, paymentIntent } = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: `${window.location.origin}/payment-success`,
          receipt_email: email,
        },
        redirect: "if_required",
      });

      if (confirmError) {
        throw confirmError;
      }

      if (paymentIntent?.status === "succeeded" || paymentIntent?.status === "processing") {
        trackConversion(`subscription_${planTier.toLowerCase().replace(/\s+/g, '_')}`, finalAmount / 100);
        onSuccess();
        toast.success("Subscription activated!");
      }
    } catch (err: any) {
      console.error("Payment error:", err);
      setError(err.message || "Payment failed");
      toast.error(err.message || "Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {!isReady && (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
          <span className="ml-2 text-sm text-muted-foreground">Loading payment form...</span>
        </div>
      )}
      <div className={!isReady ? "opacity-0 h-0 overflow-hidden" : ""}>
        <PaymentElement
          onReady={() => setIsReady(true)}
          options={{
            layout: "tabs",
            paymentMethodOrder: ["card", "apple_pay", "google_pay"],
          }}
        />
      </div>
      
      {error && (
        <div className="p-3 bg-destructive/10 text-destructive rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* Trust Indicators */}
      <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <Lock className="w-3 h-3" />
          <span>Secure Payment</span>
        </div>
        <div className="flex items-center gap-1">
          <CreditCard className="w-3 h-3" />
          <span>256-bit Encryption</span>
        </div>
      </div>

      <div className="flex gap-3">
        <Button
          variant="outline"
          onClick={onBack}
          disabled={loading}
          className="flex-1"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={loading || !stripe || !elements || !isReady}
          className={`flex-1 text-white ${styles.buttonStyle}`}
          size="lg"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Lock className="w-4 h-4 mr-2" />
              Pay ${(finalAmount / 100).toFixed(2)}
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

interface SubscriptionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  priceId: string;
  serviceName: string;
  planTier: string;
  amount: number;
  features?: string[];
  variant?: 'default' | 'buying' | 'existing';
}

const tierInfo: Record<string, { 
  icon: React.ReactNode; 
  color: string; 
  highlights: string[];
  badge?: string;
}> = {
  Starter: {
    icon: <Shield className="w-5 h-5" />,
    color: "from-blue-500/20 to-cyan-500/20",
    highlights: ["Essential protection", "Email alerts", "Monthly reports"],
  },
  Family: {
    icon: <Users className="w-5 h-5" />,
    color: "from-purple-500/20 to-violet-500/20",
    highlights: ["Up to 5 family members", "Priority support", "Real-time monitoring"],
    badge: "MOST POPULAR"
  },
  Premium: {
    icon: <Sparkles className="w-5 h-5" />,
    color: "from-amber-500/20 to-orange-500/20",
    highlights: ["24/7 dedicated support", "Advanced AI protection", "Identity monitoring"],
    badge: "BEST VALUE"
  },
  Custom: {
    icon: <Zap className="w-5 h-5" />,
    color: "from-emerald-500/20 to-teal-500/20",
    highlights: ["Enterprise features", "Custom integrations", "Dedicated manager"],
    badge: "ENTERPRISE"
  },
  "Basic Care": {
    icon: <Shield className="w-5 h-5" />,
    color: "from-slate-500/20 to-gray-500/20",
    highlights: ["Monthly health checks", "Security patches", "Email support"],
    badge: "STARTER"
  },
  "Standard Care": {
    icon: <Shield className="w-5 h-5" />,
    color: "from-primary/20 to-accent/20",
    highlights: ["Weekly health checks", "Priority bug fixes", "Phone support"],
    badge: "POPULAR"
  },
  "Premium Care": {
    icon: <Sparkles className="w-5 h-5" />,
    color: "from-amber-500/20 to-orange-500/20",
    highlights: ["24/7 monitoring", "Critical response (4hr)", "Dedicated engineer"],
    badge: "PREMIUM"
  }
};

const variantStyles = {
  default: {
    headerGradient: 'from-primary/20 to-accent/20',
    priceColor: 'text-primary',
    buttonStyle: 'bg-primary hover:bg-primary/90',
    accentBorder: 'border-primary/20',
    iconBg: 'bg-primary/10',
  },
  buying: {
    headerGradient: 'from-accent/20 to-teal-500/20',
    priceColor: 'text-accent',
    buttonStyle: 'bg-gradient-to-r from-accent to-teal-500 hover:from-accent/90 hover:to-teal-500/90',
    accentBorder: 'border-accent/30',
    iconBg: 'bg-accent/10',
  },
  existing: {
    headerGradient: 'from-amber-500/20 to-orange-500/20',
    priceColor: 'text-amber-600 dark:text-amber-400',
    buttonStyle: 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600',
    accentBorder: 'border-amber-500/30',
    iconBg: 'bg-amber-500/10',
  },
};

interface SubscriptionFormProps {
  priceId: string;
  serviceName: string;
  planTier: string;
  amount: number;
  features: string[];
  variant: 'default' | 'buying' | 'existing';
  onClose: () => void;
}

function SubscriptionForm({
  priceId,
  serviceName,
  planTier,
  amount,
  features,
  variant,
  onClose,
}: SubscriptionFormProps) {
  const stripe = useStripe();
  const elements = useElements();

  const [step, setStep] = useState<"info" | "payment" | "success">("info");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isVeteran, setIsVeteran] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [discountCode, setDiscountCode] = useState("");
  const [discount, setDiscount] = useState<any>(null);
  const [validatingCode, setValidatingCode] = useState(false);
  const [showDiscountField, setShowDiscountField] = useState(false);

  const styles = variantStyles[variant];
  const info = tierInfo[planTier] || tierInfo.Starter;
  const displayFeatures = features.length > 0 ? features : info.highlights;
  const veteranDiscountPercent = 10;

  // Auto-fill from localStorage and auth
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user?.email) {
        setEmail(user.email);
      } else {
        const savedEmail = localStorage.getItem("userEmail") || localStorage.getItem("user_email");
        const savedName = localStorage.getItem("userName") || localStorage.getItem("user_name");
        if (savedEmail) setEmail(savedEmail);
        if (savedName) setName(savedName);
      }
    };
    checkAuth();
  }, []);

  // Calculate pricing
  const veteranDiscount = isVeteran ? Math.round(amount * veteranDiscountPercent / 100) : 0;
  const promoDiscount = discount ? discount.discountAmount : 0;
  const totalDiscount = veteranDiscount + promoDiscount;
  const finalAmount = amount - totalDiscount;

  const validateDiscountCode = async () => {
    if (!discountCode.trim()) return;
    
    setValidatingCode(true);
    try {
      const { data, error } = await supabase.functions.invoke('validate-discount-code', {
        body: {
          code: discountCode,
          serviceType: serviceName.toLowerCase().replace(/\s+/g, '_'),
          amount,
        },
      });

      if (error || !data.valid) {
        toast.error(data?.error || "Invalid discount code");
        setDiscount(null);
      } else {
        setDiscount(data.discount);
        toast.success("Discount applied!");
      }
    } catch (err) {
      toast.error("Failed to validate code");
      setDiscount(null);
    } finally {
      setValidatingCode(false);
    }
  };

  const handleInfoSubmit = async () => {
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    if (!termsAccepted) {
      toast.error("Please accept the terms and conditions");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Save to localStorage
      localStorage.setItem("userEmail", email);
      localStorage.setItem("user_email", email);
      if (name) {
        localStorage.setItem("userName", name);
        localStorage.setItem("user_name", name);
      }

      // Call edge function to create payment intent for subscription
      const { data, error: fnError } = await supabase.functions.invoke("create-payment-intent", {
        body: {
          priceId,
          mode: "subscription",
          customerEmail: email,
          customerName: name,
          isVeteran,
          metadata: { 
            serviceName, 
            planTier,
            discountCode: discount ? discountCode : null 
          }
        }
      });

      if (fnError) throw fnError;
      if (data?.error) throw new Error(data.error);

      setClientSecret(data.clientSecret);
      setStep("payment");
    } catch (err: any) {
      console.error("Error creating payment intent:", err);
      setError(err.message || "Failed to initialize payment");
      toast.error("Failed to initialize payment. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="space-y-5">
      {/* Progress Steps */}
      <div className="flex items-center justify-center gap-2 mb-4">
        {["info", "payment", "success"].map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                step === s
                  ? "bg-primary text-primary-foreground"
                  : ["info", "payment", "success"].indexOf(step) > i
                  ? "bg-primary/20 text-primary"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {["info", "payment", "success"].indexOf(step) > i ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                i + 1
              )}
            </div>
            {i < 2 && (
              <div
                className={`w-12 h-1 rounded ${
                  ["info", "payment", "success"].indexOf(step) > i
                    ? "bg-primary"
                    : "bg-muted"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* Step 1: Customer Info */}
        {step === "info" && (
          <motion.div
            key="info"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            {/* Product Summary */}
            <div className={`bg-gradient-to-r ${styles.headerGradient} rounded-xl p-4 border ${styles.accentBorder}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 ${styles.iconBg} backdrop-blur rounded-lg ${styles.priceColor}`}>
                    {info.icon}
                  </div>
                  <div>
                    <h3 className="font-bold">{serviceName} {planTier}</h3>
                    <p className="text-sm text-muted-foreground">{serviceName} - Monthly subscription</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-2xl font-bold ${styles.priceColor}`}>
                    ${(finalAmount / 100).toFixed(2)}
                  </div>
                  <span className="text-xs text-muted-foreground">/month</span>
                </div>
              </div>
              {totalDiscount > 0 && (
                <div className="mt-2 pt-2 border-t border-primary/20">
                  <Badge className="bg-green-500/20 text-green-600 border-green-500/30">
                    <Shield className="w-3 h-3 mr-1" />
                    You save: ${(totalDiscount / 100).toFixed(2)}
                  </Badge>
                </div>
              )}
            </div>

            {/* Features */}
            <div className="space-y-2">
              {displayFeatures.map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-2 text-sm"
                >
                  <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                  <span>{feature}</span>
                </motion.div>
              ))}
            </div>

            {/* Form Fields */}
            <div className="space-y-3">
              <div>
                <Label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="name" className="text-sm font-medium">
                  Full Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>

            {/* Veteran Discount Toggle */}
            <QuickVeteranToggle
              isVeteran={isVeteran}
              onVeteranChange={setIsVeteran}
              discountPercent={veteranDiscountPercent}
            />

            {/* Discount Code */}
            <AnimatePresence mode="wait">
              {!showDiscountField ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowDiscountField(true)}
                    className="w-full"
                  >
                    <Tag className="w-4 h-4 mr-2" />
                    Have a promo code?
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-2"
                >
                  <div className="flex gap-2">
                    <Input
                      value={discountCode}
                      onChange={(e) => setDiscountCode(e.target.value.toUpperCase())}
                      placeholder="PROMO CODE"
                      disabled={validatingCode || !!discount}
                      className="font-mono"
                    />
                    {!discount ? (
                      <Button
                        onClick={validateDiscountCode}
                        disabled={!discountCode.trim() || validatingCode}
                      >
                        {validatingCode ? <Loader2 className="w-4 h-4 animate-spin" /> : "Apply"}
                      </Button>
                    ) : (
                      <Button
                        variant="ghost"
                        onClick={() => {
                          setDiscount(null);
                          setDiscountCode('');
                        }}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                  {discount && (
                    <p className="text-sm text-green-600 flex items-center gap-1">
                      <CheckCircle className="w-4 h-4" />
                      Code "{discount.code}" applied!
                    </p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Terms Checkbox */}
            <TermsCheckbox
              checked={termsAccepted}
              onCheckedChange={setTermsAccepted}
            />

            {error && (
              <div className="p-3 bg-destructive/10 text-destructive rounded-lg text-sm">
                {error}
              </div>
            )}

            <Button
              onClick={handleInfoSubmit}
              disabled={loading || !email || !termsAccepted}
              className={`w-full h-12 text-base font-semibold text-white ${styles.buttonStyle}`}
              size="lg"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  Continue to Payment
                  <ArrowRight className="w-5 h-5 ml-2" />
                </>
              )}
            </Button>
          </motion.div>
        )}

        {/* Step 2: Payment */}
        {step === "payment" && clientSecret && (
          <motion.div
            key="payment"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            {/* Order Summary */}
            <div className={`bg-gradient-to-r ${styles.headerGradient} rounded-xl p-4 border ${styles.accentBorder}`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Order Total:</span>
                <span className={`text-xl font-bold ${styles.priceColor}`}>
                  ${(finalAmount / 100).toFixed(2)}/mo
                </span>
              </div>
              {totalDiscount > 0 && (
                <Badge className="bg-green-500/20 text-green-600 text-xs">
                  <Shield className="w-3 h-3 mr-1" />
                  Savings applied: ${(totalDiscount / 100).toFixed(2)}
                </Badge>
              )}
            </div>

            {/* Stripe Payment Element - wrapped with clientSecret */}
            <div className="bg-background rounded-xl p-4 border">
              {!stripePromise ? (
                <div className="p-4 bg-destructive/10 text-destructive rounded-lg text-center">
                  <CreditCard className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="font-medium">Payment system unavailable</p>
                  <p className="text-sm mt-1">Please refresh the page and try again.</p>
                </div>
              ) : (
                <Elements
                  stripe={stripePromise}
                  options={{
                    clientSecret,
                    appearance: {
                      theme: "stripe",
                      variables: {
                        colorPrimary: "#7c3aed",
                        borderRadius: "8px",
                      },
                    },
                  }}
                >
                  <PaymentForm
                    clientSecret={clientSecret}
                    finalAmount={finalAmount}
                    loading={loading}
                    setLoading={setLoading}
                    error={error}
                    setError={setError}
                    onSuccess={() => setStep("success")}
                    onBack={() => setStep("info")}
                    email={email}
                    serviceName={serviceName}
                    planTier={planTier}
                    styles={styles}
                  />
                </Elements>
              )}
            </div>
          </motion.div>
        )}

        {/* Step 3: Success */}
        {step === "success" && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8"
          >
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
              >
                <CheckCircle className="w-10 h-10 text-green-500" />
              </motion.div>
            </div>

            <h3 className="text-2xl font-bold mb-2">Subscription Active!</h3>
            <p className="text-muted-foreground mb-6">
              Thank you for subscribing to {serviceName} {planTier}!
              <br />
              A confirmation email has been sent to {email}.
            </p>

            <div className="space-y-3">
              <div className="bg-green-500/10 text-green-600 p-4 rounded-xl text-sm">
                <Sparkles className="w-5 h-5 mx-auto mb-2" />
                <p className="font-medium">Your {planTier} plan is now active</p>
              </div>

              <div className="p-4 bg-muted/50 rounded-xl space-y-2 text-sm text-left">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <RefreshCw className="w-4 h-4" />
                  <span>Auto-renews monthly • Cancel anytime</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>Instant activation</span>
                </div>
              </div>

              <Button onClick={onClose} className="w-full">
                Close
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <TrustIndicators compact />
    </div>
  );
}

export const SubscriptionDialog = ({
  open,
  onOpenChange,
  priceId,
  serviceName,
  planTier,
  amount,
  features = [],
  variant = 'default',
}: SubscriptionDialogProps) => {
  const info = tierInfo[planTier] || tierInfo.Starter;
  const styles = variantStyles[variant];

  const handleClose = () => {
    onOpenChange(false);
  };

  // Calculate initial amount for Stripe Elements setup
  const displayAmount = amount;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={`sm:max-w-lg p-0 overflow-hidden max-h-[90vh] overflow-y-auto border-2 ${styles.accentBorder}`}>
        {/* Header */}
        <div className="p-4 border-b bg-muted/30">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold flex items-center gap-2">
              <Lock className="w-5 h-5 text-primary" />
              Complete your subscription securely
            </DialogTitle>
          </DialogHeader>
        </div>

        <div className="p-6">
          <SubscriptionForm
            priceId={priceId}
            serviceName={serviceName}
            planTier={planTier}
            amount={amount}
            features={features}
            variant={variant}
            onClose={handleClose}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
