import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import { CartAbandonmentNotification } from "@/components/CartAbandonmentNotification";
import { useCartFeedback } from "@/components/CartFeedbackNotifications";
import TrustBar from "@/components/TrustBar";
import { PageTransition } from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Download, Shield, ShoppingCart, Star, Loader2, Zap, Award, CheckCircle, Gift, BookOpen, Package, Sparkles, Users, TrendingUp, Heart, Headphones, Clock, Lock, FileText, Video, Podcast, Globe } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";
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
import productWifiExtender from "@/assets/product-wifi-extender.jpg";
import { SEO } from "@/components/SEO";
import { supabase } from "@/integrations/supabase/client";

// Static book products with covers (20 books)
const staticBooks = [
  { id: 'book-ai-fundamentals', name: 'AI Fundamentals', description: 'Master AI basics and protection strategies', price: 29.99, image: bookAiFundamentals, tag: 'Best Seller', stripe_price_id: 'price_1SjwOGJ8osfwYbX7UnEPLRMz' },
  { id: 'book-scam-prevention', name: 'Scam Prevention Guide', description: 'Comprehensive guide to avoiding scams', price: 39.99, image: bookScamPrevention, tag: 'Featured', stripe_price_id: 'price_1SjwOIJ8osfwYbX74jTfNxcW' },
  { id: 'book-family-safety', name: 'Family Safety Toolkit', description: 'Practical family safety protocols', price: 24.99, image: bookFamilySafety, tag: 'Family', stripe_price_id: 'price_1SjwOKJ8osfwYbX7GcmhErnQ' },
  { id: 'book-senior-tech', name: 'Senior Tech Handbook', description: 'Tech safety for seniors', price: 27.99, image: bookSeniorTechSafety, tag: 'Seniors', stripe_price_id: 'price_1SjwOLJ8osfwYbX7mV3J5LtX' },
  { id: 'book-digital-privacy', name: 'Digital Privacy Mastery', description: 'Protect your online privacy', price: 34.99, image: bookDigitalPrivacy, tag: 'Popular', stripe_price_id: 'price_1SjwOMJ8osfwYbX7ExCFG5R9' },
  { id: 'book-deepfake', name: 'Deepfake Detection', description: 'Spot AI fakes and imposters', price: 32.99, image: bookDeepfakeDetection, tag: 'New', stripe_price_id: 'price_1SjwOOJ8osfwYbX7HUJrBIas' },
  { id: 'book-password', name: 'Password Security', description: 'Secure all your accounts', price: 22.99, image: bookPasswordSecurity, tag: 'Essential', stripe_price_id: 'price_1SjwOPJ8osfwYbX7meUEbp3H' },
  { id: 'book-social-media', name: 'Social Media Safety', description: 'Stay safe on social platforms', price: 26.99, image: bookSocialMediaSafety, tag: 'Trending', stripe_price_id: 'price_1SjwORJ8osfwYbX7e2gUB45e' },
  { id: 'book-online-shopping', name: 'Online Shopping Guide', description: 'Shop safely anywhere', price: 24.99, image: bookOnlineShopping, tag: 'Practical', stripe_price_id: 'price_1SjwOTJ8osfwYbX7lPLOGwFE' },
  { id: 'book-identity-theft', name: 'Identity Theft Prevention', description: 'Protect your identity', price: 36.99, image: bookIdentityTheft, tag: 'Critical', stripe_price_id: 'price_1SjwOUJ8osfwYbX7qlhBavay' },
  { id: 'book-business-cyber', name: 'Business Cybersecurity', description: 'Enterprise security strategies', price: 49.99, image: bookBusinessCyber, tag: 'Professional', stripe_price_id: 'price_1SjwOYJ8osfwYbX7yBrF06h5' },
  { id: 'book-ai-management', name: 'AI Management Guide', description: 'Manage AI tools securely', price: 34.99, image: bookAiManagement, tag: 'Business', stripe_price_id: 'price_1SjwOaJ8osfwYbX7hc4XzTHo' },
  { id: 'book-being-real-ai', name: 'Being Real in AI World', description: 'Authenticity in the AI age', price: 27.99, image: bookBeingRealAi, tag: 'Philosophy', stripe_price_id: 'price_1SjwObJ8osfwYbX7SMFj8psB' },
  { id: 'book-auth-personalities', name: 'Auth of Personalities', description: 'Advanced identity verification', price: 32.99, image: bookAuthPersonalities, tag: 'Advanced', stripe_price_id: 'price_1SjwOdJ8osfwYbX7MPe7VAm2' },
  { id: 'book-auth-friendship-v2', name: 'Auth of Friendship V2', description: 'Verify social connections', price: 29.99, image: bookAuthFriendshipV2, tag: 'Volume 2', stripe_price_id: 'price_1SjwOfJ8osfwYbX7WKUTFPZz' },
  { id: 'book-cyber-kids', name: 'Cyber Awareness for Kids', description: 'Teach children internet safety', price: 19.99, image: bookCyberKids, tag: 'Kids', stripe_price_id: 'price_1SjwOgJ8osfwYbX7BFT7VyBl' },
  { id: 'book-smart-home', name: 'Smart Home Security', description: 'Protect IoT devices at home', price: 28.99, image: bookSmartHome, tag: 'IoT', stripe_price_id: 'price_1SjwOiJ8osfwYbX7crdnnxDP' },
  { id: 'book-phishing-defense', name: 'Email Phishing Defense', description: 'Recognize and block phishing', price: 25.99, image: bookPhishingDefense, tag: 'Email', stripe_price_id: 'price_1SjwOjJ8osfwYbX7QoqGc9FQ' },
  { id: 'book-banking-safety', name: 'Banking & Financial Safety', description: 'Secure your finances online', price: 31.99, image: bookBankingSafety, tag: 'Finance', stripe_price_id: 'price_1SjwOlJ8osfwYbX7jMwpmurh' },
  { id: 'book-mobile-security', name: 'Mobile Phone Security', description: 'Keep your smartphone safe', price: 23.99, image: bookMobileSecurity, tag: 'Mobile', stripe_price_id: 'price_1SjwOmJ8osfwYbX7mo35N9ap' },
];

