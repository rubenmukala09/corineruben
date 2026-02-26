import { useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AnimatedSection } from "@/components/AnimatedSection";
import { ServiceInquiryDialog } from "@/components/ServiceInquiryDialog";
import {
  Bot,
  Scan,
  Radio,
  Key,
  Brain,
  DollarSign,
  Award,
  Bell,
  Archive,
  ArrowRight,
  Shield,
  Zap,
  Lock,
} from "lucide-react";

/* ── All 9 features ── */
const ALL_FEATURES = [
  /* ── Autonomous Defense Hub (4) ── */
  {
    group: "Autonomous Defense Hub",
    badge: "Enterprise",
    badgeColor: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    icon: Bot,
    title: "Agentic SOC",
    tagline: "AI analysts that triage & contain threats autonomously — 24/7.",
    href: "/business/autonomous-defense-hub",
    price: "From $297/mo",
  },
  {
    group: "Autonomous Defense Hub",
    badge: "Enterprise",
    badgeColor: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    icon: Scan,
    title: "InVision Validator",
    tagline: "Cryptographic deepfake detection for video calls and voice requests.",
    href: "/business/autonomous-defense-hub",
    price: "From $297/mo",
  },
  {
    group: "Autonomous Defense Hub",
    badge: "Enterprise",
    badgeColor: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    icon: Radio,
    title: "Honey-Identity Network",
    tagline: "Proactively trap AI scrapers with decoy identities across 40+ platforms.",
    href: "/business/autonomous-defense-hub",
    price: "From $697/mo",
  },
  {
    group: "Autonomous Defense Hub",
    badge: "Enterprise",
    badgeColor: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    icon: Key,
    title: "Safe-Zone Hardware Key",
    tagline: "Physical USB-C touch required for every high-risk action. AI can't press it.",
    href: "/business/autonomous-defense-hub",
    price: "Included in plan",
  },
  /* ── New 5 features ── */
  {
    group: "Senior & Family",
    badge: "Senior",
    badgeColor: "bg-green-500/20 text-green-400 border-green-500/30",
    icon: Brain,
    title: "Cognitive Sentinel",
    tagline: "Detects behavioral stress signals in real time. Alerts caregivers while the scam is happening.",
    href: "/services/cognitive-sentinel",
    price: "$49/mo add-on",
  },
  {
    group: "Senior & Family",
    badge: "Senior",
    badgeColor: "bg-green-500/20 text-green-400 border-green-500/30",
    icon: Bell,
    title: "Family Emergency Network",
    tagline: "One PANIC button. 3 family members called + analyst alerted + police notified in 8 seconds.",
    href: "/services/family-emergency-network",
    price: "$19/mo add-on",
  },
  {
    group: "Senior & Family",
    badge: "Senior",
    badgeColor: "bg-green-500/20 text-green-400 border-green-500/30",
    icon: Archive,
    title: "Digital Estate Executor",
    tagline: "AI vault that locks down all accounts and transfers credentials to heirs upon incapacitation or death.",
    href: "/services/digital-estate",
    price: "$299 + $9/mo",
  },
  {
    group: "Business & Insurance",
    badge: "Business",
    badgeColor: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    icon: DollarSign,
    title: "Scam Insurance",
    tagline: "If fraud succeeds despite our protection, we pay. Up to $500K. Industry first.",
    href: "/services/scam-insurance",
    price: "From $49/mo",
  },
  {
    group: "Business & Insurance",
    badge: "Business",
    badgeColor: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    icon: Award,
    title: "AI-Safe Certification",
    tagline: "Annual audit + verified seal for Ohio businesses. Defense contractors and law firms first in line.",
    href: "/services/ai-safe-certification",
    price: "$2,400/yr",
  },
];

const GROUPS = ["Autonomous Defense Hub", "Senior & Family", "Business & Insurance"];

