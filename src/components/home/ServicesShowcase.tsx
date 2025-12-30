import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Users, Brain, Clock } from "lucide-react";
import serviceScamshield from "@/assets/service-scamshield.jpg";
import serviceTraining from "@/assets/service-training.jpg";
import serviceAiBusiness from "@/assets/service-ai-business.jpg";
import serviceFamilySafety from "@/assets/service-family-safety.jpg";

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
      {/* Decorative elements */}
      <div className="absolute top-20 left-20 w-40 h-40 rounded-full bg-primary/5" />
      <div className="absolute bottom-20 right-10 w-28 h-28 rounded-full bg-accent/10" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wider mb-4 block">
            Our Expertise
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            We Have Experience And A{" "}
            <span className="text-primary">Team Of Experts</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            We believe in protecting families through education and empowerment.
          </p>
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
                <div className="bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/30 hover:shadow-xl transition-all duration-300">
                  {/* Image with circular accent */}
                  <div className="relative p-6 pb-0">
                    <div className="relative">
                      {/* Circular image container */}
                      <div className="rounded-full overflow-hidden aspect-square border-4 border-background shadow-lg">
                        <img
                          src={service.image}
                          alt={service.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      {/* Decorative dots */}
                      <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-accent" />
                      <div className="absolute -bottom-1 -left-1 w-4 h-4 rounded-full bg-primary/30" />
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6 text-center">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                      <service.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-bold text-lg mb-2 text-foreground group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button asChild variant="outline" size="lg" className="rounded-full px-8">
            <Link to="/about">
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
