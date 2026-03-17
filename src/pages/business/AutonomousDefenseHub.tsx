import { useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AnimatedSection } from "@/components/AnimatedSection";
import { BookingModal } from "@/components/BookingModal";
import { ServiceInquiryDialog } from "@/components/ServiceInquiryDialog";
import { SITE } from "@/config/site";
import {
  Shield,
  Bot,
  Fingerprint,
  Eye,
  Cpu,
  Lock,
  Zap,
  ArrowRight,
  CheckCircle2,
  Activity,
  Radio,
  Key,
  AlertTriangle,
  Network,
  Scan,
  Server,
  Layers,
  Globe,
} from "lucide-react";

/* ── Reusable section header ── */
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

/* ── Feature card used inside each service section ── */
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

/* ── Tier pricing card ── */
const TierCard = ({
  tier,
  price,
  period,
  description,
  features,
  highlight,
  cta,
  onClick,
}: {
  tier: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  highlight?: boolean;
  cta: string;
  onClick?: () => void;
}) => (
  <div
    className={`relative rounded-2xl border p-8 flex flex-col ${
      highlight
        ? "border-primary bg-primary text-white shadow-2xl shadow-primary/30 scale-[1.02]"
        : "border-border bg-card"
    }`}
  >
    {highlight && (
      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
        <Badge className="bg-accent text-white text-xs px-3 py-1 font-bold shadow">
          Most Popular
        </Badge>
      </div>
    )}
    <div className="mb-6">
      <p className={`text-xs font-bold uppercase tracking-widest mb-2 ${highlight ? "text-white/70" : "text-primary"}`}>
        {tier}
      </p>
      <div className="flex items-baseline gap-1 mb-2">
        <span className={`text-4xl font-black ${highlight ? "text-white" : "text-foreground"}`}>
          {price}
        </span>
        <span className={`text-sm ${highlight ? "text-white/70" : "text-muted-foreground"}`}>
          /{period}
        </span>
      </div>
      <p className={`text-sm ${highlight ? "text-white/80" : "text-muted-foreground"}`}>
        {description}
      </p>
    </div>

    <ul className="space-y-3 flex-1 mb-8">
      {features.map((f) => (
        <li key={f} className="flex items-start gap-2 text-sm">
          <CheckCircle2
            className={`w-4 h-4 mt-0.5 flex-shrink-0 ${highlight ? "text-white/80" : "text-primary"}`}
          />
          <span className={highlight ? "text-white/90" : "text-foreground"}>{f}</span>
        </li>
      ))}
    </ul>

    <Button
      onClick={onClick}
      className={`w-full h-12 font-bold rounded-xl ${
        highlight
          ? "bg-white text-primary hover:bg-white/90"
          : "bg-primary text-white hover:bg-primary/90"
      }`}
    >
      {cta}
    </Button>
  </div>
);

/* ═══════════════════════════════════════════════════════════════════════ */

