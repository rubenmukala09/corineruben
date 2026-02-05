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
     <section className="py-12 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #ffffff 0%, #faf9f7 50%, #fff5f0 100%)' }}>
       {/* Decorative Gradient Orbs */}
       <div className="absolute top-32 left-[5%] w-[350px] h-[350px] opacity-25 pointer-events-none"
         style={{
           background: 'radial-gradient(circle at center, rgba(248,146,106,0.4) 0%, transparent 60%)',
           filter: 'blur(100px)',
         }}
       />
       <div className="absolute bottom-20 right-[10%] w-[300px] h-[300px] opacity-20 pointer-events-none"
         style={{
           background: 'radial-gradient(circle at center, rgba(187,129,181,0.5) 0%, transparent 60%)',
           filter: 'blur(80px)',
         }}
       />
      {/* Seamless fade from hero */}
       {/* Seamless fade from hero */}
       <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white to-transparent z-[1]" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header - Toned Down / Muted Theme */}
        <div className="text-center mb-16">
           <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/80 backdrop-blur-md border border-coral-200/50 shadow-lg mb-6">
             <Shield className="w-5 h-5 text-coral-500" />
             <span className="text-base font-semibold text-[#18305A]">Active Threat Intelligence</span>
          </div>
          
           <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#18305A] mb-6" style={{ fontFamily: "'Clash Display', 'DM Sans', sans-serif" }}>
             Know the <span className="bg-gradient-to-r from-coral-500 to-lavender-500 bg-clip-text text-transparent">Threats</span>, Stay <span className="bg-gradient-to-r from-lavender-500 to-[#18305A] bg-clip-text text-transparent">Ahead</span>
          </h2>
          <p className="text-foreground/80 text-xl md:text-2xl max-w-2xl mx-auto font-medium leading-relaxed">
            Real-time intelligence on scams targeting your community right now.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left - Alert Cards - Soft Modern */}
          <div className="space-y-4">
            {scamAlerts.map((alert, index) => (
              <div
                key={index}
                onClick={() => setActiveAlert(index)}
                style={{ transform: index === activeAlert ? 'translateY(-4px)' : 'translateY(0)' }}
                 className={`p-6 rounded-3xl cursor-pointer transition-all duration-300 will-change-transform ${
                  index === activeAlert
                     ? "bg-white/90 backdrop-blur-xl border border-coral-200/50 shadow-2xl"
                     : "bg-white/70 backdrop-blur-md border border-white/50 shadow-lg hover:shadow-xl hover:bg-white/80"
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                    index === activeAlert ? "bg-primary/20" : "bg-muted"
                  }`}>
                    <alert.icon className={`w-7 h-7 ${
                      index === activeAlert ? "text-primary" : "text-muted-foreground"
                    }`} />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-xl text-foreground">{alert.title}</h3>
                      <span className="text-emerald-700 dark:text-emerald-400 text-base font-bold flex items-center gap-1">
                        <TrendingUp className="w-5 h-5" />
                        {alert.trend}
                      </span>
                    </div>
                    <p className="text-foreground/70 text-base mb-3 leading-relaxed">{alert.description}</p>
                    
                    {index === activeAlert && (
                      <div className="pt-3 border-t border-border/30">
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

          {/* Right - Quick Tips & CTA - Soft Modern */}
          <div className="space-y-8">
            {/* Quick Tips Card */}
             <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-white/50 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">Quick Protection Tips</h3>
              </div>
              
              <div className="space-y-5">
                {quickTips.map((tip, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <span className="text-foreground/80 text-lg font-medium">{tip}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA - Soft Modern with Physical Photo */}
            <div className="relative rounded-3xl overflow-hidden shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] border border-white/50">
              <div className="absolute inset-0">
                <img 
                  src={teamCollaborationBg} 
                  alt="" 
                  width={634}
                  height={357}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50" />
              </div>
              
              <div className="relative z-10 p-10 text-center">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Take Action Now
                </h3>
                <p className="text-white/90 mb-8 text-lg md:text-xl font-medium">
                  Get protected before scammers find you
                </p>
                <Button asChild variant="secondary" size="lg" className="h-14 px-8 text-lg font-bold rounded-2xl">
                  <Link to="/training#pricing">
                    Get Protected Now
                    <ArrowRight className="ml-2 w-5 h-5" />
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
