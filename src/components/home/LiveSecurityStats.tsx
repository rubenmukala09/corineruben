import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  Shield,
  Users,
  Clock,
  TrendingUp,
  CheckCircle2,
  Activity,
  Globe,
  Lock,
  BellRing,
  ArrowUpRight,
  Zap,
  Eye,
  FileWarning,
  Fingerprint,
} from "lucide-react";
import { Link } from "react-router-dom";

interface Stat {
  id: string;
  icon: typeof Shield;
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  description: string;
  accent: string;
  trend?: { value: number; isPositive: boolean };
}

const initialStats: Stat[] = [
  {
    id: "threats",
    icon: Shield,
    value: 12847,
    label: "Threats Blocked",
    description: "This month",
    accent: "hsl(var(--coral-500))",
    trend: { value: 23, isPositive: true },
  },
  {
    id: "families",
    icon: Users,
    value: 523,
    suffix: "+",
    label: "Families Protected",
    description: "Across Ohio",
    accent: "hsl(var(--lavender-500))",
    trend: { value: 12, isPositive: true },
  },
  {
    id: "response",
    icon: Clock,
    value: 0.3,
    suffix: "s",
    prefix: "<",
    label: "Response Time",
    description: "Average mitigation",
    accent: "hsl(var(--teal-500))",
  },
  {
    id: "uptime",
    icon: Activity,
    value: 99.97,
    suffix: "%",
    label: "System Uptime",
    description: "Service reliability",
    accent: "hsl(var(--primary))",
  },
];

const commandSignals = [
  {
    icon: Lock,
    title: "Encrypted Sessions",
    value: "AES-256",
    detail: "End-to-end encryption",
  },
  {
    icon: BellRing,
    title: "Alert Dispatch",
    value: "1.1 sec",
    detail: "Avg notification speed",
  },
  {
    icon: Globe,
    title: "Regional Coverage",
    value: "88 / 88",
    detail: "Ohio counties covered",
  },
  {
    icon: Fingerprint,
    title: "Identity Checks",
    value: "2,341",
    detail: "Verified this week",
  },
  {
    icon: Eye,
    title: "Active Monitors",
    value: "24/7",
    detail: "Real-time scanning",
  },
];

const recentActivity = [
  { icon: FileWarning, text: "Phishing attempt blocked", time: "2 min ago", severity: "high" },
  { icon: Shield, text: "Malware signature updated", time: "8 min ago", severity: "info" },
  { icon: Zap, text: "New threat rule deployed", time: "14 min ago", severity: "medium" },
];

const sparklineHeights = [32, 46, 38, 64, 52, 74, 68, 82, 76, 88, 84, 92];

