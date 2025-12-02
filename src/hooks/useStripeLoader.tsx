import { useState, useEffect } from 'react';
import { Stripe, loadStripe } from '@stripe/stripe-js';

let stripePromise: Promise<Stripe | null> | null = null;

export const useStripeLoader = () => {
  const [stripe, setStripe] = useState<Stripe | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initStripe = async () => {
      if (!stripePromise) {
        stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '');
      }
      const stripeInstance = await stripePromise;
      setStripe(stripeInstance);
      setLoading(false);
    };

    initStripe();
  }, []);

  return { stripe: stripePromise, loading };
};
