import { useState, useEffect } from "react";
import { Shield, ArrowRight, TrendingUp, Phone, Mail, CreditCard, AlertTriangle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import threatAnalysisScreen from "@/assets/threat-analysis-screen.jpg";
import seniorPhoneProtection from "@/assets/senior-phone-protection.jpg";

const scamAlerts = [
  { icon: Phone, title: "AI Voice Impersonation", description: "Criminals clone voices of loved ones using AI to request emergency funds.", trend: "+340%", tip: "Verify any urgent request by calling back on a known number.", severity: "critical" },
  { icon: Mail, title: "Government Impersonation", description: "Fraudulent emails mimicking IRS, SSA, or Medicare demanding immediate action.", trend: "+180%", tip: "Government agencies never request payments via email or phone.", severity: "high" },
  { icon: CreditCard, title: "Untraceable Payment Demands", description: "Requests for gift cards, wire transfers, or cryptocurrency are always scams.", trend: "+95%", tip: "No legitimate business accepts gift cards as payment.", severity: "high" },
];

const quickTips = [
  "Never give personal info to incoming callers",
  "Verify requests through official channels",
  "Don't click links in unexpected emails",
  "Trust your instincts - if it feels wrong, it is",
];

interface ScamAlertsSectionProps { onSubmitThreat?: () => void; }

export const ScamAlertsSection = ({ onSubmitThreat }: ScamAlertsSectionProps) => {
  const [activeAlert, setActiveAlert] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setActiveAlert((prev) => (prev + 1) % scamAlerts.length), 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-16 lg:py-20" aria-labelledby="alerts-heading">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Label */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-destructive/20 bg-destructive/5 mb-5">
            <span className="w-2 h-2 rounded-full bg-destructive animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-destructive">Active Threat Intelligence</span>
          </div>
          <h2 id="alerts-heading" className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground leading-tight mb-3">
            Know the{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Threats</span>
            , Stay Ahead
          </h2>
          <p className="text-muted-foreground text-base max-w-xl mx-auto">
            Real-time intelligence on scams targeting your community right now.
          </p>
        </div>

        {/* Image Row */}
        <div className="grid md:grid-cols-2 gap-6 mb-12 max-w-5xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden border border-border/60 shadow-lg">
            <img src={threatAnalysisScreen} alt="Threat analysis" className="h-56 w-full object-cover" width={600} height={400} loading="lazy" decoding="async" />
            <div className="absolute bottom-3 left-3 right-3 flex items-center gap-3 bg-card/90 backdrop-blur-sm rounded-xl p-3 border border-border/40">
              <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center"><TrendingUp className="w-5 h-5 text-white" /></div>
              <div>
                <div className="text-sm font-bold text-foreground">Real-Time Monitoring</div>
                <div className="text-xs text-muted-foreground">24/7 Threat Detection</div>
              </div>
            </div>
          </div>
          <div className="relative rounded-2xl overflow-hidden border border-border/60 shadow-lg">
            <img src={seniorPhoneProtection} alt="Senior using phone safely" className="h-56 w-full object-cover" width={600} height={400} loading="lazy" decoding="async" />
            <div className="absolute bottom-3 left-3 right-3 flex items-center gap-3 bg-card/90 backdrop-blur-sm rounded-xl p-3 border border-border/40">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center"><Shield className="w-5 h-5 text-white" /></div>
              <div>
                <div className="text-sm font-bold text-foreground">Family Protection</div>
                <div className="text-xs text-muted-foreground">Safe Digital Communication</div>
              </div>
            </div>
          </div>
        </div>

        {/* Alerts + Tips */}
        <div className="grid lg:grid-cols-2 gap-8 items-start max-w-5xl mx-auto">
          {/* Alert Cards */}
          <div className="space-y-3" role="list" aria-label="Current scam alerts">
            {scamAlerts.map((alert, index) => (
              <div key={index} role="listitem" onClick={() => setActiveAlert(index)}
                className={`p-5 rounded-2xl cursor-pointer border transition-all duration-300 ${
                  index === activeAlert ? "bg-card border-primary/30 shadow-md" : "bg-card/60 border-border/40 hover:border-primary/20"
                }`}>
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${index === activeAlert ? "bg-primary/10" : "bg-muted/60"}`}>
                    <alert.icon className={`w-6 h-6 ${index === activeAlert ? "text-primary" : "text-muted-foreground"}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-foreground">{alert.title}</h3>
                      <span className="text-emerald-600 text-sm font-bold flex items-center gap-1">
                        <TrendingUp className="w-3.5 h-3.5" />{alert.trend}
                      </span>
                    </div>
                    <p className="text-muted-foreground text-sm">{alert.description}</p>
                    {index === activeAlert && (
                      <div className="pt-3 mt-3 border-t border-border/40">
                        <p className="text-xs font-medium text-primary flex items-center gap-2">
                          <AlertTriangle className="w-3.5 h-3.5" /> Tip: {alert.tip}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Tips + CTA */}
          <div className="space-y-6">
            <div className="bg-card rounded-2xl p-6 border border-border/60">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-xl bg-primary/8 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground">Quick Protection Tips</h3>
              </div>
              <div className="space-y-3" role="list" aria-label="Protection tips">
                {quickTips.map((tip, index) => (
                  <div key={index} className="flex items-center gap-3" role="listitem">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span className="text-sm font-medium text-foreground/80">{tip}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild size="lg" className="h-12 px-6 text-sm font-bold rounded-full bg-gradient-to-r from-primary to-accent text-white hover:opacity-90">
                <Link to="/training#pricing">Get Protected Now <ArrowRight className="ml-2 w-4 h-4" /></Link>
              </Button>
              {onSubmitThreat && (
                <Button type="button" variant="outline" size="lg" onClick={onSubmitThreat}
                  className="h-12 px-6 text-sm font-bold rounded-full">
                  Analyze a Message
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
