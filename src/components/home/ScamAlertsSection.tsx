import { motion } from "framer-motion";
import { AlertTriangle, Shield, Clock, ArrowRight, TrendingUp, Phone, Mail, CreditCard } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

const scamAlerts = [
  {
    icon: Phone,
    title: "AI Voice Clone Scams",
    description: "Scammers using AI to clone family members' voices asking for emergency money. Always verify with a callback.",
    severity: "high",
    date: "Active Now",
    trend: "+340%"
  },
  {
    icon: Mail,
    title: "Fake IRS/SSA Emails",
    description: "Phishing emails claiming tax issues or benefit problems. The IRS never initiates contact via email.",
    severity: "high",
    date: "Active Now",
    trend: "+180%"
  },
  {
    icon: CreditCard,
    title: "Gift Card Payment Requests",
    description: "Any legitimate organization will never ask for payment in gift cards. This is always a scam.",
    severity: "medium",
    date: "Ongoing",
    trend: "+95%"
  }
];

const quickTips = [
  "Never share passwords or PINs over phone/email",
  "Verify caller identity by calling back official numbers",
  "If it sounds too good to be true, it probably is",
  "Report suspicious activity to local authorities"
];

export const ScamAlertsSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-destructive/5 via-background to-background relative overflow-hidden">
      {/* Subtle pattern background */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)',
            backgroundSize: '32px 32px'
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-destructive/10 border border-destructive/20 mb-6">
            <AlertTriangle className="w-4 h-4 text-destructive" />
            <span className="text-sm font-semibold text-destructive">Current Threat Alerts</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Stay Informed,{" "}
            <span className="text-primary">Stay Protected</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Knowledge is your first line of defense. Here are the latest scam trends targeting Ohio families.
          </p>
        </motion.div>

        {/* Alerts Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {scamAlerts.map((alert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6 h-full border-2 hover:border-primary/30 transition-all duration-300 hover:shadow-lg bg-card/50 backdrop-blur-sm">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    alert.severity === 'high' ? 'bg-destructive/10' : 'bg-amber-500/10'
                  }`}>
                    <alert.icon className={`w-6 h-6 ${
                      alert.severity === 'high' ? 'text-destructive' : 'text-amber-500'
                    }`} />
                  </div>
                  <Badge variant={alert.severity === 'high' ? 'destructive' : 'secondary'} className="text-xs">
                    {alert.severity === 'high' ? 'HIGH RISK' : 'MEDIUM RISK'}
                  </Badge>
                </div>
                
                <h3 className="font-bold text-lg mb-2">{alert.title}</h3>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {alert.description}
                </p>
                
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    {alert.date}
                  </div>
                  <div className="flex items-center gap-1 text-destructive font-semibold">
                    <TrendingUp className="w-3 h-3" />
                    {alert.trend} this year
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Quick Tips Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-2xl p-8 border border-primary/20"
        >
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="flex-shrink-0 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 mb-2">
                <Shield className="w-5 h-5 text-primary" />
                <span className="font-semibold text-lg">Quick Protection Tips</span>
              </div>
              <p className="text-sm text-muted-foreground">Remember these golden rules</p>
            </div>
            
            <div className="flex-1 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickTips.map((tip, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-primary">{index + 1}</span>
                  </div>
                  <span className="text-sm text-foreground">{tip}</span>
                </div>
              ))}
            </div>
            
            <Button asChild className="flex-shrink-0">
              <Link to="/resources">
                Learn More
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
