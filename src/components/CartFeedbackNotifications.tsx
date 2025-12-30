import { useState, useEffect, createContext, useContext, ReactNode } from "react";
import { useCart } from "@/contexts/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { 
  ShoppingCart, X, MessageCircle, Send, CheckCircle, 
  Heart, HelpCircle, ArrowRight, Package
} from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";

interface CartFeedbackContextType {
  showThankYou: boolean;
  triggerThankYou: () => void;
  showEmptyCartHelp: boolean;
  triggerEmptyCartHelp: () => void;
  dismissAll: () => void;
}

const CartFeedbackContext = createContext<CartFeedbackContextType | null>(null);

export const useCartFeedback = () => {
  const context = useContext(CartFeedbackContext);
  if (!context) {
    throw new Error("useCartFeedback must be used within CartFeedbackProvider");
  }
  return context;
};

export const CartFeedbackProvider = ({ children }: { children: ReactNode }) => {
  const [showThankYou, setShowThankYou] = useState(false);
  const [showEmptyCartHelp, setShowEmptyCartHelp] = useState(false);

  const triggerThankYou = () => {
    setShowEmptyCartHelp(false);
    setShowThankYou(true);
    // Auto-dismiss after 8 seconds
    setTimeout(() => setShowThankYou(false), 8000);
  };

  const triggerEmptyCartHelp = () => {
    setShowThankYou(false);
    setShowEmptyCartHelp(true);
  };

  const dismissAll = () => {
    setShowThankYou(false);
    setShowEmptyCartHelp(false);
  };

  return (
    <CartFeedbackContext.Provider value={{
      showThankYou,
      triggerThankYou,
      showEmptyCartHelp,
      triggerEmptyCartHelp,
      dismissAll
    }}>
      {children}
    </CartFeedbackContext.Provider>
  );
};

// Thank You Notification Component
export const PurchaseThankYouNotification = () => {
  const { showThankYou, dismissAll } = useCartFeedback();

  if (!showThankYou) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 50, scale: 0.95 }}
        className="fixed bottom-20 right-4 z-50 max-w-sm"
      >
        <Card className="p-5 shadow-xl border-success/30 bg-card/95 backdrop-blur-sm overflow-hidden">
          {/* Decorative gradient top */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-success via-primary to-accent" />
          
          <button
            onClick={dismissAll}
            className="absolute top-3 right-3 p-1 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-start gap-4">
            <motion.div 
              className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
            >
              <CheckCircle className="w-6 h-6 text-success" />
            </motion.div>
            
            <div className="flex-1">
              <motion.h3 
                className="font-bold text-lg mb-1"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                Thank You! 🎉
              </motion.h3>
              <motion.p 
                className="text-sm text-muted-foreground mb-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Your order is being processed. Check your email for confirmation and details.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex items-center gap-2 text-xs text-muted-foreground"
              >
                <Heart className="w-3 h-3 text-destructive" />
                <span>We appreciate your trust in InVision Network</span>
              </motion.div>
            </div>
          </div>

          <motion.div 
            className="mt-4 pt-3 border-t border-border/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Button asChild size="sm" className="w-full text-xs" variant="outline">
              <Link to="/resources">
                <Package className="w-3 h-3 mr-1.5" />
                Continue Shopping
                <ArrowRight className="w-3 h-3 ml-1.5" />
              </Link>
            </Button>
          </motion.div>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
};

// Empty Cart Help Notification Component
export const CartEmptyHelpNotification = () => {
  const { showEmptyCartHelp, dismissAll } = useCartFeedback();
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState("");

  if (!showEmptyCartHelp) return null;

  const handleSubmitFeedback = () => {
    if (feedback.trim()) {
      toast.success("Thank you for your feedback! We'll use it to improve.");
      console.log("Cart empty feedback:", feedback);
    }
    setShowFeedback(false);
    dismissAll();
    setFeedback("");
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 50, scale: 0.95 }}
        className="fixed bottom-20 right-4 z-50 max-w-sm"
      >
        <Card className="p-5 shadow-xl border-primary/20 bg-card/95 backdrop-blur-sm">
          <button
            onClick={dismissAll}
            className="absolute top-3 right-3 p-1 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          {!showFeedback ? (
            <div className="pr-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <HelpCircle className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Need Help?</p>
                  <p className="text-xs text-muted-foreground">
                    Your cart is now empty
                  </p>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-4">
                Is everything okay? Let us know if you need any assistance or have questions about our products.
              </p>

              <div className="space-y-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setShowFeedback(true)}
                  className="w-full text-xs justify-start"
                >
                  <MessageCircle className="w-3 h-3 mr-2" />
                  Share Feedback
                </Button>
                <Button
                  size="sm"
                  asChild
                  className="w-full text-xs justify-start"
                >
                  <Link to="/contact">
                    <HelpCircle className="w-3 h-3 mr-2" />
                    Contact Support
                  </Link>
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={dismissAll}
                  className="w-full text-xs text-muted-foreground"
                >
                  I'm Just Browsing
                </Button>
              </div>
            </div>
          ) : (
            <div className="pr-6">
              <p className="font-semibold text-sm mb-2">
                How can we improve?
              </p>
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

// Combined Feedback Notifications Component
export const CartFeedbackNotifications = () => {
  return (
    <>
      <PurchaseThankYouNotification />
      <CartEmptyHelpNotification />
    </>
  );
};
