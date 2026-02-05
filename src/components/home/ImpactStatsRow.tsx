import { Users, ShieldCheck, Handshake, Award, TrendingUp } from "lucide-react";

const stats = [
  { icon: Users, label: "Families Protected", value: "500+" },
  { icon: ShieldCheck, label: "Scams Blocked", value: "10K+" },
  { icon: Handshake, label: "Local Partners", value: "25+" },
  { icon: Award, label: "Expert Team", value: "15+" },
];

export const ImpactStatsRow = () => {
  return (
    <section className="relative py-12 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0a0a0f 0%, #12081a 100%)',
      }}>
      {/* Animated gradient line */}
      <div className="absolute top-0 left-0 right-0 h-[1px]"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(248,146,106,0.5), transparent)' }} />
      <div className="absolute bottom-0 left-0 right-0 h-[1px]"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.5), transparent)' }} />
      
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div key={i} className="text-center group cursor-default">
              <div className="w-14 h-14 mx-auto mb-3 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110"
                style={{
                  background: 'linear-gradient(135deg, rgba(248,146,106,0.15) 0%, rgba(139,92,246,0.1) 100%)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  boxShadow: '0 0 25px rgba(248,146,106,0.15)'
                }}>
                <stat.icon className="w-6 h-6 text-coral-400" />
              </div>
              <div className="text-2xl font-bold text-white mb-1" style={{ textShadow: '0 0 20px rgba(248,146,106,0.3)' }}>{stat.value}</div>
              <div className="text-sm text-white/50">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
