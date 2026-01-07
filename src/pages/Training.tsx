import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { BookingModal } from "@/components/BookingModal";
import { EmbeddedPaymentModal } from "@/components/payment/EmbeddedPaymentModal";
import { TrainingPaymentModal } from "@/components/TrainingPaymentModal";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import CTASection from "@/components/CTASection";
import FlowingWaves from "@/components/FlowingWaves";
import { PageTransition } from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ScrollReveal } from "@/components/ScrollReveal";
import { useCounterAnimation } from "@/hooks/useCounterAnimation";
import { useAdminStatus } from "@/hooks/useAdminStatus";
import { useCheckout } from "@/contexts/CheckoutContext";
import { supabase } from "@/integrations/supabase/client";
import { trackButtonClick, trackConversion } from "@/utils/analyticsTracker";
import { SCAMSHIELD_PLANS } from "@/config/products";
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
  Loader2,
  Video,
  Zap,
  Star,
} from "lucide-react";
import { natureWinter3 } from "@/config/natureHeroImages";
import { PROFESSIONAL_HERO_IMAGES } from "@/config/professionalHeroImages";
import TestimonialCard from "@/components/TestimonialCard";
import { VideoLightbox } from "@/components/VideoLightbox";
import { SEO } from "@/components/SEO";
import { RotatingHeadlines } from "@/components/shared/RotatingHeadlines";
import HeroFloatingStats from "@/components/business/HeroFloatingStats";
import heroVault from "@/assets/hero-vault-1.jpg";

// Rotating hero headlines for Training page
const trainingHeadlines = [
  "Learn How to Recognize and Stop Scams",
  "Professional Safety Workshops 24/7",
  "Protection Services for Real-World Safety"
];

function ResponseTimeCallout() {
  const { count: standardCount, ref: standardRef } = useCounterAnimation({ 
    end: 24, 
    start: 48, 
    duration: 1500 
  });
  
  const { count: premiumCount, ref: premiumRef } = useCounterAnimation({ 
    end: 4, 
    start: 24, 
    duration: 1500 
  });

  return (
    <div 
      ref={standardRef as any}
      className="mt-4 p-4 bg-gradient-to-r from-[#14B8A6] to-[#0F9A8A] rounded-lg text-white"
    >
      <div className="flex items-center gap-3">
        <span 
          className="text-2xl animate-[clock-rotate_1s_ease-in-out_0.5s]"
          style={{ display: 'inline-block' }}
        >
          ⏱️
        </span>
        <div className="flex-1 text-sm font-semibold">
          <div>
            Response time: <span className="text-lg font-bold" ref={premiumRef as any}>{Math.round(standardCount)}</span> hours
          </div>
          <div className="text-white/90 text-xs mt-1">
            Premium: <span className="text-base font-bold">{Math.round(premiumCount)}</span> hours
          </div>
        </div>
      </div>
    </div>
  );
};

const ScamExampleCard = ({ example, index }: { example: any; index: number }) => {
  const savedAmount = example.saved.replace(/[^0-9]/g, '');
  const isNumeric = savedAmount !== '';
  
  const { count, ref } = useCounterAnimation({ 
    end: isNumeric ? parseInt(savedAmount) : 0, 
    duration: 2000 
  });

  const getBadgeColor = (badge: string) => {
    const colors: Record<string, string> = {
      "Grandparent Scam": "bg-red-500/20 text-red-700 border border-red-500/30",
      "Bank Phishing": "bg-blue-500/20 text-blue-700 border border-blue-500/30",
      "Tech Support Scam": "bg-orange-500/20 text-orange-700 border border-orange-500/30",
      "Romance Scam": "bg-pink-500/20 text-pink-700 border border-pink-500/30",
    };
    return colors[badge] || "bg-accent/20 text-accent-foreground border border-accent/30";
  };

  return (
    <ScrollReveal animation="scale-in" delay={index * 100} threshold={0.2}>
      <Card
        className="p-5 md:p-6 hover:shadow-strong transition-all duration-500 hover:-translate-y-1 rounded-xl border-border/50 bg-gradient-to-br from-card to-card/50 h-full min-h-[280px] flex flex-col"
      >
        <div className="mb-4">
          <span className={`text-sm font-bold px-3 py-1.5 rounded-full ${getBadgeColor(example.badge)}`}>
            {example.badge}
          </span>
        </div>
        <div className="space-y-4 flex-1">
          <div>
            <p className="text-sm md:text-base font-bold text-muted-foreground mb-2">WHAT THEY RECEIVED:</p>
            <p className="text-foreground text-base md:text-lg italic leading-relaxed">{example.received}</p>
          </div>
          <div>
            <p className="text-sm md:text-base font-bold text-muted-foreground mb-2">OUR ANALYSIS:</p>
            <p className="text-foreground text-base md:text-lg leading-relaxed">{example.analysis}</p>
          </div>
          <div ref={ref as any}>
            <p className="text-sm md:text-base font-bold text-muted-foreground mb-2">SAVED:</p>
            {isNumeric ? (
              <p className="text-2xl md:text-3xl font-bold text-success">
                <span className="inline-block animate-[dollar-scale_2s_ease-out]">$</span>
                {Math.round(count).toLocaleString()}
              </p>
            ) : (
              <p className="text-2xl md:text-3xl font-bold text-success">{example.saved}</p>
            )}
          </div>
        </div>
      </Card>
    </ScrollReveal>
  );
};

const TrainingCard = ({ plan, index, onBook }: { plan: any; index: number; onBook: (plan: any) => void }) => {
  const { count, ref } = useCounterAnimation({ end: plan.priceNum, duration: 1000 });
  
  const getBadgeInfo = (type: string) => {
    const badges: Record<string, { label: string; emoji: string; gradient: string }> = {
      standard: { label: "COUPLES & GROUPS", emoji: "👥", gradient: "from-blue-500 to-cyan-500" },
      family: { label: "BEST VALUE", emoji: "⭐", gradient: "from-primary to-accent" },
      private: { label: "PREMIUM", emoji: "👑", gradient: "from-amber-500 to-orange-500" },
      custom: { label: "ORGANIZATIONS", emoji: "🏢", gradient: "from-purple-500 to-pink-500" }
    };
    return badges[type] || badges.standard;
  };

  const badge = getBadgeInfo(plan.type);
  
  return (
    <ScrollReveal 
      animation="scale-in" 
      delay={index * 100}
      threshold={0.2}
    >
      <div className="relative pt-6 h-full">
        {/* Badge - On top of card, outside */}
        <div className={`absolute -top-0 left-1/2 -translate-x-1/2 bg-gradient-to-r ${badge.gradient} text-white px-6 py-2.5 rounded-full text-sm font-bold tracking-wide shadow-xl z-30 whitespace-nowrap border-2 border-white/20`}>
          <span className="mr-1.5">{badge.emoji}</span>
          {badge.label}
        </div>
        
        <Card className={`relative p-6 md:p-8 flex flex-col transition-all duration-300 hover:-translate-y-2 rounded-2xl bg-gradient-to-br from-card to-card/50 h-[560px] ${
          plan.popular 
            ? "border-primary border-2 shadow-xl" 
            : "border-border/50 hover:shadow-lg"
        }`}>
          <div className="pt-4 flex flex-col h-full">
            <h3 className="text-xl md:text-2xl font-bold mb-3 text-center">{plan.name}</h3>
            <div className="text-center mb-3" ref={ref}>
              <span className="text-4xl md:text-5xl font-bold text-primary">${Math.round(count)}{plan.pricePrefix || ''}</span>
              <span className="text-muted-foreground text-base ml-1">/session</span>
            </div>
            <p className="text-center text-base text-muted-foreground mb-1">{plan.duration}</p>
            <p className="text-center text-base text-accent font-semibold mb-4">{plan.size}</p>
            
            {/* Description - Single line friendly */}
            <p className="text-center text-base text-muted-foreground mb-5 min-h-[48px] leading-relaxed">
              {plan.description}
            </p>

            <div className="space-y-3 mb-5 flex-1">
              {plan.features.slice(0, 4).map((feature: string, idx: number) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-foreground text-base whitespace-nowrap">{feature}</span>
                </div>
              ))}
            </div>

            <Button 
              onClick={() => onBook(plan)}
              variant={plan.popular ? "default" : "outline"} 
              size="lg" 
              className={`w-full mt-auto text-lg py-6 ${plan.popular ? 'bg-primary hover:bg-primary/90 text-primary-foreground' : ''}`}
            >
              Book & Pay Now →
            </Button>
          </div>
        </Card>
      </div>
    </ScrollReveal>
  );
}

