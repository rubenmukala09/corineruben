import { Shield, Award, Clock, Heart, CheckCircle2, Zap, MapPin } from "lucide-react";
import { SITE } from "@/config/site";

const trustIndicators = [
  {
    icon: Shield,
    title: "Veteran-Founded",
    description:
      "Built by veterans who understand the importance of protecting what matters.",
  },
  {
    icon: MapPin,
    title: "Ohio-Based",
    description: `Local, personalized cybersecurity for ${SITE.location.areaLabel}.`,
  },
  {
    icon: Clock,
    title: "24/7 Human Support",
    description: "Real people ready to help when you need us. No bots.",
  },
  {
    icon: Heart,
    title: "Family-First",
    description:
      "Every client is part of our extended family. Your safety is personal.",
  },
];

const guarantees = [
  `${SITE.moneyBackGuaranteeDays}-Day Money-Back Guarantee`,
  "Privacy-First Practices",
  `${SITE.veteranDiscountPercent}% Veteran & Senior Discount`,
  "Same-Day Threat Response",
];

export const TrustBadgesSection = () => {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary mb-4">
            Why Choose Us
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Built on Trust & Integrity
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            We're your neighbors, committed to keeping Ohio families safe.
          </p>
        </div>

        {/* Trust Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {trustIndicators.map((item) => (
            <div
              key={item.title}
              className="p-6 rounded-lg border border-border/60 bg-card text-center hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <item.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-base font-bold text-foreground mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Guarantees Bar */}
        <div className="rounded-lg border border-border/60 bg-card p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {guarantees.map((text) => (
              <div key={text} className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-sm font-medium text-foreground">
                  {text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
