import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AnimatedSection } from "@/components/AnimatedSection";
import { BookingModal } from "@/components/BookingModal";
import { SITE } from "@/config/site";
import {
  Brain,
  Activity,
  Bell,
  Shield,
  Eye,
  Heart,
  Users,
  Clock,
  CheckCircle2,
  ArrowRight,
  Mic,
  MousePointer,
  Phone,
} from "lucide-react";

const SectionHeader = ({
  badge,
  title,
  subtitle,
}: {
  badge: string;
  title: React.ReactNode;
  subtitle?: string;
}) => (
  <AnimatedSection animation="fade-up" className="text-center mb-14">
    <span className="inline-block px-4 py-1.5 bg-primary/10 rounded-full text-xs font-bold text-primary uppercase tracking-[0.15em] mb-4">
      {badge}
    </span>
    <h2 className="text-3xl md:text-4xl font-black mb-4 leading-tight">{title}</h2>
    {subtitle && (
      <p className="text-base text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>
    )}
  </AnimatedSection>
);

const FeatureCard = ({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) => (
  <div className="flex gap-4 p-5 rounded-xl border border-border/60 bg-card hover:border-primary/30 hover:shadow-md transition-all duration-200">
    <div className="flex-shrink-0 w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center">
      <Icon className="w-5 h-5 text-primary" />
    </div>
    <div>
      <p className="font-semibold text-sm text-foreground mb-1">{title}</p>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    </div>
  </div>
);

const CognitiveSentinel = () => {
  const [bookingOpen, setBookingOpen] = useState(false);

  const signals = [
    { icon: MousePointer, label: "Click & typing rhythm", desc: "Measures hesitation, repeated corrections, and unusual slowdowns that signal confusion." },
    { icon: Mic, label: "Voice frequency analysis", desc: "Detects stress markers and vocal urgency patterns consistent with being pressured." },
    { icon: Activity, label: "Session duration anomalies", desc: "Flags unusually long sessions on financial pages or repeated login attempts." },
    { icon: Clock, label: "Time-of-day deviations", desc: "Alerts caregivers when a senior is active at 3 AM on a payment site." },
  ];

  const howItWorks = [
    { step: "01", title: "Baseline Learning (Day 1–14)", desc: "The AI passively observes normal behavior — typing speed, navigation patterns, typical session times — to establish a personal baseline." },
    { step: "02", title: "Continuous Silent Monitoring", desc: "Running in the background of the InVision portal, Cognitive Sentinel watches for deviations from the baseline without requiring any action from the senior." },
    { step: "03", title: "Caregiver Alert Triggered", desc: "When a deviation score exceeds the threshold, the designated caregiver receives a real-time push alert with a screen-safe summary: 'Margaret may need assistance right now.'" },
    { step: "04", title: "Human-in-the-Loop Review", desc: "Caregivers see exactly which signals triggered the alert. They can call, check in, or dismiss. No automated action is ever taken on the senior's accounts." },
  ];

  return (
    <PageTransition variant="fade">
      <div className="min-h-screen">
        <SEO
          title="Cognitive Sentinel — Senior Vulnerability Monitor | InVision Network"
          description="AI that detects when a senior is being socially engineered — in real time. Passive behavioral monitoring alerts caregivers while the threat is happening."
          keywords="senior scam protection, cognitive monitoring, elder fraud prevention, caregiver alerts Ohio"
        />
        <Navigation />

        <main>
          {/* HERO */}
          <section className="relative overflow-hidden py-24 md:py-32 bg-gradient-to-br from-[#0a0f1e] via-[#0d1a2e] to-[#0a1628]">
            <div className="absolute inset-0 opacity-[0.05] hero-grid-overlay" />
            <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-primary/20 rounded-full blur-[80px] pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10 text-center">
              <AnimatedSection animation="fade-up">
                <Badge className="mb-6 bg-green-500/20 text-green-400 border border-green-500/30 text-xs font-bold uppercase tracking-widest px-4 py-1.5">
                  Senior Protection · Add-On Feature
                </Badge>
                <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
                  Cognitive{" "}
                  <span className="gradient-text-electric">
                    Sentinel
                  </span>
                </h1>
                <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto mb-10 leading-relaxed">
                  The only AI that detects when your loved one is being scammed <em>while it's happening</em>.
                  Passive behavioral monitoring sends caregivers a real-time alert — before any money moves.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    className="h-14 px-10 font-bold rounded-full bg-gradient-to-r from-primary to-accent text-white shadow-xl hover:opacity-90 transition-opacity"
                    onClick={() => setBookingOpen(true)}
                  >
                    Add to My Plan <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                  <Button asChild variant="outline" size="lg" className="h-14 px-10 font-bold rounded-full border-white/20 text-white hover:bg-white/10">
                    <a href="/training">View Senior Plans</a>
                  </Button>
                </div>

                <div className="flex flex-wrap gap-4 justify-center mt-10">
                  {[
                    { icon: Brain, label: "Passive AI Monitoring" },
                    { icon: Bell, label: "Real-Time Caregiver Alerts" },
                    { icon: Shield, label: "No Account Access Required" },
                    { icon: Heart, label: "$49/mo Add-On" },
                  ].map(({ icon: Icon, label }) => (
                    <div key={label} className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 bg-white/5 backdrop-blur-sm">
                      <Icon className="w-4 h-4 text-primary" />
                      <span className="text-xs text-white/70 font-medium">{label}</span>
                    </div>
                  ))}
                </div>
              </AnimatedSection>
            </div>
          </section>

          {/* THE PROBLEM */}
          <section className="py-20 bg-background">
            <div className="container mx-auto px-4 max-w-5xl">
              <SectionHeader
                badge="The Reality"
                title={<>Scammers target seniors when <span className="text-primary">no one is watching</span></>}
                subtitle="The average elder fraud call lasts 38 minutes. In that window, a scammer can move a senior from doubt to wire transfer. Cognitive Sentinel watches that window for you."
              />
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { stat: "$3.4B", label: "Lost by seniors to fraud in 2024 (FBI)", color: "text-red-500" },
                  { stat: "38 min", label: "Average length of a successful scam call", color: "text-orange-500" },
                  { stat: "87%", label: "Of victims said they noticed something felt 'off'", color: "text-yellow-500" },
                ].map((item) => (
                  <AnimatedSection key={item.label} animation="fade-up">
                    <div className="text-center p-8 rounded-2xl border border-border bg-card">
                      <p className={`text-4xl font-black mb-2 ${item.color}`}>{item.stat}</p>
                      <p className="text-sm text-muted-foreground">{item.label}</p>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </section>

          {/* WHAT IT MONITORS */}
          <section className="py-20 bg-muted/30">
            <div className="container mx-auto px-4 max-w-5xl">
              <SectionHeader
                badge="Behavioral Signals"
                title={<>4 invisible signals it <span className="text-primary">tracks silently</span></>}
                subtitle="No camera. No microphone access. Just behavioral pattern analysis running inside the InVision portal."
              />
              <div className="grid md:grid-cols-2 gap-4">
                {signals.map((s) => (
                  <AnimatedSection key={s.label} animation="fade-up">
                    <FeatureCard icon={s.icon} title={s.label} description={s.desc} />
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </section>

          {/* HOW IT WORKS */}
          <section className="py-20 bg-background">
            <div className="container mx-auto px-4 max-w-4xl">
              <SectionHeader
                badge="How It Works"
                title={<>4 steps from <span className="text-primary">detection to caregiver</span></>}
              />
              <div className="space-y-6">
                {howItWorks.map((step) => (
                  <AnimatedSection key={step.step} animation="fade-up">
                    <div className="flex gap-6 p-6 rounded-2xl border border-border bg-card hover:border-primary/25 transition-colors">
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center font-black text-sm">
                        {step.step}
                      </div>
                      <div>
                        <h3 className="font-bold mb-1">{step.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                      </div>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </section>

          {/* WHO IT'S FOR */}
          <section className="py-20 bg-muted/30">
            <div className="container mx-auto px-4 max-w-5xl">
              <SectionHeader badge="Who It Protects" title={<>Built for <span className="text-primary">Ohio families</span></>} />
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { icon: Heart, who: "Adult Children", desc: "You can't watch your parent 24/7. Cognitive Sentinel does it for you, invisibly, and only calls you when it matters." },
                  { icon: Users, who: "Care Facilities", desc: "Add proactive scam detection to your resident safety program. Differentiate your facility with this cutting-edge protection layer." },
                  { icon: Eye, who: "Estate Attorneys", desc: "Document behavioral anomalies to support undue influence claims. Timestamped AI alerts become part of the evidentiary record." },
                ].map((item) => (
                  <AnimatedSection key={item.who} animation="fade-up">
                    <div className="p-7 rounded-2xl border border-border bg-card text-center h-full hover:border-primary/30 transition-colors">
                      <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <item.icon className="w-7 h-7 text-primary" />
                      </div>
                      <h3 className="font-bold mb-2">{item.who}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </section>

          {/* PRICING */}
          <section className="py-20 bg-background">
            <div className="container mx-auto px-4 max-w-lg">
              <SectionHeader badge="Simple Pricing" title={<>One flat rate. <span className="text-primary">No surprises.</span></>} />
              <AnimatedSection animation="fade-up">
                <div className="rounded-2xl border-2 border-primary bg-card p-10 text-center shadow-xl shadow-primary/10">
                  <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">Cognitive Sentinel Add-On</p>
                  <div className="flex items-baseline justify-center gap-1 mb-4">
                    <span className="text-5xl font-black">$49</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-8">Requires any active InVision Senior or Family plan. Added to existing subscription instantly.</p>
                  <ul className="space-y-3 text-left mb-8">
                    {["Passive behavioral baseline (auto-calibrated)", "Real-time caregiver push alerts", "Up to 3 designated caregiver contacts", "30-day alert history log", "Monthly behavioral health report", "Cancel anytime"].map((f) => (
                      <li key={f} className="flex items-center gap-3 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="w-full h-12 font-bold rounded-xl bg-primary text-white hover:bg-primary/90"
                    onClick={() => setBookingOpen(true)}
                  >
                    Add Cognitive Sentinel — $49/mo
                  </Button>
                  <p className="text-xs text-muted-foreground mt-3">{SITE.moneyBackGuaranteeDays}-day money-back guarantee · Cancel anytime</p>
                </div>
              </AnimatedSection>
            </div>
          </section>

          {/* CTA */}
          <section className="py-20 bg-gradient-to-br from-[#0a0f1e] to-[#111827]">
            <div className="container mx-auto px-4 text-center">
              <AnimatedSection animation="fade-up">
                <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
                  The next call your parent gets could be a scammer.
                </h2>
                <p className="text-white/85 mb-8 max-w-xl mx-auto">Let Cognitive Sentinel watch for you.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    className="h-14 px-10 font-bold rounded-full bg-gradient-to-r from-primary to-accent text-white hover:opacity-90 transition-opacity"
                    onClick={() => setBookingOpen(true)}
                  >
                    Add to My Plan — $49/mo <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                  <Button asChild variant="outline" size="lg" className="h-14 px-10 font-bold rounded-full border-white/20 text-white hover:bg-white/10">
                    <a href={SITE.phone.tel}>Call {SITE.phone.display}</a>
                  </Button>
                </div>
              </AnimatedSection>
            </div>
          </section>
        </main>
        <Footer />

        <BookingModal
          open={bookingOpen}
          onOpenChange={setBookingOpen}
          serviceType="consultation"
          serviceName="Cognitive Sentinel"
          serviceTier="Monthly Add-On"
          basePrice={49}
          veteranDiscountPercent={SITE.veteranDiscountPercent}
        />
      </div>
    </PageTransition>
  );
};

export default CognitiveSentinel;
