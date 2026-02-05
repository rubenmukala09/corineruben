import { Star, Shield, Award } from "lucide-react";
import { TrendingUp, Users, CheckCircle } from "lucide-react";

const experts = [
  { name: "Security Expert", role: "Lead Trainer" },
  { name: "Tech Specialist", role: "AI Advisor" },
  { name: "Community Guide", role: "Outreach" },
  { name: "Family Coach", role: "Support" },
];

const avatarColors = [
  "from-coral-500 to-coral-400",
  "from-lavender-500 to-lavender-400", 
  "from-navy-500 to-navy-400",
  "from-teal-500 to-teal-400",
];

export const TrustedExpertsBar = () => {
  return (
    <section className="py-12 bg-gradient-to-r from-coral-100/50 via-blush-300/30 to-lavender-100/50 border-y border-coral-200/50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Left - Avatar Stack with Rating */}
          <div className="flex items-center gap-6 animate-fade-in">
            <div className="flex -space-x-4">
              {experts.map((expert, index) => (
                <div
                  key={index}
                  className={`w-14 h-14 rounded-full bg-gradient-to-br ${avatarColors[index]} border-[3px] border-white shadow-lg flex items-center justify-center ring-2 ring-coral-200/50`}
                  style={{ zIndex: experts.length - index }}
                >
                  <span className="text-white font-bold text-lg">
                    {expert.name.charAt(0)}
                  </span>
                </div>
              ))}
            </div>
            <div>
              <div className="flex items-center gap-1.5 mb-1.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-coral-500 text-coral-500" />
                ))}
                <span className="ml-2 text-sm font-bold text-coral-600">5.0</span>
              </div>
              <p className="text-navy-700 text-lg font-semibold">Trusted by Ohio Families</p>
            </div>
          </div>

          {/* Center - Premium Feature Pills */}
          <div className="flex flex-wrap justify-center gap-3 animate-fade-in" style={{ animationDelay: "100ms" }}>
            {[
              { icon: Shield, label: "Verified Experts", num: "01", color: "bg-navy-600" },
              { icon: Award, label: "Ohio Certified", num: "02", color: "bg-lavender-500" },
              { icon: CheckCircle, label: "Top Rated", num: "03", color: "bg-coral-500" },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 px-6 py-3.5 bg-white rounded-2xl border border-coral-200/50 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
              >
                <span className={`text-xs font-bold text-white ${item.color} w-7 h-7 rounded-full flex items-center justify-center`}>{item.num}</span>
                <item.icon className="w-5 h-5 text-navy-600" />
                <span className="font-bold text-lg text-navy-800">{item.label}</span>
              </div>
            ))}
          </div>

          {/* Right - Premium Stats Cards */}
          <div className="flex items-center gap-6 animate-fade-in" style={{ animationDelay: "200ms" }}>
            <div className="text-center p-4 bg-gradient-to-br from-coral-500 to-coral-400 rounded-2xl shadow-lg shadow-coral-300/30">
              <p className="text-3xl font-black text-white">17%</p>
              <p className="text-xs text-white/90 font-semibold">Veteran Discount</p>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-navy-600 to-navy-500 rounded-2xl shadow-lg shadow-navy-300/30">
              <p className="text-3xl font-black text-white">60</p>
              <p className="text-xs text-white/90 font-semibold">Day Guarantee</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};