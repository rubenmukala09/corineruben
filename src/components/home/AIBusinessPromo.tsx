import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Phone, Calendar, Bot, Globe, ArrowRight, Sparkles, Shield, Clock, TrendingUp } from "lucide-react";
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
    <section className="py-24 bg-gradient-to-b from-muted/30 via-background to-muted/20 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-40 left-20 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-40 right-20 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent/10 rounded-2xl border border-accent/20">
              <Sparkles className="w-5 h-5 text-accent" />
              <span className="font-bold text-accent">AI & Business Solutions</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Stop Missing Calls.{" "}
              <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">Let AI Run Your Front Desk.</span>
            </h2>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              Transform your business with AI-powered receptionists, automated scheduling, and professional websites. 
              Our solutions work 24/7 so you never miss an opportunity.
            </p>

            {/* ROI Facts */}
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-2xl p-5">
              <h4 className="font-bold text-foreground mb-3 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Why This Matters
              </h4>
              <div className="grid grid-cols-3 gap-4">
                {roiFacts.map((fact, index) => (
                  <div key={index} className="text-center">
                    <div className="text-xl font-bold text-primary">{fact.stat}</div>
                    <div className="text-xs text-muted-foreground">{fact.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Highlights */}
            <div className="flex flex-wrap gap-4">
              {highlights.map((highlight, index) => (
                <div key={index} className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-border/50 shadow-sm">
                  <highlight.icon className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">{highlight.text}</span>
                </div>
              ))}
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-2 gap-4">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-4 border border-border/50 shadow-sm hover:-translate-y-1 transition-all group"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <service.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-foreground text-sm">{service.title}</h3>
                      <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{service.description}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-lg font-bold text-primary">{service.price}</span>
                      </div>
                      <span className="text-[10px] text-accent font-medium">{service.highlight}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 pt-4">
              <Button asChild size="xl" className="rounded-2xl px-10 shadow-lg shadow-primary/25">
                <Link to="/business">
                  Explore AI Solutions
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="xl" className="rounded-2xl px-8">
                <Link to="/contact?service=ai-automation">
                  Get a Quote
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)]">
              <img 
                src={businessProfessionalsOffice} 
                alt="Business professionals collaborating" 
                className="w-full h-auto object-cover aspect-[16/10]"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

              {/* Floating stats */}
              <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm font-bold text-foreground">AI Active 24/7</span>
                </div>
              </div>

              {/* Bottom stats */}
              <div className="absolute bottom-4 left-4 right-4 flex gap-3">
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-3 flex-1">
                  <div className="text-2xl font-bold text-primary">$2.3M+</div>
                  <div className="text-xs text-muted-foreground">Revenue Protected</div>
                </div>
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-3 flex-1">
                  <div className="text-2xl font-bold text-primary">150+</div>
                  <div className="text-xs text-muted-foreground">Businesses Served</div>
                </div>
              </div>
            </div>

            {/* Decorative ring */}
            <div className="absolute -z-10 -top-8 -right-8 w-full h-full border-2 border-primary/20 rounded-3xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
