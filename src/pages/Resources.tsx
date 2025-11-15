import { useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PurchaseModal } from "@/components/PurchaseModal";
import { Badge } from "@/components/ui/badge";
import { Download, Shield, Wifi, KeyRound, Heart, FileText, ShoppingCart, Star, TrendingUp } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";
import heroResourcesMarketplace from "@/assets/hero-resources-marketplace.jpg";
import { SEO } from "@/components/SEO";

function Resources() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<{
    type: 'guide' | 'product';
    name: string;
    price?: number;
  } | null>(null);

  const guides = [
    { 
      icon: Shield, 
      title: "The Scam-Proof Playbook", 
      desc: "Word-for-word scripts to shut down any scammer. What to say when your 'grandson' calls from jail, when the 'IRS' threatens arrest, or when 'Microsoft' needs remote access.", 
      price: 29, 
      slug: "scam-proof-playbook",
      badge: "Best Seller",
      rating: 4.9,
      reviews: 127
    },
    { 
      icon: Heart, 
      title: "The Caregiver's Security Shield", 
      desc: "Protect the ones you love who can't protect themselves. Everything you need to safeguard aging parents, relatives with cognitive decline, or vulnerable loved ones.", 
      price: 24, 
      slug: "caregivers-security-guide",
      badge: "Popular",
      rating: 4.8,
      reviews: 94
    },
    { 
      icon: Wifi, 
      title: "15-Minute Home Wi-Fi Lockdown", 
      desc: "Your home network is your front door. Lock it down in 15 minutes with step-by-step instructions anyone can follow. No tech degree required.", 
      price: 19, 
      slug: "home-wifi-safety",
      badge: "New",
      rating: 4.7,
      reviews: 56
    },
    { 
      icon: KeyRound, 
      title: "The Offline Password Vault", 
      desc: "Digital password managers confuse you? This beautiful hardcover notebook is your offline fortress. Organized, secure, and hack-proof.", 
      price: 15, 
      slug: "password-creation-notebook",
      rating: 4.6,
      reviews: 82
    },
    { 
      icon: FileText, 
      title: "Emergency Family Text Protocol", 
      desc: "Scammers are texting 'grandparents' pretending to be in jail, hurt, or stranded. Learn the 5-question test that exposes fakes every time.", 
      price: 12, 
      slug: "grandparent-text-101",
      rating: 4.9,
      reviews: 103
    },
    { 
      icon: Shield, 
      title: "The 60-Second Pause Poster", 
      desc: "Beautiful fridge magnet poster with the ONE rule that stops 90% of scams: 'Stop. Breathe. Call someone you trust.' Free with any purchase.", 
      price: 9, 
      slug: "pause-protocol-poster",
      badge: "Free Gift",
      rating: 5.0,
      reviews: 215
    },
  ];

  const products = [
    { 
      name: "USB Data Blocker (2-pack)", 
      price: 12.99, 
      slug: "usb-data-blocker-2pack",
      stock: 15,
      rating: 4.5,
      reviews: 42
    },
    { 
      name: "Webcam Privacy Covers (3-pack)", 
      price: 8.99, 
      slug: "webcam-privacy-covers-3pack",
      stock: 8,
      rating: 4.7,
      reviews: 68
    },
    { 
      name: "RFID-Blocking Card Sleeves (5-pack)", 
      price: 14.99, 
      slug: "rfid-blocking-card-sleeves-5pack",
      stock: 23,
      rating: 4.6,
      reviews: 51
    },
    { 
      name: "Password Manager Keychain Tool", 
      price: 9.99, 
      slug: "password-manager-keychain",
      stock: 34,
      rating: 4.4,
      reviews: 29
    },
    { 
      name: "Privacy Screen Protector (13-15\")", 
      price: 24.99, 
      slug: "privacy-screen-protector-laptop",
      stock: 12,
      rating: 4.8,
      reviews: 37
    },
    { 
      name: "Secure Flash Drive (16GB)", 
      price: 19.99, 
      slug: "secure-encrypted-flash-drive",
      stock: 19,
      rating: 4.9,
      reviews: 83
    }
  ];

  const handlePurchase = (type: 'guide' | 'product', name: string, price?: number) => {
    setSelectedItem({ type, name, price });
    setModalOpen(true);
  };

  return (
    <>
      <SEO 
        title="Resources & Marketplace - Digital Guides & Security Products"
        description="Browse our curated collection of scam prevention guides and physical security products. Everything you need to protect yourself and your loved ones."
      />
      <Navigation />
      
      <Hero
        backgroundImage={heroResourcesMarketplace}
        headline="Your Digital Safety Arsenal"
        subheadline="Premium guides, tools, and products to protect what matters most"
      />

      <TrustBar />

      {/* Quick Navigation Pills */}
      <section className="py-6 md:py-8 bg-secondary/30">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="flex flex-wrap gap-3 justify-center">
              {["Digital Guides", "Physical Products", "Bundles", "Free Resources"].map((category) => (
                <Button
                  key={category}
                  variant="outline"
                  size="lg"
                  className="rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300 text-sm md:text-base"
                >
                  {category}
                </Button>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Digital Guides Section */}
      <section id="guides" className="py-10 md:py-14 bg-gradient-to-b from-background to-secondary/20">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-8">
              <Badge className="mb-3 text-base md:text-lg px-4 md:px-6 py-2" variant="secondary">
                <Download className="w-4 h-4 mr-2" />
                Instant Digital Download
              </Badge>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Digital Security Guides
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                Expert knowledge delivered instantly. Download and print, or read on any device.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {guides.map((guide, index) => {
              const Icon = guide.icon;
              return (
                <ScrollReveal key={guide.slug} delay={index * 100}>
                  <Card className="group p-5 hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 border-2 border-border/50 hover:border-primary/50 relative overflow-hidden bg-gradient-to-br from-background to-secondary/10">
                    {guide.badge && (
                      <Badge className="absolute top-4 right-4 animate-pulse shadow-lg text-xs">
                        {guide.badge}
                      </Badge>
                    )}
                    <div className="mb-4">
                      <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                        <Icon className="w-7 h-7 md:w-8 md:h-8 text-primary" />
                      </div>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                      {guide.title}
                    </h3>
                    <p className="text-sm md:text-base text-muted-foreground mb-6 leading-relaxed">
                      {guide.desc}
                    </p>
                    
                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-3 h-3 md:w-4 md:h-4 ${i < Math.floor(guide.rating) ? 'fill-amber-400 text-amber-400' : 'text-muted'}`} />
                        ))}
                      </div>
                      <span className="text-xs md:text-sm text-muted-foreground">
                        {guide.rating} ({guide.reviews})
                      </span>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-auto pt-4 border-t border-border">
                      <div>
                        <div className="text-2xl md:text-3xl font-bold text-primary">
                          ${guide.price}
                        </div>
                        <div className="text-xs md:text-sm text-muted-foreground">One-time payment</div>
                      </div>
                      <Button 
                        size="lg"
                        onClick={() => handlePurchase('guide', guide.title, guide.price)}
                        className="w-full sm:w-auto group-hover:scale-110 transition-transform duration-300 shadow-lg text-sm md:text-base"
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Get Access
                      </Button>
                    </div>
                  </Card>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Physical Products Section */}
      <section id="products" className="py-10 md:py-14 bg-background">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-8">
              <Badge className="mb-3 text-base md:text-lg px-4 md:px-6 py-2" variant="secondary">
                <Shield className="w-4 h-4 mr-2" />
                Ships Within 2-3 Business Days
              </Badge>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Physical Security Products
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                Carefully curated hardware to enhance your digital safety
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {products.map((product, index) => (
              <ScrollReveal key={product.slug} delay={index * 100}>
                <Card className="group hover:shadow-2xl transition-all duration-500 hover:scale-105 border-2 border-border/50 hover:border-primary/50 overflow-hidden">
                  <div className="aspect-video bg-gradient-to-br from-secondary to-muted flex items-center justify-center relative overflow-hidden">
                    <Shield className="w-20 h-20 md:w-24 md:h-24 text-muted-foreground/30 group-hover:scale-125 transition-transform duration-500" />
                    {product.stock < 10 && (
                      <Badge variant="destructive" className="absolute top-4 right-4 animate-pulse text-xs">
                        Only {product.stock} left!
                      </Badge>
                    )}
                  </div>
                  
                  <div className="p-4">
                    <h3 className="text-lg md:text-xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                    
                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-3 h-3 md:w-4 md:h-4 ${i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-muted'}`} />
                        ))}
                      </div>
                      <span className="text-xs md:text-sm text-muted-foreground">
                        {product.rating} ({product.reviews})
                      </span>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-border">
                      <div className="text-2xl md:text-3xl font-bold text-primary">
                        ${product.price}
                      </div>
                      <Button 
                        onClick={() => handlePurchase('product', product.name, product.price)}
                        className="w-full sm:w-auto group-hover:scale-110 transition-transform duration-300 text-sm md:text-base"
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories Teaser */}
      <section className="py-12 md:py-20 bg-gradient-to-b from-secondary/20 to-background">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center max-w-4xl mx-auto">
              <Badge className="mb-4 text-base md:text-lg px-4 md:px-6 py-2 bg-success/20 text-success border-success/50">
                <TrendingUp className="w-4 h-4 mr-2" />
                Success Stories
              </Badge>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6">
                Join 500+ Families Who Are Now Scam-Proof
              </h2>
              <p className="text-base md:text-xl text-muted-foreground mb-6 md:mb-8 px-4">
                "These guides saved my mother from losing $50,000 to a fake IRS scam. Worth every penny." - Susan M.
              </p>
              <Link to="/about#testimonials">
                <Button size="lg" variant="outline" className="text-sm md:text-base">
                  Read More Success Stories
                </Button>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />

      <PurchaseModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        itemType={selectedItem?.type || 'product'}
        itemName={selectedItem?.name || ''}
        suggestedPrice={selectedItem?.price}
      />
    </>
  );
}

export default Resources;
