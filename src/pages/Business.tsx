import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import TestimonialCard from "@/components/TestimonialCard";
import CTASection from "@/components/CTASection";
import { PageTransition } from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { BookingModal } from "@/components/BookingModal";
import { ServiceInquiryDialog } from "@/components/ServiceInquiryDialog";
import { WebsiteInsuranceDialog } from "@/components/WebsiteInsuranceDialog";
import { EmbeddedPaymentModal } from "@/components/payment/EmbeddedPaymentModal";
import { AnimatedSection } from "@/components/AnimatedSection";

import { useAdminStatus } from "@/hooks/useAdminStatus";
import { trackButtonClick, trackConversion } from "@/utils/analyticsTracker";
import {
  Phone,
  Mail,
  MessageSquare,
  Calendar,
  CheckCircle,
  Search,
  Shield,
  Lock,
  Sparkles,
  FileText,
  Palette,
  Pen,
  Shapes,
  Image,
  BarChart3,
  Grid3X3,
  ArrowRight,
  Bot,
  Scan,
  Radio,
  Key,
  Brain,
  Bell,
  Archive,
  Award,
  DollarSign,
  Zap,
  ChevronRight,
  Globe,
  Cpu,
} from "lucide-react";
import { ExpandableServiceCard } from "@/components/ExpandableServiceCard";
import { Badge } from "@/components/ui/badge";
import businessReceptionist from "@/assets/business-ai-receptionist.jpg";
import businessScheduling from "@/assets/business-smart-scheduling.jpg";
import businessSupportBot from "@/assets/business-support-bot.jpg";
import businessIntake from "@/assets/business-intake-scheduling.jpg";
import { natureSummer2 } from "@/config/natureHeroImages";
import { NatureAccent } from "@/components/ui/NatureAccent";
import { PROFESSIONAL_HERO_IMAGES } from "@/config/professionalHeroImages";
import { VideoLightbox } from "@/components/VideoLightbox";
import { SEO } from "@/components/SEO";
import { RotatingHeadlines } from "@/components/shared/RotatingHeadlines";
import HeroFloatingStats from "@/components/business/HeroFloatingStats";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const businessHeadlines = [
  "Your AI Front Desk, Running 24/7",
  "Websites That Turn Visitors Into Customers",
  "AI Automation Built for Ohio Businesses",
  "Stop Missing Calls. Start Closing Deals.",
];

const platformSnapshotStats = [
  { value: "9", label: "Integrated Services", icon: Cpu },
  { value: "< 90s", label: "Avg. Threat Response", icon: Zap },
  { value: "$500K", label: "Max Scam Coverage", icon: Shield },
  { value: "24/7", label: "Autonomous Monitoring", icon: Globe },
];

const platformGroups = [
  {
    key: "enterprise",
    title: "Enterprise Cybersecurity",
    subtitle: "Autonomous prevention and response for organizations handling sensitive data.",
    minPrice: "From $297/mo",
    icon: Shield,
    gradient: "from-primary via-primary/80 to-accent",
    accentStrip: "bg-primary",
    features: [
      {
        badge: "Enterprise",
        icon: Bot,
        title: "Agentic SOC",
        tagline: "AI analysts that triage and contain threats autonomously, 24/7.",
        price: "From $297/mo",
        href: "/business/autonomous-defense-hub",
      },
      {
        badge: "Enterprise",
        icon: Scan,
        title: "InVision Validator",
        tagline: "Cryptographic deepfake detection for video calls and voice transfer requests.",
        price: "From $297/mo",
        href: "/business/autonomous-defense-hub",
      },
      {
        badge: "Enterprise",
        icon: Radio,
        title: "Honey-Identity Network",
        tagline: "Deploy decoy identities to trap AI scrapers across 40+ platforms.",
        price: "From $697/mo",
        href: "/business/autonomous-defense-hub",
      },
      {
        badge: "Enterprise",
        icon: Key,
        title: "Safe-Zone Hardware Key",
        tagline: "Physical USB-C touch for high-risk actions. AI cannot press it remotely.",
        price: "Included in plan",
        href: "/business/autonomous-defense-hub",
      },
    ],
  },
  {
    key: "family",
    title: "Senior & Family Protection",
    subtitle: "Real-time protection workflows designed for individuals, families, and caregivers.",
    minPrice: "From $19/mo",
    icon: Brain,
    gradient: "from-emerald-500 via-emerald-400 to-teal-400",
    accentStrip: "bg-emerald-500",
    features: [
      {
        badge: "Senior",
        icon: Brain,
        title: "Cognitive Sentinel",
        tagline: "Detects behavioral stress signals and alerts caregivers during active scams.",
        price: "$49/mo add-on",
        href: "/services/cognitive-sentinel",
      },
      {
        badge: "Senior",
        icon: Bell,
        title: "Family Emergency Network",
        tagline: "One PANIC action calls family, alerts analysts, and notifies police in seconds.",
        price: "$19/mo add-on",
        href: "/services/family-emergency-network",
      },
      {
        badge: "Senior",
        icon: Archive,
        title: "Digital Estate Executor",
        tagline: "Locks down accounts and securely transfers credentials to heirs when needed.",
        price: "$299 + $9/mo",
        href: "/services/digital-estate",
      },
    ],
  },
  {
    key: "risk",
    title: "Business Risk & Insurance",
    subtitle: "Coverage and trust signals that reduce legal and financial exposure.",
    minPrice: "From $49/mo",
    icon: Award,
    gradient: "from-amber-500 via-amber-400 to-orange-400",
    accentStrip: "bg-amber-500",
    features: [
      {
        badge: "Business",
        icon: DollarSign,
        title: "Scam Insurance",
        tagline: "If fraud succeeds despite our controls, coverage pays up to $500K.",
        price: "From $49/mo",
        href: "/services/scam-insurance",
      },
      {
        badge: "Business",
        icon: Award,
        title: "AI-Safe Certification",
        tagline: "Annual audit and verified trust seal for Ohio businesses handling AI risk.",
        price: "$2,400/yr",
        href: "/services/ai-safe-certification",
      },
    ],
  },
];

const platformPillars = [
  {
    icon: Zap,
    title: "Shared Threat Intelligence",
    desc: "Signals captured in any service immediately harden detections across the full platform.",
  },
  {
    icon: Lock,
    title: "Single Client Profile",
    desc: "One profile for alerts, coverage, vault status, and certifications across all active services.",
  },
  {
    icon: Shield,
    title: "Layered Defense Model",
    desc: "If one layer misses an event, downstream controls and insurance coverage still protect outcomes.",
  },
];

/* ─── Section Header ─── */
const SectionHeader = ({
  badge,
  title,
  subtitle,
  children,
  light = false,
}: {
  badge: string;
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  light?: boolean;
}) => (
  <AnimatedSection animation="fade-up" className="text-center mb-16">
    <span className="inline-flex items-center gap-2 px-5 py-2 glass-subtle rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-6 shadow-sm border border-primary/15">
      <Sparkles className="w-3.5 h-3.5 text-primary" />
      <span className={light ? "text-white/90" : "text-primary"}>{badge}</span>
    </span>
    <h2 className={`text-3xl md:text-4xl lg:text-5xl font-black mb-5 tracking-tight leading-[1.1] ${light ? "text-white" : ""}`}>
      {title}
    </h2>
    {subtitle && (
      <p className={`text-base md:text-lg max-w-3xl mx-auto leading-relaxed ${light ? "text-white/75" : "text-muted-foreground"}`}>
        {subtitle}
      </p>
    )}
    {children}
  </AnimatedSection>
);

