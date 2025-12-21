import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Shield, Flame, Home, ArrowRight } from "lucide-react";
import heroSecurityCamera from "@/assets/hero-security-camera.jpg";

const services = [
  {
    icon: Shield,
    title: "ScamShield Protection",
    description:
      "AI-powered scanning and verification of suspicious messages, calls, and emails. 24-hour analysis with expert recommendations.",
    image: heroSecurityCamera,
    featured: true,
  },
  {
    icon: Flame,
    title: "Emergency Response",
    description:
      "Immediate intervention when you've been targeted or compromised. Our experts help minimize damage and secure your accounts.",
  },
  {
    icon: Home,
    title: "Family Training",
    description:
      "Comprehensive cybersecurity training for the whole family. Learn to identify and prevent scams before they happen.",
  },
];

export const ServicesShowcase = () => {
  return (
    <section className="py-20 bg-muted/30 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">
            Our Services
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            We Provide The{" "}
            <span className="text-primary">Best Services</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive protection solutions designed for seniors and families
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card
                className={`group h-full overflow-hidden border-0 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl ${
                  service.featured
                    ? "bg-gradient-to-br from-primary/5 to-accent/5"
                    : "bg-card"
                }`}
              >
                {/* Circular Image for featured */}
                {service.featured && service.image && (
                  <div className="relative p-6 pb-0">
                    <div className="relative w-48 h-48 mx-auto">
                      <div className="absolute inset-0 rounded-full border-2 border-dashed border-primary/20 animate-[spin_30s_linear_infinite]" />
                      <div className="absolute inset-2 rounded-full overflow-hidden shadow-lg">
                        <img
                          src={service.image}
                          alt={service.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {/* Floating badge */}
                      <motion.div
                        className="absolute -top-2 -right-2 w-12 h-12 bg-accent rounded-full flex items-center justify-center shadow-lg"
                        animate={{ y: [0, -5, 0] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        <service.icon className="w-6 h-6 text-white" />
                      </motion.div>
                    </div>
                  </div>
                )}

                <div className="p-6">
                  {!service.featured && (
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <service.icon className="w-7 h-7 text-primary" />
                    </div>
                  )}

                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground mb-6">{service.description}</p>

                  <Button
                    variant={service.featured ? "default" : "outline"}
                    size="sm"
                    asChild
                    className="group/btn"
                  >
                    <Link to="/services">
                      Learn More
                      <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesShowcase;
