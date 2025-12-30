import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import CTASection from "@/components/CTASection";
import { PageTransition } from "@/components/PageTransition";
import { FloatingShapes } from "@/components/FloatingShapes";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Heart, Shield, Users, MapPin, TrendingUp, Star, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import AnimatedCounter from "@/components/AnimatedCounter";
import { useCounterAnimation } from "@/hooks/useCounterAnimation";
import { ScrollReveal } from "@/components/ScrollReveal";
import { TimelineVisualization } from "@/components/TimelineVisualization";
import { InspirationalVerses } from "@/components/InspirationalVerses";
import { OhioServiceMap } from "@/components/OhioServiceMap";
import { AchievementsShowcase } from "@/components/AchievementsShowcase";
import { AIImageDisclaimer } from "@/components/AIImageDisclaimer";
import { trackButtonClick } from "@/utils/analyticsTracker";
import heroAboutNew from "@/assets/hero-about-new.jpg";
import heroAboutProfessional from "@/assets/hero-about-professional.jpg";
import heroAbout3d from "@/assets/hero-about-3d.jpg";
import heroAbout from "@/assets/hero-about.jpg";
// Founder photos removed - will be uploaded later
import teamDiverse1 from "@/assets/team-diverse-1.jpg";
import businessCollaboration from "@/assets/business-collaboration.jpg";
import communityGroupSuccess from "@/assets/community-group-success.jpg";
import heroCommunityProtected from "@/assets/hero-community-protected.jpg";
import { SEO } from "@/components/SEO";

// Rotating hero headlines for About page
const aboutHeadlines = [
  "Protecting Families, One Story at a Time",
  "Founded from Personal Experience",
  "Driven by Community Impact",
  "Your Safety is Our Mission"
];