function LearnAndTrain() {
  const [modalOpen, setModalOpen] = useState(false);
  const [trainingPaymentOpen, setTrainingPaymentOpen] = useState(false);
  const [subscriptionDialogOpen, setSubscriptionDialogOpen] = useState(false);
  const [embeddedPaymentOpen, setEmbeddedPaymentOpen] = useState(false);
  const [embeddedPaymentConfig, setEmbeddedPaymentConfig] = useState<{
    mode: "subscription" | "payment";
    priceId: string;
    productName: string;
    amount: number;
    description?: string;
    features?: string[];
  } | null>(null);
  const [selectedSubscription, setSelectedSubscription] = useState<{
    priceId: string;
    serviceName: string;
    planTier: string;
    amount: number;
  } | null>(null);
  const [isYearly, setIsYearly] = useState(false);
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
  const [selectedVideo, setSelectedVideo] = useState<{ src: string; title: string } | null>(null);
  const [expandedThreat, setExpandedThreat] = useState<string | null>(null);

  useEffect(() => {
    fetchTrainingTestimonials();
  }, []);

  const fetchTrainingTestimonials = async () => {
    const { data } = await supabase
      .from("testimonials_public")
      .select(`
        *,
        testimonial_media (*)
      `)
      .eq("has_video", true)
      .order("created_at", { ascending: false })
      .limit(3);
    
    setTrainingTestimonials(data || []);
  };


  const getPlanPrice = (monthlyPrice: number) => {
    if (isYearly) {
      const yearlyPrice = monthlyPrice * 12 * 0.95; // 5% discount
      return {
        display: `$${Math.round(yearlyPrice)}`,
        period: '/year',
        savings: `Save 5% ($${Math.round(monthlyPrice * 12 - yearlyPrice)}/year)`
      };
    }
    return {
      display: `$${monthlyPrice}`,
      period: '/month',
      savings: ''
    };
  };

  const handleSubscribe = (priceId: string, serviceName: string, planTier: string, amount: number, features?: string[]) => {
    trackButtonClick(`Subscribe ${planTier} Plan`, 'Training Page');
    // Use embedded payment modal for ScamShield subscriptions
    setEmbeddedPaymentConfig({
      mode: "subscription",
      priceId,
      productName: `ScamShield ${planTier} Plan`,
      amount,
      description: `${serviceName} - Monthly subscription`,
      features
    });
    setEmbeddedPaymentOpen(true);
  };

  const trainingHeroImages = PROFESSIONAL_HERO_IMAGES.training;

  return (
    <PageTransition variant="fade">
      <div className="min-h-screen">
        <SEO 
          title="AI Scam Protection Training"
          description="Comprehensive AI scam protection training for families and seniors. Learn to spot deepfakes, phishing, and AI-powered scams. Zoom and in-person classes available in Dayton, Ohio."
          keywords="AI scam training, deepfake detection training, senior cybersecurity, phishing awareness, family safety training, Dayton Ohio"
          structuredData={{
            "@context": "https://schema.org",
            "@type": "EducationalOrganization",
            "name": "InVision Network Training Academy",
            "description": "Comprehensive AI scam protection training for families, seniors, and businesses",
            "url": "https://invisionnetwork.com/training",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Dayton",
              "addressRegion": "OH",
              "addressCountry": "US"
            },
            "telephone": "(937) 301-8749",
            "offers": [
              {
                "@type": "Offer",
                "name": "Individual Training Session",
                "price": "89",
                "priceCurrency": "USD",
                "description": "1-hour personalized AI scam protection training"
              },
              {
                "@type": "Offer",
                "name": "Enterprise Training Program",
                "price": "599",
                "priceCurrency": "USD",
                "description": "Comprehensive team training with ongoing support"
              }
            ]
          }}
        />
        <Navigation />

      {/* Hero Section with wrapper for floating stats */}
      <div className="relative">
        <Hero
          backgroundImages={trainingHeroImages}
          headline=""
          subheadline=""
          showScrollIndicator={true}
        >
          <div className="text-center md:text-left mb-8">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              <RotatingHeadlines headlines={trainingHeadlines} className="" />
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-white/90 max-w-4xl">
              Expert-led training and 24/7 protection services designed for families and seniors
            </p>
          </div>

          {/* Distinct CTA Buttons with Visual Separation */}
          <div className="flex flex-col sm:flex-row gap-6 flex-wrap justify-center md:justify-start">
            {/* Learn & Train Workshops - Primary Featured */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-xl blur-md opacity-75 group-hover:opacity-100 transition-opacity duration-300" />
              <Button 
                onClick={() => {
                  document.getElementById('training')?.scrollIntoView({ behavior: 'smooth' });
                }}
                size="xl" 
                className="relative w-full sm:w-auto bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white border-0 shadow-xl text-lg md:text-xl px-8 py-6"
              >
                <Shield className="w-6 h-6 mr-2" />
                Learn & Train Workshops
              </Button>
            </div>
            
            {/* AI & Business Solutions - Secondary Style */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 via-primary to-accent rounded-xl blur-md opacity-50 group-hover:opacity-75 transition-opacity duration-300" />
              <Button 
                asChild
                size="xl" 
                className="relative w-full sm:w-auto bg-gradient-to-r from-purple-600 to-primary hover:from-purple-500 hover:to-primary/90 text-white border-0 shadow-xl text-lg md:text-xl px-8 py-6"
              >
                <Link to="/business">
                  <Zap className="w-6 h-6 mr-2" />
                  AI & Business Solutions
                </Link>
              </Button>
            </div>
          </div>

          {/* Decorative floating graphics */}
          <div className="hidden lg:flex gap-8 mt-8">
            <div className="flex items-center gap-3 bg-white/20 backdrop-blur-md rounded-full px-6 py-3 border-2 border-white/40 shadow-lg">
              <Shield className="w-7 h-7 text-emerald-300" />
              <span className="text-white text-lg font-bold">Family Protection</span>
            </div>
            <div className="flex items-center gap-3 bg-white/20 backdrop-blur-md rounded-full px-6 py-3 border-2 border-white/40 shadow-lg">
              <Users className="w-7 h-7 text-cyan-300" />
              <span className="text-white text-lg font-bold">Expert-Led Training</span>
            </div>
            <div className="flex items-center gap-3 bg-white/20 backdrop-blur-md rounded-full px-6 py-3 border-2 border-white/40 shadow-lg">
              <Award className="w-7 h-7 text-amber-300" />
              <span className="text-white text-lg font-bold">24/7 Support</span>
            </div>
          </div>
        </Hero>
        
        {/* Floating Stats Bar - Outside Hero to stay static */}
        <HeroFloatingStats />
      </div>

      {/* Spacer for floating stats bar */}
      <div className="h-12" />

      {/* Why Families Trust InVision Network Section */}
      <section className="py-16 bg-muted relative overflow-hidden">
        <FlowingWaves variant="full" opacity={0.08} />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-10">
            <Badge className="mb-4 bg-gradient-to-r from-primary to-accent text-white text-base md:text-lg px-5 py-2">
              <Shield className="w-5 h-5 mr-1.5" /> TRUSTED BY FAMILIES
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-5">Why Families Trust InVision Network</h2>
            <p className="text-lg md:text-xl lg:text-2xl text-foreground max-w-3xl mx-auto leading-relaxed">
              Clear teaching, privacy-first protocols, and real scripts your family can use in any emergency situation.
            </p>
          </div>

          {/* Trust Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-12">
            {[
              {
                icon: "📚",
                title: "Clear, Respectful Teaching",
                desc: "Senior-friendly pace, real-world examples, no jargon. We explain everything step-by-step."
              },
              {
                icon: "🔒",
                title: "Privacy-First Guarantee",
                desc: "We never ask for passwords, OTPs, or banking information. Your data stays private."
              },
              {
                icon: "📋",
                title: "Actionable Playbooks",
                desc: "Ready-to-use scripts for bank, IRS, romance, and tech-support scam scenarios."
              },
              {
                icon: "🏆",
                title: "Industry-Leading Expertise",
                desc: "Years of experience defending seniors against the latest AI-enabled fraud techniques."
              },
            ].map((item, index) => (
              <ScrollReveal key={index} animation="scale-in" delay={index * 100}>
                <Card className="p-6 md:p-8 h-full bg-gradient-to-br from-card to-card/50 border-border/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 rounded-xl min-h-[280px]">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-5">
                      <span className="text-3xl">{item.icon}</span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold mb-3">{item.title}</h3>
                    <p className="text-base md:text-lg text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </Card>
              </ScrollReveal>
            ))}
          </div>

          {/* Emergency Protocol & Verification Script */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Emergency Pause Protocol */}
            <Card className="p-6 md:p-8 bg-gradient-to-br from-red-500/5 to-orange-500/5 border-red-500/20 rounded-xl">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-14 h-14 bg-red-500/10 rounded-lg flex items-center justify-center">
                  <span className="text-3xl">🚨</span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold">Emergency? Use the 60-Second Pause Protocol</h3>
              </div>
              <ol className="space-y-4">
                {[
                  { step: "Stop immediately.", detail: "Hang up / stop replying. Take a breath." },
                  { step: "Verify independently.", detail: "Call back using the official number on your card." },
                  { step: "Use your safeword", detail: "with family before taking any action." },
                  { step: "Double-check money requests", detail: "with a second family member." },
                  { step: "Report and document", detail: "the attempt (we provide templates)." },
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-4">
                    <span className="w-8 h-8 bg-red-500/20 text-red-600 dark:text-red-400 rounded-full flex items-center justify-center text-base font-bold flex-shrink-0">{idx + 1}</span>
                    <div>
                      <span className="font-bold text-foreground text-lg">{item.step}</span>{" "}
                      <span className="text-muted-foreground text-base">{item.detail}</span>
                    </div>
                  </li>
                ))}
              </ol>
            </Card>

            {/* Identity Verification Script */}
            <Card className="p-6 md:p-8 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 border-blue-500/20 rounded-xl">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-14 h-14 bg-blue-500/10 rounded-lg flex items-center justify-center">
                  <span className="text-3xl">🔍</span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold">Identity Verification Script</h3>
              </div>
              <ul className="space-y-4">
                {[
                  { action: "Demand specifics:", detail: "Full name, department, callback number, case number." },
                  { action: "Always say:", detail: "\"I'll call you back through the main line.\"" },
                  { action: "Never share:", detail: "Codes, passwords, or download any software." },
                  { action: "Forward suspicious items", detail: "to our help line for expert review." },
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-blue-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-foreground text-lg">{item.action}</span>{" "}
                      <span className="text-muted-foreground text-base">{item.detail}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          {/* Getting Started - How It Works */}
          <div className="max-w-5xl mx-auto mt-16">
            <div className="text-center mb-10">
              <Badge className="mb-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-base md:text-lg px-5 py-2">
                GETTING STARTED
              </Badge>
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">How It Works</h3>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">Three simple steps to build calm, repeatable safety habits that protect you and your family.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: "1",
                  icon: "📅",
                  title: "Book Your Session",
                  desc: "Choose a convenient Zoom class time, request a Priority Group session, or schedule private in-person coaching."
                },
                {
                  step: "2",
                  icon: "🎓",
                  title: "Learn & Practice",
                  desc: "Master identity verification, spot deepfakes, and handle urgent messages with confidence through hands-on practice."
                },
                {
                  step: "3",
                  icon: "🛡️",
                  title: "Get Ongoing Support",
                  desc: "Add our monthly help line to forward suspicious messages for expert review before you click, pay, or reply."
                },
              ].map((item, index) => (
                <ScrollReveal key={index} animation="scale-in" delay={index * 150}>
                  <Card className="p-8 md:p-10 bg-gradient-to-br from-card to-card/50 border-border/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 rounded-xl text-center relative overflow-hidden h-[380px] flex flex-col">
                    <div className="absolute -top-2 -right-2 w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-bl-2xl flex items-center justify-center">
                      <span className="text-white font-bold text-xl">{item.step}</span>
                    </div>
                    <div className="w-24 h-24 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <span className="text-5xl">{item.icon}</span>
                    </div>
                    <h4 className="text-2xl md:text-3xl font-bold mb-4">{item.title}</h4>
                    <p className="text-lg md:text-xl text-muted-foreground leading-relaxed flex-1">{item.desc}</p>
                  </Card>
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* Our Safety Pledge & Always Verify */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto mt-16">
            {/* Our Safety Pledge */}
            <Card className="p-6 md:p-8 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 border-emerald-500/20 rounded-xl">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-14 h-14 bg-emerald-500/10 rounded-lg flex items-center justify-center">
                  <Shield className="w-7 h-7 text-emerald-600" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold">Our Safety Pledge</h3>
              </div>
              <ul className="space-y-4">
                {[
                  { text: "Educational focus: We teach techniques, never take control of devices" },
                  { text: "Privacy first: Minimal data collection, maximum respect for your privacy" },
                  { text: "Clear guidance: Simple scripts and checklists you can follow confidently" },
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span className="text-foreground text-base md:text-lg leading-relaxed">{item.text}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Always Verify */}
            <Card className="p-6 md:p-8 bg-gradient-to-br from-amber-500/5 to-orange-500/5 border-amber-500/20 rounded-xl">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-14 h-14 bg-amber-500/10 rounded-lg flex items-center justify-center">
                  <span className="text-3xl">⚠️</span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold">Always Verify</h3>
              </div>
              <ul className="space-y-4">
                {[
                  { text: "Never trust unsolicited pictures, videos, voice notes, or links" },
                  { text: "Always call your bank using the official number on your card" },
                  { text: "When in doubt, contact InVision Network for expert review" },
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-4">
                    <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-sm font-bold">!</span>
                    </div>
                    <span className="text-foreground text-base md:text-lg leading-relaxed">{item.text}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Training Section */}
      <section id="training" className="py-16 bg-background relative overflow-hidden">
        <FlowingWaves variant="full" opacity={0.12} />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-10">
            <Badge className="mb-4 bg-gradient-to-r from-primary to-accent text-white text-lg px-6 py-2.5">
              🛡️ PROTECTING FAMILIES TOGETHER
            </Badge>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in-up">Scam Prevention Workshops</h2>
            <p className="text-xl md:text-2xl lg:text-3xl text-foreground mb-4 max-w-4xl mx-auto font-medium leading-relaxed">
              With the rise of AI, scammers have become more sophisticated than ever. Learn to spot AI-powered scams before they hurt you or your family.
            </p>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Simple, friendly classes — no tech skills needed. Perfect for seniors, parents, and grandparents who want to stay safe in the digital age.
            </p>
          </div>

          {/* Veteran Discount Notification - Enhanced Visibility */}
          <div className="flex justify-center mb-10">
            <div className="inline-flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-blue-900/15 to-red-900/15 border-2 border-blue-500/30 rounded-2xl text-lg md:text-xl">
              <span className="text-2xl">🇺🇸</span>
              <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              <span className="font-bold">Veterans & First Responders Save 10%</span>
              <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              <span className="text-muted-foreground text-base">• Applied at checkout</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-6xl mx-auto mb-12">
            {[
              {
                name: "Group Class",
                type: "standard",
                price: "$79",
                priceNum: 79,
                duration: "90 min",
                size: "Up to 25 people",
                description: "Join others in a live online class. Learn to spot fake calls, emails, and texts.",
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
                size: "Up to 12 people",
                popular: true,
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
                size: "5 Family Members",
                description: "Parents, kids, grandparents — we come to you.",
                features: [
                  "✓ Your family only (up to 5)",
                  "✓ In-person or video call",
                  "✓ Device safety check",
                  "✓ 30 days of email help",
                ],
              },
              {
                name: "Large Group Training",
                type: "custom",
                price: "$510",
                priceNum: 510,
                pricePrefix: "+",
                duration: "2-3 hours",
                size: "10-100+ people",
                description: "Churches, senior centers, and communities.",
                features: [
                  "✓ We come to your location",
                  "✓ Custom training for you",
                  "✓ Certificates for everyone",
                  "✓ Ongoing support included",
                ],
              },
            ].map((plan, index) => (
              <TrainingCard 
                key={index}
                plan={plan}
                index={index}
                onBook={(p) => {
                  setSelectedService({
                    type: 'training',
                    name: p.name,
                    tier: p.type,
                    price: p.priceNum,
                    features: p.features,
                    duration: p.duration
                  });
                  setTrainingPaymentOpen(true);
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Simple Protection in 4 Steps */}
      <section className="py-20 bg-muted relative overflow-hidden">
        <FlowingWaves variant="full" opacity={0.12} />
        <div className="absolute inset-0 opacity-30">
          <div
            className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse"
            style={{ animationDuration: "4s" }}
          />
          <div
            className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse"
            style={{ animationDuration: "6s" }}
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-gradient-to-r from-primary to-accent text-white text-base px-5 py-2">
              <Shield className="w-5 h-5 mr-1.5" /> HOW IT WORKS
            </Badge>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in-up">Simple Protection in 4 Steps</h2>
            <p className="text-lg md:text-xl text-foreground max-w-3xl mx-auto leading-relaxed">
              Our proven process keeps you safe from AI-powered scams with expert analysis and clear guidance.
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  step: "01",
                  title: "Something Suspicious?",
                  desc: "Received a strange text, email, or call? AI scammers are getting smarter — trust your instincts!",
                  color: "from-blue-500 to-cyan-500",
                  bgColor: "from-blue-500/10 to-cyan-500/10",
                  borderColor: "border-blue-500/30",
                  image: "📱",
                  action: "Don't click — send it to us"
                },
                {
                  step: "02",
                  title: "Forward to Us",
                  desc: "Forward the email, screenshot the text, or describe the call. We make it easy!",
                  color: "from-purple-500 to-pink-500",
                  bgColor: "from-purple-500/10 to-pink-500/10",
                  borderColor: "border-purple-500/30",
                  image: "📤",
                  action: "Email, upload, or call"
                },
                {
                  step: "03",
                  title: "Expert Analysis",
                  desc: "Our team uses AI detection with human expertise to identify deepfakes and scams.",
                  color: "from-orange-500 to-red-500",
                  bgColor: "from-orange-500/10 to-red-500/10",
                  borderColor: "border-orange-500/30",
                  image: "🔍",
                  action: "AI + Human review"
                },
                {
                  step: "04",
                  title: "Clear Guidance",
                  desc: "We tell you exactly what we found and guide you step by step on what to do.",
                  color: "from-green-500 to-emerald-500",
                  bgColor: "from-green-500/10 to-emerald-500/10",
                  borderColor: "border-green-500/30",
                  image: "✅",
                  action: "Know exactly what to do"
                },
              ].map((step, index) => (
                <ScrollReveal key={index} animation="scale-in" delay={index * 100} threshold={0.3}>
                  <Card
                    className={`relative p-6 md:p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 rounded-2xl border-2 ${step.borderColor} group bg-gradient-to-br ${step.bgColor} overflow-hidden h-[380px] flex flex-col`}
                  >
                    {/* Step Number Badge */}
                    <div className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-br ${step.color} rounded-bl-3xl flex items-center justify-center`}>
                      <span className="text-xl font-black text-white pr-1 pt-1">{step.step}</span>
                    </div>
                    
                    {/* Icon */}
                    <div className="flex justify-center mb-5">
                      <div 
                        className={`w-20 h-20 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg`}
                      >
                        <span className="text-4xl">{step.image}</span>
                      </div>
                    </div>
                    
                    <h3 className="text-xl md:text-2xl font-bold mb-4 text-center text-foreground group-hover:text-primary transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-foreground/80 text-center text-base md:text-lg leading-relaxed mb-5 flex-1">{step.desc}</p>
                    
                    {/* Bottom Action */}
                    <div className={`text-center pt-4 border-t border-border/50 mt-auto`}>
                      <span className={`text-base font-bold bg-gradient-to-r ${step.color} bg-clip-text text-transparent`}>
                        {step.action}
                      </span>
                    </div>
                  </Card>
                </ScrollReveal>
              ))}
            </div>
            
            {/* Connecting Arrow for Desktop */}
            <div className="hidden lg:flex justify-center items-center mt-10">
              <div className="flex items-center gap-4">
                {[1, 2, 3].map((_, i) => (
                  <div key={i} className="flex items-center">
                    <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent rounded-full" />
                    <div className="w-4 h-4 rounded-full bg-gradient-to-r from-primary to-accent animate-pulse shadow-lg" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Choose Your Protection Level - Moved up after Simple Protection */}
      <section id="pricing" className="py-16 bg-background relative overflow-hidden">
        <FlowingWaves variant="full" opacity={0.12} />
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute top-1/4 right-20 w-64 h-64 bg-accent/30 rounded-full blur-3xl animate-pulse"
            style={{ animationDuration: "5s" }}
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-6 animate-fade-in-up">Choose Your Protection Level</h2>
          <p className="text-center text-lg md:text-xl text-muted-foreground mb-6 max-w-4xl mx-auto leading-relaxed">
            <strong>Pay-per-use model:</strong> Subscribe monthly and your credits refill each billing cycle. Upload suspicious items and our AI-powered team analyzes them. The more you use, the more credits consumed. <strong>Unused credits don't roll over.</strong>
          </p>
          
          {/* Credit System Explainer */}
          <div className="max-w-3xl mx-auto mb-10">
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-xl p-5 text-center">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Zap className="w-5 h-5 text-primary" />
                <span className="font-semibold text-lg">Pay Per Use — How Credits Work</span>
              </div>
              <p className="text-base text-muted-foreground leading-relaxed">
                Each plan includes monthly credits. 1 submission = 1 credit used. Credits reset monthly. The more you upload, the more credits consumed. Upgrade anytime for more capacity.
              </p>
            </div>
          </div>

          {/* Payment Period Toggle */}
          <div className="flex items-center justify-center gap-5 mb-10">
            <Label htmlFor="payment-toggle" className={`text-lg font-semibold ${!isYearly ? 'text-primary' : 'text-muted-foreground'}`}>
              Monthly
            </Label>
            <Switch
              id="payment-toggle"
              checked={isYearly}
              onCheckedChange={setIsYearly}
              className="scale-125"
            />
            <Label htmlFor="payment-toggle" className={`text-lg font-semibold ${isYearly ? 'text-primary' : 'text-muted-foreground'}`}>
              Yearly <span className="text-base text-success">(Save 5%)</span>
            </Label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 xl:gap-5">
            {/* Starter Plan */}
            <div className="relative pt-6 h-full">
              <div className="absolute -top-0 left-1/2 -translate-x-1/2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-2.5 rounded-full text-sm font-bold tracking-wide shadow-lg z-20 whitespace-nowrap">
                🌱 STARTER
              </div>
              <Card
                className="p-5 md:p-6 lg:p-7 transition-all duration-500 hover:-translate-y-2 hover:shadow-strong rounded-2xl border-border/50 animate-fade-in-up bg-gradient-to-br from-card to-card/50 h-full flex flex-col min-h-[600px]"
                style={{ animationDelay: "0ms" }}
              >
                <div className="flex justify-center mb-5 pt-3">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center">
                    <Shield className="w-10 h-10 text-primary" />
                  </div>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-3 text-center">Starter Plan</h3>
                <div className="text-center mb-2">
                  <span key={isYearly ? 'yearly-39' : 'monthly-39'} className="text-4xl md:text-5xl font-bold text-primary">{getPlanPrice(39).display}</span>
                  <span className="text-muted-foreground text-base ml-1">{getPlanPrice(39).period}</span>
                </div>
                {isYearly && (
                  <p className="text-center text-sm text-success font-semibold mb-3">{getPlanPrice(39).savings}</p>
                )}
                {!isYearly && <div className="h-5 mb-3" />}
                
                <div className="text-center mb-5 p-3 bg-primary/5 rounded-lg">
                  <span className="text-sm font-medium text-primary">🎫 10 credits/month • Pay per use</span>
                </div>

                <div className="space-y-3 mb-5 flex-1">
                  {[
                    "24-hour expert AI analysis",
                    "Email & text support",
                    "Risk assessment reports",
                    "Scam Alert Map access",
                    "Educational resources",
                  ].map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground text-base">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="mb-5 p-3 bg-primary/10 rounded-lg">
                  <div className="flex items-center gap-3 justify-center">
                    <Mail className="w-5 h-5 text-primary" />
                    <Upload className="w-5 h-5 text-primary" />
                    <span className="text-sm font-medium">Email, Upload</span>
                  </div>
                </div>

                <Button 
                  onClick={() => {
                    trackButtonClick('Get Started - Starter Plan', 'Training Page');
                    handleSubscribe('price_1SjwUHJ8osfwYbX7ZY71jSOR', 'ScamShield', 'Starter', 3900, [
                      "24-hour expert analysis",
                      "Email & text support",
                      "Risk assessment reports",
                      "Scam Alert Map access",
                      "10 credits/month"
                    ]);
                  }}
                  variant="outline" 
                  size="lg" 
                  className="w-full mt-auto text-lg py-6"
                >
                  Get Started
                </Button>
              </Card>
            </div>

            {/* Family Plan - MOST POPULAR */}
            <div className="relative pt-6 h-full">
              <div className="absolute -top-0 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-accent text-primary-foreground px-6 py-2.5 rounded-full text-sm font-bold tracking-wide shadow-lg z-20 whitespace-nowrap animate-pulse" style={{ animationDuration: '3s' }}>
                ⭐ MOST POPULAR
              </div>
              <Card
                className="p-5 md:p-6 lg:p-7 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(109,40,217,0.2)] rounded-2xl border-primary border-2 animate-fade-in-up bg-gradient-to-br from-card to-card/50 h-full flex flex-col min-h-[600px]"
                style={{ animationDelay: "100ms" }}
              >
                <div className="flex justify-center mb-5 pt-3">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center">
                    <Users className="w-10 h-10 text-primary" />
                  </div>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-3 text-center">Family Plan</h3>
                <div className="text-center mb-2">
                  <span key={isYearly ? 'yearly-79' : 'monthly-79'} className="text-4xl md:text-5xl font-bold text-primary">{getPlanPrice(79).display}</span>
                  <span className="text-muted-foreground text-base ml-1">{getPlanPrice(79).period}</span>
                </div>
                {isYearly && (
                  <p className="text-center text-sm text-success font-semibold mb-3">{getPlanPrice(79).savings}</p>
                )}
                {!isYearly && <div className="h-5 mb-3" />}
                
                <div className="text-center mb-5 p-3 bg-primary/10 rounded-lg">
                  <span className="text-sm font-medium text-primary">🎫 25 credits/month • Pay per use</span>
                </div>

                <div className="space-y-3 mb-5 flex-1">
                  <p className="font-semibold text-center text-sm mb-3">Starter PLUS:</p>
                  {[
                    "Up to 5 family members",
                    "12-hour AI response time",
                    "Family Safety Vault access",
                    "Safe word setup system",
                    "Phone support available",
                  ].map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground text-base">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="mb-5 p-3 bg-primary/10 rounded-lg">
                  <div className="flex items-center gap-3 justify-center">
                    <Mail className="w-5 h-5 text-primary" />
                    <Upload className="w-5 h-5 text-primary" />
                    <Phone className="w-5 h-5 text-primary" />
                    <span className="text-sm font-medium">+ Phone Support</span>
                  </div>
                </div>

                <Button 
                  onClick={() => {
                    trackButtonClick('Get Started - Family Plan', 'Training Page');
                    handleSubscribe('price_1SjwUIJ8osfwYbX7Ynjt7gMq', 'ScamShield', 'Family', 7900, [
                      "Up to 5 family members",
                      "12-hour response time",
                      "Family Safety Vault access",
                      "Phone support available",
                      "25 credits/month"
                    ]);
                  }}
                  variant="default" 
                  size="lg" 
                  className="w-full mt-auto text-lg py-6"
                >
                  Get Started
                </Button>
              </Card>
            </div>

            {/* Premium Plan */}
            <div className="relative pt-6 h-full">
              <div className="absolute -top-0 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-2.5 rounded-full text-sm font-bold tracking-wide shadow-lg z-20 whitespace-nowrap">
                👑 PREMIUM
              </div>
              <Card
                className="p-5 md:p-6 lg:p-7 hover:shadow-strong transition-all duration-500 hover:-translate-y-2 rounded-2xl border-amber-500/30 animate-fade-in-up bg-gradient-to-br from-card to-amber-500/5 h-full flex flex-col min-h-[600px]"
                style={{ animationDelay: "200ms" }}
              >
                <div className="flex justify-center mb-5 pt-3">
                  <div className="w-20 h-20 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-full flex items-center justify-center">
                    <Award className="w-10 h-10 text-amber-500" />
                  </div>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-3 text-center">Premium Plan</h3>
                <div className="text-center mb-2">
                  <span key={isYearly ? 'yearly-129' : 'monthly-129'} className="text-4xl md:text-5xl font-bold text-amber-500">{getPlanPrice(129).display}</span>
                  <span className="text-muted-foreground text-base ml-1">{getPlanPrice(129).period}</span>
                </div>
                {isYearly && (
                  <p className="text-center text-sm text-success font-semibold mb-3">{getPlanPrice(129).savings}</p>
                )}
                {!isYearly && <div className="h-5 mb-3" />}
                
                <div className="text-center mb-5 p-3 bg-amber-500/10 rounded-lg">
                  <span className="text-sm font-medium text-amber-600 dark:text-amber-400">🎫 Unlimited credits • 4hr AI response</span>
                </div>

                <div className="space-y-3 mb-5 flex-1">
                  <p className="font-semibold text-center text-sm mb-3">Family PLUS:</p>
                  {[
                    "AI deepfake detection",
                    "Dedicated security advisor",
                    "24/7 emergency hotline",
                    "Proactive AI monitoring",
                    "Monthly 1-on-1 check-ins",
                  ].map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                      <span className="text-foreground text-base">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="mb-5 p-3 bg-amber-500/10 rounded-lg">
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-amber-500" />
                      <Upload className="w-5 h-5 text-amber-500" />
                      <Phone className="w-5 h-5 text-amber-500" />
                    </div>
                    <span className="text-sm font-medium">+ Emergency Hotline</span>
                  </div>
                </div>

                <Button 
                  onClick={() => {
                    trackButtonClick('Get Started - Premium Plan', 'Training Page');
                    handleSubscribe('price_1SjwULJ8osfwYbX7DdZ4Ckqc', 'ScamShield', 'Premium', 12900, [
                      "AI deepfake detection",
                      "Dedicated security advisor",
                      "24/7 emergency hotline",
                      "Proactive monitoring",
                      "Unlimited credits"
                    ]);
                  }}
                  variant="default" 
                  size="lg" 
                  className="w-full mt-auto text-lg py-6 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                >
                  Get Started
                </Button>
              </Card>
            </div>

            {/* Customized Plan for Businesses */}
            <div className="relative pt-6 h-full">
              <div className="absolute -top-0 left-1/2 -translate-x-1/2 bg-gradient-to-r from-violet-600 to-purple-600 text-white px-6 py-2.5 rounded-full text-sm font-bold tracking-wide shadow-lg z-20 whitespace-nowrap">
                🏢 ENTERPRISE
              </div>
              <Card
                className="p-5 md:p-6 lg:p-7 hover:shadow-strong transition-all duration-500 hover:-translate-y-2 rounded-2xl border-violet-500/30 animate-fade-in-up bg-gradient-to-br from-card to-violet-500/5 h-full flex flex-col min-h-[600px]"
                style={{ animationDelay: "300ms" }}
              >
                <div className="flex justify-center mb-5 pt-3">
                  <div className="w-20 h-20 bg-gradient-to-br from-violet-500/20 to-purple-500/20 rounded-full flex items-center justify-center">
                    <Users className="w-10 h-10 text-violet-500" />
                  </div>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-3 text-center">Customized Plan</h3>
                <div className="text-center mb-2">
                  <span className="text-4xl md:text-5xl font-bold text-violet-500">From $229+</span>
                  <span className="text-muted-foreground text-base ml-1">/month</span>
                </div>
                <div className="h-5 mb-3" />
                
                <div className="text-center mb-5 p-3 bg-violet-500/10 rounded-lg">
                  <span className="text-sm font-medium text-violet-600 dark:text-violet-400">🎫 Custom credits • Custom SLA</span>
                </div>

                <div className="space-y-3 mb-5 flex-1">
                  <p className="font-semibold text-center text-sm mb-3">Custom tailored:</p>
                  {[
                    "Unlimited team members",
                    "2-hour priority AI response",
                    "Dedicated account manager",
                    "Company-wide protocols",
                    "Quarterly security audits",
                  ].map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-violet-500 flex-shrink-0 mt-0.5" />
                      <span className="text-foreground text-base">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="mb-5 p-3 bg-violet-500/10 rounded-lg">
                  <div className="text-center">
                    <p className="text-sm font-medium">Price scales based on business size & needs</p>
                  </div>
                </div>

                <Button 
                  asChild
                  variant="outline" 
                  size="lg" 
                  className="w-full mt-auto text-lg py-6 border-violet-500/50 hover:bg-violet-500/10"
                >
                  <Link 
                    to="/contact?subject=Custom Protection Plan"
                    onClick={() => trackButtonClick('Request Quote - Custom Plan', 'Training Page')}
                  >
                    Request Quote
                  </Link>
                </Button>
              </Card>
            </div>
          </div>

          <div className="text-center mt-8 animate-fade-in-up" style={{ animationDelay: "400ms" }}>
            <p className="text-base text-muted-foreground">Cancel anytime • Credits reset monthly • No long-term contracts • Pay per use</p>
          </div>
        </div>
      </section>

      {/* What We Analyze Section - Interactive */}
      <section className="py-20 bg-muted relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute bottom-1/4 left-20 w-80 h-80 bg-primary/20 rounded-full blur-3xl animate-pulse"
            style={{ animationDuration: "7s" }}
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-gradient-to-r from-accent to-cyan-500 text-white text-base md:text-lg px-5 py-2">
              <Shield className="w-5 h-5 mr-1.5" /> COMPREHENSIVE PROTECTION
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-5">We Analyze All Types of Threats</h2>
            <p className="text-lg md:text-xl lg:text-2xl text-foreground max-w-3xl mx-auto leading-relaxed">
              Click on any threat type below to learn how we protect you. <strong>No threat is too small — if it feels suspicious, send it to us.</strong>
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {[
              { 
                icon: Mail, 
                title: "Phishing Emails",
                description: "Received a suspicious email? Forward it to us! We check sender authenticity, analyze links, and identify fake logos. Don't click any links — just forward and we'll tell you if it's safe."
              },
              { 
                icon: MessageSquare, 
                title: "SMS Scams",
                description: "Any text message with suspicious links or urgent demands for money — screenshot it and send to us. We trace the sender and verify if the message is legitimate or a scam attempt."
              },
              { 
                icon: Phone, 
                title: "Voice Calls",
                description: "Someone called claiming to be from the IRS, bank, or a relative in trouble? Tell us what they said. We can identify common voice scam patterns and AI-generated voices."
              },
              { 
                icon: FileText, 
                title: "Voice Messages",
                description: "Voicemails can be AI-cloned to sound like loved ones. Send us the recording and we'll analyze it for signs of artificial generation and verify authenticity."
              },
              { 
                icon: LinkIcon, 
                title: "Suspicious Links",
                description: "Before clicking any link, send it to us first! We safely scan the URL, check for malware, verify the destination, and tell you if it's safe or dangerous."
              },
              { 
                icon: QrCode, 
                title: "QR Codes",
                description: "QR codes can hide malicious links. Send us a photo and we'll decode it safely to tell you where it really leads. Never scan unknown QR codes directly!"
              },
              { 
                icon: FileCheck, 
                title: "Documents",
                description: "Suspicious PDFs, contracts, or attachments can contain malware or fake information. Upload them to us for safe analysis — we'll check for hidden threats."
              },
              { 
                icon: ImageIcon, 
                title: "Social Media",
                description: "Fake profiles, suspicious friend requests, or scam messages on Facebook, Instagram, or other platforms — screenshot and send to us for verification."
              },
            ].map((threat, index) => (
              <ScrollReveal key={index} animation="scale-in" delay={index * 50} threshold={0.2}>
                <Card
                  onClick={() => setExpandedThreat(expandedThreat === threat.title ? null : threat.title)}
                  className={`p-5 md:p-6 cursor-pointer transition-all duration-300 rounded-2xl border-2 group bg-gradient-to-br from-card to-card/50 backdrop-blur-sm hover:shadow-xl hover:-translate-y-1 min-h-[180px] ${
                    expandedThreat === threat.title 
                      ? 'border-primary shadow-lg bg-primary/5' 
                      : 'border-border/50 hover:border-primary/50'
                  }`}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="w-18 h-18 md:w-20 md:h-20 bg-primary/10 rounded-2xl flex items-center justify-center transition-all duration-300 mb-4 group-hover:scale-110 group-hover:bg-primary/20">
                      <threat.icon className="w-9 h-9 md:w-10 md:h-10 text-primary" />
                    </div>
                    <h3 className="text-base md:text-lg font-bold group-hover:text-primary transition-colors duration-300 mb-2">
                      {threat.title}
                    </h3>
                    <p className="text-sm md:text-base text-muted-foreground">Click to learn more</p>
                  </div>
                  
                  {/* Expanded Description */}
                  {expandedThreat === threat.title && (
                    <div className="mt-4 pt-4 border-t border-border/50 animate-fade-in">
                      <p className="text-base md:text-lg text-foreground leading-relaxed">
                        {threat.description}
                      </p>
                      <div className="mt-4 flex items-center justify-center gap-2">
                        <span className="text-sm md:text-base font-bold text-primary">Forward to us and stay safe!</span>
                        <CheckCircle className="w-5 h-5 text-primary" />
                      </div>
                    </div>
                  )}
                </Card>
              </ScrollReveal>
            ))}
          </div>
          
          {/* Bottom Note - Simplified */}
          <div className="max-w-3xl mx-auto mt-10 text-center">
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              <strong className="text-foreground">See something not listed?</strong> We analyze <em>everything</em>. If it feels suspicious, send it to us. Better safe than sorry!
            </p>
          </div>
        </div>
      </section>

      {/* AI Professionals Training Section - Enhanced with Background */}
      <section id="ai-pro-training" className="py-20 bg-background relative overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ 
            backgroundImage: 'url("https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1920&q=80")',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
        <FlowingWaves variant="full" opacity={0.08} />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-base md:text-lg px-5 py-2">
              <Zap className="w-5 h-5 mr-1.5" /> FOR PROFESSIONALS & ENTREPRENEURS
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-5">AI Professional Training & Development</h2>
            <p className="text-lg md:text-xl lg:text-2xl text-foreground max-w-4xl mx-auto mb-5 leading-relaxed">
              <strong>This is the only place where you can get the best AI training.</strong> Whether you want to build an AI agency, 
              create automation workflows, or design stunning websites with AI — we provide hands-on, expert-led training 
              that will transform your business capabilities.
            </p>
            <p className="text-base md:text-lg text-accent font-semibold max-w-3xl mx-auto">
              🚀 Perfect for entrepreneurs, developers, marketers, and organizations ready to leverage cutting-edge AI technology.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "AI Automation",
                type: "automation",
                price: "$299",
                priceNum: 299,
                duration: "3 hours",
                size: "Individual",
                description: "Master AI workflow automation with Make, Zapier, n8n, and custom API integrations. Build systems that save 20+ hours per week.",
                features: [
                  "Workflow automation mastery",
                  "API integrations & webhooks",
                  "ChatGPT/Claude integration",
                  "Ready-to-use templates",
                  "Email automation setup",
                ],
                badge: { label: "POPULAR", emoji: "🔥", gradient: "from-orange-500 to-red-500" }
              },
              {
                name: "AI Agency Building",
                type: "agency",
                price: "$499",
                priceNum: 499,
                duration: "5 hours",
                size: "Individual/Team",
                popular: true,
                description: "Build a profitable AI agency from scratch. Learn client acquisition, service delivery, pricing strategies, and scale to 6 figures.",
                features: [
                  "Complete business model",
                  "Client acquisition system",
                  "Service packaging & pricing",
                  "Delivery frameworks",
                  "Ongoing mentorship access",
                ],
                badge: { label: "BEST VALUE", emoji: "⭐", gradient: "from-primary to-accent" }
              },
              {
                name: "Web Design + AI",
                type: "webdesign",
                price: "$349",
                priceNum: 349,
                duration: "4 hours",
                size: "Individual",
                description: "Create stunning, high-converting websites using AI design tools. Learn Midjourney, Figma AI, Framer, and modern deployment.",
                features: [
                  "AI design tool mastery",
                  "Responsive layout design",
                  "SEO & performance optimization",
                  "Deployment & hosting",
                  "Client handoff process",
                ],
                badge: { label: "CREATIVE", emoji: "🎨", gradient: "from-cyan-500 to-blue-500" }
              },
              {
                name: "Project Troubleshoot",
                type: "troubleshoot",
                price: "$150",
                priceNum: 150,
                pricePrefix: "/hr",
                duration: "Flexible",
                size: "Per project",
                description: "We join your existing AI project to troubleshoot issues, optimize performance, or develop new features. Custom pricing available.",
                features: [
                  "Expert code review",
                  "Bug fixing & debugging",
                  "Feature development",
                  "Architecture consulting",
                  "Performance optimization",
                ],
                badge: { label: "CONSULTING", emoji: "🛠", gradient: "from-green-500 to-emerald-500" }
              },
            ].map((plan, index) => (
              <ScrollReveal key={index} animation="scale-in" delay={index * 100} threshold={0.2}>
                <div className="relative pt-5 h-full">
                  {/* Badge - On top of card, outside */}
                  <div className={`absolute -top-0 left-1/2 -translate-x-1/2 bg-gradient-to-r ${plan.badge.gradient} text-white px-5 py-2 rounded-full text-xs font-bold tracking-wide shadow-xl z-30 whitespace-nowrap border-2 border-white/20`}>
                    <span className="mr-1">{plan.badge.emoji}</span>
                    {plan.badge.label}
                  </div>
                  
                  <Card className={`relative p-5 md:p-6 h-full flex flex-col transition-all duration-300 hover:-translate-y-2 rounded-2xl bg-gradient-to-br from-card to-card/50 ${
                    plan.popular 
                      ? "border-primary border-2 shadow-xl" 
                      : "border-border/50 hover:shadow-lg"
                  }`}>
                    <div className="pt-3">
                    <h3 className="text-lg md:text-xl font-bold mb-2 text-center">{plan.name}</h3>
                    <div className="text-center mb-2">
                      <span className="text-3xl md:text-4xl font-bold text-primary">{plan.price}</span>
                      {plan.pricePrefix && <span className="text-muted-foreground text-sm">{plan.pricePrefix}</span>}
                    </div>
                    <p className="text-center text-sm text-muted-foreground mb-1">{plan.duration}</p>
                    <p className="text-center text-sm text-accent font-semibold mb-3">{plan.size}</p>
                    
                    <p className="text-center text-xs md:text-sm text-muted-foreground mb-4">
                      {plan.description}
                    </p>

                    <div className="space-y-2 mb-4 flex-grow">
                      {plan.features.map((feature: string, idx: number) => (
                        <div key={idx} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-foreground text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <Button 
                      onClick={() => {
                        setSelectedService({
                          type: 'training',
                          name: plan.name,
                          tier: plan.type,
                          price: plan.priceNum,
                          features: plan.features,
                          duration: plan.duration
                        });
                        setTrainingPaymentOpen(true);
                      }}
                      variant={plan.popular ? "default" : "outline"} 
                      size="default" 
                      className={`w-full mt-auto ${plan.popular ? 'bg-primary hover:bg-primary/90 text-primary-foreground' : ''}`}
                    >
                      Book & Pay Now →
                    </Button>
                  </div>
                  </Card>
                </div>
              </ScrollReveal>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <div className="inline-flex items-center gap-3 bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl px-6 py-3">
              <Lock className="w-5 h-5 text-primary" />
              <p className="text-sm text-muted-foreground">
                💳 Secure payment required to confirm booking • 10% veteran discount available
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Veterans Discount - Enhanced Visibility Strip */}
      <section className="py-6 bg-gradient-to-r from-blue-900/10 via-transparent to-red-900/10 border-y-2 border-blue-500/20">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-4 text-lg md:text-xl">
            <span className="text-2xl">🇺🇸</span>
            <div className="flex items-center gap-3">
              <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              <span className="font-bold">Veterans & First Responders: 10% OFF</span>
              <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
            </div>
            <span className="text-muted-foreground text-lg">•</span>
            <span className="text-muted-foreground text-base md:text-lg">Military, Police, Fire, EMT — discount applied at checkout</span>
          </div>
        </div>
      </section>

      {/* Secure Your Family Section - Enhanced */}
      <section className="py-20 bg-muted relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 animate-gradient-shift">
          <div
            className="absolute top-20 right-1/4 w-96 h-96 bg-accent/25 rounded-full blur-3xl animate-pulse"
            style={{ animationDuration: "8s" }}
          />
          <div
            className="absolute bottom-20 left-1/4 w-96 h-96 bg-primary/25 rounded-full blur-3xl animate-pulse"
            style={{ animationDuration: "10s" }}
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-10">
            <Badge className="mb-4 bg-gradient-to-r from-primary to-accent text-white text-base md:text-lg px-5 py-2">
              <Lock className="w-5 h-5 mr-1.5" /> FAMILY PROTECTION
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-5">Secure Your Family — This Is Critical</h2>
            <p className="text-lg md:text-xl lg:text-2xl text-foreground max-w-3xl mx-auto leading-relaxed">
              <strong>In today's digital world, AI-powered scammers don't just target you — they target your entire family.</strong> 
              Without proper protection, one mistake can cost your family thousands of dollars and endless stress.
            </p>
          </div>

          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* Left: Warning */}
            <Card className="p-8 md:p-10 bg-gradient-to-br from-red-500/10 to-orange-500/10 border-red-500/30 rounded-2xl">
              <div className="flex items-start gap-5 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-3xl">⚠️</span>
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-red-600 dark:text-red-400 mb-4">Without InVision Protection:</h3>
                  <ul className="space-y-4">
                    {[
                      "Scammers can impersonate your grandchildren using AI voice cloning",
                      "One family member clicking a bad link can compromise everyone",
                      "You may lose life savings to fake emergencies or romance scams",
                      "Your personal documents and identity could be stolen"
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-base md:text-lg text-foreground">
                        <span className="text-red-500 mt-0.5 text-xl">✗</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>

            {/* Right: Solution */}
            <Card className="p-8 md:p-10 bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/30 rounded-2xl">
              <div className="flex items-start gap-5 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-green-600 dark:text-green-400 mb-4">With InVision Protection:</h3>
                  <ul className="space-y-4">
                    {[
                      "Family safe words to verify real emergencies instantly",
                      "24/7 expert analysis — just forward anything suspicious",
                      "Proactive alerts when new scam patterns emerge",
                      "Secure vault for important family documents"
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-base md:text-lg text-foreground">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          </div>

          {/* Family Safety Vault Card */}
          <Card className="max-w-4xl mx-auto mt-10 p-8 md:p-10 hover:shadow-xl transition-all duration-500 rounded-2xl border-accent border-2 relative overflow-hidden">
            {/* Background Image - Vault themed */}
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ 
                backgroundImage: `url(${heroVault})`,
              }}
            />
            {/* Overlay for readability */}
            <div className="absolute inset-0 bg-gradient-to-br from-card/95 via-card/90 to-card/85 backdrop-blur-sm" />
            
            <div className="text-center relative z-10">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-primary/30 to-accent/30 rounded-full flex items-center justify-center animate-[shield-pulse_3s_ease-in-out_infinite] shadow-lg">
                  <Lock className="w-10 h-10 text-primary" />
                </div>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-3 text-foreground">Family Safety Vault</h3>
              <p className="text-foreground/80 mb-6 text-base md:text-lg">Included with Family & Premium Plans — keep everything secure</p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8 text-left max-w-2xl mx-auto">
                {[
                  { icon: "🔑", feature: "Family safe words" },
                  { icon: "📞", feature: "Trusted caller list" },
                  { icon: "🆘", feature: "Emergency contacts" },
                  { icon: "📄", feature: "Encrypted documents" },
                  { icon: "🔐", feature: "Account recovery info" },
                  { icon: "✈️", feature: "Travel itineraries" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-background/80 rounded-xl backdrop-blur-sm border border-border/50 shadow-sm">
                    <span className="text-xl">{item.icon}</span>
                    <span className="text-sm md:text-base font-medium text-foreground">{item.feature}</span>
                  </div>
                ))}
              </div>

              <p className="text-sm md:text-base text-foreground/80 font-medium">
                🔒 Bank-grade encryption • Multi-factor authentication • Secure family sharing
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* Real Examples Section */}
      <section className="py-16 bg-background relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute bottom-20 left-1/4 w-72 h-72 bg-primary/25 rounded-full blur-3xl animate-pulse"
            style={{ animationDuration: "6s" }}
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-10 animate-fade-in-up">Scams We've Caught for Our Members</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto mb-12">
            {[
              {
                badge: "Grandparent Scam",
                received: '"Hi grandma, I\'m in jail and need bail money NOW"',
                analysis: "Voice analysis showed AI generation. Number traced to known scam.",
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
                analysis: "Microsoft never cold-calls. Verified fake tech support operation.",
                saved: "$2,500",
              },
              {
                badge: "Romance Scam",
                received: "Online love interest requested emergency funds",
                analysis: "Photos were stolen. Profile matched known scammer patterns.",
                saved: "$15,000",
              },
            ].map((example, index) => (
              <ScamExampleCard key={index} example={example} index={index} />
            ))}
          </div>

          {/* Video Testimonials Section */}
          {isAdmin && (
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-center mb-8">Video Testimonials</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {[1, 2, 3].map((i) => (
                  <Card 
                    key={i} 
                    className="p-6 text-center border-2 border-dashed border-primary/30 hover:border-primary/50 hover:shadow-medium transition-all bg-gradient-to-br from-card to-card/50"
                  >
                    <div className="aspect-video bg-muted/30 rounded-lg mb-4 flex flex-col items-center justify-center gap-3">
                      <Video className="w-12 h-12 text-primary/50" />
                      <p className="text-sm font-semibold text-muted-foreground">Upload Member Success Stories</p>
                    </div>
                    <Button variant="default" size="sm" className="w-full">
                      <Upload className="w-4 h-4 mr-2" />
                      Add Video
                    </Button>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Training Success Stories */}
      {trainingTestimonials.length > 0 && (
        <section className="py-20 bg-muted">
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <h2 className="text-center mb-4">Workshop Success Stories</h2>
              <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
                Hear from families who have completed our workshops
              </p>
            </ScrollReveal>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                    onVideoClick={() => videoMedia && setSelectedVideo({
                      src: videoMedia.file_url,
                      title: `${testimonial.name}'s Story`
                    })}
                  />
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Final CTA with Peaceful Home Background */}
      <section className="py-20 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url(${natureWinter3})`,
          }}
        />
        {/* Subtle dark gradient for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/40" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <ScrollReveal>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.6), 0 0 15px rgba(0,0,0,0.4)' }}>Sleep Better Tonight</h2>
            <p className="text-xl text-white mb-8 max-w-2xl mx-auto" style={{ textShadow: '1px 1px 5px rgba(0,0,0,0.6), 0 0 10px rgba(0,0,0,0.4)' }}>Join 100+ families who trust ScamShield</p>
            <div className="flex flex-col sm:flex-row gap-4 flex-wrap justify-center">
              <Button 
                onClick={() => {
                  document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
                }}
                variant="gold" 
                size="xl" 
                className="w-full sm:w-auto"
              >
                Get Started
              </Button>
              <Button asChild variant="outlineLight" size="xl" className="w-full sm:w-auto">
                <Link to="/contact">Talk to an Expert</Link>
              </Button>
              <Button asChild variant="outlineLight" size="xl" className="w-full sm:w-auto">
                <Link to="/faq">Frequently Asked Questions</Link>
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
      
      {/* Training Payment Modal - Pay First Flow */}
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
          onSuccess={() => {
            trackConversion('training_booking', selectedService.price || 0);
          }}
        />
      )}

      {/* BookingModal kept for free consultations/inquiries only */}
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

      {/* Note: SubscriptionDialog removed - using EmbeddedPaymentModal for all subscriptions */}

      {/* Embedded Payment Modal for inline checkout */}
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
            trackConversion('subscription', embeddedPaymentConfig.amount / 100);
          }}
        />
      )}
      </div>
    </PageTransition>
  );
}

export default LearnAndTrain;
