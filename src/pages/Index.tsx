import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import { BookingModal } from "@/components/BookingModal";
import { TrustDisclaimer } from "@/components/TrustDisclaimer";
import TrustBar from "@/components/TrustBar";
import TestimonialCard from "@/components/TestimonialCard";
import CTASection from "@/components/CTASection";
import ThreePathsForward from "@/components/ThreePathsForward";
import FlowingWaves from "@/components/FlowingWaves";
import MakingADifference from "@/components/MakingADifference";
import { TestimonialForm } from "@/components/TestimonialForm";
import { VideoLightbox } from "@/components/VideoLightbox";
import { FloatingHelpButton } from "@/components/FloatingHelpButton";
import { ScamShieldSubmission } from "@/components/ScamShieldSubmission";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { ScrollRevealSection } from "@/components/ScrollRevealSection";
import { SEO, PAGE_SEO } from "@/components/SEO";
import { trackButtonClick } from "@/utils/analyticsTracker";
import {
  Heart,
  Shield,
  MessageSquare,
  Users,
  StopCircle,
  Search,
  Phone,
  DollarSign,
  FileCheck,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  UserX,
  Bot,
  ArrowRight,
  Clock,
  Target,
} from "lucide-react";
import { useCounterAnimation } from "@/hooks/useCounterAnimation";
import { RotatingHeroText } from "@/components/RotatingHeroText";
import HeroValueCards from "@/components/HeroValueCards";

// Placeholder imports for hero slideshow images
// Replace these with your actual generated/sourced images
import heroSlideshow1 from "@/assets/hero-home-1.jpg";
import heroSlideshow2 from "@/assets/hero-home-2.jpg";
import heroSlideshow3 from "@/assets/hero-home-3.jpg";
import heroSlideshow4 from "@/assets/hero-home-4.jpg";
import heroSlideshow5 from "@/assets/hero-home-5.jpg";
import heroSlideshow6 from "@/assets/hero-business-1.jpg";
import heroSlideshow7 from "@/assets/hero-training-1.jpg";

