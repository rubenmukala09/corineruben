import { Star, Shield, Award, CheckCircle, Users, Sparkles } from "lucide-react";

const experts = [
  { name: "Security Expert", initial: "S" },
  { name: "Tech Specialist", initial: "T" },
  { name: "Community Guide", initial: "C" },
  { name: "Family Coach", initial: "F" },
  { name: "AI Advisor", initial: "A" },
];

const features = [
  { icon: Shield, label: "Verified Experts", num: "01" },
  { icon: Award, label: "Ohio Certified", num: "02" },
  { icon: CheckCircle, label: "5-Star Rated", num: "03" },
];

export const TrustedExpertsBar = () => {
  return (
    <section className="relative py-6 overflow-hidden" 
      style={{ 
        background: 'linear-gradient(135deg, #0a0a0f 0%, #12081a 50%, #0a0a0f 100%)',
        borderTop: '1px solid rgba(248,146,106,0.1)',
        borderBottom: '1px solid rgba(139,92,246,0.1)'
      }}>
      {/* Subtle glow accents */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-40 h-40 rounded-full opacity-30"
        style={{ background: 'radial-gradient(circle, rgba(248,146,106,0.4) 0%, transparent 70%)', filter: 'blur(40px)' }} />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-40 h-40 rounded-full opacity-30"
        style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.4) 0%, transparent 70%)', filter: 'blur(40px)' }} />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Left - Avatar Stack with Rating */}
          <div className="flex items-center gap-5">
            <div className="flex -space-x-3">
              {experts.map((expert, index) => (
                <div key={index} className="w-11 h-11 rounded-full flex items-center justify-center transition-transform hover:scale-110 hover:z-10"
                  style={{ 
                    zIndex: experts.length - index,
                    background: `linear-gradient(135deg, ${index % 2 === 0 ? 'rgba(248,146,106,0.9)' : 'rgba(139,92,246,0.8)'} 0%, ${index % 2 === 0 ? 'rgba(246,215,221,0.9)' : 'rgba(187,129,181,0.8)'} 100%)`,
                    border: '2px solid rgba(10,10,15,0.8)',
                    boxShadow: '0 0 15px rgba(248,146,106,0.2)'
                  }}>
                  <span className="text-[#050508] font-bold text-sm">{expert.initial}</span>
                </div>
              ))}
            </div>
            <div>
              <div className="flex items-center gap-1 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-coral-400 text-coral-400" style={{ filter: 'drop-shadow(0 0 4px rgba(248,146,106,0.5))' }} />
                ))}
                <span className="ml-2 text-sm font-bold text-coral-400">5.0</span>
              </div>
              <p className="text-white/70 text-sm font-medium">Trusted by 500+ Ohio Families</p>
            </div>
          </div>

          {/* Center - Premium Feature Pills */}
          <div className="flex flex-wrap justify-center gap-3">
            {features.map((item, index) => (
              <div key={index} className="flex items-center gap-3 px-5 py-2.5 rounded-full cursor-default group"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  backdropFilter: 'blur(10px)'
                }}>
                <span className="text-[10px] font-bold rounded-full w-6 h-6 flex items-center justify-center"
                  style={{ 
                    background: 'linear-gradient(135deg, rgba(248,146,106,0.3) 0%, rgba(139,92,246,0.2) 100%)',
                    color: 'rgba(248,146,106,0.9)'
                  }}>{item.num}</span>
                <item.icon className="w-4 h-4 text-white/60 group-hover:text-coral-400 transition-colors" />
                <span className="font-medium text-sm text-white/80">{item.label}</span>
              </div>
            ))}
          </div>

          {/* Right - Stats Cards */}
          <div className="flex items-center gap-4">
            <div className="text-center px-5 py-3 rounded-2xl"
              style={{
                background: 'linear-gradient(135deg, rgba(248,146,106,0.15) 0%, rgba(248,146,106,0.05) 100%)',
                border: '1px solid rgba(248,146,106,0.2)',
                boxShadow: '0 0 30px rgba(248,146,106,0.1)'
              }}>
              <p className="text-2xl font-black text-coral-400" style={{ textShadow: '0 0 20px rgba(248,146,106,0.5)' }}>10%</p>
              <p className="text-[11px] text-white/60 font-medium">Veteran Discount</p>
            </div>
            <div className="text-center px-5 py-3 rounded-2xl"
              style={{
                background: 'linear-gradient(135deg, rgba(139,92,246,0.15) 0%, rgba(139,92,246,0.05) 100%)',
                border: '1px solid rgba(139,92,246,0.2)',
                boxShadow: '0 0 30px rgba(139,92,246,0.1)'
              }}>
              <p className="text-2xl font-black text-violet-400" style={{ textShadow: '0 0 20px rgba(139,92,246,0.5)' }}>60</p>
              <p className="text-[11px] text-white/60 font-medium">Day Guarantee</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};