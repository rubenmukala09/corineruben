import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AnimatedSection } from "@/components/AnimatedSection";
import { ServiceInquiryDialog } from "@/components/ServiceInquiryDialog";
import { SITE } from "@/config/site";
import {
  Shield,
  DollarSign,
  FileCheck,
  Clock,
  CheckCircle2,
  ArrowRight,
  AlertTriangle,
  Handshake,
  Lock,
  Building2,
  Phone,
  Star,
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

const ScamInsurance = () => {
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState({ name: "Shield Business", price: 129, tier: "Business" });

  const openInquiry = (name: string, price: number, tier: string) => {
    setSelectedTier({ name, price, tier });
    setInquiryOpen(true);
  };

  const coverageItems = [
    { icon: DollarSign, title: "Wire Transfer Fraud", desc: "If a deepfake CEO call tricks your team into a wire transfer, we cover your loss up to policy limits." },
    { icon: AlertTriangle, title: "Business Email Compromise", desc: "Spoofed vendor invoices, fake CFO emails — covered under the policy when our protection was active." },
    { icon: Phone, title: "Vishing & Phone Scams", desc: "AI-cloned voice calls that bypass standard verification and result in financial loss are covered." },
    { icon: Lock, title: "Account Takeover Loss", desc: "Financial losses resulting from credential-stuffing attacks against monitored accounts." },
    { icon: Building2, title: "Vendor Impersonation", desc: "Fraudulent payment redirections using forged supplier communications. A top threat in 2026." },
    { icon: FileCheck, title: "Ransomware Extortion", desc: "Ransom payments made under duress when technical recovery was not feasible within 72 hours." },
  ];

  const tiers = [
    { name: "Shield Basic", coverage: "$25,000", priceNum: 49, period: "mo", for: "Individuals & seniors", highlight: false, tier: "Basic" },
    { name: "Shield Business", coverage: "$100,000", priceNum: 129, period: "mo", for: "Small & mid-market businesses", highlight: true, tier: "Business" },
    { name: "Shield Enterprise", coverage: "$500,000", priceNum: 0, period: "quote", for: "Defense contractors & enterprises", highlight: false, tier: "Enterprise" },
  ];

  return (
    <PageTransition variant="fade">
      <div className="min-h-screen">
        <SEO
          title="Scam Insurance — AI Fraud Financial Protection | InVision Network"
          description="The first insurance policy specifically underwritten for AI-driven scams. If you get defrauded despite our protection, we pay. Up to $500K coverage."
          keywords="scam insurance, AI fraud protection, elder fraud insurance, business email compromise coverage Ohio"
        />
        <Navigation />

        <main>
          {/* HERO */}
          <section className="relative overflow-hidden py-24 md:py-32 bg-gradient-to-br from-[#0a0f1e] via-[#0d1a2e] to-[#0a1628]">
            <div className="absolute inset-0 opacity-[0.05] hero-grid-overlay" />
            <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-accent/15 rounded-full blur-[90px] pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10 text-center">
              <AnimatedSection animation="fade-up">
                <Badge className="mb-6 bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 text-xs font-bold uppercase tracking-widest px-4 py-1.5">
                  Industry First · AI Fraud Insurance
                </Badge>
                <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
                  Scam{" "}
                  <span className="bg-gradient-to-r from-accent to-yellow-400 bg-clip-text text-transparent">
                    Insurance
                  </span>
                </h1>
                <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto mb-10 leading-relaxed">
                  Our protection is world-class — but when AI scams succeed despite it, you deserve a financial backstop.
                  InVision's Scam Insurance pays your loss. Up to $500,000. No other cybersecurity firm in Ohio offers this.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    className="h-14 px-10 font-bold rounded-full bg-gradient-to-r from-primary to-accent text-white shadow-xl hover:opacity-90 transition-opacity"
                    onClick={() => openInquiry("Shield Business Coverage", 129, "Business")}
                  >
                    Get a Coverage Quote <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                  <Button asChild variant="outline" size="lg" className="h-14 px-10 font-bold rounded-full border-white/20 text-white hover:bg-white/10">
                    <a href="/services">View All Services</a>
                  </Button>
                </div>

                <div className="flex flex-wrap gap-4 justify-center mt-10">
                  {[
                    { icon: Shield, label: "Up to $500K Coverage" },
                    { icon: Clock, label: "72-Hour Claim Decision" },
                    { icon: Handshake, label: "No Adversarial Claims" },
                    { icon: Star, label: "Ohio-Licensed Underwriter" },
                  ].map(({ icon: Icon, label }) => (
                    <div key={label} className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 bg-white/5 backdrop-blur-sm">
                      <Icon className="w-4 h-4 text-yellow-400" />
                      <span className="text-xs text-white/70 font-medium">{label}</span>
                    </div>
                  ))}
                </div>
              </AnimatedSection>
            </div>
          </section>

          {/* WHY THIS EXISTS */}
          <section className="py-20 bg-background">
            <div className="container mx-auto px-4 max-w-5xl">
              <SectionHeader
                badge="Why This Exists"
                title={<>No protection is <span className="text-primary">100% perfect</span></>}
                subtitle="AI scammers run thousands of attack variations simultaneously. Even with elite protection, a novel attack can succeed. Scam Insurance is the safety net that no other provider offers."
              />
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { stat: "1 in 10", label: "Protected businesses still experience a successful fraud attempt annually", color: "text-red-500" },
                  { stat: "$125K", label: "Average loss per successful business email compromise in 2025", color: "text-orange-500" },
                  { stat: "72 hrs", label: "Our guaranteed claim decision window — faster than any standard cyber policy", color: "text-primary" },
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

          {/* WHAT'S COVERED */}
          <section className="py-20 bg-muted/30">
            <div className="container mx-auto px-4 max-w-5xl">
              <SectionHeader
                badge="Coverage"
                title={<>6 fraud vectors <span className="text-primary">covered by policy</span></>}
                subtitle="All coverage applies when the fraud occurred against an active InVision-monitored account or device."
              />
              <div className="grid md:grid-cols-2 gap-4">
                {coverageItems.map((item) => (
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

          {/* PRICING TIERS */}
          <section className="py-20 bg-background">
            <div className="container mx-auto px-4 max-w-5xl">
              <SectionHeader
                badge="Coverage Tiers"
                title={<>Pick the coverage that <span className="text-primary">fits your risk</span></>}
              />
              <div className="grid md:grid-cols-3 gap-6">
                {tiers.map((tier) => (
                  <AnimatedSection key={tier.name} animation="fade-up">
                    <div className={`rounded-2xl border p-8 flex flex-col h-full ${tier.highlight ? "border-primary bg-primary text-white shadow-2xl shadow-primary/25 scale-[1.02]" : "border-border bg-card"}`}>
                      {tier.highlight && (
                        <Badge className="self-start mb-4 bg-accent text-white text-xs font-bold">Most Popular</Badge>
                      )}
                      <p className={`text-xs font-bold uppercase tracking-widest mb-2 ${tier.highlight ? "text-white/70" : "text-primary"}`}>{tier.name}</p>
                      <p className={`text-3xl font-black mb-1 ${tier.highlight ? "text-white" : "text-foreground"}`}>{tier.coverage}</p>
                      <p className={`text-sm mb-1 ${tier.highlight ? "text-white/70" : "text-muted-foreground"}`}>max coverage</p>
                      <div className="border-t border-white/10 my-4" />
                      <div className="space-y-2 flex-1">
                        {[
                          { label: "Premium", value: tier.priceNum > 0 ? `$${tier.priceNum}/mo` : "Custom quote" },
                          { label: "Best for", value: tier.for },
                        ].map((row) => (
                          <div key={row.label} className="flex justify-between text-sm">
                            <span className={tier.highlight ? "text-white/60" : "text-muted-foreground"}>{row.label}</span>
                            <span className={`font-semibold ${tier.highlight ? "text-white" : "text-foreground"}`}>{row.value}</span>
                          </div>
                        ))}
                      </div>
                      <Button
                        className={`w-full mt-8 h-11 font-bold rounded-xl ${tier.highlight ? "bg-white text-primary hover:bg-white/90" : "bg-primary text-white hover:bg-primary/90"}`}
                        onClick={() => openInquiry(tier.name, tier.priceNum, tier.tier)}
                      >
                        Get a Quote
                      </Button>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
              <AnimatedSection animation="fade-up" className="mt-8 text-center">
                <p className="text-xs text-muted-foreground max-w-2xl mx-auto">
                  Coverage requires an active InVision protection plan. Policy is underwritten by a licensed Ohio surplus lines carrier. Terms and exclusions apply — full policy documents provided at enrollment.
                </p>
              </AnimatedSection>
            </div>
          </section>

          {/* HOW TO CLAIM */}
          <section className="py-20 bg-muted/30">
            <div className="container mx-auto px-4 max-w-4xl">
              <SectionHeader
                badge="Claims Process"
                title={<>Filing a claim takes <span className="text-primary">under 10 minutes</span></>}
                subtitle="We designed this process for real people under stress — not for adjusters looking for loopholes."
              />
              <div className="grid md:grid-cols-4 gap-4">
                {[
                  { step: "1", title: "Report the incident", desc: "Call or message your InVision analyst within 24 hours of discovering the fraud." },
                  { step: "2", title: "AI evidence pull", desc: "Our system automatically pulls logs, alert history, and behavioral data to build your claim file." },
                  { step: "3", title: "72-hour review", desc: "A licensed adjuster reviews the file. You get a coverage decision in writing within 72 hours." },
                  { step: "4", title: "Payment issued", desc: "Approved claims are paid by ACH within 5 business days. No months-long disputes." },
                ].map((s) => (
                  <AnimatedSection key={s.step} animation="fade-up">
                    <div className="text-center p-6 rounded-2xl border border-border bg-card h-full">
                      <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-black text-sm mx-auto mb-4">{s.step}</div>
                      <h3 className="font-bold text-sm mb-2">{s.title}</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
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
                <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Protection you can feel. Coverage you can count on.</h2>
                <p className="text-white/60 mb-8 max-w-xl mx-auto">The only AI scam firm in Ohio that pays when something slips through.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    className="h-14 px-10 font-bold rounded-full bg-gradient-to-r from-primary to-accent text-white hover:opacity-90 transition-opacity"
                    onClick={() => openInquiry("Shield Business Coverage", 129, "Business")}
                  >
                    Get a Coverage Quote <ArrowRight className="ml-2 w-5 h-5" />
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

        <ServiceInquiryDialog
          open={inquiryOpen}
          onOpenChange={setInquiryOpen}
          serviceName={selectedTier.name}
          servicePrice={selectedTier.price}
          serviceTier={selectedTier.tier}
          serviceDescription={`AI fraud insurance covering up to ${selectedTier.tier === "Basic" ? "$25,000" : selectedTier.tier === "Business" ? "$100,000" : "$500,000"} in verified losses from AI-driven scams.`}
        />
      </div>
    </PageTransition>
  );
};

export default ScamInsurance;
