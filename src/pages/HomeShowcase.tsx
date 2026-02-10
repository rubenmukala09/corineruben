import { CSSProperties } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SEO } from "@/components/SEO";
import { useSectionNavigation } from "@/hooks/useSectionNavigation";
import {
  Activity,
  ArrowUpRight,
  BadgeCheck,
  Brain,
  CheckCircle,
  Clock,
  LineChart,
  MessageSquare,
  Shield,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

export type HomeVariant = "home-01" | "home-02" | "home-03" | "home-04";

const VARIANTS: Record<HomeVariant, {
  kicker: string;
  headline: string;
  highlight: string;
  subhead: string;
  accent: string;
  accent2: string;
  widgetTitle: string;
  widgetTag: string;
  ctaPrimary: string;
}> = {
  "home-01": {
    kicker: "InVision Network / Protection",
    headline: "Sharp AI Defense for",
    highlight: "Real People",
    subhead:
      "A professional, white-first interface that feels calm, precise, and trustworthy for seniors and families.",
    accent: "198 85% 45%",
    accent2: "32 90% 56%",
    widgetTitle: "Popularity Insights",
    widgetTag: "Live Signals",
    ctaPrimary: "Start Protection",
  },
  "home-02": {
    kicker: "InVision Network / Business",
    headline: "Operational Clarity for",
    highlight: "Every Team",
    subhead:
      "Professional widgets, sharper typography, and clean data surfaces that feel enterprise-ready.",
    accent: "210 85% 45%",
    accent2: "14 90% 60%",
    widgetTitle: "Trends Overview",
    widgetTag: "Weekly Pulse",
    ctaPrimary: "Book A Demo",
  },
  "home-03": {
    kicker: "InVision Network / Community",
    headline: "Trust That Feels",
    highlight: "Human",
    subhead:
      "Clear layouts, calmer motion, and a bright, reliable visual system tailored for older audiences.",
    accent: "186 80% 42%",
    accent2: "32 82% 56%",
    widgetTitle: "Risk Score",
    widgetTag: "92% Accuracy",
    ctaPrimary: "Get Protected",
  },
  "home-04": {
    kicker: "InVision Network / Insights",
    headline: "Designed To",
    highlight: "Stay Ahead",
    subhead:
      "A crisp, high-contrast layout with refined lighting and premium widget polish.",
    accent: "200 90% 42%",
    accent2: "28 92% 58%",
    widgetTitle: "AI Guardrails",
    widgetTag: "Active",
    ctaPrimary: "See Plans",
  },
};

const SECTION_LIST = [
  { id: "hero", label: "Overview" },
  { id: "signals", label: "Signals" },
  { id: "widgets", label: "Widgets" },
  { id: "score", label: "Score" },
  { id: "process", label: "Process" },
  { id: "testimonials", label: "Voices" },
  { id: "pricing", label: "Plans" },
  { id: "cta", label: "Start" },
];

const SectionHeading = ({
  kicker,
  title,
  description,
}: {
  kicker: string;
  title: string;
  description: string;
}) => (
  <div className="space-y-3">
    <div className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--innova-border))] bg-white/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[hsl(var(--innova-muted))]">
      <Sparkles className="h-3.5 w-3.5 text-[hsl(var(--innova-accent))]" />
      {kicker}
    </div>
    <h2 className="text-3xl font-semibold text-[hsl(var(--innova-ink))] md:text-4xl">
      {title}
    </h2>
    <p className="max-w-2xl text-base text-[hsl(var(--innova-muted))] md:text-lg">
      {description}
    </p>
  </div>
);

const Sparkline = () => (
  <svg viewBox="0 0 120 40" className="h-8 w-full">
    <defs>
      <linearGradient id="spark" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="hsl(var(--innova-accent))" />
        <stop offset="100%" stopColor="hsl(var(--innova-accent-2))" />
      </linearGradient>
    </defs>
    <polyline
      fill="none"
      stroke="url(#spark)"
      strokeWidth="3"
      points="0,30 20,24 40,26 60,14 80,18 100,8 120,12"
    />
  </svg>
);

const MiniBarChart = () => (
  <div className="flex items-end gap-1.5">
    {[40, 52, 48, 70, 62, 88, 74].map((height, index) => (
      <div
        key={index}
        className="w-2 rounded-full bg-[hsl(var(--innova-accent))]"
        style={{ height }}
      />
    ))}
  </div>
);

