import { Users, ShieldCheck, Handshake, Award } from "lucide-react";

const stats = [
  { icon: Users, label: "Families Protected" },
  { icon: ShieldCheck, label: "Scams Blocked Daily" },
  { icon: Handshake, label: "Local Partners" },
  { icon: Award, label: "Expert Team" },
];

export const ImpactStatsRow = () => {
  return (
    <section className="py-16 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <stat.icon className="w-8 h-8 mx-auto mb-3 opacity-80" />
              <div className="text-sm opacity-80">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