// Static physical products (15 products) with real images
const staticPhysicalProducts = [
  { id: 'prod-usb-key', name: 'Security USB Key', description: 'Hardware 2FA authentication device', price: 49.99, image: productUsbKey, tag: 'Best Seller', stripe_price_id: 'price_1SjwOrJ8osfwYbX7oO8UOr4W' },
  { id: 'prod-privacy-screen', name: 'Privacy Screen 15"', description: 'Anti-spy screen protector for laptops', price: 39.99, image: productPrivacyScreen, tag: 'Popular', stripe_price_id: 'price_1SjwOtJ8osfwYbX7spllhrec' },
  { id: 'prod-webcam-cover', name: 'Webcam Cover Pack (6)', description: 'Sliding webcam privacy covers', price: 9.99, image: productWebcamCover, tag: 'Essential', stripe_price_id: 'price_1SjwOvJ8osfwYbX7W5QIZvWH' },
  { id: 'prod-rfid-wallet', name: 'RFID Blocking Wallet', description: 'Protect cards from wireless theft', price: 24.99, image: productRfidWallet, tag: 'Protection', stripe_price_id: 'price_1SjwOwJ8osfwYbX7vhgkd632' },
  { id: 'prod-faraday-bag', name: 'Faraday Phone Bag', description: 'Block all signals to your phone', price: 19.99, image: productFaradayBag, tag: 'Privacy', stripe_price_id: 'price_1SjwOyJ8osfwYbX7SXOyTNh8' },
  { id: 'prod-password-book', name: 'Password Organizer', description: 'Secure offline password storage', price: 14.99, image: productPasswordBook, tag: 'Practical', stripe_price_id: 'price_1SjwP0J8osfwYbX7S24wIUAP' },
  { id: 'prod-shredder', name: 'Document Shredder Mini', description: 'Compact cross-cut shredder', price: 69.99, image: productShredder, tag: 'Office', stripe_price_id: 'price_1SjwP2J8osfwYbX7BA1stBmY' },
  { id: 'prod-safe-box', name: 'Fireproof Document Safe', description: 'Protect important documents', price: 99.99, image: productSafeBox, tag: 'Premium', stripe_price_id: 'price_1SjwP4J8osfwYbX7gQDVgihH' },
  { id: 'prod-cable-lock', name: 'Laptop Cable Lock', description: 'Secure your laptop anywhere', price: 18.99, image: productCableLock, tag: 'Travel', stripe_price_id: 'price_1SjwP6J8osfwYbX7e9ZikXHu' },
  { id: 'prod-vpn-router', name: 'VPN Home Router', description: 'Whole-home privacy protection', price: 149.99, image: productVpnRouter, tag: 'Advanced', stripe_price_id: 'price_1SjwP8J8osfwYbX7y81Bmklz' },
  { id: 'prod-privacy-filter', name: 'Phone Privacy Filter', description: 'Anti-spy screen for phones', price: 12.99, image: productPhonePrivacy, tag: 'Mobile', stripe_price_id: 'price_1SjwPCJ8osfwYbX7VAzAQrH3' },
  { id: 'prod-usb-blocker', name: 'USB Data Blocker', description: 'Safe charging, no data theft', price: 8.99, image: productUsbBlocker, tag: 'Charging', stripe_price_id: 'price_1SjwPEJ8osfwYbX7iIQpVXm3' },
  { id: 'prod-tracker-detector', name: 'GPS Tracker Detector', description: 'Find hidden tracking devices', price: 34.99, image: productTrackerDetector, tag: 'Detection', stripe_price_id: 'price_1SjwPFJ8osfwYbX7KmSpLGIU' },
  { id: 'prod-rfid-sleeves', name: 'RFID Card Sleeves (10)', description: 'Credit card protection sleeves', price: 7.99, image: productRfidSleeves, tag: 'Budget', stripe_price_id: 'price_1SjwPHJ8osfwYbX7Gefquqfa' },
  { id: 'prod-security-cam', name: 'Indoor Security Camera', description: 'WiFi camera with encryption', price: 59.99, image: productSecurityCam, tag: 'Monitoring', stripe_price_id: 'price_1SjwPJJ8osfwYbX7vEPLPml1' },
  { id: 'prod-wifi-extender', name: 'WiFi Signal Extender', description: 'Extend secure WiFi coverage', price: 44.99, image: productWifiExtender, tag: 'Coverage', stripe_price_id: 'price_1SjwPJJ8osfwYbX7vEPLPml1' },
];