const InVision2026 = () => {
  const [demoOpen, setDemoOpen] = useState(false);

  return (
    <PageTransition variant="fade">
      <div className="min-h-screen">
        <SEO
          title="InVision 2026 — The Complete AI Defense Platform | InVision Network"
          description="9 next-generation services built for Ohio's businesses and seniors: Agentic SOC, Deepfake Validator, Cognitive Sentinel, Scam Insurance, Digital Estate Executor, and more."
          keywords="InVision 2026, AI defense platform Ohio, senior scam protection, autonomous defense hub, deepfake protection"
        />
        <Navigation />

        <main>
          {/* HERO */}
          <section className="relative overflow-hidden py-24 md:py-36 bg-gradient-to-br from-[#050810] via-[#0a0f1e] to-[#0d1628]">
            <div
              className="absolute inset-0 opacity-[0.07] hero-grid-overlay"
            />
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-accent/15 rounded-full blur-[80px] pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10 text-center">
              <AnimatedSection animation="fade-up">
                <Badge className="mb-6 bg-primary/20 text-primary border border-primary/30 text-xs font-bold uppercase tracking-widest px-4 py-1.5">
                  InVision Network — Full 2026 Platform
                </Badge>
                <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
                  InVision{" "}
                  <span className="gradient-text-fire">
                    2026
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto mb-6 leading-relaxed font-light">
                  9 integrated services. One autonomous defense platform.
                  Built for Ohio's businesses, seniors, and families.
                </p>
                <p className="text-base text-white/50 max-w-2xl mx-auto mb-12">
                  From a 24/7 Agentic SOC that stops breaches before you wake up, to a one-touch PANIC
                  button for seniors, to scam insurance that pays when attacks succeed — InVision 2026
                  is the most complete AI defense stack available in Ohio.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    className="h-14 px-12 font-bold rounded-full bg-gradient-to-r from-primary to-accent text-white shadow-2xl hover:opacity-90 transition-opacity"
                    onClick={() => setDemoOpen(true)}
                  >
                    Get a Platform Demo <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="h-14 px-12 font-bold rounded-full border-white/20 text-white hover:bg-white/10"
                  >
                    <Link to="/training">View Individual Plans</Link>
                  </Button>
                </div>
              </AnimatedSection>

              {/* Platform stats */}
              <AnimatedSection animation="fade-up" className="mt-20">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                  {[
                    { value: "9", label: "Integrated Services" },
                    { value: "< 90s", label: "Avg. Threat Response" },
                    { value: "$500K", label: "Max Insurance Coverage" },
                    { value: "24/7", label: "Autonomous Monitoring" },
                  ].map((s) => (
                    <div
                      key={s.label}
                      className="p-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm"
                    >
                      <p className="text-3xl font-black text-white mb-1">{s.value}</p>
                      <p className="text-xs text-white/50 uppercase tracking-wider">{s.label}</p>
                    </div>
                  ))}
                </div>
              </AnimatedSection>
            </div>
          </section>

          {/* ALL 9 FEATURES */}
          {GROUPS.map((group) => {
            const features = ALL_FEATURES.filter((f) => f.group === group);
            const groupColors: Record<string, string> = {
              "Autonomous Defense Hub": "from-purple-500/10 to-transparent",
              "Senior & Family": "from-green-500/10 to-transparent",
              "Business & Insurance": "from-yellow-500/10 to-transparent",
            };
            const groupIcons: Record<string, React.ElementType> = {
              "Autonomous Defense Hub": Shield,
              "Senior & Family": Brain,
              "Business & Insurance": Award,
            };
            const GroupIcon = groupIcons[group];

            return (
              <section key={group} className={`py-20 md:py-24 bg-gradient-to-b ${groupColors[group]} bg-background`}>
                <div className="container mx-auto px-4">
                  <AnimatedSection animation="fade-up" className="text-center mb-12">
                    <div className="inline-flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <GroupIcon className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-xs font-bold uppercase tracking-widest text-primary">
                        {group}
                      </span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-black">
                      {group === "Autonomous Defense Hub" && (
                        <>The <span className="text-primary">Enterprise</span> Stack</>
                      )}
                      {group === "Senior & Family" && (
                        <>Protection for <span className="text-primary">Individuals & Families</span></>
                      )}
                      {group === "Business & Insurance" && (
                        <>For <span className="text-primary">Ohio Businesses</span></>
                      )}
                    </h2>
                  </AnimatedSection>

                  <div className={`grid gap-6 max-w-6xl mx-auto ${features.length === 4 ? "md:grid-cols-2 lg:grid-cols-4" : features.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
                    {features.map((feature) => {
                      const Icon = feature.icon;
                      return (
                        <AnimatedSection key={feature.title} animation="fade-up">
                          <Link
                            to={feature.href}
                            className="group flex flex-col p-7 rounded-2xl border border-border bg-card hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 h-full no-underline"
                          >
                            <div className="flex items-start justify-between mb-5">
                              <div className="w-12 h-12 rounded-xl bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center transition-colors">
                                <Icon className="w-6 h-6 text-primary" />
                              </div>
                              <Badge className={`text-[10px] font-bold border ${feature.badgeColor}`}>
                                {feature.badge}
                              </Badge>
                            </div>
                            <h3 className="font-black text-lg mb-2 text-foreground group-hover:text-primary transition-colors">
                              {feature.title}
                            </h3>
                            <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-5">
                              {feature.tagline}
                            </p>
                            <div className="flex items-center justify-between pt-4 border-t border-border/50">
                              <span className="text-xs font-bold text-primary">{feature.price}</span>
                              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                            </div>
                          </Link>
                        </AnimatedSection>
                      );
                    })}
                  </div>
                </div>
              </section>
            );
          })}

          {/* HOW THE PLATFORM INTEGRATES */}
          <section className="py-20 md:py-28 bg-muted/30">
            <div className="container mx-auto px-4 max-w-5xl">
              <AnimatedSection animation="fade-up" className="text-center mb-14">
                <span className="inline-block px-4 py-1.5 bg-primary/10 rounded-full text-xs font-bold text-primary uppercase tracking-[0.15em] mb-4">
                  Platform Integration
                </span>
                <h2 className="text-3xl md:text-4xl font-black mb-4">
                  All 9 services work as <span className="text-primary">one system</span>
                </h2>
                <p className="text-base text-muted-foreground max-w-2xl mx-auto">
                  Every service feeds intelligence into a shared threat model. A honey-identity trap that
                  captures a new attack vector immediately updates the Agentic SOC playbooks and hardens
                  the Cognitive Sentinel thresholds for every client simultaneously.
                </p>
              </AnimatedSection>

              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    icon: Zap,
                    title: "Shared Threat Intelligence",
                    desc: "New attack vectors captured by any service — honey-traps, biometric challenges, insurance claims — are instantly propagated to harden all other client profiles.",
                  },
                  {
                    icon: Lock,
                    title: "Single Client Profile",
                    desc: "One dashboard shows every active service, alert history, insurance status, vault health, and certification status. Caregivers, business owners, and analysts all work from one pane.",
                  },
                  {
                    icon: Shield,
                    title: "Layered Defense Model",
                    desc: "No single layer is a single point of failure. If a deepfake gets past the Validator, the Agentic SOC catches the behavioral anomaly. If the SOC misses it, the insurance pays.",
                  },
                ].map((item) => (
                  <AnimatedSection key={item.title} animation="fade-up">
                    <div className="p-7 rounded-2xl border border-border bg-card text-center h-full hover:border-primary/30 transition-colors">
                      <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
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

          {/* FINAL CTA */}
          <section className="py-24 md:py-36 relative overflow-hidden bg-gradient-to-br from-[#050810] via-[#0a0f1e] to-[#0d1628]">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] pointer-events-none" />
            <div className="container mx-auto px-4 relative z-10 text-center">
              <AnimatedSection animation="fade-up">
                <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
                  Ohio's most complete{" "}
                  <span className="gradient-text-fire">
                    AI defense platform
                  </span>
                  .
                </h2>
                <p className="text-lg text-white/60 max-w-2xl mx-auto mb-12">
                  Protect your business. Protect your parents. Protect your legacy.
                  InVision 2026 is the platform that makes all three possible.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
                  <Button
                    size="lg"
                    className="h-16 px-14 text-lg font-black rounded-full bg-gradient-to-r from-primary to-accent text-white shadow-2xl hover:opacity-90 transition-opacity"
                    onClick={() => setDemoOpen(true)}
                  >
                    Request a Platform Demo <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="h-16 px-14 text-lg font-bold rounded-full border-white/20 text-white hover:bg-white/10"
                  >
                    <Link to="/training">Individual Plans</Link>
                  </Button>
                </div>
                <p className="text-white/30 text-xs">
                  Early-access pricing available Q2 2026. Secure your spot now.
                </p>
              </AnimatedSection>
            </div>
          </section>
        </main>
        <Footer />

        <ServiceInquiryDialog
          open={demoOpen}
          onOpenChange={setDemoOpen}
          serviceName="InVision 2026 — Platform Demo"
          servicePrice="Custom Quote"
          serviceTier="Full Platform"
          serviceDescription="Schedule a live demo of the full InVision 2026 platform, including Agentic SOC, Deepfake Validator, Cognitive Sentinel, Scam Insurance, and all 9 integrated services."
        />
      </div>
    </PageTransition>
  );
};

export default InVision2026;
