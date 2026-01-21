import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import { SEO } from "@/components/SEO";
import Hero from "@/components/Hero";
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
import aiReceptionistHero from "@/assets/ai-receptionist-hero.jpg";

const AIReceptionist = () => {
  const features = [
    {
      icon: Phone,
      title: "Answers Calls 24/7",
      description: "Your AI never sleeps. Every call gets answered professionally—nights, weekends, holidays. No more lost customers to voicemail."
    },
    {
      icon: Calendar,
      title: "Books Appointments Automatically",
      description: "The AI checks your real-time availability, books directly into your calendar, and sends confirmation texts—all without you lifting a finger."
    },
    {
      icon: MessageSquare,
      title: "Sounds Human, Not Robotic",
      description: "Advanced conversational AI that handles complex questions naturally. Callers often don't realize they're talking to AI."
    },
    {
      icon: Shield,
      title: "Filters Spam & Telemarketers",
      description: "Stop wasting time on junk calls. Our AI screens every caller so you only talk to real customers and genuine opportunities."
    },
    {
      icon: Zap,
      title: "Captures Every Lead",
      description: "Get instant text/email notifications with caller details. Urgent matters get routed to you immediately. Nothing falls through the cracks."
    },
    {
      icon: Users,
      title: "Speaks Their Language",
      description: "Serve the diverse Dayton community. Fluent in English and Spanish with more languages available on request."
    }
  ];

  const benefits = [
    "Save $3,000-5,000/month compared to a human receptionist",
    "Capture 40% more leads from after-hours calls you were missing",
    "Reduce no-shows by 60% with automated appointment reminders",
    "Handle unlimited concurrent calls—no busy signals ever",
    "Project a Fortune 500 image on a small business budget"
  ];

  const useCases = [
    { industry: "Medical & Dental Offices", example: "Patient intake, appointment scheduling, prescription refill requests, insurance verification" },
    { industry: "Law Firms & Legal", example: "New client intake, case status updates, consultation booking, after-hours emergencies" },
    { industry: "Real Estate Agents", example: "Property inquiries, showing scheduling, lead qualification, market updates" },
    { industry: "HVAC & Home Services", example: "Service requests, emergency dispatch, quote scheduling, follow-up calls" },
    { industry: "Auto Shops & Dealerships", example: "Service appointments, parts inquiries, recall notifications, estimate requests" },
    { industry: "Restaurants & Hospitality", example: "Reservations, catering inquiries, event booking, hours and directions" }
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
          {/* Hero Section with AI Technology Image */}
          <Hero
            backgroundImages={[
              { src: aiReceptionistHero, alt: "AI-powered business data analysis visualization" }
            ]}
            headline="AI-Powered Call Analysis & Smart Intake"
            subheadline="Our intelligent system analyzes incoming calls, identifies legitimate inquiries vs spam, and ensures you only speak with real customers. Smart screening that protects your time."
            showScrollIndicator={true}
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="xl" variant="gold">
                <Link to="/contact">
                  Get Your AI Receptionist
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="xl" variant="outlineLight">
                <a href="tel:9373018749">
                  <Phone className="mr-2 h-5 w-5" />
                  Hear It In Action
                </a>
              </Button>
            </div>
            <p className="text-sm text-white/80 mt-6">
              ✓ Setup in 48 hours ✓ No contracts ✓ Cancel anytime
            </p>
          </Hero>

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
                  Your AI Receptionist Does It All
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Everything a $50,000/year receptionist does—plus things they can't. 
                  Available 24/7, never calls in sick, never takes vacation.
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
                    The Math is Simple: You're Losing Money Right Now
                  </h2>
                  <p className="text-muted-foreground mb-8">
                    Every missed call is a missed customer. Research shows 80% of callers who reach 
                    voicemail hang up and call your competitor instead. How many calls did you miss last month?
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
                      <h3 className="text-2xl font-bold mb-2">Your Savings Calculator</h3>
                      <p className="text-muted-foreground mb-6">
                        What a Dayton business owner saves annually
                      </p>
                      <div className="space-y-4 text-left">
                        <div className="flex justify-between py-3 border-b border-border">
                          <span>Full-time receptionist salary</span>
                          <span className="font-semibold">$35,000/yr</span>
                        </div>
                        <div className="flex justify-between py-3 border-b border-border">
                          <span>Benefits, taxes, training</span>
                          <span className="font-semibold">$12,000/yr</span>
                        </div>
                        <div className="flex justify-between py-3 border-b border-border">
                          <span>AI Receptionist (one-time)</span>
                          <span className="font-semibold text-success">$9,500</span>
                        </div>
                        <div className="flex justify-between py-3 text-xl bg-success/10 px-4 rounded-lg">
                          <span className="font-bold">First Year Savings</span>
                          <span className="font-bold text-success">Significant*</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-4">
                        *Savings vary based on current staffing costs. Plus: Capture leads 24/7, not just 9-5. No sick days. No vacations.
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
                  Built for Dayton Businesses Like Yours
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Our AI learns your business, your terminology, and your processes. 
                  Callers get the same quality experience as talking to your best employee.
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {useCases.map((useCase, index) => (
                  <Card key={index} className="border-border/50 hover:border-primary/30 transition-colors">
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

          {/* Urgency Section */}
          <section className="py-16 bg-primary/5 border-y border-primary/20">
            <div className="container mx-auto px-4 text-center">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                While You Read This, How Many Calls Went to Voicemail?
              </h3>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
                The average small business misses 6 calls per day. At $200 per new customer, 
                that's $36,000 in lost revenue every month walking straight to your competitors.
              </p>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-accent/10">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Get Your AI Receptionist Running in 48 Hours
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Call us right now. Our AI will answer (so you can hear it for yourself), 
                then a real human will call you back to discuss your business needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="xl" variant="gold">
                  <Link to="/contact">
                    Schedule My Free Demo
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild size="xl" variant="outline">
                  <a href="tel:9373018749">
                    <Phone className="mr-2 h-5 w-5" />
                    Call (937) 301-8749 Now
                  </a>
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mt-6">
                Serving Dayton, Columbus, Cincinnati & all of Ohio
              </p>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default AIReceptionist;
