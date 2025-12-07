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
    <section className="py-16 md:py-24 bg-gradient-to-b from-background via-muted/30 to-background relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: "6s" }} />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: "8s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-primary/5 to-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Welcome Header */}
        <ScrollRevealSection>
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Welcome to InVision Network</span>
            </motion.div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
              Your Trusted Partner in Digital Safety
            </h2>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              InVision Network is Ohio's premier cybersecurity company dedicated to protecting families and businesses 
              from AI-powered scams, phishing attacks, and digital threats. We combine cutting-edge technology with 
              personalized human support to keep you safe in an increasingly dangerous digital world.
            </p>
          </div>
        </ScrollRevealSection>

        {/* Mission Statement */}
        <ScrollRevealSection>
          <Card className="p-8 md:p-12 mb-16 bg-gradient-to-br from-primary/5 via-card to-accent/5 border-primary/20 rounded-3xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent/10 rounded-full blur-2xl" />
            
            <div className="relative z-10 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent mb-6">
                <Heart className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Our Mission</h3>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
                "To empower every individual, family, and business with the knowledge and tools they need to stay safe 
                from digital threats—because no one should lose their life savings to a scam."
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-background/80 rounded-full border border-border/50">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium">Kettering, Ohio Based</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-background/80 rounded-full border border-border/50">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium">Veteran-Owned Business</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-background/80 rounded-full border border-border/50">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium">10% Veteran Discount</span>
                </div>
              </div>
            </div>
          </Card>
        </ScrollRevealSection>

        {/* What We Offer */}
        <ScrollRevealSection staggerChildren>
          <div className="mb-16">
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-10">What We Offer</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <Card 
                  key={index}
                  className="p-6 hover:shadow-strong transition-all duration-500 hover:-translate-y-2 hover:scale-105 rounded-2xl border-border/50 group bg-gradient-to-br from-card to-card/50"
                >
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <h4 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </ScrollRevealSection>

        {/* Why Choose InVision */}
        <ScrollRevealSection>
          <div className="mb-16">
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-10">Why Choose InVision Network?</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {whyChooseUs.map((item, index) => (
                <Card 
                  key={index}
                  className="p-4 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 rounded-xl border-border/50 group bg-card/80"
                >
                  <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <p className="text-xs md:text-sm font-medium text-foreground leading-tight">
                    {item.text}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </ScrollRevealSection>

        {/* Quick Navigation */}
        <ScrollRevealSection staggerChildren>
          <div className="mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-4">Explore Our Services</h3>
            <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
              Everything you need to protect yourself, your family, and your business is just a click away
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {quickLinks.map((link, index) => (
                <Link key={index} to={link.href} className="group">
                  <Card className="p-6 h-full hover:shadow-strong transition-all duration-500 hover:-translate-y-2 hover:border-primary/50 rounded-2xl border-border/50 bg-gradient-to-br from-card to-card/50 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-full blur-xl group-hover:bg-primary/10 transition-colors" />
                    
                    <div className="relative z-10">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                        <link.icon className="w-6 h-6 text-primary" />
                      </div>
                      
                      <h4 className="text-lg font-bold mb-1 group-hover:text-primary transition-colors flex items-center gap-2">
                        {link.label}
                        <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                      </h4>
                      <p className="text-sm text-muted-foreground">{link.desc}</p>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </ScrollRevealSection>

        {/* Trust Assurance */}
        <ScrollRevealSection>
          <Card className="p-8 bg-gradient-to-r from-primary/10 via-transparent to-accent/10 border-primary/20 rounded-3xl text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Shield className="w-8 h-8 text-primary" />
              <h3 className="text-xl md:text-2xl font-bold">Your Security is Our Priority</h3>
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
              We use bank-level encryption, never store sensitive data, and our team is trained to the highest 
              cybersecurity standards. Your trust is everything to us.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="gap-2">
                <Link to="/about">
                  Learn More About Us
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="gap-2">
                <Link to="/contact">
                  Get in Touch
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </Card>
        </ScrollRevealSection>
      </div>
    </section>
  );
};
