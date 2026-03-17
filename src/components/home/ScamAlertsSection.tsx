import { useState, useEffect } from "react";
import { Shield, ArrowRight, TrendingUp, Phone, Mail, CreditCard, AlertTriangle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const scamAlerts = [
  { icon: Phone, title: "AI Voice Impersonation", description: "Criminals clone voices of loved ones using AI, then call requesting emergency funds.", trend: "+340%", severity: "critical" as const },
  { icon: Mail, title: "Government Impersonation", description: "Fraudulent emails mimicking IRS, SSA, or Medicare demand immediate action or payment.", trend: "+180%", severity: "high" as const },
  { icon: CreditCard, title: "Untraceable Payment Demands", description: "Requests for gift cards, wire transfers, or cryptocurrency are always fraud.", trend: "+95%", severity: "high" as const },
];

const quickTips = [
  "Never give personal info to incoming callers",
  "Verify requests through official channels",
  "Do not click links in unexpected emails",
  "Trust your instincts. If it feels wrong, it is",
];

const severityColors = {
  critical: "bg-red-500/15 text-red-400 border-red-500/20",
  high: "bg-amber-500/15 text-amber-400 border-amber-500/20",
};

interface ScamAlertsSectionProps { onSubmitThreat?: () => void; }

export const ScamAlertsSection = ({ onSubmitThreat }: ScamAlertsSectionProps) => {
  const [activeAlert, setActiveAlert] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setActiveAlert((prev) => (prev + 1) % scamAlerts.length), 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-12 md:py-16 lg:py-24 relative overflow-hidden" aria-labelledby="alerts-heading">
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl relative z-10">
        {/* Urgent glass header */}
        <div className="relative rounded-2xl md:rounded-3xl overflow-hidden mb-8 md:mb-10" style={{ background: 'linear-gradient(135deg, hsl(0 60% 12%) 0%, hsl(258 35% 12%) 40%, hsl(258 30% 15%) 100%)' }}>
          {/* Glass orbs */}
          <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-red-500/15 blur-[100px] pointer-events-none" />
          <div className="absolute -bottom-16 -right-16 w-64 h-64 rounded-full bg-primary/15 blur-[80px] pointer-events-none" />
          
          {/* Noise */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`
          }} />
          
          <div className="absolute inset-0 rounded-3xl border border-white/8 pointer-events-none" />
          <div className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-red-400/20 to-transparent pointer-events-none" />

          <div className="relative z-10 p-4 md:p-8 lg:p-12 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 md:gap-6">
            <div>
              <div className="flex items-center gap-2 mb-3 md:mb-4">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-red-400">Active Threat Intelligence</span>
              </div>
              <h2 id="alerts-heading" className="text-2xl md:text-3xl lg:text-4xl font-black text-white leading-tight mb-2">
                Know the Threats, Stay Ahead
              </h2>
              <p className="text-white/50 text-sm md:text-base">Real-time intelligence on scams targeting your community right now.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
              <Button asChild size="lg" className="h-10 md:h-12 px-4 md:px-6 text-xs md:text-sm font-bold rounded-full bg-white text-slate-900 hover:bg-white/90 hover:scale-105 active:scale-95 transition-all shadow-[0_8px_30px_rgba(255,255,255,0.15)]">
                <Link to="/training#pricing">Get Protected <ArrowRight className="ml-1 md:ml-2 w-3 h-3 md:w-4 md:h-4" /></Link>
              </Button>
              {onSubmitThreat && (
                <Button type="button" variant="outline" size="lg" onClick={onSubmitThreat}
                  className="h-10 md:h-12 px-4 md:px-6 text-xs md:text-sm font-bold rounded-full border-white/15 text-white hover:bg-white/10 hover:scale-105 active:scale-95 transition-all backdrop-blur-sm">
                  Analyze a Message
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-5 gap-4 md:gap-6">
          {/* Alerts - glass cards */}
          <div className="lg:col-span-3 space-y-2 md:space-y-3" role="list" aria-label="Current scam alerts">
            {scamAlerts.map((alert, index) => (
              <div key={index} role="listitem" onClick={() => setActiveAlert(index)}
                className={`group relative rounded-xl md:rounded-2xl cursor-pointer overflow-hidden transition-all duration-500 hover:-translate-y-0.5 ${
                  index === activeAlert ? "scale-[1.01]" : ""
                }`}>
                <div className={`relative backdrop-blur-xl border rounded-xl md:rounded-2xl p-3 md:p-5 transition-all duration-300 ${
                  index === activeAlert 
                    ? "bg-card/80 border-primary/25" 
                    : "bg-card/50 border-border/30 hover:border-primary/15 hover:bg-card/70"
                }`} style={index === activeAlert ? { boxShadow: '0 8px 32px hsl(var(--primary) / 0.12), var(--skeuo-shadow-ombre)' } : { boxShadow: 'var(--skeuo-shadow-ombre)' }}>
                  {/* Active glow */}
                  {index === activeAlert && (
                    <div className="absolute inset-0 rounded-2xl pointer-events-none" style={{
                      background: 'radial-gradient(ellipse 60% 80% at 0% 50%, hsl(var(--primary) / 0.08) 0%, transparent 60%)'
                    }} />
                  )}
                  <div className="flex items-start gap-3 md:gap-4 relative z-10">
                    <div className={`w-9 h-9 md:w-11 md:h-11 rounded-lg md:rounded-xl backdrop-blur-sm border flex items-center justify-center flex-shrink-0 transition-all ${
                      index === activeAlert
                        ? "bg-gradient-to-br from-primary/20 to-accent/15 border-primary/20 shadow-[0_0_15px_hsl(var(--primary)/0.2)]"
                        : "bg-muted/40 border-border/30"
                    }`}>
                      <alert.icon className={`w-4 h-4 md:w-5 md:h-5 ${index === activeAlert ? "text-primary" : "text-muted-foreground"}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1 md:gap-2 mb-1 md:mb-1.5 flex-wrap">
                        <h3 className="text-sm md:text-base font-bold text-foreground">{alert.title}</h3>
                        <span className={`px-1.5 md:px-2 py-0.5 rounded-full text-[9px] md:text-[10px] font-bold uppercase border backdrop-blur-sm ${severityColors[alert.severity]}`}>
                          {alert.severity}
                        </span>
                        <span className="text-emerald-500 text-[10px] md:text-xs font-bold flex items-center gap-0.5 md:gap-1 ml-auto">
                          <TrendingUp className="w-2.5 h-2.5 md:w-3 md:h-3" />{alert.trend}
                        </span>
                      </div>
                      <p className="text-muted-foreground text-xs md:text-sm">{alert.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Glass tips card */}
          <div className="lg:col-span-2">
            <div className="relative rounded-xl md:rounded-2xl overflow-hidden lg:sticky lg:top-24">
              <div className="backdrop-blur-xl bg-card/70 border border-border/30 rounded-xl md:rounded-2xl p-4 md:p-6" style={{ boxShadow: 'var(--skeuo-shadow-ombre)' }}>
                {/* Inner mesh */}
                <div className="absolute inset-0 rounded-xl md:rounded-2xl pointer-events-none" style={{
                  background: 'radial-gradient(circle at 80% 20%, hsl(var(--primary) / 0.06) 0%, transparent 50%)'
                }} />
                <div className="absolute top-0 left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

                <div className="relative z-10">
                  <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-5">
                    <div className="w-9 h-9 md:w-11 md:h-11 rounded-lg md:rounded-xl bg-gradient-to-br from-primary/15 to-accent/15 backdrop-blur-sm border border-primary/10 flex items-center justify-center">
                      <Shield className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                    </div>
                    <h3 className="text-base md:text-lg font-bold text-foreground">Quick Protection Tips</h3>
                  </div>
                  <div className="space-y-2 md:space-y-3" role="list" aria-label="Protection tips">
                    {quickTips.map((tip, index) => (
                      <div key={index} className="flex items-center gap-2 md:gap-3" role="listitem">
                        <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0 shadow-[0_2px_8px_hsl(var(--primary)/0.3)]">
                          <CheckCircle className="w-3 h-3 md:w-3.5 md:h-3.5 text-white" />
                        </div>
                        <span className="text-xs md:text-sm font-medium text-foreground">{tip}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
