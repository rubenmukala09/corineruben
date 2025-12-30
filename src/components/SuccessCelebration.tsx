import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-sm"
        >
          <motion.div
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            className="bg-card border border-border rounded-2xl p-8 shadow-2xl max-w-md mx-4 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center"
            >
              {variant === "celebration" ? (
                <PartyPopper className="w-10 h-10 text-white" />
              ) : (
                <CheckCircle className="w-10 h-10 text-white" />
              )}
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-2xl font-bold text-foreground mb-2"
            >
              {title}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-muted-foreground"
            >
              {message}
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SuccessCelebration;