const ScoreRing = ({ label, score }: { label: string; score: number }) => (
  <div className="innova-card flex flex-col items-center gap-3 px-6 py-5 text-center">
    <div
      className="relative flex h-24 w-24 items-center justify-center rounded-full"
      style={{
        background: `conic-gradient(hsl(var(--innova-accent)) ${score * 3.6}deg, hsl(var(--innova-border)) 0deg)`,
      }}
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-lg font-semibold text-[hsl(var(--innova-ink))]">
        {score}%
      </div>
    </div>
    <div>
      <p className="text-sm font-semibold text-[hsl(var(--innova-ink))]">{label}</p>
      <p className="text-xs text-[hsl(var(--innova-muted))]">Measured weekly</p>
    </div>
  </div>
);

const WidgetCard = ({
  title,
  value,
  description,
  tag,
  children,
  className = "",
}: {
  title: string;
  value: string;
  description: string;
  tag: string;
  children?: React.ReactNode;
  className?: string;
}) => (
  <div className={`innova-card innova-shine p-4 transition-transform duration-200 hover:-translate-y-1 ${className}`}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[hsl(var(--innova-muted))]">
          {tag}
        </p>
        <p className="text-lg font-semibold text-[hsl(var(--innova-ink))]">{title}</p>
      </div>
      <Badge className="bg-[hsl(var(--innova-accent))]/10 text-[hsl(var(--innova-accent))]">
        {value}
      </Badge>
    </div>
    <p className="mt-2 text-sm text-[hsl(var(--innova-muted))]">{description}</p>
    <div className="mt-4">{children}</div>
  </div>
);

