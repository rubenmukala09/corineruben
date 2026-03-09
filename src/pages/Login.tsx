import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';
import { Input } from '@/components/ui/input';
import { Lock, Mail, Loader2, Sparkles, Star, Diamond } from 'lucide-react';
import { toast } from 'sonner';
import ringsImg from '@/assets/rings-small.webp';

const Login = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
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
      toast.success(t('login.welcome'));
      navigate('/dashboard');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-20 relative">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="rounded-3xl p-10 relative overflow-hidden border border-white/20 dark:border-white/10 bg-white/10 dark:bg-white/[0.04] backdrop-blur-2xl shadow-[0_8px_60px_rgba(74,59,78,0.12),inset_0_1px_0_rgba(255,255,255,0.4)] dark:shadow-[0_8px_60px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.06)]">
          {/* Decorative glass blobs */}
          <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-gradient-to-br from-primary/15 to-accent/15 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-40 h-40 rounded-full bg-gradient-to-br from-accent/12 to-primary/12 blur-3xl pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-gradient-to-br from-primary/5 to-accent/5 blur-3xl pointer-events-none" />

          {/* Floating decorative badges */}
          <motion.div
            animate={{ y: [-4, 4, -4] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-6 right-6 w-8 h-8 rounded-xl bg-white/15 dark:bg-white/[0.06] backdrop-blur-md border border-white/20 dark:border-white/10 flex items-center justify-center z-10"
          >
            <Sparkles className="w-3.5 h-3.5 text-primary/60" />
          </motion.div>
          <motion.div
            animate={{ y: [3, -3, 3] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute bottom-8 left-6 w-7 h-7 rounded-lg bg-white/12 dark:bg-white/[0.05] backdrop-blur-md border border-white/15 dark:border-white/8 flex items-center justify-center z-10"
          >
            <Star className="w-3 h-3 text-accent-foreground/40" />
          </motion.div>
          <motion.div
            animate={{ y: [-3, 5, -3] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/3 left-4 w-6 h-6 rounded-full bg-white/10 dark:bg-white/[0.04] backdrop-blur-md border border-white/15 dark:border-white/8 flex items-center justify-center z-10"
          >
            <Diamond className="w-2.5 h-2.5 text-primary/50" />
          </motion.div>

          {/* Rings image */}
          <div className="text-center mb-8 relative z-10">
            <div className="w-20 h-20 rounded-full mx-auto mb-5 overflow-hidden border-2 border-white/25 dark:border-white/10 shadow-[0_4px_30px_rgba(159,130,164,0.25)] relative">
              <img src={ringsImg} alt="Wedding rings" className="w-full h-full object-cover" width={80} height={80} loading="lazy" decoding="async" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
            </div>
            <h1 className="font-serif-display text-3xl font-semibold text-foreground mb-2">
              {t('login.title')}
            </h1>
            <p className="font-sans-elegant text-sm text-muted-foreground">
              {t('login.subtitle')}
            </p>
          </div>

          {/* Separator line */}
          <div className="w-16 h-px mx-auto mb-8 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

          <form onSubmit={handleLogin} className="space-y-5 relative z-10">
            <div className="space-y-2">
              <label className="font-sans-elegant text-xs font-bold tracking-wide uppercase text-muted-foreground">
                {t('login.email')}
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="pl-11 rounded-2xl h-12 bg-white/10 dark:bg-white/[0.04] backdrop-blur-md border-white/20 dark:border-white/10 font-sans-elegant focus:border-primary/40 transition-colors"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="font-sans-elegant text-xs font-bold tracking-wide uppercase text-muted-foreground">
                {t('login.password')}
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="pl-11 rounded-2xl h-12 bg-white/10 dark:bg-white/[0.04] backdrop-blur-md border-white/20 dark:border-white/10 font-sans-elegant focus:border-primary/40 transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 rounded-2xl gradient-primary text-primary-foreground font-sans-elegant font-bold text-sm tracking-wide uppercase transition-all duration-300 hover:shadow-[0_8px_30px_rgba(159,130,164,0.4)] hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <Lock className="w-4 h-4" /> {t('login.submit')}
                </>
              )}
            </button>
          </form>

          {/* Bottom decorative dots */}
          <div className="flex items-center justify-center gap-1.5 mt-6">
            <div className="w-1 h-1 rounded-full bg-primary/30" />
            <div className="w-1.5 h-1.5 rounded-full bg-primary/50" />
            <div className="w-1 h-1 rounded-full bg-primary/30" />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
