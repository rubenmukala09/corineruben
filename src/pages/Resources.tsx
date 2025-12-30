import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Download, Shield, ShoppingCart, Star, Loader2, Zap, Award, CheckCircle, Gift, BookOpen, Package, Sparkles, Users, TrendingUp, Heart, Headphones, Clock, Lock, FileText, Video, Podcast, Globe } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { AIImageDisclaimer } from "@/components/AIImageDisclaimer";
import heroResourcesOffice from "@/assets/hero-resources-office.jpg";
import heroResourcesReading from "@/assets/hero-resources-reading.jpg";
import heroResourcesProducts from "@/assets/hero-resources-products.jpg";
import bookAiFundamentals from "@/assets/book-ai-fundamentals.jpg";
import bookBeingRealAi from "@/assets/book-being-real-ai.jpg";
import bookAuthPersonalities from "@/assets/book-auth-personalities.jpg";
import bookAuthFriendshipV2 from "@/assets/book-auth-friendship-v2.jpg";
import bookScamPrevention from "@/assets/book-scam-prevention.jpg";
import bookFamilySafety from "@/assets/book-family-safety.jpg";
import bookBusinessCyber from "@/assets/book-business-cyber.jpg";
import bookAiManagement from "@/assets/book-ai-management.jpg";
import bookDigitalPrivacy from "@/assets/book-digital-privacy.jpg";
import bookSeniorTechSafety from "@/assets/book-senior-tech-safety.jpg";
import bookDeepfakeDetection from "@/assets/book-deepfake-detection.jpg";
import bookPasswordSecurity from "@/assets/book-password-security.jpg";
import bookSocialMediaSafety from "@/assets/book-social-media-safety.jpg";
import bookOnlineShopping from "@/assets/book-online-shopping.jpg";
import bookIdentityTheft from "@/assets/book-identity-theft.jpg";
import bookCyberKids from "@/assets/book-cyber-kids.jpg";
import bookSmartHome from "@/assets/book-smart-home.jpg";
import bookPhishingDefense from "@/assets/book-phishing-defense.jpg";
import bookBankingSafety from "@/assets/book-banking-safety.jpg";
import bookMobileSecurity from "@/assets/book-mobile-security.jpg";
// Product images
import productUsbKey from "@/assets/product-usb-key.jpg";
import productPrivacyScreen from "@/assets/product-privacy-screen.jpg";
import productWebcamCover from "@/assets/product-webcam-cover.jpg";
import productRfidWallet from "@/assets/product-rfid-wallet.jpg";
import productFaradayBag from "@/assets/product-faraday-bag.jpg";
import productPasswordBook from "@/assets/product-password-book.jpg";
import productShredder from "@/assets/product-shredder.jpg";
import productSafeBox from "@/assets/product-safe-box.jpg";
import productCableLock from "@/assets/product-cable-lock.jpg";
import productVpnRouter from "@/assets/product-vpn-router.jpg";
import productPhonePrivacy from "@/assets/product-phone-privacy.jpg";
import productUsbBlocker from "@/assets/product-usb-blocker.jpg";
import productTrackerDetector from "@/assets/product-tracker-detector.jpg";
import productRfidSleeves from "@/assets/product-rfid-sleeves.jpg";
import productSecurityCam from "@/assets/product-security-cam.jpg";
import { SEO } from "@/components/SEO";
import { supabase } from "@/integrations/supabase/client";

