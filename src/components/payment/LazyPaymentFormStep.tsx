/**
 * LazyPaymentFormStep - Separated to enable true code-splitting for Stripe
 * This component is dynamically imported only when the payment step is reached,
 * preventing the ~155KB Stripe SDK from loading on initial page load.
 */
import React, { useState } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';
import { Loader2, ShieldCheck, ArrowLeft, AlertCircle } from 'lucide-react';
import { useCheckout } from '@/contexts/CheckoutContext';
import { usePaymentFlow } from '@/hooks/usePaymentFlow';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';

interface PaymentFormStepProps {
  onSuccess: () => void;
  onBack: () => void;
}

const LazyPaymentFormStep: React.FC<PaymentFormStepProps> = ({ onSuccess, onBack }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { state, setLoading, setError, setOrderId, total } = useCheckout();
  const { sendDigitalDownload } = usePaymentFlow();
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);
    setError(null);

    try {
      const { error: submitError } = await elements.submit();
      if (submitError) {
        throw new Error(submitError.message);
      }

      const { error: confirmError, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/payment-success`,
          receipt_email: state.customerInfo.email
        },
        redirect: 'if_required'
      });

      if (confirmError) {
        throw new Error(confirmError.message);
      }

      if (paymentIntent?.status === 'succeeded') {
        // Trigger confetti
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });

        // Verify payment and send digital downloads if applicable
        const digitalItems = state.items.filter(item => item.product.isDigital);
        if (digitalItems.length > 0) {
          await sendDigitalDownload(
            paymentIntent.id,
            state.customerInfo.email,
            digitalItems.map(item => item.productId)
          );
        }

        setOrderId(paymentIntent.id);
        onSuccess();
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Payment failed';
      setError(message);
      toast.error(message);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={onBack}
        className="mb-2"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to details
      </Button>

      <div className="border rounded-lg p-4">
        <PaymentElement 
          options={{
            layout: 'tabs'
          }}
        />
      </div>

      {state.error && (
        <div className="flex items-center gap-2 p-3 bg-destructive/10 text-destructive rounded-lg">
          <AlertCircle className="h-4 w-4" />
          <span className="text-sm">{state.error}</span>
        </div>
      )}

      <Button type="submit" className="w-full" disabled={!stripe || processing}>
        {processing ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing payment...
          </>
        ) : (
          <>
            <ShieldCheck className="mr-2 h-4 w-4" />
            Pay ${total.toFixed(2)}
          </>
        )}
      </Button>

      <p className="text-xs text-center text-muted-foreground">
        Your payment is secured with 256-bit SSL encryption
      </p>
    </form>
  );
};

export default LazyPaymentFormStep;