const AnimatedCounter = ({
  value,
  prefix = "",
  suffix = "",
  duration = 1.8,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const frameRef = useRef<number | null>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    const startTime = performance.now();
    const animate = (now: number) => {
      const elapsed = (now - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      setDisplayValue(value * eased);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [duration, isInView, value]);

  const decimals = Number.isInteger(value) ? 0 : 2;
  const formatted =
    decimals === 0
      ? Math.round(displayValue).toLocaleString()
      : displayValue.toFixed(decimals);

  return (
    <span ref={ref}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
};

export const LiveSecurityStats = () => {
  const [stats, setStats] = useState(initialStats);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-120px" });

  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prev) =>
        prev.map((stat) => {
          if (stat.id === "threats") {
            return {
              ...stat,
              value: stat.value + Math.floor(Math.random() * 4) + 1,
            };
          }
          return stat;
        }),
      );
      setLastUpdate(new Date());
    }, 12000);

    return () => clearInterval(interval);
  }, []);

  const threatsStat = stats.find((item) => item.id === "threats") ?? stats[0];
  const supportingStats = stats.filter((item) => item.id !== "threats");

  return (
    <section className="relative overflow-hidden py-12 md:py-16">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-secondary/20" />

      <div ref={containerRef} className="container relative z-10 mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45 }}
          className="mb-8 text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/5 px-4 py-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
              Live Dashboard
            </span>
            <span className="text-xs text-muted-foreground">
              {lastUpdate.toLocaleTimeString()}
            </span>
          </div>

          <h2 className="mt-3 text-3xl font-black tracking-tight text-foreground md:text-4xl">
            Protection
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {" "}Command Center
            </span>
          </h2>

          <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground md:text-base">
            Real-time security metrics and operational status at a glance.
          </p>
        </motion.div>

        {/* Main grid: left widgets + right ops panel — EQUAL HEIGHT */}
        <div className="grid gap-3 lg:grid-cols-12 lg:auto-rows-fr">

          {/* LEFT COLUMN */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="lg:col-span-8 flex flex-col gap-3"
          >
            {/* Primary widget - Threats Blocked with sparkline */}
            <div className="flex-1 rounded-2xl border border-border/60 bg-card/90 p-4 backdrop-blur-sm md:p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary/80">
                    Threats Blocked
                  </p>
                  <div className="mt-1 text-3xl font-black tracking-tight text-foreground md:text-4xl">
                    <AnimatedCounter
                      value={threatsStat.value}
                      prefix={threatsStat.prefix}
                      suffix={threatsStat.suffix}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">{threatsStat.description}</p>
                </div>
                <div className="rounded-xl border border-primary/15 bg-primary/5 p-2.5">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
              </div>

              {/* Sparkline */}
              <div className="mt-3 grid grid-cols-12 gap-1">
                {sparklineHeights.map((height, index) => (
                  <div key={index} className="h-10 rounded bg-muted/40 p-0.5">
                    <div
                      className="h-full w-full rounded-sm bg-gradient-to-t from-primary/80 via-accent/70 to-accent/50"
                      style={{
                        transform: `scaleY(${height / 100})`,
                        transformOrigin: "bottom",
                      }}
                    />
                  </div>
                ))}
              </div>

              <div className="mt-2 flex items-center justify-between">
                {threatsStat.trend && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-600">
                    <TrendingUp className="h-3 w-3" />
                    {threatsStat.trend.value}% trend
                  </span>
                )}
                <span className="text-[10px] text-muted-foreground">12-month trend</span>
              </div>
            </div>

            {/* 3 supporting stat cards — equal height row */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {supportingStats.map((stat) => (
                <div
                  key={stat.id}
                  className="flex flex-col justify-between rounded-2xl border border-border/60 bg-card/85 p-4 backdrop-blur-sm"
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                      {stat.label}
                    </p>
                    <div
                      className="rounded-lg p-1.5"
                      style={{ background: `color-mix(in srgb, ${stat.accent} 12%, transparent)` }}
                    >
                      <stat.icon className="h-4 w-4" style={{ color: stat.accent }} />
                    </div>
                  </div>
                  <div>
                    <div className="mt-1 text-2xl font-black tracking-tight text-foreground md:text-3xl">
                      <AnimatedCounter
                        value={stat.value}
                        prefix={stat.prefix}
                        suffix={stat.suffix}
                        duration={1.4}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">{stat.description}</p>
                  </div>
                  {stat.trend && (
                    <div className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
                      <ArrowUpRight className="h-3 w-3" />+{stat.trend.value}% this month
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Recent Activity — fills remaining space */}
            <div className="flex-1 rounded-2xl border border-border/60 bg-card/85 p-4 backdrop-blur-sm">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground mb-2">
                Recent Activity
              </p>
              <div className="space-y-2">
                {recentActivity.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 rounded-xl border border-border/40 bg-muted/20 px-3 py-2">
                    <div className={`rounded-lg p-1.5 ${
                      item.severity === "high" ? "bg-destructive/10" :
                      item.severity === "medium" ? "bg-accent/10" : "bg-primary/10"
                    }`}>
                      <item.icon className={`h-3.5 w-3.5 ${
                        item.severity === "high" ? "text-destructive" :
                        item.severity === "medium" ? "text-accent" : "text-primary"
                      }`} />
                    </div>
                    <p className="flex-1 text-sm text-foreground">{item.text}</p>
                    <span className="text-[10px] text-muted-foreground whitespace-nowrap">{item.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN — OPS WIDGET (stretches to match left) */}
          <motion.aside
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, delay: 0.12 }}
            className="lg:col-span-4 flex"
          >
            <div className="flex-1 flex flex-col rounded-2xl border border-white/10 bg-gradient-to-b from-[hsl(var(--navy-900))] to-[hsl(var(--navy-800))] p-4 text-white md:p-5">
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/65">
                  Operations Panel
                </p>
                <span className="inline-flex items-center gap-1 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 animate-pulse" />
                  Live
                </span>
              </div>

              <p className="mt-2 text-xs text-white/60">
                Coverage, alerts, encryption, and identity verification status.
              </p>

              {/* Command signals — expanded with more data */}
              <div className="mt-3 flex-1 space-y-2">
                {commandSignals.map((signal) => (
                  <div
                    key={signal.title}
                    className="rounded-xl border border-white/8 bg-white/5 px-3 py-2.5"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="rounded-lg bg-white/8 p-1.5">
                        <signal.icon className="h-3.5 w-3.5 text-coral-300" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-white/90">{signal.title}</p>
                        <p className="text-[10px] text-white/50">{signal.detail}</p>
                      </div>
                      <p className="text-[11px] font-bold text-coral-300 whitespace-nowrap">
                        {signal.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Next Step CTA */}
              <div className="mt-3 rounded-xl border border-white/12 bg-white/5 p-3">
                <p className="text-[10px] uppercase tracking-[0.14em] text-white/50">
                  Next Step
                </p>
                <p className="mt-1 text-xs text-white/75">
                  Full dashboard controls and device monitoring.
                </p>
                <Link
                  to="/portal"
                  className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-coral-300 hover:text-coral-200 transition-colors"
                >
                  Open dashboard
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </motion.aside>
        </div>

        {/* Bottom trust signals */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-4 grid gap-2 md:grid-cols-3"
        >
          {[
            { icon: Globe, text: "Statewide protection footprint" },
            { icon: CheckCircle2, text: "Privacy-first security workflow" },
            { icon: Shield, text: "24/7 operational monitoring" },
          ].map((item) => (
            <div
              key={item.text}
              className="rounded-xl border border-border/50 bg-card/70 px-3 py-2.5 backdrop-blur-sm"
            >
              <div className="flex items-center gap-2 text-xs font-medium text-foreground">
                <item.icon className="h-3.5 w-3.5 text-primary" />
                {item.text}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default LiveSecurityStats;
