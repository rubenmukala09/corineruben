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
import { Award, Heart, Shield, Users, MapPin, Star, CheckCircle } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { TimelineVisualization } from "@/components/TimelineVisualization";
import { InspirationalVerses } from "@/components/InspirationalVerses";
import { OhioServiceMap } from "@/components/OhioServiceMap";
import { AchievementsShowcase } from "@/components/AchievementsShowcase";
import { AIImageDisclaimer } from "@/components/AIImageDisclaimer";
import { trackButtonClick } from "@/utils/analyticsTracker";
import { PROFESSIONAL_HERO_IMAGES } from "@/config/professionalHeroImages";
// Team and culture photos
import teamDiverse1 from "@/assets/team-diverse-1.jpg";
import businessCollaboration from "@/assets/business-collaboration.jpg";
import ohioNatureImpact from "@/assets/ohio-nature-impact.jpg";
import fieldSunsetCta from "@/assets/field-sunset-cta.jpg";
import familyGathering from "@/assets/family-gathering.jpg";
import seniorLearning from "@/assets/senior-learning.jpg";
import { SEO } from "@/components/SEO";
import { RotatingHeadlines } from "@/components/shared/RotatingHeadlines";
import HeroFloatingStats from "@/components/business/HeroFloatingStats";
import { useAdminStatus } from "@/hooks/useAdminStatus";

// Rotating hero headlines for About page
const aboutHeadlines = [
  "Protecting Families, One Story at a Time",
  "Founded from Personal Experience",
  "Driven by Community Impact",
  "Your Safety is Our Mission"
];

function About() {
  const { isAdmin, isLoading } = useAdminStatus();
  const [showAdminBanner, setShowAdminBanner] = useState(true);

  const timeline = [
    {
      year: "2023",
      title: "The Beginning",
      description: "After Ruben and Corine were victims of a sophisticated data breach and extortion attempt, InVision Network was born with a mission to protect families from the same trauma they experienced."
    },
    {
      year: "Early 2024",
      title: "First Families Protected",
      description: "Our training programs began reaching families in the Dayton area, helping them identify and avoid sophisticated scam attempts."
    },
    {
      year: "Late 2024",
      title: "Launched ScamShield AI",
      description: "Introduced AI-powered scam detection technology, helping seniors and vulnerable populations identify threats in real-time."
    },
    {
      year: "Early 2025",
      title: "Expanded to Business Services",
      description: "Launched corporate training programs and AI automation services to help businesses protect their operations."
    },
    {
      year: "Present Day",
      title: "Growing & Protecting",
      description: "Today we're protecting over 100 families across Ohio and growing our mission to create a scam-free community."
    }
  ];

  const aboutHeroImages = PROFESSIONAL_HERO_IMAGES.about;

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
        description="Learn about InVision Network's mission to protect families from digital scams. Founded from personal experience, serving families across Ohio."
      />
      <Navigation />
      
      {/* Hero wrapper for floating stats */}
      <div className="relative">
        <Hero
          backgroundImages={aboutHeroImages}
          headline={<RotatingHeadlines headlines={aboutHeadlines} />}
          subheadline="From victims to protectors. Serving families across Ohio."
        >
          <FloatingShapes />
        </Hero>
        
        {/* Floating Stats Bar - Outside Hero to stay static */}
        <HeroFloatingStats />
      </div>

      {/* Spacer for floating stats bar */}
      <div className="h-12" />

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
                  <div className="text-3xl sm:text-4xl md:text-5xl font-bold mb-1 sm:mb-2">100+</div>
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

      {/* Community Impact with Nature Background */}
      <section className="py-16 md:py-24 lg:py-32 relative overflow-hidden">
        {/* Background image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${ohioNatureImpact})` }}
        />
        
        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-primary/60 to-accent/70" />
        
        <div className="container mx-auto px-4 relative z-10 text-white">
          <ScrollReveal>
            <div className="text-center mb-10 md:mb-14">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 drop-shadow-lg">
                Our Community Impact
              </h2>
              <p className="text-base sm:text-lg md:text-xl opacity-95 max-w-3xl mx-auto px-4 drop-shadow-md">
                Protecting families and serving our local community
              </p>
            </div>
          </ScrollReveal>
          
          {/* Three Info Cards Only */}
          <ScrollReveal delay={200}>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="text-center p-6 bg-white/15 rounded-2xl backdrop-blur-md border border-white/25 hover:bg-white/20 transition-all duration-300 hover:-translate-y-1">
                <div className="text-4xl mb-4">🏠</div>
                <div className="font-bold text-xl mb-2">Ohio-Based</div>
                <div className="text-sm opacity-90">Serving local communities across the Buckeye State</div>
              </div>
              <div className="text-center p-6 bg-white/15 rounded-2xl backdrop-blur-md border border-white/25 hover:bg-white/20 transition-all duration-300 hover:-translate-y-1">
                <div className="text-4xl mb-4">🎖️</div>
                <div className="font-bold text-xl mb-2">Veteran-Supporting</div>
                <div className="text-sm opacity-90">Honoring those who served with special discounts</div>
              </div>
              <div className="text-center p-6 bg-white/15 rounded-2xl backdrop-blur-md border border-white/25 hover:bg-white/20 transition-all duration-300 hover:-translate-y-1">
                <div className="text-4xl mb-4">💙</div>
                <div className="font-bold text-xl mb-2">Mission-Driven</div>
                <div className="text-sm opacity-90">Protection over profit, always</div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Who We Help - Photo Gallery */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-12">
              <Badge className="mb-4" variant="secondary">Who We Serve</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Protecting Those Who Matter Most
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                From multi-generational families to seniors learning new technology
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <ScrollReveal delay={100}>
              <div className="relative group overflow-hidden rounded-3xl shadow-2xl">
                <img 
                  src={familyGathering} 
                  alt="Multi-generational family enjoying time together" 
                  className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <h3 className="text-2xl font-bold mb-2">Family Protection</h3>
                  <p className="text-white/90">Keeping your loved ones safe across all generations—from tech-savvy kids to treasured grandparents.</p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="relative group overflow-hidden rounded-3xl shadow-2xl">
                <img 
                  src={seniorLearning} 
                  alt="Senior learning to use technology with instructor" 
                  className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-accent/90 via-accent/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <h3 className="text-2xl font-bold mb-2">Senior Education</h3>
                  <p className="text-white/90">Patient, compassionate training designed specifically for seniors who want to stay safe online.</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Inspirational Verses */}
      <InspirationalVerses />

      {/* Team section - real team profiles to be added via admin */}

      {/* Achievements Showcase */}
      <AchievementsShowcase />

      {/* Service Areas with Interactive Map */}
      <OhioServiceMap />

      {/* CTA with Field Background */}
      <section className="py-24 md:py-32 relative overflow-hidden" id="cta">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${fieldSunsetCta})` }}
        />
        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/50 to-transparent" />
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 drop-shadow-lg">
            Ready to Join Our Protected Community?
          </h2>
          <p className="text-lg md:text-xl text-white/95 mb-8 max-w-2xl mx-auto drop-shadow-md">
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
