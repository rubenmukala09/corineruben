import { Link } from "react-router-dom";
import React, { Suspense, lazy, useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import TestimonialCard from "@/components/TestimonialCard";
import CTASection from "@/components/CTASection";
import ThreePathsForward from "@/components/ThreePathsForward";
import FlowingWaves from "@/components/FlowingWaves";
import NewsletterSubscribe from "@/components/NewsletterSubscribe";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Heart,
  FileText,
  MessageSquare,
  Users,
  StopCircle,
  Search,
  Phone,
  DollarSign,
  FileCheck,
  Shield,
  CheckCircle,
  ExternalLink,
  AlertTriangle,
  Loader2,
} from "lucide-react";
import ServiceHero from "@/components/ServiceHero";

// Lazy load heavy components for better performance
const VideoTestimonials = lazy(() => import("@/components/VideoTestimonials"));
const EducationalVideos = lazy(() => import("@/components/EducationalVideos"));
const AIPartnersCarousel = lazy(() => import("@/components/AIPartnersCarousel"));

// Lazy load images with fallback
const LazyImage = ({ src, alt, className = "" }: { src: string; alt: string; className?: string }) => {
  const [imageSrc, setImageSrc] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImageSrc(src);
      setLoading(false);
    };
    img.onerror = () => {
      setError(true);
      setLoading(false);
    };
  }, [src]);

  if (loading) {
    return <div className={`${className} bg-muted animate-pulse`} />;
  }

  if (error) {
    return (
      <div className={`${className} bg-muted flex items-center justify-center`}>
        <Users className="w-8 h-8 text-muted-foreground" />
      </div>
    );
  }

  return <img src={imageSrc} alt={alt} className={className} loading="lazy" />;
};

// Loading fallback component
const LoadingFallback = () => (
  <div className="flex justify-center items-center py-12">
    <Loader2 className="w-8 h-8 animate-spin text-primary" />
    <span className="ml-2 text-lg">Loading content...</span>
  </div>
);

// Error Boundary Component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="p-6 text-center">
            <AlertTriangle className="w-12 h-12 mx-auto text-warning mb-4" />
            <h3 className="text-xl font-semibold mb-2">Something went wrong</h3>
            <p className="text-muted-foreground">Please try refreshing the page.</p>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

