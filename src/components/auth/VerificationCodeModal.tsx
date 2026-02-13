import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Shield } from "lucide-react";
import { cn } from "@/lib/utils";
import { ROLE_CONFIGS } from "@/hooks/useUserRole";

interface VerificationCodeModalProps {
  open: boolean;
  onClose: () => void;
  email: string;
  rememberMe: boolean;
}

export function VerificationCodeModal({
  open,
  onClose,
  email,
  rememberMe,
}: VerificationCodeModalProps) {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [isVerifying, setIsVerifying] = useState(false);
  const [countdown, setCountdown] = useState(600); // 10 minutes
  const [canResend, setCanResend] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (open) {
      setCountdown(600);
      inputRefs.current[0]?.focus();
    }
  }, [open]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  useEffect(() => {
    if (resendCountdown > 0) {
      const timer = setTimeout(
        () => setResendCountdown(resendCountdown - 1),
        1000,
      );
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [resendCountdown]);

  const handleCodeChange = (index: number, value: string) => {
    if (value.length > 1) {
      // Handle paste
      const digits = value.slice(0, 6).split("");
      const newCode = [...code];
      digits.forEach((digit, i) => {
        if (index + i < 6) {
          newCode[index + i] = digit;
        }
      });
      setCode(newCode);

      // Auto-submit if complete
      if (newCode.every((d) => d !== "")) {
        handleVerify(newCode.join(""));
      }
      return;
    }

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-advance
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit if complete
    if (newCode.every((d) => d !== "")) {
      handleVerify(newCode.join(""));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async (codeString?: string) => {
    const verificationCode = codeString || code.join("");

    if (verificationCode.length !== 6) {
      toast.error("Please enter the complete 6-digit code");
      return;
    }

    setIsVerifying(true);

    try {
      // Step 1: Verify the 2FA code
      const { data, error } = await supabase.functions.invoke("verify-code", {
        body: { email, code: verificationCode },
      });

      if (error || !data.valid) {
        toast.error(data?.error || "Invalid verification code");
        setCode(["", "", "", "", "", ""]);
        inputRefs.current[0]?.focus();
        setIsVerifying(false);
        return;
      }

      // Step 2: Use existing password session; ensure it's present
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData.session?.user) {
        toast.error("Your session expired. Please log in again.");
        setIsVerifying(false);
        return;
      }

      const userId = sessionData.session.user.id;

      // Step 4: Query user_roles table to get their role
      const { data: roleData, error: roleError } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId)
        .single();

      if (roleError || !roleData) {
        // No role assigned yet - redirect to pending approval page
        toast.success("Verification successful!");
        navigate("/application-pending");
        onClose();
        setIsVerifying(false);
        return;
      }

      // Step 5: Get redirect path from ROLE_CONFIGS
      const userRole = roleData.role;
      const roleConfig = ROLE_CONFIGS[userRole];

      if (!roleConfig) {
        // Fallback if role not found in configs
        toast.warning("Role configuration not found. Redirecting to home.");
        navigate("/");
        onClose();
        setIsVerifying(false);
        return;
      }

      // Step 6: Redirect to role-specific dashboard
      const redirectPath = roleConfig.redirectTo;
      toast.success(
        `Welcome! Redirecting to your ${roleConfig.displayName} dashboard...`,
      );

      // Small delay to show the success message
      setTimeout(() => {
        navigate(redirectPath);
        onClose();
        setIsVerifying(false);
      }, 500);
    } catch (error: any) {
      console.error("Verification error:", error);
      toast.error("An unexpected error occurred. Please try again.");
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    if (!canResend) return;

    try {
      const { error } = await supabase.functions.invoke(
        "send-verification-code",
        {
          body: { email },
        },
      );

      if (error) {
        toast.error("Failed to resend code. Please try again.");
        return;
      }

      toast.success("New code sent! Check your email.");
      setCode(["", "", "", "", "", ""]);
      setCountdown(600);
      setResendCountdown(60);
      setCanResend(false);
      inputRefs.current[0]?.focus();
    } catch (error) {
      console.error("Resend error:", error);
      toast.error("Failed to resend code.");
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const maskedEmail =
    email.slice(0, 2) + "***" + email.slice(email.indexOf("@"));

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md w-[calc(100vw-2rem)] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Shield className="w-6 h-6 text-primary" />
            Two-Factor Authentication
          </DialogTitle>
          <DialogDescription className="text-base">
            We sent a 6-digit code to{" "}
            <span className="font-semibold text-foreground">{email}</span>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Code Input Grid - Responsive with 2x3 grid for very small screens */}
          <div className="grid grid-cols-6 xs-small:grid-cols-3 gap-2 sm:gap-3 max-w-sm mx-auto px-2">
            <style>{`
              @media (max-width: 374px) {
                .xs-small\\:grid-cols-3 {
                  grid-template-columns: repeat(3, 1fr);
                  max-width: 200px;
                }
              }
            `}</style>
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleCodeChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className={cn(
                  "w-full aspect-square text-center text-lg sm:text-xl md:text-2xl font-bold rounded-lg border-2 transition-all duration-200",
                  "focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary",
                  "bg-background",
                  digit ? "border-primary bg-primary/5" : "border-input",
                  "touch-manipulation min-h-[48px] min-w-[48px]",
                )}
                disabled={isVerifying}
                aria-label={`Digit ${index + 1}`}
              />
            ))}
          </div>

          {/* Timer */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Code expires in:{" "}
              <span className="font-semibold text-foreground">
                {formatTime(countdown)}
              </span>
            </p>
          </div>

          {/* Resend Code */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2">
              Didn't receive the code?
            </p>
            <Button
              type="button"
              variant="outline"
              onClick={handleResend}
              disabled={!canResend || resendCountdown > 0}
              className="min-h-[48px] px-6"
            >
              {resendCountdown > 0
                ? `Resend in ${resendCountdown}s`
                : "Resend Code"}
            </Button>
          </div>

          {/* Verify Button */}
          <Button
            onClick={() => handleVerify()}
            disabled={isVerifying || code.some((d) => !d)}
            className="w-full min-h-[52px] text-base font-semibold bg-gradient-to-r from-primary to-accent"
          >
            {isVerifying ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Verifying...
              </span>
            ) : (
              "Verify Code"
            )}
          </Button>

          {/* Back to Login */}
          <div className="text-center">
            <button
              type="button"
              onClick={onClose}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1 py-2"
            >
              ← Back to Login
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
