import { useState, useEffect } from "react";
import { Shield, ArrowRight, TrendingUp, Phone, Mail, CreditCard, AlertTriangle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import teamCollaborationBg from "@/assets/team-collaboration-bg.jpg";

const scamAlerts = [
  {
    icon: Phone,
    title: "AI Voice Impersonation",
    description: "Criminals clone voices of loved ones using AI to request emergency funds.",
    trend: "+340%",
    tip: "Verify any urgent request by calling back on a known number.",
    severity: "critical",
  },
  {
    icon: Mail,
    title: "Government Impersonation",
    description: "Fraudulent emails mimicking IRS, SSA, or Medicare demanding immediate action.",
    trend: "+180%",
    tip: "Government agencies never request payments via email or phone.",
    severity: "high",
  },
  {
    icon: CreditCard,
    title: "Untraceable Payment Demands",
    description: "Requests for gift cards, wire transfers, or cryptocurrency are always scams.",
    trend: "+95%",
    tip: "No legitimate business accepts gift cards as payment.",
    severity: "high",
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
      {/* Seamless fade from hero */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background to-transparent z-[1]" />
      
      {/* Clean white background */}
      <div className="absolute inset-0 bg-background" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">Active Threat Intelligence</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Know the <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Threats</span>, Stay <span className="text-primary">Ahead</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Real-time intelligence on scams targeting your community right now.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left - Alert Cards */}
          <div className="space-y-4">
            {scamAlerts.map((alert, index) => (
              <div
                key={index}
                onClick={() => setActiveAlert(index)}
                className={`p-6 rounded-2xl border-2 cursor-pointer transition-all duration-200 ${
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
                      <span className="text-emerald-700 dark:text-emerald-400 text-sm font-bold flex items-center gap-1">
                        <TrendingUp className="w-4 h-4" />
                        {alert.trend}
                      </span>
                    </div>
                    <p className="text-muted-foreground text-sm mb-3">{alert.description}</p>
                    
                    {index === activeAlert && (
                      <div className="pt-3 border-t border-border">
                        <p className="text-sm text-primary font-medium flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4" />
                          Tip: {alert.tip}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right - Quick Tips & CTA */}
          <div className="space-y-8">
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
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-3.5 h-3.5 text-primary-foreground" />
                    </div>
                    <span className="text-muted-foreground">{tip}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="relative rounded-2xl overflow-hidden">
              <div className="absolute inset-0">
                <img 
                  src={teamCollaborationBg} 
                  alt="" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50" />
              </div>
              
              <div className="relative z-10 p-8 text-center">
                <h3 className="text-xl font-bold text-white mb-3">
                  Take Action Now
                </h3>
                <p className="text-white/90 mb-6">
                  Get protected before scammers find you
                </p>
                <Button asChild variant="secondary" size="lg" className="rounded-full">
                  <Link to="/training#pricing">
                    Get Protected Now
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
