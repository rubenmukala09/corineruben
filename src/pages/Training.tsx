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
        backgroundImage={heroImage}
        headline="Learn to Outsmart AI Scammers—No Tech Skills Required"
        subheadline="Master deepfake detection, phishing defense, and emergency protocols in plain English. Walk away with ready-to-use scripts and lifetime confidence."
        showScrollIndicator={true}
      >
        <Button asChild variant="default" size="xl">
          <Link to="/contact">BOOK TRAINING NOW</Link>
        </Button>
      </Hero>

      <TrustBar />

      {/* What You'll Master */}
      <section className="py-10 bg-background relative">
        <FlowingWaves variant="full" opacity={0.12} />
        <div className="container mx-auto px-4 relative z-10">
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
      <section className="py-10 bg-muted/30">
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

      {/* Scam Shield Membership Plans */}
      <section className="py-10 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-center mb-12">Scam Shield Membership Plans</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="p-8 rounded-2xl shadow-soft hover:shadow-medium transition-all hover:-translate-y-1 border-border/50">
              <h3 className="text-2xl font-bold mb-4">Standard Plan</h3>
              <p className="text-4xl font-bold gradient-text-primary mb-6">
                $49<span className="text-lg text-muted-foreground">/month</span>
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span>Up to 10 submissions per month</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span>≤ 48 hour response time</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span>Emails, texts, links, screenshots, QR codes</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span>Standard risk assessment</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span>Email support only</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span>Monthly security tips</span>
                </li>
              </ul>
              <Button asChild variant="default" className="w-full">
                <Link to="/contact">START STANDARD</Link>
              </Button>
            </Card>

            <Card className="p-8 border-2 border-accent relative rounded-2xl shadow-[0_8px_30px_rgba(20,184,166,0.15)] hover:shadow-[0_12px_40px_rgba(20,184,166,0.2)] transition-all">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-accent to-[hsl(180,70%,55%)] text-accent-foreground px-4 py-1 rounded-full text-sm font-bold shadow-[0_4px_12px_rgba(20,184,166,0.3)]">
                MOST POPULAR
              </div>
              <h3 className="text-2xl font-bold mb-4">Premium Plan</h3>
              <p className="text-4xl font-bold gradient-text-primary mb-6">
                $99<span className="text-lg text-muted-foreground">/month</span>
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span>Up to 30 submissions per month</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span>≤ 24 hour response time</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span>Everything + audio/voice notes, videos</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span>Detailed analysis + source tracking</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span>Email + Phone support</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span>Monthly tips + Quarterly threat briefing call</span>
                </li>
              </ul>
              <Button asChild variant="default" className="w-full">
                <Link to="/contact">START PREMIUM</Link>
              </Button>
            </Card>
          </div>
          <p className="text-center mt-8 text-muted-foreground">
            Need more than 30 submissions? Upgrade to <span className="font-bold">Unlimited Plan</span> for $149/month (12-hour response time).
          </p>
        </div>
      </section>

      {/* What We Analyze */}
      <section className="py-10 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-center mb-12">What We Analyze</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Mail, title: "Phishing Emails", desc: "Fake bank alerts, IRS notices, package delivery scams" },
              { icon: LinkIcon, title: "Suspicious Links", desc: "Shortened URLs, typo domains, fake login pages" },
              { icon: QrCode, title: "QR Codes", desc: "Restaurant menus, parking meters, event tickets—verify before scanning" },
              { icon: Mic, title: "Audio/Voice Messages", desc: "Deepfake voice clones, 'grandparent scams,' urgent family calls" },
              { icon: ImageIcon, title: "Images & Screenshots", desc: "AI-generated faces, fake documents, manipulated photos" },
              { icon: MessageSquare, title: "Text Messages", desc: "'Package delivery,' 'account locked,' 'prize winner' texts" },
            ].map((item, index) => (
              <Card key={index} className="p-6 hover:shadow-medium transition-all hover:-translate-y-1 rounded-2xl border-border/50">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-sm">{item.desc}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Important Boundaries */}
      <section className="py-10 bg-amber-50 dark:bg-amber-950">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start gap-4 mb-6">
              <AlertTriangle className="w-12 h-12 text-amber-600 flex-shrink-0" />
              <div>
                <h2 className="text-3xl mb-4">What Scam Shield IS and ISN'T</h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <CheckCircle className="w-6 h-6 text-success" />
                  WE PROVIDE:
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-success">✓</span>
                    <span>Risk assessment & scam detection</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-success">✓</span>
                    <span>Recommendations for next steps</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-success">✓</span>
                    <span>Educational analysis</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-6 h-6 text-destructive" />
                  WE DO NOT:
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-destructive">✗</span>
                    <span>Take control of your devices</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-destructive">✗</span>
                    <span>Access your accounts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-destructive">✗</span>
                    <span>Provide legal or financial advice</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-destructive">✗</span>
                    <span>Operate your bank or credit cards</span>
                  </li>
                </ul>
              </div>
            </div>

            <Card className="p-6 bg-destructive/10 border-destructive/30">
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                <AlertTriangle className="w-6 h-6 text-destructive" />
                IN EMERGENCIES:
              </h3>
              <p className="mb-4">If you've already sent money, shared passwords, or clicked a suspicious link:</p>
              <ol className="list-decimal list-inside space-y-2 ml-4">
                <li>Call your bank immediately (use official number on card)</li>
                <li>Change passwords on a DIFFERENT device</li>
                <li>Report to local police & FTC (IdentityTheft.gov)</li>
                <li>THEN forward to us for analysis</li>
              </ol>
            </Card>
          </div>
        </div>
      </section>

      {/* In-Person Training */}
      <section className="py-10 bg-background">
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
      <section className="py-10 bg-muted">
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
      <section className="py-10 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-center mb-12">What Our Clients Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <TestimonialCard
              name="George T."
              age="71"
              location="Beavercreek"
              quote="I get a suspicious email almost weekly. Scam Shield gives me peace of mind. I forward it, they tell me it's a scam, I delete it. Worth every penny of $49/month."
              image={testimonial4}
            />
            <TestimonialCard
              name="Patricia M."
              age="63"
              location="Dayton"
              quote="My elderly father was targeted with a fake 'Medicare card update' email. We submitted it to Scam Shield within minutes and got confirmation it was a scam in 18 hours. Saved him from identity theft."
              image={testimonial10}
            />
            <TestimonialCard
              name="Elena G."
              age="69"
              location="Springfield"
              quote="The instructor made everything so simple. We practiced spotting fake emails together and now feel confident. Best $299 we ever spent!"
              image={testimonial11}
            />
            <TestimonialCard
              name="Omar & Hassan A."
              age="58 & 55"
              location="Centerville"
              quote="Premium Plan is our family's insurance policy. Between our parents, in-laws, and us, we submit 20+ items a month. The 24-hour turnaround is perfect."
              image={testimonial12}
            />
            <TestimonialCard
              name="Angela R."
              age="52"
              location="Kettering"
              quote="I brought my daughter to the Priority Private session. The trainer customized scenarios for our family—including my mother's romance scam experience. Invaluable."
              image={testimonial13}
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

      <AIPartnersCarousel />

      <Footer />
    </div>
  );
};

export default Training;
