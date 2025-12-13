import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import TestimonialCard from "@/components/TestimonialCard";
import CTASection from "@/components/CTASection";
import MakingADifference from "@/components/MakingADifference";
import { VideoLightbox } from "@/components/VideoLightbox";
import { ScamShieldSubmission } from "@/components/ScamShieldSubmission";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { SEO, PAGE_SEO } from "@/components/SEO";
import {
  Shield,
  GraduationCap,
  Building2,
  ArrowRight,
  AlertTriangle,
  TrendingDown,
  UserX,
  Target,
  Clock,
  StopCircle,
  Search,
  Phone,
  DollarSign,
  FileCheck,
  Users,
  Star,
  Check,
} from "lucide-react";
import { useCounterAnimation } from "@/hooks/useCounterAnimation";
import { RotatingHeroText } from "@/components/RotatingHeroText";
import { motion } from "framer-motion";

// Hero images
import heroSlideshow1 from "@/assets/hero-home-1.jpg";
import heroSlideshow2 from "@/assets/hero-home-2.jpg";
import heroSlideshow3 from "@/assets/hero-home-3.jpg";
import heroSlideshow4 from "@/assets/hero-home-4.jpg";
import heroSlideshow5 from "@/assets/hero-home-5.jpg";

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
      headline: "AI-Powered Protection, Human-Powered Care",
      subheadline: "Technology that protects. People who care. Results that matter."
    },
  ];

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

  const services = [
    {
      icon: Shield,
      title: "ScamShield Protection",
      price: "From $39/mo",
      description: "24/7 AI-powered monitoring and threat analysis",
      features: ["Real-time detection", "Family coverage", "Priority support"],
      href: "/training#pricing",
      cta: "Get Protected",
      featured: true,
    },
    {
      icon: GraduationCap,
      title: "Prevention Training",
      price: "From $89",
      description: "Expert-led programs to recognize digital threats",
      features: ["Live instructors", "Certificates", "10% veteran discount"],
      href: "/training#training",
      cta: "Start Learning",
    },
    {
      icon: Building2,
      title: "Business Solutions",
      price: "Custom",
      description: "Enterprise AI automation and security audits",
      features: ["Custom solutions", "Dedicated support", "Flexible pricing"],
      href: "/business",
      cta: "Get Quote",
    },
  ];

  const pauseSteps = [
    { icon: StopCircle, title: "STOP", desc: "Don't act immediately—scammers create urgency" },
    { icon: Search, title: "VERIFY", desc: "Ask questions only the real person would know" },
    { icon: Phone, title: "CALL BACK", desc: "Use official numbers, never ones they provide" },
    { icon: Users, title: "SAFE-WORD", desc: "Establish a secret word with your family" },
    { icon: DollarSign, title: "DOUBLE-CHECK", desc: "Verify money requests through a second channel" },
    { icon: FileCheck, title: "REPORT", desc: "Document and report to FTC and local police" },
    { icon: Shield, title: "FORWARD", desc: "Send suspicious items to InVision for analysis" },
  ];

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

        {/* Threat Statistics */}
        <section className="py-20 bg-gradient-to-b from-background to-muted/30">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-destructive/10 text-destructive text-sm font-medium mb-4">
                <AlertTriangle className="w-4 h-4" />
                The Threat Is Real
              </span>
              <h2 className="text-3xl md:text-4xl font-bold">
                Every <span className="text-primary">14 Seconds</span>, Another Senior Falls Victim
              </h2>
            </motion.div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { ref: stat1.ref, value: stat1.displayValue, label: "Lost to scams in 2023", icon: TrendingDown },
                { ref: stat2.ref, value: stat2.displayValue, label: "Never report due to shame", icon: UserX },
                { ref: stat3.ref, value: stat3.displayValue, label: "Seniors targeted yearly", icon: Target },
                { ref: stat4.ref, value: stat4.displayValue, label: "New victim frequency", icon: Clock },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card 
                    ref={stat.ref}
                    className="p-6 text-center border-0 bg-card/60 backdrop-blur-sm hover:shadow-lg transition-all"
                  >
                    <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                    <h3 className="text-2xl md:text-3xl font-bold text-primary mb-1">
                      {stat.value}
                    </h3>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Services - Single Clean Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Choose Your Protection
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                From personal monitoring to enterprise solutions—we have you covered.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className={`h-full p-6 border transition-all hover:shadow-xl hover:-translate-y-1 ${
                    service.featured ? 'border-primary bg-primary/5 ring-1 ring-primary/20' : 'border-border/50'
                  }`}>
                    {service.featured && (
                      <span className="inline-block px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium mb-4">
                        Most Popular
                      </span>
                    )}
                    
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      <service.icon className="w-6 h-6 text-primary" />
                    </div>
                    
                    <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                    <p className="text-2xl font-bold text-primary mb-3">{service.price}</p>
                    <p className="text-muted-foreground text-sm mb-4">{service.description}</p>
                    
                    <ul className="space-y-2 mb-6">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm">
                          <Check className="w-4 h-4 text-primary shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    
                    <Button 
                      asChild 
                      variant={service.featured ? "default" : "outline"} 
                      className="w-full"
                    >
                      <Link to={service.href}>
                        {service.cta}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 60-Second Pause Protocol */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
                Free Protection Strategy
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                The 60-Second Pause Protocol™
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Stop scams before they start with this simple 7-step process
              </p>
            </motion.div>

            <div className="max-w-3xl mx-auto grid sm:grid-cols-2 gap-3">
              {pauseSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="p-4 border-0 bg-card/50 hover:bg-card transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold shrink-0">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="font-bold text-sm">{step.title}</h3>
                        <p className="text-xs text-muted-foreground">{step.desc}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mt-8"
            >
              <Button asChild variant="outline" size="lg">
                <Link to="/resources">
                  Download Free Guide
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Testimonials */}
        {videoTestimonials.length > 0 && (
          <section className="py-20 bg-muted/30">
            <div className="container mx-auto px-4">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                  <Star className="w-4 h-4" />
                  Testimonials
                </span>
                <h2 className="text-3xl md:text-4xl font-bold">
                  Trusted by Ohio Families
                </h2>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {videoTestimonials.map((testimonial) => {
                  const videoMedia = testimonial.testimonial_media?.find((m: any) => m.media_type === "video");
                  return (
                    <motion.div 
                      key={testimonial.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                    >
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
              </div>
            </div>

            <VideoLightbox
              isOpen={selectedVideo !== null}
              onClose={() => setSelectedVideo(null)}
              videoSrc={selectedVideo?.src || ""}
              title={selectedVideo?.title}
            />
          </section>
        )}

        {/* Admin Video Upload */}
        {!isLoading && isAdmin && videoTestimonials.length === 0 && (
          <section className="py-12 bg-muted/30">
            <div className="container mx-auto px-4">
              <Card className="p-8 text-center border-dashed border-2 border-primary/30 bg-primary/5">
                <h4 className="text-xl font-bold mb-2 text-primary">Video Testimonials</h4>
                <p className="text-muted-foreground mb-4">Upload customer video testimonials</p>
                <Button asChild>
                  <Link to="/admin/content/testimonials">Upload Video</Link>
                </Button>
              </Card>
            </div>
          </section>
        )}

        {/* Making a Difference */}
        <MakingADifference />

        {/* Final CTA */}
        <CTASection headline="Ready to Get Protected?" variant="gold">
          <p className="text-xl text-white/90 mb-8">
            Join Ohio families who sleep better knowing they're protected.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="gold" size="xl">
              <Link to="/training#pricing">Get Protection Now</Link>
            </Button>
            <Button asChild variant="outlineLight" size="xl">
              <Link to="/contact">Schedule Free Consultation</Link>
            </Button>
          </div>
        </CTASection>

        <Footer />
        
        <ScamShieldSubmission open={scamShieldOpen} onOpenChange={setScamShieldOpen} />
      </main>
    </div>
  );
}

export default Index;
