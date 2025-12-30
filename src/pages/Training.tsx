import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { BookingModal } from "@/components/BookingModal";
import { SubscriptionDialog } from "@/components/SubscriptionDialog";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import CTASection from "@/components/CTASection";
import FlowingWaves from "@/components/FlowingWaves";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ScrollReveal } from "@/components/ScrollReveal";
import { useCounterAnimation } from "@/hooks/useCounterAnimation";
import { supabase } from "@/integrations/supabase/client";
import { trackButtonClick, trackConversion } from "@/utils/analyticsTracker";
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
import trainingSession from "@/assets/training-session.jpg";
import trainingDiverse1 from "@/assets/training-diverse-1.jpg";
import heroTrainingNew from "@/assets/hero-training-new.jpg";
import trainingDiverse2 from "@/assets/training-diverse-2.jpg";
import heroTraining3d from "@/assets/hero-training-3d.jpg";
import TestimonialCard from "@/components/TestimonialCard";
import { VideoLightbox } from "@/components/VideoLightbox";
import { SEO } from "@/components/SEO";

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
        className="p-4 hover:shadow-strong transition-all duration-500 hover:-translate-y-1 rounded-xl border-border/50 bg-gradient-to-br from-card to-card/50"
      >
        <div className="mb-3">
          <span className={`text-xs font-bold px-2 py-1 rounded-full ${getBadgeColor(example.badge)}`}>
            {example.badge}
          </span>
        </div>
        <div className="space-y-2">
          <div>
            <p className="text-xs font-semibold text-muted-foreground mb-1">WHAT THEY RECEIVED:</p>
            <p className="text-foreground text-xs italic line-clamp-2">{example.received}</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-muted-foreground mb-1">OUR ANALYSIS:</p>
            <p className="text-foreground text-xs line-clamp-2">{example.analysis}</p>
          </div>
          <div ref={ref as any}>
            <p className="text-xs font-semibold text-muted-foreground mb-1">SAVED:</p>
            {isNumeric ? (
              <p className="text-lg font-bold text-success">
                <span className="inline-block animate-[dollar-scale_2s_ease-out]">$</span>
                {Math.round(count).toLocaleString()}
              </p>
            ) : (
              <p className="text-lg font-bold text-success">{example.saved}</p>
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
      <div className="relative pt-5">
        {/* Badge - On top of card, outside */}
        <div className={`absolute -top-0 left-1/2 -translate-x-1/2 bg-gradient-to-r ${badge.gradient} text-white px-5 py-2 rounded-full text-xs font-bold tracking-wide shadow-xl z-30 whitespace-nowrap border-2 border-white/20`}>
          <span className="mr-1">{badge.emoji}</span>
          {badge.label}
        </div>
        
        <Card className={`relative p-5 md:p-6 h-full flex flex-col transition-all duration-300 hover:-translate-y-2 rounded-2xl bg-gradient-to-br from-card to-card/50 ${
          plan.popular 
            ? "border-primary border-2 shadow-xl" 
            : "border-border/50 hover:shadow-lg"
        }`}>
          <div className="pt-3">
          <h3 className="text-lg md:text-xl font-bold mb-2 text-center">{plan.name}</h3>
          <div className="text-center mb-2" ref={ref}>
            <span className="text-3xl md:text-4xl font-bold text-primary">${Math.round(count)}{plan.pricePrefix || ''}</span>
            <span className="text-muted-foreground text-sm">/session</span>
          </div>
          <p className="text-center text-sm text-muted-foreground mb-1">{plan.duration}</p>
          <p className="text-center text-sm text-accent font-semibold mb-3">{plan.size}</p>
          
          {/* Description */}
          <p className="text-center text-xs md:text-sm text-muted-foreground mb-4">
            {plan.description}
          </p>

          <div className="space-y-2 mb-4 flex-grow">
            {plan.features.slice(0, 4).map((feature: string, idx: number) => (
              <div key={idx} className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-foreground text-sm">{feature}</span>
              </div>
            ))}
          </div>

          <Button 
            onClick={() => onBook(plan)}
            variant={plan.popular ? "default" : "outline"} 
            size="default" 
            className={`w-full mt-auto ${plan.popular ? 'bg-primary hover:bg-primary/90 text-primary-foreground' : ''}`}
          >
            Book Now →
          </Button>
        </div>
        </Card>
      </div>
    </ScrollReveal>
  );
}

