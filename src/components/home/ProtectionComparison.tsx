import { motion } from "framer-motion";
import { Check, X, Shield, Users, Crown, ArrowRight } from "lucide-react";
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
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 left-20 w-40 h-40 rounded-full bg-primary/5" />
      <div className="absolute bottom-20 right-10 w-32 h-32 rounded-full bg-accent/10" />
      <div className="absolute top-1/2 right-1/4 w-20 h-20 rounded-full bg-primary/10" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wider mb-4 block">
            Protection Plans
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Choose Your <span className="text-primary">Shield</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Every plan includes our award-winning ScamShield AI technology. Pick
            the protection level that fits your life.
          </p>
        </motion.div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                  <span className="bg-accent text-accent-foreground px-4 py-1.5 rounded-full text-sm font-bold shadow-lg">
                    Most Popular
                  </span>
                </div>
              )}

              <div
                className={`h-full min-h-[520px] rounded-2xl border-2 p-8 transition-all duration-300 flex flex-col ${
                  plan.popular
                    ? "bg-card border-primary shadow-xl scale-105"
                    : "bg-card border-border hover:border-primary/30 hover:shadow-lg"
                }`}
              >
                {/* Icon & Name */}
                <div className="text-center mb-6">
                  <div
                    className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center ${
                      plan.popular ? "bg-primary" : "bg-primary/10"
                    }`}
                  >
                    <plan.icon
                      className={`w-8 h-8 ${
                        plan.popular
                          ? "text-primary-foreground"
                          : "text-primary"
                      }`}
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">
                    {plan.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {plan.description}
                  </p>
                </div>

                {/* Price */}
                <div className="text-center mb-8">
                  <span className="text-4xl font-bold text-primary">
                    {plan.price}
                  </span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>

                {/* Features */}
                <div className="space-y-3 mb-8">
                  {plan.features.map((feature, fIndex) => (
                    <div key={fIndex} className="flex items-center gap-3">
                      {feature.included ? (
                        <div className="w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0">
                          <Check className="w-3 h-3 text-green-500" />
                        </div>
                      ) : (
                        <div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                          <X className="w-3 h-3 text-muted-foreground/50" />
                        </div>
                      )}
                      <span
                        className={`text-sm ${
                          feature.included
                            ? "text-foreground"
                            : "text-muted-foreground/60"
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
                  variant={plan.popular ? "default" : "outline"}
                  className="w-full"
                >
                  <Link to="/training#pricing">
                    Get Started
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="inline-flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" />
              30-day money-back guarantee
            </span>
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" />
              Cancel anytime
            </span>
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" />
              No credit card required for trial
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
