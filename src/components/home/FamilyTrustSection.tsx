import { Shield, Users, Award, CheckCircle, TrendingUp, Clock } from "lucide-react";
import familyTrustHero from "@/assets/family-trust-hero.jpg";
import familyTrustMonitoring from "@/assets/family-trust-monitoring.jpg";
import familyTrustReviews from "@/assets/family-trust-reviews.jpg";

const trustPoints = [
  { text: "24/7 Real-time monitoring & alerts", icon: Clock },
  { text: "Dedicated Ohio-based support team", icon: Users },
  { text: "10% Veteran discount on all services", icon: Shield },
  { text: "30-day money-back guarantee", icon: CheckCircle },
];

export const FamilyTrustSection = () => {
  return (
    <section className="py-14 lg:py-20 bg-gradient-to-br from-background via-lavender-50/20 to-coral-50/15 dynamic-gradient-overlay" aria-labelledby="trust-heading">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 mb-4 glass-light rounded-full micro-bounce">
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-sm font-bold text-primary uppercase tracking-wide">Real Protection, Real Results</span>
          </div>
          <h2 id="trust-heading" className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground leading-tight mb-4"
            style={{ fontFamily: "'Lora', 'Rubik', serif" }}>
            Why Families{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Trust Us
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join Ohio families who trust us with their digital safety every day.
          </p>
        </div>

        {/* Bento Grid Stats with Images */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10" role="list" aria-label="Trust statistics">
          {/* Large hero stat with image */}
          <div role="listitem" className="md:col-span-1 md:row-span-2 glass-heavy rounded-3xl overflow-hidden shadow-lg">
            <div className="relative h-48 md:h-56">
              <img src={familyTrustHero} alt="Ohio family protected by InVision Network" width={800} height={800} loading="lazy" decoding="async" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
            </div>
            <div className="p-6 text-center">
              <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center" aria-hidden="true">
                <TrendingUp className="w-7 h-7 text-primary" />
              </div>
              <div className="text-4xl font-black text-foreground mb-1" style={{ fontFamily: "'Lora', serif" }}>100+</div>
              <div className="text-sm font-medium text-muted-foreground mb-2">Ohio Families Protected</div>
              <p className="text-xs text-muted-foreground">Growing every day with trusted protection</p>
            </div>
          </div>

          {/* Monitoring stat with image */}
          <div role="listitem" className="glass-heavy rounded-3xl overflow-hidden shadow-lg">
            <div className="relative h-36">
              <img src={familyTrustMonitoring} alt="Professional cybersecurity monitoring support" width={640} height={640} loading="lazy" decoding="async" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
            </div>
            <div className="p-5 text-center">
              <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-gradient-to-br from-accent/20 to-coral-200/30 flex items-center justify-center" aria-hidden="true">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <div className="text-3xl font-black text-foreground" style={{ fontFamily: "'Lora', serif" }}>24/7</div>
              <div className="text-sm font-medium text-muted-foreground">Monitoring & Alerts</div>
            </div>
          </div>

          {/* Client-Reviewed stat with image */}
          <div role="listitem" className="glass-heavy rounded-3xl overflow-hidden shadow-lg">
            <div className="relative h-36">
              <img src={familyTrustReviews} alt="Satisfied clients reviewing results" width={640} height={640} loading="lazy" decoding="async" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
            </div>
            <div className="p-5 text-center">
              <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-gradient-to-br from-success/20 to-teal-200/30 flex items-center justify-center" aria-hidden="true">
                <Award className="w-6 h-6 text-primary" />
              </div>
              <div className="text-3xl font-black text-foreground" style={{ fontFamily: "'Lora', serif" }}>Client-Reviewed</div>
              <div className="text-sm font-medium text-muted-foreground">Trusted Feedback</div>
            </div>
          </div>
        </div>

        {/* Trust Points */}
        <div className="glass-heavy rounded-2xl p-6 lg:p-8" role="list" aria-label="Trust guarantees">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {trustPoints.map((point, i) => (
              <div key={i} className="glass-light rounded-xl p-4" role="listitem">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0">
                    <point.icon className="w-5 h-5 text-primary" aria-hidden="true" />
                  </div>
                  <span className="text-foreground/90 text-sm font-medium">{point.text}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