function About() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showAdminBanner, setShowAdminBanner] = useState(true);
  const [currentHeadlineIndex, setCurrentHeadlineIndex] = useState(0);

  const stat1 = useCounterAnimation({ end: 500 });
  const stat2 = useCounterAnimation({ end: 89 });
  const stat3 = useCounterAnimation({ end: 15000 });
  const stat4 = useCounterAnimation({ end: 98 });

  // Rotate headlines
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeadlineIndex((prev) => (prev + 1) % aboutHeadlines.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    checkAdminStatus();
  }, []);

  const checkAdminStatus = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        const { data: roleData } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', user.id)
          .single();

        if (roleData && (roleData.role === 'admin' || roleData.role === 'staff')) {
          setIsAdmin(true);
        }
      }
    } catch (error) {
      console.error('Error checking admin status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const timeline = [
    {
      year: "2023",
      title: "The Beginning",
      description: "After Ruben and Corine were victims of a sophisticated data breach and extortion attempt, InVision Network was born with a mission to protect families from the same trauma they experienced."
    },
    {
      year: "Early 2024",
      title: "First 100 Families Protected",
      description: "Our training programs reached 100 families in the first 6 months, preventing an estimated $2M in potential fraud."
    },
    {
      year: "Late 2024",
      title: "Launched ScamShield AI",
      description: "Introduced AI-powered scam detection technology, helping seniors and vulnerable populations identify threats in real-time."
    },
    {
      year: "Early 2025",
      title: "Expanded to Business Services",
      description: "Launched corporate training programs to help businesses protect their employees and operations from social engineering attacks."
    },
    {
      year: "Present Day",
      title: "500+ Families Strong",
      description: "Today we've protected over 500 families across Ohio and helped prevent over $15M in potential fraud losses."
    }
  ];

  const aboutHeroImages = [
    { src: heroAboutNew, alt: "InVision Network team members collaborating" },
    { src: heroAboutProfessional, alt: "Professional business meeting showcasing teamwork" },
    { src: heroAbout3d, alt: "Modern 3D representation of our mission" },
    { src: heroAbout, alt: "Diverse community members we serve" }
  ];

  const values = [
    {
      icon: Shield,
      title: "Protection First",
      description: "Every decision we make prioritizes the safety and security of our community."
    },
    {
      icon: Heart,
      title: "Compassionate Approach",
      description: "We understand the fear and vulnerability that comes with digital threats."
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Built by the community, for the community. Your safety is our mission."
    },
    {
      icon: Award,
      title: "Excellence in Training",
      description: "Our programs are designed by security experts with decades of combined experience."
    }
  ];

  return (
    <PageTransition variant="fade">
      <SEO 
        title="About Us - Our Story, Mission & Team"
        description="Learn about InVision Network's mission to protect families from digital scams. Founded from personal experience, serving 500+ families across Ohio."
      />
      <Navigation />
      
      <Hero
        backgroundImages={aboutHeroImages}
        headline={
          <AnimatePresence mode="wait">
            <motion.span
              key={currentHeadlineIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="block"
            >
              {aboutHeadlines[currentHeadlineIndex]}
            </motion.span>
          </AnimatePresence>
        }
        subheadline="From victims to protectors. Serving 500+ families across Ohio."
      >
        <FloatingShapes />
      </Hero>

      <TrustBar />

      {/* Our Story */}
      <section className="py-10 md:py-14 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center">
            <ScrollReveal>
              <div>
                <Badge className="mb-3 sm:mb-4 text-sm sm:text-base md:text-lg px-3 sm:px-4 md:px-6 py-1.5 sm:py-2" variant="secondary">
                  Our Story
                </Badge>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 md:mb-6">
                  It Started With a Breach
                </h2>
                <div className="space-y-3 sm:space-y-4 md:space-y-6 text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed">
                  <p>
                    When Ruben and Corine fell victim to a sophisticated data breach, their worst fears came true. All their passwords, emails, and personal information were exposed. Then came the chilling demand: pay thousands of dollars, or their private data would be sold on the dark web.
                  </p>
                  <p>
                    This traumatic experience transformed them from victims into protectors. Even before entering the cybersecurity field, they realized anyone can become a target. The attackers were sophisticated, relentless, and terrifying - this drove Ruben to dedicate his career to protecting others.
                  </p>
                  <p>
                    Today, InVision Network exists because of that painful lesson. We're a team of cybersecurity analysts, nurses, educators, and community advocates united by one mission: ensuring no family experiences the fear and financial devastation we endured.
                  </p>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <div className="relative mt-8 md:mt-0">
                <img 
                  src={teamDiverse1} 
                  alt="InVision Network team working together"
                  className="rounded-2xl shadow-2xl w-full h-auto border-4 border-primary/20"
                />
                <div className="absolute -bottom-4 sm:-bottom-6 -right-4 sm:-right-6 bg-primary text-primary-foreground p-4 sm:p-6 md:p-8 rounded-xl shadow-xl">
                  <div className="text-3xl sm:text-4xl md:text-5xl font-bold mb-1 sm:mb-2">500+</div>
                  <div className="text-xs sm:text-sm md:text-base">Families Protected</div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-10 md:py-14 bg-gradient-to-b from-secondary/20 to-background">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-8">
              <Badge className="mb-3 text-base md:text-lg px-4 md:px-6 py-2" variant="secondary">
                Our Journey
              </Badge>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3">
                Milestones That Matter
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                From a personal scare to protecting hundreds of families
              </p>
            </div>
          </ScrollReveal>
          
          <TimelineVisualization events={timeline} />
        </div>
      </section>

      {/* Founders */}
      <section id="founders" className="py-10 md:py-14 bg-background">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-8">
              <Badge className="mb-4 text-base md:text-lg px-4 md:px-6 py-2" variant="secondary">
                Meet Our Founders
              </Badge>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
                The People Behind the Mission
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                United by experience, driven by purpose
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-5xl mx-auto">
            <ScrollReveal delay={100}>
              <Card className="p-6 md:p-8 hover:shadow-2xl transition-all duration-500 border-2 border-border/50 hover:border-primary/50">
                {/* Placeholder for founder photo upload */}
                <div className="relative mb-6">
                  <div className="w-full aspect-square bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl flex items-center justify-center border-2 border-dashed border-primary/30">
                    <div className="text-center p-6">
                      <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                        <span className="text-4xl font-bold text-primary">R</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Photo Coming Soon</p>
                    </div>
                  </div>
                  <Badge className="absolute top-4 right-4 bg-primary">Co-Founder & CEO</Badge>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-2">Ruben</h3>
                <p className="text-base md:text-lg text-muted-foreground mb-4">
                  Cybersecurity Analyst with 5 years of experience protecting organizations and families. After he and his wife Corine fell victim to a sophisticated scam that exposed their passwords and emails - with criminals demanding payment to delete their data - Ruben was inspired to enter the cybersecurity field, embracing a deeper mission: making enterprise-level security accessible to everyone.
                </p>
                <blockquote className="border-l-4 border-primary pl-4 italic text-sm md:text-base text-muted-foreground">
                  "Everyone deserves to feel safe online, regardless of their technical knowledge."
                </blockquote>
              </Card>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <Card className="p-6 md:p-8 hover:shadow-2xl transition-all duration-500 border-2 border-border/50 hover:border-primary/50">
                {/* Placeholder for founder photo upload */}
                <div className="relative mb-6">
                  <div className="w-full aspect-square bg-gradient-to-br from-accent/10 to-primary/10 rounded-xl flex items-center justify-center border-2 border-dashed border-accent/30">
                    <div className="text-center p-6">
                      <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center">
                        <span className="text-4xl font-bold text-accent">C</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Photo Coming Soon</p>
                    </div>
                  </div>
                  <Badge className="absolute top-4 right-4 bg-primary">Co-Founder & COO</Badge>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-2">Corine</h3>
                <p className="text-base md:text-lg text-muted-foreground mb-4">
                  Registered Nurse with 4 years of clinical experience and a heart for community wellness. After experiencing identity theft alongside her husband, Corine channeled her compassionate care approach into designing trauma-informed cybersecurity training that meets people where they are - especially seniors and vulnerable populations.
                </p>
                <blockquote className="border-l-4 border-primary pl-4 italic text-sm md:text-base text-muted-foreground">
                  "Technology should empower, not intimidate. We're here to bridge that gap."
                </blockquote>
              </Card>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-10 md:py-14 bg-gradient-to-b from-secondary/20 to-background">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-8">
              <Badge className="mb-3 text-base md:text-lg px-4 md:px-6 py-2" variant="secondary">
                Our Values
              </Badge>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3">
                What Drives Us Every Day
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <ScrollReveal key={value.title} delay={index * 100}>
                  <Card className="p-4 sm:p-6 md:p-8 text-center hover:shadow-2xl transition-all duration-500 hover:scale-105 border-2 border-border/50 hover:border-primary/50">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto mb-3 sm:mb-4 md:mb-6 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                      <Icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-primary" />
                    </div>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3">{value.title}</h3>
                    <p className="text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed">{value.description}</p>
                  </Card>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Community Impact with Group Photo */}
      <section className="py-12 md:py-16 lg:py-20 xl:py-32 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${communityGroupSuccess})` }}
        />
        {/* No overlay - clear image */}
        <div className="container mx-auto px-4 relative z-10 text-white" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.6)' }}>
          <ScrollReveal>
            <div className="text-center mb-8 md:mb-12 lg:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 md:mb-6">
                Our Community Impact
              </h2>
              <p className="text-base sm:text-lg md:text-xl opacity-90 max-w-3xl mx-auto px-4">
                Real numbers, real families, real protection
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-12">
            <ScrollReveal delay={100}>
              <div className="text-center" ref={stat1.ref}>
                <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 md:mb-4">
                  <AnimatedCounter end={stat1.count} />+
                </div>
                <div className="text-sm sm:text-base md:text-lg opacity-90">Families Trained</div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <div className="text-center" ref={stat2.ref}>
                <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 md:mb-4">
                  <AnimatedCounter end={stat2.count} />%
                </div>
                <div className="text-sm sm:text-base md:text-lg opacity-90">Scams Prevented</div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={300}>
              <div className="text-center" ref={stat3.ref}>
                <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 md:mb-4">
                  $<AnimatedCounter end={stat3.count} />+
                </div>
                <div className="text-sm sm:text-base md:text-lg opacity-90">Fraud Prevented</div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={400}>
              <div className="text-center" ref={stat4.ref}>
                <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 md:mb-4">
                  <AnimatedCounter end={stat4.count} />%
                </div>
                <div className="text-sm sm:text-base md:text-lg opacity-90">Satisfaction Rate</div>
              </div>
            </ScrollReveal>
          </div>
          
          {/* Additional Info */}
          <ScrollReveal delay={500}>
            <div className="grid md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">
              <div className="text-center p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                <div className="text-2xl mb-2">🏠</div>
                <div className="font-bold">Ohio-Based</div>
                <div className="text-sm opacity-80">Serving local communities</div>
              </div>
              <div className="text-center p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                <div className="text-2xl mb-2">🎖️</div>
                <div className="font-bold">Veteran-Owned</div>
                <div className="text-sm opacity-80">Military values drive us</div>
              </div>
              <div className="text-center p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                <div className="text-2xl mb-2">💙</div>
                <div className="font-bold">Mission-Driven</div>
                <div className="text-sm opacity-80">Protection over profit</div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Inspirational Verses */}
      <InspirationalVerses />

      {/* Our Team / Teachers Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-10">
              <Badge className="mb-4 text-base md:text-lg px-4 md:px-6 py-2" variant="secondary">
                Our Team
              </Badge>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Meet Our Expert Teachers
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                Experienced professionals dedicated to keeping you safe
              </p>
            </div>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
            {[
              { name: "Michael Chen", role: "Senior Security Trainer", specialty: "AI & Deepfake Detection", bio: "Former FBI cyber consultant with 15 years protecting families from digital threats.", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face" },
              { name: "Sarah Williams", role: "Family Safety Specialist", specialty: "Elder Protection", bio: "Dedicated to protecting seniors after her grandmother lost savings to scammers.", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face" },
              { name: "David Johnson", role: "Cyber Analyst", specialty: "Phishing & Fraud", bio: "Certified ethical hacker who now teaches families to spot scam tactics.", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face" },
              { name: "Emily Martinez", role: "Community Educator", specialty: "Digital Literacy", bio: "Former teacher who makes cybersecurity simple and accessible for everyone.", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face" },
              { name: "James Thompson", role: "Business Security Advisor", specialty: "Corporate Training", bio: "Enterprise security expert helping businesses protect their employees.", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face" },
            ].map((teacher, index) => (
              <ScrollReveal key={teacher.name} delay={index * 100}>
                <Card className="p-5 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-border/50 h-full">
                  <img 
                    src={teacher.image} 
                    alt={teacher.name}
                    className="w-20 h-20 mx-auto mb-3 rounded-full object-cover border-2 border-primary/20"
                  />
                  <h3 className="text-base font-bold mb-1">{teacher.name}</h3>
                  <p className="text-xs text-primary font-medium mb-1">{teacher.role}</p>
                  <p className="text-xs text-muted-foreground mb-2">{teacher.specialty}</p>
                  <p className="text-[10px] text-muted-foreground/80 leading-relaxed">{teacher.bio}</p>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Showcase */}
      <AchievementsShowcase />

      {/* Service Areas with Interactive Map */}
      <OhioServiceMap />

      {/* CTA - No overlay, clear image with readable text */}
      <section className="py-20 relative overflow-hidden" id="cta">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroCommunityProtected})` }}
        />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4" style={{ textShadow: '2px 2px 10px rgba(0,0,0,0.9), 0 0 25px rgba(0,0,0,0.7)' }}>
            Ready to Join Our Protected Community?
          </h2>
          <p className="text-lg md:text-xl text-white mb-8 max-w-2xl mx-auto" style={{ textShadow: '1px 1px 6px rgba(0,0,0,0.8), 0 0 15px rgba(0,0,0,0.5)' }}>
            Whether you're looking for personal training, business solutions, or want to support our mission—we'd love to connect.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white font-bold shadow-xl">
            <Link 
              to="/training"
              onClick={() => trackButtonClick('Start Training', 'About CTA')}
            >
              Start Training
            </Link>
          </Button>
            <Button asChild size="lg" variant="outlineLight">
              <Link 
                to="/business"
                onClick={() => trackButtonClick('Partner With Us', 'About CTA')}
              >
                Partner With Us
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />

      {isAdmin && showAdminBanner && (
        <div className="fixed bottom-4 right-4 bg-primary text-primary-foreground p-4 rounded-lg shadow-lg z-50 max-w-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-semibold mb-1">Admin View Active</p>
              <p className="text-sm opacity-90">
                You're viewing admin-only content. Regular users won't see this banner.
              </p>
            </div>
            <button 
              onClick={() => setShowAdminBanner(false)}
              className="text-primary-foreground/80 hover:text-primary-foreground"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </PageTransition>
  );
}

export default About;
