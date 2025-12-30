import { motion } from "framer-motion";
import { Shield, Users, Brain, Heart, ArrowRight, CheckCircle, Sparkles, Lock, Eye, Zap, Building2, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import teamCollaborationBg from "@/assets/team-collaboration-bg.jpg";

const coreValues = [
  {
    icon: Shield,
    title: "Protection First",
    description: "Every family deserves safety from digital threats. We make enterprise-grade security accessible to everyone.",
    color: "from-blue-500/20 to-indigo-500/20",
    iconColor: "text-blue-500",
  },
  {
    icon: Brain,
    title: "AI-Powered Defense",
    description: "Our systems learn and adapt faster than scammers can evolve, keeping you one step ahead.",
    color: "from-purple-500/20 to-pink-500/20",
    iconColor: "text-purple-500",
  },
  {
    icon: Building2,
    title: "Business Solutions",
    description: "From startups to enterprises, we provide comprehensive cybersecurity training and protection.",
    color: "from-emerald-500/20 to-teal-500/20",
    iconColor: "text-emerald-500",
  },
  {
    icon: GraduationCap,
    title: "Expert Training",
    description: "We train individuals, families, companies, and organizations to recognize and prevent threats.",
    color: "from-amber-500/20 to-orange-500/20",
    iconColor: "text-amber-500",
  },
];

const whyUsPoints = [
  "24/7 real-time threat monitoring",
  "Veteran-owned, Ohio-based company",
  "Enterprise AI technology made simple",
  "Personal support, not chatbots",
  "60-day money-back guarantee",
  "Trusted by 500+ Ohio families",
];

export const CompanyIntroSection = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-background via-muted/20 to-background relative overflow-hidden">
      {/* Decorative floating shapes */}
      <motion.div 
        className="absolute top-20 left-10 w-64 h-64 rounded-full bg-gradient-to-br from-primary/5 to-accent/5 blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div 
        className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-gradient-to-br from-accent/5 to-primary/5 blur-3xl"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
            whileHover={{ scale: 1.02 }}
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">Who We Are</span>
          </motion.div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Your{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Trusted Security Partners
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            In today's world, scammers use AI to create convincing attacks that fool even the smartest people. 
            <strong className="text-foreground"> Without protection, it's not if you'll be targeted—it's when.</strong> 
            {" "}We're here to make sure you never face that threat alone.
          </p>
        </motion.div>

        {/* Core Values Grid - Redesigned with better cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {coreValues.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group"
            >
              <div className="h-full bg-card rounded-2xl p-6 border border-border hover:border-primary/40 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 relative overflow-hidden">
                {/* Gradient background on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                
                <div className="relative z-10">
                  <motion.div 
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${value.color} flex items-center justify-center mb-5`}
                    whileHover={{ rotate: 5, scale: 1.05 }}
                  >
                    <value.icon className={`w-8 h-8 ${value.iconColor}`} />
                  </motion.div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{value.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Why You Need Us Section - With Background Image and blur */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden"
        >
          {/* Background image with blur effect */}
          <div className="absolute inset-0">
            <img 
              src={teamCollaborationBg} 
              alt="" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 backdrop-blur-md bg-background/70" />
          </div>
          
          <div className="relative z-10 p-8 md:p-12 border border-primary/20 rounded-3xl">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left: Message */}
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 mb-6">
                  <Lock className="w-3.5 h-3.5 text-accent" />
                  <span className="text-xs font-semibold text-accent uppercase tracking-wider">Why Protection Matters</span>
                </div>
                
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  The Threats Are Real.<br />
                  <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Your Defense Should Be Too.</span>
                </h3>
                
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Every 11 seconds, someone becomes a victim of identity theft. AI-powered scams are growing 
                  300% year over year. Seniors lose an average of $9,000 per scam incident. 
                  <strong className="text-foreground"> Don't become a statistic.</strong>
                </p>

                <div className="grid grid-cols-2 gap-3 mb-8">
                  {whyUsPoints.map((point, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center gap-2"
                    >
                      <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                      <span className="text-sm text-foreground">{point}</span>
                    </motion.div>
                  ))}
                </div>

                <Button asChild size="lg" className="rounded-full">
                  <Link to="/services">
                    Start Your Protection
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </div>

              {/* Right: Visual Stats - Redesigned with blurry glassmorphism */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Eye, value: "24/7", label: "Monitoring", gradient: "from-blue-500 to-indigo-500" },
                  { icon: Zap, value: "< 1s", label: "Response Time", gradient: "from-amber-500 to-orange-500" },
                  { icon: Shield, value: "99.9%", label: "Success Rate", gradient: "from-emerald-500 to-teal-500" },
                  { icon: Users, value: "500+", label: "Families Protected", gradient: "from-purple-500 to-pink-500" },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                    className="backdrop-blur-xl bg-card/80 rounded-2xl p-6 border border-border/50 hover:border-primary/30 transition-all text-center shadow-lg"
                  >
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center mx-auto mb-3`}>
                      <stat.icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                      {stat.value}
                    </div>
                    <div className="text-xs text-muted-foreground font-medium mt-1">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};