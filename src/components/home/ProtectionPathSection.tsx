import { Link } from "react-router-dom";
import { CheckCircle, ShieldCheck, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SCAMSHIELD_PLANS } from "@/config/products";
import { SITE } from "@/config/site";

const formatPrice = (price: number, interval?: string) => {
  const formatted = price.toLocaleString(undefined, {
    minimumFractionDigits: 0,
  });
  return interval ? `$${formatted}/${interval}` : `$${formatted}`;
};

export const ProtectionPathSection = () => {
  return (
    <section
      id="get-protected"
      className="py-16 lg:py-20 bg-gradient-to-b from-background via-background to-muted/30 dynamic-gradient-overlay"
    >
      <div className="absolute -top-16 right-10 w-40 h-40 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 blur-3xl opacity-60 fluid-motion" />
      <div className="absolute bottom-0 left-16 w-32 h-32 rounded-full bg-gradient-to-br from-accent/20 to-primary/20 blur-3xl opacity-50 fluid-motion" />
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-10">
          <Badge className="mb-4 px-4 py-1.5 text-xs tracking-wide bg-primary/10 text-primary border border-primary/20 skeuo-badge">
            <ShieldCheck className="w-4 h-4 mr-2" />
            Choose Your Protection Level
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Start Safe in Minutes
          </h2>
          <p className="text-muted-foreground text-base md:text-lg">
            Pick the protection plan that matches your family or business.
            Upgrade anytime. {SITE.moneyBackGuaranteeDays}-day guarantee
            included.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {SCAMSHIELD_PLANS.map((plan) => (
            <Card
              key={plan.id}
              className={`relative overflow-hidden border border-white/30 bg-white/60 dark:bg-card/60 backdrop-blur-xl shadow-xl transition-transform duration-300 hover:-translate-y-1 neumorphism-card micro-tilt-3d subtle-3d-surface ${
                plan.popular ? "ring-2 ring-primary/40" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute right-4 top-4">
                  <Badge variant="premium">
                    <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                    Most Popular
                  </Badge>
                </div>
              )}

              <div className="p-6 flex flex-col h-full">
                <p className="text-sm text-muted-foreground mb-1">
                  {plan.description}
                </p>
                <h3 className="text-xl font-bold mb-3">{plan.name}</h3>
                <div className="text-3xl font-black text-foreground mb-4">
                  {formatPrice(plan.price, plan.billingInterval)}
                </div>

                <ul className="space-y-2 text-sm text-muted-foreground mb-6">
                  {plan.features?.slice(0, 4).map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-primary mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto flex flex-col gap-3">
                  <Button
                    asChild
                    size="lg"
                    className="rounded-full tactile-button"
                  >
                    <Link to="/training#pricing">
                      Choose {plan.name.split(" ")[1]}
                    </Link>
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">
                    {SITE.veteranDiscountPercent}% veteran discount • Cancel
                    anytime
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button
            variant="outline"
            asChild
            className="rounded-full tactile-button"
          >
            <Link to="/contact">Not sure? Talk to an expert</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProtectionPathSection;
