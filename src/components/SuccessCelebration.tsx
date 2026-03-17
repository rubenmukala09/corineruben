import { useEffect, useState } from "react";
import { CheckCircle, PartyPopper } from "lucide-react";
import { useConfetti } from "@/hooks/useConfetti";

interface SuccessCelebrationProps {
  show: boolean;
  title?: string;
  message?: string;
  onComplete?: () => void;
  variant?: "default" | "celebration" | "success";
}

export const SuccessCelebration = ({
  show,
  title = "Success!",
  message = "Your submission was successful.",
  onComplete,
  variant = "default",
}: SuccessCelebrationProps) => {
  const { fireCelebration, fireSuccess, fireSideCanons } = useConfetti();

  useEffect(() => {
    if (show) {
      switch (variant) {
        case "celebration":
          fireCelebration();
          break;
        case "success":
          fireSuccess();
          break;
        default:
          fireSideCanons();
      }

      if (onComplete) {
        const timer = setTimeout(onComplete, 3000);
        return () => clearTimeout(timer);
      }
    }
  }, [show, variant, fireCelebration, fireSuccess, fireSideCanons, onComplete]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-card border border-border rounded-2xl p-8 shadow-2xl max-w-md mx-4 text-center animate-scale-in">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center animate-scale-in" style={{ animationDelay: "200ms" }}>
          {variant === "celebration" ? (
            <PartyPopper className="w-10 h-10 text-white" />
          ) : (
            <CheckCircle className="w-10 h-10 text-white" />
          )}
        </div>

        <h2 className="text-2xl font-bold text-foreground mb-2 animate-fade-in" style={{ animationDelay: "300ms" }}>
          {title}
        </h2>

        <p className="text-muted-foreground animate-fade-in" style={{ animationDelay: "400ms" }}>
          {message}
        </p>
      </div>
    </div>
  );
};

export default SuccessCelebration;
