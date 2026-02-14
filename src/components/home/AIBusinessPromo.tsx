import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Phone, Calendar, Bot, ArrowRight, CheckCircle, Sparkles } from "lucide-react";
import { SITE } from "@/config/site";
import consultingTeamStrategy from "@/assets/consulting-team-strategy.jpg";

const services = [
  { icon: Phone, title: "AI Receptionist", desc: "Your phones answered 24/7 by an AI assistant", price: "From $299/mo" },
  { icon: Calendar, title: "Smart Scheduling", desc: "Automated appointment booking and reminders", price: "From $199/mo" },
  { icon: Bot, title: "AI Automation", desc: "Custom workflows that save hours every week", price: "From $499/mo" },
];

const features = ["Digital Marketing", "Search Engine Optimization", "E-Commerce Solutions", "AI Consultation"];

export const AIBusinessPromo = () => {
  return (
    <section className="py-16 lg:py-24 relative overflow-hidden" aria-labelledby="business-heading">
      {/* Decorative orbs */}
      <div className="absolute top-20 -left-40 w-[400px] h-[400px] rounded-full bg-gradient-to-br from-accent/8 to-primary/5 blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-20 right-0 w-80 h-80 rounded-full bg-gradient-to-br from-primary/6 to-accent/4 blur-[80px] pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 max-w-6xl relative z-10">
        {/* Full-width image banner with glass overlay */}
        <div className="relative rounded-3xl overflow-hidden mb-12 group">
          <img
            src={consultingTeamStrategy}
            alt="Professional consulting team strategy meeting"
            className="w-full aspect-[21/9] object-cover group-hover:scale-105 transition-transform duration-700"
            width={1200} height={514} loading="lazy" decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/50 to-slate-900/20" />
          
          {/* Glass mesh overlay */}
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: `
              radial-gradient(ellipse 40% 60% at 10% 90%, hsl(var(--primary) / 0.2) 0%, transparent 50%),
              radial-gradient(ellipse 30% 40% at 90% 20%, hsl(var(--accent) / 0.15) 0%, transparent 50%)
            `
          }} />

          <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-bold uppercase tracking-[0.2em] text-white/70 mb-4">
              <Sparkles className="w-3 h-3" /> AI & Business Solutions
            </span>
            <h2 id="business-heading" className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-[1.1] mb-3">
              Digital Solutions That Work 24/7
            </h2>
            <p className="text-white/60 text-base max-w-lg">
              Grow your business with AI-powered automation. Phones answered, appointments booked, customers supported around the clock.
            </p>
          </div>
        </div>

        {/* Glass service cards */}
        <div className="grid md:grid-cols-3 gap-5 mb-12" role="list" aria-label="Business services">
          {services.map((service, i) => (
            <Link key={service.title} to="/business" role="listitem"
              className="group block">
              <div className="relative rounded-2xl overflow-hidden h-full">
                {/* Glass background */}
                <div className="relative backdrop-blur-xl bg-card/70 border border-border/40 rounded-2xl p-6 h-full hover:border-primary/30 transition-all duration-500 hover:-translate-y-1" style={{ boxShadow: 'var(--skeuo-shadow-ombre)' }}>
                  {/* Hover glow */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{
                    background: 'radial-gradient(circle at 50% 0%, hsl(var(--primary) / 0.1) 0%, transparent 60%)'
                  }} />
                  {/* Top edge highlight */}
                  <div className="absolute top-0 left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/15 to-accent/15 backdrop-blur-sm border border-primary/10 flex items-center justify-center group-hover:scale-110 group-hover:shadow-[0_0_20px_hsl(var(--primary)/0.2)] transition-all duration-300">
                        <service.icon className="w-6 h-6 text-primary" />
                      </div>
                      <span className="text-xs font-bold text-muted-foreground px-2.5 py-1 rounded-full bg-muted/50 backdrop-blur-sm">{service.price}</span>
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2">{service.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{service.desc}</p>
                    <span className="inline-flex items-center text-sm font-semibold text-primary group-hover:text-accent transition-colors">
                      See Details <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom glass feature strip */}
        <div className="relative rounded-2xl overflow-hidden">
          <div className="backdrop-blur-xl bg-card/60 border border-border/30 rounded-2xl p-6 lg:p-8" style={{ boxShadow: 'var(--skeuo-shadow-ombre)' }}>
            {/* Decorative inner gradient */}
            <div className="absolute inset-0 rounded-2xl pointer-events-none" style={{
              background: 'radial-gradient(ellipse 60% 80% at 0% 50%, hsl(var(--primary) / 0.06) 0%, transparent 50%)'
            }} />
            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-accent" />
                  <span className="text-xs font-bold uppercase tracking-wider text-accent">4+ Years Experience</span>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  Your Growth, Powered by Expert Consultants
                </h3>
                <div className="grid grid-cols-2 gap-2" role="list" aria-label="Services offered">
                  {features.map((feature) => (
                    <div key={feature} role="listitem" className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                      <span className="text-sm font-medium text-foreground/80">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <Button asChild size="lg" className="h-12 px-8 text-sm font-bold rounded-full bg-gradient-to-r from-primary to-accent text-white hover:opacity-90 hover:scale-105 active:scale-95 transition-all shadow-[0_8px_30px_hsl(var(--primary)/0.3)]">
                  <Link to="/business">See All Services <ArrowRight className="ml-2 w-4 h-4" /></Link>
                </Button>
                <a href={`tel:${SITE.phone.e164}`} className="text-sm font-semibold text-center text-primary hover:text-accent transition-colors">
                  {SITE.phone.display}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