function Index() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [videoTestimonials, setVideoTestimonials] = useState<any[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<{ src: string; title: string } | null>(null);
  const [scamShieldOpen, setScamShieldOpen] = useState(false);
  const [consultationModalOpen, setConsultationModalOpen] = useState(false);

  // Hero slideshow images with descriptive alt text
  const heroImages = [
    { 
      src: heroSlideshow1, 
      alt: "Multigenerational family learning scam prevention together" 
    },
    { 
      src: heroSlideshow2, 
      alt: "Veteran protected from online scams" 
    },
    { 
      src: heroSlideshow3, 
      alt: "Diverse community workshop on cybersecurity" 
    },
    { 
      src: heroSlideshow4, 
      alt: "Grandfather and granddaughter using technology safely" 
    },
    { 
      src: heroSlideshow5, 
      alt: "Couple receiving emergency scam assistance" 
    },
    { 
      src: heroSlideshow6, 
      alt: "Veteran woman business owner with AI protection" 
    },
    { 
      src: heroSlideshow7, 
      alt: "Youth teaching seniors about online safety" 
    }
  ];

  const rotatingMessages = [
    {
      headline: "Protecting Ohio Families from AI-Powered Scams",
      subheadline: "Your parents didn't grow up with technology. Don't let scammers take advantage of that."
    }
  ];

  // Counter animations for statistics
  const stat1 = useCounterAnimation({ end: 28.3, duration: 2500, prefix: "$", suffix: "B" });
  const stat2 = useCounterAnimation({ end: 87, duration: 2500, suffix: "%" });
  const stat3 = useCounterAnimation({ end: 3.4, duration: 2500, suffix: "M" });
  const stat4 = useCounterAnimation({ end: 14, duration: 2500, suffix: " sec" });

  useEffect(() => {
    checkAdminStatus();
    fetchVideoTestimonials();
  }, []);

  const fetchVideoTestimonials = async () => {
    try {
      const { data, error } = await supabase
        .from("testimonials_public")
        .select(`
          *,
          testimonial_media (*)
        `)
        .eq("has_video", true)
        .eq("featured", true)
        .order("created_at", { ascending: false })
        .limit(3);

      if (error) throw error;
      setVideoTestimonials(data || []);
    } catch (error) {
      console.error("Error fetching video testimonials:", error);
    }
  };

  const checkAdminStatus = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        setIsAdmin(false);
        setIsLoading(false);
        return;
      }

      // Check if user has admin or staff role
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

  return (
    <div className="min-h-screen">
      <SEO {...PAGE_SEO.home} />
      <Navigation />
      <main id="main-content">

      {/* Hero Section */}
      <Hero
        backgroundImages={heroImages}
        showScrollIndicator={true}
        overlay={true}
      >
        <RotatingHeroText messages={rotatingMessages} interval={6000} />
      </Hero>

      <TrustBar />

      {/* The Growing Threat Section */}
      <section className="section-spacing bg-muted relative overflow-hidden">
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
          <ScrollRevealSection>
            <div className="text-center mb-10">
              <h2 className="mb-4">Every 14 Seconds, Another Senior Falls Victim to AI Scams</h2>
            </div>
          </ScrollRevealSection>

          <ScrollRevealSection staggerChildren={true}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <Card
              ref={stat1.ref}
              className="p-4 sm:p-6 active:scale-95 md:hover:shadow-strong transition-all duration-500 md:hover:-translate-y-2 md:hover:scale-105 rounded-2xl border-border/50 group animate-fade-in-up bg-gradient-to-br from-card to-card/50 backdrop-blur-sm"
              style={{ animationDelay: "0ms" }}
            >
              <div className="flex justify-center mb-3 sm:mb-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center md:group-hover:scale-110 md:group-hover:rotate-12 transition-all duration-500">
                  <TrendingDown className="w-6 h-6 sm:w-8 sm:h-8 text-primary md:group-hover:scale-110 transition-transform duration-500" />
                </div>
              </div>
              <h3 className={`text-3xl sm:text-4xl font-bold mb-2 text-center text-primary transition-all duration-300 ${stat1.count === 28.3 ? 'animate-pulse' : ''}`}>
                {stat1.displayValue}
              </h3>
              <p className="text-muted-foreground text-center text-sm sm:text-base">Lost by seniors to scams in 2023</p>
            </Card>

            <Card
              ref={stat2.ref}
              className="p-4 sm:p-6 active:scale-95 md:hover:shadow-strong transition-all duration-500 md:hover:-translate-y-2 md:hover:scale-105 rounded-2xl border-border/50 group animate-fade-in-up bg-gradient-to-br from-card to-card/50 backdrop-blur-sm"
              style={{ animationDelay: "100ms" }}
            >
              <div className="flex justify-center mb-3 sm:mb-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center md:group-hover:scale-110 md:group-hover:rotate-12 transition-all duration-500">
                  <UserX className="w-6 h-6 sm:w-8 sm:h-8 text-primary md:group-hover:scale-110 transition-transform duration-500" />
                </div>
              </div>
              <h3 className={`text-3xl sm:text-4xl font-bold mb-2 text-center text-primary transition-all duration-300 ${stat2.count === 87 ? 'animate-pulse' : ''}`}>
                {stat2.displayValue}
              </h3>
              <p className="text-muted-foreground text-center text-sm sm:text-base">Of victims never report due to embarrassment</p>
            </Card>

            <Card
              ref={stat3.ref}
              className="p-4 sm:p-6 active:scale-95 md:hover:shadow-strong transition-all duration-500 md:hover:-translate-y-2 md:hover:scale-105 rounded-2xl border-border/50 group animate-fade-in-up bg-gradient-to-br from-card to-card/50 backdrop-blur-sm"
              style={{ animationDelay: "200ms" }}
            >
              <div className="flex justify-center mb-3 sm:mb-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center md:group-hover:scale-110 md:group-hover:rotate-12 transition-all duration-500">
                  <Target className="w-6 h-6 sm:w-8 sm:h-8 text-primary md:group-hover:scale-110 transition-transform duration-500" />
                </div>
              </div>
              <h3 className={`text-3xl sm:text-4xl font-bold mb-2 text-center text-primary transition-all duration-300 ${stat3.count === 3.4 ? 'animate-pulse' : ''}`}>
                {stat3.displayValue}
              </h3>
              <p className="text-muted-foreground text-center text-sm sm:text-base">Seniors targeted last year alone</p>
            </Card>

            <Card
              ref={stat4.ref}
              className="p-4 sm:p-6 active:scale-95 md:hover:shadow-strong transition-all duration-500 md:hover:-translate-y-2 md:hover:scale-105 rounded-2xl border-border/50 group animate-fade-in-up bg-gradient-to-br from-card to-card/50 backdrop-blur-sm"
              style={{ animationDelay: "300ms" }}
            >
              <div className="flex justify-center mb-3 sm:mb-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center md:group-hover:scale-110 md:group-hover:rotate-12 transition-all duration-500">
                  <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-primary md:group-hover:scale-110 transition-transform duration-500" />
                </div>
              </div>
              <h3 className={`text-3xl sm:text-4xl font-bold mb-2 text-center text-primary transition-all duration-300 ${stat4.count === 14 ? 'animate-pulse' : ''}`}>
                {stat4.displayValue}
              </h3>
              <p className="text-muted-foreground text-center text-sm sm:text-base">Frequency of new scam victims</p>
            </Card>
          </div>
          </ScrollRevealSection>

          <ScrollRevealSection>
            <div className="text-center mt-10">
              <p className="text-2xl font-bold text-foreground">Don't become a statistic. Get protected today.</p>
            </div>
          </ScrollRevealSection>
        </div>
      </section>

      {/* Three Paths Forward - Now includes all services */}
      <ThreePathsForward />

      {/* Why Families Trust Us */}
      <section className="py-12 md:py-16 bg-background relative overflow-hidden">
        <FlowingWaves variant="full" opacity={0.12} />
        <div className="absolute inset-0 opacity-30">
          <div
            className="absolute top-20 left-10 w-48 h-48 md:w-72 md:h-72 bg-primary/20 rounded-full blur-3xl animate-pulse"
            style={{ animationDuration: "4s" }}
          />
          <div
            className="absolute bottom-20 right-10 w-64 h-64 md:w-96 md:h-96 bg-accent/20 rounded-full blur-3xl animate-pulse"
            style={{ animationDuration: "6s" }}
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <ScrollRevealSection>
            <h2 className="text-center mb-8 md:mb-10 text-2xl sm:text-3xl md:text-4xl font-bold">Why Families Trust InVision Network</h2>
          </ScrollRevealSection>
          <ScrollRevealSection staggerChildren={true}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <Card
              className="p-4 sm:p-6 hover:shadow-strong transition-all duration-500 hover:-translate-y-2 hover:scale-105 rounded-2xl border-border/50 group animate-fade-in-up bg-gradient-to-br from-card to-card/50 backdrop-blur-sm"
              style={{ animationDelay: "0ms" }}
            >
              <div className="flex justify-center mb-3 sm:mb-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                  <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-primary group-hover:scale-110 transition-transform duration-500" />
                </div>
              </div>
              <h3 className="text-lg sm:text-xl mb-2 sm:mb-3 text-center group-hover:text-primary transition-colors duration-300">
                500+ Families Protected
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground text-center">
                Trusted by hundreds of Ohio families to keep them safe from AI scams.
              </p>
            </Card>

            <Card
              className="p-4 sm:p-6 hover:shadow-strong transition-all duration-500 hover:-translate-y-2 hover:scale-105 rounded-2xl border-border/50 group animate-fade-in-up bg-gradient-to-br from-card to-card/50 backdrop-blur-sm"
              style={{ animationDelay: "100ms" }}
            >
              <div className="flex justify-center mb-3 sm:mb-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                  <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-primary group-hover:scale-110 transition-transform duration-500" />
                </div>
              </div>
              <h3 className="text-lg sm:text-xl mb-2 sm:mb-3 text-center group-hover:text-primary transition-colors duration-300">
                Ohio Based & Trusted
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground text-center">
                Serving Dayton, Kettering & Greater Miami Valley, Ohio
              </p>
            </Card>

            <Card
              className="p-4 sm:p-6 hover:shadow-strong transition-all duration-500 hover:-translate-y-2 hover:scale-105 rounded-2xl border-border/50 group animate-fade-in-up bg-gradient-to-br from-card to-card/50 backdrop-blur-sm"
              style={{ animationDelay: "200ms" }}
            >
              <div className="flex justify-center mb-3 sm:mb-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                  <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-primary group-hover:scale-110 transition-transform duration-500" />
                </div>
              </div>
              <h3 className="text-lg sm:text-xl mb-2 sm:mb-3 text-center group-hover:text-primary transition-colors duration-300">
                Expert Cybersecurity Team
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground text-center">
                Certified professionals who understand both technology and scam tactics.
              </p>
            </Card>

            <Card
              className="p-4 sm:p-6 hover:shadow-strong transition-all duration-500 hover:-translate-y-2 hover:scale-105 rounded-2xl border-border/50 group animate-fade-in-up bg-gradient-to-br from-card to-card/50 backdrop-blur-sm"
              style={{ animationDelay: "300ms" }}
            >
              <div className="flex justify-center mb-3 sm:mb-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                  <MessageSquare className="w-6 h-6 sm:w-8 sm:h-8 text-primary group-hover:scale-110 transition-transform duration-500" />
                </div>
              </div>
              <h3 className="text-lg sm:text-xl mb-2 sm:mb-3 text-center group-hover:text-primary transition-colors duration-300">
                Multilingual Support
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground text-center">
                Available in English • Français • Español for your convenience.
              </p>
            </Card>
          </div>
          </ScrollRevealSection>
        </div>
      </section>

      {/* The 60-Second Pause Protocol */}
      <section className="py-12 md:py-16 bg-muted relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute top-1/4 right-10 sm:right-20 w-48 h-48 sm:w-64 sm:h-64 bg-accent/30 rounded-full blur-3xl animate-pulse"
            style={{ animationDuration: "5s" }}
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-8 md:mb-10 animate-fade-in-up">
            <h2 className="mb-3 sm:mb-4 text-2xl sm:text-3xl md:text-4xl font-bold">The 60-Second Pause Protocol™</h2>
            <p className="text-lg sm:text-xl text-muted-foreground">Stop Scams Before They Start</p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
            {[
              {
                icon: StopCircle,
                title: "STOP & BREATHE",
                desc: "Don't act immediately. Scammers create urgency to bypass your judgment.",
              },
              {
                icon: Search,
                title: "VERIFY IDENTITY",
                desc: "Ask specific questions only the real person would know. Demand full name, department, callback number.",
              },
              {
                icon: Phone,
                title: "CALL BACK OFFICIAL NUMBER",
                desc: "Use the number on your bank card, official website, or phone book - NEVER the number they give you.",
              },
              {
                icon: Users,
                title: "USE FAMILY SAFE-WORD",
                desc: "Establish a secret word/phrase with family. No safe-word? No action.",
              },
              {
                icon: DollarSign,
                title: "DOUBLE-CHECK MONEY REQUESTS",
                desc: "If anyone asks for money, gift cards, wire transfers - verify through a SECOND channel (text, in-person, trusted number).",
              },
              {
                icon: FileCheck,
                title: "DOCUMENT & REPORT",
                desc: "Write down details: time, caller info, what they said. Report to FTC, your bank, and local police if needed.",
              },
              {
                icon: Shield,
                title: "FORWARD TO INVISION (MEMBERS)",
                desc: "ScamShield members: Send us the suspicious item for professional analysis within 24 hours.",
              },
            ].map((step, index) => (
              <Card
                key={index}
                className="p-4 sm:p-6 hover:shadow-strong transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] rounded-2xl border-border/50 group animate-fade-in-up bg-gradient-to-br from-card to-card/50"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                      <step.icon className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
                    </div>
                  </div>
                  <div className="flex-grow min-w-0">
                    <h3 className="text-base sm:text-lg md:text-xl font-bold mb-1 sm:mb-2 group-hover:text-primary transition-colors duration-300">
                      {step.title}
                    </h3>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-10 animate-fade-in-up" style={{ animationDelay: "700ms" }}>
            <Button asChild variant="default" size="xl">
              <Link to="/resources">Download Protection Guide</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* What You'll Master Section */}
      <section className="py-16 bg-background relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute bottom-1/4 left-20 w-80 h-80 bg-primary/20 rounded-full blur-3xl animate-pulse"
            style={{ animationDuration: "7s" }}
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <ScrollRevealSection>
            <h2 className="text-center mb-10">What You'll Master in Our Training</h2>
          </ScrollRevealSection>
          <ScrollRevealSection staggerChildren={true}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              "Identify deepfake voices and videos",
              "Spot AI-generated phishing emails",
              "Verify urgent caller identities",
              "Scan QR codes safely",
              "Recognize romance scams",
              "Protect your banking information",
              "Set up family safe-word systems",
              "Execute the 60-Second Pause Protocol™",
            ].map((skill, index) => (
              <Card
                key={index}
                className="p-6 hover:shadow-strong transition-all duration-500 hover:-translate-y-2 hover:scale-105 rounded-2xl border-border/50 group animate-fade-in-up bg-gradient-to-br from-card to-card/50 backdrop-blur-sm"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                      <CheckCircle className="w-5 h-5 text-primary" />
                    </div>
                  </div>
                  <p className="text-foreground font-medium group-hover:text-primary transition-colors duration-300">
                    {skill}
                  </p>
                </div>
              </Card>
            ))}
          </div>
          </ScrollRevealSection>

          <ScrollRevealSection>
            <div className="text-center mt-10">
              <Button 
                asChild 
                variant="outline" 
                size="xl"
                className="border-2 hover:border-[3px] hover:bg-primary/10 transition-all duration-300 cursor-pointer"
              >
              <Link to="/training#training">View Training Options</Link>
            </Button>
          </div>
          </ScrollRevealSection>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-spacing bg-muted relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute top-20 right-1/4 w-96 h-96 bg-accent/25 rounded-full blur-3xl animate-pulse"
            style={{ animationDuration: "8s" }}
          />
          <div
            className="absolute bottom-20 left-1/4 w-72 h-72 bg-primary/25 rounded-full blur-3xl animate-pulse"
            style={{ animationDuration: "6s" }}
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-center mb-4 animate-fade-in-up">Trusted by 500+ Ohio Families</h2>
          <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
            Real stories from real people protected by InVision Network
          </p>

          {/* Video Testimonials Section */}
          {videoTestimonials.length > 0 && (
            <div className="mb-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              {videoTestimonials.map((testimonial) => {
                const videoMedia = testimonial.testimonial_media?.find((m: any) => m.media_type === "video");
                return (
                  <TestimonialCard
                    key={testimonial.id}
                    name={testimonial.name}
                    location={testimonial.location}
                    quote={testimonial.story.substring(0, 150) + "..."}
                    image={testimonial.primary_media_url || ""}
                    rating={testimonial.rating}
                    videoUrl={videoMedia?.media_url}
                    onVideoClick={() => setSelectedVideo({
                      src: videoMedia?.media_url,
                      title: `${testimonial.name}'s Story`
                    })}
                  />
                );
              })}
            </div>
          )}

          {/* Admin Only - Upload Prompt */}
          {!isLoading && isAdmin && videoTestimonials.length === 0 && (
            <div className="mb-12">
              <div 
                className="w-full flex flex-col items-center justify-center text-center"
                style={{
                  minHeight: "200px",
                  border: "4px dashed #6D28D9",
                  borderRadius: "12px",
                  backgroundColor: "rgba(243, 232, 255, 0.5)",
                  padding: "40px 20px"
                }}
              >
                <div className="text-[64px] mb-4">🎥</div>
                <h4 className="text-2xl font-bold mb-3" style={{ color: "#6D28D9" }}>
                  Video Testimonials
                </h4>
                <p className="text-base text-muted-foreground mb-6 max-w-md">
                  Upload customer video testimonials to showcase on your homepage
                </p>
                <Button 
                  asChild
                  style={{ 
                    backgroundColor: "#6D28D9",
                    color: "white",
                    padding: "12px 24px",
                    borderRadius: "8px"
                  }}
                  className="hover:opacity-90"
                >
                  <Link to="/admin/content/testimonials">Upload First Video</Link>
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Video Lightbox */}
        <VideoLightbox
          isOpen={selectedVideo !== null}
          onClose={() => setSelectedVideo(null)}
          videoSrc={selectedVideo?.src || ""}
          title={selectedVideo?.title}
        />
      </section>

      {/* FAQ Teaser */}
      <section className="py-20 bg-background relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute top-1/3 left-20 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-pulse"
            style={{ animationDuration: "6s" }}
          />
          <div
            className="absolute bottom-1/4 right-20 w-72 h-72 bg-accent/20 rounded-full blur-3xl animate-pulse"
            style={{ animationDuration: "7s" }}
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-center mb-12 animate-fade-in-up">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                q: "What types of scams can ScamShield detect?",
                a: "We analyze all types: phishing emails, SMS scams, voice calls, QR codes, social media messages, investment schemes, romance scams, and more. Our specialty is AI-powered threats like deepfakes and voice cloning.",
              },
              {
                q: "What if I'm not tech-savvy?",
                a: "That's exactly who we serve! Our services are designed for people of all technical skill levels. If you can forward an email or take a screenshot, you can use our services.",
              },
              // Hidden but kept for future reference
              // {
              //   q: "How is InVision different from free services like AARP?",
              //   a: "While free services like AARP provide excellent educational resources, InVision offers personalized threat analysis. We examine YOUR specific suspicious messages within 24 hours and provide actionable guidance. Think of us as your personal cybersecurity team on retainer.",
              // },
            ].map((faq, index) => (
              <Card
                key={index}
                className="p-6 rounded-2xl hover:shadow-strong transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] border-border/50 group animate-fade-in-up bg-gradient-to-br from-card to-card/50"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                  {faq.q}
                </h3>
                <p className="text-muted-foreground">{faq.a}</p>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8 animate-fade-in-up" style={{ animationDelay: "300ms" }}>
            <Link
              to="/faq"
              className="text-primary hover:text-primary/80 font-semibold text-lg inline-flex items-center gap-2 hover:gap-4 transition-all duration-300 hover:scale-105"
            >
              VIEW ALL FAQ →
            </Link>
          </div>
        </div>
      </section>

      {/* Making a Difference Section */}
      <MakingADifference />

      {/* Final CTA */}
      <CTASection 
        headline="Ready to Protect Your Family?" 
        description="Join thousands of Ohio families who've taken control of their digital safety. Start your journey today."
        variant="gold"
      >
        <Button 
          size="lg" 
          className="text-lg px-8 py-6"
          onClick={() => setConsultationModalOpen(true)}
        >
          Schedule Consultation
        </Button>
        <Button size="lg" variant="outline" className="text-lg px-8 py-6 bg-background/80 backdrop-blur" asChild>
          <Link to="/contact?service=business-quote">Get AI & Business Quote</Link>
        </Button>
      </CTASection>

      {/* Trust & Security Disclaimer */}
      <TrustDisclaimer />

      <Footer />
      
      <FloatingHelpButton onScamShieldClick={() => setScamShieldOpen(true)} />
      <ScamShieldSubmission open={scamShieldOpen} onOpenChange={setScamShieldOpen} />
      <BookingModal
        open={consultationModalOpen}
        onOpenChange={setConsultationModalOpen}
        serviceType="training"
        serviceName="Consultation"
        basePrice={0}
      />
      </main>
    </div>
  );
};

export default Index;
