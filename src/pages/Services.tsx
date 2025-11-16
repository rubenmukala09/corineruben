import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import CTASection from "@/components/CTASection";
import TestimonialCard from "@/components/TestimonialCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SEO } from "@/components/SEO";
import { supabase } from "@/integrations/supabase/client";
import { trackButtonClick } from "@/utils/analyticsTracker";
import {
  Shield,
  Bot,
  GraduationCap,
  Lock,
  CheckCircle,
  Users,
  Building2,
  Heart,
  Clock,
  Award,
  TrendingUp,
  Search,
  Phone,
  Mail,
  ArrowRight,
  Zap,
  Target,
  BarChart,
} from "lucide-react";
import heroServices1 from "@/assets/hero-services-1.jpg";
import heroServices2 from "@/assets/hero-services-2.jpg";
import heroServices3 from "@/assets/hero-services-3.jpg";
import heroServices4 from "@/assets/hero-services-4.jpg";
import heroServices5 from "@/assets/hero-services-5.jpg";

const Services = () => {
  const [isMonthly, setIsMonthly] = useState(true);
  const [testimonials, setTestimonials] = useState<any[]>([]);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .eq("status", "approved")
        .eq("featured", true)
        .order("created_at", { ascending: false })
        .limit(3);

      if (error) throw error;
      setTestimonials(data || []);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    }
  };

  const services = [
    {
      icon: Shield,
      title: "ScamShield Protection",
      subtitle: "For Individuals & Families",
      description: "Comprehensive real-time protection against scams, fraud, and identity theft for you and your loved ones.",
      features: [
        "24/7 AI-powered scam monitoring",
        "Real-time fraud alerts",
        "Identity theft protection",
        "Senior-focused safety measures",
        "Family protection plans",
        "Personal safety training",
      ],
      priceMonthly: 29,
      priceAnnual: 290,
      link: "/training",
      color: "from-primary to-accent",
      popular: false,
    },
    {
      icon: Bot,
      title: "AI Business Solutions",
      subtitle: "For Businesses & Organizations",
      description: "Transform your business with custom AI integration, workflow automation, and comprehensive employee training.",
      features: [
        "Custom AI integration",
        "Workflow automation",
        "Employee cybersecurity training",
        "Advanced threat detection",
        "Compliance management",
        "Dedicated account manager",
      ],
      priceMonthly: 499,
      priceAnnual: 4990,
      link: "/business",
      color: "from-accent to-primary",
      popular: true,
    },
    {
      icon: GraduationCap,
      title: "Training Programs",
      subtitle: "For Education & Community",
      description: "Empowering workshops and training sessions for seniors, organizations, and community groups.",
      features: [
        "Senior safety workshops",
        "Corporate training sessions",
        "Community education programs",
        "Hands-on learning materials",
        "Certification programs",
        "Ongoing support resources",
      ],
      priceMonthly: 99,
      priceAnnual: 990,
      link: "/training",
      color: "from-primary to-primary",
      popular: false,
    },
    {
      icon: Lock,
      title: "Safety Vault",
      subtitle: "Secure Password Management",
      description: "Military-grade encrypted password storage with family sharing and emergency access features.",
      features: [
        "Encrypted password storage",
        "Secure data vault",
        "Family sharing options",
        "Emergency access protocols",
        "Multi-device sync",
        "Biometric authentication",
      ],
      priceMonthly: 19,
      priceAnnual: 190,
      link: "/safety-vault",
      color: "from-accent to-accent",
      popular: false,
    },
  ];

  const comparisons = [
    { feature: "Scam Detection & Alerts", scamshield: true, business: true, training: true, vault: false },
    { feature: "AI-Powered Protection", scamshield: true, business: true, training: false, vault: false },
    { feature: "24/7 Monitoring", scamshield: true, business: true, training: false, vault: true },
    { feature: "Custom Integration", scamshield: false, business: true, training: false, vault: false },
    { feature: "Workflow Automation", scamshield: false, business: true, training: false, vault: false },
    { feature: "Training & Workshops", scamshield: true, business: true, training: true, vault: false },
    { feature: "Password Management", scamshield: false, business: false, training: false, vault: true },
    { feature: "Family Sharing", scamshield: true, business: false, training: false, vault: true },
    { feature: "Dedicated Support", scamshield: false, business: true, training: false, vault: false },
  ];

  const faqs = [
    {
      question: "What's included in the ScamShield Protection?",
      answer: "ScamShield includes 24/7 AI-powered monitoring, real-time fraud alerts, identity theft protection, personal safety training, and dedicated support for seniors and families.",
    },
    {
      question: "Can I switch between plans?",
      answer: "Yes! You can upgrade or change your plan at any time. If you upgrade, you'll only pay the prorated difference. Downgrades take effect at the next billing cycle.",
    },
    {
      question: "Do you offer enterprise solutions?",
      answer: "Absolutely! Our AI Business Solutions are fully customizable for enterprise needs, including custom integration, dedicated account management, and volume pricing.",
    },
    {
      question: "Is there a contract or can I cancel anytime?",
      answer: "All our services are month-to-month with no long-term contracts. You can cancel anytime with no cancellation fees. Annual plans offer significant savings and include a 30-day money-back guarantee.",
    },
    {
      question: "What kind of training do you provide?",
      answer: "We offer hands-on workshops for seniors, corporate cybersecurity training, community education programs, and customized training sessions tailored to your organization's specific needs.",
    },
    {
      question: "How secure is the Safety Vault?",
      answer: "Safety Vault uses military-grade AES-256 encryption, zero-knowledge architecture (we can't see your passwords), biometric authentication, and multi-factor authentication to ensure maximum security.",
    },
  ];

  const benefits = [
    {
      icon: Target,
      title: "Tailored Solutions",
      description: "Every service is customized to meet your specific needs and circumstances.",
    },
    {
      icon: Users,
      title: "Expert Team",
      description: "Our team of cybersecurity analysts, nurses, and educators bring diverse expertise.",
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Round-the-clock monitoring and support when you need it most.",
    },
    {
      icon: Award,
      title: "Proven Results",
      description: "Thousands of families and businesses protected from scams and fraud.",
    },
    {
      icon: TrendingUp,
      title: "Continuous Improvement",
      description: "We constantly update our AI models and training to stay ahead of threats.",
    },
    {
      icon: Heart,
      title: "Mission-Driven",
      description: "Founded by scam victims, we're passionate about protecting others.",
    },
  ];

  const servicesHeroImages = [
    { src: heroBusinessProfessional, alt: "Professional services for your business" },
    { src: officeWorkspace, alt: "Modern workspace solutions" },
    { src: businessCollaboration, alt: "Collaborative service delivery" },
    { src: teamMember1, alt: "Expert team member ready to assist" },
    { src: heroBusinessNew, alt: "Innovative service offerings" }
  ];

  return (
    <>
      <SEO
        title="Our Services - Comprehensive Protection Solutions"
        description="Explore InVision Network's complete range of cybersecurity services: ScamShield Protection, AI Business Solutions, Training Programs, and Safety Vault. Protect what matters most."
        keywords="cybersecurity services, scam protection, AI business solutions, security training, password management, fraud prevention"
      />
      
      <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
        <Navigation />
        
        <Hero
          backgroundImages={servicesHeroImages}
          headline="Comprehensive Protection for Everyone"
          subheadline="From individuals to enterprises, we provide tailored cybersecurity solutions that protect what matters most to you."
          showScrollIndicator
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
            <Button
              size="lg"
              className="group"
              asChild
            >
              <Link to="#services" onClick={() => trackButtonClick("Explore Services", "Services Hero")}>
                Explore Services
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
            >
              <Link to="/contact" onClick={() => trackButtonClick("Contact Sales", "Services Hero")}>
                Contact Sales
              </Link>
            </Button>
          </div>
        </Hero>

        {/* Benefits Section */}
        <section className="py-12 md:py-16 lg:py-20 bg-background">
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                  Why Choose InVision Network?
                </h2>
                <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                  We're not just a service provider—we're your partners in digital safety.
                </p>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {benefits.map((benefit, index) => (
                <ScrollReveal key={index} delay={index * 100}>
                  <Card className="h-full hover:shadow-strong transition-all duration-300">
                    <CardHeader>
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4`}>
                        <benefit.icon className="h-6 w-6 text-primary-foreground" />
                      </div>
                      <CardTitle className="text-xl">{benefit.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{benefit.description}</p>
                    </CardContent>
                  </Card>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section id="services" className="py-12 md:py-16 lg:py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                  Our Services
                </h2>
                <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                  Choose the perfect protection plan for your needs
                </p>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
              {services.map((service, index) => (
                <ScrollReveal key={index} delay={index * 100}>
                  <Card className={`h-full flex flex-col relative overflow-hidden ${service.popular ? 'border-primary shadow-strong' : ''}`}>
                    {service.popular && (
                      <div className="absolute top-4 right-4">
                        <Badge variant="premium" className="text-xs font-bold">
                          MOST POPULAR
                        </Badge>
                      </div>
                    )}
                    
                    <CardHeader>
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4`}>
                        <service.icon className="h-7 w-7 text-primary-foreground" />
                      </div>
                      <CardTitle className="text-2xl">{service.title}</CardTitle>
                      <CardDescription className="text-base font-medium">
                        {service.subtitle}
                      </CardDescription>
                      <p className="text-muted-foreground mt-2">{service.description}</p>
                    </CardHeader>

                    <CardContent className="flex-1 flex flex-col">
                      <div className="mb-6">
                        <div className="flex items-baseline gap-2">
                          <span className="text-4xl font-bold">
                            ${isMonthly ? service.priceMonthly : Math.round(service.priceAnnual / 12)}
                          </span>
                          <span className="text-muted-foreground">/month</span>
                        </div>
                        {!isMonthly && (
                          <p className="text-sm text-success mt-1">
                            Save ${(service.priceMonthly * 12) - service.priceAnnual}/year
                          </p>
                        )}
                      </div>

                      <ul className="space-y-3 mb-6 flex-1">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <Button
                        className="w-full"
                        variant={service.popular ? "default" : "outline"}
                        asChild
                      >
                        <Link 
                          to={service.link}
                          onClick={() => trackButtonClick(`Learn More - ${service.title}`, "Services Grid")}
                        >
                          Learn More
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </ScrollReveal>
              ))}
            </div>

            {/* Billing Toggle */}
            <ScrollReveal delay={400}>
              <div className="flex items-center justify-center gap-4 mt-12">
                <Label htmlFor="billing-toggle" className={isMonthly ? "font-semibold" : ""}>
                  Monthly
                </Label>
                <Switch
                  id="billing-toggle"
                  checked={!isMonthly}
                  onCheckedChange={(checked) => setIsMonthly(!checked)}
                />
                <Label htmlFor="billing-toggle" className={!isMonthly ? "font-semibold" : ""}>
                  Annual <Badge variant="success" className="ml-2">Save up to 20%</Badge>
                </Label>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-12 md:py-16 lg:py-20 bg-background">
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                  Compare Services
                </h2>
                <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                  Find the perfect match for your needs
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="max-w-5xl mx-auto overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b-2 border-border">
                      <th className="text-left py-4 px-4 font-semibold">Feature</th>
                      <th className="text-center py-4 px-4 font-semibold">ScamShield</th>
                      <th className="text-center py-4 px-4 font-semibold">AI Business</th>
                      <th className="text-center py-4 px-4 font-semibold">Training</th>
                      <th className="text-center py-4 px-4 font-semibold">Vault</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisons.map((row, index) => (
                      <tr key={index} className="border-b border-border hover:bg-muted/50 transition-colors">
                        <td className="py-4 px-4">{row.feature}</td>
                        <td className="text-center py-4 px-4">
                          {row.scamshield ? (
                            <CheckCircle className="h-5 w-5 text-success mx-auto" />
                          ) : (
                            <span className="text-muted-foreground">—</span>
                          )}
                        </td>
                        <td className="text-center py-4 px-4">
                          {row.business ? (
                            <CheckCircle className="h-5 w-5 text-success mx-auto" />
                          ) : (
                            <span className="text-muted-foreground">—</span>
                          )}
                        </td>
                        <td className="text-center py-4 px-4">
                          {row.training ? (
                            <CheckCircle className="h-5 w-5 text-success mx-auto" />
                          ) : (
                            <span className="text-muted-foreground">—</span>
                          )}
                        </td>
                        <td className="text-center py-4 px-4">
                          {row.vault ? (
                            <CheckCircle className="h-5 w-5 text-success mx-auto" />
                          ) : (
                            <span className="text-muted-foreground">—</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Testimonials */}
        {testimonials.length > 0 && (
          <section className="py-12 md:py-16 lg:py-20 bg-muted/30">
            <div className="container mx-auto px-4">
              <ScrollReveal>
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                    What Our Clients Say
                  </h2>
                  <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                    Real stories from real people we've protected
                  </p>
                </div>
              </ScrollReveal>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {testimonials.map((testimonial, index) => (
                  <ScrollReveal key={testimonial.id} delay={index * 100}>
                    <TestimonialCard
                      name={testimonial.name}
                      location={testimonial.location || "Client"}
                      quote={testimonial.content}
                      rating={testimonial.rating}
                      image={testimonial.image_url || "/placeholder.svg"}
                    />
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* FAQ Section */}
        <section className="py-12 md:py-16 lg:py-20 bg-background">
          <div className="container mx-auto px-4">
            <ScrollReveal>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                  Frequently Asked Questions
                </h2>
                <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                  Everything you need to know about our services
                </p>
              </div>
            </ScrollReveal>

            <div className="max-w-3xl mx-auto space-y-6">
              {faqs.map((faq, index) => (
                <ScrollReveal key={index} delay={index * 50}>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">{faq.question}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </CardContent>
                  </Card>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <CTASection
          headline="Ready to Get Protected?"
          description="Choose your service and start protecting what matters most today. No contracts, cancel anytime."
          variant="gold"
        >
          <Button
            size="lg"
            variant="secondary"
            asChild
          >
            <Link to="/contact" onClick={() => trackButtonClick("Contact Sales", "Services CTA")}>
              <Phone className="mr-2 h-5 w-5" />
              Contact Sales
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            asChild
          >
            <Link to="/training" onClick={() => trackButtonClick("Explore Training", "Services CTA")}>
              <GraduationCap className="mr-2 h-5 w-5" />
              Explore Training
            </Link>
          </Button>
        </CTASection>

        <Footer />
      </div>
    </>
  );
};

export default Services;
