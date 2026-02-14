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
} from "lucide-react";
import { ExpandableServiceCard } from "@/components/ExpandableServiceCard";
import { Badge } from "@/components/ui/badge";
import businessReceptionist from "@/assets/business-ai-receptionist.jpg";
import businessScheduling from "@/assets/business-smart-scheduling.jpg";
import businessSupportBot from "@/assets/business-support-bot.jpg";
import businessIntake from "@/assets/business-intake-scheduling.jpg";
import { natureSummer2 } from "@/config/natureHeroImages";
import { PROFESSIONAL_HERO_IMAGES } from "@/config/professionalHeroImages";
import { VideoLightbox } from "@/components/VideoLightbox";
import { SEO } from "@/components/SEO";
import { RotatingHeadlines } from "@/components/shared/RotatingHeadlines";
import HeroFloatingStats from "@/components/business/HeroFloatingStats";

const businessHeadlines = [
  "Grow Your Business with Secure AI Solutions",
  "Custom AI Automation for Your Business",
  "Professional Website Design & Development",
  "Industry-Leading AI Service Insurance",
];

/* ─── Section Header ─── */
const SectionHeader = ({
  badge,
  title,
  subtitle,
  children,
}: {
  badge: string;
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}) => (
  <div className="text-center mb-12">
    <span className="inline-block px-4 py-1.5 bg-primary/10 rounded-full text-xs font-bold text-primary uppercase tracking-[0.15em] mb-4">
      {badge}
    </span>
    <h2 className="text-3xl md:text-4xl font-black mb-3">{title}</h2>
    {subtitle && (
      <p className="text-base text-muted-foreground max-w-3xl mx-auto">
        {subtitle}
      </p>
    )}
    {children}
  </div>
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
}) => (
  <div className="relative h-full pt-5">
    <div
      className={`absolute -top-1 left-1/2 -translate-x-1/2 bg-gradient-to-r ${tagColor} text-white px-5 py-1.5 rounded-full text-xs font-bold tracking-wider shadow-md z-20 whitespace-nowrap`}
    >
      {tag}
    </div>
    <Card
      className={`p-6 rounded-2xl border ${featured ? "border-2 border-primary shadow-lg" : "border-border/60"} hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full flex flex-col pt-8`}
    >
      <div className="text-center flex-1 flex flex-col">
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <p className="text-4xl font-black text-primary mb-1">
          {price}
          {priceSuffix && (
            <span className="text-base text-muted-foreground font-normal">
              {priceSuffix}
            </span>
          )}
        </p>
        {priceNote && (
          <p className="text-sm text-muted-foreground mb-4">{priceNote}</p>
        )}
        {badges && (
          <div className="flex flex-wrap gap-2 justify-center mb-4">
            {badges.map((b, i) => (
              <span
                key={i}
                className={`inline-flex items-center gap-1 px-2.5 py-0.5 ${b.color} text-xs font-medium rounded-full`}
              >
                {b.text}
              </span>
            ))}
          </div>
        )}
        <ul className="space-y-2.5 mb-6 text-sm text-left flex-1">
          {features.map((f, i) => (
            <li key={i} className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
              <span>{f}</span>
            </li>
          ))}
        </ul>
        <Button
          variant={featured ? "default" : "outline"}
          className="w-full mt-auto h-11"
          onClick={onButtonClick}
        >
          {buttonText}
        </Button>
      </div>
    </Card>
  </div>
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
        "Book a free strategy call. We will map your goals, recommend the right AI automation, and outline a clear build plan.",
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
          description="Transform your business with AI receptionists, automated follow-ups, and professional websites. Stop missing calls. Let AI run your front desk 24/7. Serving Dayton and all of Ohio."
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
                Transform your business with AI-powered solutions, professional
                websites, and expert security
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="default" size="xl" onClick={openStrategyCall}>
                Book Strategy Call
              </Button>
              <Button
                variant="outlineLight"
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

        {/* ═══════════════════ SERVICES ═══════════════════ */}
        <section id="services" className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <SectionHeader
              badge="Our Services"
              title="What We Build"
              subtitle="Select a service to view details and benefits for your business"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto">
              <ExpandableServiceCard
                icon={<Phone className="w-7 h-7 text-primary" />}
                title="AI Receptionist"
                image={businessReceptionist}
                summary="Answer calls 24/7, route to right person, book appointments, answer FAQs. Never miss a lead again."
              >
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">Never miss another call.</strong>{" "}
                    Our AI Receptionist answers every incoming call 24/7, including holidays and after hours. It sounds natural, handles FAQs, and routes urgent calls instantly.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {[
                      { icon: Phone, label: "24/7 Call Handling", desc: "Every call answered professionally, day or night." },
                      { icon: Search, label: "Lead Qualification", desc: "AI asks the right questions to qualify leads." },
                      { icon: MessageSquare, label: "FAQ Automation", desc: "Common questions answered instantly with accuracy." },
                      { icon: Shield, label: "Spam Filtering", desc: "Built-in detection blocks telemarketers and robo-calls." },
                    ].map((item, i) => (
                      <Card key={i} className="p-3 border-border/60">
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

              <ExpandableServiceCard
                icon={<Calendar className="w-7 h-7 text-primary" />}
                title="Smart Scheduling"
                image={businessScheduling}
                summary="Auto-book appointments, send reminders, sync calendars. Eliminate back-and-forth emails forever."
              >
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">Eliminate the back-and-forth.</strong>{" "}
                    Smart Scheduling books appointments directly into your calendar. Clients book 24/7 through phone, chat, or web, and the AI handles rescheduling and reminders automatically.
                  </p>
                  <div className="grid sm:grid-cols-3 gap-3">
                    {[
                      { icon: Calendar, label: "Auto-Booking", desc: "Books directly with real-time availability." },
                      { icon: Mail, label: "Smart Reminders", desc: "Reduces no-shows by up to 80%." },
                      { icon: CheckCircle, label: "Calendar Sync", desc: "Works with Google, Outlook, and more." },
                    ].map((item, i) => (
                      <Card key={i} className="p-3 text-center border-border/60">
                        <div className="w-9 h-9 mx-auto mb-2 bg-primary/10 rounded-lg flex items-center justify-center">
                          <item.icon className="w-4.5 h-4.5 text-primary" />
                        </div>
                        <h4 className="font-bold text-sm mb-1">{item.label}</h4>
                        <p className="text-xs text-muted-foreground">{item.desc}</p>
                      </Card>
                    ))}
                  </div>
                </div>
              </ExpandableServiceCard>

              <ExpandableServiceCard
                icon={<MessageSquare className="w-7 h-7 text-primary" />}
                title="Customer Support Bot"
                image={businessSupportBot}
                summary="Handle common questions instantly. 24/7 support on website, text, or WhatsApp. Focus your team on complex issues."
              >
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">Turn one-time customers into lifelong fans.</strong>{" "}
                    Our support bots handle instant FAQ responses, post-service check-ins, review requests, and re-engagement campaigns automatically.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {[
                      { icon: CheckCircle, label: "Post-Service Check-Ins", desc: "Personalized follow-ups within 24-48 hours." },
                      { icon: Sparkles, label: "Review Requests", desc: "Happy customers prompted to leave reviews." },
                      { icon: Mail, label: "Re-Engagement", desc: "Personalized 'we miss you' messages." },
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

              <ExpandableServiceCard
                icon={<Calendar className="w-7 h-7 text-primary" />}
                title="Intake & Scheduling"
                image={businessIntake}
                summary="Collect client info, qualify leads, book meetings automatically. Eliminate back-and-forth emails."
              >
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">Streamline your client onboarding.</strong>{" "}
                    Our intake system collects information, qualifies leads, and schedules appointments, saving hours of administrative work every week.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {[
                      { icon: FileText, label: "Smart Intake Forms", desc: "Custom forms with conditional logic." },
                      { icon: Search, label: "Lead Scoring", desc: "Auto-score and prioritize leads." },
                      { icon: Lock, label: "Privacy-Conscious", desc: "Secure handling for healthcare, legal, finance." },
                      { icon: CheckCircle, label: "CRM Integration", desc: "Syncs with Salesforce, HubSpot, and more." },
                    ].map((item, i) => (
                      <Card key={i} className="p-3 border-border/60">
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
            </div>
          </div>
        </section>

        {/* Veterans Discount */}
        <section className="py-4 bg-muted border-y border-border/40">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center gap-3 text-center">
              <span className="text-xl">🇺🇸</span>
              <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                <Shield className="w-3 h-3 mr-1" />
                10% OFF
              </Badge>
              <span className="text-sm font-medium">
                Veterans & First Responders receive automatic discount at checkout
              </span>
            </div>
          </div>
        </section>

        {/* ═══════════════════ WEB DESIGN ═══════════════════ */}
        <section id="website-design" className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <SectionHeader
              badge="Web Design"
              title="Professional Website Design"
              subtitle="Custom websites that convert visitors into customers, built for security, speed, and success"
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
              <PricingCard
                tag="⚡ QUICK START"
                tagColor="from-primary to-violet-500"
                title="Landing Page"
                price="$1,500"
                priceNote="2-Week Delivery"
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
                    description: "Single-page website for campaigns or simple business presence - 2-Week Delivery",
                  });
                  setInquiryDialogOpen(true);
                }}
              />

              <PricingCard
                tag="⭐ MOST POPULAR"
                featured
                title="Business Website"
                price="$3,500"
                priceNote="3-4 Week Delivery"
                badges={[
                  { text: "🚀 Full SEO", color: "bg-primary/10 text-primary" },
                  { text: "💬 AI Chat", color: "bg-primary/10 text-primary" },
                ]}
                features={[
                  "Multi-page website (up to 8)",
                  "Advanced SEO optimization",
                  "Blog/news section",
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
                    description: "Full business website with SEO, blog, analytics - 3-4 Week Delivery",
                  });
                  setInquiryDialogOpen(true);
                }}
              />

              <PricingCard
                tag="👑 PREMIUM"
                tagColor="from-amber-500 to-orange-500"
                title="E-Commerce"
                price="$7,500"
                priceNote="4-6 Week Delivery"
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
                    description: "Full e-commerce website with payment processing - 4-6 Week Delivery",
                  });
                  setInquiryDialogOpen(true);
                }}
              />
            </div>

            {/* Website Add-Ons */}
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-8">
                <span className="inline-block px-3 py-1 bg-accent/10 rounded-full text-xs font-bold text-accent uppercase tracking-[0.15em] mb-3">
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
                  <Card
                    key={i}
                    className="p-4 text-center border-border/60 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 relative"
                  >
                    {addon.tag && (
                      <span className="absolute top-2 right-2 px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-bold rounded-full">
                        {addon.tag}
                      </span>
                    )}
                    <h4 className="font-bold text-sm mb-1">{addon.name}</h4>
                    <div className={`text-xl font-black ${addon.color} mb-0.5`}>
                      {addon.price}
                    </div>
                    <div className="text-xs text-muted-foreground">{addon.note}</div>
                  </Card>
                ))}
              </div>
              <div className="mt-6 text-center">
                <Button
                  variant="outline"
                  className="rounded-full"
                  onClick={() => {
                    setSelectedInquiry({
                      name: "Custom Website Package",
                      price: 0,
                      tier: "Custom Bundle",
                      description: "Let us create a custom package with your chosen add-ons and services",
                    });
                    setInquiryDialogOpen(true);
                  }}
                >
                  Get Custom Quote →
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════ WEBSITE INSURANCE ═══════════════════ */}
        <section id="website-insurance" className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <SectionHeader
              badge="Protect Your Investment"
              title="Website Insurance"
              subtitle="Comprehensive protection for your website: security monitoring, backups, support, and performance optimization"
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
                  note: "Complete protection",
                  features: ["All Essential features", "24/7 Monitoring", "Daily Backups", "Priority Support", "Malware Scanning"],
                },
                {
                  tag: "👑 ENTERPRISE",
                  tagColor: "from-amber-500 to-orange-500",
                  title: "Enterprise",
                  price: "$99",
                  note: "Maximum protection",
                  features: ["All Professional", "Real-Time Backups", "DDoS Protection", "24/7 Dedicated Support", "Global CDN"],
                },
                {
                  tag: "✨ CUSTOM",
                  tagColor: "from-primary via-accent to-primary",
                  title: "Customizable",
                  price: "$29-500",
                  note: "Build your own",
                  features: ["Choose features", "Flexible pricing", "Custom support", "Upgrade anytime"],
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
                  buttonText={i === 3 ? "Build Your Plan" : "Subscribe Now"}
                  onButtonClick={() => {
                    trackButtonClick(`Subscribe Now - Website Insurance ${plan.title}`, "Website Insurance");
                    setWebsiteInsuranceOpen(true);
                  }}
                />
              ))}
            </div>

            {/* Trust badges */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              {[
                { icon: Lock, text: "Secure Payment" },
                { icon: Shield, text: "30-Day Guarantee" },
                { icon: CheckCircle, text: "Cancel Anytime" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-1.5 px-3 py-1.5 bg-card rounded-full border border-border/60 text-xs">
                  <item.icon className="w-3.5 h-3.5 text-primary" />
                  <span className="font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════ AI AGENTS PRICING ═══════════════════ */}
        <section id="automation-pricing" className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <SectionHeader
              badge="AI Automation"
              title="AI Agents & Automation Pricing"
              subtitle="Stop losing customers to missed calls and slow follow-ups. Our AI agents work around the clock."
            >
              <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground mt-4">
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-primary" /> 30-Day Guarantee
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Lock className="w-4 h-4 text-primary" /> Secure Setup
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Phone className="w-4 h-4 text-primary" /> 24/7 Support
                </span>
              </div>
            </SectionHeader>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <PricingCard
                tag="🎯 START HERE"
                tagColor="from-primary to-violet-500"
                title="AI Receptionist & Intake Agent"
                price="$9,500"
                priceNote="Quick 2-Week Setup"
                badges={[
                  { text: "⚡ 24/7 Active", color: "bg-primary/10 text-primary" },
                  { text: "✓ Includes Training", color: "bg-primary/10 text-primary" },
                ]}
                features={["24/7 call & chat handling", "Appointment booking", "Lead qualification"]}
                buttonText="GET STARTED →"
                onButtonClick={() => {
                  trackButtonClick("Get Started - AI Receptionist", "Business Pricing");
                  setSelectedInquiry({
                    name: "AI Receptionist & Intake Agent",
                    price: 9500,
                    tier: "START HERE",
                    description: "Answer calls/chats 24/7, book appointments, route to the right person, and never miss a lead.",
                  });
                  setInquiryDialogOpen(true);
                }}
              />

              <PricingCard
                tag="⭐ MOST POPULAR"
                featured
                title="Follow-Up Automation System"
                price="$12,500"
                priceNote="Most ROI"
                badges={[
                  { text: "🚀 10x Leads", color: "bg-primary/10 text-primary" },
                  { text: "✓ Multi-Channel", color: "bg-primary/10 text-primary" },
                ]}
                features={["Email & SMS campaigns", "Lead nurturing flows", "Analytics dashboard"]}
                buttonText="GET STARTED →"
                onButtonClick={() => {
                  trackButtonClick("Get Started - Full Automation", "Business Pricing");
                  setSelectedInquiry({
                    name: "Follow-Up Automation System",
                    price: 12500,
                    tier: "MOST POPULAR",
                    description: "Automated email/SMS campaigns, lead nurturing, and multi-channel follow-ups to 10x your leads.",
                  });
                  setInquiryDialogOpen(true);
                }}
              />

              <PricingCard
                tag="👑 ENTERPRISE"
                tagColor="from-amber-500 to-orange-500"
                title="Custom Automation Suite"
                price="$25,000+"
                priceNote="Full Customization"
                badges={[
                  { text: "🔧 Custom Built", color: "bg-primary/10 text-primary" },
                  { text: "✓ Priority Support", color: "bg-primary/10 text-primary" },
                ]}
                features={["Multi-system integration", "Custom workflows", "Dedicated support team"]}
                buttonText="GET STARTED →"
                onButtonClick={() => {
                  trackButtonClick("Get Started - Custom Solution", "Business Pricing");
                  setSelectedInquiry({
                    name: "Custom Automation Suite",
                    price: 25000,
                    tier: "ENTERPRISE",
                    description: "Full custom-built AI automation for multi-system operations with priority support.",
                  });
                  setInquiryDialogOpen(true);
                }}
              />
            </div>

            {/* Trust below pricing */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              {[
                { icon: Lock, text: "Secure Payment", color: "text-primary" },
                { icon: Shield, text: "30-Day Guarantee", color: "text-primary" },
                { icon: CheckCircle, text: "Free Consultation", color: "text-primary" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-1.5 px-3 py-1.5 bg-muted rounded-full border border-border/60 text-xs">
                  <item.icon className={`w-3.5 h-3.5 ${item.color}`} />
                  <span className="font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════ AI SERVICES INSURANCE ═══════════════════ */}
        <section id="insurance" className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <SectionHeader
              badge="Protection & Maintenance"
              title="AI Services Insurance"
              subtitle="Protect your AI investment with ongoing maintenance, updates, and support, regardless of where you purchased your agent."
            />

            {/* Payment Toggle */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <Label
                htmlFor="insurance-toggle"
                className={`text-base font-semibold ${!isYearly ? "text-primary" : "text-muted-foreground"}`}
              >
                Monthly
              </Label>
              <Switch
                id="insurance-toggle"
                checked={isYearly}
                onCheckedChange={setIsYearly}
              />
              <Label
                htmlFor="insurance-toggle"
                className={`text-base font-semibold ${isYearly ? "text-primary" : "text-muted-foreground"}`}
              >
                Yearly <span className="text-sm text-primary">(Save 10%)</span>
              </Label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
              {/* Basic Care */}
              <PricingCard
                tag="🛡️ STARTER"
                tagColor="from-slate-500 to-slate-600"
                title="Basic Care"
                price={getInsurancePrice(199).display}
                priceSuffix={getInsurancePrice(199).period}
                priceNote="Essential Coverage"
                features={[
                  "Monthly health check",
                  "Security patches",
                  "Email support",
                  "Uptime monitoring",
                ]}
                buttonText="Subscribe Now"
                onButtonClick={() => {
                  trackButtonClick("Subscribe - AI Insurance Basic", "AI Insurance");
                  handleSubscribe(
                    "price_1SjwUQJ8osfwYbX7C2ZD3f40",
                    "AI Service Insurance",
                    "Basic Care",
                    19900,
                    "default",
                  );
                }}
              />

              {/* Standard */}
              <PricingCard
                tag="⭐ RECOMMENDED"
                featured
                title="Standard Care"
                price={getInsurancePrice(399).display}
                priceSuffix={getInsurancePrice(399).period}
                priceNote="Full Protection"
                features={[
                  "Everything in Basic",
                  "Weekly optimization",
                  "Priority support",
                  "Performance tuning",
                  "Quarterly reviews",
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
                    description: "Custom SLA and enterprise-grade AI maintenance",
                  });
                  setInquiryDialogOpen(true);
                }}
              />
            </div>

            {/* Universal Support */}
            <Card className="max-w-4xl mx-auto mt-12 p-8 border-border/60 rounded-2xl">
              <div className="text-center mb-6">
                <span className="inline-block px-3 py-1 bg-primary/10 rounded-full text-xs font-bold text-primary uppercase tracking-[0.15em] mb-3">
                  Universal AI Support
                </span>
                <h3 className="text-2xl font-bold mb-2">
                  We Support AI Agents From Any Vendor
                </h3>
                <p className="text-muted-foreground text-sm max-w-2xl mx-auto">
                  Wherever you purchased your AI, we can help. We fix, optimize, secure, and develop AI systems from any platform worldwide.
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-6 mb-6">
                {["🔧 Resuscitate", "⚡ Optimize", "🛡️ Secure", "🚀 Develop"].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                      <span>{item.split(" ")[0]}</span>
                    </div>
                    <span className="font-medium">{item.split(" ")[1]}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
                <span><strong className="text-foreground">No Contracts</strong> · Cancel anytime</span>
                <span><strong className="text-foreground">Any Platform</strong> · Worldwide support</span>
                <span><strong className="text-foreground">24-48hr Response</strong> · Fast turnaround</span>
              </div>
            </Card>
          </div>
        </section>

        {/* ═══════════════════ AI CONSULTING ═══════════════════ */}
        <section id="ai-consulting" className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <SectionHeader
              badge="Expert AI Guidance"
              title="AI Consulting Services"
              subtitle="Select your situation below to see how we can help"
            />

            <div className="max-w-4xl mx-auto">
              {/* Tab Group */}
              <div className="flex flex-wrap justify-center gap-2 p-2 bg-muted rounded-2xl border border-border/60 mb-8">
                {[
                  { key: "thinking" as const, label: "💭 Thinking About AI", color: "bg-primary" },
                  { key: "buying" as const, label: "🔍 Buying AI", color: "bg-primary" },
                  { key: "bought" as const, label: "🛡️ Already Bought AI", color: "bg-primary" },
                  { key: "leaving" as const, label: "🚪 Want to Leave AI", color: "bg-primary" },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveConsultingTab(tab.key)}
                    className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 flex-1 min-w-[130px] ${
                      activeConsultingTab === tab.key
                        ? `${tab.color} text-primary-foreground shadow-md`
                        : "hover:bg-card text-muted-foreground"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Content */}
              <Card className="p-8 border-border/60 rounded-2xl">
                {activeConsultingTab === "thinking" && (
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <span className="text-3xl">💭</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-3">Thinking About AI</h3>
                    <Badge className="bg-primary/10 text-primary border-0 mb-4">FREE Consultation</Badge>
                    <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
                      Not sure if AI is right for your business? We'll help you explore the possibilities, understand the costs, and see if AI can genuinely help you grow.
                    </p>
                    <ul className="text-left max-w-md mx-auto space-y-2 mb-6">
                      {["30-minute discovery call", "Business needs assessment", "AI opportunity identification", "No obligation recommendation"].map((item, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-primary" />
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
                    >
                      Book Free Consultation
                    </Button>
                  </div>
                )}

                {activeConsultingTab === "buying" && (
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <span className="text-3xl">🔍</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-3">Buying AI</h3>
                    <Badge className="bg-primary/10 text-primary border-0 mb-4">$1,799 - Pre-Purchase Vetting</Badge>
                    <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
                      Before you commit, let us analyze it. We'll check for hidden costs, security risks, data privacy concerns, and whether it can deliver the ROI promised.
                    </p>
                    <ul className="text-left max-w-md mx-auto space-y-2 mb-6">
                      {["Full vendor security assessment", "Hidden cost analysis", "ROI projection review", "Data privacy compliance check", "Written report with recommendations"].map((item, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-primary" />
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
                    >
                      Get Pre-Purchase Vetting
                    </Button>
                  </div>
                )}

                {activeConsultingTab === "bought" && (
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <span className="text-3xl">🛡️</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-3">Already Bought AI</h3>
                    <Badge className="bg-primary/10 text-primary border-0 mb-4">From $3,499 - Security Audit</Badge>
                    <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
                      Already using AI but not sure if it's secure or performing well? We'll audit your current AI system to find vulnerabilities and optimize performance.
                    </p>
                    <ul className="text-left max-w-md mx-auto space-y-2 mb-6">
                      {["Complete security vulnerability scan", "Performance optimization review", "Data handling audit", "Compliance verification", "Detailed remediation plan"].map((item, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-primary" />
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
                    >
                      Get Security Audit
                    </Button>
                  </div>
                )}

                {activeConsultingTab === "leaving" && (
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <span className="text-3xl">🚪</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-3">Want to Leave AI</h3>
                    <Badge className="bg-primary/10 text-primary border-0 mb-4">$2,499 - Safe Exit Strategy</Badge>
                    <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
                      Stuck with an AI tool that's not working? We'll help you safely exit, migrate your data, and find better alternatives.
                    </p>
                    <ul className="text-left max-w-md mx-auto space-y-2 mb-6">
                      {["Contract review & exit strategy", "Data migration planning", "Alternative solution research", "Transition support", "30 days post-exit monitoring"].map((item, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-primary" />
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
                    >
                      Get Safe Exit Strategy
                    </Button>
                  </div>
                )}
              </Card>
            </div>
          </div>
        </section>

        {/* ═══════════════════ WHY CHOOSE US ═══════════════════ */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <SectionHeader
              badge="Why Choose Us"
              title="The InVision Difference"
              subtitle="What sets us apart from generic AI vendors"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto mb-10">
              {[
                { icon: Shield, title: "Security-First Approach", desc: "Every solution is built with enterprise-grade security. Your data is encrypted, monitored, and protected.", color: "text-primary" },
                { icon: Lock, title: "No Vendor Lock-In", desc: "We build on open standards. Want to take it in-house later? You can. Your AI, your data, your choice.", color: "text-primary" },
                { icon: FileText, title: "Plain-English Documentation", desc: "Your team gets documentation they can actually understand. No tech jargon, just clarity.", color: "text-primary" },
                { icon: Sparkles, title: "Rapid Deployment", desc: "Most AI solutions go live in 2-4 weeks. We move fast without compromising quality or security.", color: "text-primary" },
                { icon: CheckCircle, title: "Ongoing Partnership", desc: "We don't disappear after launch. Continuous support, updates, and optimization as your business grows.", color: "text-primary" },
                { icon: Phone, title: "24/7 Support", desc: "Get help when you need it. Our team is available around the clock for critical issues.", color: "text-primary" },
              ].map((item, i) => (
                <Card
                  key={i}
                  className="p-5 border-border/60 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 rounded-2xl"
                >
                  <div className="w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center mb-3">
                    <item.icon className={`w-5.5 h-5.5 ${item.color}`} />
                  </div>
                  <h3 className="text-base font-bold mb-1.5">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
                </Card>
              ))}
            </div>

            {/* Stats Bar */}
            <Card className="max-w-4xl mx-auto p-6 border-border/60 rounded-2xl">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                {[
                  { value: "15+", label: "Businesses Served" },
                  { value: "99%+", label: "Uptime Guarantee" },
                  { value: "24/7", label: "Support Available" },
                  { value: "50+", label: "Integrations" },
                ].map((stat, i) => (
                  <div key={i}>
                    <p className="text-3xl font-black text-primary mb-0.5">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </section>

        {/* ═══════════════════ TESTIMONIALS ═══════════════════ */}
        {(isAdmin || businessTestimonials.length > 0) && (
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
              <SectionHeader
                badge="Client Stories"
                title="Business Testimonials"
              />

              {isAdmin && !isLoading && businessTestimonials.length === 0 && (
                <div className="max-w-2xl mx-auto">
                  <Card className="p-10 border-2 border-dashed border-primary/30 text-center rounded-2xl">
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
                  {businessTestimonials.map((testimonial) => {
                    const videoMedia = testimonial.testimonial_media?.find(
                      (m: any) => m.media_type === "video",
                    );
                    return (
                      <TestimonialCard
                        key={testimonial.id}
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
                            title: `${testimonial.name}'s Success`,
                          })
                        }
                      />
                    );
                  })}
                </div>
              )}
            </div>
          </section>
        )}

        {/* Final CTA */}
        <CTASection
          headline="Ready to Deploy AI Safely?"
          variant="image"
          backgroundImage={natureSummer2}
          description="Take the first step towards protecting your business with AI-powered security solutions."
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => setModalOpen(true)}
              size="xl"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-xl"
            >
              SCHEDULE DISCOVERY CALL
            </Button>
            <Button asChild variant="outlineLight" size="xl">
              <Link to="/faq">View Frequently Asked Questions</Link>
            </Button>
          </div>
          <p className="text-white/80 text-sm mt-4">
            15-minute call to discuss your needs, no sales pressure.
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
