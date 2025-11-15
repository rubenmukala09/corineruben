import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import CTASection from "@/components/CTASection";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Heart, Shield, Users, MapPin, TrendingUp } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import AnimatedCounter from "@/components/AnimatedCounter";
import { useCounterAnimation } from "@/hooks/useCounterAnimation";
import { ScrollReveal } from "@/components/ScrollReveal";
import { TimelineVisualization } from "@/components/TimelineVisualization";
import heroAboutNew from "@/assets/hero-about-new.jpg";
import founderRuben from "@/assets/founder-ruben.jpg";
import founderCorine from "@/assets/founder-corine.jpg";
import teamDiverse1 from "@/assets/team-diverse-1.jpg";
import businessCollaboration from "@/assets/business-collaboration.jpg";
import { SEO } from "@/components/SEO";

function About() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showAdminBanner, setShowAdminBanner] = useState(true);

  const stat1 = useCounterAnimation({ end: 500 });
  const stat2 = useCounterAnimation({ end: 89 });
  const stat3 = useCounterAnimation({ end: 15000 });
  const stat4 = useCounterAnimation({ end: 98 });

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
      title: "Founded from Personal Experience",
      description: "After Ruben's grandmother nearly fell victim to a sophisticated phone scam, InVision Network was born with a mission to protect families."
    },
    {
      year: "2024",
      title: "First 100 Families Protected",
      description: "Our training programs reached 100 families in the first 6 months, preventing an estimated $2M in potential fraud."
    },
    {
      year: "2024",
      title: "Launched ScamShield AI",
      description: "Introduced AI-powered scam detection technology, helping seniors and vulnerable populations identify threats in real-time."
    },
    {
      year: "2025",
      title: "Expanded to Business Services",
      description: "Launched corporate training programs to help businesses protect their employees and operations from social engineering attacks."
    },
    {
      year: "2025",
      title: "500+ Families Strong",
      description: "Today we've protected over 500 families across Ohio and helped prevent over $15M in potential fraud losses."
    }
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
    <>
      <SEO 
        title="About Us - Our Story, Mission & Team"
        description="Learn about InVision Network's mission to protect families from digital scams. Founded from personal experience, serving 500+ families across Ohio."
      />
      <Navigation />
      
      <Hero
        backgroundImage={heroAboutNew}
        headline="Protecting Families, One Story at a Time"
        subheadline="Founded from personal experience, driven by community impact"
      />

      <TrustBar />

      {/* Our Story */}
      <section className="py-12 md:py-20 lg:py-32 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <ScrollReveal>
              <div>
                <Badge className="mb-4 text-base md:text-lg px-4 md:px-6 py-2" variant="secondary">
                  Our Story
                </Badge>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
                  It Started With a Phone Call
                </h2>
                <div className="space-y-4 md:space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed">
                  <p>
                    In 2023, Ruben's grandmother received a call from someone claiming to be her grandson—in jail, scared, and needing money immediately. The voice was convincing. The story was urgent. She was moments away from wiring thousands of dollars.
                  </p>
                  <p>
                    That near-miss sparked InVision Network. We realized that even smart, careful people can fall victim to increasingly sophisticated scams. The tools existed to protect against these threats, but they weren't reaching the people who needed them most.
                  </p>
                  <p>
                    Today, we're a team of cybersecurity professionals, educators, and community advocates dedicated to one mission: ensuring that no family experiences the fear and financial devastation of falling victim to a scam.
                  </p>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <div className="relative">
                <img 
                  src={teamDiverse1} 
                  alt="InVision Network team working together"
                  className="rounded-2xl shadow-2xl w-full h-auto border-4 border-primary/20"
                />
                <div className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground p-6 md:p-8 rounded-xl shadow-xl">
                  <div className="text-4xl md:text-5xl font-bold mb-2">500+</div>
                  <div className="text-sm md:text-base">Families Protected</div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-12 md:py-20 lg:py-32 bg-gradient-to-b from-secondary/20 to-background">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-12 md:mb-20">
              <Badge className="mb-4 text-base md:text-lg px-4 md:px-6 py-2" variant="secondary">
                Our Journey
              </Badge>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
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
      <section id="founders" className="py-12 md:py-20 lg:py-32 bg-background">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-12 md:mb-16">
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
                <div className="relative mb-6">
                  <img 
                    src={founderRuben} 
                    alt="Ruben - Co-Founder & CEO"
                    className="w-full aspect-square object-cover rounded-xl mb-4"
                  />
                  <Badge className="absolute top-4 right-4 bg-primary">Co-Founder & CEO</Badge>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-2">Ruben</h3>
                <p className="text-base md:text-lg text-muted-foreground mb-4">
                  Former cybersecurity consultant with 12+ years protecting Fortune 500 companies. After his grandmother's near-scam experience, Ruben dedicated his career to making enterprise-level security accessible to everyday families.
                </p>
                <blockquote className="border-l-4 border-primary pl-4 italic text-sm md:text-base text-muted-foreground">
                  "Everyone deserves to feel safe online, regardless of their technical knowledge."
                </blockquote>
              </Card>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <Card className="p-6 md:p-8 hover:shadow-2xl transition-all duration-500 border-2 border-border/50 hover:border-primary/50">
                <div className="relative mb-6">
                  <img 
                    src={founderCorine} 
                    alt="Corine - Co-Founder & COO"
                    className="w-full aspect-square object-cover rounded-xl mb-4"
                  />
                  <Badge className="absolute top-4 right-4 bg-primary">Co-Founder & COO</Badge>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-2">Corine</h3>
                <p className="text-base md:text-lg text-muted-foreground mb-4">
                  Educator and community organizer with a passion for senior advocacy. Corine designed our training methodology to be accessible, empowering, and trauma-informed—meeting people where they are.
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
      <section className="py-12 md:py-20 lg:py-32 bg-gradient-to-b from-secondary/20 to-background">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-12 md:mb-16">
              <Badge className="mb-4 text-base md:text-lg px-4 md:px-6 py-2" variant="secondary">
                Our Values
              </Badge>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
                What Drives Us Every Day
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <ScrollReveal key={value.title} delay={index * 100}>
                  <Card className="p-6 md:p-8 text-center hover:shadow-2xl transition-all duration-500 hover:scale-105 border-2 border-border/50 hover:border-primary/50">
                    <div className="w-14 h-14 md:w-16 md:h-16 mx-auto mb-4 md:mb-6 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                      <Icon className="w-7 h-7 md:w-8 md:h-8 text-primary" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold mb-3">{value.title}</h3>
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{value.description}</p>
                  </Card>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-12 md:py-20 lg:py-32 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20" />
        <div className="container mx-auto px-4 relative z-10">
          <ScrollReveal>
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
                Our Community Impact
              </h2>
              <p className="text-lg md:text-xl opacity-90 max-w-3xl mx-auto">
                Real numbers, real families, real protection
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-12">
            <ScrollReveal delay={100}>
              <div className="text-center" ref={stat1.ref}>
                <div className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2 md:mb-4">
                  <AnimatedCounter end={stat1.count} />+
                </div>
                <div className="text-base md:text-lg opacity-90">Families Trained</div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <div className="text-center" ref={stat2.ref}>
                <div className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2 md:mb-4">
                  <AnimatedCounter end={stat2.count} />%
                </div>
                <div className="text-base md:text-lg opacity-90">Scams Prevented</div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={300}>
              <div className="text-center" ref={stat3.ref}>
                <div className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2 md:mb-4">
                  $<AnimatedCounter end={stat3.count} />+
                </div>
                <div className="text-base md:text-lg opacity-90">Fraud Prevented</div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={400}>
              <div className="text-center" ref={stat4.ref}>
                <div className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2 md:mb-4">
                  <AnimatedCounter end={stat4.count} />%
                </div>
                <div className="text-base md:text-lg opacity-90">Satisfaction Rate</div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-12 md:py-20 lg:py-32 bg-background">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-12 md:mb-16">
              <Badge className="mb-4 text-base md:text-lg px-4 md:px-6 py-2" variant="secondary">
                <MapPin className="w-4 h-4 mr-2" />
                Service Areas
              </Badge>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
                Proudly Serving Ohio Families
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 md:mb-12">
                Based in Cleveland, serving communities across the state
              </p>
              <div className="flex flex-wrap gap-3 md:gap-4 justify-center">
                {["Cleveland", "Columbus", "Cincinnati", "Toledo", "Akron", "Dayton"].map((city) => (
                  <Badge key={city} variant="outline" className="text-base md:text-lg px-4 md:px-6 py-2 md:py-3">
                    {city}
                  </Badge>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <div id="cta">
        <CTASection
          headline="Ready to Join Our Protected Community?"
          description="Whether you're looking for personal training, business solutions, or want to support our mission—we'd love to connect."
        >
          <Button asChild size="lg">
            <Link to="/training">Start Training</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/business">Partner With Us</Link>
          </Button>
        </CTASection>
      </div>

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
    </>
  );
}

export default About;
