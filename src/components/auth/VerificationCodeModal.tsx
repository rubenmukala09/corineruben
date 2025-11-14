import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";

const ROLE_REDIRECTS: Record<string, string> = {
  'ruben@invisionnetwork.org': '/admin',
  'hello@invisionnetwork.org': '/admin/clients',
  'training@invisionnetwork.org': '/admin/articles',
  'consulting@invisionnetwork.org': '/admin/business-clients',
  'support@invisionnetwork.org': '/admin'
};

interface VerificationCodeModalProps {
  open: boolean;
  onClose: () => void;
  email: string;
  rememberMe: boolean;
}

export function VerificationCodeModal({ open, onClose, email, rememberMe }: VerificationCodeModalProps) {
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
      const timer = setTimeout(() => setResendCountdown(resendCountdown - 1), 1000);
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
      if (newCode.every(d => d !== "")) {
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
    if (newCode.every(d => d !== "")) {
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

      // Redirect based on user role
      const normalizedEmail = email.toLowerCase().trim();
      const redirectPath = ROLE_REDIRECTS[normalizedEmail] || '/admin';
      
      toast.success("Verification successful! Redirecting...");
      navigate(redirectPath);
      onClose();
    } catch (error: any) {
      console.error("Verification error:", error);
      toast.error("Verification failed. Please try again.");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    if (!canResend) return;

    try {
      const { error } = await supabase.functions.invoke("send-verification-code", {
        body: { email },
      });

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

  const maskedEmail = email.slice(0, 2) + "***" + email.slice(email.indexOf("@"));

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">Enter Verification Code</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              We sent a 6-digit code to:
            </p>
            <p className="text-sm font-medium mt-1">{maskedEmail}</p>
            <p className="text-xs text-muted-foreground mt-1">(masked for security)</p>
          </div>

          {/* Code Input */}
          <div className="flex justify-center gap-2">
            {code.map((digit, index) => (
              <Input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={digit}
                onChange={(e) => handleCodeChange(index, e.target.value.replace(/\D/g, ""))}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 text-center text-lg font-bold"
                disabled={isVerifying}
              />
            ))}
          </div>

          {/* Countdown */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Code expires in: <span className="font-mono font-bold">{formatTime(countdown)}</span>
            </p>
          </div>

          {/* Verify Button */}
          <Button
            onClick={() => handleVerify()}
            className="w-full"
            disabled={isVerifying || code.some(d => !d)}
          >
            {isVerifying ? "Verifying..." : "Verify & Sign In"}
          </Button>

          {/* Resend */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2">Didn't receive code?</p>
            <Button
              variant="link"
              onClick={handleResend}
              disabled={!canResend}
              className="text-sm"
            >
              {canResend ? "Resend Code" : `Resend Code (${resendCountdown}s)`}
            </Button>
          </div>

          {/* Back */}
          <Button
            variant="ghost"
            onClick={onClose}
            className="w-full"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to login
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}