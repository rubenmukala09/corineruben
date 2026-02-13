import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useCounterAnimation } from "@/hooks/useCounterAnimation";
import { KeyboardEvent } from "react";

interface DashboardStatCardProps {
  icon: LucideIcon;
  iconBgColor: string;
  title: string;
  value: number;
  subtitle: string;
  subtitleColor?: "success" | "warning" | "destructive";
  gradientFrom: string;
  gradientTo: string;
  index: number;
  link?: string;
  isPulsing?: boolean;
  prefix?: string;
  showSparkline?: boolean;
}

export function DashboardStatCard({
  icon: Icon,
  iconBgColor,
  title,
  value,
  subtitle,
  subtitleColor = "success",
  gradientFrom,
  gradientTo,
  index,
  link,
  isPulsing = false,
  prefix = "",
  showSparkline = false,
}: DashboardStatCardProps) {
  const navigate = useNavigate();
  const { count: animatedValue } = useCounterAnimation({
    end: value,
    duration: 1500,
  });

  const handleClick = () => {
    if (link) {
      navigate(link);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!link) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleClick();
    }
  };

  const subtitleColorClass = {
    success: "text-success",
    warning: "text-yellow-600",
    destructive: "text-destructive",
  }[subtitleColor];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeOut",
      }}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role={link ? "button" : undefined}
      tabIndex={link ? 0 : undefined}
      aria-label={link ? `${title} details` : undefined}
      className={link ? "cursor-pointer" : ""}
    >
      <Card
        className={`relative overflow-hidden p-6 rounded-xl transition-shadow duration-300 hover:shadow-[0_10px_30px_rgba(0,0,0,0.12)] ${
          isPulsing ? "animate-pulse" : ""
        }`}
        style={{
          background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
        }}
      >
        {/* Icon */}
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${iconBgColor}`}
        >
          <Icon className="w-6 h-6 text-white" />
        </div>

        {/* Value */}
        <div className="text-4xl font-bold text-foreground mb-2">
          {prefix}
          {animatedValue.toLocaleString()}
        </div>

        {/* Title */}
        <div className="text-base text-muted-foreground mb-2">{title}</div>

        {/* Subtitle */}
        <div
          className={`text-sm font-medium flex items-center gap-1 ${subtitleColorClass}`}
        >
          {subtitle}
        </div>

        {/* Optional Sparkline */}
        {showSparkline && (
          <div className="mt-4 h-8 flex items-end gap-1">
            {[40, 60, 45, 70, 55, 80, 65, 90, 75, 85].map((height, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${height}%` }}
                transition={{ delay: index * 0.1 + i * 0.05, duration: 0.3 }}
                className="flex-1 bg-success/30 rounded-t"
              />
            ))}
          </div>
        )}

        {/* Clickable indicator */}
        {link && (
          <div className="absolute bottom-2 right-2 text-xs text-muted-foreground">
            →
          </div>
        )}
      </Card>
    </motion.div>
  );
}
