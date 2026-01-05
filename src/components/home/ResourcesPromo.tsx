import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileText, Shield, BookOpen, ArrowRight, Sparkles, Download, Lock, Gift, ShoppingBag, Usb, CreditCard, Phone, Percent } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";

const resources = [
  {
    icon: Shield,
    title: "Cyber Insurance",
    description: "Protection against identity theft and cyber fraud with coverage up to $1M. Peace of mind for your digital life.",
    tag: "Protection",
    color: "from-blue-500 to-indigo-500",
    badge: "Most Popular",
  },
  {
    icon: FileText,
    title: "Emergency Scripts",
    description: "Free downloadable PDF scripts for IRS scams, tech support scams, grandparent scams, and bank fraud alerts.",
    tag: "Free Download",
    color: "from-emerald-500 to-teal-500",
    badge: null,
  },
  {
    icon: BookOpen,
    title: "Digital Guides",
    description: "20+ specialized books including AI Fundamentals, Scam Prevention, Senior Tech Handbook, and Identity Theft Prevention.",
    tag: "eBooks",
    color: "from-amber-500 to-orange-500",
    badge: "New",
  },
];

const products = [
  { icon: Usb, name: "Security USB Keys", price: "$49.99" },
  { icon: CreditCard, name: "RFID Wallets", price: "$24.99" },
  { icon: Phone, name: "Faraday Bags", price: "$19.99" },
  { icon: ShoppingBag, name: "Privacy Screens", price: "$39.99" },
];

const bookCategories = [
  "AI Fundamentals",
  "Scam Prevention",
  "Family Safety",
  "Digital Privacy",
  "Deepfake Detection",
  "Password Security",
];

const features = [
  { icon: Download, text: "Instant Downloads" },
  { icon: Lock, text: "Secure Access" },
  { icon: Gift, text: "Veteran Discounts (10%)" },
];

