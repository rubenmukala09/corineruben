import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Lightbulb, Award, Shield, ArrowRight, TrendingUp } from "lucide-react";

const features = [
  {
    icon: Lightbulb,
    title: "Our Benefits",
    description: "Comprehensive security assessments and personalized protection plans tailored for your unique needs.",
    linkText: "More Details",
    gradient: "from-accent/20 to-primary/20",
    iconColor: "text-accent",
    iconBg: "from-accent/15 to-primary/15",
  },
  {
    icon: Award,
    title: "100% Satisfaction Guarantee",
    description: "Complete confidence in our services with our money-back guarantee on all protection plans.",
    highlighted: true,
    gradient: "from-primary via-primary to-accent/80",
    iconColor: "text-primary-foreground",
  },
  {
    icon: Shield,
    title: "Professionalism",
    description: "Veteran-owned with certified cybersecurity experts dedicated to your family's safety.",
    linkText: "Read More",
    gradient: "from-primary/20 to-accent/20",
    iconColor: "text-primary",
    iconBg: "from-primary/15 to-accent/15",
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
    <section className="py-32 bg-gradient-to-b from-background via-purple-100/20 to-background relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(var(--primary)) 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}
        />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <TrendingUp className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Why Choose Us</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 tracking-tight">
            Why Will You Choose
            <br />
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Our Services?</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience the difference of professional, veteran-owned cybersecurity services.
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-24">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className={`group relative p-10 rounded-3xl transition-all duration-500 ${
                feature.highlighted
                  ? "bg-gradient-to-br from-primary via-primary to-accent/90 text-primary-foreground shadow-2xl shadow-primary/25"
                  : "bg-card border border-primary/10 hover:shadow-2xl hover:border-primary/25 hover:shadow-primary/10"
              }`}
            >
              {/* Subtle gradient overlay for non-highlighted */}
              {!feature.highlighted && (
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 from-primary/[0.02] to-accent/[0.02]" />
              )}
              
              <div className="relative z-10">
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-all duration-500 group-hover:scale-110 ${
                    feature.highlighted
                      ? "bg-primary-foreground/20"
                      : `bg-gradient-to-br ${feature.iconBg || feature.gradient}`
                  }`}
                >
                  <feature.icon className={`w-8 h-8 ${feature.highlighted ? "text-primary-foreground" : feature.iconColor}`} strokeWidth={1.5} />
                </div>
                
                <h3 className={`font-bold text-2xl mb-4 ${!feature.highlighted && "text-foreground"}`}>
                  {feature.title}
                </h3>
                
                <p className={`text-base mb-8 leading-relaxed ${feature.highlighted ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                  {feature.description}
                </p>
                
                {feature.linkText && (
                  <Link 
                    to="/about" 
                    className={`inline-flex items-center gap-2 text-sm font-semibold group-hover:gap-3 transition-all ${
                      feature.highlighted ? "text-primary-foreground" : "text-primary"
                    }`}
                  >
                    {feature.linkText}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
              className="group text-center p-8 rounded-2xl bg-gradient-to-br from-card to-purple-100/30 border border-primary/10 hover:border-primary/25 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300"
            >
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2 tracking-tight">
                {stat.value}
              </div>
              <div className="font-semibold text-foreground text-lg mb-1">{stat.label}</div>
              <div className="text-sm text-muted-foreground">{stat.sublabel}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeatureBar;
