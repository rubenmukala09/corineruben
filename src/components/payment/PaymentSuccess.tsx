import { Check, Mail, BookOpen, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import confetti from "canvas-confetti";
import { useEffect } from "react";

interface PaymentSuccessProps {
  email: string;
  orderNumber?: string;
  isDigital?: boolean;
  onClose: () => void;
}

export function PaymentSuccess({
  email,
  orderNumber,
  onClose,
}: PaymentSuccessProps) {
  useEffect(() => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#8B5CF6", "#06B6D4", "#10B981"],
    });
  }, []);

  return (
    <div className="text-center py-6 space-y-6 animate-fade-in">
      <div className="mx-auto w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center animate-scale-in">
        <Check className="h-10 w-10 text-green-600 dark:text-green-400" />
      </div>

      <div className="space-y-2">
        <h3 className="text-2xl font-bold text-foreground">
          Payment Successful!
        </h3>

        {orderNumber && (
          <p className="text-sm text-muted-foreground">
            Order #{orderNumber}
          </p>
        )}
      </div>

      <div className="bg-muted/50 rounded-xl p-4 space-y-3">
        <div className="flex items-center gap-3 text-left">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Mail className="h-4 w-4 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium">Confirmation sent to</p>
            <p className="text-sm text-muted-foreground">{email}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-left">
          <div className="p-2 bg-primary/10 rounded-lg">
            <BookOpen className="h-4 w-4 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium">Access ID sent</p>
            <p className="text-sm text-muted-foreground">
              Check your email for your Access ID to start reading
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-left">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Clock className="h-4 w-4 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium">
              Your Access ID will arrive in 2-5 minutes
            </p>
          </div>
        </div>
      </div>

      <div>
        <Button onClick={onClose} className="w-full">
          Continue Shopping
        </Button>
      </div>
    </div>
  );
}
