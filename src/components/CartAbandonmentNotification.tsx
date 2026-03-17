import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ShoppingCart, X, MessageCircle, Send } from "lucide-react";
import { toast } from "sonner";

const SESSION_KEY = "cart_notification_dismissed";

export const CartAbandonmentNotification = () => {
  const { items, itemCount } = useCart();
  const [showNotification, setShowNotification] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [hasShownOnce, setHasShownOnce] = useState(false);

  // Check if already dismissed this session
  const isDismissedThisSession = useCallback(() => {
    return sessionStorage.getItem(SESSION_KEY) === "true";
  }, []);

  useEffect(() => {
    // Don't show if already dismissed or already shown once
    if (isDismissedThisSession() || hasShownOnce) return;

    let timer: ReturnType<typeof setTimeout>;

    if (itemCount > 0) {
      // Show after 2 minutes of having items (longer delay, less intrusive)
      timer = setTimeout(() => {
        if (!isDismissedThisSession() && !hasShownOnce) {
          setShowNotification(true);
          setHasShownOnce(true);
        }
      }, 120000); // 2 minutes
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [itemCount, isDismissedThisSession, hasShownOnce]);

  const handleSubmitFeedback = () => {
    if (feedback.trim()) {
      toast.success("Thank you for your feedback!");
    }
    handleDismiss();
    setFeedback("");
  };

  const handleDismiss = () => {
    setShowNotification(false);
    sessionStorage.setItem(SESSION_KEY, "true");
  };

  // Don't show if no items or already dismissed
  if (!showNotification || itemCount === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 50, scale: 0.95 }}
        className="fixed bottom-20 right-4 z-40 max-w-sm"
      >
        <Card className="p-4 shadow-xl border-primary/20 bg-card/95 backdrop-blur-sm">
          <button
            onClick={handleDismiss}
            className="absolute top-2 right-2 p-1 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          {!showFeedback ? (
            <div className="pr-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <ShoppingCart className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Your cart is ready!</p>
                  <p className="text-xs text-muted-foreground">
                    {itemCount === 1
                      ? `1 item - $${items[0]?.price?.toFixed(2) || "0.00"}`
                      : `${itemCount} items waiting for you`}
                  </p>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-3">
                Need any help completing your order?
              </p>

              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setShowFeedback(true)}
                  className="flex-1 text-xs"
                >
                  <MessageCircle className="w-3 h-3 mr-1" />
                  Share Feedback
                </Button>
                <Button
                  size="sm"
                  onClick={handleDismiss}
                  className="flex-1 text-xs"
                >
                  Continue Shopping
                </Button>
              </div>
            </div>
          ) : (
            <div className="pr-6">
              <p className="font-semibold text-sm mb-2">How can we improve?</p>
              <Textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Tell us what would make your experience better..."
                className="mb-3 text-sm min-h-[80px]"
              />
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setShowFeedback(false)}
                  className="flex-1 text-xs"
                >
                  Back
                </Button>
                <Button
                  size="sm"
                  onClick={handleSubmitFeedback}
                  className="flex-1 text-xs"
                >
                  <Send className="w-3 h-3 mr-1" />
                  Submit
                </Button>
              </div>
            </div>
          )}
        </Card>
      </motion.div>
    </AnimatePresence>
  );
};
