import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Product, getProductById, calculateVeteranDiscount, VETERAN_DISCOUNT } from '@/config/products';

export type CheckoutStep = 'info' | 'payment' | 'success';
export type CheckoutType = 'one-time' | 'subscription' | 'cart';

export interface CustomerInfo {
  email: string;
  name: string;
  phone?: string;
  isVeteran: boolean;
}

export interface CheckoutItem {
  productId: string;
  product: Product;
  quantity: number;
  originalPrice: number;
  discountedPrice: number;
}

export interface CheckoutState {
  isOpen: boolean;
  type: CheckoutType;
  step: CheckoutStep;
  items: CheckoutItem[];
  customerInfo: CustomerInfo;
  paymentIntentId: string | null;
  clientSecret: string | null;
  orderId: string | null;
  isLoading: boolean;
  error: string | null;
}

interface CheckoutContextType {
  state: CheckoutState;
  // Actions
  openCheckout: (productId: string, type?: CheckoutType) => void;
  openCartCheckout: (cartItems: { productId: string; quantity: number }[]) => void;
  closeCheckout: () => void;
  setStep: (step: CheckoutStep) => void;
  setCustomerInfo: (info: Partial<CustomerInfo>) => void;
  setPaymentDetails: (paymentIntentId: string, clientSecret: string) => void;
  setOrderId: (orderId: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  resetCheckout: () => void;
  // Computed values
  subtotal: number;
  discount: number;
  total: number;
  hasDigitalProducts: boolean;
  hasPhysicalProducts: boolean;
}

const initialCustomerInfo: CustomerInfo = {
  email: '',
  name: '',
  phone: '',
  isVeteran: false
};

const initialState: CheckoutState = {
  isOpen: false,
  type: 'one-time',
  step: 'info',
  items: [],
  customerInfo: initialCustomerInfo,
  paymentIntentId: null,
  clientSecret: null,
  orderId: null,
  isLoading: false,
  error: null
};

const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined);

export const CheckoutProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<CheckoutState>(initialState);

  const openCheckout = useCallback((productId: string, type: CheckoutType = 'one-time') => {
    const product = getProductById(productId);
    if (!product) {
      console.error(`Product not found: ${productId}`);
      return;
    }

    const checkoutType: CheckoutType = product.paymentType === 'subscription' ? 'subscription' : type;

    const item: CheckoutItem = {
      productId,
      product,
      quantity: 1,
      originalPrice: product.price,
      discountedPrice: product.price
    };

    setState(prev => ({
      ...prev,
      isOpen: true,
      type: checkoutType,
      step: 'info',
      items: [item],
      error: null
    }));
  }, []);

  const openCartCheckout = useCallback((cartItems: { productId: string; quantity: number }[]) => {
    const items: CheckoutItem[] = cartItems.map(({ productId, quantity }) => {
      const product = getProductById(productId);
      if (!product) {
        console.warn(`Product not found in cart: ${productId}`);
        return null;
      }
      return {
        productId,
        product,
        quantity,
        originalPrice: product.price * quantity,
        discountedPrice: product.price * quantity
      };
    }).filter((item): item is CheckoutItem => item !== null);

    setState(prev => ({
      ...prev,
      isOpen: true,
      type: 'cart',
      step: 'info',
      items,
      error: null
    }));
  }, []);

  const closeCheckout = useCallback(() => {
    setState(prev => ({
      ...prev,
      isOpen: false,
      error: null
    }));
  }, []);

  const setStep = useCallback((step: CheckoutStep) => {
    setState(prev => ({ ...prev, step }));
  }, []);

  const setCustomerInfo = useCallback((info: Partial<CustomerInfo>) => {
    setState(prev => {
      const newInfo = { ...prev.customerInfo, ...info };
      
      // Recalculate discounts when veteran status changes
      const items = prev.items.map(item => {
        const discount = newInfo.isVeteran 
          ? calculateVeteranDiscount(item.product.price * item.quantity, item.product.category)
          : 0;
        return {
          ...item,
          originalPrice: item.product.price * item.quantity,
          discountedPrice: (item.product.price * item.quantity) - discount
        };
      });

      return {
        ...prev,
        customerInfo: newInfo,
        items
      };
    });
  }, []);

  const setPaymentDetails = useCallback((paymentIntentId: string, clientSecret: string) => {
    setState(prev => ({
      ...prev,
      paymentIntentId,
      clientSecret
    }));
  }, []);

  const setOrderId = useCallback((orderId: string) => {
    setState(prev => ({ ...prev, orderId }));
  }, []);

  const setLoading = useCallback((isLoading: boolean) => {
    setState(prev => ({ ...prev, isLoading }));
  }, []);

  const setError = useCallback((error: string | null) => {
    setState(prev => ({ ...prev, error, isLoading: false }));
  }, []);

  const resetCheckout = useCallback(() => {
    setState(initialState);
  }, []);

  // Computed values
  const subtotal = state.items.reduce((sum, item) => sum + item.originalPrice, 0);
  const discount = state.items.reduce((sum, item) => sum + (item.originalPrice - item.discountedPrice), 0);
  const total = subtotal - discount;
  
  const hasDigitalProducts = state.items.some(item => item.product.isDigital === true);
  const hasPhysicalProducts = state.items.some(item => item.product.isDigital === false);

  const value: CheckoutContextType = {
    state,
    openCheckout,
    openCartCheckout,
    closeCheckout,
    setStep,
    setCustomerInfo,
    setPaymentDetails,
    setOrderId,
    setLoading,
    setError,
    resetCheckout,
    subtotal,
    discount,
    total,
    hasDigitalProducts,
    hasPhysicalProducts
  };

  return (
    <CheckoutContext.Provider value={value}>
      {children}
    </CheckoutContext.Provider>
  );
};

export const useCheckout = (): CheckoutContextType => {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error('useCheckout must be used within a CheckoutProvider');
  }
  return context;
};

export default CheckoutContext;
