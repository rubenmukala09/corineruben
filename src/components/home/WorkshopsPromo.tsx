import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Users, Clock, Award, Shield, ArrowRight, Sparkles, Play, BookOpen, Star, DollarSign } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";
import workshopSeniorsLearning from "@/assets/workshop-seniors-learning.jpg";

const benefits = [
  { icon: Shield, text: "60-Second Pause Protocol" },
  { icon: BookOpen, text: "Identity Verification Scripts" },
  { icon: Award, text: "Certificate of Completion" },
  { icon: Clock, text: "Lifetime Access" },
];

const formats = [
  {
    icon: Users,
    title: "Couples & Groups",
    price: "$79",
    badge: null,
  },
  {
    icon: Star,
    title: "Family Plan",
    price: "$199",
    badge: "Best Value",
  },
  {
    icon: Award,
    title: "Private Sessions",
    price: "$299",
    badge: "Premium",
  },
  {
    icon: DollarSign,
    title: "Organizations",
    price: "$510+",
    badge: "Custom",
  },
];

const audiences = [
  "Seniors & Retirees",
  "Families & Caregivers", 
  "Business Professionals",
  "Organizations & Churches",
];

const howItWorks = [
  { step: "1", title: "Book", desc: "Choose your format and schedule" },
  { step: "2", title: "Learn & Practice", desc: "Interactive training with real scenarios" },
  { step: "3", title: "Get Support", desc: "Ongoing access to resources" },
];

export const WorkshopsPromo = () => {
  return (
    <section className="py-12 md:py-16 lg:py-24 bg-gradient-to-b from-background via-muted/20 to-background relative overflow-hidden">
      {/* Decorative elements - hidden on mobile for performance */}
      <div className="hidden md:block absolute top-20 right-10 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="hidden md:block absolute bottom-20 left-10 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Mobile-first: Stack vertically, Desktop: Side by side */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          
          {/* Image Side - Shows first on mobile */}
          <ScrollReveal animation="fade-up" className="order-1 lg:order-1 w-full">
            <div className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)]">
              {/* Image with mobile-optimized display */}
              <img 
                src={workshopSeniorsLearning} 
                alt="Seniors learning in a friendly workshop environment" 
                className="w-full h-auto object-contain sm:object-cover sm:aspect-[16/10] bg-muted/30"
                loading="lazy"
              />
              {/* Overlay gradient - lighter on mobile */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 sm:from-black/40 via-transparent to-transparent pointer-events-none" />
              
              {/* Play button overlay - smaller on mobile */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-14 h-14 sm:w-20 sm:h-20 bg-white/90 rounded-full flex items-center justify-center shadow-xl hover:scale-105 transition-transform cursor-pointer">
                  <Play className="w-6 h-6 sm:w-8 sm:h-8 text-primary ml-1" fill="currentColor" />
                </div>
              </div>

              {/* Stats overlay - responsive sizing */}
              <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 flex gap-2 sm:gap-3">
                <div className="bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl px-3 sm:px-4 py-2 sm:py-3 flex-1">
                  <div className="text-lg sm:text-2xl font-bold text-primary">500+</div>
                  <div className="text-[10px] sm:text-xs text-muted-foreground">Families Trained</div>
                </div>
                <div className="bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl px-3 sm:px-4 py-2 sm:py-3 flex-1">
                  <div className="text-lg sm:text-2xl font-bold text-primary">98%</div>
                  <div className="text-[10px] sm:text-xs text-muted-foreground">Satisfaction Rate</div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Content Side */}
          <ScrollReveal animation="fade-up" delay={100} className="order-2 lg:order-2 space-y-4 sm:space-y-6">
            <div className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 bg-primary/10 rounded-2xl border border-primary/20">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
              <span className="font-bold text-primary text-sm sm:text-base">Learn & Train Workshops</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground leading-tight">
              Learn to Protect Your Family from{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">AI Scams</span>
            </h2>
            
            <p className="text-lg sm:text-xl text-muted-foreground font-medium">
              Know the threats. Stay ahead.
            </p>
            
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              Expert-led workshops teaching the 60-Second Pause Protocol, identity verification scripts, and real-world scam recognition. 
              We train seniors, families, and business professionals to spot AI-powered threats.
            </p>

            {/* Target Audiences - wraps nicely on mobile */}
            <div className="flex flex-wrap gap-2">
              {audiences.map((audience, index) => (
                <span key={index} className="px-3 py-1.5 bg-muted rounded-full text-xs sm:text-sm font-medium text-foreground">
                  {audience}
                </span>
              ))}
            </div>

            {/* Benefits - 2 columns on mobile, 2 on desktop */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-white rounded-xl border border-border/50 shadow-sm">
                  <benefit.icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                  <span className="text-xs sm:text-sm font-medium">{benefit.text}</span>
                </div>
              ))}
            </div>

            {/* How It Works - stacks on mobile */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-5 border border-border/50 shadow-sm">
              <h4 className="font-bold text-foreground mb-3 sm:mb-4 text-sm sm:text-base">How It Works</h4>
              <div className="flex flex-col sm:flex-row gap-4">
                {howItWorks.map((item, index) => (
                  <div key={index} className="flex-1 flex sm:flex-col items-center sm:text-center gap-3 sm:gap-0">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold text-base sm:text-lg sm:mb-2 flex-shrink-0">
                      {item.step}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-foreground">{item.title}</div>
                      <div className="text-xs text-muted-foreground">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing Preview - 2x2 grid on mobile */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3">
              {formats.map((format, index) => (
                <div key={index} className="relative bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-border/50 shadow-sm text-center hover:-translate-y-1 transition-transform">
                  {format.badge && (
                    <span className="absolute -top-2 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-primary text-white text-[9px] sm:text-[10px] font-bold rounded-full whitespace-nowrap">
                      {format.badge}
                    </span>
                  )}
                  <format.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary mx-auto mb-1 sm:mb-2" />
                  <div className="text-[10px] sm:text-xs font-medium text-muted-foreground mb-0.5 sm:mb-1">{format.title}</div>
                  <div className="text-lg sm:text-xl font-bold text-foreground">{format.price}</div>
                </div>
              ))}
            </div>

            {/* CTAs - stack on mobile */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4">
              <Button asChild size="lg" className="rounded-xl sm:rounded-2xl px-6 sm:px-10 shadow-lg shadow-primary/25 w-full sm:w-auto">
                <Link to="/training">
                  View All Workshops
                  <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-xl sm:rounded-2xl px-6 sm:px-8 w-full sm:w-auto">
                <Link to="/training#pricing">
                  See Pricing
                </Link>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
