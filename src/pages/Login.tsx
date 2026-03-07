import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { Input } from '@/components/ui/input';
import { Lock, Mail, Heart, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Welcome back! 💕');
      navigate('/dashboard');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 relative">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="glass-card-strong rounded-3xl p-10 relative overflow-hidden">
          {/* Decorative glow */}
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-gradient-to-br from-accent/15 to-primary/15 blur-3xl pointer-events-none" />

          {/* Header */}
          <div className="text-center mb-8 relative z-10">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mx-auto mb-4">
              <Heart className="w-7 h-7 text-primary fill-primary/30" />
            </div>
            <h1 className="font-serif-display text-3xl font-semibold text-foreground mb-2">
              Admin Access
            </h1>
            <p className="font-sans-elegant text-sm text-muted-foreground">
              Sign in to manage your wedding dashboard
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5 relative z-10">
            <div className="space-y-2">
              <label className="font-sans-elegant text-xs font-bold tracking-wide uppercase text-muted-foreground">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="pl-11 rounded-2xl h-12 glass-card border-border/30 font-sans-elegant"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="font-sans-elegant text-xs font-bold tracking-wide uppercase text-muted-foreground">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="pl-11 rounded-2xl h-12 glass-card border-border/30 font-sans-elegant"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 rounded-2xl gradient-primary text-primary-foreground font-sans-elegant font-bold text-sm tracking-wide uppercase transition-all duration-300 hover:shadow-[0_8px_30px_rgba(159,130,164,0.4)] disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <Lock className="w-4 h-4" /> Sign In
                </>
              )}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
