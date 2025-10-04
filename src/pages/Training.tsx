import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import TestimonialCard from "@/components/TestimonialCard";
import CTASection from "@/components/CTASection";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, FileText, Award, MessageSquare, Users, Home } from "lucide-react";
import heroImage from "@/assets/hero-training.jpg";
import testimonial2 from "@/assets/testimonial-2.jpg";
import testimonial4 from "@/assets/testimonial-4.jpg";

const Training = () => {
  return (
    <div className="min-h-screen">
      <Navigation />

      <Hero
        backgroundImage={heroImage}
        headline="Learn to Outsmart AI Scammers—No Tech Skills Required"
        subheadline="Master deepfake detection, phishing defense, and emergency protocols in plain English. Walk away with ready-to-use scripts and lifetime confidence."
      >
        <Button asChild variant="default" size="xl">
          <Link to="/contact">BOOK TRAINING NOW</Link>
        </Button>
      </Hero>

      <TrustBar />

      {/* What You'll Master */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-center mb-12">What You'll Master</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="space-y-4">
              {[
                "Identity Verification & Callback Drills",
                "Deepfake Voice & Video Red Flags",
                "Link/QR Code Hygiene & Device Basics",
                "Urgent Money Request Handling",
                "Bank/IRS/Tech-Support/Romance Scam Scripts",
                "The 60-Second Pause Protocol™",
                "Family Safe-Word System Setup",
                "Emergency Response Checklist",
              ].map((skill, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-success flex-shrink-0 mt-1" />
                  <span className="text-lg">{skill}</span>
                </div>
              ))}
            </div>
            <div className="bg-muted/50 rounded-lg p-8">
              <img
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop"
                alt="Person confidently reviewing security documents"
                className="rounded-lg shadow-medium"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Table */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-center mb-16">Training Programs & Pricing</h2>
          
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Program Features Column */}
              <Card className="bg-card/50 border-border/50 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-8">Program Features</h3>
                <div className="space-y-8">
                  <div className="py-4">
                    <p className="font-semibold text-foreground">Format</p>
                  </div>
                  <div className="py-4">
                    <p className="font-semibold text-foreground">Ideal For</p>
                  </div>
                  <div className="py-4">
                    <p className="font-semibold text-foreground">Group Size</p>
                  </div>
                  <div className="py-4">
                    <p className="font-semibold text-foreground">Languages</p>
                  </div>
                  <div className="py-4 pt-8">
                    <p className="font-semibold text-foreground">Price</p>
                  </div>
                </div>
              </Card>

              {/* Single Small Group */}
              <Card className="bg-card border-border/50 rounded-xl p-6 hover:shadow-medium transition-shadow">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2">Single Small Group</h3>
                  <p className="text-muted-foreground">15-25 participants</p>
                </div>
                <div className="space-y-8">
                  <div className="py-4 text-center">
                    <p className="text-foreground">Zoom, 60-90 min</p>
                  </div>
                  <div className="py-4 text-center">
                    <p className="text-foreground">Individual learner</p>
                  </div>
                  <div className="py-4 text-center">
                    <p className="text-foreground">15-25 participants</p>
                  </div>
                  <div className="py-4 text-center">
                    <p className="text-foreground">EN / FR / ES</p>
                  </div>
                  <div className="py-4 pt-8 text-center">
                    <p className="text-5xl font-bold text-accent mb-2">$149</p>
                    <p className="text-sm text-muted-foreground">per person</p>
                  </div>
                </div>
                <Button asChild variant="default" size="lg" className="w-full mt-6">
                  <Link to="/contact">Book Now</Link>
                </Button>
              </Card>

              {/* Family Small Group - Most Popular */}
              <Card className="bg-card border-2 border-accent rounded-xl p-6 shadow-medium hover:shadow-strong transition-shadow relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-white px-4 py-1 rounded-full text-xs font-bold">
                  MOST POPULAR
                </div>
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2">Family Small Group</h3>
                  <p className="text-muted-foreground">8-12 participants</p>
                </div>
                <div className="space-y-8">
                  <div className="py-4 text-center">
                    <p className="text-foreground">Zoom, limited seats</p>
                  </div>
                  <div className="py-4 text-center">
                    <p className="text-foreground">Couples & families</p>
                  </div>
                  <div className="py-4 text-center">
                    <p className="text-foreground">8-12 participants</p>
                  </div>
                  <div className="py-4 text-center">
                    <p className="text-foreground">EN / FR / ES</p>
                  </div>
                  <div className="py-4 pt-8 text-center">
                    <p className="text-5xl font-bold text-accent mb-2">$299</p>
                    <p className="text-sm text-muted-foreground mb-2">per session</p>
                    <p className="text-sm font-semibold text-success">Spouse FREE</p>
                  </div>
                </div>
                <Button asChild variant="default" size="lg" className="w-full mt-6 bg-accent hover:bg-accent/90">
                  <Link to="/contact">Book Now</Link>
                </Button>
              </Card>

              {/* Priority Private */}
              <Card className="bg-card border-border/50 rounded-xl p-6 hover:shadow-medium transition-shadow">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2">Priority Private</h3>
                  <p className="text-muted-foreground">1-3 people</p>
                </div>
                <div className="space-y-8">
                  <div className="py-4 text-center">
                    <p className="text-foreground">Zoom or In-Person</p>
                  </div>
                  <div className="py-4 text-center">
                    <p className="text-foreground">High-risk / urgent needs</p>
                  </div>
                  <div className="py-4 text-center">
                    <p className="text-foreground">Private (1-3 people)</p>
                  </div>
                  <div className="py-4 text-center">
                    <p className="text-foreground">EN / FR / ES</p>
                  </div>
                  <div className="py-4 pt-8 text-center">
                    <p className="text-5xl font-bold text-accent mb-2">$399</p>
                    <p className="text-sm text-muted-foreground">Zoom</p>
                    <p className="text-xs text-muted-foreground/70 mt-1">In-Person: Custom Quote</p>
                  </div>
                </div>
                <Button asChild variant="default" size="lg" className="w-full mt-6">
                  <Link to="/contact">Schedule</Link>
                </Button>
              </Card>
            </div>
          </div>

          <p className="text-center text-muted-foreground mt-12 text-sm max-w-3xl mx-auto">
            We do not record classes to protect your privacy. No login required to attend. Certificate of completion provided.
          </p>
        </div>
      </section>
      {/* In-Person Training */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="p-8 bg-gradient-to-br from-primary/5 to-primary/10 border-border">
              <div className="flex items-start gap-6">
                <Home className="w-16 h-16 text-accent flex-shrink-0" />
                <div>
                  <h3 className="text-2xl font-bold mb-3">White-Glove In-Person Training</h3>
                  <p className="text-muted-foreground mb-6">
                    Our certified trainer comes to your home (Dayton metro or nationwide) for hands-on family security setup.
                  </p>
                  <ul className="space-y-2 mb-6">
                    {[
                      "4-hour session for entire family",
                      "Secure all devices (phones, computers, tablets)",
                      "Install security tools & password managers",
                      "Physical security kit included",
                      "60-day post-visit support",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-2xl font-bold mb-4">
                    Starting at <span className="text-accent">$899</span>
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">(InVision covers all trainer travel costs)</p>
                  <Button asChild variant="default">
                    <Link to="/contact">REQUEST IN-PERSON QUOTE</Link>
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-center mb-12">What's Included in Every Training</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {[
              { icon: FileText, title: "Scam-Proof Playbook", desc: "Downloadable PDF with all scripts, checklists, and emergency protocols" },
              { icon: Award, title: "Digital Certificate", desc: "Proof of completion you can print or share" },
              { icon: MessageSquare, title: "Live Q&A", desc: "Ask questions specific to YOUR situation" },
              { icon: Users, title: "Private Support Group", desc: "Join our Facebook community for ongoing tips" },
            ].map((item, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-medium transition-shadow">
                <div className="flex justify-center mb-4">
                  <item.icon className="w-12 h-12 text-accent" />
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-center mb-12">What Our Students Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <TestimonialCard
              name="Dorothy & Frank M."
              age="74 & 76"
              location="Springfield"
              quote="The instructor made everything so simple. We practiced spotting fake emails together and now feel confident. Best $299 we ever spent!"
              image={testimonial2}
            />
            <TestimonialCard
              name="Susan R."
              age="52"
              location="Kettering"
              quote="I brought my daughter to the Priority Private session. The trainer customized scenarios for our family—including my mom's romance scam experience. Invaluable."
              image={testimonial4}
            />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <CTASection headline="Ready to Learn?" variant="gold">
        <Button asChild variant="gold" size="xl">
          <Link to="/contact">BOOK TRAINING NOW</Link>
        </Button>
        <Button asChild variant="outline" size="xl">
          <Link to="/resources">DOWNLOAD FREE SECURITY CHECKLIST</Link>
        </Button>
      </CTASection>

      <Footer />
    </div>
  );
};

export default Training;
