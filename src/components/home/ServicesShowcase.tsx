import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Users, Brain, Clock } from "lucide-react";
import serviceScamshield from "@/assets/service-scamshield.jpg";
import serviceTraining from "@/assets/service-training.jpg";
import serviceAiBusiness from "@/assets/service-ai-business.jpg";
import serviceFamilySafety from "@/assets/service-family-safety.jpg";
import { HexagonIcon, GeometricCorner, GridPattern } from "@/components/ui/GeometricDecorations";

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
    <section className="py-16 bg-muted/30 relative overflow-hidden">
      {/* Subtle grid pattern */}
      <GridPattern className="opacity-50" />
      
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

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div key={index} className="group">
              <Link to={service.link} className="block">
                <div className="bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-200 relative hover:-translate-y-1">
                  {/* Category Tag */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1 text-xs font-medium bg-primary/90 text-primary-foreground rounded-full">
                      {service.category}
                    </span>
                  </div>
                  
                  {/* Image */}
                  <div className="relative p-6 pb-0 pt-12">
                    <div className="relative">
                      <div className="rounded-full overflow-hidden aspect-square border-4 border-background shadow-lg">
                        <img
                          src={service.image}
                          alt={service.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div className="absolute -inset-2 border-2 border-dashed border-primary/20 rounded-full" />
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6 text-center">
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
          <Button asChild size="lg" className="rounded-full px-8">
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
