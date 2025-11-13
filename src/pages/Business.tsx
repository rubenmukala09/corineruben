import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Link, useNavigate } from "react-router-dom";
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
import { useCounterAnimation } from "@/hooks/useCounterAnimation";
import { Phone, Mail, MessageSquare, Calendar, CheckCircle, Search, Shield, Loader2 } from "lucide-react";
import testimonial3 from "@/assets/testimonial-3.jpg";
import testimonial4 from "@/assets/testimonial-4.jpg";
import businessCollaboration from "@/assets/business-collaboration.jpg";
import teamCollaboration from "@/assets/team-collaboration.jpg";
import heroBusiness from "@/assets/hero-business-professional.jpg";

function Business() {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [isYearly, setIsYearly] = useState(false);
  const [selectedService, setSelectedService] = useState<{
    type: 'business' | 'website';
    name: string;
    tier?: string;
    price?: number;
  } | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isNavigating, setIsNavigating] = useState(false);

  // Counter animations for pricing cards
  const price1Counter = useCounterAnimation({ end: 9500, duration: 1500, prefix: '$' });
  const price2Counter = useCounterAnimation({ end: 12500, duration: 1500, prefix: '$' });
  const price3Counter = useCounterAnimation({ end: 25000, duration: 1500, prefix: '$', suffix: '+' });

  useEffect(() => {
    checkAdminStatus();
  }, []);

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

  return (
    <div className="min-h-screen">
      <Navigation />

      <Hero
        backgroundImage={heroBusiness}
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
            <Link to="/contact?service=ai-automation">
              Build AI Automation
            </Link>
          </Button>
          <Button 
            asChild
            variant="outlineLight" 
            size="xl"
            className="transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_8px_20px_rgba(0,0,0,0.15)] hover:brightness-110"
          >
            <Link to="/contact?service=web-design">
              Design My Website
            </Link>
          </Button>
          <Button 
            asChild
            variant="outlineLight" 
            size="xl"
            className="transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_8px_20px_rgba(0,0,0,0.15)] hover:brightness-110"
          >
            <Link to="/contact?service=ai-insurance">
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

      {/* Veterans Discount Banner */}
      <section className="py-8 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="container mx-auto px-4">
          <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/20 max-w-3xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-2xl">
                  🇺🇸
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-1">Veterans & First Responders</h3>
                <p className="text-muted-foreground text-sm">Active duty, veterans, reservists, and first responders receive 10% OFF all services</p>
              </div>
              <Button variant="default" asChild>
                <Link to="/contact">Claim Discount</Link>
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* Package Pricing */}
      <section id="automation-pricing" className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-center mb-12">AI Agents & Automation Pricing</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <ScrollReveal animation="slide-left" delay={0}>
              <Card className="p-8">
                <h3 className="text-2xl font-bold mb-4">AI Receptionist & Intake Agent</h3>
                <p className="text-muted-foreground mb-6">Answer calls/chats 24/7, book appointments</p>
                <p ref={price1Counter.ref} className="text-4xl font-bold text-accent mb-6">
                  {price1Counter.displayValue}
                </p>
...
                <Button 
                  onClick={() => {
                    setIsNavigating(true);
                    setTimeout(() => {
                      navigate('/contact?service=ai-receptionist&plan=9500');
                    }, 300);
                  }}
                  variant="default" 
                  className="w-full transition-all duration-300 hover:bg-primary/90 hover:shadow-[0_12px_28px_rgba(109,40,217,0.25)] hover:scale-[1.02]"
                  disabled={isNavigating}
                >
                  {isNavigating ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    'GET STARTED'
                  )}
                </Button>
              </Card>
            </ScrollReveal>

            <ScrollReveal animation="scale-in" delay={200}>
              <Card className="p-8">
                <h3 className="text-2xl font-bold mb-4">Follow-Up Automation System</h3>
                <p className="text-muted-foreground mb-6">Automated email/SMS campaigns, lead nurturing</p>
                <p ref={price2Counter.ref} className="text-4xl font-bold text-accent mb-6">
                  {price2Counter.displayValue}
                </p>
