import { useState, useEffect, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
// Stripe Elements are lazy-loaded to prevent 155KB SDK from loading on initial page visit
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
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Shield,
  CheckCircle,
  Loader2,
  CreditCard,
  Lock,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  RefreshCw,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { QuickVeteranToggle } from "./QuickVeteranToggle";
import { TrustIndicators } from "./TrustIndicators";
import { useStripeKey } from "@/hooks/useStripeKey";

// Lazy load Stripe payment elements to prevent SDK from loading until payment step
const LazySmartPaymentElements = lazy(() => import("./LazySmartPaymentElements"));

export interface PaymentItem {
  id: string;
  name: string;
  price: number;
  quantity?: number;
  isDigital?: boolean;
}

interface SmartPaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: PaymentItem[];
  title?: string;
  description?: string;
  onSuccess?: () => void;
}

interface PaymentFormProps {
  items: PaymentItem[];
  onSuccess?: () => void;
  onClose: () => void;
}

function SmartPaymentForm({ items, onSuccess, onClose }: PaymentFormProps) {
  const { stripePromise, loading: stripeLoading, error: stripeError, initializeStripe } = useStripeKey();
  const [step, setStep] = useState<"info" | "payment" | "success">("info");
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isVeteran, setIsVeteran] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Initialize Stripe when component mounts (dialog opens)
  useEffect(() => {
    initializeStripe();
  }, [initializeStripe]);

  // Auto-fill from localStorage
  useEffect(() => {
    const savedEmail = localStorage.getItem("user_email") || localStorage.getItem("checkout_email");
    const savedName = localStorage.getItem("user_name") || localStorage.getItem("checkout_name");
    const savedVeteran = localStorage.getItem("is_veteran") || localStorage.getItem("checkout_veteran");
    if (savedEmail) setEmail(savedEmail);
    if (savedName) setName(savedName);
    if (savedVeteran === "true") setIsVeteran(true);

    // Try to get user info from Supabase session
    supabase.auth.getUser().then(({ data }) => {
      if (data.user?.email && !savedEmail) {
        setEmail(data.user.email);
      }
    });
  }, []);

  // Calculate pricing with veteran discount
  const subtotal = items.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
  const veteranDiscount = isVeteran ? subtotal * 0.1 : 0;
  const finalAmount = subtotal - veteranDiscount;
  const amountInCents = Math.round(finalAmount * 100);

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
      localStorage.setItem("checkout_email", email);
      localStorage.setItem("user_name", name);
      localStorage.setItem("checkout_name", name);
      localStorage.setItem("is_veteran", isVeteran.toString());
      localStorage.setItem("checkout_veteran", isVeteran.toString());

      // Call edge function to create payment intent
      const { data, error: fnError } = await supabase.functions.invoke("create-cart-payment-intent", {
        body: {
          amount: amountInCents,
          customerEmail: email,
          customerName: name,
          isVeteran,
          items: items.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity || 1,
          })),
          metadata: { source: "smart_payment" },
        },
      });

      if (fnError) throw fnError;
      if (data?.error) throw new Error(data.error);

      if (!data?.clientSecret) {
        throw new Error("Failed to get payment client secret");
      }

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

  const isDigital = items.some((item) => item.isDigital);

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
            {/* Order Summary */}
            <div className="bg-muted/50 rounded-xl p-4 border">
              <h4 className="font-semibold mb-3">Order Summary</h4>
              <div className="space-y-2 mb-3">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {item.name} {item.quantity && item.quantity > 1 && `× ${item.quantity}`}
                    </span>
                    <span className="font-medium">
                      ${(item.price * (item.quantity || 1)).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
              {isVeteran && veteranDiscount > 0 && (
                <div className="flex justify-between text-sm text-green-600 border-t pt-2">
                  <span>Veteran Discount (10%)</span>
                  <span>-${veteranDiscount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-lg mt-2 pt-2 border-t">
                <span>Total</span>
                <span className="text-primary">${finalAmount.toFixed(2)}</span>
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="email">Email Address *</Label>
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
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                  className="mt-1"
                />
              </div>

              {/* Veteran Discount Toggle */}
              <QuickVeteranToggle
                isVeteran={isVeteran}
                onVeteranChange={setIsVeteran}
                discountPercent={10}
              />

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
                  ${finalAmount.toFixed(2)}
                </span>
              </div>
              {isVeteran && (
                <Badge className="bg-green-500/20 text-green-600 text-xs">
                  <Shield className="w-3 h-3 mr-1" />
                  Veteran discount applied
                </Badge>
              )}
            </div>

            {/* Stripe Payment Element */}
            <div className="bg-background rounded-xl p-4 border">
              {stripeLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-6 h-6 animate-spin text-primary" />
                  <span className="ml-2 text-sm text-muted-foreground">Initializing payment...</span>
                </div>
              ) : !stripePromise || stripeError ? (
                <div className="p-4 bg-destructive/10 text-destructive rounded-lg text-center">
                  <CreditCard className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="font-medium">Payment system unavailable</p>
                  <p className="text-sm mt-1">{stripeError || "Please refresh the page and try again."}</p>
                  <Button variant="outline" size="sm" className="mt-3" onClick={() => window.location.reload()}>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Refresh Page
                  </Button>
                </div>
              ) : (
                <Suspense fallback={
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="w-6 h-6 animate-spin text-primary" />
                  </div>
                }>
                  <LazySmartPaymentElements
                    stripePromise={stripePromise}
                    clientSecret={clientSecret}
                    onSuccess={handlePaymentSuccess}
                    amount={finalAmount}
                    email={email}
                    onBack={() => setStep("info")}
                  />
                </Suspense>
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
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
              >
                <CheckCircle className="w-10 h-10 text-green-500" />
              </motion.div>
            </div>

            <h3 className="text-2xl font-bold mb-2">Payment Successful!</h3>
            <p className="text-muted-foreground mb-6">
              Thank you for your purchase!
              <br />
              A confirmation email has been sent to {email}.
            </p>

            {isDigital && (
              <div className="bg-green-500/10 text-green-600 p-4 rounded-xl text-sm mb-4">
                <Sparkles className="w-5 h-5 mx-auto mb-2" />
                <p className="font-medium">Check your email for download links</p>
                <p className="text-xs mt-1">Expected delivery: 2-5 minutes</p>
              </div>
            )}

            <Button onClick={onClose} className="w-full">
              Close
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function SmartPaymentDialog({
  open,
  onOpenChange,
  items,
  title = "Complete Your Purchase",
  description,
  onSuccess,
}: SmartPaymentDialogProps) {
  const itemCount = items.reduce((sum, item) => sum + (item.quantity || 1), 0);

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
              <span className="block">{title}</span>
              <Badge variant="outline" className="text-xs font-normal mt-1">
                <Lock className="w-3 h-3 mr-1" />
                Powered by Stripe
              </Badge>
            </div>
          </DialogTitle>
          <DialogDescription>
            {description || `${itemCount} ${itemCount === 1 ? "item" : "items"} in your order`}
          </DialogDescription>
        </DialogHeader>

        <SmartPaymentForm
          items={items}
          onSuccess={() => {
            onOpenChange(false);
            onSuccess?.();
          }}
          onClose={handleClose}
        />
      </DialogContent>
    </Dialog>
  );
}
