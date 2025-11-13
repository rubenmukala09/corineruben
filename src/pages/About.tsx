import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import FlowingWaves from "@/components/FlowingWaves";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart, Lock, BookOpen, Users2, Shield, DollarSign, Award, MapPin, X } from "lucide-react";
import heroAbout from "@/assets/hero-about-professional.jpg";
import { supabase } from "@/integrations/supabase/client";
import { useCounterAnimation } from "@/hooks/useCounterAnimation";

const About = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showAdminBanner, setShowAdminBanner] = useState(true);

  // Counter animations for stats
  const familiesTrained = useCounterAnimation({ end: 500, suffix: '+', duration: 2000 });
  const fraudPrevented = useCounterAnimation({ end: 2, prefix: '$', suffix: 'M+', duration: 2000 });
  const veteranSessions = useCounterAnimation({ end: 50, suffix: '+', duration: 2000 });
  const cancerScholarships = useCounterAnimation({ end: 30, suffix: '+', duration: 2000 });

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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />

      <Hero
        backgroundImage={heroAbout}
        headline="Your Partner in AI Safety and Security"
        subheadline="Based in Dayton-Kettering, serving families across Ohio and nationwide"
        showScrollIndicator={true}
      />

      <TrustBar />

      {/* Our Story */}
      <section className="py-32 bg-background relative overflow-hidden">
        <FlowingWaves variant="full" opacity={0.15} />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-center mb-16 animate-fade-in text-4xl md:text-5xl">Founded on a Personal Mission</h2>
            <Card className="p-8 md:p-12 bg-gradient-to-br from-background/80 to-muted/30 backdrop-blur-sm border-2 border-primary/10 shadow-strong">
              <div className="space-y-8 text-xl leading-relaxed">
                <p className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
                  InVision Network was born from a personal experience when <span className="text-foreground font-bold text-2xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Ruben Nkulu</span>, <span className="text-foreground font-semibold">Founder and CEO</span> and engineer in cybersecurity, witnessed his own grandmother nearly fall victim to a <span className="text-foreground font-semibold">sophisticated AI voice-cloning scam</span>. The caller <em>sounded exactly like her grandson</em>, claiming he was in jail and desperately needed money. It was only by asking a specific question that she realized something was wrong.
                </p>
                <p className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
                  <span className="text-foreground font-bold text-2xl">That moment changed everything.</span> Ruben realized that traditional fraud prevention methods weren't enough to combat these new AI-powered threats. So he created <span className="text-foreground font-semibold">InVision Network</span> - a comprehensive solution that combines <span className="text-primary font-semibold">expert training</span>, <span className="text-primary font-semibold">real-time threat analysis</span>, and <span className="text-primary font-semibold">innovative AI business solutions</span>, all built on a foundation of security and trust.
                </p>
                <div className="pt-6 border-t-2 border-primary/20 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                  <p>
                    <span className="text-foreground font-bold text-2xl block mb-4">Giving Back to Our Community:</span>
                    <span className="text-lg">At InVision Network, we believe in supporting those who've served and protected us. We proudly offer <span className="text-foreground font-semibold">special support programs for veterans, active duty military, first responders, and individuals battling cancer</span>. Through discounted services, free training sessions, and scholarship programs, we're committed to protecting and empowering those who've given so much to our communities.</span>
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto p-12 bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/10 shadow-medium">
            <blockquote className="text-2xl md:text-3xl font-bold text-center leading-relaxed text-foreground">
              "Empowering families and businesses to safely navigate the AI age through education, protection, and innovation."
            </blockquote>
          </Card>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-center mb-16">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto" style={{ perspective: '1000px' }}>
            <Card className="p-8 rounded-2xl border-border/50 value-card opacity-0 animate-[flip-in_0.7s_ease-out_0s_forwards] group hover:-translate-y-1.5 hover:shadow-strong transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:animate-[bounce_0.5s_ease-in-out]">
                  <Heart className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3">Respect Over Fear</h3>
                  <p className="text-muted-foreground">
                    We don't patronize. We don't use scare tactics. We educate with clarity and dignity.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-8 rounded-2xl border-border/50 value-card opacity-0 animate-[flip-in_0.7s_ease-out_0.15s_forwards] group hover:-translate-y-1.5 hover:shadow-strong transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:animate-[bounce_0.5s_ease-in-out]">
                  <Lock className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3">Privacy is Sacred</h3>
                  <p className="text-muted-foreground">
                    We will NEVER ask for passwords, bank info, or Social Security numbers. Period.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-8 rounded-2xl border-border/50 value-card opacity-0 animate-[flip-in_0.7s_ease-out_0.3s_forwards] group hover:-translate-y-1.5 hover:shadow-strong transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:animate-[bounce_0.5s_ease-in-out]">
                  <BookOpen className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3">Plain English, Always</h3>
                  <p className="text-muted-foreground">
                    No jargon. No tech-speak. Just clear, actionable guidance anyone can follow.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-8 rounded-2xl border-border/50 value-card opacity-0 animate-[flip-in_0.7s_ease-out_0.45s_forwards] group hover:-translate-y-1.5 hover:shadow-strong transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:animate-[bounce_0.5s_ease-in-out]">
                  <Users2 className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3">INTEGRITY</h3>
                  <p className="text-muted-foreground">
                    Transparent, honest, ethical
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Impact */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-center mb-16">Our Community Impact</h2>
          
          {/* Admin Banner */}
          {!isLoading && isAdmin && showAdminBanner && (
            <div className="max-w-4xl mx-auto mb-8 animate-fade-in">
              <div className="bg-[#FEF3C7] border border-[#FDE68A] rounded-lg p-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">⚠️</span>
                  <p className="text-sm text-gray-800 font-medium">
                    Verify these numbers are accurate or update via Dashboard
                  </p>
                </div>
                <button
                  onClick={() => setShowAdminBanner(false)}
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                  aria-label="Close banner"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="p-8 text-center hover:shadow-medium transition-all hover:-translate-y-1 rounded-2xl border-border/50">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
              </div>
              <p ref={familiesTrained.ref} className="text-4xl font-bold gradient-text-primary mb-2">
                {familiesTrained.displayValue}
              </p>
              <p className="text-muted-foreground">Families Trained</p>
            </Card>

            <Card className="p-8 text-center hover:shadow-medium transition-all hover:-translate-y-1 rounded-2xl border-border/50">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
              </div>
              <p ref={fraudPrevented.ref} className="text-4xl font-bold gradient-text-primary mb-2">
                {fraudPrevented.displayValue}
              </p>
              <p className="text-muted-foreground">in Fraud Prevented</p>
            </Card>

            <Card className="p-8 text-center hover:shadow-medium transition-all hover:-translate-y-1 rounded-2xl border-border/50">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                  <Award className="w-6 h-6 text-white" />
                </div>
              </div>
              <p ref={veteranSessions.ref} className="text-4xl font-bold gradient-text-primary mb-2">
                {veteranSessions.displayValue}
              </p>
              <p className="text-muted-foreground">Sessions for Veterans</p>
            </Card>

            <Card className="p-8 text-center hover:shadow-medium transition-all hover:-translate-y-1 rounded-2xl border-border/50">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
              </div>
              <p ref={cancerScholarships.ref} className="text-4xl font-bold gradient-text-primary mb-2">
                {cancerScholarships.displayValue}
              </p>
              <p className="text-muted-foreground">Cancer Patient Scholarships</p>
            </Card>
          </div>

        </div>
      </section>

      {/* Meet Our Team */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-center mb-4">Meet Our Team</h2>
          <p className="text-center text-xl text-muted-foreground mb-16 max-w-3xl mx-auto">
            Dedicated professionals committed to protecting families and empowering businesses
          </p>
          
          {!isLoading && isAdmin && (
            <div className="max-w-4xl mx-auto animate-fade-in">
              <Card 
                className="border-[3px] border-dashed border-[#6D28D9] bg-[#6D28D9]/5 rounded-2xl p-10 min-h-[300px] flex items-center justify-center"
                style={{ animationDelay: '0.2s' }}
              >
                <div className="flex flex-col items-center text-center gap-6">
                  <div className="text-[64px] leading-none">👥</div>
                  <div>
                    <h3 className="text-3xl font-bold mb-2">Your Team</h3>
                    <p className="text-lg text-muted-foreground mb-6">
                      Add team members to showcase your expert staff
                    </p>
                    <Button size="lg" className="mb-4">
                      Add Team Member
                    </Button>
                    <p className="text-sm text-muted-foreground italic">
                      Current team: <span className="font-semibold text-foreground">Ruben Nkulu (Founder)</span>
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
      </section>

      {/* Certifications & Partnerships */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-center mb-16">Our Certifications & Partnerships</h2>
          <div className="flex flex-wrap justify-center items-center gap-8">
            <Card className="p-6 transition-all duration-300 hover:scale-110 hover:rotate-[5deg] hover:shadow-[0_10px_30px_rgba(0,0,0,0.15)] grayscale hover:grayscale-0 cursor-pointer">
              <div className="flex items-center gap-3">
                <Shield className="w-8 h-8 text-accent" />
                <span className="font-bold">BBB Accredited</span>
              </div>
            </Card>
            <Card className="p-6 transition-all duration-300 hover:scale-110 hover:rotate-[5deg] hover:shadow-[0_10px_30px_rgba(0,0,0,0.15)] grayscale hover:grayscale-0 cursor-pointer">
              <div className="flex items-center gap-3">
                <Award className="w-8 h-8 text-accent" />
                <span className="font-bold">Veteran Support Certified</span>
              </div>
            </Card>
            <Card className="p-6 transition-all duration-300 hover:scale-110 hover:rotate-[5deg] hover:shadow-[0_10px_30px_rgba(0,0,0,0.15)] grayscale hover:grayscale-0 cursor-pointer">
              <div className="flex items-center gap-3">
                <Users2 className="w-8 h-8 text-accent" />
                <span className="font-bold">Ohio Small Business Association</span>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-center mb-16">Service Areas</h2>
          <div className="max-w-4xl mx-auto">
            <Card className="p-12">
              <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-2 text-lg text-gray-700 mb-2">
                  <MapPin className="w-5 h-5" />
                  <span className="font-semibold">Primary Service Areas</span>
                </div>
              </div>
              <ul className="space-y-3 max-w-md mx-auto">
                <li className="flex items-center gap-2 text-gray-700 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                  <span>•</span>
                  <span>Dayton Metro</span>
                </li>
                <li className="flex items-center gap-2 text-gray-700 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                  <span>•</span>
                  <span>Kettering</span>
                </li>
                <li className="flex items-center gap-2 text-gray-700 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                  <span>•</span>
                  <span>Beavercreek</span>
                </li>
                <li className="flex items-center gap-2 text-gray-700 animate-fade-in" style={{ animationDelay: '0.4s' }}>
                  <span>•</span>
                  <span>Centerville</span>
                </li>
                <li className="flex items-center gap-2 text-gray-700 animate-fade-in" style={{ animationDelay: '0.5s' }}>
                  <span>•</span>
                  <span>Springfield</span>
                </li>
                <li className="flex items-center gap-2 text-gray-700 animate-fade-in" style={{ animationDelay: '0.6s' }}>
                  <span>•</span>
                  <span>Columbus</span>
                </li>
                <li className="flex items-center gap-2 text-gray-700 font-semibold animate-fade-in" style={{ animationDelay: '0.7s' }}>
                  <span>•</span>
                  <span>Nationwide Service Available</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-gradient-to-r from-primary to-accent">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-white mb-8">Want to Join Our Mission?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild variant="gold" size="xl">
              <Link to="/training">BOOK TRAINING</Link>
            </Button>
            <Button asChild variant="outlineLight" size="xl">
              <Link to="/contact">PARTNER WITH US</Link>
            </Button>
            <Button asChild variant="outlineLight" size="xl">
              <Link to="/donate">DONATE A TRAINING SEAT</Link>
            </Button>
          </div>
            <p className="mt-6 text-white/90 text-lg">
            Questions? Call <a href="tel:9375550199" className="underline hover:text-white font-semibold">(937) 555-0199</a>
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
