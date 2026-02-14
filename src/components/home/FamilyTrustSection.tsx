import { Shield, Users, Award, CheckCircle, TrendingUp, Clock } from "lucide-react";

const stats = [
  { icon: TrendingUp, value: "100+", label: "Ohio Families Protected", description: "Growing every day with trusted protection" },
  { icon: Shield, value: "24/7", label: "Monitoring & Alerts", description: "Round-the-clock protection" },
  { icon: Award, value: "Client-Reviewed", label: "Trusted Feedback", description: "Real testimonials from real families" },
];

const trustPoints = [
  { text: "24/7 Real-time monitoring & alerts", icon: Clock },
  { text: "Dedicated Ohio-based support team", icon: Users },
  { text: "10% Veteran discount on all services", icon: Shield },
  { text: "30-day money-back guarantee", icon: CheckCircle },
];

export const FamilyTrustSection = () => {
  return (
    <section className="py-16 lg:py-20" aria-labelledby="trust-heading">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 mb-5">
            <span className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-accent" />
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-primary">Real Protection, Real Results</span>
          </div>
          <h2 id="trust-heading" className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground leading-tight mb-3">
            Why Families{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Trust Us</span>
          </h2>
          <p className="text-muted-foreground text-base max-w-2xl mx-auto">
            Join Ohio families who trust us with their digital safety every day.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-10 max-w-4xl mx-auto" role="list" aria-label="Trust statistics">
          {stats.map((stat) => (
            <div key={stat.label} role="listitem"
              className="bg-card rounded-2xl border border-border/60 p-6 text-center hover:border-primary/30 hover:shadow-lg transition-all duration-300">
              <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-primary/8 flex items-center justify-center">
                <stat.icon className="w-7 h-7 text-primary" />
              </div>
              <div className="text-3xl font-black text-foreground mb-1">{stat.value}</div>
              <div className="text-sm font-bold text-foreground mb-1">{stat.label}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </div>
          ))}
        </div>

        {/* Trust Points */}
        <div className="max-w-4xl mx-auto bg-card rounded-2xl border border-border/60 p-6 lg:p-8" role="list" aria-label="Trust guarantees">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {trustPoints.map((point, i) => (
              <div key={i} role="listitem" className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 hover:bg-primary/5 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center flex-shrink-0">
                  <point.icon className="w-5 h-5 text-primary" />
                </div>
                <span className="text-sm font-medium text-foreground/90">{point.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
