import { useState, useEffect, useCallback } from 'react';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { supabase } from '@/integrations/supabase/client';

let stripePromiseCache: Promise<Stripe | null> | null = null;
let cachedKey: string | null = null;

/**
 * Hook for Stripe initialization - NOW DEMAND-DRIVEN
 * Stripe is only loaded when initializeStripe() is called, not on mount.
 * This prevents ~240KB of unused JavaScript on pages that don't need payments.
 */
export function useStripeKey() {
  const [stripePromise, setStripePromise] = useState<Promise<Stripe | null> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [initialized, setInitialized] = useState(false);

  const initializeStripe = useCallback(async () => {
    // Prevent multiple initializations
    if (initialized || stripePromiseCache) {
      if (stripePromiseCache) {
        setStripePromise(stripePromiseCache);
        setLoading(false);
      }
      return;
    }

    setLoading(true);
    setInitialized(true);

    // First try VITE env variable (fastest)
    const envKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
    
    if (envKey && envKey.trim() !== '') {
      stripePromiseCache = loadStripe(envKey);
      setStripePromise(stripePromiseCache);
      setLoading(false);
      return;
    }

    // If cached key exists, use it
    if (cachedKey) {
      stripePromiseCache = loadStripe(cachedKey);
      setStripePromise(stripePromiseCache);
      setLoading(false);
      return;
    }

    // Fetch key from edge function
    try {
      const { data, error: fnError } = await supabase.functions.invoke('get-stripe-key');
      
      if (fnError) throw fnError;
      
      if (data?.publishableKey) {
        cachedKey = data.publishableKey;
        stripePromiseCache = loadStripe(data.publishableKey);
        setStripePromise(stripePromiseCache);
      } else {
        throw new Error('No publishable key returned');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to initialize payment system');
    } finally {
      setLoading(false);
    }
  }, [initialized]);

  // Auto-initialize if cache already exists (fast path for subsequent uses)
  useEffect(() => {
    if (stripePromiseCache && !stripePromise) {
      setStripePromise(stripePromiseCache);
    }
  }, [stripePromise]);

  return { stripePromise, loading, error, initializeStripe };
}

// Synchronous getter for components that can't use hooks
export function getStripePromise(): Promise<Stripe | null> | null {
  const envKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
  
  if (envKey && envKey.trim() !== '') {
    if (!stripePromiseCache) {
      stripePromiseCache = loadStripe(envKey);
    }
    return stripePromiseCache;
  }
  
  if (cachedKey && !stripePromiseCache) {
    stripePromiseCache = loadStripe(cachedKey);
  }
  
  return stripePromiseCache;
}

// Lazy pre-fetch - only triggered when user shows intent to pay
export async function prefetchStripeKey() {
  const envKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
  if (envKey && envKey.trim() !== '') {
    if (!stripePromiseCache) {
      stripePromiseCache = loadStripe(envKey);
    }
    return;
  }
  
  if (!cachedKey) {
    try {
      const { data } = await supabase.functions.invoke('get-stripe-key');
      if (data?.publishableKey) {
        cachedKey = data.publishableKey;
        stripePromiseCache = loadStripe(data.publishableKey);
      }
    } catch (err) {
      console.error('[Stripe] Pre-fetch failed:', err);
    }
  }
}