const InnovaScrollRail = () => {
  const { activeSection, scrollToSection } = useSectionNavigation(SECTION_LIST);

  return (
    <nav className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 xl:flex">
      <div className="relative flex flex-col gap-4 pr-2">
        <div className="absolute left-[9px] top-2 h-[calc(100%-16px)] w-px bg-[hsl(var(--innova-border))]" />
        {SECTION_LIST.map((section, index) => (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className="group flex items-center gap-3 text-left"
            aria-label={`Scroll to ${section.label}`}
            aria-current={activeSection === section.id ? "true" : undefined}
          >
            <div
              className={`flex h-5 w-5 items-center justify-center rounded-full border text-[10px] font-semibold transition ${
                activeSection === section.id
                  ? "border-[hsl(var(--innova-accent))] bg-[hsl(var(--innova-accent))] text-white"
                  : "border-[hsl(var(--innova-border))] text-[hsl(var(--innova-muted))]"
              }`}
            >
              {String(index + 1).padStart(2, "0")}
            </div>
            <span
              className={`text-xs font-semibold transition ${
                activeSection === section.id
                  ? "text-[hsl(var(--innova-ink))]"
                  : "text-[hsl(var(--innova-muted))] opacity-60 group-hover:opacity-100"
              }`}
            >
              {section.label}
            </span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export const HomeShowcase = ({ variant }: { variant: HomeVariant }) => {
  const config = VARIANTS[variant];
  const themeStyle: CSSProperties = {
    "--innova-accent": config.accent,
    "--innova-accent-2": config.accent2,
  } as CSSProperties;

  return (
    <div className="innova-theme min-h-screen" style={themeStyle}>
      <SEO
        title={`InVision Network | ${config.highlight}`}
        description={config.subhead}
        image="https://storage.googleapis.com/gpt-engineer-file-uploads/UpYpYr7MTVdr1jgHmL94ALNUlk93/social-images/social-1761862743436-shield_purpleb.png"
      />
      <Navigation />
      <InnovaScrollRail />

      <main>
        <section id="hero" className="relative overflow-hidden pb-20 pt-12">
          <div className="absolute inset-0 innova-grid opacity-40" />
          <div className="absolute -left-32 top-10 h-72 w-72 rounded-full bg-[hsl(var(--innova-accent))]/10 blur-3xl" />
          <div className="absolute right-0 top-40 h-80 w-80 rounded-full bg-[hsl(var(--innova-accent-2))]/10 blur-3xl" />
          <div className="container relative mx-auto grid gap-12 px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="space-y-6">
              <Badge className="w-fit rounded-full border border-[hsl(var(--innova-border))] bg-white/80 px-4 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-[hsl(var(--innova-muted))]">
                {config.kicker}
              </Badge>
              <h1 className="text-4xl font-semibold leading-tight text-[hsl(var(--innova-ink))] md:text-5xl">
                {config.headline}{" "}
                <span className="bg-gradient-to-r from-[hsl(var(--innova-accent))] to-[hsl(var(--innova-accent-2))] bg-clip-text text-transparent">
                  {config.highlight}
                </span>
              </h1>
              <p className="max-w-xl text-lg text-[hsl(var(--innova-muted))]">
                {config.subhead}
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Button className="h-11 rounded-full px-6 text-sm font-semibold text-white" style={{
                  background: "linear-gradient(135deg, hsl(var(--innova-accent)) 0%, hsl(var(--innova-accent-2)) 100%)",
                }}>
                  {config.ctaPrimary}
                </Button>
                <Button variant="outline" className="h-11 rounded-full border-[hsl(var(--innova-border))] px-6 text-sm font-semibold text-[hsl(var(--innova-ink))]" asChild>
                  <Link to="/training">Explore Training</Link>
                </Button>
              </div>
              <div className="grid gap-3 pt-6 sm:grid-cols-3">
                {[
                  { label: "Accuracy", value: "92%" },
                  { label: "Families Served", value: "100+" },
                  { label: "Avg Response", value: "<60s" },
                ].map((stat) => (
                  <div key={stat.label} className="innova-panel px-4 py-3">
                    <p className="text-xs uppercase tracking-[0.2em] text-[hsl(var(--innova-muted))]">
                      {stat.label}
                    </p>
                    <p className="text-lg font-semibold text-[hsl(var(--innova-ink))]">{stat.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative min-h-[420px]">
              <WidgetCard
                title={config.widgetTitle}
                value="92%"
                description="Signal strength based on verified reports and AI-assisted monitoring."
                tag={config.widgetTag}
                className="absolute right-0 top-0 w-[260px]"
              >
                <Sparkline />
              </WidgetCard>
              <WidgetCard
                title="Community Pulse"
                value="5.2k"
                description="Verified interactions reviewed by our Ohio-based response team."
                tag="Active"
                className="absolute left-0 top-28 w-[280px]"
              >
                <MiniBarChart />
              </WidgetCard>
              <WidgetCard
                title="Guided Protection"
                value="Live"
                description="Actionable steps delivered in clear, human language."
                tag="Advisor"
                className="absolute bottom-0 right-10 w-[240px]"
              >
                <div className="flex items-center gap-2 text-xs text-[hsl(var(--innova-muted))]">
                  <ShieldCheck className="h-4 w-4 text-[hsl(var(--innova-accent))]" />
                  Reviews complete in under 10 minutes.
                </div>
              </WidgetCard>
            </div>
          </div>
        </section>

        <section id="signals" className="container mx-auto space-y-10 px-6 py-16">
          <SectionHeading
            kicker="Signal Clarity"
            title="Widgets That Feel Professional, Not Loud"
            description="Crisp cards, sharp spacing, and clean hierarchy keep data readable for every age group."
          />
          <div className="grid gap-5 lg:grid-cols-3">
            {[
              {
                title: "Verified Threat Intake",
                description: "Scams are scored by urgency and confidence before any action is recommended.",
                icon: Shield,
              },
              {
                title: "Human-First Recommendations",
                description: "Plain-language guidance replaces jargon with clear next steps.",
                icon: MessageSquare,
              },
              {
                title: "Always-On Monitoring",
                description: "Background signals stay active without noisy visual clutter.",
                icon: Activity,
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="innova-card p-6">
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[hsl(var(--innova-accent))]/10">
                    <Icon className="h-5 w-5 text-[hsl(var(--innova-accent))]" />
                  </div>
                  <h3 className="text-lg font-semibold text-[hsl(var(--innova-ink))]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-[hsl(var(--innova-muted))]">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        <section id="widgets" className="relative overflow-hidden py-16">
          <div className="absolute inset-0 bg-[hsl(var(--innova-surface))]" />
          <div className="absolute right-10 top-10 h-56 w-56 rounded-full bg-[hsl(var(--innova-accent))]/10 blur-3xl" />
          <div className="container relative mx-auto grid gap-10 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div className="space-y-5">
              <SectionHeading
                kicker="Widget System"
                title="Stackable Modules For Every Scenario"
                description="Highlight AI insights, response workflows, and trust indicators without overwhelming the screen."
              />
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { label: "Guided Checklists", value: "Live", icon: CheckCircle },
                  { label: "Signal Maps", value: "Realtime", icon: LineChart },
                  { label: "Trusted Contacts", value: "Verified", icon: Users },
                  { label: "AI Summaries", value: "Instant", icon: Brain },
                ].map((widget) => {
                  const Icon = widget.icon;
                  return (
                    <div key={widget.label} className="innova-card flex items-center gap-3 p-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[hsl(var(--innova-accent))]/10">
                        <Icon className="h-5 w-5 text-[hsl(var(--innova-accent))]" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[hsl(var(--innova-ink))]">{widget.label}</p>
                        <p className="text-xs text-[hsl(var(--innova-muted))]">{widget.value}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="grid gap-4">
              <WidgetCard
                title="Sentiment Snapshot"
                value="Stable"
                description="Signal quality remains high across new reports and follow-ups."
                tag="Today"
              >
                <div className="flex items-center justify-between text-xs text-[hsl(var(--innova-muted))]">
                  <span>Confidence</span>
                  <span>88%</span>
                </div>
                <div className="mt-2 h-2 rounded-full bg-[hsl(var(--innova-border))]">
                  <div className="h-2 w-[88%] rounded-full bg-[hsl(var(--innova-accent))]" />
                </div>
              </WidgetCard>
              <WidgetCard
                title="Response Timing"
                value="<60s"
                description="Critical alerts routed to the right advisor within one minute."
                tag="Live"
              >
                <div className="flex items-center gap-2 text-xs text-[hsl(var(--innova-muted))]">
                  <Clock className="h-4 w-4 text-[hsl(var(--innova-accent))]" />
                  Average response rate in Ohio region.
                </div>
              </WidgetCard>
            </div>
          </div>
        </section>

        <section id="score" className="container mx-auto space-y-10 px-6 py-16">
          <SectionHeading
            kicker="Score System"
            title="Clear Confidence, Not Confusing Dashboards"
            description="A simple, professional scoring system that keeps elders and families aligned."
          />
          <div className="grid gap-6 md:grid-cols-3">
            <ScoreRing label="Protection Score" score={92} />
            <ScoreRing label="Response Readiness" score={88} />
            <ScoreRing label="Community Trust" score={95} />
          </div>
        </section>

        <section id="process" className="relative overflow-hidden py-16">
          <div className="absolute inset-0 bg-[hsl(var(--innova-surface))]" />
          <div className="container relative mx-auto grid gap-12 px-6 lg:grid-cols-[1.1fr_0.9fr]">
            <SectionHeading
              kicker="Process"
              title="A Calm, Four-Step Protection Flow"
              description="Every step stays visible on scroll, so users never feel lost."
            />
            <div className="grid gap-4">
              {[
                {
                  title: "Share the signal",
                  description: "Upload a message, call recording, or report.",
                },
                {
                  title: "AI + human validation",
                  description: "We verify the threat and classify urgency.",
                },
                {
                  title: "Guided response",
                  description: "We deliver a clear, senior-friendly action plan.",
                },
                {
                  title: "Long-term protection",
                  description: "Monitoring continues with alerts and education.",
                },
              ].map((step, index) => (
                <div key={step.title} className="innova-card flex gap-4 p-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[hsl(var(--innova-accent))]/10 text-sm font-semibold text-[hsl(var(--innova-accent))]">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <div>
                    <p className="text-base font-semibold text-[hsl(var(--innova-ink))]">{step.title}</p>
                    <p className="text-sm text-[hsl(var(--innova-muted))]">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="testimonials" className="container mx-auto space-y-10 px-6 py-16">
          <SectionHeading
            kicker="Testimonials"
            title="Professional, Human-Led Outcomes"
            description="Stories that read like a real service experience, not marketing slogans."
          />
          <div className="grid gap-5 lg:grid-cols-3">
            {[
              {
                name: "Ohio Family Member",
                quote: "The interface was calm and easy. We knew exactly what to do after the alert.",
              },
              {
                name: "Community Advocate",
                quote: "The scores and widgets feel like a real operations dashboard, not a gimmick.",
              },
              {
                name: "Caregiver Coordinator",
                quote: "Every step was clear. The process made our team feel confident and supported.",
              },
            ].map((item) => (
              <div key={item.name} className="innova-card flex flex-col gap-4 p-6">
                <p className="text-base text-[hsl(var(--innova-ink))]">“{item.quote}”</p>
                <div className="flex items-center gap-3 text-sm text-[hsl(var(--innova-muted))]">
                  <BadgeCheck className="h-4 w-4 text-[hsl(var(--innova-accent))]" />
                  {item.name}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="pricing" className="relative overflow-hidden py-16">
          <div className="absolute inset-0 bg-[hsl(var(--innova-surface))]" />
          <div className="container relative mx-auto space-y-10 px-6">
            <SectionHeading
              kicker="Plans"
              title="Clear, Trustworthy Pricing"
              description="Structured pricing with professional polish and obvious value tiers."
            />
            <div className="grid gap-5 lg:grid-cols-3">
              {[
                {
                  name: "Starter",
                  price: "$39",
                  description: "Ideal for individuals and seniors.",
                  perks: ["Monthly check-ins", "AI message scan", "Local support"],
                },
                {
                  name: "Family",
                  price: "$79",
                  description: "Protection for households and caregivers.",
                  perks: ["Family dashboards", "Live response alerts", "Training sessions"],
                },
                {
                  name: "Community",
                  price: "$149",
                  description: "For organizations and partner teams.",
                  perks: ["Team onboarding", "Custom playbooks", "Priority escalation"],
                },
              ].map((plan, index) => (
                <div key={plan.name} className="innova-card flex flex-col gap-4 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-lg font-semibold text-[hsl(var(--innova-ink))]">{plan.name}</p>
                      <p className="text-sm text-[hsl(var(--innova-muted))]">{plan.description}</p>
                    </div>
                    {index === 1 && (
                      <Badge className="bg-[hsl(var(--innova-accent))]/10 text-[hsl(var(--innova-accent))]">
                        Most Popular
                      </Badge>
                    )}
                  </div>
                  <div className="text-3xl font-semibold text-[hsl(var(--innova-ink))]">
                    {plan.price}
                    <span className="text-sm text-[hsl(var(--innova-muted))]"> / mo</span>
                  </div>
                  <div className="space-y-2 text-sm text-[hsl(var(--innova-muted))]">
                    {plan.perks.map((perk) => (
                      <div key={perk} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-[hsl(var(--innova-accent))]" />
                        {perk}
                      </div>
                    ))}
                  </div>
                  <Button
                    variant={index === 1 ? "default" : "outline"}
                    className={`mt-auto rounded-full ${
                      index === 1
                        ? "text-white"
                        : "border-[hsl(var(--innova-border))] text-[hsl(var(--innova-ink))]"
                    }`}
                    style={
                      index === 1
                        ? {
                            background:
                              "linear-gradient(135deg, hsl(var(--innova-accent)) 0%, hsl(var(--innova-accent-2)) 100%)",
                          }
                        : undefined
                    }
                  >
                    Select Plan
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="cta" className="container mx-auto px-6 pb-20 pt-10">
          <div className="innova-card flex flex-col gap-6 p-8 md:flex-row md:items-center md:justify-between">
            <div className="space-y-2">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[hsl(var(--innova-muted))]">
                Ready to begin
              </p>
              <h3 className="text-2xl font-semibold text-[hsl(var(--innova-ink))]">
                Bring professional-grade protection to families across Ohio.
              </h3>
              <p className="text-sm text-[hsl(var(--innova-muted))]">
                Clear guidance, verified insights, and friendly support in every step.
              </p>
            </div>
            <Button className="h-11 rounded-full px-6 text-sm font-semibold text-white" style={{
              background: "linear-gradient(135deg, hsl(var(--innova-accent)) 0%, hsl(var(--innova-accent-2)) 100%)",
            }}>
              Schedule A Consultation
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default HomeShowcase;
