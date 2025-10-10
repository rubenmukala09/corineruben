import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, Eye, EyeOff, Mail, Lock, ArrowRight, Sparkles, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import AIPartnersCarousel from '@/components/AIPartnersCarousel';
import Footer from '@/components/Footer';

const Login = () => {
  const navigate = useNavigate();
  const { signIn, resetPassword, user } = useAuth();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in all fields',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    try {
      await signIn(email, password);
      if (rememberMe) {
        localStorage.setItem('rememberMe', 'true');
      }
      navigate('/');
    } catch (error) {
      // Error already handled in useAuth
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-[45%_55%] relative">
      {/* Left Panel - Hero */}
      <div className="hidden lg:flex flex-col justify-center p-16 bg-gradient-to-br from-primary via-primary/95 to-accent relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        </div>
        
        <div className="max-w-lg relative z-10">
          <div className="mb-12 animate-fade-in-up">
            <div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-3xl flex items-center justify-center mb-8 shadow-2xl border border-white/20">
              <Shield className="w-14 h-14 text-white" />
            </div>
            <h1 className="text-6xl font-bold mb-6 leading-tight text-white">
              Welcome to<br />InVision Network
            </h1>
            <p className="text-xl mb-10 text-white/90 leading-relaxed">
              Advanced AI security and protection solutions for modern families and businesses.
            </p>
          </div>
          
          <div className="space-y-6 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            <div className="flex items-start gap-5 group">
              <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center flex-shrink-0 border border-white/30 group-hover:scale-110 transition-transform duration-300">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-white">Enterprise-Grade Security</h3>
                <p className="text-white/80 leading-relaxed">Bank-level encryption protecting your sensitive data 24/7</p>
              </div>
            </div>
            
            <div className="flex items-start gap-5 group">
              <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center flex-shrink-0 border border-white/30 group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-white">AI-Powered Protection</h3>
                <p className="text-white/80 leading-relaxed">Real-time threat detection and automated security responses</p>
              </div>
            </div>
            
            <div className="flex items-start gap-5 group">
              <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center flex-shrink-0 border border-white/30 group-hover:scale-110 transition-transform duration-300">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-white">Compliance Ready</h3>
                <p className="text-white/80 leading-relaxed">Full GDPR, CCPA, and SOC 2 compliance out of the box</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Auth Form */}
      <div className="flex items-center justify-center p-8 lg:p-16 bg-background relative">
        <div className="w-full max-w-md space-y-10">
          {/* Mobile Logo */}
          <div className="flex justify-center mb-8 lg:hidden animate-fade-in-up">
            <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-3xl flex items-center justify-center shadow-elegant">
              <Shield className="w-12 h-12 text-white" />
            </div>
          </div>

          {/* Header */}
          <div className="text-center animate-fade-in-up">
            <h1 className="text-5xl font-bold mb-3 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Welcome Back
            </h1>
            <p className="text-muted-foreground text-lg">
              Sign in to access your secure dashboard
            </p>
          </div>

          {/* Sign In Form */}
          <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-base font-semibold">Email Address</Label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                  className="pl-12 h-14 text-base border-2 focus:border-primary transition-all rounded-xl"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-base font-semibold">Password</Label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  className="pl-12 pr-12 h-14 text-base border-2 focus:border-primary transition-all rounded-xl"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center space-x-3">
                <Checkbox 
                  id="remember" 
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  className="w-5 h-5"
                />
                <label htmlFor="remember" className="text-base cursor-pointer text-foreground hover:text-primary transition-colors font-medium">
                  Remember me
                </label>
              </div>
              <Link to="/password-reset" className="text-base text-primary hover:text-primary/80 font-semibold transition-colors hover:underline">
                Forgot password?
              </Link>
            </div>

            <Button 
              type="submit" 
              className="w-full h-14 text-lg font-bold group relative overflow-hidden transition-all duration-300 hover:shadow-elegant rounded-xl" 
              disabled={isLoading}
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                {isLoading ? 'Signing in...' : (
                  <>
                    Sign In
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
                  </>
                )}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] animate-gradient-flow opacity-0 group-hover:opacity-100 transition-opacity" />
            </Button>
          </form>

          {/* Divider */}
          <div className="relative animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t-2 border-border"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-6 bg-background text-muted-foreground font-medium text-base">
                Don't have an account?
              </span>
            </div>
          </div>
          
          {/* Sign Up Link */}
          <div className="animate-fade-in-up" style={{ animationDelay: '250ms' }}>
            <Link to="/signup">
              <Button variant="outline" className="w-full h-14 text-lg font-bold group hover:border-primary transition-all border-2 rounded-xl hover:bg-primary/5">
                Create New Account
                <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform duration-300" />
              </Button>
            </Link>
          </div>

          {/* Security Footer */}
          <div className="pt-6 space-y-4 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
            <div className="flex items-center justify-center gap-3 text-sm text-muted-foreground">
              <Shield className="w-5 h-5 text-primary" />
              <span className="font-semibold">256-bit Encrypted • GDPR & CCPA Compliant</span>
            </div>
            <div className="flex justify-center gap-8 text-sm">
              <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors font-semibold hover:underline">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors font-semibold hover:underline">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes gradient-flow {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animate-gradient-flow {
          animation: gradient-flow 4s ease infinite;
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
      `}</style>

      <AIPartnersCarousel />
      <Footer />
    </div>
  );
};

export default Login;