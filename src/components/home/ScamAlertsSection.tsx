import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { AlertTriangle, Shield, Clock, ArrowRight, TrendingUp, Phone, Mail, CreditCard, Radio, Zap, Eye } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import scamAlertsBg from "@/assets/scam-alerts-bg.jpg";

const scamAlerts = [
  {
    icon: Phone,
    title: "AI Voice Clone Scams",
    description: "Scammers using AI to clone family members' voices asking for emergency money. Always verify with a callback.",
    severity: "critical",
    date: "Active Now",
    trend: "+340%",
    victims: "2,400+ Ohioans",
    color: "from-red-500 to-orange-500"
  },
  {
    icon: Mail,
    title: "Fake IRS/SSA Emails",
    description: "Phishing emails claiming tax issues or benefit problems. The IRS never initiates contact via email.",
    severity: "high",
    date: "Active Now",
    trend: "+180%",
    victims: "1,800+ Ohioans",
    color: "from-orange-500 to-amber-500"
  },
  {
    icon: CreditCard,
    title: "Gift Card Payment Requests",
    description: "Any legitimate organization will never ask for payment in gift cards. This is always a scam.",
    severity: "high",
    date: "Ongoing",
    trend: "+95%",
    victims: "900+ Ohioans",
    color: "from-amber-500 to-yellow-500"
  }
];

const liveStats = [
  { label: "Scams Blocked Today", value: 847, suffix: "+" },
  { label: "Money Protected", value: 124, prefix: "$", suffix: "K" },
  { label: "Families Alerted", value: 312, suffix: "" },
];

export const ScamAlertsSection = () => {
  const [activeAlert, setActiveAlert] = useState(0);
  const [counters, setCounters] = useState(liveStats.map(() => 0));

  // Animate counters
  useEffect(() => {
    const timers = liveStats.map((stat, index) => {
      const duration = 2000;
      const steps = 60;
      const stepValue = stat.value / steps;
      let current = 0;
      
      return setInterval(() => {
        current += stepValue;
        if (current >= stat.value) {
          current = stat.value;
        }
        setCounters(prev => {
          const next = [...prev];
          next[index] = Math.floor(current);
          return next;
        });
      }, duration / steps);
    });

    return () => timers.forEach(t => clearInterval(t));
  }, []);

  // Rotate alerts
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveAlert((prev) => (prev + 1) % scamAlerts.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Dramatic Background */}
      <div className="absolute inset-0">
        <img 
          src={scamAlertsBg} 
          alt="" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-destructive/10 via-transparent to-destructive/10" />
      </div>

      {/* Animated radar effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-10 pointer-events-none">
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-destructive"
          animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeOut" }}
        />
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-destructive"
          animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeOut", delay: 1.33 }}
        />
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-destructive"
          animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeOut", delay: 2.66 }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Live Threat Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div 
            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-destructive/20 border border-destructive/40 mb-6"
            animate={{ boxShadow: ["0 0 20px rgba(239,68,68,0.2)", "0 0 40px rgba(239,68,68,0.4)", "0 0 20px rgba(239,68,68,0.2)"] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Radio className="w-4 h-4 text-destructive" />
            </motion.div>
            <span className="text-sm font-bold text-destructive uppercase tracking-wider">Live Threat Monitor</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-destructive">Active Threats</span>{" "}
            <span className="text-foreground">in Ohio</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real-time intelligence on scams targeting your community right now.
          </p>
        </motion.div>

        {/* Live Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-3 gap-4 max-w-3xl mx-auto mb-16"
        >
          {liveStats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <motion.div
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-2 h-2 rounded-full bg-green-500"
                />
                <span className="text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</span>
              </div>
              <div className="text-3xl md:text-4xl font-bold text-foreground">
                {stat.prefix}{counters[index]}{stat.suffix}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Threat Cards with Featured Alert */}
        <div className="grid lg:grid-cols-5 gap-6 mb-12">
          {/* Featured Alert - Large */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeAlert}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="relative h-full p-8 overflow-hidden border-2 border-destructive/30 bg-gradient-to-br from-destructive/10 via-card to-card">
                  {/* Glow effect */}
                  <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${scamAlerts[activeAlert].color} opacity-10 blur-3xl`} />
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-6">
                      <Badge variant="destructive" className="px-3 py-1 text-xs font-bold uppercase tracking-wider animate-pulse">
                        {scamAlerts[activeAlert].severity === 'critical' ? '⚠️ Critical Alert' : '🔴 High Risk'}
                      </Badge>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {scamAlerts[activeAlert].date}
                      </span>
                    </div>

                    <div className={`w-16 h-16 rounded-2xl mb-6 flex items-center justify-center bg-gradient-to-br ${scamAlerts[activeAlert].color}`}>
                      {(() => {
                        const Icon = scamAlerts[activeAlert].icon;
                        return <Icon className="w-8 h-8 text-white" />;
                      })()}
                    </div>

                    <h3 className="text-2xl font-bold mb-3 text-foreground">{scamAlerts[activeAlert].title}</h3>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {scamAlerts[activeAlert].description}
                    </p>

                    <div className="flex items-center gap-6 text-sm">
                      <div className="flex items-center gap-2 text-destructive">
                        <TrendingUp className="w-4 h-4" />
                        <span className="font-bold">{scamAlerts[activeAlert].trend}</span>
                        <span className="text-muted-foreground">this year</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Eye className="w-4 h-4" />
                        <span>{scamAlerts[activeAlert].victims}</span>
                      </div>
                    </div>
                  </div>

                  {/* Alert navigation dots */}
                  <div className="absolute bottom-8 left-8 flex gap-2">
                    {scamAlerts.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveAlert(idx)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          idx === activeAlert 
                            ? 'bg-destructive w-6' 
                            : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                        }`}
                      />
                    ))}
                  </div>
                </Card>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Other Alerts - Smaller Cards */}
          <div className="lg:col-span-3 grid sm:grid-cols-3 gap-4">
            {scamAlerts.map((alert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`cursor-pointer transition-all duration-300 ${
                  index === activeAlert ? 'scale-105' : 'hover:scale-102'
                }`}
                onClick={() => setActiveAlert(index)}
              >
                <Card className={`p-5 h-full border-2 transition-all duration-300 ${
                  index === activeAlert 
                    ? 'border-destructive/50 bg-destructive/5' 
                    : 'border-border hover:border-primary/30 bg-card/80'
                }`}>
                  <div className={`w-10 h-10 rounded-xl mb-4 flex items-center justify-center bg-gradient-to-br ${alert.color}`}>
                    <alert.icon className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="font-bold text-sm mb-2">{alert.title}</h4>
                  <div className="flex items-center gap-2 text-xs text-destructive font-semibold">
                    <TrendingUp className="w-3 h-3" />
                    {alert.trend}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Protection CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-3xl p-8 border border-primary/20 backdrop-blur-sm"
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-4">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center"
              >
                <Shield className="w-8 h-8 text-primary" />
              </motion.div>
              <div>
                <h3 className="text-xl font-bold mb-1">Don't become a statistic</h3>
                <p className="text-muted-foreground">Get protected before scammers find you</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="group">
                <Link to="/training#pricing">
                  <Zap className="mr-2 w-5 h-5 group-hover:animate-pulse" />
                  Get Protected Now
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/resources">
                  Learn More
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
