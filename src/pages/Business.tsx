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
import { ScrollReveal } from "@/components/ScrollReveal";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { BookingModal } from "@/components/BookingModal";
import { SubscriptionDialog } from "@/components/SubscriptionDialog";
import { ServiceInquiryDialog } from "@/components/ServiceInquiryDialog";
import { WebsiteInsuranceDialog } from "@/components/WebsiteInsuranceDialog";
import { useCounterAnimation } from "@/hooks/useCounterAnimation";
import { trackButtonClick, trackConversion } from "@/utils/analyticsTracker";
import { Phone, Mail, MessageSquare, Calendar, CheckCircle, Search, Shield, Lock, Sparkles, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import heroBusinessEliteMeeting from "@/assets/hero-business-elite-meeting.jpg";
import heroBusinessDiverse2 from "@/assets/hero-business-diverse-2.jpg";
import heroBusinessDiverse3 from "@/assets/hero-business-diverse-3.jpg";
import heroBusinessDiverse4 from "@/assets/hero-business-diverse-4.jpg";
import heroBusinessDiverse5 from "@/assets/hero-business-diverse-5.jpg";
import aiSecurityShield from "@/assets/ai-security-shield-3d.png";
import aiBrainHologram from "@/assets/ai-brain-hologram.png";
import securityNetworkIcon from "@/assets/security-network-icon.png";
import automationGearsIcon from "@/assets/automation-gears-icon.png";
import { VideoLightbox } from "@/components/VideoLightbox";
import { SEO } from "@/components/SEO";

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
  const [aiConsultingView, setAiConsultingView] = useState(false);
  const [selectedService, setSelectedService] = useState<{
    type: 'business' | 'website';
    name: string;
    tier?: string;
    price?: number;
  } | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [businessTestimonials, setBusinessTestimonials] = useState<any[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<{ src: string; title: string } | null>(null);
  // Counter animations for pricing cards
  const price1Counter = useCounterAnimation({ end: 9500, duration: 1500, prefix: '$' });
  const price2Counter = useCounterAnimation({ end: 12500, duration: 1500, prefix: '$' });
  const price3Counter = useCounterAnimation({ end: 25000, duration: 1500, prefix: '$', suffix: '+' });

  useEffect(() => {
    checkAdminStatus();
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

  const checkAdminStatus = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        setIsAdmin(false);
        setIsLoading(false);
        return;
      }

      const { data: roles, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .in("role", ["admin", "staff"]);

      if (error) {
        console.error("Error checking admin status:", error);
        setIsAdmin(false);
      } else {
        setIsAdmin(roles && roles.length > 0);
      }
    } catch (error) {
      console.error("Error in checkAdminStatus:", error);
      setIsAdmin(false);
    } finally {
      setIsLoading(false);
    }
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

  const handleSubscribe = (priceId: string, serviceName: string, planTier: string, amount: number, variant?: 'default' | 'buying' | 'existing') => {
    setSelectedSubscription({ priceId, serviceName, planTier, amount, variant });
    setSubscriptionDialogOpen(true);
  };

  const businessHeroImages = [
    { src: heroBusinessEliteMeeting, alt: "Diverse executives smiling in luxury corporate boardroom meeting" },
    { src: heroBusinessDiverse2, alt: "Business professionals shaking hands on trading floor" },
    { src: heroBusinessDiverse3, alt: "Muslim businesswoman leading happy diverse team in boardroom" },
    { src: heroBusinessDiverse4, alt: "Successful Middle Eastern businessman with AI technology in luxury office" },
    { src: heroBusinessDiverse5, alt: "Multicultural executive team in modern glass corporate headquarters" }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />

      <Hero
        backgroundImages={businessHeroImages}
        headline="Grow Your Business with Secure AI Solutions"
        subheadline="Custom AI automation, professional websites, and industry-leading AI Service Insurance"
        showScrollIndicator={true}
      >
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

      <TrustBar />

      {/* Use Cases */}
      <section className="py-20 bg-background relative">
        <FlowingWaves variant="full" opacity={0.12} />
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-center mb-12">What We Build</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ScrollReveal animation="fade-up" delay={0}>
              <Card className="group p-8 transition-all duration-400 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(109,40,217,0.15)]">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-400 group-hover:rotate-[5deg]">
                    <Phone className="w-8 h-8 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-3">AI Receptionist</h3>
                    <p className="text-muted-foreground">
                      Answer calls 24/7, route to right person, book appointments, answer FAQs. Never miss a lead again.
                    </p>
                  </div>
                </div>
              </Card>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={150}>
              <Card className="group p-8 transition-all duration-400 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(109,40,217,0.15)]">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-400 group-hover:rotate-[5deg]">
                    <Mail className="w-8 h-8 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-3">Follow-Up Automation</h3>
                    <p className="text-muted-foreground">
                      Nurture leads, send reminders, follow up after appointments. Turn cold leads into customers.
                    </p>
                  </div>
                </div>
              </Card>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={300}>
              <Card className="group p-8 transition-all duration-400 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(109,40,217,0.15)]">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-400 group-hover:rotate-[5deg]">
                    <MessageSquare className="w-8 h-8 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-3">Customer Support Bot</h3>
                    <p className="text-muted-foreground">
                      Handle common questions instantly on website, text, or WhatsApp. Focus your team on complex issues.
                    </p>
                  </div>
                </div>
              </Card>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={450}>
              <Card className="group p-8 transition-all duration-400 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(109,40,217,0.15)]">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-400 group-hover:rotate-[5deg]">
                    <Calendar className="w-8 h-8 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-3">Intake & Scheduling</h3>
                    <p className="text-muted-foreground">
                      Collect client info, qualify leads, book meetings automatically. Eliminate back-and-forth emails.
                    </p>
                  </div>
                </div>
              </Card>
            </ScrollReveal>
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

      {/* Package Pricing */}
      <section id="automation-pricing" className="py-20 bg-muted relative overflow-hidden">
        <FlowingWaves variant="full" opacity={0.08} />
        {/* Decorative floating icons */}
        <img 
          src={automationGearsIcon} 
          alt="" 
          className="absolute top-20 right-10 w-20 h-20 opacity-30 blur-[1px] animate-float pointer-events-none hidden lg:block" 
          aria-hidden="true"
        />
        <img 
          src={securityNetworkIcon} 
          alt="" 
          className="absolute bottom-20 left-10 w-24 h-24 opacity-25 blur-[1px] animate-float pointer-events-none hidden lg:block" 
          style={{ animationDelay: '2s' }}
          aria-hidden="true"
        />
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-stretch">
            <ScrollReveal animation="slide-left" delay={0}>
              <div className="relative">
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-2 rounded-full text-xs font-bold tracking-wider shadow-lg z-20">
                  🎯 START HERE
                </div>
                <Card className="p-6 md:p-8 active:scale-98 hover:shadow-strong transition-all hover:-translate-y-2 h-full flex flex-col">
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
              <div className="relative h-full">
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-accent text-primary-foreground px-6 py-2 rounded-full text-xs font-bold tracking-wider shadow-lg z-20 animate-pulse" style={{ animationDuration: '3s' }}>
                  ⭐ MOST POPULAR
                </div>
                <Card className="p-6 md:p-8 active:scale-98 border-2 border-primary shadow-[0_8px_30px_rgba(139,92,246,0.15)] hover:shadow-[0_12px_40px_rgba(139,92,246,0.2)] transition-all hover:-translate-y-2 h-full flex flex-col">
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
              <div className="relative h-full">
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-2 rounded-full text-xs font-bold tracking-wider shadow-lg z-20">
                  👑 ENTERPRISE
                </div>
                <Card className="p-6 md:p-8 border-2 border-accent active:scale-98 hover:shadow-strong transition-all hover:-translate-y-2 h-full flex flex-col">
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
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-accent/10 text-accent text-[10px] font-medium rounded-full">
                      🔧 Custom Built
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-success/10 text-success text-[10px] font-medium rounded-full">
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

      {/* Web Design Services */}
      <section id="website-design" className="py-20 bg-background relative overflow-hidden">
        {/* Decorative floating icons */}
        <img 
          src={securityNetworkIcon} 
          alt="" 
          className="absolute top-32 right-8 w-16 h-16 opacity-20 blur-[1px] animate-float pointer-events-none hidden lg:block" 
          style={{ animationDelay: '1s' }}
          aria-hidden="true"
        />
        <div className="container mx-auto px-4 relative z-10">
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

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16 items-stretch">
            {/* Landing Page */}
            <ScrollReveal animation="fade-up" delay={0} threshold={0.2}>
              <div className="relative h-full">
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-2 rounded-full text-xs font-bold tracking-wider shadow-lg z-20">
                  ⚡ QUICK START
                </div>
                <Card className="p-6 rounded-2xl hover:shadow-medium transition-all hover:-translate-y-1 h-full flex flex-col">
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
              <div className="relative h-full">
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-accent text-primary-foreground px-6 py-2 rounded-full text-xs font-bold tracking-wider shadow-lg z-20">
                  ⭐ MOST POPULAR
                </div>
                <Card className="p-6 rounded-2xl shadow-[0_8px_30px_rgba(139,92,246,0.15)] hover:shadow-[0_12px_40px_rgba(139,92,246,0.2)] transition-all border-2 border-primary h-full flex flex-col">
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
              <div className="relative h-full">
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-2 rounded-full text-xs font-bold tracking-wider shadow-lg z-20">
                  🛒 FULL FEATURED
                </div>
                <Card className="p-6 rounded-2xl hover:shadow-medium transition-all hover:-translate-y-1 h-full flex flex-col">
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
        {/* Decorative Shield */}
        <div className="absolute top-1/2 -translate-y-1/2 -right-20 w-80 h-80 opacity-10 pointer-events-none hidden xl:block">
          <img src={aiSecurityShield} alt="" className="w-full h-full object-contain" />
        </div>
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto pt-8">
            {/* Essential Plan */}
            <ScrollReveal animation="fade-up" delay={0}>
              <Card className="p-5 rounded-2xl hover:shadow-medium transition-all hover:-translate-y-1 relative h-full flex flex-col pt-8" style={{ overflow: 'visible' }}>
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-5 py-2 rounded-full text-xs font-bold tracking-wider shadow-lg whitespace-nowrap" style={{ zIndex: 50 }}>
                  ESSENTIAL
                </div>
                <div className="text-center flex-1 flex flex-col">
                  <h3 className="text-lg font-bold mb-2">Essential</h3>
                  <p className="text-3xl font-bold text-primary mb-1">$29<span className="text-sm text-muted-foreground font-normal">/mo</span></p>
                  <p className="text-xs text-muted-foreground mb-4">Basic protection</p>
                  <ul className="space-y-2 mb-6 text-sm text-left flex-1">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                      <span>SSL Management</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                      <span>Weekly Backups</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                      <span>Email Support</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                      <span>Basic Monitoring</span>
                    </li>
                  </ul>
                  <Button 
                    variant="outline" 
                    className="w-full mt-auto"
                    onClick={() => {
                      trackButtonClick('Subscribe Now - Website Insurance Essential', 'Website Insurance');
                      setWebsiteInsuranceOpen(true);
                    }}
                  >
                    Subscribe Now
                  </Button>
                </div>
              </Card>
            </ScrollReveal>

            {/* Professional Plan */}
            <ScrollReveal animation="fade-up" delay={100}>
              <Card className="p-5 rounded-2xl border-2 border-primary shadow-[0_8px_30px_rgba(139,92,246,0.15)] hover:shadow-[0_12px_40px_rgba(139,92,246,0.2)] transition-all h-full flex flex-col pt-8" style={{ overflow: 'visible' }}>
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-accent text-white px-5 py-2 rounded-full text-xs font-bold tracking-wider shadow-lg animate-pulse whitespace-nowrap" style={{ zIndex: 50, animationDuration: '3s' }}>
                  ⭐ MOST POPULAR
                </div>
                <div className="text-center flex-1 flex flex-col">
                  <h3 className="text-lg font-bold mb-2">Professional</h3>
                  <p className="text-3xl font-bold text-primary mb-1">$49<span className="text-sm text-muted-foreground font-normal">/mo</span></p>
                  <p className="text-xs text-muted-foreground mb-4">Complete protection</p>
                  <ul className="space-y-2 mb-6 text-sm text-left flex-1">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                      <span>All Essential features</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                      <span>24/7 Monitoring</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                      <span>Daily Backups</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                      <span>Priority Support</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                      <span>Malware Scanning</span>
                    </li>
                  </ul>
                  <Button 
                    variant="default" 
                    className="w-full mt-auto"
                    onClick={() => {
                      trackButtonClick('Subscribe Now - Website Insurance Professional', 'Website Insurance');
                      setWebsiteInsuranceOpen(true);
                    }}
                  >
                    Subscribe Now
                  </Button>
                </div>
              </Card>
            </ScrollReveal>

            {/* Enterprise Plan */}
            <ScrollReveal animation="fade-up" delay={200}>
              <Card className="p-5 rounded-2xl border-2 border-amber-500/50 hover:shadow-medium transition-all hover:-translate-y-1 h-full flex flex-col pt-8" style={{ overflow: 'visible' }}>
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-5 py-2 rounded-full text-xs font-bold tracking-wider shadow-lg whitespace-nowrap" style={{ zIndex: 50 }}>
                  👑 ENTERPRISE
                </div>
                <div className="text-center flex-1 flex flex-col">
                  <h3 className="text-lg font-bold mb-2">Enterprise</h3>
                  <p className="text-3xl font-bold text-primary mb-1">$99<span className="text-sm text-muted-foreground font-normal">/mo</span></p>
                  <p className="text-xs text-muted-foreground mb-4">Maximum protection</p>
                  <ul className="space-y-2 mb-6 text-sm text-left flex-1">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                      <span>All Professional</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                      <span>Real-Time Backups</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                      <span>DDoS Protection</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                      <span>24/7 Dedicated Support</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                      <span>Global CDN</span>
                    </li>
                  </ul>
                  <Button 
                    variant="default" 
                    className="w-full mt-auto"
                    onClick={() => {
                      trackButtonClick('Subscribe Now - Website Insurance Enterprise', 'Website Insurance');
                      setWebsiteInsuranceOpen(true);
                    }}
                  >
                    Subscribe Now
                  </Button>
                </div>
              </Card>
            </ScrollReveal>

            {/* Custom Plan */}
            <ScrollReveal animation="fade-up" delay={300}>
              <Card className="p-5 rounded-2xl border-2 border-dashed border-primary/40 hover:border-primary transition-all hover:-translate-y-1 h-full flex flex-col bg-gradient-to-br from-background to-primary/5 pt-8" style={{ overflow: 'visible' }}>
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary via-accent to-primary text-white px-5 py-2 rounded-full text-xs font-bold tracking-wider shadow-lg whitespace-nowrap" style={{ zIndex: 50 }}>
                  ✨ CUSTOM
                </div>
                <div className="text-center flex-1 flex flex-col">
                  <h3 className="text-lg font-bold mb-2">Customizable</h3>
                  <p className="text-3xl font-bold text-primary mb-1">$29-500<span className="text-sm text-muted-foreground font-normal">/mo</span></p>
                  <p className="text-xs text-muted-foreground mb-4">Build your own</p>
                  <ul className="space-y-2 mb-6 text-sm text-left flex-1">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                      <span>Choose features</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                      <span>Flexible pricing</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                      <span>Custom support</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                      <span>Upgrade anytime</span>
                    </li>
                  </ul>
                  <Button 
                    variant="default" 
                    className="w-full mt-auto bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
                    onClick={() => {
                      trackButtonClick('Subscribe Now - Website Insurance Custom', 'Website Insurance');
                      setWebsiteInsuranceOpen(true);
                    }}
                  >
                    Build Your Plan
                  </Button>
                </div>
              </Card>
            </ScrollReveal>
          </div>

          {/* Trust Badges */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-background/80 rounded-full border">
              <Lock className="w-4 h-4 text-success" />
              <span className="text-sm font-medium">Secure Payment</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-background/80 rounded-full border">
              <Shield className="w-4 h-4 text-success" />
              <span className="text-sm font-medium">30-Day Guarantee</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-background/80 rounded-full border">
              <CheckCircle className="w-4 h-4 text-success" />
              <span className="text-sm font-medium">Cancel Anytime</span>
            </div>
          </div>
        </div>
      </section>

      {/* AI Services Insurance */}
      <section id="insurance" className="py-20 bg-background relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-10 right-10 w-64 h-64 opacity-20 pointer-events-none hidden lg:block">
          <img src={aiSecurityShield} alt="" className="w-full h-full object-contain animate-pulse" style={{ animationDuration: '4s' }} />
        </div>
        <div className="absolute bottom-10 left-10 w-48 h-48 opacity-15 pointer-events-none hidden lg:block">
          <img src={aiBrainHologram} alt="" className="w-full h-full object-contain animate-pulse" style={{ animationDuration: '5s' }} />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
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
            <div className="relative h-full">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-slate-500 to-slate-600 text-white px-4 py-2 rounded-full text-xs font-bold tracking-wider shadow-lg z-20 whitespace-nowrap">
                🛡️ STARTER
              </div>
              <Card className="p-5 rounded-2xl border-border/50 hover:shadow-medium transition-all hover:-translate-y-1 h-full flex flex-col">
                <div className="flex items-center justify-center gap-1.5 mb-3 text-xs text-success pt-3">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span className="font-medium">Essential Coverage</span>
                </div>
                <h3 className="text-lg font-bold mb-2">Basic Care</h3>
                <p key={isYearly ? 'yearly-199' : 'monthly-199'} className="text-2xl font-bold gradient-text-primary mb-1 price-flip">
                  {getInsurancePrice(199).display}<span className="text-sm text-muted-foreground">{getInsurancePrice(199).period}</span>
                </p>
                {isYearly && (
                  <p className="text-xs text-success mb-3 animate-fade-in">
                    {getInsurancePrice(199).savings}
                  </p>
                )}
                {!isYearly && <div className="h-5 mb-3" />}
                <ul className="space-y-2 mb-5 text-sm flex-1">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                    <span>Monthly health checks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                    <span>Security patch updates</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                    <span>Performance monitoring</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                    <span>Email support (48hr)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                    <span>Quarterly reports</span>
                  </li>
                </ul>
                <Button 
                  onClick={() => {
                    trackButtonClick('Subscribe - Basic Care', 'Business Insurance');
                    trackConversion('insurance_basic', 199);
                    handleSubscribe('price_1QhNnTE7M5RA9HBzMcIcKhEF', 'AI Service Insurance', 'Basic Care', 19900, 'default');
                  }}
                  variant="outline" 
                  className="w-full mt-auto transition-all duration-300 hover:-translate-y-1"
                >
                  Subscribe Now
                </Button>
              </Card>
            </div>

            {/* Standard Care - Featured */}
            <div className="relative h-full">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-accent text-primary-foreground px-4 py-2 rounded-full text-xs font-bold tracking-wider shadow-lg z-20 whitespace-nowrap animate-pulse" style={{ animationDuration: '3s' }}>
                ⭐ MOST POPULAR
              </div>
              <Card className="p-5 border-2 border-primary rounded-2xl shadow-[0_8px_30px_rgba(139,92,246,0.15)] hover:shadow-[0_12px_40px_rgba(139,92,246,0.2)] transition-all h-full flex flex-col">
                <div className="flex items-center justify-center gap-1.5 mb-3 text-xs text-success pt-3">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span className="font-medium">Best Value</span>
                </div>
                <h3 className="text-lg font-bold mb-2">Standard Care</h3>
                <p key={isYearly ? 'yearly-399' : 'monthly-399'} className="text-2xl font-bold gradient-text-primary mb-1 price-flip">
                  {getInsurancePrice(399).display}<span className="text-sm text-muted-foreground">{getInsurancePrice(399).period}</span>
                </p>
                {isYearly && (
                  <p className="text-xs text-success mb-3 animate-fade-in">
                    {getInsurancePrice(399).savings}
                  </p>
                )}
                {!isYearly && <div className="h-5 mb-3" />}
                <ul className="space-y-2 mb-5 text-sm flex-1">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                    <span>Everything in Basic</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                    <span>Weekly health checks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                    <span>Priority bug fixes (24hr)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                    <span>Phone + email support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                    <span>4 hours repair/month</span>
                  </li>
                </ul>
                <Button 
                  onClick={() => {
                    trackButtonClick('Subscribe - Standard Care', 'Business Insurance');
                    trackConversion('insurance_standard', 399);
                    handleSubscribe('price_1QhNnrE7M5RA9HBzbM4WDMIQ', 'AI Service Insurance', 'Standard Care', 39900, 'default');
                  }}
                  variant="default" 
                  className="w-full mt-auto transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(109,40,217,0.2)]"
                >
                  Subscribe Now
                </Button>
              </Card>
            </div>

            {/* Premium Care */}
            <div className="relative h-full">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-full text-xs font-bold tracking-wider shadow-lg z-20 whitespace-nowrap">
                👑 PREMIUM
              </div>
              <Card className="p-5 rounded-2xl border-amber-500/30 hover:shadow-medium transition-all hover:-translate-y-1 h-full flex flex-col">
                <div className="flex items-center justify-center gap-1.5 mb-3 text-xs text-success pt-3">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span className="font-medium">24/7 Coverage</span>
                </div>
                <h3 className="text-lg font-bold mb-2">Premium Care</h3>
                <p key={isYearly ? 'yearly-799' : 'monthly-799'} className="text-2xl font-bold gradient-text-primary mb-1 price-flip">
                  {getInsurancePrice(799).display}<span className="text-sm text-muted-foreground">{getInsurancePrice(799).period}</span>
                </p>
                {isYearly && (
                  <p className="text-xs text-success mb-3 animate-fade-in">
                    {getInsurancePrice(799).savings}
                  </p>
                )}
                {!isYearly && <div className="h-5 mb-3" />}
                <ul className="space-y-2 mb-5 text-sm flex-1">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                    <span>Everything in Standard</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                    <span>24/7 monitoring</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                    <span>Critical response (4hr)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                    <span>12 hours repair/month</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                    <span>Dedicated engineer</span>
                  </li>
                </ul>
                <Button 
                  onClick={() => {
                    trackButtonClick('Subscribe - Premium Care', 'Business Insurance');
                    trackConversion('insurance_premium', 799);
                    handleSubscribe('price_1QhNoHE7M5RA9HBzQWdpJTEh', 'AI Service Insurance', 'Premium Care', 79900, 'default');
                  }}
                  variant="default" 
                  className="w-full mt-auto bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 transition-all duration-300 hover:-translate-y-1"
                >
                  Subscribe Now
                </Button>
              </Card>
            </div>

            {/* Customized Insurance */}
            <div className="relative h-full">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-violet-600 to-purple-600 text-white px-4 py-2 rounded-full text-xs font-bold tracking-wider shadow-lg z-20 whitespace-nowrap">
                🏢 ENTERPRISE
              </div>
              <Card className="p-5 rounded-2xl border-violet-500/30 hover:shadow-medium transition-all hover:-translate-y-1 bg-gradient-to-br from-violet-500/5 to-purple-500/5 h-full flex flex-col">
                <div className="flex items-center justify-center gap-1.5 mb-3 text-xs text-success pt-3">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span className="font-medium">Custom SLA</span>
                </div>
                <h3 className="text-lg font-bold mb-2">Customized</h3>
                <p className="text-2xl font-bold gradient-text-primary mb-1">
                  Custom<span className="text-sm text-muted-foreground"> pricing</span>
                </p>
                <p className="text-xs text-muted-foreground mb-3">
                  Tailored for your needs
                </p>
                <ul className="space-y-2 mb-5 text-sm flex-1">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                    <span>Custom SLA agreements</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                    <span>Multi-location support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                    <span>Unlimited repair hours</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                    <span>Dedicated manager</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                    <span>Custom integrations</span>
                  </li>
                </ul>
                <Button 
                  asChild
                  variant="outline" 
                  className="w-full mt-auto border-violet-500/50 hover:bg-violet-500/10 transition-all duration-300 hover:-translate-y-1"
                >
                  <Link to="/contact?service=ai-insurance&plan=custom">
                    Request Quote
                  </Link>
                </Button>
              </Card>
            </div>
          </div>

          {/* Additional Info Box */}
          <Card className="max-w-5xl mx-auto p-10 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20 rounded-2xl">
            <h3 className="text-2xl font-bold text-center mb-4">
              We Support AI Agents From Any Vendor
            </h3>
            <p className="text-center text-muted-foreground mb-8 text-lg">
              Whether you purchased your AI agent from another company or built it yourself, our insurance plans keep it running smoothly. We provide vendor-agnostic maintenance, troubleshooting, and optimization.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              <div className="text-center">
                <div className="text-2xl font-bold gradient-text-primary mb-2">No Contracts</div>
                <div className="text-sm text-muted-foreground">Cancel anytime</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold gradient-text-primary mb-2">Any Platform</div>
                <div className="text-sm text-muted-foreground">We support all major AI systems</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold gradient-text-primary mb-2">Fast Response</div>
                <div className="text-sm text-muted-foreground">24-48hr standard turnaround</div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Why InVision */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-center mb-12">Why InVision for Your AI</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div className="space-y-6">
              <ScrollReveal animation="slide-left" delay={0} threshold={0.2}>
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-success flex-shrink-0 mt-1 checkmark-pop" style={{ animationDelay: '0.6s' }} />
                  <div>
                    <h3 className="text-xl font-bold mb-2">Security-First Design</h3>
                    <p className="text-muted-foreground">
                      We audit data flows, enforce least-privilege access, and vet vendors. Your customer data stays protected.
                    </p>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal animation="slide-left" delay={100} threshold={0.2}>
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-success flex-shrink-0 mt-1 checkmark-pop" style={{ animationDelay: '0.7s' }} />
                  <div>
                    <h3 className="text-xl font-bold mb-2">Actually Trained</h3>
                    <p className="text-muted-foreground">
                      We don't just "set it and forget it." We train your AI on YOUR business, test thoroughly, and optimize for 30 days.
                    </p>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal animation="slide-left" delay={200} threshold={0.2}>
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-success flex-shrink-0 mt-1 checkmark-pop" style={{ animationDelay: '0.8s' }} />
                  <div>
                    <h3 className="text-xl font-bold mb-2">No Vendor Lock-In</h3>
                    <p className="text-muted-foreground">
                      We build on open standards. If you want to take it in-house later, you can.
                    </p>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal animation="slide-left" delay={300} threshold={0.2}>
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-success flex-shrink-0 mt-1 checkmark-pop" style={{ animationDelay: '0.9s' }} />
                  <div>
                    <h3 className="text-xl font-bold mb-2">Plain-English Handoff</h3>
                    <p className="text-muted-foreground">
                      Your team gets documentation they can actually understand - no tech jargon required.
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            <div className="flex items-center relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-2xl" />
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-br from-success/20 to-emerald-500/20 rounded-full blur-2xl" />
              <img
                src={heroBusinessEliteMeeting}
                alt="Diverse team collaborating on AI solutions"
                className="rounded-2xl shadow-xl relative z-10 hover:scale-[1.02] transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* AI Consulting Services - Combined Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">AI Consulting Services</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-6">
              Expert guidance whether you're considering AI or already have it in place
            </p>
            <div className="max-w-4xl mx-auto bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-cyan-500/10 border border-cyan-500/20 rounded-2xl p-6 mb-8">
              <p className="text-base text-foreground leading-relaxed">
                <strong className="text-cyan-600 dark:text-cyan-400">The AI market is flooded with empty promises and overpriced solutions.</strong> Before you invest thousands in AI tools, let InVision <strong>vet them for you</strong>. We expose hidden costs, security risks, and vendor lock-ins so you make informed decisions. Already have AI? We'll audit it to ensure it's secure, optimized, and actually delivering ROI. <span className="text-primary font-semibold">In this AI revolution, those who navigate wisely win — and InVision is your trusted guide.</span>
              </p>
            </div>
            
            {/* Toggle Buttons */}
            <div className="inline-flex bg-background rounded-full p-1.5 border shadow-sm">
              <Button
                variant={!aiConsultingView ? 'default' : 'ghost'}
                size="lg"
                className={`rounded-full px-8 transition-all ${!aiConsultingView ? '' : 'hover:bg-transparent'}`}
                onClick={() => setAiConsultingView(false)}
              >
                <Search className="w-4 h-4 mr-2" />
                Buying AI?
              </Button>
              <Button
                variant={aiConsultingView ? 'default' : 'ghost'}
                size="lg"
                className={`rounded-full px-8 transition-all ${aiConsultingView ? '' : 'hover:bg-transparent'}`}
                onClick={() => setAiConsultingView(true)}
              >
                <Shield className="w-4 h-4 mr-2" />
                Already Using AI?
              </Button>
            </div>
          </div>

          <div className="max-w-4xl mx-auto">
            {!aiConsultingView ? (
              /* Pre-Purchase Vetting */
              <Card className="p-8 bg-gradient-to-br from-accent/10 to-accent/5 transition-all duration-500 hover:scale-[1.01] hover:shadow-lg border-accent/20 animate-fade-in">
                <div className="flex flex-col md:flex-row items-start gap-6">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-accent to-teal-500 flex items-center justify-center flex-shrink-0">
                    <Search className="w-10 h-10 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-3xl font-bold mb-4">Pre-Purchase AI Vetting</h3>
                    <p className="text-xl mb-4 text-muted-foreground">Don't waste $5,000+ on the wrong solution.</p>
                    <p className="text-sm text-muted-foreground mb-4">Our Pre-Purchase Vetting service:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
                      {[
                        "Reviews the tool for security risks",
                        "Calculates realistic ROI",
                        "Identifies hidden costs & vendor risks",
                        "Recommends 'Buy / Don't Buy / Wait'",
                      ].map((item, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      <div>
                        <p className="text-3xl font-bold text-primary">$1,799</p>
                        <p className="text-xs text-muted-foreground">Full vetting report • Saves thousands</p>
                      </div>
                      <Button 
                        onClick={() => {
                          trackButtonClick('Request AI Vetting', 'Business Consulting');
                          trackConversion('consulting_vetting', 1799);
                          setSelectedService({
                            type: 'business',
                            name: 'Pre-Purchase AI Tool Vetting',
                            price: 1799
                          });
                          setModalOpen(true);
                        }}
                        variant="default"
                        size="lg"
                        className="transition-all duration-300 hover:-translate-y-0.5"
                      >
                        REQUEST VETTING
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ) : (
              /* AI Security Audit */
              <Card className="p-8 bg-gradient-to-br from-amber-100 to-amber-50 dark:from-amber-950/50 dark:to-amber-900/30 transition-all duration-500 hover:scale-[1.01] hover:shadow-lg border-amber-200 dark:border-amber-800 animate-fade-in">
                <div className="flex flex-col md:flex-row items-start gap-6">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center flex-shrink-0">
                    <Shield className="w-10 h-10 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-3xl font-bold mb-4">AI Security Audit</h3>
                    <p className="text-xl mb-4 text-muted-foreground">Is your current AI secure? We audit for:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
                      {[
                        "Data leaks & unauthorized access",
                        "Prompt injection vulnerabilities",
                        "Vendor contract risks",
                        "Compliance gaps (GDPR, HIPAA, etc.)",
                      ].map((item, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <span className="w-4 h-4 rounded-full bg-amber-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <CheckCircle className="w-3 h-3 text-white" />
                          </span>
                          <span className="text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      <div>
                        <p className="text-3xl font-bold text-amber-600 dark:text-amber-400">Starting at $3,499</p>
                        <p className="text-xs text-muted-foreground">Security report + implementation roadmap</p>
                      </div>
                      <Button 
                        onClick={() => {
                          trackButtonClick('Request Security Audit', 'Business Security');
                          trackConversion('consulting_audit', 3499);
                          setSelectedService({
                            type: 'business',
                            name: 'AI Security Audit',
                            price: 3499
                          });
                          setModalOpen(true);
                        }}
                        variant="default"
                        size="lg"
                        className="bg-amber-600 hover:bg-amber-700 transition-all duration-300 hover:-translate-y-0.5"
                      >
                        REQUEST AUDIT
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            )}
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

      {/* Final CTA */}
      <CTASection headline="Ready to Deploy AI Safely?" variant="gold">
        <Button asChild variant="gold" size="xl">
          <Link 
            to="/contact"
            onClick={() => trackButtonClick('Schedule Discovery Call', 'Business CTA')}
          >
            SCHEDULE DISCOVERY CALL
          </Link>
        </Button>
        <p className="text-accent-foreground text-sm mt-4">15-minute call to discuss your needs - no sales pressure.</p>
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

      {selectedSubscription && (
        <SubscriptionDialog
          open={subscriptionDialogOpen}
          onOpenChange={setSubscriptionDialogOpen}
          priceId={selectedSubscription.priceId}
          serviceName={selectedSubscription.serviceName}
          planTier={selectedSubscription.planTier}
          amount={selectedSubscription.amount}
          variant={selectedSubscription.variant || 'default'}
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
    </div>
  );
}

export default Business;
