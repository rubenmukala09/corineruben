import { ReactNode } from "react";
import {
  Shield,
  Star,
  Zap,
  Award,
  CheckCircle,
  TrendingUp,
  Heart,
  Clock,
  Lock,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface PricingBadgeProps {
  type:
    | "popular"
    | "recommended"
    | "best-value"
    | "limited"
    | "trusted"
    | "secure"
    | "fast"
    | "guaranteed"
    | "premium"
    | "new"
    | "hot"
    | "save"
    | "veteran";
  className?: string;
  size?: "sm" | "md" | "lg";
}

const badgeConfig = {
  popular: {
    icon: Star,
    label: "MOST POPULAR",
    gradient: "from-primary via-accent to-primary",
    emoji: "⭐",
  },
  recommended: {
    icon: Award,
    label: "RECOMMENDED",
    gradient: "from-amber-500 to-orange-500",
    emoji: "🏆",
  },
  "best-value": {
    icon: TrendingUp,
    label: "BEST VALUE",
    gradient: "from-emerald-500 to-teal-500",
    emoji: "💎",
  },
  limited: {
    icon: Clock,
    label: "LIMITED TIME",
    gradient: "from-red-500 to-pink-500",
    emoji: "🔥",
  },
  trusted: {
    icon: Shield,
    label: "TRUSTED",
    gradient: "from-blue-500 to-indigo-500",
    emoji: "✅",
  },
  secure: {
    icon: Lock,
    label: "100% SECURE",
    gradient: "from-green-500 to-emerald-500",
    emoji: "🔒",
  },
  fast: {
    icon: Zap,
    label: "FAST SETUP",
    gradient: "from-yellow-500 to-amber-500",
    emoji: "⚡",
  },
  guaranteed: {
    icon: CheckCircle,
    label: "GUARANTEED",
    gradient: "from-primary to-purple-600",
    emoji: "✓",
  },
  premium: {
    icon: Star,
    label: "PREMIUM",
    gradient: "from-violet-600 to-purple-700",
    emoji: "👑",
  },
  new: {
    icon: Zap,
    label: "NEW",
    gradient: "from-cyan-500 to-blue-500",
    emoji: "🆕",
  },
  hot: {
    icon: TrendingUp,
    label: "HOT",
    gradient: "from-orange-500 to-red-500",
    emoji: "🔥",
  },
  save: {
    icon: TrendingUp,
    label: "SAVE 10%",
    gradient: "from-green-500 to-teal-500",
    emoji: "💰",
  },
  veteran: {
    icon: Heart,
    label: "VETERAN DISCOUNT",
    gradient: "from-blue-600 via-red-500 to-blue-600",
    emoji: "🇺🇸",
  },
};

export function PricingBadge({
  type,
  className = "",
  size = "md",
}: PricingBadgeProps) {
  const config = badgeConfig[type];
  const Icon = config.icon;

  const sizeClasses = {
    sm: "px-2 py-0.5 text-[10px]",
    md: "px-4 py-1.5 text-xs",
    lg: "px-6 py-2 text-sm",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5",
        "bg-background/70 backdrop-blur-xl border border-border/30",
        "font-bold tracking-wider rounded-full",
        "shadow-[0_1px_3px_hsl(var(--coral-300)/0.1),0_2px_6px_hsl(var(--lavender-300)/0.08)]",
        sizeClasses[size],
        className,
      )}
    >
      <span className="text-sm">{config.emoji}</span>
      <span
        className={`bg-gradient-to-r ${config.gradient} bg-clip-text text-transparent`}
      >
        {config.label}
      </span>
    </div>
  );
}

export function TrustBadgeInline({
  icon: Icon,
  label,
}: {
  icon: any;
  label: string;
}) {
  return (
    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-success/10 text-success border border-success/20 rounded-full text-xs font-medium backdrop-blur-sm">
      <Icon className="w-3.5 h-3.5" />
      <span>{label}</span>
    </div>
  );
}

export function GuaranteeBadge() {
  return (
    <div className="flex items-center justify-center gap-2 p-3 bg-background/70 backdrop-blur-xl border border-border/30 rounded-xl shadow-[0_2px_8px_hsl(var(--coral-300)/0.08),0_4px_12px_hsl(var(--lavender-300)/0.06)]">
      <Shield className="w-5 h-5 text-success" />
      <span className="text-sm font-semibold text-success">
        30-Day Money-Back Guarantee
      </span>
      <CheckCircle className="w-4 h-4 text-success" />
    </div>
  );
}

export function SecurityBadges() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-background/70 backdrop-blur-xl border border-border/30 rounded-full text-xs shadow-sm">
        <Lock className="w-3.5 h-3.5 text-primary" />
        <span className="text-primary font-medium">TLS Encryption</span>
      </div>
      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-background/70 backdrop-blur-xl border border-border/30 rounded-full text-xs shadow-sm">
        <Shield className="w-3.5 h-3.5 text-success" />
        <span className="text-success font-medium">Privacy-First</span>
      </div>
      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-background/70 backdrop-blur-xl border border-border/30 rounded-full text-xs shadow-sm">
        <Users className="w-3.5 h-3.5 text-accent" />
        <span className="text-accent font-medium">100+ Protected</span>
      </div>
    </div>
  );
}
