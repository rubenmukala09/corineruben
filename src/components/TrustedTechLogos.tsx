import { Shield, Users, Award, Zap } from "lucide-react";

const stats = [
  { value: "500+", label: "Families Protected", icon: Shield },
  { value: "98%", label: "Success Rate", icon: Award },
  { value: "24/7", label: "AI Monitoring", icon: Zap },
  { value: "50+", label: "Partners", icon: Users },
];

const techPartners = [
  "OpenAI",
  "Google AI", 
  "Microsoft Azure",
  "Amazon AWS",
  "IBM Watson",
  "Anthropic",
  "Meta AI",
  "NVIDIA",
  "Cloudflare",
  "Stripe"
];

const TrustedTechLogos = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Stats Bar - Brighter gradient */}
      <div className="bg-gradient-to-r from-indigo-900 via-purple-800 to-indigo-900 border-y border-white/20">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div 
                  key={index}
                  className="flex items-center justify-center gap-4 group"
                >
                  <div className="p-3 rounded-xl bg-gradient-to-br from-white/20 to-white/5 border border-white/20 group-hover:from-white/30 group-hover:to-white/10 transition-all duration-300 shadow-lg">
                    <IconComponent className="w-6 h-6 text-cyan-300" />
                  </div>
                  <div className="text-left">
                    <div className="text-2xl md:text-3xl font-bold text-white">
                      {stat.value}
                    </div>
                    <div className="text-sm text-white/70 font-medium">
                      {stat.label}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tech Partners Marquee - Lighter background */}
      <div className="bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 py-5 border-b border-white/10">
        <div className="relative overflow-hidden">
          {/* Gradient Edges */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-800 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-800 to-transparent z-10 pointer-events-none" />
          
          <div className="flex animate-scroll-left items-center">
            {[...techPartners, ...techPartners, ...techPartners].map((name, index) => (
              <div
                key={index}
                className="flex-shrink-0 mx-10 flex items-center gap-3"
              >
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-400 to-primary" />
                <span className="text-base font-medium text-white/70 hover:text-white transition-colors duration-300 whitespace-nowrap tracking-wide">
                  {name}
                </span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Trust Badge */}
        <div className="text-center mt-4">
          <p className="text-xs text-white/50 tracking-widest uppercase flex items-center justify-center gap-3">
            <Shield className="w-3.5 h-3.5 text-emerald-400" />
            <span>Enterprise Security</span>
            <span className="text-white/30">•</span>
            <span>SOC 2 Compliant</span>
            <span className="text-white/30">•</span>
            <span>Bank-Level Encryption</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default TrustedTechLogos;
