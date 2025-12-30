import { motion } from "framer-motion";
import { Check, X, Star, Shield, Users, Building2, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

const plans = [
  {
    name: "Starter",
    price: "$39",
    period: "/month",
    description: "Essential protection for individuals",
    icon: Shield,
    features: [
      { name: "ScamShield AI Protection", included: true },
      { name: "Email & SMS Monitoring", included: true },
      { name: "Weekly Security Reports", included: true },
      { name: "24/7 Support", included: false },
      { name: "Family Members (up to 5)", included: false },
      { name: "Identity Theft Insurance", included: false },
    ],
    cta: "Get Started",
    popular: false,
    color: "border-border"
  },
  {
    name: "Family",
    price: "$79",
    period: "/month",
    description: "Complete family protection",
    icon: Users,
    features: [
      { name: "ScamShield AI Protection", included: true },
      { name: "Email & SMS Monitoring", included: true },
      { name: "Daily Security Reports", included: true },
      { name: "24/7 Priority Support", included: true },
      { name: "Family Members (up to 5)", included: true },
      { name: "Identity Theft Insurance", included: false },
    ],
    cta: "Protect My Family",
    popular: true,
    color: "border-primary"
  },
  {
    name: "Premium",
    price: "$129",
    period: "/month",
    description: "Maximum security & peace of mind",
    icon: Star,
    features: [
      { name: "ScamShield AI Protection", included: true },
      { name: "Email & SMS Monitoring", included: true },
      { name: "Real-Time Security Alerts", included: true },
      { name: "24/7 VIP Support", included: true },
      { name: "Family Members (Unlimited)", included: true },
      { name: "$1M Identity Theft Insurance", included: true },
    ],
    cta: "Get Premium",
    popular: false,
    color: "border-amber-500"
  }
];

export const ProtectionComparison = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background via-muted/20 to-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">Protection Plans</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Choose Your Level of{" "}
            <span className="text-primary">Protection</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            All plans include our award-winning ScamShield AI technology. Pick the one that fits your needs.
          </p>
        </motion.div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                  <Badge className="bg-primary text-primary-foreground px-4 py-1 text-sm font-semibold shadow-lg">
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <Card className={`p-6 h-full flex flex-col border-2 ${plan.color} ${
                plan.popular ? 'shadow-xl shadow-primary/10 scale-105' : 'hover:shadow-lg'
              } transition-all duration-300 bg-card`}>
                <div className="text-center mb-6">
                  <div className={`w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center ${
                    plan.popular ? 'bg-primary/10' : 'bg-muted'
                  }`}>
                    <plan.icon className={`w-7 h-7 ${plan.popular ? 'text-primary' : 'text-muted-foreground'}`} />
                  </div>
                  <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                </div>
                
                <div className="flex-1 space-y-3 mb-6">
                  {plan.features.map((feature, fIndex) => (
                    <div key={fIndex} className="flex items-center gap-3">
                      {feature.included ? (
                        <div className="w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0">
                          <Check className="w-3 h-3 text-green-500" />
                        </div>
                      ) : (
                        <div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                          <X className="w-3 h-3 text-muted-foreground" />
                        </div>
                      )}
                      <span className={`text-sm ${feature.included ? 'text-foreground' : 'text-muted-foreground'}`}>
                        {feature.name}
                      </span>
                    </div>
                  ))}
                </div>
                
                <Button 
                  asChild 
                  variant={plan.popular ? "default" : "outline"}
                  className="w-full"
                  size="lg"
                >
                  <Link to="/training#pricing">
                    {plan.cta}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Business CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-muted/50 border border-border">
            <Building2 className="w-5 h-5 text-primary" />
            <span className="text-muted-foreground">Need enterprise protection?</span>
            <Button asChild variant="link" className="p-0 h-auto font-semibold">
              <Link to="/business">Get a custom quote →</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
