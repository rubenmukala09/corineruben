import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';

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

      const { data, error } = await supabase.functions.invoke('check-subscription-status');
      
      if (error) {
        console.error('Error checking subscriptions:', error);
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
    refreshSubscriptions();

    // Refresh every minute
    const interval = setInterval(refreshSubscriptions, 60000);
    return () => clearInterval(interval);
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
