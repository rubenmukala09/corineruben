import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import TestimonialCard from "@/components/TestimonialCard";
import CTASection from "@/components/CTASection";
import FlowingWaves from "@/components/FlowingWaves";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, UserCheck, Shield, Mail, Link as LinkIcon, QrCode, Mic, Image as ImageIcon, MessageSquare, CheckCircle, AlertTriangle } from "lucide-react";
import heroImage from "@/assets/hero-scamshield-new.jpg";
import testimonial4 from "@/assets/testimonial-4.jpg";
import testimonial1 from "@/assets/testimonial-1.jpg";
import testimonial2 from "@/assets/testimonial-2.jpg";

const ScamShield = () => {
  return (
    <div className="min-h-screen">
      <Navigation />

      <Hero
        backgroundImage={heroImage}
        headline="Not Sure If It's a Scam? Ask the Experts."
        subheadline="Forward suspicious emails, texts, links, voice messages, and QR codes. Get a professional risk assessment before you act."
        showScrollIndicator={true}
      >
        <Button asChild variant="default" size="xl">
          <Link to="/contact">START SCAM SHIELD</Link>
        </Button>
      </Hero>

      <TrustBar />

      {/* How Scam Shield Works */}
      <section className="py-20 bg-background relative">
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

      {/* Membership Plans */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-center mb-12">Membership Plans</h2>
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
      <section className="py-20 bg-background">
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
      <section className="py-20 bg-amber-50 dark:bg-amber-950">
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

      {/* Testimonials */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-center mb-12">Member Testimonials</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard
              name="George T."
              age="71"
              location="Beavercreek"
              quote="I get a suspicious email almost weekly. Scam Shield gives me peace of mind. I forward it, they tell me it's a scam, I delete it. Worth every penny of $49/month."
              image={testimonial4}
            />
            <TestimonialCard
              name="Rachel K."
              age="48"
              location="Dayton"
              quote="My mom was targeted with a fake 'Medicare card update' email. We submitted it to Scam Shield within minutes and got confirmation it was a scam in 18 hours. Saved her from identity theft."
              image={testimonial1}
            />
            <TestimonialCard
              name="Tom & Jennifer S."
              age="55 & 53"
              location="Centerville"
              quote="Premium Plan is our family's insurance policy. Between my parents, in-laws, and us, we submit 20+ items a month. The 24-hour turnaround is perfect."
              image={testimonial2}
            />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <CTASection headline="Get Protection Starting Today" variant="gold">
        <Button asChild variant="gold" size="xl">
          <Link to="/contact">START SCAM SHIELD - $49/MONTH</Link>
        </Button>
        <p className="text-accent-foreground text-sm mt-4">
          🔒 Cancel anytime • 7-day money-back guarantee • No setup fees
        </p>
      </CTASection>

      <Footer />
    </div>
  );
};

export default ScamShield;
