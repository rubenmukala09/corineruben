import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  Clock, 
  RefreshCw, 
  Lock, 
  HeadphonesIcon,
  Server,
  CheckCircle2,
  ArrowRight,
  Star,
  AlertTriangle,
  Zap
} from "lucide-react";

const WebsiteInsurance = () => {
  const plans = [
    {
      name: "Essential",
      price: "$29",
      period: "/month",
      description: "Basic protection for small websites",
      features: [
        "Daily backups",
        "SSL certificate monitoring",
        "Uptime monitoring",
        "Email support",
        "Monthly security scans"
      ],
      popular: false
    },
    {
      name: "Professional",
      price: "$49",
      period: "/month",
      description: "Complete protection for business sites",
      features: [
        "Everything in Essential",
        "Real-time backups",
        "Malware removal",
        "Performance monitoring",
        "Priority support",
        "Weekly security scans",
        "1-hour response time"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "$99",
      period: "/month",
      description: "Maximum protection for critical sites",
      features: [
        "Everything in Professional",
        "24/7 active monitoring",
        "DDoS protection",
        "WAF (Web Application Firewall)",
        "Instant malware removal",
        "Daily security scans",
        "15-minute response time",
        "Dedicated account manager"
      ],
      popular: false
    }
  ];

  const coverage = [
    {
      icon: RefreshCw,
      title: "Automatic Backups",
      description: "Your site is backed up automatically so you never lose data. Restore with one click."
    },
    {
      icon: Lock,
      title: "Security Monitoring",
      description: "24/7 scanning for malware, vulnerabilities, and suspicious activity."
    },
    {
      icon: Zap,
      title: "Performance Optimization",
      description: "Speed monitoring and optimization to keep your site fast and responsive."
    },
    {
      icon: HeadphonesIcon,
      title: "Expert Support",
      description: "Real humans ready to help when something goes wrong—not bots."
    },
    {
      icon: Server,
      title: "Uptime Guarantee",
      description: "99.9% uptime guarantee with instant alerts if your site goes down."
    },
    {
      icon: Shield,
      title: "Hack Recovery",
      description: "If your site gets hacked, we clean it up and secure it—guaranteed."
    }
  ];

  const risks = [
    "47% of small business websites have been hacked in the past year",
    "Average cost of website downtime: $5,600 per minute",
    "60% of small businesses close within 6 months of a cyber attack",
    "Malware can remain undetected for an average of 287 days"
  ];

  return (
    <PageTransition variant="fade">
      <div className="min-h-screen bg-background">
        <SEO 
          title="Website Insurance & Protection Plans"
          description="Protect your website from hackers, malware, and downtime. Website insurance plans starting at $29/month. Daily backups, security monitoring, and expert support."
          keywords="website insurance, website security, malware protection, website backup, DDoS protection, website monitoring Dayton Ohio"
          structuredData={{
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Website Insurance & Protection",
            "description": "Comprehensive website protection including backups, security monitoring, and hack recovery",
            "provider": {
              "@type": "Organization",
              "name": "InVision Network"
            },
            "areaServed": "United States",
            "offers": [
              {
                "@type": "Offer",
                "name": "Essential Plan",
                "price": "29",
                "priceCurrency": "USD",
                "priceSpecification": {
                  "@type": "UnitPriceSpecification",
                  "billingDuration": "P1M"
                }
              },
              {
                "@type": "Offer",
                "name": "Professional Plan",
                "price": "49",
                "priceCurrency": "USD",
                "priceSpecification": {
                  "@type": "UnitPriceSpecification",
                  "billingDuration": "P1M"
                }
              },
              {
                "@type": "Offer",
                "name": "Enterprise Plan",
                "price": "99",
                "priceCurrency": "USD",
                "priceSpecification": {
                  "@type": "UnitPriceSpecification",
                  "billingDuration": "P1M"
                }
              }
            ]
          }}
        />
        <Navigation />
        
        <main id="main-content">
          {/* Hero Section */}
          <section className="relative py-20 lg:py-32 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-success/10 via-background to-primary/10" />
            <div className="container mx-auto px-4 relative">
              <div className="max-w-4xl mx-auto text-center">
                <Badge variant="outline" className="mb-6 px-4 py-2 text-sm border-success/30 bg-success/5">
                  <Shield className="w-4 h-4 mr-2" />
                  Website Protection
                </Badge>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                  <span className="gradient-text-primary">Website Insurance</span>
                  <br />& Protection Plans
                </h1>
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Sleep soundly knowing your website is protected 24/7. Automatic backups, 
                  security monitoring, and expert support—all in one plan.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="xl" variant="gold">
                    <Link to="/contact">
                      Get Protected Today
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

          {/* Risk Alert Section */}
          <section className="py-12 bg-destructive/5 border-y border-destructive/20">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-center gap-3 mb-6">
                <AlertTriangle className="w-6 h-6 text-destructive" />
                <h2 className="text-xl font-bold text-destructive">The Risks Are Real</h2>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
                {risks.map((risk, index) => (
                  <div key={index} className="text-center p-4 bg-background rounded-lg border border-destructive/20">
                    <p className="text-sm text-muted-foreground">{risk}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Plans Section */}
          <section className="py-20">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Choose Your Protection Level
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  All plans include our core protection features. Upgrade for more comprehensive coverage.
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {plans.map((plan, index) => (
                  <div key={index} className="relative pt-4">
                    {plan.popular && (
                      <Badge 
                        className="absolute -top-1 left-1/2 -translate-x-1/2 z-10 bg-gradient-to-r from-primary to-accent text-white border-0 px-4 py-1"
                      >
                        <Star className="w-3 h-3 mr-1 fill-current" />
                        Recommended
                      </Badge>
                    )}
                    <Card className={`h-full ${plan.popular ? 'border-primary/50 shadow-lg pt-6' : 'border-border/50 pt-6'}`}>
                      <CardHeader className="text-center">
                        <CardTitle className="text-2xl">{plan.name}</CardTitle>
                        <div className="mt-2">
                          <span className="text-4xl font-bold text-primary">{plan.price}</span>
                          <span className="text-muted-foreground">{plan.period}</span>
                        </div>
                        <CardDescription className="mt-2">{plan.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3 mb-6">
                          {plan.features.map((feature, fIndex) => (
                            <li key={fIndex} className="flex items-center gap-2">
                              <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
                              <span className="text-sm">{feature}</span>
                            </li>
                          ))}
                        </ul>
                        <Button asChild className="w-full" variant={plan.popular ? "gold" : "outline"}>
                          <Link to="/contact">Get {plan.name}</Link>
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
              <p className="text-center text-muted-foreground mt-8">
                All plans include a 30-day money-back guarantee. Cancel anytime.
              </p>
            </div>
          </section>

          {/* Coverage Details */}
          <section className="py-20 bg-card">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  What's Covered
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Comprehensive protection for every aspect of your website's health and security.
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {coverage.map((item, index) => (
                  <Card key={index} className="border-border/50 bg-card/50 hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center mb-4">
                        <item.icon className="w-6 h-6 text-success" />
                      </div>
                      <CardTitle className="text-xl">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{item.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* FAQ Preview */}
          <section className="py-20">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
                  Common Questions
                </h2>
                <div className="space-y-4">
                  {[
                    {
                      q: "What happens if my site gets hacked?",
                      a: "We immediately quarantine the threat, clean your site, and restore it from a clean backup. Professional and Enterprise plans include this at no extra cost."
                    },
                    {
                      q: "How often are backups taken?",
                      a: "Essential plan: daily. Professional and Enterprise: real-time. All backups are stored securely for 30 days."
                    },
                    {
                      q: "Can I upgrade or downgrade my plan?",
                      a: "Yes! You can change your plan at any time. Upgrades take effect immediately; downgrades at the next billing cycle."
                    },
                    {
                      q: "Do you work with any website platform?",
                      a: "We support WordPress, Shopify, Wix, Squarespace, custom sites, and most other platforms."
                    }
                  ].map((faq, index) => (
                    <Card key={index} className="border-border/50">
                      <CardContent className="p-6">
                        <h3 className="font-bold mb-2">{faq.q}</h3>
                        <p className="text-muted-foreground">{faq.a}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <div className="text-center mt-8">
                  <Button asChild variant="outline">
                    <Link to="/faq">View All FAQs</Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 bg-gradient-to-br from-success/10 via-background to-primary/10">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Don't Wait Until It's Too Late
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Protect your website today. Plans start at just $29/month.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="xl" variant="gold">
                  <Link to="/contact">
                    Start Protection Now
                    <Shield className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild size="xl" variant="outline">
                  <Link to="/business/website-design">
                    Need a New Website?
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

export default WebsiteInsurance;
