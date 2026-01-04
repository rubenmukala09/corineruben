import { useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useCheckout } from '@/contexts/CheckoutContext';
import { toast } from 'sonner';

interface CreatePaymentIntentOptions {
  amount: number;
  customerEmail: string;
  customerName: string;
  isVeteran?: boolean;
  items?: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
  }>;
  metadata?: Record<string, string>;
}

interface PaymentIntentResponse {
  clientSecret: string;
  paymentIntentId: string;
  customerId: string;
  amount: number;
  type: string;
}

export const usePaymentFlow = () => {
  const { setPaymentDetails, setLoading, setError, setStep } = useCheckout();

  const createPaymentIntent = useCallback(async (options: CreatePaymentIntentOptions): Promise<PaymentIntentResponse | null> => {
    setLoading(true);
    setError(null);

    try {
      // Convert amount to cents for Stripe
      const amountInCents = Math.round(options.amount * 100);

      const { data, error } = await supabase.functions.invoke('create-cart-payment-intent', {
        body: {
          amount: amountInCents,
          customerEmail: options.customerEmail,
          customerName: options.customerName,
          isVeteran: options.isVeteran || false,
          items: options.items || [],
          metadata: options.metadata || {}
        }
      });

      if (error) {
        throw new Error(error.message || 'Failed to create payment intent');
      }

      if (!data?.clientSecret) {
        throw new Error('No client secret received from payment service');
      }

      setPaymentDetails(data.paymentIntentId, data.clientSecret);
      setStep('payment');
      setLoading(false);

      return data as PaymentIntentResponse;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Payment initialization failed';
      console.error('Payment intent creation failed:', err);
      setError(message);
      toast.error(message);
      return null;
    }
  }, [setPaymentDetails, setLoading, setError, setStep]);

  const verifyPayment = useCallback(async (paymentIntentId: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase.functions.invoke('verify-payment', {
        body: { sessionId: paymentIntentId }
      });

      if (error) {
        throw new Error(error.message || 'Payment verification failed');
      }

      return data?.verified === true || data?.status === 'complete';
    } catch (err) {
      console.error('Payment verification failed:', err);
      return false;
    }
  }, []);

  const sendDigitalDownload = useCallback(async (
    orderId: string,
    customerEmail: string,
    productIds: string[]
  ): Promise<boolean> => {
    try {
      const { error } = await supabase.functions.invoke('send-digital-download', {
        body: {
          orderId,
          customerEmail,
          productIds
        }
      });

      if (error) {
        console.error('Digital download send failed:', error);
        return false;
      }

      return true;
    } catch (err) {
      console.error('Digital download send failed:', err);
      return false;
    }
  }, []);

  return {
    createPaymentIntent,
    verifyPayment,
    sendDigitalDownload
  };
};

export default usePaymentFlow;
