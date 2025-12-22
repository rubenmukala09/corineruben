import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Lightbulb, Award, Shield, ArrowRight, Sparkles } from "lucide-react";

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
  { value: "246+", label: "Protected Clients", sublabel: "Families & businesses", icon: "👨‍👩‍👧‍👦" },
  { value: "299K", label: "Scams Blocked", sublabel: "Threats prevented", icon: "🛡️" },
  { value: "364+", label: "Ohio Partners", sublabel: "Community trust", icon: "🤝" },
  { value: "199+", label: "Happy Clients", sublabel: "5-star reviews", icon: "⭐" },
];

export const FeatureBar = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-background via-background to-muted/30 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span 
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Sparkles className="w-4 h-4" />
            Why Choose Us
          </motion.span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Why Will <span className="font-serif italic text-primary">You</span> Choose
            <br />Our <span className="text-primary">Services</span>?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience the difference of professional, veteran-owned cybersecurity services.
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className={`group p-10 rounded-3xl transition-all duration-500 ${
                feature.highlighted
                  ? "bg-gradient-to-br from-primary via-primary to-primary/90 text-primary-foreground shadow-2xl shadow-primary/25"
                  : "bg-card border border-border/50 hover:shadow-2xl hover:border-primary/20"
              }`}
            >
              <div
                className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-8 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 ${
                  feature.highlighted
                    ? "bg-white/20 shadow-lg"
                    : "bg-gradient-to-br from-primary/10 to-accent/10"
                }`}
              >
                <feature.icon
                  className={`w-10 h-10 ${
                    feature.highlighted ? "text-white" : "text-primary"
                  }`}
                />
              </div>
              <h3
                className={`font-bold text-2xl mb-4 ${
                  feature.highlighted ? "" : "text-foreground"
                }`}
              >
                {feature.title}
              </h3>
              <p
                className={`text-base mb-6 leading-relaxed ${
                  feature.highlighted ? "text-white/80" : "text-muted-foreground"
                }`}
              >
                {feature.description}
              </p>
              {feature.linkText && (
                <Link 
                  to="/about" 
                  className={`inline-flex items-center gap-2 text-sm font-semibold hover:gap-3 transition-all ${
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
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              className="text-center p-8 rounded-3xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-xl transition-all duration-300"
            >
              <div className="text-4xl mb-4">{stat.icon}</div>
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                {stat.value}
              </div>
              <div className="font-semibold text-foreground text-lg">{stat.label}</div>
              <div className="text-sm text-muted-foreground">{stat.sublabel}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeatureBar;
