import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Users, Brain, Clock } from "lucide-react";
import serviceScamshield from "@/assets/service-scamshield.jpg";
import serviceTraining from "@/assets/service-training.jpg";
import serviceAiBusiness from "@/assets/service-ai-business.jpg";
import serviceFamilySafety from "@/assets/service-family-safety.jpg";
import { HexagonIcon, GeometricCorner, DottedPattern, GridPattern } from "@/components/ui/GeometricDecorations";

const services = [
  {
    icon: Shield,
    title: "Scam Prevention",
    description: "Advanced protection against AI-powered scams and fraud attempts.",
    image: serviceScamshield,
    link: "/training",
  },
  {
    icon: Users,
    title: "Family Training",
    description: "Empowering families with knowledge to stay safe online.",
    image: serviceFamilySafety,
    link: "/training",
  },
  {
    icon: Brain,
    title: "AI Detection",
    description: "Smart technology that identifies threats before they reach you.",
    image: serviceAiBusiness,
    link: "/business",
  },
  {
    icon: Clock,
    title: "24/7 Monitoring",
    description: "Round-the-clock protection and immediate threat response.",
    image: serviceTraining,
    link: "/training",
  },
];

export const ServicesShowcase = () => {
  return (
    <section className="py-24 bg-muted/30 relative overflow-hidden">
      {/* Subtle grid pattern */}
      <GridPattern className="opacity-50" />
      
      {/* Geometric corner accents */}
      <GeometricCorner position="top-left" variant="triangles" />
      <GeometricCorner position="bottom-right" variant="dots" />
      
      {/* Diagonal stripe decorations */}
      <div className="absolute top-0 left-0 w-32 h-32 pointer-events-none">
        <div className="absolute inset-0 bg-primary/5 transform -skew-x-12" />
      </div>
      <div className="absolute bottom-0 right-0 w-48 h-32 pointer-events-none">
        <div className="absolute inset-0 bg-accent/5 transform skew-x-12" />
        <div className="absolute inset-4 bg-accent/5 transform skew-x-12 opacity-50" />
      </div>
      
      {/* Animated floating shapes */}
      <motion.div 
        className="absolute top-20 left-20 w-40 h-40 rounded-full bg-primary/5"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div 
        className="absolute bottom-20 right-10 w-28 h-28 rounded-full bg-accent/10"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          {/* Angular badge */}
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
          
          {/* Decorative dotted line */}
          <DottedPattern direction="horizontal" length={8} className="justify-center mt-6" />
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <Link to={service.link} className="block">
                <div className="bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 relative">
                  {/* Corner triangle accent */}
                  <div 
                    className="absolute top-0 right-0 w-0 h-0 z-10"
                    style={{
                      borderTop: "32px solid hsl(var(--primary) / 0.15)",
                      borderLeft: "32px solid transparent",
                    }}
                  />
                  
                  {/* Image with circular accent and hexagon overlay */}
                  <div className="relative p-6 pb-0">
                    <div className="relative">
                      {/* Circular image container with hover magnification */}
                      <div className="rounded-full overflow-hidden aspect-square border-4 border-background shadow-lg">
                        <motion.img
                          src={service.image}
                          alt={service.title}
                          className="w-full h-full object-cover"
                          whileHover={{ scale: 1.25 }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                      
                      {/* Rotating ring decoration */}
                      <motion.div 
                        className="absolute -inset-2 border-2 border-dashed border-primary/20 rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      />
                      
                      {/* Animated decorative dots */}
                      <motion.div 
                        className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-accent"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                      />
                      <motion.div 
                        className="absolute -bottom-1 -left-1 w-4 h-4 rounded-full bg-primary/30"
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.3 }}
                      />
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6 text-center">
                    {/* Hexagon icon */}
                    <div className="flex justify-center mb-4">
                      <HexagonIcon size="md" animated className="group-hover:scale-110 transition-transform">
                        <service.icon className="w-6 h-6 text-primary" />
                      </HexagonIcon>
                    </div>
                    <h3 className="font-bold text-lg mb-2 text-foreground group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {service.description}
                    </p>
                    
                    {/* Arrow indicator */}
                    <motion.div 
                      className="mt-4 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight className="w-5 h-5 text-primary" />
                    </motion.div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA with geometric styling */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12 relative"
        >
          {/* Dotted lines leading to button */}
          <DottedPattern direction="horizontal" length={4} className="absolute left-1/4 top-1/2 -translate-y-1/2 -translate-x-full" />
          <DottedPattern direction="horizontal" length={4} className="absolute right-1/4 top-1/2 -translate-y-1/2 translate-x-full" />
          
          <Button asChild size="lg" className="rounded-full px-8 relative z-10">
            <Link to="/services">
              Learn More About Our Services
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesShowcase;
