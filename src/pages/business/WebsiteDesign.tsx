import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Globe,
  Smartphone,
  Search,
  Zap,
  Shield,
  Palette,
  CheckCircle2,
  ArrowRight,
  Star,
  Clock,
  Code,
  Users,
  Award,
  TrendingUp,
  HeartHandshake,
  Sparkles,
  Rocket,
  Target,
  Layers,
} from "lucide-react";
import { AnimatedSection } from "@/components/AnimatedSection";

type SpecialtyKey =
  | "animation"
  | "interactions"
  | "cms"
  | "ecommerce"
  | "portfolio";

interface SpecialtyCategory {
  key: SpecialtyKey;
  title: string;
  description: string;
  tags: string[];
}

const specialtyCategories: SpecialtyCategory[] = [
  {
    key: "animation",
    title: "Animation",
    description:
      "Intentional motion patterns for loading states, content reveals, and micro-feedback.",
    tags: [
      "Preload Animation",
      "Button Animation",
      "SVG Animation",
      "Loop Animation",
      "Scroll Animation",
      "Image Animation",
      "Text Animation",
      "Letter Animation",
    ],
  },
  {
    key: "interactions",
    title: "Interactions",
    description:
      "High-clarity interaction design for desktop and mobile browsing behavior.",
    tags: [
      "Mouseover Interaction",
      "Mouse Hover Interaction",
      "User Interaction",
      "Navbar Interactions",
      "Interaction Design",
    ],
  },
  {
    key: "cms",
    title: "CMS",
    description:
      "Flexible content architecture for collections, media, and filtering workflows.",
    tags: [
      "CMS Gallery",
      "Webflow CMS",
      "CMS Slider",
      "Audio CMS",
      "CMS Filter",
      "Slider CMS",
      "CMS Grid",
      "CMS Layout",
    ],
  },
  {
    key: "ecommerce",
    title: "Ecommerce",
    description:
      "Commerce-ready storefront structures with clean navigation and checkout flow.",
    tags: ["E-Commerce", "Ecom", "Commerce"],
  },
  {
    key: "portfolio",
    title: "Portfolio",
    description:
      "Portfolio systems tailored for creative teams, studios, and visual case studies.",
    tags: [
      "Photography Portfolio",
      "UI Portfolio",
      "UX Portfolio",
      "Design Portfolio",
      "Art Portfolio",
      "Video Portfolio",
    ],
  },
];

const specialtyFilters: Array<{ key: "all" | SpecialtyKey; label: string }> = [
  { key: "all", label: "All" },
  { key: "animation", label: "Animation" },
  { key: "interactions", label: "Interactions" },
  { key: "cms", label: "CMS" },
  { key: "ecommerce", label: "Ecommerce" },
  { key: "portfolio", label: "Portfolio" },
];

