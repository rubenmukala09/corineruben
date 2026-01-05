import { Shield, Star, Award, Lock } from "lucide-react";

const HeroFloatingStats = () => {
  const stats = [
    { icon: Shield, text: "500+ Families Protected" },
    { icon: Star, text: "4.9/5 Star Rating" },
    { icon: Award, text: "Cybersecurity Expert-Founded" },
    { icon: Lock, text: "Privacy-First" },
  ];

  return (
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-20 pointer-events-none">
      <div 
        className="rounded-full py-4 px-10 md:px-14 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)]"
        style={{
          background: "linear-gradient(90deg, #5b21b6 0%, #7c3aed 25%, #06b6d4 75%, #22d3ee 100%)",
        }}
      >
        <div className="flex items-center gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="flex items-center gap-2.5 text-white"
            >
              <stat.icon className="w-5 h-5 flex-shrink-0" strokeWidth={1.5} />
              <span className="text-sm font-medium whitespace-nowrap">
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
