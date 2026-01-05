import { Shield, Clock, Users, Award } from "lucide-react";

const features = [
  { num: "01", title: "Expert Training", icon: Shield },
  { num: "02", title: "24/7 Protection", icon: Clock },
  { num: "03", title: "Family Support", icon: Users },
  { num: "04", title: "Certified Team", icon: Award },
];

export const NumberedFeatures = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {features.map((feature) => (
            <div
              key={feature.num}
              className="bg-white rounded-3xl p-8 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] border border-white/50 transition-all duration-400 ease-out hover:translate-y-[-8px] hover:scale-[1.02] hover:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.12)]"
            >
              <div className="flex items-start gap-3">
                <span className="text-3xl font-bold text-primary/40">{feature.num}</span>
                <div className="pt-1">
                  <feature.icon className="w-5 h-5 text-primary mb-2" />
                  <h3 className="font-semibold text-foreground text-sm">{feature.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};