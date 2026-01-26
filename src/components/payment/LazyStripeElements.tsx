/**
 * LazyStripeElements - Truly lazy Stripe Elements wrapper
 * This component only imports @stripe/react-stripe-js when rendered,
 * preventing the ~155KB Stripe SDK from loading on initial page load.
 */
import React, { Suspense, lazy } from 'react';
import type { Stripe, StripeElementsOptions } from '@stripe/stripe-js';
import { Loader2 } from 'lucide-react';

// Dynamically import the Stripe Elements wrapper
const StripeElementsProvider = lazy(() => 
  import('@stripe/react-stripe-js').then(module => ({
    default: module.Elements
  }))
);

interface LazyStripeElementsProps {
  stripePromise: Promise<Stripe | null> | null;
  options: StripeElementsOptions;
  children: React.ReactNode;
}

const LoadingFallback = () => (
  <div className="flex items-center justify-center p-8">
    <Loader2 className="h-6 w-6 animate-spin text-primary" />
    <span className="ml-2 text-sm text-muted-foreground">Loading payment form...</span>
  </div>
);

export const LazyStripeElements: React.FC<LazyStripeElementsProps> = ({
  stripePromise,
  options,
  children
}) => {
  if (!stripePromise) {
    return <LoadingFallback />;
  }

  return (
    <Suspense fallback={<LoadingFallback />}>
      <StripeElementsProvider stripe={stripePromise} options={options}>
        {children}
      </StripeElementsProvider>
    </Suspense>
  );
};

export default LazyStripeElements;
