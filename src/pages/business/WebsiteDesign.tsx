import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
  Code
} from "lucide-react";

const WebsiteDesign = () => {
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
        "2-week delivery"
      ],
      popular: false
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
        "4-week delivery"
      ],
      popular: true
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
        "6-week delivery"
      ],
      popular: false
    }
  ];

  const features = [
    {
      icon: Smartphone,
      title: "Mobile-First Design",
      description: "Every site looks perfect on phones, tablets, and desktops."
    },
    {
      icon: Search,
      title: "SEO Optimized",
      description: "Built to rank on Google from day one with proper structure and meta tags."
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Optimized for speed with sub-3-second load times."
    },
    {
      icon: Shield,
      title: "Secure & Protected",
      description: "SSL certificates, security headers, and regular updates included."
    },
    {
      icon: Palette,
      title: "Custom Branding",
      description: "Unique designs that match your brand identity perfectly."
    },
    {
      icon: Code,
      title: "Clean Code",
      description: "Modern, maintainable code that grows with your business."
    }
  ];

  const process = [
    {
      step: "1",
      title: "Discovery",
      description: "We learn about your business, goals, and target audience."
    },
    {
      step: "2",
      title: "Design",
      description: "Create mockups and get your approval before building."
    },
    {
      step: "3",
      title: "Development",
      description: "Build your site with attention to every detail."
    },
    {
      step: "4",
      title: "Launch",
      description: "Final testing, optimization, and go live!"
    }
  ];

  return (
    <PageTransition variant="fade">
      <div className="min-h-screen bg-background">
        <SEO 
          title="Professional Website Design Services"
          description="Custom website design for businesses in Dayton, Ohio. Landing pages from $2,500, business websites from $5,000, e-commerce from $10,000. Mobile-responsive, SEO-optimized."
          keywords="website design Dayton Ohio, web development, business website, e-commerce website, landing page design, responsive web design"
          structuredData={{
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Professional Website Design",
            "description": "Custom website design and development services",
            "provider": {
              "@type": "Organization",
              "name": "InVision Network"
            },
            "areaServed": "Dayton, Ohio",
            "offers": [
              {
                "@type": "Offer",
                "name": "Landing Page",
                "price": "2500",
                "priceCurrency": "USD"
              },
              {
                "@type": "Offer",
                "name": "Business Website",
                "price": "5000",
                "priceCurrency": "USD"
              },
              {
                "@type": "Offer",
                "name": "E-Commerce Website",
                "price": "10000",
                "priceCurrency": "USD"
              }
            ]
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
                  <Globe className="w-4 h-4 mr-2" />
                  Web Design & Development
                </Badge>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                  <span className="gradient-text-primary">Professional</span>
                  <br />Website Design
                </h1>
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Beautiful, fast, and effective websites that turn visitors into customers. 
                  Built in Dayton, Ohio for businesses nationwide.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="xl" variant="gold">
                    <Link to="/contact">
                      Get Free Quote
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

          {/* Packages Section */}
          <section className="py-20 bg-card">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Website Packages
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Clear pricing with no hidden fees. Choose the package that fits your needs.
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {packages.map((pkg, index) => (
                  <div key={index} className="relative pt-4">
                    {pkg.popular && (
                      <Badge 
                        className="absolute -top-1 left-1/2 -translate-x-1/2 z-10 bg-gradient-to-r from-primary to-accent text-white border-0 px-4 py-1"
                      >
                        <Star className="w-3 h-3 mr-1 fill-current" />
                        Most Popular
                      </Badge>
                    )}
                    <Card className={`h-full ${pkg.popular ? 'border-primary/50 shadow-lg pt-6' : 'border-border/50 pt-6'}`}>
                      <CardHeader className="text-center">
                        <CardTitle className="text-2xl">{pkg.name}</CardTitle>
                        <div className="text-4xl font-bold text-primary mt-2">{pkg.price}</div>
                        <CardDescription className="mt-2">{pkg.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3 mb-6">
                          {pkg.features.map((feature, fIndex) => (
                            <li key={fIndex} className="flex items-center gap-2">
                              <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
                              <span className="text-sm">{feature}</span>
                            </li>
                          ))}
                        </ul>
                        <Button asChild className="w-full" variant={pkg.popular ? "gold" : "outline"}>
                          <Link to="/contact">Get Started</Link>
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Features Grid */}
          <section className="py-20">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Every Website Includes
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Industry-standard features that come with every project—no extra cost.
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

          {/* Process Section */}
          <section className="py-20 bg-card">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Our Design Process
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  A simple, collaborative process that keeps you involved every step of the way.
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

          {/* CTA Section */}
          <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-accent/10">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready for a Website That Works?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Let's build something amazing together. Get a free quote today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="xl" variant="gold">
                  <Link to="/contact">
                    Request Free Quote
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild size="xl" variant="outline">
                  <Link to="/business/website-insurance">
                    <Shield className="mr-2 h-5 w-5" />
                    Add Website Insurance
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

export default WebsiteDesign;
