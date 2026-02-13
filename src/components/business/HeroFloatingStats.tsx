import { Shield, Star, Award, Lock } from "lucide-react";

// Note: These stats should be updated periodically with real metrics
// Consider fetching from database for dynamic updates
const HeroFloatingStats = () => {
  const stats = [
    {
      icon: Shield,
      text: "100+ Families Protected",
      iconBg: "bg-coral-100",
      iconColor: "text-coral-600",
    },
    {
      icon: Star,
      text: "Client-Reviewed",
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600",
    },
    {
      icon: Award,
      text: "Cybersecurity Expert-Founded",
      iconBg: "bg-violet-100",
      iconColor: "text-violet-600",
    },
    {
      icon: Lock,
      text: "Privacy-First",
      iconBg: "bg-sky-100",
      iconColor: "text-sky-600",
    },
  ];

  return (
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-20 pointer-events-none">
      <div className="premium-3d-card premium-shadow-depth premium-glass-refraction premium-shine-sweep relative rounded-full py-5 px-12 md:px-16 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.12)] overflow-hidden border border-coral-200/50 bg-white">
        <div className="relative flex items-center gap-10 md:gap-14">
          {stats.map((stat, index) => (
            <div key={index} className="flex items-center gap-3">
              <div
                className={`premium-3d-icon w-10 h-10 rounded-xl flex items-center justify-center ${stat.iconBg}`}
              >
                <stat.icon
                  className={`w-5 h-5 ${stat.iconColor} flex-shrink-0`}
                  strokeWidth={1.5}
                />
              </div>
              <span className="text-sm font-semibold text-[#18305A] whitespace-nowrap">
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
