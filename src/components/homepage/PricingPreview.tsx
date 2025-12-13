import { Link } from "react-router-dom";
import { Check, Zap, Users, Building2 } from "lucide-react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const tiers = [
  {
    name: "Pay-Per-Check",
    icon: Zap,
    price: "Free",
    period: "first 3 checks",
    description: "Try our AI analysis with no commitment",
    features: ["AI scam detection", "Instant results", "Basic threat report"],
    cta: "Start Free",
    link: "/training",
    popular: false,
  },
  {
    name: "Membership",
    icon: Users,
    price: "$39",
    period: "/month",
    description: "Complete protection for families",
    features: [
      "Unlimited scam checks",
      "24/7 expert support",
      "Deepfake detection",
      "Family training access",
      "Emergency response scripts",
    ],
    cta: "Join Now",
    link: "/training",
    popular: true,
  },
  {
    name: "Groups & Business",
    icon: Building2,
    price: "Custom",
    period: "pricing",
    description: "Enterprise-grade protection",
    features: [
      "Volume discounts",
      "Dedicated account manager",
      "Custom training programs",
      "API access",
    ],
    cta: "Contact Sales",
    link: "/business",
    popular: false,
  },
];

export const PricingPreview = () => {
  return (
    <section className="py-20 md:py-28 bg-background relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-4">
            Simple Pricing
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Plans for Every Need
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Start free, upgrade when you're ready for complete protection.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card
                className={`relative h-full border-0 rounded-2xl p-8 transition-all duration-300 hover:-translate-y-2 ${
                  tier.popular
                    ? "bg-gradient-to-br from-primary to-primary/90 text-primary-foreground shadow-strong"
                    : "bg-card shadow-soft hover:shadow-medium"
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-accent text-accent-foreground text-xs font-bold uppercase">
                    Most Popular
                  </div>
                )}

                <div className={`w-12 h-12 rounded-xl ${tier.popular ? "bg-primary-foreground/20" : "bg-gradient-to-br from-primary/10 to-accent/10"} flex items-center justify-center mb-5`}>
                  <tier.icon className={`w-6 h-6 ${tier.popular ? "text-primary-foreground" : "text-primary"}`} />
                </div>

                <h3 className={`text-xl font-bold mb-2 ${tier.popular ? "" : "text-foreground"}`}>
                  {tier.name}
                </h3>

                <div className="mb-4">
                  <span className={`text-4xl font-bold ${tier.popular ? "" : "text-foreground"}`}>
                    {tier.price}
                  </span>
                  <span className={tier.popular ? "text-primary-foreground/80" : "text-muted-foreground"}>
                    {tier.period}
                  </span>
                </div>

                <p className={`text-sm mb-6 ${tier.popular ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                  {tier.description}
                </p>

                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm">
                      <Check className={`w-4 h-4 flex-shrink-0 ${tier.popular ? "text-accent" : "text-success"}`} />
                      <span className={tier.popular ? "text-primary-foreground/90" : "text-muted-foreground"}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button
                  asChild
                  className={`w-full rounded-xl h-11 font-semibold ${
                    tier.popular
                      ? "bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                      : "bg-primary text-primary-foreground hover:bg-primary/90"
                  }`}
                >
                  <Link to={tier.link}>{tier.cta}</Link>
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
