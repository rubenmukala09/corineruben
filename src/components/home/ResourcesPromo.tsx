import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileText, Shield, BookOpen, ArrowRight, Sparkles, Download, Lock, Gift, ShoppingBag, Usb, CreditCard, Phone, Package, Star, Percent } from "lucide-react";
import resourcesHeroDesk from "@/assets/resources-hero-desk.png";

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
    <section className="py-24 bg-gradient-to-b from-muted/30 via-background to-muted/20 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent/10 rounded-2xl border border-accent/20">
              <Sparkles className="w-5 h-5 text-accent" />
              <span className="font-bold text-accent">Resources & Tools</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Tools & Resources for{" "}
              <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">Complete Protection</span>
            </h2>
            
            <p className="text-xl text-muted-foreground leading-relaxed">
              Beyond training, we provide the tools you need to stay protected. From insurance coverage to free educational materials, 
              we've got you covered.
            </p>

            {/* Quick features */}
            <div className="flex flex-wrap gap-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-border/50 shadow-sm">
                  <feature.icon className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">{feature.text}</span>
                </div>
              ))}
            </div>

            {/* Book Categories */}
            <div className="bg-white rounded-3xl p-5 border border-border/50 shadow-sm">
              <h4 className="font-bold text-foreground mb-3 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                Digital Guide Categories
              </h4>
              <div className="flex flex-wrap gap-2">
                {bookCategories.map((category, index) => (
                  <span key={index} className="px-3 py-1.5 bg-muted rounded-full text-sm font-medium text-foreground">
                    {category}
                  </span>
                ))}
                <span className="px-3 py-1.5 bg-primary/10 rounded-full text-sm font-bold text-primary">
                  +14 more
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-3">
                Books from <span className="font-bold text-foreground">$19.99 - $49.99</span>
              </p>
            </div>

            {/* Physical Products Preview */}
            <div className="bg-white rounded-3xl p-5 border border-border/50 shadow-sm">
              <h4 className="font-bold text-foreground mb-4 flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-primary" />
                Physical Security Products
                <span className="ml-auto px-2 py-0.5 bg-accent/10 text-accent text-xs font-bold rounded-full flex items-center gap-1">
                  <Percent className="w-3 h-3" /> Bundle & Save 15%
                </span>
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {products.map((product, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <product.icon className="w-4 h-4 text-muted-foreground" />
                    <span className="text-foreground">{product.name}</span>
                    <span className="text-muted-foreground ml-auto">{product.price}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                15+ products from <span className="font-bold text-foreground">$7.99 - $149.99</span>
              </p>
            </div>

            {/* CTA */}
            <div className="flex flex-wrap gap-4 pt-4">
              <Button asChild size="xl" className="rounded-2xl px-10 shadow-lg shadow-primary/25">
                <Link to="/resources">
                  Browse All Resources
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* Cards Side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-5"
          >
            {resources.map((resource, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="group"
              >
                <Link to="/resources" className="block">
                  <div className="bg-white rounded-3xl p-6 border border-border/50 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.12)] transition-all duration-300 flex items-start gap-5 hover:-translate-y-2 relative overflow-hidden">
                    {/* Badge */}
                    {resource.badge && (
                      <div className="absolute top-4 right-4 px-3 py-1 bg-primary/10 rounded-full">
                        <span className="text-xs font-bold text-primary">{resource.badge}</span>
                      </div>
                    )}
                    
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${resource.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-lg`}>
                      <resource.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-bold text-xl text-foreground group-hover:text-primary transition-colors">
                          {resource.title}
                        </h3>
                        <span className="text-xs px-2.5 py-1 bg-muted rounded-full text-muted-foreground font-medium">
                          {resource.tag}
                        </span>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">{resource.description}</p>
                    </div>
                    <ArrowRight className="w-6 h-6 text-muted-foreground group-hover:text-primary group-hover:translate-x-2 transition-all flex-shrink-0 mt-2" />
                  </div>
                </Link>
              </motion.div>
            ))}

            {/* Free Resources Banner */}
            <div className="bg-gradient-to-r from-primary to-accent rounded-3xl p-6 text-white">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
                  <Download className="w-7 h-7" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-lg">Free Emergency Anti-Scam Scripts</h4>
                  <p className="text-white/80 text-sm">IRS • Tech Support • Grandparent • Bank Fraud</p>
                </div>
                <Link to="/resources" className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-full text-sm font-bold transition-colors">
                  Get Free →
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
