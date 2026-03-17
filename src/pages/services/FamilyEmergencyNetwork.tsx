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
  Radio,
  Shield,
  Users,
  MapPin,
  CheckCircle2,
  ArrowRight,
  Bell,
  Mic,
  AlertTriangle,
  Heart,
  Zap,
  Phone,
} from "lucide-react";

const SectionHeader = ({ badge, title, subtitle }: { badge: string; title: React.ReactNode; subtitle?: string }) => (
  <AnimatedSection animation="fade-up" className="text-center mb-14">
    <span className="inline-block px-4 py-1.5 bg-primary/10 rounded-full text-xs font-bold text-primary uppercase tracking-[0.15em] mb-4">{badge}</span>
    <h2 className="text-3xl md:text-4xl font-black mb-4 leading-tight">{title}</h2>
    {subtitle && <p className="text-base text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>}
  </AnimatedSection>
);

const FamilyEmergencyNetwork = () => {
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <PageTransition variant="fade">
      <div className="min-h-screen">
        <SEO
          title="Family Emergency Broadcast Network — One-Touch Panic | InVision Network"
          description="One button sends a simultaneous alert to 3 family members, an InVision analyst, and local police — with a GPS-stamped voice recording of the scammer."
          keywords="senior panic button, family alert system, scam emergency response, elder fraud protection Ohio"
        />
        <Navigation />
        <main>
          {/* HERO */}
          <section className="relative overflow-hidden py-24 md:py-32 bg-gradient-to-br from-[#0a0f1e] via-[#0d1a2e] to-[#0a1628]">
            <div className="absolute inset-0 opacity-[0.05] hero-grid-overlay" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-500/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="container mx-auto px-4 relative z-10 text-center">
              <AnimatedSection animation="fade-up">
                <div className="w-24 h-24 mx-auto mb-8 rounded-full border-4 border-red-500/50 bg-red-500/20 flex items-center justify-center shadow-2xl shadow-red-500/20">
                  <Radio className="w-12 h-12 text-red-400" />
                </div>
                <Badge className="mb-6 bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-bold uppercase tracking-widest px-4 py-1.5">Emergency Response · Senior Safety</Badge>
                <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
                  Family Emergency <span className="gradient-text-red-fire">Broadcast Network</span>
                </h1>
                <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto mb-10 leading-relaxed">
                  One button. Three family members called. One InVision analyst alerted. Local police notified.
                  All with a GPS-stamped recording of what the scammer said — in under 8 seconds.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="h-14 px-10 font-bold rounded-full bg-gradient-to-r from-primary to-accent text-white shadow-xl hover:opacity-90 transition-opacity" onClick={() => setBookingOpen(true)}>
                    Add to My Plan — $19/mo <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                  <Button asChild variant="outline" size="lg" className="h-14 px-10 font-bold rounded-full border-white/20 text-white hover:bg-white/10">
                    <a href="/training">View Senior Plans</a>
                  </Button>
                </div>
                <div className="flex flex-wrap gap-4 justify-center mt-10">
                  {[{ icon: Zap, label: "8-Second Broadcast" }, { icon: Users, label: "3 Family Contacts" }, { icon: Mic, label: "Voice Recording" }, { icon: MapPin, label: "GPS Timestamped" }].map(({ icon: Icon, label }) => (
                    <div key={label} className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 bg-white/5 backdrop-blur-sm">
                      <Icon className="w-4 h-4 text-red-400" />
                      <span className="text-xs text-white/70 font-medium">{label}</span>
                    </div>
                  ))}
                </div>
              </AnimatedSection>
            </div>
          </section>

          {/* HOW IT WORKS */}
          <section className="py-20 bg-background">
            <div className="container mx-auto px-4 max-w-5xl">
              <SectionHeader badge="How It Works" title={<>Everything that happens in <span className="text-primary">8 seconds</span></>} subtitle="The PANIC button is a large, clearly labeled button inside the InVision portal — on phone, tablet, and desktop. One tap triggers a cascade." />
              <div className="grid md:grid-cols-2 gap-8 items-center">
                {/* Timeline */}
                <AnimatedSection animation="fade-right">
                  <div className="space-y-4">
                    {[
                      { time: "0.0s", color: "bg-red-500", label: "PANIC button pressed", desc: "Senior taps the large red button in the InVision portal from any device." },
                      { time: "0.8s", color: "bg-orange-500", label: "Recording begins", desc: "The device microphone captures ambient audio. The recording is encrypted and GPS-timestamped immediately." },
                      { time: "2.1s", color: "bg-yellow-500", label: "Family broadcast sent", desc: "Simultaneous push notification + automated call to all 3 designated family contacts with the senior's name and live location." },
                      { time: "4.3s", color: "bg-primary", label: "InVision analyst alerted", desc: "An on-call analyst receives the incident and joins a silent monitoring session on the case." },
                      { time: "8.0s", color: "bg-green-500", label: "Police non-emergency notified", desc: "An automated text with GPS location and incident summary goes to the local non-emergency line. No 911 required." },
                    ].map((step) => (
                      <div key={step.time} className="flex gap-4 items-start">
                        <div className={`flex-shrink-0 w-14 h-8 rounded-md ${step.color} flex items-center justify-center`}>
                          <span className="text-white text-xs font-black">{step.time}</span>
                        </div>
                        <div className="pb-4 border-b border-border/40 flex-1">
                          <p className="font-bold text-sm">{step.label}</p>
                          <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">{step.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </AnimatedSection>

                {/* Mock alert UI */}
                <AnimatedSection animation="fade-left">
                  <div className="rounded-2xl border border-border bg-[#0d1117] p-6 shadow-2xl">
                    <div className="flex items-center gap-3 mb-4 pb-4 border-b border-white/10">
                      <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                        <Bell className="w-5 h-5 text-red-400" />
                      </div>
                      <div>
                        <p className="text-white font-bold text-sm">InVision Emergency Alert</p>
                        <p className="text-white/70 text-xs">Just now · Kettering, OH</p>
                      </div>
                      <div className="ml-auto w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    </div>
                    <p className="text-white/80 text-sm mb-4 font-medium">Margaret has pressed the PANIC button.</p>
                    <div className="space-y-2 font-mono text-xs">
                      <p className="text-green-400">✓ Recording started (encrypted)</p>
                      <p className="text-green-400">✓ Diane Morton called — answered</p>
                      <p className="text-yellow-400">⟳ Michael Morton — calling now</p>
                      <p className="text-yellow-400">⟳ James Morton — calling now</p>
                      <p className="text-blue-400">✓ Analyst #3 monitoring live</p>
                      <p className="text-white/70">⟳ Police non-emergency — sending</p>
                    </div>
                    <div className="mt-5 grid grid-cols-2 gap-2">
                      <button className="py-2 rounded-lg bg-red-500/20 border border-red-500/30 text-red-400 text-xs font-bold">Join Call</button>
                      <button className="py-2 rounded-lg bg-white/5 border border-white/10 text-white/80 text-xs font-bold">View Location</button>
                    </div>
                  </div>
                </AnimatedSection>
              </div>
            </div>
          </section>

          {/* FEATURES */}
          <section className="py-20 bg-muted/30">
            <div className="container mx-auto px-4 max-w-5xl">
              <SectionHeader badge="Features" title={<>Everything the PANIC button <span className="text-primary">delivers</span></>} />
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { icon: Mic, title: "Encrypted Voice Recording", desc: "Audio captured the moment the button is pressed. Stored securely for 90 days. Admissible in civil fraud cases." },
                  { icon: MapPin, title: "GPS & Timestamp Stamp", desc: "Every incident record includes device location, IP address, and a cryptographic timestamp for evidence integrity." },
                  { icon: Users, title: "Up to 3 Family Contacts", desc: "Designate up to 3 contacts with priority call order. Each receives both a push notification and an automated voice call." },
                  { icon: Shield, title: "InVision Analyst On-Call", desc: "A trained analyst silently joins the case and can conference into the family call, coach responses, and document the incident." },
                  { icon: Phone, title: "Police Non-Emergency Integration", desc: "Sends a pre-formatted text with the senior's location, name, and incident type to the local non-emergency dispatch number." },
                  { icon: AlertTriangle, title: "False Alarm Cancellation", desc: "A 10-second cancel window with a simple PIN prevents accidental triggers. After 10 seconds, the broadcast cannot be stopped." },
                ].map((item) => (
                  <AnimatedSection key={item.title} animation="fade-up">
                    <div className="flex gap-4 p-5 rounded-xl border border-border/60 bg-card hover:border-primary/30 hover:shadow-md transition-all duration-200">
                      <div className="flex-shrink-0 w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center">
                        <item.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm mb-1">{item.title}</p>
                        <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </section>

          {/* PRICING */}
          <section className="py-20 bg-background">
            <div className="container mx-auto px-4 max-w-3xl">
              <SectionHeader badge="Pricing" title={<>Simple, <span className="text-primary">affordable</span> safety</>} />
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { name: "Premium Plans", price: "Included", desc: "Family Emergency Network is included at no extra cost in Guardian and Family Protection plans.", features: ["Full 8-second broadcast", "3 family contacts", "InVision analyst on-call", "90-day recording storage", "Police non-emergency integration"], highlight: true, btnLabel: "Upgrade to Premium", btnPrice: 0 },
                  { name: "Entry Plans Add-On", price: "$19/mo", desc: "Add the Family Emergency Network to any Sentinel or Basic plan.", features: ["Full 8-second broadcast", "2 family contacts", "InVision analyst notification", "30-day recording storage", "Police non-emergency integration"], highlight: false, btnLabel: "Add for $19/mo", btnPrice: 19 },
                ].map((tier) => (
                  <AnimatedSection key={tier.name} animation="fade-up">
                    <div className={`rounded-2xl border p-8 flex flex-col h-full ${tier.highlight ? "border-primary bg-primary text-white shadow-2xl shadow-primary/25" : "border-border bg-card"}`}>
                      <p className={`text-xs font-bold uppercase tracking-widest mb-2 ${tier.highlight ? "text-white/70" : "text-primary"}`}>{tier.name}</p>
                      <p className={`text-3xl font-black mb-1 ${tier.highlight ? "text-white" : "text-foreground"}`}>{tier.price}</p>
                      <p className={`text-sm mb-6 ${tier.highlight ? "text-white/70" : "text-muted-foreground"}`}>{tier.desc}</p>
                      <ul className="space-y-3 flex-1 mb-8">
                        {tier.features.map((f) => (
                          <li key={f} className="flex items-start gap-2 text-sm">
                            <CheckCircle2 className={`w-4 h-4 mt-0.5 flex-shrink-0 ${tier.highlight ? "text-white/80" : "text-primary"}`} />
                            <span className={tier.highlight ? "text-white/90" : "text-foreground"}>{f}</span>
                          </li>
                        ))}
                      </ul>
                      <Button className={`w-full h-12 font-bold rounded-xl ${tier.highlight ? "bg-white text-primary hover:bg-white/90" : "bg-primary text-white hover:bg-primary/90"}`} onClick={() => setBookingOpen(true)}>
                        {tier.btnLabel}
                      </Button>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="py-20 bg-gradient-to-br from-[#0a0f1e] to-[#111827]">
            <div className="container mx-auto px-4 text-center">
              <AnimatedSection animation="fade-up">
                <Heart className="w-12 h-12 text-red-400 mx-auto mb-6" />
                <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Give your loved one a lifeline.</h2>
                <p className="text-white/85 mb-8 max-w-xl mx-auto">One button that calls everyone who matters — in under 8 seconds.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="h-14 px-10 font-bold rounded-full bg-gradient-to-r from-primary to-accent text-white hover:opacity-90 transition-opacity" onClick={() => setBookingOpen(true)}>
                    Add Emergency Network — $19/mo <ArrowRight className="ml-2 w-5 h-5" />
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
          serviceName="Family Emergency Broadcast Network"
          serviceTier="Monthly Add-On"
          basePrice={19}
          veteranDiscountPercent={SITE.veteranDiscountPercent}
        />
      </div>
    </PageTransition>
  );
};

export default FamilyEmergencyNetwork;
