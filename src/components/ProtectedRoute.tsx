import { useEffect, useState, Suspense } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User, Session } from "@supabase/supabase-js";
import { GlassmorphismLoader } from "@/components/GlassmorphismLoader";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
    const timeout = setTimeout(() => {
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
    return <GlassmorphismLoader message="Verifying Security" />;
  }

  if (!user || !session) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <Suspense fallback={<GlassmorphismLoader message="Loading" />}>
      {children}
    </Suspense>
  );
};