const Index = () => {
  // Skip to main content for accessibility
  const skipToMain = () => {
    const mainContent = document.getElementById("main-content");
    mainContent?.focus();
  };

  return (
    <div className="min-h-screen">
      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        onClick={skipToMain}
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md"
      >
        Skip to main content
      </a>

      <Navigation />

      <main id="main-content" tabIndex={-1}>
        {/* Hero Section with improved accessibility */}
        <ServiceHero
          showScrollIndicator={true}
          aria-label="Welcome to Secure Senior Safeguard - Protecting seniors from online scams"
        >
          <div className="flex flex-col sm:flex-row gap-4 flex-wrap justify-center sm:justify-start">
            <Button
              asChild
              variant="outlineLight"
              size="xl"
              className="w-full sm:w-auto text-lg font-semibold min-h-[60px] hover:scale-105 transition-transform focus:ring-4 focus:ring-primary/50"
            >
              <Link to="/contact" aria-label="Contact an expert for personalized consultation">
                TALK TO AN EXPERT
              </Link>
            </Button>
          </div>
        </ServiceHero>

        <TrustBar />

        {/* Why Families Trust Section with improved readability */}
        <section className="py-16 bg-background relative overflow-hidden" aria-labelledby="trust-heading">
          <FlowingWaves variant="full" opacity={0.12} aria-hidden="true" />
          <div className="absolute inset-0 opacity-30" aria-hidden="true">
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
            <h2 id="trust-heading" className="text-4xl lg:text-5xl text-center mb-12 animate-fade-in-up font-bold">
              Why Families Trust Secure Senior Safeguard
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <ErrorBoundary>
                <Card
                  className="p-8 hover:shadow-strong transition-all duration-500 hover:-translate-y-2 hover:scale-105 rounded-2xl border-border/50 group animate-fade-in-up bg-gradient-to-br from-card to-card/50 backdrop-blur-sm focus-within:ring-4 focus-within:ring-primary/50"
                  style={{ animationDelay: "0ms" }}
                  role="article"
                  aria-label="Privacy-First Protocols feature"
                >
                  <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                      <Heart
                        className="w-10 h-10 text-primary group-hover:scale-110 transition-transform duration-500"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                  <h3 className="text-2xl mb-4 text-center group-hover:text-primary transition-colors duration-300 font-semibold">
                    Privacy-First Protocols
                  </h3>
                  <p className="text-lg text-muted-foreground text-center leading-relaxed">
                    We NEVER ask for passwords, bank info, or Social Security numbers. Your data stays 100% private. No
                    recording, no data selling.
                  </p>
                </Card>
              </ErrorBoundary>

              <ErrorBoundary>
                <Card
                  className="p-8 hover:shadow-strong transition-all duration-500 hover:-translate-y-2 hover:scale-105 rounded-2xl border-border/50 group animate-fade-in-up bg-gradient-to-br from-card to-card/50 backdrop-blur-sm focus-within:ring-4 focus-within:ring-primary/50"
                  style={{ animationDelay: "100ms" }}
                  role="article"
                  aria-label="Plain-English Teaching feature"
                >
                  <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                      <MessageSquare
                        className="w-10 h-10 text-primary group-hover:scale-110 transition-transform duration-500"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                  <h3 className="text-2xl mb-4 text-center group-hover:text-primary transition-colors duration-300 font-semibold">
                    Plain-English Teaching
                  </h3>
                  <p className="text-lg text-muted-foreground text-center leading-relaxed">
                    No jargon, no condescension. Real-world examples, step-by-step guidance. If you can use email, you
                    can master our training.
                  </p>
                </Card>
              </ErrorBoundary>

              <ErrorBoundary>
                <Card
                  className="p-8 hover:shadow-strong transition-all duration-500 hover:-translate-y-2 hover:scale-105 rounded-2xl border-border/50 group animate-fade-in-up bg-gradient-to-br from-card to-card/50 backdrop-blur-sm focus-within:ring-4 focus-within:ring-primary/50"
                  style={{ animationDelay: "200ms" }}
                  role="article"
                  aria-label="Emergency-Ready Scripts feature"
                >
                  <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                      <FileText
                        className="w-10 h-10 text-primary group-hover:scale-110 transition-transform duration-500"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                  <h3 className="text-2xl mb-4 text-center group-hover:text-primary transition-colors duration-300 font-semibold">
                    Emergency-Ready Scripts
                  </h3>
                  <p className="text-lg text-muted-foreground text-center leading-relaxed">
                    Walk away with word-for-word scripts for bank fraud, IRS scams, and family emergency cons. The
                    60-Second Pause Protocol™ that works.
                  </p>
                </Card>
              </ErrorBoundary>

              <ErrorBoundary>
                <Card
                  className="p-8 hover:shadow-strong transition-all duration-500 hover:-translate-y-2 hover:scale-105 rounded-2xl border-border/50 group animate-fade-in-up bg-gradient-to-br from-card to-card/50 backdrop-blur-sm focus-within:ring-4 focus-within:ring-primary/50"
                  style={{ animationDelay: "300ms" }}
                  role="article"
                  aria-label="Senior-Friendly Design feature"
                >
                  <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                      <Users
                        className="w-10 h-10 text-primary group-hover:scale-110 transition-transform duration-500"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                  <h3 className="text-2xl mb-4 text-center group-hover:text-primary transition-colors duration-300 font-semibold">
                    Senior-Friendly Design
                  </h3>
                  <p className="text-lg text-muted-foreground text-center leading-relaxed">
                    Large text, clear buttons, patient instructors. Designed WITH seniors, not just FOR them. Ages 40-90
                    welcome.
                  </p>
                </Card>
              </ErrorBoundary>
            </div>
          </div>
        </section>

        {/* Three Paths Forward */}
        <ErrorBoundary>
          <ThreePathsForward />
        </ErrorBoundary>

        {/* The 60-Second Pause Protocol with improved visibility */}
        <section className="py-16 bg-background relative overflow-hidden" aria-labelledby="protocol-heading">
          <div className="absolute inset-0 opacity-20" aria-hidden="true">
            <div
              className="absolute top-1/4 right-20 w-64 h-64 bg-accent/30 rounded-full blur-3xl animate-pulse"
              style={{ animationDuration: "5s" }}
            />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-12 animate-fade-in-up">
              <h2 id="protocol-heading" className="text-4xl lg:text-5xl mb-4 font-bold">
                The 60-Second Pause Protocol™
              </h2>
              <p className="text-2xl text-muted-foreground font-medium">Stop Scams Before They Start</p>
            </div>

            <div className="max-w-4xl mx-auto space-y-6">
              {[
                {
                  icon: StopCircle,
                  title: "STOP & BREATHE",
                  desc: "Don't act immediately. Scammers create urgency to bypass your judgment.",
                  step: 1,
                },
                {
                  icon: Search,
                  title: "VERIFY IDENTITY",
                  desc: "Ask specific questions only the real person would know. Demand full name, department, callback number.",
                  step: 2,
                },
                {
                  icon: Phone,
                  title: "CALL BACK OFFICIAL NUMBER",
                  desc: "Use the number on your bank card, official website, or phone book—NEVER the number they give you.",
                  step: 3,
                },
                {
                  icon: Users,
                  title: "USE FAMILY SAFE-WORD",
                  desc: "Establish a secret word/phrase with family. No safe-word? No action.",
                  step: 4,
                },
              ].map((item, index) => (
                <Card
                  key={index}
                  className="p-8 border-2 hover:border-primary transition-all duration-300 hover:shadow-strong hover:-translate-y-1 focus-within:ring-4 focus-within:ring-primary/50"
                  role="article"
                  aria-label={`Step ${item.step}: ${item.title}`}
                >
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white font-bold text-2xl">
                        {item.step}
                      </div>
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center gap-3 mb-3">
                        <item.icon className="w-8 h-8 text-primary" aria-hidden="true" />
                        <h3 className="text-2xl font-bold">{item.title}</h3>
                      </div>
                      <p className="text-lg text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button
                asChild
                variant="default"
                size="lg"
                className="text-lg min-h-[56px] px-8 hover:scale-105 transition-transform focus:ring-4 focus:ring-primary/50"
              >
                <Link to="/resources/pause-protocol" aria-label="Download the complete 60-Second Pause Protocol guide">
                  DOWNLOAD COMPLETE PROTOCOL GUIDE
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Comparison Table with improved contrast */}
        <section className="py-16 bg-muted relative overflow-hidden" aria-labelledby="comparison-heading">
          <div className="container mx-auto px-4 relative z-10">
            <h2 id="comparison-heading" className="text-4xl lg:text-5xl text-center mb-12 animate-fade-in-up font-bold">
              Why Choose Secure Senior Safeguard?
            </h2>
            <div className="overflow-x-auto rounded-xl shadow-strong animate-fade-in-up">
              <table className="w-full bg-card" role="table" aria-label="Comparison of services">
                <thead>
                  <tr className="border-b-2 border-primary">
                    <th scope="col" className="p-6 text-left text-lg font-bold">
                      Your Need
                    </th>
                    <th scope="col" className="p-6 text-left text-lg font-bold">
                      Free Resources
                    </th>
                    <th
                      scope="col"
                      className="p-6 text-left text-lg font-bold bg-gradient-to-r from-primary/10 to-accent/10"
                    >
                      Secure Senior Safeguard
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      need: "Personalized Training",
                      free: "Generic articles",
                      safeguard: "Live Zoom classes tailored to YOUR situation",
                    },
                    {
                      need: "Hands-On Practice",
                      free: "Read and hope",
                      safeguard: "Practice spotting deepfakes & phishing in real-time",
                    },
                    {
                      need: "Ongoing Support",
                      free: "One-time info",
                      safeguard: "Monthly helpline to verify suspicious items",
                    },
                    {
                      need: "Emergency Scripts",
                      free: "Vague advice",
                      safeguard: "Word-for-word scripts you can read during a scam call",
                    },
                    {
                      need: "AI-Specific Training",
                      free: "Limited",
                      safeguard: "Deepfake voice detection, AI image recognition, QR safety",
                    },
                    {
                      need: "Family Plans",
                      free: "Generic",
                      safeguard: "Spouse included FREE in some plans",
                    },
                    {
                      need: "Certificate",
                      free: "None",
                      safeguard: "Digital certificate proving you're trained",
                    },
                  ].map((row, index) => (
                    <tr
                      key={index}
                      className="border-b border-border last:border-0 hover:bg-muted/30 transition-all duration-300 hover:scale-[1.01] group"
                    >
                      <td className="p-6 font-medium text-lg group-hover:text-primary transition-colors duration-300">
                        {row.need}
                      </td>
                      <td className="p-6 text-muted-foreground text-lg">{row.free}</td>
                      <td className="p-6 bg-gradient-to-br from-primary/5 to-accent/5 group-hover:from-primary/10 group-hover:to-accent/10 transition-all duration-300">
                        <div className="flex items-start gap-3">
                          <CheckCircle
                            className="w-6 h-6 text-success flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300"
                            aria-hidden="true"
                          />
                          <span className="text-lg font-medium group-hover:text-foreground transition-colors duration-300">
                            {row.safeguard}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="text-center mt-12">
              <Button
                asChild
                variant="default"
                size="lg"
                className="text-lg min-h-[56px] px-8 hover:scale-105 transition-transform focus:ring-4 focus:ring-primary/50"
              >
                <Link to="/training" aria-label="Compare all our training programs">
                  COMPARE OUR TRAINING PROGRAMS
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Testimonials with lazy loading */}
        <section className="py-16 bg-background relative overflow-hidden" aria-labelledby="testimonials-heading">
          <div className="absolute inset-0 opacity-20" aria-hidden="true">
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
            <h2
              id="testimonials-heading"
              className="text-4xl lg:text-5xl text-center mb-12 animate-fade-in-up font-bold"
            >
              What Our Clients Say
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <ErrorBoundary>
                <div className="animate-fade-in-up" style={{ animationDelay: "0ms" }}>
                  <TestimonialCard
                    name="Mary Thompson"
                    age="68"
                    location="Columbus, OH"
                    quote="I almost fell for a deepfake 'grandson in jail' call. Thanks to the 60-Second Pause Protocol, I stopped, verified, and realized it was a scam. This training saved me $8,000!"
                    image="/assets/testimonial-1.jpg"
                  />
                </div>
              </ErrorBoundary>

              <ErrorBoundary>
                <div className="animate-fade-in-up" style={{ animationDelay: "150ms" }}>
                  <TestimonialCard
                    name="Robert & Linda K."
                    age="72 & 70"
                    location="Dayton, OH"
                    quote="My husband and I took the Flexible Zoom class. The instructor was patient, clear, and funny. We feel 100% safer online now. Worth every penny."
                    image="/assets/testimonial-2.jpg"
                  />
                </div>
              </ErrorBoundary>

              <ErrorBoundary>
                <div className="animate-fade-in-up" style={{ animationDelay: "300ms" }}>
                  <TestimonialCard
                    name="James Patterson"
                    location="Cincinnati"
                    quote="As a small business owner, the pre-purchase consulting saved me from a $7,000 mistake on an AI chatbot. They recommended a better solution at half the cost."
                    image="/assets/testimonial-3.jpg"
                  />
                </div>
              </ErrorBoundary>

              <ErrorBoundary>
                <div className="animate-fade-in-up" style={{ animationDelay: "450ms" }}>
                  <TestimonialCard
                    name="Susan Martinez"
                    age="65"
                    location="Toledo, OH"
                    quote="The Scam Shield service caught a phishing email that looked exactly like my bank. I would have clicked it without thinking. Now I forward anything suspicious before taking action."
                    image="/assets/testimonial-5.jpg"
                  />
                </div>
              </ErrorBoundary>

              <ErrorBoundary>
                <div className="animate-fade-in-up" style={{ animationDelay: "600ms" }}>
                  <TestimonialCard
                    name="William Chen"
                    age="78"
                    location="Akron, OH"
                    quote="I'm not tech-savvy, but the in-person training made everything click. They taught me how to spot AI voice clones and fake videos. My daughter finally stopped worrying about me!"
                    image="/assets/testimonial-6.jpg"
                  />
                </div>
              </ErrorBoundary>

              <ErrorBoundary>
                <div className="animate-fade-in-up" style={{ animationDelay: "750ms" }}>
                  <TestimonialCard
                    name="Jennifer Wallace"
                    age="58"
                    location="Cleveland, OH"
                    quote="After my mother nearly lost $15,000 to a scammer, I signed our whole family up for training. It's been a lifesaver. Everyone knows the 60-Second Pause Protocol now."
                    image="/assets/testimonial-7.jpg"
                  />
                </div>
              </ErrorBoundary>
            </div>
          </div>
        </section>

        {/* Video Testimonials - Lazy Loaded */}
        <ErrorBoundary>
          <Suspense fallback={<LoadingFallback />}>
            <VideoTestimonials />
          </Suspense>
        </ErrorBoundary>

        {/* FAQ Section */}
        <section className="py-16 bg-muted relative overflow-hidden" aria-labelledby="faq-heading">
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-12">
              <h2 id="faq-heading" className="text-4xl lg:text-5xl mb-4 font-bold">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-muted-foreground">Get answers to common questions about our services</p>
            </div>
            <div className="max-w-3xl mx-auto">
              <Card className="p-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Is this service really for seniors?</h3>
                    <p className="text-lg text-muted-foreground">
                      Yes! Everything is designed with seniors in mind - large text, simple navigation, patient support,
                      and no technical jargon.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Do I need to be tech-savvy?</h3>
                    <p className="text-lg text-muted-foreground">
                      Not at all. If you can use email or make a phone call, you can use our services. We start with the
                      basics and go at your pace.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">What if I can't attend live training?</h3>
                    <p className="text-lg text-muted-foreground">
                      We offer recorded sessions, self-paced learning materials, and one-on-one phone consultations to
                      fit your schedule.
                    </p>
                  </div>
                </div>
                <div className="mt-8 text-center">
                  <Button
                    asChild
                    variant="default"
                    size="lg"
                    className="text-lg min-h-[56px] px-8 hover:scale-105 transition-transform focus:ring-4 focus:ring-primary/50"
                  >
                    <Link to="/faq" aria-label="View all frequently asked questions">
                      VIEW ALL FAQs
                    </Link>
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Educational Videos - Lazy Loaded */}
        <ErrorBoundary>
          <Suspense fallback={<LoadingFallback />}>
            <EducationalVideos />
          </Suspense>
        </ErrorBoundary>

        {/* AI Partners Carousel - Lazy Loaded */}
        <ErrorBoundary>
          <Suspense fallback={<LoadingFallback />}>
            <AIPartnersCarousel />
          </Suspense>
        </ErrorBoundary>

        {/* Newsletter Subscribe */}
        <ErrorBoundary>
          <NewsletterSubscribe />
        </ErrorBoundary>

        {/* Final CTA with improved accessibility */}
        <CTASection headline="Ready to Protect Your Family?" variant="gold" aria-label="Final call to action section">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              variant="outlineLight"
              size="xl"
              className="w-full sm:w-auto text-lg font-semibold min-h-[60px] hover:scale-105 transition-transform focus:ring-4 focus:ring-primary/50"
            >
              <Link to="/resources" aria-label="Download free security checklist">
                GET FREE SECURITY CHECKLIST
              </Link>
            </Button>
          </div>
        </CTASection>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
