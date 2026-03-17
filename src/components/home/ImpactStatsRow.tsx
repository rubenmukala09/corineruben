import { Users, ShieldCheck, Handshake, Award } from "lucide-react";

// Note: Update these stats periodically with real metrics from database
const stats = [
  { icon: Users, label: "Families Protected", value: "100+" },
  { icon: ShieldCheck, label: "Threats Analyzed", value: "1K+" },
  { icon: Handshake, label: "Local Partners", value: "10+" },
  { icon: Award, label: "Expert Team", value: "5+" },
];

export const ImpactStatsRow = () => {
  return (
    <section className="relative py-16 overflow-hidden">
      {/* Decorative gradient accent */}
      <div
        className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-20"
        style={{
          background:
            "radial-gradient(circle, hsl(var(--coral-400)) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      <div
        className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full opacity-15"
        style={{
          background:
            "radial-gradient(circle, hsl(var(--lavender-500)) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="text-center group cursor-default relative">
              <div
                className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-glow-coral"
                style={{
                  background:
                    "linear-gradient(135deg, hsl(var(--coral-100)) 0%, hsl(var(--lavender-100)) 100%)",
                  border: "1px solid hsl(var(--coral-200))",
                }}
              >
                <stat.icon className="w-7 h-7 text-coral-500" />
              </div>
              <div
                className="text-3xl font-bold text-foreground mb-1"
                style={{
                  background:
                    "linear-gradient(135deg, hsl(var(--navy-600)) 0%, hsl(var(--lavender-600)) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
