import { motion } from "framer-motion";
import { useCounterAnimation } from "@/hooks/useCounterAnimation";
import { LucideIcon } from "lucide-react";

interface PremiumStatsWidgetProps {
  icon: LucideIcon;
  value: number;
  label: string;
  suffix?: string;
  prefix?: string;
  gradient?: string;
  delay?: number;
}

export const PremiumStatsWidget = ({
  icon: Icon,
  value,
  label,
  suffix = "",
  prefix = "",
  gradient = "from-primary to-accent",
  delay = 0,
}: PremiumStatsWidgetProps) => {
  const { count, ref } = useCounterAnimation({ end: value, duration: 2000 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.6,
        delay,
        type: "spring",
        stiffness: 100,
      }}
      className="relative group"
    >
      {/* Premium card with micro-interactions */}
      <div className="widget-premium premium-3d-card micro-tilt-3d subtle-3d-surface rounded-3xl p-6 md:p-8 relative overflow-hidden">
        {/* Dynamic gradient overlay */}
        <div className="dynamic-gradient-overlay absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center space-y-4">
          {/* Icon with 3D effect and fluid motion */}
          <motion.div
            className={`premium-3d-icon fluid-motion w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br ${gradient} p-4 shadow-xl`}
            whileHover={{ scale: 1.1, rotateZ: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Icon className="w-full h-full text-white drop-shadow-lg" />
          </motion.div>

          {/* Animated counter with premium HD text */}
          <div className="space-y-1">
            <motion.p
              className="premium-hd-text text-4xl md:text-5xl font-black premium-gradient-text"
              initial={{ scale: 0.5 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: delay + 0.3, type: "spring", stiffness: 200 }}
            >
              {prefix}
              {Math.round(count).toLocaleString()}
              {suffix}
            </motion.p>
            <p className="text-sm md:text-base text-muted-foreground font-medium premium-hd-text">
              {label}
            </p>
          </div>
        </div>

        {/* Floating particles effect */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-white/30"
              style={{
                left: `${20 + i * 30}%`,
                bottom: "10%",
              }}
              animate={{
                y: [-20, -60, -20],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default PremiumStatsWidget;
