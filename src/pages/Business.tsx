import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import TestimonialCard from "@/components/TestimonialCard";
import CTASection from "@/components/CTASection";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Phone, Mail, MessageSquare, Calendar, CheckCircle, Search, Shield } from "lucide-react";
import heroImage from "@/assets/hero-business.jpg";
import testimonial3 from "@/assets/testimonial-3.jpg";
import testimonial4 from "@/assets/testimonial-4.jpg";

const Business = () => {
  return (
    <div className="min-h-screen">
      <Navigation />

      <Hero
        backgroundImage={heroImage}
        headline="AI That Actually Works for Your Business"
        subheadline="Custom AI receptionists, follow-up systems, and automation—built secure, trained properly, and guaranteed to save you time. Starting at $5,000."
      >
        <Button asChild variant="default" size="xl">
          <Link to="/contact">SCHEDULE FREE DISCOVERY CALL</Link>
        </Button>
      </Hero>

      <TrustBar />

      {/* Use Cases */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-center mb-12">AI Solutions for Your Business</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-8 hover:shadow-medium transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-8 h-8 text-accent" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3">AI Receptionist</h3>
                  <p className="text-muted-foreground">
                    Answer calls 24/7, route to right person, book appointments, answer FAQs. Never miss a lead again.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-8 hover:shadow-medium transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="w-8 h-8 text-accent" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3">Follow-Up Automation</h3>
                  <p className="text-muted-foreground">
                    Nurture leads, send reminders, follow up after appointments. Turn cold leads into customers.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-8 hover:shadow-medium transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="w-8 h-8 text-accent" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3">Customer Support Bot</h3>
                  <p className="text-muted-foreground">
                    Handle common questions instantly on website, text, or WhatsApp. Free up your team for complex issues.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-8 hover:shadow-medium transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-8 h-8 text-accent" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3">Intake & Scheduling</h3>
                  <p className="text-muted-foreground">
                    Collect client info, qualify leads, book meetings automatically. Eliminate back-and-forth emails.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Package Pricing */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-center mb-12">Package Pricing</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="p-8">
              <h3 className="text-2xl font-bold mb-4">Receptionist / Intake Agent</h3>
              <p className="text-muted-foreground mb-6">Answer calls/chats, route inquiries, book appointments</p>
              <p className="text-4xl font-bold text-accent mb-6">$5,000</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span>Voice & chat agent</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span>Custom knowledge base</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span>CRM integration</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span>30-day optimization</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span>Security baseline audit</span>
                </li>
              </ul>
              <Button asChild variant="default" className="w-full">
                <Link to="/contact">GET STARTED</Link>
              </Button>
            </Card>

            <Card className="p-8">
...
              <Button asChild variant="default" className="w-full">
                <Link to="/contact">GET STARTED</Link>
              </Button>
            </Card>

            <Card className="p-8 border-2 border-accent">
...
              <Button asChild variant="default" className="w-full">
                <Link to="/contact">GET STARTED</Link>
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Why InVision */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-center mb-12">Why InVision for Your AI</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-success flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Security-First Design</h3>
                  <p className="text-muted-foreground">
                    We audit data flows, enforce least-privilege access, and vet vendors. Your customer data stays protected.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-success flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Actually Trained</h3>
                  <p className="text-muted-foreground">
                    We don't just "set it and forget it." We train your AI on YOUR business, test thoroughly, and optimize for 30 days.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-success flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold mb-2">No Vendor Lock-In</h3>
                  <p className="text-muted-foreground">
                    We build on open standards. If you want to take it in-house later, you can.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-success flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Plain-English Handoff</h3>
                  <p className="text-muted-foreground">
                    Your team gets documentation they can actually understand—no tech jargon required.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center">
              <img
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop"
                alt="Business professional reviewing AI dashboard"
                className="rounded-lg shadow-large"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Pre-Purchase Consulting */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="p-8 bg-gradient-to-br from-accent/10 to-accent/5">
              <div className="flex items-start gap-6">
                <Search className="w-16 h-16 text-accent flex-shrink-0" />
                <div>
                  <h3 className="text-3xl font-bold mb-4">Thinking of Buying an AI Tool?</h3>
                  <p className="text-xl mb-6">Don't waste $5,000+ on the wrong solution.</p>
                  <p className="text-muted-foreground mb-6">Our Pre-Purchase Vetting service:</p>
                  <ul className="space-y-2 mb-6">
                    {[
                      "Reviews the tool for security risks",
                      "Calculates realistic ROI",
                      "Identifies hidden costs & vendor risks",
                      "Recommends 'Buy / Don't Buy / Wait'",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-2xl font-bold mb-6">
                    $500 <span className="text-lg font-normal text-muted-foreground">for full vetting report</span>
                  </p>
                  <p className="text-sm text-muted-foreground mb-6">(Saves you thousands on bad purchases)</p>
                  <Button asChild variant="default">
                    <Link to="/contact">REQUEST VETTING</Link>
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* AI Security Audit */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="p-8 bg-gradient-to-br from-amber-100 to-amber-50 dark:from-amber-950 dark:to-amber-900">
              <div className="flex items-start gap-6">
                <Shield className="w-16 h-16 text-amber-600 flex-shrink-0" />
                <div>
                  <h3 className="text-3xl font-bold mb-4">Already Using AI?</h3>
                  <p className="text-xl mb-6">Is your current AI secure? We audit for:</p>
                  <ul className="space-y-2 mb-6">
                    {[
                      "Data leaks & unauthorized access",
                      "Prompt injection vulnerabilities",
                      "Vendor contract risks",
                      "Compliance gaps (GDPR, HIPAA, etc.)",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-amber-600">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-2xl font-bold mb-4">
                    Starting at <span className="text-accent">$2,500</span>
                  </p>
                  <p className="text-sm text-muted-foreground mb-6">Deliverable: Security report + implementation roadmap</p>
                  <Button asChild variant="default">
                    <Link to="/contact">REQUEST AUDIT</Link>
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-center mb-12">Business Testimonials</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <TestimonialCard
              name="Marcus Williams"
              location="Williams HVAC, Dayton"
              quote="InVision built our AI receptionist in 3 weeks. It handles 80% of our inbound calls now. ROI paid for itself in 4 months. Highly recommend."
              image={testimonial3}
            />
            <TestimonialCard
              name="Dr. Sarah Chen"
              location="Family Medicine, Cincinnati"
              quote="Their pre-purchase consulting saved us from buying a $12,000 'AI medical scribe' that would have violated HIPAA. They found a compliant alternative for $3,000."
              image={testimonial4}
            />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <CTASection headline="Ready to Deploy AI Safely?" variant="gold">
        <Button asChild variant="gold" size="xl">
          <Link to="/contact">SCHEDULE FREE DISCOVERY CALL</Link>
        </Button>
        <p className="text-accent-foreground text-sm mt-4">15-minute call to discuss your needs—no sales pressure.</p>
      </CTASection>

      <Footer />
    </div>
  );
};

export default Business;
