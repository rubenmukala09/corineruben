import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';

interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  isDigital?: boolean;
  stripe_price_id?: string;
}

type CartClearReason = 'purchase' | 'manual' | 'other';

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: (reason?: CartClearReason) => void;
  total: number;
  itemCount: number;
  lastClearReason: CartClearReason | null;
  hadItemsBeforeClear: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [lastClearReason, setLastClearReason] = useState<CartClearReason | null>(null);
  const [hadItemsBeforeClear, setHadItemsBeforeClear] = useState(false);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addItem = useCallback((item: Omit<CartItem, 'quantity'>) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        toast.success('Quantity updated');
        return prev.map(i => 
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      toast.success('Added to cart');
      return [...prev, { ...item, quantity: 1 }];
    });
    // Reset clear tracking when items are added
    setLastClearReason(null);
    setHadItemsBeforeClear(false);
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems(prev => {
      const newItems = prev.filter(i => i.id !== id);
      // Track if this removal empties the cart
      if (newItems.length === 0 && prev.length > 0) {
        setHadItemsBeforeClear(true);
        setLastClearReason('manual');
      }
      return newItems;
    });
    toast.success('Removed from cart');
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    setItems(prev => prev.map(i => i.id === id ? { ...i, quantity } : i));
  }, [removeItem]);

  const clearCart = useCallback((reason: CartClearReason = 'other') => {
    const hadItems = items.length > 0;
    setHadItemsBeforeClear(hadItems);
    setLastClearReason(reason);
    setItems([]);
    localStorage.removeItem('cart');
  }, [items.length]);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{ 
      items, 
      addItem, 
      removeItem, 
      updateQuantity, 
      clearCart, 
      total, 
      itemCount,
      lastClearReason,
      hadItemsBeforeClear
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
}
