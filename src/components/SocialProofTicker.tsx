import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  MapPin,
  Clock,
  Shield,
  Star,
  Users,
  CheckCircle2,
  X,
} from "lucide-react";

interface ProofItem {
  id: number;
  type: "signup" | "review" | "protection" | "milestone";
  location: string;
  message: string;
  time: string;
}

const proofData: Omit<ProofItem, "id">[] = [
  {
    type: "signup",
    location: "Columbus, OH",
    message: "Family in Columbus enrolled in GUARD plan",
    time: "Moments ago",
  },
  {
    type: "review",
    location: "Cleveland, OH",
    message: 'Sample review: "Clear, patient guidance"',
    time: "5 min ago",
  },
  {
    type: "protection",
    location: "Cincinnati, OH",
    message: "Sample: Suspicious call flagged for review",
    time: "8 min ago",
  },
  {
    type: "signup",
    location: "Toledo, OH",
    message: "Veteran family joined with 10% discount",
    time: "12 min ago",
  },
  {
    type: "milestone",
    location: "Ohio",
    message: "100+ families now protected statewide",
    time: "Just now",
  },
  {
    type: "review",
    location: "Akron, OH",
    message: 'Sample review: "We feel safer and prepared"',
    time: "15 min ago",
  },
  {
    type: "protection",
    location: "Dayton, OH",
    message: "Sample: Scam attempt neutralized",
    time: "18 min ago",
  },
  {
    type: "signup",
    location: "Canton, OH",
    message: "Business upgraded to SENTINEL tier",
    time: "22 min ago",
  },
  {
    type: "review",
    location: "Youngstown, OH",
    message: 'Sample review: "Helpful and respectful"',
    time: "25 min ago",
  },
  {
    type: "protection",
    location: "Springfield, OH",
    message: "Sample: Gift card scam blocked",
    time: "30 min ago",
  },
];

const typeConfig = {
  signup: {
    icon: Users,
    label: "New Signup",
    iconClass: "text-primary",
    chipClass: "bg-primary/12 text-primary border-primary/25",
    progressClass: "from-primary to-accent",
  },
  review: {
    icon: Star,
    label: "Review",
    iconClass: "text-amber-500",
    chipClass: "bg-amber-500/12 text-amber-700 border-amber-500/30",
    progressClass: "from-amber-500 to-orange-500",
  },
  protection: {
    icon: Shield,
    label: "Protection Event",
    iconClass: "text-emerald-600",
    chipClass: "bg-emerald-500/12 text-emerald-700 border-emerald-500/30",
    progressClass: "from-emerald-500 to-teal-500",
  },
  milestone: {
    icon: CheckCircle2,
    label: "Milestone",
    iconClass: "text-accent",
    chipClass: "bg-accent/12 text-accent border-accent/30",
    progressClass: "from-accent to-primary",
  },
};

export const SocialProofTicker = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const showTimer = setTimeout(() => setIsVisible(true), 2600);
    return () => clearTimeout(showTimer);
  }, []);

  useEffect(() => {
    if (!isVisible || isPaused) return;

    const rotateInterval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % proofData.length);
    }, 5500);

    return () => clearInterval(rotateInterval);
  }, [isPaused, isVisible]);

  const currentItem = proofData[currentIndex];
  const config = typeConfig[currentItem.type];
  const TypeIcon = config.icon;

  return (
    <AnimatePresence>
      {isVisible ? (
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.95 }}
          transition={{ duration: 0.25 }}
          className="fixed bottom-4 left-4 z-50 sm:bottom-5 sm:left-5"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-2.5 rounded-full border border-border/60 bg-card/95 px-3 py-2 shadow-md backdrop-blur-lg max-w-[280px]"
          >
            <div className={`flex-shrink-0 ${config.iconClass}`}>
              <TypeIcon className="h-3.5 w-3.5" />
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-medium text-foreground leading-tight">
                {currentItem.message}
              </p>
              <p className="text-[10px] text-muted-foreground leading-tight mt-0.5">
                {currentItem.location} · {currentItem.time}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsVisible(false)}
              className="flex-shrink-0 rounded-full p-0.5 text-muted-foreground/60 hover:text-foreground transition-colors"
              aria-label="Close activity widget"
            >
              <X className="h-3 w-3" />
            </button>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default SocialProofTicker;
