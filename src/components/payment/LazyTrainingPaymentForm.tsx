/**
 * Lazy-loaded Training Payment Form with Stripe Elements
 * This component is dynamically imported to prevent Stripe SDK from loading on initial page visit
 */
import { useState } from "react";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Lock, AlertCircle, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { Stripe } from "@stripe/stripe-js";

interface PaymentFormContentProps {
  clientSecret: string;
  onSuccess?: () => void;
  onClose: () => void;
  customerEmail: string;
  customerName: string;
  serviceName: string;
  serviceTier?: string;
  preferredDate?: string;
  isVeteran: boolean;
  finalAmount: number;
}

function PaymentFormContent({
  clientSecret,
  onSuccess,
  onClose,
  customerEmail,
  customerName,
  serviceName,
  serviceTier,
  preferredDate,
  isVeteran,
  finalAmount,
}: PaymentFormContentProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentReady, setPaymentReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!stripe || !elements) return;

    setIsProcessing(true);
    setError(null);

    try {
      const { error: submitError } = await elements.submit();
      if (submitError) {
        setError(submitError.message || "Payment submission failed");
        setIsProcessing(false);
        return;
      }

      const { error: confirmError, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/training?payment=success`,
          receipt_email: customerEmail,
        },
        redirect: "if_required",
      });

      if (confirmError) {
        setError(confirmError.message || "Payment confirmation failed");
        setIsProcessing(false);
        return;
      }

      if (paymentIntent?.status === "succeeded") {
        // Call complete-payment to create booking and send email
        await supabase.functions.invoke('complete-payment', {
          body: {
            paymentType: 'training',
            paymentIntentId: paymentIntent.id,
            customerEmail,
            customerName,
            amount: finalAmount * 100, // Convert to cents
            productName: serviceName,
            serviceTier,
            preferredDate,
            isVeteran,
          }
        });

        toast.success("Payment Confirmed! Check your email for details.");
        onSuccess?.();
        onClose();
      }
    } catch (err) {
      console.error("Payment error:", err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-4">
      <PaymentElement 
        onReady={() => setPaymentReady(true)}
        options={{
          layout: "tabs",
          paymentMethodOrder: ['card', 'apple_pay', 'google_pay'],
        }}
      />

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Button
        onClick={handleSubmit}
        disabled={!stripe || !elements || isProcessing || !paymentReady}
        className="w-full bg-primary hover:bg-primary/90 h-12"
      >
        {isProcessing ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <Lock className="w-4 h-4 mr-2" />
            Complete Payment
          </>
        )}
      </Button>

      <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
        <Lock className="w-3 h-3" />
        <span>Secured by Stripe</span>
      </div>
    </div>
  );
}

interface LazyTrainingPaymentFormProps {
  stripePromise: Promise<Stripe | null> | null;
  clientSecret: string;
  onSuccess?: () => void;
  onClose: () => void;
  customerEmail: string;
  customerName: string;
  serviceName: string;
  serviceTier?: string;
  preferredDate?: string;
  isVeteran: boolean;
  finalAmount: number;
}

export function LazyTrainingPaymentForm({
  stripePromise,
  clientSecret,
  onSuccess,
  onClose,
  customerEmail,
  customerName,
  serviceName,
  serviceTier,
  preferredDate,
  isVeteran,
  finalAmount,
}: LazyTrainingPaymentFormProps) {
  if (!stripePromise || !clientSecret) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret,
        appearance: {
          theme: "stripe",
          variables: {
            colorPrimary: "#6D28D9",
          },
        },
      }}
    >
      <PaymentFormContent
        clientSecret={clientSecret}
        onSuccess={onSuccess}
        onClose={onClose}
        customerEmail={customerEmail}
        customerName={customerName}
        serviceName={serviceName}
        serviceTier={serviceTier}
        preferredDate={preferredDate}
        isVeteran={isVeteran}
        finalAmount={finalAmount}
      />
    </Elements>
  );
}

export default LazyTrainingPaymentForm;