// Static book products with covers (20 books)
const staticBooks = [
  { id: 'book-ai-fundamentals', name: 'AI Fundamentals', description: 'Master AI basics and protection strategies', price: 29.99, image: bookAiFundamentals, tag: 'Best Seller' },
  { id: 'book-scam-prevention', name: 'Scam Prevention Guide', description: 'Comprehensive guide to avoiding scams', price: 39.99, image: bookScamPrevention, tag: 'Featured' },
  { id: 'book-family-safety', name: 'Family Safety Toolkit', description: 'Practical family safety protocols', price: 24.99, image: bookFamilySafety, tag: 'Family' },
  { id: 'book-senior-tech', name: 'Senior Tech Handbook', description: 'Tech safety for seniors', price: 27.99, image: bookSeniorTechSafety, tag: 'Seniors' },
  { id: 'book-digital-privacy', name: 'Digital Privacy Mastery', description: 'Protect your online privacy', price: 34.99, image: bookDigitalPrivacy, tag: 'Popular' },
  { id: 'book-deepfake', name: 'Deepfake Detection', description: 'Spot AI fakes and imposters', price: 32.99, image: bookDeepfakeDetection, tag: 'New' },
  { id: 'book-password', name: 'Password Security', description: 'Secure all your accounts', price: 22.99, image: bookPasswordSecurity, tag: 'Essential' },
  { id: 'book-social-media', name: 'Social Media Safety', description: 'Stay safe on social platforms', price: 26.99, image: bookSocialMediaSafety, tag: 'Trending' },
  { id: 'book-online-shopping', name: 'Online Shopping Guide', description: 'Shop safely anywhere', price: 24.99, image: bookOnlineShopping, tag: 'Practical' },
  { id: 'book-identity-theft', name: 'Identity Theft Prevention', description: 'Protect your identity', price: 36.99, image: bookIdentityTheft, tag: 'Critical' },
  { id: 'book-business-cyber', name: 'Business Cybersecurity', description: 'Enterprise security strategies', price: 49.99, image: bookBusinessCyber, tag: 'Professional' },
  { id: 'book-ai-management', name: 'AI Management Guide', description: 'Manage AI tools securely', price: 34.99, image: bookAiManagement, tag: 'Business' },
  { id: 'book-being-real-ai', name: 'Being Real in AI World', description: 'Authenticity in the AI age', price: 27.99, image: bookBeingRealAi, tag: 'Philosophy' },
  { id: 'book-auth-personalities', name: 'Auth of Personalities', description: 'Advanced identity verification', price: 32.99, image: bookAuthPersonalities, tag: 'Advanced' },
  { id: 'book-auth-friendship-v2', name: 'Auth of Friendship V2', description: 'Verify social connections', price: 29.99, image: bookAuthFriendshipV2, tag: 'Volume 2' },
  { id: 'book-cyber-kids', name: 'Cyber Awareness for Kids', description: 'Teach children internet safety', price: 19.99, image: bookCyberKids, tag: 'Kids' },
  { id: 'book-smart-home', name: 'Smart Home Security', description: 'Protect IoT devices at home', price: 28.99, image: bookSmartHome, tag: 'IoT' },
  { id: 'book-phishing-defense', name: 'Email Phishing Defense', description: 'Recognize and block phishing', price: 25.99, image: bookPhishingDefense, tag: 'Email' },
  { id: 'book-banking-safety', name: 'Banking & Financial Safety', description: 'Secure your finances online', price: 31.99, image: bookBankingSafety, tag: 'Finance' },
  { id: 'book-mobile-security', name: 'Mobile Phone Security', description: 'Keep your smartphone safe', price: 23.99, image: bookMobileSecurity, tag: 'Mobile' },
];

