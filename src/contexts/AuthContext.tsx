/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { Session, User, SupabaseClient } from '@supabase/supabase-js';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  isReady: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  isReady: false,
  signOut: async () => {},
});

export const useAuth = () => useContext(AuthContext);

// Lazy-load the supabase client to keep it out of the critical JS bundle
let _supabase: SupabaseClient | null = null;
const getSupabase = async () => {
  if (!_supabase) {
    const { supabase } = await import('@/integrations/supabase/client');
    _supabase = supabase;
  }
  return _supabase;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    getSupabase().then((supabase) => {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session);
        setIsReady(true);
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        (_event, session) => {
          setSession(session);
        }
      );
      unsubscribe = () => subscription.unsubscribe();
    });

    return () => unsubscribe?.();
  }, []);

  const signOut = async () => {
    const supabase = await getSupabase();
    await supabase.auth.signOut();
  };

  // Always render children to prevent blank flash on reload.
  // Components that need auth can check isReady themselves.

  return (
    <AuthContext.Provider value={{ session, user: session?.user ?? null, isReady, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
