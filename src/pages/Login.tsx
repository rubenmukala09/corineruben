import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Eye, EyeOff, Lock, Mail, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { z } from "zod";
import { FloatingShapes } from "@/components/FloatingShapes";
import { VerificationCodeModal } from "@/components/auth/VerificationCodeModal";
import { ForgotPasswordModal } from "@/components/auth/ForgotPasswordModal";
import invisionLogo from "@/assets/shield-logo.png";

// Email domain validation for InVision Network staff
const INVISION_DOMAIN = "@invisionnetwork.org";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        // Get user's role and redirect accordingly
        const { data: rolesData } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", session.user.id);

        if (rolesData && rolesData.length > 0) {
          const userRole = rolesData[0].role;
          const roleRedirects: Record<string, string> = {
            'admin': '/portal/admin',
            'secretary': '/admin/clients/businesses',
            'training_coordinator': '/portal/trainer',
            'business_consultant': '/admin/clients/businesses',
            'support_specialist': '/portal/staff',
            'staff': '/portal/staff',
            'moderator': '/admin',
            'user': '/portal'
          };
          const redirectPath = roleRedirects[userRole] || '/portal';
          navigate(redirectPath);
        } else {
          navigate("/portal");
        }
      }
    };
    checkSession();
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validate input
      const validation = loginSchema.safeParse({ email, password });
      if (!validation.success) {
        toast.error(validation.error.errors[0].message);
        setIsLoading(false);
        return;
      }

      const normalizedEmail = email.toLowerCase().trim();

      // Check if email is from InVision Network domain
      if (!normalizedEmail.endsWith(INVISION_DOMAIN)) {
        toast.error("Access Denied", {
          description: "Only InVision Network email addresses can access this portal.",
        });
        setIsLoading(false);
        return;
      }

      // Attempt login
      const { data, error } = await supabase.auth.signInWithPassword({
        email: normalizedEmail,
        password,
      });

      if (error) {
        if (error.message.includes("Invalid login credentials")) {
          toast.error("Invalid credentials. Please try again.");
        } else {
          toast.error(error.message);
        }
        setIsLoading(false);
        return;
      }

      if (data.user) {
        // Send verification code
        const { error: codeError } = await supabase.functions.invoke(
          "send-verification-code",
          { body: { email: normalizedEmail } }
        );

        if (codeError) {
          console.error("Error sending verification code:", codeError);
          toast.error("Failed to send verification code. Please try again.");
          setIsLoading(false);
          return;
        }

        toast.success("Verification code sent! Check your email.");
        setShowVerification(true);
      }
    } catch (error: any) {
      console.error("Login error:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden overflow-y-auto bg-background">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-sm">
        <div className="flex justify-between items-center px-4 md:px-6 lg:px-8 py-3">
          <Link to="/" className="flex items-center gap-2 md:gap-3 hover:scale-105 transition-transform duration-300 group flex-shrink-0 no-underline">
            <img 
              src={invisionLogo} 
              alt="InVision Network Shield Logo" 
              className="w-8 h-8 md:w-10 md:h-10 group-hover:scale-110 transition-transform duration-300"
            />
            <div className="flex flex-col leading-tight">
              <span className="text-sm md:text-base lg:text-lg font-bold gradient-text-primary group-hover:scale-105 transition-transform duration-300">InVision Network</span>
              <span className="text-[9px] md:text-[10px] text-muted-foreground hidden sm:block">AI Scam Protection & Business Solutions</span>
            </div>
          </Link>
          <Button 
            variant="outline" 
            onClick={() => navigate('/')}
            className="text-sm md:text-base"
          >
            Back to Home
          </Button>
        </div>
      </header>

      {/* Main Content - Split Screen */}
      <div className="flex-1 flex flex-col md:flex-row lg:flex-row">
        {/* Left: Security Graphic Section (hidden on mobile, 40% on tablet, 50% on desktop) */}
        <div className="hidden md:flex md:w-2/5 lg:w-1/2 bg-gradient-to-br from-primary via-primary to-accent relative overflow-hidden items-center justify-center p-8 lg:p-12">
          {/* Decorative Background Elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-20 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          </div>

          {/* Main Content */}
          <div className="relative z-10 text-center max-w-lg">
            {/* Shield Icon */}
            <div className="mb-6 lg:mb-8 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-white/20 rounded-full blur-2xl animate-pulse" />
                <div className="relative bg-white/10 backdrop-blur-md p-6 lg:p-8 rounded-3xl border border-white/20 shadow-2xl">
                  <Shield className="w-20 h-20 lg:w-32 lg:h-32 text-white" strokeWidth={1.5} />
                </div>
              </div>
            </div>

            {/* Heading - responsive text */}
            <h1 className="text-3xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-3 lg:mb-4">
              Secure Access Portal
            </h1>
            <p className="text-base lg:text-lg text-white/90 mb-6 lg:mb-8">
              Your data is protected with enterprise-grade security
            </p>

            {/* Trust Indicators - smaller on tablet */}
            <div className="flex flex-col gap-3 lg:gap-4 text-white/80 text-xs lg:text-sm">
              <div className="flex items-center justify-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-3 lg:p-4 border border-white/20">
                <Lock className="w-4 h-4 lg:w-5 lg:h-5" />
                <span>256-bit SSL Encryption</span>
              </div>
              <div className="flex items-center justify-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-3 lg:p-4 border border-white/20">
                <Shield className="w-4 h-4 lg:w-5 lg:h-5" />
                <span>SOC 2 Compliant</span>
              </div>
              <div className="flex items-center justify-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-3 lg:p-4 border border-white/20">
                <Mail className="w-4 h-4 lg:w-5 lg:h-5" />
                <span>Two-Factor Authentication</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Login Form Section (60% on tablet, 50% on desktop) */}
        <div className="flex-1 md:w-3/5 lg:w-1/2 flex items-center justify-center p-4 md:p-8 lg:p-12 bg-background">
          <div className="w-full max-w-md">
            {/* Mobile Shield Header */}
            <div className="md:hidden mb-6 text-center">
              <div className="inline-flex p-3 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 mb-3">
                <Shield className="w-12 h-12 text-primary" />
              </div>
              <p className="text-xs text-muted-foreground">Secured with 256-bit encryption</p>
            </div>

            {/* Form Header */}
            <div className="mb-8 text-center lg:text-left">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                Welcome Back
              </h2>
              <p className="text-muted-foreground">
                Sign in to your secure dashboard
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-5">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@invisionnetwork.org"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-12 text-[16px] sm:text-base"
                    required
                    autoComplete="email"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-12 h-12 text-[16px] sm:text-base"
                    required
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-3 -m-3 min-w-[44px] min-h-[44px] flex items-center justify-center"
                    tabIndex={-1}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center space-x-3 py-1">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  className="w-5 h-5 sm:w-6 sm:h-6"
                />
                <Label 
                  htmlFor="remember" 
                  className="text-sm font-normal cursor-pointer select-none"
                >
                  Remember me for 30 days
                </Label>
              </div>

              {/* Sign In Button */}
              <Button
                type="submit"
                className="w-full h-[52px] text-base font-semibold bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Signing In...
                  </span>
                ) : (
                  "Sign In Securely"
                )}
              </Button>

              {/* Forgot Password */}
              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(true)}
                  className="text-sm text-primary hover:text-accent transition-colors inline-block py-3 px-2 min-h-[44px]"
                >
                  Forgot password? → Reset via email
                </button>
              </div>

              {/* Staff Signup Link */}
              <div className="text-center pt-2 mt-2 border-t border-border/50">
                <p className="text-sm text-muted-foreground">
                  New staff member?{" "}
                  <Link 
                    to="/staff-signup" 
                    className="text-primary hover:text-accent font-semibold transition-colors"
                  >
                    Create your account
                  </Link>
                </p>
              </div>
            </form>

            {/* Security Notice */}
            <div className="mt-8 pt-6 border-t border-border text-center">
              <p className="text-xs text-muted-foreground flex items-center justify-center gap-2">
                <Lock className="h-3.5 w-3.5" />
                Secured with 256-bit encryption
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Verification Modal */}
      <VerificationCodeModal
        open={showVerification}
        onClose={() => setShowVerification(false)}
        email={email}
        rememberMe={rememberMe}
      />

      {/* Forgot Password Modal */}
      <ForgotPasswordModal
        open={showForgotPassword}
        onClose={() => setShowForgotPassword(false)}
      />
    </div>
  );
}
