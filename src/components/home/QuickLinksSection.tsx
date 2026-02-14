import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Briefcase, HelpCircle, MessageCircle, ArrowRight, Heart, Users, Star, Sparkles, AlertTriangle, CheckCircle } from "lucide-react";

const quickLinks = [
  { icon: HelpCircle, title: "Frequently Asked Questions", description: "Get answers to common questions about our services, pricing, and protection methods.", cta: "View FAQ", link: "/faq", gradient: "from-primary to-accent" },
  { icon: MessageCircle, title: "Contact Us", description: "Have a question? Our Ohio-based team is ready to help you with personalized support.", cta: "Get in Touch", link: "/contact", gradient: "from-accent to-primary" },
];

const careerHighlights = [
  { icon: Heart, text: "Veteran-Supporting" },
  { icon: Users, text: "Growing Team" },
  { icon: Star, text: "Meaningful Work" },
];

export const QuickLinksSection = () => {
  const [checklistOpen, setChecklistOpen] = useState(false);

  return (
    <section className="py-16 lg:py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-3">Ready to Get Started?</h2>
          <p className="text-muted-foreground text-base max-w-2xl mx-auto">
            Whether you have questions or want to join our team, we're here to help.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {quickLinks.map((item, index) => (
            <Link key={index} to={item.link} className="group block h-full">
              <div className="bg-card rounded-2xl border border-border/60 p-6 h-full flex flex-col hover:border-primary/30 hover:shadow-lg transition-all duration-300">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-5 group-hover:scale-105 transition-transform shadow-md`}>
                  <item.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-bold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 flex-grow">{item.description}</p>
                <span className="inline-flex items-center text-sm font-semibold text-primary mt-auto">
                  {item.cta} <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          ))}

          {/* Careers */}
          <Link to="/careers" className="group block h-full">
            <div className="bg-primary/5 rounded-2xl border border-primary/20 p-6 h-full flex flex-col hover:border-primary/40 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                  <Briefcase className="w-7 h-7 text-white" />
                </div>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-primary/10 rounded-full text-xs font-bold text-primary">
                  <Sparkles className="w-3 h-3" /> Hiring!
                </span>
              </div>
              <h3 className="font-bold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">Join Our Team</h3>
              <p className="text-sm text-muted-foreground mb-4 flex-grow">Be part of a mission-driven team protecting families from AI threats.</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {careerHighlights.map((h, i) => (
                  <span key={i} className="flex items-center gap-1 px-2 py-1 bg-card rounded-full border border-border/50 text-xs font-medium">
                    <h.icon className="w-3 h-3 text-primary" /> {h.text}
                  </span>
                ))}
              </div>
              <span className="inline-flex items-center text-sm font-semibold text-primary mt-auto">
                View Positions <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </Link>

          {/* Checklist */}
          <div className="h-full">
            <div className="bg-card rounded-2xl border border-border/60 p-6 h-full flex flex-col hover:border-primary/30 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-md">
                  <AlertTriangle className="w-7 h-7 text-white" />
                </div>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-500/10 rounded-full text-xs font-bold text-amber-700">
                  <Sparkles className="w-3 h-3" /> Checklist
                </span>
              </div>
              <h3 className="font-bold text-lg text-foreground mb-2">Scam Safety Checklist</h3>
              <p className="text-sm text-muted-foreground mb-4 flex-grow">A simple, senior-friendly checklist for suspicious calls, emails, and texts.</p>
              <Button type="button" onClick={() => setChecklistOpen(true)} className="w-full rounded-full bg-gradient-to-r from-primary to-accent text-white hover:opacity-90">
                Open Checklist <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="text-center mt-10">
          <p className="text-muted-foreground text-sm">
            <span className="font-semibold">Ohio-Based</span> • <span className="font-semibold">Veteran-Supporting</span> • <span className="font-semibold">Trusted by 100+ Families</span>
          </p>
        </div>
      </div>

      <Dialog open={checklistOpen} onOpenChange={setChecklistOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <AlertTriangle className="w-5 h-5 text-amber-600" /> Scam Safety Checklist
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 text-sm text-muted-foreground">
            {["Pause and verify: never act on pressure or urgency.", "Call back on a known number, not the one provided.", "Never share passwords, OTP codes, or bank logins.", "Screenshot or save the message before deleting.", "If unsure, forward it to our ScamShield team."].map((step) => (
              <div key={step} className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5" />
                <span>{step}</span>
              </div>
            ))}
            <div className="pt-3 border-t border-border/40">
              <Button asChild className="w-full rounded-full"><Link to="/training#scamshield">Analyze a Message</Link></Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};