const WebsiteDesign = () => {
  const [activeSpecialty, setActiveSpecialty] = useState<"all" | SpecialtyKey>(
    "all",
  );

  const packages = [
    {
      name: "Landing Page",
      price: "$2,500",
      description: "Perfect for campaigns and lead generation",
      features: [
        "Single page design",
        "Mobile responsive",
        "Contact form",
        "SEO basics",
        "1 revision round",
        "2-week delivery",
      ],
      popular: false,
    },
    {
      name: "Business Website",
      price: "$5,000",
      description: "Complete web presence for growing businesses",
      features: [
        "5-7 page website",
        "Custom design",
        "Mobile responsive",
        "SEO optimized",
        "Contact forms",
        "Social integration",
        "Blog setup",
        "3 revision rounds",
        "4-week delivery",
      ],
      popular: true,
    },
    {
      name: "E-Commerce",
      price: "$10,000",
      description: "Full online store with payment processing",
      features: [
        "Unlimited products",
        "Shopping cart",
        "Secure checkout",
        "Inventory management",
        "Customer accounts",
        "Email notifications",
        "Analytics dashboard",
        "5 revision rounds",
        "6-week delivery",
      ],
      popular: false,
    },
  ];

  const features = [
    {
      icon: Smartphone,
      title: "Mobile-First Design",
      description: "Every site looks perfect on phones, tablets, and desktops.",
    },
    {
      icon: Search,
      title: "SEO Optimized",
      description:
        "Built to rank on Google from day one with proper structure and meta tags.",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Optimized for speed with sub-3-second load times.",
    },
    {
      icon: Shield,
      title: "Secure & Protected",
      description:
        "SSL certificates, security headers, and regular updates included.",
    },
    {
      icon: Palette,
      title: "Custom Branding",
      description: "Unique designs that match your brand identity perfectly.",
    },
    {
      icon: Code,
      title: "Clean Code",
      description: "Modern, maintainable code that grows with your business.",
    },
  ];

  const process = [
    {
      step: "1",
      title: "Discovery",
      description: "We learn about your business, goals, and target audience.",
    },
    {
      step: "2",
      title: "Design",
      description: "Create mockups and get your approval before building.",
    },
    {
      step: "3",
      title: "Development",
      description: "Build your site with attention to every detail.",
    },
    {
      step: "4",
      title: "Launch",
      description: "Final testing, optimization, and go live!",
    },
  ];

  const visibleSpecialties = useMemo(() => {
    if (activeSpecialty === "all") {
      return specialtyCategories;
    }

    return specialtyCategories.filter(
      (category) => category.key === activeSpecialty,
    );
  }, [activeSpecialty]);

  return (
    <PageTransition variant="fade">
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
        <SEO
          title="Professional Website Design Services"
          description="Custom website design for businesses in Dayton, Ohio. Landing pages from $2,500, business websites from $5,000, e-commerce from $10,000. Mobile-responsive, SEO-optimized."
          keywords="website design Dayton Ohio, web development, business website, e-commerce website, landing page design, responsive web design, preload animation, navbar interactions, webflow cms, cms gallery, ecommerce design, UI portfolio, UX portfolio, video portfolio"
          structuredData={{
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Professional Website Design",
            description: "Custom website design and development services",
            provider: {
              "@type": "Organization",
              name: "InVision Network",
            },
            areaServed: "Dayton, Ohio",
            offers: [
              {
                "@type": "Offer",
                name: "Landing Page",
                price: "2500",
                priceCurrency: "USD",
              },
              {
                "@type": "Offer",
                name: "Business Website",
                price: "5000",
                priceCurrency: "USD",
              },
              {
                "@type": "Offer",
                name: "E-Commerce Website",
                price: "10000",
                priceCurrency: "USD",
              },
            ],
          }}
        />
        <Navigation />

        <main>
          {/* Hero Section */}
          <section className="relative py-24 lg:py-36 overflow-hidden min-h-[95vh] flex items-center">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />

            {/* Static Glass Orbs (replaced animated) */}
            <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-gradient-to-br from-primary/25 to-accent/25 blur-3xl" />
            <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-gradient-to-br from-accent/20 to-primary/20 blur-3xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-primary/10 to-accent/10 blur-3xl" />

            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-5xl mx-auto text-center">
                {/* Floating Widgets - Left Side */}
                <div className="hidden lg:flex absolute left-4 top-1/4 flex-col gap-4">
                  <div className="bg-white/80 dark:bg-card/80 backdrop-blur-2xl border border-white/50 rounded-2xl p-4 shadow-2xl transform -rotate-6 hover-scale">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
                        <Users className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="text-lg font-bold text-foreground">200+</div>
                        <div className="text-xs text-muted-foreground">Happy Clients</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/80 dark:bg-card/80 backdrop-blur-2xl border border-white/50 rounded-2xl p-4 shadow-2xl transform rotate-3 hover-scale">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg">
                        <TrendingUp className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="text-lg font-bold text-foreground">98%</div>
                        <div className="text-xs text-muted-foreground">Success Rate</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-primary to-accent rounded-xl p-3 shadow-2xl hover-scale">
                    <div className="text-white text-center">
                      <Layers className="w-5 h-5 mx-auto mb-1" />
                      <div className="text-sm font-bold">3D Design</div>
                    </div>
                  </div>
                </div>

                {/* Floating Widgets - Right Side */}
                <div className="hidden lg:flex absolute right-4 top-1/3 flex-col gap-4">
                  <div className="bg-white/80 dark:bg-card/80 backdrop-blur-2xl border border-white/50 rounded-2xl p-4 shadow-2xl transform rotate-6 hover-scale">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg">
                        <Award className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="text-lg font-bold text-foreground">5 Stars</div>
                        <div className="text-xs text-muted-foreground">Avg Rating</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/80 dark:bg-card/80 backdrop-blur-2xl border border-white/50 rounded-2xl p-4 shadow-2xl transform -rotate-3 hover-scale">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
                        <Rocket className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="text-lg font-bold text-foreground">Fast</div>
                        <div className="text-xs text-muted-foreground">2-Week Delivery</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-pink-500 to-rose-500 rounded-full p-3 shadow-2xl self-center hover-scale">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                </div>

                <AnimatedSection animation="fade-up">
                  <Badge
                    variant="outline"
                    className="mb-6 px-4 py-2 text-sm border-primary/30 bg-white/80 dark:bg-card/80 backdrop-blur-2xl shadow-lg"
                  >
                    <Globe className="w-4 h-4 mr-2" />
                    Web Design & Development
                  </Badge>
                </AnimatedSection>

                <AnimatedSection animation="fade-up" delay={100}>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                    <span
                      className="bg-clip-text text-transparent"
                      style={{
                        background:
                          "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--accent)) 50%, hsl(265 55% 42%) 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      Professional
                    </span>
                    <br />
                    <span className="text-foreground">Website Design</span>
                  </h1>
                </AnimatedSection>

                <AnimatedSection animation="fade-up" delay={200}>
                  <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                    Beautiful, fast, and effective websites that turn visitors
                    into customers. Built in Dayton, Ohio for businesses
                    nationwide.
                  </p>
                </AnimatedSection>

                <AnimatedSection animation="fade-up" delay={300}>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <div className="btn-press">
                      <Button
                        asChild
                        size="xl"
                        variant="gold"
                        className="shadow-2xl shadow-primary/30"
                      >
                        <Link to="/contact">
                          Get Free Quote
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                      </Button>
                    </div>
                    <div className="btn-press">
                      <Button
                        asChild
                        size="xl"
                        variant="outline"
                        className="bg-white/80 dark:bg-card/80 backdrop-blur-2xl border-white/50 shadow-xl"
                      >
                        <Link to="/business">View All Services</Link>
                      </Button>
                    </div>
                  </div>
                </AnimatedSection>

                {/* Bottom Stats Bar */}
                <AnimatedSection animation="fade-up" delay={400}>
                  <div className="mt-16 flex flex-wrap justify-center gap-6">
                    {[
                      {
                        icon: HeartHandshake,
                        label: "Trusted Partner",
                        value: "Since 2018",
                      },
                      { icon: Target, label: "Projects Done", value: "500+" },
                      { icon: Sparkles, label: "Custom Designs", value: "100%" },
                    ].map((stat, index) => (
                      <div
                        key={index}
                        className="bg-white/80 dark:bg-card/80 backdrop-blur-2xl border border-white/50 rounded-2xl px-6 py-4 shadow-2xl hover-lift"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center shadow-lg">
                            <stat.icon className="w-5 h-5 text-primary" />
                          </div>
                          <div className="text-left">
                            <div className="text-lg font-bold text-foreground">
                              {stat.value}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {stat.label}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </AnimatedSection>
              </div>
            </div>
          </section>

          {/* Specialty Categories */}
          <section className="relative overflow-hidden py-16">
            <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
            <div className="container relative z-10 mx-auto px-4">
              <AnimatedSection animation="fade-up" className="mx-auto mb-10 max-w-3xl text-center">
                <Badge
                  variant="outline"
                  className="border-primary/30 bg-white/80 px-4 py-1.5 text-xs dark:bg-card/80"
                >
                  Build Categories
                </Badge>
                <h2 className="mt-4 text-3xl font-bold md:text-4xl">
                  Animation, Interactions, CMS, Ecommerce, Portfolio
                </h2>
                <p className="mt-3 text-muted-foreground">
                  Use focused category groups to scope features faster and keep
                  implementation aligned from discovery to launch.
                </p>
              </AnimatedSection>

              <div className="mb-8 flex flex-wrap justify-center gap-2">
                {specialtyFilters.map((filter) => {
                  const isActive = activeSpecialty === filter.key;
                  return (
                    <button
                      key={filter.key}
                      type="button"
                      onClick={() => setActiveSpecialty(filter.key)}
                      className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                        isActive
                          ? "border-primary/40 bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                          : "border-white/50 bg-white/70 text-foreground hover:border-primary/30 hover:bg-white/90 dark:bg-card/70"
                      }`}
                    >
                      {filter.label}
                    </button>
                  );
                })}
              </div>

              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {visibleSpecialties.map((category, index) => (
                  <AnimatedSection
                    key={category.key}
                    animation="fade-up"
                    delay={index * 60}
                  >
                    <Card className="h-full border-white/60 bg-white/80 shadow-xl backdrop-blur-2xl dark:bg-card/80">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between gap-3">
                          <CardTitle className="text-xl">
                            {category.title}
                          </CardTitle>
                          <Badge variant="secondary" className="text-xs">
                            {category.tags.length} items
                          </Badge>
                        </div>
                        <CardDescription>{category.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="flex flex-wrap gap-2 pt-0">
                        {category.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="border-primary/20 bg-primary/5 text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </CardContent>
                    </Card>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </section>

          {/* Packages Section */}
          <section className="py-20 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-muted/30 to-background" />
            {/* Static decorative orb */}
            <div className="absolute top-1/2 left-0 w-96 h-96 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 blur-3xl -translate-x-1/2" />
            <div className="container mx-auto px-4 relative z-10">
              <AnimatedSection animation="fade-up" className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Website Packages
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Clear pricing with no hidden fees. Choose the package that
                  fits your needs.
                </p>
              </AnimatedSection>
              <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {packages.map((pkg, index) => (
                  <AnimatedSection
                    key={index}
                    animation="fade-up"
                    delay={index * 100}
                  >
                    <div className="relative pt-4 hover-lift">
                      {pkg.popular && (
                        <Badge className="absolute top-0 left-1/2 -translate-x-1/2 z-20 bg-gradient-to-r from-primary to-accent text-white border-0 px-4 py-1.5 shadow-2xl shadow-primary/40">
                          <Star className="w-3 h-3 mr-1.5 fill-current" />
                          Most Popular
                        </Badge>
                      )}
                      <Card
                        className={`flex flex-col h-[460px] glass-heavy glass-cursor-overlay card-shine border-white/60 shadow-2xl transition-all duration-300 ${pkg.popular ? "ring-2 ring-primary/40 shadow-primary/20" : ""}`}
                      >
                        <CardHeader className="text-center pt-6 pb-3">
                          <CardTitle className="text-lg">{pkg.name}</CardTitle>
                          <div
                            className="text-2xl font-bold mt-2 bg-clip-text text-transparent"
                            style={{
                              background:
                                "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--accent)) 50%, hsl(var(--primary)) 100%)",
                              WebkitBackgroundClip: "text",
                              WebkitTextFillColor: "transparent",
                            }}
                          >
                            {pkg.price}
                          </div>
                          <CardDescription className="mt-2 text-sm">
                            {pkg.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1 flex flex-col px-5">
                          <ul className="space-y-2 mb-4 flex-1">
                            {pkg.features.map((feature, fIndex) => (
                              <li
                                key={fIndex}
                                className="flex items-center gap-2"
                              >
                                <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                                <span className="text-xs">{feature}</span>
                              </li>
                            ))}
                          </ul>
                          <div className="btn-press">
                            <Button
                              asChild
                              className={`w-full ${pkg.popular ? "shadow-xl shadow-primary/30" : "bg-white/60 backdrop-blur-xl"}`}
                              variant={pkg.popular ? "gold" : "outline"}
                            >
                              <Link to="/contact">Get Started</Link>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </section>

          {/* Features Grid */}
          <section className="py-20 relative overflow-hidden">
            {/* Static decorative orb */}
            <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-gradient-to-br from-primary/15 to-accent/15 blur-3xl" />
            <div className="container mx-auto px-4 relative z-10">
              <AnimatedSection animation="fade-up" className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Every Website Includes
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Industry-standard features that come with every project. No
                  extra cost.
                </p>
              </AnimatedSection>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.map((feature, index) => (
                  <AnimatedSection
                    key={index}
                    animation="fade-up"
                    delay={index * 50}
                  >
                    <div className="hover-lift h-full">
                      <Card className="glass-heavy glass-cursor-overlay card-shine border-white/60 shadow-2xl transition-all duration-300 h-full">
                        <CardHeader>
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/25 to-accent/25 flex items-center justify-center mb-4 shadow-xl">
                            <feature.icon className="w-6 h-6 text-primary" />
                          </div>
                          <CardTitle className="text-xl">
                            {feature.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground">
                            {feature.description}
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </section>

          {/* Process Section */}
          <section className="py-20 relative">
            <div className="absolute inset-0 bg-gradient-to-t from-muted/30 to-background" />
            <div className="container mx-auto px-4 relative z-10">
              <AnimatedSection animation="fade-up" className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Our Design Process
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  A simple, collaborative process that keeps you involved every
                  step of the way.
                </p>
              </AnimatedSection>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {process.map((item, index) => (
                  <AnimatedSection
                    key={index}
                    animation="scale-up"
                    delay={index * 100}
                  >
                    <div className="text-center glass-heavy glass-cursor-overlay card-shine border border-white/60 rounded-2xl p-6 shadow-2xl hover-lift">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-4 shadow-2xl shadow-primary/40">
                        <span className="text-2xl font-bold text-white">
                          {item.step}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                      <p className="text-muted-foreground text-sm">
                        {item.description}
                      </p>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
            {/* Static decorative orb */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-gradient-to-br from-primary/25 to-accent/25 blur-3xl opacity-40" />
            <div className="container mx-auto px-4 text-center relative z-10">
              <AnimatedSection animation="scale-up">
                <div className="glass-heavy glass-cursor-overlay card-shine border border-white/60 rounded-3xl p-12 shadow-2xl max-w-3xl mx-auto">
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">
                    Ready for a Website That Works?
                  </h2>
                  <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                    Let's build something amazing together. Get a free quote
                    today.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <div className="btn-press">
                      <Button
                        asChild
                        size="xl"
                        variant="gold"
                        className="shadow-2xl shadow-primary/40"
                      >
                        <Link to="/contact">
                          Request Free Quote
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                      </Button>
                    </div>
                    <div className="btn-press">
                      <Button
                        asChild
                        size="xl"
                        variant="outline"
                        className="bg-white/70 dark:bg-card/70 backdrop-blur-2xl border-white/50 shadow-xl"
                      >
                        <Link to="/business/website-insurance">
                          <Shield className="mr-2 h-5 w-5" />
                          Add Website Insurance
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default WebsiteDesign;
