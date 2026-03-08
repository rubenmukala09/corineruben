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
  Award,
  Shield,
  CheckCircle2,
  ArrowRight,
  Search,
  FileCheck,
  Building2,
  Globe,
  Lock,
  Users,
  TrendingUp,
  Star,
  RefreshCw,
} from "lucide-react";

const SectionHeader = ({ badge, title, subtitle }: { badge: string; title: React.ReactNode; subtitle?: string }) => (
  <AnimatedSection animation="fade-up" className="text-center mb-14">
    <span className="inline-block px-4 py-1.5 bg-primary/10 rounded-full text-xs font-bold text-primary uppercase tracking-[0.15em] mb-4">{badge}</span>
    <h2 className="text-3xl md:text-4xl font-black mb-4 leading-tight">{title}</h2>
    {subtitle && <p className="text-base text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>}
  </AnimatedSection>
);

const AISafeCertification = () => {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingTier, setBookingTier] = useState({ name: "AI-Safe Initial Certification", price: 2400, tier: "Initial" });

  const openBooking = (name: string, price: number, tier: string) => {
    setBookingTier({ name, price, tier });
    setBookingOpen(true);
  };

  const auditAreas = [
    { icon: Shield, title: "Deepfake Resistance Assessment", desc: "We test your team's ability to detect synthetic voice/video using live simulations, benchmarked against industry standards." },
    { icon: Lock, title: "AI-Phishing Penetration Test", desc: "Our red team runs AI-generated spear-phishing campaigns against your staff and documents click-through and compliance rates." },
    { icon: Users, title: "Employee Security Training Audit", desc: "Review of existing training materials, frequency of drills, and staff awareness scores. Remediation plan provided for gaps." },
    { icon: FileCheck, title: "Policy & Process Review", desc: "Evaluation of your wire-transfer approval process, identity verification protocols, and vendor onboarding procedures." },
    { icon: Building2, title: "Technology Stack Analysis", desc: "Review of email filters, MFA coverage, endpoint protection, and monitoring tooling against the InVision 2026 standard." },
    { icon: Globe, title: "Dark Web Exposure Scan", desc: "We check if your business identities, executive emails, or credentials are actively circulating on dark web markets." },
  ];

  return (
    <PageTransition variant="fade">
      <div className="min-h-screen">
        <SEO
          title="AI-Safe Certification — Verified Business Security Seal | InVision Network"
          description="Get your business InVision Certified AI-Safe. Annual audit, verified badge for your website, and recognition Ohio defense contractors and law firms trust."
          keywords="AI safe certification, business cybersecurity audit, Ohio defense contractor compliance, AI scam verified seal"
        />
        <Navigation />
        <main>
          {/* HERO */}
          <section className="relative overflow-hidden py-24 md:py-32 bg-gradient-to-br from-[#0a0f1e] via-[#0d1a2e] to-[#0a1628]">
            <div className="absolute inset-0 opacity-[0.05] hero-grid-overlay" />
            <div className="absolute top-1/4 right-1/3 w-72 h-72 bg-yellow-500/10 rounded-full blur-[80px] pointer-events-none" />
            <div className="container mx-auto px-4 relative z-10 text-center">
              <AnimatedSection animation="fade-up">
                <div className="w-28 h-28 mx-auto mb-8 rounded-full border-4 border-yellow-400/50 bg-gradient-to-br from-yellow-500/20 to-primary/20 flex items-center justify-center shadow-2xl shadow-yellow-500/20">
                  <Award className="w-14 h-14 text-yellow-400" />
                </div>
                <Badge className="mb-6 bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 text-xs font-bold uppercase tracking-widest px-4 py-1.5">Annual Business Certification</Badge>
                <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
                  InVision <span className="gradient-text-gold">AI-Safe Certified</span>
                </h1>
                <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto mb-10 leading-relaxed">
                  A rigorous annual audit that earns your business the most credible AI-resistance seal in Ohio.
                  Display it on your website, RFPs, and contracts. Defense contractors, law firms, and healthcare providers are first in line.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="h-14 px-10 font-bold rounded-full bg-gradient-to-r from-primary to-accent text-white shadow-xl hover:opacity-90 transition-opacity" onClick={() => openBooking("AI-Safe Initial Certification", 2400, "Initial")}>
                    Apply for Certification — $2,400 <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                  <Button asChild variant="outline" size="lg" className="h-14 px-10 font-bold rounded-full border-white/20 text-white hover:bg-white/10">
                    <a href="/business">View Business Services</a>
                  </Button>
                </div>
                <div className="flex flex-wrap gap-4 justify-center mt-10">
                  {[{ icon: Star, label: "6-Point Audit" }, { icon: Globe, label: "Publicly Verified Seal" }, { icon: RefreshCw, label: "Annual Renewal" }, { icon: TrendingUp, label: "Competitive Differentiator" }].map(({ icon: Icon, label }) => (
                    <div key={label} className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 bg-white/5 backdrop-blur-sm">
                      <Icon className="w-4 h-4 text-yellow-400" />
                      <span className="text-xs text-white/70 font-medium">{label}</span>
                    </div>
                  ))}
                </div>
              </AnimatedSection>
            </div>
          </section>

          {/* WHY IT MATTERS */}
          <section className="py-20 bg-background">
            <div className="container mx-auto px-4 max-w-5xl">
              <SectionHeader badge="Market Opportunity" title={<>Your competitors aren't <span className="text-primary">certified yet</span></>} subtitle="By 2026, procurement teams at government agencies and enterprise clients will require vendors to document AI-resistance. Being first in Ohio is a durable competitive advantage." />
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { stat: "72%", label: "Of enterprise procurement teams will require AI security documentation by 2027 (Gartner)", color: "text-primary" },
                  { stat: "$2,400", label: "Initial certification fee — less than one hour of attorney time for your clients", color: "text-yellow-500" },
                  { stat: "First", label: "In Ohio to offer this certification. No competitor has this product today.", color: "text-green-500" },
                ].map((item) => (
                  <AnimatedSection key={item.label} animation="fade-up">
                    <div className="text-center p-8 rounded-2xl border border-border bg-card h-full">
                      <p className={`text-4xl font-black mb-2 ${item.color}`}>{item.stat}</p>
                      <p className="text-sm text-muted-foreground">{item.label}</p>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </section>

          {/* AUDIT AREAS */}
          <section className="py-20 bg-muted/30">
            <div className="container mx-auto px-4 max-w-5xl">
              <SectionHeader badge="The 6-Point Audit" title={<>What we examine to <span className="text-primary">earn your seal</span></>} subtitle="The audit is collaborative, not adversarial. Our goal is to help you pass — then certify the result." />
              <div className="grid md:grid-cols-2 gap-4">
                {auditAreas.map((area) => (
                  <AnimatedSection key={area.title} animation="fade-up">
                    <div className="flex gap-4 p-5 rounded-xl border border-border/60 bg-card hover:border-primary/30 hover:shadow-md transition-all duration-200">
                      <div className="flex-shrink-0 w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center">
                        <area.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm mb-1">{area.title}</p>
                        <p className="text-sm text-muted-foreground leading-relaxed">{area.desc}</p>
                      </div>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </section>

          {/* WHAT YOU GET */}
          <section className="py-20 bg-background">
            <div className="container mx-auto px-4 max-w-4xl">
              <SectionHeader badge="What You Receive" title={<>Everything included in <span className="text-primary">your certification</span></>} />
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { icon: Award, title: "Digital Certification Seal", desc: "A verified, dated seal file for your website with a public verification URL clients can click to confirm authenticity." },
                  { icon: FileCheck, title: "Written Audit Report", desc: "Full 20–30 page report documenting every finding, risk score, and remediation action taken. Use in RFPs and contracts." },
                  { icon: Search, title: "Remediation Consultation", desc: "Two 1-hour sessions with an InVision analyst to address any gaps found during the audit before the seal is awarded." },
                  { icon: RefreshCw, title: "Annual Renewal Process", desc: "Streamlined re-audit (4–6 hours vs. 8–12 for initial) each year to keep your certification current and publicly valid." },
                  { icon: Globe, title: "Public Certified Registry Listing", desc: "Your business appears in the InVision Certified directory — a searchable public registry clients and procurement teams can verify." },
                  { icon: TrendingUp, title: "Marketing Assets Kit", desc: "Branded badge files, email signatures, press release template, and LinkedIn banner announcing your certification." },
                ].map((item) => (
                  <AnimatedSection key={item.title} animation="fade-up">
                    <div className="flex gap-4 p-5 rounded-xl border border-border/60 bg-card hover:border-primary/30 hover:shadow-md transition-all">
                      <div className="flex-shrink-0 w-11 h-11 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                        <item.icon className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
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
          <section className="py-20 bg-muted/30">
            <div className="container mx-auto px-4 max-w-4xl">
              <SectionHeader badge="Pricing" title={<>Straightforward. <span className="text-primary">No hidden fees.</span></>} />
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { name: "Initial Certification", price: 2400, tier: "Initial", period: "one-time", desc: "Full 6-point audit, remediation consultation, and all certification deliverables.", features: ["8–12 hour audit process", "Written audit report", "Remediation consultation (2 sessions)", "Seal + public registry listing", "Full marketing asset kit"], highlight: false },
                  { name: "Annual Renewal", price: 1200, tier: "Renewal", period: "per year", desc: "Streamlined re-audit to keep your certification current and publicly valid.", features: ["4–6 hour re-audit", "Updated audit report", "Seal dated for current year", "Continued registry listing", "Priority scheduling"], highlight: true },
                ].map((t) => (
                  <AnimatedSection key={t.name} animation="fade-up">
                    <div className={`rounded-2xl border p-8 flex flex-col h-full ${t.highlight ? "border-primary bg-primary text-white shadow-2xl shadow-primary/25" : "border-border bg-card"}`}>
                      <p className={`text-xs font-bold uppercase tracking-widest mb-2 ${t.highlight ? "text-white/70" : "text-primary"}`}>{t.name}</p>
                      <div className="flex items-baseline gap-1 mb-2">
                        <span className={`text-4xl font-black ${t.highlight ? "text-white" : "text-foreground"}`}>${t.price.toLocaleString()}</span>
                        <span className={`text-sm ${t.highlight ? "text-white/85" : "text-muted-foreground"}`}>/{t.period}</span>
                      </div>
                      <p className={`text-sm mb-6 ${t.highlight ? "text-white/85" : "text-muted-foreground"}`}>{t.desc}</p>
                      <ul className="space-y-3 flex-1 mb-8">
                        {t.features.map((f) => (
                          <li key={f} className="flex items-start gap-2 text-sm">
                            <CheckCircle2 className={`w-4 h-4 mt-0.5 flex-shrink-0 ${t.highlight ? "text-white/80" : "text-primary"}`} />
                            <span className={t.highlight ? "text-white/90" : "text-foreground"}>{f}</span>
                          </li>
                        ))}
                      </ul>
                      <Button className={`w-full h-12 font-bold rounded-xl ${t.highlight ? "bg-white text-primary hover:bg-white/90" : "bg-primary text-white hover:bg-primary/90"}`} onClick={() => openBooking(`AI-Safe ${t.name}`, t.price, t.tier)}>
                        Apply Now — ${t.price.toLocaleString()}
                      </Button>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </section>

          {/* WHO SHOULD CERTIFY */}
          <section className="py-20 bg-background">
            <div className="container mx-auto px-4 max-w-5xl">
              <SectionHeader badge="Who Applies" title={<>Industries that <span className="text-primary">benefit most</span></>} />
              <div className="grid md:grid-cols-4 gap-4">
                {[
                  { icon: Building2, label: "Defense & Gov Contractors", desc: "CMMC alignment + AI-safe certification = stronger bids." },
                  { icon: FileCheck, label: "Law Firms", desc: "Protect client confidentiality and satisfy bar ethics guidance on AI." },
                  { icon: Shield, label: "Healthcare Practices", desc: "Demonstrate HIPAA-aligned AI scam controls to payers and partners." },
                  { icon: TrendingUp, label: "Financial Advisors", desc: "Show fiduciary AI-risk controls to regulators and high-net-worth clients." },
                ].map((item) => (
                  <AnimatedSection key={item.label} animation="fade-up">
                    <div className="p-6 rounded-2xl border border-border bg-card text-center h-full hover:border-primary/30 transition-colors">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                        <item.icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="font-bold text-sm mb-2">{item.label}</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
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
                <Award className="w-16 h-16 text-yellow-400 mx-auto mb-6" />
                <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Be the first certified business in your industry.</h2>
                <p className="text-white/85 mb-8 max-w-xl mx-auto">Applications reviewed within 5 business days. First cohort starts Q2 2026.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="h-14 px-10 font-bold rounded-full bg-gradient-to-r from-primary to-accent text-white hover:opacity-90 transition-opacity" onClick={() => openBooking("AI-Safe Initial Certification", 2400, "Initial")}>
                    Apply Now — $2,400 <ArrowRight className="ml-2 w-5 h-5" />
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
          serviceName={bookingTier.name}
          serviceTier={bookingTier.tier}
          basePrice={bookingTier.price}
          veteranDiscountPercent={SITE.veteranDiscountPercent}
        />
      </div>
    </PageTransition>
  );
};

export default AISafeCertification;
