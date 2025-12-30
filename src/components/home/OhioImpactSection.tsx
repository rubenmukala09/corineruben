import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { MapPin, Users, Shield, Heart, Star, Building2, Award, CheckCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import ohioMapHero from "@/assets/ohio-map-hero.jpg";

const impactStats = [
  { icon: Users, value: 500, suffix: "+", label: "Ohio Families Protected", color: "from-primary to-accent" },
  { icon: Shield, value: 2.3, suffix: "M", prefix: "$", label: "Scam Money Saved", color: "from-green-500 to-emerald-500" },
  { icon: Building2, value: 45, suffix: "+", label: "Local Business Partners", color: "from-blue-500 to-cyan-500" },
  { icon: Heart, value: 12, suffix: "+", label: "Community Events/Year", color: "from-pink-500 to-rose-500" },
];

const ohioCities = [
  { name: "Columbus", protected: 180 },
  { name: "Cleveland", protected: 95 },
  { name: "Cincinnati", protected: 85 },
  { name: "Toledo", protected: 45 },
  { name: "Akron", protected: 35 },
  { name: "Dayton", protected: 30 },
  { name: "Parma", protected: 15 },
  { name: "Canton", protected: 10 },
  { name: "Youngstown", protected: 5 },
];

const testimonials = [
  {
    quote: "As a retired teacher in Columbus, I was terrified of the phone scams targeting seniors. InVision Network gave me the tools and confidence to protect myself.",
    name: "Margaret T.",
    location: "Columbus, OH",
    role: "Retired Educator"
  },
  {
    quote: "They saved my parents from losing $15,000 to a gift card scam. I can't thank them enough for protecting my family.",
    name: "David R.",
    location: "Cleveland, OH",
    role: "Business Owner"
  },
  {
    quote: "Finally, a company that actually cares about Ohio families. They're not just selling software—they're building community.",
    name: "Sarah M.",
    location: "Cincinnati, OH",
    role: "Healthcare Worker"
  }
];

const AnimatedCounter = ({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (hasAnimated) return;
    
    const duration = 2000;
    const steps = 60;
    const stepValue = value / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += stepValue;
      if (current >= value) {
        current = value;
        clearInterval(timer);
      }
      setCount(current);
    }, duration / steps);

    setHasAnimated(true);
    return () => clearInterval(timer);
  }, [value, hasAnimated]);

  const displayValue = value % 1 !== 0 ? count.toFixed(1) : Math.floor(count);
  return <>{prefix}{displayValue}{suffix}</>;
};

export const OhioImpactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const mapScale = useTransform(scrollYProgress, [0, 0.5], [1.1, 1]);
  const mapOpacity = useTransform(scrollYProgress, [0, 0.3], [0.3, 0.6]);

  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 overflow-hidden">
      {/* Ohio Map Background */}
      <motion.div 
        className="absolute inset-0"
        style={{ scale: mapScale }}
      >
        <motion.img 
          src={ohioMapHero} 
          alt="" 
          className="w-full h-full object-cover"
          style={{ opacity: mapOpacity }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background" />
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div 
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 border border-primary/20 mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <MapPin className="w-4 h-4 text-primary" />
            <span className="text-sm font-bold text-primary uppercase tracking-wider">Ohio Proud</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Protecting{" "}
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              The Buckeye State
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We're not a faceless corporation. We're your neighbors—veteran-owned, Ohio-based, 
            and committed to protecting families across every county.
          </p>
        </motion.div>

        {/* Impact Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
        >
          {impactStats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Card className="relative p-8 text-center overflow-hidden border-2 hover:border-primary/30 transition-all duration-300 bg-card/80 backdrop-blur-sm group">
                {/* Gradient glow on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                
                <motion.div 
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center mx-auto mb-4 shadow-lg`}
                  whileHover={{ rotate: 12 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <stat.icon className="w-8 h-8 text-white" />
                </motion.div>
                <div className={`text-4xl lg:text-5xl font-bold mb-2 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                  <AnimatedCounter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                </div>
                <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Cities & Testimonials Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Cities We Serve */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card className="p-8 h-full border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-card to-card">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Communities We Serve</h3>
                  <p className="text-sm text-muted-foreground">Protecting families across Ohio</p>
                </div>
              </div>
              
              <div className="space-y-3">
                {ohioCities.slice(0, 6).map((city, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center justify-between p-3 rounded-xl bg-background/50 border border-border hover:border-primary/30 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="font-medium">{city.name}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {city.protected}+ families
                    </span>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 flex items-center justify-between">
                <span className="text-sm text-muted-foreground">+ Many more communities</span>
                <Button asChild variant="link" className="p-0 h-auto">
                  <Link to="/about">See all locations →</Link>
                </Button>
              </div>
            </Card>
          </motion.div>

          {/* Featured Testimonial */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card className="relative p-8 h-full border-2 border-border bg-card overflow-hidden">
              {/* Decorative quote */}
              <div className="absolute top-4 right-6 text-8xl font-serif text-primary/10 leading-none">"</div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-6">
                  <Award className="w-5 h-5 text-amber-500" />
                  <span className="text-sm font-semibold text-amber-500">Community Voices</span>
                </div>

                <motion.div
                  key={activeTestimonial}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Stars */}
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-6 h-6 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  <blockquote className="text-xl md:text-2xl font-medium leading-relaxed mb-8 min-h-[120px]">
                    "{testimonials[activeTestimonial].quote}"
                  </blockquote>

                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-xl">
                      {testimonials[activeTestimonial].name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-lg">{testimonials[activeTestimonial].name}</div>
                      <div className="text-sm text-muted-foreground">
                        {testimonials[activeTestimonial].role} • {testimonials[activeTestimonial].location}
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Navigation dots */}
                <div className="flex gap-2 mt-8">
                  {testimonials.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveTestimonial(idx)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        idx === activeTestimonial 
                          ? 'bg-primary w-8' 
                          : 'bg-muted-foreground/30 w-2 hover:bg-muted-foreground/50'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 rounded-2xl bg-gradient-to-r from-primary/10 via-transparent to-accent/10 border border-primary/20">
            <span className="text-lg font-medium">Ready to protect your Ohio family?</span>
            <Button asChild size="lg" className="group">
              <Link to="/training#pricing">
                Get Started Today
                <Award className="ml-2 w-4 h-4 group-hover:rotate-12 transition-transform" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
