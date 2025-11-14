import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Mail, CheckCircle } from "lucide-react";

interface ForgotPasswordModalProps {
  open: boolean;
  onClose: () => void;
}

export function ForgotPasswordModal({ open, onClose }: ForgotPasswordModalProps) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.functions.invoke("send-password-reset", {
        body: { email: email.toLowerCase().trim() },
      });

      if (error) {
        toast.error("Failed to send reset link. Please try again.");
        setIsLoading(false);
        return;
      }

      setEmailSent(true);
      toast.success("If your email is registered, you will receive a reset link.");
    } catch (error) {
      console.error("Password reset error:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setEmail("");
    setEmailSent(false);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">
            {emailSent ? "Check Your Email" : "Reset Your Password"}
          </DialogTitle>
        </DialogHeader>

        {!emailSent ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="text-center text-sm text-muted-foreground">
              Enter your authorized email address and we'll send you a reset link.
            </div>

            <div className="space-y-2">
              <Label htmlFor="reset-email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="reset-email"
                  type="email"
                  placeholder="your@invisionnetwork.org"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Sending..." : "Send Reset Link"}
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="w-full"
            >
              Cancel
            </Button>
          </form>
        ) : (
          <div className="space-y-6 text-center">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                If your email is registered, we've sent you a password reset link.
              </p>
              <p className="text-sm text-muted-foreground">
                Check your inbox and spam folder.
              </p>
              <p className="text-sm font-medium">Link expires in 1 hour.</p>
            </div>

            <Button onClick={handleClose} className="w-full">
              Back to Login
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}