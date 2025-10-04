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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
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
            <div className="bg-muted rounded-lg p-8">
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
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-center mb-16">Training Programs & Pricing</h2>
          <div className="overflow-x-auto">
            <div className="min-w-[900px]">
              <div className="grid grid-cols-4 gap-6">
                {/* Header Row */}
                <div className="bg-card p-8 rounded-t-2xl font-bold text-lg shadow-soft border border-border">Program Features</div>
                <div className="bg-card p-8 rounded-t-2xl text-center shadow-soft border border-border">
                  <h3 className="text-2xl font-bold mb-2 text-foreground">Single Small Group</h3>
                  <p className="text-base text-muted-foreground font-medium">15-25 participants</p>
                </div>
                <div className="bg-gradient-to-br from-accent/10 via-accent/5 to-accent/10 p-8 rounded-t-2xl text-center border-4 border-accent relative shadow-strong">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-accent to-accent/80 text-accent-foreground px-6 py-2 rounded-full text-sm font-bold shadow-medium">
                    MOST POPULAR
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-foreground">Family Small Group</h3>
                  <p className="text-base text-muted-foreground font-medium">8-12 participants</p>
                </div>
                <div className="bg-card p-8 rounded-t-2xl text-center shadow-soft border border-border">
                  <h3 className="text-2xl font-bold mb-2 text-foreground">Priority Private</h3>
                  <p className="text-base text-muted-foreground font-medium">1-3 people</p>
                </div>

                {/* Format */}
                <div className="bg-card p-6 font-bold text-base border-x border-border shadow-soft">Format</div>
                <div className="bg-card p-6 text-center text-base border-x border-border shadow-soft">Zoom, 60-90 min</div>
                <div className="bg-gradient-to-br from-accent/5 to-accent/10 p-6 text-center text-base border-x-4 border-accent shadow-strong font-medium">Zoom, limited seats</div>
                <div className="bg-card p-6 text-center text-base border-x border-border shadow-soft">Zoom or In-Person</div>

                {/* Ideal For */}
                <div className="bg-card p-6 font-bold text-base border-x border-border shadow-soft">Ideal For</div>
                <div className="bg-card p-6 text-center border-x border-border shadow-soft">Individual learner</div>
                <div className="bg-gradient-to-br from-accent/5 to-accent/10 p-6 text-center border-x-4 border-accent shadow-strong font-medium">Couples & families</div>
                <div className="bg-card p-6 text-center border-x border-border shadow-soft">High-risk / urgent needs</div>

                {/* Group Size */}
                <div className="bg-card p-6 font-bold text-base border-x border-border shadow-soft">Group Size</div>
                <div className="bg-card p-6 text-center border-x border-border shadow-soft">15-25 participants</div>
                <div className="bg-gradient-to-br from-accent/5 to-accent/10 p-6 text-center border-x-4 border-accent shadow-strong font-medium">8-12 participants</div>
                <div className="bg-card p-6 text-center border-x border-border shadow-soft">Private (1-3 people)</div>

                {/* Languages */}
                <div className="bg-card p-6 font-bold text-base border-x border-border shadow-soft">Languages</div>
                <div className="bg-card p-6 text-center border-x border-border shadow-soft">EN / FR / ES</div>
                <div className="bg-gradient-to-br from-accent/5 to-accent/10 p-6 text-center border-x-4 border-accent shadow-strong font-medium">EN / FR / ES</div>
                <div className="bg-card p-6 text-center border-x border-border shadow-soft">EN / FR / ES</div>

                {/* Price */}
                <div className="bg-card p-6 font-bold text-base rounded-b-2xl border border-border shadow-soft">Price</div>
                <div className="bg-card p-6 text-center rounded-b-2xl border border-border shadow-soft">
                  <p className="text-4xl font-extrabold gradient-text-teal mb-2">$149</p>
                  <p className="text-sm text-muted-foreground font-medium">per person</p>
                </div>
                <div className="bg-gradient-to-br from-accent/10 via-accent/5 to-accent/10 p-6 text-center rounded-b-2xl border-x-4 border-b-4 border-accent shadow-strong">
                  <p className="text-5xl font-extrabold gradient-text-teal mb-2">$299</p>
                  <p className="text-sm text-muted-foreground font-semibold">per session</p>
                  <p className="text-sm font-bold text-success mt-2 bg-success/10 px-3 py-1 rounded-full inline-block">Spouse FREE</p>
                </div>
                <div className="bg-card p-6 text-center rounded-b-2xl border border-border shadow-soft">
                  <p className="text-4xl font-extrabold gradient-text-teal mb-2">$399</p>
                  <p className="text-sm text-muted-foreground font-medium">Zoom</p>
                  <p className="text-xs text-muted-foreground mt-1">In-Person: Custom Quote</p>
                </div>

                {/* CTA Buttons */}
                <div></div>
                <div className="p-4">
                  <Button asChild variant="default" size="lg" className="w-full font-bold">
                    <Link to="/contact">BOOK NOW</Link>
                  </Button>
                </div>
                <div className="p-4">
                  <Button asChild variant="default" size="lg" className="w-full font-bold shadow-medium hover:shadow-strong">
                    <Link to="/contact">BOOK NOW</Link>
                  </Button>
                </div>
                <div className="p-4">
                  <Button asChild variant="default" size="lg" className="w-full font-bold">
                    <Link to="/contact">SCHEDULE PRIVATE</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <p className="text-center text-muted-foreground mt-8 italic text-base">
            We do NOT record classes to protect your privacy. No login required to attend. Certificate of completion provided.
          </p>
        </div>
      </section>

      {/* In-Person Training */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="p-8 bg-gradient-to-br from-primary/5 to-primary/10">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
