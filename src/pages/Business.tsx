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
import { ServicePaymentDialog } from "@/components/ServicePaymentDialog";
import { useCounterAnimation } from "@/hooks/useCounterAnimation";
import { trackButtonClick, trackConversion } from "@/utils/analyticsTracker";
import { Phone, Mail, MessageSquare, Calendar, CheckCircle, Search, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import businessCollaboration from "@/assets/business-collaboration.jpg";
import teamCollaboration from "@/assets/team-collaboration.jpg";
import businessDiverse1 from "@/assets/business-diverse-1.jpg";
import heroBusinessNew from "@/assets/hero-business-new.jpg";
import heroBusinessProfessional from "@/assets/hero-business-professional.jpg";
import heroBusiness3d from "@/assets/hero-business-3d.jpg";
import { VideoLightbox } from "@/components/VideoLightbox";
import { SEO } from "@/components/SEO";

function Business() {
  const [modalOpen, setModalOpen] = useState(false);
  const [subscriptionDialogOpen, setSubscriptionDialogOpen] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState<{
    priceId: string;
    serviceName: string;
    planTier: string;
    amount: number;
  } | null>(null);
  const [isYearly, setIsYearly] = useState(false);
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
  
  // Service inquiry dialog state
  const [inquiryDialogOpen, setInquiryDialogOpen] = useState(false);
  const [inquiryData, setInquiryData] = useState<{
    serviceType: 'ai-automation' | 'website-design' | 'ai-consultation' | 'ai-insurance';
    serviceName: string;
    servicePrice?: number;
  } | null>(null);

  // Service payment dialog state
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [paymentData, setPaymentData] = useState<{
    serviceType: 'ai-automation' | 'website-design' | 'ai-consultation';
    serviceName: string;
    servicePrice: number;
    serviceDescription?: string;
  } | null>(null);

  const openInquiryDialog = (serviceType: 'ai-automation' | 'website-design' | 'ai-consultation' | 'ai-insurance', serviceName: string, servicePrice?: number) => {
    setInquiryData({ serviceType, serviceName, servicePrice });
    setInquiryDialogOpen(true);
    trackButtonClick(`Open Inquiry - ${serviceName}`, 'Business Page');
  };

  const openPaymentDialog = (serviceType: 'ai-automation' | 'website-design' | 'ai-consultation', serviceName: string, servicePrice: number, serviceDescription?: string) => {
    setPaymentData({ serviceType, serviceName, servicePrice, serviceDescription });
    setPaymentDialogOpen(true);
    trackButtonClick(`Open Payment - ${serviceName}`, 'Business Page');
  };

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

  const handleSubscribe = (priceId: string, serviceName: string, planTier: string, amount: number) => {
    setSelectedSubscription({ priceId, serviceName, planTier, amount });
    setSubscriptionDialogOpen(true);
  };

  const businessHeroImages = [
    { src: businessDiverse1, alt: "Diverse business team collaborating on AI solutions" },
    { src: heroBusinessNew, alt: "Modern office workspace with technology" },
    { src: heroBusinessProfessional, alt: "Professional business consultation meeting" },
    { src: businessCollaboration, alt: "Team working together on digital transformation" },
    { src: heroBusiness3d, alt: "3D visualization of business technology solutions" }
  ];

  return (
    <div className="min-h-screen">
      <SEO 
        title="AI Business Solutions - Automation, Websites & Insurance"
        description="Transform your business with secure AI solutions. AI receptionists, chatbots, professional websites, and industry-leading AI Service Insurance."
        keywords="AI business solutions, AI receptionist, business automation, AI security, website design, Dayton Ohio"
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "AI for Business", url: "/business" }
        ]}
      />
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

      {/* Veterans Discount Banner - Compact */}
      <section className="py-4 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="container mx-auto px-4">
          <Card className="p-4 bg-card/50 backdrop-blur-sm border-primary/20 max-w-3xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-3 text-center md:text-left">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-xl">
                  🇺🇸
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-base font-bold">Veterans & First Responders</h3>
                <p className="text-muted-foreground text-xs">10% OFF all services</p>
              </div>
              <Button variant="default" size="sm" asChild>
                <Link to="/resources">
                  Claim Discount
                </Link>
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* Package Pricing */}
      <section id="automation-pricing" className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-center mb-12">AI Agents & Automation Pricing</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <ScrollReveal animation="slide-left" delay={0}>
              <div className="relative">
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-cyan-500 to-accent text-white px-4 py-1.5 rounded-full text-xs font-bold tracking-wider shadow-lg z-20">
                  START HERE
                </div>
                <Card className="p-6 md:p-8 pt-10 active:scale-98">
                  <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">AI Receptionist & Intake Agent</h3>
                <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6">24/7 call answering, appointment booking, and lead qualification</p>
                <p ref={price1Counter.ref} className="text-3xl md:text-4xl font-bold text-accent mb-4 md:mb-6">
                  {price1Counter.displayValue}
                </p>
                <ul className="space-y-2 md:space-y-3 mb-6 md:mb-8">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-success flex-shrink-0 mt-0.5" />
                    <span className="text-sm md:text-base">24/7 call answering & live chat</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-success flex-shrink-0 mt-0.5" />
                    <span className="text-sm md:text-base">Automatic appointment booking</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-success flex-shrink-0 mt-0.5" />
                    <span className="text-sm md:text-base">FAQ responses trained on your business</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-success flex-shrink-0 mt-0.5" />
                    <span className="text-sm md:text-base">Lead qualification & intelligent routing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-success flex-shrink-0 mt-0.5" />
                    <span className="text-sm md:text-base">CRM integration</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-success flex-shrink-0 mt-0.5" />
                    <span className="text-sm md:text-base">Multi-language support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-success flex-shrink-0 mt-0.5" />
                    <span className="text-sm md:text-base italic text-muted-foreground">And so more...</span>
                  </li>
                </ul>
                <Button 
                  variant="default" 
                  className="w-full transition-all duration-300 md:hover:bg-primary/90 md:hover:shadow-[0_12px_28px_rgba(109,40,217,0.25)] md:hover:scale-[1.02] active:scale-95 h-11 md:h-10"
                  onClick={() => {
                    openInquiryDialog('ai-automation', 'AI Receptionist & Intake Agent', 9500);
                    trackConversion('business_ai_receptionist', 9500);
                  }}
                >
                  GET STARTED
                </Button>
                </Card>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="scale-in" delay={200}>
              <div className="relative">
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-accent text-primary-foreground px-6 py-2 rounded-full text-xs font-bold tracking-wider shadow-lg z-20">
                  MOST POPULAR
                </div>
                <Card className="p-6 md:p-8 active:scale-98 border-2 border-primary shadow-[0_8px_30px_rgba(139,92,246,0.15)] hover:shadow-[0_12px_40px_rgba(139,92,246,0.2)] transition-all">
                  <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 mt-2">Follow-Up Automation System</h3>
                  <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6">Automated multi-channel campaigns & lead nurturing</p>
                  <p ref={price2Counter.ref} className="text-3xl md:text-4xl font-bold text-accent mb-4 md:mb-6">
                    {price2Counter.displayValue}
                  </p>
                  <ul className="space-y-2 md:space-y-3 mb-6 md:mb-8">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-success flex-shrink-0 mt-0.5" />
                      <span className="text-sm md:text-base">Multi-channel campaigns (email, SMS, WhatsApp)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-success flex-shrink-0 mt-0.5" />
                      <span className="text-sm md:text-base">Automated lead nurturing sequences</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-success flex-shrink-0 mt-0.5" />
                      <span className="text-sm md:text-base">Post-appointment follow-ups</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-success flex-shrink-0 mt-0.5" />
                      <span className="text-sm md:text-base">Review request automation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-success flex-shrink-0 mt-0.5" />
                      <span className="text-sm md:text-base">Re-engagement campaigns</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-success flex-shrink-0 mt-0.5" />
                      <span className="text-sm md:text-base">Advanced analytics & reporting</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-success flex-shrink-0 mt-0.5" />
                      <span className="text-sm md:text-base italic text-muted-foreground">And so more...</span>
                    </li>
                  </ul>
                  <Button 
                    variant="default" 
                    className="w-full transition-all duration-300 md:hover:bg-primary/90 md:hover:shadow-[0_12px_28px_rgba(109,40,217,0.25)] md:hover:scale-[1.02] active:scale-95 h-11 md:h-10"
                    onClick={() => {
                      openInquiryDialog('ai-automation', 'Follow-Up Automation System', 12500);
                      trackConversion('business_full_automation', 12500);
                    }}
                  >
                    GET STARTED
                  </Button>
                </Card>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="slide-right" delay={400}>
              <Card className="p-6 md:p-8 border-2 border-accent active:scale-98 relative">
                <div className="absolute top-3 right-3 z-10">
                  <Badge variant="premium" className="text-xs font-bold">ENTERPRISE</Badge>
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">Custom Automation Suite</h3>
                <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6">Enterprise-level multi-system automation tailored to your business</p>
                <p ref={price3Counter.ref} className="text-3xl md:text-4xl font-bold text-accent mb-4 md:mb-6">
                  {price3Counter.displayValue}
                </p>
                <ul className="space-y-2 md:space-y-3 mb-6 md:mb-8">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-success flex-shrink-0 mt-0.5" />
                    <span className="text-sm md:text-base">Enterprise-level integrations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-success flex-shrink-0 mt-0.5" />
                    <span className="text-sm md:text-base">Custom AI model training</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-success flex-shrink-0 mt-0.5" />
                    <span className="text-sm md:text-base">Dedicated support team</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-success flex-shrink-0 mt-0.5" />
                    <span className="text-sm md:text-base">Multi-department workflow automation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-success flex-shrink-0 mt-0.5" />
                    <span className="text-sm md:text-base">Advanced analytics dashboard</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-success flex-shrink-0 mt-0.5" />
                    <span className="text-sm md:text-base">API access for developers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-success flex-shrink-0 mt-0.5" />
                    <span className="text-sm md:text-base">Priority implementation timeline</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-success flex-shrink-0 mt-0.5" />
                    <span className="text-sm md:text-base italic text-muted-foreground">And so more...</span>
                  </li>
                </ul>
                <Button 
                  variant="default" 
                  className="w-full transition-all duration-300 md:hover:bg-primary/90 md:hover:shadow-[0_12px_28px_rgba(109,40,217,0.25)] md:hover:scale-[1.02] active:scale-95 h-11 md:h-10"
                  onClick={() => {
                    openInquiryDialog('ai-automation', 'Custom Automation Suite', 25000);
                    trackConversion('business_custom_solution', 25000);
                  }}
                >
                  CUSTOMIZABLE
                </Button>
              </Card>
            </ScrollReveal>
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
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Custom websites that convert visitors into customers - built for security, speed, and success
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {/* Landing Page */}
            <ScrollReveal animation="fade-up" delay={0} threshold={0.2}>
              <div className="relative">
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-cyan-500 to-teal-400 text-white px-4 py-1.5 rounded-full text-xs font-bold tracking-wider shadow-lg z-20">
                  QUICK START
                </div>
                <Card className="p-8 pt-10 rounded-2xl hover:shadow-medium transition-all hover:-translate-y-1">
                  <h3 className="text-2xl font-bold mb-4">Landing Page</h3>
                <p className="text-muted-foreground mb-6">Single high-converting page design</p>
                <p className="text-4xl font-bold text-accent mb-6">$1,500</p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                    <span>Single high-converting page design</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                    <span>Mobile-responsive layout</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                    <span>Lead capture forms</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                    <span>SEO optimization</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                    <span>Hosting setup included</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                    <span className="italic text-muted-foreground">And so more...</span>
                  </li>
                </ul>
                <Button 
                  variant="default" 
                  className="w-full transition-all duration-300 hover:bg-primary/90 hover:shadow-[0_12px_28px_rgba(109,40,217,0.25)]"
                  onClick={() => {
                    openPaymentDialog('website-design', 'Landing Page Design', 1500, 'Professional single-page website designed to convert visitors into customers');
                    trackConversion('business_landing_page', 1500);
                  }}
                >
                  PAY $1,500
                </Button>
                </Card>
              </div>
            </ScrollReveal>

            {/* Business Website - Featured */}
            <ScrollReveal animation="fade-up" delay={150} threshold={0.2}>
              <div className="relative">
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-accent text-primary-foreground px-6 py-2 rounded-full text-xs font-bold tracking-wider shadow-lg z-20">
                  MOST POPULAR
                </div>
                <Card className="p-8 rounded-2xl shadow-[0_8px_30px_rgba(139,92,246,0.15)] hover:shadow-[0_12px_40px_rgba(139,92,246,0.2)] transition-all border-2 border-primary">
                  <h3 className="text-2xl font-bold mb-4 mt-2">Business Website</h3>
                <p className="text-muted-foreground mb-6">5-10 page professional website with custom features</p>
                <p className="text-4xl font-bold text-accent mb-6">$4,500</p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                    <span>5-10 custom pages</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                    <span>Full mobile responsive</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                    <span>Contact & booking forms</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                    <span>Advanced SEO optimization</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                    <span>SSL & security setup</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                    <span>3 months hosting included</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                    <span>Google Analytics integration</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                    <span>2 rounds of revisions</span>
                  </li>
                </ul>
                <Button 
                  variant="default" 
                  className="w-full pulse-glow transition-all duration-300 hover:bg-primary/90"
                  onClick={() => {
                    openPaymentDialog('website-design', 'Business Website Design', 4500, 'Professional 5-10 page business website with custom features and SEO optimization');
                    trackConversion('business_website', 4500);
                  }}
                >
                  PAY $4,500
                </Button>
              </Card>
              </div>
            </ScrollReveal>

            {/* E-Commerce Website */}
            <ScrollReveal animation="fade-up" delay={300} threshold={0.2}>
              <div className="relative">
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-1.5 rounded-full text-xs font-bold tracking-wider shadow-lg z-20">
                  FULL FEATURED
                </div>
                <Card className="p-8 pt-10 rounded-2xl hover:shadow-medium transition-all hover:-translate-y-1">
                  <h3 className="text-2xl font-bold mb-4">E-Commerce Website</h3>
                <p className="text-muted-foreground mb-6">Full online store with payment processing</p>
                <p className="text-4xl font-bold text-accent mb-6">$8,500+</p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                    <span>Custom e-commerce design</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                    <span>Product catalog (up to 50 items)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                    <span>Secure payment gateway</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                    <span>Inventory management</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                    <span>SSL & PCI compliance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                    <span>Shopping cart & checkout</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                    <span>Email automation setup</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                    <span>6 months hosting included</span>
                  </li>
                </ul>
                <Button 
                  variant="default" 
                  className="w-full transition-all duration-300 hover:bg-primary/90 hover:shadow-[0_12px_28px_rgba(109,40,217,0.25)]"
                  onClick={() => {
                    openInquiryDialog('website-design', 'E-Commerce Website', 8500);
                    trackConversion('business_ecommerce', 8500);
                  }}
                >
                  CUSTOMIZABLE
                </Button>
                </Card>
              </div>
            </ScrollReveal>
          </div>

          {/* Website Add-Ons */}
          <Card className="max-w-5xl mx-auto p-10 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20 rounded-2xl">
            <h3 className="text-2xl font-bold text-center mb-8">Website Add-Ons & Services</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <div className="font-bold text-primary mb-2">Logo Design</div>
                <div className="text-sm text-muted-foreground">Starting at $500</div>
              </div>
              <div>
                <div className="font-bold text-primary mb-2">Content Writing</div>
                <div className="text-sm text-muted-foreground">$150/page</div>
              </div>
              <div>
                <div className="font-bold text-primary mb-2">Business Email Setup</div>
                <div className="text-sm text-muted-foreground">$200 one-time</div>
              </div>
              <div>
                <div className="font-bold text-primary mb-2">Monthly Maintenance</div>
                <div className="text-sm text-muted-foreground">$99-299/month</div>
              </div>
              <div>
                <div className="font-bold text-primary mb-2">AI Chatbot Integration</div>
                <div className="text-sm text-muted-foreground">$1,200</div>
              </div>
              <div>
                <div className="font-bold text-primary mb-2">Domain & Hosting Setup</div>
                <div className="text-sm text-muted-foreground">Included</div>
              </div>
            </div>
          </Card>
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
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Protect your AI investment with ongoing maintenance, updates, and support - regardless of where you purchased your agent.
            </p>
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

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Basic Care */}
            <Card className="p-6 rounded-2xl border-border/50 hover:shadow-medium transition-all hover:-translate-y-1 relative">
              <div className="absolute top-3 right-3">
                <Badge variant="default" className="text-xs font-bold">STARTER</Badge>
              </div>
              <h3 className="text-xl font-bold mb-3">Basic Care</h3>
              <p key={isYearly ? 'yearly-199' : 'monthly-199'} className="text-3xl font-bold gradient-text-primary mb-2 price-flip">
                {getInsurancePrice(199).display}<span className="text-base text-muted-foreground">{getInsurancePrice(199).period}</span>
              </p>
              {isYearly && (
                <p className="text-sm text-success mb-4 animate-fade-in">
                  {getInsurancePrice(199).savings}
                </p>
              )}
              {!isYearly && <div className="h-6 mb-4" />}
              <ul className="space-y-2 mb-6 text-sm">
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
                  <span>Email support (48hr response)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                  <span>Basic bug fixes</span>
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
                  handleSubscribe('price_1SZxzbJ8osfwYbX7cl20WDoC', 'AI Service Insurance', 'Basic Care', 19900);
                }}
                variant="default" 
                className="w-full transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(109,40,217,0.2)]"
              >
                GET BASIC CARE
              </Button>
            </Card>

            {/* Standard Care - Featured */}
            <div className="relative">
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-accent text-primary-foreground px-6 py-2 rounded-full text-xs font-bold tracking-wider shadow-lg z-20">
                MOST POPULAR
              </div>
            <Card className="p-6 border-2 border-primary rounded-2xl shadow-[0_8px_30px_rgba(139,92,246,0.15)] hover:shadow-[0_12px_40px_rgba(139,92,246,0.2)] transition-all">
              <h3 className="text-xl font-bold mb-3 mt-2">Standard Care</h3>
              <p key={isYearly ? 'yearly-399' : 'monthly-399'} className="text-3xl font-bold gradient-text-primary mb-2 price-flip">
                {getInsurancePrice(399).display}<span className="text-base text-muted-foreground">{getInsurancePrice(399).period}</span>
              </p>
              {isYearly && (
                <p className="text-sm text-success mb-4 animate-fade-in">
                  {getInsurancePrice(399).savings}
                </p>
              )}
              {!isYearly && <div className="h-6 mb-4" />}
              <ul className="space-y-2 mb-6 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                  <span>Everything in Basic Care</span>
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
                  <span>Knowledge base updates</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                  <span>Minor feature adjustments</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                  <span>Phone + email support</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                  <span>Up to 4 hours repair/month</span>
                </li>
              </ul>
              <Button 
                onClick={() => {
                  trackButtonClick('Subscribe - Standard Care', 'Business Insurance');
                  trackConversion('insurance_standard', 399);
                  handleSubscribe('price_1SZxzcJ8osfwYbX7JGgkSQ7a', 'AI Service Insurance', 'Standard Care', 39900);
                }}
                variant="default" 
                className="w-full transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(109,40,217,0.2)]"
              >
                GET STANDARD CARE
              </Button>
            </Card>
            </div>

            {/* Enterprise Insurance */}
            <Card className="p-6 rounded-2xl border-primary/50 hover:shadow-medium transition-all hover:-translate-y-1 bg-gradient-to-br from-primary/5 to-accent/10 border-2 relative">
              <div className="absolute top-3 right-3">
                <Badge variant="premium" className="text-xs font-bold">ENTERPRISE</Badge>
              </div>
              <h3 className="text-xl font-bold mb-3">Enterprise Insurance</h3>
              <p key={isYearly ? 'yearly-799' : 'monthly-799'} className="text-3xl font-bold gradient-text-primary mb-2 price-flip">
                {getInsurancePrice(799).display}<span className="text-base text-muted-foreground">{getInsurancePrice(799).period}</span>
              </p>
              {isYearly && (
                <p className="text-sm text-success mb-4 animate-fade-in">
                  {getInsurancePrice(799).savings}
                </p>
              )}
              {!isYearly && <div className="h-6 mb-4" />}
              <ul className="space-y-2 mb-6 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                  <span>Everything in Standard Care</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                  <span>24/7 monitoring & critical response</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                  <span>Custom SLA agreements</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                  <span>Unlimited repair hours</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                  <span>Dedicated account manager</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                  <span>Multi-location support</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                  <span>Enterprise-grade security</span>
                </li>
              </ul>
              <Button 
                onClick={() => {
                  trackButtonClick('Subscribe - Enterprise', 'Business Insurance');
                  trackConversion('insurance_enterprise', 799);
                  handleSubscribe('price_1SZxzdJ8osfwYbX77vd9XQEN', 'AI Service Insurance', 'Enterprise', 79900);
                }}
                variant="default" 
                className="w-full transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(109,40,217,0.2)]"
              >
                GET ENTERPRISE
              </Button>
            </Card>
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

            <div className="flex items-center">
              <img
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop"
                alt="Business professional reviewing AI dashboard"
                className="rounded-lg shadow-large"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Pre-Purchase Consulting */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="p-8 bg-gradient-to-br from-accent/10 to-accent/5 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_20px_40px_rgba(20,184,166,0.2)] hover:border-accent/50">
              <div className="flex items-start gap-6">
                <Search className="w-16 h-16 text-accent flex-shrink-0 gentle-rotate" />
                <div>
                  <h3 className="text-3xl font-bold mb-4">Thinking of Buying an AI Tool?</h3>
                  <p className="text-xl mb-6">Don't waste $5,000+ on the wrong solution.</p>
                  <p className="text-muted-foreground mb-6">Our Pre-Purchase Vetting service:</p>
                  <ul className="space-y-2 mb-6">
                    {[
                      "Reviews the tool for security risks",
                      "Calculates realistic ROI",
                      "Identifies hidden costs & vendor risks",
                      "Recommends 'Buy / Don't Buy / Wait'",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-2xl font-bold mb-6">
                    $1,799 <span className="text-lg font-normal text-muted-foreground">for full vetting report</span>
                  </p>
                  <p className="text-sm text-muted-foreground mb-6">(Saves you thousands on bad purchases)</p>
                  <Button 
                    onClick={() => {
                      trackButtonClick('Request AI Vetting', 'Business Consulting');
                      trackConversion('consulting_vetting', 1799);
                      openPaymentDialog('ai-consultation', 'Pre-Purchase AI Tool Vetting', 1799, 'Comprehensive vetting service that reviews AI tools for security risks, calculates ROI, and provides a Buy/Don\'t Buy recommendation');
                    }}
                    variant="default"
                    className="transition-all duration-300 hover:bg-primary/90 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(109,40,217,0.25)]"
                  >
                    PAY $1,799
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* AI Security Audit */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="p-8 bg-gradient-to-br from-amber-100 to-amber-50 dark:from-amber-950 dark:to-amber-900">
              <div className="flex items-start gap-6">
                <Shield className="w-16 h-16 text-amber-600 flex-shrink-0" />
                <div>
                  <h3 className="text-3xl font-bold mb-4">Already Using AI?</h3>
                  <p className="text-xl mb-6">Is your current AI secure? We audit for:</p>
                  <ul className="space-y-2 mb-6">
                    {[
                      "Data leaks & unauthorized access",
                      "Prompt injection vulnerabilities",
                      "Vendor contract risks",
                      "Compliance gaps (GDPR, HIPAA, etc.)",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-amber-600">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-2xl font-bold mb-4">
                    Starting at <span className="text-accent">$3,499</span>
                  </p>
                  <p className="text-sm text-muted-foreground mb-6">Deliverable: Security report + implementation roadmap</p>
                  <Button 
                    onClick={() => {
                      trackButtonClick('Request Security Audit', 'Business Security');
                      trackConversion('consulting_audit', 3499);
                      openPaymentDialog('ai-consultation', 'AI Security Audit', 3499, 'Comprehensive security audit for your existing AI systems including vulnerability assessment and implementation roadmap');
                    }}
                    variant="default"
                  >
                    PAY $3,499
                  </Button>
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
        />
      )}

      {inquiryData && (
        <ServiceInquiryDialog
          open={inquiryDialogOpen}
          onOpenChange={setInquiryDialogOpen}
          serviceType={inquiryData.serviceType}
          serviceName={inquiryData.serviceName}
          servicePrice={inquiryData.servicePrice}
        />
      )}

      {paymentData && (
        <ServicePaymentDialog
          open={paymentDialogOpen}
          onOpenChange={setPaymentDialogOpen}
          serviceType={paymentData.serviceType}
          serviceName={paymentData.serviceName}
          servicePrice={paymentData.servicePrice}
          serviceDescription={paymentData.serviceDescription}
        />
      )}
    </div>
  );
}

export default Business;
