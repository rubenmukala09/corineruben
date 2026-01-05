import { Shield, Clock, Users, Award } from "lucide-react";

const features = [
  { num: "01", title: "Expert Training", icon: Shield },
  { num: "02", title: "24/7 Protection", icon: Clock },
  { num: "03", title: "Family Support", icon: Users },
  { num: "04", title: "Certified Team", icon: Award },
];

export const NumberedFeatures = () => {
  return (
    <section className="py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {features.map((feature) => (
            <div
              key={feature.num}
              className="bg-background rounded-xl p-6 shadow-sm border border-border/50 hover:shadow-md transition-shadow"
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
