import { useState, useEffect } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { 
  Loader2, 
  Lock, 
  Mail, 
  Eye, 
  EyeOff,
  ArrowRight,
  User,
  CheckCircle2,
  XCircle,
  ShieldCheck
} from "lucide-react";
import { z } from "zod";
import invisionLogo from "@/assets/shield-logo.png";
import authBackground from "@/assets/auth-background.jpg";
import { Session, User as SupabaseUser } from "@supabase/supabase-js";
import { ForgotPasswordModal } from "@/components/auth/ForgotPasswordModal";

const emailSchema = z.string().email("Please enter a valid email address");
const passwordSchema = z.string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Must contain uppercase letter")
  .regex(/[0-9]/, "Must contain number")
  .regex(/[^A-Za-z0-9]/, "Must contain special character");

function Auth() {
  const [searchParams] = useSearchParams();
  const defaultTab = searchParams.get("mode") === "signup" ? "signup" : "login";
  
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);
  
  // Password strength indicators
  const [passwordHasLength, setPasswordHasLength] = useState(false);
  const [passwordHasUppercase, setPasswordHasUppercase] = useState(false);
  const [passwordHasNumber, setPasswordHasNumber] = useState(false);
  const [passwordHasSpecial, setPasswordHasSpecial] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(false);
  
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        if (event === 'SIGNED_IN' && currentSession?.user) {
          setTimeout(() => {
            handlePostLoginRedirect(currentSession.user.id);
          }, 0);
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session: existingSession } }) => {
      setSession(existingSession);
      setUser(existingSession?.user ?? null);
      if (existingSession?.user) {
        handlePostLoginRedirect(existingSession.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Password validation
  useEffect(() => {
    setPasswordHasLength(password.length >= 8);
    setPasswordHasUppercase(/[A-Z]/.test(password));
    setPasswordHasNumber(/[0-9]/.test(password));
    setPasswordHasSpecial(/[^A-Za-z0-9]/.test(password));
    setPasswordsMatch(password.length > 0 && password === confirmPassword);
  }, [password, confirmPassword]);

  const handlePostLoginRedirect = async (userId: string) => {
    try {
      const { data: profileData } = await supabase
        .from("profiles")
        .select("account_status, application_reference")
        .eq("id", userId)
        .single();

      if (profileData?.account_status === "pending") {
        await supabase.auth.signOut();
        toast({
          title: "Account Pending Approval",
          description: `Your account is awaiting admin approval. Reference: ${profileData.application_reference || 'N/A'}`,
          variant: "destructive",
        });
        return;
      }

      if (profileData?.account_status === "rejected") {
        await supabase.auth.signOut();
        toast({
          title: "Account Rejected",
          description: "Your application was not approved. Please contact support.",
          variant: "destructive",
        });
        return;
      }

      if (profileData?.account_status === "suspended") {
        await supabase.auth.signOut();
        toast({
          title: "Account Suspended",
          description: "Your account has been suspended. Please contact support.",
          variant: "destructive",
        });
        return;
      }

      const { data: rolesData } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId);

      if (rolesData && rolesData.length > 0) {
        if (rolesData.length === 1) {
          const userRole = rolesData[0].role;
          const roleRedirects: Record<string, string> = {
            admin: "/portal/admin",
            secretary: "/admin/clients/businesses",
            training_coordinator: "/portal/trainer",
            business_consultant: "/admin/clients/businesses",
            support_specialist: "/portal/staff",
            staff: "/portal/staff",
            moderator: "/admin",
            senior: "/portal/senior",
            caregiver: "/portal/caregiver",
            healthcare: "/portal/healthcare",
            developer: "/portal/developer",
            analyst: "/portal/analyst",
            trainer: "/portal/trainer",
            user: "/portal",
          };
          navigate(roleRedirects[userRole] || "/portal");
          return;
        }
        navigate("/portal");
        return;
      }
      navigate("/portal");
    } catch (error) {
      console.error("Redirect error:", error);
      navigate("/portal");
    }
  };

  const validateLoginForm = (): boolean => {
    let isValid = true;
    setEmailError("");
    setPasswordError("");

    try {
      emailSchema.parse(email);
    } catch {
      setEmailError("Please enter a valid email address");
      isValid = false;
    }

    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      isValid = false;
    }

    return isValid;
  };

  const validateSignupForm = (): boolean => {
    if (!firstName.trim() || !lastName.trim()) {
      toast({ title: "Missing Information", description: "Please enter your first and last name", variant: "destructive" });
      return false;
    }

    try {
      emailSchema.parse(email);
    } catch {
      toast({ title: "Invalid Email", description: "Please enter a valid email address", variant: "destructive" });
      return false;
    }

    try {
      passwordSchema.parse(password);
    } catch {
      toast({ title: "Weak Password", description: "Password must be 8+ chars with uppercase, number, and special character", variant: "destructive" });
      return false;
    }

    if (password !== confirmPassword) {
      toast({ title: "Password Mismatch", description: "Passwords do not match", variant: "destructive" });
      return false;
    }

    return true;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateLoginForm()) return;
    
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password,
      });

      if (error) throw error;

      if (data.session && data.user) {
        toast({
          title: "Welcome back!",
          description: `Successfully signed in as ${email}`,
        });
      }
    } catch (error: any) {
      let errorMessage = "An error occurred during sign in";
      let errorTitle = "Sign In Failed";
      
      if (error.message?.includes("Invalid login credentials")) {
        errorTitle = "Invalid Credentials";
        errorMessage = "Email or password is incorrect. Please check your credentials and try again.";
      } else if (error.message?.includes("Email not confirmed")) {
        errorTitle = "Email Not Confirmed";
        errorMessage = "Please check your email and click the confirmation link.";
      } else if (error.message?.includes("Too many requests")) {
        errorTitle = "Too Many Attempts";
        errorMessage = "Please wait a moment before trying again.";
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      toast({
        title: errorTitle,
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateSignupForm()) return;
    
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim().toLowerCase(),
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth`,
          data: {
            first_name: firstName.trim(),
            last_name: lastName.trim(),
            full_name: `${firstName.trim()} ${lastName.trim()}`,
          }
        }
      });

      if (error) throw error;

      if (data.user) {
        // Create profile
        await supabase.from("profiles").upsert({
          id: data.user.id,
          first_name: firstName.trim(),
          last_name: lastName.trim(),
          email: email.trim().toLowerCase(),
          account_status: "active",
        });

        // Assign default user role
        await supabase.from("user_roles").insert({
          user_id: data.user.id,
          role: "user",
        });

        setSignupSuccess(true);
        toast({
          title: "Account Created!",
          description: "Please check your email to verify your account.",
        });
      }
    } catch (error: any) {
      let errorMessage = "An error occurred during sign up";
      
      if (error.message?.includes("already registered")) {
        errorMessage = "This email is already registered. Please sign in instead.";
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      toast({
        title: "Sign Up Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth`,
      }
    });
    if (error) {
      toast({ title: "Sign In Failed", description: error.message, variant: "destructive" });
    }
  };

  const handleMicrosoftSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'azure',
      options: {
        redirectTo: `${window.location.origin}/auth`,
        scopes: 'email',
      }
    });
    if (error) {
      toast({ title: "Sign In Failed", description: error.message, variant: "destructive" });
    }
  };

  const PasswordStrengthIndicator = ({ met, label }: { met: boolean; label: string }) => (
    <div className={`flex items-center gap-2 text-xs ${met ? 'text-green-600' : 'text-muted-foreground'}`}>
      {met ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
      {label}
    </div>
  );

  // Input style with focus state
  const inputClassName = "h-12 pl-10 bg-slate-50/50 border-slate-200 text-foreground placeholder:text-muted-foreground transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary/20";

  if (signupSuccess) {
    return (
      <div className="min-h-screen w-full relative flex items-center justify-center p-4 md:p-6 lg:p-8">
        <div className="fixed inset-0 z-0">
          <img src={authBackground} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px]" />
        </div>
        <div className="relative z-10 w-full max-w-[420px]">
          <div className="bg-white rounded-3xl p-8 md:p-10 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] border border-white/50 text-center">
            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg mb-6">
              <CheckCircle2 className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Check Your Email</h2>
            <p className="text-muted-foreground mb-6">
              We've sent a verification link to <strong>{email}</strong>. Click the link to activate your account.
            </p>
            <Button 
              onClick={() => { setSignupSuccess(false); setActiveTab("login"); }}
              className="w-full"
            >
              Back to Sign In
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full relative flex items-center justify-center p-4 md:p-6 lg:p-8">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <img src={authBackground} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px]" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-[440px]">
        {/* Auth Card */}
        <div className="bg-white rounded-3xl p-8 md:p-10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.12)] border border-white/50">
          {/* Logo Inside Card */}
          <Link 
            to="/" 
            className="flex items-center justify-center gap-3 mb-6 group transition-transform duration-300 hover:scale-105"
          >
            <img src={invisionLogo} alt="InVision Network" className="w-11 h-11 drop-shadow-md" />
            <div className="flex flex-col leading-tight">
              <span className="text-lg font-bold text-foreground">InVision Network</span>
              <span className="text-[10px] text-muted-foreground tracking-wide uppercase">Secure Portal</span>
            </div>
          </Link>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6 bg-slate-100">
              <TabsTrigger value="login" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Sign In</TabsTrigger>
              <TabsTrigger value="signup" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Sign Up</TabsTrigger>
            </TabsList>

            {/* Login Tab */}
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-5">
                {/* SSO Buttons */}
                <div className="space-y-3">
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="w-full h-11 border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all"
                    onClick={handleGoogleSignIn}
                  >
                    <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Sign in with Google
                  </Button>
                  
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="w-full h-11 border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all"
                    onClick={handleMicrosoftSignIn}
                  >
                    <svg className="w-5 h-5 mr-3" viewBox="0 0 23 23">
                      <path fill="#f35325" d="M1 1h10v10H1z"/>
                      <path fill="#81bc06" d="M12 1h10v10H12z"/>
                      <path fill="#05a6f0" d="M1 12h10v10H1z"/>
                      <path fill="#ffba08" d="M12 12h10v10H12z"/>
                    </svg>
                    Sign in with Microsoft
                  </Button>
                </div>

                {/* Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-slate-200" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-3 text-muted-foreground">or continue with email</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="login-email" className="text-sm font-medium">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="login-email"
                      type="email"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); setEmailError(""); }}
                      required
                      disabled={isLoading}
                      placeholder="your@email.com"
                      className={`${inputClassName} ${emailError ? 'border-destructive focus:border-destructive' : ''}`}
                      autoComplete="email"
                    />
                  </div>
                  {emailError && <p className="text-xs text-destructive">{emailError}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="login-password" className="text-sm font-medium">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="login-password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => { setPassword(e.target.value); setPasswordError(""); }}
                      required
                      disabled={isLoading}
                      placeholder="••••••••"
                      className={`${inputClassName} pr-12 ${passwordError ? 'border-destructive focus:border-destructive' : ''}`}
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-8 h-8 rounded-md text-muted-foreground hover:text-foreground hover:bg-slate-100 transition-colors"
                      tabIndex={-1}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {passwordError && <p className="text-xs text-destructive">{passwordError}</p>}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Checkbox 
                      id="remember" 
                      checked={rememberMe}
                      onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                      className="mt-0"
                    />
                    <Label htmlFor="remember" className="text-sm cursor-pointer text-muted-foreground leading-none">
                      Remember me
                    </Label>
                  </div>
                  <button 
                    type="button"
                    onClick={() => setShowForgotPassword(true)}
                    className="text-sm text-primary hover:text-primary/80 font-medium"
                  >
                    Forgot password?
                  </button>
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-12 text-base font-semibold bg-gradient-to-r from-primary to-accent shadow-[0_4px_20px_-4px_hsl(var(--primary)/0.5)] hover:shadow-[0_6px_24px_-4px_hsl(var(--primary)/0.6)] transition-all duration-300" 
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <><Loader2 className="mr-2 h-5 w-5 animate-spin" />Signing in...</>
                  ) : (
                    <>Sign In<ArrowRight className="ml-2 w-4 h-4" /></>
                  )}
                </Button>

                {/* Security Footer */}
                <div className="flex items-center justify-center gap-2 pt-3 border-t border-slate-100 mt-4">
                  <ShieldCheck className="w-4 h-4 text-slate-400" />
                  <span className="text-xs text-slate-400">Secured by 256-bit Encryption</span>
                </div>
              </form>
            </TabsContent>

            {/* Signup Tab */}
            <TabsContent value="signup">
              <form onSubmit={handleSignup} className="space-y-4">
                {/* SSO Buttons */}
                <div className="space-y-3">
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="w-full h-11 border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all"
                    onClick={handleGoogleSignIn}
                  >
                    <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Sign up with Google
                  </Button>
                  
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="w-full h-11 border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all"
                    onClick={handleMicrosoftSignIn}
                  >
                    <svg className="w-5 h-5 mr-3" viewBox="0 0 23 23">
                      <path fill="#f35325" d="M1 1h10v10H1z"/>
                      <path fill="#81bc06" d="M12 1h10v10H12z"/>
                      <path fill="#05a6f0" d="M1 12h10v10H1z"/>
                      <path fill="#ffba08" d="M12 12h10v10H12z"/>
                    </svg>
                    Sign up with Microsoft
                  </Button>
                </div>

                {/* Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-slate-200" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-3 text-muted-foreground">or continue with email</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-sm font-medium">First Name</Label>
                    <Input
                      id="firstName"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                      disabled={isLoading}
                      placeholder="John"
                      className="h-11 bg-slate-50/50 border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-sm font-medium">Last Name</Label>
                    <Input
                      id="lastName"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                      disabled={isLoading}
                      placeholder="Doe"
                      className="h-11 bg-slate-50/50 border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-email" className="text-sm font-medium">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="signup-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={isLoading}
                      placeholder="your@email.com"
                      className={inputClassName}
                      autoComplete="email"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-password" className="text-sm font-medium">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="signup-password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      disabled={isLoading}
                      placeholder="••••••••"
                      className={`${inputClassName} pr-12`}
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-8 h-8 rounded-md text-muted-foreground hover:text-foreground hover:bg-slate-100 transition-colors"
                      tabIndex={-1}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <PasswordStrengthIndicator met={passwordHasLength} label="8+ characters" />
                    <PasswordStrengthIndicator met={passwordHasUppercase} label="Uppercase" />
                    <PasswordStrengthIndicator met={passwordHasNumber} label="Number" />
                    <PasswordStrengthIndicator met={passwordHasSpecial} label="Special char" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-sm font-medium">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      disabled={isLoading}
                      placeholder="••••••••"
                      className={`${inputClassName} pr-12`}
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-8 h-8 rounded-md text-muted-foreground hover:text-foreground hover:bg-slate-100 transition-colors"
                      tabIndex={-1}
                      aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {confirmPassword && (
                    <div className={`flex items-center gap-2 text-xs ${passwordsMatch ? 'text-green-600' : 'text-destructive'}`}>
                      {passwordsMatch ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                      {passwordsMatch ? 'Passwords match' : 'Passwords do not match'}
                    </div>
                  )}
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-12 text-base font-semibold bg-gradient-to-r from-primary to-accent shadow-[0_4px_20px_-4px_hsl(var(--primary)/0.5)] hover:shadow-[0_6px_24px_-4px_hsl(var(--primary)/0.6)] transition-all duration-300" 
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <><Loader2 className="mr-2 h-5 w-5 animate-spin" />Creating account...</>
                  ) : (
                    <>Create Account<ArrowRight className="ml-2 w-4 h-4" /></>
                  )}
                </Button>

                {/* Security Footer */}
                <div className="flex items-center justify-center gap-2 pt-3 border-t border-slate-100 mt-4">
                  <ShieldCheck className="w-4 h-4 text-slate-400" />
                  <span className="text-xs text-slate-400">Secured by 256-bit Encryption</span>
                </div>
              </form>
            </TabsContent>
          </Tabs>
        </div>

        {/* Bottom Links */}
        <div className="mt-6 flex items-center justify-center gap-4 text-xs text-muted-foreground">
          <Link to="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
          <span className="text-slate-300">•</span>
          <Link to="/terms" className="hover:text-foreground transition-colors">Terms</Link>
          <span className="text-slate-300">•</span>
          <span>© {new Date().getFullYear()} InVision Network</span>
        </div>
      </div>

      <ForgotPasswordModal open={showForgotPassword} onClose={() => setShowForgotPassword(false)} />
    </div>
  );
}

export default Auth;
