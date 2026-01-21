import { Star, Shield, Award } from "lucide-react";

const experts = [
  { name: "Security Expert", role: "Lead Trainer" },
  { name: "Tech Specialist", role: "AI Advisor" },
  { name: "Community Guide", role: "Outreach" },
  { name: "Family Coach", role: "Support" },
];

const avatarColors = [
  "from-primary to-accent",
  "from-emerald-500 to-teal-500", 
  "from-amber-500 to-orange-500",
  "from-rose-500 to-pink-500",
];

export const TrustedExpertsBar = () => {
  return (
    <section className="py-10 bg-muted/30 border-y border-border/30">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Left - Avatar Stack with Rating */}
          <div className="flex items-center gap-5 animate-fade-in">
            <div className="flex -space-x-3">
              {experts.map((expert, index) => (
                <div
                  key={index}
                  className={`w-14 h-14 rounded-full bg-gradient-to-br ${avatarColors[index]} border-3 border-white shadow-lg flex items-center justify-center`}
                  style={{ zIndex: experts.length - index }}
                >
                  <span className="text-white font-bold text-lg">
                    {expert.name.charAt(0)}
                  </span>
                </div>
              ))}
            </div>
            <div>
              <div className="flex items-center gap-1.5 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-muted-foreground">Trusted by Ohio Families</p>
            </div>
          </div>

          {/* Center - Feature Pills */}
          <div className="flex flex-wrap justify-center gap-3 animate-fade-in" style={{ animationDelay: "100ms" }}>
            {[
              { icon: Shield, label: "Verified Experts", num: "01" },
              { icon: Award, label: "Ohio Certified", num: "02" },
              { icon: Star, label: "Top Rated", num: "03" },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-2.5 px-5 py-2.5 bg-white rounded-full border border-border/50 shadow-sm hover:shadow-md transition-shadow"
              >
                <span className="text-xs font-bold text-primary bg-primary/10 w-6 h-6 rounded-full flex items-center justify-center">{item.num}</span>
                <item.icon className="w-4 h-4 text-primary" />
                <span className="font-medium">{item.label}</span>
              </div>
            ))}
          </div>

          {/* Right - Stats */}
          <div className="flex items-center gap-8 animate-fade-in" style={{ animationDelay: "200ms" }}>
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">17%</p>
              <p className="text-sm text-muted-foreground">Veteran Discount</p>
            </div>
            <div className="w-px h-12 bg-border" />
            <div className="text-center">
              <p className="text-3xl font-bold text-foreground">60</p>
              <p className="text-sm text-muted-foreground">Day Guarantee</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};