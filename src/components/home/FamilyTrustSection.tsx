import { Shield, Users, Award, CheckCircle } from "lucide-react";

const stats = [
  { icon: Users, value: "5,000+", label: "Ohio Families Protected" },
  { icon: Shield, value: "99.2%", label: "Threat Detection Rate" },
  { icon: Award, value: "4.9/5", label: "Customer Rating" },
];

const trustPoints = [
  "24/7 Real-time monitoring & alerts",
  "Dedicated Ohio-based support team",
  "10% Veteran discount on all services",
  "30-day money-back guarantee",
];

export const FamilyTrustSection = () => {
  return (
    <section className="py-14 lg:py-20 bg-gradient-to-br from-background via-lavender-50/20 to-coral-50/15" aria-labelledby="trust-heading">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header with Glassmorphism */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 mb-4 bg-white/70 dark:bg-card/70 backdrop-blur-xl rounded-full border border-white/50 dark:border-border/50 shadow-lg">
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-sm font-bold text-primary uppercase tracking-wide">Real Protection, Real Results</span>
          </div>
          <h2 id="trust-heading" className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground leading-tight mb-4"
            style={{ fontFamily: "'Clash Display', 'DM Sans', sans-serif" }}>
            Why Families{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Trust Us
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of Ohio families who trust us with their digital safety every day.
          </p>
        </div>

        {/* Stats Row with Glassmorphism */}
        <div className="grid md:grid-cols-3 gap-6 mb-10" role="list" aria-label="Trust statistics">
          {stats.map((stat) => (
            <div
              key={stat.label}
              role="listitem"
              className="bg-white/70 dark:bg-card/70 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/50 dark:border-border/50 text-center hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
            >
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 backdrop-blur-sm flex items-center justify-center border border-white/30" aria-hidden="true">
                <stat.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="text-3xl font-black text-foreground mb-1" style={{ fontFamily: "'Clash Display', sans-serif" }}>
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground" aria-label={`${stat.value} ${stat.label}`}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Trust Points with Glassmorphism */}
        <div className="bg-white/60 dark:bg-card/60 backdrop-blur-2xl rounded-2xl p-6 lg:p-8 border border-white/50 dark:border-border/50 shadow-xl" role="list" aria-label="Trust guarantees">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {trustPoints.map((point, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-white/50 dark:bg-card/50 backdrop-blur-sm rounded-xl border border-white/40" role="listitem">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-4 h-4 text-primary" aria-hidden="true" />
                </div>
                <span className="text-foreground/90 text-sm font-medium">{point}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};