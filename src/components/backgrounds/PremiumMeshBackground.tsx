import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface PremiumMeshBackgroundProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "dark" | "warm" | "cool" | "training";
  intensity?: "subtle" | "medium" | "strong";
  showGrid?: boolean;
  showOrbs?: boolean;
  showParticles?: boolean;
}

export const PremiumMeshBackground = ({
  children,
  className = "",
  variant = "default",
  intensity = "medium",
  showGrid = true,
  showOrbs = true,
  showParticles = true,
}: PremiumMeshBackgroundProps) => {
  const intensityMap = {
    subtle: { orbOpacity: 0.12, gridOpacity: 0.03, particleOpacity: 0.2 },
    medium: { orbOpacity: 0.2, gridOpacity: 0.05, particleOpacity: 0.35 },
    strong: { orbOpacity: 0.3, gridOpacity: 0.07, particleOpacity: 0.5 },
  };

  const config = intensityMap[intensity];

  const variantConfig = {
    default: {
      bg: "linear-gradient(135deg, hsl(30 25% 97%) 0%, hsl(30 20% 96%) 30%, hsl(340 15% 97%) 60%, hsl(30 25% 97%) 100%)",
      orb1: "hsl(18 92% 69%)",
      orb2: "hsl(308 28% 61%)",
      orb3: "hsl(220 58% 22%)",
      orb4: "hsl(168 60% 40%)",
    },
    dark: {
      bg: "linear-gradient(135deg, hsl(225 50% 6%) 0%, hsl(225 45% 8%) 50%, hsl(225 50% 6%) 100%)",
      orb1: "hsl(18 85% 65%)",
      orb2: "hsl(308 35% 50%)",
      orb3: "hsl(220 58% 40%)",
      orb4: "hsl(168 55% 45%)",
    },
    warm: {
      bg: "linear-gradient(135deg, hsl(30 30% 97%) 0%, hsl(25 25% 96%) 40%, hsl(15 20% 97%) 70%, hsl(30 25% 97%) 100%)",
      orb1: "hsl(18 92% 69%)",
      orb2: "hsl(35 90% 55%)",
      orb3: "hsl(348 55% 75%)",
      orb4: "hsl(15 85% 62%)",
    },
    cool: {
      bg: "linear-gradient(135deg, hsl(220 20% 97%) 0%, hsl(230 18% 96%) 40%, hsl(210 15% 97%) 70%, hsl(220 20% 97%) 100%)",
      orb1: "hsl(220 58% 35%)",
      orb2: "hsl(188 60% 42%)",
      orb3: "hsl(308 28% 61%)",
      orb4: "hsl(168 60% 40%)",
    },
    training: {
      bg: "linear-gradient(135deg, hsl(30 25% 97%) 0%, hsl(220 15% 96%) 25%, hsl(340 10% 97%) 50%, hsl(168 10% 97%) 75%, hsl(30 25% 97%) 100%)",
      orb1: "hsl(18 92% 69%)",
      orb2: "hsl(308 28% 61%)",
      orb3: "hsl(220 58% 30%)",
      orb4: "hsl(152 58% 42%)",
    },
  };

  const colors = variantConfig[variant];

  const withAlpha = (color: string, alpha: number) => {
    if (color.includes("/")) {
      return color.replace(/\/\s*[\d.]+\)/, `/ ${alpha})`);
    }
    return color.replace(")", ` / ${alpha})`);
  };

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      style={{ background: colors.bg }}
    >
      {/* Premium mesh gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 15% 20%, ${withAlpha(colors.orb1, config.orbOpacity * 0.6)} 0%, transparent 50%),
            radial-gradient(ellipse 60% 60% at 85% 25%, ${withAlpha(colors.orb2, config.orbOpacity * 0.5)} 0%, transparent 50%),
            radial-gradient(ellipse 70% 40% at 50% 85%, ${withAlpha(colors.orb3, config.orbOpacity * 0.4)} 0%, transparent 50%),
            radial-gradient(ellipse 50% 50% at 30% 60%, ${withAlpha(colors.orb4, config.orbOpacity * 0.3)} 0%, transparent 50%)
          `,
        }}
      />

      {/* Animated floating orbs */}
      {showOrbs && (
        <>
          <motion.div
            className="absolute pointer-events-none"
            style={{
              width: 500,
              height: 500,
              top: "-10%",
              left: "-5%",
              background: `radial-gradient(circle, ${colors.orb1} 0%, transparent 70%)`,
              opacity: config.orbOpacity * 0.5,
              filter: "blur(80px)",
            }}
            animate={{
              x: [0, 60, 20, 60, 0],
              y: [0, 30, 60, 20, 0],
              scale: [1, 1.1, 0.95, 1.05, 1],
            }}
            transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute pointer-events-none"
            style={{
              width: 450,
              height: 450,
              top: "20%",
              right: "-8%",
              background: `radial-gradient(circle, ${colors.orb2} 0%, transparent 70%)`,
              opacity: config.orbOpacity * 0.4,
              filter: "blur(90px)",
            }}
            animate={{
              x: [0, -50, -20, -40, 0],
              y: [0, 40, -20, 50, 0],
              scale: [1, 1.15, 1, 1.08, 1],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 3,
            }}
          />
          <motion.div
            className="absolute pointer-events-none"
            style={{
              width: 400,
              height: 400,
              bottom: "5%",
              left: "20%",
              background: `radial-gradient(circle, ${colors.orb3} 0%, transparent 70%)`,
              opacity: config.orbOpacity * 0.35,
              filter: "blur(100px)",
            }}
            animate={{
              x: [0, 40, -30, 20, 0],
              y: [0, -30, 20, -40, 0],
              scale: [1, 1.08, 1.15, 1, 1],
            }}
            transition={{
              duration: 28,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 6,
            }}
          />
          <motion.div
            className="absolute pointer-events-none"
            style={{
              width: 350,
              height: 350,
              bottom: "15%",
              right: "15%",
              background: `radial-gradient(circle, ${colors.orb4} 0%, transparent 70%)`,
              opacity: config.orbOpacity * 0.3,
              filter: "blur(80px)",
            }}
            animate={{
              x: [0, -30, 20, -20, 0],
              y: [0, 20, -30, 10, 0],
              scale: [1, 1.12, 0.98, 1.06, 1],
            }}
            transition={{
              duration: 22,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 9,
            }}
          />
        </>
      )}

      {/* Dot grid pattern */}
      {showGrid && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at center, hsl(220 20% 30% / ${config.gridOpacity}) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
      )}

      {/* Floating particles */}
      {showParticles && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: 3 + (i % 4) * 2,
                height: 3 + (i % 4) * 2,
                left: `${8 + i * 7.5}%`,
                top: `${10 + (i % 5) * 18}%`,
                background: `linear-gradient(135deg, ${i % 2 === 0 ? colors.orb1 : colors.orb2}, ${i % 2 === 0 ? colors.orb2 : colors.orb3})`,
                opacity: config.particleOpacity * (0.3 + (i % 3) * 0.15),
              }}
              animate={{
                y: [0, -20 - (i % 3) * 10, 0],
                x: [0, i % 2 === 0 ? 8 : -8, 0],
                opacity: [
                  config.particleOpacity * 0.2,
                  config.particleOpacity * 0.5,
                  config.particleOpacity * 0.2,
                ],
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 6 + i * 1.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.8,
              }}
            />
          ))}
        </div>
      )}

      {/* Subtle noise texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Top edge highlight */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent 10%, rgba(255,255,255,0.8) 50%, transparent 90%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default PremiumMeshBackground;
