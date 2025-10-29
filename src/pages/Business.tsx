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
import { Phone, Mail, MessageSquare, Calendar, CheckCircle, Search, Shield } from "lucide-react";
import testimonial3 from "@/assets/testimonial-3.jpg";
import testimonial4 from "@/assets/testimonial-4.jpg";

const Business = () => {
  return (
    <div className="min-h-screen">
      <Navigation />

      <Hero
        headline="Grow Your Business with Secure AI Solutions"
        subheadline="Custom AI automation, professional websites, and industry-leading AI Service Insurance"
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild variant="default" size="xl">
            <Link to="/contact">Build AI Automation</Link>
          </Button>
          <Button asChild variant="outlineLight" size="xl">
            <Link to="/contact">Design My Website</Link>
          </Button>
          <Button asChild variant="outlineLight" size="xl">
            <Link to="/contact">Get AI Insurance</Link>
          </Button>
        </div>
      </Hero>

      <TrustBar />

      {/* Use Cases */}
      <section className="py-20 bg-background relative">
        <FlowingWaves variant="full" opacity={0.12} />
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-center mb-12">What We Build</h2>
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
          <h2 className="text-center mb-12">AI Agents & Automation Pricing</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="p-8">
              <h3 className="text-2xl font-bold mb-4">AI Receptionist & Intake Agent</h3>
              <p className="text-muted-foreground mb-6">Answer calls/chats 24/7, book appointments</p>
              <p className="text-4xl font-bold text-accent mb-6">$9,500</p>
              <p className="text-sm text-muted-foreground mb-4">Perfect for: Medical practices, law firms, salons</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span>Answers calls 24/7 in natural language</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span>Books appointments automatically</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span>Qualifies leads using your criteria</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span>CRM integration</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span>30-day optimization period</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span>Security audit & 90-day support</span>
                </li>
              </ul>
              <Button asChild variant="default" className="w-full">
                <Link to="/contact">GET STARTED</Link>
              </Button>
            </Card>

            <Card className="p-8">
              <h3 className="text-2xl font-bold mb-4">Follow-Up Automation System</h3>
              <p className="text-muted-foreground mb-6">Automated email/SMS campaigns, lead nurturing</p>
              <p className="text-4xl font-bold text-accent mb-6">$12,500</p>
              <p className="text-sm text-muted-foreground mb-4">Perfect for: E-commerce, real estate, coaching, B2B</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span>Automated email sequences</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span>SMS reminder campaigns</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span>Lead nurturing workflows</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span>Performance analytics dashboard</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span>CRM synchronization</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span>60-day optimization</span>
                </li>
              </ul>
              <Button asChild variant="default" className="w-full">
                <Link to="/contact">GET STARTED</Link>
              </Button>
            </Card>

            <Card className="p-8 border-2 border-accent">
              <h3 className="text-2xl font-bold mb-4">Custom Automation Suite</h3>
              <p className="text-muted-foreground mb-6">Multi-system operations</p>
              <p className="text-4xl font-bold text-accent mb-6">$25,000+</p>
              <p className="text-sm text-muted-foreground mb-4">Perfect for: Growing businesses, enterprises</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span>Full discovery & design</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span>Build, train, deploy</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span>Security audit</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span>Team training</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span>90-day support</span>
                </li>
              </ul>
              <Button asChild variant="default" className="w-full">
                <Link to="/contact">GET STARTED</Link>
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Web Design Services */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-block px-6 py-2 bg-primary/10 rounded-full text-sm font-bold text-primary mb-4 uppercase tracking-wider">
              Web Design
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Professional Website Design</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Custom websites that convert visitors into customers—built for security, speed, and success
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {/* Landing Page */}
            <Card className="p-8 rounded-2xl hover:shadow-medium transition-all hover:-translate-y-1">
              <h3 className="text-2xl font-bold mb-4">Landing Page</h3>
              <p className="text-muted-foreground mb-6">Single-page website for campaigns or simple business presence</p>
              <p className="text-4xl font-bold text-accent mb-6">$1,500</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span>1-page custom design</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span>Mobile responsive</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span>Contact form</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span>SSL certificate</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span>Basic SEO setup</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span>1 month free hosting</span>
                </li>
              </ul>
              <Button asChild variant="default" className="w-full">
                <Link to="/contact">GET STARTED</Link>
              </Button>
            </Card>

            {/* Business Website - Featured */}
            <Card className="p-8 border-2 border-primary relative rounded-2xl shadow-[0_8px_30px_rgba(139,92,246,0.15)] hover:shadow-[0_12px_40px_rgba(139,92,246,0.2)] transition-all">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-accent text-primary-foreground px-4 py-1 rounded-full text-sm font-bold shadow-[0_4px_12px_rgba(139,92,246,0.3)]">
                MOST POPULAR
              </div>
              <h3 className="text-2xl font-bold mb-4">Business Website</h3>
              <p className="text-muted-foreground mb-6">5-10 page professional website with custom features</p>
              <p className="text-4xl font-bold text-accent mb-6">$4,500</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span>5-10 custom pages</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span>Full mobile responsive</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span>Contact & booking forms</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span>Advanced SEO optimization</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span>SSL & security setup</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span>3 months free hosting</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span>Google Analytics integration</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span>2 rounds of revisions</span>
                </li>
              </ul>
              <Button asChild variant="default" className="w-full">
                <Link to="/contact">GET STARTED</Link>
              </Button>
            </Card>

            {/* E-Commerce Website */}
            <Card className="p-8 rounded-2xl hover:shadow-medium transition-all hover:-translate-y-1">
              <h3 className="text-2xl font-bold mb-4">E-Commerce Website</h3>
              <p className="text-muted-foreground mb-6">Full online store with payment processing</p>
              <p className="text-4xl font-bold text-accent mb-6">$8,500+</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span>Custom e-commerce design</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span>Product catalog (up to 50 items)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span>Secure payment gateway</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span>Inventory management</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span>SSL & PCI compliance</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span>Shopping cart & checkout</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span>Email automation setup</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span>6 months free hosting</span>
                </li>
              </ul>
              <Button asChild variant="default" className="w-full">
                <Link to="/contact">GET STARTED</Link>
              </Button>
            </Card>
          </div>

          {/* Website Add-Ons */}
          <Card className="max-w-5xl mx-auto p-10 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20 rounded-2xl">
            <h3 className="text-2xl font-bold text-center mb-8">Website Add-Ons & Services</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <div className="font-bold text-primary mb-2">Logo Design</div>
                <div className="text-sm text-muted-foreground">Starting at $500</div>
              </div>
              <div>
                <div className="font-bold text-primary mb-2">Content Writing</div>
                <div className="text-sm text-muted-foreground">$150/page</div>
              </div>
              <div>
                <div className="font-bold text-primary mb-2">Business Email Setup</div>
                <div className="text-sm text-muted-foreground">$200 one-time</div>
              </div>
              <div>
                <div className="font-bold text-primary mb-2">Monthly Maintenance</div>
                <div className="text-sm text-muted-foreground">$99-299/month</div>
              </div>
              <div>
                <div className="font-bold text-primary mb-2">AI Chatbot Integration</div>
                <div className="text-sm text-muted-foreground">$1,200</div>
              </div>
              <div>
                <div className="font-bold text-primary mb-2">Domain & Hosting Setup</div>
                <div className="text-sm text-muted-foreground">Included free</div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* AI Services Insurance */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-block px-6 py-2 bg-primary/10 rounded-full text-sm font-bold text-primary mb-4 uppercase tracking-wider">
              Protection & Maintenance
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">AI Services Insurance</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Protect your AI investment with ongoing maintenance, updates, and support—regardless of where you purchased your agent.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Basic Care */}
            <Card className="p-8 rounded-2xl border-border/50 hover:shadow-medium transition-all hover:-translate-y-1">
              <h3 className="text-2xl font-bold mb-4">Basic Care</h3>
              <p className="text-4xl font-bold gradient-text-primary mb-2">
                $149<span className="text-lg text-muted-foreground">/month</span>
              </p>
              <ul className="space-y-3 mb-8 mt-6">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span>Monthly health checks</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span>Security patch updates</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span>Performance monitoring</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span>Email support (48hr response)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span>Basic bug fixes</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span>Quarterly reports</span>
                </li>
              </ul>
              <Button asChild variant="default" className="w-full">
                <Link to="/contact">GET BASIC CARE</Link>
              </Button>
            </Card>

            {/* Standard Care - Featured */}
            <Card className="p-8 border-2 border-primary relative rounded-2xl shadow-[0_8px_30px_rgba(139,92,246,0.15)] hover:shadow-[0_12px_40px_rgba(139,92,246,0.2)] transition-all">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-accent text-primary-foreground px-4 py-1 rounded-full text-sm font-bold shadow-[0_4px_12px_rgba(139,92,246,0.3)]">
                MOST POPULAR
              </div>
              <h3 className="text-2xl font-bold mb-4">Standard Care</h3>
              <p className="text-4xl font-bold gradient-text-primary mb-2">
                $399<span className="text-lg text-muted-foreground">/month</span>
              </p>
              <ul className="space-y-3 mb-8 mt-6">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span>Everything in Basic Care</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span>Weekly health checks</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span>Priority bug fixes (24hr response)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span>Knowledge base updates</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span>Minor feature adjustments</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span>Phone + email support</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span>Up to 4 hours repair/month</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span>Integration compatibility checks</span>
                </li>
              </ul>
              <Button asChild variant="default" className="w-full">
                <Link to="/contact">GET STANDARD CARE</Link>
              </Button>
            </Card>

            {/* Premium Care */}
            <Card className="p-8 rounded-2xl border-border/50 hover:shadow-medium transition-all hover:-translate-y-1">
              <h3 className="text-2xl font-bold mb-4">Premium Care</h3>
              <p className="text-4xl font-bold gradient-text-primary mb-2">
                $799<span className="text-lg text-muted-foreground">/month</span>
              </p>
              <ul className="space-y-3 mb-8 mt-6">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span>Everything in Standard Care</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span>24/7 monitoring & alerts</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span>Critical issue response (4hr SLA)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span>Custom modifications included</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span>Up to 12 hours repair/month</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span>Dedicated support engineer</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span>Quarterly optimization reviews</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span>Compliance & security audits</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span>Vendor liaison services</span>
                </li>
              </ul>
              <Button asChild variant="default" className="w-full">
                <Link to="/contact">GET PREMIUM CARE</Link>
              </Button>
            </Card>
          </div>

          {/* Additional Info Box */}
          <Card className="max-w-5xl mx-auto p-10 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20 rounded-2xl">
            <h3 className="text-2xl font-bold text-center mb-4">
              We Support AI Agents From Any Vendor
            </h3>
            <p className="text-center text-muted-foreground mb-8 text-lg">
              Whether you purchased your AI agent from another company or built it yourself, our insurance plans keep it running smoothly. We provide vendor-agnostic maintenance, troubleshooting, and optimization.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              <div className="text-center">
                <div className="text-2xl font-bold gradient-text-primary mb-2">No Contracts</div>
                <div className="text-sm text-muted-foreground">Cancel anytime</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold gradient-text-primary mb-2">Any Platform</div>
                <div className="text-sm text-muted-foreground">We support all major AI systems</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold gradient-text-primary mb-2">Fast Response</div>
                <div className="text-sm text-muted-foreground">24-48hr standard turnaround</div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Why InVision */}
      <section className="py-20 bg-muted">
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
                    $1,799 <span className="text-lg font-normal text-muted-foreground">for full vetting report</span>
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
                    Starting at <span className="text-accent">$3,499</span>
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
