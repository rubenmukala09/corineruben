import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2, Tag, Shield } from "lucide-react";
import { trackConversion } from "@/utils/analyticsTracker";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface SubscriptionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  priceId: string;
  serviceName: string;
  planTier: string;
  amount: number;
}

export const SubscriptionDialog = ({
  open,
  onOpenChange,
  priceId,
  serviceName,
  planTier,
  amount,
}: SubscriptionDialogProps) => {
  const [loading, setLoading] = useState(false);
  const [showDiscountField, setShowDiscountField] = useState(false);
  const [discountCode, setDiscountCode] = useState("");
  const [discount, setDiscount] = useState<any>(null);
  const [validatingCode, setValidatingCode] = useState(false);
  const [isVeteran, setIsVeteran] = useState(false);

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
        toast.success("Discount code applied!");
      }
    } catch (error) {
      toast.error("Failed to validate discount code");
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
      toast.error("Failed to start subscription process");
    } finally {
      setLoading(false);
    }
  };

  const finalAmount = discount ? amount - discount.discountAmount : amount;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Subscribe to {serviceName}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Plan</span>
              <span className="font-semibold">{planTier}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Billing</span>
              <span className="font-semibold">Monthly</span>
            </div>
            {discount && (
              <>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${(amount / 100).toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-sm text-green-600">
                  <span>Discount ({discount.code})</span>
                  <span>-${(discount.discountAmount / 100).toFixed(2)}</span>
                </div>
              </>
            )}
            <div className="flex justify-between items-center pt-2 border-t">
              <span className="font-semibold">Total/month</span>
              <span className="text-2xl font-bold">${(finalAmount / 100).toFixed(2)}</span>
            </div>
          </div>

          {!showDiscountField ? (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowDiscountField(true)}
              className="w-full"
            >
              <Tag className="w-4 h-4 mr-2" />
              Have a discount code?
            </Button>
          ) : (
            <div className="space-y-2">
              <Label htmlFor="discount">Discount Code</Label>
              <div className="flex gap-2">
                <Input
                  id="discount"
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value.toUpperCase())}
                  placeholder="ENTER CODE"
                  disabled={validatingCode}
                />
                <Button
                  onClick={validateDiscountCode}
                  disabled={!discountCode.trim() || validatingCode}
                >
                  {validatingCode ? <Loader2 className="w-4 h-4 animate-spin" /> : "Apply"}
                </Button>
              </div>
            </div>
          )}

          <div className="space-y-4 border-t pt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                <Label className="text-base font-semibold cursor-pointer">
                  I'm a Veteran (10% OFF)
                </Label>
              </div>
              <Switch checked={isVeteran} onCheckedChange={setIsVeteran} />
            </div>
            {isVeteran && (
              <Alert className="bg-primary/5">
                <AlertDescription className="text-sm">
                  Thank you for your service! Upload your veteran ID during checkout to verify your 10% discount.
                </AlertDescription>
              </Alert>
            )}
          </div>

          <div className="text-sm text-muted-foreground space-y-2">
            <p>• Subscription auto-renews monthly</p>
            <p>• Cancel anytime - no partial refunds</p>
            <p>• Secure payment via Stripe</p>
          </div>

          <Button
            onClick={handleSubscribe}
            disabled={loading}
            className="w-full"
            size="lg"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              `Subscribe for $${(finalAmount / 100).toFixed(2)}/month`
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
