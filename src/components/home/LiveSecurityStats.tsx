import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { Shield, Users, Clock, Activity, TrendingUp, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

interface Stat {
  id: string;
  icon: typeof Shield;
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  description: string;
}

const stats: Stat[] = [
  { id: "threats", icon: Shield, value: 12847, label: "Threats Blocked", description: "This month" },
  { id: "families", icon: Users, value: 523, suffix: "+", label: "Families Protected", description: "Across Ohio" },
  { id: "response", icon: Clock, value: 0.3, suffix: "s", prefix: "<", label: "Response Time", description: "Average mitigation" },
  { id: "uptime", icon: Activity, value: 99.97, suffix: "%", label: "System Uptime", description: "Service reliability" },
];

const AnimatedCounter = ({ value, prefix = "", suffix = "", duration = 1.8 }: { value: number; prefix?: string; suffix?: string; duration?: number }) => {
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
      if (progress < 1) frameRef.current = requestAnimationFrame(animate);
    };
    frameRef.current = requestAnimationFrame(animate);
    return () => { if (frameRef.current !== null) cancelAnimationFrame(frameRef.current); };
  }, [duration, isInView, value]);

  const decimals = Number.isInteger(value) ? 0 : 2;
  const formatted = decimals === 0 ? Math.round(displayValue).toLocaleString() : displayValue.toFixed(decimals);

  return <span ref={ref}>{prefix}{formatted}{suffix}</span>;
};

export const LiveSecurityStats = () => {
  const [liveStats, setLiveStats] = useState(stats);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveStats((prev) =>
        prev.map((stat) =>
          stat.id === "threats" ? { ...stat, value: stat.value + Math.floor(Math.random() * 4) + 1 } : stat
        )
      );
    }, 12000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 lg:py-20" ref={containerRef}>
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Label */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 mb-5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-primary">Live Protection Stats</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground leading-tight mb-3">
            Real-Time Security{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Metrics</span>
          </h2>
          <p className="text-muted-foreground text-base max-w-xl mx-auto">
            Monitor our protection infrastructure performance in real time.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {liveStats.map((stat) => (
            <div
              key={stat.id}
              className="group relative bg-card rounded-2xl border border-border/60 p-6 text-center hover:border-primary/30 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-primary/8 flex items-center justify-center group-hover:bg-primary/12 transition-colors">
                <stat.icon className="w-7 h-7 text-primary" />
              </div>
              <div className="text-3xl md:text-4xl font-black text-foreground mb-1">
                <AnimatedCounter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
              </div>
              <div className="text-sm font-bold text-foreground mb-1">{stat.label}</div>
              <div className="text-xs text-muted-foreground">{stat.description}</div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-10">
          <Link
            to="/portal"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-accent transition-colors"
          >
            View Full Dashboard
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LiveSecurityStats;