// Rotating hero headlines
const heroHeadlines = [
  "Your Digital Safety Arsenal",
  "Premium Guides & Resources",
  "Expert Security Tools",
  "Products to Protect What Matters Most"
];

function Resources() {
  const { addItem, lastClearReason, hadItemsBeforeClear, itemCount } = useCart();
  const { toast } = useToast();
  const { triggerEmptyCartHelp } = useCartFeedback();
  const [loading, setLoading] = useState<string | null>(null);
  const [currentHeadlineIndex, setCurrentHeadlineIndex] = useState(0);

  // Track when cart is manually emptied to show help
  useEffect(() => {
    if (lastClearReason === 'manual' && hadItemsBeforeClear && itemCount === 0) {
      // Delay to not interrupt user flow
      const timer = setTimeout(() => {
        triggerEmptyCartHelp();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [lastClearReason, hadItemsBeforeClear, itemCount, triggerEmptyCartHelp]);

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
      image: book.image,
      stripe_price_id: book.stripe_price_id
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
    <PageTransition variant="fade">
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

      {/* Premier Protection - Insurance Section */}
      <section id="insurance" className="py-12 bg-gradient-to-b from-background to-primary/5">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-10">
              <Badge className="mb-3 text-sm px-4 py-1.5 bg-gradient-to-r from-primary to-accent text-white">
                <Shield className="w-3.5 h-3.5 mr-1.5" />
                Premier Protection
              </Badge>
              <h2 className="text-2xl md:text-3xl font-bold mb-3">
                Insurance Coverage for Complete Peace of Mind
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Protect your family and business with comprehensive cyber liability and identity theft coverage
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Cyber Liability Insurance */}
            <ScrollReveal delay={100}>
              <Card className="relative h-full p-6 hover:shadow-xl transition-all duration-300 border-primary/20 hover:border-primary/40">
                <div className="absolute top-4 right-4">
                  <Badge variant="secondary" className="bg-blue-500/10 text-blue-600">
                    Business
                  </Badge>
                </div>
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/20 flex items-center justify-center mb-4">
                  <Globe className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Cyber Liability Insurance</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Protect your business from data breaches, cyber attacks, and digital threats. Coverage includes legal fees, notification costs, and recovery expenses.
                </p>
                <ul className="space-y-2 mb-6 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                    <span>Data breach response coverage</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                    <span>Business interruption protection</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                    <span>Ransomware & extortion defense</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                    <span>Legal & regulatory support</span>
                  </li>
                </ul>
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div>
                    <span className="text-2xl font-bold text-primary">From $49</span>
                    <span className="text-muted-foreground text-sm">/month</span>
                  </div>
                  <Button asChild variant="gold">
                    <Link to="/contact">Get Quote</Link>
                  </Button>
                </div>
              </Card>
            </ScrollReveal>

            {/* Identity Theft Insurance */}
            <ScrollReveal delay={200}>
              <Card className="relative h-full p-6 hover:shadow-xl transition-all duration-300 border-accent/20 hover:border-accent/40">
                <div className="absolute top-4 right-4">
                  <Badge variant="secondary" className="bg-purple-500/10 text-purple-600">
                    Personal
                  </Badge>
                </div>
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-600/20 flex items-center justify-center mb-4">
                  <Lock className="w-7 h-7 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Identity Theft Protection</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Comprehensive identity monitoring and recovery services. Get alerts, prevention tools, and expert support if your identity is compromised.
                </p>
                <ul className="space-y-2 mb-6 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                    <span>24/7 identity monitoring</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                    <span>Up to $1M recovery coverage</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                    <span>Dark web surveillance</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                    <span>Dedicated recovery specialist</span>
                  </li>
                </ul>
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div>
                    <span className="text-2xl font-bold text-primary">From $19</span>
                    <span className="text-muted-foreground text-sm">/month</span>
                  </div>
                  <Button asChild variant="gold">
                    <Link to="/contact">Get Quote</Link>
                  </Button>
                </div>
              </Card>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Emergency Scripts Section */}
      <section id="scripts" className="py-12 bg-card">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-10">
              <Badge className="mb-3 text-sm px-4 py-1.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white">
                <FileText className="w-3.5 h-3.5 mr-1.5" />
                Free Downloads
              </Badge>
              <h2 className="text-2xl md:text-3xl font-bold mb-3">
                Emergency Anti-Scam Scripts
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Download ready-to-use scripts to protect yourself and your loved ones when scammers call
              </p>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {[
              {
                title: "IRS/Tax Scam Script",
                description: "What to say when someone claims to be from the IRS demanding immediate payment",
                icon: FileText,
                color: "from-red-500/20 to-red-600/20",
                textColor: "text-red-600"
              },
              {
                title: "Tech Support Scam Script",
                description: "Responses for fake Microsoft, Apple, or antivirus callers",
                icon: Headphones,
                color: "from-blue-500/20 to-blue-600/20",
                textColor: "text-blue-600"
              },
              {
                title: "Grandparent Scam Script",
                description: "Verification questions when someone claims a family emergency",
                icon: Heart,
                color: "from-pink-500/20 to-pink-600/20",
                textColor: "text-pink-600"
              },
              {
                title: "Bank Fraud Alert Script",
                description: "How to verify if a bank fraud alert is legitimate",
                icon: Lock,
                color: "from-green-500/20 to-green-600/20",
                textColor: "text-green-600"
              }
            ].map((script, index) => (
              <ScrollReveal key={script.title} delay={index * 100}>
                <Card className="p-5 h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${script.color} flex items-center justify-center mb-4`}>
                    <script.icon className={`w-6 h-6 ${script.textColor}`} />
                  </div>
                  <h3 className="font-bold mb-2">{script.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 flex-1">{script.description}</p>
                  <Button variant="outline" className="w-full gap-2" size="sm">
                    <Download className="w-4 h-4" />
                    Download PDF
                  </Button>
                </Card>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={400}>
            <div className="text-center mt-8">
              <p className="text-sm text-muted-foreground mb-4">
                📞 <strong>Remember:</strong> Legitimate organizations will never pressure you for immediate payment or personal info over the phone.
              </p>
              <Button asChild variant="default" className="gap-2">
                <Link to="/training">
                  <BookOpen className="w-4 h-4" />
                  Learn More Safety Tips
                </Link>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>


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

      {/* Why Shop With Us - Final Section */}
      
      {/* Cart Abandonment Notification */}
      <CartAbandonmentNotification />
      
      <Footer />
    </PageTransition>
  );
}

export default Resources;
