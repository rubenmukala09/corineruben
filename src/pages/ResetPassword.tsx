import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Eye, EyeOff, Lock, CheckCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { FloatingShapes } from "@/components/FloatingShapes";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isValidating, setIsValidating] = useState(true);
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [success, setSuccess] = useState(false);
  const [countdown, setCountdown] = useState(3);

  // Password requirements
  const requirements = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };

  const allRequirementsMet = Object.values(requirements).every(Boolean);
  const passwordsMatch = password && confirmPassword && password === confirmPassword;

  // Password strength
  const getPasswordStrength = () => {
    const met = Object.values(requirements).filter(Boolean).length;
    if (met < 3) return { label: "Weak", color: "bg-red-500", width: "w-1/4" };
    if (met === 3) return { label: "Medium", color: "bg-yellow-500", width: "w-1/2" };
    if (met === 4) return { label: "Strong", color: "bg-green-500", width: "w-3/4" };
    return { label: "Very Strong", color: "bg-green-600", width: "w-full" };
  };

  const strength = getPasswordStrength();

  useEffect(() => {
    validateToken();
  }, [token]);

  useEffect(() => {
    if (success && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (success && countdown === 0) {
      navigate("/login");
    }
  }, [success, countdown, navigate]);

  const validateToken = async () => {
    if (!token) {
      toast.error("Invalid reset link");
      setIsValidating(false);
      return;
    }

    // Check if token exists and is valid
    const { data, error } = await supabase
      .from("password_reset_tokens")
      .select("*")
      .eq("token", token)
      .eq("used", false)
      .single();

    if (error || !data) {
      toast.error("This reset link is invalid or has expired.");
      setIsValidating(false);
      return;
    }

    if (new Date(data.expires_at) < new Date()) {
      toast.error("This reset link has expired.");
      setIsValidating(false);
      return;
    }

    setIsTokenValid(true);
    setIsValidating(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!allRequirementsMet) {
      toast.error("Please meet all password requirements");
      return;
    }

    if (!passwordsMatch) {
      toast.error("Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      // Get token data
      const { data: tokenData } = await supabase
        .from("password_reset_tokens")
        .select("email")
        .eq("token", token!)
        .single();

      if (!tokenData) {
        toast.error("Invalid reset token");
        setIsLoading(false);
        return;
      }

      // Update password
      const { error: updateError } = await supabase.auth.updateUser({
        password,
      });

      if (updateError) {
        toast.error(updateError.message);
        setIsLoading(false);
        return;
      }

      // Mark token as used
      await supabase
        .from("password_reset_tokens")
        .update({ used: true })
        .eq("token", token!);

      setSuccess(true);
      toast.success("Password reset successful!");
    } catch (error: any) {
      console.error("Password reset error:", error);
      toast.error("Failed to reset password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isValidating) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Validating reset link...</p>
        </div>
      </div>
    );
  }

  if (!isTokenValid) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <X className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Invalid Reset Link</h1>
          <p className="text-gray-600 mb-6">
            This reset link is invalid or has expired. Please request a new password reset.
          </p>
          <Button onClick={() => navigate("/login")}>
            Back to Login
          </Button>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Password Reset Successful</h1>
          <p className="text-gray-600 mb-2">
            Your password has been updated.
          </p>
          <p className="text-gray-600 mb-6">
            You can now sign in with your new password.
          </p>
          <p className="text-sm text-gray-500 mb-4">
            Redirecting to login in {countdown} seconds...
          </p>
          <Button onClick={() => navigate("/login")}>
            Sign In Now
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50 flex items-center justify-center p-4 relative overflow-hidden">
      <FloatingShapes />
      
      <div className="w-full max-w-md relative z-10">
        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-purple-100">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Create New Password</h1>
            <p className="text-gray-600 mt-2">
              Choose a strong password for your InVision Network admin account.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* New Password */}
            <div className="space-y-2">
              <Label htmlFor="password">New Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>

              {/* Password Strength */}
              {password && (
                <div>
                  <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                    <span>Password strength:</span>
                    <span className={strength.label === "Weak" ? "text-red-600" : strength.label === "Medium" ? "text-yellow-600" : "text-green-600"}>
                      {strength.label}
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className={`h-full ${strength.color} ${strength.width} transition-all duration-300`} />
                  </div>
                </div>
              )}
            </div>

            {/* Requirements */}
            {password && (
              <div className="space-y-2 text-sm">
                <p className="font-medium">Requirements:</p>
                <div className="space-y-1">
                  {Object.entries({
                    length: "At least 8 characters",
                    uppercase: "One uppercase letter",
                    lowercase: "One lowercase letter",
                    number: "One number",
                    special: "One special character",
                  }).map(([key, label]) => (
                    <div key={key} className="flex items-center gap-2">
                      {requirements[key as keyof typeof requirements] ? (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      ) : (
                        <X className="w-4 h-4 text-gray-400" />
                      )}
                      <span className={requirements[key as keyof typeof requirements] ? "text-green-600" : "text-gray-600"}>
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pl-10 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {confirmPassword && passwordsMatch && (
                <p className="text-sm text-green-600 flex items-center gap-1">
                  <CheckCircle className="w-4 h-4" />
                  Passwords match
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading || !allRequirementsMet || !passwordsMatch}
            >
              {isLoading ? "Resetting Password..." : "Reset Password"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}