const AutonomousDefenseHub = () => {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingTier, setBookingTier] = useState({ name: "Autonomous Defense Hub — Sentinel", price: 297, tier: "Sentinel" });
  const [inquiryOpen, setInquiryOpen] = useState(false);

  const openBooking = (name: string, price: number, tier: string) => {
    setBookingTier({ name, price, tier });
    setBookingOpen(true);
  };

  return (
    <PageTransition variant="fade">
      <div className="min-h-screen">
        <SEO
          title="Autonomous Defense Hub — InVision Network 2026"
          description="The future of cybersecurity for Ohio businesses: Agentic SOC, Deepfake Validator, Honey-Identities, and Hardware-Bound Identity. Built by InVision Network."
          keywords="agentic SOC, deepfake detection, honey tokens, hardware security key, AI cybersecurity Ohio"
        />
        <Navigation />

        <main>
          {/* ── HERO ── */}
          <section className="relative overflow-hidden py-24 md:py-32 bg-gradient-to-br from-[#0a0f1e] via-[#111827] to-[#0a1628]">
            {/* animated grid lines */}
            <div
              className="absolute inset-0 opacity-[0.06] hero-grid-overlay"
            />
            {/* glow blobs */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/15 rounded-full blur-[80px] pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10 text-center">
              <AnimatedSection animation="fade-up">
                <Badge className="mb-6 bg-primary/20 text-primary border border-primary/30 text-xs font-bold uppercase tracking-widest px-4 py-1.5">
                  InVision Network — 2026 Roadmap
                </Badge>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight">
                  Autonomous{" "}
                  <span className="gradient-text-fire">
                    Defense Hub
                  </span>
                </h1>
                <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto mb-10 leading-relaxed">
                  A next-generation cybersecurity platform that doesn't just protect — it thinks,
                  traps, and responds autonomously. Built for Ohio businesses ready to operate in
                  2026 and beyond.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    className="h-14 px-10 font-bold rounded-full bg-gradient-to-r from-primary to-accent text-white shadow-xl hover:opacity-90 transition-opacity"
                    onClick={() => openBooking("Autonomous Defense Hub — Sentinel", 297, "Sentinel")}
                  >
                    Request Early Access <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="h-14 px-10 font-bold rounded-full border-white/20 text-white hover:bg-white/10"
                  >
                    <Link to="/business">View All Services</Link>
                  </Button>
                </div>
              </AnimatedSection>

              {/* stat strip */}
              <AnimatedSection animation="fade-up" className="mt-16">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
                  {[
                    { label: "Threat Response", value: "< 90s" },
                    { label: "Deepfake Accuracy", value: "99.1%" },
                    { label: "Honey-Traps Active", value: "24/7" },
                    { label: "Hardware-Bound Actions", value: "Zero-Trust" },
                  ].map((s) => (
                    <div
                      key={s.label}
                      className="p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm text-center"
                    >
                      <p className="text-2xl font-black text-white mb-1">{s.value}</p>
                      <p className="text-xs text-white/70 uppercase tracking-wider">{s.label}</p>
                    </div>
                  ))}
                </div>
              </AnimatedSection>
            </div>
          </section>

          {/* ──────────────────────────────────────────────────────────────────── */}
          {/* FEATURE 1 — AGENTIC SOC */}
          {/* ──────────────────────────────────────────────────────────────────── */}
          <section className="py-20 md:py-28 bg-background">
            <div className="container mx-auto px-4">
              <SectionHeader
                badge="Feature 01 · Agentic SOC"
                title={
                  <>
                    Your 24/7{" "}
                    <span className="text-primary">AI Security Operations Center</span>
                  </>
                }
                subtitle="Instead of dashboards that just alert you, our Agentic SOC deploys AI 'analysts' that triage threats, interview suspects, and contain breaches — all before you wake up."
              />

              <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
                {/* visual panel */}
                <AnimatedSection animation="fade-right">
                  <div className="relative rounded-2xl overflow-hidden border border-border bg-[#0d1117] p-6 shadow-2xl">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-3 h-3 rounded-full bg-red-500" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500" />
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                      <span className="ml-2 text-xs text-white/60 font-mono">
                        invision-soc — live agent terminal
                      </span>
                    </div>
                    <div className="font-mono text-xs space-y-2 text-left">
                      <p className="text-green-400">
                        [02:14:37] ALERT: Login from Lagos, NG — unrecognized device
                      </p>
                      <p className="text-yellow-400">
                        [02:14:38] AGENT: Initiating secondary auth challenge via Signal
                      </p>
                      <p className="text-blue-400">
                        [02:14:41] AGENT: Biometric proof requested → Employee "J. Morton"
                      </p>
                      <p className="text-red-400">
                        [02:14:55] AGENT: Biometric FAILED — isolating device access
                      </p>
                      <p className="text-orange-400">
                        [02:14:56] AGENT: Quarantining /payroll /HR /blueprints
                      </p>
                      <p className="text-white/80">
                        [02:14:57] NOTIFY: Owner alerted via encrypted push
                      </p>
                      <p className="text-green-400">
                        [02:15:01] STATUS: Threat contained. No data accessed.
                      </p>
                      <p className="text-white/30 animate-pulse">█</p>
                    </div>
                  </div>
                </AnimatedSection>

                {/* features */}
                <AnimatedSection animation="fade-left" className="space-y-4">
                  <FeatureCard
                    icon={Bot}
                    title="Autonomous AI Triage Agents"
                    description="Agents act like junior analysts: they investigate alerts, cross-check threat intel, and make containment decisions in real time — 24/7 without fatigue."
                  />
                  <FeatureCard
                    icon={Fingerprint}
                    title="Live Biometric Proof of Human"
                    description="Before any high-risk action is approved, our agent challenges the user on a secondary secure channel. A deepfake can't provide a live biometric."
                  />
                  <FeatureCard
                    icon={Layers}
                    title="Digital Twin Monitoring"
                    description="We simulate your entire network environment. Every anomaly is tested against the digital twin before your production systems are ever affected."
                  />
                  <FeatureCard
                    icon={Activity}
                    title="Auto-Containment Playbooks"
                    description="Pre-built response playbooks isolate compromised devices, revoke credentials, and preserve evidence — all while you sleep."
                  />
                </AnimatedSection>
              </div>
            </div>
          </section>

          {/* ──────────────────────────────────────────────────────────────────── */}
          {/* FEATURE 2 — INVISION VALIDATOR / TRUST PORTAL */}
          {/* ──────────────────────────────────────────────────────────────────── */}
          <section className="py-20 md:py-28 bg-muted/30">
            <div className="container mx-auto px-4">
              <SectionHeader
                badge="Feature 02 · InVision Validator"
                title={
                  <>
                    Cryptographic{" "}
                    <span className="text-primary">Deepfake Detection</span>
                  </>
                }
                subtitle="Seeing is no longer believing. Our Trust Portal cryptographically signs executive identities so your team can verify any video call or voice request in seconds."
              />

              <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
                {/* features */}
                <AnimatedSection animation="fade-right" className="space-y-4">
                  <FeatureCard
                    icon={Scan}
                    title="Real-Time Stream Analysis"
                    description="Run any live video call through the InVision Validator. Our AI checks for synthetic skin artifacts, voice frequency anomalies, and frame inconsistencies in under 2 seconds."
                  />
                  <FeatureCard
                    icon={Lock}
                    title="Cryptographic Handshake"
                    description="Every enrolled executive has a cryptographic identity signature. Calls that can't present the correct handshake are flagged as 99%+ probable deepfake — instantly."
                  />
                  <FeatureCard
                    icon={Shield}
                    title="Zero-Knowledge Proof Identity"
                    description="Executives prove who they are without ever transmitting the credential itself. Your company's identity data never leaves your network."
                  />
                  <FeatureCard
                    icon={AlertTriangle}
                    title="Wire-Transfer Intercept"
                    description="Any financial request made via unverified video is auto-flagged and sent to a secondary approver. Defense contractors and finance teams trust this as a last line."
                  />
                </AnimatedSection>

                {/* visual panel */}
                <AnimatedSection animation="fade-left">
                  <div className="relative rounded-2xl border border-border bg-card p-6 shadow-xl">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                          <Scan className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-bold text-sm">InVision Validator</p>
                          <p className="text-xs text-muted-foreground">Live stream analysis</p>
                        </div>
                      </div>
                      <Badge className="bg-green-500/10 text-green-600 border-green-500/20 text-xs">
                        VERIFIED
                      </Badge>
                    </div>

                    <div className="space-y-3">
                      {[
                        { label: "Facial consistency", value: 98, color: "bg-green-500" },
                        { label: "Voice frequency match", value: 97, color: "bg-green-500" },
                        { label: "Cryptographic handshake", value: 100, color: "bg-primary" },
                        { label: "Synthetic artifact score", value: 2, color: "bg-green-500", invert: true },
                      ].map((item) => (
                        <div key={item.label}>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-muted-foreground">{item.label}</span>
                            <span className="font-bold">
                              {item.invert ? `${item.value}% risk` : `${item.value}%`}
                            </span>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${item.color}`}
                              style={{ width: `${item.invert ? item.value : item.value}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 p-3 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <p className="text-xs text-green-700 dark:text-green-400 font-medium">
                        Identity verified. Cryptographic handshake confirmed. Proceeding.
                      </p>
                    </div>
                  </div>
                </AnimatedSection>
              </div>
            </div>
          </section>

          {/* ──────────────────────────────────────────────────────────────────── */}
          {/* FEATURE 3 — HONEY-IDENTITIES */}
          {/* ──────────────────────────────────────────────────────────────────── */}
          <section className="py-20 md:py-28 bg-background">
            <div className="container mx-auto px-4">
              <SectionHeader
                badge="Feature 03 · Honey-Identity Network"
                title={
                  <>
                    Proactive{" "}
                    <span className="text-primary">Threat Trapping</span>
                  </>
                }
                subtitle="Instead of waiting to be attacked, we bait the attackers. Decentralized honey-identities lure AI-driven scrapers and social engineering bots — then immunize your real clients before the real attack lands."
              />

              <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
                {/* visual */}
                <AnimatedSection animation="fade-right">
                  <div className="relative rounded-2xl border border-border bg-[#0d1117] p-6 shadow-2xl overflow-hidden">
                    {/* glowing pulse in bg */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-red-500/10 rounded-full blur-2xl" />

                    <div className="relative z-10">
                      <div className="flex items-center gap-2 mb-5">
                        <Radio className="w-4 h-4 text-red-400 animate-pulse" />
                        <span className="text-xs font-mono text-red-400">
                          honey-net — active monitoring
                        </span>
                      </div>
                      <div className="space-y-3 font-mono text-xs">
                        {[
                          {
                            time: "09:44:02",
                            msg: "Bot interaction: scraped 'Exec. J. Hart' on LinkedIn",
                            color: "text-yellow-400",
                          },
                          {
                            time: "09:44:05",
                            msg: "Attacker fingerprint captured: prompt injection vector",
                            color: "text-orange-400",
                          },
                          {
                            time: "09:44:07",
                            msg: "Source IP: 185.220.xxx.xxx — TOR exit node",
                            color: "text-red-400",
                          },
                          {
                            time: "09:44:09",
                            msg: "Attack vector: vishing script targeting CFO role",
                            color: "text-red-400",
                          },
                          {
                            time: "09:44:11",
                            msg: "Immunizing real client profile: blocking vector",
                            color: "text-blue-400",
                          },
                          {
                            time: "09:44:13",
                            msg: "Alert sent to client 30min BEFORE attack window",
                            color: "text-green-400",
                          },
                        ].map((row) => (
                          <div key={row.time} className="flex gap-3">
                            <span className="text-white/30 flex-shrink-0">[{row.time}]</span>
                            <span className={row.color}>{row.msg}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </AnimatedSection>

                {/* features */}
                <AnimatedSection animation="fade-left" className="space-y-4">
                  <FeatureCard
                    icon={Network}
                    title="Dark-Web Executive Decoys"
                    description="We deploy fake, enticing 'Executive Identities' across dark web forums and scraped directories — all wired to our monitoring system. Attackers can't resist them."
                  />
                  <FeatureCard
                    icon={Eye}
                    title="Bot Prompt-Pattern Capture"
                    description="When an AI bot interacts with a honey-identity, we extract its prompt templates, attack vectors, and social-engineering playbooks."
                  />
                  <FeatureCard
                    icon={Cpu}
                    title="Real-Client Immunization"
                    description="Captured threat intelligence is used to pre-harden your actual client profiles before the attacker even pivots to a real target."
                  />
                  <FeatureCard
                    icon={Globe}
                    title="Decentralized Token Network"
                    description="Honey-tokens are distributed across 40+ platforms — LinkedIn, Reddit, paste sites, dark-web markets — maximizing trap coverage at no risk to your real data."
                  />
                </AnimatedSection>
              </div>
            </div>
          </section>

          {/* ──────────────────────────────────────────────────────────────────── */}
          {/* FEATURE 4 — SAFE-ZONE HARDWARE KEY */}
          {/* ──────────────────────────────────────────────────────────────────── */}
          <section className="py-20 md:py-28 bg-muted/30">
            <div className="container mx-auto px-4">
              <SectionHeader
                badge="Feature 04 · Safe-Zone Key"
                title={
                  <>
                    Hardware-Bound{" "}
                    <span className="text-primary">Proof of Human</span>
                  </>
                }
                subtitle="AI cannot touch a physical USB-C key. Every high-risk action — payroll changes, wire transfers, access to defense blueprints — requires a physical touch to authorize. It moves security into the real world."
              />

              <div className="max-w-5xl mx-auto">
                <div className="grid md:grid-cols-3 gap-6 mb-14">
                  {[
                    {
                      icon: Key,
                      title: "Custom-Branded USB-C Key",
                      description:
                        "InVision-branded FIDO2 hardware key shipped to your team. Compatible with Windows, Mac, iOS, and Android. No drivers required.",
                    },
                    {
                      icon: Zap,
                      title: "Physical Touch Authorization",
                      description:
                        "Any AI-suggested or high-risk transaction requires a physical button press. An AI-generated deepfake CEO call cannot press a button on a desk in Dayton.",
                    },
                    {
                      icon: Server,
                      title: "Offline-Capable Zero-Trust",
                      description:
                        "The key works even when internet is down. Cryptographic proof is verified locally — no dependency on cloud uptime during critical operations.",
                    },
                  ].map((item) => (
                    <AnimatedSection key={item.title} animation="fade-up">
                      <div className="p-7 rounded-2xl border border-border bg-card hover:border-primary/30 hover:shadow-lg transition-all duration-200 text-center h-full">
                        <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
                          <item.icon className="w-7 h-7 text-primary" />
                        </div>
                        <h3 className="font-bold text-base mb-2">{item.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </AnimatedSection>
                  ))}
                </div>

                {/* "Approved Actions" list */}
                <AnimatedSection animation="fade-up">
                  <div className="rounded-2xl border border-border bg-card p-8">
                    <h3 className="font-bold text-lg mb-6 text-center">
                      Actions that require a physical key touch
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {[
                        "Payroll changes or ACH transfers",
                        "Access to classified project files",
                        "New admin account creation",
                        "Wire transfer approvals",
                        "Bulk email sends to client lists",
                        "Vendor payment modifications",
                        "Executive identity changes",
                        "Remote device wipe commands",
                      ].map((action) => (
                        <div key={action} className="flex items-center gap-3 text-sm">
                          <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <Lock className="w-3 h-3 text-primary" />
                          </div>
                          <span className="text-muted-foreground">{action}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </AnimatedSection>
              </div>
            </div>
          </section>

          {/* ──────────────────────────────────────────────────────────────────── */}
          {/* SUMMARY TABLE */}
          {/* ──────────────────────────────────────────────────────────────────── */}
          <section className="py-20 md:py-24 bg-background">
            <div className="container mx-auto px-4">
              <SectionHeader
                badge="InVision 2026 Roadmap"
                title="Your Complete Defense Stack"
                subtitle="Four systems working together as one autonomous platform."
              />
              <AnimatedSection animation="fade-up" className="max-w-4xl mx-auto">
                <div className="overflow-x-auto rounded-2xl border border-border shadow-sm">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border bg-muted/50">
                        <th className="text-left px-6 py-4 font-bold text-foreground">Feature</th>
                        <th className="text-left px-6 py-4 font-bold text-foreground">Technology</th>
                        <th className="text-left px-6 py-4 font-bold text-foreground">Your Role</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        {
                          feature: "Agentic SOC",
                          tech: "Agentic AI & Automated Playbooks",
                          role: "Architect of autonomous defense",
                        },
                        {
                          feature: "InVision Validator",
                          tech: "Blockchain & Zero-Knowledge Proofs",
                          role: "Verifier of corporate identity",
                        },
                        {
                          feature: "Honey-Identity Network",
                          tech: "Decentralized ID & Threat Intel",
                          role: "Proactive 'Trapper' of AI threats",
                        },
                        {
                          feature: "Safe-Zone Key",
                          tech: "FIDO2 Hardware + Physical Auth",
                          role: "Human-in-the-loop guarantor",
                        },
                      ].map((row, i) => (
                        <tr
                          key={row.feature}
                          className={`border-b border-border/50 last:border-0 ${
                            i % 2 === 0 ? "bg-background" : "bg-muted/20"
                          }`}
                        >
                          <td className="px-6 py-4 font-semibold text-primary">{row.feature}</td>
                          <td className="px-6 py-4 text-muted-foreground">{row.tech}</td>
                          <td className="px-6 py-4 text-foreground">{row.role}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </AnimatedSection>
            </div>
          </section>

          {/* ──────────────────────────────────────────────────────────────────── */}
          {/* PRICING TIERS */}
          {/* ──────────────────────────────────────────────────────────────────── */}
          <section className="py-20 md:py-28 bg-muted/30">
            <div className="container mx-auto px-4">
              <SectionHeader
                badge="Pricing"
                title={
                  <>
                    Enterprise-Class Security.{" "}
                    <span className="text-primary">Ohio-Market Pricing.</span>
                  </>
                }
                subtitle="Early-access pricing for Ohio businesses. Lock in your rate before public launch."
              />

              <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto items-stretch">
                <TierCard
                  tier="Sentinel"
                  price="$297"
                  period="mo"
                  description="Core protection for small businesses and professional offices."
                  features={[
                    "Agentic SOC (5 alerts/mo)",
                    "InVision Validator — 10 verifications/mo",
                    "5 Safe-Zone Keys included",
                    "Email threat reports",
                    "Business-hours support",
                  ]}
                  cta="Get Started — $297/mo"
                  onClick={() => openBooking("Autonomous Defense Hub — Sentinel", 297, "Sentinel")}
                />
                <TierCard
                  tier="Guardian"
                  price="$697"
                  period="mo"
                  description="Full autonomous defense for mid-market and defense contractors."
                  features={[
                    "Agentic SOC — unlimited alerts",
                    "InVision Validator — unlimited",
                    "Honey-Identity Network (50 decoys)",
                    "15 Safe-Zone Keys",
                    "Digital Twin monitoring",
                    "24/7 priority support",
                  ]}
                  highlight
                  cta="Request Early Access — $697/mo"
                  onClick={() => openBooking("Autonomous Defense Hub — Guardian", 697, "Guardian")}
                />
                <TierCard
                  tier="Fortress"
                  price="Custom"
                  period="quote"
                  description="White-glove deployment for government contractors and enterprises."
                  features={[
                    "Everything in Guardian",
                    "Unlimited Honey-Identity decoys",
                    "On-site Safe-Zone key provisioning",
                    "CMMC / NIST 800-171 alignment",
                    "Dedicated InVision analyst",
                    "SLA-backed response times",
                  ]}
                  cta="Talk to an Expert"
                  onClick={() => setInquiryOpen(true)}
                />
              </div>
            </div>
          </section>

          {/* ──────────────────────────────────────────────────────────────────── */}
          {/* CTA */}
          {/* ──────────────────────────────────────────────────────────────────── */}
          <section className="py-20 md:py-28 relative overflow-hidden bg-gradient-to-br from-[#0a0f1e] via-[#111827] to-[#0a1628]">
            <div className="absolute top-0 left-1/3 w-80 h-80 bg-primary/20 rounded-full blur-[100px] pointer-events-none" />
            <div className="container mx-auto px-4 relative z-10 text-center">
              <AnimatedSection animation="fade-up">
                <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">
                  Ready to become{" "}
                  <span className="gradient-text-fire">
                    un-hackable?
                  </span>
                </h2>
                <p className="text-lg text-white/70 max-w-2xl mx-auto mb-10">
                  Join Ohio's first businesses on the Autonomous Defense Hub early-access program.
                  Limited spots available before public launch.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    className="h-14 px-10 font-bold rounded-full bg-gradient-to-r from-primary to-accent text-white shadow-xl hover:opacity-90 transition-opacity"
                    onClick={() => openBooking("Autonomous Defense Hub — Sentinel", 297, "Sentinel")}
                  >
                    Reserve My Spot <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="h-14 px-10 font-bold rounded-full border-white/20 text-white hover:bg-white/10"
                  >
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
          serviceType="business"
          serviceName={bookingTier.name}
          serviceTier={bookingTier.tier}
          basePrice={bookingTier.price}
          veteranDiscountPercent={SITE.veteranDiscountPercent}
        />

        <ServiceInquiryDialog
          open={inquiryOpen}
          onOpenChange={setInquiryOpen}
          serviceName="Autonomous Defense Hub — Fortress"
          servicePrice={0}
          serviceTier="Enterprise"
          serviceDescription="White-glove deployment for government contractors and enterprises. Includes unlimited Honey-Identities, on-site Safe-Zone key provisioning, and CMMC/NIST 800-171 alignment."
        />
      </div>
    </PageTransition>
  );
};

export default AutonomousDefenseHub;
