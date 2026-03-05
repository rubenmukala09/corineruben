import { useState, useEffect, useCallback, useMemo, memo } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { BookingModal } from "@/components/BookingModal";
import { EmbeddedPaymentModal } from "@/components/payment/EmbeddedPaymentModal";
import { TrainingPaymentModal } from "@/components/TrainingPaymentModal";
import Hero from "@/components/Hero";
import { PageTransition } from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { useAdminStatus } from "@/hooks/useAdminStatus";
import { supabase } from "@/integrations/supabase/client";
import { trackButtonClick, trackConversion } from "@/utils/analyticsTracker";
import { SITE } from "@/config/site";
import {
  CheckCircle,
  Mail,
  Upload,
  Phone,
  Search,
  Shield,
  Users,
  Clock as ClockIcon,
  Award,
  Lock,
  FileText,
  MessageSquare,
  Link as LinkIcon,
  QrCode,
  FileCheck,
  Image as ImageIcon,
  Video,
  Zap,
  Star,
  ArrowRight,
  Sparkles,
  GraduationCap,
  Heart,
  Target,
  TrendingUp,
  BookOpen,
  Headphones,
  Calendar,
  Eye,
  Forward,
  AlertTriangle,
  ShieldCheck,
  BarChart3,
  Globe,
  Fingerprint,
  Brain,
} from "lucide-react";
import { PROFESSIONAL_HERO_IMAGES } from "@/config/professionalHeroImages";
import TestimonialCard from "@/components/TestimonialCard";
import { VideoLightbox } from "@/components/VideoLightbox";
import { InstructorShowcase } from "@/components/training/InstructorShowcase";

import { SEO } from "@/components/SEO";
import { RotatingHeadlines } from "@/components/shared/RotatingHeadlines";
import HeroFloatingStats from "@/components/business/HeroFloatingStats";
import { usePrerenderBlocker } from "@/contexts/PrerenderContext";
import { NatureAccent } from "@/components/ui/NatureAccent";

import seniorCouple from "@/assets/senior-couple-active.jpg";

const trainingHeadlines = [
  "Learn How to Recognize and Stop Scams",
  "Professional Safety Workshops 24/7",
  "Protection Services for Real-World Safety",
];

const TRUST_PILLARS = [
  {
    icon: BookOpen,
    title: "Clear, Respectful Teaching",
    desc: "Senior-friendly pace, real-world examples, no jargon. We explain everything step-by-step.",
    stat: "4.9★",
    statLabel: "Avg Rating",
  },
  {
    icon: Lock,
    title: "Privacy-First Guarantee",
    desc: "We never ask for passwords, OTPs, or banking information. Your data stays private.",
    stat: "100%",
    statLabel: "Data Safe",
  },
  {
    icon: FileText,
    title: "Actionable Playbooks",
    desc: "Ready-to-use scripts for bank, IRS, romance, and tech-support scam scenarios.",
    stat: "12+",
    statLabel: "Playbooks",
  },
  {
    icon: Award,
    title: "Industry-Leading Expertise",
    desc: "Years of experience defending seniors against the latest AI-enabled fraud techniques.",
    stat: "80+",
    statLabel: "Yrs Combined",
  },
];

const PremiumTrainingCard = memo(
  ({
    plan,
    index,
    onBook,
  }: {
    plan: any;
    index: number;
    onBook: (plan: any) => void;
  }) => {
    return (
      <div className="relative h-full pt-5">
        {/* Floating badge — always visible, decorative */}
        <div className="absolute -top-0.5 left-1/2 -translate-x-1/2 z-20">
          <span className={`inline-flex items-center gap-1.5 px-5 py-2 rounded-full text-xs font-bold tracking-wider shadow-lg whitespace-nowrap border ${
            plan.popular
              ? "bg-gradient-to-r from-primary to-accent text-white border-primary/30"
              : "bg-card text-primary border-primary/30 shadow-md"
          }`}>
            {plan.badge}
          </span>
        </div>
        <div
          className={`relative overflow-hidden rounded-2xl bg-card border transition-all duration-300 hover:-translate-y-1 h-full flex flex-col ${
            plan.popular
              ? "shadow-xl border-2 border-primary/40 ring-1 ring-primary/10"
              : "shadow-sm border-border/60 hover:shadow-lg hover:border-primary/20"
          }`}
        >
          {/* Top gradient accent */}
          <div className={`h-1.5 ${plan.popular ? 'bg-gradient-to-r from-primary via-accent to-primary' : 'bg-gradient-to-r from-muted-foreground/20 via-primary/30 to-muted-foreground/20'}`} />

          <div className="p-6 flex flex-col flex-1">
            {/* Spacer for badge */}
            <div className="h-4" />

            {/* Title */}
            <h3 className="text-xl font-black mb-2 text-center text-foreground">{plan.name}</h3>

            {/* Meta info */}
            <div className="flex items-center justify-center gap-3 mb-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><ClockIcon className="w-3 h-3" />{plan.duration}</span>
              <span className="w-1 h-1 rounded-full bg-border" />
              <span className="flex items-center gap-1"><Users className="w-3 h-3" />{plan.size}</span>
            </div>

            {/* Description */}
            <p className="text-muted-foreground mb-5 text-sm text-center leading-relaxed">
              {plan.description}
            </p>

            {/* Price */}
            <div className="text-center mb-5 py-3 bg-muted/40 rounded-xl border border-border/30">
              <p className="text-3xl font-black text-primary">
                {plan.price}
                {plan.pricePrefix || ""}
              </p>
              <span className="text-xs font-medium text-muted-foreground">per session</span>
            </div>

            {/* Features */}
            <ul className="space-y-2.5 mb-6 flex-1">
              {plan.features.slice(0, 4).map((feature: string, idx: number) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">{feature.replace("✓ ", "")}</span>
                </li>
              ))}
            </ul>

            {/* CTA — high contrast, visible text */}
            <Button
              onClick={() => onBook(plan)}
              variant={plan.popular ? "default" : "outline"}
              className="w-full mt-auto rounded-xl h-12 text-base"
            >
              Book Now — {plan.price}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    );
  },
);

