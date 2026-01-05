import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, Shield, Users, Ribbon, ArrowRight, MapPin } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";
import ohioNatureImpact from "@/assets/ohio-nature-impact.jpg";

const impacts = [
  {
    icon: Shield,
    title: "Veteran Support",
    description: "We honor those who served with exclusive 17% discounts and priority support for veterans and first responders.",
    color: "from-blue-500 to-indigo-500",
  },
  {
    icon: Ribbon,
    title: "Children with Cancer",
    description: "A portion of every purchase supports families with children battling cancer through our partner organizations.",
    color: "from-rose-500 to-pink-500",
  },
  {
    icon: Users,
    title: "Senior Protection",
    description: "Free educational resources and discounted services for seniors on fixed incomes to stay safe online.",
    color: "from-amber-500 to-orange-500",
  },
  {
    icon: Heart,
    title: "Community Education",
    description: "Free workshops at libraries, churches, and community centers across Ohio to spread digital safety awareness.",
    color: "from-emerald-500 to-teal-500",
  },
];

const quickStats = [
  { label: "Ohio-Based", icon: MapPin },
  { label: "Veteran-Supporting", icon: Shield },
  { label: "Mission-Driven", icon: Heart },
];

export const CommunityImpact = () => {
  return (
    <section className="py-12 md:py-16 lg:py-24 bg-background relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--primary)) 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }} />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <ScrollReveal animation="fade-up" className="text-center mb-8 sm:mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 bg-rose-500/10 rounded-2xl border border-rose-500/20 mb-4 sm:mb-6">
            <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-rose-500" />
            <span className="font-bold text-rose-600 text-sm sm:text-base">Giving Back</span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground mb-4 sm:mb-6">
            More Than a Business—{" "}
            <span className="bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent">A Mission</span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto">
            We believe in building a safer community for everyone. Here's how we're making a difference in Ohio and beyond.
          </p>
          
          {/* Quick stats badges */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mt-6 sm:mt-8">
            {quickStats.map((stat, index) => (
              <div key={index} className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-1.5 sm:py-2.5 bg-white rounded-full border border-border/50 shadow-sm">
                <stat.icon className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                <span className="font-medium text-xs sm:text-base">{stat.label}</span>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Main Image with overlay - Full width on mobile */}
        <ScrollReveal animation="scale" className="mb-8 sm:mb-12 lg:mb-16">
          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)]">
            <img
              src={ohioNatureImpact}
              alt="Ohio community and nature"
              className="w-full h-48 sm:h-64 md:h-80 lg:h-[400px] object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-10 text-center text-white">
              <h3 className="text-lg sm:text-2xl lg:text-3xl font-bold mb-1 sm:mb-3">Proudly Serving Ohio Communities</h3>
              <p className="text-white/80 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto">
                From Dayton to Columbus to Cincinnati—protecting families across the Buckeye State
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Impact Cards - 2 columns on mobile, 4 on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12 lg:mb-16">
          {impacts.map((impact, index) => (
            <ScrollReveal key={index} animation="fade-up" delay={index * 75}>
              <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-border/50 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] h-full hover:-translate-y-2 transition-all duration-300 hover:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.12)]">
                <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br ${impact.color} flex items-center justify-center mb-3 sm:mb-4 shadow-lg`}>
                  <impact.icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>
                <h3 className="text-base sm:text-xl font-bold mb-1 sm:mb-2 text-foreground">{impact.title}</h3>
                <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">{impact.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* CTA */}
        <ScrollReveal animation="fade-up" className="text-center">
          <Button asChild size="lg" variant="outline" className="rounded-xl sm:rounded-2xl px-6 sm:px-8">
            <Link to="/about">
              Learn More About Our Mission
              <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
            </Link>
          </Button>
        </ScrollReveal>
      </div>
    </section>
  );
};
