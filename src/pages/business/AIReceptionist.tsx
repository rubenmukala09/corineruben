import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Phone, 
  Clock, 
  Calendar, 
  MessageSquare, 
  Shield, 
  Zap,
  CheckCircle2,
  ArrowRight,
  Users,
  TrendingUp,
  Bot
} from "lucide-react";

const AIReceptionist = () => {
  const features = [
    {
      icon: Phone,
      title: "24/7 Call Answering",
      description: "Our AI answers calls 24/7, sounds human, and filters out spam so you only talk to real clients."
    },
    {
      icon: Calendar,
      title: "Smart Scheduling",
      description: "The AI books appointments directly into your calendar while you sleep. No more back-and-forth emails."
    },
    {
      icon: MessageSquare,
      title: "Natural Conversations",
      description: "Advanced AI that understands context, handles complex inquiries, and sounds genuinely human."
    },
    {
      icon: Shield,
      title: "HIPAA Compliant",
      description: "Enterprise-grade security for healthcare, legal, and financial services requiring strict compliance."
    },
    {
      icon: Zap,
      title: "Instant Lead Capture",
      description: "Capture caller information, qualify leads, and route urgent matters to the right team member."
    },
    {
      icon: Users,
      title: "Multi-Language Support",
      description: "Serve diverse communities with AI that speaks English, Spanish, and other languages fluently."
    }
  ];

  const benefits = [
    "Save $3,000-5,000/month on receptionist costs",
    "Capture 40% more leads from after-hours calls",
    "The AI books appointments directly into your calendar while you sleep",
    "Scale without adding headcount",
    "Professional image 24/7/365"
  ];

  const useCases = [
    { industry: "Medical Offices", example: "Patient intake, appointment scheduling, prescription refill requests" },
    { industry: "Law Firms", example: "Client intake, case status updates, appointment booking" },
    { industry: "Real Estate", example: "Property inquiries, showing scheduling, lead qualification" },
    { industry: "Home Services", example: "Service requests, emergency dispatch, quote scheduling" },
    { industry: "Restaurants", example: "Reservation management, order inquiries, hours/location info" }
  ];

  return (
    <PageTransition variant="fade">
      <div className="min-h-screen bg-background">
        <SEO 
          title="AI Receptionist & Virtual Intake Agent"
          description="24/7 AI-powered phone answering and appointment scheduling. Never miss a call again. Save $3,000-5,000/month on receptionist costs. HIPAA compliant."
          keywords="AI receptionist, virtual receptionist, automated phone answering, appointment scheduling AI, business phone automation, Dayton Ohio"
          structuredData={{
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "AI Receptionist & Intake Agent",
            "description": "24/7 AI-powered phone answering and appointment scheduling service",
            "provider": {
              "@type": "Organization",
              "name": "InVision Network"
            },
            "areaServed": "United States",
            "offers": {
              "@type": "Offer",
              "price": "9500",
              "priceCurrency": "USD"
            }
          }}
        />
        <Navigation />
        
        <main id="main-content">
          {/* Hero Section */}
          <section className="relative py-20 lg:py-32 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
            <div className="container mx-auto px-4 relative">
              <div className="max-w-4xl mx-auto text-center">
                <Badge variant="outline" className="mb-6 px-4 py-2 text-sm border-primary/30 bg-primary/5">
                  <Bot className="w-4 h-4 mr-2" />
                  AI Business Automation
                </Badge>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                  <span className="gradient-text-primary">Stop Missing Calls.</span>
                  <br />Let AI Run Your Front Desk.
                </h1>
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Our AI answers calls 24/7, sounds human, and filters out spam so you only talk to real clients.
                  The AI books appointments directly into your calendar while you sleep.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="xl" variant="gold">
                    <Link to="/contact">
                      Schedule Demo
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button asChild size="xl" variant="outline">
                    <Link to="/business">View All Services</Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Stats Section */}
          <section className="py-12 bg-card border-y border-border">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">24/7</div>
                  <div className="text-muted-foreground">Availability</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">40%</div>
                  <div className="text-muted-foreground">More Leads Captured</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">$5K</div>
                  <div className="text-muted-foreground">Monthly Savings</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">99.9%</div>
                  <div className="text-muted-foreground">Uptime</div>
                </div>
              </div>
            </div>
          </section>

          {/* Features Grid */}
          <section className="py-20">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Everything You Need in a Virtual Receptionist
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Powerful AI capabilities that handle your calls professionally while you focus on your business.
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.map((feature, index) => (
                  <Card key={index} className="border-border/50 bg-card/50 hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                        <feature.icon className="w-6 h-6 text-primary" />
                      </div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Benefits Section */}
          <section className="py-20 bg-card">
            <div className="container mx-auto px-4">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">
                    Why Businesses Choose Our AI Receptionist
                  </h2>
                  <p className="text-muted-foreground mb-8">
                    Stop losing calls to voicemail. Our AI receptionist ensures every caller gets 
                    immediate, professional attention—transforming missed opportunities into booked appointments.
                  </p>
                  <ul className="space-y-4">
                    {benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-success flex-shrink-0 mt-0.5" />
                        <span className="text-foreground">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="relative">
                  <Card className="p-8 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
                    <div className="text-center">
                      <TrendingUp className="w-16 h-16 text-primary mx-auto mb-4" />
                      <h3 className="text-2xl font-bold mb-2">ROI Calculator</h3>
                      <p className="text-muted-foreground mb-6">
                        See how much you could save with AI
                      </p>
                      <div className="space-y-4 text-left">
                        <div className="flex justify-between py-3 border-b border-border">
                          <span>Current receptionist cost</span>
                          <span className="font-semibold">$4,000/mo</span>
                        </div>
                        <div className="flex justify-between py-3 border-b border-border">
                          <span>AI Receptionist cost</span>
                          <span className="font-semibold text-success">$792/mo*</span>
                        </div>
                        <div className="flex justify-between py-3 text-xl">
                          <span className="font-bold">Monthly Savings</span>
                          <span className="font-bold text-success">$3,208</span>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-4">
                        *Based on one-time setup of $9,500 amortized over 12 months
                      </p>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </section>

          {/* Use Cases */}
          <section className="py-20">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Perfect For Every Industry
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Our AI receptionist adapts to your industry's specific needs and terminology.
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {useCases.map((useCase, index) => (
                  <Card key={index} className="border-border/50">
                    <CardHeader>
                      <CardTitle className="text-lg">{useCase.industry}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{useCase.example}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-accent/10">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Never Miss a Call Again?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Schedule a free demo to see how our AI receptionist can transform your business communications.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="xl" variant="gold">
                  <Link to="/contact">
                    Get Started Today
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild size="xl" variant="outline">
                  <a href="tel:9373018749">
                    <Phone className="mr-2 h-5 w-5" />
                    Call (937) 301-8749
                  </a>
                </Button>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default AIReceptionist;
