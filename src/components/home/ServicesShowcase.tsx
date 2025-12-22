import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Users, Leaf, Clock, DollarSign, ArrowRight, Zap } from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Experienced Staff",
    description: "Veteran-owned team with 22+ years of combined cybersecurity experience and military training.",
    color: "from-primary/20 to-primary/5",
  },
  {
    icon: Leaf,
    title: "Ethical Approach",
    description: "Human-centered security that doesn't rely on invasive monitoring or data collection.",
    color: "from-success/20 to-success/5",
  },
  {
    icon: Clock,
    title: "Fast Service",
    description: "24-hour response time on all security incidents with immediate threat assessment.",
    color: "from-accent/20 to-accent/5",
  },
  {
    icon: DollarSign,
    title: "Transparent Pricing",
    description: "Clear, upfront pricing with no hidden fees. Veteran and senior discounts available.",
    color: "from-primary/20 to-accent/5",
  },
];

export const ServicesShowcase = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-muted/30 via-background to-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute top-40 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-40 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.span 
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-8"
              whileHover={{ scale: 1.05 }}
            >
              <Zap className="w-4 h-4" />
              Our Expertise
            </motion.span>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
              We Have Experience
              <br />
              And We Have A{" "}
              <span className="text-primary">Team</span>
              <br />
              <span className="font-serif italic">Of Experts</span>
            </h2>

            <p className="text-muted-foreground text-xl mb-10 leading-relaxed max-w-lg">
              We believe in protecting families through education and empowerment. 
              Our team of certified experts provides personalized security solutions 
              that are easy to understand and implement.
            </p>

            <Button asChild size="lg" className="group px-8 py-6 text-lg rounded-xl">
              <Link to="/about">
                Read More
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
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
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group p-8 rounded-3xl bg-card border border-border/50 hover:shadow-2xl hover:border-primary/30 transition-all duration-500"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-bold text-xl mb-3 text-foreground group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
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
