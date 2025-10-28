import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import TestimonialCard from "@/components/TestimonialCard";
import CTASection from "@/components/CTASection";
import FlowingWaves from "@/components/FlowingWaves";
import AIPartnersCarousel from "@/components/AIPartnersCarousel";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, FileText, Award, MessageSquare, Users, Home, Upload, UserCheck, Shield, Mail, Link as LinkIcon, QrCode, Mic, Image as ImageIcon, AlertTriangle } from "lucide-react";
import heroImage from "@/assets/hero-training.jpg";
import testimonial4 from "@/assets/testimonial-4.jpg";
import testimonial10 from "@/assets/testimonial-10.jpg";
import testimonial11 from "@/assets/testimonial-11.jpg";
import testimonial12 from "@/assets/testimonial-12.jpg";
import testimonial13 from "@/assets/testimonial-13.jpg";

const Training = () => {
  return (
    <div className="min-h-screen">
      <Navigation />

      <Hero
        useRouteBasedImages={true}
        headline="Master AI Scam Defense in One Session"
        subheadline="Live Zoom classes taught by cybersecurity experts. Walk away with scripts, strategies, and lifetime confidence. Available in English, Français, and Español."
        showScrollIndicator={true}
      >
        <Button asChild variant="default" size="xl">
          <Link to="/contact">BOOK TRAINING NOW</Link>
        </Button>
      </Hero>

      <TrustBar />

      {/* What You'll Master */}
      <section className="py-4 bg-background relative">
        <FlowingWaves variant="full" opacity={0.12} />
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-center mb-6">What You'll Learn</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center max-w-6xl mx-auto">
            <div className="space-y-4">
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
      <section className="py-4 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-center mb-8">Training Options</h2>
          
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              {/* Program Features Column */}
              <Card className="bg-card/50 border-border/50 rounded-xl p-3">
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

              {/* Standard Group Class */}
              <Card className="bg-card border-border/50 rounded-xl p-6 hover:shadow-medium transition-shadow">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2">Standard Group Class</h3>
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
                    <p className="text-5xl font-bold text-accent mb-2">$89</p>
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
                    <p className="text-5xl font-bold text-accent mb-2">$249</p>
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
            All programs include: Core anti-scam playbook (PDF), Emergency response scripts, Live Q&A session, Digital certificate, and email support. We do not record classes to protect your privacy.
          </p>
        </div>
      </section>

      {/* How Scam Shield Works */}
      <section className="py-10 bg-background relative">
        <FlowingWaves variant="full" opacity={0.12} />
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-center mb-12">How Scam Shield Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="p-8 text-center hover:shadow-medium transition-all hover:-translate-y-1 rounded-2xl border-border/50">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full flex items-center justify-center">
                  <Upload className="w-8 h-8 text-primary" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4">1. Forward Suspicious Item</h3>
              <p className="text-muted-foreground">
                Email, text screenshot, link, audio file, QR code, image—anything that feels "off."
              </p>
            </Card>

            <Card className="p-8 text-center hover:shadow-medium transition-all hover:-translate-y-1 rounded-2xl border-border/50">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full flex items-center justify-center">
                  <UserCheck className="w-8 h-8 text-primary" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4">2. Expert Analysis</h3>
              <p className="text-muted-foreground">
                Our AI security analysts review for red flags: fake domains, deepfake signatures, known scam patterns.
              </p>
            </Card>

            <Card className="p-8 text-center hover:shadow-medium transition-all hover:-translate-y-1 rounded-2xl border-border/50">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full flex items-center justify-center">
                  <Shield className="w-8 h-8 text-primary" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4">3. Get Clear Verdict</h3>
              <p className="text-muted-foreground">
                Receive written risk assessment: "SAFE" / "SUSPICIOUS - Avoid" / "CONFIRMED SCAM - Report." Plus recommended next steps.
              </p>
            </Card>
          </div>
        </div>
      </section>


      {/* Testimonials */}
      <section className="py-10 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-center mb-12">What Our Clients Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <TestimonialCard
              name="Margaret R."
              age="68"
              location="Columbus, OH"
              quote="After taking the training, I spotted a deepfake call from 'my grandson' asking for bail money. InVision saved me from losing $5,000."
              image={testimonial4}
            />
            <TestimonialCard
              name="Patricia L."
              age="71"
              location="Dayton, OH"
              quote="The ScamShield service caught a sophisticated phishing email that looked exactly like my bank. Worth every penny."
              image={testimonial10}
            />
            <TestimonialCard
              name="Elena G."
              age="69"
              location="Springfield, OH"
              quote="The instructor made everything so simple. We practiced spotting fake emails together and now feel confident. Best $249 we ever spent!"
              image={testimonial11}
            />
            <TestimonialCard
              name="James K."
              age="42"
              location="Cleveland, OH"
              quote="Our business uses three AI tools now. InVision's AI Insurance gives us peace of mind that we're protected."
              image={testimonial12}
            />
            <TestimonialCard
              name="Angela R."
              age="52"
              location="Kettering, OH"
              quote="I brought my daughter to the Priority Private session. The trainer customized scenarios for our family. Invaluable."
              image={testimonial13}
            />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <CTASection headline="Ready to Master AI Scam Defense?" variant="gold">
        <Button asChild variant="gold" size="xl">
          <Link to="/contact">BOOK YOUR TRAINING</Link>
        </Button>
        <Button asChild variant="outline" size="xl">
          <Link to="/resources">DOWNLOAD COURSE OUTLINE</Link>
        </Button>
      </CTASection>

      <AIPartnersCarousel />

      <Footer />
    </div>
  );
};

export default Training;
