import { Check, X, Shield, Users, Crown, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const plans = [
  {
    name: "Starter",
    price: "$39",
    period: "/month",
    description: "Essential protection for individuals",
    icon: Shield,
    popular: false,
    accent: "from-primary/20 to-primary/5",
    features: [
      { name: "ScamShield AI Protection", included: true },
      { name: "Email & SMS Monitoring", included: true },
      { name: "Weekly Security Reports", included: true },
      { name: "24/7 Support", included: false },
      { name: "Family Members (up to 5)", included: false },
      { name: "Identity Theft Insurance", included: false },
    ],
  },
  {
    name: "Family",
    price: "$79",
    period: "/month",
    description: "Complete family protection",
    icon: Users,
    popular: true,
    accent: "from-primary/30 to-accent/10",
    features: [
      { name: "ScamShield AI Protection", included: true },
      { name: "Email & SMS Monitoring", included: true },
      { name: "Daily Security Reports", included: true },
      { name: "24/7 Priority Support", included: true },
      { name: "Family Members (up to 5)", included: true },
      { name: "Identity Theft Insurance", included: false },
    ],
  },
  {
    name: "Premium",
    price: "$129",
    period: "/month",
    description: "Maximum security & peace of mind",
    icon: Crown,
    popular: false,
    accent: "from-accent/20 to-primary/5",
    features: [
      { name: "ScamShield AI Protection", included: true },
      { name: "Email & SMS Monitoring", included: true },
      { name: "Real-Time Security Alerts", included: true },
      { name: "24/7 VIP Support", included: true },
      { name: "Family Members (Unlimited)", included: true },
      { name: "$1M Identity Theft Insurance", included: true },
    ],
  },
];

export const ProtectionComparison = () => {
  return (
    <section className="py-20 md:py-28 bg-background relative overflow-hidden">
      {/* Ambient glow orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-primary/[0.04] blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-64 h-64 rounded-full bg-accent/[0.06] blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-6 shadow-sm border border-primary/15 bg-primary/5">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span className="text-primary">Protection Plans</span>
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-4 tracking-tight">
            Choose Your <span className="text-primary">Shield</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Every plan includes our award-winning ScamShield AI technology. Pick
            the protection level that fits your life.
          </p>
        </div>

        {/* Plans Grid — 3D Glassmorphic Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto mb-14" style={{ perspective: "800px" }}>
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative group transition-all duration-500 hover:-translate-y-2 ${plan.popular ? "md:-translate-y-3" : ""}`}
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                  <span className="bg-gradient-to-r from-primary to-accent text-white px-5 py-1.5 rounded-full text-xs font-bold shadow-lg shadow-primary/25 uppercase tracking-wider">
                    Most Popular
                  </span>
                </div>
              )}

              <div
                className={`h-full rounded-2xl p-[1px] transition-all duration-500 ${
                  plan.popular
                    ? "bg-gradient-to-b from-primary/40 via-primary/20 to-accent/20 shadow-2xl shadow-primary/15"
                    : "bg-gradient-to-b from-border/60 to-border/20 shadow-lg hover:shadow-xl group-hover:from-primary/30 group-hover:to-primary/10"
                }`}
              >
                <div className="h-full rounded-[calc(1rem-1px)] bg-card/95 backdrop-blur-xl p-7 flex flex-col relative overflow-hidden">
                  {/* Gradient accent bar */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${plan.accent}`} />

                  {/* Inner ambient glow */}
                  {plan.popular && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 bg-primary/[0.06] rounded-full blur-3xl pointer-events-none" />
                  )}

                  {/* Icon & Name */}
                  <div className="text-center mb-6 relative z-10">
                    <div
                      className={`w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${
                        plan.popular
                          ? "bg-gradient-to-br from-primary to-accent shadow-lg shadow-primary/20"
                          : "bg-primary/10"
                      }`}
                    >
                      <plan.icon
                        className={`w-7 h-7 ${
                          plan.popular ? "text-white" : "text-primary"
                        }`}
                      />
                    </div>
                    <h3 className="text-2xl font-black text-foreground tracking-tight">
                      {plan.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {plan.description}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="text-center mb-8 relative z-10">
                    <span className="text-5xl font-black bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent">
                      {plan.price}
                    </span>
                    <span className="text-muted-foreground text-sm ml-1">{plan.period}</span>
                  </div>

                  {/* Features */}
                  <div className="space-y-3 mb-8 flex-1 relative z-10">
                    {plan.features.map((feature, fIndex) => (
                      <div key={fIndex} className="flex items-center gap-3">
                        {feature.included ? (
                          <div className="w-5 h-5 rounded-full bg-emerald-500/15 flex items-center justify-center flex-shrink-0">
                            <Check className="w-3 h-3 text-emerald-600" />
                          </div>
                        ) : (
                          <div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                            <X className="w-3 h-3 text-muted-foreground/40" />
                          </div>
                        )}
                        <span
                          className={`text-sm ${
                            feature.included
                              ? "text-foreground font-medium"
                              : "text-muted-foreground/50"
                          }`}
                        >
                          {feature.name}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <Button
                    asChild
                    size="lg"
                    className={`w-full rounded-xl font-bold relative z-10 ${
                      plan.popular
                        ? "bg-gradient-to-r from-primary to-accent text-white hover:opacity-90 shadow-lg shadow-primary/20"
                        : ""
                    }`}
                    variant={plan.popular ? "default" : "outline"}
                  >
                    <Link to="/training#pricing">
                      Get Started — {plan.price}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust badges */}
        <div className="text-center">
          <div className="inline-flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600" />
              30-day money-back guarantee
            </span>
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600" />
              Cancel anytime
            </span>
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600" />
              No credit card required for trial
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
