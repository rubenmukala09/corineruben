import { Shield, Users, Award, CheckCircle, TrendingUp, Clock } from "lucide-react";

const stats = [
  { value: "100+", label: "Ohio Families Protected" },
  { value: "24/7", label: "Monitoring & Alerts" },
  { value: "99%", label: "Client Satisfaction" },
  { value: "30-Day", label: "Money-Back Guarantee" },
];

const trustPoints = [
  { text: "24/7 Real-time monitoring and alerts", icon: Clock },
  { text: "Dedicated Ohio-based support team", icon: Users },
  { text: "10% Veteran discount on all services", icon: Shield },
  { text: "30-day money-back guarantee", icon: CheckCircle },
];

export const FamilyTrustSection = () => {
  return (
    <section className="py-16 lg:py-24 relative overflow-hidden" aria-labelledby="trust-heading">
      {/* Background orbs */}
      <div className="absolute top-1/2 -translate-y-1/2 -left-40 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-primary/6 to-accent/4 blur-[120px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-gradient-to-br from-accent/5 to-primary/3 blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 max-w-6xl relative z-10">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/8 backdrop-blur-sm border border-primary/15 text-xs font-bold uppercase tracking-[0.2em] text-primary mb-4">Real Protection, Real Results</span>
          <h2 id="trust-heading" className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground leading-[1.1] mb-3">
            Why Families{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Trust Us</span>
          </h2>
          <p className="text-muted-foreground text-base max-w-2xl mx-auto">
            Join Ohio families who rely on us for their digital safety every day.
          </p>
        </div>

        {/* Glass stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {stats.map((stat, i) => (
            <div key={stat.label} className="group relative rounded-2xl overflow-hidden text-center">
              <div className="relative backdrop-blur-xl bg-card/70 border border-border/30 rounded-2xl p-6 hover:border-primary/25 transition-all duration-500" style={{ boxShadow: 'var(--skeuo-shadow-ombre)' }}>
                {/* Hover glow */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{
                  background: 'radial-gradient(circle at 50% 0%, hsl(var(--primary) / 0.1) 0%, transparent 70%)'
                }} />
                <div className="absolute top-0 left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />
                <div className="relative z-10">
                  <div className="text-3xl md:text-4xl font-black mb-1 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">{stat.value}</div>
                  <div className="text-sm font-medium text-muted-foreground">{stat.label}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Glass trust points strip */}
        <div className="relative rounded-2xl overflow-hidden">
          <div className="backdrop-blur-xl bg-card/60 border border-border/30 rounded-2xl p-6 lg:p-8" style={{ boxShadow: 'var(--skeuo-shadow-ombre)' }}>
            {/* Inner mesh gradient */}
            <div className="absolute inset-0 rounded-2xl pointer-events-none" style={{
              background: `
                radial-gradient(ellipse 40% 80% at 10% 50%, hsl(var(--primary) / 0.06) 0%, transparent 50%),
                radial-gradient(ellipse 40% 80% at 90% 50%, hsl(var(--accent) / 0.06) 0%, transparent 50%)
              `
            }} />
            <div className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10" role="list" aria-label="Trust guarantees">
              {trustPoints.map((point, i) => (
                <div key={i} role="listitem" className="group flex items-center gap-3 p-3 rounded-xl hover:bg-primary/5 transition-all duration-300">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/15 to-accent/10 backdrop-blur-sm border border-primary/10 flex items-center justify-center flex-shrink-0 group-hover:shadow-[0_0_12px_hsl(var(--primary)/0.2)] transition-shadow">
                    <point.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-foreground/90">{point.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
