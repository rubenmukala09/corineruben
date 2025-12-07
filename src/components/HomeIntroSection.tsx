import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Shield, 
  Users, 
  GraduationCap, 
  Building2, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  Lock,
  Heart,
  Zap,
  Globe,
  Award
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollRevealSection } from "@/components/ScrollRevealSection";

export const HomeIntroSection = () => {
  const features = [
    {
      icon: Shield,
      title: "AI-Powered Protection",
      description: "24/7 monitoring and analysis of suspicious communications using advanced AI technology",
      color: "from-primary to-primary/70"
    },
    {
      icon: GraduationCap,
      title: "Expert Training",
      description: "Learn to identify and prevent scams with our certified cybersecurity professionals",
      color: "from-accent to-accent/70"
    },
    {
      icon: Building2,
      title: "Business Solutions",
      description: "Protect your business with AI automation, security audits, and professional services",
      color: "from-primary to-accent"
    },
    {
      icon: Users,
      title: "Family Safety",
      description: "Keep your loved ones safe with comprehensive protection plans for the whole family",
      color: "from-accent to-primary"
    }
  ];

  const whyChooseUs = [
    { icon: Lock, text: "Military-grade security protocols" },
    { icon: Zap, text: "24-hour response time guarantee" },
    { icon: Heart, text: "Veteran-owned & operated" },
    { icon: Globe, text: "Multilingual support (EN, ES, FR)" },
    { icon: Award, text: "500+ families protected" },
    { icon: Sparkles, text: "AI-powered threat detection" }
  ];

  const quickLinks = [
    { label: "ScamShield Protection", href: "/training#pricing", icon: Shield, desc: "Get protected now" },
    { label: "Learn & Train", href: "/training", icon: GraduationCap, desc: "Prevention training" },
    { label: "AI for Business", href: "/business", icon: Building2, desc: "Business solutions" },
    { label: "Resources", href: "/resources", icon: Sparkles, desc: "Tools & guides" }
  ];

  return (
    <section className="py-10 md:py-14 bg-gradient-to-b from-background via-muted/30 to-background relative overflow-hidden">
      {/* Background decorations - smaller */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-48 h-48 bg-primary/8 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-accent/8 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Welcome Header - Compact */}
        <ScrollRevealSection>
          <div className="text-center mb-10">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-4"
            >
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs font-medium text-primary">Welcome to InVision Network</span>
            </motion.div>
            
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
              Your Trusted Partner in Digital Safety
            </h2>
            
            <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Ohio's premier cybersecurity company protecting families and businesses from AI-powered scams and digital threats.
            </p>
          </div>
        </ScrollRevealSection>

        {/* Mission Statement - Compact */}
        <ScrollRevealSection>
          <Card className="p-5 md:p-8 mb-10 bg-gradient-to-br from-primary/5 via-card to-accent/5 border-primary/20 rounded-2xl relative overflow-hidden">
            <div className="relative z-10 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent mb-4">
                <Heart className="w-6 h-6 text-white" />
              </div>
              
              <h3 className="text-xl md:text-2xl font-bold mb-3">Our Mission</h3>
              <p className="text-sm text-muted-foreground max-w-xl mx-auto mb-4">
                "Empowering individuals, families, and businesses with tools to stay safe from digital threats."
              </p>
              
              <div className="flex flex-wrap justify-center gap-2">
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-background/80 rounded-full border border-border/50">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span className="text-xs font-medium">Kettering, Ohio</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-background/80 rounded-full border border-border/50">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span className="text-xs font-medium">Veteran-Owned</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-background/80 rounded-full border border-border/50">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span className="text-xs font-medium">10% Veteran Discount</span>
                </div>
              </div>
            </div>
          </Card>
        </ScrollRevealSection>

        {/* What We Offer - Compact */}
        <ScrollRevealSection staggerChildren>
          <div className="mb-10">
            <h3 className="text-xl md:text-2xl font-bold text-center mb-6">What We Offer</h3>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
              {features.map((feature, index) => (
                <Card 
                  key={index}
                  className="p-4 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 rounded-xl border-border/50 group bg-gradient-to-br from-card to-card/50"
                >
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                    <feature.icon className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="text-sm font-bold mb-1 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                    {feature.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </ScrollRevealSection>

        {/* Why Choose InVision - Compact */}
        <ScrollRevealSection>
          <div className="mb-10">
            <h3 className="text-xl md:text-2xl font-bold text-center mb-6">Why Choose InVision?</h3>
            
            <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-3">
              {whyChooseUs.map((item, index) => (
                <Card 
                  key={index}
                  className="p-3 text-center hover:shadow-md transition-all duration-200 rounded-lg border-border/50 group bg-card/80"
                >
                  <div className="w-9 h-9 mx-auto rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                    <item.icon className="w-4 h-4 text-primary" />
                  </div>
                  <p className="text-[10px] md:text-xs font-medium text-foreground leading-tight">
                    {item.text}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </ScrollRevealSection>

        {/* Quick Navigation - Compact */}
        <ScrollRevealSection staggerChildren>
          <div className="mb-8">
            <h3 className="text-xl md:text-2xl font-bold text-center mb-2">Explore Our Services</h3>
            <p className="text-center text-muted-foreground mb-6 text-sm max-w-xl mx-auto">
              Everything you need to protect yourself and your business
            </p>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {quickLinks.map((link, index) => (
                <Link key={index} to={link.href} className="group">
                  <Card className="p-4 h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 rounded-xl border-border/50 bg-gradient-to-br from-card to-card/50">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                      <link.icon className="w-5 h-5 text-primary" />
                    </div>
                    
                    <h4 className="text-sm font-bold mb-0.5 group-hover:text-primary transition-colors flex items-center gap-1">
                      {link.label}
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h4>
                    <p className="text-xs text-muted-foreground">{link.desc}</p>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </ScrollRevealSection>

        {/* Trust Assurance - Compact */}
        <ScrollRevealSection>
          <Card className="p-5 md:p-6 bg-gradient-to-r from-primary/10 via-transparent to-accent/10 border-primary/20 rounded-2xl text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Shield className="w-6 h-6 text-primary" />
              <h3 className="text-lg md:text-xl font-bold">Your Security is Our Priority</h3>
            </div>
            <p className="text-sm text-muted-foreground max-w-xl mx-auto mb-4">
              Bank-level encryption, trained cybersecurity professionals, and your complete trust.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button asChild size="sm" className="gap-1.5">
                <Link to="/about">
                  Learn More
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="sm" className="gap-1.5">
                <Link to="/contact">
                  Contact Us
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </Button>
            </div>
          </Card>
        </ScrollRevealSection>
      </div>
    </section>
  );
};
