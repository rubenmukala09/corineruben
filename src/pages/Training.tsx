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
import { ScrollReveal } from "@/components/ScrollReveal";

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
} from "lucide-react";
import { PROFESSIONAL_HERO_IMAGES } from "@/config/professionalHeroImages";
import TestimonialCard from "@/components/TestimonialCard";
import { VideoLightbox } from "@/components/VideoLightbox";
import { InstructorShowcase } from "@/components/training/InstructorShowcase";

import { SEO } from "@/components/SEO";
import { RotatingHeadlines } from "@/components/shared/RotatingHeadlines";
import HeroFloatingStats from "@/components/business/HeroFloatingStats";
import { usePrerenderBlocker } from "@/contexts/PrerenderContext";

import seniorCouple from "@/assets/senior-couple-active.jpg";

const trainingHeadlines = [
  "Learn How to Recognize and Stop Scams",
  "Professional Safety Workshops 24/7",
  "Protection Services for Real-World Safety"
];

const TRUST_PILLARS = [
  {
    icon: BookOpen,
    title: "Clear, Respectful Teaching",
    desc: "Senior-friendly pace, real-world examples, no jargon. We explain everything step-by-step.",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: Lock,
    title: "Privacy-First Guarantee",
    desc: "We never ask for passwords, OTPs, or banking information. Your data stays private.",
    color: "from-emerald-500 to-teal-500"
  },
  {
    icon: FileText,
    title: "Actionable Playbooks",
    desc: "Ready-to-use scripts for bank, IRS, romance, and tech-support scam scenarios.",
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: Award,
    title: "Industry-Leading Expertise",
    desc: "Years of experience defending seniors against the latest AI-enabled fraud techniques.",
    color: "from-amber-500 to-orange-500"
  },
];

const PremiumTrainingCard = memo(({ plan, index, onBook }: { plan: any; index: number; onBook: (plan: any) => void }) => {
  return (
    <ScrollReveal animation="fade-up" delay={index * 100} threshold={0.2}>
      <div className="relative h-full pt-5">
        {plan.popular && (
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 bg-foreground text-background px-5 py-2 rounded-full text-xs font-bold tracking-wider shadow-lg z-20 whitespace-nowrap">
            ⭐ BEST VALUE
          </div>
        )}
        <div className={`p-6 pt-8 rounded-2xl bg-card border transition-all hover:-translate-y-1 h-full flex flex-col ${
          plan.popular
            ? "shadow-lg border-2 border-foreground/20"
            : "shadow-sm border-border hover:shadow-md hover:border-primary/20"
        }`}>
          <div className="flex items-center justify-center gap-1.5 mb-4 text-xs text-muted-foreground pt-2">
            <ClockIcon className="w-3.5 h-3.5" />
            <span className="font-medium">{plan.duration}</span>
            <span className="mx-1">·</span>
            <Users className="w-3.5 h-3.5" />
            <span className="font-medium">{plan.size}</span>
          </div>
          <h3 className="text-2xl font-bold mb-3 text-center">{plan.name}</h3>
          <p className="text-muted-foreground mb-4 text-sm text-center">{plan.description}</p>
          <p className="text-3xl font-bold text-accent mb-4 text-center">
            {plan.price}{plan.pricePrefix || ''}<span className="text-base font-normal text-muted-foreground ml-1">/session</span>
          </p>
          <div className="flex flex-wrap gap-2 justify-center mb-4">
            <Badge className={`${plan.badgeClass || 'bg-muted text-muted-foreground'}`}>
              {plan.badge}
            </Badge>
          </div>
          <ul className="space-y-2 mb-6 text-sm flex-1">
            {plan.features.slice(0, 4).map((feature: string, idx: number) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span>{feature.replace('✓ ', '')}</span>
              </li>
            ))}
          </ul>
          <Button
            onClick={() => onBook(plan)}
            variant={plan.popular ? "default" : "outline"}
            className={`w-full mt-auto ${
              plan.popular
                ? 'bg-foreground text-background hover:bg-foreground/90'
                : ''
            }`}
          >
            Book Now
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </ScrollReveal>
  );
});