const ScamExampleCard = ({
  example,
  index,
}: {
  example: any;
  index: number;
}) => {
  return (
    <div className="h-full overflow-hidden rounded-2xl bg-card border border-border/60 shadow-sm hover:shadow-lg hover:border-primary/20 transition-all duration-300 hover:-translate-y-1">
      <div className="h-1.5 bg-gradient-to-r from-primary via-accent to-primary" />
      <div className="p-6">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20 mb-4">
          {example.badge}
        </span>
        <div className="space-y-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground font-bold mb-2">
              What They Received
            </p>
            <p className="text-foreground italic leading-relaxed text-sm">
              "{example.received}"
            </p>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground font-bold mb-2">
              Our Analysis
            </p>
            <p className="text-muted-foreground leading-relaxed text-sm">
              {example.analysis}
            </p>
          </div>
          <div className="pt-4 border-t border-border/50">
            <p className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground font-bold mb-2">
              Amount Saved
            </p>
            <p className="text-3xl font-black text-primary">
              {example.saved}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

function LearnAndTrain() {
  const [modalOpen, setModalOpen] = useState(false);
  const [trainingPaymentOpen, setTrainingPaymentOpen] = useState(false);
  const [embeddedPaymentOpen, setEmbeddedPaymentOpen] = useState(false);
  const [embeddedPaymentConfig, setEmbeddedPaymentConfig] = useState<{
    mode: "subscription" | "payment";
    priceId: string;
    productName: string;
    amount: number;
    description?: string;
    features?: string[];
  } | null>(null);

  const { isAdmin } = useAdminStatus();
  const [selectedService, setSelectedService] = useState<{
    type: "training" | "scamshield";
    name: string;
    tier?: string;
    price?: number;
    features?: string[];
    duration?: string;
  } | null>(null);
  const [trainingTestimonials, setTrainingTestimonials] = useState<any[]>([]);
  const [isTestimonialsLoading, setIsTestimonialsLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState<{
    src: string;
    title: string;
  } | null>(null);
  const [expandedThreat, setExpandedThreat] = useState<string | null>(null);

  useEffect(() => {
    fetchTrainingTestimonials();
  }, []);

  const fetchTrainingTestimonials = async () => {
    try {
      setIsTestimonialsLoading(true);
      const { data } = await supabase
        .from("testimonials_public")
        .select(`*, testimonial_media (*)`)
        .eq("has_video", true)
        .order("created_at", { ascending: false })
        .limit(3);
      setTrainingTestimonials(data || []);
    } catch (error) {
      console.error("Error fetching training testimonials:", error);
    } finally {
      setIsTestimonialsLoading(false);
    }
  };
  usePrerenderBlocker(isTestimonialsLoading);

  const handleBookTraining = useCallback((plan: any) => {
    setSelectedService({
      type: "training",
      name: plan.name,
      tier: plan.type,
      price: plan.priceNum,
      features: plan.features,
      duration: plan.duration,
    });
    setTrainingPaymentOpen(true);
  }, []);

  const trainingHeroImages = PROFESSIONAL_HERO_IMAGES.training;

  const trainingPlans = [
    {
      name: "Group Class",
      type: "standard",
      price: "$79",
      priceNum: 79,
      duration: "90 min",
      size: "Up to 25",
      badge: "👥 GROUPS",
      description:
        "Join others in a live online class. Learn to spot fake calls, emails, and texts.",
      features: [
        "✓ Live Zoom session",
        "✓ Ask questions anytime",
        "✓ Easy-to-follow handouts",
        "✓ Certificate included",
      ],
    },
    {
      name: "Small Family Group",
      type: "family",
      price: "$149",
      priceNum: 149,
      duration: "90 min",
      size: "Up to 12",
      popular: true,
      badge: "⭐ BEST VALUE",
      description: "More personal attention for couples and close friends.",
      features: [
        "✓ Smaller, cozy setting",
        "✓ Time for your questions",
        "✓ Create a family safe word",
        "✓ Take-home action plan",
      ],
    },
    {
      name: "Private Family Session",
      type: "private",
      price: "$399",
      priceNum: 399,
      duration: "2 hours",
      size: "5 Members",
      badge: "👑 PREMIUM",
      description: "Parents, kids, grandparents. We come to you.",
      features: [
        "✓ Your family only (up to 5)",
        "✓ In-person or video call",
        "✓ Device safety check",
        "✓ 30 days of email help",
      ],
    },
    {
      name: "Large Group Workshop",
      type: "custom",
      price: "$510",
      priceNum: 510,
      pricePrefix: "+",
      duration: "2-3 hours",
      size: "10-100+",
      badge: "🏢 ORGANIZATIONS",
      description: "Churches, senior centers, and communities.",
      features: [
        "✓ We come to your location",
        "✓ Custom workshop for you",
        "✓ Certificates for everyone",
        "✓ Ongoing support included",
      ],
    },
  ];

  const aiProPlans = [
    {
      name: "AI Automation",
      type: "automation",
      price: "$299",
      priceNum: 299,
      duration: "3 hours",
      size: "Individual",
      badge: "🔥 POPULAR",
      description:
        "Master AI workflow automation with Make, Zapier, n8n, and custom API integrations.",
      features: [
        "Workflow automation mastery",
        "API integrations & webhooks",
        "ChatGPT/Claude integration",
        "Ready-to-use templates",
        "Email automation setup",
      ],
    },
    {
      name: "AI Agency Building",
      type: "agency",
      price: "$499",
      priceNum: 499,
      duration: "5 hours",
      size: "Individual/Team",
      popular: true,
      badge: "⭐ BEST VALUE",
      description:
        "Build a profitable AI agency from scratch. Scale to 6 figures.",
      features: [
        "Complete business model",
        "Client acquisition system",
        "Service packaging & pricing",
        "Delivery frameworks",
        "Ongoing mentorship access",
      ],
    },
    {
      name: "Web Design + AI",
      type: "webdesign",
      price: "$349",
      priceNum: 349,
      duration: "4 hours",
      size: "Individual",
      badge: "🎨 CREATIVE",
      description: "Create stunning websites using AI design tools.",
      features: [
        "AI design tool mastery",
        "Responsive layout design",
        "SEO & performance optimization",
        "Deployment & hosting",
        "Client handoff process",
      ],
    },
    {
      name: "Project Troubleshoot",
      type: "troubleshoot",
      price: "$150",
      priceNum: 150,
      pricePrefix: "/hr",
      duration: "Flexible",
      size: "Per project",
      badge: "🛠 CONSULTING",
      description: "Expert help for your existing AI projects.",
      features: [
        "Expert code review",
        "Bug fixing & debugging",
        "Feature development",
        "Architecture consulting",
        "Performance optimization",
      ],
    },
  ];

  const scamExamples = [
    {
      badge: "Grandparent Scam",
      received: "Hi grandma, I'm in jail and need bail money NOW",
      analysis:
        "Voice analysis showed AI generation. Number traced to known scam.",
      saved: "$8,000",
    },
    {
      badge: "Bank Phishing",
      received: "Email that looked exactly like Chase Bank",
      analysis: "Domain was chase-secure-verify.com (fake). Classic phishing.",
      saved: "Entire savings",
    },
    {
      badge: "Tech Support Scam",
      received: "Microsoft called saying computer was hacked",
      analysis:
        "Microsoft never cold-calls. Verified fake tech support operation.",
      saved: "$2,500",
    },
    {
      badge: "Romance Scam",
      received: "Online love interest requested emergency funds",
      analysis: "Photos were stolen. Profile matched known scammer patterns.",
      saved: "$15,000",
    },
  ];

  const threats = [
    { icon: Mail, title: "Phishing Emails", description: "Forward suspicious emails for analysis. We check sender authenticity, analyze links, and identify fake logos.", color: "bg-blue-500/10 text-blue-600" },
    { icon: MessageSquare, title: "SMS Scams", description: "Screenshot suspicious texts. We trace senders and verify if messages are legitimate.", color: "bg-green-500/10 text-green-600" },
    { icon: Phone, title: "Voice Calls", description: "Describe suspicious calls. We identify voice scam patterns and AI-generated voices.", color: "bg-violet-500/10 text-violet-600" },
    { icon: FileText, title: "Voice Messages", description: "Send voicemails for AI analysis. We detect voice cloning and verify authenticity.", color: "bg-amber-500/10 text-amber-600" },
    { icon: LinkIcon, title: "Suspicious Links", description: "Send links before clicking. We safely scan for malware and verify destinations.", color: "bg-red-500/10 text-red-600" },
    { icon: QrCode, title: "QR Codes", description: "Photo us QR codes. We decode them safely and tell you where they lead.", color: "bg-pink-500/10 text-pink-600" },
    { icon: FileCheck, title: "Documents", description: "Upload suspicious PDFs. We check for malware and fake information.", color: "bg-teal-500/10 text-teal-600" },
    { icon: ImageIcon, title: "Social Media", description: "Screenshot fake profiles. We verify authenticity and identify scam patterns.", color: "bg-indigo-500/10 text-indigo-600" },
  ];

  return (
    <PageTransition variant="fade">
      <div className="min-h-screen">
        <SEO
          title="AI Scam Protection Training"
          description="Comprehensive AI scam protection training for families and seniors. Learn to spot deepfakes, phishing, and AI-powered scams."
          keywords="AI scam training, deepfake detection training, senior cybersecurity, phishing awareness"
          structuredData={{
            "@context": "https://schema.org",
            "@type": "EducationalOrganization",
            name: "InVision Network Training Academy",
            description:
              "Comprehensive AI scam protection training for families, seniors, and businesses",
            url: "https://invisionnetwork.org/training",
            telephone: SITE.phone.e164,
          }}
        />
        <Navigation />

        {/* Hero Section */}
        <div className="relative">
          <Hero
            backgroundImages={trainingHeroImages}
            headline=""
            subheadline=""
            showScrollIndicator={true}
          >
            <div className="text-center md:text-left mb-4 sm:mb-6">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-3 glow-text">
                <RotatingHeadlines headlines={trainingHeadlines} className="" />
              </h1>
              <p className="text-lg md:text-xl text-white/90 max-w-3xl">
                Expert-led workshops & instant file scanning for families and
                seniors
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 flex-wrap justify-center md:justify-start">
              <Button
                onClick={() =>
                  document
                    .getElementById("training")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                size="xl"
              >
                <Shield className="w-5 h-5 mr-2" />
                Learn & Train Workshops
              </Button>
              <Button
                asChild
                size="xl"
                variant="heroOutline"
              >
                <Link to="/training/ai-analysis">
                  <FileCheck className="w-5 h-5 mr-2" />
                  AI Analysis & Secure Scan
                </Link>
              </Button>
            </div>
          </Hero>
          <HeroFloatingStats />
        </div>

        {/* ══════════ LIVE THREAT TICKER ══════════ */}
        <div className="bg-foreground text-background py-3 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center gap-4 sm:gap-8 flex-wrap text-xs sm:text-sm font-semibold">
              <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" /> 2,847 scams blocked this month</span>
              <span className="hidden sm:inline text-background/30">|</span>
              <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-green-400" /> $1.2M saved for families</span>
              <span className="hidden sm:inline text-background/30">|</span>
              <span className="flex items-center gap-2"><Users className="w-4 h-4" /> 140,000+ students trained</span>
            </div>
          </div>
        </div>

        {/* ══════════ SECTION 1: WHY FAMILIES TRUST US ══════════ */}
        <section className="py-10 sm:py-16 md:py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background" />
          <NatureAccent variant="lake" position="right" opacity={0.09} />
          <div className="absolute top-20 left-0 w-[500px] h-[500px] bg-primary/[0.03] rounded-full blur-3xl pointer-events-none" />
          <div className="container mx-auto px-4 lg:px-12 relative z-10">
            <div className="text-center mb-14">
              <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-6 shadow-sm border border-primary/15 bg-primary/5">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                <span className="text-primary">Trusted by 100+ Families</span>
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-4">
                Why Families <span className="text-primary">Trust Us</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Clear teaching, privacy-first protocols, and real scripts your
                family can use in any emergency.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-14">
              {TRUST_PILLARS.map((item, index) => (
                <div key={index} className="relative rounded-2xl border border-border/50 bg-card/90 backdrop-blur-xl overflow-hidden p-6 text-center shadow-sm hover:shadow-[0_12px_40px_-12px_hsl(var(--primary)/0.15)] hover:border-primary/25 hover:-translate-y-2 transition-all duration-500 h-full">
                  <div className="h-1 w-full bg-gradient-to-r from-primary to-accent absolute top-0 left-0 right-0" />
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                    {item.desc}
                  </p>
                  {/* Graphic stat callout */}
                  <div className="mt-auto pt-3 border-t border-border/50">
                    <p className="text-2xl font-black text-primary">{item.stat}</p>
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">{item.statLabel}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Emergency Protocol + Identity Verification */}
            <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              <div className="relative rounded-2xl border border-border/50 bg-card/90 backdrop-blur-xl overflow-hidden p-6 sm:p-8 shadow-sm hover:shadow-[0_12px_40px_-12px_hsl(var(--primary)/0.15)] hover:border-primary/25 transition-all duration-500 h-full">
                <div className="h-1 w-full bg-gradient-to-r from-destructive/60 to-primary absolute top-0 left-0 right-0" />
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center">
                    <AlertTriangle className="w-6 h-6 text-destructive" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-foreground">
                      60-Second Pause Protocol
                    </h3>
                    <p className="text-xs text-muted-foreground">Memorize these 5 steps</p>
                  </div>
                </div>
                <ol className="space-y-3">
                  {[
                    { step: "Stop immediately.", detail: "Hang up / stop replying. Take a breath.", icon: "🛑" },
                    { step: "Verify independently.", detail: "Call back using the official number on your card.", icon: "📞" },
                    { step: "Use your safeword", detail: "with family before taking any action.", icon: "🔑" },
                    { step: "Double-check money requests", detail: "with a second family member.", icon: "👥" },
                    { step: "Report and document", detail: "the attempt (we provide templates).", icon: "📝" },
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center font-bold text-lg flex-shrink-0">
                        {item.icon}
                      </span>
                      <div className="text-sm pt-1">
                        <span className="font-bold text-foreground">{item.step}</span>{" "}
                        <span className="text-muted-foreground">{item.detail}</span>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="relative rounded-2xl border border-border/50 bg-card/90 backdrop-blur-xl overflow-hidden p-6 sm:p-8 shadow-sm hover:shadow-[0_12px_40px_-12px_hsl(var(--primary)/0.15)] hover:border-primary/25 transition-all duration-500 h-full">
                <div className="h-1 w-full bg-gradient-to-r from-primary to-accent absolute top-0 left-0 right-0" />
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Fingerprint className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-foreground">
                      Identity Verification Script
                    </h3>
                    <p className="text-xs text-muted-foreground">Use these exact phrases</p>
                  </div>
                </div>
                <ul className="space-y-3">
                  {[
                    { action: "Demand specifics:", detail: "Full name, department, callback number, case number.", icon: "📋" },
                    { action: "Always say:", detail: '"I\'ll call you back through the main line."', icon: "💬" },
                    { action: "Never share:", detail: "Codes, passwords, or download any software.", icon: "🚫" },
                    { action: "Forward suspicious items", detail: "to our help line for expert review.", icon: "📨" },
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 text-lg">
                        {item.icon}
                      </div>
                      <div className="text-sm pt-1">
                        <span className="font-bold text-foreground">{item.action}</span>{" "}
                        <span className="text-muted-foreground">{item.detail}</span>
                      </div>
                    </li>
                  ))}
                </ul>
                {/* Visual callout */}
                <div className="mt-6 p-4 bg-primary/5 rounded-xl border border-primary/10 text-center">
                  <p className="text-sm font-bold text-primary">💡 Pro Tip: Print this card and keep it by your phone</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════ GRADIENT DIVIDER ══════════ */}
        <div className="h-1.5 bg-gradient-to-r from-primary via-accent to-primary" />

        {/* ══════════ SECTION 2: HOW IT WORKS ══════════ */}
        <section id="book" className="py-10 sm:py-16 md:py-20 bg-muted/20">
          <div className="container mx-auto px-4 lg:px-12">
            <div className="text-center mb-14">
              <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-6 shadow-sm border border-primary/15 bg-primary/5">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                <span className="text-primary">Getting Started</span>
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-4">
                How It <span className="text-primary">Works</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Three simple steps to build calm, repeatable safety habits.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                { step: "01", icon: Calendar, title: "Book Your Session", desc: "Choose a convenient Zoom class time, request a Priority Group session, or schedule private in-person coaching.", color: "from-blue-500/20 to-primary/20" },
                { step: "02", icon: GraduationCap, title: "Learn & Practice", desc: "Master identity verification, spot deepfakes, and handle urgent messages with confidence.", color: "from-green-500/20 to-primary/20" },
                { step: "03", icon: Shield, title: "Get Ongoing Support", desc: "Add our monthly help line to forward suspicious messages for expert review.", color: "from-violet-500/20 to-primary/20" },
              ].map((item, index) => (
                <div key={index} className="relative rounded-2xl border border-border/50 bg-card/90 backdrop-blur-xl p-8 text-center shadow-sm hover:shadow-[0_12px_40px_-12px_hsl(var(--primary)/0.15)] hover:border-primary/25 hover:-translate-y-2 transition-all duration-500 h-full overflow-hidden">
                  {/* Background gradient accent */}
                  <div className={`absolute top-0 left-0 right-0 h-24 bg-gradient-to-b ${item.color} to-transparent opacity-50`} />
                  <div className="relative">
                    <div className="absolute top-0 right-0 text-5xl font-black text-primary/10">
                      {item.step}
                    </div>
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
                      <item.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-black text-foreground mb-3">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                  {/* Connecting arrow for desktop */}
                  {index < 2 && (
                    <div className="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 z-10">
                      <ArrowRight className="w-6 h-6 text-primary/30" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════ SECTION 3: SCAM PREVENTION WORKSHOPS ══════════ */}
        <section id="training" className="py-10 sm:py-16 md:py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background" />
          <div className="absolute top-20 right-0 w-[400px] h-[400px] bg-primary/[0.03] rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-20 left-0 w-[500px] h-[500px] bg-accent/[0.04] rounded-full blur-3xl pointer-events-none" />
          <div className="container mx-auto px-4 lg:px-12 relative z-10">
            <div className="text-center mb-14">
              <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-6 shadow-sm border border-primary/15 bg-primary/5">
                <Shield className="w-3.5 h-3.5 text-primary" />
                <span className="text-primary">Protecting Families Together</span>
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-4">
                Scam Prevention <span className="text-primary">Workshops</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Simple, friendly classes. No tech skills needed. Perfect for
                seniors, parents, and grandparents.
              </p>
            </div>

            {/* Veterans banner */}
            <div className="flex justify-center mb-8 sm:mb-10 px-2">
              <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2.5 sm:py-3 bg-card border border-border/60 rounded-full shadow-sm text-center flex-wrap justify-center">
                <span className="text-lg sm:text-xl">🇺🇸</span>
                <span className="font-bold text-foreground text-xs sm:text-sm">
                  Veterans & First Responders Save 10%
                </span>
                <span className="text-[10px] sm:text-xs text-muted-foreground">
                  · Applied at checkout
                </span>
              </div>
            </div>

            <div id="pricing" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[1400px] mx-auto">
              {trainingPlans.map((plan, index) => (
                <PremiumTrainingCard key={index} plan={plan} index={index} onBook={handleBookTraining} />
              ))}
            </div>

            {/* Comparison quick-stat bar */}
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto">
              {[
                { icon: Users, value: "25+", label: "Group Size Options" },
                { icon: GraduationCap, value: "4", label: "Workshop Tiers" },
                { icon: Award, value: "100%", label: "Completion Rate" },
                { icon: Heart, value: "4.9/5", label: "Student Rating" },
              ].map((stat, i) => (
                <div key={i} className="bg-muted/50 border border-border/40 rounded-xl p-3 text-center">
                  <stat.icon className="w-5 h-5 text-primary mx-auto mb-1" />
                  <p className="text-xl font-black text-foreground">{stat.value}</p>
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Instructor Showcase */}
        <InstructorShowcase />

        {/* ══════════ SECTION 4: SIMPLE PROTECTION IN 4 STEPS ══════════ */}
        <section className="py-10 sm:py-16 md:py-20 bg-muted/20">
          <div className="container mx-auto px-4 lg:px-12">
            <div className="text-center mb-14">
              <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-6 shadow-sm border border-primary/15 bg-primary/5">
                <Zap className="w-3.5 h-3.5 text-primary" />
                <span className="text-primary">Easy as 1-2-3-4</span>
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-4">
                Simple Protection in <span className="text-primary">4 Steps</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Our process is designed to be effortless. Just forward it to us.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {[
                { step: "01", icon: Eye, title: "Something Suspicious", subtitle: "Spot it", desc: "You receive a suspicious email, text, call, or link that doesn't feel right.", color: "from-amber-500/15" },
                { step: "02", icon: Forward, title: "Forward to Us", subtitle: "Send it", desc: "Simply forward the message, screenshot, or file to our secure analysis line.", color: "from-blue-500/15" },
                { step: "03", icon: Brain, title: "Expert Analysis", subtitle: "We check it", desc: "Our AI and human experts analyze the threat and verify authenticity.", color: "from-violet-500/15" },
                { step: "04", icon: ShieldCheck, title: "Clear Guidance", subtitle: "You're safe", desc: "You get a clear, simple answer: safe or dangerous, with next steps.", color: "from-green-500/15" },
              ].map((item, index) => (
                <div key={index} className="relative rounded-2xl border border-border/50 bg-card/90 backdrop-blur-xl p-6 text-center shadow-sm hover:shadow-[0_12px_40px_-12px_hsl(var(--primary)/0.15)] hover:border-primary/25 hover:-translate-y-2 transition-all duration-500 h-full overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-b ${item.color} to-transparent opacity-40`} />
                  <div className="relative">
                    <div className="absolute top-0 right-0 text-4xl font-black text-primary/10">
                      {item.step}
                    </div>
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <item.icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="text-lg font-black text-foreground mb-1">{item.title}</h3>
                    <p className="text-sm font-semibold text-primary mb-3">{item.subtitle}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Visual response time graphic */}
            <div className="mt-10 max-w-2xl mx-auto bg-card border border-border/60 rounded-2xl p-5 sm:p-6 shadow-sm">
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                    <Zap className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-black text-foreground">Average Response Time</p>
                    <p className="text-xs text-muted-foreground">From submission to analysis</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-3xl sm:text-4xl font-black text-primary">{'<'}2 min</p>
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">AI-Powered Speed</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════ SECTION 5: THREAT ANALYSIS ══════════ */}
        <section className="py-10 sm:py-16 md:py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background" />
          <div className="absolute top-20 left-0 w-[500px] h-[500px] bg-accent/[0.03] rounded-full blur-3xl pointer-events-none" />
          <div className="container mx-auto px-4 lg:px-12 relative z-10">
            <div className="text-center mb-14">
              <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-6 shadow-sm border border-primary/15 bg-primary/5">
                <Shield className="w-3.5 h-3.5 text-primary" />
                <span className="text-primary">Comprehensive Protection</span>
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-4">
                We Analyze <span className="text-primary">All Types</span> of Threats
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Click on any threat type to learn how we protect you.
              </p>
            </div>

            <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-5xl mx-auto">
              {threats.map((threat, index) => (
                <div
                  key={index}
                  onClick={() => setExpandedThreat(expandedThreat === threat.title ? null : threat.title)}
                  className={`cursor-pointer bg-card border rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-lg ${
                    expandedThreat === threat.title
                      ? "border-primary/40 shadow-lg"
                      : "border-border/60 hover:border-primary/20"
                  }`}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className={`w-12 h-12 rounded-xl ${threat.color.split(' ')[0]} flex items-center justify-center mb-3`}>
                      <threat.icon className={`w-6 h-6 ${threat.color.split(' ')[1]}`} />
                    </div>
                    <h3 className="font-bold text-sm text-foreground mb-1">{threat.title}</h3>
                    <p className="text-xs text-muted-foreground">Click to learn more</p>
                  </div>
                  {expandedThreat === threat.title && (
                    <div className="mt-3 pt-3 border-t border-border/50">
                      <p className="text-xs text-muted-foreground leading-relaxed">{threat.description}</p>
                      <div className="mt-2 flex items-center justify-center gap-1 text-primary">
                        <span className="text-xs font-bold">Forward to us!</span>
                        <CheckCircle className="w-3 h-3" />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Threat coverage stat */}
            <div className="mt-10 grid grid-cols-3 gap-4 max-w-3xl mx-auto">
              {[
                { value: "8", label: "Threat Types Covered" },
                { value: "99.7%", label: "Detection Accuracy" },
                { value: "24/7", label: "Monitoring Active" },
              ].map((stat, i) => (
                <div key={i} className="bg-card border border-border/60 rounded-xl p-4 text-center">
                  <p className="text-2xl sm:text-3xl font-black text-primary">{stat.value}</p>
                  <p className="text-[10px] sm:text-xs uppercase tracking-widest text-muted-foreground font-bold">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════ GRADIENT DIVIDER ══════════ */}
        <div className="h-1.5 bg-gradient-to-r from-accent via-primary to-accent" />

        {/* ══════════ SECTION 6: AI PROFESSIONAL TRAINING ══════════ */}
        <section id="ai-pro-training" className="py-10 sm:py-16 md:py-20 bg-muted/20">
          <div className="container mx-auto px-4 lg:px-12">
            <div className="text-center mb-14">
              <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-6 shadow-sm border border-primary/15 bg-primary/5">
                <Brain className="w-3.5 h-3.5 text-primary" />
                <span className="text-primary">For Professionals & Entrepreneurs</span>
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-4">
                AI Professional <span className="text-primary">Training</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-4xl mx-auto mb-2">
                Build an AI agency, create automation workflows, or design
                stunning websites.
              </p>
              <p className="text-primary font-semibold">
                🚀 Perfect for entrepreneurs, developers, and marketers ready to leverage AI.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[1400px] mx-auto">
              {aiProPlans.map((plan, index) => (
                <PremiumTrainingCard key={index} plan={plan} index={index} onBook={handleBookTraining} />
              ))}
            </div>

            <div className="text-center mt-10">
              <div className="inline-flex items-center gap-3 bg-card border border-border/60 rounded-full px-6 py-3 shadow-sm">
                <Lock className="w-4 h-4 text-primary" />
                <p className="text-sm text-muted-foreground">
                  Secure payment required · 10% veteran discount available
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Veterans Discount Strip */}
        <section className="py-5 bg-card border-y border-border/60">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center justify-center gap-4 text-base">
              <span className="text-xl">🇺🇸</span>
              <span className="font-bold text-foreground">
                Veterans & First Responders: 10% OFF
              </span>
              <span className="text-sm text-muted-foreground">
                Military, Police, Fire, EMT
              </span>
            </div>
          </div>
        </section>

        {/* ══════════ SECTION 7: SECURE YOUR FAMILY ══════════ */}
        <section className="py-10 sm:py-16 md:py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background" />
          <div className="absolute bottom-20 right-0 w-[400px] h-[400px] bg-primary/[0.03] rounded-full blur-3xl pointer-events-none" />
          <div className="container mx-auto px-4 lg:px-12 relative z-10">
            <div className="text-center mb-14">
              <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-6 shadow-sm border border-primary/15 bg-primary/5">
                <Heart className="w-3.5 h-3.5 text-primary" />
                <span className="text-primary">Family Protection</span>
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-4">
                Secure Your <span className="text-primary">Family</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                AI-powered scammers don't just target you — they target your entire family.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto mb-14">
              <div className="bg-card border-2 border-destructive/20 rounded-2xl p-6 sm:p-8 shadow-sm h-full">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center">
                    <AlertTriangle className="w-6 h-6 text-destructive" />
                  </div>
                  <h3 className="text-xl font-black text-destructive">Without Protection</h3>
                </div>
                <ul className="space-y-3">
                  {[
                    "Scammers can impersonate grandchildren using AI voice cloning",
                    "One family member clicking a bad link can compromise everyone",
                    "You may lose life savings to fake emergencies",
                    "Personal documents and identity could be stolen",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm">
                      <span className="w-6 h-6 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-destructive text-xs font-bold">✗</span>
                      </span>
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
                {/* Danger stat */}
                <div className="mt-6 p-4 bg-destructive/5 rounded-xl border border-destructive/10 text-center">
                  <p className="text-2xl font-black text-destructive">$28.4B</p>
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Lost to scams in 2024 (FTC)</p>
                </div>
              </div>

              <div className="bg-card border-2 border-primary/20 rounded-2xl p-6 sm:p-8 shadow-sm h-full">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-black text-primary">With InVision Protection</h3>
                </div>
                <ul className="space-y-3">
                  {[
                    "Family safe words to verify real emergencies instantly",
                    "24/7 expert analysis. Just forward anything suspicious",
                    "Proactive alerts when new scam patterns emerge",
                    "Secure vault for important family documents",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm">
                      <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle className="w-3.5 h-3.5 text-primary" />
                      </span>
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
                {/* Protection stat */}
                <div className="mt-6 p-4 bg-primary/5 rounded-xl border border-primary/10 text-center">
                  <p className="text-2xl font-black text-primary">$1.2M+</p>
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Saved for our families</p>
                </div>
              </div>
            </div>

            {/* Family Safety Vault */}
            <div className="max-w-4xl mx-auto bg-card border border-border/60 rounded-2xl p-5 sm:p-8 md:p-10 shadow-sm">
              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
                  <Lock className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-black text-foreground mb-3">Family Safety Vault</h3>
                <p className="text-muted-foreground mb-6">Included with Family & Premium Plans</p>
                <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-3 max-w-2xl mx-auto">
                  {[
                    { icon: "🔑", feature: "Family safe words" },
                    { icon: "📞", feature: "Trusted caller list" },
                    { icon: "🆘", feature: "Emergency contacts" },
                    { icon: "📄", feature: "Encrypted documents" },
                    { icon: "🔐", feature: "Account recovery" },
                    { icon: "✈️", feature: "Travel itineraries" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-2 p-3 bg-muted/50 rounded-xl border border-border/50">
                      <span className="text-xl">{item.icon}</span>
                      <span className="font-medium text-sm text-foreground">{item.feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════ SECTION 8: SCAMS WE'VE CAUGHT ══════════ */}
        <section className="py-10 sm:py-16 md:py-20 bg-muted/20">
          <div className="container mx-auto px-4 lg:px-12">
            <div className="text-center mb-14">
              <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-6 shadow-sm border border-primary/15 bg-primary/5">
                <Award className="w-3.5 h-3.5 text-primary" />
                <span className="text-primary">Success Stories</span>
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-4">
                Scams We've <span className="text-primary">Caught</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Real examples of how we've protected our members from devastating losses.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
              {scamExamples.map((example, index) => (
                <ScamExampleCard key={index} example={example} index={index} />
              ))}
            </div>

            {/* Total saved banner */}
            <div className="mt-10 bg-card border border-primary/20 rounded-2xl p-6 max-w-3xl mx-auto text-center">
              <p className="text-sm uppercase tracking-widest text-muted-foreground font-bold mb-2">Total Saved Across All Members</p>
              <p className="text-4xl sm:text-5xl font-black text-primary">$1,200,000+</p>
              <p className="text-sm text-muted-foreground mt-2">and counting — since our founding</p>
            </div>

            {isAdmin && (
              <div className="mt-12">
                <h3 className="text-xl font-black text-center text-foreground mb-6">Video Testimonials</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="p-6 text-center border-2 border-dashed border-primary/30 hover:border-primary/50 transition-all rounded-2xl bg-card">
                      <div className="aspect-video bg-muted/30 rounded-xl mb-4 flex flex-col items-center justify-center gap-3">
                        <Video className="w-12 h-12 text-primary/50" />
                        <p className="text-sm font-semibold text-muted-foreground">Upload Success Stories</p>
                      </div>
                      <Button variant="default" size="sm" className="w-full rounded-full">
                        <Upload className="w-4 h-4 mr-2" />
                        Add Video
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Training Success Stories */}
        {trainingTestimonials.length > 0 && (
          <section className="py-10 sm:py-16 md:py-20 bg-background">
            <div className="container mx-auto px-4 lg:px-12">
              <div className="text-center mb-14">
                <span className="inline-block text-[11px] uppercase tracking-[0.15em] font-bold text-primary bg-primary/10 px-4 py-1.5 rounded-full mb-4">
                  Testimonials
                </span>
                <h2 className="text-3xl md:text-4xl font-black text-foreground mb-3">
                  Workshop <span className="text-primary">Success Stories</span>
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Hear from families who have completed our workshops
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {trainingTestimonials.map((testimonial) => {
                  const videoMedia = testimonial.testimonial_media?.find(
                    (m: any) => m.media_type === "video",
                  );
                  return (
                    <TestimonialCard
                      key={testimonial.id}
                      name={testimonial.name}
                      location={testimonial.location}
                      quote={testimonial.story}
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
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* ══════════ FINAL CTA ══════════ */}
        <section className="py-16 sm:py-20 md:py-24 relative overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${seniorCouple})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/60 to-black/70" />
          <div className="container mx-auto px-4 relative z-10 text-center">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-5">
              Sleep Better Tonight
            </h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Join 100+ families who trust InVision Network for their digital safety
            </p>
            <div className="flex flex-col sm:flex-row gap-4 flex-wrap justify-center">
              <Button
                onClick={() =>
                  document.getElementById("training")?.scrollIntoView({ behavior: "smooth" })
                }
                size="lg"
                className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg font-bold w-full sm:w-auto"
              >
                Get Started
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full bg-white/10 backdrop-blur-md text-white border-white/30 hover:bg-white/20 px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg font-bold w-full sm:w-auto"
              >
                <Link to="/contact">
                  <Headphones className="w-5 h-5 mr-2" />
                  Talk to an Expert
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <Footer />

        {selectedVideo && (
          <VideoLightbox
            isOpen={!!selectedVideo}
            onClose={() => setSelectedVideo(null)}
            videoSrc={selectedVideo.src}
            title={selectedVideo.title}
          />
        )}

        {selectedService && selectedService.type === "training" && (
          <TrainingPaymentModal
            open={trainingPaymentOpen}
            onOpenChange={setTrainingPaymentOpen}
            serviceName={selectedService.name}
            serviceType={selectedService.type}
            serviceTier={selectedService.tier}
            basePrice={selectedService.price || 0}
            features={selectedService.features}
            duration={selectedService.duration}
            onSuccess={() => {
              trackConversion("training_booking", selectedService.price || 0);
            }}
          />
        )}

        {selectedService && selectedService.type !== "training" && (
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
            onSuccess={() => {
              trackConversion("subscription", embeddedPaymentConfig.amount / 100);
            }}
          />
        )}
      </div>
    </PageTransition>
  );
}

export default LearnAndTrain;
