import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
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
import { Download, Shield, ShoppingCart, Star, Loader2, Zap, Award, CheckCircle, Gift, BookOpen, Package, Sparkles, Users, TrendingUp, Heart, Headphones, Clock, Lock, FileText, Video, Podcast, Globe, Mail } from "lucide-react";
import { EmbeddedPaymentModal } from "@/components/payment/EmbeddedPaymentModal";
import { ScrollReveal } from "@/components/ScrollReveal";
import { PROFESSIONAL_HERO_IMAGES } from "@/config/professionalHeroImages";
import BookCoverModal from "@/components/resources/BookCoverModal";
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
// New book covers (10 additional books)
import bookCryptoDefense from "@/assets/book-crypto-defense.jpg";
import bookRomanceScam from "@/assets/book-romance-scam.jpg";
import bookVoiceClone from "@/assets/book-voice-clone.jpg";
import bookMedicareFraud from "@/assets/book-medicare-fraud.jpg";
import bookEmailSafety from "@/assets/book-email-safety.jpg";
import bookTaxScam from "@/assets/book-tax-scam.jpg";
import bookTechSupport from "@/assets/book-tech-support.jpg";
import bookGrandparentScam from "@/assets/book-grandparent-scam.jpg";
import bookInvestmentFraud from "@/assets/book-investment-fraud.jpg";
import bookCharityScam from "@/assets/book-charity-scam.jpg";
// Product images removed - focusing on digital resources only
import { SEO } from "@/components/SEO";
import { supabase } from "@/integrations/supabase/client";
import { RotatingHeadlines } from "@/components/shared/RotatingHeadlines";
import HeroFloatingStats from "@/components/business/HeroFloatingStats";

// Static book products with covers (20 books)
// Author constant for all books
const BOOK_AUTHOR = "InVision Network • Department of Literature";

// Define book type for consistency
type BookItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  tag: string;
  stripe_price_id: string;
  author: string;
};

