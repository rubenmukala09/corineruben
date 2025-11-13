import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import FlowingWaves from "@/components/FlowingWaves";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PurchaseModal } from "@/components/PurchaseModal";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Download, Shield, Wifi, KeyRound, Heart, FileText, ShoppingCart, Loader2 } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";
import heroResources from "@/assets/hero-resources-new.jpg";

function Resources() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<{
    type: 'guide' | 'product';
    name: string;
    price?: number;
  } | null>(null);
  const [loadingButton, setLoadingButton] = useState<string | null>(null);
  const [activeProductImages, setActiveProductImages] = useState<{ [key: string]: number }>({});
  const navigate = useNavigate();

  const handlePurchaseClick = (slug: string, price: number) => {
    setLoadingButton(slug);
    // Simulate brief loading before navigation
    setTimeout(() => {
      navigate(`/contact?service=purchase&item=${slug}&price=${price}`);
      setLoadingButton(null);
    }, 300);
  };

  const guides = [
    { icon: Shield, title: "Scam-Proof Playbook", desc: "Complete emergency scripts & protocols", price: 29, slug: "scam-proof-playbook" },
    { icon: Heart, title: "Caregivers' Security Guide", desc: "Protect vulnerable loved ones from scams", price: 24, slug: "caregivers-security-guide" },
    { icon: Wifi, title: "Home Wi-Fi Safety", desc: "Secure your network in 15 minutes", price: 19, slug: "home-wifi-safety" },
    { icon: KeyRound, title: "Password Creation Notebook Template", desc: "Offline password storage system", price: 15, slug: "password-creation-notebook" },
    { icon: FileText, title: "Grandparent-Text 101", desc: "Spot fake 'emergency' family texts", price: 12, slug: "grandparent-text-101" },
    { icon: Shield, title: "60-Second Pause Protocol Poster", desc: "Print and post on your fridge", price: 9, slug: "pause-protocol-poster" },
  ];

  const products = [
    { 
      name: "USB Data Blocker (2-pack)", 
      price: 12.99, 
      slug: "usb-data-blocker-2pack",
      images: [
        "https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1591370874773-6702e8f12fd8?w=400&h=300&fit=crop"
      ]
    },
    { 
      name: "Webcam Privacy Covers (3-pack)", 
      price: 8.99, 
      slug: "webcam-privacy-covers-3pack",
      images: [
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1484788984921-03950022c9ef?w=400&h=300&fit=crop"
      ]
    },
    { 
      name: "RFID-Blocking Card Sleeves (5-pack)", 
      price: 14.99, 
      slug: "rfid-blocking-card-sleeves-5pack",
      images: [
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=300&fit=crop"
      ]
    },
    { 
      name: "Password Notebook (Hardcover)", 
      price: 16.99, 
      slug: "password-notebook-hardcover",
      images: [
        "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=400&h=300&fit=crop"
      ]
    },
    { 
      name: "Complete Security Kit (Bundle)", 
      price: 44.99, 
      slug: "complete-security-kit-bundle",
      images: [
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=300&fit=crop"
      ]
    },
  ];

  const blogArticles = [
    {
      title: "How to Spot a Deepfake Voice Call in 5 Seconds",
      image: "https://images.unsplash.com/photo-1589254065878-42c9da997008?w=800&h=400&fit=crop",
      excerpt: "Learn the telltale signs of AI-generated voice scams and protect yourself from sophisticated fraud attempts targeting families.",
      date: "Jan 15, 2025"
    },
    {
      title: "The New QR Code Scam Targeting Seniors",
      image: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=800&h=400&fit=crop",
      excerpt: "Scammers are using fake QR codes to steal personal information. Here's what to watch out for and how to stay safe.",
      date: "Jan 10, 2025"
    },
    {
      title: "What to Do If You Think You've Been Scammed",
      image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=800&h=400&fit=crop",
      excerpt: "Step-by-step guide to reporting fraud, protecting your accounts, and recovering from a scam incident.",
      date: "Jan 5, 2025"
    },
  ];

  const faqs = [
    {
      q: "Is this only for seniors?",
      a: "Not at all! While we specialize in adults 40+, anyone who wants AI scam protection is welcome. We've trained ages 35-85.",
    },
    {
      q: "Do you ask for my passwords?",
      a: "NEVER. We teach verification techniques without ever requesting sensitive data. If anyone claiming to be InVision asks for passwords, it's a scam.",
    },
    {
      q: "What if I'm not tech-savvy?",
      a: "Perfect! Our training assumes zero technical knowledge. If you can use email, you're ready.",
    },
    {
      q: "Can family members join my training?",
      a: "Yes! Our Family Small Group plan includes your spouse. Priority Private sessions can include up to 3 people.",
    },
    {
      q: "Do you record Zoom sessions?",
      a: "No. We do NOT record classes to protect your privacy. No login required to attend.",
    },
    {
      q: "What are your rescheduling terms?",
      a: "Single Small Group: Not available. Family Small Group: One reschedule (14 days notice). Priority Private: Easy reschedule (24hr notice).",
    },
    {
      q: "Do you provide certificates?",
      a: "Yes! Every training includes a digital certificate of completion you can print or share.",
    },
    {
      q: "Do you travel for in-person training?",
      a: "Yes! We serve Dayton-Kettering metro locally and offer nationwide in-person training. InVision covers all trainer travel costs.",
    },
    {
      q: "How do military/veteran discounts work?",
      a: "Veterans and active military receive 10% off all training and services. Contact us with verification.",
    },
    {
      q: "What's your refund policy?",
      a: "We offer a 7-day satisfaction guarantee. If you're not satisfied with your training, contact us within 7 days for a full refund.",
    },
    {
      q: "How long does Scam Shield analysis take?",
      a: "Standard Plan: ≤ 48 hours. Premium Plan: ≤ 24 hours. Unlimited Plan: ≤ 12 hours.",
    },
    {
      q: "Can I submit items in Spanish or French?",
      a: "Yes! We analyze items in English, Spanish, and French. Other languages may take longer.",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero */}
      <Hero
        backgroundImage={heroResources}
        headline="Resources & Tools"
        subheadline="Guides, security products, and answers to your questions."
        showScrollIndicator={true}
      />

      <TrustBar />

      {/* Guides */}
      <section className="py-16 bg-background relative">
        <FlowingWaves variant="full" opacity={0.12} />
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-center mb-3">Professional Security Guides & Books</h2>
          <p className="text-center text-muted-foreground mb-10">
            Expert-written resources to protect yourself and your loved ones
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {guides.map((guide, index) => (
              <Card 
                key={index} 
                className="p-6 transition-all duration-[400ms] ease-in-out hover:-translate-y-1.5 hover:shadow-[0_15px_35px_rgba(0,0,0,0.12)] hover:border-[#14B8A6] hover:border-2 rounded-2xl group"
              >
                <div className="flex justify-center mb-4 overflow-hidden rounded-full">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full flex items-center justify-center transition-transform duration-[400ms] ease-in-out group-hover:scale-105">
                    <guide.icon className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3 text-center">{guide.title}</h3>
                <p className="text-muted-foreground text-center mb-4">{guide.desc}</p>
                {guide.slug && guide.price ? (
                  <Button 
                    onClick={() => handlePurchaseClick(guide.slug!, guide.price!)}
                    disabled={loadingButton === guide.slug}
                    className="w-full group/btn transition-all duration-300 hover:brightness-90" 
                    variant="outline"
                  >
                    {loadingButton === guide.slug ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        LOADING...
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4 mr-2 transition-transform duration-300 group-hover/btn:animate-[bounce-down_0.6s_ease-in-out_infinite]" />
                        PURCHASE
                      </>
                    )}
                  </Button>
                ) : (
                  <Button 
                    onClick={() => {
                      setSelectedItem({
                        type: 'guide',
                        name: guide.title
                      });
                      setModalOpen(true);
                    }}
                    className="w-full" 
                    variant="outline"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    PURCHASE
                  </Button>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Veterans Discount Banner */}
      <section className="py-8 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="container mx-auto px-4">
          <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/20 max-w-3xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-2xl">
                  🇺🇸
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-1">Veterans & First Responders</h3>
                <p className="text-muted-foreground text-sm">Active duty, veterans, reservists, and first responders receive 10% OFF all resources and products</p>
              </div>
              <Button variant="default" asChild>
                <Link to="/contact">Claim Discount</Link>
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* Security Tools Shop */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-center mb-3">Security Tools Shop</h2>
          <p className="text-center text-muted-foreground mb-10">
            Profits support training for seniors in need.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
            {products.map((product, index) => {
              const isBundle = product.slug === "complete-security-kit-bundle";
              const currentImageIndex = activeProductImages[product.slug] || 0;
              return (
                <Card 
                  key={index} 
                  className={`p-6 hover:shadow-medium transition-all hover:-translate-y-1 flex flex-col rounded-2xl relative ${
                    isBundle ? 'border-2 border-accent shadow-[0_0_20px_rgba(20,184,166,0.3)]' : ''
                  }`}
                >
                  {isBundle && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-accent to-primary text-white px-4 py-1 rounded-full text-xs font-bold shadow-md z-10">
                      BEST VALUE
                    </div>
                  )}
                  
                  {/* Image Gallery */}
                  <div className="mb-4">
                    <div className="relative overflow-hidden rounded-xl group/image aspect-[4/3] mb-2">
                      <img 
                        src={product.images[currentImageIndex]} 
                        alt={product.name}
                        className="w-full h-full object-cover transition-all duration-500 group-hover/image:scale-115"
                      />
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover/image:opacity-100 transition-opacity duration-300">
                        <span className="text-white font-semibold text-sm">Quick View</span>
                      </div>
                    </div>
                    
                    {/* Thumbnail Dots */}
                    {product.images.length > 1 && (
                      <div className="flex justify-center gap-2">
                        {product.images.map((_, imgIndex) => (
                          <button
                            key={imgIndex}
                            onClick={() => setActiveProductImages(prev => ({ ...prev, [product.slug]: imgIndex }))}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                              currentImageIndex === imgIndex 
                                ? 'bg-primary w-6' 
                                : 'bg-muted-foreground/30 hover:bg-muted-foreground/60'
                            }`}
                            aria-label={`View image ${imgIndex + 1}`}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  <h3 className="font-bold mb-2 text-center flex-grow">{product.name}</h3>
                  <p className={`font-bold gradient-text-primary text-center mb-4 ${isBundle ? 'text-3xl' : 'text-2xl'}`}>
                    ${product.price.toFixed(2)}
                  </p>
                  <Button 
                    onClick={() => handlePurchaseClick(product.slug, product.price)}
                    disabled={loadingButton === product.slug}
                    variant="default" 
                    className={`w-full group ${isBundle ? 'h-12 text-base shadow-[0_0_15px_rgba(20,184,166,0.4)] hover:shadow-[0_0_25px_rgba(20,184,166,0.6)]' : ''}`}
                  >
                    {loadingButton === product.slug ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        LOADING...
                      </>
                    ) : (
                      <>
                        <span className="mr-2 transition-transform duration-300 group-hover:animate-[bounce_0.5s_ease-in-out_infinite]">🛒</span>
                        BUY NOW
                      </>
                    )}
                  </Button>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Blog */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-center mb-10">Recent Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogArticles.map((article, index) => {
              const animations = ['fade-in-bottom-left', 'fade-in-bottom', 'fade-in-bottom-right'];
              const delays = [0, 150, 300];
              const animationClass = `animate-[${animations[index]}_0.6s_ease-out_${delays[index]}ms_both]`;
              
              return (
                <ScrollReveal key={index} threshold={0.3}>
                  <Card className={`group overflow-hidden rounded-2xl transition-all duration-[400ms] ease-in-out hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)] hover:-translate-y-2 ${animationClass}`}>
                    <div className="relative overflow-hidden">
                      <img 
                        src={article.image} 
                        alt={article.title} 
                        className="w-full h-[200px] object-cover transition-transform duration-[400ms] ease-in-out group-hover:scale-108" 
                        loading="lazy" 
                      />
                      <div className="absolute top-3 left-3 bg-primary/90 text-white px-3 py-1 rounded-md text-sm font-semibold">
                        {article.date}
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-3 leading-tight">{article.title}</h3>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2 leading-relaxed">
                        {article.excerpt}
                      </p>
                      <Link 
                        to="/articles" 
                        className="text-[#14B8A6] hover:text-[#0F9A8A] font-semibold inline-flex items-center gap-1 transition-all duration-[400ms] ease-in-out group"
                      >
                        <span>READ MORE</span>
                        <span className="transition-transform duration-[400ms] ease-in-out group-hover:translate-x-[5px]">→</span>
                      </Link>
                    </div>
                  </Card>
                </ScrollReveal>
              );
            })}
          </div>
          <div className="flex justify-center mt-12">
            <Link to="/blog">
              <Button 
                variant="outline" 
                className="group relative overflow-hidden border-2 border-primary px-8 py-3.5 text-base font-semibold transition-all duration-300 ease-in-out hover:scale-105 hover:bg-primary hover:text-white hover:shadow-medium"
              >
                <span className="relative z-10 flex items-center gap-2">
                  VIEW ALL ARTICLES
                  <span className="inline-block transition-all duration-300 ease-in-out opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0">
                    →
                  </span>
                </span>
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-muted" id="faq">
        <div className="container mx-auto px-4">
          <h2 className="text-center mb-10">Frequently Asked Questions</h2>
          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`} 
                  className="bg-card rounded-2xl px-6 border border-border hover:border-primary/50 transition-all duration-300 shadow-soft hover:shadow-medium data-[state=open]:border-l-4 data-[state=open]:border-l-[#14B8A6]"
                >
                  <AccordionTrigger className="text-lg font-bold hover:text-primary hover:no-underline">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-r from-primary to-accent">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-accent-foreground mb-6">Questions?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="gold" size="xl">
              <Link to="/contact">CONTACT US</Link>
            </Button>
            <Button asChild variant="outlineLight" size="xl">
              <Link to="/training">BOOK TRAINING</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
      
      {selectedItem && (
        <PurchaseModal
          open={modalOpen}
          onOpenChange={setModalOpen}
          itemType={selectedItem.type}
          itemName={selectedItem.name}
          suggestedPrice={selectedItem.type === 'guide' ? 15 : selectedItem.price}
          isPWYW={selectedItem.type === 'guide'}
          veteranDiscountPercent={selectedItem.type === 'product' ? 3 : 10}
        />
      )}
    </div>
  );
};

export default Resources;
