import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, Eye, EyeOff, Mail, Lock, ArrowRight, Sparkles, Zap, User, Phone, CalendarIcon, MapPin, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import AIPartnersCarousel from '@/components/AIPartnersCarousel';
import Footer from '@/components/Footer';

const Auth = () => {
  const navigate = useNavigate();
  const { signIn, signUp, resetPassword, user } = useAuth();
  const { toast } = useToast();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // Login state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Signup state
  const [signupData, setSignupData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    dateOfBirth: '',
    city: '',
    country: '',
  });
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSignupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in all fields',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    try {
      await signIn(loginEmail, loginPassword);
      if (rememberMe) {
        localStorage.setItem('rememberMe', 'true');
      }
      navigate('/');
    } catch (error) {
      // Error handled in useAuth
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (signupData.password !== signupData.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please ensure both passwords are identical.",
        variant: "destructive",
      });
      return;
    }

    if (signupData.password.length < 8) {
      toast({
        title: "Password too short",
        description: "Password must be at least 8 characters long.",
        variant: "destructive",
      });
      return;
    }

    if (!acceptedTerms || !acceptedPrivacy) {
      toast({
        title: "Please accept terms",
        description: "You must accept the Terms of Service and Privacy Policy to continue.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      await signUp(signupData.email, signupData.password, `${signupData.firstName} ${signupData.lastName}`);
      navigate('/');
    } catch (error) {
      // Error handled in useAuth
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Auth Forms */}
      <div className="flex-1 flex items-center justify-center p-8 lg:p-16 bg-background relative overflow-y-auto">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile Logo */}
          <div className="flex justify-center mb-8 lg:hidden animate-fade-in-up">
            <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-3xl flex items-center justify-center shadow-elegant">
              <Shield className="w-12 h-12 text-white" />
            </div>
          </div>

          {/* Toggle Buttons */}
          <div className="flex gap-2 p-2 bg-muted rounded-2xl animate-fade-in-up">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-3 px-6 rounded-xl font-bold text-base transition-all duration-300 ${
                isLogin 
                  ? 'bg-background text-foreground shadow-md' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-3 px-6 rounded-xl font-bold text-base transition-all duration-300 ${
                !isLogin 
                  ? 'bg-background text-foreground shadow-md' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Header */}
          <div className="text-center animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            <h1 className="text-5xl font-bold mb-3 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p className="text-muted-foreground text-lg">
              {isLogin ? 'Sign in to access your secure dashboard' : 'Get started with InVision Network'}
            </p>
          </div>

          {/* Login Form */}
          {isLogin ? (
            <form onSubmit={handleLoginSubmit} className="space-y-6 animate-fade-in-up" style={{ animationDelay: '150ms' }}>
              <div className="space-y-2">
                <Label htmlFor="login-email" className="text-base font-semibold">Email Address</Label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="you@company.com"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    required
                    disabled={isLoading}
                    className="pl-12 h-14 text-base border-2 focus:border-primary transition-all rounded-xl"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="login-password" className="text-base font-semibold">Password</Label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <Input
                    id="login-password"
                    type={showLoginPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                    disabled={isLoading}
                    className="pl-12 pr-12 h-14 text-base border-2 focus:border-primary transition-all rounded-xl"
                  />
                  <button
                    type="button"
                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                    tabIndex={-1}
                  >
                    {showLoginPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
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
          ) : (
            /* Signup Form */
            <form onSubmit={handleSignupSubmit} className="space-y-5 animate-fade-in-up" style={{ animationDelay: '150ms' }}>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-sm font-semibold">First Name *</Label>
                  <div className="relative group">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <Input
                      id="firstName"
                      name="firstName"
                      type="text"
                      placeholder="John"
                      value={signupData.firstName}
                      onChange={handleSignupChange}
                      required
                      disabled={isLoading}
                      className="pl-10 h-12 border-2 focus:border-primary transition-all rounded-xl"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-sm font-semibold">Last Name *</Label>
                  <div className="relative group">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <Input
                      id="lastName"
                      name="lastName"
                      type="text"
                      placeholder="Doe"
                      value={signupData.lastName}
                      onChange={handleSignupChange}
                      required
                      disabled={isLoading}
                      className="pl-10 h-12 border-2 focus:border-primary transition-all rounded-xl"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-email" className="text-sm font-semibold">Email Address *</Label>
                <div className="relative group">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <Input
                    id="signup-email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    value={signupData.email}
                    onChange={handleSignupChange}
                    required
                    disabled={isLoading}
                    className="pl-10 h-12 border-2 focus:border-primary transition-all rounded-xl"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-semibold">Phone Number *</Label>
                <div className="relative group">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    value={signupData.phone}
                    onChange={handleSignupChange}
                    required
                    disabled={isLoading}
                    className="pl-10 h-12 border-2 focus:border-primary transition-all rounded-xl"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-password" className="text-sm font-semibold">Password *</Label>
                <div className="relative group">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <Input
                    id="signup-password"
                    name="password"
                    type={showSignupPassword ? 'text' : 'password'}
                    placeholder="Create a strong password"
                    value={signupData.password}
                    onChange={handleSignupChange}
                    required
                    disabled={isLoading}
                    className="pl-10 pr-10 h-12 border-2 focus:border-primary transition-all rounded-xl"
                  />
                  <button
                    type="button"
                    onClick={() => setShowSignupPassword(!showSignupPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                    tabIndex={-1}
                  >
                    {showSignupPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-semibold">Confirm Password *</Label>
                <div className="relative group">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm your password"
                    value={signupData.confirmPassword}
                    onChange={handleSignupChange}
                    required
                    disabled={isLoading}
                    className="pl-10 pr-10 h-12 border-2 focus:border-primary transition-all rounded-xl"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                    tabIndex={-1}
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="dateOfBirth" className="text-sm font-semibold">Date of Birth *</Label>
                <div className="relative">
                  <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="dateOfBirth"
                    name="dateOfBirth"
                    type="text"
                    placeholder="mm/dd/yyyy"
                    value={signupData.dateOfBirth}
                    onChange={handleSignupChange}
                    required
                    disabled={isLoading}
                    className="pl-10 h-12 border-2 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city" className="text-sm font-semibold">City *</Label>
                  <div className="relative group">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <Input
                      id="city"
                      name="city"
                      type="text"
                      placeholder="New York"
                      value={signupData.city}
                      onChange={handleSignupChange}
                      required
                      disabled={isLoading}
                      className="pl-10 h-12 border-2 focus:border-primary transition-all rounded-xl"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country" className="text-sm font-semibold">Country *</Label>
                  <div className="relative group">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <Input
                      id="country"
                      name="country"
                      type="text"
                      placeholder="USA"
                      value={signupData.country}
                      onChange={handleSignupChange}
                      required
                      disabled={isLoading}
                      className="pl-10 h-12 border-2 focus:border-primary transition-all rounded-xl"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <div className="flex items-start space-x-2">
                  <Checkbox 
                    id="terms" 
                    checked={acceptedTerms}
                    onCheckedChange={(checked) => setAcceptedTerms(checked as boolean)}
                    className="mt-0.5 h-4 w-4"
                  />
                  <label htmlFor="terms" className="text-xs cursor-pointer leading-tight">
                    I accept the{' '}
                    <Link to="/terms" className="text-primary hover:underline font-semibold">
                      Terms of Service
                    </Link>
                  </label>
                </div>
                <div className="flex items-start space-x-2">
                  <Checkbox 
                    id="privacy" 
                    checked={acceptedPrivacy}
                    onCheckedChange={(checked) => setAcceptedPrivacy(checked as boolean)}
                    className="mt-0.5 h-4 w-4"
                  />
                  <label htmlFor="privacy" className="text-xs cursor-pointer leading-tight">
                    I accept the{' '}
                    <Link to="/privacy" className="text-primary hover:underline font-semibold">
                      Privacy Policy
                    </Link>
                  </label>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full h-14 text-lg font-bold group relative overflow-hidden transition-all duration-300 hover:shadow-elegant rounded-xl" 
                disabled={isLoading}
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  {isLoading ? 'Creating Account...' : (
                    <>
                      Create Account
                      <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
                    </>
                  )}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] animate-gradient-flow opacity-0 group-hover:opacity-100 transition-opacity" />
              </Button>
            </form>
          )}

          {/* Security Footer */}
          <div className="pt-6 space-y-4 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
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

export default Auth;