function LearnAndTrain() {
  const [modalOpen, setModalOpen] = useState(false);
  const [subscriptionDialogOpen, setSubscriptionDialogOpen] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState<{
    priceId: string;
    serviceName: string;
    planTier: string;
    amount: number;
  } | null>(null);
  const [isYearly, setIsYearly] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedService, setSelectedService] = useState<{
    type: 'training' | 'scamshield';
    name: string;
    tier?: string;
    price?: number;
  } | null>(null);
  const [trainingTestimonials, setTrainingTestimonials] = useState<any[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<{ src: string; title: string } | null>(null);

  useEffect(() => {
    checkAdminStatus();
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

  const checkAdminStatus = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setIsAdmin(false);
        return;
      }

      const { data: roles, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id);

      if (error) {
        console.error("Error checking admin status:", error);
        setIsAdmin(false);
      } else {
        setIsAdmin(roles && roles.length > 0);
      }
    } catch (error) {
      console.error("Error in checkAdminStatus:", error);
      setIsAdmin(false);
    }
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

  const handleSubscribe = (priceId: string, serviceName: string, planTier: string, amount: number) => {
    trackButtonClick(`Subscribe ${planTier} Plan`, 'Training Page');
    setSelectedSubscription({ priceId, serviceName, planTier, amount });
    setSubscriptionDialogOpen(true);
  };

  const trainingHeroImages = [
    { src: trainingDiverse1, alt: "Diverse participants in cybersecurity training" },
    { src: heroTrainingNew, alt: "Modern training facilities and programs" },
    { src: trainingDiverse2, alt: "Interactive learning environment" },
    { src: trainingSession, alt: "Active training session in progress" },
    { src: heroTraining3d, alt: "Virtual reality training experiences" }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <Hero
        backgroundImages={trainingHeroImages}
        headline="Learn How to Recognize and Stop Scams"
        subheadline="Professional training programs and 24/7 protection services designed for real-world safety"
        showScrollIndicator={true}
      >
        <div className="flex flex-col sm:flex-row gap-4 flex-wrap justify-center sm:justify-start">
          <Button 
            onClick={() => {
              document.getElementById('training')?.scrollIntoView({ behavior: 'smooth' });
            }}
            variant="default" 
            size="xl" 
            className="w-full sm:w-auto"
          >
            View Training Programs
          </Button>
          <Button 
            onClick={() => {
              document.getElementById('scamshield')?.scrollIntoView({ behavior: 'smooth' });
            }}
            variant="secondary" 
            size="xl" 
            className="w-full sm:w-auto"
          >
            Learn About ScamShield
          </Button>
        </div>
      </Hero>

      <TrustBar />

      {/* Training Section */}
      <section id="training" className="py-16 bg-background relative overflow-hidden">
        <FlowingWaves variant="full" opacity={0.12} />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-6">
            <Badge className="mb-4 bg-gradient-to-r from-primary to-accent text-white text-sm px-4 py-1.5">
              🛡️ PROTECTING FAMILIES TOGETHER
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-in-up">Scam Prevention Training Programs</h2>
            <p className="text-base md:text-lg text-muted-foreground mb-4 max-w-4xl mx-auto">
              <strong>Empower yourself and your loved ones with knowledge.</strong> AI technology is evolving rapidly, 
              and so are the tactics used to deceive. Our friendly, step-by-step training helps you stay one step ahead — 
              <strong>no coding or technical skills required.</strong>
            </p>
            <p className="text-sm text-accent font-semibold max-w-3xl mx-auto">
              🎓 Perfect for seniors, parents, grandparents, and anyone who wants to protect their family with confidence and peace of mind.
            </p>
          </div>

          {/* Veteran Discount Notification Banner */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="bg-gradient-to-r from-blue-900/20 via-red-900/10 to-blue-900/20 border border-blue-500/30 rounded-2xl p-5 shadow-lg backdrop-blur-sm">
              <div className="flex items-center justify-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-red-600 rounded-full flex items-center justify-center text-xl shadow-md shrink-0">
                  🇺🇸
                </div>
                <div className="text-center">
                  <p className="font-bold text-lg text-foreground flex items-center justify-center gap-2">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    Veterans & First Responders Save 10%
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Discount automatically applied during booking • Just mention your service at checkout
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-6xl mx-auto mb-12">
            {[
              {
                name: "Standard Group",
                type: "standard",
                price: "$79",
                priceNum: 79,
                duration: "90 min",
                size: "Up to 25 people",
                description: "Join a live group session with other couples and individuals. Learn to identify AI voice cloning, phishing emails, and fake tech support calls.",
                features: [
                  "Live Zoom session",
                  "Interactive Q&A",
                  "Digital handouts",
                  "Certificate included",
                ],
              },
              {
                name: "Family Small Group",
                type: "family",
                price: "$149",
                priceNum: 149,
                duration: "90 min",
                size: "Up to 12 people",
                popular: true,
                description: "Intimate couples-focused setting with extended personal attention. Perfect for spouses who want to protect each other from scams.",
                features: [
                  "Smaller group setting",
                  "Extended Q&A time",
                  "Safe word setup",
                  "Family action plan",
                ],
              },
              {
                name: "Priority Private",
                type: "private",
                price: "$399",
                priceNum: 399,
                duration: "2 hours",
                size: "Up to 5 family",
                description: "One-on-one family session — bring up to 5 family members (parents, children, grandparents). In-person or virtual options available.",
                features: [
                  "Private family session",
                  "In-person or virtual",
                  "Device security review",
                  "30-day email support",
                ],
              },
              {
                name: "Customizable Group",
                type: "custom",
                price: "$510",
                priceNum: 510,
                pricePrefix: "+",
                duration: "2-3 hours",
                size: "10-100+ people",
                description: "Tailored training for churches, schools, senior centers, and organizations. Price varies based on audience size and location.",
                features: [
                  "On-site or virtual",
                  "Custom curriculum",
                  "Bulk certificates",
                  "Dedicated support",
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
                    price: p.priceNum
                  });
                  setModalOpen(true);
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Simple Protection in 4 Steps - Moved here between Scam Prevention and AI Pro Training */}
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
            <Badge className="mb-4 bg-gradient-to-r from-primary to-accent text-white text-sm px-4 py-1.5">
              <Shield className="w-4 h-4 mr-1" /> HOW IT WORKS
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-in-up">Simple Protection in 4 Steps</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our proven process keeps you safe from scams with expert analysis and clear guidance.
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: MessageSquare,
                  step: "01",
                  title: "Something Suspicious?",
                  desc: "Strange text, urgent email, odd call, or suspicious link — anything that doesn't feel right.",
                  color: "from-blue-500 to-cyan-500",
                  bgColor: "from-blue-500/20 to-cyan-500/20",
                  image: "📱"
                },
                {
                  icon: Upload,
                  step: "02",
                  title: "Forward to Us",
                  desc: "Send it via email, text, screenshot upload, or call our hotline. We make it easy.",
                  hasResponseTime: true,
                  color: "from-purple-500 to-pink-500",
                  bgColor: "from-purple-500/20 to-pink-500/20",
                  image: "📤"
                },
                {
                  icon: Search,
                  step: "03",
                  title: "Expert Analysis",
                  desc: "Our team examines content, verifies senders, checks links, and detects AI-generated content.",
                  color: "from-orange-500 to-red-500",
                  bgColor: "from-orange-500/20 to-red-500/20",
                  image: "🔍"
                },
                {
                  icon: FileCheck,
                  step: "04",
                  title: "Clear Guidance",
                  desc: "Receive risk level assessment, detailed explanation, recommended actions, and emergency scripts.",
                  color: "from-green-500 to-emerald-500",
                  bgColor: "from-green-500/20 to-emerald-500/20",
                  image: "✅"
                },
              ].map((step, index) => (
                <ScrollReveal key={index} animation="scale-in" delay={index * 150} threshold={0.3}>
                  <Card
                    className="relative p-6 h-full hover:shadow-xl transition-all duration-500 hover:-translate-y-3 rounded-2xl border-border/50 group bg-gradient-to-br from-card to-card/50 backdrop-blur-sm overflow-hidden"
                  >
                    {/* Step Number Badge */}
                    <div className={`absolute -top-1 -right-1 w-14 h-14 bg-gradient-to-br ${step.color} rounded-bl-3xl flex items-end justify-start p-2`}>
                      <span className="text-xl font-black text-white">{step.step}</span>
                    </div>
                    
                    {/* Icon Container with Emoji */}
                    <div className="flex justify-center mb-5">
                      <div 
                        className={`w-16 h-16 bg-gradient-to-br ${step.bgColor} rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}
                      >
                        <span className="text-3xl">{step.image}</span>
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-bold mb-2 text-center group-hover:text-primary transition-colors duration-300">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground text-center text-sm leading-relaxed">{step.desc}</p>
                    {step.hasResponseTime && <ResponseTimeCallout />}
                    
                    {/* Bottom Gradient Line */}
                    <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${step.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                  </Card>
                </ScrollReveal>
              ))}
            </div>
            
            {/* Connecting Line for Desktop */}
            <div className="hidden lg:flex justify-center items-center mt-8">
              <div className="flex items-center gap-2">
                {[1, 2, 3].map((_, i) => (
                  <div key={i} className="flex items-center">
                    <div className="w-24 h-0.5 bg-gradient-to-r from-primary to-accent" />
                    <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Professionals Training Section */}
      <section id="ai-pro-training" className="py-16 bg-muted relative overflow-hidden">
        <FlowingWaves variant="full" opacity={0.08} />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-10">
            <Badge className="mb-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm px-4 py-1.5">
              <Zap className="w-4 h-4 mr-1" /> FOR PROFESSIONALS & ENTREPRENEURS
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">AI Professional Training & Development</h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-4xl mx-auto mb-4">
              <strong>This is the only place where you can get the best AI training.</strong> Whether you want to build an AI agency, 
              create automation workflows, or design stunning websites with AI — we provide hands-on, expert-led training 
              that will transform your business capabilities.
            </p>
            <p className="text-sm text-accent font-semibold max-w-3xl mx-auto">
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
                          price: plan.priceNum
                        });
                        setModalOpen(true);
                      }}
                      variant={plan.popular ? "default" : "outline"} 
                      size="default" 
                      className={`w-full mt-auto ${plan.popular ? 'bg-primary hover:bg-primary/90 text-primary-foreground' : ''}`}
                    >
                      Book Now →
                    </Button>
                  </div>
                  </Card>
                </div>
              </ScrollReveal>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <div className="inline-flex items-center gap-3 bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl px-6 py-3">
              <QrCode className="w-5 h-5 text-primary" />
              <p className="text-sm text-muted-foreground">
                💳 All payments secured with Stripe • QR code payment available • Pay after confirmation
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Veterans Discount Notification Banner - Not a Button */}
      <section className="py-10 bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="bg-card/80 backdrop-blur-sm border border-primary/30 rounded-2xl p-8 shadow-lg">
              <div className="flex flex-col lg:flex-row items-center gap-6">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center text-4xl shadow-xl">
                    🇺🇸
                  </div>
                </div>
                <div className="flex-1 text-center lg:text-left">
                  <h3 className="text-2xl font-bold mb-2">Veterans & First Responders Save 10%</h3>
                  <p className="text-muted-foreground mb-3">
                    Active duty military, veterans, reservists, police, firefighters, and EMTs receive 10% OFF all training programs and protection plans.
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                    <Badge variant="outline" className="bg-primary/5">✓ Discount applied at checkout</Badge>
                    <Badge variant="outline" className="bg-primary/5">✓ Valid ID required</Badge>
                    <Badge variant="outline" className="bg-primary/5">✓ Stackable with other offers</Badge>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-2">Questions?</p>
                    <Link 
                      to="/contact" 
                      className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
                    >
                      Contact Us →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 bg-muted relative overflow-hidden">
        <FlowingWaves variant="full" opacity={0.12} />
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute top-1/4 right-20 w-64 h-64 bg-accent/30 rounded-full blur-3xl animate-pulse"
            style={{ animationDuration: "5s" }}
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-center mb-4 animate-fade-in-up">Choose Your Protection Level</h2>
          <p className="text-center text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            Subscribe monthly or save 5% with yearly plans. All plans can be cancelled anytime.
          </p>

          {/* Payment Period Toggle */}
          <div className="flex items-center justify-center gap-4 mb-10">
            <Label htmlFor="payment-toggle" className={`text-lg font-semibold ${!isYearly ? 'text-primary' : 'text-muted-foreground'}`}>
              Monthly
            </Label>
            <Switch
              id="payment-toggle"
              checked={isYearly}
              onCheckedChange={setIsYearly}
            />
            <Label htmlFor="payment-toggle" className={`text-lg font-semibold ${isYearly ? 'text-primary' : 'text-muted-foreground'}`}>
              Yearly <span className="text-sm text-success">(Save 5%)</span>
            </Label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Starter Plan */}
            <Card
              className="p-8 transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-strong hover:brightness-110 rounded-2xl border-border/50 animate-fade-in-up bg-gradient-to-br from-card to-card/50"
              style={{ animationDelay: "0ms" }}
            >
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center">
                  <Shield className="w-10 h-10 text-primary" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-2 text-center">Starter Plan</h3>
              <div className="text-center mb-2">
                <span key={isYearly ? 'yearly-39' : 'monthly-39'} className="text-4xl font-bold text-primary price-flip inline-block">{getPlanPrice(39).display}</span>
                <span className="text-muted-foreground">{getPlanPrice(39).period}</span>
              </div>
              {isYearly && (
                <div className="text-center mb-2 fade-in-savings">
                  <p className="text-sm text-success font-semibold">{getPlanPrice(39).savings}</p>
                </div>
              )}
              <p className="text-center text-sm text-muted-foreground mb-6">Perfect for: Individuals</p>

              <div className="space-y-3 mb-8">
                {[
                  "Unlimited threat submissions",
                  "24-hour expert analysis",
                  "Email & text support",
                  "Risk assessment reports",
                  "Monthly scam trend updates",
                  "Access to Scam Alert Map",
                  "Educational resources",
                  "60-day money-back guarantee",
                ].map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="mb-6 p-3 bg-primary/10 rounded-lg">
                <div className="flex items-center gap-2 justify-center">
                  <Mail className="w-5 h-5 text-primary" />
                  <Upload className="w-5 h-5 text-primary" />
                  <span className="text-xs font-medium">Email, Upload</span>
                </div>
              </div>

              <Button 
                onClick={() => {
                  trackButtonClick('Get Started - Starter Plan', 'Training Page');
                  handleSubscribe('price_1SZxa9J8osfwYbX7tTp519zb', 'ScamShield', 'Starter', 3900);
                }}
                variant="default" 
                size="lg" 
                className="w-full"
              >
                Get Started
              </Button>
            </Card>

            {/* Family Plan - MOST POPULAR */}
            <div className="relative">
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-accent text-primary-foreground px-6 py-2 rounded-full text-xs font-bold tracking-wider shadow-lg z-20">
                MOST POPULAR
              </div>
              <Card
                className="p-8 transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_20px_40px_rgba(109,40,217,0.2)] hover:brightness-110 rounded-2xl border-primary border-2 animate-fade-in-up bg-gradient-to-br from-card to-card/50"
                style={{ animationDelay: "100ms" }}
              >
                <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center">
                  <Users className="w-10 h-10 text-primary" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-2 text-center">Family Plan</h3>
              <div className="text-center mb-2">
                <span key={isYearly ? 'yearly-79' : 'monthly-79'} className="text-4xl font-bold text-primary price-flip inline-block">{getPlanPrice(79).display}</span>
                <span className="text-muted-foreground">{getPlanPrice(79).period}</span>
              </div>
              {isYearly && (
                <div className="text-center mb-2 fade-in-savings">
                  <p className="text-sm text-success font-semibold">{getPlanPrice(79).savings}</p>
                </div>
              )}
              <p className="text-center text-sm text-muted-foreground mb-6">Perfect for: Families & couples</p>

              <div className="space-y-3 mb-8">
                <p className="font-semibold text-center mb-3">Everything in Starter PLUS:</p>
                {[
                  "Protect up to 5 family members",
                  "12-hour priority response",
                  "Phone support included",
                  "Family Safety Vault (secure storage)",
                  "Shared safe-word system",
                  "Call verification assistance",
                  "Quarterly family safety briefings",
                  "Training discounts (20% off)",
                ].map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="mb-6 p-3 bg-primary/10 rounded-lg">
                <div className="flex items-center gap-2 justify-center">
                  <Mail className="w-4 h-4 text-primary" />
                  <Upload className="w-4 h-4 text-primary" />
                  <Phone className="w-4 h-4 text-primary" />
                  <MessageSquare className="w-4 h-4 text-primary" />
                  <span className="text-xs font-medium">All Methods</span>
                </div>
              </div>

              <Button 
                onClick={() => {
                  trackButtonClick('Get Started - Family Plan', 'Training Page');
                  handleSubscribe('price_1SZxaAJ8osfwYbX7ipmpazSu', 'ScamShield', 'Family', 7900);
                }}
                variant="default" 
                size="lg" 
                className="w-full"
              >
                Get Started
              </Button>
            </Card>
            </div>

            {/* Premium Plan */}
            <Card
              className="p-8 hover:shadow-strong transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] rounded-2xl border-border/50 animate-fade-in-up bg-gradient-to-br from-card to-card/50"
              style={{ animationDelay: "200ms" }}
            >
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center">
                  <Award className="w-10 h-10 text-primary" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-2 text-center">Premium Plan</h3>
              <div className="text-center mb-2">
                <span key={isYearly ? 'yearly-129' : 'monthly-129'} className="text-4xl font-bold text-primary price-flip inline-block">{getPlanPrice(129).display}</span>
                <span className="text-muted-foreground">{getPlanPrice(129).period}</span>
              </div>
              {isYearly && (
                <div className="text-center mb-2 fade-in-savings">
                  <p className="text-sm text-success font-semibold">{getPlanPrice(129).savings}</p>
                </div>
              )}
              <p className="text-center text-sm text-muted-foreground mb-6">
                Perfect for: High-risk individuals
              </p>

              <div className="space-y-3 mb-8">
                <p className="font-semibold text-center mb-3">Everything in Family PLUS:</p>
                {[
                  "4-hour emergency response",
                  "AI deepfake voice detection",
                  '"Call Me Now" verification service',
                  "Dedicated security advisor",
                  "24/7 emergency hotline",
                  "Proactive monitoring alerts",
                  "Monthly 1-on-1 check-ins",
                  "Custom threat briefings",
                ].map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="mb-6 p-3 bg-primary/10 rounded-lg">
                <div className="flex flex-col items-center gap-2">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-primary" />
                    <Upload className="w-4 h-4 text-primary" />
                    <Phone className="w-4 h-4 text-primary" />
                    <MessageSquare className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-xs font-medium">+ Emergency Hotline</span>
                </div>
              </div>

              <Button 
                onClick={() => {
                  trackButtonClick('Get Started - Premium Plan', 'Training Page');
                  handleSubscribe('price_1SZxaBJ8osfwYbX7K5kna9vJ', 'ScamShield', 'Premium', 12900);
                }}
                variant="default" 
                size="lg" 
                className="w-full"
              >
                Get Started
              </Button>
            </Card>

            {/* Customized Plan for Businesses */}
            <Card
              className="p-8 hover:shadow-strong transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] rounded-2xl border-accent/50 animate-fade-in-up bg-gradient-to-br from-card to-accent/5"
              style={{ animationDelay: "300ms" }}
            >
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-accent/20 to-primary/20 rounded-full flex items-center justify-center">
                  <Users className="w-10 h-10 text-accent" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-2 text-center">Customized Plan</h3>
              <div className="text-center mb-2">
                <span className="text-4xl font-bold text-accent">From $229</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <p className="text-center text-sm text-muted-foreground mb-6">
                Perfect for: Businesses & organizations
              </p>

              <div className="space-y-3 mb-8">
                <p className="font-semibold text-center mb-3">Custom tailored protection:</p>
                {[
                  "Unlimited team members",
                  "Priority 2-hour response",
                  "Dedicated account manager",
                  "Custom training sessions",
                  "Advanced threat monitoring",
                  "Company-wide security protocols",
                  "Quarterly security audits",
                  "White-label reporting",
                ].map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-foreground text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="mb-6 p-3 bg-accent/10 rounded-lg">
                <div className="text-center">
                  <p className="text-xs font-medium">Customizable based on business size and needs</p>
                </div>
              </div>

              <Button 
                asChild
                variant="outline" 
                size="lg" 
                className="w-full text-primary border-primary hover:bg-primary hover:text-white transition-all duration-300"
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

          <div className="text-center mt-8 animate-fade-in-up" style={{ animationDelay: "400ms" }}>
            <p className="text-muted-foreground">All plans can be cancelled anytime. No long-term contracts required.</p>
          </div>
        </div>
      </section>

      {/* What We Analyze Section */}
      <section className="py-16 bg-background relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute bottom-1/4 left-20 w-80 h-80 bg-primary/20 rounded-full blur-3xl animate-pulse"
            style={{ animationDuration: "7s" }}
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-center mb-10 animate-fade-in-up">We Analyze All Types of Threats</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { icon: Mail, title: "Phishing Emails" },
              { icon: MessageSquare, title: "SMS Scams" },
              { icon: Phone, title: "Voice Calls" },
              { icon: FileText, title: "Voice Messages" },
              { icon: LinkIcon, title: "Suspicious Links" },
              { icon: QrCode, title: "QR Codes" },
              { icon: FileCheck, title: "Documents" },
              { icon: ImageIcon, title: "Social Media" },
            ].map((threat, index) => (
              <ScrollReveal key={index} animation="scale-in" delay={index * 50} threshold={0.2}>
                <Card
                  className="p-6 transition-all duration-500 rounded-2xl border-border/50 hover:border-[#14B8A6] hover:border-2 group bg-gradient-to-br from-card to-card/50 backdrop-blur-sm hover:bg-gradient-to-br hover:from-card/90 hover:to-card/60 hover:shadow-strong"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center transition-all duration-300 mb-3 group-hover:animate-[icon-bounce_0.6s_ease-in-out]">
                      <threat.icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="text-sm font-semibold group-hover:text-primary transition-colors duration-300">
                      {threat.title}
                    </h3>
                  </div>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Family Safety Vault Section */}
      <section className="py-16 bg-muted relative overflow-hidden">
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
          <Card className="max-w-4xl mx-auto p-8 hover:shadow-strong transition-all duration-500 rounded-2xl border-accent border-2 animate-fade-in-up bg-gradient-to-br from-card to-card/50">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center animate-[shield-pulse_3s_ease-in-out_infinite]">
                  <Lock className="w-12 h-12 text-primary" />
                </div>
              </div>
              <h3 className="text-3xl font-bold mb-4">Secure Your Family's Most Important Information</h3>
              <p className="text-xl text-muted-foreground mb-8">Included with Family & Premium Plans</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 text-left max-w-2xl mx-auto">
                {[
                  "Family safe words",
                  "Trusted caller list",
                  "Emergency contacts",
                  "Important documents (encrypted)",
                  "Account recovery info",
                  "Travel itineraries",
                ].map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{feature}</span>
                  </div>
                ))}
              </div>

              <p className="text-sm text-muted-foreground mb-6">
                Security: Bank-grade encryption, multi-factor auth, access sharing
              </p>

              <Button 
                asChild 
                className="bg-[#14B8A6] hover:bg-[#0F9A8A] text-white group" 
                size="lg"
              >
                <Link to="/vault" className="flex items-center gap-2">
                  <span className="text-xl group-hover:animate-[lock-shake_0.5s_ease-in-out]">🔒</span>
                  EXPLORE SAFETY VAULT
                </Link>
              </Button>
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
          <h2 className="text-center mb-10 animate-fade-in-up">Scams We've Caught for Our Members</h2>

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
              <h2 className="text-center mb-4">Training Success Stories</h2>
              <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
                Hear from families who have completed our training programs
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

      {/* Final CTA */}
      <CTASection headline="Sleep Better Tonight" variant="gold">
        <p className="text-xl text-white/90 mb-8">Join 500+ families who trust ScamShield</p>
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
            <Link to="/contact">
              TALK TO EXPERT
            </Link>
          </Button>
        </div>
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
    </div>
  );
}

export default LearnAndTrain;
