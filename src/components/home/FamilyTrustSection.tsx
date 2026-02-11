import { Shield, Users, Award, CheckCircle, TrendingUp, Clock } from "lucide-react";

const stats = [
  { icon: Users, value: "100+", label: "Ohio Families Protected", color: "from-primary/20 to-lavender-200/30" },
  { icon: Shield, value: "24/7", label: "Monitoring & Alerts", color: "from-accent/20 to-coral-200/30" },
  { icon: Award, value: "Client-Reviewed", label: "Trusted Feedback", color: "from-success/20 to-teal-200/30" },
];

const trustPoints = [
  { text: "24/7 Real-time monitoring & alerts", icon: Clock },
  { text: "Dedicated Ohio-based support team", icon: Users },
  { text: "10% Veteran discount on all services", icon: Shield },
  { text: "30-day money-back guarantee", icon: CheckCircle },
];

export const FamilyTrustSection = () => {
  return (
    <section className="py-14 lg:py-20 bg-gradient-to-br from-background via-lavender-50/20 to-coral-50/15 dynamic-gradient-overlay" aria-labelledby="trust-heading">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header with Glassmorphism */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 mb-4 glass-light rounded-full micro-bounce">
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-sm font-bold text-primary uppercase tracking-wide">Real Protection, Real Results</span>
          </div>
          <h2 id="trust-heading" className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground leading-tight mb-4"
            style={{ fontFamily: "'Lora', 'Rubik', serif" }}>
            Why Families{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Trust Us
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join Ohio families who trust us with their digital safety every day.
          </p>
        </div>

        {/* Bento Grid Stats Layout */}
        <div className="bento-grid mb-10" role="list" aria-label="Trust statistics">
          {/* Large hero stat */}
          <div
            role="listitem"
            className="bento-cell bento-span-2 bento-row-2 glass-heavy hover-depth widget-premium text-center flex flex-col justify-center items-center micro-tilt-3d subtle-3d-surface"
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center shadow-3d" aria-hidden="true">
              <TrendingUp className="w-8 h-8 text-primary" />
            </div>
            <div className="widget-stat">
              <span className="stat-value text-5xl">100+</span>
              <span className="stat-label text-base mt-2">Ohio Families Protected</span>
            </div>
            <p className="text-sm text-muted-foreground mt-4 max-w-xs">
              Growing every day with trusted protection
            </p>
          </div>
          
          {/* Smaller stats */}
          {stats.slice(1).map((stat) => (
            <div
              key={stat.label}
              role="listitem"
              className="bento-cell glass-light hover-depth micro-scale text-center flex flex-col justify-center micro-tilt-3d subtle-3d-surface"
            >
              <div className={`w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-3d`} aria-hidden="true">
                <stat.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="widget-stat">
                <span className="stat-value text-3xl">{stat.value}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Points - Bento Style with Interactive Reveals */}
        <div className="glass-heavy rounded-2xl p-6 lg:p-8 shadow-3d-lg subtle-3d-surface" role="list" aria-label="Trust guarantees">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {trustPoints.map((point, i) => (
              <div 
                key={i} 
                className="glass-light rounded-xl p-4 micro-scale hover-reveal hover-gradient micro-tilt-3d subtle-3d-surface" 
                role="listitem"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0 shadow-3d">
                    <point.icon className="w-5 h-5 text-primary" aria-hidden="true" />
                  </div>
                  <span className="text-foreground/90 text-sm font-medium">{point.text}</span>
                </div>
                <div className="reveal-content mt-3 pt-3 border-t border-white/20">
                  <p className="text-xs text-muted-foreground">
                    Guaranteed by InVision Network
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
