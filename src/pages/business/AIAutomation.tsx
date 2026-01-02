import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Mail, 
  MessageSquare, 
  Bell, 
  RefreshCw, 
  Target,
  Zap,
  CheckCircle2,
  ArrowRight,
  BarChart3,
  Clock,
  Users,
  Bot
} from "lucide-react";

const AIAutomation = () => {
  const features = [
    {
      icon: Mail,
      title: "Email Follow-Up Sequences",
      description: "Automated, personalized email sequences that nurture leads and re-engage dormant customers."
    },
    {
      icon: MessageSquare,
      title: "SMS Reminders & Updates",
      description: "Timely text messages for appointments, deliveries, and important updates that reduce no-shows."
    },
    {
      icon: Bell,
      title: "Smart Notifications",
      description: "Alert the right team members when leads take action or when intervention is needed."
    },
    {
      icon: RefreshCw,
      title: "Re-engagement Campaigns",
      description: "Automatically reach out to customers who haven't purchased in 30, 60, or 90 days."
    },
    {
      icon: Target,
      title: "Lead Scoring",
      description: "AI-powered lead scoring that prioritizes your hottest prospects for immediate follow-up."
    },
    {
      icon: BarChart3,
      title: "Performance Analytics",
      description: "Detailed dashboards showing open rates, click rates, conversions, and ROI metrics."
    }
  ];

  const automationTypes = [
    {
      title: "Appointment Reminders",
      description: "Reduce no-shows by 60% with automated reminder sequences via email and SMS.",
      metric: "60% fewer no-shows"
    },
    {
      title: "Quote Follow-Ups",
      description: "Never let a quote go cold. Automatic follow-ups at 24 hours, 3 days, and 7 days.",
      metric: "35% higher close rate"
    },
    {
      title: "Review Requests",
      description: "Automatically request reviews from happy customers at the perfect moment.",
      metric: "4x more reviews"
    },
    {
      title: "Birthday & Anniversary",
      description: "Delight customers with personalized messages on their special days.",
      metric: "25% repeat purchases"
    }
  ];

  const process = [
    {
      step: "1",
      title: "Discovery Call",
      description: "We analyze your current customer journey and identify automation opportunities."
    },
    {
      step: "2",
      title: "Custom Design",
      description: "Our team designs automation workflows tailored to your business processes."
    },
    {
      step: "3",
      title: "Implementation",
      description: "We build and test your automation system with your existing tools."
    },
    {
      step: "4",
      title: "Launch & Optimize",
      description: "Go live with continuous monitoring and optimization for best results."
    }
  ];

  return (
    <PageTransition variant="fade">
      <div className="min-h-screen bg-background">
        <SEO 
          title="AI Follow-Up Automation System"
          description="Never lose a lead again with AI-powered follow-up automation. Automated email sequences, SMS reminders, and smart re-engagement campaigns. 35% higher close rates."
          keywords="follow-up automation, email automation, SMS reminders, lead nurturing, CRM automation, business automation Dayton Ohio"
          structuredData={{
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "AI Follow-Up Automation System",
            "description": "Automated email and SMS follow-up sequences for business lead nurturing",
            "provider": {
              "@type": "Organization",
              "name": "InVision Network"
            },
            "areaServed": "United States",
            "offers": {
              "@type": "Offer",
              "price": "12500",
              "priceCurrency": "USD"
            }
          }}
        />
        <Navigation />
        
        <main id="main-content">
          {/* Hero Section */}
          <section className="relative py-20 lg:py-32 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-background to-primary/10" />
            <div className="container mx-auto px-4 relative">
              <div className="max-w-4xl mx-auto text-center">
                <Badge variant="outline" className="mb-6 px-4 py-2 text-sm border-accent/30 bg-accent/5">
                  <Bot className="w-4 h-4 mr-2" />
                  AI Business Automation
                </Badge>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                  <span className="gradient-text-primary">Follow-Up</span>
                  <br />Automation System
                </h1>
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Stop losing leads to silence. Our AI-powered follow-up system ensures every 
                  prospect gets the right message at the right time.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="xl" variant="gold">
                    <Link to="/contact">
                      Get Your Automation Plan
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
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">35%</div>
                  <div className="text-muted-foreground">Higher Close Rate</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">60%</div>
                  <div className="text-muted-foreground">Fewer No-Shows</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">15hrs</div>
                  <div className="text-muted-foreground">Saved Weekly</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">4x</div>
                  <div className="text-muted-foreground">More Reviews</div>
                </div>
              </div>
            </div>
          </section>

          {/* Features Grid */}
          <section className="py-20">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Complete Follow-Up Automation Suite
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Every tool you need to automate customer communication and never let a lead slip through the cracks.
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.map((feature, index) => (
                  <Card key={index} className="border-border/50 bg-card/50 hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                        <feature.icon className="w-6 h-6 text-accent" />
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

          {/* Automation Types */}
          <section className="py-20 bg-card">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Ready-to-Deploy Automation Templates
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Start with proven automation sequences that deliver results from day one.
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {automationTypes.map((type, index) => (
                  <Card key={index} className="border-border/50">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-bold">{type.title}</h3>
                        <Badge variant="secondary" className="bg-success/10 text-success border-success/30">
                          {type.metric}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground">{type.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Process Section */}
          <section className="py-20">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  How We Build Your Automation
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  A proven 4-step process to implement automation that works for your business.
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {process.map((item, index) => (
                  <div key={index} className="text-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-white">{item.step}</span>
                    </div>
                    <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-sm">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Pricing Preview */}
          <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-accent/5">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Investment That Pays for Itself
                </h2>
                <Card className="p-8 border-primary/20">
                  <div className="text-5xl font-bold text-primary mb-2">$12,500</div>
                  <p className="text-muted-foreground mb-6">One-time implementation fee</p>
                  <ul className="space-y-3 text-left max-w-md mx-auto mb-8">
                    {[
                      "Custom automation workflow design",
                      "Integration with your existing tools",
                      "Email & SMS sequence setup",
                      "Lead scoring configuration",
                      "30 days of optimization support",
                      "Training for your team"
                    ].map((item, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Button asChild size="xl" variant="gold" className="w-full sm:w-auto">
                    <Link to="/contact">
                      Schedule Consultation
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </Card>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 bg-card">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Automate Your Follow-Ups?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Let's discuss how automation can save you time and increase your close rate.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="xl" variant="gold">
                  <Link to="/contact">
                    Start Your Automation Journey
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild size="xl" variant="outline">
                  <Link to="/business/ai-receptionist">
                    Explore AI Receptionist
                  </Link>
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

export default AIAutomation;