const ScamExampleCard = ({ example, index }: { example: any; index: number }) => {
  return (
    <ScrollReveal animation="fade-up" delay={index * 100} threshold={0.2}>
      <div className="h-full overflow-hidden rounded-2xl bg-card border border-border shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
        <div className={`h-1.5 bg-gradient-to-r ${example.gradient}`} />
        <div className="p-6">
          <Badge className={`mb-4 ${example.badgeClass}`}>
            {example.badge}
          </Badge>
          <div className="space-y-4">
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground font-bold mb-2">What They Received</p>
              <p className="text-foreground italic leading-relaxed">"{example.received}"</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground font-bold mb-2">Our Analysis</p>
              <p className="text-foreground leading-relaxed">{example.analysis}</p>
            </div>
            <div className="pt-4 border-t border-border/50">
              <p className="text-xs uppercase tracking-wider text-muted-foreground font-bold mb-2">Amount Saved</p>
              <p className="text-3xl font-black bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
                {example.saved}
              </p>
            </div>
          </div>
        </div>
      </div>
    </ScrollReveal>
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
    type: 'training' | 'scamshield';
    name: string;
    tier?: string;
    price?: number;
    features?: string[];
    duration?: string;
  } | null>(null);
  const [trainingTestimonials, setTrainingTestimonials] = useState<any[]>([]);
  const [isTestimonialsLoading, setIsTestimonialsLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState<{ src: string; title: string } | null>(null);
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
      type: 'training',
      name: plan.name,
      tier: plan.type,
      price: plan.priceNum,
      features: plan.features,
      duration: plan.duration
    });
    setTrainingPaymentOpen(true);
  }, []);

  const trainingHeroImages = PROFESSIONAL_HERO_IMAGES.training;

  const trainingPlans = [
    {
      name: "Group Class", type: "standard", price: "$79", priceNum: 79,
      duration: "90 min", size: "Up to 25", badge: "👥 GROUPS",
      badgeClass: "bg-blue-500/20 text-blue-700 border-blue-500/30",
      description: "Join others in a live online class. Learn to spot fake calls, emails, and texts.",
      features: ["✓ Live Zoom session", "✓ Ask questions anytime", "✓ Easy-to-follow handouts", "✓ Certificate included"],
    },
    {
      name: "Small Family Group", type: "family", price: "$149", priceNum: 149,
      duration: "90 min", size: "Up to 12", popular: true, badge: "⭐ BEST VALUE",
      badgeClass: "bg-primary/20 text-primary border-primary/30",
      description: "More personal attention for couples and close friends.",
      features: ["✓ Smaller, cozy setting", "✓ Time for your questions", "✓ Create a family safe word", "✓ Take-home action plan"],
    },
    {
      name: "Private Family Session", type: "private", price: "$399", priceNum: 399,
      duration: "2 hours", size: "5 Members", badge: "👑 PREMIUM",
      badgeClass: "bg-amber-500/20 text-amber-700 border-amber-500/30",
      description: "Parents, kids, grandparents. We come to you.",
      features: ["✓ Your family only (up to 5)", "✓ In-person or video call", "✓ Device safety check", "✓ 30 days of email help"],
    },
    {
      name: "Large Group Workshop", type: "custom", price: "$510", priceNum: 510,
      pricePrefix: "+", duration: "2-3 hours", size: "10-100+", badge: "🏢 ORGANIZATIONS",
      badgeClass: "bg-purple-500/20 text-purple-700 border-purple-500/30",
      description: "Churches, senior centers, and communities.",
      features: ["✓ We come to your location", "✓ Custom workshop for you", "✓ Certificates for everyone", "✓ Ongoing support included"],
    },
  ];

  const aiProPlans = [
    {
      name: "AI Automation", type: "automation", price: "$299", priceNum: 299,
      duration: "3 hours", size: "Individual", badge: "🔥 POPULAR",
      badgeClass: "bg-orange-500/20 text-orange-700 border-orange-500/30",
      description: "Master AI workflow automation with Make, Zapier, n8n, and custom API integrations.",
      features: ["Workflow automation mastery", "API integrations & webhooks", "ChatGPT/Claude integration", "Ready-to-use templates", "Email automation setup"],
    },
    {
      name: "AI Agency Building", type: "agency", price: "$499", priceNum: 499,
      duration: "5 hours", size: "Individual/Team", popular: true, badge: "⭐ BEST VALUE",
      badgeClass: "bg-primary/20 text-primary border-primary/30",
      description: "Build a profitable AI agency from scratch. Scale to 6 figures.",
      features: ["Complete business model", "Client acquisition system", "Service packaging & pricing", "Delivery frameworks", "Ongoing mentorship access"],
    },
    {
      name: "Web Design + AI", type: "webdesign", price: "$349", priceNum: 349,
      duration: "4 hours", size: "Individual", badge: "🎨 CREATIVE",
      badgeClass: "bg-cyan-500/20 text-cyan-700 border-cyan-500/30",
      description: "Create stunning websites using AI design tools.",
      features: ["AI design tool mastery", "Responsive layout design", "SEO & performance optimization", "Deployment & hosting", "Client handoff process"],
    },
    {
      name: "Project Troubleshoot", type: "troubleshoot", price: "$150", priceNum: 150,
      pricePrefix: "/hr", duration: "Flexible", size: "Per project", badge: "🛠 CONSULTING",
      badgeClass: "bg-green-500/20 text-green-700 border-green-500/30",
      description: "Expert help for your existing AI projects.",
      features: ["Expert code review", "Bug fixing & debugging", "Feature development", "Architecture consulting", "Performance optimization"],
    },
  ];

  const scamExamples = [
    { badge: "Grandparent Scam", badgeClass: "bg-red-500/20 text-red-700 border-red-500/30", gradient: "from-red-500 to-orange-500", received: "Hi grandma, I'm in jail and need bail money NOW", analysis: "Voice analysis showed AI generation. Number traced to known scam.", saved: "$8,000" },
    { badge: "Bank Phishing", badgeClass: "bg-blue-500/20 text-blue-700 border-blue-500/30", gradient: "from-blue-500 to-cyan-500", received: "Email that looked exactly like Chase Bank", analysis: "Domain was chase-secure-verify.com (fake). Classic phishing.", saved: "Entire savings" },
    { badge: "Tech Support Scam", badgeClass: "bg-orange-500/20 text-orange-700 border-orange-500/30", gradient: "from-orange-500 to-amber-500", received: "Microsoft called saying computer was hacked", analysis: "Microsoft never cold-calls. Verified fake tech support operation.", saved: "$2,500" },
    { badge: "Romance Scam", badgeClass: "bg-pink-500/20 text-pink-700 border-pink-500/30", gradient: "from-pink-500 to-rose-500", received: "Online love interest requested emergency funds", analysis: "Photos were stolen. Profile matched known scammer patterns.", saved: "$15,000" },
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
            "name": "InVision Network Training Academy",
            "description": "Comprehensive AI scam protection training for families, seniors, and businesses",
            "url": "https://invisionnetwork.org/training",
            "telephone": SITE.phone.e164,
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
            <div className="text-center md:text-left mb-6">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-3 glow-text">
                <RotatingHeadlines headlines={trainingHeadlines} className="" />
              </h1>
              <p className="text-lg md:text-xl text-white/90 max-w-3xl">
                Expert-led workshops & instant file scanning for families and seniors
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 flex-wrap justify-center md:justify-start">
              <Button
                onClick={() => document.getElementById('training')?.scrollIntoView({ behavior: 'smooth' })}
                size="lg"
                className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white border-0 shadow-xl text-base px-6 py-5"
              >
                <Shield className="w-5 h-5 mr-2" />
                Learn & Train Workshops
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-white/15 backdrop-blur-md text-white border-white/30 hover:bg-white/25 text-base px-6 py-5">
                <Link to="/training/ai-analysis">
                  <FileCheck className="w-5 h-5 mr-2" />
                  AI Analysis & Secure Scan
                </Link>
              </Button>
            </div>
          </Hero>
          <HeroFloatingStats />
        </div>

        {/* ══════════ SECTION 1: WHY FAMILIES TRUST US ══════════ */}
        <section className="py-16 relative">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <ScrollReveal>
                <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 text-sm px-4 py-1.5 rounded-full">
                  <Heart className="w-3.5 h-3.5 mr-1.5" />
                  TRUSTED BY 100+ FAMILIES
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Families Trust Us</h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  Clear teaching, privacy-first protocols, and real scripts your family can use in any emergency.
                </p>
              </ScrollReveal>
            </div>

            {/* Trust pillars - 4 clean white cards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-12">
              {TRUST_PILLARS.map((item, index) => (
                <ScrollReveal key={index} animation="fade-up" delay={index * 80}>
                  <div className="bg-card border border-border rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-all hover:-translate-y-1 h-full">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mx-auto mb-4`}>
                      <item.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            {/* Emergency Protocol + Identity Verification - 2 column */}
            <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              <ScrollReveal animation="fade-up">
                <div className="bg-card border border-border rounded-2xl p-8 shadow-sm h-full">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
                      <span className="text-2xl">🚨</span>
                    </div>
                    <h3 className="text-xl font-bold">60-Second Pause Protocol</h3>
                  </div>
                  <ol className="space-y-3">
                    {[
                      { step: "Stop immediately.", detail: "Hang up / stop replying. Take a breath." },
                      { step: "Verify independently.", detail: "Call back using the official number on your card." },
                      { step: "Use your safeword", detail: "with family before taking any action." },
                      { step: "Double-check money requests", detail: "with a second family member." },
                      { step: "Report and document", detail: "the attempt (we provide templates)." },
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="w-8 h-8 bg-gradient-to-br from-red-500 to-orange-500 text-white rounded-lg flex items-center justify-center font-bold text-sm flex-shrink-0">{idx + 1}</span>
                        <div className="text-sm">
                          <span className="font-bold">{item.step}</span>{" "}
                          <span className="text-muted-foreground">{item.detail}</span>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </ScrollReveal>

              <ScrollReveal animation="fade-up" delay={100}>
                <div className="bg-card border border-border rounded-2xl p-8 shadow-sm h-full">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                      <Search className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold">Identity Verification Script</h3>
                  </div>
                  <ul className="space-y-3">
                    {[
                      { action: "Demand specifics:", detail: "Full name, department, callback number, case number." },
                      { action: "Always say:", detail: '"I\'ll call you back through the main line."' },
                      { action: "Never share:", detail: "Codes, passwords, or download any software." },
                      { action: "Forward suspicious items", detail: "to our help line for expert review." },
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0">
                          <CheckCircle className="w-4 h-4 text-white" />
                        </div>
                        <div className="text-sm">
                          <span className="font-bold">{item.action}</span>{" "}
                          <span className="text-muted-foreground">{item.detail}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* ══════════ SECTION 2: HOW IT WORKS - 3 Clean Cards ══════════ */}
        <section id="book" className="py-16 bg-muted/30 relative">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <ScrollReveal>
                <Badge className="mb-4 bg-emerald-500/10 text-emerald-700 border-emerald-500/20 text-sm px-4 py-1.5 rounded-full">
                  <Target className="w-3.5 h-3.5 mr-1.5" />
                  GETTING STARTED
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  Three simple steps to build calm, repeatable safety habits.
                </p>
              </ScrollReveal>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                { step: "01", icon: Calendar, title: "Book Your Session", desc: "Choose a convenient Zoom class time, request a Priority Group session, or schedule private in-person coaching.", color: "from-blue-500 to-cyan-500" },
                { step: "02", icon: GraduationCap, title: "Learn & Practice", desc: "Master identity verification, spot deepfakes, and handle urgent messages with confidence.", color: "from-purple-500 to-pink-500" },
                { step: "03", icon: Shield, title: "Get Ongoing Support", desc: "Add our monthly help line to forward suspicious messages for expert review.", color: "from-emerald-500 to-teal-500" },
              ].map((item, index) => (
                <ScrollReveal key={index} animation="fade-up" delay={index * 100}>
                  <div className="relative bg-card border border-border rounded-2xl p-8 text-center shadow-sm hover:shadow-md transition-all hover:-translate-y-1 h-full">
                    <div className={`absolute top-4 right-4 w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center`}>
                      <span className="text-white font-bold text-sm">{item.step}</span>
                    </div>
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mx-auto mb-5`}>
                      <item.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            {/* Progress connector */}
            <div className="hidden lg:flex justify-center items-center mt-10">
              <div className="flex items-center gap-4">
                {[1, 2].map((_, i) => (
                  <div key={i} className="flex items-center">
                    <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent rounded-full" />
                    <div className="w-4 h-4 rounded-full bg-gradient-to-r from-primary to-accent" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══════════ SECTION 3: SCAM PREVENTION WORKSHOPS ══════════ */}
        <section id="training" className="py-16 relative">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <ScrollReveal>
                <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 text-sm px-4 py-1.5 rounded-full">
                  <Shield className="w-3.5 h-3.5 mr-1.5" />
                  PROTECTING FAMILIES TOGETHER
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Scam Prevention Workshops</h2>
                <p className="text-lg text-foreground max-w-4xl mx-auto mb-2">
                  With the rise of AI, scammers have become more sophisticated than ever.
                </p>
                <p className="text-muted-foreground max-w-3xl mx-auto">
                  Simple, friendly classes. No tech skills needed. Perfect for seniors, parents, and grandparents.
                </p>
              </ScrollReveal>
            </div>

            {/* Veterans banner */}
            <ScrollReveal>
              <div className="flex justify-center mb-10">
                <div className="inline-flex items-center gap-3 px-6 py-3 bg-card border border-border rounded-2xl shadow-sm">
                  <span className="text-2xl">🇺🇸</span>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="font-bold">Veterans & First Responders Save 10%</span>
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  </div>
                  <span className="text-sm text-muted-foreground">· Applied at checkout</span>
                </div>
              </div>
            </ScrollReveal>

            <div id="pricing" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[1400px] mx-auto">
              {trainingPlans.map((plan, index) => (
                <PremiumTrainingCard key={index} plan={plan} index={index} onBook={handleBookTraining} />
              ))}
            </div>
          </div>
        </section>

        {/* Instructor Showcase */}
        <InstructorShowcase />

        {/* ══════════ SECTION 4: SIMPLE PROTECTION IN 4 STEPS ══════════ */}
        <section className="py-16 bg-muted/30 relative">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <ScrollReveal>
                <Badge className="mb-4 bg-accent/10 text-accent border-accent/20 text-sm px-4 py-1.5 rounded-full">
                  <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                  EASY AS 1-2-3-4
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple Protection in 4 Steps</h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  Our process is designed to be effortless. Just forward it to us.
                </p>
              </ScrollReveal>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {[
                { step: "01", icon: Eye, title: "Something Suspicious", subtitle: "Spot it", desc: "You receive a suspicious email, text, call, or link that doesn't feel right.", color: "from-red-500 to-orange-500", subtitleColor: "text-red-500" },
                { step: "02", icon: Forward, title: "Forward to Us", subtitle: "Send it", desc: "Simply forward the message, screenshot, or file to our secure analysis line.", color: "from-blue-500 to-pink-500", subtitleColor: "text-blue-500" },
                { step: "03", icon: Search, title: "Expert Analysis", subtitle: "We check it", desc: "Our AI and human experts analyze the threat and verify authenticity.", color: "from-teal-500 to-cyan-500", subtitleColor: "text-teal-500" },
                { step: "04", icon: Shield, title: "Clear Guidance", subtitle: "You're safe", desc: "You get a clear, simple answer: safe or dangerous, with next steps.", color: "from-emerald-500 to-green-500", subtitleColor: "text-emerald-500" },
              ].map((item, index) => (
                <ScrollReveal key={index} animation="fade-up" delay={index * 80}>
                  <div className="relative bg-card border border-border rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-all hover:-translate-y-1 h-full">
                    <div className={`absolute top-4 right-4 w-9 h-9 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center`}>
                      <span className="text-white font-bold text-xs">{item.step}</span>
                    </div>
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mx-auto mb-4`}>
                      <item.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-lg font-bold mb-1">{item.title}</h3>
                    <p className={`text-sm font-semibold mb-3 ${item.subtitleColor}`}>{item.subtitle}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════ SECTION 5: THREAT ANALYSIS ══════════ */}
        <section className="py-16 relative">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <ScrollReveal>
                <Badge className="mb-4 bg-accent/10 text-accent border-accent/20 text-sm px-4 py-1.5 rounded-full">
                  <Shield className="w-3.5 h-3.5 mr-1.5" />
                  COMPREHENSIVE PROTECTION
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">We Analyze All Types of Threats</h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  Click on any threat type to learn how we protect you.
                </p>
              </ScrollReveal>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
              {[
                { icon: Mail, title: "Phishing Emails", color: "from-red-500 to-orange-500", description: "Forward suspicious emails for analysis. We check sender authenticity, analyze links, and identify fake logos." },
                { icon: MessageSquare, title: "SMS Scams", color: "from-blue-500 to-cyan-500", description: "Screenshot suspicious texts. We trace senders and verify if messages are legitimate." },
                { icon: Phone, title: "Voice Calls", color: "from-purple-500 to-pink-500", description: "Describe suspicious calls. We identify voice scam patterns and AI-generated voices." },
                { icon: FileText, title: "Voice Messages", color: "from-amber-500 to-orange-500", description: "Send voicemails for AI analysis. We detect voice cloning and verify authenticity." },
                { icon: LinkIcon, title: "Suspicious Links", color: "from-green-500 to-emerald-500", description: "Send links before clicking. We safely scan for malware and verify destinations." },
                { icon: QrCode, title: "QR Codes", color: "from-cyan-500 to-blue-500", description: "Photo us QR codes. We decode them safely and tell you where they lead." },
                { icon: FileCheck, title: "Documents", color: "from-pink-500 to-rose-500", description: "Upload suspicious PDFs. We check for malware and fake information." },
                { icon: ImageIcon, title: "Social Media", color: "from-violet-500 to-purple-500", description: "Screenshot fake profiles. We verify authenticity and identify scam patterns." },
              ].map((threat, index) => (
                <ScrollReveal key={index} animation="fade-up" delay={index * 50}>
                  <div
                    onClick={() => setExpandedThreat(expandedThreat === threat.title ? null : threat.title)}
                    className={`cursor-pointer bg-card border rounded-2xl p-5 transition-all hover:-translate-y-1 shadow-sm hover:shadow-md ${
                      expandedThreat === threat.title ? 'border-primary shadow-md' : 'border-border'
                    }`}
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${threat.color} flex items-center justify-center mb-3`}>
                        <threat.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="font-bold text-sm mb-1">{threat.title}</h3>
                      <p className="text-xs text-muted-foreground">Click to learn more</p>
                    </div>
                    {expandedThreat === threat.title && (
                      <div className="mt-3 pt-3 border-t border-border/50">
                        <p className="text-xs text-foreground leading-relaxed">{threat.description}</p>
                        <div className="mt-2 flex items-center justify-center gap-1 text-primary">
                          <span className="text-xs font-bold">Forward to us!</span>
                          <CheckCircle className="w-3 h-3" />
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════ SECTION 6: AI PROFESSIONAL TRAINING ══════════ */}
        <section id="ai-pro-training" className="py-16 bg-muted/30 relative">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <ScrollReveal>
                <Badge className="mb-4 bg-purple-500/10 text-purple-700 border-purple-500/20 text-sm px-4 py-1.5 rounded-full">
                  <Zap className="w-3.5 h-3.5 mr-1.5" />
                  FOR PROFESSIONALS & ENTREPRENEURS
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">AI Professional Training</h2>
                <p className="text-lg text-foreground max-w-4xl mx-auto mb-2">
                  <strong>The only place where you can get the best AI training.</strong> Build an AI agency, create automation workflows, or design stunning websites.
                </p>
                <p className="text-accent font-semibold">
                  🚀 Perfect for entrepreneurs, developers, and marketers ready to leverage AI.
                </p>
              </ScrollReveal>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[1400px] mx-auto">
              {aiProPlans.map((plan, index) => (
                <PremiumTrainingCard key={index} plan={plan} index={index} onBook={handleBookTraining} />
              ))}
            </div>

            <ScrollReveal>
              <div className="text-center mt-10">
                <div className="inline-flex items-center gap-3 bg-card border border-border rounded-2xl px-6 py-3 shadow-sm">
                  <Lock className="w-4 h-4 text-primary" />
                  <p className="text-sm text-muted-foreground">
                    💳 Secure payment required · 10% veteran discount available
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Veterans Discount Strip */}
        <section className="py-6 bg-card border-y border-border">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center justify-center gap-4 text-lg">
              <span className="text-2xl">🇺🇸</span>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                <span className="font-bold">Veterans & First Responders: 10% OFF</span>
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              </div>
              <span className="text-sm text-muted-foreground">Military, Police, Fire, EMT</span>
            </div>
          </div>
        </section>

        {/* ══════════ SECTION 7: SECURE YOUR FAMILY ══════════ */}
        <section className="py-16 relative">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <ScrollReveal>
                <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 text-sm px-4 py-1.5 rounded-full">
                  <Lock className="w-3.5 h-3.5 mr-1.5" />
                  FAMILY PROTECTION
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Secure Your Family</h2>
                <p className="text-lg text-foreground max-w-3xl mx-auto">
                  <strong>AI-powered scammers don't just target you.</strong> They target your entire family.
                </p>
              </ScrollReveal>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto mb-12">
              <ScrollReveal animation="fade-up">
                <div className="bg-card border border-border rounded-2xl p-8 shadow-sm h-full">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
                      <span className="text-2xl">⚠️</span>
                    </div>
                    <h3 className="text-xl font-bold text-red-600">Without Protection</h3>
                  </div>
                  <ul className="space-y-3">
                    {[
                      "Scammers can impersonate grandchildren using AI voice cloning",
                      "One family member clicking a bad link can compromise everyone",
                      "You may lose life savings to fake emergencies",
                      "Personal documents and identity could be stolen"
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm">
                        <span className="text-red-500 text-lg mt-0.5">✗</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>

              <ScrollReveal animation="fade-up" delay={100}>
                <div className="bg-card border border-border rounded-2xl p-8 shadow-sm h-full">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                      <Shield className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-emerald-600">With InVision Protection</h3>
                  </div>
                  <ul className="space-y-3">
                    {[
                      "Family safe words to verify real emergencies instantly",
                      "24/7 expert analysis. Just forward anything suspicious",
                      "Proactive alerts when new scam patterns emerge",
                      "Secure vault for important family documents"
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm">
                        <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            </div>

            {/* Family Safety Vault */}
            <ScrollReveal>
              <div className="max-w-4xl mx-auto bg-card border border-border rounded-2xl p-8 md:p-10 shadow-sm">
                <div className="text-center">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-5 border-4 border-background">
                    <Lock className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Family Safety Vault</h3>
                  <p className="text-muted-foreground mb-6">Included with Family & Premium Plans</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-2xl mx-auto">
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
                        <span className="font-medium text-sm">{item.feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ══════════ SECTION 8: SCAMS WE'VE CAUGHT ══════════ */}
        <section className="py-16 bg-muted/30 relative">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <ScrollReveal>
                <Badge className="mb-4 bg-emerald-500/10 text-emerald-700 border-emerald-500/20 text-sm px-4 py-1.5 rounded-full">
                  <TrendingUp className="w-3.5 h-3.5 mr-1.5" />
                  SUCCESS STORIES
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Scams We've Caught</h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  Real examples of how we've protected our members from devastating losses.
                </p>
              </ScrollReveal>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
              {scamExamples.map((example, index) => (
                <ScamExampleCard key={index} example={example} index={index} />
              ))}
            </div>

            {isAdmin && (
              <div className="mt-12">
                <h3 className="text-xl font-bold text-center mb-6">Video Testimonials</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="p-6 text-center border-2 border-dashed border-primary/30 hover:border-primary/50 transition-all rounded-2xl bg-card">
                      <div className="aspect-video bg-muted/30 rounded-xl mb-4 flex flex-col items-center justify-center gap-3">
                        <Video className="w-12 h-12 text-primary/50" />
                        <p className="text-sm font-semibold text-muted-foreground">Upload Success Stories</p>
                      </div>
                      <Button variant="default" size="sm" className="w-full">
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
          <section className="py-16">
            <div className="container mx-auto px-4">
              <ScrollReveal>
                <h2 className="text-3xl font-bold text-center mb-3">Workshop Success Stories</h2>
                <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
                  Hear from families who have completed our workshops
                </p>
              </ScrollReveal>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {trainingTestimonials.map((testimonial) => {
                  const videoMedia = testimonial.testimonial_media?.find((m: any) => m.media_type === "video");
                  return (
                    <TestimonialCard
                      key={testimonial.id}
                      name={testimonial.name}
                      location={testimonial.location}
                      quote={testimonial.story}
                      image={videoMedia?.thumbnail_url || '/placeholder.svg'}
                      rating={testimonial.rating}
                      videoUrl={videoMedia?.file_url}
                      onVideoClick={() => videoMedia && setSelectedVideo({ src: videoMedia.file_url, title: `${testimonial.name}'s Story` })}
                    />
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* ══════════ FINAL CTA ══════════ */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${seniorCouple})` }} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/60" />
          <div className="container mx-auto px-4 relative z-10 text-center">
            <ScrollReveal>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-5" style={{ textShadow: '2px 2px 10px rgba(0,0,0,0.6)' }}>
                Sleep Better Tonight
              </h2>
              <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto" style={{ textShadow: '1px 1px 5px rgba(0,0,0,0.5)' }}>
                Join 100+ families who trust InVision Network for their digital safety
              </p>
              <div className="flex flex-col sm:flex-row gap-4 flex-wrap justify-center">
                <Button
                  onClick={() => document.getElementById('training')?.scrollIntoView({ behavior: 'smooth' })}
                  size="lg"
                  className="bg-gradient-to-r from-primary to-accent hover:shadow-xl text-white px-8 py-6 text-lg rounded-2xl"
                >
                  Get Started
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button asChild size="lg" variant="outline" className="bg-white/10 backdrop-blur-md text-white border-white/30 hover:bg-white/20 px-8 py-6 text-lg rounded-2xl">
                  <Link to="/contact">
                    <Headphones className="w-5 h-5 mr-2" />
                    Talk to an Expert
                  </Link>
                </Button>
              </div>
            </ScrollReveal>
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

        {selectedService && selectedService.type === 'training' && (
          <TrainingPaymentModal
            open={trainingPaymentOpen}
            onOpenChange={setTrainingPaymentOpen}
            serviceName={selectedService.name}
            serviceType={selectedService.type}
            serviceTier={selectedService.tier}
            basePrice={selectedService.price || 0}
            features={selectedService.features}
            duration={selectedService.duration}
            onSuccess={() => { trackConversion('training_booking', selectedService.price || 0); }}
          />
        )}

        {selectedService && selectedService.type !== 'training' && (
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
            onSuccess={() => { trackConversion('subscription', embeddedPaymentConfig.amount / 100); }}
          />
        )}
      </div>
    </PageTransition>
  );
}

export default LearnAndTrain;
