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
import heroImage from "@/assets/hero-about-3d.jpg";

const emailSchema = z.string().email("Invalid email address");
const passwordSchema = z.string().min(6, "Password must be at least 6 characters");

const Auth = () => {
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

        if (data.session) {
          toast({
            title: "Welcome back!",
            description: "You've successfully logged in.",
          });
          navigate("/portal");
        }
      } else {
        // Validate names for signup
        if (!firstName.trim() || !lastName.trim()) {
          throw new Error("First name and last name are required");
        }

        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/portal`,
            data: {
              first_name: firstName,
              last_name: lastName,
            },
          },
        });

        if (error) throw error;

        if (data.user) {
          toast({
            title: "Account created!",
            description: "Welcome to InVision Network Portal.",
          });
          navigate("/portal");
        }
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex relative overflow-hidden">
      {/* Animated Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Left Side - Decorative Image Panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden animate-fade-in">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/80 to-accent/90 z-10" />
        <img 
          src={heroImage} 
          alt="InVision Network Security" 
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 z-20 flex flex-col justify-between p-12 text-white">
          {/* Top Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">InVision Network</h1>
              <p className="text-sm text-white/80">AI Scam Protection</p>
            </div>
          </Link>

          {/* Center Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-medium">Secure Portal Access</span>
              </div>
              <h2 className="text-4xl font-bold leading-tight">
                Protecting Ohio Families from AI-Powered Scams
              </h2>
              <p className="text-lg text-white/90">
                Join our team of experts dedicated to keeping communities safe from emerging digital threats.
              </p>
            </div>

            {/* Features */}
            <div className="space-y-4">
              {[
                "Role-based dashboard access",
                "Real-time threat monitoring",
                "Secure team collaboration",
                "24/7 system availability"
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-white/90">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Stats */}
          <div className="grid grid-cols-3 gap-6">
            <div className="space-y-1">
              <div className="text-3xl font-bold">500+</div>
              <div className="text-sm text-white/80">Families Protected</div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl font-bold">24/7</div>
              <div className="text-sm text-white/80">Support Available</div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl font-bold">100%</div>
              <div className="text-sm text-white/80">Secure Platform</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Auth Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative z-10">
        <div className="w-full max-w-md space-y-8 animate-scale-in">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center animate-fade-in">
            <Link to="/" className="inline-flex items-center justify-center gap-3 mb-4 group">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center shadow-glow-purple group-hover:scale-110 transition-transform">
                <Shield className="w-7 h-7 text-white" />
              </div>
            </Link>
            <h1 className="text-2xl font-bold gradient-text-primary">InVision Network</h1>
            <p className="text-muted-foreground">Staff Portal</p>
          </div>

          <Card className="p-8 shadow-xl border-2 bg-card/95 backdrop-blur-xl hover:shadow-2xl transition-all duration-300">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Header */}
              <div className="text-center space-y-2 animate-fade-in">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-glow-purple animate-pulse-subtle">
                  <Lock className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold gradient-text-primary">
                  {isLogin ? "Welcome Back" : "Join Our Team"}
                </h2>
                <p className="text-muted-foreground">
                  {isLogin 
                    ? "Sign in to access your secure dashboard" 
                    : "Create your account to get started"}
                </p>
              </div>

              <Separator />

              {/* Name Fields for Signup */}
              {!isLogin && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      First Name
                    </Label>
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
              )}

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                  placeholder="name@company.com"
                  className="h-11"
                />
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isLoading}
                    placeholder="••••••••"
                    className="h-11 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                {!isLogin && (
                  <p className="text-xs text-muted-foreground">
                    Must be at least 6 characters long
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
                className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-primary to-accent hover:shadow-glow-purple transition-all duration-300" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    {isLogin ? "Signing in..." : "Creating account..."}
                  </>
                ) : (
                  <>
                    {isLogin ? "Sign In" : "Create Account"}
                  </>
                )}
              </Button>

              <Separator />

              {/* Toggle Login/Signup */}
              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setIsLogin(!isLogin);
                      setEmail("");
                      setPassword("");
                      setFirstName("");
                      setLastName("");
                    }}
                    className="text-primary font-semibold hover:underline"
                    disabled={isLoading}
                  >
                    {isLogin ? "Sign up" : "Sign in"}
                  </button>
                </p>
              </div>

              {/* Back to Home */}
              <div className="text-center pt-4">
                <Button asChild variant="ghost" size="sm">
                  <Link to="/" className="gap-2 text-muted-foreground">
                    <Home className="w-4 h-4" />
                    Back to Home
                  </Link>
                </Button>
              </div>
            </form>
          </Card>

          {/* Security Badge */}
          <div className="text-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-card/80 backdrop-blur-sm rounded-full border border-border/50 text-sm text-muted-foreground hover:border-primary/50 transition-colors">
              <Shield className="w-4 h-4 text-primary" />
              <span>Secured with enterprise-grade encryption</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
