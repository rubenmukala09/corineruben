import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { 
  Loader2, 
  Home, 
  Shield, 
  Lock, 
  Mail, 
  User, 
  Eye, 
  EyeOff,
  CheckCircle2,
  Sparkles
} from "lucide-react";
import { z } from "zod";
import invisionLogo from "@/assets/shield-logo.png";

const emailSchema = z.string().email("Invalid email address");
const passwordSchema = z.string().min(6, "Password must be at least 6 characters");

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is already logged in
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate("/portal");
      }
    };
    checkUser();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validate email
      emailSchema.parse(email);
      passwordSchema.parse(password);

      if (isLogin) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        if (data.session && data.user) {
          // Check account status
          const { data: profileData, error: profileError } = await supabase
            .from("profiles")
            .select("account_status, application_reference")
            .eq("id", data.user.id)
            .single();

          if (profileError && profileError.code !== 'PGRST116') {
            console.error("Profile check error:", profileError);
          }

          // If account is pending approval
          if (profileData && profileData.account_status === "pending") {
            await supabase.auth.signOut();
            toast({
              title: "⏳ Account Pending Approval",
              description: `Your account is awaiting admin approval. Reference: ${profileData.application_reference || 'N/A'}`,
              variant: "destructive",
            });
            setIsLoading(false);
            return;
          }

          // If account is rejected
          if (profileData && profileData.account_status === "rejected") {
            await supabase.auth.signOut();
            toast({
              title: "❌ Account Rejected",
              description: "Your application was not approved. Please contact support for more information.",
              variant: "destructive",
            });
            setIsLoading(false);
            return;
          }

          // If account is suspended
          if (profileData && profileData.account_status === "suspended") {
            await supabase.auth.signOut();
            toast({
              title: "🚫 Account Suspended",
              description: "Your account has been suspended. Please contact support.",
              variant: "destructive",
            });
            setIsLoading(false);
            return;
          }

          toast({
            title: "✨ Welcome back!",
            description: `Successfully signed in as ${email}`,
          });
          
          // Fetch user's roles and redirect accordingly
          const { data: rolesData } = await supabase
            .from("user_roles")
            .select("role")
            .eq("user_id", data.user.id);

          if (rolesData && rolesData.length > 0) {
            // If user has only one role, redirect directly to that dashboard
            if (rolesData.length === 1) {
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
              return;
            }
            // If multiple roles, go to portal to choose
            navigate("/portal");
            return;
          }

          // No role assigned, go to portal
          navigate("/portal");
        }
      } else {
        // Redirect to signup page instead
        navigate("/signup");
      }
    } catch (error: any) {
      let errorMessage = "An error occurred during sign in";
      let errorTitle = "❌ Sign In Failed";
      
      // Handle specific error types
      if (error.message?.includes("Invalid login credentials")) {
        errorTitle = "🔒 Invalid Credentials";
        errorMessage = "Email or password is incorrect. Please try again.";
      } else if (error.message?.includes("Email not confirmed")) {
        errorTitle = "📧 Email Not Confirmed";
        errorMessage = "Please check your email and confirm your account.";
      } else if (error.message?.includes("Too many requests")) {
        errorTitle = "⏱️ Too Many Attempts";
        errorMessage = "Too many login attempts. Please wait a moment and try again.";
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
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4 py-8">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-accent/10" />
      
      {/* Floating Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_110%)]" />

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-16 items-center animate-fade-in my-auto">
        
        {/* Left Side - Branding & Info */}
        <div className="hidden lg:flex flex-col gap-8 animate-scale-in">
          {/* Logo */}
          <Link to="/" className="inline-flex items-center gap-3 group w-fit hover:scale-105 transition-transform duration-300">
            <img 
              src={invisionLogo} 
              alt="InVision Network Shield Logo" 
              className="w-12 h-12 md:w-14 md:h-14 group-hover:scale-110 transition-transform duration-300"
            />
            <div className="flex flex-col leading-tight">
              <h1 className="text-xl md:text-2xl font-bold gradient-text-primary group-hover:scale-105 transition-transform duration-300">InVision Network</h1>
              <p className="text-xs md:text-sm text-muted-foreground">AI Scam Protection & Business Solutions</p>
            </div>
          </Link>

          {/* Hero Content */}
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 backdrop-blur-sm rounded-full border border-primary/20">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-foreground">Secure Portal Access</span>
              </div>
              <h2 className="text-5xl font-bold leading-tight">
                Join Our <span className="gradient-text-primary">Network</span> of Protection
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Access our secure portal for caregivers, professionals, and community members fighting digital threats together.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-6">
              {[
                { value: "500+", label: "Protected" },
                { value: "24/7", label: "Support" },
                { value: "100%", label: "Secure" }
              ].map((stat, i) => (
                <div key={i} className="space-y-1 p-4 bg-card/50 backdrop-blur-sm rounded-xl border border-border/50 hover:border-primary/50 transition-colors">
                  <div className="text-3xl font-bold gradient-text-primary">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-3 pt-4">
              {[
                { icon: CheckCircle2, text: "Role-based access" },
                { icon: CheckCircle2, text: "Real-time monitoring" },
                { icon: CheckCircle2, text: "Team collaboration" },
                { icon: CheckCircle2, text: "24/7 availability" }
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-2 text-sm">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-muted-foreground">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Auth Form */}
        <div className="w-full max-w-lg mx-auto lg:mx-0 animate-scale-in" style={{ animationDelay: '0.1s' }}>
          {/* Mobile Logo */}
          <Link to="/" className="lg:hidden flex items-center gap-2 md:gap-3 hover:scale-105 transition-transform duration-300 group no-underline mb-8 justify-center">
            <img 
              src={invisionLogo} 
              alt="InVision Network Shield Logo" 
              className="w-8 h-8 md:w-10 md:h-10 group-hover:scale-110 transition-transform duration-300"
            />
            <div className="flex flex-col leading-tight">
              <span className="text-sm md:text-base lg:text-lg font-bold gradient-text-primary group-hover:scale-105 transition-transform duration-300">InVision Network</span>
              <span className="text-[9px] md:text-[10px] text-muted-foreground">AI Scam Protection & Business Solutions</span>
            </div>
          </Link>

          <Card className="p-10 lg:p-12 shadow-2xl border-2 bg-card/80 backdrop-blur-2xl hover:border-primary/50 transition-all duration-500 group">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Header */}
              <div className="space-y-2">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-glow-purple group-hover:scale-110 transition-transform">
                    <Lock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">
                      {isLogin ? "Welcome Back" : "Create Account"}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {isLogin ? "Sign in to continue" : "Join our team today"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Login Options */}
              {!isLogin && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      className="h-11 bg-background/50"
                      disabled={isLoading}
                    >
                      <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      Google
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="h-11 bg-background/50"
                      disabled={isLoading}
                    >
                      <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12.001 2c-5.525 0-10 4.475-10 10a9.994 9.994 0 0 0 6.837 9.488c.5.087.688-.213.688-.476 0-.237-.013-1.024-.013-1.862-2.512.463-3.162-.612-3.362-1.175-.113-.288-.6-1.175-1.025-1.413-.35-.187-.85-.65-.013-.662.788-.013 1.35.725 1.538 1.025.9 1.512 2.338 1.087 2.912.825.088-.65.35-1.087.638-1.337-2.225-.25-4.55-1.113-4.55-4.938 0-1.088.387-1.987 1.025-2.688-.1-.25-.45-1.275.1-2.65 0 0 .837-.262 2.75 1.026a9.28 9.28 0 0 1 2.5-.338c.85 0 1.7.112 2.5.337 1.912-1.3 2.75-1.024 2.75-1.024.55 1.375.2 2.4.1 2.65.637.7 1.025 1.587 1.025 2.687 0 3.838-2.337 4.688-4.562 4.938.362.312.675.912.675 1.85 0 1.337-.013 2.412-.013 2.75 0 .262.188.574.688.474A10.016 10.016 0 0 0 22 12c0-5.525-4.475-10-10-10z"/>
                      </svg>
                      GitHub
                    </Button>
                  </div>
                  
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <Separator className="w-full" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-card px-2 text-muted-foreground">Or continue with email</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Name Fields for Signup */}
              {!isLogin && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-sm font-medium">
                      First Name
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                        disabled={isLoading}
                        placeholder="John"
                        className="h-12 pl-10 bg-background/50"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-sm font-medium">
                      Last Name
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                        disabled={isLoading}
                        placeholder="Doe"
                        className="h-12 pl-10 bg-background/50"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isLoading}
                    placeholder="name@company.com"
                    className="h-12 pl-10 bg-background/50"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isLoading}
                    placeholder="••••••••"
                    className="h-12 pl-10 pr-12 bg-background/50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                {!isLogin && (
                  <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                    <CheckCircle2 className="w-3 h-3" />
                    At least 6 characters required
                  </p>
                )}
              </div>

              {/* Remember Me & Forgot Password */}
              {isLogin && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="remember" 
                      checked={rememberMe}
                      onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                    />
                    <Label 
                      htmlFor="remember" 
                      className="text-sm cursor-pointer"
                    >
                      Remember me
                    </Label>
                  </div>
                  <Link 
                    to="/contact" 
                    className="text-sm text-primary hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
              )}

              {/* Terms for Signup */}
              {!isLogin && (
                <div className="flex items-start space-x-2">
                  <Checkbox id="terms" required />
                  <Label htmlFor="terms" className="text-sm text-muted-foreground cursor-pointer leading-relaxed">
                    I agree to the{" "}
                    <Link to="/terms-of-service" className="text-primary hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link to="/privacy-policy" className="text-primary hover:underline">
                      Privacy Policy
                    </Link>
                  </Label>
                </div>
              )}

              {/* Submit Button */}
              <Button 
                type="submit" 
                className="w-full h-13 text-base font-semibold bg-gradient-to-r from-primary to-accent hover:shadow-glow-purple hover:scale-[1.02] transition-all duration-300" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    {isLogin ? "Signing in..." : "Creating account..."}
                  </>
                ) : (
                  <>
                    {isLogin ? "Sign In to Portal" : "Create Account"}
                  </>
                )}
              </Button>

              {/* Toggle Login/Signup */}
              <div className="text-center pt-4">
                <p className="text-sm text-muted-foreground">
                  {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                  <Link
                    to={isLogin ? "/signup" : "/auth"}
                    className="text-primary font-semibold hover:underline transition-colors"
                  >
                    {isLogin ? "Apply now" : "Sign in"}
                  </Link>
                </p>
                {isLogin && (
                  <p className="text-xs text-muted-foreground mt-2">
                    All applications require admin approval
                  </p>
                )}
              </div>
            </form>
          </Card>

          {/* Footer Links */}
          <div className="mt-8 pt-6 border-t border-border/50">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
              <Link to="/" className="flex items-center gap-1.5 hover:text-foreground transition-colors group">
                <Home className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                <span>Back to Home</span>
              </Link>
              <div className="flex items-center gap-4">
                <Link to="/privacy-policy" className="hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
                <Link to="/terms-of-service" className="hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
                <div className="flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-primary" />
                  <span>Enterprise Security</span>
                </div>
              </div>
            </div>
            
            {/* Additional Footer Content */}
            <div className="mt-6 pt-6 border-t border-border/30">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center sm:text-left">
                <div>
                  <h4 className="font-semibold text-foreground text-sm mb-2">Contact Us</h4>
                  <a href="tel:9375550199" className="text-xs text-muted-foreground hover:text-foreground transition-colors block">
                    (937) 555-0199
                  </a>
                  <a href="mailto:support@invisionnetwork.org" className="text-xs text-muted-foreground hover:text-foreground transition-colors block mt-1">
                    support@invisionnetwork.org
                  </a>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground text-sm mb-2">Quick Links</h4>
                  <Link to="/resources" className="text-xs text-muted-foreground hover:text-foreground transition-colors block">
                    Resources
                  </Link>
                  <Link to="/about" className="text-xs text-muted-foreground hover:text-foreground transition-colors block mt-1">
                    About Us
                  </Link>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground text-sm mb-2">Support</h4>
                  <Link to="/contact" className="text-xs text-muted-foreground hover:text-foreground transition-colors block">
                    Help Center
                  </Link>
                  <Link to="/training" className="text-xs text-muted-foreground hover:text-foreground transition-colors block mt-1">
                    Training
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="text-center mt-6 pt-4 border-t border-border/30">
              <p className="text-xs text-muted-foreground">
                © 2025 InVision Network. All rights reserved.
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Protecting Ohio families from AI-powered digital threats
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
