import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Users, Leaf, Clock, DollarSign, ArrowRight } from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Experienced Staff",
    description: "Veteran-owned team with 22+ years of combined cybersecurity experience and military training.",
  },
  {
    icon: Leaf,
    title: "Natural Products",
    description: "Organic, human-centered approach to security that doesn't rely on invasive monitoring.",
  },
  {
    icon: Clock,
    title: "Fast Service",
    description: "24-hour response time on all security incidents with immediate threat assessment.",
  },
  {
    icon: DollarSign,
    title: "Transparent Pricing",
    description: "Clear, upfront pricing with no hidden fees. Veteran and senior discounts available.",
  },
];

export const ServicesShowcase = () => {
  return (
    <section className="py-20 bg-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">
              Our Expertise
            </span>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              We Have Experience
              <br />
              And We Have A{" "}
              <span className="text-primary">Team</span>
              <br />
              <span className="font-serif italic">Of Experts</span>
            </h2>

            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              We believe in protecting families through education and empowerment. 
              Our team of certified experts provides personalized security solutions 
              that are easy to understand and implement.
            </p>

            <Button asChild size="lg" className="group">
              <Link to="/about">
                Read More
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </motion.div>

          {/* Right - Features Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 gap-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="group p-6 rounded-2xl bg-card border border-border hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2 text-foreground group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ServicesShowcase;
