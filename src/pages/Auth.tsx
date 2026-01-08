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
  XCircle
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

    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
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

  const PasswordStrengthIndicator = ({ met, label }: { met: boolean; label: string }) => (
    <div className={`flex items-center gap-2 text-xs ${met ? 'text-green-600' : 'text-muted-foreground'}`}>
      {met ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
      {label}
    </div>
  );

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
      <div className="relative z-10 w-full max-w-[420px]">
        {/* Logo */}
        <Link 
          to="/" 
          className="flex items-center justify-center gap-3 mb-8 group transition-transform duration-300 hover:scale-105"
        >
          <img src={invisionLogo} alt="InVision Network" className="w-12 h-12 md:w-14 md:h-14 drop-shadow-lg" />
          <div className="flex flex-col leading-tight">
            <span className="text-xl md:text-2xl font-bold text-foreground drop-shadow-sm">InVision Network</span>
            <span className="text-xs text-muted-foreground">Secure Portal Access</span>
          </div>
        </Link>

        {/* Auth Card */}
        <div className="bg-white rounded-3xl p-8 md:p-10 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] border border-white/50">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            {/* Login Tab */}
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-5">
                <div className="text-center mb-4">
                  <div className="w-14 h-14 mx-auto bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center shadow-lg mb-4">
                    <Lock className="w-7 h-7 text-white" />
                  </div>
                  <h1 className="text-2xl font-bold text-foreground">Welcome Back</h1>
                  <p className="text-muted-foreground text-sm mt-1">Sign in to access your portal</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="login-email">Email Address</Label>
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
                      className={`h-12 pl-10 ${emailError ? 'border-destructive' : ''}`}
                      autoComplete="email"
                    />
                  </div>
                  {emailError && <p className="text-xs text-destructive">{emailError}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="login-password">Password</Label>
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
                      className={`h-12 pl-10 pr-12 ${passwordError ? 'border-destructive' : ''}`}
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1"
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {passwordError && <p className="text-xs text-destructive">{passwordError}</p>}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="remember" 
                      checked={rememberMe}
                      onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                    />
                    <Label htmlFor="remember" className="text-sm cursor-pointer text-muted-foreground">Remember me</Label>
                  </div>
                  <button 
                    type="button"
                    onClick={() => setShowForgotPassword(true)}
                    className="text-sm text-primary hover:text-primary/80 font-medium"
                  >
                    Forgot password?
                  </button>
                </div>

                <Button type="submit" className="w-full h-12 text-base font-semibold" disabled={isLoading}>
                  {isLoading ? (
                    <><Loader2 className="mr-2 h-5 w-5 animate-spin" />Signing in...</>
                  ) : (
                    <>Sign In<ArrowRight className="ml-2 w-4 h-4" /></>
                  )}
                </Button>
              </form>
            </TabsContent>

            {/* Signup Tab */}
            <TabsContent value="signup">
              <form onSubmit={handleSignup} className="space-y-4">
                <div className="text-center mb-4">
                  <div className="w-14 h-14 mx-auto bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center shadow-lg mb-4">
                    <User className="w-7 h-7 text-white" />
                  </div>
                  <h1 className="text-2xl font-bold text-foreground">Create Account</h1>
                  <p className="text-muted-foreground text-sm mt-1">Join InVision Network today</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                      disabled={isLoading}
                      placeholder="John"
                      className="h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                      disabled={isLoading}
                      placeholder="Doe"
                      className="h-11"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email Address</Label>
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
                      className="h-11 pl-10"
                      autoComplete="email"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
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
                      className="h-11 pl-10 pr-12"
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1"
                      tabIndex={-1}
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
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
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
                      className="h-11 pl-10 pr-12"
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1"
                      tabIndex={-1}
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

                <Button type="submit" className="w-full h-12 text-base font-semibold" disabled={isLoading}>
                  {isLoading ? (
                    <><Loader2 className="mr-2 h-5 w-5 animate-spin" />Creating account...</>
                  ) : (
                    <>Create Account<ArrowRight className="ml-2 w-4 h-4" /></>
                  )}
                </Button>
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
