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
  Lock,
  Users,
  Shield,
  FileCheck,
  Key,
  CheckCircle2,
  ArrowRight,
  Heart,
  AlertTriangle,
  BookOpen,
  Archive,
} from "lucide-react";

const SectionHeader = ({ badge, title, subtitle }: { badge: string; title: React.ReactNode; subtitle?: string }) => (
  <AnimatedSection animation="fade-up" className="text-center mb-14">
    <span className="inline-block px-4 py-1.5 bg-primary/10 rounded-full text-xs font-bold text-primary uppercase tracking-[0.15em] mb-4">{badge}</span>
    <h2 className="text-3xl md:text-4xl font-black mb-4 leading-tight">{title}</h2>
    {subtitle && <p className="text-base text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>}
  </AnimatedSection>
);

const DigitalEstate = () => {
  const [bookingOpen, setBookingOpen] = useState(false);

  const vaultItems = [
    { icon: Key, title: "Account Credentials & Passwords", desc: "Securely vault login credentials for email, banking, social media, utilities, and subscriptions — encrypted at rest." },
    { icon: FileCheck, title: "Legal & Financial Documents", desc: "Upload will, trust, POA, insurance policies, and account statements. All encrypted and accessible only to designated heirs." },
    { icon: Lock, title: "Crypto & Digital Asset Keys", desc: "Hardware wallet recovery phrases and exchange credentials stored in an air-gapped vault with multi-heir access keys." },
    { icon: BookOpen, title: "Final Instructions & Messages", desc: "Record final video messages, written instructions, and obituary drafts that release only upon verified event trigger." },
    { icon: Archive, title: "Subscription & Membership List", desc: "Auto-generated list of recurring payments to cancel — saving heirs hundreds of dollars in post-death charges." },
    { icon: Shield, title: "Evidence of Financial Abuse", desc: "If fraud was attempted or completed before the triggering event, the vault preserves a timestamped evidence trail for attorneys." },
  ];

  const triggers = [
    { event: "Verified Death", action: "Death certificate uploaded by designated executor → vault unlocked for heirs in 24 hours." },
    { event: "Court-Documented Incapacitation", action: "Power of attorney or guardianship documentation triggers account lockdown and heir access simultaneously." },
    { event: "Voluntary Lockdown", action: "The owner can manually activate Lockdown Mode at any time — immediately revoking all account access during an active scam attempt." },
  ];

  return (
    <PageTransition variant="fade">
      <div className="min-h-screen">
        <SEO
          title="Digital Estate Executor — AI Vault for Seniors | InVision Network"
          description="An AI-managed digital vault that automatically locks down accounts, notifies contacts, and transfers credentials to heirs upon death or incapacitation. Built for Ohio seniors."
          keywords="digital estate planning, senior account vault, digital asset executor, online accounts after death Ohio"
        />
        <Navigation />
        <main>
          {/* HERO */}
          <section className="relative overflow-hidden py-24 md:py-32 bg-gradient-to-br from-[#0a0f1e] via-[#0d1a2e] to-[#0a1628]">
            <div className="absolute inset-0 opacity-[0.05] hero-grid-overlay" />
            <div className="absolute top-1/4 left-1/3 w-80 h-80 bg-primary/15 rounded-full blur-[100px] pointer-events-none" />
            <div className="container mx-auto px-4 relative z-10 text-center">
              <AnimatedSection animation="fade-up">
                <div className="w-24 h-24 mx-auto mb-8 rounded-2xl border-2 border-primary/40 bg-primary/10 flex items-center justify-center shadow-2xl shadow-primary/20">
                  <Archive className="w-12 h-12 text-primary" />
                </div>
                <Badge className="mb-6 bg-primary/20 text-primary border border-primary/30 text-xs font-bold uppercase tracking-widest px-4 py-1.5">Senior Estate Planning · Digital Security</Badge>
                <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
                  Digital Estate <span className="gradient-text-electric">Executor</span>
                </h1>
                <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto mb-10 leading-relaxed">
                  An encrypted digital vault that holds all of a senior's accounts, assets, and final instructions — and executes automatically upon death or incapacitation. No attorney required. No scammer can raid it.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="h-14 px-10 font-bold rounded-full bg-gradient-to-r from-primary to-accent text-white shadow-xl hover:opacity-90 transition-opacity" onClick={() => setBookingOpen(true)}>
                    Set Up My Vault — $299 <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                  <Button asChild variant="outline" size="lg" className="h-14 px-10 font-bold rounded-full border-white/20 text-white hover:bg-white/10">
                    <a href="/training">View Senior Plans</a>
                  </Button>
                </div>
                <div className="flex flex-wrap gap-4 justify-center mt-10">
                  {[{ icon: Lock, label: "$299 One-Time Setup" }, { icon: Archive, label: "$9/mo Maintenance" }, { icon: Shield, label: "Zero-Knowledge Encryption" }, { icon: Users, label: "Up to 3 Designated Heirs" }].map(({ icon: Icon, label }) => (
                    <div key={label} className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 bg-white/5 backdrop-blur-sm">
                      <Icon className="w-4 h-4 text-primary" />
                      <span className="text-xs text-white/70 font-medium">{label}</span>
                    </div>
                  ))}
                </div>
              </AnimatedSection>
            </div>
          </section>

          {/* PROBLEM */}
          <section className="py-20 bg-background">
            <div className="container mx-auto px-4 max-w-5xl">
              <SectionHeader badge="The Problem" title={<>What happens to digital accounts <span className="text-primary">when seniors can't manage them</span>?</>} subtitle="Most families spend months trying to close accounts, recover money, and stop subscriptions. Meanwhile, scammers who had a relationship with the victim may still have access." />
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { stat: "4.7 yrs", label: "Average time a deceased person's email account stays open and accessible to scammers", color: "text-red-500" },
                  { stat: "$12,000", label: "Average unrecovered value lost due to un-notified accounts and uncanceled subscriptions after death", color: "text-orange-500" },
                  { stat: "68%", label: "Of elder financial abuse happens before or during cognitive decline — when access is hardest to revoke", color: "text-yellow-500" },
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

          {/* VAULT CONTENTS */}
          <section className="py-20 bg-muted/30">
            <div className="container mx-auto px-4 max-w-5xl">
              <SectionHeader badge="The Vault" title={<>Everything stored <span className="text-primary">inside the Digital Estate</span></>} subtitle="All data is encrypted with zero-knowledge architecture. InVision never has access. Only the owner and designated heirs can decrypt." />
              <div className="grid md:grid-cols-2 gap-4">
                {vaultItems.map((item) => (
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

          {/* TRIGGER EVENTS */}
          <section className="py-20 bg-background">
            <div className="container mx-auto px-4 max-w-4xl">
              <SectionHeader badge="Trigger Events" title={<>3 events that <span className="text-primary">activate the vault</span></>} subtitle="The vault executes based on verified, documented events — not assumptions. Every action is logged and legally defensible." />
              <div className="space-y-4">
                {triggers.map((t, i) => (
                  <AnimatedSection key={t.event} animation="fade-up">
                    <div className="flex gap-6 p-6 rounded-2xl border border-border bg-card hover:border-primary/25 transition-colors">
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center font-black text-lg">{i + 1}</div>
                      <div>
                        <h3 className="font-bold mb-1">{t.event}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{t.action}</p>
                      </div>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </section>

          {/* WHAT HEIRS RECEIVE */}
          <section className="py-20 bg-muted/30">
            <div className="container mx-auto px-4 max-w-5xl">
              <SectionHeader badge="For Heirs" title={<>What heirs receive <span className="text-primary">when it activates</span></>} />
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { icon: Key, title: "Decryption Access", desc: "Designated heirs receive a secure one-time link that decrypts only the sections they are authorized to view." },
                  { icon: FileCheck, title: "Account Closure Checklist", desc: "A prioritized, pre-populated list of every account to close, transfer, or notify — with links and instructions." },
                  { icon: AlertTriangle, title: "Fraud Evidence Package", desc: "If any scam activity was detected against the account, heirs receive a complete timestamped evidence package for attorneys." },
                ].map((item) => (
                  <AnimatedSection key={item.title} animation="fade-up">
                    <div className="p-7 rounded-2xl border border-border bg-card text-center h-full hover:border-primary/30 transition-colors">
                      <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <item.icon className="w-7 h-7 text-primary" />
                      </div>
                      <h3 className="font-bold mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </section>

          {/* ATTORNEY REFERRAL */}
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4 max-w-3xl">
              <AnimatedSection animation="fade-up">
                <div className="rounded-2xl border border-primary/20 bg-primary/5 p-8 text-center">
                  <BookOpen className="w-10 h-10 text-primary mx-auto mb-4" />
                  <h3 className="font-black text-xl mb-3">Ohio Estate Attorneys: Refer & Earn</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed max-w-xl mx-auto mb-6">
                    We offer a formal referral partnership for Ohio estate planning attorneys. You recommend the Digital Estate Executor to clients; we pay a 20% referral fee on every setup and maintain a co-branded version with your firm's branding.
                  </p>
                  <Button variant="outline" className="border-primary text-primary hover:bg-primary/10" onClick={() => setBookingOpen(true)}>
                    Inquire About Partnership
                  </Button>
                </div>
              </AnimatedSection>
            </div>
          </section>

          {/* PRICING */}
          <section className="py-20 bg-muted/30">
            <div className="container mx-auto px-4 max-w-lg">
              <SectionHeader badge="Pricing" title={<>Simple. <span className="text-primary">One-time + low monthly.</span></>} />
              <AnimatedSection animation="fade-up">
                <div className="rounded-2xl border-2 border-primary bg-card p-10 text-center shadow-xl shadow-primary/10">
                  <p className="text-xs font-bold uppercase tracking-widest text-primary mb-4">Digital Estate Executor</p>
                  <div className="flex items-baseline justify-center gap-2 mb-2">
                    <span className="text-5xl font-black">$299</span>
                    <span className="text-muted-foreground">one-time setup</span>
                  </div>
                  <div className="flex items-baseline justify-center gap-2 mb-6">
                    <span className="text-2xl font-bold text-primary">+$9</span>
                    <span className="text-muted-foreground text-sm">/month vault maintenance</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-8">Setup includes a 2-hour guided vault-building session with an InVision specialist.</p>
                  <ul className="space-y-3 text-left mb-8">
                    {["Unlimited vault storage (encrypted)", "Up to 3 designated heirs", "All 3 trigger event types", "Annual vault health check", "Fraud evidence preservation", "Attorney referral document package", "No expiration — active as long as subscription is active"].map((f) => (
                      <li key={f} className="flex items-center gap-3 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full h-12 font-bold rounded-xl bg-primary text-white hover:bg-primary/90" onClick={() => setBookingOpen(true)}>
                    Set Up My Vault — $299
                  </Button>
                  <p className="text-xs text-muted-foreground mt-3">{SITE.moneyBackGuaranteeDays}-day money-back guarantee</p>
                </div>
              </AnimatedSection>
            </div>
          </section>

          {/* CTA */}
          <section className="py-20 bg-gradient-to-br from-[#0a0f1e] to-[#111827]">
            <div className="container mx-auto px-4 text-center">
              <AnimatedSection animation="fade-up">
                <Heart className="w-12 h-12 text-primary mx-auto mb-6" />
                <h2 className="text-3xl md:text-4xl font-black text-white mb-4">The greatest gift you can give your family is a plan.</h2>
                <p className="text-white/60 mb-8 max-w-xl mx-auto">Set up your digital estate today and eliminate months of confusion for your heirs.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="h-14 px-10 font-bold rounded-full bg-gradient-to-r from-primary to-accent text-white hover:opacity-90 transition-opacity" onClick={() => setBookingOpen(true)}>
                    Set Up My Vault — $299 <ArrowRight className="ml-2 w-5 h-5" />
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
          serviceName="Digital Estate Executor"
          serviceTier="Setup + Monthly"
          basePrice={299}
          veteranDiscountPercent={SITE.veteranDiscountPercent}
        />
      </div>
    </PageTransition>
  );
};

export default DigitalEstate;