...
                <Button 
                  onClick={() => {
                    setIsNavigating(true);
                    setTimeout(() => {
                      navigate('/contact?service=automation&plan=12500');
                    }, 300);
                  }}
                  variant="default" 
                  className="w-full transition-all duration-300 hover:bg-primary/90 hover:shadow-[0_12px_28px_rgba(109,40,217,0.25)] hover:scale-[1.02]"
                  disabled={isNavigating}
                >
                  {isNavigating ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    'GET STARTED'
                  )}
                </Button>
              </Card>
            </ScrollReveal>

            <ScrollReveal animation="slide-right" delay={400}>
              <Card className="p-8 border-2 border-accent">
                <h3 className="text-2xl font-bold mb-4">Custom Automation Suite</h3>
                <p className="text-muted-foreground mb-6">Multi-system operations</p>
                <p ref={price3Counter.ref} className="text-4xl font-bold text-accent mb-6">
                  {price3Counter.displayValue}
                </p>
...
                <Button 
                  onClick={() => {
                    setIsNavigating(true);
                    setTimeout(() => {
                      navigate('/contact?service=custom&plan=25000');
                    }, 300);
                  }}
                  variant="default" 
                  className="w-full transition-all duration-300 hover:bg-primary/90 hover:shadow-[0_12px_28px_rgba(109,40,217,0.25)] hover:scale-[1.02]"
                  disabled={isNavigating}
                >
                  {isNavigating ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    'GET STARTED'
                  )}
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
              Custom websites that convert visitors into customers—built for security, speed, and success
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {/* Landing Page */}
            <ScrollReveal animation="fade-up" delay={0} threshold={0.2}>
              <Card className="p-8 rounded-2xl hover:shadow-medium transition-all hover:-translate-y-1">
                <h3 className="text-2xl font-bold mb-4">Landing Page</h3>
                <p className="text-muted-foreground mb-6">Single-page website for campaigns or simple business presence</p>
                <p className="text-4xl font-bold text-accent mb-6">$1,500</p>
