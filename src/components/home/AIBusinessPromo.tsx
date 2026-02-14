import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Phone, Calendar, Bot, ArrowRight, CheckCircle, Sparkles } from "lucide-react";
import { SITE } from "@/config/site";
import consultingTeamStrategy from "@/assets/consulting-team-strategy.jpg";
import teamOfficeDiscussion from "@/assets/team-office-discussion.jpg";

const services = [
  { icon: Phone, title: "AI Receptionist", desc: "Never miss a call with 24/7 AI-powered reception" },
  { icon: Calendar, title: "Smart Scheduling", desc: "Automated appointment booking and management" },
  { icon: Bot, title: "AI Automation", desc: "Custom workflows that save time and boost ROI" },
];

const features = ["Digital Marketing", "Search Engine Optimization", "E-Commerce Solutions", "AI Consultation"];

export const AIBusinessPromo = () => {
  return (
    <section className="py-16 lg:py-20" aria-labelledby="business-heading">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Label */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/20 bg-accent/5 mb-5">
            <span className="w-2 h-2 rounded-full bg-gradient-to-r from-accent to-primary" />
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-primary">AI & Business</span>
          </div>
          <h2 id="business-heading" className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground leading-tight mb-3">
            Comprehensive Digital{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Solutions</span>
          </h2>
          <p className="text-muted-foreground text-base max-w-xl mx-auto">
            Grow your business with AI-powered automation. Solutions that work 24/7 so you never miss an opportunity.
          </p>
        </div>

        {/* Services Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16 max-w-5xl mx-auto" role="list" aria-label="Business services">
          {services.map((service) => (
            <Link key={service.title} to="/business" role="listitem"
              className="group bg-card rounded-2xl border border-border/60 p-6 hover:border-primary/30 hover:shadow-lg transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-primary/8 flex items-center justify-center mb-5 group-hover:bg-primary/12 transition-colors">
                <service.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">{service.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{service.desc}</p>
              <span className="inline-flex items-center text-sm font-semibold text-primary group-hover:text-accent transition-colors">
                Learn More <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          ))}
        </div>

        {/* About Section */}
        <div className="grid lg:grid-cols-2 gap-10 items-center max-w-6xl mx-auto">
          {/* Left - Content */}
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-accent/20 bg-accent/5">
              <Sparkles className="w-3.5 h-3.5 text-accent" />
              <span className="text-xs font-bold text-accent uppercase tracking-wider">About Our Team</span>
            </div>

            <h3 className="text-2xl md:text-3xl font-black text-foreground leading-tight">
              Fueling Your Growth with{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Expert Consultancy</span>
            </h3>

            <p className="text-muted-foreground text-sm leading-relaxed">
              With more than 7 years of expertise in design and digital transformation, we are committed to providing our customers with exceptional service and measurable results.
            </p>

            {/* Experience Counter */}
            <div className="flex items-end gap-4 py-2">
              <div className="text-5xl font-black text-foreground leading-none">
                4<span className="text-accent">+</span>
              </div>
              <div className="pb-1">
                <div className="text-xs font-bold text-muted-foreground uppercase">Years</div>
                <div className="text-base font-bold text-foreground">Experience</div>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-3" role="list" aria-label="Services offered">
              {features.map((feature) => (
                <div key={feature} role="listitem" className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                  <span className="text-sm font-medium text-foreground/80">{feature}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-4 pt-2">
              <Button asChild size="lg" className="h-12 px-8 text-sm font-bold rounded-full bg-gradient-to-r from-primary to-accent text-white hover:opacity-90">
                <Link to="/business">Learn More <ArrowRight className="ml-2 w-4 h-4" /></Link>
              </Button>
              <span className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">{SITE.phone.display}</span>
              </span>
            </div>
          </div>

          {/* Right - Images */}
          <div className="grid grid-cols-2 gap-3">
            <img src={consultingTeamStrategy} alt="Professional consulting team strategy meeting"
              className="col-span-2 aspect-[16/9] rounded-2xl border border-border/60 shadow-lg w-full object-cover"
              width={600} height={338} loading="lazy" decoding="async" />
            <img src={teamOfficeDiscussion} alt="Dedicated consulting team"
              className="aspect-[4/3] rounded-xl border border-border/60 shadow-md w-full object-cover"
              width={200} height={150} loading="lazy" decoding="async" />
            <img src={consultingTeamStrategy} alt="Expert team planning"
              className="aspect-[4/3] rounded-xl border border-border/60 shadow-md w-full object-cover"
              width={200} height={150} loading="lazy" decoding="async" />
          </div>
        </div>
      </div>
    </section>
  );
};
