import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import CTASection from "@/components/CTASection";
import FlowingWaves from "@/components/FlowingWaves";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  CheckCircle,
  Mail,
  Upload,
  Phone,
  Search,
  Shield,
  Users,
  Clock,
  Award,
  Lock,
  FileText,
  MessageSquare,
  Link as LinkIcon,
  QrCode,
  FileCheck,
  Image as ImageIcon,
} from "lucide-react";

const ScamShield = () => {
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <Hero
        useTransitioningBackground={true}
        headline="Your Personal Cybersecurity Team - On Demand"
        subheadline="Forward suspicious emails, texts, calls, or links. Get expert analysis within 24 hours."
        showScrollIndicator={true}
      >
        <div className="mb-6 inline-block">
          <div className="bg-accent text-accent-foreground px-6 py-3 rounded-full font-bold text-lg mb-4">
            14-DAY FREE TRIAL
          </div>
          <p className="text-white/90 text-xl">No Credit Card Required</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 flex-wrap justify-center sm:justify-start">
          <Button asChild variant="default" size="xl" className="w-full sm:w-auto">
            <Link to="#pricing" aria-label="Start your free trial">
              Start Your Free Trial
            </Link>
          </Button>
        </div>
      </Hero>

      {/* How ScamShield Works Section */}
      <section className="py-16 bg-background relative overflow-hidden">
        <FlowingWaves variant="full" opacity={0.12} />
        <div className="absolute inset-0 opacity-30">
          <div
            className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse"
            style={{ animationDuration: "4s" }}
          />
          <div
            className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse"
            style={{ animationDuration: "6s" }}
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-center mb-10 animate-fade-in-up">Simple Protection in 4 Steps</h2>

          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: MessageSquare,
                  step: "STEP 1",
                  title: "You Receive Something Suspicious",
                  desc: "Strange text, urgent email, odd call, suspicious link",
                },
                {
                  icon: Upload,
                  step: "STEP 2",
                  title: "Forward It to Our Team",
                  desc: "Email, text, upload screenshot, or call our hotline",
                  subtext: "Response time: 24 hours (Premium: 4 hours)",
                },
                {
                  icon: Search,
                  step: "STEP 3",
                  title: "Expert Analysis",
                  desc: "Our team examines: Message content, sender verification, link destination, voice/audio analysis, AI-generated detection",
                },
                {
                  icon: FileCheck,
                  step: "STEP 4",
                  title: "Get Clear Guidance",
                  desc: "Risk level (Safe/Caution/Danger/CRITICAL), detailed explanation, recommended actions, emergency scripts if needed",
                },
              ].map((step, index) => (
                <Card
                  key={index}
                  className="p-6 hover:shadow-strong transition-all duration-500 hover:-translate-y-2 hover:scale-105 rounded-2xl border-border/50 group animate-fade-in-up bg-gradient-to-br from-card to-card/50 backdrop-blur-sm"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                      <step.icon className="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-500" />
                    </div>
                  </div>
                  <div className="text-center mb-2">
                    <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
                      {step.step}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold mb-3 text-center group-hover:text-primary transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-center text-sm">{step.desc}</p>
                  {step.subtext && <p className="text-accent text-center text-xs mt-2 font-semibold">{step.subtext}</p>}
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 bg-muted relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute top-1/4 right-20 w-64 h-64 bg-accent/30 rounded-full blur-3xl animate-pulse"
            style={{ animationDuration: "5s" }}
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-center mb-10 animate-fade-in-up">Choose Your Protection Level</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Starter Plan */}
            <Card
              className="p-8 hover:shadow-strong transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] rounded-2xl border-border/50 animate-fade-in-up bg-gradient-to-br from-card to-card/50"
              style={{ animationDelay: "0ms" }}
            >
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center">
                  <Shield className="w-10 h-10 text-primary" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-2 text-center">Starter Plan</h3>
              <div className="text-center mb-6">
                <span className="text-4xl font-bold text-primary">$39</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <p className="text-center text-sm text-muted-foreground mb-6">Perfect for: Individuals</p>

              <div className="space-y-3 mb-8">
                {[
                  "Unlimited threat submissions",
                  "24-hour expert analysis",
                  "Email & text support",
                  "Risk assessment reports",
                  "Monthly scam trend updates",
                  "Access to Scam Alert Map",
                  "Educational resources",
                  "60-day money-back guarantee",
                ].map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="mb-6 p-3 bg-primary/10 rounded-lg">
                <div className="flex items-center gap-2 justify-center">
                  <Mail className="w-5 h-5 text-primary" />
                  <Upload className="w-5 h-5 text-primary" />
                  <span className="text-xs font-medium">Email, Upload</span>
                </div>
              </div>

              <Button asChild variant="default" size="lg" className="w-full">
                <Link to="/contact">START FREE TRIAL</Link>
              </Button>
            </Card>

            {/* Family Plan - MOST POPULAR */}
            <Card
              className="p-8 hover:shadow-strong transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] rounded-2xl border-primary border-2 animate-fade-in-up bg-gradient-to-br from-card to-card/50 relative"
              style={{ animationDelay: "100ms" }}
            >
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-bold">
                  MOST POPULAR
                </span>
              </div>
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center">
                  <Users className="w-10 h-10 text-primary" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-2 text-center">Family Plan</h3>
              <div className="text-center mb-6">
                <span className="text-4xl font-bold text-primary">$79</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <p className="text-center text-sm text-muted-foreground mb-6">Perfect for: Families & couples</p>

              <div className="space-y-3 mb-8">
                <p className="font-semibold text-center mb-3">Everything in Starter PLUS:</p>
                {[
                  "Protect up to 5 family members",
                  "12-hour priority response",
                  "Phone support included",
                  "Family Safety Vault (secure storage)",
                  "Shared safe-word system",
                  "Call verification assistance",
                  "Quarterly family safety briefings",
                  "Training discounts (20% off)",
                ].map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="mb-6 p-3 bg-primary/10 rounded-lg">
                <div className="flex items-center gap-2 justify-center">
                  <Mail className="w-4 h-4 text-primary" />
                  <Upload className="w-4 h-4 text-primary" />
                  <Phone className="w-4 h-4 text-primary" />
                  <MessageSquare className="w-4 h-4 text-primary" />
                  <span className="text-xs font-medium">All Methods</span>
                </div>
              </div>

              <Button asChild variant="default" size="lg" className="w-full">
                <Link to="/contact">START FREE TRIAL</Link>
              </Button>
            </Card>

            {/* Premium Plan */}
            <Card
              className="p-8 hover:shadow-strong transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] rounded-2xl border-border/50 animate-fade-in-up bg-gradient-to-br from-card to-card/50"
              style={{ animationDelay: "200ms" }}
            >
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center">
                  <Award className="w-10 h-10 text-primary" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-2 text-center">Premium Plan</h3>
              <div className="text-center mb-6">
                <span className="text-4xl font-bold text-primary">$129</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <p className="text-center text-sm text-muted-foreground mb-6">
                Perfect for: High-risk individuals, business owners
              </p>

              <div className="space-y-3 mb-8">
                <p className="font-semibold text-center mb-3">Everything in Family PLUS:</p>
                {[
                  "4-hour emergency response",
                  "AI deepfake voice detection",
                  '"Call Me Now" verification service',
                  "Dedicated security advisor",
                  "24/7 emergency hotline",
                  "Proactive monitoring alerts",
                  "Monthly 1-on-1 check-ins",
                  "Custom threat briefings",
                ].map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="mb-6 p-3 bg-primary/10 rounded-lg">
                <div className="flex flex-col items-center gap-2">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-primary" />
                    <Upload className="w-4 h-4 text-primary" />
                    <Phone className="w-4 h-4 text-primary" />
                    <MessageSquare className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-xs font-medium">+ Emergency Hotline</span>
                </div>
              </div>

              <Button asChild variant="default" size="lg" className="w-full">
                <Link to="/contact">START FREE TRIAL</Link>
              </Button>
            </Card>
          </div>

          <div className="text-center mt-8 animate-fade-in-up" style={{ animationDelay: "300ms" }}>
            <p className="text-muted-foreground">All plans include 14-day free trial. Cancel anytime. No contracts.</p>
          </div>
        </div>
      </section>

      {/* What We Analyze Section */}
      <section className="py-16 bg-background relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute bottom-1/4 left-20 w-80 h-80 bg-primary/20 rounded-full blur-3xl animate-pulse"
            style={{ animationDuration: "7s" }}
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-center mb-10 animate-fade-in-up">We Analyze All Types of Threats</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { icon: Mail, title: "Phishing Emails" },
              { icon: MessageSquare, title: "SMS Scams" },
              { icon: Phone, title: "Voice Calls" },
              { icon: FileText, title: "Voice Messages" },
              { icon: LinkIcon, title: "Suspicious Links" },
              { icon: QrCode, title: "QR Codes" },
              { icon: FileCheck, title: "Documents" },
              { icon: ImageIcon, title: "Social Media" },
            ].map((threat, index) => (
              <Card
                key={index}
                className="p-6 hover:shadow-strong transition-all duration-500 hover:-translate-y-2 hover:scale-105 rounded-2xl border-border/50 group animate-fade-in-up bg-gradient-to-br from-card to-card/50 backdrop-blur-sm"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-all duration-300 mb-3">
                    <threat.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-sm font-semibold group-hover:text-primary transition-colors duration-300">
                    {threat.title}
                  </h3>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Family Safety Vault Section */}
      <section className="py-16 bg-muted relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute top-20 right-1/4 w-96 h-96 bg-accent/25 rounded-full blur-3xl animate-pulse"
            style={{ animationDuration: "8s" }}
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <Card className="max-w-4xl mx-auto p-8 hover:shadow-strong transition-all duration-500 rounded-2xl border-accent border-2 animate-fade-in-up bg-gradient-to-br from-card to-card/50">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center">
                  <Lock className="w-12 h-12 text-primary" />
                </div>
              </div>
              <h3 className="text-3xl font-bold mb-4">Secure Your Family's Most Important Information</h3>
              <p className="text-xl text-muted-foreground mb-8">Included FREE with Family & Premium Plans</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 text-left max-w-2xl mx-auto">
                {[
                  "Family safe words",
                  "Trusted caller list",
                  "Emergency contacts",
                  "Important documents (encrypted)",
                  "Account recovery info",
                  "Travel itineraries",
                ].map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{feature}</span>
                  </div>
                ))}
              </div>

              <p className="text-sm text-muted-foreground mb-6">
                Security: Bank-grade encryption, multi-factor auth, access sharing
              </p>

              <Button asChild variant="default" size="lg">
                <Link to="/contact">EXPLORE SAFETY VAULT</Link>
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* Real Examples Section */}
      <section className="py-16 bg-background relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute bottom-20 left-1/4 w-72 h-72 bg-primary/25 rounded-full blur-3xl animate-pulse"
            style={{ animationDuration: "6s" }}
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-center mb-10 animate-fade-in-up">Scams We've Caught for Our Members</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {[
              {
                badge: "Grandparent Scam",
                received: '"Hi grandma, I\'m in jail and need bail money NOW"',
                analysis: "Voice analysis showed AI generation. Number traced to known scam.",
                saved: "$8,000",
              },
              {
                badge: "Bank Phishing",
                received: "Email that looked exactly like Chase Bank",
                analysis: "Domain was chase-secure-verify.com (fake). Classic phishing.",
                saved: "Entire savings",
              },
              {
                badge: "Tech Support Scam",
                received: "Microsoft called saying computer was hacked",
                analysis: "Microsoft never cold-calls. Verified fake tech support operation.",
                saved: "$2,500",
              },
              {
                badge: "Romance Scam",
                received: "Online love interest requested emergency funds",
                analysis: "Photos were stolen. Profile matched known scammer patterns.",
                saved: "$15,000",
              },
            ].map((example, index) => (
              <Card
                key={index}
                className="p-6 hover:shadow-strong transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] rounded-2xl border-border/50 animate-fade-in-up bg-gradient-to-br from-card to-card/50"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="mb-4">
                  <span className="text-sm font-bold bg-accent text-accent-foreground px-3 py-1 rounded-full">
                    {example.badge}
                  </span>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground mb-1">WHAT THEY RECEIVED:</p>
                    <p className="text-foreground text-sm italic">{example.received}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground mb-1">OUR ANALYSIS:</p>
                    <p className="text-foreground text-sm">{example.analysis}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground mb-1">MONEY SAVED:</p>
                    <p className="text-2xl font-bold text-primary">{example.saved}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <CTASection headline="Sleep Better Tonight" variant="gold">
        <p className="text-xl text-white/90 mb-8">Join 500+ families who trust ScamShield</p>
        <div className="flex flex-col sm:flex-row gap-4 flex-wrap justify-center">
          <Button asChild variant="gold" size="xl" className="w-full sm:w-auto">
            <Link to="#pricing" aria-label="Start free trial">
              START FREE TRIAL
            </Link>
          </Button>
          <Button asChild variant="secondary" size="xl" className="w-full sm:w-auto">
            <Link to="/training" aria-label="Compare plans">
              COMPARE PLANS
            </Link>
          </Button>
          <Button asChild variant="outlineLight" size="xl" className="w-full sm:w-auto">
            <Link to="/contact" aria-label="Talk to expert">
              TALK TO EXPERT
            </Link>
          </Button>
        </div>
      </CTASection>

      <Footer />
    </div>
  );
};

export default ScamShield;
