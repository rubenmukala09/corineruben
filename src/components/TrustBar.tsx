import { Shield, Star, Award, Lock, Globe } from "lucide-react";

const TrustBar = () => {
  const trustIndicators = [
    { icon: Shield, text: "500+ Families Protected" },
    { icon: Globe, text: "Ohio Based & Trusted" },
    { icon: Award, text: "Expert Cybersecurity Team" },
    { icon: Globe, text: "Available in English • Français • Español" },
  ];

  return (
    <div className="relative z-10 px-6 -mt-10" role="complementary" aria-label="Trust indicators">
      <div className="w-full">
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
          <div className="relative bg-gradient-to-r from-primary to-accent rounded-3xl py-5 px-6 sm:px-10 shadow-[0_12px_40px_rgba(139,92,246,0.4)] backdrop-blur-sm border border-accent/30 group-hover/trust:shadow-[0_20px_60px_rgba(139,92,246,0.6)] group-hover/trust:scale-[1.02] transition-all duration-500">
            <div className="flex justify-center items-center gap-2 sm:gap-3 md:gap-5 lg:gap-8">
            {trustIndicators.map((item, index) => (
              <div key={index} className="flex items-center gap-1.5 sm:gap-2 group animate-fade-in-up flex-shrink-0" style={{ animationDelay: `${index * 100}ms` }} role="listitem">
                <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg bg-white/30 backdrop-blur-sm flex items-center justify-center group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 group-hover:bg-white/40" aria-hidden="true">
                  <item.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white drop-shadow-md group-hover:scale-110 transition-transform duration-300" />
                </div>
                <span className="text-[10px] sm:text-xs md:text-sm font-bold text-white whitespace-nowrap drop-shadow-sm group-hover:scale-105 transition-transform duration-300">{item.text}</span>
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
