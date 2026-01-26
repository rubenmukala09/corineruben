/**
 * Lazy-loaded Smart Payment Elements with Stripe
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
import { Loader2, Lock, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import type { Stripe } from "@stripe/stripe-js";

interface PaymentElementWrapperProps {
  onSuccess: () => void;
  amount: number;
  email: string;
  onBack: () => void;
}

function PaymentElementWrapper({
  onSuccess,
  amount,
  email,
  onBack,
}: PaymentElementWrapperProps) {
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
        <Button
          onClick={handleSubmit}
          disabled={isLoading || !stripe || !elements || !isReady}
          className="flex-1"
          size="lg"
        >
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

interface LazySmartPaymentElementsProps {
  stripePromise: Promise<Stripe | null> | null;
  clientSecret: string;
  onSuccess: () => void;
  amount: number;
  email: string;
  onBack: () => void;
}

export function LazySmartPaymentElements({
  stripePromise,
  clientSecret,
  onSuccess,
  amount,
  email,
  onBack,
}: LazySmartPaymentElementsProps) {
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
            borderRadius: "8px",
            colorPrimary: "#6D28D9",
          },
        },
      }}
    >
      <PaymentElementWrapper
        onSuccess={onSuccess}
        amount={amount}
        email={email}
        onBack={onBack}
      />
    </Elements>
  );
}

export default LazySmartPaymentElements;
