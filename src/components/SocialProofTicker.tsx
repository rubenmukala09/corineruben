import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Clock, Shield, Star, Users, CheckCircle2 } from "lucide-react";

interface ProofItem {
  id: number;
  type: "signup" | "review" | "protection" | "milestone";
  location: string;
  message: string;
  time: string;
}

const proofData: Omit<ProofItem, "id">[] = [
  { type: "signup", location: "Columbus, OH", message: "Sarah M. just enrolled in GUARD plan", time: "2 min ago" },
  { type: "review", location: "Cleveland, OH", message: '"Best investment for my parents\' safety"', time: "5 min ago" },
  { type: "protection", location: "Cincinnati, OH", message: "Blocked suspicious call for Thompson family", time: "8 min ago" },
  { type: "signup", location: "Toledo, OH", message: "Veteran family joined with 20% discount", time: "12 min ago" },
  { type: "milestone", location: "Ohio", message: "500+ families now protected statewide!", time: "Just now" },
  { type: "review", location: "Akron, OH", message: '"My mom feels so much safer now"', time: "15 min ago" },
  { type: "protection", location: "Dayton, OH", message: "AI scam attempt neutralized automatically", time: "18 min ago" },
  { type: "signup", location: "Canton, OH", message: "Business upgraded to SENTINEL tier", time: "22 min ago" },
  { type: "review", location: "Youngstown, OH", message: '"Worth every penny - 5 stars!"', time: "25 min ago" },
  { type: "protection", location: "Springfield, OH", message: "Protected grandma from gift card scam", time: "30 min ago" },
];

const typeConfig = {
  signup: { icon: Users, color: "text-primary", bg: "from-primary/20 to-primary/5" },
  review: { icon: Star, color: "text-amber-500", bg: "from-amber-500/20 to-amber-500/5" },
  protection: { icon: Shield, color: "text-green-500", bg: "from-green-500/20 to-green-500/5" },
  milestone: { icon: CheckCircle2, color: "text-accent", bg: "from-accent/20 to-accent/5" },
};

export const SocialProofTicker = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show after delay
    const showTimer = setTimeout(() => setIsVisible(true), 3000);

    // Rotate items
    const rotateInterval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % proofData.length);
    }, 5000);

    return () => {
      clearTimeout(showTimer);
      clearInterval(rotateInterval);
    };
  }, []);

  const currentItem = proofData[currentIndex];
  const TypeIcon = typeConfig[currentItem.type].icon;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, x: -20 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="fixed bottom-6 left-6 z-50 max-w-xs"
        >
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.9, x: -20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, x: 20 }}
            transition={{ duration: 0.4 }}
            className="relative overflow-hidden"
          >
            {/* Main Card */}
            <div className={`glass-heavy rounded-2xl p-4 shadow-3d border border-white/20 bg-gradient-to-br ${typeConfig[currentItem.type].bg}`}>
              {/* Close button */}
              <button
                onClick={() => setIsVisible(false)}
                className="absolute top-2 right-2 p-1 rounded-full hover:bg-white/20 transition-colors opacity-50 hover:opacity-100"
              >
                <span className="sr-only">Close</span>
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="flex items-start gap-3">
                {/* Icon */}
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className={`flex-shrink-0 p-2 rounded-xl bg-white/50 ${typeConfig[currentItem.type].color}`}
                >
                  <TypeIcon className="w-5 h-5" />
                </motion.div>

                {/* Content */}
                <div className="flex-1 min-w-0 pr-4">
                  <p className="text-sm font-medium text-foreground leading-snug">
                    {currentItem.message}
                  </p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="w-3 h-3" />
                      {currentItem.location}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {currentItem.time}
                    </span>
                  </div>
                </div>
              </div>

              {/* Progress bar */}
              <div className="mt-3 h-1 bg-white/20 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 5, ease: "linear" }}
                  className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                />
              </div>
            </div>

            {/* Notification dots */}
            <div className="flex justify-center gap-1 mt-2">
              {proofData.slice(0, 5).map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    scale: i === currentIndex % 5 ? 1.2 : 1,
                    opacity: i === currentIndex % 5 ? 1 : 0.4,
                  }}
                  className={`w-1.5 h-1.5 rounded-full ${
                    i === currentIndex % 5 ? "bg-primary" : "bg-muted-foreground"
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SocialProofTicker;
