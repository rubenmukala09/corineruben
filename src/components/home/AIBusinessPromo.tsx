import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Phone, Calendar, Bot, Globe, ArrowRight, Sparkles, Shield, Clock, TrendingUp } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";
import businessProfessionalsOffice from "@/assets/business-professionals-office.jpg";

const services = [
  {
    icon: Phone,
    title: "AI Receptionist",
    description: "Answer calls 24/7, route to the right person, book appointments, handle FAQs.",
    price: "$9,500",
    highlight: "Never miss a lead",
  },
  {
    icon: Calendar,
    title: "Smart Scheduling",
    description: "Auto-book appointments, send reminders, sync with your calendar.",
    price: "Custom",
    highlight: "Eliminate back-and-forth",
  },
  {
    icon: Bot,
    title: "Custom Automation",
    description: "Enterprise-grade AI solutions tailored to your specific business needs.",
    price: "$25,000+",
    highlight: "Full customization",
  },
  {
    icon: Globe,
    title: "Website Design",
    description: "Professional websites from landing pages to full e-commerce solutions.",
    price: "From $1,500",
    highlight: "Landing • Business • E-commerce",
  },
];

const highlights = [
  { icon: Clock, text: "24/7 Availability" },
  { icon: Shield, text: "60-Day Guarantee" },
  { icon: TrendingUp, text: "Ohio-Based Support" },
];

const roiFacts = [
  { stat: "62%", desc: "of calls missed outside business hours" },
  { stat: "$200-$500", desc: "lost per missed call" },
  { stat: "80%", desc: "reduction in no-shows with reminders" },
];

export const AIBusinessPromo = () => {
  return (
    <section className="py-12 md:py-16 lg:py-24 bg-gradient-to-b from-muted/30 via-background to-muted/20 relative overflow-hidden">
      {/* Decorative elements - hidden on mobile for performance */}
      <div className="hidden md:block absolute top-40 left-20 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="hidden md:block absolute bottom-40 right-20 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Mobile-first: Stack vertically, Desktop: Side by side */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          
          {/* Image Side - Shows first on mobile */}
          <ScrollReveal animation="fade-up" className="order-1 lg:order-2 w-full">
            <div className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)]">
              <img 
                src={businessProfessionalsOffice} 
                alt="Business professionals collaborating in modern office" 
                className="w-full h-auto object-contain sm:object-cover sm:aspect-[16/10] bg-muted/30"
                loading="lazy"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 sm:from-black/40 via-transparent to-transparent pointer-events-none" />

              {/* Floating stats */}
              <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl px-3 sm:px-4 py-2 sm:py-3 shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-xs sm:text-sm font-bold text-foreground">AI Active 24/7</span>
                </div>
              </div>

              {/* Bottom stats */}
              <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 flex gap-2 sm:gap-3">
                <div className="bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl px-3 sm:px-4 py-2 sm:py-3 flex-1">
                  <div className="text-lg sm:text-2xl font-bold text-primary">$2.3M+</div>
                  <div className="text-[10px] sm:text-xs text-muted-foreground">Revenue Protected</div>
                </div>
                <div className="bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl px-3 sm:px-4 py-2 sm:py-3 flex-1">
                  <div className="text-lg sm:text-2xl font-bold text-primary">150+</div>
                  <div className="text-[10px] sm:text-xs text-muted-foreground">Businesses Served</div>
                </div>
              </div>
            </div>

            {/* Decorative ring - hidden on mobile */}
            <div className="hidden lg:block absolute -z-10 -top-8 -right-8 w-full h-full border-2 border-primary/20 rounded-3xl" />
          </ScrollReveal>

          {/* Content Side */}
          <ScrollReveal animation="fade-up" delay={100} className="order-2 lg:order-1 space-y-4 sm:space-y-6">
            <div className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 bg-accent/10 rounded-2xl border border-accent/20">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
              <span className="font-bold text-accent text-sm sm:text-base">AI & Business Solutions</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground leading-tight">
              Stop Missing Calls.{" "}
              <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">Let AI Run Your Front Desk.</span>
            </h2>
            
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              Transform your business with AI-powered receptionists, automated scheduling, and professional websites. 
              Our solutions work 24/7 so you never miss an opportunity.
            </p>

            {/* ROI Facts - responsive grid */}
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-xl sm:rounded-2xl p-4 sm:p-5">
              <h4 className="font-bold text-foreground mb-2 sm:mb-3 flex items-center gap-2 text-sm sm:text-base">
                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                Why This Matters
              </h4>
              <div className="grid grid-cols-3 gap-2 sm:gap-4">
                {roiFacts.map((fact, index) => (
                  <div key={index} className="text-center">
                    <div className="text-base sm:text-xl font-bold text-primary">{fact.stat}</div>
                    <div className="text-[10px] sm:text-xs text-muted-foreground leading-tight">{fact.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Highlights */}
            <div className="flex flex-wrap gap-2 sm:gap-4">
              {highlights.map((highlight, index) => (
                <div key={index} className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-white rounded-full border border-border/50 shadow-sm">
                  <highlight.icon className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                  <span className="text-xs sm:text-sm font-medium">{highlight.text}</span>
                </div>
              ))}
            </div>

            {/* Services Grid - stacks on mobile */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {services.map((service, index) => (
                <ScrollReveal
                  key={index}
                  animation="fade-up"
                  delay={index * 50}
                  className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-border/50 shadow-sm hover:-translate-y-1 transition-all group"
                >
                  <div className="flex items-start gap-2 sm:gap-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <service.icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-foreground text-xs sm:text-sm">{service.title}</h3>
                      <p className="text-[10px] sm:text-xs text-muted-foreground line-clamp-2 mt-0.5 sm:mt-1">{service.description}</p>
                      <div className="flex items-center justify-between mt-1.5 sm:mt-2">
                        <span className="text-base sm:text-lg font-bold text-primary">{service.price}</span>
                      </div>
                      <span className="text-[9px] sm:text-[10px] text-accent font-medium">{service.highlight}</span>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            {/* CTAs - stack on mobile */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4">
              <Button asChild size="lg" className="rounded-xl sm:rounded-2xl px-6 sm:px-10 shadow-lg shadow-primary/25 w-full sm:w-auto">
                <Link to="/business">
                  Explore AI Solutions
                  <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-xl sm:rounded-2xl px-6 sm:px-8 w-full sm:w-auto">
                <Link to="/contact?service=ai-automation">
                  Get a Quote
                </Link>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