...
                <Button 
                  asChild
                  variant="default" 
                  className="w-full ripple-container relative overflow-hidden transition-all duration-300 hover:bg-primary/90 hover:shadow-[0_12px_28px_rgba(109,40,217,0.25)]"
                  onClick={(e) => {
                    // Create ripple effect
                    const button = e.currentTarget;
                    const ripple = document.createElement('span');
                    const rect = button.getBoundingClientRect();
                    const size = Math.max(rect.width, rect.height);
                    const x = e.clientX - rect.left - size / 2;
                    const y = e.clientY - rect.top - size / 2;
                    
                    ripple.className = 'ripple';
                    ripple.style.width = ripple.style.height = `${size}px`;
                    ripple.style.left = `${x}px`;
                    ripple.style.top = `${y}px`;
                    
                    button.appendChild(ripple);
                    setTimeout(() => ripple.remove(), 600);
                  }}
                >
                  <Link to="/contact?service=landing-page&price=1500">
                    GET STARTED
                  </Link>
                </Button>
              </Card>
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
                  asChild
                  variant="default" 
                  className="w-full ripple-container pulse-glow relative overflow-hidden transition-all duration-300 hover:bg-primary/90 px-7 py-3.5"
                  onClick={(e) => {
                    // Create ripple effect
                    const button = e.currentTarget;
                    const ripple = document.createElement('span');
                    const rect = button.getBoundingClientRect();
                    const size = Math.max(rect.width, rect.height);
                    const x = e.clientX - rect.left - size / 2;
                    const y = e.clientY - rect.top - size / 2;
                    
                    ripple.className = 'ripple';
                    ripple.style.width = ripple.style.height = `${size}px`;
                    ripple.style.left = `${x}px`;
                    ripple.style.top = `${y}px`;
                    
                    button.appendChild(ripple);
                    setTimeout(() => ripple.remove(), 600);
                  }}
                >
                  <Link to="/contact?service=business-website&price=4500">
                    GET STARTED
                  </Link>
                </Button>
              </Card>
              </div>
            </ScrollReveal>

            {/* E-Commerce Website */}
            <ScrollReveal animation="fade-up" delay={300} threshold={0.2}>
              <Card className="p-8 rounded-2xl hover:shadow-medium transition-all hover:-translate-y-1">
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
                  asChild
                  variant="default" 
                  className="w-full ripple-container relative overflow-hidden transition-all duration-300 hover:bg-primary/90 hover:shadow-[0_12px_28px_rgba(109,40,217,0.25)]"
                  onClick={(e) => {
                    // Create ripple effect
                    const button = e.currentTarget;
                    const ripple = document.createElement('span');
                    const rect = button.getBoundingClientRect();
                    const size = Math.max(rect.width, rect.height);
                    const x = e.clientX - rect.left - size / 2;
                    const y = e.clientY - rect.top - size / 2;
                    
                    ripple.className = 'ripple';
                    ripple.style.width = ripple.style.height = `${size}px`;
                    ripple.style.left = `${x}px`;
                    ripple.style.top = `${y}px`;
                    
                    button.appendChild(ripple);
                    setTimeout(() => ripple.remove(), 600);
                  }}
                >
                  <Link to="/contact?service=ecommerce&price=8500">
                    GET STARTED
                  </Link>
                </Button>
              </Card>
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
              Protect your AI investment with ongoing maintenance, updates, and support—regardless of where you purchased your agent.
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

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
            {/* Basic Care */}
            <Card className="p-6 rounded-2xl border-border/50 hover:shadow-medium transition-all hover:-translate-y-1">
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
                asChild
                variant="default" 
                className="w-full transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(109,40,217,0.2)]"
              >
                <Link to="/contact?service=ai-insurance&plan=basic&price=199">
                  GET BASIC CARE
                </Link>
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
                asChild
                variant="default" 
                className="w-full transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(109,40,217,0.2)]"
              >
                <Link to="/contact?service=ai-insurance&plan=standard&price=399">
                  GET STANDARD CARE
                </Link>
              </Button>
            </Card>
            </div>

            {/* Premium Care */}
            <Card className="p-6 rounded-2xl border-border/50 hover:shadow-medium transition-all hover:-translate-y-1">
              <h3 className="text-xl font-bold mb-3">Premium Care</h3>
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
                  <span>24/7 monitoring & alerts</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                  <span>Critical issue response (4hr)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                  <span>Custom modifications included</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                  <span>Up to 12 hours repair/month</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                  <span>Dedicated support engineer</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                  <span>Quarterly optimization reviews</span>
                </li>
              </ul>
              <Button 
                asChild
                variant="default" 
                className="w-full transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(109,40,217,0.2)]"
              >
                <Link to="/contact?service=ai-insurance&plan=premium&price=799">
                  GET PREMIUM CARE
                </Link>
              </Button>
            </Card>

            {/* Customized Insurance */}
            <Card className="p-6 rounded-2xl border-accent/50 hover:shadow-medium transition-all hover:-translate-y-1 bg-gradient-to-br from-accent/5 to-accent/10">
              <h3 className="text-xl font-bold mb-3">Customized Insurance</h3>
              <p className="text-3xl font-bold gradient-text-primary mb-2">
                Custom<span className="text-base text-muted-foreground"> pricing</span>
              </p>
              <p className="text-sm text-muted-foreground mb-4">
                Tailored for your needs
              </p>
              <ul className="space-y-2 mb-6 text-sm">
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
                  <span>Enterprise-grade security</span>
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
                  <span>Custom integration support</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                  <span>Proactive monitoring</span>
                </li>
              </ul>
              <Button 
                asChild
                variant="default" 
                className="w-full transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(109,40,217,0.2)]"
              >
                <Link to="/contact?service=ai-insurance&plan=custom">
                  REQUEST QUOTE
                </Link>
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
                      Your team gets documentation they can actually understand—no tech jargon required.
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
                      setSelectedService({
                        type: 'business',
                        name: 'Pre-Purchase AI Tool Vetting',
                        price: 1799
                      });
                      setModalOpen(true);
                    }}
                    variant="default"
                    className="transition-all duration-300 hover:bg-primary/90 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(109,40,217,0.25)]"
                  >
                    REQUEST VETTING
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
                      setSelectedService({
                        type: 'business',
                        name: 'AI Security Audit',
                        price: 3499
                      });
                      setModalOpen(true);
                    }}
                    variant="default"
                  >
                    REQUEST AUDIT
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

      {/* Final CTA */}
      <CTASection headline="Ready to Deploy AI Safely?" variant="gold">
        <Button asChild variant="gold" size="xl">
          <Link to="/contact">SCHEDULE DISCOVERY CALL</Link>
        </Button>
        <p className="text-accent-foreground text-sm mt-4">15-minute call to discuss your needs—no sales pressure.</p>
      </CTASection>

      <Footer />
      
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
    </div>
  );
}

export default Business;
