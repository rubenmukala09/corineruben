import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Shield, ArrowRight, TrendingUp, Phone, Mail, CreditCard, Eye, AlertTriangle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import teamCollaborationBg from "@/assets/team-collaboration-bg.jpg";

const scamAlerts = [
  {
    icon: Phone,
    title: "AI Voice Clone Scams",
    description: "Scammers using AI to clone family members' voices asking for emergency money.",
    trend: "+340%",
    tip: "Always verify with a callback to a known number.",
  },
  {
    icon: Mail,
    title: "Fake IRS/SSA Emails",
    description: "Phishing emails claiming tax issues or benefit problems.",
    trend: "+180%",
    tip: "The IRS never initiates contact via email.",
  },
  {
    icon: CreditCard,
    title: "Gift Card Payment Requests",
    description: "Any legitimate organization will never ask for payment in gift cards.",
    trend: "+95%",
    tip: "This is always a scam - hang up immediately.",
  },
];

const quickTips = [
  "Never give personal info to incoming callers",
  "Verify requests through official channels",
  "Don't click links in unexpected emails",
  "Trust your instincts - if it feels wrong, it is",
];

export const ScamAlertsSection = () => {
  const [activeAlert, setActiveAlert] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveAlert((prev) => (prev + 1) % scamAlerts.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 relative overflow-hidden bg-background">
      {/* Clean white background with subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-background to-muted/30" />
      
      {/* Subtle floating particles */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-primary/20"
          style={{
            left: `${15 + i * 20}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.3,
          }}
        />
      ))}
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <Eye className="w-4 h-4 text-primary" />
            </motion.div>
            <span className="text-sm font-semibold text-primary">Active Threat Intelligence</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Know the <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Threats</span>, Stay <span className="text-primary">Ahead</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Real-time intelligence on scams targeting your community right now.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left - Alert Cards */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            {scamAlerts.map((alert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setActiveAlert(index)}
                className={`p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                  index === activeAlert
                    ? "bg-card border-primary/30 shadow-lg shadow-primary/10"
                    : "bg-card/50 border-border hover:border-primary/30"
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 ${
                    index === activeAlert ? "bg-primary/20" : "bg-muted"
                  }`}>
                    <alert.icon className={`w-7 h-7 ${
                      index === activeAlert ? "text-primary" : "text-muted-foreground"
                    }`} />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-lg text-foreground">{alert.title}</h3>
                      <span className="text-accent text-sm font-bold flex items-center gap-1">
                        <TrendingUp className="w-4 h-4" />
                        {alert.trend}
                      </span>
                    </div>
                    <p className="text-muted-foreground text-sm mb-3">{alert.description}</p>
                    
                    <AnimatePresence>
                      {index === activeAlert && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="pt-3 border-t border-border"
                        >
                          <p className="text-sm text-primary font-medium flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4" />
                            Tip: {alert.tip}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Right - Quick Tips & CTA */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Quick Tips Card */}
            <div className="bg-card rounded-2xl p-8 border border-border shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Quick Protection Tips</h3>
              </div>
              
              <div className="space-y-4">
                {quickTips.map((tip, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-3.5 h-3.5 text-primary-foreground" />
                    </div>
                    <span className="text-muted-foreground">{tip}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* CTA - With blurry background image */}
            <div className="relative rounded-2xl overflow-hidden">
              {/* Background image with blur */}
              <div className="absolute inset-0">
                <img 
                  src={teamCollaborationBg} 
                  alt="" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 backdrop-blur-md bg-primary/60" />
              </div>
              
              <div className="relative z-10 p-8 text-center">
                <h3 className="text-xl font-bold text-white mb-3">
                  Take Action Now
                </h3>
                <p className="text-white/90 mb-6">
                  Get protected before scammers find you
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild variant="secondary" size="lg" className="rounded-full">
                    <Link to="/training#pricing">
                      Get Protected Now
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};