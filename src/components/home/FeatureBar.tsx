import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Lightbulb, Award, Shield, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Lightbulb,
    title: "Our Benefits",
    description: "Get comprehensive security assessments and personalized protection plans for your needs.",
    linkText: "More Details",
  },
  {
    icon: Award,
    title: "100% Satisfaction Guarantee",
    description: "Complete confidence in our services with our money-back guarantee on all protection plans.",
    highlighted: true,
  },
  {
    icon: Shield,
    title: "Professionalism",
    description: "Veteran-owned with certified cybersecurity experts dedicated to your family's safety.",
    linkText: "Read More",
  },
];

const stats = [
  { value: "246+", label: "Protected Clients", sublabel: "Families & businesses" },
  { value: "299K", label: "Scams Blocked", sublabel: "Threats prevented" },
  { value: "364+", label: "Ohio Partners", sublabel: "Community trust" },
  { value: "199+", label: "Happy Clients", sublabel: "5-star reviews" },
];

export const FeatureBar = () => {
  return (
    <section className="py-16 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
            Why Choose Us
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            Why Will <span className="font-serif italic text-primary">You</span> Choose
            <br />Our <span className="text-primary">Services</span>?
          </h2>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`group p-8 rounded-2xl transition-all duration-300 ${
                feature.highlighted
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border hover:shadow-xl hover:-translate-y-1"
              }`}
            >
              <div
                className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 ${
                  feature.highlighted
                    ? "bg-white/20"
                    : "bg-gradient-to-br from-primary/10 to-accent/10"
                }`}
              >
                <feature.icon
                  className={`w-8 h-8 ${
                    feature.highlighted ? "text-white" : "text-primary"
                  }`}
                />
              </div>
              <h3
                className={`font-bold text-xl mb-3 ${
                  feature.highlighted ? "" : "text-foreground"
                }`}
              >
                {feature.title}
              </h3>
              <p
                className={`text-sm mb-4 ${
                  feature.highlighted ? "text-white/80" : "text-muted-foreground"
                }`}
              >
                {feature.description}
              </p>
              {feature.linkText && (
                <Link 
                  to="/about" 
                  className={`inline-flex items-center gap-1 text-sm font-semibold hover:gap-2 transition-all ${
                    feature.highlighted ? "text-white" : "text-primary"
                  }`}
                >
                  {feature.linkText}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              )}
            </motion.div>
          ))}
        </div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              className="text-center p-6 rounded-2xl bg-muted/50 hover:bg-muted transition-colors"
            >
              <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-2">
                {stat.value}
              </div>
              <div className="font-semibold text-foreground">{stat.label}</div>
              <div className="text-sm text-muted-foreground">{stat.sublabel}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeatureBar;
