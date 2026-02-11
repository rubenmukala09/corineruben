import { useState, useEffect } from "react";
import { Shield, ArrowRight, TrendingUp, Phone, Mail, CreditCard, AlertTriangle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import teamCollaborationBg from "@/assets/team-collaboration-bg.jpg";
import threatAnalysisScreen from "@/assets/threat-analysis-screen.jpg";
import seniorPhoneProtection from "@/assets/senior-phone-protection.jpg";

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

interface ScamAlertsSectionProps {
  onSubmitThreat?: () => void;
}

export const ScamAlertsSection = ({ onSubmitThreat }: ScamAlertsSectionProps) => {
  const [activeAlert, setActiveAlert] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveAlert((prev) => (prev + 1) % scamAlerts.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
     <section className="py-10 lg:py-14" style={{ background: 'linear-gradient(135deg, #ffffff 0%, #faf9f7 50%, #fff5f0 100%)' }} aria-labelledby="alerts-heading">
      
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
           <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-xl border border-white/40 shadow-lg mb-4">
             <Shield className="w-4 h-4 text-coral-500" aria-hidden="true" />
             <span className="text-sm font-semibold text-[#18305A]">Active Threat Intelligence</span>
          </div>
          
           <h2 id="alerts-heading" className="text-3xl md:text-4xl font-black text-[#18305A] mb-3" style={{ fontFamily: "'Lora', 'Rubik', serif" }}>
             Know the <span className="bg-gradient-to-r from-coral-500 to-lavender-500 bg-clip-text text-transparent">Threats</span>, Stay Ahead
          </h2>
          <p className="text-foreground/70 text-base max-w-xl mx-auto">
            Real-time intelligence on scams targeting your community right now.
          </p>
        </div>

        {/* Featured Image Row */}
        <div className="grid md:grid-cols-2 gap-4 mb-10">
          <div className="relative">
            <img 
              src={threatAnalysisScreen}
              alt="Threat analysis and monitoring"
              className="h-52 shadow-lg border-2 border-white rounded-xl w-full object-cover"
              width={600}
              height={400}
              loading="lazy"
              decoding="async"
            />
            <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2 bg-white/70 backdrop-blur-xl rounded-lg p-2 border border-white/50">
              <div className="w-8 h-8 rounded-lg bg-coral-500 flex items-center justify-center" aria-hidden="true">
                <TrendingUp className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="text-[#18305A] font-bold text-xs">Real-Time Monitoring</div>
                <div className="text-foreground/50 text-xs">24/7 Threat Detection</div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <img 
              src={seniorPhoneProtection}
              alt="Senior using phone safely"
              className="h-52 shadow-lg border-2 border-white rounded-xl w-full object-cover"
              width={600}
              height={400}
              loading="lazy"
              decoding="async"
            />
            <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2 bg-white/70 backdrop-blur-xl rounded-lg p-2 border border-white/50">
              <div className="w-8 h-8 rounded-lg bg-lavender-500 flex items-center justify-center" aria-hidden="true">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="text-[#18305A] font-bold text-xs">Family Protection</div>
                <div className="text-foreground/50 text-xs">Safe Digital Communication</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Left - Alert Cards */}
          <div className="space-y-3" role="list" aria-label="Current scam alerts">
            {scamAlerts.map((alert, index) => (
              <div
                key={index}
                role="listitem"
                onClick={() => setActiveAlert(index)}
                 className={`p-4 rounded-xl cursor-pointer transition-shadow ${
                  index === activeAlert
                     ? "bg-white/80 backdrop-blur-xl border border-coral-200/50 shadow-lg"
                     : "bg-white/60 backdrop-blur-md border border-white/40 shadow-md hover:shadow-lg"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    index === activeAlert ? "bg-coral-100" : "bg-muted"
                  }`} aria-hidden="true">
                    <alert.icon className={`w-5 h-5 ${
                      index === activeAlert ? "text-primary" : "text-muted-foreground"
                    }`} />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-base text-foreground">{alert.title}</h3>
                      <span className="text-emerald-600 text-sm font-bold flex items-center gap-1">
                        <TrendingUp className="w-4 h-4" aria-hidden="true" />
                        {alert.trend}
                      </span>
                    </div>
                    <p className="text-foreground/70 text-sm mb-2">{alert.description}</p>
                    
                    {index === activeAlert && (
                      <div className="pt-2 border-t border-border/30">
                        <p className="text-xs text-primary font-medium flex items-center gap-2">
                          <AlertTriangle className="w-3 h-3" aria-hidden="true" />
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
          <div className="space-y-5">
             <div className="bg-white/70 backdrop-blur-xl rounded-xl p-5 border border-white/50 shadow-md">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center" aria-hidden="true">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground">Quick Protection Tips</h3>
              </div>
              
              <div className="space-y-3" role="list" aria-label="Protection tips">
                {quickTips.map((tip, index) => (
                  <div key={index} className="flex items-center gap-3" role="listitem">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0" aria-hidden="true">
                      <CheckCircle className="w-3 h-3 text-primary-foreground" />
                    </div>
                    <span className="text-foreground/80 text-sm font-medium">{tip}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="relative rounded-xl overflow-hidden shadow-lg border border-white/50">
              <div className="absolute inset-0">
                <img 
                  src={teamCollaborationBg} 
                  alt="" 
                  width={600}
                  height={300}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50" />
              </div>
              
              <div className="relative z-10 p-6 text-center">
                <h3 className="text-xl font-bold text-white mb-2">
                  Take Action Now
                </h3>
                <p className="text-white/90 mb-4 text-sm">
                  Get protected before scammers find you
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button asChild variant="secondary" size="lg" className="h-10 px-5 text-sm font-bold rounded-full">
                    <Link to="/training#pricing">
                      Get Protected Now
                      <ArrowRight className="ml-2 w-4 h-4" aria-hidden="true" />
                    </Link>
                  </Button>
                  {onSubmitThreat && (
                    <Button
                      type="button"
                      variant="outline"
                      size="lg"
                      onClick={onSubmitThreat}
                      className="h-10 px-5 text-sm font-bold rounded-full bg-white/10 border-white/40 text-white hover:bg-white/20"
                    >
                      Analyze a Message
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
