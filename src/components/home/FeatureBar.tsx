import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Lightbulb, Award, Shield, GraduationCap } from "lucide-react";

const features = [
  {
    icon: Lightbulb,
    title: "Expert Training",
    description: "Learn to identify and prevent AI-powered scams with our comprehensive training programs.",
  },
  {
    icon: Award,
    title: "Certified Protection",
    description: "Industry-recognized security solutions backed by certified cybersecurity professionals.",
  },
  {
    icon: Shield,
    title: "24/7 Monitoring",
    description: "Round-the-clock threat detection and immediate response to protect your family.",
  },
  {
    icon: GraduationCap,
    title: "Family Education",
    description: "Empowering every family member with the knowledge to stay safe online.",
  },
];

const stats = [
  { value: "246+", label: "Protected Clients" },
  { value: "299K", label: "Scams Blocked" },
  { value: "364+", label: "Ohio Partners" },
  { value: "11+", label: "Years Experience" },
];

export const FeatureBar = () => {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-20 right-20 w-32 h-32 rounded-full bg-primary/5" />
      <div className="absolute bottom-40 left-10 w-20 h-20 rounded-full bg-accent/10" />
      <div className="absolute top-1/2 right-1/4 w-16 h-16 rounded-full bg-primary/10" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wider mb-4 block">Why Choose Us</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Why Will You Choose{" "}
            <span className="text-primary">Our Services?</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Experience the difference of professional, veteran-owned cybersecurity services.
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group text-center"
            >
              {/* Icon with decorative circle */}
              <div className="relative inline-block mb-6">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto group-hover:bg-primary/20 transition-colors duration-300">
                  <feature.icon className="w-10 h-10 text-primary" strokeWidth={1.5} />
                </div>
                {/* Decorative dot */}
                <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-accent" />
              </div>
              
              <h3 className="font-bold text-xl mb-3 text-foreground group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-primary rounded-2xl p-8 md:p-12"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-primary-foreground mb-2">
                  {stat.value}
                </div>
                <div className="text-primary-foreground/80 text-sm font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeatureBar;
