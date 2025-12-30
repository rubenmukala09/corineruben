import { motion } from "framer-motion";
import { Check, X, Star, Shield, Users, Crown, ArrowRight, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import familyProtection from "@/assets/family-protection.jpg";

const plans = [
  {
    name: "Starter",
    price: "$39",
    period: "/month",
    description: "Essential protection for individuals",
    icon: Shield,
    gradient: "from-slate-500 to-slate-600",
    borderGradient: "border-slate-500/30",
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
  },
  {
    name: "Family",
    price: "$79",
    period: "/month",
    description: "Complete family protection",
    icon: Users,
    gradient: "from-primary to-accent",
    borderGradient: "border-primary",
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
  },
  {
    name: "Premium",
    price: "$129",
    period: "/month",
    description: "Maximum security & peace of mind",
    icon: Crown,
    gradient: "from-amber-500 to-orange-500",
    borderGradient: "border-amber-500/50",
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
  }
];

export const ProtectionComparison = () => {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background with family image */}
      <div className="absolute inset-0">
        <img 
          src={familyProtection} 
          alt="" 
          className="w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/98 to-background" />
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-accent/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div 
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 border border-primary/20 mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">Protection Plans</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Choose Your{" "}
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Shield
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Every plan includes our award-winning ScamShield AI technology. 
            <span className="text-foreground font-medium"> Pick the protection level that fits your life.</span>
          </p>
        </motion.div>

        {/* Plans Grid */}
        <div className="grid lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="relative group"
            >
              {/* Popular badge */}
              {plan.popular && (
                <motion.div 
                  className="absolute -top-5 left-1/2 -translate-x-1/2 z-20"
                  initial={{ y: -20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                >
                  <Badge className="bg-gradient-to-r from-primary to-accent text-primary-foreground px-6 py-2 text-sm font-bold shadow-2xl shadow-primary/30">
                    <Star className="w-4 h-4 mr-1.5 fill-current" />
                    Most Popular
                  </Badge>
                </motion.div>
              )}
              
              <Card className={`relative h-full overflow-hidden border-2 transition-all duration-500 ${
                plan.popular 
                  ? `${plan.borderGradient} shadow-2xl shadow-primary/20 scale-105 lg:scale-110` 
                  : `${plan.borderGradient} hover:border-primary/40 hover:shadow-xl`
              }`}>
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${plan.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                
                <div className="relative z-10 p-8">
                  {/* Icon & Name */}
                  <div className="flex items-center gap-4 mb-6">
                    <motion.div 
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br ${plan.gradient} shadow-lg`}
                      whileHover={{ rotate: 12, scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <plan.icon className="w-7 h-7 text-white" />
                    </motion.div>
                    <div>
                      <h3 className="text-2xl font-bold">{plan.name}</h3>
                      <p className="text-sm text-muted-foreground">{plan.description}</p>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mb-8">
                    <div className="flex items-baseline gap-1">
                      <span className={`text-5xl font-bold bg-gradient-to-r ${plan.gradient} bg-clip-text text-transparent`}>
                        {plan.price}
                      </span>
                      <span className="text-muted-foreground text-lg">{plan.period}</span>
                    </div>
                    {plan.popular && (
                      <p className="text-sm text-primary mt-2 font-medium">Save $228/year with annual billing</p>
                    )}
                  </div>
                  
                  {/* Features */}
                  <div className="space-y-4 mb-8">
                    {plan.features.map((feature, fIndex) => (
                      <motion.div 
                        key={fIndex} 
                        className="flex items-center gap-3"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + fIndex * 0.05 }}
                      >
                        {feature.included ? (
                          <div className="w-6 h-6 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0">
                            <Check className="w-4 h-4 text-green-500" />
                          </div>
                        ) : (
                          <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                            <X className="w-4 h-4 text-muted-foreground/50" />
                          </div>
                        )}
                        <span className={`text-sm ${feature.included ? 'text-foreground' : 'text-muted-foreground/60'}`}>
                          {feature.name}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                  
                  {/* CTA Button */}
                  <Button 
                    asChild 
                    size="lg"
                    className={`w-full group/btn ${
                      plan.popular 
                        ? 'bg-gradient-to-r from-primary to-accent hover:opacity-90' 
                        : 'bg-gradient-to-r from-muted to-muted/80 text-foreground hover:from-primary/20 hover:to-accent/20'
                    }`}
                  >
                    <Link to="/training#pricing">
                      {plan.cta}
                      <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>

                {/* Shine effect on popular */}
                {plan.popular && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
                    animate={{ x: ["-200%", "200%"] }}
                    transition={{ duration: 3, repeat: Infinity, repeatDelay: 5 }}
                  />
                )}
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="inline-flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" />
              60-day money-back guarantee
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
