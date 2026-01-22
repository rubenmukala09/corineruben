import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User, Session } from "@supabase/supabase-js";
import { Shield } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

// Simple inline loader matching NeuralShieldLoader style
const AuthLoader = () => (
  <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/95 backdrop-blur-md">
    <div className="relative flex flex-col items-center justify-center">
      <div className="absolute h-40 w-40 rounded-[100%] border-[3px] border-primary/20 animate-[spin_3s_linear_infinite]" />
      <div className="absolute h-36 w-36 rounded-full border-t-2 border-primary border-r-transparent border-b-transparent border-l-transparent animate-[spin_1s_ease-in-out_infinite]" />
      <div className="absolute h-24 w-24 rounded-full bg-primary/5 shadow-[0_0_30px_hsl(var(--primary)/0.2)] animate-pulse" />
      <div className="relative z-10 h-20 w-20 flex items-center justify-center rounded-full bg-white shadow-xl p-4 border border-primary/10">
        <Shield className="h-8 w-8 text-primary" strokeWidth={1.5} />
      </div>
      <p className="mt-20 text-xs font-semibold text-primary uppercase tracking-[0.2em] animate-pulse">
        Verifying Security
      </p>
    </div>
  </div>
);

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    }).catch((error) => {
      console.error("Auth error:", error);
      setLoading(false);
    });

    // Timeout fallback to prevent infinite loading
    timeout = setTimeout(() => {
      if (loading) {
        console.error("Auth check timeout - forcing loading to false");
        setLoading(false);
      }
    }, 5000);

    return () => {
      subscription.unsubscribe();
      clearTimeout(timeout);
    };
  }, []);

  if (loading) {
    return <AuthLoader />;
  }

  if (!user || !session) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
};
