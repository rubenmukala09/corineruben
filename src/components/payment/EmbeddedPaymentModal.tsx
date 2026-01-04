import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Shield,
  CheckCircle,
  Loader2,
  CreditCard,
  Lock,
  Star,
  ArrowRight,
  ArrowLeft,
  Sparkles,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const stripeKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
const stripePromise = stripeKey ? loadStripe(stripeKey) : null;

export interface EmbeddedPaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "subscription" | "payment";
  priceId: string;
  productName: string;
  amount: number; // in cents
  description?: string;
  features?: string[];
  onSuccess?: () => void;
}

interface PaymentFormProps {
  mode: "subscription" | "payment";
  priceId: string;
  productName: string;
  amount: number;
  description?: string;
  features?: string[];
  onSuccess?: () => void;
  onClose: () => void;
}

function PaymentForm({
  mode,
  priceId,
  productName,
  amount,
  description,
  features,
  onSuccess,
  onClose,
}: PaymentFormProps) {
  const [step, setStep] = useState<"info" | "payment" | "success">("info");
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isVeteran, setIsVeteran] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Auto-fill from localStorage
  useEffect(() => {
    const savedEmail = localStorage.getItem("user_email");
    const savedName = localStorage.getItem("user_name");
    const savedVeteran = localStorage.getItem("is_veteran");
    if (savedEmail) setEmail(savedEmail);
    if (savedName) setName(savedName);
    if (savedVeteran === "true") setIsVeteran(true);
  }, []);

  // Calculate pricing with veteran discount
  const veteranDiscount = isVeteran ? Math.round(amount * 0.1) : 0;
  const finalAmount = amount - veteranDiscount;

  const handleInfoSubmit = async () => {
    if (!email || !name) {
      toast.error("Please enter your name and email");
      return;
    }

    if (!termsAccepted) {
      toast.error("Please accept the terms and conditions");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Save to localStorage for future
      localStorage.setItem("user_email", email);
      localStorage.setItem("user_name", name);
      localStorage.setItem("is_veteran", isVeteran.toString());

      // Call edge function to create payment intent
      const { data, error: fnError } = await supabase.functions.invoke("create-payment-intent", {
        body: {
          priceId,
          mode,
          customerEmail: email,
          customerName: name,
          isVeteran,
          metadata: { productName }
        }
      });

      if (fnError) throw fnError;
      if (data.error) throw new Error(data.error);

      setClientSecret(data.clientSecret);
      setStep("payment");
    } catch (err: any) {
      console.error("Error creating payment intent:", err);
      setError(err.message || "Failed to initialize payment");
      toast.error("Failed to initialize payment. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePaymentSuccess = () => {
    setStep("success");
    toast.success("Payment successful!");
    onSuccess?.();
  };

  return (
    <div className="space-y-6">
      {/* Progress Steps */}
      <div className="flex items-center justify-center gap-2 mb-6">
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
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl p-4 border border-primary/20">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-lg">{productName}</h3>
                  {description && (
                    <p className="text-sm text-muted-foreground">{description}</p>
                  )}
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">
                    ${(finalAmount / 100).toFixed(2)}
                  </div>
                  {mode === "subscription" && (
                    <span className="text-xs text-muted-foreground">/month</span>
                  )}
                </div>
              </div>
              {isVeteran && veteranDiscount > 0 && (
                <div className="mt-2 pt-2 border-t border-primary/20">
                  <Badge className="bg-success/20 text-success border-success/30">
                    <Shield className="w-3 h-3 mr-1" />
                    Veteran Discount: -${(veteranDiscount / 100).toFixed(2)}
                  </Badge>
                </div>
              )}
            </div>

            {/* Features List */}
            {features && features.length > 0 && (
              <div className="space-y-2">
                {features.slice(0, 4).map((feature, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Form Fields */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="mt-1"
                />
              </div>

              {/* Veteran Discount Toggle */}
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-xl border">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium">Veteran Discount</p>
                    <p className="text-xs text-muted-foreground">
                      10% off for veterans & military
                    </p>
                  </div>
                </div>
                <Switch
                  checked={isVeteran}
                  onCheckedChange={setIsVeteran}
                />
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start gap-3">
                <Checkbox
                  id="terms"
                  checked={termsAccepted}
                  onCheckedChange={(checked) => setTermsAccepted(checked === true)}
                  className="mt-1"
                />
                <Label htmlFor="terms" className="text-sm text-muted-foreground">
                  I agree to the{" "}
                  <a href="/terms" className="text-primary hover:underline">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="/privacy" className="text-primary hover:underline">
                    Privacy Policy
                  </a>
                </Label>
              </div>
            </div>

            {error && (
              <div className="p-3 bg-destructive/10 text-destructive rounded-lg text-sm">
                {error}
              </div>
            )}

            <Button
              onClick={handleInfoSubmit}
              disabled={isLoading || !email || !name || !termsAccepted}
              className="w-full"
              size="lg"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  Continue to Payment
                  <ArrowRight className="w-4 h-4 ml-2" />
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
            <div className="bg-muted/50 rounded-xl p-4 border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Order Total:</span>
                <span className="text-xl font-bold text-primary">
                  ${(finalAmount / 100).toFixed(2)}
                  {mode === "subscription" && <span className="text-sm font-normal">/mo</span>}
                </span>
              </div>
              {isVeteran && (
                <Badge className="bg-success/20 text-success text-xs">
                  <Shield className="w-3 h-3 mr-1" />
                  Veteran discount applied
                </Badge>
              )}
            </div>

            {/* Stripe Payment Element */}
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
                        borderRadius: "8px",
                        colorPrimary: "#6D28D9",
                      },
                    },
                  }}
                >
                  <PaymentElementWrapper
                    onSuccess={handlePaymentSuccess}
                    amount={finalAmount / 100}
                    email={email}
                    onBack={() => setStep("info")}
                  />
                </Elements>
              )}
            </div>

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
            <div className="w-20 h-20 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
              >
                <CheckCircle className="w-10 h-10 text-success" />
              </motion.div>
            </div>

            <h3 className="text-2xl font-bold mb-2">Payment Successful!</h3>
            <p className="text-muted-foreground mb-6">
              Thank you for your {mode === "subscription" ? "subscription" : "purchase"}!
              <br />
              A confirmation email has been sent to {email}.
            </p>

            <div className="space-y-3">
              <div className="bg-success/10 text-success p-4 rounded-xl text-sm">
                <Sparkles className="w-5 h-5 mx-auto mb-2" />
                <p className="font-medium">You now have access to {productName}</p>
              </div>

              <Button onClick={onClose} className="w-full">
                Close
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Wrapper component to use hooks inside Elements provider
function PaymentElementWrapper({
  onSuccess,
  amount,
  email,
  onBack,
}: {
  onSuccess: () => void;
  amount: number;
  email: string;
  onBack: () => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!stripe || !elements) return;

    setIsLoading(true);
    setError(null);

    try {
      const { error: submitError } = await elements.submit();
      if (submitError) throw submitError;

      const { error: confirmError, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/payment-success`,
          receipt_email: email,
        },
        redirect: "if_required",
      });

      if (confirmError) throw confirmError;

      if (paymentIntent?.status === "succeeded" || paymentIntent?.status === "processing") {
        onSuccess();
      }
    } catch (err: any) {
      console.error("Payment error:", err);
      setError(err.message || "Payment failed");
      toast.error(err.message || "Payment failed. Please try again.");
    } finally {
      setIsLoading(false);
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

      <div className="flex gap-3">
        <Button variant="outline" onClick={onBack} disabled={isLoading} className="flex-1">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button onClick={handleSubmit} disabled={isLoading || !stripe || !elements || !isReady} className="flex-1" size="lg">
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Lock className="w-4 h-4 mr-2" />
              Pay ${amount.toFixed(2)}
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

export function EmbeddedPaymentModal({
  open,
  onOpenChange,
  mode,
  priceId,
  productName,
  amount,
  description,
  features,
  onSuccess,
}: EmbeddedPaymentModalProps) {
  const handleClose = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto rounded-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-primary" />
            </div>
            <div>
              <span className="block">Secure Checkout</span>
              <Badge variant="outline" className="text-xs font-normal mt-1">
                <Lock className="w-3 h-3 mr-1" />
                Powered by Stripe
              </Badge>
            </div>
          </DialogTitle>
          <DialogDescription>
            Complete your {mode === "subscription" ? "subscription" : "purchase"} securely
          </DialogDescription>
        </DialogHeader>

        <PaymentForm
          mode={mode}
          priceId={priceId}
          productName={productName}
          amount={amount}
          description={description}
          features={features}
          onSuccess={onSuccess}
          onClose={handleClose}
        />
      </DialogContent>
    </Dialog>
  );
}
