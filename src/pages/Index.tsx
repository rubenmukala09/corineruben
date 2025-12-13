import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import TestimonialCard from "@/components/TestimonialCard";
import CTASection from "@/components/CTASection";
import ThreePathsForward from "@/components/ThreePathsForward";
import MakingADifference from "@/components/MakingADifference";
import { TestimonialForm } from "@/components/TestimonialForm";
import { VideoLightbox } from "@/components/VideoLightbox";
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
  Zap,
  Eye,
  Lock,
  Award,
  Star,
  ChevronRight,
  Play,
  Sparkles,
} from "lucide-react";
import { useCounterAnimation } from "@/hooks/useCounterAnimation";
import { RotatingHeroText } from "@/components/RotatingHeroText";
import { motion } from "framer-motion";
import { HomeIntroSection } from "@/components/HomeIntroSection";
import HeroValueCards from "@/components/HeroValueCards";

// Hero images
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

  const heroImages = [
    { src: heroSlideshow1, alt: "Multigenerational family learning scam prevention together" },
    { src: heroSlideshow2, alt: "Veteran protected from online scams" },
    { src: heroSlideshow3, alt: "Diverse community workshop on cybersecurity" },
    { src: heroSlideshow4, alt: "Grandfather and granddaughter using technology safely" },
    { src: heroSlideshow5, alt: "Couple receiving emergency scam assistance" },
    { src: heroSlideshow6, alt: "Veteran woman business owner with AI protection" },
    { src: heroSlideshow7, alt: "Youth teaching seniors about online safety" }
  ];

  const rotatingMessages = [
    {
      headline: "Protecting Ohio Families from AI-Powered Scams",
      subheadline: "Your parents didn't grow up with technology. Don't let scammers take advantage of that."
    },
    {
      headline: "Don't Let Scammers Steal Your Life Savings",
      subheadline: "Seniors lose $28.3 billion to scams every year. We're here to stop that."
    },
    {
      headline: "Expert Cybersecurity for Seniors & Families",
      subheadline: "Veteran-owned, Ohio-based protection you can trust."
    },
    {
      headline: "AI-Powered Protection, Human-Powered Care",
      subheadline: "Technology that protects. People who care. Results that matter."
    },
    {
      headline: "Veteran-Owned. Ohio-Based. Family-Focused.",
      subheadline: "Serving Dayton & Miami Valley with 24-hour response times."
    }
  ];

  // Counter animations
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
        .select(`*, testimonial_media (*)`)
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

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  return (
    <div className="min-h-screen bg-background">
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

        {/* Home Intro Section */}
        <HomeIntroSection />

        {/* Hero Value Cards - 3 Ways to Get Protected */}
        <HeroValueCards />

        {/* Stats Section - Dramatic Impact */}
        <section className="relative py-20 overflow-hidden bg-gradient-to-b from-background via-muted/30 to-background">
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-16"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-destructive/10 text-destructive text-sm font-semibold mb-6">
                <AlertTriangle className="w-4 h-4" />
                The Threat Is Real
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Every <span className="text-primary">14 Seconds</span>, Another Senior Falls Victim
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                AI-powered scams are becoming increasingly sophisticated. Here's what's at stake.
              </p>
            </motion.div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
            >
              {[
                { ref: stat1.ref, value: stat1.displayValue, label: "Lost to scams in 2023", icon: TrendingDown, color: "destructive" },
                { ref: stat2.ref, value: stat2.displayValue, label: "Never report due to shame", icon: UserX, color: "primary" },
                { ref: stat3.ref, value: stat3.displayValue, label: "Seniors targeted yearly", icon: Target, color: "accent" },
                { ref: stat4.ref, value: stat4.displayValue, label: "New victim frequency", icon: Clock, color: "primary" },
              ].map((stat, index) => (
                <motion.div key={index} variants={fadeInUp}>
                  <Card 
                    ref={stat.ref}
                    className="relative p-6 md:p-8 text-center group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 overflow-hidden border-0 bg-card/80 backdrop-blur-sm"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative z-10">
                      <div className="mx-auto w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                        <stat.icon className="w-7 h-7 text-primary" />
                      </div>
                      <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
                        {stat.value}
                      </h3>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mt-12"
            >
              <p className="text-xl font-semibold text-foreground">
                Don't become a statistic. <span className="text-primary">Get protected today.</span>
              </p>
            </motion.div>
          </div>
        </section>

        {/* Three Paths Forward */}
        <ThreePathsForward />

        {/* Why Trust Us - Modern Bento Grid */}
        <section className="py-20 bg-muted/30 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary/5 via-transparent to-transparent" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-16"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">
                <Award className="w-4 h-4" />
                Why Choose InVision
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                Trusted by <span className="text-primary">500+</span> Ohio Families
              </h2>
            </motion.div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
            >
              {[
                { icon: Shield, title: "Expert Cybersecurity Team", desc: "Certified professionals protecting you 24/7", highlight: true },
                { icon: Heart, title: "Ohio Based & Local", desc: "Serving Dayton & Miami Valley community" },
                { icon: MessageSquare, title: "Multilingual Support", desc: "English • French • Spanish" },
                { icon: Zap, title: "24hr Response Time", desc: "Fast analysis of suspicious content" },
              ].map((item, index) => (
                <motion.div key={index} variants={fadeInUp}>
                  <Card className={`group p-6 h-full border-0 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl ${item.highlight ? 'bg-gradient-to-br from-primary to-primary/80 text-primary-foreground' : 'bg-card/80 backdrop-blur-sm'}`}>
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 ${item.highlight ? 'bg-white/20' : 'bg-gradient-to-br from-primary/20 to-accent/20'}`}>
                      <item.icon className={`w-6 h-6 ${item.highlight ? 'text-white' : 'text-primary'}`} />
                    </div>
                    <h3 className={`text-lg font-bold mb-2 ${item.highlight ? '' : 'group-hover:text-primary transition-colors'}`}>{item.title}</h3>
                    <p className={item.highlight ? 'text-white/80' : 'text-muted-foreground text-sm'}>{item.desc}</p>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* 60-Second Pause Protocol - Timeline Style */}
        <section className="py-20 bg-background relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-16"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-6">
                <Lock className="w-4 h-4" />
                Free Protection Strategy
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                The 60-Second Pause Protocol™
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Stop scams before they start with this simple 7-step process
              </p>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
                className="space-y-4"
              >
                {[
                  { icon: StopCircle, title: "STOP & BREATHE", desc: "Don't act immediately. Scammers create urgency to bypass your judgment." },
                  { icon: Search, title: "VERIFY IDENTITY", desc: "Ask specific questions only the real person would know." },
                  { icon: Phone, title: "CALL BACK OFFICIAL NUMBER", desc: "Use the number on your bank card - NEVER the number they give you." },
                  { icon: Users, title: "USE FAMILY SAFE-WORD", desc: "Establish a secret word with family. No safe-word? No action." },
                  { icon: DollarSign, title: "DOUBLE-CHECK MONEY REQUESTS", desc: "If anyone asks for money - verify through a SECOND channel." },
                  { icon: FileCheck, title: "DOCUMENT & REPORT", desc: "Write down details and report to FTC, your bank, and local police." },
                  { icon: Shield, title: "FORWARD TO INVISION", desc: "ScamShield members: Send us the suspicious item for analysis." },
                ].map((step, index) => (
                  <motion.div key={index} variants={fadeInUp}>
                    <Card className="group p-5 border-0 bg-card/50 backdrop-blur-sm hover:bg-card hover:shadow-lg transition-all duration-300">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <div className="relative">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-lg group-hover:scale-110 transition-transform duration-300">
                              {index + 1}
                            </div>
                            {index < 6 && (
                              <div className="absolute top-full left-1/2 -translate-x-1/2 w-0.5 h-4 bg-gradient-to-b from-primary/50 to-transparent" />
                            )}
                          </div>
                        </div>
                        <div className="flex-grow pt-1">
                          <div className="flex items-center gap-3 mb-1">
                            <step.icon className="w-5 h-5 text-primary" />
                            <h3 className="font-bold text-lg group-hover:text-primary transition-colors">{step.title}</h3>
                          </div>
                          <p className="text-muted-foreground">{step.desc}</p>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="text-center mt-12"
              >
                <Button asChild size="lg" className="group">
                  <Link to="/resources" className="inline-flex items-center gap-2">
                    Download Free Protection Guide
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* What You'll Master - Modern Grid */}
        <section className="py-20 bg-muted/30 relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-16"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">
                <Sparkles className="w-4 h-4" />
                Training Benefits
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                What You'll Master
              </h2>
            </motion.div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
            >
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
                <motion.div key={index} variants={fadeInUp}>
                  <Card className="group p-5 h-full border-0 bg-card/50 backdrop-blur-sm hover:bg-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <CheckCircle className="w-4 h-4 text-primary" />
                      </div>
                      <p className="text-foreground font-medium group-hover:text-primary transition-colors">{skill}</p>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mt-12"
            >
              <Button asChild variant="outline" size="lg" className="group border-2">
                <Link to="/training" className="inline-flex items-center gap-2">
                  View Training Options
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-background relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-20 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
            <div className="absolute bottom-20 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-16"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">
                <Star className="w-4 h-4" />
                Testimonials
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Trusted by 500+ Ohio Families
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Real stories from real people protected by InVision Network
              </p>
            </motion.div>

            {videoTestimonials.length > 0 && (
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                {videoTestimonials.map((testimonial) => {
                  const videoMedia = testimonial.testimonial_media?.find((m: any) => m.media_type === "video");
                  return (
                    <motion.div key={testimonial.id} variants={fadeInUp}>
                      <TestimonialCard
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
                    </motion.div>
                  );
                })}
              </motion.div>
            )}

            {/* Admin Video Upload Prompt */}
            {!isLoading && isAdmin && videoTestimonials.length === 0 && (
              <div className="mb-12">
                <Card className="p-12 text-center border-2 border-dashed border-primary/30 bg-primary/5">
                  <div className="text-6xl mb-4">🎥</div>
                  <h4 className="text-2xl font-bold mb-3 text-primary">Video Testimonials</h4>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    Upload customer video testimonials to showcase on your homepage
                  </p>
                  <Button asChild>
                    <Link to="/admin/content/testimonials">Upload First Video</Link>
                  </Button>
                </Card>
              </div>
            )}
          </div>

          <VideoLightbox
            isOpen={selectedVideo !== null}
            onClose={() => setSelectedVideo(null)}
            videoSrc={selectedVideo?.src || ""}
            title={selectedVideo?.title}
          />
        </section>

        {/* FAQ Teaser */}
        <section className="py-20 bg-muted/30 relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold">Frequently Asked Questions</h2>
            </motion.div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="max-w-3xl mx-auto space-y-4"
            >
              {[
                {
                  q: "What types of scams can ScamShield detect?",
                  a: "We analyze all types: phishing emails, SMS scams, voice calls, QR codes, social media messages, investment schemes, romance scams, and more. Our specialty is AI-powered threats like deepfakes and voice cloning.",
                },
                {
                  q: "What if I'm not tech-savvy?",
                  a: "That's exactly who we serve! Our services are designed for people of all technical skill levels. If you can forward an email or take a screenshot, you can use our services.",
                },
              ].map((faq, index) => (
                <motion.div key={index} variants={fadeInUp}>
                  <Card className="p-6 border-0 bg-card/50 backdrop-blur-sm hover:bg-card hover:shadow-lg transition-all duration-300 group">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{faq.q}</h3>
                    <p className="text-muted-foreground">{faq.a}</p>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mt-8"
            >
              <Link
                to="/faq"
                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold text-lg group"
              >
                View All FAQ
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Making a Difference */}
        <MakingADifference />

        {/* Final CTA */}
        <CTASection headline="Protect What Matters Most" variant="gold">
          <p className="text-xl text-white/90 mb-8">Join 500+ Ohio families who sleep better knowing they're protected from AI scams.</p>
          <div className="flex flex-col sm:flex-row gap-4 flex-wrap justify-center">
            <Button asChild variant="gold" size="xl" className="w-full sm:w-auto">
              <Link to="/training">Schedule Consultation</Link>
            </Button>
            <Button asChild variant="secondary" size="xl" className="w-full sm:w-auto">
              <Link to="/training#pricing">Get Protection Now</Link>
            </Button>
            <Button asChild variant="outlineLight" size="xl" className="w-full sm:w-auto">
              <Link to="/business">Get Business Quote</Link>
            </Button>
          </div>
          <p className="text-white/80 mt-6 text-sm">
            ✓ No credit card required ✓ Cancel anytime ✓ 60-day money-back guarantee
          </p>
        </CTASection>

        <Footer />
        
        <ScamShieldSubmission open={scamShieldOpen} onOpenChange={setScamShieldOpen} />
      </main>
    </div>
  );
}

export default Index;