const staticBooks: BookItem[] = [
  {
    id: 'book-ai-fundamentals',
    name: 'AI Fundamentals',
    description: 'Master AI basics and protection strategies',
    price: 29.99,
    image: bookAiFundamentals,
    tag: 'Best Seller',
    stripe_price_id: 'price_1SjwOGJ8osfwYbX7UnEPLRMz',
    author: BOOK_AUTHOR
  },
  {
    id: 'book-scam-prevention',
    name: 'Scam Prevention Guide',
    description: 'Comprehensive guide to avoiding scams',
    price: 39.99,
    image: bookScamPrevention,
    tag: 'Featured',
    stripe_price_id: 'price_1SjwOIJ8osfwYbX74jTfNxcW',
    author: BOOK_AUTHOR
  },
  {
    id: 'book-family-safety',
    name: 'Family Safety Toolkit',
    description: 'Practical family safety protocols',
    price: 24.99,
    image: bookFamilySafety,
    tag: 'Family',
    stripe_price_id: 'price_1SjwOKJ8osfwYbX7GcmhErnQ',
    author: BOOK_AUTHOR
  },
  {
    id: 'book-senior-tech',
    name: 'Senior Tech Handbook',
    description: 'Tech safety for seniors',
    price: 27.99,
    image: bookSeniorTechSafety,
    tag: 'Seniors',
    stripe_price_id: 'price_1SjwOLJ8osfwYbX7mV3J5LtX',
    author: BOOK_AUTHOR
  },
  {
    id: 'book-digital-privacy',
    name: 'Digital Privacy Mastery',
    description: 'Protect your online privacy',
    price: 34.99,
    image: bookDigitalPrivacy,
    tag: 'Popular',
    stripe_price_id: 'price_1SjwOMJ8osfwYbX7ExCFG5R9',
    author: BOOK_AUTHOR
  },
  {
    id: 'book-deepfake',
    name: 'Deepfake Detection',
    description: 'Spot AI fakes and imposters',
    price: 32.99,
    image: bookDeepfakeDetection,
    tag: 'New',
    stripe_price_id: 'price_1SjwOOJ8osfwYbX7HUJrBIas',
    author: BOOK_AUTHOR
  },
  {
    id: 'book-password',
    name: 'Password Security',
    description: 'Secure all your accounts',
    price: 22.99,
    image: bookPasswordSecurity,
    tag: 'Essential',
    stripe_price_id: 'price_1SjwOPJ8osfwYbX7meUEbp3H',
    author: BOOK_AUTHOR
  },
  {
    id: 'book-social-media',
    name: 'Social Media Safety',
    description: 'Stay safe on social platforms',
    price: 26.99,
    image: bookSocialMediaSafety,
    tag: 'Trending',
    stripe_price_id: 'price_1SjwORJ8osfwYbX7e2gUB45e',
    author: BOOK_AUTHOR
  },
  {
    id: 'book-online-shopping',
    name: 'Online Shopping Guide',
    description: 'Shop safely anywhere',
    price: 24.99,
    image: bookOnlineShopping,
    tag: 'Practical',
    stripe_price_id: 'price_1SjwOTJ8osfwYbX7lPLOGwFE',
    author: BOOK_AUTHOR
  },
  {
    id: 'book-identity-theft',
    name: 'Identity Theft Prevention',
    description: 'Protect your identity',
    price: 36.99,
    image: bookIdentityTheft,
    tag: 'Critical',
    stripe_price_id: 'price_1SjwOUJ8osfwYbX7qlhBavay',
    author: BOOK_AUTHOR
  },
  {
    id: 'book-business-cyber',
    name: 'Business Cybersecurity',
    description: 'Enterprise security strategies',
    price: 49.99,
    image: bookBusinessCyber,
    tag: 'Professional',
    stripe_price_id: 'price_1SjwOYJ8osfwYbX7yBrF06h5',
    author: BOOK_AUTHOR
  },
  {
    id: 'book-ai-management',
    name: 'AI Management Guide',
    description: 'Manage AI tools securely',
    price: 34.99,
    image: bookAiManagement,
    tag: 'Business',
    stripe_price_id: 'price_1SjwOaJ8osfwYbX7hc4XzTHo',
    author: BOOK_AUTHOR
  },
  {
    id: 'book-being-real-ai',
    name: 'Being Real in AI World',
    description: 'Authenticity in the AI age',
    price: 27.99,
    image: bookBeingRealAi,
    tag: 'Philosophy',
    stripe_price_id: 'price_1SjwObJ8osfwYbX7SMFj8psB',
    author: BOOK_AUTHOR
  },
  {
    id: 'book-auth-personalities',
    name: 'Auth of Personalities',
    description: 'Advanced identity verification',
    price: 32.99,
    image: bookAuthPersonalities,
    tag: 'Advanced',
    stripe_price_id: 'price_1SjwOdJ8osfwYbX7MPe7VAm2',
    author: BOOK_AUTHOR
  },
  {
    id: 'book-auth-friendship-v2',
    name: 'Auth of Friendship V2',
    description: 'Verify social connections',
    price: 29.99,
    image: bookAuthFriendshipV2,
    tag: 'Volume 2',
    stripe_price_id: 'price_1SjwOfJ8osfwYbX7WKUTFPZz',
    author: BOOK_AUTHOR
  },
  {
    id: 'book-cyber-kids',
    name: 'Cyber Awareness for Kids',
    description: 'Teach children internet safety',
    price: 19.99,
    image: bookCyberKids,
    tag: 'Kids',
    stripe_price_id: 'price_1SjwOgJ8osfwYbX7BFT7VyBl',
    author: BOOK_AUTHOR
  },
  {
    id: 'book-smart-home',
    name: 'Smart Home Security',
    description: 'Protect IoT devices at home',
    price: 28.99,
    image: bookSmartHome,
    tag: 'IoT',
    stripe_price_id: 'price_1SjwOiJ8osfwYbX7crdnnxDP',
    author: BOOK_AUTHOR
  },
  {
    id: 'book-phishing-defense',
    name: 'Email Phishing Defense',
    description: 'Recognize and block phishing',
    price: 25.99,
    image: bookPhishingDefense,
    tag: 'Email',
    stripe_price_id: 'price_1SjwOjJ8osfwYbX7QoqGc9FQ',
    author: BOOK_AUTHOR
  },
  {
    id: 'book-banking-safety',
    name: 'Banking & Financial Safety',
    description: 'Secure your finances online',
    price: 31.99,
    image: bookBankingSafety,
    tag: 'Finance',
    stripe_price_id: 'price_1SjwOlJ8osfwYbX7jMwpmurh',
    author: BOOK_AUTHOR
  },
  {
    id: 'book-mobile-security',
    name: 'Mobile Phone Security',
    description: 'Keep your smartphone safe',
    price: 23.99,
    image: bookMobileSecurity,
    tag: 'Mobile',
    stripe_price_id: 'price_1SjwOmJ8osfwYbX7mo35N9ap',
    author: BOOK_AUTHOR
  },
  {
    id: 'book-crypto-defense',
    name: 'Crypto Scam Defense',
    description: 'Protect your digital assets from fraud',
    price: 34.99,
    image: bookCryptoDefense,
    tag: 'Crypto',
    stripe_price_id: 'price_1StJmsJ8osfwYbX7ioMIlJB0',
    author: BOOK_AUTHOR
  },
  {
    id: 'book-romance-scam',
    name: 'Romance Scam Awareness',
    description: 'Protect your heart and wallet',
    price: 28.99,
    image: bookRomanceScam,
    tag: 'Relationships',
    stripe_price_id: 'price_1StJmtJ8osfwYbX7cCVawnfv',
    author: BOOK_AUTHOR
  },
  {
    id: 'book-voice-clone',
    name: 'Voice Clone Detection',
    description: 'Spot AI fake calls instantly',
    price: 31.99,
    image: bookVoiceClone,
    tag: 'AI Safety',
    stripe_price_id: 'price_1StJmuJ8osfwYbX7s4o4JB2a',
    author: BOOK_AUTHOR
  },
  {
    id: 'book-medicare-fraud',
    name: 'Medicare Fraud Protection',
    description: 'Complete senior healthcare safety',
    price: 26.99,
    image: bookMedicareFraud,
    tag: 'Healthcare',
    stripe_price_id: 'price_1StJmvJ8osfwYbX7NqgadyPs',
    author: BOOK_AUTHOR
  },
  {
    id: 'book-email-safety',
    name: 'Email Safety Essentials',
    description: 'Stop inbox threats forever',
    price: 22.99,
    image: bookEmailSafety,
    tag: 'Email',
    stripe_price_id: 'price_1StJmxJ8osfwYbX7UPSnS1v8',
    author: BOOK_AUTHOR
  },
  {
    id: 'book-tax-scam',
    name: 'Tax Scam Prevention',
    description: 'Avoid IRS imposter schemes',
    price: 29.99,
    image: bookTaxScam,
    tag: 'Finance',
    stripe_price_id: 'price_1StJmyJ8osfwYbX7tb11WOIS',
    author: BOOK_AUTHOR
  },
  {
    id: 'book-tech-support',
    name: 'Tech Support Fraud Defense',
    description: 'Never get fooled by fake support',
    price: 25.99,
    image: bookTechSupport,
    tag: 'Tech',
    stripe_price_id: 'price_1StJmzJ8osfwYbX7SE1V5Dnn',
    author: BOOK_AUTHOR
  },
  {
    id: 'book-grandparent-scam',
    name: 'Grandparent Scam Defense',
    description: 'Protecting family bonds from scammers',
    price: 24.99,
    image: bookGrandparentScam,
    tag: 'Family',
    stripe_price_id: 'price_1StJn0J8osfwYbX7t2Ta3TxZ',
    author: BOOK_AUTHOR
  },
  {
    id: 'book-investment-fraud',
    name: 'Investment Fraud Guide',
    description: 'Spot Ponzi schemes fast',
    price: 36.99,
    image: bookInvestmentFraud,
    tag: 'Investing',
    stripe_price_id: 'price_1StJn1J8osfwYbX77tR8VN6p',
    author: BOOK_AUTHOR
  },
  {
    id: 'book-charity-scam',
    name: 'Charity Scam Awareness',
    description: 'Give safely to real causes',
    price: 21.99,
    image: bookCharityScam,
    tag: 'Giving',
    stripe_price_id: 'price_1StJn2J8osfwYbX7i25vJA5t',
    author: BOOK_AUTHOR
  }
];

