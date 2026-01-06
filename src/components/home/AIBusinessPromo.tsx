import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Phone, Calendar, Bot, Globe, ArrowRight, Sparkles, Shield, Clock, TrendingUp, Star, Zap, Users, Award, CheckCircle, Palette, Headphones, Settings, Lock, Quote, Lightbulb } from "lucide-react";
import businessTechBg from "@/assets/business-tech-bg.jpg";
import businessProfessionalsOffice from "@/assets/business-professionals-office.jpg";
import { TestimonialBubble } from "./TestimonialBubble";

const services = [
  {
    icon: Phone,
    title: "AI Receptionist",
    description: "Answer calls 24/7, route to the right person, book appointments.",
    price: "$9,500",
    highlight: "Never miss a lead",
  },
  {
    icon: Calendar,
    title: "Smart Scheduling",
    description: "Auto-book appointments, send reminders, sync calendars.",
    price: "Custom",
    highlight: "Eliminate back-and-forth",
  },
  {
    icon: Bot,
    title: "AI Agent Automation",
    description: "Custom AI agents & automation. Support any vendor.",
    price: "$25,000+",
    highlight: "Full customization",
  },
  {
    icon: Globe,
    title: "Website Design",
    description: "Landing pages to full e-commerce solutions.",
    price: "From $1,500",
    highlight: "Landing • Business • E-commerce",
  },
];

const premiumAddons = [
  { icon: Palette, name: "Premium Add-ons", desc: "Custom integrations" },
  { icon: Shield, name: "Website Insurance", desc: "Subscription protection" },
  { icon: Headphones, name: "Consultancy", desc: "Expert AI guidance" },
];

const highlights = [
  { icon: Clock, text: "24/7 Availability" },
  { icon: Shield, text: "30-Day Guarantee" },
  { icon: Lock, text: "HIPAA Compliant" },
  { icon: TrendingUp, text: "Ohio-Based" },
];

const roiFacts = [
  { stat: "62%", desc: "calls missed after hours" },
  { stat: "$200-$500", desc: "lost per missed call" },
  { stat: "80%", desc: "fewer no-shows" },
];

const businessTestimonials = [
  { quote: "AI receptionist paid for itself in 3 months!", author: "James K.", location: "Cincinnati, OH" },
  { quote: "Our scheduling is now completely hands-free.", author: "Sarah M.", location: "Cleveland, OH" },
];

export const AIBusinessPromo = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-muted/30 via-background to-muted/20 relative overflow-hidden">
      {/* Background Image with blur overlay */}
      <div className="absolute inset-0">
        <img 
          src={businessTechBg} 
          alt="" 
          className="w-full h-full object-cover opacity-15"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      </div>

      {/* Decorative elements */}
      <div className="absolute top-40 left-20 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-40 right-20 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[80px]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
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
              Transform your business with AI-powered receptionists, automated scheduling, professional websites, and custom AI agents. 
              We build solutions that work 24/7 so you never miss an opportunity.
            </p>

            {/* AI Service Insurance - Star Innovation */}
            <motion.div 
              className="bg-gradient-to-r from-amber-500/10 via-amber-400/10 to-yellow-500/10 border-2 border-amber-500/30 rounded-2xl p-5 relative overflow-hidden"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              {/* Stars decoration */}
              <div className="absolute top-2 right-2 flex gap-1">
                {[...Array(7)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-amber-500 fill-amber-500" />
                ))}
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-amber-500/30">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-lg text-foreground">AI Service Insurance</h3>
                    <span className="px-2 py-0.5 bg-amber-500 text-amber-950 text-[10px] font-bold rounded-full">INDUSTRY FIRST!</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    We're the first to implement AI Service Insurance — protecting your investment in AI automation with ongoing support, updates, and coverage.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* ROI Facts */}
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-2xl p-5">
              <h3 className="font-bold text-foreground mb-3 flex items-center gap-2 text-base">
                <TrendingUp className="w-5 h-5 text-primary" />
                Why This Matters
              </h3>
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
            <div className="flex flex-wrap gap-3">
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
                      <span className="text-[10px] text-emerald-800 font-semibold">{service.highlight}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Premium Add-ons */}
            <div className="bg-white rounded-2xl p-4 border border-border/50 shadow-sm">
              <h3 className="font-bold text-foreground mb-3 flex items-center gap-2 text-base">
                <Zap className="w-4 h-4 text-accent" />
                Premium Services
              </h3>
              <div className="space-y-2">
                {premiumAddons.map((addon, index) => (
                  <div key={index} className="flex items-center gap-3 p-2 bg-muted/50 rounded-lg">
                    <addon.icon className="w-4 h-4 text-primary" />
                    <div>
                      <span className="text-sm font-medium text-foreground">{addon.name}</span>
                      <span className="text-xs text-muted-foreground ml-2">{addon.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
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

          {/* Image Side with Decorative Elements */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative space-y-4"
          >
            {/* Inspirational Quote */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-accent/10 to-primary/10 rounded-2xl p-4 border border-accent/20"
            >
              <div className="flex items-start gap-3">
                <Lightbulb className="w-8 h-8 text-accent/60 flex-shrink-0" />
                <div>
                  <p className="text-sm italic text-foreground leading-relaxed">
                    "Every missed call is a missed opportunity. Let AI handle the front desk while you focus on growth."
                  </p>
                  <p className="text-xs text-muted-foreground mt-1 font-medium">— Business Automation Insight</p>
                </div>
              </div>
            </motion.div>

            <div className="relative rounded-3xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)]">
              <img 
                src={businessProfessionalsOffice} 
                alt="Business professionals collaborating" 
                width={700}
                height={394}
                sizes="(max-width: 1024px) 100vw, 50vw"
                loading="lazy"
                decoding="async"
                className="w-full h-auto object-cover aspect-[16/10]"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

              {/* Floating stats */}
              <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm rounded-xl px-3 py-2 shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-xs font-bold text-foreground">AI Active 24/7</span>
                </div>
              </div>

              {/* Bottom stats */}
              <div className="absolute bottom-3 left-3 right-3 flex gap-2">
                <div className="bg-white/95 backdrop-blur-sm rounded-xl px-3 py-2 flex-1">
                  <div className="text-xl font-bold text-primary">$2.3M+</div>
                  <div className="text-[10px] text-muted-foreground">Revenue Protected</div>
                </div>
                <div className="bg-white/95 backdrop-blur-sm rounded-xl px-3 py-2 flex-1">
                  <div className="text-xl font-bold text-primary">150+</div>
                  <div className="text-[10px] text-muted-foreground">Businesses Served</div>
                </div>
              </div>
            </div>

            {/* Testimonial Bubbles */}
            <div className="grid grid-cols-2 gap-3">
              {businessTestimonials.map((t, i) => (
                <TestimonialBubble key={i} {...t} />
              ))}
            </div>

            {/* Quick Stats Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-primary to-accent rounded-2xl p-4 text-white"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  <span className="text-sm font-bold">Average ROI: 340%</span>
                </div>
                <div className="text-xs bg-white/20 px-3 py-1 rounded-full">Within 6 months</div>
              </div>
            </motion.div>

            {/* Trust badges below image */}
            <div className="flex flex-wrap gap-2 justify-center">
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-full border border-border/50 shadow-sm">
                <Users className="w-3.5 h-3.5 text-primary" />
                <span className="text-xs font-medium">10% Veteran Discount</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-full border border-border/50 shadow-sm">
                <Award className="w-3.5 h-3.5 text-amber-500" />
                <span className="text-xs font-medium">Any AI Vendor</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
