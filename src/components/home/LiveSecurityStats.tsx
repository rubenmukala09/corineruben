import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Shield,
  Users,
  AlertTriangle,
  Clock,
  TrendingUp,
  CheckCircle2,
  Activity,
  Globe,
} from "lucide-react";

interface Stat {
  id: string;
  icon: typeof Shield;
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  description: string;
  color: string;
  trend?: { value: number; isPositive: boolean };
}

const initialStats: Stat[] = [
  {
    id: "threats",
    icon: Shield,
    value: 12847,
    label: "Threats Blocked",
    description: "This month alone",
    color: "from-red-500 to-orange-500",
    trend: { value: 23, isPositive: true },
  },
  {
    id: "families",
    icon: Users,
    value: 523,
    suffix: "+",
    label: "Families Protected",
    description: "Across Ohio",
    color: "from-primary to-accent",
    trend: { value: 12, isPositive: true },
  },
  {
    id: "response",
    icon: Clock,
    value: 0.3,
    suffix: "s",
    prefix: "<",
    label: "Response Time",
    description: "Average threat neutralization",
    color: "from-green-500 to-emerald-500",
  },
  {
    id: "uptime",
    icon: Activity,
    value: 99.97,
    suffix: "%",
    label: "System Uptime",
    description: "Enterprise-grade reliability",
    color: "from-blue-500 to-cyan-500",
  },
];

const AnimatedCounter = ({
  value,
  prefix = "",
  suffix = "",
  duration = 2,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    const isDecimal = value % 1 !== 0;
    const step = value / (duration * 60);
    let current = 0;

    const timer = setInterval(() => {
      current += step;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(isDecimal ? parseFloat(current.toFixed(2)) : Math.floor(current));
      }
    }, 1000 / 60);

    return () => clearInterval(timer);
  }, [value, duration, isInView]);

  return (
    <span ref={ref}>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
};

export const LiveSecurityStats = () => {
  const [stats, setStats] = useState(initialStats);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prev) =>
        prev.map((stat) => {
          if (stat.id === "threats") {
            return { ...stat, value: stat.value + Math.floor(Math.random() * 3) };
          }
          return stat;
        })
      );
      setLastUpdate(new Date());
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 mesh-gradient opacity-50" />
      <div className="absolute inset-0 noise-overlay" />

      {/* Floating orbs */}
      <motion.div
        animate={{
          y: [-20, 20, -20],
          x: [-10, 10, -10],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-10 w-64 h-64 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{
          y: [20, -20, 20],
          x: [10, -10, 10],
          scale: [1.1, 1, 1.1],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-20 right-10 w-72 h-72 rounded-full bg-gradient-to-br from-accent/10 to-primary/10 blur-3xl pointer-events-none"
      />

      <div ref={containerRef} className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 glass-light rounded-full mb-6">
            <span className="live-indicator">
              LIVE
            </span>
            <span className="text-sm text-muted-foreground">
              Last updated: {lastUpdate.toLocaleTimeString()}
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-foreground">Real-Time </span>
            <span className="text-gradient-animate">Protection Stats</span>
          </h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Watch our AI-powered security system protect Ohio families around the clock.
            These numbers update live.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const StatIcon = stat.icon;
            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group"
              >
                <div className="relative h-full glass-heavy rounded-2xl p-6 overflow-hidden card-shine">
                  {/* Gradient accent */}
                  <div
                    className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.color}`}
                  />

                  {/* Icon */}
                  <div
                    className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${stat.color} mb-4`}
                  >
                    <StatIcon className="w-6 h-6 text-white" />
                  </div>

                  {/* Value */}
                  <div className="mb-2">
                    <motion.div
                      key={stat.value}
                      initial={{ scale: 1.1 }}
                      animate={{ scale: 1 }}
                      className="text-4xl font-black text-foreground"
                    >
                      <AnimatedCounter
                        value={stat.value}
                        prefix={stat.prefix}
                        suffix={stat.suffix}
                      />
                    </motion.div>
                  </div>

                  {/* Label & Description */}
                  <div className="text-lg font-semibold text-foreground mb-1">
                    {stat.label}
                  </div>
                  <div className="text-sm text-muted-foreground mb-3">
                    {stat.description}
                  </div>

                  {/* Trend indicator */}
                  {stat.trend && (
                    <div
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                        stat.trend.isPositive
                          ? "bg-green-500/10 text-green-600"
                          : "bg-red-500/10 text-red-600"
                      }`}
                    >
                      <TrendingUp
                        className={`w-3 h-3 ${!stat.trend.isPositive && "rotate-180"}`}
                      />
                      {stat.trend.value}% vs last month
                    </div>
                  )}

                  {/* Pulse effect on hover */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1.5, opacity: 0.1 }}
                    className={`absolute -bottom-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br ${stat.color}`}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom trust indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap justify-center items-center gap-8 mt-12 pt-8 border-t border-border/30"
        >
          {[
            { icon: Globe, text: "Protecting all 88 Ohio counties" },
            { icon: CheckCircle2, text: "SOC 2 Type II Compliant" },
            { icon: Shield, text: "Bank-level encryption" },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 text-sm text-muted-foreground"
            >
              <item.icon className="w-4 h-4 text-primary" />
              {item.text}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default LiveSecurityStats;