// Physical products removed - focusing on digital resources only

// Rotating hero headlines
const heroHeadlines = ["Your Digital Safety Arsenal", "Premium Guides & Resources", "Expert Security Tools", "Products to Protect What Matters Most"];
function Resources() {
  const {
    addItem,
    lastClearReason,
    hadItemsBeforeClear,
    itemCount
  } = useCart();
  const {
    toast
  } = useToast();
  const {
    triggerEmptyCartHelp
  } = useCartFeedback();
  const [loading, setLoading] = useState<string | null>(null);
  const [currentHeadlineIndex, setCurrentHeadlineIndex] = useState(0);
  const [embeddedPaymentOpen, setEmbeddedPaymentOpen] = useState(false);
  const [embeddedPaymentConfig, setEmbeddedPaymentConfig] = useState<{
    mode: "subscription" | "payment";
    priceId: string;
    productName: string;
    amount: number;
    description?: string;
  } | null>(null);
  
  // Book cover modal state
  const [selectedBook, setSelectedBook] = useState<BookItem | null>(null);
  const [bookModalOpen, setBookModalOpen] = useState(false);

  const handleBookClick = (book: BookItem) => {
    setSelectedBook(book);
    setBookModalOpen(true);
  };


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
      setCurrentHeadlineIndex(prev => (prev + 1) % heroHeadlines.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Fetch products from database
  const {
    data: products,
    isLoading,
    error
  } = useQuery({
    queryKey: ['marketplace-products'],
    queryFn: async () => {
      const {
        data,
        error
      } = await supabase.from('products').select('*').eq('status', 'active').order('is_featured', {
        ascending: false
      }).order('created_at', {
        ascending: false
      });
      if (error) throw error;
      return data || [];
    }
  });

  // Separate physical products
  const physicalProducts = products?.filter(p => p.tags?.some((tag: string) => ['physical', 'device', 'hardware', 'kit', 'equipment'].includes(tag.toLowerCase()))) || [];
  const handleBuyNow = (product: typeof staticBooks[0]) => {
    // Use embedded payment modal instead of redirect
    setEmbeddedPaymentConfig({
      mode: "payment",
      priceId: product.stripe_price_id,
      productName: product.name,
      amount: Math.round(product.price * 100),
      // Convert to cents
      description: product.description
    });
    setEmbeddedPaymentOpen(true);
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
      description: `${book.name} has been added to your cart.`
    });
  };
  const resourcesHeroImages = PROFESSIONAL_HERO_IMAGES.resources;
  return <PageTransition variant="fade">
      <SEO title="Resources & Marketplace - Digital Guides & Security Products" description="Browse our curated collection of scam prevention guides and physical security products. Everything you need to protect yourself and your loved ones." />
      <Navigation />
      
      {/* Hero wrapper for floating stats */}
      <div className="relative">
        <Hero backgroundImages={resourcesHeroImages} headline="" subheadline="" showScrollIndicator={true}>
          {/* Transitioning Headlines */}
          <div className="text-center mb-6">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              <RotatingHeadlines headlines={heroHeadlines} className="" />
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
              Expert-curated guides, tools, and products designed to keep you and your family safe
            </p>
          </div>
        </Hero>
        
        {/* Floating Stats Bar - Outside Hero to stay static */}
        <HeroFloatingStats />
      </div>

      {/* Spacer for floating stats bar */}
      <div className="h-6" />

      <TrustBar />

      {/* Introduction Section */}
      <section className="py-6 bg-gradient-to-b from-background to-secondary/10">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-3 text-sm px-3 py-1 bg-gradient-to-r from-primary to-accent text-white">
                <Sparkles className="w-3.5 h-3.5 mr-1.5" /> Trusted Resources
              </Badge>
              <h2 className="text-2xl md:text-3xl font-bold mb-3">
                Your One-Stop Security Shop
              </h2>
              <p className="text-base text-muted-foreground mb-4 leading-relaxed">
                Welcome to InVision Network's resource center. Here you'll find carefully curated 
                <strong className="text-foreground"> e-books, digital guides, softcover books, and security gadgets</strong>. 
                all designed to help you and your family stay safe in the digital age. Every product 
                is created by security experts with decades of experience protecting families from scams.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
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
            {[{
            value: "20+",
            label: "Digital Guides",
            icon: BookOpen
          }, {
            value: "15+",
            label: "Security Products",
            icon: Shield
          }, {
            value: "100+",
            label: "Happy Customers",
            icon: Heart
          }, {
            value: "24/7",
            label: "Support Available",
            icon: Headphones
          }].map((stat, index) => <div key={index} className="flex flex-col items-center gap-1">
                <stat.icon className="w-5 h-5 text-primary mb-1" />
                <span className="text-2xl font-bold text-foreground">{stat.value}</span>
                <span className="text-xs text-muted-foreground">{stat.label}</span>
              </div>)}
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
                  {/* eBook Badge - Top Left */}
                  <Badge className="absolute top-2 left-2 text-[9px] px-1.5 py-0.5 bg-primary/90 text-primary-foreground z-10 shadow-sm">
                    📘 eBook
                  </Badge>
                  
                  {/* Tag Badge - Top Right */}
                  <Badge className="absolute top-2 right-2 text-[9px] px-1.5 py-0.5 bg-gradient-to-r from-primary to-accent text-primary-foreground z-10">
                    {book.tag}
                  </Badge>

                  {/* Book Cover Image - Clickable */}
                  <button
                    onClick={() => handleBookClick(book)}
                    className="relative mb-3 rounded-lg overflow-hidden bg-secondary/30 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 hover:ring-2 hover:ring-primary/50"
                    aria-label={`View ${book.name} details`}
                  >
                    <div className="aspect-[3/4]">
                      <img 
                        src={book.image} 
                        alt={book.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                    </div>
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-300 flex items-center justify-center">
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-background/90 text-foreground text-xs px-3 py-1.5 rounded-full font-medium shadow-lg">
                        👁️ View Details
                      </span>
                    </div>
                  </button>
                  
                  {/* Content */}
                  <h3 className="text-xs md:text-sm font-bold mb-0.5 text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                    {book.name}
                  </h3>
                  
                  {/* Author */}
                  <p className="text-[8px] text-muted-foreground mb-1 truncate">
                    {book.author}
                  </p>
                  
                  <p className="text-[10px] text-muted-foreground mb-2 line-clamp-2 flex-1">
                    {book.description}
                  </p>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-2.5 h-2.5 fill-chart-4 text-chart-4" />
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
                        onClick={() => handleBuyNow(book)} 
                        className="text-[10px] h-7 px-2"
                      >
                        <Zap className="w-3 h-3 mr-1" />
                        Buy
                      </Button>
                    </div>
                  </div>
                </Card>
              </ScrollReveal>
            ))}
          </div>

          {/* Bundle Info Banner */}
          <ScrollReveal>
            <div className="mt-8 space-y-4">
              <div className="p-4 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-xl border border-primary/20 text-center">
                <p className="text-sm font-medium mb-2">
                  📖 <strong>Click any book cover</strong> to view full details and enlarged cover image
                </p>
                <p className="text-xs text-muted-foreground">
                  All digital products are delivered instantly to your email. Written by InVision Network experts.
                </p>
              </div>

              {/* Language Request Note */}
              <div className="p-4 bg-gradient-to-r from-accent/10 via-primary/5 to-accent/10 rounded-xl border border-accent/20 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Globe className="w-4 h-4 text-accent" />
                  <span className="font-semibold text-sm">Need a Book in a Different Language?</span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  We offer translations in Spanish, French, German, Chinese, and more. 
                  <br className="hidden md:block" />
                  Simply contact us with your request and we'll prepare your copy within <strong>1-3 business days</strong>.
                </p>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/contact" className="inline-flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Request Translation
                  </Link>
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Premier Protection - Insurance Section */}
      <section id="insurance" className="py-12 bg-gradient-to-b from-background to-primary/5">
        
      </section>

      {/* Emergency Scripts Section */}
      <section id="scripts" className="py-12 bg-card">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-10">
              <Badge className="mb-3 text-sm px-4 py-1.5 bg-gradient-to-r from-chart-4 to-chart-5 text-primary-foreground">
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
            {[{
            title: "IRS/Tax Scam Script",
            description: "What to say when someone claims to be from the IRS demanding immediate payment",
            icon: FileText,
            color: "from-red-500/20 to-red-600/20",
            textColor: "text-red-600"
          }, {
            title: "Tech Support Scam Script",
            description: "Responses for fake Microsoft, Apple, or antivirus callers",
            icon: Headphones,
            color: "from-blue-500/20 to-blue-600/20",
            textColor: "text-blue-600"
          }, {
            title: "Grandparent Scam Script",
            description: "Verification questions when someone claims a family emergency",
            icon: Heart,
            color: "from-pink-500/20 to-pink-600/20",
            textColor: "text-pink-600"
          }, {
            title: "Bank Fraud Alert Script",
            description: "How to verify if a bank fraud alert is legitimate",
            icon: Lock,
            color: "from-green-500/20 to-green-600/20",
            textColor: "text-green-600"
          }].map((script, index) => <ScrollReveal key={script.title} delay={index * 100}>
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
              </ScrollReveal>)}
          </div>

          <ScrollReveal delay={400}>
            <div className="text-center mt-8">
              <p className="text-sm text-muted-foreground mb-4">
                📞 <strong>Remember:</strong> Legitimate organizations will never pressure you for immediate payment or personal info over the phone.
              </p>
              <Button asChild variant="default" className="gap-2">
                
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>


      {/* Physical products section removed - focusing on digital resources */}

      {/* Why Shop With Us - Final Section */}
      
      {/* Cart Abandonment Notification */}
      <CartAbandonmentNotification />
      
      {/* Embedded Payment Modal */}
      {embeddedPaymentConfig && (
        <EmbeddedPaymentModal 
          open={embeddedPaymentOpen} 
          onOpenChange={setEmbeddedPaymentOpen} 
          mode={embeddedPaymentConfig.mode} 
          priceId={embeddedPaymentConfig.priceId} 
          productName={embeddedPaymentConfig.productName} 
          amount={embeddedPaymentConfig.amount} 
          description={embeddedPaymentConfig.description} 
          onSuccess={() => {
            toast({
              title: "Purchase Complete!",
              description: "Check your email for your download link."
            });
          }} 
        />
      )}
      
      {/* Book Cover Modal */}
      <BookCoverModal
        isOpen={bookModalOpen}
        onClose={() => setBookModalOpen(false)}
        book={selectedBook}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
      />
      
      <Footer />
    </PageTransition>;
}
export default Resources;