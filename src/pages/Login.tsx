import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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

const ALLOWED_EMAILS = [
  'ruben@invisionnetwork.org',
  'hello@invisionnetwork.org',
  'training@invisionnetwork.org',
  'consulting@invisionnetwork.org',
  'support@invisionnetwork.org'
];

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
        navigate("/admin");
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

      // Check whitelist
      if (!ALLOWED_EMAILS.includes(normalizedEmail)) {
        toast.error("Access Denied", {
          description: "This email address is not authorized to access the admin portal.",
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50 flex items-center justify-center p-4 relative overflow-hidden">
      <FloatingShapes />
      
      <div className="w-full max-w-md relative z-10">
        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-purple-100">
          {/* Logo */}
          <div className="flex items-center justify-center mb-8">
            <img 
              src={invisionLogo} 
              alt="InVision Network" 
              className="h-20 w-auto"
            />
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="your@invisionnetwork.org"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10"
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked as boolean)}
              />
              <Label htmlFor="remember" className="text-sm font-normal cursor-pointer">
                Remember me for 30 days
              </Label>
            </div>

            {/* Sign In Button */}
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900"
              disabled={isLoading}
            >
              {isLoading ? "Signing In..." : "Sign In Securely"}
            </Button>

            {/* Forgot Password */}
            <div className="text-center">
              <button
                type="button"
                onClick={() => setShowForgotPassword(true)}
                className="text-sm text-purple-600 hover:text-purple-800 hover:underline"
              >
                Forgot password? → Reset via email
              </button>
            </div>
          </form>

          {/* Security Notice */}
          <div className="mt-6 pt-6 border-t border-gray-200 text-center">
            <p className="text-xs text-gray-500 flex items-center justify-center gap-2">
              <Lock className="h-3 w-3" />
              Secured with 256-bit encryption
            </p>
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
