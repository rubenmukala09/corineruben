import {
  Shield,
  Eye,
  Brain,
  Lock,
  Users,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

const THREAT_TYPES = [
  { icon: Brain, label: "AI Deepfakes", pct: 87, color: "from-rose-500 to-pink-500" },
  { icon: AlertTriangle, label: "Phishing", pct: 94, color: "from-amber-500 to-orange-500" },
  { icon: Eye, label: "Identity Theft", pct: 91, color: "from-primary to-accent" },
  { icon: Lock, label: "Data Breaches", pct: 96, color: "from-emerald-500 to-teal-500" },
];

const CENTER_STATS = [
  { icon: Shield, value: "99.2%", label: "Detection Rate" },
  { icon: Users, value: "5,000+", label: "Protected" },
  { icon: TrendingUp, value: "< 0.3s", label: "Response" },
];

export const AnimatedInfographic = () => {
  return (
    <section className="py-14">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-[0.15em] mb-4">
            <Eye className="w-3.5 h-3.5" />
            Threat Landscape
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-foreground">
            What We{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Protect Against
            </span>
          </h2>
          <p className="text-base text-muted-foreground mt-3 max-w-xl mx-auto">
            Our system detects and neutralizes the most common digital threats targeting families.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Threat Bars */}
          <div className="lg:col-span-2 space-y-4">
            {THREAT_TYPES.map((threat) => (
              <div
                key={threat.label}
                className="p-5 rounded-2xl bg-card/80 border border-border/40"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <threat.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-foreground">{threat.label}</p>
                      <p className="text-xs text-muted-foreground">Detection & Prevention</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span className="text-sm font-black text-foreground">{threat.pct}%</span>
                  </div>
                </div>
                {/* Progress bar */}
                <div className="h-2.5 rounded-full bg-muted/60 overflow-hidden">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${threat.color} transition-all duration-1000`}
                    style={{ width: `${threat.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Central stats panel */}
          <div className="space-y-4">
            {CENTER_STATS.map((stat) => (
              <div
                key={stat.label}
                className="p-6 rounded-2xl bg-card/80 border border-border/40 text-center"
              >
                <div className="w-12 h-12 mx-auto rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <p className="text-3xl font-black text-foreground">{stat.value}</p>
                <p className="text-xs uppercase tracking-wider text-muted-foreground font-bold mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
