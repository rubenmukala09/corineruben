import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { 
  Loader2, Tag, Shield, CheckCircle, Zap, Clock, 
  CreditCard, RefreshCw, X, Sparkles, Users, Lock
} from "lucide-react";
import { trackConversion } from "@/utils/analyticsTracker";
import { Badge } from "@/components/ui/badge";
import { TrustIndicators } from "@/components/payment/TrustIndicators";
import { TermsCheckbox } from "@/components/payment/TermsCheckbox";
import { QuickVeteranToggle } from "@/components/payment/QuickVeteranToggle";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { motion, AnimatePresence } from "framer-motion";

interface SubscriptionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  priceId: string;
  serviceName: string;
  planTier: string;
  amount: number;
  features?: string[];
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
  }
};

export const SubscriptionDialog = ({
  open,
  onOpenChange,
  priceId,
  serviceName,
  planTier,
  amount,
  features = [],
}: SubscriptionDialogProps) => {
  const [loading, setLoading] = useState(false);
  const [showDiscountField, setShowDiscountField] = useState(false);
  const [discountCode, setDiscountCode] = useState("");
  const [discount, setDiscount] = useState<any>(null);
  const [validatingCode, setValidatingCode] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isVeteran, setIsVeteran] = useState(false);
  const veteranDiscountPercent = 10;

  const info = tierInfo[planTier] || tierInfo.Starter;
  const displayFeatures = features.length > 0 ? features : info.highlights;

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
    } catch (error) {
      toast.error("Failed to validate code");
      setDiscount(null);
    } finally {
      setValidatingCode(false);
    }
  };

  const handleSubscribe = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-subscription-checkout', {
        body: {
          priceId,
          serviceName,
          planTier,
          discountCode: discount ? discountCode : null,
        },
      });

      if (error) {
        toast.error("Failed to create checkout session");
        return;
      }

      if (data?.url) {
        trackConversion(`subscription_${planTier.toLowerCase()}`, finalAmount / 100);
        window.open(data.url, '_blank');
        onOpenChange(false);
      }
    } catch (error) {
      toast.error("Failed to start subscription");
    } finally {
      setLoading(false);
    }
  };

  const veteranDiscount = isVeteran ? Math.round(amount * veteranDiscountPercent / 100) : 0;
  const promoDiscount = discount ? discount.discountAmount : 0;
  const totalDiscount = veteranDiscount + promoDiscount;
  const finalAmount = amount - totalDiscount;
  const savings = totalDiscount;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg p-0 overflow-hidden">
        {/* Header */}
        <div className={`bg-gradient-to-r ${info.color} p-6 border-b`}>
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-background/80 backdrop-blur rounded-lg text-primary">
                {info.icon}
              </div>
              {info.badge && (
                <Badge className="bg-primary/90">{info.badge}</Badge>
              )}
            </div>
            <DialogTitle className="text-2xl font-bold">
              {serviceName} - {planTier}
            </DialogTitle>
          </DialogHeader>
          
          <div className="flex items-baseline gap-1 mt-3">
            <span className="text-4xl font-bold">${(finalAmount / 100).toFixed(2)}</span>
            <span className="text-muted-foreground">/month</span>
            {savings > 0 && (
              <Badge variant="outline" className="ml-2 text-green-600 border-green-600">
                Save ${(savings / 100).toFixed(2)}
              </Badge>
            )}
          </div>
        </div>

        <div className="p-6 space-y-5">
          {/* Features */}
          <div className="space-y-3">
            <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
              What's Included
            </h4>
            <div className="space-y-2">
              {displayFeatures.map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-2"
                >
                  <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                  <span>{feature}</span>
                </motion.div>
              ))}
            </div>
          </div>

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

          {/* Veteran Discount Toggle */}
          <QuickVeteranToggle
            isVeteran={isVeteran}
            onVeteranChange={setIsVeteran}
            discountPercent={veteranDiscountPercent}
          />

          {/* Subscription Benefits */}
          <div className="p-4 bg-muted/50 rounded-xl space-y-2 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <RefreshCw className="w-4 h-4" />
              <span>Auto-renews monthly • Cancel anytime</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>Instant activation after payment</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Lock className="w-4 h-4" />
              <span>Secure billing via Stripe</span>
            </div>
          </div>

          {/* Terms Checkbox */}
          <TermsCheckbox
            checked={termsAccepted}
            onCheckedChange={setTermsAccepted}
          />

          {/* Price Summary */}
          <div className="p-4 bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl border">
            {discount && (
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Original price</span>
                <span className="line-through text-muted-foreground">
                  ${(amount / 100).toFixed(2)}/mo
                </span>
              </div>
            )}
            <div className="flex justify-between items-center">
              <span className="font-semibold">Total today</span>
              <span className="text-2xl font-bold text-primary">
                ${(finalAmount / 100).toFixed(2)}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Then ${(finalAmount / 100).toFixed(2)}/month
            </p>
          </div>

          {/* FAQ Accordion */}
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="cancel" className="border-b-0">
              <AccordionTrigger className="text-sm py-3 hover:no-underline">
                <span className="flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 text-primary" />
                  Can I cancel anytime?
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">
                Yes! You can cancel your subscription at any time with no cancellation fees. Your protection continues until the end of your billing period.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="billing" className="border-b-0">
              <AccordionTrigger className="text-sm py-3 hover:no-underline">
                <span className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-primary" />
                  How does billing work?
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">
                You'll be charged monthly on the same date you subscribed. We accept all major credit cards and process payments securely through Stripe.
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Subscribe Button */}
          <Button
            onClick={handleSubscribe}
            disabled={loading || !termsAccepted}
            className="w-full h-12 text-base font-semibold"
            size="lg"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <CreditCard className="w-5 h-5 mr-2" />
                Start Subscription
              </>
            )}
          </Button>

          <TrustIndicators compact />
        </div>
      </DialogContent>
    </Dialog>
  );
};