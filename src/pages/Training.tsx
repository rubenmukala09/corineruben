import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Shield, 
  Users, 
  Award, 
  CheckCircle, 
  Clock, 
  Target,
  BookOpen,
  Video,
  FileText,
  Headphones,
  TrendingUp,
  Lock,
  AlertTriangle,
  Zap,
  Star,
  ArrowRight,
  Play,
  Mail
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import TrustBar from "@/components/TrustBar";
import { ScrollReveal } from "@/components/ScrollReveal";
import { TrustIndicator } from "@/components/TrustIndicator";
import { BookingModal } from "@/components/BookingModal";
import { SubscriptionDialog } from "@/components/SubscriptionDialog";
import { CustomTrainingDialog } from "@/components/CustomTrainingDialog";
import { VideoLightbox } from "@/components/VideoLightbox";
import { TrainingHeroCarousel } from "@/components/TrainingHeroCarousel";
import { SEO } from "@/components/SEO";
import { useSmoothAnchorScroll } from "@/hooks/useSmoothAnchorScroll";
import { useToast } from "@/hooks/use-toast";

interface VideoData {
  src: string;
  title: string;
}

const LearnAndTrain = () => {
  useSmoothAnchorScroll();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string>("");
  const [subscriptionDialogOpen, setSubscriptionDialogOpen] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState<any>(null);
  const [customTrainingOpen, setCustomTrainingOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<VideoData | null>(null);
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleBooking = (service: string) => {
    setSelectedService(service);
    setModalOpen(true);
  };

  const handleSubscribe = (plan: any) => {
    // Transform plan data to match SubscriptionDialog props
    setSelectedSubscription({
      priceId: plan.priceId || 'price_placeholder', // This should be set with actual Stripe price IDs
      serviceName: 'ScamShield Protection',
      planTier: plan.name,
      amount: parseFloat(plan.price.replace('$', '')) * 100 // Convert to cents
    });
    setSubscriptionDialogOpen(true);
  };

  const handleNewsletterSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({
        title: "Success!",
        description: "You've been subscribed to our newsletter.",
      });
      setEmail("");
    }
  };

  // Training courses with Stripe price IDs for one-time purchases
  const trainingCourses = [
    {
      icon: Users,
      title: "Individual Training",
      badge: "INDIVIDUAL",
      description: "One-on-one scam prevention coaching",
      features: [
        "1 hour private session",
        "Personalized assessment",
        "Customized safety plan",
        "Digital resources included",
        "30-day email support"
      ],
      price: "$89",
      priceId: "price_1SZxa5J8osfwYbX7CgL0vdFy",
      duration: "1 hour",
      popular: false
    },
    {
      icon: Users,
      title: "Family Training",
      badge: "FAMILY",
      description: "Comprehensive training for the whole family",
      features: [
        "Up to 5 family members",
        "2-hour interactive session",
        "Age-appropriate content",
        "Family safety plan",
        "60-day support access"
      ],
      price: "$199",
      priceId: "price_1SZxa5J8osfwYbX7XTUX2tyN",
      duration: "2 hours",
      popular: true
    },
    {
      icon: Users,
      title: "Senior Group Training",
      badge: "SENIOR GROUP",
      description: "Group training for senior centers & communities",
      features: [
        "Up to 20 participants",
        "3-hour workshop",
        "Hands-on practice",
        "Printed materials included",
        "Q&A session",
        "90-day support"
      ],
      price: "$399",
      priceId: "price_1SZxa6J8osfwYbX7HnPWSvR8",
      duration: "3 hours",
      popular: false
    },
    {
      icon: Shield,
      title: "Healthcare Professional",
      badge: "HEALTHCARE",
      description: "Specialized training for healthcare staff",
      features: [
        "HIPAA-aware content",
        "Patient protection focus",
        "Compliance documentation",
        "Staff certification",
        "90-day priority support"
      ],
      price: "$299",
      priceId: "price_1SZxa7J8osfwYbX7AQp1WI2k",
      duration: "2 hours",
      popular: false
    },
    {
      icon: Target,
      title: "Enterprise Training",
      badge: "ENTERPRISE",
      description: "Comprehensive corporate training program",
      features: [
        "Up to 50 employees",
        "Custom curriculum",
        "On-site or virtual",
        "Compliance reporting",
        "Dedicated account manager",
        "1-year support"
      ],
      price: "$599",
      priceId: "price_1SZxa8J8osfwYbX7KsjRmalt",
      duration: "Full day",
      popular: false
    },
    {
      icon: Users,
      title: "Spanish Language Training",
      badge: "ESPAÑOL",
      description: "Capacitación en español para familias",
      features: [
        "Sesión de 1 hora",
        "Material en español",
        "Plan de seguridad familiar",
        "Soporte por email",
        "Recursos digitales"
      ],
      price: "$89",
      priceId: "price_1SZxa8J8osfwYbX7I9UDX9Ex",
      duration: "1 hora",
      popular: false
    }
  ];

  const learningResources = [
    {
      icon: Video,
      title: "Video Tutorials",
      description: "Step-by-step guides on identifying and avoiding scams",
      count: "25+ videos"
    },
    {
      icon: FileText,
      title: "Security Guides",
      description: "Downloadable PDFs covering essential cybersecurity topics",
      count: "15+ guides"
    },
    {
      icon: BookOpen,
      title: "Case Studies",
      description: "Real-world examples of scams and how to prevent them",
      count: "30+ cases"
    },
    {
      icon: Headphones,
      title: "Podcast Series",
      description: "Expert interviews and discussions on digital safety",
      count: "50+ episodes"
    }
  ];

  const scamShieldFeatures = [
    {
      icon: Shield,
      title: "24/7 Monitoring",
      description: "Round-the-clock protection against emerging threats"
    },
    {
      icon: AlertTriangle,
      title: "Real-time Alerts",
      description: "Instant notifications about potential security risks"
    },
    {
      icon: Lock,
      title: "Identity Protection",
      description: "Safeguard your personal information from theft"
    },
    {
      icon: Zap,
      title: "Quick Response",
      description: "Immediate action when threats are detected"
    }
  ];

  const protectionPlans = [
    {
      name: "Starter Plan",
      badge: "STARTER",
      price: "$39",
      period: "/month",
      priceId: "price_1SZxa9J8osfwYbX7tTp519zb",
      description: "Essential protection for individuals",
      features: [
        "Basic threat monitoring",
        "Email alerts",
        "Monthly security reports",
        "Access to learning resources",
        "Community forum access"
      ],
      popular: false,
      cta: "Get Started"
    },
    {
      name: "Family Plan",
      badge: "FAMILY",
      price: "$79",
      period: "/month",
      priceId: "price_1SZxaAJ8osfwYbX7ipmpazSu",
      description: "Comprehensive protection for up to 5 family members",
      features: [
        "Everything in Starter",
        "Cover up to 5 people",
        "Priority email support",
        "Dark web monitoring",
        "Identity theft insurance ($25K)",
        "Weekly security reports"
      ],
      popular: true,
      cta: "Most Popular"
    },
    {
      name: "Premium Plan",
      badge: "PREMIUM",
      price: "$129",
      period: "/month",
      priceId: "price_1SZxaBJ8osfwYbX7K5kna9vJ",
      description: "Maximum protection with white-glove service",
      features: [
        "Everything in Family",
        "Cover up to 10 people",
        "24/7 phone support",
        "Personal security advisor",
        "Identity theft insurance ($100K)",
        "Credit monitoring",
        "Lost wallet assistance"
      ],
      popular: false,
      cta: "Go Premium"
    },
    {
      name: "Custom Plan",
      badge: "CUSTOM",
      price: "$229",
      period: "/month",
      priceId: "price_1SZxabJ8osfwYbX7SYkV6ZFi",
      description: "Tailored protection for unique needs",
      features: [
        "Everything in Premium",
        "Custom monitoring rules",
        "Dedicated account manager",
        "Priority response team",
        "Identity theft insurance ($250K)",
        "Full family coverage",
        "Annual security audit"
      ],
      popular: false,
      cta: "Contact Us"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Small Business Owner",
      content: "The training helped my team identify and prevent a phishing attack that could have cost us thousands. Highly recommended!",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Retiree",
      content: "As a senior, I was worried about online scams. The one-on-one training gave me confidence to use technology safely.",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "HR Manager",
      content: "We've made this training mandatory for all employees. The ROI in terms of prevented incidents has been incredible.",
      rating: 5
    }
  ];

  const stats = [
    { number: "10,000+", label: "People Trained" },
    { number: "98%", label: "Satisfaction Rate" },
    { number: "500+", label: "Scams Prevented" },
    { number: "24/7", label: "Support Available" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Learn & Train - AI Scam Protection Training"
        description="Comprehensive AI scam protection training for families and seniors. Learn to spot deepfakes, phishing, and AI-powered scams. Zoom and in-person classes available."
        keywords="AI scam training, deepfake detection, senior cybersecurity, phishing awareness, family protection, Dayton Ohio"
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Learn & Train", url: "/training" }
        ]}
      />
      <Navigation />
      
      {/* Hero Carousel Section */}
      <TrainingHeroCarousel />

      <TrustBar />

      {/* Stats */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <ScrollReveal key={index} animation="fade-up" delay={index * 100}>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why Training Matters Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <ScrollReveal animation="fade-up">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Why Cybersecurity Training Matters
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                In today's digital world, knowledge is your best defense against cyber threats
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: TrendingUp,
                title: "Rising Threats",
                description: "Cyber attacks increase by 67% annually, targeting individuals and businesses alike"
              },
              {
                icon: Shield,
                title: "Prevention is Key",
                description: "95% of security breaches are caused by human error - training reduces this risk"
              },
              {
                icon: Award,
                title: "Stay Ahead",
                description: "Regular training keeps you updated on the latest scam tactics and protection methods"
              }
            ].map((item, index) => (
              <ScrollReveal key={index} animation="fade-up" delay={index * 100}>
                <Card className="p-6 h-full hover:shadow-strong transition-all duration-300 hover:-translate-y-1">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Training Programs Section */}
      <section id="training" className="py-20 scroll-mt-20">
        <div className="container mx-auto px-4">
          <ScrollReveal animation="fade-up">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Choose Your Training Program
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Flexible options designed to meet your specific needs and schedule
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {trainingCourses.map((course, index) => (
              <ScrollReveal key={index} animation="fade-up" delay={index * 100}>
                <Card className={`p-8 h-full flex flex-col hover:shadow-strong transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] rounded-2xl ${
                  course.popular ? 'border-primary border-2 relative' : 'border-border/50'
                } bg-gradient-to-br from-card to-card/50 relative`}>
                  {course.badge && (
                    <div className="absolute top-3 right-3 z-10">
                      <Badge variant="default" className="text-xs font-bold">{course.badge}</Badge>
                    </div>
                  )}
                  {course.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <Badge variant="default" className="text-xs font-bold shadow-lg">
                        <Star className="w-3 h-3 mr-1" />
                        MOST POPULAR
                      </Badge>
                    </div>
                  )}
                  
                  <div className="mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                      <course.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{course.title}</h3>
                    <p className="text-muted-foreground mb-4">{course.description}</p>
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-3xl font-bold text-primary">{course.price}</span>
                      {course.priceId && (
                        <span className="text-muted-foreground">/session</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>{course.duration}</span>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6 flex-grow">
                    {course.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button 
                    onClick={() => handleBooking(course.title)}
                    variant={course.popular ? "default" : "outline"}
                    size="lg"
                    className="w-full group"
                  >
                    Book {course.title}
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* What You'll Learn Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <ScrollReveal animation="fade-up">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                What You'll Learn
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Comprehensive curriculum covering all aspects of digital safety
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { title: "Phishing Detection", description: "Identify suspicious emails and messages" },
              { title: "Password Security", description: "Create and manage strong passwords" },
              { title: "Social Engineering", description: "Recognize manipulation tactics" },
              { title: "Safe Browsing", description: "Navigate the web securely" },
              { title: "Mobile Security", description: "Protect your smartphone and tablets" },
              { title: "Identity Protection", description: "Safeguard personal information" },
              { title: "Scam Recognition", description: "Spot common fraud schemes" },
              { title: "Incident Response", description: "What to do if you're targeted" }
            ].map((topic, index) => (
              <ScrollReveal key={index} animation="fade-up" delay={index * 50}>
                <Card className="p-6 hover:shadow-strong transition-all duration-300 hover:-translate-y-1">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                    <CheckCircle className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-bold mb-2">{topic.title}</h3>
                  <p className="text-sm text-muted-foreground">{topic.description}</p>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Resources Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <ScrollReveal animation="fade-up">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Free Learning Resources
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Access our library of educational materials to enhance your cybersecurity knowledge
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {learningResources.map((resource, index) => (
              <ScrollReveal key={index} animation="fade-up" delay={index * 100}>
                <Card className="p-6 hover:shadow-strong transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <resource.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{resource.title}</h3>
                  <p className="text-muted-foreground mb-3">{resource.description}</p>
                  <div className="text-sm font-semibold text-primary">{resource.count}</div>
                </Card>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal animation="fade-up" delay={400}>
            <div className="text-center mt-12">
              <Button asChild size="lg" variant="outline">
                <Link to="/resources">
                  Browse All Resources
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Veterans Discount Banner - Smaller & Compact */}
      <section className="py-3 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="container mx-auto px-4">
          <Card className="p-3 bg-card/50 backdrop-blur-sm border-primary/20 max-w-2xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-2 text-center md:text-left">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-lg">
                  🇺🇸
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-bold">Veterans & First Responders Save 10%</h3>
              </div>
              <Button variant="default" size="sm" asChild>
                <Link to="/resources">Claim Discount</Link>
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* ScamShield Protection Section */}
      <section id="pricing" className="py-20 scroll-mt-20">
        <div className="container mx-auto px-4">
          <ScrollReveal animation="fade-up">
            <div className="text-center mb-16">
              <Badge variant="secondary" className="mb-4">
                <Shield className="w-4 h-4 mr-2" />
                ScamShield Protection
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                24/7 Protection Against Digital Threats
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                ScamShield is our comprehensive protection service that monitors, alerts, and responds to potential threats in real-time. Get peace of mind knowing you're protected around the clock.
              </p>
            </div>
          </ScrollReveal>

          {/* ScamShield Features */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-16">
            {scamShieldFeatures.map((feature, index) => (
              <ScrollReveal key={index} animation="fade-up" delay={index * 100}>
                <Card className="p-6 text-center hover:shadow-strong transition-all duration-300 hover:-translate-y-1">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-bold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </Card>
              </ScrollReveal>
            ))}
          </div>

          {/* Protection Plans */}
          <ScrollReveal animation="fade-up">
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-12">
              Choose Your Protection Plan
            </h3>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {protectionPlans.map((plan, index) => (
              <ScrollReveal key={index} animation="fade-up" delay={index * 100}>
                <Card
                  className={`p-8 hover:shadow-strong transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] rounded-2xl border-border/50 animate-fade-in-up bg-gradient-to-br from-card to-card/50 relative ${
                    plan.popular ? 'border-primary border-2' : ''
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="absolute top-3 right-3 z-10">
                    <Badge variant="default" className="text-xs font-bold">{plan.badge}</Badge>
                  </div>
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <Badge variant="default" className="text-xs font-bold shadow-lg">
                        <Star className="w-3 h-3 mr-1" />
                        MOST POPULAR
                      </Badge>
                    </div>
                  )}

                  <div className="mb-6">
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <p className="text-muted-foreground mb-4">{plan.description}</p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold text-primary">{plan.price}</span>
                      <span className="text-muted-foreground">{plan.period}</span>
                    </div>
                  </div>

                  <div className="space-y-3 mb-8">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button
                    onClick={() => handleSubscribe(plan)}
                    variant={plan.popular ? "default" : "outline"}
                    size="lg"
                    className="w-full group"
                  >
                    {plan.cta}
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Card>
              </ScrollReveal>
            ))}
          </div>

          {/* Disclaimers */}
          <ScrollReveal animation="fade-up" delay={300}>
            <div className="mt-12 max-w-4xl mx-auto">
              <Card className="p-6 bg-muted/50">
                <h4 className="font-bold mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-primary" />
                  Important Information
                </h4>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>• All protection plans include a 30-day money-back guarantee</p>
                  <p>• Identity theft insurance is underwritten by a licensed insurance carrier</p>
                  <p>• Coverage limits and terms apply - see full policy details</p>
                  <p>• Prices shown are for annual billing; monthly billing available at higher rates</p>
                  <p>• Service availability may vary by location</p>
                </div>
              </Card>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Newsletter Signup Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-accent/10 to-background">
        <div className="container mx-auto px-4">
          <ScrollReveal animation="fade-up">
            <Card className="max-w-3xl mx-auto p-8 md:p-12 text-center bg-card/50 backdrop-blur-sm">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-6">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Stay Informed About Latest Threats
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Subscribe to our newsletter for weekly security tips, scam alerts, and exclusive training offers
              </p>
              <form onSubmit={handleNewsletterSignup} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1"
                />
                <Button type="submit" size="lg">
                  Subscribe
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </form>
              <p className="text-xs text-muted-foreground mt-4">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </Card>
          </ScrollReveal>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <ScrollReveal animation="fade-up">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                What Our Clients Say
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Real stories from people we've helped protect
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <ScrollReveal key={index} animation="fade-up" delay={index * 100}>
                <Card className="p-6 hover:shadow-strong transition-all duration-300 hover:-translate-y-1">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 italic">"{testimonial.content}"</p>
                  <div>
                    <div className="font-bold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary via-accent to-primary text-white">
        <div className="container mx-auto px-4">
          <ScrollReveal animation="fade-up">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Enhance Your Digital Security?
              </h2>
              <p className="text-xl mb-8 text-white/90">
                Join thousands of individuals and businesses who trust us to keep them safe online
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={() => {
                    document.getElementById('training')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  size="xl" 
                  variant="secondary"
                  className="group"
                >
                  Book Training Now
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button 
                  onClick={() => {
                    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  size="xl" 
                  variant="outline"
                  className="bg-white/10 hover:bg-white/20 text-white border-white/30 group"
                >
                  View Protection Plans
                  <Shield className="w-5 h-5 ml-2 group-hover:scale-110 transition-transform" />
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <CustomTrainingDialog 
        open={customTrainingOpen}
        onOpenChange={setCustomTrainingOpen}
      />

      <BookingModal 
        open={modalOpen}
        onOpenChange={setModalOpen}
        serviceType="training"
        serviceName={selectedService}
      />

      {selectedSubscription && (
        <SubscriptionDialog
          open={subscriptionDialogOpen}
          onOpenChange={setSubscriptionDialogOpen}
          priceId={selectedSubscription.priceId}
          serviceName={selectedSubscription.serviceName}
          planTier={selectedSubscription.planTier}
          amount={selectedSubscription.amount}
        />
      )}

      {selectedVideo && (
        <VideoLightbox
          videoSrc={selectedVideo.src}
          title={selectedVideo.title}
          isOpen={true}
          onClose={() => setSelectedVideo(null)}
        />
      )}

      <Footer />
    </div>
  );
}

export default LearnAndTrain;
