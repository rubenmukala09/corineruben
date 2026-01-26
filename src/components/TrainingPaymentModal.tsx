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
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Shield,
  CheckCircle,
  Loader2,
  CreditCard,
  Lock,
  ArrowRight,
  ArrowLeft,
  Calendar as CalendarIcon,
  Phone,
  Sparkles,
  Smartphone,
} from "lucide-react";
import { QRCodePaymentSection } from "@/components/payment/QRCodePaymentSection";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useStripeKey } from "@/hooks/useStripeKey";
import { QuickVeteranToggle } from "@/components/payment/QuickVeteranToggle";
import { TermsCheckbox } from "@/components/payment/TermsCheckbox";
import { TrustIndicators } from "@/components/payment/TrustIndicators";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { US_STATES, formatPhoneNumber } from "@/utils/formValidation";

// Lazy load Stripe payment form to prevent SDK from loading until payment step
const LazyTrainingPaymentForm = lazy(() => import("@/components/payment/LazyTrainingPaymentForm"));

interface TrainingPaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  serviceName: string;
  serviceType: string;
  serviceTier?: string;
  basePrice: number; // in dollars
  features?: string[];
  duration?: string;
  onSuccess?: () => void;
}

export function TrainingPaymentModal({
  open,
  onOpenChange,
  serviceName,
  serviceType,
  serviceTier,
  basePrice,
  features = [],
  duration,
  onSuccess,
}: TrainingPaymentModalProps) {
  const { stripePromise, loading: stripeLoading, initializeStripe } = useStripeKey();
  const [step, setStep] = useState<"info" | "payment" | "success">("info");
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [state, setState] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [isVeteran, setIsVeteran] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Initialize Stripe when dialog opens
  useEffect(() => {
    if (open) {
      initializeStripe();
    }
  }, [open, initializeStripe]);

  // Auto-fill from localStorage
  useEffect(() => {
    const savedEmail = localStorage.getItem("checkout_email");
    const savedName = localStorage.getItem("checkout_name");
    const savedVeteran = localStorage.getItem("is_veteran");
    if (savedEmail) setEmail(savedEmail);
    if (savedName) setName(savedName);
    if (savedVeteran === "true") setIsVeteran(true);
  }, [open]);

  // Calculate pricing with veteran discount
  const veteranDiscount = isVeteran ? basePrice * 0.10 : 0;
  const finalAmount = basePrice - veteranDiscount;

  const handleInfoSubmit = async () => {
    if (!email || !name) {
      setError("Please fill in all required fields");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Save for future auto-fill
      localStorage.setItem("checkout_email", email);
      localStorage.setItem("checkout_name", name);
      if (isVeteran) {
        localStorage.setItem("is_veteran", "true");
      }

      const { data, error: fnError } = await supabase.functions.invoke('create-training-payment', {
        body: {
          serviceType,
          serviceName,
          serviceTier,
          amount: basePrice, // Send in dollars, function handles conversion
          customerEmail: email,
          customerName: name,
          isVeteran,
          preferredDate: selectedDate ? format(selectedDate, "PPP") : undefined,
          phone: phone ? formatPhoneNumber(phone) : undefined,
          state,
        }
      });

      if (fnError) throw new Error(fnError.message);
      if (!data?.clientSecret) throw new Error("No client secret received");

      setClientSecret(data.clientSecret);
      setStep("payment");
    } catch (err) {
      console.error("Payment initialization error:", err);
      setError(err instanceof Error ? err.message : "Failed to initialize payment");
      toast.error("Failed to initialize payment. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setStep("info");
    setClientSecret(null);
    setError(null);
    onOpenChange(false);
  };

  const steps = [
    { num: 1, label: "Details" },
    { num: 2, label: "Payment" },
    { num: 3, label: "Confirmed" }
  ];

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto p-0">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 p-6 border-b">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-primary/20 rounded-lg text-primary">
                <Sparkles className="w-5 h-5" />
              </div>
              {serviceTier && (
                <Badge variant="secondary" className="text-xs">
                  {serviceTier}
                </Badge>
              )}
            </div>
            <DialogTitle className="text-xl font-bold">
              {serviceName}
            </DialogTitle>
            <DialogDescription className="sr-only">
              Complete the payment for {serviceName} training
            </DialogDescription>
            {duration && (
              <p className="text-sm text-muted-foreground">{duration}</p>
            )}
          </DialogHeader>

          {/* Step Indicator */}
          <div className="flex items-center justify-between mt-6 max-w-xs">
            {steps.map((s, i) => (
              <div key={s.num} className="flex items-center">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold transition-colors ${
                  (step === "info" && s.num === 1) || 
                  (step === "payment" && s.num <= 2) || 
                  (step === "success" && s.num <= 3)
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {((step === "payment" && s.num === 1) || (step === "success" && s.num <= 2)) 
                    ? <CheckCircle className="w-5 h-5" /> 
                    : s.num}
                </div>
                <span className={`ml-2 text-xs font-medium hidden sm:block ${
                  (step === "info" && s.num === 1) || 
                  (step === "payment" && s.num <= 2) || 
                  (step === "success")
                    ? 'text-primary' : 'text-muted-foreground'
                }`}>
                  {s.label}
                </span>
                {i < steps.length - 1 && (
                  <div className={`w-8 sm:w-12 h-0.5 mx-2 ${
                    (step === "payment" && s.num === 1) || (step === "success" && s.num <= 2)
                      ? 'bg-primary' : 'bg-muted'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="p-6">
          <AnimatePresence mode="wait">
            {step === "info" && (
              <motion.div
                key="info"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-5"
              >
                {/* Features */}
                {features.length > 0 && (
                  <div className="p-4 bg-muted/50 rounded-xl">
                    <h4 className="font-semibold mb-3 text-sm">What's Included</h4>
                    <div className="grid grid-cols-1 gap-2">
                      {features.slice(0, 4).map((feature, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Contact Info */}
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      placeholder="Your Name *"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="h-11"
                    />
                    <Input
                      type="email"
                      placeholder="Email *"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-11"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        placeholder="Phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="h-11 pl-10"
                      />
                    </div>
                    <Select value={state} onValueChange={setState}>
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Select State" />
                      </SelectTrigger>
                      <SelectContent className="max-h-[200px]">
                        {US_STATES.map((s) => (
                          <SelectItem key={s} value={s}>{s}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Preferred Date */}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full h-11 justify-start text-left font-normal",
                        !selectedDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? format(selectedDate, "PPP") : "Preferred date (optional)"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-background" align="start">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>

                {/* Veteran Discount */}
                <QuickVeteranToggle
                  isVeteran={isVeteran}
                  onVeteranChange={setIsVeteran}
                  discountPercent={10}
                />

                {/* Terms */}
                <TermsCheckbox
                  checked={termsAccepted}
                  onCheckedChange={setTermsAccepted}
                />

                {/* Price Summary */}
                <div className="p-4 bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl border">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Total</span>
                    <div className="text-right">
                      {isVeteran && (
                        <span className="text-sm line-through text-muted-foreground mr-2">
                          ${basePrice.toFixed(2)}
                        </span>
                      )}
                      <span className="text-2xl font-bold text-primary">
                        ${finalAmount.toFixed(2)}
                      </span>
                    </div>
                  </div>
                  {isVeteran && (
                    <div className="text-right mt-1">
                      <Badge variant="outline" className="text-xs text-green-600 border-green-600">
                        Veteran discount: -${veteranDiscount.toFixed(2)}
                      </Badge>
                    </div>
                  )}
                </div>

                {error && (
                  <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm">
                    {error}
                  </div>
                )}

                <Button
                  onClick={handleInfoSubmit}
                  disabled={!email || !name || !termsAccepted || isLoading}
                  className="w-full h-12 text-base font-semibold"
                  size="lg"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Preparing Payment...
                    </>
                  ) : (
                    <>
                      Continue to Payment
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>

                <TrustIndicators compact />
              </motion.div>
            )}

            {step === "payment" && clientSecret && stripePromise && (
              <motion.div
                key="payment"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setStep("info")}
                  className="mb-2"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>

                <div className="p-4 bg-muted/50 rounded-xl mb-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold">{serviceName}</p>
                      <p className="text-sm text-muted-foreground">{email}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-primary">${finalAmount.toFixed(2)}</p>
                      {isVeteran && (
                        <Badge variant="outline" className="text-xs text-green-600 border-green-600">
                          10% Veteran Discount
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                <Tabs defaultValue="card" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-4">
                    <TabsTrigger value="card" className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4" />
                      Card
                    </TabsTrigger>
                    <TabsTrigger value="qr" className="flex items-center gap-2">
                      <Smartphone className="w-4 h-4" />
                      QR Code
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="card">
                    <Suspense fallback={
                      <div className="flex items-center justify-center py-8">
                        <Loader2 className="w-6 h-6 animate-spin text-primary" />
                      </div>
                    }>
                      <LazyTrainingPaymentForm
                        stripePromise={stripePromise}
                        clientSecret={clientSecret}
                        onSuccess={onSuccess}
                        onClose={handleClose}
                        customerEmail={email}
                        customerName={name}
                        serviceName={serviceName}
                        serviceTier={serviceTier}
                        preferredDate={selectedDate ? format(selectedDate, "PPP") : undefined}
                        isVeteran={isVeteran}
                        finalAmount={finalAmount}
                      />
                    </Suspense>
                  </TabsContent>

                  <TabsContent value="qr">
                    <QRCodePaymentSection
                      amount={Math.round(finalAmount * 100)}
                      productName={serviceName}
                      customerEmail={email}
                      customerName={name}
                      onSuccess={() => {
                        toast.success("Payment Confirmed! Check your email for booking details.");
                        onSuccess?.();
                        handleClose();
                      }}
                      onBack={() => setStep("info")}
                    />
                  </TabsContent>
                </Tabs>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default TrainingPaymentModal;
