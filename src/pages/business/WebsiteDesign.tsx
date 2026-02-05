import { Link } from "react-router-dom";
import { motion } from "framer-motion";
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
  Code,
  Users,
  Award,
  TrendingUp,
  HeartHandshake,
  Sparkles,
  Rocket,
  Target,
  Layers
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
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
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
          {/* Hero Section - 3D Glassmorphism */}
          <section className="relative py-24 lg:py-36 overflow-hidden min-h-[95vh] flex items-center">
            {/* Premium Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
            
            {/* Animated Glass Orbs */}
            <motion.div 
              animate={{ y: [-20, 20, -20], x: [-10, 10, -10], scale: [1, 1.1, 1] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-20 left-10 w-72 h-72 rounded-full bg-gradient-to-br from-primary/25 to-accent/25 blur-3xl"
            />
            <motion.div 
              animate={{ y: [20, -20, 20], x: [10, -10, 10] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-gradient-to-br from-accent/20 to-primary/20 blur-3xl"
            />
            <motion.div 
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-primary/10 to-accent/10 blur-3xl"
            />
            
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-5xl mx-auto text-center">
                {/* Floating Widgets - Left Side */}
                <motion.div 
                  animate={{ y: [-8, 8, -8] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="hidden lg:flex absolute left-4 top-1/4 flex-col gap-4"
                >
                  <motion.div 
                    whileHover={{ scale: 1.1, rotateY: 15 }}
                    className="bg-white/80 dark:bg-card/80 backdrop-blur-2xl border border-white/50 rounded-2xl p-4 shadow-2xl transform -rotate-6"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
                        <Users className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="text-lg font-bold text-foreground">200+</div>
                        <div className="text-xs text-muted-foreground">Happy Clients</div>
                      </div>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    whileHover={{ scale: 1.1, rotateY: -15 }}
                    className="bg-white/80 dark:bg-card/80 backdrop-blur-2xl border border-white/50 rounded-2xl p-4 shadow-2xl transform rotate-3"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg">
                        <TrendingUp className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="text-lg font-bold text-foreground">98%</div>
                        <div className="text-xs text-muted-foreground">Success Rate</div>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="bg-gradient-to-br from-primary to-accent rounded-xl p-3 shadow-2xl"
                  >
                    <div className="text-white text-center">
                      <Layers className="w-5 h-5 mx-auto mb-1" />
                      <div className="text-sm font-bold">3D Design</div>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Floating Widgets - Right Side */}
                <motion.div 
                  animate={{ y: [8, -8, 8] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="hidden lg:flex absolute right-4 top-1/3 flex-col gap-4"
                >
                  <motion.div 
                    whileHover={{ scale: 1.1, rotateY: -15 }}
                    className="bg-white/80 dark:bg-card/80 backdrop-blur-2xl border border-white/50 rounded-2xl p-4 shadow-2xl transform rotate-6"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg">
                        <Award className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="text-lg font-bold text-foreground">5 Stars</div>
                        <div className="text-xs text-muted-foreground">Avg Rating</div>
                      </div>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    whileHover={{ scale: 1.1, rotateY: 15 }}
                    className="bg-white/80 dark:bg-card/80 backdrop-blur-2xl border border-white/50 rounded-2xl p-4 shadow-2xl transform -rotate-3"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
                        <Rocket className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="text-lg font-bold text-foreground">Fast</div>
                        <div className="text-xs text-muted-foreground">2-Week Delivery</div>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div 
                    whileHover={{ scale: 1.15 }}
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="bg-gradient-to-br from-pink-500 to-rose-500 rounded-full p-3 shadow-2xl self-center"
                  >
                    <Sparkles className="w-5 h-5 text-white" />
                  </motion.div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <Badge variant="outline" className="mb-6 px-4 py-2 text-sm border-primary/30 bg-white/80 dark:bg-card/80 backdrop-blur-2xl shadow-lg">
                    <Globe className="w-4 h-4 mr-2" />
                    Web Design & Development
                  </Badge>
                </motion.div>
                
                <motion.h1 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
                >
                  <motion.span 
                    animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    className="bg-clip-text text-transparent"
                    style={{
                      background: 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--accent)) 25%, hsl(265 55% 42%) 50%, hsl(var(--primary)) 75%, hsl(var(--accent)) 100%)',
                      backgroundSize: '200% 200%',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    Professional
                  </motion.span>
                  <br />
                  <span className="text-foreground">Website Design</span>
                </motion.h1>
                
                <motion.p 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
                >
                  Beautiful, fast, and effective websites that turn visitors into customers. 
                  Built in Dayton, Ohio for businesses nationwide.
                </motion.p>
                
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                  <motion.div whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.98 }}>
                    <Button asChild size="xl" variant="gold" className="shadow-2xl shadow-primary/30">
                      <Link to="/contact">
                        Get Free Quote
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.98 }}>
                    <Button asChild size="xl" variant="outline" className="bg-white/80 dark:bg-card/80 backdrop-blur-2xl border-white/50 shadow-xl">
                      <Link to="/business">View All Services</Link>
                    </Button>
                  </motion.div>
                </motion.div>

                {/* Bottom Stats Bar */}
                <motion.div 
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="mt-16 flex flex-wrap justify-center gap-6"
                >
                  {[
                    { icon: HeartHandshake, label: "Trusted Partner", value: "Since 2018" },
                    { icon: Target, label: "Projects Done", value: "500+" },
                    { icon: Sparkles, label: "Custom Designs", value: "100%" },
                  ].map((stat, index) => (
                    <motion.div 
                      key={index}
                      whileHover={{ scale: 1.1, y: -5, rotateX: 10 }}
                      className="bg-white/80 dark:bg-card/80 backdrop-blur-2xl border border-white/50 rounded-2xl px-6 py-4 shadow-2xl"
                      style={{ transformStyle: 'preserve-3d' }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center shadow-lg">
                          <stat.icon className="w-5 h-5 text-primary" />
                        </div>
                        <div className="text-left">
                          <div className="text-lg font-bold text-foreground">{stat.value}</div>
                          <div className="text-xs text-muted-foreground">{stat.label}</div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </section>

          {/* Packages Section - 3D Glassmorphism Cards */}
          <section className="py-20 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-muted/30 to-background" />
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/2 left-0 w-96 h-96 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 blur-3xl -translate-x-1/2"
            />
            <div className="container mx-auto px-4 relative z-10">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Website Packages</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Clear pricing with no hidden fees. Choose the package that fits your needs.
                </p>
              </motion.div>
              <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {packages.map((pkg, index) => (
                  <motion.div 
                    key={index} 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -12, scale: 1.03, rotateY: 5 }}
                    className="relative pt-4"
                    style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
                  >
                    {pkg.popular && (
                      <Badge className="absolute top-0 left-1/2 -translate-x-1/2 z-20 bg-gradient-to-r from-primary to-accent text-white border-0 px-4 py-1.5 shadow-2xl shadow-primary/40">
                        <Star className="w-3 h-3 mr-1.5 fill-current" />
                        Most Popular
                      </Badge>
                    )}
                    <Card className={`flex flex-col h-[460px] bg-white/85 dark:bg-card/85 backdrop-blur-2xl border-white/60 shadow-2xl transition-all duration-300 ${pkg.popular ? 'ring-2 ring-primary/40 shadow-primary/20' : ''}`}>
                      <CardHeader className="text-center pt-6 pb-3">
                        <CardTitle className="text-lg">{pkg.name}</CardTitle>
                        <motion.div 
                          animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                          className="text-2xl font-bold mt-2"
                          style={{
                            background: 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--accent)) 50%, hsl(var(--primary)) 100%)',
                            backgroundSize: '200% 200%',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                          }}
                        >
                          {pkg.price}
                        </motion.div>
                        <CardDescription className="mt-2 text-sm">{pkg.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="flex-1 flex flex-col px-5">
                        <ul className="space-y-2 mb-4 flex-1">
                          {pkg.features.map((feature, fIndex) => (
                            <li key={fIndex} className="flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                              <span className="text-xs">{feature}</span>
                            </li>
                          ))}
                        </ul>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                          <Button asChild className={`w-full ${pkg.popular ? 'shadow-xl shadow-primary/30' : 'bg-white/60 backdrop-blur-xl'}`} variant={pkg.popular ? "gold" : "outline"}>
                            <Link to="/contact">Get Started</Link>
                          </Button>
                        </motion.div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Features Grid - 3D Glassmorphism */}
          <section className="py-20 relative overflow-hidden">
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-gradient-to-br from-primary/15 to-accent/15 blur-3xl"
            />
            <div className="container mx-auto px-4 relative z-10">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Every Website Includes</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Industry-standard features that come with every project—no extra cost.
                </p>
              </motion.div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ y: -8, scale: 1.03, rotateX: 5, rotateY: -5 }}
                    style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
                  >
                    <Card className="bg-white/85 dark:bg-card/85 backdrop-blur-2xl border-white/60 shadow-2xl hover:shadow-3xl transition-all duration-300 h-full">
                      <CardHeader>
                        <motion.div 
                          whileHover={{ rotate: 10, scale: 1.1 }}
                          className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/25 to-accent/25 flex items-center justify-center mb-4 shadow-xl"
                        >
                          <feature.icon className="w-6 h-6 text-primary" />
                        </motion.div>
                        <CardTitle className="text-xl">{feature.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">{feature.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Process Section - 3D Glassmorphism */}
          <section className="py-20 relative">
            <div className="absolute inset-0 bg-gradient-to-t from-muted/30 to-background" />
            <div className="container mx-auto px-4 relative z-10">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Design Process</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  A simple, collaborative process that keeps you involved every step of the way.
                </p>
              </motion.div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {process.map((item, index) => (
                  <motion.div 
                    key={index} 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.08, y: -8, rotateY: 10 }}
                    className="text-center bg-white/85 dark:bg-card/85 backdrop-blur-2xl border border-white/60 rounded-2xl p-6 shadow-2xl"
                    style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
                  >
                    <motion.div 
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-4 shadow-2xl shadow-primary/40"
                    >
                      <span className="text-2xl font-bold text-white">{item.step}</span>
                    </motion.div>
                    <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-sm">{item.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section - 3D Glassmorphism */}
          <section className="py-20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
            <motion.div 
              animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-gradient-to-br from-primary/25 to-accent/25 blur-3xl"
            />
            <div className="container mx-auto px-4 text-center relative z-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-white/80 dark:bg-card/80 backdrop-blur-2xl border border-white/60 rounded-3xl p-12 shadow-2xl max-w-3xl mx-auto"
              >
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-3xl md:text-4xl font-bold mb-6"
                >
                  Ready for a Website That Works?
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
                >
                  Let's build something amazing together. Get a free quote today.
                </motion.p>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                  <motion.div whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.98 }}>
                    <Button asChild size="xl" variant="gold" className="shadow-2xl shadow-primary/40">
                      <Link to="/contact">
                        Request Free Quote
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.98 }}>
                    <Button asChild size="xl" variant="outline" className="bg-white/70 dark:bg-card/70 backdrop-blur-2xl border-white/50 shadow-xl">
                      <Link to="/business/website-insurance">
                        <Shield className="mr-2 h-5 w-5" />
                        Add Website Insurance
                      </Link>
                    </Button>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default WebsiteDesign;