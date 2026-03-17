import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  BookOpen,
  Search,
  Filter,
  ShoppingCart,
  Star,
  Users,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { LIBRARY_BOOKS } from "@/data/libraryBooks";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  { value: "all", label: "All Books" },
  { value: "cybersecurity", label: "Cybersecurity" },
  { value: "scam", label: "Scam Prevention" },
  { value: "ai", label: "AI & Technology" },
  { value: "privacy", label: "Privacy" },
  { value: "business", label: "Business" },
  { value: "social", label: "Social Media" },
  { value: "seniors", label: "Seniors" },
];

export default function LibraryPage() {
  const { addItem } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered = useMemo(() => {
    return LIBRARY_BOOKS.filter((book) => {
      const matchesCategory =
        activeCategory === "all" || book.category === activeCategory;
      const q = search.toLowerCase();
      const matchesSearch =
        !q ||
        book.title.toLowerCase().includes(q) ||
        book.subtitle.toLowerCase().includes(q) ||
        book.description.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [search, activeCategory]);

  const handleAddToCart = (book: (typeof LIBRARY_BOOKS)[0], e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: book.slug,
      productId: book.slug,
      name: book.title,
      price: book.price,
      image: book.cover_image,
      isDigital: true,
      stripe_price_id: book.stripe_price_id,
    });
    toast({
      title: "Added to cart",
      description: `${book.title} has been added to your cart.`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO
        title="Digital Library | InVision Network — Cybersecurity & AI Books"
        description="Browse InVision Network's complete digital library. Expert cybersecurity, AI safety, scam prevention, and privacy guides written for every skill level. Instant access after purchase."
        canonical="https://www.invisionnetwork.org/library"
        keywords="cybersecurity books, AI safety guide, scam prevention ebook, digital library, InVision Network"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "InVision Network Digital Library",
          description: "Expert cybersecurity and AI safety digital books",
          url: "https://www.invisionnetwork.org/library",
          publisher: {
            "@type": "Organization",
            name: "InVision Network",
            url: "https://www.invisionnetwork.org",
          },
        }}
      />
      <Navigation />

      <main id="main-content" tabIndex={-1} className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-purple-50/50 border-b py-14">
          <div className="container mx-auto px-4 max-w-5xl text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-medium mb-4">
              <Sparkles className="h-4 w-4" />
              AI-Updated Content
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              InVision Network Digital Library
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Expert guides on cybersecurity, AI safety, scam prevention, and digital privacy.
              Written by our security team, updated by AI to stay current with evolving threats.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <BookOpen className="h-4 w-4 text-primary" />
                {LIBRARY_BOOKS.length} expert titles
              </span>
              <span className="flex items-center gap-1.5">
                <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                5-star rated
              </span>
              <span className="flex items-center gap-1.5">
                <Users className="h-4 w-4 text-primary" />
                Bulk pricing available
              </span>
            </div>
          </div>
        </section>

        {/* Filters */}
        <section className="border-b bg-background/80 sticky top-16 z-10 backdrop-blur-sm">
          <div className="container mx-auto px-4 max-w-6xl py-3">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search books..."
                  className="pl-9"
                />
              </div>
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
                <Filter className="h-4 w-4 text-muted-foreground shrink-0" />
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.value}
                    onClick={() => setActiveCategory(cat.value)}
                    className={cn(
                      "shrink-0 px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
                      activeCategory === cat.value
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted hover:bg-muted/80 text-foreground"
                    )}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Book grid */}
        <section className="container mx-auto px-4 py-10 max-w-6xl">
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">
              <BookOpen className="mx-auto mb-4 h-10 w-10 opacity-50" />
              <p className="text-lg">No books match your search.</p>
              <Button variant="ghost" className="mt-3" onClick={() => { setSearch(""); setActiveCategory("all"); }}>
                Clear filters
              </Button>
            </div>
          ) : (
            <>
              <p className="text-sm text-muted-foreground mb-6">
                Showing {filtered.length} of {LIBRARY_BOOKS.length} books
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filtered.map((book) => (
                  <Link
                    key={book.slug}
                    to={`/resources/${book.slug}`}
                    className="group"
                  >
                    <Card className="h-full hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 border-border/60">
                      {/* Cover image */}
                      <div className="relative aspect-[3/2] bg-gradient-to-br from-primary/20 to-purple-100 rounded-t-lg overflow-hidden flex items-center justify-center">
                        <BookOpen className="h-12 w-12 text-primary/40" />
                        {book.tag && (
                          <Badge className="absolute top-2 left-2 text-xs bg-primary/90">
                            {book.tag}
                          </Badge>
                        )}
                      </div>

                      <CardContent className="p-4 flex flex-col gap-3">
                        <div>
                          <h2 className="font-semibold leading-tight group-hover:text-primary transition-colors line-clamp-2">
                            {book.title}
                          </h2>
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                            {book.subtitle}
                          </p>
                        </div>

                        <div className="flex items-center gap-1 text-yellow-500">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-3 w-3 fill-yellow-400" />
                          ))}
                          <span className="text-xs text-muted-foreground ml-1">5.0</span>
                        </div>

                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <BookOpen className="h-3.5 w-3.5" />
                          <span>{book.total_pages} pages · {book.chapters.length} chapters</span>
                        </div>

                        <div className="flex items-center justify-between mt-auto pt-1">
                          <span className="text-lg font-bold text-primary">
                            ${book.price.toFixed(2)}
                          </span>
                          <Button
                            size="sm"
                            className="gap-1.5 h-8 text-xs"
                            onClick={(e) => handleAddToCart(book, e)}
                          >
                            <ShoppingCart className="h-3.5 w-3.5" />
                            Add to Cart
                          </Button>
                        </div>

                        <div className="flex items-center gap-1 text-xs text-primary/70 hover:text-primary transition-colors">
                          Read free preview
                          <ChevronRight className="h-3.5 w-3.5" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </>
          )}
        </section>

        {/* Bulk CTA */}
        <section className="bg-primary/5 border-t py-12">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <Users className="mx-auto mb-4 h-10 w-10 text-primary" />
            <h2 className="text-2xl font-bold mb-3">Ordering for a Group or Organization?</h2>
            <p className="text-muted-foreground mb-6">
              Bulk pricing starts at 5 copies. Perfect for senior centers, libraries, businesses, and
              family gift sets. Contact us for custom pricing on 20+ copies.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Button asChild size="lg">
                <Link to="/contact">Get Bulk Pricing</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/training">View Training Programs</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
