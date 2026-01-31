import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import TestimonialCard from "@/components/TestimonialCard";
import CTASection from "@/components/CTASection";
import FlowingWaves from "@/components/FlowingWaves";
import { PageTransition } from "@/components/PageTransition";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { BookingModal } from "@/components/BookingModal";
import { ServiceInquiryDialog } from "@/components/ServiceInquiryDialog";
import { WebsiteInsuranceDialog } from "@/components/WebsiteInsuranceDialog";
import { EmbeddedPaymentModal } from "@/components/payment/EmbeddedPaymentModal";
import { useCounterAnimation } from "@/hooks/useCounterAnimation";
import { useAdminStatus } from "@/hooks/useAdminStatus";
import { trackButtonClick, trackConversion } from "@/utils/analyticsTracker";
import { AI_SERVICES, AI_INSURANCE_PLANS } from "@/config/products";
import { Phone, Mail, MessageSquare, Calendar, CheckCircle, Search, Shield, Lock, Sparkles, FileText } from "lucide-react";
import { ExpandableServiceCard } from "@/components/ExpandableServiceCard";
import { Badge } from "@/components/ui/badge";

// No decorative images - clean layout

// Rotating hero headlines for Business page
const businessHeadlines = [
  "Grow Your Business with Secure AI Solutions",
  "Custom AI Automation for Your Business",
  "Professional Website Design & Development",
  "Industry-Leading AI Service Insurance"
];
import { natureSummer2 } from "@/config/natureHeroImages";
import { PROFESSIONAL_HERO_IMAGES } from "@/config/professionalHeroImages";
import { VideoLightbox } from "@/components/VideoLightbox";
import { SEO } from "@/components/SEO";
import { RotatingHeadlines } from "@/components/shared/RotatingHeadlines";
import HeroFloatingStats from "@/components/business/HeroFloatingStats";