export const ResourcesPromo = () => {
  return (
    <section className="py-12 md:py-16 lg:py-24 bg-gradient-to-b from-muted/30 via-background to-muted/20 relative overflow-hidden">
      {/* Decorative elements - hidden on mobile */}
      <div className="hidden md:block absolute top-20 left-10 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="hidden md:block absolute bottom-20 right-10 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Mobile-first: Stack vertically, Desktop: Side by side */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          
          {/* Content Side */}
          <ScrollReveal animation="fade-up" className="order-2 lg:order-1 space-y-6 sm:space-y-8">
            <div className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 bg-accent/10 rounded-2xl border border-accent/20">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
              <span className="font-bold text-accent text-sm sm:text-base">Resources & Tools</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground leading-tight">
              Tools & Resources for{" "}
              <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">Complete Protection</span>
            </h2>
            
            <p className="text-base sm:text-xl text-muted-foreground leading-relaxed">
              Beyond training, we provide the tools you need to stay protected. From insurance coverage to free educational materials, 
              we've got you covered.
            </p>

            {/* Quick features */}
            <div className="flex flex-wrap gap-2 sm:gap-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-white rounded-full border border-border/50 shadow-sm">
                  <feature.icon className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                  <span className="text-xs sm:text-sm font-medium">{feature.text}</span>
                </div>
              ))}
            </div>

            {/* Book Categories */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-5 border border-border/50 shadow-sm">
              <h4 className="font-bold text-foreground mb-2 sm:mb-3 flex items-center gap-2 text-sm sm:text-base">
                <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                Digital Guide Categories
              </h4>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {bookCategories.map((category, index) => (
                  <span key={index} className="px-2 sm:px-3 py-1 sm:py-1.5 bg-muted rounded-full text-xs sm:text-sm font-medium text-foreground">
                    {category}
                  </span>
                ))}
                <span className="px-2 sm:px-3 py-1 sm:py-1.5 bg-primary/10 rounded-full text-xs sm:text-sm font-bold text-primary">
                  +14 more
                </span>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground mt-2 sm:mt-3">
                Books from <span className="font-bold text-foreground">$19.99 - $49.99</span>
              </p>
            </div>

            {/* Physical Products Preview */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-5 border border-border/50 shadow-sm">
              <h4 className="font-bold text-foreground mb-3 sm:mb-4 flex items-center gap-2 text-sm sm:text-base">
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                <span>Physical Security Products</span>
                <span className="ml-auto px-2 py-0.5 bg-accent/10 text-accent text-[10px] sm:text-xs font-bold rounded-full flex items-center gap-1">
                  <Percent className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> Bundle & Save 15%
                </span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                {products.map((product, index) => (
                  <div key={index} className="flex items-center gap-2 text-xs sm:text-sm">
                    <product.icon className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground flex-shrink-0" />
                    <span className="text-foreground">{product.name}</span>
                    <span className="text-muted-foreground ml-auto">{product.price}</span>
                  </div>
                ))}
              </div>
              <p className="text-[10px] sm:text-xs text-muted-foreground mt-2 sm:mt-3">
                15+ products from <span className="font-bold text-foreground">$7.99 - $149.99</span>
              </p>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4">
              <Button asChild size="lg" className="rounded-xl sm:rounded-2xl px-6 sm:px-10 shadow-lg shadow-primary/25 w-full sm:w-auto">
                <Link to="/resources">
                  Browse All Resources
                  <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                </Link>
              </Button>
            </div>
          </ScrollReveal>

          {/* Cards Side - Shows first on mobile */}
          <ScrollReveal animation="fade-up" delay={100} className="order-1 lg:order-2 space-y-4 sm:space-y-5 w-full">
            {resources.map((resource, index) => (
              <ScrollReveal
                key={index}
                animation="slide-right"
                delay={index * 100}
                className="group"
              >
                <Link to="/resources" className="block">
                  <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-border/50 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.12)] transition-all duration-300 flex items-start gap-3 sm:gap-5 hover:-translate-y-2 relative overflow-hidden">
                    {/* Badge */}
                    {resource.badge && (
                      <div className="absolute top-3 sm:top-4 right-3 sm:right-4 px-2 sm:px-3 py-0.5 sm:py-1 bg-primary/10 rounded-full">
                        <span className="text-[10px] sm:text-xs font-bold text-primary">{resource.badge}</span>
                      </div>
                    )}
                    
                    <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br ${resource.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-lg`}>
                      <resource.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 sm:mb-2 flex-wrap">
                        <h3 className="font-bold text-base sm:text-xl text-foreground group-hover:text-primary transition-colors">
                          {resource.title}
                        </h3>
                        <span className="text-[10px] sm:text-xs px-2 sm:px-2.5 py-0.5 sm:py-1 bg-muted rounded-full text-muted-foreground font-medium">
                          {resource.tag}
                        </span>
                      </div>
                      <p className="text-xs sm:text-base text-muted-foreground leading-relaxed line-clamp-2 sm:line-clamp-none">{resource.description}</p>
                    </div>
                    <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-muted-foreground group-hover:text-primary group-hover:translate-x-2 transition-all flex-shrink-0 mt-1 sm:mt-2" />
                  </div>
                </Link>
              </ScrollReveal>
            ))}

            {/* Free Resources Banner */}
            <div className="bg-gradient-to-r from-primary to-accent rounded-2xl sm:rounded-3xl p-4 sm:p-6 text-white">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-14 sm:h-14 bg-white/20 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Download className="w-5 h-5 sm:w-7 sm:h-7" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-base sm:text-lg">Free Emergency Anti-Scam Scripts</h4>
                  <p className="text-white/80 text-xs sm:text-sm">IRS • Tech Support • Grandparent • Bank Fraud</p>
                </div>
                <Link to="/resources" className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-full text-xs sm:text-sm font-bold transition-colors whitespace-nowrap self-start sm:self-auto">
                  Get Free →
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
