import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { AlertTriangle, Shield, ArrowRight, TrendingUp, Phone, Mail, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

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
    <section className="py-24 bg-muted/30 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 right-20 w-32 h-32 rounded-full bg-destructive/5" />
      <div className="absolute bottom-20 left-10 w-24 h-24 rounded-full bg-primary/5" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-destructive/10 border border-destructive/20 mb-6">
            <AlertTriangle className="w-4 h-4 text-destructive" />
            <span className="text-sm font-semibold text-destructive">Live Threat Monitor</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            <span className="text-destructive">Active Threats</span> in Ohio
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
                    ? "bg-card border-destructive/30 shadow-lg"
                    : "bg-card/50 border-border hover:border-primary/30"
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 ${
                    index === activeAlert ? "bg-destructive/10" : "bg-muted"
                  }`}>
                    <alert.icon className={`w-7 h-7 ${
                      index === activeAlert ? "text-destructive" : "text-muted-foreground"
                    }`} />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-lg text-foreground">{alert.title}</h3>
                      <span className="text-destructive text-sm font-bold flex items-center gap-1">
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
                          <p className="text-sm text-primary font-medium">
                            💡 Tip: {alert.tip}
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
            <div className="bg-card rounded-2xl p-8 border border-border">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
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
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-primary-foreground">{index + 1}</span>
                    </div>
                    <span className="text-muted-foreground">{tip}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="bg-primary rounded-2xl p-8 text-center">
              <h3 className="text-xl font-bold text-primary-foreground mb-3">
                Don't become a statistic
              </h3>
              <p className="text-primary-foreground/80 mb-6">
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
          </motion.div>
        </div>
      </div>
    </section>
  );
};
