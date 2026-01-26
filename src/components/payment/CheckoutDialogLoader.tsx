/**
 * CheckoutDialogLoader - Lightweight wrapper that conditionally mounts the checkout dialog
 * This prevents the ~155KB Stripe SDK and related dependencies from loading until checkout is opened
 */
import React, { Suspense, lazy } from 'react';
import { useCheckout } from '@/contexts/CheckoutContext';

// Only load the dialog when checkout is open
const UnifiedCheckoutDialog = lazy(() => import('./UnifiedCheckoutDialog'));

export const CheckoutDialogLoader: React.FC = () => {
  const { state } = useCheckout();

  // Don't mount anything until checkout is actually opened
  if (!state.isOpen) {
    return null;
  }

  return (
    <Suspense fallback={null}>
      <UnifiedCheckoutDialog />
    </Suspense>
  );
};

export default CheckoutDialogLoader;