// Static physical products (15 products) with real images
const staticPhysicalProducts = [
  { id: 'prod-usb-key', name: 'Security USB Key', description: 'Hardware 2FA authentication device', price: 49.99, image: productUsbKey, tag: 'Best Seller' },
  { id: 'prod-privacy-screen', name: 'Privacy Screen 15"', description: 'Anti-spy screen protector for laptops', price: 39.99, image: productPrivacyScreen, tag: 'Popular' },
  { id: 'prod-webcam-cover', name: 'Webcam Cover Pack (6)', description: 'Sliding webcam privacy covers', price: 9.99, image: productWebcamCover, tag: 'Essential' },
  { id: 'prod-rfid-wallet', name: 'RFID Blocking Wallet', description: 'Protect cards from wireless theft', price: 24.99, image: productRfidWallet, tag: 'Protection' },
  { id: 'prod-faraday-bag', name: 'Faraday Phone Bag', description: 'Block all signals to your phone', price: 19.99, image: productFaradayBag, tag: 'Privacy' },
  { id: 'prod-password-book', name: 'Password Organizer', description: 'Secure offline password storage', price: 14.99, image: productPasswordBook, tag: 'Practical' },
  { id: 'prod-shredder', name: 'Document Shredder Mini', description: 'Compact cross-cut shredder', price: 69.99, image: productShredder, tag: 'Office' },
  { id: 'prod-safe-box', name: 'Fireproof Document Safe', description: 'Protect important documents', price: 99.99, image: productSafeBox, tag: 'Premium' },
  { id: 'prod-cable-lock', name: 'Laptop Cable Lock', description: 'Secure your laptop anywhere', price: 18.99, image: productCableLock, tag: 'Travel' },
  { id: 'prod-vpn-router', name: 'VPN Home Router', description: 'Whole-home privacy protection', price: 149.99, image: productVpnRouter, tag: 'Advanced' },
  { id: 'prod-privacy-filter', name: 'Phone Privacy Filter', description: 'Anti-spy screen for phones', price: 12.99, image: productPhonePrivacy, tag: 'Mobile' },
  { id: 'prod-usb-blocker', name: 'USB Data Blocker', description: 'Safe charging, no data theft', price: 8.99, image: productUsbBlocker, tag: 'Charging' },
  { id: 'prod-tracker-detector', name: 'GPS Tracker Detector', description: 'Find hidden tracking devices', price: 34.99, image: productTrackerDetector, tag: 'Detection' },
  { id: 'prod-rfid-sleeves', name: 'RFID Card Sleeves (10)', description: 'Credit card protection sleeves', price: 7.99, image: productRfidSleeves, tag: 'Budget' },
  { id: 'prod-security-cam', name: 'Indoor Security Camera', description: 'WiFi camera with encryption', price: 59.99, image: productSecurityCam, tag: 'Monitoring' },
];

// Rotating hero headlines
const heroHeadlines = [
  "Your Digital Safety Arsenal",
  "Premium Guides & Resources",
  "Expert Security Tools",
  "Products to Protect What Matters Most"
];