/* ─── Pricing Card ─── */
const PricingCard = ({
  tag,
  tagColor = "from-primary to-accent",
  title,
  price,
  priceSuffix,
  priceNote,
  features,
  buttonText,
  onButtonClick,
  featured = false,
  badges,
  delay = 0,
}: {
  tag: string;
  tagColor?: string;
  title: string;
  price: string;
  priceSuffix?: string;
  priceNote?: string;
  features: string[];
  buttonText: string;
  onButtonClick: () => void;
  featured?: boolean;
  badges?: { text: string; color: string }[];
  delay?: number;
}) => (
  <AnimatedSection animation="scale-up" delay={delay}>
    <div className="relative h-full pt-5 group" style={{ perspective: "900px" }}>
      <div
        className={`absolute -top-1 left-1/2 -translate-x-1/2 bg-gradient-to-r ${tagColor} text-white px-5 py-1.5 rounded-full text-[10px] font-black tracking-wider shadow-lg z-20 whitespace-nowrap border border-white/25`}
      >
        {tag}
      </div>
      <div
        className={`relative rounded-2xl border backdrop-blur-xl overflow-hidden h-full flex flex-col transition-all duration-500 hover:-translate-y-3 ${
          featured
            ? "border-primary/40 shadow-[0_8px_40px_-12px_hsl(var(--primary)/0.25)] bg-card"
            : "border-border/50 bg-card/90 hover:border-primary/25 hover:shadow-[0_12px_40px_-12px_hsl(var(--primary)/0.15)]"
        }`}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Top gradient line */}
        <div className={`h-1 w-full bg-gradient-to-r ${tagColor}`} />
        
        {/* Featured glow */}
        {featured && (
          <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.04] via-transparent to-accent/[0.02] pointer-events-none" />
        )}

        <div className="p-6 pt-8 text-center flex-1 flex flex-col relative z-10">
          <h3 className="text-xl font-bold mb-3">{title}</h3>
          <div className="relative mb-2">
            <p className="text-4xl font-black bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {price}
              {priceSuffix && (
                <span className="text-sm text-muted-foreground font-normal bg-none text-muted-foreground" style={{ WebkitTextFillColor: 'initial' }}>
                  {priceSuffix}
                </span>
              )}
            </p>
          </div>
          {priceNote && (
            <p className="text-sm text-muted-foreground mb-4">{priceNote}</p>
          )}
          {badges && (
            <div className="flex flex-wrap gap-2 justify-center mb-4">
              {badges.map((b, i) => (
                <span
                  key={i}
                  className={`inline-flex items-center gap-1 px-2.5 py-0.5 ${b.color} text-xs font-medium rounded-full backdrop-blur-sm border border-primary/10`}
                >
                  {b.text}
                </span>
              ))}
            </div>
          )}
          <ul className="space-y-3 mb-6 text-sm text-left flex-1">
            {features.map((f, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-gradient-to-br from-primary/15 to-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle className="w-3 h-3 text-primary" />
                </div>
                <span className="text-foreground/85">{f}</span>
              </li>
            ))}
          </ul>
          <Button
            variant={featured ? "default" : "outline"}
            className="w-full mt-auto h-12 rounded-xl"
            onClick={onButtonClick}
          >
            {buttonText}
          </Button>
        </div>
      </div>
    </div>
  </AnimatedSection>
);

