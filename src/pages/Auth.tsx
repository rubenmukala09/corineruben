import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { 
  Loader2, 
  Lock, 
  Mail, 
  Eye, 
  EyeOff,
  ArrowRight
} from "lucide-react";
import { z } from "zod";
import invisionLogo from "@/assets/shield-logo.png";
import authBackground from "@/assets/auth-background.jpg";
import { Session, User } from "@supabase/supabase-js";

const emailSchema = z.string().email("Please enter a valid email address");
const passwordSchema = z.string().min(6, "Password must be at least 6 characters");

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  
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

  const validateForm = (): boolean => {
    let isValid = true;
    setEmailError("");
    setPasswordError("");

    try {
      emailSchema.parse(email);
    } catch {
      setEmailError("Please enter a valid email address");
      isValid = false;
    }

    try {
      passwordSchema.parse(password);
    } catch {
      setPasswordError("Password must be at least 6 characters");
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
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

  return (
    <div className="min-h-screen w-full relative flex items-center justify-center p-4 md:p-6 lg:p-8">
      {/* Professional Background Image */}
      <div className="fixed inset-0 z-0">
        <img 
          src={authBackground} 
          alt="" 
          className="w-full h-full object-cover"
        />
        {/* Subtle overlay for readability */}
        <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px]" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-[420px]">
        {/* Logo - clickable to go home */}
        <Link 
          to="/" 
          className="flex items-center justify-center gap-3 mb-8 group transition-transform duration-300 hover:scale-105"
        >
          <img 
            src={invisionLogo} 
            alt="InVision Network - Back to Home" 
            className="w-12 h-12 md:w-14 md:h-14 drop-shadow-lg"
          />
          <div className="flex flex-col leading-tight">
            <span className="text-xl md:text-2xl font-bold text-foreground drop-shadow-sm">
              InVision Network
            </span>
            <span className="text-xs text-muted-foreground">
              Secure Portal Access
            </span>
          </div>
        </Link>

        {/* Login Card - Soft Modern */}
        <div className="bg-white rounded-3xl p-8 md:p-10 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] border border-white/50">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Header */}
            <div className="text-center mb-6">
              <div className="w-14 h-14 mx-auto bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center shadow-lg mb-4">
                <Lock className="w-7 h-7 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-foreground">Welcome Back</h1>
              <p className="text-muted-foreground text-sm mt-1">
                Sign in to access your portal
              </p>
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-foreground">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailError("");
                  }}
                  required
                  disabled={isLoading}
                  placeholder="your@email.com"
                  className={`h-12 pl-10 bg-slate-50/50 border-slate-200 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary ${emailError ? 'border-destructive' : ''}`}
                  autoComplete="email"
                />
              </div>
              {emailError && (
                <p className="text-xs text-destructive">{emailError}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-foreground">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setPasswordError("");
                  }}
                  required
                  disabled={isLoading}
                  placeholder="••••••••"
                  className={`h-12 pl-10 pr-12 bg-slate-50/50 border-slate-200 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary ${passwordError ? 'border-destructive' : ''}`}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {passwordError && (
                <p className="text-xs text-destructive">{passwordError}</p>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="remember" 
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  className="border-slate-300 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
                <Label htmlFor="remember" className="text-sm cursor-pointer text-muted-foreground">
                  Remember me
                </Label>
              </div>
              <Link to="/contact" className="text-sm text-primary hover:text-primary/80 transition-colors font-medium">
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <Button 
              type="submit" 
              className="w-full h-12 text-base font-semibold bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all duration-300" 
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="ml-2 w-4 h-4" />
                </>
              )}
            </Button>

            {/* Sign Up Link */}
            <div className="text-center pt-4 border-t border-slate-200">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link to="/signup" className="text-primary font-semibold hover:text-primary/80 transition-colors">
                  Apply now
                </Link>
              </p>
            </div>
          </form>
        </div>

        {/* Bottom Links */}
        <div className="mt-6 flex items-center justify-center gap-4 text-xs text-muted-foreground">
          <Link to="/privacy-policy" className="hover:text-foreground transition-colors">
            Privacy
          </Link>
          <span className="text-slate-300">•</span>
          <Link to="/terms-of-service" className="hover:text-foreground transition-colors">
            Terms
          </Link>
          <span className="text-slate-300">•</span>
          <span>© {new Date().getFullYear()} InVision Network</span>
        </div>
      </div>
    </div>
  );
}

export default Auth;