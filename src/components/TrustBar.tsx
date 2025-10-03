import { Shield, Star, Award, Lock, Globe } from "lucide-react";

const TrustBar = () => {
  const trustIndicators = [
    { icon: Shield, text: "500+ Families Protected" },
    { icon: Star, text: "4.9/5 Star Rating" },
    { icon: Award, text: "Veteran-Founded" },
    { icon: Lock, text: "Privacy-First" },
    { icon: Globe, text: "EN • FR • ES" },
  ];

  return (
    <div className="relative z-10 px-4 -mt-10">
      <div className="container mx-auto">
        <div className="bg-gradient-to-r from-[hsl(32,95%,48%)] to-[hsl(38,92%,50%)] rounded-3xl py-6 px-8 mx-auto max-w-5xl shadow-[0_12px_40px_rgba(245,158,11,0.4)] backdrop-blur-sm border border-[hsl(38,92%,50%)]/30">
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10">
            {trustIndicators.map((item, index) => (
              <div key={index} className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-lg bg-white/30 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <item.icon className="w-5 h-5 text-white" />
                </div>
                <span className="text-sm font-bold text-white whitespace-nowrap">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustBar;
