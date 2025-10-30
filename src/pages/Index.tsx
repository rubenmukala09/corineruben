import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import TestimonialCard from "@/components/TestimonialCard";
import CTASection from "@/components/CTASection";
import ThreePathsForward from "@/components/ThreePathsForward";
import FlowingWaves from "@/components/FlowingWaves";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Heart,
  Shield,
  MessageSquare,
  Users,
  StopCircle,
  Search,
  Phone,
  DollarSign,
  FileCheck,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  UserX,
  Bot,
  ArrowRight,
} from "lucide-react";
import testimonial1 from "@/assets/testimonial-1.jpg";
import testimonial2 from "@/assets/testimonial-2.jpg";
import testimonial3 from "@/assets/testimonial-3.jpg";
import testimonial5 from "@/assets/testimonial-5.jpg";
import testimonial6 from "@/assets/testimonial-6.jpg";
import testimonial7 from "@/assets/testimonial-7.jpg";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <Hero
        useTransitioningBackground={true}
        headline="Protect Your Family from AI-Powered Scams"
        subheadline="Ohio's trusted source for scam prevention training and 24/7 protection services"
        showScrollIndicator={true}
      >
        <div className="flex flex-col sm:flex-row gap-4 flex-wrap justify-center sm:justify-start">
          <Button asChild variant="default" size="xl" className="w-full sm:w-auto">
            <Link to="/training" aria-label="Learn to spot scams">
              Get Protection Now
            </Link>
          </Button>
        </div>
      </Hero>

      <TrustBar />

      {/* The Growing Threat Section */}
      <section className="py-16 bg-muted relative overflow-hidden">
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
          <div className="text-center mb-10 animate-fade-in-up">
            <h2 className="mb-4">The Growing Threat of AI-Powered Scams</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card
              className="p-6 hover:shadow-strong transition-all duration-500 hover:-translate-y-2 hover:scale-105 rounded-2xl border-border/50 group animate-fade-in-up bg-gradient-to-br from-card to-card/50 backdrop-blur-sm"
              style={{ animationDelay: "0ms" }}
            >
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                  <DollarSign className="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-500" />
                </div>
              </div>
              <h3 className="text-4xl font-bold mb-2 text-center text-primary">$3.4B</h3>
              <p className="text-muted-foreground text-center">Lost to elder fraud in 2023</p>
            </Card>

            <Card
              className="p-6 hover:shadow-strong transition-all duration-500 hover:-translate-y-2 hover:scale-105 rounded-2xl border-border/50 group animate-fade-in-up bg-gradient-to-br from-card to-card/50 backdrop-blur-sm"
              style={{ animationDelay: "100ms" }}
            >
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                  <TrendingUp className="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-500" />
                </div>
              </div>
              <h3 className="text-4xl font-bold mb-2 text-center text-primary">11%</h3>
              <p className="text-muted-foreground text-center">AI scams increased this year</p>
            </Card>

            <Card
              className="p-6 hover:shadow-strong transition-all duration-500 hover:-translate-y-2 hover:scale-105 rounded-2xl border-border/50 group animate-fade-in-up bg-gradient-to-br from-card to-card/50 backdrop-blur-sm"
              style={{ animationDelay: "200ms" }}
            >
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                  <UserX className="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-500" />
                </div>
              </div>
              <h3 className="text-4xl font-bold mb-2 text-center text-primary">50%</h3>
              <p className="text-muted-foreground text-center">Of fraud victims are seniors</p>
            </Card>

            <Card
              className="p-6 hover:shadow-strong transition-all duration-500 hover:-translate-y-2 hover:scale-105 rounded-2xl border-border/50 group animate-fade-in-up bg-gradient-to-br from-card to-card/50 backdrop-blur-sm"
              style={{ animationDelay: "300ms" }}
            >
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                  <Bot className="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-500" />
                </div>
              </div>
              <h3 className="text-4xl font-bold mb-2 text-center text-primary">400%</h3>
              <p className="text-muted-foreground text-center">Rise in voice cloning scams</p>
            </Card>
          </div>

          <div className="text-center mt-10 animate-fade-in-up" style={{ animationDelay: "400ms" }}>
            <p className="text-2xl font-bold text-foreground">Don't become a statistic. Get protected today.</p>
          </div>
        </div>
      </section>

      {/* Three Paths Forward */}
      <ThreePathsForward />

      {/* Our Services */}
      <section className="py-24 bg-background relative overflow-hidden">
        {/* Animated Background Decorations */}
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: "4s" }} />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: "6s" }} />
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: "5s" }} />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="mb-4">Our Services</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive protection solutions designed for modern threats
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* ScamShield Protection */}
            <Card className="p-8 hover:shadow-strong transition-all duration-500 hover:-translate-y-2 hover:scale-105 rounded-2xl border-border/50 group animate-fade-in-up bg-gradient-to-br from-card to-card/50 backdrop-blur-sm" style={{ animationDelay: "0ms" }}>
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                  <Shield className="w-10 h-10 text-primary" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-center group-hover:text-primary transition-colors">
                ScamShield Protection
              </h3>
              <p className="text-muted-foreground text-center mb-6">
                24/7 threat analysis and scam detection services to keep you protected from AI-powered fraud
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Unlimited threat submissions</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Expert analysis within 24 hours</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Detailed risk assessments</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Monthly scam alerts</span>
                </li>
              </ul>
              <Button asChild variant="default" className="w-full group-hover:scale-105 transition-transform">
                <Link to="/training#scamshield">
                  Learn More <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </Card>

            {/* Training Programs */}
            <Card className="p-8 hover:shadow-strong transition-all duration-500 hover:-translate-y-2 hover:scale-105 rounded-2xl border-primary border-2 group relative animate-fade-in-up bg-gradient-to-br from-card to-card/50 backdrop-blur-sm" style={{ animationDelay: "100ms" }}>
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-bold">
                  MOST POPULAR
                </span>
              </div>
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                  <Users className="w-10 h-10 text-primary" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-center group-hover:text-primary transition-colors">
                Training Programs
              </h3>
              <p className="text-muted-foreground text-center mb-6">
                Interactive training sessions that teach you practical skills to recognize and stop scams
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Live interactive sessions</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Certificate of completion</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Group and private options</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Practical, hands-on learning</span>
                </li>
              </ul>
              <Button asChild variant="default" className="w-full group-hover:scale-105 transition-transform">
                <Link to="/training#training">
                  View Programs <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </Card>

            {/* Business Solutions */}
            <Card className="p-8 hover:shadow-strong transition-all duration-500 hover:-translate-y-2 hover:scale-105 rounded-2xl border-border/50 group animate-fade-in-up bg-gradient-to-br from-card to-card/50 backdrop-blur-sm" style={{ animationDelay: "200ms" }}>
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                  <Bot className="w-10 h-10 text-primary" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-center group-hover:text-primary transition-colors">
                Business Solutions
              </h3>
              <p className="text-muted-foreground text-center mb-6">
                Custom AI automation, professional websites, and industry-leading AI Service Insurance
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm">AI automation solutions</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Professional web design</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm">AI Service Insurance</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Security-first approach</span>
                </li>
              </ul>
              <Button asChild variant="default" className="w-full group-hover:scale-105 transition-transform">
                <Link to="/business">
                  Explore Solutions <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Families Trust Us */}
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
          <h2 className="text-center mb-10 animate-fade-in-up">Why Families Trust InVision Network</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card
              className="p-6 hover:shadow-strong transition-all duration-500 hover:-translate-y-2 hover:scale-105 rounded-2xl border-border/50 group animate-fade-in-up bg-gradient-to-br from-card to-card/50 backdrop-blur-sm"
              style={{ animationDelay: "0ms" }}
            >
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                  <CheckCircle className="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-500" />
                </div>
              </div>
              <h3 className="text-xl mb-3 text-center group-hover:text-primary transition-colors duration-300">
                500+ Families Protected
              </h3>
              <p className="text-muted-foreground text-center">
                Trusted by hundreds of Ohio families to keep them safe from AI scams.
              </p>
            </Card>

            <Card
              className="p-6 hover:shadow-strong transition-all duration-500 hover:-translate-y-2 hover:scale-105 rounded-2xl border-border/50 group animate-fade-in-up bg-gradient-to-br from-card to-card/50 backdrop-blur-sm"
              style={{ animationDelay: "100ms" }}
            >
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                  <Heart className="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-500" />
                </div>
              </div>
              <h3 className="text-xl mb-3 text-center group-hover:text-primary transition-colors duration-300">
                Ohio Based & Trusted
              </h3>
              <p className="text-muted-foreground text-center">
                Locally owned and operated in Dayton, serving families across Ohio.
              </p>
            </Card>

            <Card
              className="p-6 hover:shadow-strong transition-all duration-500 hover:-translate-y-2 hover:scale-105 rounded-2xl border-border/50 group animate-fade-in-up bg-gradient-to-br from-card to-card/50 backdrop-blur-sm"
              style={{ animationDelay: "200ms" }}
            >
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                  <Shield className="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-500" />
                </div>
              </div>
              <h3 className="text-xl mb-3 text-center group-hover:text-primary transition-colors duration-300">
                Expert Cybersecurity Team
              </h3>
              <p className="text-muted-foreground text-center">
                Certified professionals who understand both technology and scam tactics.
              </p>
            </Card>

            <Card
              className="p-6 hover:shadow-strong transition-all duration-500 hover:-translate-y-2 hover:scale-105 rounded-2xl border-border/50 group animate-fade-in-up bg-gradient-to-br from-card to-card/50 backdrop-blur-sm"
              style={{ animationDelay: "300ms" }}
            >
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                  <MessageSquare className="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-500" />
                </div>
              </div>
              <h3 className="text-xl mb-3 text-center group-hover:text-primary transition-colors duration-300">
                Multilingual Support
              </h3>
              <p className="text-muted-foreground text-center">
                Available in English • Français • Español for your convenience.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* The 60-Second Pause Protocol */}
      <section className="py-16 bg-muted relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute top-1/4 right-20 w-64 h-64 bg-accent/30 rounded-full blur-3xl animate-pulse"
            style={{ animationDuration: "5s" }}
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-10 animate-fade-in-up">
            <h2 className="mb-4">The 60-Second Pause Protocol™</h2>
            <p className="text-xl text-muted-foreground">Stop Scams Before They Start</p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {[
              {
                icon: StopCircle,
                title: "STOP & BREATHE",
                desc: "Don't act immediately. Scammers create urgency to bypass your judgment.",
              },
              {
                icon: Search,
                title: "VERIFY IDENTITY",
                desc: "Ask specific questions only the real person would know. Demand full name, department, callback number.",
              },
              {
                icon: Phone,
                title: "CALL BACK OFFICIAL NUMBER",
                desc: "Use the number on your bank card, official website, or phone book—NEVER the number they give you.",
              },
              {
                icon: Users,
                title: "USE FAMILY SAFE-WORD",
                desc: "Establish a secret word/phrase with family. No safe-word? No action.",
              },
              {
                icon: DollarSign,
                title: "DOUBLE-CHECK MONEY REQUESTS",
                desc: "If anyone asks for money, gift cards, wire transfers—verify through a SECOND channel (text, in-person, trusted number).",
              },
              {
                icon: FileCheck,
                title: "DOCUMENT & REPORT",
                desc: "Write down details: time, caller info, what they said. Report to FTC, your bank, and local police if needed.",
              },
              {
                icon: Shield,
                title: "FORWARD TO INVISION (MEMBERS)",
                desc: "ScamShield members: Send us the suspicious item for professional analysis within 24 hours.",
              },
            ].map((step, index) => (
              <Card
                key={index}
                className="p-6 hover:shadow-strong transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] rounded-2xl border-border/50 group animate-fade-in-up bg-gradient-to-br from-card to-card/50"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                      <step.icon className="w-7 h-7 text-primary" />
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground">{step.desc}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-10 animate-fade-in-up" style={{ animationDelay: "700ms" }}>
            <Button asChild variant="default" size="xl">
              <Link to="/resources">Download Free Protection Guide</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* What You'll Master Section */}
      <section className="py-16 bg-background relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute bottom-1/4 left-20 w-80 h-80 bg-primary/20 rounded-full blur-3xl animate-pulse"
            style={{ animationDuration: "7s" }}
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-center mb-10 animate-fade-in-up">What You'll Master in Our Training</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
              <Card
                key={index}
                className="p-6 hover:shadow-strong transition-all duration-500 hover:-translate-y-2 hover:scale-105 rounded-2xl border-border/50 group animate-fade-in-up bg-gradient-to-br from-card to-card/50 backdrop-blur-sm"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                      <CheckCircle className="w-5 h-5 text-primary" />
                    </div>
                  </div>
                  <p className="text-foreground font-medium group-hover:text-primary transition-colors duration-300">
                    {skill}
                  </p>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-10 animate-fade-in-up" style={{ animationDelay: "400ms" }}>
            <Button asChild variant="default" size="xl">
              <Link to="/training">View Training Options</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-muted relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute top-20 right-1/4 w-96 h-96 bg-accent/25 rounded-full blur-3xl animate-pulse"
            style={{ animationDuration: "8s" }}
          />
          <div
            className="absolute bottom-20 left-1/4 w-72 h-72 bg-primary/25 rounded-full blur-3xl animate-pulse"
            style={{ animationDuration: "6s" }}
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-center mb-10 animate-fade-in-up">Trusted by 500+ Ohio Families</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="animate-fade-in-up" style={{ animationDelay: "0ms" }}>
            <TestimonialCard
                name="Margaret R."
                age="68"
                location="Columbus, OH"
                quote="I received a call from someone claiming to be my grandson, saying he was in jail and needed bail money immediately. Thanks to InVision's training, I recognized it as a deepfake scam. They saved me from losing $5,000."
                image={testimonial1}
              />
            </div>
            <div className="animate-fade-in-up" style={{ animationDelay: "150ms" }}>
            <TestimonialCard
                name="James K."
                location="Cleveland, OH"
                quote="As a small business owner, I was worried about using AI tools. InVision's AI Service Insurance gives us complete peace of mind. Now we can innovate confidently knowing we're protected."
                image={testimonial3}
              />
            </div>
            <div className="animate-fade-in-up" style={{ animationDelay: "300ms" }}>
            <TestimonialCard
                name="Patricia L."
                age="71"
                location="Dayton, OH"
                quote="I forwarded a suspicious email to ScamShield that looked exactly like my bank asking me to verify my account. Within hours, they confirmed it was a sophisticated phishing scam and told me exactly what to do. This service is worth every penny."
                image={testimonial5}
              />
            </div>
            <div className="animate-fade-in-up" style={{ animationDelay: "450ms" }}>
            <TestimonialCard
                name="Robert & Linda K."
                age="72 & 70"
                location="Dayton, OH"
                quote="My husband and I attended the Family Small Group training session. The instructor was incredibly patient and explained everything in plain English without talking down to us. We learned how to spot AI voice clones, verify urgent messages, and set up our family safe-word system. We finally feel confident using technology safely."
                image={testimonial2}
              />
            </div>
            <div className="animate-fade-in-up" style={{ animationDelay: "600ms" }}>
            <TestimonialCard
                name="William Chen"
                age="78"
                location="Akron, OH"
                quote="I'll be honest - I'm not comfortable with technology. But the trainer came to my home and patiently walked me through everything step by step. They showed me real examples of AI voice clones and taught me simple questions to ask when someone calls asking for money. My daughter can finally sleep at night knowing I'm protected."
                image={testimonial6}
              />
            </div>
            <div className="animate-fade-in-up" style={{ animationDelay: "750ms" }}>
            <TestimonialCard
                name="Jennifer Wallace"
                age="58"
                location="Cleveland, OH"
                quote="After my 82-year-old mother nearly lost $15,000 to a 'grandparent scam,' I knew we needed professional help. I enrolled our entire family in the training program. Now everyone knows the 60-Second Pause Protocol, we have a family safe-word, and Mom forwards anything suspicious to ScamShield before taking action. This has been a lifesaver for our peace of mind."
                image={testimonial7}
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Teaser */}
      <section className="py-20 bg-background relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute top-1/3 left-20 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-pulse"
            style={{ animationDuration: "6s" }}
          />
          <div
            className="absolute bottom-1/4 right-20 w-72 h-72 bg-accent/20 rounded-full blur-3xl animate-pulse"
            style={{ animationDuration: "7s" }}
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-center mb-12 animate-fade-in-up">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                q: "How is InVision different from free services like AARP?",
                a: "While free services like AARP provide excellent educational resources, InVision offers personalized threat analysis. We examine YOUR specific suspicious messages within 24 hours and provide actionable guidance. Think of us as your personal cybersecurity team on retainer.",
              },
              {
                q: "What types of scams can ScamShield detect?",
                a: "We analyze all types: phishing emails, SMS scams, voice calls, QR codes, social media messages, investment schemes, romance scams, and more. Our specialty is AI-powered threats like deepfakes and voice cloning.",
              },
              {
                q: "What if I'm not tech-savvy?",
                a: "That's exactly who we serve! Our services are designed for people of all technical skill levels. If you can forward an email or take a screenshot, you can use our services.",
              },
            ].map((faq, index) => (
              <Card
                key={index}
                className="p-6 rounded-2xl hover:shadow-strong transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] border-border/50 group animate-fade-in-up bg-gradient-to-br from-card to-card/50"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                  {faq.q}
                </h3>
                <p className="text-muted-foreground">{faq.a}</p>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8 animate-fade-in-up" style={{ animationDelay: "300ms" }}>
            <Link
              to="/resources#faq"
              className="text-primary hover:text-primary/80 font-semibold text-lg inline-flex items-center gap-2 hover:gap-4 transition-all duration-300 hover:scale-105"
            >
              VIEW ALL FAQ →
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <CTASection headline="Protect What Matters Most" variant="gold">
        <p className="text-xl text-white/90 mb-8">Join 500+ Ohio families who sleep better knowing they're protected from AI scams.</p>
        <div className="flex flex-col sm:flex-row gap-4 flex-wrap justify-center">
          <Button asChild variant="gold" size="xl" className="w-full sm:w-auto">
            <Link to="/training" aria-label="Book free training call">
              Schedule Free Consultation
            </Link>
          </Button>
          <Button asChild variant="secondary" size="xl" className="w-full sm:w-auto">
            <Link to="/training" aria-label="Start 14-day Shield trial">
              Start 14-Day Free Trial
            </Link>
          </Button>
          <Button asChild variant="outlineLight" size="xl" className="w-full sm:w-auto">
            <Link to="/business" aria-label="Request business quote">
              Get Business Quote
            </Link>
          </Button>
        </div>
        <p className="text-white/80 mt-6 text-sm">
          ✓ No credit card required ✓ Cancel anytime ✓ 60-day money-back guarantee
        </p>
      </CTASection>

      <Footer />
    </div>
  );
};

export default Index;
