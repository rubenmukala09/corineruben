import { Shield, Star, Award, Lock } from "lucide-react";

const HeroFloatingStats = () => {
  const stats = [
    { icon: Shield, text: "100+ Families Protected" },
    { icon: Star, text: "Client-Reviewed" },
    { icon: Award, text: "Expert-Founded" },
    { icon: Lock, text: "Privacy-First" },
  ];

  return (
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-20 pointer-events-none hidden lg:block">
      <div className="bg-card rounded-full py-4 px-10 shadow-lg border border-border/60">
        <div className="flex items-center gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <stat.icon className="w-4.5 h-4.5 text-primary" strokeWidth={1.5} />
              </div>
              <span className="text-sm font-semibold text-foreground whitespace-nowrap">
                {stat.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroFloatingStats;
