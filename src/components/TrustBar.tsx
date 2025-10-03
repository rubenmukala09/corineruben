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
        <div className="glass-effect rounded-full py-5 px-8 mx-auto max-w-5xl shadow-medium border border-white/20">
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10">
            {trustIndicators.map((item, index) => (
              <div key={index} className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[hsl(41,96%,90%)] to-[hsl(38,92%,80%)] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <item.icon className="w-5 h-5 text-accent" />
                </div>
                <span className="text-sm font-semibold text-foreground whitespace-nowrap">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustBar;