function Business() {
  const [modalOpen, setModalOpen] = useState(false);
  const [inquiryDialogOpen, setInquiryDialogOpen] = useState(false);
  const [websiteInsuranceOpen, setWebsiteInsuranceOpen] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState<{
    name: string;
    price: number;
    tier: string;
    description?: string;
  } | null>(null);
  const [selectedSubscription, setSelectedSubscription] = useState<{
    priceId: string;
    serviceName: string;
    planTier: string;
    amount: number;
    variant?: "default" | "buying" | "existing";
  } | null>(null);
  const [isYearly, setIsYearly] = useState(false);
  const [embeddedPaymentOpen, setEmbeddedPaymentOpen] = useState(false);
  const [embeddedPaymentConfig, setEmbeddedPaymentConfig] = useState<{
    mode: "subscription" | "payment";
    priceId: string;
    productName: string;
    amount: number;
    description?: string;
    features?: string[];
  } | null>(null);
  const [activeConsultingTab, setActiveConsultingTab] = useState<
    "thinking" | "buying" | "bought" | "leaving"
  >("thinking");
  const [selectedService, setSelectedService] = useState<{
    type: "business" | "website";
    name: string;
    tier?: string;
    price?: number;
  } | null>(null);
  const { isAdmin, isLoading } = useAdminStatus();
  const [businessTestimonials, setBusinessTestimonials] = useState<any[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<{
    src: string;
    title: string;
  } | null>(null);

  const platformRef = useRef(null);
  const platformInView = useInView(platformRef, { once: true, margin: "-80px" });

  useEffect(() => {
    fetchBusinessTestimonials();
  }, []);

  const fetchBusinessTestimonials = async () => {
    const { data } = await supabase
      .from("testimonials_public")
      .select(`*, testimonial_media (*)`)
      .eq("has_video", true)
      .order("created_at", { ascending: false })
      .limit(4);
    setBusinessTestimonials(data || []);
  };

  const scrollToSection = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const getInsurancePrice = useCallback(
    (monthlyPrice: number) => {
      if (isYearly) {
        const yearlyPrice = monthlyPrice * 12 * 0.9;
        return {
          display: `$${Math.round(yearlyPrice).toLocaleString()}`,
          period: "/year",
          savings: `Save 10% ($${Math.round(monthlyPrice * 12 - yearlyPrice).toLocaleString()}/year)`,
        };
      }
      return { display: `$${monthlyPrice}`, period: "/month", savings: "" };
    },
    [isYearly],
  );

  const openStrategyCall = useCallback(() => {
    setSelectedInquiry({
      name: "Business Strategy Call",
      price: 0,
      tier: "Consultation",
      description:
        "Book a free strategy call. We map your goals, recommend the right AI setup, and outline a clear build plan.",
    });
    setInquiryDialogOpen(true);
    trackButtonClick("Book Strategy Call", "Business Hero");
  }, []);

  const handleSubscribe = useCallback(
    (
      priceId: string,
      serviceName: string,
      planTier: string,
      amount: number,
      _variant?: "default" | "buying" | "existing",
      features?: string[],
    ) => {
      setEmbeddedPaymentConfig({
        mode: "subscription",
        priceId,
        productName: `${serviceName} - ${planTier}`,
        amount,
        description: `${serviceName} - Monthly subscription`,
        features,
      });
      setEmbeddedPaymentOpen(true);
    },
    [],
  );

  const businessHeroImages = PROFESSIONAL_HERO_IMAGES.business;

  return (
    <PageTransition variant="fade">
      <div className="min-h-screen">
        <SEO
          title="AI Business Solutions & Automation"
          description="AI receptionists, automated follow-ups, and professional websites for Ohio businesses. Your AI front desk runs 24/7. Serving Dayton and all of Ohio."
          keywords="AI receptionist, business automation, AI answering service, virtual receptionist, Dayton Ohio, small business AI"
          structuredData={{
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "AI Business Services",
            description: "Professional AI automation services for businesses",
            itemListElement: [
              {
                "@type": "Service",
                position: 1,
                name: "AI Receptionist & Virtual Intake Agent",
                description:
                  "24/7 AI-powered phone answering that sounds human, filters spam, and books appointments automatically",
                provider: { "@type": "Organization", name: "InVision Network" },
                areaServed: { "@type": "State", name: "Ohio" },
                offers: { "@type": "Offer", price: "9500", priceCurrency: "USD" },
              },
              {
                "@type": "Service",
                position: 2,
                name: "AI Follow-Up Automation",
                description:
                  "Automated lead nurturing, appointment reminders, and customer follow-up systems",
                provider: { "@type": "Organization", name: "InVision Network" },
                offers: { "@type": "Offer", price: "12500", priceCurrency: "USD" },
              },
              {
                "@type": "Service",
                position: 3,
                name: "Custom AI Automation",
                description:
                  "Enterprise-grade custom AI solutions tailored to your specific business needs",
                provider: { "@type": "Organization", name: "InVision Network" },
                offers: { "@type": "Offer", price: "25000", priceCurrency: "USD" },
              },
            ],
          }}
        />
        <Navigation />

        {/* Hero */}
        <div className="relative">
          <Hero
            backgroundImages={businessHeroImages}
            headline=""
            subheadline=""
            showScrollIndicator={true}
          >
            <div className="text-center mb-6">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-4">
                <RotatingHeadlines headlines={businessHeadlines} className="" />
              </h1>
              <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
                AI agents, professional websites, and security tools built for small businesses across Ohio.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="default" size="xl" onClick={openStrategyCall}>
                Book Strategy Call
              </Button>
              <Button
                variant="heroOutline"
                size="xl"
                onClick={() => {
                  scrollToSection("services");
                  trackButtonClick("Explore Services", "Business Hero");
                }}
              >
                Explore Services
              </Button>
            </div>
          </Hero>
          <HeroFloatingStats />
        </div>

        <div className="h-8" />
        <TrustBar />

        {/* Live Stats Ticker — matches Training page */}
        <div className="bg-foreground text-background py-3 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center gap-4 sm:gap-8 flex-wrap text-xs sm:text-sm font-semibold">
              <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> 200+ Ohio Businesses Served</span>
              <span className="hidden sm:inline text-background/30">|</span>
              <span className="flex items-center gap-2"><Shield className="w-4 h-4 text-green-400" /> $500K Max Scam Coverage</span>
              <span className="hidden sm:inline text-background/30">|</span>
              <span className="flex items-center gap-2"><Zap className="w-4 h-4" /> {'<'}90s Avg. Response Time</span>
            </div>
          </div>
        </div>

        {/* ═══════════════════ SERVICES ═══════════════════ */}
        <section id="services" className="py-24 relative overflow-hidden">
          {/* Premium background */}
          <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background" />
          <div className="absolute top-20 left-0 w-[600px] h-[600px] bg-primary/[0.03] rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-20 right-0 w-[500px] h-[500px] bg-accent/[0.04] rounded-full blur-3xl pointer-events-none" />

          <div className="container mx-auto px-4 relative z-10">
            <SectionHeader
              badge="Our Services"
              title="What We Build For You"
              subtitle="Pick a service below to see how your business benefits."
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto" style={{ perspective: "1200px" }}>
              <AnimatedSection animation="fade-left" delay={0}>
                <ExpandableServiceCard
                  icon={<Phone className="w-7 h-7 text-primary" />}
                  title="AI Receptionist"
                  image={businessReceptionist}
                  summary="Your phone gets answered 24/7. Calls are routed, appointments booked, FAQs handled. You never lose a lead."
                >
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      <strong className="text-foreground">Every call answered, day or night.</strong>{" "}
                      Your AI Receptionist picks up 24/7, including holidays. It sounds natural, answers common questions, and sends urgent calls to the right person instantly.
                    </p>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {[
                        { icon: Phone, label: "24/7 Call Handling", desc: "Every call answered professionally around the clock." },
                        { icon: Search, label: "Lead Qualification", desc: "AI asks targeted questions to filter and qualify leads." },
                        { icon: MessageSquare, label: "FAQ Automation", desc: "Common questions answered accurately on the spot." },
                        { icon: Shield, label: "Spam Filtering", desc: "Blocks telemarketers and robo-calls automatically." },
                      ].map((item, i) => (
                        <Card key={i} className="p-3 border-border/60 hover:border-primary/30 transition-colors duration-300">
                          <h4 className="font-bold text-sm mb-1 flex items-center gap-2">
                            <item.icon className="w-4 h-4 text-primary" />
                            {item.label}
                          </h4>
                          <p className="text-muted-foreground text-xs">{item.desc}</p>
                        </Card>
                      ))}
                    </div>
                  </div>
                </ExpandableServiceCard>
              </AnimatedSection>

              <AnimatedSection animation="fade-right" delay={100}>
                <ExpandableServiceCard
                  icon={<Calendar className="w-7 h-7 text-primary" />}
                  title="Smart Scheduling"
                  image={businessScheduling}
                  summary="Appointments book themselves. Reminders go out. Calendars stay in sync. No more back-and-forth emails."
                >
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      <strong className="text-foreground">No more scheduling headaches.</strong>{" "}
                      Clients book through phone, chat, or your website. The AI handles rescheduling and sends reminders automatically.
                    </p>
                    <div className="grid sm:grid-cols-3 gap-3">
                      {[
                        { icon: Calendar, label: "Auto-Booking", desc: "Books with real-time availability." },
                        { icon: Mail, label: "Smart Reminders", desc: "Cuts no-shows by up to 80%." },
                        { icon: CheckCircle, label: "Calendar Sync", desc: "Works with Google, Outlook, and more." },
                      ].map((item, i) => (
                        <Card key={i} className="p-3 text-center border-border/60 hover:border-primary/30 transition-colors duration-300">
                          <div className="w-9 h-9 mx-auto mb-2 bg-gradient-to-br from-primary/15 to-accent/10 rounded-lg flex items-center justify-center">
                            <item.icon className="w-4.5 h-4.5 text-primary" />
                          </div>
                          <h4 className="font-bold text-sm mb-1">{item.label}</h4>
                          <p className="text-xs text-muted-foreground">{item.desc}</p>
                        </Card>
                      ))}
                    </div>
                  </div>
                </ExpandableServiceCard>
              </AnimatedSection>

              <AnimatedSection animation="fade-left" delay={200}>
                <ExpandableServiceCard
                  icon={<MessageSquare className="w-7 h-7 text-primary" />}
                  title="Customer Support Bot"
                  image={businessSupportBot}
                  summary="Answers customer questions 24/7 on your website, SMS, or WhatsApp. Your team focuses on high-value work."
                >
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      <strong className="text-foreground">Your customers get instant answers.</strong>{" "}
                      Support bots handle FAQ responses, post-service check-ins, review requests, and re-engagement messages on autopilot.
                    </p>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {[
                        { icon: CheckCircle, label: "Post-Service Check-Ins", desc: "Personalized follow-ups within 24 to 48 hours." },
                        { icon: Sparkles, label: "Review Requests", desc: "Happy customers get prompted to leave reviews." },
                        { icon: Mail, label: "Re-Engagement", desc: "Personalized 'we miss you' messages sent automatically." },
                        { icon: Phone, label: "Multi-Channel", desc: "SMS, email, WhatsApp, or website chat." },
                      ].map((item, i) => (
                        <div key={i} className="space-y-1">
                          <h4 className="font-bold text-sm flex items-center gap-2">
                            <item.icon className="w-4 h-4 text-primary" />
                            {item.label}
                          </h4>
                          <p className="text-muted-foreground text-xs">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </ExpandableServiceCard>
              </AnimatedSection>

              <AnimatedSection animation="fade-right" delay={300}>
                <ExpandableServiceCard
                  icon={<Calendar className="w-7 h-7 text-primary" />}
                  title="Intake & Scheduling"
                  image={businessIntake}
                  summary="Collect client details, score leads, and book meetings automatically. Save hours of admin work each week."
                >
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      <strong className="text-foreground">Onboard clients faster.</strong>{" "}
                      Your intake system gathers info, scores leads, and schedules appointments, saving hours of admin work every week.
                    </p>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {[
                        { icon: FileText, label: "Smart Intake Forms", desc: "Custom forms with conditional logic." },
                        { icon: Search, label: "Lead Scoring", desc: "Auto-score and prioritize your best leads." },
                        { icon: Lock, label: "Privacy-Conscious", desc: "Secure handling for healthcare, legal, and finance." },
                        { icon: CheckCircle, label: "CRM Integration", desc: "Syncs with Salesforce, HubSpot, and more." },
                      ].map((item, i) => (
                        <Card key={i} className="p-3 border-border/60 hover:border-primary/30 transition-colors duration-300">
                          <h4 className="font-bold text-sm mb-1 flex items-center gap-2">
                            <item.icon className="w-4 h-4 text-primary" />
                            {item.label}
                          </h4>
                          <p className="text-muted-foreground text-xs">{item.desc}</p>
                        </Card>
                      ))}
                    </div>
                  </div>
                </ExpandableServiceCard>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* ═══════════════════ COMPLETE PLATFORM ═══════════════════ */}
        <section className="py-28 relative overflow-hidden" ref={platformRef}>
          {/* Rich layered background */}
          <div className="absolute inset-0 bg-gradient-to-b from-muted/50 via-background to-muted/40" />
          <NatureAccent variant="leaves" position="left" opacity={0.08} />
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/15 to-transparent" />
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-primary/[0.025] rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent/[0.03] rounded-full blur-3xl pointer-events-none" />

          <div className="container mx-auto px-4 relative z-10">
            <SectionHeader
              badge="Complete Platform"
              title="InVision Platform, Fully Integrated"
              subtitle="All platform capabilities consolidated under one mission, one operating model, and one unified experience."
            />

            {/* Hero overview card — Premium glassmorphism */}
            <motion.div
              className="max-w-6xl mx-auto mb-20"
              initial={{ opacity: 0, y: 60, rotateX: 8 }}
              animate={platformInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ duration: 0.8, ease: "easeOut" }}
              style={{ perspective: "1400px" }}
            >
              <div className="relative rounded-3xl overflow-hidden glass-heavy shadow-3d-lg">
                {/* Animated gradient border */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/10 via-transparent to-accent/10 pointer-events-none" />
                
                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-primary/12 to-transparent" />
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-accent/10 to-transparent" />
                <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-primary/8 to-transparent" />

                <div className="relative p-8 md:p-12 lg:p-16">
                  <div className="grid gap-12 lg:grid-cols-[1.3fr_0.7fr] items-center relative z-10">
                    <div>
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={platformInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.3, duration: 0.5 }}
                      >
                        <div className="inline-flex items-center gap-2 px-4 py-2 glass-subtle rounded-full text-xs font-bold text-primary uppercase tracking-wider mb-6 border border-primary/15">
                          <Shield className="w-3.5 h-3.5" />
                          Unified Defense
                        </div>
                        <h3 className="text-2xl md:text-3xl lg:text-4xl font-black mb-5 leading-tight">
                          One Platform. Clear Mission.
                          <br />
                          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                            Practical Outcomes.
                          </span>
                        </h3>
                        <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-8">
                          We merged the full platform into AI & Business to keep the story simple.
                          Our purpose is to help Ohio organizations grow with AI while staying safe from
                          modern fraud and operational risk.
                        </p>
                        <div className="space-y-4">
                          {[
                            "Current focus: business growth automation, enterprise defense, and family-level protection.",
                            "Single operating model: shared threat intelligence across all 9 services.",
                            "Single engagement path: strategy, deployment, hardening, and ongoing support.",
                          ].map((item, idx) => (
                            <motion.div
                              key={item}
                              className="flex items-start gap-3 text-sm group"
                              initial={{ opacity: 0, x: -15 }}
                              animate={platformInView ? { opacity: 1, x: 0 } : {}}
                              transition={{ delay: 0.5 + idx * 0.1, duration: 0.4 }}
                            >
                              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary/15 to-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                                <CheckCircle className="w-3.5 h-3.5 text-primary" />
                              </div>
                              <p className="text-foreground/80 leading-relaxed">{item}</p>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    </div>

                    {/* Stats grid with 3D depth */}
                    <div className="grid grid-cols-2 gap-4">
                      {platformSnapshotStats.map((stat, i) => (
                        <motion.div
                          key={stat.label}
                          initial={{ opacity: 0, y: 30, scale: 0.9 }}
                          animate={platformInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                          transition={{ delay: 0.4 + i * 0.12, duration: 0.5, ease: "easeOut" }}
                          whileHover={{ y: -6, scale: 1.04 }}
                          className="group"
                        >
                          <div className="relative rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm p-5 text-center hover:border-primary/30 hover:shadow-[0_12px_40px_-12px_hsl(var(--primary)/0.12)] transition-all duration-500 overflow-hidden">
                            {/* Hover glow */}
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] to-accent/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            
                            <div className="relative z-10">
                              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/12 to-accent/8 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                                <stat.icon className="w-5 h-5 text-primary" />
                              </div>
                              <p className="text-3xl md:text-4xl font-black bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-1">
                                {stat.value}
                              </p>
                              <p className="text-[10px] md:text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                                {stat.label}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Service groups — Premium cards with 3D hover */}
            <div className="max-w-6xl mx-auto space-y-20">
              {platformGroups.map((group, gi) => (
                <AnimatedSection key={group.key} animation="fade-up" delay={gi * 120}>
                  <div>
                    {/* Group header with gradient accent */}
                    <div className="flex flex-wrap items-center gap-4 mb-8">
                      <div className={`h-10 w-1.5 rounded-full bg-gradient-to-b ${group.gradient}`} />
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${group.gradient} flex items-center justify-center shadow-lg`}>
                        <group.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-black tracking-tight">{group.title}</h3>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs text-muted-foreground">{group.subtitle}</span>
                        </div>
                      </div>
                      <span className="ml-auto text-xs font-bold text-primary bg-primary/8 px-4 py-1.5 rounded-full border border-primary/15">
                        {group.minPrice}
                      </span>
                    </div>

                    <div
                      className={`grid grid-cols-1 sm:grid-cols-2 gap-5 ${
                        group.features.length === 4
                          ? "lg:grid-cols-4"
                          : group.features.length === 3
                          ? "lg:grid-cols-3"
                          : "lg:grid-cols-2"
                      }`}
                      style={{ perspective: "1000px" }}
                    >
                      {group.features.map((feature, fi) => (
                        <motion.div
                          key={feature.title}
                          initial={{ opacity: 0, y: 40, rotateX: 10 }}
                          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: fi * 0.08, duration: 0.5 }}
                          whileHover={{ y: -10, rotateX: -2, rotateY: 3 }}
                          style={{ transformStyle: "preserve-3d" }}
                        >
                          <Link
                            to={feature.href}
                            className="group/card relative flex flex-col p-6 rounded-2xl border border-border/50 bg-card/95 backdrop-blur-sm transition-all duration-500 h-full no-underline hover:border-primary/30 hover:shadow-[0_20px_50px_-15px_hsl(var(--primary)/0.15)] overflow-hidden"
                          >
                            {/* Top glow bar */}
                            <div className={`absolute top-0 left-0 right-0 h-1 rounded-t-2xl bg-gradient-to-r ${group.gradient} opacity-40 group-hover/card:opacity-100 transition-opacity duration-300`} />

                            {/* Hover background glow */}
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] to-accent/[0.02] opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none" />

                            <div className="flex items-start justify-between gap-3 mb-4 relative z-10">
                              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${group.gradient} flex items-center justify-center transition-all duration-300 shadow-md group-hover/card:scale-110 group-hover/card:shadow-lg`}
                                style={{ transform: "translateZ(20px)" }}
                              >
                                <feature.icon className="w-5 h-5 text-white" />
                              </div>
                              <Badge className="text-[10px] font-bold bg-muted/80 text-muted-foreground border-border/50 backdrop-blur-sm">
                                {feature.badge}
                              </Badge>
                            </div>
                            <div className="mb-3 relative z-10">
                              <p className="font-bold text-base text-foreground leading-tight group-hover/card:text-primary transition-colors duration-300">
                                {feature.title}
                              </p>
                              <p className="text-xs font-semibold text-primary/70 mt-1">{feature.price}</p>
                            </div>
                            <p className="text-xs text-muted-foreground leading-relaxed flex-1 mb-4 relative z-10">
                              {feature.tagline}
                            </p>
                            <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground/60 group-hover/card:text-primary transition-colors relative z-10">
                              <span>Explore</span>
                              <ChevronRight className="w-3.5 h-3.5 group-hover/card:translate-x-1.5 transition-transform duration-300" />
                            </div>
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>

            {/* Platform integration pillars — 3D cards */}
            <div className="mt-24 grid md:grid-cols-3 gap-6 max-w-5xl mx-auto" style={{ perspective: "1200px" }}>
              {platformPillars.map((pillar, i) => (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 40, rotateX: 12 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12, duration: 0.6 }}
                  whileHover={{ y: -8, rotateX: -3, rotateY: 3 }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <Card className="group p-8 rounded-2xl border-border/40 bg-card/95 backdrop-blur-sm text-center h-full hover:shadow-[0_20px_50px_-15px_hsl(var(--primary)/0.12)] hover:border-primary/25 transition-all duration-500 overflow-hidden relative">
                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/30 via-accent/20 to-primary/30 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div
                      className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/15 to-accent/10 flex items-center justify-center mx-auto mb-5 shadow-inner group-hover:scale-110 transition-transform duration-300"
                      style={{ transform: "translateZ(15px)" }}
                    >
                      <pillar.icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="font-bold text-base mb-3">{pillar.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{pillar.desc}</p>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Demo CTA */}
            <AnimatedSection animation="fade-up" delay={200} className="text-center mt-16">
              <div className="inline-flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="xl"
                  onClick={() => {
                    setSelectedInquiry({
                      name: "InVision Platform Demo",
                      price: 0,
                      tier: "Full Platform",
                      description: "Schedule a live demo of all 9 integrated services now consolidated under AI & Business.",
                    });
                    setInquiryDialogOpen(true);
                  }}
                >
                  Request a Platform Demo <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button asChild variant="outline" size="xl">
                  <Link to="/training">View Individual Plans</Link>
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-5">
                Early-access pricing is still available for platform-wide engagements.
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* Veterans Discount */}
        <section className="py-4 bg-gradient-to-r from-muted via-card to-muted border-y border-border/30">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center gap-3 text-center">
              <span className="text-xl">🇺🇸</span>
              <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 font-bold">
                <Shield className="w-3 h-3 mr-1" />
                10% OFF
              </Badge>
              <span className="text-sm font-medium">
                Veterans and First Responders receive an automatic discount at checkout
              </span>
            </div>
          </div>
        </section>

        {/* ═══════════════════ WEB DESIGN ═══════════════════ */}
        <section id="website-design" className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/[0.03] rounded-full blur-3xl pointer-events-none" />
          
          <div className="container mx-auto px-4 relative z-10">
            <SectionHeader
              badge="Web Design"
              title="Websites That Sell For You"
              subtitle="Your website works around the clock. We build fast, secure sites that turn visitors into paying customers."
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-5xl mx-auto mb-14" style={{ perspective: "1000px" }}>
              <PricingCard
                tag="⚡ QUICK START"
                tagColor="from-primary to-violet-500"
                title="Landing Page"
                price="$1,500"
                priceNote="Delivered in 2 Weeks"
                delay={0}
                badges={[
                  { text: "🎨 Custom Design", color: "bg-primary/10 text-primary" },
                  { text: "📱 Mobile-First", color: "bg-primary/10 text-primary" },
                ]}
                features={[
                  "Custom responsive design",
                  "Contact form integration",
                  "Basic SEO setup",
                  "1 month hosting included",
                ]}
                buttonText="GET STARTED"
                onButtonClick={() => {
                  trackButtonClick("Get Started - Landing Page", "Business Website");
                  setSelectedInquiry({
                    name: "Landing Page",
                    price: 1500,
                    tier: "Quick Start",
                    description: "Single-page website for campaigns or business presence. Delivered in 2 weeks.",
                  });
                  setInquiryDialogOpen(true);
                }}
              />

              <PricingCard
                tag="⭐ MOST POPULAR"
                featured
                title="Business Website"
                price="$3,500"
                priceNote="Delivered in 3 to 4 Weeks"
                delay={150}
                badges={[
                  { text: "🚀 Full SEO", color: "bg-primary/10 text-primary" },
                  { text: "💬 AI Chat", color: "bg-primary/10 text-primary" },
                ]}
                features={[
                  "Multi-page website (up to 8 pages)",
                  "Advanced SEO optimization",
                  "Blog or news section",
                  "Analytics dashboard",
                  "3 months hosting included",
                ]}
                buttonText="GET STARTED"
                onButtonClick={() => {
                  trackButtonClick("Get Started - Business Website", "Business Website");
                  setSelectedInquiry({
                    name: "Business Website",
                    price: 3500,
                    tier: "Most Popular",
                    description: "Full business website with SEO, blog, and analytics. Delivered in 3 to 4 weeks.",
                  });
                  setInquiryDialogOpen(true);
                }}
              />

              <PricingCard
                tag="👑 PREMIUM"
                tagColor="from-amber-500 to-orange-500"
                title="E-Commerce"
                price="$7,500"
                priceNote="Delivered in 4 to 6 Weeks"
                delay={300}
                badges={[
                  { text: "🛒 Full Store", color: "bg-primary/10 text-primary" },
                  { text: "💳 Payments", color: "bg-primary/10 text-primary" },
                ]}
                features={[
                  "Full online store",
                  "Payment processing",
                  "Inventory management",
                  "Customer accounts",
                  "6 months hosting included",
                ]}
                buttonText="GET STARTED"
                onButtonClick={() => {
                  trackButtonClick("Get Started - E-Commerce", "Business Website");
                  setSelectedInquiry({
                    name: "E-Commerce Website",
                    price: 7500,
                    tier: "Premium",
                    description: "Full e-commerce website with payment processing. Delivered in 4 to 6 weeks.",
                  });
                  setInquiryDialogOpen(true);
                }}
              />
            </div>

            {/* Website Add-Ons */}
            <AnimatedSection animation="fade-up" delay={100} className="max-w-5xl mx-auto">
              <div className="text-center mb-8">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 glass-subtle rounded-full text-xs font-bold text-accent uppercase tracking-[0.18em] mb-4 border border-accent/15">
                  <Sparkles className="w-3 h-3" />
                  Enhance Your Project
                </span>
                <h3 className="text-2xl font-bold mb-2">Premium Add-Ons</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {[
                  { name: "Logo Design", price: "$500", note: "Starting price", color: "text-primary" },
                  { name: "Content Writing", price: "$150", note: "Per page", color: "text-accent" },
                  { name: "Business Email", price: "$200", note: "One-time setup", color: "text-primary" },
                  { name: "AI Chatbot", price: "$1,200", note: "Full integration", color: "text-primary", tag: "POPULAR" },
                  { name: "Domain & Hosting", price: "FREE", note: "With any website", color: "text-primary", tag: "INCLUDED" },
                ].map((addon, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -8, scale: 1.03 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Card className="p-4 text-center border-border/50 hover:shadow-[0_12px_40px_-12px_hsl(var(--primary)/0.12)] transition-all duration-500 hover:border-primary/30 relative group overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] to-accent/[0.01] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                      {addon.tag && (
                        <span className="absolute top-2 right-2 px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-bold rounded-full">
                          {addon.tag}
                        </span>
                      )}
                      <h4 className="font-bold text-sm mb-1 relative z-10">{addon.name}</h4>
                      <div className={`text-xl font-black ${addon.color} mb-0.5 relative z-10`}>
                        {addon.price}
                      </div>
                      <div className="text-xs text-muted-foreground relative z-10">{addon.note}</div>
                    </Card>
                  </motion.div>
                ))}
              </div>
              <div className="mt-8 text-center">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => {
                    setSelectedInquiry({
                      name: "Custom Website Package",
                      price: 0,
                      tier: "Custom Bundle",
                      description: "We build a custom package with your chosen add-ons and services.",
                    });
                    setInquiryDialogOpen(true);
                  }}
                >
                  Get Custom Quote <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* ═══════════════════ WEBSITE INSURANCE ═══════════════════ */}
        <section id="website-insurance" className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-muted/60 via-muted/40 to-muted/60" />
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          
          <div className="container mx-auto px-4 relative z-10">
            <SectionHeader
              badge="Protect Your Investment"
              title="Website Insurance"
              subtitle="Security monitoring, backups, support, and performance optimization. Your site stays fast, safe, and online."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
              {[
                {
                  tag: "ESSENTIAL",
                  tagColor: "from-emerald-500 to-teal-500",
                  title: "Essential",
                  price: "$29",
                  note: "Basic protection",
                  features: ["SSL Management", "Weekly Backups", "Email Support", "Basic Monitoring"],
                },
                {
                  tag: "⭐ MOST POPULAR",
                  featured: true,
                  title: "Professional",
                  price: "$49",
                  note: "Full protection",
                  features: ["All Essential features", "24/7 Monitoring", "Daily Backups", "Priority Support", "Malware Scanning"],
                },
                {
                  tag: "👑 ENTERPRISE",
                  tagColor: "from-amber-500 to-orange-500",
                  title: "Enterprise",
                  price: "$99",
                  note: "Maximum protection",
                  features: ["All Professional features", "Real-Time Backups", "DDoS Protection", "24/7 Dedicated Support", "Global CDN"],
                },
                {
                  tag: "✨ CUSTOM",
                  tagColor: "from-primary via-accent to-primary",
                  title: "Customizable",
                  price: "$29-500",
                  note: "Build your own",
                  features: ["Choose your features", "Flexible pricing", "Custom support level", "Upgrade anytime"],
                },
              ].map((plan, i) => (
                <PricingCard
                  key={i}
                  tag={plan.tag}
                  tagColor={plan.tagColor}
                  featured={plan.featured}
                  title={plan.title}
                  price={plan.price}
                  priceSuffix="/mo"
                  priceNote={plan.note}
                  features={plan.features}
                  delay={i * 100}
                  buttonText={i === 3 ? "Build Your Plan" : "Subscribe Now"}
                  onButtonClick={() => {
                    trackButtonClick(`Subscribe Now - Website Insurance ${plan.title}`, "Website Insurance");
                    setWebsiteInsuranceOpen(true);
                  }}
                />
              ))}
            </div>

            {/* Trust badges */}
            <AnimatedSection animation="fade-up" delay={200} className="mt-10 flex flex-wrap items-center justify-center gap-4">
              {[
                { icon: Lock, text: "Secure Payment" },
                { icon: Shield, text: "30-Day Guarantee" },
                { icon: CheckCircle, text: "Cancel Anytime" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 px-4 py-2 glass-subtle rounded-full text-xs hover:border-primary/30 transition-colors duration-300">
                  <item.icon className="w-3.5 h-3.5 text-primary" />
                  <span className="font-semibold">{item.text}</span>
                </div>
              ))}
            </AnimatedSection>
          </div>
        </section>

        {/* ═══════════════════ AI AGENTS PRICING ═══════════════════ */}
        <section id="automation-pricing" className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/[0.03] rounded-full blur-3xl pointer-events-none" />
          
          <div className="container mx-auto px-4 relative z-10">
            <SectionHeader
              badge="AI Automation"
              title="AI Agents Pricing"
              subtitle="Missed calls and slow follow-ups cost you real money. Your AI agents work 24/7 so you do not have to."
            >
              <div className="flex flex-wrap items-center justify-center gap-5 text-sm text-muted-foreground mt-5">
                {[
                  { icon: CheckCircle, text: "30-Day Guarantee" },
                  { icon: Lock, text: "Secure Setup" },
                  { icon: Phone, text: "24/7 Support" },
                ].map((item, i) => (
                  <span key={i} className="inline-flex items-center gap-2">
                    <item.icon className="w-4 h-4 text-primary" /> {item.text}
                  </span>
                ))}
              </div>
            </SectionHeader>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <PricingCard
                tag="🎯 START HERE"
                tagColor="from-primary to-violet-500"
                title="AI Receptionist & Intake Agent"
                price="$9,500"
                priceNote="2-Week Setup"
                delay={0}
                badges={[
                  { text: "⚡ 24/7 Active", color: "bg-primary/10 text-primary" },
                  { text: "✓ Includes Training", color: "bg-primary/10 text-primary" },
                ]}
                features={["24/7 call and chat handling", "Appointment booking", "Lead qualification"]}
                buttonText="GET STARTED →"
                onButtonClick={() => {
                  trackButtonClick("Get Started - AI Receptionist", "Business Pricing");
                  setSelectedInquiry({
                    name: "AI Receptionist & Intake Agent",
                    price: 9500,
                    tier: "START HERE",
                    description: "Answers calls and chats 24/7, books appointments, routes to the right person.",
                  });
                  setInquiryDialogOpen(true);
                }}
              />

              <PricingCard
                tag="⭐ MOST POPULAR"
                featured
                title="AI Follow-Up Engine"
                price="$12,500"
                priceNote="3-Week Setup"
                delay={150}
                badges={[
                  { text: "🚀 Full Automation", color: "bg-primary/10 text-primary" },
                  { text: "✓ CRM Integration", color: "bg-primary/10 text-primary" },
                ]}
                features={[
                  "Automated follow-ups (SMS, email)",
                  "Review collection system",
                  "Re-engagement campaigns",
                  "Performance dashboard",
                ]}
                buttonText="GET STARTED →"
                onButtonClick={() => {
                  trackButtonClick("Get Started - AI Follow-Up", "Business Pricing");
                  setSelectedInquiry({
                    name: "AI Follow-Up Engine",
                    price: 12500,
                    tier: "MOST POPULAR",
                    description: "Automated follow-ups, review collection, and re-engagement campaigns.",
                  });
                  setInquiryDialogOpen(true);
                }}
              />

              <PricingCard
                tag="🏗️ FULL SUITE"
                tagColor="from-amber-500 to-orange-500"
                title="Custom AI Automation"
                price="$25,000+"
                priceNote="Custom Timeline"
                delay={300}
                features={[
                  "Everything in Follow-Up Engine",
                  "Custom AI workflows",
                  "Advanced analytics",
                  "Dedicated account manager",
                  "Priority support",
                ]}
                buttonText="GET CUSTOM QUOTE"
                onButtonClick={() => {
                  trackButtonClick("Get Custom Quote - Full Suite", "Business Pricing");
                  setSelectedInquiry({
                    name: "Custom AI Automation",
                    price: 0,
                    tier: "Full Suite",
                    description: "Full AI automation suite with custom workflows, analytics, and dedicated support.",
                  });
                  setInquiryDialogOpen(true);
                }}
              />
            </div>
          </div>
        </section>

        {/* ═══════════════════ AI INSURANCE ═══════════════════ */}
        <section id="ai-insurance" className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-muted/50 via-background to-muted/40" />
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent" />
          
          <div className="container mx-auto px-4 relative z-10">
            <SectionHeader
              badge="AI Insurance"
              title="Protect Your AI Investment"
              subtitle="Your AI tools break, get hacked, or underperform. Our insurance plans keep your business running and your AI optimized."
            >
              <div className="flex items-center justify-center gap-4 mt-5">
                <Label
                  htmlFor="billing-toggle"
                  className={`text-sm font-semibold transition-colors ${!isYearly ? "text-primary" : "text-muted-foreground"}`}
                >
                  Monthly
                </Label>
                <Switch
                  id="billing-toggle"
                  checked={isYearly}
                  onCheckedChange={setIsYearly}
                />
                <Label
                  htmlFor="billing-toggle"
                  className={`text-sm font-semibold transition-colors ${isYearly ? "text-primary" : "text-muted-foreground"}`}
                >
                  Yearly{" "}
                  <span className="text-xs text-primary font-bold">(Save 10%)</span>
                </Label>
              </div>
            </SectionHeader>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {/* Starter */}
              <PricingCard
                tag="🌱 STARTER"
                tagColor="from-emerald-500 to-teal-500"
                title="Basic Care"
                price={getInsurancePrice(199).display}
                priceSuffix={getInsurancePrice(199).period}
                priceNote="Essential Coverage"
                delay={0}
                features={[
                  "AI health monitoring",
                  "Email support (48hr)",
                  "Monthly diagnostics",
                  "Basic data backup",
                ]}
                buttonText="Subscribe Now"
                onButtonClick={() => {
                  trackButtonClick("Subscribe - AI Insurance Basic", "AI Insurance");
                  handleSubscribe(
                    "price_1SjwUQJ8osfwYbX7yV7vHoLD",
                    "AI Service Insurance",
                    "Basic Care",
                    19900,
                    "default",
                  );
                }}
              />

              {/* Standard */}
              <PricingCard
                tag="⭐ MOST POPULAR"
                featured
                title="Standard Care"
                price={getInsurancePrice(399).display}
                priceSuffix={getInsurancePrice(399).period}
                priceNote="Full Coverage"
                delay={100}
                features={[
                  "Everything in Basic",
                  "Priority support (24hr)",
                  "Weekly optimization",
                  "Security scanning",
                  "Performance reports",
                ]}
                buttonText="Subscribe Now"
                onButtonClick={() => {
                  trackButtonClick("Subscribe - AI Insurance Standard", "AI Insurance");
                  handleSubscribe(
                    "price_1SjwUQJ8osfwYbX7xOHeDwqV",
                    "AI Service Insurance",
                    "Standard Care",
                    39900,
                    "default",
                  );
                }}
              />

              {/* Premium */}
              <PricingCard
                tag="🏆 PREMIUM"
                tagColor="from-amber-500 to-orange-500"
                title="Premium Care"
                price={getInsurancePrice(799).display}
                priceSuffix={getInsurancePrice(799).period}
                priceNote="Maximum Coverage"
                delay={200}
                features={[
                  "Everything in Standard",
                  "24/7 emergency support",
                  "Proactive optimization",
                  "Custom integrations",
                  "Dedicated account manager",
                ]}
                buttonText="Subscribe Now"
                onButtonClick={() => {
                  trackButtonClick("Subscribe - AI Insurance Premium", "AI Insurance");
                  handleSubscribe(
                    "price_1SjwUQJ8osfwYbX7Q5jRWQEt",
                    "AI Service Insurance",
                    "Premium Care",
                    79900,
                    "default",
                  );
                }}
              />

              {/* Enterprise */}
              <PricingCard
                tag="🏢 ENTERPRISE"
                tagColor="from-violet-600 to-purple-600"
                title="Customized"
                price="Custom"
                priceSuffix=" pricing"
                priceNote="Tailored for your needs"
                delay={300}
                features={[
                  "Custom SLA agreements",
                  "Multi-location support",
                  "Unlimited repair hours",
                  "Dedicated manager",
                  "Custom integrations",
                ]}
                buttonText="Request Quote"
                onButtonClick={() => {
                  setSelectedInquiry({
                    name: "AI Insurance - Enterprise",
                    price: 0,
                    tier: "Enterprise",
                    description: "Custom SLA and enterprise-grade AI maintenance.",
                  });
                  setInquiryDialogOpen(true);
                }}
              />
            </div>

            {/* Universal Support */}
            <AnimatedSection animation="scale-up" delay={200}>
              <div className="max-w-4xl mx-auto mt-14">
                <Card className="relative p-10 border-border/40 rounded-3xl bg-card/95 backdrop-blur-sm shadow-3d overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary" />
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] to-accent/[0.01] pointer-events-none" />
                  
                  <div className="text-center mb-8 relative z-10">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 glass-subtle rounded-full text-xs font-bold text-primary uppercase tracking-[0.18em] mb-4 border border-primary/15">
                      <Globe className="w-3.5 h-3.5" />
                      Universal AI Support
                    </span>
                    <h3 className="text-2xl font-black mb-3">
                      We Support AI Agents From Any Vendor
                    </h3>
                    <p className="text-muted-foreground text-sm max-w-2xl mx-auto leading-relaxed">
                      It does not matter where you bought your AI. We fix, optimize, secure, and develop AI systems from any platform worldwide.
                    </p>
                  </div>
                  <div className="flex flex-wrap justify-center gap-6 mb-8 relative z-10">
                    {["🔧 Resuscitate", "⚡ Optimize", "🛡️ Secure", "🚀 Develop"].map((item, i) => (
                      <motion.div
                        key={i}
                        className="flex items-center gap-2 text-sm group"
                        whileHover={{ scale: 1.08, y: -2 }}
                      >
                        <div className="w-10 h-10 bg-gradient-to-br from-primary/12 to-accent/8 rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-300">
                          <span className="text-lg">{item.split(" ")[0]}</span>
                        </div>
                        <span className="font-semibold">{item.split(" ")[1]}</span>
                      </motion.div>
                    ))}
                  </div>
                  <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground relative z-10">
                    <span><strong className="text-foreground">No Contracts</strong> · Cancel anytime</span>
                    <span><strong className="text-foreground">Any Platform</strong> · Worldwide support</span>
                    <span><strong className="text-foreground">24 to 48hr Response</strong> · Fast turnaround</span>
                  </div>
                </Card>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* ═══════════════════ AI CONSULTING ═══════════════════ */}
        <section id="ai-consulting" className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
          
          <div className="container mx-auto px-4 relative z-10">
            <SectionHeader
              badge="Expert AI Guidance"
              title="AI Consulting Services"
              subtitle="Choose your situation below. We show you the next step."
            />

            <AnimatedSection animation="fade-up" className="max-w-4xl mx-auto">
              {/* Tab Group — Premium pill design */}
              <div className="flex flex-wrap justify-center gap-2 p-2 glass-subtle rounded-2xl border border-border/40 mb-10 shadow-sm">
                {[
                  { key: "thinking" as const, label: "💭 Thinking About AI" },
                  { key: "buying" as const, label: "🔍 Buying AI" },
                  { key: "bought" as const, label: "🛡️ Already Bought AI" },
                  { key: "leaving" as const, label: "🚪 Want to Leave AI" },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveConsultingTab(tab.key)}
                    className={`px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 flex-1 min-w-[130px] ${
                      activeConsultingTab === tab.key
                        ? "bg-gradient-to-r from-primary to-accent text-white shadow-lg shadow-primary/20 scale-[1.02]"
                        : "hover:bg-card text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Content — 3D card */}
              <Card className="relative p-10 border-border/40 rounded-3xl overflow-hidden shadow-3d">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] via-transparent to-accent/[0.01] pointer-events-none" />
                
                {activeConsultingTab === "thinking" && (
                  <div className="text-center animate-fade-in relative z-10">
                    <div className="w-18 h-18 bg-gradient-to-br from-primary/15 to-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-inner">
                      <span className="text-3xl">💭</span>
                    </div>
                    <h3 className="text-2xl font-black mb-3">Thinking About AI</h3>
                    <Badge className="bg-primary/10 text-primary border-0 mb-5 font-bold">FREE Consultation</Badge>
                    <p className="text-muted-foreground max-w-2xl mx-auto mb-7 leading-relaxed">
                      Not sure if AI fits your business? We help you explore your options, understand costs, and figure out if AI will drive real growth for you.
                    </p>
                    <ul className="text-left max-w-md mx-auto space-y-3 mb-8">
                      {["30-minute discovery call", "Business needs assessment", "AI opportunity identification", "No obligation recommendation"].map((item, i) => (
                        <li key={i} className="flex items-center gap-3 text-sm">
                          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-primary/15 to-accent/10 flex items-center justify-center flex-shrink-0">
                            <CheckCircle className="w-3 h-3 text-primary" />
                          </div>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      onClick={() => {
                        trackButtonClick("Book Free AI Discovery", "Business Consulting");
                        setSelectedService({ type: "business", name: "AI Discovery Consultation (Free)", tier: "Free" });
                        setModalOpen(true);
                      }}
                      size="lg"
                      className="h-13 px-10 rounded-full bg-gradient-to-r from-primary to-accent text-white font-bold shadow-lg shadow-primary/20 hover:shadow-xl hover:scale-[1.03] transition-all duration-300"
                    >
                      Book Free Consultation
                    </Button>
                  </div>
                )}

                {activeConsultingTab === "buying" && (
                  <div className="text-center animate-fade-in relative z-10">
                    <div className="w-18 h-18 bg-gradient-to-br from-primary/15 to-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-inner">
                      <span className="text-3xl">🔍</span>
                    </div>
                    <h3 className="text-2xl font-black mb-3">Buying AI</h3>
                    <Badge className="bg-primary/10 text-primary border-0 mb-5 font-bold">$1,799 - Pre-Purchase Vetting</Badge>
                    <p className="text-muted-foreground max-w-2xl mx-auto mb-7 leading-relaxed">
                      Before you spend, let us check the tool first. We look for hidden costs, security gaps, data privacy risks, and whether the ROI claims hold up.
                    </p>
                    <ul className="text-left max-w-md mx-auto space-y-3 mb-8">
                      {["Full vendor security assessment", "Hidden cost analysis", "ROI projection review", "Data privacy compliance check", "Written report with recommendations"].map((item, i) => (
                        <li key={i} className="flex items-center gap-3 text-sm">
                          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-primary/15 to-accent/10 flex items-center justify-center flex-shrink-0">
                            <CheckCircle className="w-3 h-3 text-primary" />
                          </div>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      onClick={() => {
                        trackButtonClick("Get AI Vetting", "Business Consulting");
                        trackConversion("consulting_vetting", 1799);
                        setSelectedService({ type: "business", name: "Pre-Purchase AI Tool Vetting", price: 1799 });
                        setModalOpen(true);
                      }}
                      size="lg"
                      className="h-13 px-10 rounded-full bg-gradient-to-r from-primary to-accent text-white font-bold shadow-lg shadow-primary/20 hover:shadow-xl hover:scale-[1.03] transition-all duration-300"
                    >
                      Get Pre-Purchase Vetting
                    </Button>
                  </div>
                )}

                {activeConsultingTab === "bought" && (
                  <div className="text-center animate-fade-in relative z-10">
                    <div className="w-18 h-18 bg-gradient-to-br from-primary/15 to-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-inner">
                      <span className="text-3xl">🛡️</span>
                    </div>
                    <h3 className="text-2xl font-black mb-3">Already Bought AI</h3>
                    <Badge className="bg-primary/10 text-primary border-0 mb-5 font-bold">From $3,499 - Security Audit</Badge>
                    <p className="text-muted-foreground max-w-2xl mx-auto mb-7 leading-relaxed">
                      Already running AI but unsure if your system is secure or performing well? We audit your setup to find vulnerabilities and speed up performance.
                    </p>
                    <ul className="text-left max-w-md mx-auto space-y-3 mb-8">
                      {["Full security vulnerability scan", "Performance optimization review", "Data handling audit", "Compliance verification", "Detailed remediation plan"].map((item, i) => (
                        <li key={i} className="flex items-center gap-3 text-sm">
                          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-primary/15 to-accent/10 flex items-center justify-center flex-shrink-0">
                            <CheckCircle className="w-3 h-3 text-primary" />
                          </div>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      onClick={() => {
                        trackButtonClick("Get AI Audit", "Business Consulting");
                        trackConversion("consulting_audit", 3499);
                        setSelectedService({ type: "business", name: "AI Security & Performance Audit", price: 3499 });
                        setModalOpen(true);
                      }}
                      size="lg"
                      className="h-13 px-10 rounded-full bg-gradient-to-r from-primary to-accent text-white font-bold shadow-lg shadow-primary/20 hover:shadow-xl hover:scale-[1.03] transition-all duration-300"
                    >
                      Get Security Audit
                    </Button>
                  </div>
                )}

                {activeConsultingTab === "leaving" && (
                  <div className="text-center animate-fade-in relative z-10">
                    <div className="w-18 h-18 bg-gradient-to-br from-primary/15 to-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-inner">
                      <span className="text-3xl">🚪</span>
                    </div>
                    <h3 className="text-2xl font-black mb-3">Want to Leave AI</h3>
                    <Badge className="bg-primary/10 text-primary border-0 mb-5 font-bold">$2,499 - Safe Exit Strategy</Badge>
                    <p className="text-muted-foreground max-w-2xl mx-auto mb-7 leading-relaxed">
                      Stuck with an AI tool that is not delivering? We help you exit safely, move your data, and find a better fit.
                    </p>
                    <ul className="text-left max-w-md mx-auto space-y-3 mb-8">
                      {["Contract review and exit strategy", "Data migration planning", "Alternative solution research", "Transition support", "30 days post-exit monitoring"].map((item, i) => (
                        <li key={i} className="flex items-center gap-3 text-sm">
                          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-primary/15 to-accent/10 flex items-center justify-center flex-shrink-0">
                            <CheckCircle className="w-3 h-3 text-primary" />
                          </div>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      onClick={() => {
                        trackButtonClick("Get Exit Strategy", "Business Consulting");
                        trackConversion("consulting_exit", 2499);
                        setSelectedService({ type: "business", name: "AI Safe Exit Strategy", price: 2499 });
                        setModalOpen(true);
                      }}
                      size="lg"
                      className="h-13 px-10 rounded-full bg-gradient-to-r from-primary to-accent text-white font-bold shadow-lg shadow-primary/20 hover:shadow-xl hover:scale-[1.03] transition-all duration-300"
                    >
                      Get Safe Exit Strategy
                    </Button>
                  </div>
                )}
              </Card>
            </AnimatedSection>
          </div>
        </section>

        {/* ═══════════════════ ILLUSTRATION & VISUAL ART ═══════════════════ */}
        <section id="illustration" className="py-24 relative overflow-hidden">
          {/* Decorative background */}
          <div className="absolute inset-0 bg-gradient-to-b from-muted/40 via-background to-muted/30" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-coral-100/20 via-transparent to-transparent rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-lavender-100/15 via-transparent to-transparent rounded-full blur-3xl pointer-events-none" />

          <div className="container mx-auto px-4 relative z-10">
            <SectionHeader
              badge="Creative Services"
              title="Illustration & Visual Art"
              subtitle="Professional illustration and visual design services that give your brand a distinctive, memorable identity."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto" style={{ perspective: "1200px" }}>
              {[
                {
                  icon: Palette,
                  title: "Illustration Design",
                  desc: "Custom hand-crafted illustrations tailored to your brand story and audience. From editorial to product illustration.",
                  gradient: "from-coral-400 to-coral-600",
                },
                {
                  icon: Shapes,
                  title: "Vector Illustration",
                  desc: "Clean, scalable vector artwork for digital and print. Perfect for logos, web assets, and marketing collateral.",
                  gradient: "from-primary to-lavender-500",
                },
                {
                  icon: Pen,
                  title: "Character Design",
                  desc: "Original character concepts for your brand mascot, game, or animated content. Full turnarounds and style sheets included.",
                  gradient: "from-lavender-500 to-violet-500",
                },
                {
                  icon: Image,
                  title: "Icon Design",
                  desc: "Pixel-perfect custom icon sets that match your brand language. Available in SVG, PNG, and icon-font formats.",
                  gradient: "from-teal-500 to-cyan-500",
                },
                {
                  icon: BarChart3,
                  title: "Infographic Design",
                  desc: "Data-driven visual storytelling that turns complex information into clear, shareable graphics your audience remembers.",
                  gradient: "from-gold-500 to-coral-400",
                },
                {
                  icon: Grid3X3,
                  title: "Pattern Design",
                  desc: "Seamless, repeatable patterns for packaging, textiles, wallpapers, and digital backgrounds. Unique to your brand.",
                  gradient: "from-coral-500 to-lavender-400",
                },
              ].map((service, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40, rotateX: 10 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  whileHover={{ y: -10, rotateX: -2, rotateY: 3 }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <Card className="group relative p-0 border-border/40 rounded-2xl overflow-hidden hover:shadow-[0_20px_50px_-15px_hsl(var(--primary)/0.12)] transition-all duration-500 h-full">
                    {/* Top accent bar */}
                    <div className={`h-1.5 w-full bg-gradient-to-r ${service.gradient}`} />
                    
                    {/* Hover glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] to-accent/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                    <div className="relative z-10 p-6">
                      <div
                        className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}
                        style={{ transform: "translateZ(15px)" }}
                      >
                        <service.icon className="w-7 h-7 text-white" />
                      </div>

                      <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                        {service.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-5">{service.desc}</p>

                      <button
                        onClick={() => {
                          setSelectedInquiry({
                            name: service.title,
                            price: 0,
                            tier: "Illustration",
                            description: service.desc,
                          });
                          setInquiryDialogOpen(true);
                        }}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:gap-3 transition-all duration-300"
                      >
                        Get a Quote <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Bottom CTA */}
            <AnimatedSection animation="fade-up" delay={300} className="text-center mt-14">
              <Card className="glass-light max-w-3xl mx-auto p-10 rounded-3xl shadow-3d relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary" />
                <h3 className="text-xl font-black mb-3 relative z-10">Need a Custom Visual Package?</h3>
                <p className="text-muted-foreground text-sm mb-6 max-w-xl mx-auto leading-relaxed relative z-10">
                  We build complete visual identity systems. Illustrations, icons, patterns, and brand assets, all designed to work together.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                  <Button
                    onClick={() => {
                      setSelectedInquiry({
                        name: "Custom Visual Package",
                        price: 0,
                        tier: "Custom",
                        description: "Complete visual identity system with illustrations, icons, patterns, and brand assets.",
                      });
                      setInquiryDialogOpen(true);
                    }}
                    size="lg"
                    className="rounded-full bg-gradient-to-r from-primary to-accent text-white font-bold shadow-lg hover:shadow-xl hover:scale-[1.03] transition-all"
                  >
                    Request Custom Quote
                  </Button>
                  <Button asChild variant="outline" size="lg" className="rounded-full font-semibold hover:scale-[1.03] transition-all">
                    <Link to="/contact">Talk to Our Design Team</Link>
                  </Button>
                </div>
              </Card>
            </AnimatedSection>
          </div>
        </section>

        {/* ═══════════════════ WHY CHOOSE US ═══════════════════ */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-muted/50 via-background to-muted/40" />
          <NatureAccent variant="landscape" position="right" opacity={0.07} />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/[0.03] rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/[0.03] rounded-full blur-3xl pointer-events-none" />
          
          <div className="container mx-auto px-4 relative z-10">
            <SectionHeader
              badge="Why Choose Us"
              title="The InVision Difference"
              subtitle="What makes us different from other AI vendors."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto mb-14" style={{ perspective: "1200px" }}>
              {[
                { icon: Shield, title: "Security-First", desc: "Every solution ships with enterprise-grade encryption, monitoring, and data protection built in." },
                { icon: Lock, title: "No Vendor Lock-In", desc: "We build on open standards. You own your AI and your data. Move in-house whenever you want." },
                { icon: FileText, title: "Plain-English Docs", desc: "Your team gets documentation written in clear language. No jargon, no confusion." },
                { icon: Sparkles, title: "Fast Deployment", desc: "Most AI solutions go live in 2 to 4 weeks. We move fast without cutting corners on security." },
                { icon: CheckCircle, title: "Ongoing Partnership", desc: "We stay with you after launch. Continuous support, updates, and optimization as your business grows." },
                { icon: Phone, title: "24/7 Support", desc: "Get help when you need it. Our team is available around the clock for critical issues." },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40, rotateX: 10 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  whileHover={{ y: -10, rotateX: -3, rotateY: 3 }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <Card className="group relative p-7 border-border/40 rounded-2xl bg-card/95 backdrop-blur-sm overflow-hidden h-full hover:shadow-[0_20px_50px_-15px_hsl(var(--primary)/0.12)] hover:border-primary/25 transition-all duration-500">
                    {/* Top accent */}
                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {/* Hover glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] to-accent/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    
                    <div
                      className="w-13 h-13 bg-gradient-to-br from-primary/15 to-accent/10 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/10 relative z-10"
                      style={{ transform: "translateZ(15px)" }}
                    >
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-base font-bold mb-2 relative z-10">{item.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed relative z-10">{item.desc}</p>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Stats Bar */}
            <AnimatedSection animation="fade-up" delay={200}>
              <Card className="max-w-4xl mx-auto p-10 border-border/40 rounded-3xl bg-card/95 backdrop-blur-sm shadow-3d relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/30 via-accent/20 to-primary/30" />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center relative z-10">
                  {[
                    { value: "15+", label: "Businesses Served" },
                    { value: "99%+", label: "Uptime Guarantee" },
                    { value: "24/7", label: "Support Available" },
                    { value: "50+", label: "Integrations" },
                  ].map((stat, i) => (
                    <motion.div
                      key={i}
                      className="group"
                      whileHover={{ scale: 1.08 }}
                    >
                      <p className="text-3xl md:text-4xl font-black bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-1">
                        {stat.value}
                      </p>
                      <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">{stat.label}</p>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </AnimatedSection>
          </div>
        </section>

        {/* ═══════════════════ TESTIMONIALS ═══════════════════ */}
        {(isAdmin || businessTestimonials.length > 0) && (
          <section className="py-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
            
            <div className="container mx-auto px-4 relative z-10">
              <SectionHeader
                badge="Client Stories"
                title="What Our Clients Say"
              />

              {isAdmin && !isLoading && businessTestimonials.length === 0 && (
                <div className="max-w-2xl mx-auto">
                  <Card className="p-10 border-2 border-dashed border-primary/30 text-center rounded-3xl">
                    <span className="text-4xl mb-4 block">💼</span>
                    <h3 className="text-xl font-bold mb-2">Business Testimonials</h3>
                    <p className="text-muted-foreground text-sm">
                      Add client testimonials via Admin Dashboard
                    </p>
                  </Card>
                </div>
              )}

              {businessTestimonials.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                  {businessTestimonials.map((testimonial, i) => {
                    const videoMedia = testimonial.testimonial_media?.find(
                      (m: any) => m.media_type === "video",
                    );
                    return (
                      <AnimatedSection key={testimonial.id} animation="fade-up" delay={i * 100}>
                        <TestimonialCard
                          name={testimonial.name}
                          location={testimonial.location}
                          quote={testimonial.story.substring(0, 120) + "..."}
                          image={videoMedia?.thumbnail_url || "/placeholder.svg"}
                          rating={testimonial.rating}
                          videoUrl={videoMedia?.file_url}
                          onVideoClick={() =>
                            videoMedia &&
                            setSelectedVideo({
                              src: videoMedia.file_url,
                              title: `${testimonial.name}'s Story`,
                            })
                          }
                        />
                      </AnimatedSection>
                    );
                  })}
                </div>
              )}
            </div>
          </section>
        )}

        {/* Final CTA */}
        <CTASection
          headline="Ready to Put AI to Work?"
          variant="image"
          backgroundImage={natureSummer2}
          description="Take 15 minutes to discuss your needs. No sales pressure. We listen, ask questions, and give you a clear plan."
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => setModalOpen(true)}
              size="xl"
              className="bg-gradient-to-r from-primary to-accent text-white font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95"
            >
              SCHEDULE DISCOVERY CALL
            </Button>
            <Button asChild variant="outlineLight" size="xl" className="transition-transform duration-200 hover:scale-105 active:scale-95">
              <Link to="/faq">View Frequently Asked Questions</Link>
            </Button>
          </div>
          <p className="text-white/80 text-sm mt-4">
            15-minute call. No pressure. Free.
          </p>
        </CTASection>

        <Footer />

        {/* Modals */}
        {selectedVideo && (
          <VideoLightbox
            isOpen={!!selectedVideo}
            onClose={() => setSelectedVideo(null)}
            videoSrc={selectedVideo.src}
            title={selectedVideo.title}
          />
        )}

        {selectedService && (
          <BookingModal
            open={modalOpen}
            onOpenChange={setModalOpen}
            serviceType={selectedService.type}
            serviceName={selectedService.name}
            serviceTier={selectedService.tier}
            basePrice={selectedService.price}
            veteranDiscountPercent={10}
          />
        )}

        {selectedInquiry && (
          <ServiceInquiryDialog
            open={inquiryDialogOpen}
            onOpenChange={setInquiryDialogOpen}
            serviceName={selectedInquiry.name}
            servicePrice={selectedInquiry.price}
            serviceTier={selectedInquiry.tier}
            serviceDescription={selectedInquiry.description}
          />
        )}

        <WebsiteInsuranceDialog
          open={websiteInsuranceOpen}
          onOpenChange={setWebsiteInsuranceOpen}
        />

        {embeddedPaymentConfig && (
          <EmbeddedPaymentModal
            open={embeddedPaymentOpen}
            onOpenChange={setEmbeddedPaymentOpen}
            mode={embeddedPaymentConfig.mode}
            priceId={embeddedPaymentConfig.priceId}
            productName={embeddedPaymentConfig.productName}
            amount={embeddedPaymentConfig.amount}
            description={embeddedPaymentConfig.description}
            features={embeddedPaymentConfig.features}
          />
        )}
      </div>
    </PageTransition>
  );
}

export default Business;