function Business() {
  const [modalOpen, setModalOpen] = useState(false);
  const [subscriptionDialogOpen, setSubscriptionDialogOpen] = useState(false);
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
    variant?: 'default' | 'buying' | 'existing';
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
  const [activeConsultingTab, setActiveConsultingTab] = useState<'thinking' | 'buying' | 'bought' | 'leaving'>('thinking');
  const [selectedService, setSelectedService] = useState<{
    type: 'business' | 'website';
    name: string;
    tier?: string;
    price?: number;
  } | null>(null);
  const { isAdmin, isLoading } = useAdminStatus();
  const [businessTestimonials, setBusinessTestimonials] = useState<any[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<{ src: string; title: string } | null>(null);

  // Counter animations for pricing cards
  const price1Counter = useCounterAnimation({ end: 9500, duration: 1500, prefix: '$' });
  const price2Counter = useCounterAnimation({ end: 12500, duration: 1500, prefix: '$' });
  const price3Counter = useCounterAnimation({ end: 25000, duration: 1500, prefix: '$', suffix: '+' });

  useEffect(() => {
    fetchBusinessTestimonials();
  }, []);

  const fetchBusinessTestimonials = async () => {
    const { data } = await supabase
      .from("testimonials_public")
      .select(`
        *,
        testimonial_media (*)
      `)
      .eq("has_video", true)
      .order("created_at", { ascending: false })
      .limit(4);
    
    setBusinessTestimonials(data || []);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getInsurancePrice = (monthlyPrice: number) => {
    if (isYearly) {
      const yearlyPrice = monthlyPrice * 12 * 0.9; // 10% discount
      return {
        display: `$${Math.round(yearlyPrice).toLocaleString()}`,
        period: '/year',
        savings: `Save 10% ($${Math.round(monthlyPrice * 12 - yearlyPrice).toLocaleString()}/year)`
      };
    }
    return {
      display: `$${monthlyPrice}`,
      period: '/month',
      savings: ''
    };
  };

  const handleSubscribe = (priceId: string, serviceName: string, planTier: string, amount: number, variant?: 'default' | 'buying' | 'existing', features?: string[]) => {
    // Use embedded payment modal for subscriptions
    setEmbeddedPaymentConfig({
      mode: "subscription",
      priceId,
      productName: `${serviceName} - ${planTier}`,
      amount,
      description: `${serviceName} - Monthly subscription`,
      features
    });
    setEmbeddedPaymentOpen(true);
  };

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
            "name": "AI Business Services",
            "description": "Professional AI automation services for businesses",
            "itemListElement": [
              {
                "@type": "Service",
                "position": 1,
                "name": "AI Receptionist & Virtual Intake Agent",
                "description": "24/7 AI-powered phone answering that sounds human, filters spam, and books appointments automatically",
                "provider": { "@type": "Organization", "name": "InVision Network" },
                "areaServed": { "@type": "State", "name": "Ohio" },
                "offers": { "@type": "Offer", "price": "9500", "priceCurrency": "USD" }
              },
              {
                "@type": "Service",
                "position": 2,
                "name": "AI Follow-Up Automation",
                "description": "Automated lead nurturing, appointment reminders, and customer follow-up systems",
                "provider": { "@type": "Organization", "name": "InVision Network" },
                "offers": { "@type": "Offer", "price": "12500", "priceCurrency": "USD" }
              },
              {
                "@type": "Service",
                "position": 3,
                "name": "Custom AI Automation",
                "description": "Enterprise-grade custom AI solutions tailored to your specific business needs",
                "provider": { "@type": "Organization", "name": "InVision Network" },
                "offers": { "@type": "Offer", "price": "25000", "priceCurrency": "USD" }
              }
            ]
          }}
        />
        <Navigation />

      {/* Hero wrapper with relative positioning for stats bar */}
      <div className="relative">
        <Hero
          backgroundImages={businessHeroImages}
          headline=""
          subheadline=""
          showScrollIndicator={true}
        >
          {/* Transitioning Headlines */}
          <div className="text-center mb-6">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              <RotatingHeadlines headlines={businessHeadlines} className="" />
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
              Transform your business with AI-powered solutions, professional websites, and expert security
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              asChild
              variant="default" 
              size="xl"
              className="transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_8px_20px_rgba(0,0,0,0.15)] hover:brightness-110"
            >
              <Link 
                to="/contact?service=ai-automation"
                onClick={() => trackButtonClick('Build AI Automation', 'Business Hero')}
              >
                Build AI Automation
              </Link>
            </Button>
            <Button 
              asChild
              variant="outlineLight" 
              size="xl"
              className="transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_8px_20px_rgba(0,0,0,0.15)] hover:brightness-110"
            >
              <Link 
                to="/contact?service=web-design"
                onClick={() => trackButtonClick('Design My Website', 'Business Hero')}
              >
                Design My Website
              </Link>
            </Button>
            <Button 
              asChild
              variant="outlineLight" 
              size="xl"
              className="transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_8px_20px_rgba(0,0,0,0.15)] hover:brightness-110"
            >
              <Link 
                to="/contact?service=ai-insurance"
                onClick={() => trackButtonClick('Get AI Insurance', 'Business Hero')}
              >
                Get AI Insurance
              </Link>
            </Button>
          </div>
        </Hero>
        
        {/* Floating Stats Bar - Outside Hero to stay static */}
        <HeroFloatingStats />
      </div>

      {/* Spacer to account for floating stats bar */}
      <div className="h-12" />

      <TrustBar />

      {/* What We Build - Expandable Cards with Full Content */}
      <section className="py-14 bg-background relative">
        <FlowingWaves variant="full" opacity={0.12} />
        
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-8">
            <div className="inline-block px-6 py-2 bg-primary/10 rounded-full text-sm font-bold text-primary mb-3 uppercase tracking-wider">
              Our Services
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">What We Build</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Click on any service to learn more about how we can help your business grow
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {/* AI Receptionist */}
            <ExpandableServiceCard
              icon={<Phone className="w-8 h-8 text-accent" />}
              title="AI Receptionist"
              summary="Answer calls 24/7, route to right person, book appointments, answer FAQs. Never miss a lead again."
              delay={0}
            >
              <div className="space-y-6">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">Never miss another call.</strong> Our AI Receptionist answers every incoming call 24 hours a day, 7 days a week — including holidays, weekends, and after hours. It sounds natural, handles FAQs, and routes urgent calls to the right team member instantly.
                </p>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <Card className="p-4 bg-gradient-to-br from-primary/5 to-transparent">
                    <h4 className="font-bold text-sm mb-2 flex items-center gap-2">
                      <Phone className="w-4 h-4 text-primary" />
                      24/7 Call Handling
                    </h4>
                    <p className="text-muted-foreground text-xs">
                      Your AI receptionist never sleeps. Every call is answered professionally — whether it's 2pm or 2am.
                    </p>
                  </Card>
                  
                  <Card className="p-4 bg-gradient-to-br from-accent/5 to-transparent">
                    <h4 className="font-bold text-sm mb-2 flex items-center gap-2">
                      <Search className="w-4 h-4 text-accent" />
                      Lead Qualification
                    </h4>
                    <p className="text-muted-foreground text-xs">
                      The AI asks the right questions to understand caller needs, qualifying leads before they reach your team.
                    </p>
                  </Card>
                  
                  <Card className="p-4 bg-gradient-to-br from-success/5 to-transparent">
                    <h4 className="font-bold text-sm mb-2 flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-success" />
                      FAQ Automation
                    </h4>
                    <p className="text-muted-foreground text-xs">
                      Common questions about hours, pricing, and services are answered instantly with accurate responses.
                    </p>
                  </Card>
                  
                  <Card className="p-4 bg-gradient-to-br from-blue-500/5 to-transparent">
                    <h4 className="font-bold text-sm mb-2 flex items-center gap-2">
                      <Shield className="w-4 h-4 text-blue-500" />
                      Spam Filtering
                    </h4>
                    <p className="text-muted-foreground text-xs">
                      Built-in spam detection blocks telemarketers and robo-calls before they waste your time.
                    </p>
                  </Card>
                </div>
                
                <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-xl p-4">
                  <p className="text-sm leading-relaxed">
                    <strong className="text-primary">The bottom line:</strong> Businesses miss up to 62% of calls outside business hours. Each missed call costs $200-$500 in potential revenue. With our AI Receptionist, you capture every opportunity.
                  </p>
                </div>
              </div>
            </ExpandableServiceCard>

            {/* Smart Scheduling (formerly Follow-Up Automation) */}
            <ExpandableServiceCard
              icon={<Calendar className="w-8 h-8 text-accent" />}
              title="Smart Scheduling"
              summary="Auto-book appointments, send reminders, sync calendars. Eliminate back-and-forth emails forever."
              delay={150}
            >
              <div className="space-y-6">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">Eliminate the back-and-forth.</strong> Our Smart Scheduling system books appointments directly into your calendar — no human intervention required. Clients can book 24/7 through phone, chat, or web, and the AI handles rescheduling and reminders automatically.
                </p>
                
                <div className="grid sm:grid-cols-3 gap-4">
                  <Card className="p-4 text-center">
                    <div className="w-10 h-10 mx-auto mb-3 bg-accent/10 rounded-full flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-accent" />
                    </div>
                    <h4 className="font-bold text-sm mb-1">Auto-Booking</h4>
                    <p className="text-xs text-muted-foreground">
                      Books directly into your calendar with real-time availability.
                    </p>
                  </Card>
                  
                  <Card className="p-4 text-center">
                    <div className="w-10 h-10 mx-auto mb-3 bg-primary/10 rounded-full flex items-center justify-center">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <h4 className="font-bold text-sm mb-1">Smart Reminders</h4>
                    <p className="text-xs text-muted-foreground">
                      Reduces no-shows by up to 80% with automated SMS/email.
                    </p>
                  </Card>
                  
                  <Card className="p-4 text-center">
                    <div className="w-10 h-10 mx-auto mb-3 bg-success/10 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-success" />
                    </div>
                    <h4 className="font-bold text-sm mb-1">Calendar Sync</h4>
                    <p className="text-xs text-muted-foreground">
                      Works with Google Calendar, Outlook, and more.
                    </p>
                  </Card>
                </div>
                
                <div className="bg-background border rounded-xl p-4">
                  <h4 className="font-bold text-sm mb-3">How It Works:</h4>
                  <ol className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">1</span>
                      <span>Customer calls, chats, or visits your booking page</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">2</span>
                      <span>AI collects info and checks your live availability</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">3</span>
                      <span>Appointment booked with instant confirmation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">4</span>
                      <span>Automated reminders go out before the appointment</span>
                    </li>
                  </ol>
                </div>
              </div>
            </ExpandableServiceCard>

            {/* Customer Support Bot (with Mission Follow-Up content) */}
            <ExpandableServiceCard
              icon={<MessageSquare className="w-8 h-8 text-accent" />}
              title="Customer Support Bot"
              summary="Handle common questions instantly. 24/7 support on website, text, or WhatsApp. Focus your team on complex issues."
              delay={300}
            >
              <div className="space-y-6">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">Turn one-time customers into lifelong fans.</strong> Our support bots handle instant FAQ responses, post-service check-ins, review requests, and re-engagement campaigns automatically. Keep your brand top-of-mind without lifting a finger.
                </p>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h4 className="font-bold text-sm flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-success" />
                      Post-Service Check-Ins
                    </h4>
                    <p className="text-muted-foreground text-xs">
                      Within 24-48 hours of service, your AI sends personalized follow-ups to ensure satisfaction. Issues are flagged immediately.
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-bold text-sm flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-accent" />
                      Review Requests
                    </h4>
                    <p className="text-muted-foreground text-xs">
                      Happy customers are prompted to leave reviews on Google, Yelp, or Facebook with perfect timing.
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-bold text-sm flex items-center gap-2">
                      <Mail className="w-4 h-4 text-primary" />
                      Re-Engagement Campaigns
                    </h4>
                    <p className="text-muted-foreground text-xs">
                      Customers who haven't returned receive personalized "we miss you" messages with special offers.
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-bold text-sm flex items-center gap-2">
                      <Phone className="w-4 h-4 text-blue-500" />
                      Multi-Channel Support
                    </h4>
                    <p className="text-muted-foreground text-xs">
                      Reach customers via SMS, email, WhatsApp, or website chat — wherever they prefer.
                    </p>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-success/10 to-emerald-500/10 border border-success/20 rounded-xl p-4">
                  <p className="text-sm leading-relaxed">
                    <strong className="text-success">ROI Fact:</strong> It costs 5x more to acquire a new customer than retain an existing one. Businesses that actively follow up see <strong>25-95% higher customer lifetime value</strong>.
                  </p>
                </div>
              </div>
            </ExpandableServiceCard>

            {/* Intake & Scheduling */}
            <ExpandableServiceCard
              icon={<Calendar className="w-8 h-8 text-accent" />}
              title="Intake & Scheduling"
              summary="Collect client info, qualify leads, book meetings automatically. Eliminate back-and-forth emails."
              delay={450}
            >
              <div className="space-y-6">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">Streamline your client onboarding.</strong> Our intake system collects all necessary information before meetings, qualifies leads based on your criteria, and schedules appointments seamlessly — saving hours of administrative work every week.
                </p>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <Card className="p-4 bg-gradient-to-br from-primary/5 to-transparent">
                    <h4 className="font-bold text-sm mb-2 flex items-center gap-2">
                      <FileText className="w-4 h-4 text-primary" />
                      Smart Intake Forms
                    </h4>
                    <p className="text-muted-foreground text-xs">
                      Custom forms collect exactly the information you need. Conditional logic shows relevant questions based on responses.
                    </p>
                  </Card>
                  
                  <Card className="p-4 bg-gradient-to-br from-accent/5 to-transparent">
                    <h4 className="font-bold text-sm mb-2 flex items-center gap-2">
                      <Search className="w-4 h-4 text-accent" />
                      Lead Scoring
                    </h4>
                    <p className="text-muted-foreground text-xs">
                      Automatically score and prioritize leads based on their responses. High-value prospects get VIP treatment.
                    </p>
                  </Card>
                  
                  <Card className="p-4 bg-gradient-to-br from-success/5 to-transparent">
                    <h4 className="font-bold text-sm mb-2 flex items-center gap-2">
                      <Lock className="w-4 h-4 text-success" />
                      HIPAA Compliant
                    </h4>
                    <p className="text-muted-foreground text-xs">
                      Secure data handling for healthcare, legal, and financial industries. All information encrypted and protected.
                    </p>
                  </Card>
                  
                  <Card className="p-4 bg-gradient-to-br from-blue-500/5 to-transparent">
                    <h4 className="font-bold text-sm mb-2 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-blue-500" />
                      CRM Integration
                    </h4>
                    <p className="text-muted-foreground text-xs">
                      Automatically sync data to your CRM. Works with Salesforce, HubSpot, and most popular platforms.
                    </p>
                  </Card>
                </div>
                
                <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-xl p-4">
                  <p className="text-sm leading-relaxed">
                    <strong className="text-primary">Time saved:</strong> Businesses using automated intake report saving <strong>10+ hours per week</strong> on administrative tasks. That's 500+ hours per year you can spend on growing your business.
                  </p>
                </div>
              </div>
            </ExpandableServiceCard>
          </div>
        </div>
      </section>

      {/* Veterans Discount Banner - Notification Only */}
      <section className="py-6 bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-center gap-3 text-center">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🇺🇸</span>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                  <Shield className="w-3 h-3 mr-1" />
                  10% OFF
                </Badge>
                <span className="text-sm md:text-base font-medium">
                  Veterans & First Responders receive automatic discount at checkout
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Web Design Services */}
      <section id="website-design" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-block px-6 py-2 bg-primary/10 rounded-full text-sm font-bold text-primary mb-4 uppercase tracking-wider">
              Web Design
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Professional Website Design</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-6">
              Custom websites that convert visitors into customers - built for security, speed, and success
            </p>
            <div className="max-w-4xl mx-auto bg-gradient-to-r from-accent/10 via-primary/10 to-accent/10 border border-accent/20 rounded-2xl p-6">
              <p className="text-base text-foreground leading-relaxed">
                <strong className="text-accent">First impressions matter — your website is often the first thing customers see.</strong> A slow, outdated, or insecure website drives customers away. With InVision, you get a <strong>stunning, fast, mobile-optimized website</strong> that builds trust and converts visitors into paying customers. Every site includes SSL security, SEO optimization, and ongoing support. <span className="text-primary font-semibold">In today's digital world, you can't succeed without a professional online presence — and with InVision, you won't have to.</span>
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16 items-stretch pt-8">
            {/* Landing Page */}
            <ScrollReveal animation="fade-up" delay={0} threshold={0.2}>
              <div className="relative h-full pt-5">
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-violet-500 text-white px-5 py-2 rounded-full text-xs font-bold tracking-wider shadow-lg z-20 whitespace-nowrap">
                  ⚡ QUICK START
                </div>
                <Card className="p-6 pt-8 rounded-2xl hover:shadow-medium transition-all hover:-translate-y-1 h-full flex flex-col border-2 border-transparent hover:border-primary/20">
                  <div className="flex items-center justify-center gap-1.5 mb-4 text-xs text-success pt-2">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span className="font-medium">2-Week Delivery</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Landing Page</h3>
                  <p className="text-muted-foreground mb-4 text-sm">Single-page website for campaigns or simple business presence</p>
                  <p className="text-3xl font-bold text-accent mb-4">$1,500</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-medium rounded-full">
                      🎨 Custom Design
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-success/10 text-success text-[10px] font-medium rounded-full">
                      📱 Mobile-First
                    </span>
                  </div>
                  <ul className="space-y-2 mb-6 text-sm flex-1">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                      <span>Custom responsive design</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                      <span>Contact form integration</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                      <span>Basic SEO setup</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                      <span>1 month hosting included</span>
                    </li>
                  </ul>
                  <Button 
                    variant="default" 
                    className="w-full mt-auto transition-all duration-300 hover:bg-primary/90 hover:shadow-[0_12px_28px_rgba(109,40,217,0.25)]"
                    onClick={() => {
                      trackButtonClick('Get Started - Landing Page', 'Business Website');
                      setSelectedInquiry({
                        name: 'Landing Page',
                        price: 1500,
                        tier: 'Quick Start',
                        description: 'Single-page website for campaigns or simple business presence - 2-Week Delivery'
                      });
                      setInquiryDialogOpen(true);
                    }}
                  >
                    GET STARTED
                  </Button>
                </Card>
              </div>
            </ScrollReveal>

            {/* Business Website - Featured */}
            <ScrollReveal animation="fade-up" delay={150} threshold={0.2}>
              <div className="relative h-full pt-5">
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-accent text-primary-foreground px-5 py-2 rounded-full text-xs font-bold tracking-wider shadow-lg z-20 whitespace-nowrap">
                  ⭐ MOST POPULAR
                </div>
                <Card className="p-6 pt-8 rounded-2xl shadow-[0_8px_30px_hsl(var(--primary)/0.15)] hover:shadow-[0_12px_40px_hsl(var(--primary)/0.2)] transition-all border-2 border-primary h-full flex flex-col">
                  <div className="flex items-center justify-center gap-1.5 mb-4 text-xs text-success pt-2">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span className="font-medium">4-Week Delivery</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Business Website</h3>
                  <p className="text-muted-foreground mb-4 text-sm">5-10 page professional website with custom features</p>
                  <p className="text-3xl font-bold text-accent mb-4">$4,500</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-medium rounded-full">
                      🎨 Custom Design
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-success/10 text-success text-[10px] font-medium rounded-full">
                      📱 Responsive
                    </span>
                  </div>
                  <ul className="space-y-2 mb-6 text-sm flex-1">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                      <span>5-10 custom pages</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                      <span>Contact & booking forms</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                      <span>Advanced SEO optimization</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                      <span>3 months hosting included</span>
                    </li>
                  </ul>
                  <Button 
                    variant="default" 
                    className="w-full mt-auto transition-all duration-300 hover:bg-primary/90 hover:shadow-[0_12px_28px_rgba(109,40,217,0.25)]"
                    onClick={() => {
                      trackButtonClick('Get Started - Business Website', 'Business Website');
                      setSelectedInquiry({
                        name: 'Business Website',
                        price: 4500,
                        tier: 'Most Popular',
                        description: '5-10 page professional website with custom features, mobile responsive, contact & booking forms'
                      });
                      setInquiryDialogOpen(true);
                    }}
                  >
                    GET STARTED
                  </Button>
                </Card>
              </div>
            </ScrollReveal>

            {/* E-Commerce Website */}
            <ScrollReveal animation="fade-up" delay={300} threshold={0.2}>
              <div className="relative h-full pt-5">
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-5 py-2 rounded-full text-xs font-bold tracking-wider shadow-lg z-20 whitespace-nowrap">
                  🛒 FULL FEATURED
                </div>
                <Card className="p-6 pt-8 rounded-2xl hover:shadow-medium transition-all hover:-translate-y-1 h-full flex flex-col border-2 border-transparent hover:border-primary/20">
                  <div className="flex items-center justify-center gap-1.5 mb-4 text-xs text-success pt-2">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span className="font-medium">Complete Solution</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-3">E-Commerce Website</h3>
                  <p className="text-muted-foreground mb-4 text-sm">Full online store with payment processing</p>
                  <p className="text-3xl font-bold text-accent mb-4">$8,500+</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-medium rounded-full">
                      🔒 PCI Compliant
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-success/10 text-success text-[10px] font-medium rounded-full">
                      💳 Payment Ready
                    </span>
                  </div>
                  <ul className="space-y-2 mb-6 text-sm flex-1">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                      <span>Product catalog (50+ items)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                      <span>Secure payment gateway</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                      <span>Inventory management</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                      <span>6 months hosting included</span>
                    </li>
                  </ul>
                  <Button 
                    variant="default" 
                    className="w-full mt-auto transition-all duration-300 hover:bg-primary/90 hover:shadow-[0_12px_28px_rgba(109,40,217,0.25)]"
                    onClick={() => {
                      trackButtonClick('Get Started - E-Commerce', 'Business Website');
                      setSelectedInquiry({
                        name: 'E-Commerce Website',
                        price: 8500,
                        tier: 'Full Featured',
                        description: 'Full online store with payment processing, product catalog, inventory management, and security'
                      });
                      setInquiryDialogOpen(true);
                    }}
                  >
                    GET STARTED
                  </Button>
                </Card>
              </div>
            </ScrollReveal>
          </div>

          {/* Website Add-Ons - Redesigned */}
          <ScrollReveal animation="fade-up" delay={100}>
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 text-accent border border-accent/20 rounded-full text-sm font-medium mb-4">
                  <Sparkles className="w-4 h-4" />
                  Enhance Your Project
                </div>
                <h3 className="text-3xl font-bold mb-3">Premium Add-Ons & Services</h3>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Elevate your website with professional services designed to maximize your online success
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                {/* Logo Design */}
                <Card className="p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-background to-primary/5 border-primary/20 group">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg className="w-7 h-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                    </svg>
                  </div>
                  <h4 className="font-bold text-lg mb-2">Logo Design</h4>
                  <p className="text-xs text-muted-foreground mb-3">Professional brand identity</p>
                  <div className="text-2xl font-bold text-primary mb-1">$500</div>
                  <div className="text-xs text-muted-foreground">Starting price</div>
                </Card>

                {/* Content Writing */}
                <Card className="p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-background to-accent/5 border-accent/20 group">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <FileText className="w-7 h-7 text-accent" />
                  </div>
                  <h4 className="font-bold text-lg mb-2">Content Writing</h4>
                  <p className="text-xs text-muted-foreground mb-3">SEO-optimized copy</p>
                  <div className="text-2xl font-bold text-accent mb-1">$150</div>
                  <div className="text-xs text-muted-foreground">Per page</div>
                </Card>

                {/* Business Email Setup */}
                <Card className="p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-background to-success/5 border-success/20 group">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br from-success/20 to-emerald-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Mail className="w-7 h-7 text-success" />
                  </div>
                  <h4 className="font-bold text-lg mb-2">Business Email</h4>
                  <p className="text-xs text-muted-foreground mb-3">Professional @yourdomain</p>
                  <div className="text-2xl font-bold text-success mb-1">$200</div>
                  <div className="text-xs text-muted-foreground">One-time setup</div>
                </Card>

                {/* AI Chatbot Integration */}
                <Card className="p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-background to-blue-500/5 border-blue-500/20 group relative overflow-hidden">
                  <div className="absolute top-2 right-2 px-2 py-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-[10px] font-bold rounded-full shadow-md z-10">
                    POPULAR
                  </div>
                  <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <MessageSquare className="w-7 h-7 text-blue-500" />
                  </div>
                  <h4 className="font-bold text-lg mb-2">AI Chatbot</h4>
                  <p className="text-xs text-muted-foreground mb-3">24/7 customer support</p>
                  <div className="text-2xl font-bold text-blue-500 mb-1">$1,200</div>
                  <div className="text-xs text-muted-foreground">Full integration</div>
                </Card>

                {/* Domain & Hosting */}
                <Card className="p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-background to-emerald-500/5 border-emerald-500/20 group relative overflow-hidden">
                  <div className="absolute top-2 right-2 px-2 py-1 bg-gradient-to-r from-emerald-500 to-green-500 text-white text-[10px] font-bold rounded-full shadow-md z-10">
                    INCLUDED
                  </div>
                  <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br from-emerald-500/20 to-green-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg className="w-7 h-7 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                  </div>
                  <h4 className="font-bold text-lg mb-2">Domain & Hosting</h4>
                  <p className="text-xs text-muted-foreground mb-3">Full setup included</p>
                  <div className="text-2xl font-bold text-emerald-500 mb-1">FREE</div>
                  <div className="text-xs text-muted-foreground">With any website</div>
                </Card>
              </div>

              {/* CTA for Add-Ons */}
              <div className="mt-10 text-center">
                <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full border border-primary/20">
                  <CheckCircle className="w-5 h-5 text-success" />
                  <span className="text-sm font-medium">All add-ons can be bundled with your website for special pricing</span>
                  <Button 
                    variant="link" 
                    className="text-primary p-0 h-auto"
                    onClick={() => {
                      setSelectedInquiry({
                        name: 'Custom Website Package',
                        price: 0,
                        tier: 'Custom Bundle',
                        description: 'Let us create a custom package with your chosen add-ons and services'
                      });
                      setInquiryDialogOpen(true);
                    }}
                  >
                    Get Custom Quote →
                  </Button>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Website Insurance Section */}
      <section id="website-insurance" className="py-20 bg-muted relative overflow-hidden">
        <FlowingWaves variant="full" opacity={0.08} />
        
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-success/10 text-success border border-success/20 rounded-full text-sm font-medium mb-4">
              <Shield className="w-4 h-4" />
              Protect Your Investment
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Website Insurance</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-6">
              Comprehensive protection for your website - security monitoring, backups, support, and performance optimization
            </p>
            <div className="max-w-4xl mx-auto bg-gradient-to-r from-success/10 via-primary/10 to-success/10 border border-success/20 rounded-2xl p-6 mb-4">
              <p className="text-base text-foreground leading-relaxed">
                <strong className="text-success">Your website is your most valuable digital asset.</strong> In today's world, cyber threats, data loss, and downtime can cost you thousands of dollars and irreparable damage to your reputation. With InVision Website Insurance, you get <strong>24/7 protection, instant backups, and expert support</strong> — so you can focus on growing your business while we keep your site safe, fast, and always online. <span className="text-primary font-semibold">Don't leave your investment unprotected — with InVision, you're never alone.</span>
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto pt-10">
            {/* Essential Plan */}
            <ScrollReveal animation="fade-up" delay={0}>
              <div className="relative pt-5 min-h-[520px]">
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-5 py-2 rounded-full text-sm font-bold tracking-wider shadow-lg whitespace-nowrap z-20">
                  ESSENTIAL
                </div>
                <Card className="p-6 rounded-2xl hover:shadow-medium transition-all hover:-translate-y-1 h-full flex flex-col pt-8 min-h-[480px]">
                  <div className="text-center flex-1 flex flex-col">
                    <h3 className="text-xl font-bold mb-3">Essential</h3>
                    <p className="text-4xl font-bold text-primary mb-2">$29<span className="text-base text-muted-foreground font-normal">/mo</span></p>
                    <p className="text-sm text-muted-foreground mb-5">Basic protection</p>
                    <ul className="space-y-3 mb-6 text-base text-left flex-1">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                        <span>SSL Management</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                        <span>Weekly Backups</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                        <span>Email Support</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                        <span>Basic Monitoring</span>
                      </li>
                      <li className="flex items-center gap-2 opacity-0">
                        <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                        <span>Placeholder</span>
                      </li>
                    </ul>
                    <Button 
                      variant="outline" 
                      className="w-full mt-auto h-12 text-base"
                      onClick={() => {
                        trackButtonClick('Subscribe Now - Website Insurance Essential', 'Website Insurance');
                        setWebsiteInsuranceOpen(true);
                      }}
                    >
                      Subscribe Now
                    </Button>
                  </div>
                </Card>
              </div>
            </ScrollReveal>

            {/* Professional Plan */}
            <ScrollReveal animation="fade-up" delay={100}>
              <div className="relative pt-5 min-h-[520px]">
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-accent text-white px-5 py-2 rounded-full text-sm font-bold tracking-wider shadow-lg animate-pulse whitespace-nowrap z-20" style={{ animationDuration: '3s' }}>
                  ⭐ MOST POPULAR
                </div>
                <Card className="p-6 rounded-2xl border-2 border-primary shadow-[0_8px_30px_rgba(139,92,246,0.15)] hover:shadow-[0_12px_40px_rgba(139,92,246,0.2)] transition-all h-full flex flex-col pt-8 min-h-[480px]">
                  <div className="text-center flex-1 flex flex-col">
                    <h3 className="text-xl font-bold mb-3">Professional</h3>
                    <p className="text-4xl font-bold text-primary mb-2">$49<span className="text-base text-muted-foreground font-normal">/mo</span></p>
                    <p className="text-sm text-muted-foreground mb-5">Complete protection</p>
                    <ul className="space-y-3 mb-6 text-base text-left flex-1">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                        <span>All Essential features</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                        <span>24/7 Monitoring</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                        <span>Daily Backups</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                        <span>Priority Support</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                        <span>Malware Scanning</span>
                      </li>
                    </ul>
                    <Button 
                      variant="default" 
                      className="w-full mt-auto h-12 text-base"
                      onClick={() => {
                        trackButtonClick('Subscribe Now - Website Insurance Professional', 'Website Insurance');
                        setWebsiteInsuranceOpen(true);
                      }}
                    >
                      Subscribe Now
                    </Button>
                  </div>
                </Card>
              </div>
            </ScrollReveal>

            {/* Enterprise Plan */}
            <ScrollReveal animation="fade-up" delay={200}>
              <div className="relative pt-5 min-h-[520px]">
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-5 py-2 rounded-full text-sm font-bold tracking-wider shadow-lg whitespace-nowrap z-20">
                  👑 ENTERPRISE
                </div>
                <Card className="p-6 rounded-2xl border-2 border-amber-500/50 hover:shadow-medium transition-all hover:-translate-y-1 h-full flex flex-col pt-8 min-h-[480px]">
                  <div className="text-center flex-1 flex flex-col">
                    <h3 className="text-xl font-bold mb-3">Enterprise</h3>
                    <p className="text-4xl font-bold text-primary mb-2">$99<span className="text-base text-muted-foreground font-normal">/mo</span></p>
                    <p className="text-sm text-muted-foreground mb-5">Maximum protection</p>
                    <ul className="space-y-3 mb-6 text-base text-left flex-1">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                        <span>All Professional</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                        <span>Real-Time Backups</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                        <span>DDoS Protection</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                        <span>24/7 Dedicated Support</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                        <span>Global CDN</span>
                      </li>
                    </ul>
                    <Button 
                      variant="default" 
                      className="w-full mt-auto h-12 text-base"
                      onClick={() => {
                        trackButtonClick('Subscribe Now - Website Insurance Enterprise', 'Website Insurance');
                        setWebsiteInsuranceOpen(true);
                      }}
                    >
                      Subscribe Now
                    </Button>
                  </div>
                </Card>
              </div>
            </ScrollReveal>

            {/* Custom Plan */}
            <ScrollReveal animation="fade-up" delay={300}>
              <div className="relative pt-5 min-h-[520px]">
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary via-accent to-primary text-white px-5 py-2 rounded-full text-sm font-bold tracking-wider shadow-lg whitespace-nowrap z-20">
                  ✨ CUSTOM
                </div>
                <Card className="p-6 rounded-2xl border-2 border-dashed border-primary/40 hover:border-primary transition-all hover:-translate-y-1 h-full flex flex-col bg-gradient-to-br from-background to-primary/5 pt-8 min-h-[480px]">
                  <div className="text-center flex-1 flex flex-col">
                    <h3 className="text-xl font-bold mb-3">Customizable</h3>
                    <p className="text-4xl font-bold text-primary mb-2">$29-500<span className="text-base text-muted-foreground font-normal">/mo</span></p>
                    <p className="text-sm text-muted-foreground mb-5">Build your own</p>
                    <ul className="space-y-3 mb-6 text-base text-left flex-1">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                        <span>Choose features</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                        <span>Flexible pricing</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                        <span>Custom support</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                        <span>Upgrade anytime</span>
                      </li>
                      <li className="flex items-center gap-2 opacity-0">
                        <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                        <span>Placeholder</span>
                      </li>
                    </ul>
                    <Button 
                      variant="default" 
                      className="w-full mt-auto bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 h-12 text-base"
                      onClick={() => {
                        trackButtonClick('Subscribe Now - Website Insurance Custom', 'Website Insurance');
                        setWebsiteInsuranceOpen(true);
                      }}
                    >
                      Build Your Plan
                    </Button>
                  </div>
                </Card>
              </div>
            </ScrollReveal>
          </div>

          {/* Trust Badges */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-background/80 rounded-full border">
              <Lock className="w-5 h-5 text-success" />
              <span className="text-base font-medium">Secure Payment</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-background/80 rounded-full border">
              <Shield className="w-5 h-5 text-success" />
              <span className="text-base font-medium">30-Day Guarantee</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-background/80 rounded-full border">
              <CheckCircle className="w-4 h-4 text-success" />
              <span className="text-sm font-medium">Cancel Anytime</span>
            </div>
          </div>
        </div>
      </section>

      {/* Package Pricing - AI Agents & Automation */}
      <section id="automation-pricing" className="py-20 bg-background relative">
        <FlowingWaves variant="full" opacity={0.08} />
        <div className="container mx-auto px-4 relative z-10">
          {/* Section Header with Trust */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-success/10 text-success border border-success/20 rounded-full text-sm font-medium mb-4">
              <Shield className="w-4 h-4" />
              Trusted by 100+ Ohio Businesses
            </div>
            <h2 className="mb-4">AI Agents & Automation Pricing</h2>
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground mb-6">
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-success" />
                30-Day Guarantee
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-success" />
                Secure Setup
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Phone className="w-4 h-4 text-primary" />
                24/7 Support
              </span>
            </div>
            <div className="max-w-4xl mx-auto bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border border-primary/20 rounded-2xl p-6">
              <p className="text-base text-foreground leading-relaxed">
                <strong className="text-primary">Stop losing customers to missed calls and slow follow-ups.</strong> Our AI agents work around the clock — answering calls, booking appointments, and following up with leads while you sleep. In today's competitive market, <strong>businesses that respond faster win more customers</strong>. With InVision AI, you never miss an opportunity. <span className="text-accent font-semibold">Your competitors are already using AI — can you afford to fall behind?</span>
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-stretch pt-10">
            <ScrollReveal animation="slide-left" delay={0}>
              <div className="relative pt-5">
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-violet-500 text-white px-6 py-2 rounded-full text-xs font-bold tracking-wider shadow-lg z-20 whitespace-nowrap">
                  🎯 START HERE
                </div>
                <Card className="p-6 md:p-8 pt-6 active:scale-98 hover:shadow-strong transition-all hover:-translate-y-2 h-full flex flex-col border-2 border-transparent hover:border-primary/20">
                  <div className="flex items-center justify-center gap-1.5 mb-4 text-xs text-success">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span className="font-medium">Quick 2-Week Setup</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">AI Receptionist & Intake Agent</h3>
                  <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6">Answer calls/chats 24/7, book appointments, route leads to the right person</p>
                  <p ref={price1Counter.ref} className="text-3xl md:text-4xl font-bold text-accent mb-4 md:mb-6">
                    {price1Counter.displayValue}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-medium rounded-full">
                      ⚡ 24/7 Active
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-success/10 text-success text-[10px] font-medium rounded-full">
                      ✓ Includes Training
                    </span>
                  </div>
                  <ul className="space-y-2 mb-6 text-sm flex-1">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                      <span>24/7 call & chat handling</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                      <span>Appointment booking</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                      <span>Lead qualification</span>
                    </li>
                  </ul>
                  <Button 
                    variant="default" 
                    className="w-full mt-auto transition-all duration-300 md:hover:bg-primary/90 md:hover:shadow-[0_12px_28px_rgba(109,40,217,0.25)] md:hover:scale-[1.02] active:scale-95 h-11 md:h-10"
                    onClick={() => {
                      trackButtonClick('Get Started - AI Receptionist', 'Business Pricing');
                      setSelectedInquiry({
                        name: 'AI Receptionist & Intake Agent',
                        price: 9500,
                        tier: 'START HERE',
                        description: 'Answer calls/chats 24/7, book appointments, route to the right person, and never miss a lead.'
                      });
                      setInquiryDialogOpen(true);
                    }}
                  >
                    GET STARTED →
                  </Button>
                </Card>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="scale-in" delay={200}>
              <div className="relative h-full pt-5">
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-accent text-primary-foreground px-6 py-2 rounded-full text-xs font-bold tracking-wider shadow-lg z-20 whitespace-nowrap">
                  ⭐ MOST POPULAR
                </div>
                <Card className="p-6 md:p-8 pt-6 active:scale-98 border-2 border-primary shadow-[0_8px_30px_hsl(var(--primary)/0.15)] hover:shadow-[0_12px_40px_hsl(var(--primary)/0.2)] transition-all hover:-translate-y-2 h-full flex flex-col">
                  <div className="flex items-center justify-center gap-1.5 mb-4 text-xs text-success">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span className="font-medium">Most ROI</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 mt-2">Follow-Up Automation System</h3>
                  <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6">Automated email/SMS campaigns, lead nurturing to convert more prospects</p>
                  <p ref={price2Counter.ref} className="text-3xl md:text-4xl font-bold text-accent mb-4 md:mb-6">
                    {price2Counter.displayValue}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-medium rounded-full">
                      🚀 10x Leads
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-success/10 text-success text-[10px] font-medium rounded-full">
                      ✓ Multi-Channel
                    </span>
                  </div>
                  <ul className="space-y-2 mb-6 text-sm flex-1">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                      <span>Email & SMS campaigns</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                      <span>Lead nurturing flows</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                      <span>Analytics dashboard</span>
                    </li>
                  </ul>
                  <Button 
                    variant="default" 
                    className="w-full mt-auto transition-all duration-300 md:hover:bg-primary/90 md:hover:shadow-[0_12px_28px_rgba(109,40,217,0.25)] md:hover:scale-[1.02] active:scale-95 h-11 md:h-10"
                    onClick={() => {
                      trackButtonClick('Get Started - Full Automation', 'Business Pricing');
                      setSelectedInquiry({
                        name: 'Follow-Up Automation System',
                        price: 12500,
                        tier: 'MOST POPULAR',
                        description: 'Automated email/SMS campaigns, lead nurturing, and multi-channel follow-ups to 10x your leads.'
                      });
                      setInquiryDialogOpen(true);
                    }}
                  >
                    GET STARTED →
                  </Button>
                </Card>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="slide-right" delay={400}>
              <div className="relative h-full pt-5">
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-2 rounded-full text-xs font-bold tracking-wider shadow-lg z-20 whitespace-nowrap">
                  👑 ENTERPRISE
                </div>
                <Card className="p-6 md:p-8 pt-6 border-2 border-accent active:scale-98 hover:shadow-strong transition-all hover:-translate-y-2 h-full flex flex-col">
                  <div className="flex items-center justify-center gap-1.5 mb-4 text-xs text-success">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span className="font-medium">Full Customization</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">Custom Automation Suite</h3>
                  <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6">Multi-system operations with enterprise-grade integrations</p>
                  <p ref={price3Counter.ref} className="text-3xl md:text-4xl font-bold text-accent mb-4 md:mb-6">
                    {price3Counter.displayValue}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-accent/10 text-emerald-900 text-[10px] font-medium rounded-full">
                      🔧 Custom Built
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-success/10 text-emerald-900 text-[10px] font-medium rounded-full">
                      ✓ Priority Support
                    </span>
                  </div>
                  <ul className="space-y-2 mb-6 text-sm flex-1">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                      <span>Multi-system integration</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                      <span>Custom workflows</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                      <span>Dedicated support team</span>
                    </li>
                  </ul>
                  <Button 
                    variant="default" 
                    className="w-full mt-auto transition-all duration-300 md:hover:bg-primary/90 md:hover:shadow-[0_12px_28px_rgba(109,40,217,0.25)] md:hover:scale-[1.02] active:scale-95 h-11 md:h-10"
                    onClick={() => {
                      trackButtonClick('Get Started - Custom Solution', 'Business Pricing');
                      setSelectedInquiry({
                        name: 'Custom Automation Suite',
                        price: 25000,
                        tier: 'ENTERPRISE',
                        description: 'Full custom-built AI automation for multi-system operations with priority support and complete customization.'
                      });
                      setInquiryDialogOpen(true);
                    }}
                  >
                    GET STARTED →
                  </Button>
                </Card>
              </div>
            </ScrollReveal>
          </div>
          
          {/* Trust Section Below Pricing */}
          <div className="mt-12 text-center">
            <div className="flex flex-wrap items-center justify-center gap-3">
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/5 border border-primary/20 rounded-full text-xs">
                <Lock className="w-3.5 h-3.5 text-primary" />
                <span className="text-primary font-medium">Secure Payment</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-success/5 border border-success/20 rounded-full text-xs">
                <Shield className="w-3.5 h-3.5 text-success" />
                <span className="text-success font-medium">30-Day Guarantee</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-accent/5 border border-accent/20 rounded-full text-xs">
                <CheckCircle className="w-3.5 h-3.5 text-accent" />
                <span className="text-accent font-medium">Free Consultation</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Services Insurance */}
      <section id="insurance" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-block px-6 py-2 bg-primary/10 rounded-full text-sm font-bold text-primary mb-4 uppercase tracking-wider">
              Protection & Maintenance
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">AI Services Insurance</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-6">
              Protect your AI investment with ongoing maintenance, updates, and support - regardless of where you purchased your agent.
            </p>
            <div className="max-w-4xl mx-auto bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/10 border border-amber-500/20 rounded-2xl p-6">
              <p className="text-base text-foreground leading-relaxed">
                <strong className="text-amber-600 dark:text-amber-400">AI technology evolves fast — without proper care, your investment becomes obsolete.</strong> Our AI Services Insurance ensures your agents stay <strong>updated, secure, and performing at peak efficiency</strong>. From security patches to performance optimization, we handle everything so your AI keeps delivering results. <span className="text-primary font-semibold">Don't let your AI investment go to waste — protect it with InVision, because success requires ongoing commitment.</span>
              </p>
            </div>
          </div>

          {/* Payment Period Toggle */}
          <div className="flex items-center justify-center gap-4 mb-10">
            <Label htmlFor="insurance-toggle" className={`text-lg font-semibold ${!isYearly ? 'text-primary' : 'text-muted-foreground'}`}>
              Monthly
            </Label>
            <Switch
              id="insurance-toggle"
              checked={isYearly}
              onCheckedChange={setIsYearly}
              className="transition-all duration-300"
            />
            <Label htmlFor="insurance-toggle" className={`text-lg font-semibold ${isYearly ? 'text-primary' : 'text-muted-foreground'}`}>
              Yearly <span className="text-sm text-success">(Save 10%)</span>
            </Label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 items-stretch">
            {/* Basic Care */}
            <div className="relative h-full min-h-[480px]">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-slate-500 to-slate-600 text-white px-4 py-2 rounded-full text-sm font-bold tracking-wider shadow-lg z-20 whitespace-nowrap">
                🛡️ STARTER
              </div>
              <Card className="p-6 rounded-2xl border-border/50 hover:shadow-medium transition-all hover:-translate-y-1 h-full flex flex-col min-h-[440px]">
                <div className="flex items-center justify-center gap-1.5 mb-3 text-sm text-success pt-3">
                  <CheckCircle className="w-4 h-4" />
                  <span className="font-medium">Essential Coverage</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Basic Care</h3>
                <p key={isYearly ? 'yearly-199' : 'monthly-199'} className="text-3xl font-bold gradient-text-primary mb-2 price-flip">
                  {getInsurancePrice(199).display}<span className="text-base text-muted-foreground">{getInsurancePrice(199).period}</span>
                </p>
                {isYearly && (
                  <p className="text-sm text-success mb-3 animate-fade-in">
                    {getInsurancePrice(199).savings}
                  </p>
                )}
                {!isYearly && <div className="h-6 mb-3" />}
                <ul className="space-y-3 mb-6 text-base flex-1">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                    <span>Monthly health checks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                    <span>Security patch updates</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                    <span>Performance monitoring</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                    <span>Email support (48hr)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                    <span>Quarterly reports</span>
                  </li>
                </ul>
                <Button 
                  onClick={() => {
                    trackButtonClick('Subscribe - Basic Care', 'Business Insurance');
                    trackConversion('insurance_basic', 199);
                    handleSubscribe('price_1SjwUMJ8osfwYbX7hBE9RiPI', 'AI Service Insurance', 'Basic Care', 19900, 'default');
                  }}
                  variant="outline" 
                  className="w-full mt-auto transition-all duration-300 hover:-translate-y-1 h-12 text-base"
                >
                  Subscribe Now
                </Button>
              </Card>
            </div>

            {/* Standard Care - Featured */}
            <div className="relative h-full min-h-[480px]">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-accent text-primary-foreground px-4 py-2 rounded-full text-sm font-bold tracking-wider shadow-lg z-20 whitespace-nowrap animate-pulse" style={{ animationDuration: '3s' }}>
                ⭐ MOST POPULAR
              </div>
              <Card className="p-6 border-2 border-primary rounded-2xl shadow-[0_8px_30px_rgba(139,92,246,0.15)] hover:shadow-[0_12px_40px_rgba(139,92,246,0.2)] transition-all h-full flex flex-col min-h-[440px]">
                <div className="flex items-center justify-center gap-1.5 mb-3 text-sm text-success pt-3">
                  <CheckCircle className="w-4 h-4" />
                  <span className="font-medium">Best Value</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Standard Care</h3>
                <p key={isYearly ? 'yearly-399' : 'monthly-399'} className="text-3xl font-bold gradient-text-primary mb-2 price-flip">
                  {getInsurancePrice(399).display}<span className="text-base text-muted-foreground">{getInsurancePrice(399).period}</span>
                </p>
                {isYearly && (
                  <p className="text-sm text-success mb-3 animate-fade-in">
                    {getInsurancePrice(399).savings}
                  </p>
                )}
                {!isYearly && <div className="h-6 mb-3" />}
                <ul className="space-y-3 mb-6 text-base flex-1">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                    <span>Everything in Basic</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                    <span>Weekly health checks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                    <span>Priority bug fixes (24hr)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                    <span>Phone + email support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                    <span>4 hours repair/month</span>
                  </li>
                </ul>
                <Button 
                  onClick={() => {
                    trackButtonClick('Subscribe - Standard Care', 'Business Insurance');
                    trackConversion('insurance_standard', 399);
                    handleSubscribe('price_1SjwUOJ8osfwYbX7uyyCGLES', 'AI Service Insurance', 'Standard Care', 39900, 'default');
                  }}
                  variant="default" 
                  className="w-full mt-auto transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(109,40,217,0.2)] h-12 text-base"
                >
                  Subscribe Now
                </Button>
              </Card>
            </div>

            {/* Premium Care */}
            <div className="relative h-full min-h-[480px]">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold tracking-wider shadow-lg z-20 whitespace-nowrap">
                👑 PREMIUM
              </div>
              <Card className="p-6 rounded-2xl border-amber-500/30 hover:shadow-medium transition-all hover:-translate-y-1 h-full flex flex-col min-h-[440px]">
                <div className="flex items-center justify-center gap-1.5 mb-3 text-sm text-success pt-3">
                  <CheckCircle className="w-4 h-4" />
                  <span className="font-medium">24/7 Coverage</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Premium Care</h3>
                <p key={isYearly ? 'yearly-799' : 'monthly-799'} className="text-3xl font-bold gradient-text-primary mb-2 price-flip">
                  {getInsurancePrice(799).display}<span className="text-base text-muted-foreground">{getInsurancePrice(799).period}</span>
                </p>
                {isYearly && (
                  <p className="text-sm text-success mb-3 animate-fade-in">
                    {getInsurancePrice(799).savings}
                  </p>
                )}
                {!isYearly && <div className="h-6 mb-3" />}
                <ul className="space-y-3 mb-6 text-base flex-1">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                    <span>Everything in Standard</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                    <span>24/7 monitoring</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                    <span>Critical response (4hr)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                    <span>12 hours repair/month</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                    <span>Dedicated engineer</span>
                  </li>
                </ul>
                <Button 
                  onClick={() => {
                    trackButtonClick('Subscribe - Premium Care', 'Business Insurance');
                    trackConversion('insurance_premium', 799);
                    handleSubscribe('price_1SjwUQJ8osfwYbX7Q5jRWQEt', 'AI Service Insurance', 'Premium Care', 79900, 'default');
                  }}
                  variant="default" 
                  className="w-full mt-auto bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 transition-all duration-300 hover:-translate-y-1 h-12 text-base"
                >
                  Subscribe Now
                </Button>
              </Card>
            </div>

            {/* Customized Insurance */}
            <div className="relative h-full min-h-[480px]">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-violet-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-bold tracking-wider shadow-lg z-20 whitespace-nowrap">
                🏢 ENTERPRISE
              </div>
              <Card className="p-6 rounded-2xl border-violet-500/30 hover:shadow-medium transition-all hover:-translate-y-1 bg-gradient-to-br from-violet-500/5 to-purple-500/5 h-full flex flex-col min-h-[440px]">
                <div className="flex items-center justify-center gap-1.5 mb-3 text-sm text-success pt-3">
                  <CheckCircle className="w-4 h-4" />
                  <span className="font-medium">Custom SLA</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Customized</h3>
                <p className="text-3xl font-bold gradient-text-primary mb-2">
                  Custom<span className="text-base text-muted-foreground"> pricing</span>
                </p>
                <p className="text-sm text-muted-foreground mb-3">
                  Tailored for your needs
                </p>
                <ul className="space-y-3 mb-6 text-base flex-1">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                    <span>Custom SLA agreements</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                    <span>Multi-location support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                    <span>Unlimited repair hours</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                    <span>Dedicated manager</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                    <span>Custom integrations</span>
                  </li>
                </ul>
                <Button 
                  asChild
                  variant="outline" 
                  className="w-full mt-auto border-violet-500/50 hover:bg-violet-500/10 transition-all duration-300 hover:-translate-y-1 h-12 text-base"
                >
                  <Link to="/contact?service=ai-insurance&plan=custom">
                    Request Quote
                  </Link>
                </Button>
              </Card>
            </div>
          </div>

          {/* We Support AI Agents From Any Vendor - Simplified */}
          <div className="mt-16">
            <Card className="max-w-5xl mx-auto p-8 md:p-10 bg-background border rounded-2xl">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-sm font-bold text-primary mb-4">
                  <Sparkles className="w-4 h-4" />
                  UNIVERSAL AI SUPPORT
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-3">
                  We Support AI Agents From Any Vendor
                </h3>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Wherever you purchased your AI, we can help. We fix, optimize, secure, and develop AI systems from any platform worldwide.
                </p>
              </div>

              {/* Simple capability icons */}
              <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-8">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <span>🔧</span>
                  </div>
                  <span className="font-medium">Resuscitate</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                    <span>⚡</span>
                  </div>
                  <span className="font-medium">Optimize</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center">
                    <span>🛡️</span>
                  </div>
                  <span className="font-medium">Secure</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-8 h-8 bg-amber-500/10 rounded-lg flex items-center justify-center">
                    <span>🚀</span>
                  </div>
                  <span className="font-medium">Develop</span>
                </div>
              </div>

              {/* Simple stats */}
              <div className="flex flex-wrap justify-center gap-8 text-center text-sm text-muted-foreground">
                <div>
                  <span className="font-bold text-foreground">No Contracts</span> · Cancel anytime
                </div>
                <div>
                  <span className="font-bold text-foreground">Any Platform</span> · Worldwide support
                </div>
                <div>
                  <span className="font-bold text-foreground">24-48hr Response</span> · Fast turnaround
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* AI Consulting Services - Toggle Layout */}
      <section id="ai-consulting" className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-sm font-bold text-primary mb-4 uppercase tracking-wider">
              <Search className="w-4 h-4" />
              Expert AI Guidance
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">AI Consulting Services</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Select your situation below to see how we can help
            </p>
          </div>

          {/* Toggle Group */}
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap justify-center gap-2 p-2 bg-background rounded-2xl shadow-soft border mb-8">
              <button
                onClick={() => setActiveConsultingTab('thinking')}
                className={`px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 flex-1 min-w-[140px] ${
                  activeConsultingTab === 'thinking'
                    ? 'bg-emerald-500 text-white shadow-lg'
                    : 'hover:bg-muted text-muted-foreground'
                }`}
              >
                💭 Thinking About AI
              </button>
              <button
                onClick={() => setActiveConsultingTab('buying')}
                className={`px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 flex-1 min-w-[140px] ${
                  activeConsultingTab === 'buying'
                    ? 'bg-primary text-white shadow-lg'
                    : 'hover:bg-muted text-muted-foreground'
                }`}
              >
                🔍 Buying AI
              </button>
              <button
                onClick={() => setActiveConsultingTab('bought')}
                className={`px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 flex-1 min-w-[140px] ${
                  activeConsultingTab === 'bought'
                    ? 'bg-red-500 text-white shadow-lg'
                    : 'hover:bg-muted text-muted-foreground'
                }`}
              >
                🛡️ Already Bought AI
              </button>
              <button
                onClick={() => setActiveConsultingTab('leaving')}
                className={`px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 flex-1 min-w-[140px] ${
                  activeConsultingTab === 'leaving'
                    ? 'bg-amber-500 text-white shadow-lg'
                    : 'hover:bg-muted text-muted-foreground'
                }`}
              >
                🚪 Want to Leave AI
              </button>
            </div>

            {/* Content Based on Selection */}
            <Card className="p-8 md:p-10 bg-background">
              {activeConsultingTab === 'thinking' && (
                <div className="text-center animate-fade-in">
                  <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-4xl">💭</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-emerald-600 dark:text-emerald-400">Thinking About AI</h3>
                  <div className="inline-block px-4 py-1 bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 rounded-full text-sm font-semibold mb-4">
                    FREE Consultation
                  </div>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
                    Not sure if AI is right for your business? We'll help you explore the possibilities, understand the costs, and see if AI can genuinely help you grow. No pressure, no sales pitch—just honest advice.
                  </p>
                  <ul className="text-left max-w-md mx-auto space-y-2 mb-8">
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-emerald-500" />
                      <span>30-minute discovery call</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-emerald-500" />
                      <span>Business needs assessment</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-emerald-500" />
                      <span>AI opportunity identification</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-emerald-500" />
                      <span>No obligation recommendation</span>
                    </li>
                  </ul>
                  <Button 
                    onClick={() => {
                      trackButtonClick('Book Free AI Discovery', 'Business Consulting');
                      setSelectedService({
                        type: 'business',
                        name: 'AI Discovery Consultation (Free)',
                        tier: 'Free'
                      });
                      setModalOpen(true);
                    }}
                    size="lg"
                    className="bg-emerald-500 hover:bg-emerald-600 px-8"
                  >
                    Book Free Consultation
                  </Button>
                </div>
              )}

              {activeConsultingTab === 'buying' && (
                <div className="text-center animate-fade-in">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-4xl">🔍</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-primary">Buying AI</h3>
                  <div className="inline-block px-4 py-1 bg-primary/20 text-primary rounded-full text-sm font-semibold mb-4">
                    $1,799 - Pre-Purchase Vetting
                  </div>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
                    Found an AI tool you want to buy? Before you commit, let us analyze it. We'll check for hidden costs, security risks, data privacy concerns, and whether it can actually deliver the ROI the vendor promises.
                  </p>
                  <ul className="text-left max-w-md mx-auto space-y-2 mb-8">
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      <span>Full vendor security assessment</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      <span>Hidden cost analysis</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      <span>ROI projection review</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      <span>Data privacy compliance check</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      <span>Written report with recommendations</span>
                    </li>
                  </ul>
                  <Button 
                    onClick={() => {
                      trackButtonClick('Get AI Vetting', 'Business Consulting');
                      trackConversion('consulting_vetting', 1799);
                      setSelectedService({
                        type: 'business',
                        name: 'Pre-Purchase AI Tool Vetting',
                        price: 1799
                      });
                      setModalOpen(true);
                    }}
                    size="lg"
                    className="px-8"
                  >
                    Get Pre-Purchase Vetting
                  </Button>
                </div>
              )}

              {activeConsultingTab === 'bought' && (
                <div className="text-center animate-fade-in">
                  <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-4xl">🛡️</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-red-600 dark:text-red-400">Already Bought AI</h3>
                  <div className="inline-block px-4 py-1 bg-red-500/20 text-red-700 dark:text-red-300 rounded-full text-sm font-semibold mb-4">
                    From $3,499 - Security Audit
                  </div>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
                    Already using AI but not sure if it's secure or performing well? We'll audit your current AI system to find vulnerabilities, optimize performance, and ensure your data isn't at risk.
                  </p>
                  <ul className="text-left max-w-md mx-auto space-y-2 mb-8">
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-red-500" />
                      <span>Complete security vulnerability scan</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-red-500" />
                      <span>Data flow and privacy audit</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-red-500" />
                      <span>Performance optimization review</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-red-500" />
                      <span>ROI analysis since purchase</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-red-500" />
                      <span>Detailed remediation roadmap</span>
                    </li>
                  </ul>
                  <Button 
                    onClick={() => {
                      trackButtonClick('Get AI Security Audit', 'Business Consulting');
                      trackConversion('consulting_audit', 3499);
                      setSelectedService({
                        type: 'business',
                        name: 'AI Security Audit',
                        price: 3499
                      });
                      setModalOpen(true);
                    }}
                    size="lg"
                    className="bg-red-500 hover:bg-red-600 px-8"
                  >
                    Request Security Audit
                  </Button>
                </div>
              )}

              {activeConsultingTab === 'leaving' && (
                <div className="text-center animate-fade-in">
                  <div className="w-20 h-20 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-4xl">🚪</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-amber-600 dark:text-amber-400">Want to Leave AI</h3>
                  <div className="inline-block px-4 py-1 bg-amber-500/20 text-amber-700 dark:text-amber-300 rounded-full text-sm font-semibold mb-4">
                    FREE Exit Consultation
                  </div>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
                    AI not working out? No judgment here. We'll help you safely exit your current AI system, migrate your data, and find alternative solutions that actually work for your business.
                  </p>
                  <ul className="text-left max-w-md mx-auto space-y-2 mb-8">
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-amber-500" />
                      <span>Safe data extraction plan</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-amber-500" />
                      <span>Contract exit review</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-amber-500" />
                      <span>Alternative solution recommendations</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-amber-500" />
                      <span>Migration assistance guidance</span>
                    </li>
                  </ul>
                  <Button 
                    onClick={() => {
                      trackButtonClick('Book Exit Consultation', 'Business Consulting');
                      setSelectedService({
                        type: 'business',
                        name: 'AI Exit Consultation (Free)',
                        tier: 'Free'
                      });
                      setModalOpen(true);
                    }}
                    size="lg"
                    className="bg-amber-500 hover:bg-amber-600 px-8"
                  >
                    Book Free Exit Consultation
                  </Button>
                </div>
              )}
            </Card>
          </div>
        </div>
      </section>

      {/* Why InVision for Your AI - Enhanced Professional Design */}
      <section className="py-20 bg-background relative overflow-hidden">
        <FlowingWaves variant="full" opacity={0.06} />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full text-sm font-bold text-primary mb-4">
              <Sparkles className="w-4 h-4" />
              THE INVISION DIFFERENCE
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Why Choose InVision for Your AI</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Industry-leading expertise, trusted by businesses worldwide
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            {/* Main Benefits Grid - 3 columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              <ScrollReveal animation="fade-up" delay={0} threshold={0.2}>
                <Card className="p-6 h-full hover:shadow-lg transition-all hover:-translate-y-1 border-t-4 border-t-primary">
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Shield className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Security-First Design</h3>
                  <p className="text-muted-foreground text-sm">
                    We audit data flows, enforce least-privilege access, and vet every vendor. Your data stays protected.
                  </p>
                </Card>
              </ScrollReveal>

              <ScrollReveal animation="fade-up" delay={100} threshold={0.2}>
                <Card className="p-6 h-full hover:shadow-lg transition-all hover:-translate-y-1 border-t-4 border-t-accent">
                  <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center mb-4">
                    <span className="text-2xl">🎯</span>
                  </div>
                  <h3 className="text-lg font-bold mb-2">Custom-Trained for Your Business</h3>
                  <p className="text-muted-foreground text-sm">
                    We train AI on YOUR data, test thoroughly, and optimize for 30 days. Real results, not empty promises.
                  </p>
                </Card>
              </ScrollReveal>

              <ScrollReveal animation="fade-up" delay={200} threshold={0.2}>
                <Card className="p-6 h-full hover:shadow-lg transition-all hover:-translate-y-1 border-t-4 border-t-success">
                  <div className="w-14 h-14 bg-success/10 rounded-2xl flex items-center justify-center mb-4">
                    <Lock className="w-7 h-7 text-success" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">No Vendor Lock-In</h3>
                  <p className="text-muted-foreground text-sm">
                    We build on open standards. Want to take it in-house later? You can. Your AI, your data, your choice.
                  </p>
                </Card>
              </ScrollReveal>

              <ScrollReveal animation="fade-up" delay={300} threshold={0.2}>
                <Card className="p-6 h-full hover:shadow-lg transition-all hover:-translate-y-1 border-t-4 border-t-amber-500">
                  <div className="w-14 h-14 bg-amber-500/10 rounded-2xl flex items-center justify-center mb-4">
                    <FileText className="w-7 h-7 text-amber-600" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Plain-English Documentation</h3>
                  <p className="text-muted-foreground text-sm">
                    Your team gets documentation they can actually understand. No tech jargon, just clarity.
                  </p>
                </Card>
              </ScrollReveal>

              <ScrollReveal animation="fade-up" delay={400} threshold={0.2}>
                <Card className="p-6 h-full hover:shadow-lg transition-all hover:-translate-y-1 border-t-4 border-t-cyan-500">
                  <div className="w-14 h-14 bg-cyan-500/10 rounded-2xl flex items-center justify-center mb-4">
                    <span className="text-2xl">⚡</span>
                  </div>
                  <h3 className="text-lg font-bold mb-2">Rapid Deployment</h3>
                  <p className="text-muted-foreground text-sm">
                    Most AI solutions go live in 2-4 weeks. We move fast without compromising quality or security.
                  </p>
                </Card>
              </ScrollReveal>

              <ScrollReveal animation="fade-up" delay={500} threshold={0.2}>
                <Card className="p-6 h-full hover:shadow-lg transition-all hover:-translate-y-1 border-t-4 border-t-rose-500">
                  <div className="w-14 h-14 bg-rose-500/10 rounded-2xl flex items-center justify-center mb-4">
                    <span className="text-2xl">🤝</span>
                  </div>
                  <h3 className="text-lg font-bold mb-2">Ongoing Partnership</h3>
                  <p className="text-muted-foreground text-sm">
                    We don't disappear after launch. Continuous support, updates, and optimization as your business grows.
                  </p>
                </Card>
              </ScrollReveal>
            </div>

            {/* Stats Bar */}
            <Card className="p-8 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 border-primary/20">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div>
                  <p className="text-4xl font-black gradient-text-primary mb-1">15+</p>
                  <p className="text-sm text-muted-foreground">Businesses Served</p>
                </div>
                <div>
                  <p className="text-4xl font-black gradient-text-primary mb-1">99.9%</p>
                  <p className="text-sm text-muted-foreground">Uptime Guarantee</p>
                </div>
                <div>
                  <p className="text-4xl font-black gradient-text-primary mb-1">24/7</p>
                  <p className="text-sm text-muted-foreground">Support Available</p>
                </div>
                <div>
                  <p className="text-4xl font-black gradient-text-primary mb-1">∞</p>
                  <p className="text-sm text-muted-foreground">Platforms Supported</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-center mb-12">Business Testimonials</h2>
          {isAdmin && !isLoading && (
            <div className="max-w-2xl mx-auto">
              <Card className="p-12 border-2 border-dashed border-primary/50 bg-primary/5">
                <div className="flex flex-col items-center text-center gap-4">
                  <div className="text-5xl" style={{ fontSize: '48px' }}>💼</div>
                  <h3 className="text-2xl font-bold">Business Testimonials</h3>
                  <p className="text-muted-foreground">
                    Add client testimonials via Admin Dashboard
                  </p>
                </div>
              </Card>
            </div>
          )}
        </div>
      </section>

      {/* Video Testimonials */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-center mb-12">Video Testimonials</h2>
          {isAdmin && !isLoading && (
            <div className="max-w-2xl mx-auto">
              <Card className="p-12 border-2 border-dashed border-primary/50 bg-primary/5">
                <div className="flex flex-col items-center text-center gap-4">
                  <div className="text-5xl" style={{ fontSize: '48px' }}>🎥</div>
                  <h3 className="text-2xl font-bold">Business Video Testimonials</h3>
                  <p className="text-muted-foreground">
                    Upload customer success stories and video testimonials
                  </p>
                  <Button 
                    variant="default"
                    className="mt-4"
                  >
                    Upload Video
                  </Button>
                </div>
              </Card>
            </div>
          )}
        </div>
      </section>

      {/* Business Success Stories */}
      {businessTestimonials.length > 0 && (
        <section className="py-20 bg-muted">
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <h2 className="text-center mb-4">Client Success Stories</h2>
              <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
                See how businesses are leveraging InVision's AI solutions
              </p>
            </ScrollReveal>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {businessTestimonials.map((testimonial) => {
                const videoMedia = testimonial.testimonial_media?.find((m: any) => m.media_type === "video");
                return (
                  <TestimonialCard
                    key={testimonial.id}
                    name={testimonial.name}
                    location={testimonial.location}
                    quote={testimonial.story.substring(0, 120) + "..."}
                    image={videoMedia?.thumbnail_url || '/placeholder.svg'}
                    rating={testimonial.rating}
                    videoUrl={videoMedia?.file_url}
                    onVideoClick={() => videoMedia && setSelectedVideo({
                      src: videoMedia.file_url,
                      title: `${testimonial.name}'s Success`
                    })}
                  />
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Final CTA with Park Image - Merged Sections */}
      <CTASection 
        headline="Ready to Deploy AI Safely?" 
        variant="image"
        backgroundImage={natureSummer2}
        description="Take the first step towards protecting your business with AI-powered security solutions. Book a free discovery call to discuss your AI automation needs."
      >
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={() => setModalOpen(true)} 
            size="xl" 
            className="bg-primary hover:bg-primary/90 text-white font-bold shadow-xl shadow-black/20"
          >
            SCHEDULE DISCOVERY CALL
          </Button>
          <Button asChild variant="outlineLight" size="xl">
            <Link to="/faq">View Frequently Asked Questions</Link>
          </Button>
        </div>
        <p className="text-white/90 text-sm mt-4 drop-shadow-sm">15-minute call to discuss your needs - no sales pressure.</p>
      </CTASection>

      <Footer />
      
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

      {/* Note: SubscriptionDialog removed - using EmbeddedPaymentModal for all subscriptions */}

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
        />
      )}
      </div>
    </PageTransition>
  );
}

export default Business;
