import { useState } from "react";
import { Link } from "react-router-dom";
import { Shield, Lock, Mail, ArrowLeft, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const PasswordReset = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Email validation
    if (!email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }

    // TODO: Replace with actual password reset logic
    console.log("Password reset requested for:", email);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-purple-700 to-blue-600 p-4">
        <div className="w-full max-w-md">
          {/* Success Card */}
          <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl p-8 animate-scale-in text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            
            <h2 className="text-2xl font-bold mb-3">Check Your Email</h2>
            <p className="text-muted-foreground mb-6">
              We've sent a password reset link to:
            </p>
            <p className="font-medium text-foreground mb-8 bg-muted/50 py-3 px-4 rounded-lg">
              {email}
            </p>
            
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Didn't receive the email? Check your spam folder or try again.
              </p>
              
              <Button
                onClick={() => setIsSubmitted(false)}
                variant="outline"
                className="w-full"
              >
                Try Another Email
              </Button>
              
              <Link to="/login">
                <Button variant="ghost" className="w-full">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Login
                </Button>
              </Link>
            </div>

            {/* Security Note */}
            <div className="mt-8 pt-6 border-t border-border">
              <p className="text-xs text-muted-foreground">
                For security reasons, the reset link will expire in 1 hour.
              </p>
            </div>
          </div>

          {/* Back to Home */}
          <div className="text-center mt-6">
            <Link to="/" className="text-sm text-white/80 hover:text-white transition-colors">
              ← Back to homepage
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-purple-700 to-blue-600 p-4">
      <div className="w-full max-w-md">
        {/* Logo and Title */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm mb-4 border border-white/20">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Reset Your Password</h1>
          <p className="text-purple-100">Enter your email to receive a reset link</p>
        </div>

        {/* Reset Password Card */}
        <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl p-8 animate-scale-in">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">Email Address</Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-12 pl-10"
                />
                <Mail className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              </div>
              <p className="text-xs text-muted-foreground">
                We'll send you a secure link to reset your password
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-lg border border-destructive/20">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <Button type="submit" className="w-full h-12 text-base" size="lg">
              Send Reset Link
            </Button>
          </form>

          {/* Back to Login */}
          <div className="mt-6 text-center">
            <Link
              to="/login"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to login
            </Link>
          </div>

          {/* Security Badge */}
          <div className="mt-8 pt-6 border-t border-border">
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <Lock className="w-3.5 h-3.5" />
              <span>Secure password recovery</span>
            </div>
          </div>
        </div>

        {/* Additional Help */}
        <div className="text-center mt-6 space-y-2">
          <p className="text-sm text-white/80">
            Need help? <Link to="/contact" className="text-white hover:underline">Contact support</Link>
          </p>
          <Link to="/" className="text-sm text-white/60 hover:text-white transition-colors block">
            ← Back to homepage
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PasswordReset;
