import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { AiAnalysisCTA } from "@/components/home/AiAnalysisCTA";
import { useQuery } from "@tanstack/react-query";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import { CartAbandonmentNotification } from "@/components/CartAbandonmentNotification";
import { useCartFeedback } from "@/contexts/CartFeedbackContext";
import TrustBar from "@/components/TrustBar";
import { PageTransition } from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Shield,
  ShoppingCart,
  Star,
  Loader2,
  Zap,
  Award,
  CheckCircle,
  Gift,
  BookOpen,
  Package,
  Sparkles,
  Users,
  TrendingUp,
  Heart,
  Headphones,
  Clock,
  Lock,
  FileText,
  Video,
  Podcast,
  Globe,
  Mail } from
"lucide-react";
import { EmbeddedPaymentModal } from "@/components/payment/EmbeddedPaymentModal";
// ScrollReveal removed — instant rendering
import { PROFESSIONAL_HERO_IMAGES } from "@/config/professionalHeroImages";
import BookCoverModal from "@/components/resources/BookCoverModal";
import { BOOK_CATALOG } from "@/config/bookCatalog";
import { SEO } from "@/components/SEO";
import { supabase } from "@/integrations/supabase/client";
import { RotatingHeadlines } from "@/components/shared/RotatingHeadlines";
import HeroFloatingStats from "@/components/business/HeroFloatingStats";
// GlassmorphismBackground removed — using Business-style sections
// NatureAccent removed for performance
import { usePrerenderBlocker } from "@/contexts/PrerenderContext";
import { TranslationRequestDialog } from "@/components/resources/TranslationRequestDialog";
import { ReadBooksDialog } from "@/components/resources/ReadBooksDialog";

// Rotating hero headlines
const heroHeadlines = [
"Your Digital Safety Arsenal",
"Premium Guides & Resources",
"Expert Security Tools",
"Guides to Protect What Matters Most"];

