import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { Shield, Users, Clock, Activity, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

interface Stat {
  id: string;
  icon: typeof Shield;
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
}

const stats: Stat[] = [
  { id: "threats", icon: Shield, value: 12847, label: "Threats Blocked" },
  { id: "families", icon: Users, value: 523, suffix: "+", label: "Families Protected" },
  { id: "response", icon: Clock, value: 0.3, suffix: "s", prefix: "<", label: "Response Time" },
  { id: "uptime", icon: Activity, value: 99.97, suffix: "%", label: "System Uptime" },
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
    <section className="py-12 lg:py-16" ref={containerRef}>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden" style={{ background: 'linear-gradient(135deg, hsl(258 35% 12%) 0%, hsl(258 30% 16%) 40%, hsl(310 25% 14%) 70%, hsl(258 35% 10%) 100%)' }}>
          {/* Glassmorphism orbs */}
          <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-gradient-to-br from-primary/30 to-accent/20 blur-[100px] pointer-events-none" />
          <div className="absolute -bottom-24 -right-16 w-96 h-96 rounded-full bg-gradient-to-br from-accent/25 to-primary/15 blur-[120px] pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-gradient-to-br from-lavender-500/15 to-coral-400/10 blur-[80px] pointer-events-none" />
          
          {/* Mesh gradient overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-30" style={{
            backgroundImage: `
              radial-gradient(ellipse 50% 80% at 20% 30%, hsl(var(--coral-400) / 0.2) 0%, transparent 60%),
              radial-gradient(ellipse 60% 50% at 80% 70%, hsl(var(--lavender-500) / 0.15) 0%, transparent 60%),
              radial-gradient(ellipse 40% 40% at 50% 10%, hsl(var(--accent) / 0.1) 0%, transparent 50%)
            `
          }} />

          {/* Noise texture */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`
          }} />

          {/* Glass border highlight */}
          <div className="absolute inset-0 rounded-3xl border border-white/10 pointer-events-none" />
          <div className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

          <div className="relative z-10 p-8 lg:p-12">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-400">Live Protection</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-white leading-tight">
                  Real-Time Security Metrics
                </h2>
              </div>
              <Link to="/portal" className="inline-flex items-center gap-2 text-sm font-semibold text-white/50 hover:text-white transition-colors">
                Full Dashboard <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {liveStats.map((stat) => (
                <div key={stat.id} className="group relative rounded-2xl overflow-hidden">
                  {/* Glass card */}
                  <div className="relative bg-white/[0.06] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-6 hover:bg-white/[0.1] hover:border-white/15 transition-all duration-500">
                    {/* Inner glow on hover */}
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{
                      background: 'radial-gradient(circle at 50% 0%, hsl(var(--primary) / 0.15) 0%, transparent 70%)'
                    }} />
                    <div className="relative z-10">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 backdrop-blur-sm border border-white/10 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:shadow-[0_0_20px_hsl(var(--primary)/0.3)] transition-all duration-300">
                        <stat.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-3xl md:text-4xl font-black text-white mb-1">
                        <AnimatedCounter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                      </div>
                      <div className="text-sm font-medium text-white/40">{stat.label}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveSecurityStats;
