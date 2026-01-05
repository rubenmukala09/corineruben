import { useState, useEffect } from "react";
import { Shield, ArrowRight, TrendingUp, Phone, Mail, CreditCard, AlertTriangle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ScrollReveal } from "@/components/ScrollReveal";
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
    <section className="py-12 md:py-16 lg:py-24 relative overflow-hidden bg-background">
      {/* Seamless fade from hero */}
      <div className="absolute top-0 left-0 right-0 h-16 sm:h-32 bg-gradient-to-b from-background to-transparent z-[1] pointer-events-none" />
      
      {/* Clean white background */}
      <div className="absolute inset-0 bg-background" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <ScrollReveal animation="fade-up" className="text-center mb-8 sm:mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-primary/10 border border-primary/20 mb-4 sm:mb-6">
            <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
            <span className="text-xs sm:text-sm font-semibold text-primary">Active Threat Intelligence</span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 sm:mb-4">
            Know the <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Threats</span>, Stay <span className="text-primary">Ahead</span>
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base lg:text-lg max-w-2xl mx-auto">
            Real-time intelligence on scams targeting your community right now.
          </p>
        </ScrollReveal>

        {/* Mobile-first stacking */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 lg:gap-12 items-start">
          {/* Alert Cards - Soft Modern */}
          <ScrollReveal animation="fade-up" className="order-1 w-full space-y-3 sm:space-y-4">
            {scamAlerts.map((alert, index) => (
              <div
                key={index}
                onClick={() => setActiveAlert(index)}
                className={`p-4 sm:p-6 rounded-2xl sm:rounded-3xl border cursor-pointer transition-all duration-400 ease-out ${
                  index === activeAlert
                    ? "bg-white border-white/50 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.12)] translate-y-[-2px] sm:translate-y-[-4px]"
                    : "bg-white/80 border-white/50 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] hover:translate-y-[-2px] sm:hover:translate-y-[-4px] hover:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.12)]"
                }`}
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  {/* Icon */}
                  <div className={`w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0 ${
                    index === activeAlert ? "bg-primary/20" : "bg-muted"
                  }`}>
                    <alert.icon className={`w-5 h-5 sm:w-7 sm:h-7 ${
                      index === activeAlert ? "text-primary" : "text-muted-foreground"
                    }`} />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1 sm:mb-2 gap-2">
                      <h3 className="font-bold text-sm sm:text-lg text-foreground truncate">{alert.title}</h3>
                      <span className="text-emerald-700 dark:text-emerald-400 text-xs sm:text-sm font-bold flex items-center gap-0.5 sm:gap-1 flex-shrink-0">
                        <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
                        {alert.trend}
                      </span>
                    </div>
                    <p className="text-muted-foreground text-xs sm:text-sm mb-2 sm:mb-3">{alert.description}</p>
                    
                    {index === activeAlert && (
                      <div className="pt-2 sm:pt-3 border-t border-border/30">
                        <p className="text-xs sm:text-sm text-primary font-medium flex items-center gap-1.5 sm:gap-2">
                          <AlertTriangle className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                          <span>Tip: {alert.tip}</span>
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </ScrollReveal>

          {/* Quick Tips & CTA - Soft Modern */}
          <ScrollReveal animation="fade-up" delay={100} className="order-2 w-full space-y-4 sm:space-y-8">
            {/* Quick Tips Card */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-white/50 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)]">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
                <h3 className="text-base sm:text-xl font-bold text-foreground">Quick Protection Tips</h3>
              </div>
              
              <div className="space-y-3 sm:space-y-4">
                {quickTips.map((tip, index) => (
                  <div key={index} className="flex items-center gap-2 sm:gap-3">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary-foreground" />
                    </div>
                    <span className="text-muted-foreground text-xs sm:text-base">{tip}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA - Soft Modern with Physical Photo */}
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] border border-white/50">
              <div className="absolute inset-0">
                <img 
                  src={teamCollaborationBg} 
                  alt="" 
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/50 pointer-events-none" />
              </div>
              
              <div className="relative z-10 p-5 sm:p-8 text-center">
                <h3 className="text-base sm:text-xl font-bold text-white mb-2 sm:mb-3">
                  Take Action Now
                </h3>
                <p className="text-white/90 text-sm sm:text-base mb-4 sm:mb-6">
                  Get protected before scammers find you
                </p>
                <Button asChild variant="secondary" size="lg" className="rounded-xl sm:rounded-2xl text-sm sm:text-base">
                  <Link to="/training#pricing">
                    Get Protected Now
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
