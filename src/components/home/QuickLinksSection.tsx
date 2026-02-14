import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Briefcase, HelpCircle, MessageCircle, ArrowRight, Heart, Users, Star, Sparkles, AlertTriangle, CheckCircle } from "lucide-react";

const quickLinks = [
  { icon: HelpCircle, title: "Frequently Asked Questions", description: "Get answers to common questions about our services, pricing, and protection methods.", cta: "View FAQ", link: "/faq" },
  { icon: MessageCircle, title: "Contact Us", description: "Have a question? Our Ohio-based team is ready to help you with personalized support.", cta: "Get in Touch", link: "/contact" },
];

const careerHighlights = [
  { icon: Heart, text: "Veteran-Supporting" },
  { icon: Users, text: "Growing Team" },
  { icon: Star, text: "Meaningful Work" },
];

export const QuickLinksSection = () => {
  const [checklistOpen, setChecklistOpen] = useState(false);

  return (
    <section className="py-16 lg:py-24 relative overflow-hidden">
      {/* Background orbs */}
      <div className="absolute -top-32 right-1/4 w-[400px] h-[400px] rounded-full bg-gradient-to-br from-primary/5 to-accent/3 blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-20 left-0 w-72 h-72 rounded-full bg-gradient-to-br from-accent/4 to-primary/3 blur-[80px] pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 max-w-6xl relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-3">Ready to Get Started?</h2>
          <p className="text-muted-foreground text-base max-w-2xl mx-auto">
            Whether you have questions or want to join our team, we are here to help.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {quickLinks.map((item, index) => (
            <Link key={index} to={item.link} className="group block h-full">
              <div className="relative rounded-2xl overflow-hidden h-full">
                <div className="relative backdrop-blur-xl bg-card/70 border border-border/30 rounded-2xl p-6 h-full flex flex-col hover:border-primary/25 transition-all duration-500 hover:-translate-y-1" style={{ boxShadow: 'var(--skeuo-shadow-ombre)' }}>
                  {/* Hover glow */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{
                    background: 'radial-gradient(circle at 50% 0%, hsl(var(--primary) / 0.08) 0%, transparent 60%)'
                  }} />
                  <div className="absolute top-0 left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />

                  <div className="relative z-10 flex flex-col h-full">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/15 to-accent/10 backdrop-blur-sm border border-primary/10 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:shadow-[0_0_15px_hsl(var(--primary)/0.2)] transition-all duration-300">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-bold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4 flex-grow">{item.description}</p>
                    <span className="inline-flex items-center text-sm font-semibold text-primary mt-auto">
                      {item.cta} <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}

          {/* Glass Careers card */}
          <Link to="/careers" className="group block h-full">
            <div className="relative rounded-2xl overflow-hidden h-full">
              <div className="relative backdrop-blur-xl border border-primary/15 rounded-2xl p-6 h-full flex flex-col hover:border-primary/30 transition-all duration-500 hover:-translate-y-1" style={{ background: 'linear-gradient(135deg, hsl(var(--primary) / 0.06) 0%, hsl(var(--accent) / 0.04) 100%)', boxShadow: 'var(--skeuo-shadow-ombre)' }}>
                {/* Mesh glow */}
                <div className="absolute inset-0 rounded-2xl pointer-events-none" style={{
                  background: 'radial-gradient(circle at 80% 20%, hsl(var(--primary) / 0.08) 0%, transparent 50%)'
                }} />
                <div className="absolute top-0 left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent pointer-events-none" />

                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center group-hover:scale-110 transition-transform shadow-[0_4px_15px_hsl(var(--primary)/0.4)]">
                      <Briefcase className="w-6 h-6 text-white" />
                    </div>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-primary/10 backdrop-blur-sm border border-primary/15 rounded-full text-xs font-bold text-primary">
                      <Sparkles className="w-3 h-3" /> Hiring
                    </span>
                  </div>
                  <h3 className="font-bold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">Join Our Team</h3>
                  <p className="text-sm text-muted-foreground mb-4 flex-grow">Be part of a mission-driven team protecting families from AI threats.</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {careerHighlights.map((h, i) => (
                      <span key={i} className="flex items-center gap-1 px-2 py-1 bg-card/60 backdrop-blur-sm rounded-full border border-border/30 text-xs font-medium">
                        <h.icon className="w-3 h-3 text-primary" /> {h.text}
                      </span>
                    ))}
                  </div>
                  <span className="inline-flex items-center text-sm font-semibold text-primary mt-auto">
                    View Positions <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {/* Glass Checklist card */}
          <div className="h-full">
            <div className="relative rounded-2xl overflow-hidden h-full">
              <div className="relative backdrop-blur-xl bg-card/70 border border-border/30 rounded-2xl p-6 h-full flex flex-col hover:border-primary/25 transition-all duration-500 hover:-translate-y-1" style={{ boxShadow: 'var(--skeuo-shadow-ombre)' }}>
                <div className="absolute inset-0 rounded-2xl pointer-events-none" style={{
                  background: 'radial-gradient(circle at 20% 80%, hsl(var(--accent) / 0.06) 0%, transparent 50%)'
                }} />
                <div className="absolute top-0 left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />

                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-[0_4px_15px_hsl(35_90%_45%/0.3)]">
                      <AlertTriangle className="w-6 h-6 text-white" />
                    </div>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-500/10 backdrop-blur-sm border border-amber-500/15 rounded-full text-xs font-bold text-amber-700">
                      <Sparkles className="w-3 h-3" /> Checklist
                    </span>
                  </div>
                  <h3 className="font-bold text-lg text-foreground mb-2">Scam Safety Checklist</h3>
                  <p className="text-sm text-muted-foreground mb-4 flex-grow">A simple, senior-friendly checklist for suspicious calls, emails, and texts.</p>
                  <Button type="button" onClick={() => setChecklistOpen(true)} className="w-full rounded-full bg-gradient-to-r from-primary to-accent text-white hover:opacity-90 shadow-[0_4px_15px_hsl(var(--primary)/0.3)]">
                    Open Checklist <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-10">
          <p className="text-muted-foreground text-sm">
            <span className="font-semibold">Ohio-Based</span> · <span className="font-semibold">Veteran-Supporting</span> · <span className="font-semibold">Trusted by 100+ Families</span>
          </p>
        </div>
      </div>

      <Dialog open={checklistOpen} onOpenChange={setChecklistOpen}>
        <DialogContent className="sm:max-w-lg backdrop-blur-xl bg-card/95 border border-border/30" style={{ boxShadow: '0 25px 60px -12px hsl(var(--primary) / 0.25)' }}>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <AlertTriangle className="w-5 h-5 text-amber-600" /> Scam Safety Checklist
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 text-sm text-muted-foreground">
            {["Pause and verify: never act on pressure or urgency.", "Call back on a known number, not the one provided.", "Never share passwords, OTP codes, or bank logins.", "Screenshot or save the message before deleting.", "If unsure, forward it to our ScamShield team."].map((step) => (
              <div key={step} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0 mt-0.5 shadow-[0_2px_8px_hsl(var(--primary)/0.3)]">
                  <CheckCircle className="w-3 h-3 text-white" />
                </div>
                <span>{step}</span>
              </div>
            ))}
            <div className="pt-3 border-t border-border/30">
              <Button asChild className="w-full rounded-full bg-gradient-to-r from-primary to-accent text-white shadow-[0_4px_15px_hsl(var(--primary)/0.3)]"><Link to="/training#scamshield">Analyze a Message</Link></Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};
