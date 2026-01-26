import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface Subscription {
  id: string;
  status: string;
  current_period_end: string;
  cancel_at_period_end: boolean;
  plan_name: string;
  amount: number;
}

interface SubscriptionContextType {
  subscriptions: Subscription[];
  loading: boolean;
  refreshSubscriptions: () => Promise<void>;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export const SubscriptionProvider = ({ children }: { children: ReactNode }) => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);

  const refreshSubscriptions = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        setSubscriptions([]);
        setLoading(false);
        return;
      }

      // Extra safety: ensure the current token maps to a valid user before invoking function
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError || !userData?.user) {
        console.warn('Invalid session token detected, signing out before calling edge function.');
        toast.error('Your session expired. Please sign in again.');
        await supabase.auth.signOut();
        window.location.href = '/login';
        setSubscriptions([]);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase.functions.invoke('check-subscription-status');
      
      if (error) {
        console.error('Error checking subscriptions:', error);
        
        // If authentication error (user deleted), sign out
        const errorMessage = error.message || String(error);
        if (errorMessage.includes('Authentication error') || 
            errorMessage.includes('does not exist') ||
            errorMessage.includes('not authenticated')) {
          console.log('User no longer exists, signing out...');
          toast.error('Your session is no longer valid. Please sign in again.');
          await supabase.auth.signOut();
          window.location.href = '/login';
        }
        
        setSubscriptions([]);
      } else if (data?.subscriptions) {
        setSubscriptions(data.subscriptions);
      }
    } catch (error) {
      console.error('Error refreshing subscriptions:', error);
      setSubscriptions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Defer initial subscription check to reduce main-thread work during initial load
    // This is non-critical data that can wait until browser is idle
    let cancelled = false;
    let intervalId: ReturnType<typeof setInterval> | undefined;
    
    const startSubscriptionChecks = () => {
      if (cancelled) return;
      refreshSubscriptions();
      // Refresh every minute after initial load
      intervalId = setInterval(refreshSubscriptions, 60000);
    };
    
    // Use requestIdleCallback for non-critical initial data fetch
    if ('requestIdleCallback' in window) {
      const idleId = (window as Window & { requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => number }).requestIdleCallback(
        startSubscriptionChecks, 
        { timeout: 5000 }
      );
      return () => {
        cancelled = true;
        (window as Window & { cancelIdleCallback: (id: number) => void }).cancelIdleCallback(idleId);
        if (intervalId) clearInterval(intervalId);
      };
    } else {
      // Fallback: defer with setTimeout
      const timeoutId = setTimeout(startSubscriptionChecks, 2000);
      return () => {
        cancelled = true;
        clearTimeout(timeoutId);
        if (intervalId) clearInterval(intervalId);
      };
    }
  }, []);

  return (
    <SubscriptionContext.Provider value={{ subscriptions, loading, refreshSubscriptions }}>
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
};