function Resources() {
  const { addItem, lastClearReason, hadItemsBeforeClear, itemCount } =
  useCart();
  const { toast } = useToast();
  const { triggerEmptyCartHelp } = useCartFeedback();
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
  const [selectedBook, setSelectedBook] = useState<(typeof BOOK_CATALOG)[number] | null>(null);
  const [bookModalOpen, setBookModalOpen] = useState(false);
  const [translationDialogOpen, setTranslationDialogOpen] = useState(false);
  const [readBooksOpen, setReadBooksOpen] = useState(false);

  const handleBookClick = (book: (typeof BOOK_CATALOG)[number]) => {
    setSelectedBook(book);
    setBookModalOpen(true);
  };

  // Track when cart is manually emptied to show help
  useEffect(() => {
    if (
    lastClearReason === "manual" &&
    hadItemsBeforeClear &&
    itemCount === 0)
    {
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
  const {
    data: products,
    isLoading,
    error
  } = useQuery({
    queryKey: ["marketplace-products"],
    queryFn: async () => {
      const { data, error } = await supabase.
      from("products").
      select("*").
      eq("status", "active").
      order("is_featured", {
        ascending: false
      }).
      order("created_at", {
        ascending: false
      });
      if (error) throw error;
      return data || [];
    }
  });
  usePrerenderBlocker(isLoading);

  // Separate physical products
  const physicalProducts =
  products?.filter((p) =>
  p.tags?.some((tag: string) =>
  ["physical", "device", "hardware", "kit", "equipment"].includes(
    tag.toLowerCase()
  )
  )
  ) || [];
  const handleBuyNow = (product: (typeof BOOK_CATALOG)[number]) => {
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
  const handleAddToCart = (book: (typeof BOOK_CATALOG)[number]) => {
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
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const resourceStructuredData = useMemo(() => {
    const toAbsoluteUrl = (url: string) => {
      if (url.startsWith("http")) return url;
      return `https://invisionnetwork.org${url.startsWith("/") ? url : `/${url}`}`;
    };

    return {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Scam Protection Resource Library",
      itemListElement: BOOK_CATALOG.slice(0, 8).map((book, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Product",
          name: book.name,
          description: book.description,
          image: [toAbsoluteUrl(book.image)],
          brand: {
            "@type": "Brand",
            name: "InVision Network"
          },
          offers: {
            "@type": "Offer",
            priceCurrency: "USD",
            price: book.price.toFixed(2),
            availability: "https://schema.org/InStock",
            url: "https://invisionnetwork.org/resources"
          }
        }
      }))
    };
  }, []);
  const resourcesHeroImages = PROFESSIONAL_HERO_IMAGES.resources;
  return (
    <PageTransition variant="fade">
      <SEO
        title="Resources & Marketplace - Digital Guides & Security Products"
        description="Browse our curated collection of scam prevention e-books and digital security guides. Everything you need to protect yourself and your loved ones."
        structuredData={resourceStructuredData} />

      <Navigation />

      {/* Hero wrapper for floating stats */}
      <div className="relative">
        <Hero
          backgroundImages={resourcesHeroImages}
          headline=""
          subheadline=""
          showScrollIndicator={true}>

          {/* Transitioning Headlines */}
          <div className="text-center mb-6">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              <RotatingHeadlines headlines={heroHeadlines} className="" />
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
              Expert-curated guides and tools designed to keep you
              and your family safe
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="xl"
              onClick={() => scrollToSection("guides")}
            >
              Shop Digital Guides
            </Button>
            <Button
              size="xl"
              variant="heroOutline"
              onClick={() => setReadBooksOpen(true)}
            >
              <BookOpen className="h-5 w-5 mr-2" />
              📖 Read Your Books
            </Button>
          </div>
        </Hero>

        {/* Floating Stats Bar - Outside Hero to stay static */}
        <HeroFloatingStats />
      </div>

      {/* Spacer for floating stats bar */}
      <div className="hidden lg:block h-14" />
      <div className="lg:hidden h-6" />

      <TrustBar />

      {/* Introduction Section — Business style */}
      <section className="py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-10">
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-6 shadow-sm border border-primary/15 bg-primary/5">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span className="text-primary">Trusted Resources</span>
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-5 tracking-tight leading-[1.1]">
              Your One-Stop Security Shop
            </h2>
            <p className="text-base md:text-lg max-w-3xl mx-auto leading-relaxed text-muted-foreground mb-6">
              Welcome to InVision Network's resource center. Here you'll find carefully curated
              <strong className="text-foreground"> e-books and digital guides</strong>.
              All designed to help you and your family stay safe in the digital age.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              {[
                { icon: BookOpen, label: "Digital eBooks" },
                { icon: Lock, label: "Secure Online Reading" },
                { icon: Globe, label: "Read on Any Device" },
                { icon: Users, label: "Family-Friendly" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2 text-sm text-muted-foreground bg-card border border-border/40 px-3 py-1.5 rounded-full">
                  <item.icon className="w-4 h-4 text-primary" />
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* AI Analysis CTA */}
          <AiAnalysisCTA compact />

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center mt-10">
            {[
              { value: "20+", label: "Digital Guides", icon: BookOpen },
              { value: "30+", label: "Expert Guides", icon: Shield },
              { value: "100+", label: "Happy Customers", icon: Heart },
              { value: "24/7", label: "Support Available", icon: Headphones },
            ].map((stat, index) => (
              <div key={index} className="flex flex-col items-center gap-1 rounded-2xl bg-card border border-border/40 p-4 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-1">
                  <stat.icon className="w-5 h-5 text-primary" />
                </div>
                <span className="text-2xl font-black text-foreground">{stat.value}</span>
                <span className="text-xs text-muted-foreground">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Digital Security Guides */}
      <section id="guides" className="py-10 sm:py-16 md:py-20 bg-muted/20 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-6 shadow-sm border border-primary/15 bg-primary/5">
              <BookOpen className="w-3.5 h-3.5 text-primary" />
              <span className="text-primary">Digital Library</span>
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-5 tracking-tight leading-[1.1]">
              Digital Security <span className="text-primary">Guides</span>
            </h2>
            <p className="text-base md:text-lg max-w-3xl mx-auto leading-relaxed text-muted-foreground">
              Read securely online from any device. No downloads needed.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4" style={{ contentVisibility: 'auto', containIntrinsicSize: '0 2000px' }}>
            {BOOK_CATALOG.map((book, bookIndex) =>
              <div key={book.id} className="group relative">
                <div className="h-full rounded-2xl p-[1px] bg-gradient-to-b from-border/50 to-border/20 hover:from-primary/30 hover:to-primary/10 transition-colors duration-200 shadow-sm hover:shadow-md">
                  <Card className="h-full rounded-[calc(1rem-1px)] p-3 border-0 bg-card flex flex-col relative overflow-hidden">
                    {/* Gradient accent bar */}
                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/30 to-accent/20" />

                    {/* eBook Badge - Top Left */}
                    <Badge className="absolute top-2 left-2 text-[9px] px-1.5 py-0.5 bg-primary/90 text-primary-foreground z-10 shadow-sm">
                      📘 eBook
                    </Badge>

                    {/* Tag Badge - Top Right */}
                    <Badge className="absolute top-2 right-2 text-[9px] px-1.5 py-0.5 bg-gradient-to-r from-primary to-accent text-white z-10 shadow-sm">
                      {book.tag}
                    </Badge>

                    {/* Book Cover Image - Optimized */}
                    <button
                      onClick={() => handleBookClick(book)}
                      className="relative mb-3 rounded-xl overflow-hidden bg-muted/30 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-1"
                      aria-label={`View ${book.name} details`}
                    >
                      <div className="aspect-[3/4]">
                        <img
                          src={book.image}
                          alt={book.name}
                          width={240}
                          height={320}
                          loading={bookIndex < 10 ? "eager" : "lazy"}
                          decoding={bookIndex < 10 ? "sync" : "async"}
                          fetchPriority={bookIndex < 5 ? "high" : undefined}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-150 flex items-center justify-center">
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-150 bg-card/90 text-foreground text-xs px-3 py-1.5 rounded-full font-semibold shadow-lg border border-border/30">
                          👁️ View Details
                        </span>
                      </div>
                    </button>

                    {/* Content */}
                    <h3 className="text-xs md:text-sm font-bold mb-0.5 text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                      {book.name}
                    </h3>

                    <p className="text-[8px] text-muted-foreground mb-1 truncate">
                      {book.author}
                    </p>

                    <p className="text-[10px] text-muted-foreground mb-2 line-clamp-2 flex-1">
                      {book.description}
                    </p>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) =>
                        <Star key={i} className="w-2.5 h-2.5 fill-chart-4 text-chart-4" />
                      )}
                      <span className="text-[9px] text-muted-foreground ml-1">5.0</span>
                    </div>

                    {/* Price and Actions */}
                    <div className="mt-auto pt-2 border-t border-border/30">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-base md:text-lg font-black bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                          ${book.price}
                        </span>
                        <span className="text-[8px] text-emerald-600 font-semibold">
                          🎖️ Vets -10%
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-1.5">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleAddToCart(book)}
                          className="text-[10px] h-7 px-2 rounded-lg"
                        >
                          <ShoppingCart className="w-3 h-3 mr-1" />
                          Cart
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleBuyNow(book)}
                          className="text-[10px] h-7 px-2 rounded-lg bg-gradient-to-r from-primary to-accent text-white hover:opacity-90"
                        >
                          <Zap className="w-3 h-3 mr-1" />
                          Buy
                        </Button>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            )}
          </div>

          {/* Bundle Info Banner */}
          <div className="mt-8 space-y-4">
              {/* Language Request Note */}
              <div className="p-4 bg-gradient-to-r from-accent/10 via-primary/5 to-accent/10 rounded-xl border border-accent/20 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Globe className="w-4 h-4 text-accent" />
                  <span className="font-semibold text-sm">
                    Need a Book in a Different Language?
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  We offer translations in Spanish, French, German, Chinese, and more.
                  <br className="hidden md:block" />
                  Simply request and we'll prepare your
                  copy within <strong>1-3 business days</strong>.
                </p>
                <Button variant="outline" size="sm" onClick={() => setTranslationDialogOpen(true)}>
                  <Mail className="w-4 h-4 mr-2" />
                  Request Translation
                </Button>
              </div>
            </div>
        </div>
      </section>



      {/* Emergency Scripts Section */}
      <section id="scripts" className="py-10 sm:py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-6 shadow-sm border border-primary/15 bg-primary/5">
              <FileText className="w-3.5 h-3.5 text-primary" />
              <span className="text-primary">Free Downloads</span>
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-5 tracking-tight leading-[1.1]">
              Emergency Anti-Scam <span className="text-primary">Scripts</span>
            </h2>
            <p className="text-base md:text-lg max-w-3xl mx-auto leading-relaxed text-muted-foreground">
              Download ready-to-use scripts to protect yourself and your loved ones when scammers call
            </p>
          </div>

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
            }].map((script) =>
              <Card key={script.title} className="p-5 h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${script.color} flex items-center justify-center mb-4`}>
                  <script.icon className={`w-6 h-6 ${script.textColor}`} />
                </div>
                <h3 className="font-bold mb-2">{script.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 flex-1">
                  {script.description}
                </p>
                <Button variant="outline" className="w-full gap-2" size="sm">
                  <FileText className="w-4 h-4" />
                  Download PDF
                </Button>
              </Card>
            )}
          </div>

          <div className="text-center mt-8">
            <p className="text-sm text-muted-foreground mb-4">
              📞 <strong>Remember:</strong> Legitimate organizations will
              never pressure you for immediate payment or personal info over
              the phone.
            </p>
          </div>
        </div>
      </section>

      {/* Why Shop With Us */}
      <section className="py-12 sm:py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Why Trust InVision Network</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Your security education partner — backed by expertise, integrity, and a mission to protect.</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { icon: "🛡️", title: "Expert-Authored", desc: "All resources created by certified cybersecurity professionals" },
              { icon: "🔒", title: "Secure Delivery", desc: "Protected digital reader — no downloads, no unauthorized sharing" },
              { icon: "💬", title: "Ongoing Support", desc: "Email support and regular content updates included" },
            ].map((item) => (
              <div key={item.title} className="text-center p-6 rounded-xl bg-background border border-border/50">
                <span className="text-3xl mb-3 block">{item.icon}</span>
                <h3 className="font-semibold mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cart Abandonment Notification */}
      <CartAbandonmentNotification />

      {/* Embedded Payment Modal */}
      {embeddedPaymentConfig &&
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
            description: "Check your email for your Access ID to start reading."
          });
        }} />

      }

      {/* Book Cover Modal */}
      <BookCoverModal
        isOpen={bookModalOpen}
        onClose={() => setBookModalOpen(false)}
        book={selectedBook}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow} />

      {/* Translation Request Dialog */}
      <TranslationRequestDialog
        isOpen={translationDialogOpen}
        onClose={() => setTranslationDialogOpen(false)} />

      {/* Read Books Dialog */}
      <ReadBooksDialog
        open={readBooksOpen}
        onOpenChange={setReadBooksOpen} />

      <Footer />
    </PageTransition>);

}
export default Resources;