import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Users, Brain, Clock } from "lucide-react";
import serviceScamshield from "@/assets/service-scamshield.jpg";
import serviceTraining from "@/assets/service-training.jpg";
import serviceAiBusiness from "@/assets/service-ai-business.jpg";
import serviceFamilySafety from "@/assets/service-family-safety.jpg";
import { HexagonIcon, GeometricCorner, GridPattern, LightOrbs, Sparkles, IllustrationLines } from "@/components/ui/GeometricDecorations";

const services = [
  {
    icon: Shield,
    title: "Scam Prevention",
    description: "Advanced protection against AI-powered scams and fraud attempts.",
    image: serviceScamshield,
    link: "/training",
    category: "Protection",
  },
  {
    icon: Users,
    title: "Family Training",
    description: "Empowering families with knowledge to stay safe online.",
    image: serviceFamilySafety,
    link: "/training",
    category: "Education",
  },
  {
    icon: Brain,
    title: "AI Detection",
    description: "Smart technology that identifies threats before they reach you.",
    image: serviceAiBusiness,
    link: "/business",
    category: "Technology",
  },
  {
    icon: Clock,
    title: "24/7 Monitoring",
    description: "Round-the-clock protection and immediate threat response.",
    image: serviceTraining,
    link: "/training",
    category: "Support",
  },
];

export const ServicesShowcase = () => {
  return (
    <section className="py-16 relative overflow-hidden">
      {/* Subtle grid pattern */}
      <GridPattern className="opacity-50" />
      
      {/* Light orbs */}
      <LightOrbs />
      
      {/* Sparkle decorations */}
      <Sparkles />
      
      {/* Illustration lines */}
      <IllustrationLines variant="wave" className="top-20 left-10 opacity-60" />
      <IllustrationLines variant="circuit" className="bottom-20 right-10 opacity-50" />
      
      {/* Geometric corner accents */}
      <GeometricCorner position="top-left" variant="triangles" />
      <GeometricCorner position="bottom-right" variant="dots" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div 
            className="inline-flex items-center gap-2 px-5 py-2 bg-primary/10 text-primary text-sm font-semibold uppercase tracking-wider mb-4 border border-primary/20"
            style={{ clipPath: "polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)" }}
          >
            Our Expertise
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            We Have Experience And A{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Team Of Experts</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            We believe in protecting families through education and empowerment.
          </p>
        </div>

        {/* Services Grid - Soft Modern */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div key={index} className="group">
              <Link to={service.link} className="block">
                <div className="bg-white rounded-3xl overflow-hidden border border-white/50 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] transition-all duration-400 ease-out hover:translate-y-[-8px] hover:scale-[1.02] hover:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.12)] relative">
                  {/* Category Tag */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1 text-xs font-medium bg-primary/90 text-primary-foreground rounded-full">
                      {service.category}
                    </span>
                  </div>
                  
                  {/* Image - Physical Photo Effect with Illustrations */}
                  <div className="relative p-6 pb-0 pt-12">
                    {/* Decorative floating shapes */}
                    <div className="absolute top-6 right-4 w-8 h-8 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full opacity-60 group-hover:scale-125 transition-transform duration-500" />
                    <div className="absolute top-16 right-8 w-4 h-4 bg-accent/30 rotate-45 opacity-50 group-hover:rotate-90 transition-transform duration-500" />
                    <div className="absolute bottom-8 left-2 w-6 h-6 border-2 border-primary/30 rounded-full opacity-50 group-hover:scale-110 transition-transform duration-500" />
                    
                    {/* Decorative lines */}
                    <svg className="absolute top-8 left-4 w-12 h-12 opacity-30 group-hover:opacity-50 transition-opacity" viewBox="0 0 48 48">
                      <path d="M4 24 C 16 8, 32 8, 44 24" stroke="currentColor" strokeWidth="2" fill="none" className="text-primary" />
                      <circle cx="8" cy="20" r="2" className="fill-accent" />
                    </svg>
                    
                    <div className="relative">
                      <div className="rounded-2xl overflow-hidden aspect-square border border-white/50 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)]">
                        <img
                          src={service.image}
                          alt={service.title}
                          width={300}
                          height={300}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                      <div className="absolute -inset-2 border-2 border-dashed border-primary/20 rounded-2xl" />
                      
                      {/* Corner accent illustration */}
                      <div className="absolute -bottom-2 -right-2 w-8 h-8">
                        <svg viewBox="0 0 32 32" className="w-full h-full opacity-60">
                          <path d="M4 28 L28 28 L28 4" stroke="currentColor" strokeWidth="3" fill="none" className="text-primary" strokeLinecap="round" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-8 text-center">
                    <div className="flex justify-center mb-4">
                      <HexagonIcon size="md" className="group-hover:scale-105 transition-transform">
                        <service.icon className="w-6 h-6 text-primary" />
                      </HexagonIcon>
                    </div>
                    <h3 className="font-bold text-lg mb-2 text-foreground group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {service.description}
                    </p>
                    
                    <div className="mt-4 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowRight className="w-5 h-5 text-primary" />
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button asChild size="lg" className="rounded-2xl px-8">
            <Link to="/services">
              Learn More About Our Services
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesShowcase;
