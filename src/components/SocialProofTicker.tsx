import { useEffect, useState } from "react";
import {
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
  { type: "signup", location: "Columbus, OH", message: "Family in Columbus enrolled in GUARD plan", time: "Moments ago" },
  { type: "review", location: "Cleveland, OH", message: 'Sample review: "Clear, patient guidance"', time: "5 min ago" },
  { type: "protection", location: "Cincinnati, OH", message: "Sample: Suspicious call flagged for review", time: "8 min ago" },
  { type: "signup", location: "Toledo, OH", message: "Veteran family joined with 10% discount", time: "12 min ago" },
  { type: "milestone", location: "Ohio", message: "100+ families now protected statewide", time: "Just now" },
  { type: "review", location: "Akron, OH", message: 'Sample review: "We feel safer and prepared"', time: "15 min ago" },
  { type: "protection", location: "Dayton, OH", message: "Sample: Scam attempt neutralized", time: "18 min ago" },
  { type: "signup", location: "Canton, OH", message: "Business upgraded to SENTINEL tier", time: "22 min ago" },
  { type: "review", location: "Youngstown, OH", message: 'Sample review: "Helpful and respectful"', time: "25 min ago" },
  { type: "protection", location: "Springfield, OH", message: "Sample: Gift card scam blocked", time: "30 min ago" },
];

const typeConfig = {
  signup: { icon: Users, iconClass: "text-primary" },
  review: { icon: Star, iconClass: "text-amber-500" },
  protection: { icon: Shield, iconClass: "text-emerald-600" },
  milestone: { icon: CheckCircle2, iconClass: "text-accent" },
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

  if (!isVisible) return null;

  const currentItem = proofData[currentIndex];
  const config = typeConfig[currentItem.type];
  const TypeIcon = config.icon;

  return (
    <div
      className="fixed bottom-4 left-4 z-50 sm:bottom-5 sm:left-5 animate-fade-in"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        key={currentIndex}
        className="flex items-center gap-2.5 rounded-full border border-white/40 bg-white/60 px-3 py-2 shadow-[var(--skeuo-shadow-ombre)] backdrop-blur-xl max-w-[280px] animate-fade-in"
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
      </div>
    </div>
  );
};

export default SocialProofTicker;
