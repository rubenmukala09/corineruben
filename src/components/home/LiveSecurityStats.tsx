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
    accent: "#f97316",
    trend: { value: 23, isPositive: true },
  },
  {
    id: "families",
    icon: Users,
    value: 523,
    suffix: "+",
    label: "Families Protected",
    description: "Across Ohio",
    accent: "#b45309",
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
    accent: "#16a34a",
  },
  {
    id: "uptime",
    icon: Activity,
    value: 99.97,
    suffix: "%",
    label: "System Uptime",
    description: "Service reliability",
    accent: "#2563eb",
  },
];

const commandSignals = [
  {
    icon: Lock,
    title: "Encrypted Sessions",
    value: "AES-256",
    detail: "Transport and at-rest encryption",
  },
  {
    icon: BellRing,
    title: "Alert Dispatch",
    value: "1.1 sec",
    detail: "Average notification delivery",
  },
  {
    icon: Globe,
    title: "Regional Coverage",
    value: "88 / 88",
    detail: "Ohio counties covered",
  },
];

const trustSignals = [
  { icon: Globe, text: "Statewide protection footprint" },
  { icon: CheckCircle2, text: "Privacy-first security workflow" },
  { icon: Shield, text: "Operational monitoring every day" },
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
    <section className="relative overflow-hidden py-16 md:py-20">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-secondary/30" />
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-28 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
      </div>

      <div ref={containerRef} className="container relative z-10 mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45 }}
          className="mb-10 text-center md:mb-12"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/5 px-4 py-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
              Security Widgets
            </span>
            <span className="text-xs text-muted-foreground">
              Sample feed | {lastUpdate.toLocaleTimeString()}
            </span>
          </div>

          <h2 className="mt-4 text-3xl font-black tracking-tight text-foreground md:text-4xl lg:text-5xl">
            Live Protection
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {" "}
              Command Center
            </span>
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-base text-muted-foreground md:text-lg">
            A full widget redesign focused on clear hierarchy, faster scanning,
            and polished data cards for security status at a glance.
          </p>
        </motion.div>

        <div className="grid gap-4 lg:grid-cols-12">
          <motion.article
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="lg:col-span-8"
          >
            <div className="rounded-3xl border border-border/70 bg-card/90 p-5 shadow-[0_22px_42px_-28px_hsl(var(--navy-900)/0.4)] backdrop-blur-sm md:p-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-card to-accent/5 p-5 md:p-6">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary/90">
                        Primary Widget
                      </p>
                      <div className="mt-2 text-4xl font-black tracking-tight text-foreground md:text-5xl">
                        <AnimatedCounter
                          value={threatsStat.value}
                          prefix={threatsStat.prefix}
                          suffix={threatsStat.suffix}
                        />
                      </div>
                      <p className="mt-1 text-sm font-semibold text-foreground">
                        {threatsStat.label}
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {threatsStat.description}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-primary/20 bg-background/80 p-3">
                      <threatsStat.icon className="h-7 w-7 text-primary" />
                    </div>
                  </div>

                  <div className="mt-5 grid grid-cols-12 gap-1.5">
                    {sparklineHeights.map((height, index) => (
                      <div
                        key={index}
                        className="h-16 rounded-md bg-background/70 p-1"
                      >
                        <div
                          className="h-full w-full rounded-sm bg-gradient-to-t from-primary via-accent to-accent/80"
                          style={{
                            transform: `scaleY(${height / 100})`,
                            transformOrigin: "bottom",
                          }}
                        />
                      </div>
                    ))}
                  </div>

                  {threatsStat.trend ? (
                    <div
                      className={`mt-4 inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${
                        threatsStat.trend.isPositive
                          ? "bg-emerald-500/10 text-emerald-600"
                          : "bg-red-500/10 text-red-600"
                      }`}
                    >
                      <TrendingUp
                        className={`h-3.5 w-3.5 ${threatsStat.trend.isPositive ? "" : "rotate-180"}`}
                      />
                      {threatsStat.trend.value}% trend
                    </div>
                  ) : null}
                </div>

                {supportingStats.map((stat) => (
                  <div
                    key={stat.id}
                    className="rounded-2xl border border-border/70 bg-background/85 p-5"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                          {stat.label}
                        </p>
                        <div className="mt-2 text-3xl font-black tracking-tight text-foreground">
                          <AnimatedCounter
                            value={stat.value}
                            prefix={stat.prefix}
                            suffix={stat.suffix}
                            duration={1.4}
                          />
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {stat.description}
                        </p>
                      </div>

                      <div
                        className="rounded-xl p-2"
                        style={{
                          background: `linear-gradient(145deg, ${stat.accent}22 0%, ${stat.accent}10 100%)`,
                        }}
                      >
                        <stat.icon
                          className="h-5 w-5"
                          style={{ color: stat.accent }}
                        />
                      </div>
                    </div>

                    {stat.trend ? (
                      <div className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-emerald-600">
                        <ArrowUpRight className="h-3.5 w-3.5" />+
                        {stat.trend.value}% this month
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          </motion.article>

          <motion.aside
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, delay: 0.12 }}
            className="lg:col-span-4"
          >
            <div className="rounded-3xl border border-white/12 bg-gradient-to-b from-navy-900 to-navy-800 p-5 text-white shadow-[0_24px_54px_-30px_rgba(8,20,51,0.85)] md:p-6">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-white/70">
                  Ops Widget
                </p>
                <span className="inline-flex items-center gap-1 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-1 text-[11px] font-semibold text-emerald-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 animate-pulse" />
                  Live
                </span>
              </div>

              <p className="mt-3 text-sm text-white/75">
                Compact operational feed for coverage, alerts, and encryption
                status.
              </p>

              <div className="mt-5 space-y-3">
                {commandSignals.map((signal) => (
                  <div
                    key={signal.title}
                    className="rounded-2xl border border-white/10 bg-white/5 p-3"
                  >
                    <div className="flex items-start gap-3">
                      <div className="rounded-lg bg-white/10 p-2">
                        <signal.icon className="h-4 w-4 text-coral-300" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-white">
                          {signal.title}
                        </p>
                        <p className="text-xs text-white/70">{signal.detail}</p>
                      </div>
                      <p className="ml-auto text-xs font-bold text-coral-300">
                        {signal.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-2xl border border-white/15 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.14em] text-white/60">
                  Next Step
                </p>
                <p className="mt-1 text-sm text-white/85">
                  Open full dashboard controls and device-level monitoring.
                </p>
                <Link
                  to="/portal"
                  className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-coral-300 hover:text-coral-200"
                >
                  Open dashboard
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </motion.aside>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-7 grid gap-3 md:grid-cols-3"
        >
          {trustSignals.map((item) => (
            <div
              key={item.text}
              className="rounded-2xl border border-border/70 bg-card/80 p-4"
            >
              <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                <item.icon className="h-4 w-4 text-primary" />
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
