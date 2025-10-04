import { Shield, Star, Award, Lock, Globe } from "lucide-react";

const TrustBar = () => {
  const trustIndicators = [
    { icon: Shield, text: "500+ Families Protected" },
    { icon: Star, text: "4.9/5 Star Rating" },
    { icon: Award, text: "Cybersecurity Expert-Founded" },
    { icon: Lock, text: "Privacy-First" },
    { icon: Globe, text: "EN • FR • ES" },
  ];

  return (
    <div className="relative z-10 px-4 -mt-10" role="complementary" aria-label="Trust indicators">
      <div className="container mx-auto">
        <div className="relative mx-auto max-w-5xl animate-fade-in-up group/trust">
          {/* Animated rolling light border */}
          <div className="absolute inset-0 rounded-3xl overflow-hidden">
            <div 
              className="absolute inset-[-2px] rounded-3xl opacity-75"
              style={{
                background: 'conic-gradient(from 0deg, transparent 0%, transparent 70%, rgba(255,255,255,0.8) 85%, rgba(255,255,255,0.4) 90%, transparent 100%)',
                animation: 'spin 3s linear infinite',
              }}
            />
          </div>
          
          {/* Main content */}
          <div className="relative bg-gradient-to-r from-primary to-accent rounded-3xl py-6 px-4 sm:px-8 shadow-[0_12px_40px_rgba(139,92,246,0.4)] backdrop-blur-sm border border-accent/30 group-hover/trust:shadow-[0_20px_60px_rgba(139,92,246,0.6)] group-hover/trust:scale-[1.02] transition-all duration-500">
            <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 md:gap-10">
            {trustIndicators.map((item, index) => (
              <div key={index} className="flex items-center gap-2 sm:gap-3 group animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }} role="listitem">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-white/30 backdrop-blur-sm flex items-center justify-center group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 group-hover:bg-white/40" aria-hidden="true">
                  <item.icon className="w-4 h-4 sm:w-5 sm:h-5 text-white drop-shadow-md group-hover:scale-110 transition-transform duration-300" />
                </div>
                <span className="text-xs sm:text-sm font-bold text-white whitespace-nowrap drop-shadow-sm group-hover:scale-105 transition-transform duration-300">{item.text}</span>
              </div>
            ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustBar;
