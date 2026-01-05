import { useState, useEffect } from 'react';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { supabase } from '@/integrations/supabase/client';

let stripePromiseCache: Promise<Stripe | null> | null = null;
let cachedKey: string | null = null;

export function useStripeKey() {
  const [stripePromise, setStripePromise] = useState<Promise<Stripe | null> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initStripe = async () => {
      // First try VITE env variable (fastest)
      const envKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
      
      if (envKey && envKey.trim() !== '') {
        console.log('[Stripe] Using env key');
        if (!stripePromiseCache) {
          stripePromiseCache = loadStripe(envKey);
        }
        setStripePromise(stripePromiseCache);
        setLoading(false);
        return;
      }

      // If cached key exists, use it
      if (cachedKey) {
        console.log('[Stripe] Using cached key');
        if (!stripePromiseCache) {
          stripePromiseCache = loadStripe(cachedKey);
        }
        setStripePromise(stripePromiseCache);
        setLoading(false);
        return;
      }

      // Fetch key from edge function
      try {
        console.log('[Stripe] Fetching key from edge function');
        const { data, error: fnError } = await supabase.functions.invoke('get-stripe-key');
        
        if (fnError) throw fnError;
        
        if (data?.publishableKey) {
          cachedKey = data.publishableKey;
          stripePromiseCache = loadStripe(data.publishableKey);
          setStripePromise(stripePromiseCache);
          console.log('[Stripe] Key loaded from edge function');
        } else {
          throw new Error('No publishable key returned');
        }
      } catch (err: any) {
        console.error('[Stripe] Failed to load key:', err);
        setError(err.message || 'Failed to initialize payment system');
      } finally {
        setLoading(false);
      }
    };

    initStripe();
  }, []);

  return { stripePromise, loading, error };
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
// Lazy pre-fetch: only start after user interaction or when idle
// This defers Stripe loading to improve TTI
let prefetchScheduled = false;

export function schedulePrefetch() {
  if (prefetchScheduled || stripePromiseCache) return;
  prefetchScheduled = true;
  
  const doPrefetch = async () => {
    const envKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
    if (!envKey || envKey.trim() === '') {
      try {
        const { data } = await supabase.functions.invoke('get-stripe-key');
        if (data?.publishableKey) {
          cachedKey = data.publishableKey;
          stripePromiseCache = loadStripe(data.publishableKey);
        }
      } catch (err) {
        // Silently fail - will retry when needed
      }
    }
  };
  
  // Use requestIdleCallback if available, otherwise setTimeout
  if ('requestIdleCallback' in window) {
    (window as any).requestIdleCallback(doPrefetch, { timeout: 5000 });
  } else {
    setTimeout(doPrefetch, 3000);
  }
}

// Schedule prefetch on first user interaction (click, scroll, keydown)
if (typeof window !== 'undefined') {
  const triggerPrefetch = () => {
    schedulePrefetch();
    window.removeEventListener('click', triggerPrefetch);
    window.removeEventListener('scroll', triggerPrefetch);
    window.removeEventListener('keydown', triggerPrefetch);
  };
  
  window.addEventListener('click', triggerPrefetch, { once: true, passive: true });
  window.addEventListener('scroll', triggerPrefetch, { once: true, passive: true });
  window.addEventListener('keydown', triggerPrefetch, { once: true, passive: true });
}
