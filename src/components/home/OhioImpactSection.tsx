import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { MapPin, Users, Shield, Heart, Star, Building2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const impactStats = [
  { icon: Users, value: "500+", label: "Ohio Families Protected", color: "text-primary" },
  { icon: Shield, value: "$2.3M", label: "Scam Money Saved", color: "text-green-500" },
  { icon: Building2, value: "45+", label: "Local Business Partners", color: "text-accent" },
  { icon: Heart, value: "12+", label: "Community Events/Year", color: "text-pink-500" },
];

const ohioCities = [
  "Columbus", "Cleveland", "Cincinnati", "Toledo", "Akron", 
  "Dayton", "Parma", "Canton", "Youngstown", "Lorain"
];

export const OhioImpactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-b from-primary/5 via-background to-background relative overflow-hidden">
      {/* Parallax background pattern */}
      <motion.div 
        className="absolute inset-0 opacity-[0.03]"
        style={{ y: backgroundY }}
      >
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(var(--primary)) 1px, transparent 0)',
            backgroundSize: '48px 48px'
          }}
        />
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <MapPin className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">Proudly Ohio-Based</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Protecting Our{" "}
            <span className="text-primary">Ohio Community</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We're not a faceless corporation. We're your neighbors, serving families across the Buckeye State.
          </p>
        </motion.div>

        {/* Impact Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {impactStats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6 text-center hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20 bg-card/80 backdrop-blur-sm">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className={`text-3xl md:text-4xl font-bold mb-1 ${stat.color}`}>{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Cities We Serve */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 rounded-2xl p-8 border border-primary/10"
        >
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-shrink-0 text-center md:text-left">
              <h3 className="text-xl font-bold mb-2">Communities We Serve</h3>
              <p className="text-sm text-muted-foreground">Local support across Ohio</p>
            </div>
            
            <div className="flex-1 flex flex-wrap justify-center gap-2">
              {ohioCities.map((city, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                  className="px-4 py-2 rounded-full bg-background border border-border text-sm font-medium hover:border-primary/30 hover:bg-primary/5 transition-colors cursor-default"
                >
                  {city}
                </motion.span>
              ))}
              <span className="px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary">
                + More
              </span>
            </div>
          </div>
        </motion.div>

        {/* Testimonial Snippet */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 max-w-3xl mx-auto text-center"
        >
          <Card className="p-8 bg-card border-2 border-primary/10">
            <div className="flex justify-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <blockquote className="text-lg md:text-xl italic text-foreground mb-4 leading-relaxed">
              "As a retired teacher in Columbus, I was terrified of the phone scams targeting seniors. 
              InVision Network gave me the tools and confidence to protect myself and my family."
            </blockquote>
            <div className="text-muted-foreground">
              <span className="font-semibold text-foreground">Margaret T.</span>
              <span className="mx-2">•</span>
              <span>Columbus, OH</span>
            </div>
          </Card>
          
          <Button asChild variant="ghost" className="mt-6">
            <Link to="/about">
              Learn More About Us
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
