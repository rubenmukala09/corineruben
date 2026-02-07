import { useEffect, useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Lock, CreditCard, FileText, Loader2 } from "lucide-react";
import { useStripeKey } from "@/hooks/useStripeKey";
import useStripePayment from "@/hooks/useStripePayment";
import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { formatFileSize, getFileTypeLabel } from "@/lib/guestScannerUtils";
import { toast } from "sonner";

interface PaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  file: File | null;
  amount: number;
  onPaymentSuccess: (payload: { scanId: string; filePath: string; paymentIntentId: string }) => void;
}

interface GuestPaymentFormProps {
  amount: number;
  disabled: boolean;
  onSuccess: (paymentIntentId: string) => void;
}

const GuestPaymentForm = ({ amount, disabled, onSuccess }: GuestPaymentFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!stripe || !elements || disabled) return;

    setProcessing(true);
    try {
      const { error: submitError } = await elements.submit();
      if (submitError) throw submitError;

      const { error: confirmError, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/training/ai-analysis#guest-scanner`,
        },
        redirect: "if_required",
      });

      if (confirmError) throw confirmError;

      if (paymentIntent?.status === "succeeded" || paymentIntent?.status === "processing") {
        onSuccess(paymentIntent.id);
      }
    } catch (err: any) {
      toast.error(err?.message || "Payment failed. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement
        options={{
          layout: "tabs",
          paymentMethodOrder: ["card"],
        }}
      />
      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={!stripe || !elements || processing || disabled}
      >
        {processing ? (
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
    </form>
  );
};

export const PaymentDialog = ({ open, onOpenChange, file, amount, onPaymentSuccess }: PaymentDialogProps) => {
  const { stripePromise, loading: stripeLoading, error: stripeError, initializeStripe } = useStripeKey();
  const { createGuestScanPayment, loading: paymentLoading, error: paymentError } = useStripePayment();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [scanId, setScanId] = useState<string | null>(null);
  const [filePath, setFilePath] = useState<string | null>(null);
  const [paymentIntentId, setPaymentIntentId] = useState<string | null>(null);
  const [serverAmount, setServerAmount] = useState<number | null>(null);
  const [acknowledged, setAcknowledged] = useState(false);

  const fileMeta = useMemo(() => {
    if (!file) return null;
    return {
      name: file.name,
      size: formatFileSize(file.size).formatted,
      type: getFileTypeLabel(file),
    };
  }, [file]);

  useEffect(() => {
    if (!open || !file) return;
    let isMounted = true;

    const initPayment = async () => {
      initializeStripe();
      try {
        const data = await createGuestScanPayment(file);
        if (!isMounted) return;
        setClientSecret(data.clientSecret);
        setScanId(data.scanId);
        setFilePath(data.filePath);
        setPaymentIntentId(data.paymentIntentId);
        setServerAmount(data.amount ?? null);
      } catch (err: any) {
        if (isMounted) {
          toast.error(err?.message || "Unable to initialize payment.");
        }
      }
    };

    initPayment();

    return () => {
      isMounted = false;
    };
  }, [createGuestScanPayment, file, initializeStripe, open]);

  useEffect(() => {
    if (!open) {
      setClientSecret(null);
      setScanId(null);
      setFilePath(null);
      setPaymentIntentId(null);
      setServerAmount(null);
      setAcknowledged(false);
    }
  }, [open]);

  const displayAmount = serverAmount ?? amount;

  const handleSuccess = (confirmedPaymentIntentId: string) => {
    if (!scanId || !filePath || !paymentIntentId) return;
    onPaymentSuccess({
      scanId,
      filePath,
      paymentIntentId: confirmedPaymentIntentId || paymentIntentId,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-primary" />
            Secure Guest Scan Payment
          </DialogTitle>
          <DialogDescription>
            Your file is analyzed immediately after payment. No account required.
          </DialogDescription>
        </DialogHeader>

        {!file || !fileMeta ? (
          <div className="text-sm text-muted-foreground">Select a file to continue.</div>
        ) : (
          <div className="space-y-6">
            <div className="rounded-2xl border border-border/60 p-4 bg-muted/40">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-foreground">{fileMeta.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {fileMeta.type} · {fileMeta.size}
                  </p>
                </div>
                <Badge variant="outline" className="text-sm">
                  ${displayAmount.toFixed(2)}
                </Badge>
              </div>
            </div>

            <div className="rounded-2xl border border-border/60 p-4 bg-white/70">
              <p className="text-sm text-muted-foreground">
                We do NOT store your file or payment details. Your file is analyzed once and permanently
                deleted within 10 minutes.
              </p>
              <div className="mt-3 flex items-start gap-2">
                <Checkbox
                  id="delete-ack"
                  checked={acknowledged}
                  onCheckedChange={(checked) => setAcknowledged(checked === true)}
                />
                <Label htmlFor="delete-ack" className="text-sm text-foreground">
                  I understand my file will be deleted after analysis.
                </Label>
              </div>
            </div>

            <Separator />

            {stripeError && (
              <div className="text-sm text-destructive">{stripeError}</div>
            )}
            {paymentError && (
              <div className="text-sm text-destructive">{paymentError}</div>
            )}

            {(stripeLoading || paymentLoading) && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="w-4 h-4 animate-spin" />
                Preparing secure payment form...
              </div>
            )}

            {stripePromise && clientSecret && !stripeLoading && !paymentLoading && (
              <Elements
                stripe={stripePromise}
                options={{
                  clientSecret,
                  appearance: {
                    theme: "stripe",
                    variables: {
                      colorPrimary: "#1e3a8a",
                      borderRadius: "10px",
                    },
                  },
                }}
              >
                <GuestPaymentForm
                  amount={displayAmount}
                  disabled={!acknowledged}
                  onSuccess={handleSuccess}
                />
              </Elements>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PaymentDialog;
