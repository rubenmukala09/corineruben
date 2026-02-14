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
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.35 }}
          className="fixed bottom-4 left-4 right-4 z-50 sm:bottom-6 sm:left-6 sm:right-auto sm:w-[360px]"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
        >
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 12 }}
            transition={{ duration: 0.28 }}
            className="overflow-hidden rounded-2xl border border-border/70 bg-card/92 shadow-[0_24px_48px_-30px_hsl(var(--navy-900)/0.55)] backdrop-blur-xl"
          >
            <div className="flex items-start justify-between border-b border-border/70 px-4 pb-3 pt-3">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <p className="text-xs font-semibold uppercase tracking-[0.13em] text-muted-foreground">
                  Live Activity Widget
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsVisible(false)}
                className="rounded-full p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                aria-label="Close activity widget"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="space-y-3 px-4 pb-4 pt-3">
              <div className="flex items-start gap-3">
                <div
                  className={`rounded-xl border border-border/70 bg-muted/40 p-2 ${config.iconClass}`}
                >
                  <TypeIcon className="h-5 w-5" />
                </div>

                <div className="min-w-0 flex-1">
                  <span
                    className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] ${config.chipClass}`}
                  >
                    {config.label}
                  </span>
                  <p className="mt-2 text-sm font-semibold leading-snug text-foreground">
                    {currentItem.message}
                  </p>
                  <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" />
                      {currentItem.location}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {currentItem.time}
                    </span>
                  </div>
                </div>
              </div>

              <div className="h-1.5 overflow-hidden rounded-full bg-muted/70">
                <motion.div
                  key={`progress-${currentIndex}`}
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 5.5, ease: "linear" }}
                  className={`h-full rounded-full bg-gradient-to-r ${config.progressClass}`}
                />
              </div>

              <div className="flex items-center justify-center gap-1.5 pt-0.5">
                {proofData.slice(0, 6).map((_, i) => (
                  <span
                    key={i}
                    className={`h-1.5 rounded-full transition-all ${
                      i === currentIndex % 6
                        ? "w-4 bg-primary"
                        : "w-1.5 bg-muted-foreground/40"
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default SocialProofTicker;
