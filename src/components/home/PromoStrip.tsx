import { Link } from "react-router-dom";
import { ArrowRight, ClipboardCheck, FileSearch, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
  {
    num: "01",
    icon: FileSearch,
    title: "Free Assessment",
    desc: "We evaluate your current digital safety and identify vulnerabilities — no cost, no obligation.",
    gradient: "from-primary/20 to-accent/5",
  },
  {
    num: "02",
    icon: ClipboardCheck,
    title: "Custom Plan",
    desc: "Receive a tailored protection strategy designed specifically for your family or business needs.",
    gradient: "from-accent/20 to-primary/5",
  },
  {
    num: "03",
    icon: ShieldCheck,
    title: "Get Protected",
    desc: "Activate your defenses with hands-on training, AI-powered tools, and 24/7 expert support.",
    gradient: "from-primary/15 to-accent/10",
  },
];

export const PromoStrip = () => {
  return (
    <section className="py-16 md:py-28 bg-muted/30 relative overflow-hidden">
      <div className="absolute top-10 left-1/3 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-6 lg:px-12 relative">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary mb-4">
            How It Works
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Three Steps to Safety
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            Getting protected is simple. We handle the complexity so you don't have to.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-14">
          {steps.map((step, i) => (
            <div key={step.num} className="relative">
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-px z-10">
                  <div className="w-full h-px border-t-2 border-dashed border-primary/30" />
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary/40" />
                </div>
              )}
              <div className="relative rounded-2xl border border-border/50 bg-card p-8 text-center overflow-hidden h-full hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className={`absolute inset-0 bg-gradient-to-br ${step.gradient} opacity-50 pointer-events-none`} />
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent" />

                <div className="relative">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-4 shadow-md">
                    <span className="text-xs font-black text-primary-foreground">{step.num}</span>
                  </div>
                  
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/15 to-accent/10 flex items-center justify-center mx-auto mb-5 shadow-sm border border-primary/10">
                    <step.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-3">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">
                    {step.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button asChild size="lg">
            <Link to="/training#pricing">
              Start Your Free Assessment <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PromoStrip;
