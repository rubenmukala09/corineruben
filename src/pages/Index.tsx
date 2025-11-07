import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import TestimonialCard from "@/components/TestimonialCard";
import CTASection from "@/components/CTASection";
import ThreePathsForward from "@/components/ThreePathsForward";
import FlowingWaves from "@/components/FlowingWaves";
import MakingADifference from "@/components/MakingADifference";
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
        useTransitioningText={true}
        showScrollIndicator={true}
        showPrivacyDisclaimer={true}
      >
        <div className="flex flex-col sm:flex-row gap-4 flex-wrap justify-center sm:justify-start">
          <Button asChild variant="default" size="xl" className="w-full sm:w-auto text-base md:text-lg">
            <Link to="/training#pricing" aria-label="View protection plans">
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

      {/* Three Paths Forward - Now includes all services */}
      <ThreePathsForward />

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
                Locally owned and operated in Cleveland, serving families across Ohio.
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
              <Link to="/resources">Download Protection Guide</Link>
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
          <h2 className="text-center mb-4 animate-fade-in-up">Trusted by 500+ Ohio Families</h2>
          <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
            Real stories from real people protected by InVision Network
          </p>

          {/* Video Testimonials Section */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-center mb-6">Video Testimonials</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                { title: "Margaret's Grandparent Scam Story", videoId: "placeholder1" },
                { title: "Small Business Success with AI", videoId: "placeholder2" },
                { title: "Family Training Experience", videoId: "placeholder3" },
              ].map((video, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-strong transition-all hover:-translate-y-1">
                  <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <p className="text-sm text-muted-foreground px-4 text-center">
                      Video: {video.title}
                      <br />
                      <span className="text-xs">(Link to be added)</span>
                    </p>
                  </div>
                  <div className="p-4">
                    <p className="font-semibold text-sm">{video.title}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Text Testimonials - Compact Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="animate-fade-in-up" style={{ animationDelay: "0ms" }}>
              <Card className="p-4 h-full hover:shadow-medium transition-all hover:-translate-y-1">
                <div className="flex items-center gap-3 mb-3">
                  <img src={testimonial1} alt="Margaret R." className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <p className="font-bold text-sm">Margaret R., 68</p>
                    <p className="text-xs text-muted-foreground">Columbus, OH</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-4">
                  "Thanks to InVision's training, I recognized a deepfake scam call. They saved me from losing $5,000."
                </p>
              </Card>
            </div>
            <div className="animate-fade-in-up" style={{ animationDelay: "100ms" }}>
              <Card className="p-4 h-full hover:shadow-medium transition-all hover:-translate-y-1">
                <div className="flex items-center gap-3 mb-3">
                  <img src={testimonial3} alt="James K." className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <p className="font-bold text-sm">James K.</p>
                    <p className="text-xs text-muted-foreground">Cleveland, OH</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-4">
                  "InVision's AI Service Insurance gives us complete peace of mind. We can innovate confidently."
                </p>
              </Card>
            </div>
            <div className="animate-fade-in-up" style={{ animationDelay: "200ms" }}>
              <Card className="p-4 h-full hover:shadow-medium transition-all hover:-translate-y-1">
                <div className="flex items-center gap-3 mb-3">
                  <img src={testimonial5} alt="Patricia L." className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <p className="font-bold text-sm">Patricia L., 71</p>
                    <p className="text-xs text-muted-foreground">Dayton, OH</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-4">
                  "ScamShield confirmed a sophisticated phishing scam within hours. This service is worth every penny."
                </p>
              </Card>
            </div>
            <div className="animate-fade-in-up" style={{ animationDelay: "300ms" }}>
              <Card className="p-4 h-full hover:shadow-medium transition-all hover:-translate-y-1">
                <div className="flex items-center gap-3 mb-3">
                  <img src={testimonial2} alt="Robert & Linda K." className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <p className="font-bold text-sm">Robert & Linda K.</p>
                    <p className="text-xs text-muted-foreground">Dayton, OH</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-4">
                  "Incredibly patient training. We learned to spot AI voice clones and set up our family safe-word system."
                </p>
              </Card>
            </div>
            <div className="animate-fade-in-up" style={{ animationDelay: "400ms" }}>
              <Card className="p-4 h-full hover:shadow-medium transition-all hover:-translate-y-1">
                <div className="flex items-center gap-3 mb-3">
                  <img src={testimonial6} alt="William Chen" className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <p className="font-bold text-sm">William Chen, 78</p>
                    <p className="text-xs text-muted-foreground">Akron, OH</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-4">
                  "They came to my home and patiently walked me through everything. My daughter can finally sleep at night."
                </p>
              </Card>
            </div>
            <div className="animate-fade-in-up" style={{ animationDelay: "500ms" }}>
              <Card className="p-4 h-full hover:shadow-medium transition-all hover:-translate-y-1">
                <div className="flex items-center gap-3 mb-3">
                  <img src={testimonial7} alt="Jennifer Wallace" className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <p className="font-bold text-sm">Jennifer Wallace, 58</p>
                    <p className="text-xs text-muted-foreground">Cleveland, OH</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-4">
                  "Enrolled our entire family. Now everyone knows the 60-Second Pause Protocol. A lifesaver for peace of mind."
                </p>
              </Card>
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
                q: "What types of scams can ScamShield detect?",
                a: "We analyze all types: phishing emails, SMS scams, voice calls, QR codes, social media messages, investment schemes, romance scams, and more. Our specialty is AI-powered threats like deepfakes and voice cloning.",
              },
              {
                q: "What if I'm not tech-savvy?",
                a: "That's exactly who we serve! Our services are designed for people of all technical skill levels. If you can forward an email or take a screenshot, you can use our services.",
              },
              // Hidden but kept for future reference
              // {
              //   q: "How is InVision different from free services like AARP?",
              //   a: "While free services like AARP provide excellent educational resources, InVision offers personalized threat analysis. We examine YOUR specific suspicious messages within 24 hours and provide actionable guidance. Think of us as your personal cybersecurity team on retainer.",
              // },
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

      {/* Making a Difference Section */}
      <MakingADifference />

      {/* Final CTA */}
      <CTASection headline="Protect What Matters Most" variant="gold">
        <p className="text-xl text-white/90 mb-8">Join 500+ Ohio families who sleep better knowing they're protected from AI scams.</p>
        <div className="flex flex-col sm:flex-row gap-4 flex-wrap justify-center">
          <Button asChild variant="gold" size="xl" className="w-full sm:w-auto">
            <Link to="/training" aria-label="Book training call">
              Schedule Consultation
            </Link>
          </Button>
          <Button asChild variant="secondary" size="xl" className="w-full sm:w-auto">
            <Link to="/training#pricing" aria-label="View protection plans">
              Get Protection Now
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
