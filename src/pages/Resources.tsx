import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import FlowingWaves from "@/components/FlowingWaves";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PurchaseModal } from "@/components/PurchaseModal";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Download, Shield, Wifi, KeyRound, Heart, FileText, ShoppingCart } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";
import heroResources from "@/assets/hero-resources-new.jpg";

function Resources() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<{
    type: 'guide' | 'product';
    name: string;
    price?: number;
  } | null>(null);
  const [activeProductImages, setActiveProductImages] = useState<{ [key: string]: number }>({});

  const guides = [
    { 
      icon: Shield, 
      title: "The Scam-Proof Playbook", 
      desc: "Word-for-word scripts to shut down any scammer. What to say when your 'grandson' calls from jail, when the 'IRS' threatens arrest, or when 'Microsoft' needs remote access.", 
      price: 29, 
      slug: "scam-proof-playbook", 
      gradient: "from-accent/20 to-primary/20" 
    },
    { 
      icon: Heart, 
      title: "The Caregiver's Security Shield", 
      desc: "Protect the ones you love who can't protect themselves. Everything you need to safeguard aging parents, relatives with cognitive decline, or vulnerable loved ones.", 
      price: 24, 
      slug: "caregivers-security-guide", 
      gradient: "from-rose-500/20 to-pink-500/20" 
    },
    { 
      icon: Wifi, 
      title: "15-Minute Home Wi-Fi Lockdown", 
      desc: "Your home network is your front door. Lock it down in 15 minutes with step-by-step instructions anyone can follow. No tech degree required.", 
      price: 19, 
      slug: "home-wifi-safety", 
      gradient: "from-blue-500/20 to-cyan-500/20" 
    },
    { 
      icon: KeyRound, 
      title: "The Offline Password Vault", 
      desc: "Digital password managers confuse you? This beautiful hardcover notebook is your offline fortress. Organized, secure, and hack-proof.", 
      price: 15, 
      slug: "password-creation-notebook", 
      gradient: "from-purple-500/20 to-violet-500/20" 
    },
    { 
      icon: FileText, 
      title: "Emergency Family Text Protocol", 
      desc: "Scammers are texting 'grandparents' pretending to be in jail, hurt, or stranded. Learn the 5-question test that exposes fakes every time.", 
      price: 12, 
      slug: "grandparent-text-101", 
      gradient: "from-emerald-500/20 to-teal-500/20" 
    },
    { 
      icon: Shield, 
      title: "The 60-Second Pause Poster", 
      desc: "Beautiful fridge magnet poster with the ONE rule that stops 90% of scams: 'Stop. Breathe. Call someone you trust.' Free with any purchase.", 
      price: 9, 
      slug: "pause-protocol-poster", 
      gradient: "from-amber-500/20 to-orange-500/20" 
    },
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
      title: "The Phone Call That Cost My Grandmother $15,000",
      image: "https://images.unsplash.com/photo-1589254065878-42c9da997008?w=800&h=400&fit=crop",
      excerpt: "This is the true story of how scammers targeted my family—and why I dedicated my life to stopping them. Warning signs we missed, lessons we learned.",
      date: "Nov 15, 2024"
    },
    {
      title: "5 Words That Stop 90% of Scammers Instantly",
      image: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=800&h=400&fit=crop",
      excerpt: "You don't need tech knowledge. You don't need to be suspicious of everyone. You just need to say these 5 words when something feels off.",
      date: "Oct 28, 2024"
    },
    {
      title: "Why 'Tech Support' Scams Work on Smart People",
      image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=800&h=400&fit=crop",
      excerpt: "It's not about intelligence. It's about psychology. Here's how scammers manipulate fear, urgency, and authority—and how to recognize it.",
      date: "Oct 12, 2024"
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
        headline="Protect What Matters Most"
        subheadline="From our family to yours—expert resources built with love, backed by experience, and designed to keep you safe in the digital age."
        showScrollIndicator={true}
      />

      <TrustBar />

      {/* Founder Mission Section */}
      <section className="py-20 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary)/0.05),transparent_70%)]" />
        
        <div className="container mx-auto px-4 relative z-10">
          <ScrollReveal animation="fade-up">
            <div className="max-w-5xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-700" />
                  <img 
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&h=800&fit=crop" 
                    alt="Ruben NM - Founder"
                    className="relative rounded-3xl shadow-2xl w-full h-[500px] object-cover ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all duration-500"
                  />
                  <div className="absolute -bottom-6 -right-6 bg-gradient-to-br from-primary to-accent text-primary-foreground p-6 rounded-2xl shadow-2xl">
                    <p className="text-3xl font-bold">20+</p>
                    <p className="text-sm">Years Experience</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="inline-block">
                    <span className="px-4 py-2 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full text-sm font-semibold text-primary border border-primary/20">
                      Our Story
                    </span>
                  </div>
                  
                  <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                    Founded on a <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Personal Mission</span>
                  </h2>
                  
                  <div className="space-y-4 text-muted-foreground leading-relaxed text-lg">
                    <p className="text-foreground font-semibold text-xl">
                      "I started this because I watched my grandmother lose $15,000 to a phone scam. She was brilliant, independent, and strong—but the scammers knew exactly what to say."
                    </p>
                    
                    <p>
                      <span className="font-bold text-foreground">Ruben NM</span> isn't just our founder—he's a son, grandson, and tech professional who saw his family hurt by digital predators. After spending 20+ years in cybersecurity, he realized that complex security guides weren't reaching the people who needed them most.
                    </p>
                    
                    <p>
                      Every resource here is designed with <span className="font-semibold text-foreground">real people</span> in mind—your parents, your grandparents, your neighbors. No jargon. No confusion. Just clear, actionable protection that works.
                    </p>

                    <div className="pt-4 border-t border-border">
                      <p className="italic text-base">
                        "This isn't just business. It's personal. Every person we protect, every scam we stop, every senior who stays safe—that's why we exist."
                      </p>
                      <p className="font-bold text-foreground mt-2">— Ruben NM, Founder & CEO</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 pt-4">
                    <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
                      <Shield className="w-5 h-5 text-primary" />
                      <span className="font-semibold">Veteran-Led</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full">
                      <Heart className="w-5 h-5 text-accent" />
                      <span className="font-semibold">Mission-Driven</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
                      <Shield className="w-5 h-5 text-primary" />
                      <span className="font-semibold">Family-First</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Guides */}
      <section className="py-20 bg-gradient-to-b from-background via-muted/30 to-background relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary)/0.05),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,hsl(var(--accent)/0.05),transparent_50%)]" />
        
        <div className="container mx-auto px-4 relative z-10">
          <ScrollReveal animation="fade-up">
            <div className="text-center mb-16">
              <div className="inline-block mb-4">
                <span className="px-4 py-2 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full text-sm font-semibold text-primary border border-primary/20">
                  Expert Resources
                </span>
              </div>
              <h2 className="mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Security Resources That Actually Work
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                No fluff. No tech jargon. Just clear, proven strategies written by someone who's been protecting families for 20+ years. Every guide is tested on real people—including our own grandparents.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {guides.map((guide, index) => (
              <ScrollReveal key={index} animation="fade-up" delay={index * 100}>
                <Card className={`group relative overflow-hidden h-full flex flex-col bg-gradient-to-br ${guide.gradient} border-border/50 hover:border-primary/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl`}>
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="p-8 flex flex-col h-full relative z-10">
                    <div className="flex justify-center mb-6">
                      <div className="relative">
                        <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full group-hover:blur-2xl transition-all duration-500" />
                        <div className="relative w-20 h-20 bg-gradient-to-br from-primary/90 to-accent/90 rounded-2xl flex items-center justify-center transform group-hover:rotate-6 group-hover:scale-110 transition-all duration-500 shadow-lg">
                          <guide.icon className="w-10 h-10 text-primary-foreground" />
                        </div>
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold mb-4 text-center group-hover:text-primary transition-colors duration-300">
                      {guide.title}
                    </h3>
                    <p className="text-muted-foreground text-center mb-6 flex-grow leading-relaxed text-sm">
                      {guide.desc}
                    </p>

                    <div className="mt-auto space-y-4">
                      <div className="flex items-center justify-center gap-2 text-2xl font-bold text-primary">
                        <span className="text-sm text-muted-foreground">from</span>
                        ${guide.price}
                      </div>
                      
                      {guide.slug && guide.price ? (
                        <Button 
                          asChild
                          className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 group/btn"
                          size="lg"
                        >
                          <Link to={`/contact?service=purchase&item=${guide.slug}&price=${guide.price}`}>
                            <Download className="w-5 h-5 mr-2 transition-transform duration-300 group-hover/btn:translate-y-1" />
                            Get This Guide
                          </Link>
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
                          className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
                          size="lg"
                        >
                          <Download className="w-5 h-5 mr-2" />
                          Get This Guide
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Veterans Discount Banner */}
      <section className="py-16 bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,hsl(var(--primary)/0.03)_50%,transparent_75%)] bg-[length:250px_250px] animate-[slide_20s_linear_infinite]" />
        
        <div className="container mx-auto px-4 relative z-10">
          <ScrollReveal animation="scale-in">
            <Card className="p-8 md:p-10 glass-effect border-2 border-primary/30 max-w-4xl mx-auto shadow-2xl overflow-hidden group hover:border-primary/50 transition-all duration-500">
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
              
              <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left relative z-10">
                <div className="flex-shrink-0">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent blur-xl rounded-full animate-pulse" />
                    <div className="relative w-24 h-24 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center text-4xl shadow-xl transform group-hover:rotate-12 transition-transform duration-500">
                      🇺🇸
                    </div>
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="inline-block mb-2">
                    <span className="px-3 py-1 bg-primary/10 rounded-full text-xs font-semibold text-primary">
                      Special Offer
                    </span>
                  </div>
                  <h3 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    Honoring Those Who Serve
                  </h3>
                  <p className="text-muted-foreground text-base leading-relaxed">
                    Veterans, active military, and first responders protected us. Now we protect you. <span className="font-bold text-primary">10% OFF forever</span>—because service matters.
                  </p>
                </div>
                
                <Button 
                  variant="default" 
                  size="lg"
                  asChild
                  className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 px-8"
                >
                  <Link to="/contact">Claim Discount</Link>
                </Button>
              </div>
            </Card>
          </ScrollReveal>
        </div>
      </section>

      {/* Security Tools Shop */}
      <section className="py-20 bg-gradient-to-b from-background to-muted/50 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--accent)/0.03),transparent_70%)]" />
        
        <div className="container mx-auto px-4 relative z-10">
          <ScrollReveal animation="fade-up">
            <div className="text-center mb-16">
              <div className="inline-block mb-4">
                <span className="px-4 py-2 bg-gradient-to-r from-accent/10 to-primary/10 rounded-full text-sm font-semibold text-accent border border-accent/20">
                  <ShoppingCart className="w-4 h-4 inline mr-2" />
                  Security Tools
                </span>
              </div>
              <h2 className="mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Physical Protection Tools
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-3">
                Simple, affordable tools that add layers of security. <span className="font-semibold text-foreground">100% of profits</span> fund free training for seniors who can't afford it.
              </p>
              <p className="text-sm text-accent font-semibold">
                ✨ Free shipping over $25 • 30-day money-back guarantee
              </p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 max-w-7xl mx-auto">
            {products.map((product, index) => {
              const isBundle = product.slug === "complete-security-kit-bundle";
              const currentImageIndex = activeProductImages[product.slug] || 0;
              return (
                <ScrollReveal key={index} animation="fade-up" delay={index * 80}>
                  <Card 
                    className={`group relative overflow-hidden h-full flex flex-col bg-card hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 ${
                      isBundle ? 'border-2 border-accent ring-2 ring-accent/20' : 'border-border/50 hover:border-primary/50'
                    }`}
                  >
                    {isBundle && (
                      <>
                        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-primary/10 pointer-events-none" />
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-accent via-primary to-accent text-primary-foreground px-5 py-1.5 rounded-full text-xs font-bold shadow-lg z-20 animate-pulse">
                          ⭐ BEST VALUE
                        </div>
                      </>
                    )}
                    
                    <div className="p-6 flex flex-col h-full relative z-10">
                      {/* Image Gallery */}
                      <div className="mb-5">
                        <div className="relative overflow-hidden rounded-xl group/image aspect-[4/3] mb-3 ring-1 ring-border/50">
                          <img 
                            src={product.images[currentImageIndex]} 
                            alt={product.name}
                            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-300">
                            <div className="absolute bottom-4 left-4 text-white font-semibold text-sm flex items-center gap-2">
                              <ShoppingCart className="w-4 h-4" />
                              Quick View
                            </div>
                          </div>
                        </div>
                        
                        {/* Thumbnail Dots */}
                        {product.images.length > 1 && (
                          <div className="flex justify-center gap-2">
                            {product.images.map((_, imgIndex) => (
                              <button
                                key={imgIndex}
                                onClick={() => setActiveProductImages(prev => ({ ...prev, [product.slug]: imgIndex }))}
                                className={`h-2 rounded-full transition-all duration-300 ${
                                  currentImageIndex === imgIndex 
                                    ? 'bg-primary w-8' 
                                    : 'bg-muted-foreground/20 hover:bg-muted-foreground/40 w-2'
                                }`}
                                aria-label={`View image ${imgIndex + 1}`}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                      
                      <h3 className="text-lg font-bold mb-4 text-center min-h-[3rem] flex items-center justify-center leading-tight group-hover:text-primary transition-colors duration-300">
                        {product.name}
                      </h3>
                      
                      <div className="mt-auto space-y-4">
                        <div className="text-center">
                          <p className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                            ${product.price}
                          </p>
                          {isBundle && (
                            <p className="text-xs text-muted-foreground mt-1">Save 25%</p>
                          )}
                        </div>
                        
                        {product.slug && product.price ? (
                          <Button 
                            asChild
                            className={`w-full transition-all duration-300 shadow-lg hover:shadow-xl ${
                              isBundle 
                                ? 'bg-gradient-to-r from-accent to-primary hover:from-accent/90 hover:to-primary/90 text-primary-foreground' 
                                : 'bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground'
                            }`}
                            size="lg"
                          >
                            <Link to={`/contact?service=purchase&item=${product.slug}&price=${product.price}`}>
                              <ShoppingCart className="w-4 h-4 mr-2" />
                              {isBundle ? 'Get Bundle' : 'Add to Cart'}
                            </Link>
                          </Button>
                        ) : (
                          <Button 
                            onClick={() => {
                              setSelectedItem({
                                type: 'product',
                                name: product.name,
                                price: product.price
                              });
                              setModalOpen(true);
                            }}
                            className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
                            size="lg"
                          >
                            <ShoppingCart className="w-4 h-4 mr-2" />
                            Add to Cart
                          </Button>
                        )}
                      </div>
                    </div>
                  </Card>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Blog */}
      <section className="py-20 bg-gradient-to-b from-muted/50 to-background relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,hsl(var(--primary)/0.03),transparent_60%)]" />
        
        <div className="container mx-auto px-4 relative z-10">
          <ScrollReveal animation="fade-up">
            <div className="text-center mb-16">
              <div className="inline-block mb-4">
                <span className="px-4 py-2 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full text-sm font-semibold text-primary border border-primary/20">
                  <FileText className="w-4 h-4 inline mr-2" />
                  Latest Insights
                </span>
              </div>
              <h2 className="mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Real Stories, Real Protection
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Learn from actual scams, real attacks, and proven defenses. Written in plain English by someone who's seen it all—and stopped it all.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {blogArticles.map((article, index) => (
              <ScrollReveal key={index} animation="fade-up" delay={index * 100}>
                <Card className="group overflow-hidden rounded-2xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-3 border-border/50 hover:border-primary/50 bg-card h-full flex flex-col">
                  <div className="relative overflow-hidden">
                    <img 
                      src={article.image} 
                      alt={article.title} 
                      className="w-full h-[240px] object-cover transition-transform duration-700 group-hover:scale-110" 
                      loading="lazy" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-primary/95 to-accent/95 text-primary-foreground px-4 py-1.5 rounded-full text-sm font-bold shadow-lg backdrop-blur-sm">
                      {article.date}
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold mb-3 leading-tight group-hover:text-primary transition-colors duration-300 line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-6 line-clamp-3 leading-relaxed flex-grow">
                      {article.excerpt}
                    </p>
                    <Link 
                      to="/articles" 
                      className="inline-flex items-center gap-2 text-primary hover:text-accent font-semibold text-sm transition-all duration-300 group/link mt-auto"
                    >
                      Read Full Article
                      <span className="transition-transform duration-300 group-hover/link:translate-x-1">→</span>
                    </Link>
                  </div>
                </Card>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal animation="fade-up" delay={400}>
            <div className="text-center mt-12">
              <Button 
                asChild 
                size="lg"
                className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 px-8"
              >
                <Link to="/articles">
                  View All Articles
                  <span className="ml-2">→</span>
                </Link>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-gradient-to-b from-background to-muted/30 relative" id="faq">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(var(--primary)/0.03),transparent_60%)]" />
        
        <div className="container mx-auto px-4 relative z-10">
          <ScrollReveal animation="fade-up">
            <div className="text-center mb-16">
              <div className="inline-block mb-4">
                <span className="px-4 py-2 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full text-sm font-semibold text-primary border border-primary/20">
                  Got Questions?
                </span>
              </div>
              <h2 className="mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Your Questions, Answered
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We've spent hundreds of hours answering questions from seniors, families, and caregivers. Here are the most common ones.
              </p>
            </div>
          </ScrollReveal>

          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <ScrollReveal key={index} animation="fade-up" delay={index * 50}>
                  <AccordionItem 
                    value={`item-${index}`} 
                    className="bg-card/80 backdrop-blur-sm rounded-2xl px-8 py-2 border-2 border-border/50 hover:border-primary/50 transition-all duration-300 shadow-lg hover:shadow-xl data-[state=open]:border-primary data-[state=open]:shadow-2xl data-[state=open]:bg-gradient-to-r data-[state=open]:from-card data-[state=open]:to-primary/5"
                  >
                    <AccordionTrigger className="text-lg font-bold hover:text-primary hover:no-underline py-6 [&[data-state=open]]:text-primary">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-6">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                </ScrollReveal>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-primary via-accent to-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.05)_50%,transparent_75%)] bg-[length:250px_250px] animate-[slide_20s_linear_infinite]" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/30 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <ScrollReveal animation="scale-in">
            <h2 className="text-primary-foreground mb-4 text-4xl md:text-5xl">
              We're Here for You
            </h2>
            <p className="text-primary-foreground/90 text-lg md:text-xl mb-10 max-w-3xl mx-auto">
              This isn't a faceless company. It's a small team that genuinely cares about protecting your family. We answer every email, every call, every question—because that's what family does.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button 
                asChild 
                size="lg"
                className="bg-background text-foreground hover:bg-background/90 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 px-10 py-6 text-lg"
              >
                <Link to="/contact">Contact Us</Link>
              </Button>
              <Button 
                asChild 
                size="lg"
                variant="outline"
                className="border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 px-10 py-6 text-lg"
              >
                <Link to="/training">Book Training</Link>
              </Button>
            </div>
          </ScrollReveal>
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
