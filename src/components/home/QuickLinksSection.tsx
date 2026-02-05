import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Briefcase, HelpCircle, MessageCircle, ArrowRight, Users, Heart, Star, Sparkles, Shield, Lock, Zap } from "lucide-react";

const quickLinks = [
  {
    icon: HelpCircle,
    title: "Frequently Asked Questions",
    description: "Get answers to common questions about our services, pricing, and protection methods.",
    cta: "View FAQ",
    link: "/faq",
    color: "from-primary to-accent",
  },
  {
    icon: MessageCircle,
    title: "Contact Us",
    description: "Have a question? Our Ohio-based team is ready to help you with personalized support.",
    cta: "Get in Touch",
    link: "/contact",
    color: "from-accent to-primary",
  },
];

const careerHighlights = [
  { icon: Heart, text: "Veteran-Supporting" },
  { icon: Users, text: "Growing Team" },
  { icon: Star, text: "Meaningful Work" },
];

export const QuickLinksSection = () => {
  return (
    <section className="py-10 bg-gradient-to-b from-muted/20 to-background relative overflow-hidden">
      {/* Decorative Background Elements - CSS only */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Shield Icon - Top Left */}
        <div className="absolute top-10 left-10 opacity-[0.08]">
          <Shield className="w-32 h-32 text-primary" />
        </div>
        
        {/* Lock Icon - Top Right */}
        <div className="absolute top-20 right-16 opacity-[0.06]">
          <Lock className="w-24 h-24 text-accent" />
        </div>
        
        {/* Zap Icon - Bottom Left */}
        <div className="absolute bottom-20 left-20 opacity-[0.07]">
          <Zap className="w-28 h-28 text-primary" />
        </div>
        
        {/* Decorative Circles */}
        <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-gradient-to-br from-primary/5 to-accent/5 blur-3xl" />
        <div className="absolute bottom-1/4 left-1/3 w-48 h-48 rounded-full bg-gradient-to-br from-accent/5 to-primary/5 blur-2xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Whether you have questions or want to join our team, we're here to help.
          </p>
        </div>

        {/* Quick Links Grid - Same Height Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* FAQ & Contact Cards */}
          {quickLinks.map((item, index) => (
            <div
              key={index}
              className="h-full animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Link to={item.link} className="block group h-full">
                <div className="bg-white rounded-3xl p-6 border border-border/50 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.12)] transition-all duration-200 hover:-translate-y-2 h-full min-h-[280px] flex flex-col">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200 shadow-lg`}>
                    <item.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-bold text-xl text-foreground mb-2 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 flex-grow">{item.description}</p>
                  <div className="flex items-center text-primary font-semibold mt-auto">
                    {item.cta}
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-2 transition-transform duration-200" />
                  </div>
                </div>
              </Link>
            </div>
          ))}

          {/* Careers Card */}
          <div
            className="h-full animate-fade-in"
            style={{ animationDelay: '0.2s' }}
          >
            <Link to="/careers" className="block group h-full">
              <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl p-6 border border-primary/20 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.12)] transition-all duration-200 hover:-translate-y-2 h-full min-h-[280px] flex flex-col">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center group-hover:scale-110 transition-transform duration-200 shadow-lg">
                    <Briefcase className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex items-center gap-1 px-3 py-1 bg-primary/10 rounded-full">
                    <Sparkles className="w-3 h-3 text-primary" />
                    <span className="text-xs font-bold text-primary">We're Hiring!</span>
                  </div>
                </div>
                <h3 className="font-bold text-xl text-foreground mb-2 group-hover:text-primary transition-colors">
                  Join Our Team
                </h3>
                <p className="text-muted-foreground mb-4 flex-grow">
                  Be part of a mission-driven team protecting families and businesses from AI threats.
                </p>
                
                {/* Career Highlights */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {careerHighlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 px-2 py-1 bg-white rounded-full border border-border/50">
                      <highlight.icon className="w-3 h-3 text-primary" />
                      <span className="text-xs font-medium">{highlight.text}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center text-primary font-semibold mt-auto">
                  View Open Positions
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-2 transition-transform duration-200" />
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Bottom Trust Signal */}
        <div
          className="text-center mt-10 animate-fade-in"
          style={{ animationDelay: '0.4s' }}
        >
          <p className="text-muted-foreground">
            <span className="font-medium">Ohio-Based</span> • <span className="font-medium">Veteran-Supporting</span> • <span className="font-medium">Trusted by 500+ Families</span>
          </p>
        </div>
      </div>
    </section>
  );
};