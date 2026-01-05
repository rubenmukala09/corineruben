import { useState, useEffect } from "react";
import { MapPin, Users, Shield, Heart, Building2, Star, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import ohioLandscapeBg from "@/assets/ohio-landscape-bg.jpg";
import { HexagonIcon, GeometricCorner, GridPattern } from "@/components/ui/GeometricDecorations";

const impactStats = [
  { icon: Users, value: 100, suffix: "+", label: "Ohio Families Protected" },
  { icon: Shield, value: 450, suffix: "+", label: "Scam Attempts Blocked" },
  { icon: Building2, value: 15, suffix: "+", label: "Local Business Partners" },
  { icon: Heart, value: 8, suffix: "+", label: "Community Events" },
];

const ohioCities = [
  { name: "Columbus", protected: "180+" },
  { name: "Cleveland", protected: "95+" },
  { name: "Cincinnati", protected: "85+" },
  { name: "Toledo", protected: "45+" },
  { name: "Akron", protected: "35+" },
  { name: "Dayton", protected: "30+" },
];

const testimonials = [
  {
    quote: "As a retired teacher in Columbus, I was terrified of the phone scams targeting seniors. InVision Network gave me confidence.",
    name: "Margaret T.",
    location: "Columbus, OH",
  },
  {
    quote: "They saved my parents from losing $15,000 to a gift card scam. I can't thank them enough.",
    name: "David R.",
    location: "Cleveland, OH",
  },
  {
    quote: "Finally, a company that actually cares about Ohio families. They're building community.",
    name: "Sarah M.",
    location: "Cincinnati, OH",
  },
];

// Animated counter component
const AnimatedCounter = ({ value, suffix }: { value: number; suffix: string }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const stepValue = value / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += stepValue;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    
    return () => clearInterval(timer);
  }, [value]);
  
  return <span>{count}{suffix}</span>;
};

export const OhioImpactSection = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${ohioLandscapeBg})` }}
      />
      <div className="absolute inset-0 bg-background/80" />
      
      {/* Grid pattern */}
      <GridPattern />
      
      {/* Geometric corner accents */}
      <GeometricCorner position="top-right" variant="dots" />
      <GeometricCorner position="bottom-left" variant="lines" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div 
            className="inline-flex items-center gap-2 px-5 py-2 bg-primary/10 border border-primary/20 mb-6"
            style={{ clipPath: "polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)" }}
          >
            <MapPin className="w-4 h-4 text-primary" />
            <span className="text-sm font-bold text-primary uppercase tracking-wider">Ohio Proud</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Protecting{" "}
            <span className="text-primary">The Buckeye State</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            We're not a faceless corporation. We're your neighbors—veteran-owned, Ohio-based, 
            and committed to protecting families across every county.
          </p>
        </div>

        {/* Stats Grid - Soft Modern */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {impactStats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-8 text-center border border-white/50 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] transition-all duration-400 ease-out hover:translate-y-[-8px] hover:scale-[1.02] hover:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.12)] relative overflow-hidden"
            >
              <div className="flex justify-center mb-4">
                <HexagonIcon size="md">
                  <stat.icon className="w-7 h-7 text-primary" />
                </HexagonIcon>
              </div>
              <div className="text-3xl md:text-4xl font-bold text-primary mb-1">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Cities We Serve - Soft Modern */}
          <div className="bg-white rounded-3xl p-8 border border-white/50 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] h-full">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">Communities We Serve</h3>
                <p className="text-sm text-muted-foreground">Protecting families across Ohio</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {ohioCities.map((city, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-2xl bg-background border border-white/50 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_25px_-4px_rgba(0,0,0,0.08)] transition-all duration-300"
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="font-medium text-sm">{city.name}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{city.protected}</span>
                </div>
              ))}
            </div>

            <p className="text-sm text-muted-foreground mt-4 text-center">+ Many more communities</p>
          </div>

          {/* Testimonial - Soft Modern */}
          <div className="bg-white rounded-3xl p-8 border border-white/50 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] h-full relative">
            <div className="flex items-center gap-2 mb-6">
              <Star className="w-5 h-5 text-accent fill-accent" />
              <span className="text-sm font-semibold text-accent">Community Voices</span>
            </div>

            {/* Stars */}
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-accent text-accent" />
              ))}
            </div>

            <blockquote className="text-lg font-medium text-foreground leading-relaxed mb-6 min-h-[80px]">
              "{testimonials[activeTestimonial].quote}"
            </blockquote>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground font-bold">
                {testimonials[activeTestimonial].name.charAt(0)}
              </div>
              <div>
                <div className="font-bold text-foreground">{testimonials[activeTestimonial].name}</div>
                <div className="text-sm text-muted-foreground">{testimonials[activeTestimonial].location}</div>
              </div>
            </div>

            {/* Navigation dots */}
            <div className="flex gap-2 mt-6">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTestimonial(idx)}
                  className={`h-2 rounded-full transition-all duration-200 ${
                    idx === activeTestimonial
                      ? "bg-primary w-6"
                      : "bg-muted-foreground/30 w-2 hover:bg-muted-foreground/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Button asChild size="lg" className="rounded-2xl px-8">
            <Link to="/training#pricing">
              Get Started Today
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