function Resources() {
  const { addItem } = useCart();
  const { toast } = useToast();
  const [loading, setLoading] = useState<string | null>(null);
  const [currentHeadlineIndex, setCurrentHeadlineIndex] = useState(0);

  // Rotate headlines
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeadlineIndex((prev) => (prev + 1) % heroHeadlines.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Fetch products from database
  const { data: products, isLoading, error } = useQuery({
    queryKey: ['marketplace-products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('status', 'active')
        .order('is_featured', { ascending: false })
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    },
  });

  // Separate physical products
  const physicalProducts = products?.filter(p => 
    p.tags?.some((tag: string) => ['physical', 'device', 'hardware', 'kit', 'equipment'].includes(tag.toLowerCase()))
  ) || [];

  const handleBuyNow = async (productId: string) => {
    try {
      setLoading(productId);
      
      const { data, error } = await supabase.functions.invoke('create-product-payment', {
        body: { productId, quantity: 1 }
      });

      if (error) throw error;

      if (data?.url) {
        window.open(data.url, '_blank');
        toast({
          title: "Redirecting to Checkout",
          description: "Opening secure payment page...",
        });
      }
    } catch (error: any) {
      console.error('Payment error:', error);
      toast({
        title: "Payment Error",
        description: error.message || "Failed to create checkout session",
        variant: "destructive",
      });
    } finally {
      setLoading(null);
    }
  };

  const handleAddToCart = (book: typeof staticBooks[0]) => {
    addItem({
      id: book.id,
      productId: book.id,
      name: book.name,
      price: book.price,
      image: book.image
    });
    toast({
      title: "Added to Cart",
      description: `${book.name} has been added to your cart.`,
    });
  };

  const resourcesHeroImages = [
    { src: heroResourcesOffice, alt: "Modern home office with security books" },
    { src: heroResourcesReading, alt: "Family reading safety guides together" },
    { src: heroResourcesProducts, alt: "Security gadgets and safety products" }
  ];

  return (
    <>
      <SEO 
        title="Resources & Marketplace - Digital Guides & Security Products"
        description="Browse our curated collection of scam prevention guides and physical security products. Everything you need to protect yourself and your loved ones."
      />
      <Navigation />
      
      <Hero
        backgroundImages={resourcesHeroImages}
        headline=""
        subheadline=""
        showScrollIndicator={true}
      >
        {/* Transitioning Headlines */}
        <div className="text-center mb-6">
          <AnimatePresence mode="wait">
            <motion.h1
              key={currentHeadlineIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
            >
              {heroHeadlines[currentHeadlineIndex]}
            </motion.h1>
          </AnimatePresence>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            Expert-curated guides, tools, and products designed to keep you and your family safe
          </p>
        </div>
      </Hero>

      <TrustBar />

      {/* Introduction Section */}
      <section className="py-12 bg-gradient-to-b from-background to-secondary/10">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 text-sm px-4 py-1.5 bg-gradient-to-r from-primary to-accent text-white">
                <Sparkles className="w-3.5 h-3.5 mr-1.5" /> Trusted Resources
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Your One-Stop Security Shop
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Welcome to InVision Network's resource center. Here you'll find carefully curated 
                <strong className="text-foreground"> e-books, digital guides, softcover books, and security gadgets</strong> — 
                all designed to help you and your family stay safe in the digital age. Every product 
                is created by security experts with decades of experience protecting families from scams.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <BookOpen className="w-4 h-4 text-primary" />
                  <span>Digital & Print Books</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Package className="w-4 h-4 text-primary" />
                  <span>Security Gadgets</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Download className="w-4 h-4 text-primary" />
                  <span>Instant Downloads</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="w-4 h-4 text-primary" />
                  <span>Family-Friendly</span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Quick Stats Banner */}
      <section className="py-6 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border-y border-primary/20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              { value: "20+", label: "Digital Guides", icon: BookOpen },
              { value: "15+", label: "Security Products", icon: Shield },
              { value: "500+", label: "Happy Customers", icon: Heart },
              { value: "24/7", label: "Support Available", icon: Headphones },
            ].map((stat, index) => (
              <div key={index} className="flex flex-col items-center gap-1">
                <stat.icon className="w-5 h-5 text-primary mb-1" />
                <span className="text-2xl font-bold text-foreground">{stat.value}</span>
                <span className="text-xs text-muted-foreground">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Digital Security Guides - Compact Cards */}
      <section id="guides" className="py-10 bg-gradient-to-b from-background to-secondary/20">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-8">
              <Badge className="mb-3 text-sm px-4 py-1.5" variant="secondary">
                <Download className="w-3.5 h-3.5 mr-1.5" />
                Instant Digital Download
              </Badge>
              <h2 className="text-2xl md:text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Digital Security Guides
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-sm">
                Expert knowledge delivered instantly. Download and print, or read on any device.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-3">
            {staticBooks.map((book, index) => (
              <ScrollReveal key={book.id} delay={index * 50}>
                <Card className="group p-3 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-border/50 hover:border-primary/30 relative overflow-hidden bg-card h-full flex flex-col">
                  {/* Tag Badge */}
                  <Badge className="absolute top-2 right-2 text-[9px] px-1.5 py-0.5 bg-gradient-to-r from-primary to-accent text-white z-10">
                    {book.tag}
                  </Badge>

                  {/* Book Cover Image */}
                  <div className="relative mb-3 rounded-lg overflow-hidden bg-secondary/30">
                    <div className="aspect-[3/4]">
                      <img 
                        src={book.image} 
                        alt={book.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xs md:text-sm font-bold mb-1 text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                    {book.name}
                  </h3>
                  <p className="text-[10px] text-muted-foreground mb-2 line-clamp-2 flex-1">
                    {book.description}
                  </p>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                    ))}
                    <span className="text-[9px] text-muted-foreground ml-1">5.0</span>
                  </div>

                  {/* Price and Actions */}
                  <div className="mt-auto pt-2 border-t border-border/50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-base md:text-lg font-bold text-primary">${book.price}</span>
                      <span className="text-[8px] text-success font-medium">🎖️ Vets 10% OFF</span>
                    </div>
                    <div className="grid grid-cols-2 gap-1.5">
                      <Button 
                        variant="outline"
                        size="sm"
                        onClick={() => handleAddToCart(book)}
                        className="text-[10px] h-7 px-2"
                      >
                        <ShoppingCart className="w-3 h-3 mr-1" />
                        Cart
                      </Button>
                      <Button 
                        size="sm"
                        onClick={() => handleBuyNow(book.id)}
                        disabled={loading === book.id}
                        className="text-[10px] h-7 px-2"
                      >
                        {loading === book.id ? (
                          <Loader2 className="w-3 h-3 animate-spin" />
                        ) : (
                          <>
                            <Zap className="w-3 h-3 mr-1" />
                            Buy
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </Card>
              </ScrollReveal>
            ))}
          </div>

          {/* Upsell Banner */}
          <ScrollReveal>
            <div className="mt-8 p-4 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-xl border border-primary/20 text-center">
              <p className="text-sm font-medium mb-2">
                📦 <strong>Bundle & Save!</strong> Purchase 3+ books and get 15% off your entire order.
              </p>
              <p className="text-xs text-muted-foreground">
                All digital products are delivered instantly to your email. Files can be uploaded from admin dashboard.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Physical Products Section - Compact */}
      <section id="products" className="py-10 bg-background">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-8">
              <Badge className="mb-3 text-sm px-4 py-1.5" variant="secondary">
                <Shield className="w-3.5 h-3.5 mr-1.5" />
                Ships Within 2-3 Business Days
              </Badge>
              <h2 className="text-2xl md:text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Physical Security Products
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-sm">
                Carefully curated hardware to enhance your digital safety
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
            {staticPhysicalProducts.map((product, index) => (
              <ScrollReveal key={product.id} delay={index * 50}>
                <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-border/50 hover:border-primary/30 overflow-hidden h-full flex flex-col">
                  {/* Tag Badge */}
                  <Badge className="absolute top-2 right-2 text-[9px] px-1.5 py-0.5 bg-gradient-to-r from-primary to-accent text-white z-10">
                    {product.tag}
                  </Badge>
                  
                  {/* Image */}
                  <div className="aspect-square bg-gradient-to-br from-secondary/50 to-secondary/20 relative overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  
                  {/* Content */}
                  <div className="p-2 flex-1 flex flex-col">
                    <h3 className="text-[10px] md:text-xs font-bold mb-1 text-foreground group-hover:text-primary transition-colors line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="text-[8px] text-muted-foreground mb-1 line-clamp-2 flex-1">
                      {product.description}
                    </p>
                    
                    <div className="flex gap-1 mb-1 flex-wrap">
                      <span className="text-[7px] px-1 py-0.5 bg-blue-500/10 text-blue-600 rounded-full">
                        🚚 Free Ship
                      </span>
                      <span className="text-[7px] px-1 py-0.5 bg-success/10 text-success rounded-full">
                        ✓ Warranty
                      </span>
                    </div>
                    
                    {/* Rating */}
                    <div className="flex items-center gap-0.5 mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-2 h-2 fill-amber-400 text-amber-400" />
                      ))}
                      <span className="text-[7px] text-muted-foreground ml-1">5.0</span>
                    </div>

                    {/* Price and Action */}
                    <div className="mt-auto pt-1 border-t border-border/50">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-bold text-primary">${product.price}</span>
                        <span className="text-[7px] text-success">🎖️ Vets 10%</span>
                      </div>
                      <Button 
                        size="sm"
                        className="w-full text-[9px] h-6"
                        onClick={() => {
                          addItem({
                            id: product.id,
                            productId: product.id,
                            name: product.name,
                            price: product.price,
                            image: product.image
                          });
                          toast({
                            title: "Added to Cart",
                            description: `${product.name} has been added to your cart.`,
                          });
                        }}
                      >
                        <ShoppingCart className="w-2.5 h-2.5 mr-1" />
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

      {/* Trusted Brands Section */}
      <section className="py-10 bg-gradient-to-b from-secondary/20 to-background">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-8">
              <Badge className="mb-3 text-sm px-4 py-1.5" variant="secondary">
                <Award className="w-3.5 h-3.5 mr-1.5" />
                Trusted By Thousands
              </Badge>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                Join Our Protected Community
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-sm">
                Trusted by families, businesses, and organizations across Ohio
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { icon: Users, value: "500+", label: "Families Protected" },
              { icon: Shield, value: "10K+", label: "Scams Blocked" },
              { icon: Award, value: "98%", label: "Success Rate" },
              { icon: Heart, value: "24/7", label: "Support Available" },
            ].map((item, index) => (
              <ScrollReveal key={index} delay={index * 100}>
                <Card className="p-5 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <item.icon className="w-8 h-8 text-primary mx-auto mb-2" />
                  <h3 className="font-bold text-2xl text-primary mb-1">{item.value}</h3>
                  <p className="text-sm text-muted-foreground">{item.label}</p>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Services Teaser Section */}
      <section className="py-10 bg-background">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-8">
              <Badge className="mb-3 text-sm px-4 py-1.5" variant="secondary">
                <Globe className="w-3.5 h-3.5 mr-1.5" />
                Professional Services
              </Badge>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                Need Expert Help?
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-sm">
                Our team of experts is ready to help you with customized security solutions
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {[
              { icon: Users, title: "Security Training", desc: "In-person or virtual training sessions for individuals and groups", link: "/training", cta: "Learn More" },
              { icon: Shield, title: "ScamShield Protection", desc: "24/7 monitoring and AI-powered scam detection for your family", link: "/services", cta: "Get Protected" },
              { icon: TrendingUp, title: "Business AI Solutions", desc: "Custom AI automation and security for your business", link: "/business", cta: "Explore Solutions" },
            ].map((item, index) => (
              <ScrollReveal key={index} delay={index * 100}>
                <Card className="p-5 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <item.icon className="w-10 h-10 text-primary mx-auto mb-3" />
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{item.desc}</p>
                  <Button asChild>
                    <Link to={item.link}>{item.cta}</Link>
                  </Button>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why Shop With Us */}
      <section className="py-10 bg-secondary/20">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Why Shop With InVision?</h2>
            </div>
          </ScrollReveal>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { icon: Shield, title: "Expert-Vetted", desc: "All products reviewed by security professionals" },
              { icon: Download, title: "Instant Delivery", desc: "Digital products delivered within minutes" },
              { icon: Gift, title: "Veteran Discount", desc: "10% off for veterans & first responders" },
              { icon: TrendingUp, title: "Money-Back", desc: "60-day satisfaction guarantee" },
            ].map((item, index) => (
              <ScrollReveal key={index} delay={index * 100}>
                <Card className="p-4 text-center hover:shadow-md transition-all">
                  <item.icon className="w-8 h-8 text-primary mx-auto mb-2" />
                  <h3 className="font-bold text-sm mb-1">{item.title}</h3>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-10 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <Card className="p-6 md:p-8 max-w-2xl mx-auto text-center border-primary/20">
              <Lock className="w-10 h-10 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-3">
                Get Weekly Security Tips
              </h2>
              <p className="text-muted-foreground mb-4 text-sm">
                Join 2,000+ subscribers who receive our weekly security newsletter with 
                the latest scam alerts, protection tips, and exclusive discounts.
              </p>
              <div className="flex gap-2 max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Button>Subscribe</Button>
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                No spam, unsubscribe anytime. We respect your privacy.
              </p>
            </Card>
          </ScrollReveal>
        </div>
      </section>

      {/* Success Stories Teaser */}
      <section className="py-10 bg-gradient-to-b from-background to-secondary/20">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <Card className="p-6 md:p-8 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 border-primary/20">
              <div className="text-center max-w-2xl mx-auto">
                <Badge className="mb-3" variant="secondary">
                  <Star className="w-3 h-3 mr-1 fill-amber-400 text-amber-400" />
                  Customer Stories
                </Badge>
                <h2 className="text-2xl font-bold mb-3">
                  Join 500+ Protected Families
                </h2>
                <p className="text-muted-foreground mb-4 text-sm">
                  Our resources have helped hundreds of families prevent scams and protect their loved ones. 
                  Read their stories and see how our guides made a difference.
                </p>
                <Button asChild variant="default">
                  <Link to="/about#testimonials">
                    Read Success Stories →
                  </Link>
                </Button>
              </div>
            </Card>
          </ScrollReveal>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-10 bg-secondary/20">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <Card className="p-6 md:p-8 text-center max-w-2xl mx-auto border-primary/20">
              <Headphones className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-3">Have Questions?</h2>
              <p className="text-muted-foreground mb-6">
                Find answers to common questions about our products, shipping, and returns.
              </p>
              <Button asChild size="lg">
                <Link to="/faq">View Frequently Asked Questions →</Link>
              </Button>
            </Card>
          </ScrollReveal>
        </div>
      </section>

      <AIImageDisclaimer />
      <Footer />
    </>
  );
}

export default Resources;
