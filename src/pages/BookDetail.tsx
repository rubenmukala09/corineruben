import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  BookOpen,
  ArrowLeft,
  ShoppingCart,
  Users,
  Star,
  ChevronDown,
  ChevronUp,
  Lock,
  CheckCircle,
  FileText,
} from "lucide-react";
import { getBookBySlug, LIBRARY_BOOKS } from "@/data/libraryBooks";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";

export default function BookDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { toast } = useToast();
  const [expandedChapter, setExpandedChapter] = useState<number | null>(1);

  const book = getBookBySlug(slug || "");

  if (!book) {
    return (
      <div className="min-h-screen flex flex-col">
        <SEO title="Book Not Found" description="The requested book was not found." noindex />
        <Navigation />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center py-20">
            <BookOpen className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
            <h1 className="text-2xl font-bold mb-2">Book Not Found</h1>
            <p className="text-muted-foreground mb-6">We could not find the book you are looking for.</p>
            <Button asChild><Link to="/resources">Browse All Books</Link></Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem({
      id: book.slug,
      productId: book.slug,
      name: book.title,
      price: book.price,
      image: book.cover_image,
      isDigital: true,
      stripe_price_id: book.stripe_price_id,
    });
    toast({ title: "Added to cart", description: `${book.title} has been added to your cart.` });
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate("/resources#checkout");
  };

  const relatedBooks = LIBRARY_BOOKS.filter(
    (b) => b.slug !== book.slug && (b.category === book.category || b.price <= book.price + 10)
  ).slice(0, 3);

  const firstChapter = book.chapters[0];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO
        title={`${book.title} | InVision Network Digital Library`}
        description={`${book.subtitle} — ${book.description}`}
        image={`https://www.invisionnetwork.org${book.cover_image}`}
        type="book"
        keywords={`${book.category} book, cybersecurity guide, ${book.title.toLowerCase()}, InVision Network`}
        canonical={`https://www.invisionnetwork.org/resources/${book.slug}`}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Book",
          name: book.title,
          description: book.description,
          author: { "@type": "Organization", name: "InVision Network" },
          publisher: { "@type": "Organization", name: "InVision Network" },
          numberOfPages: book.total_pages,
          offers: {
            "@type": "Offer",
            price: book.price.toFixed(2),
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
            url: `https://www.invisionnetwork.org/purchase/${book.slug}`,
          },
        }}
      />
      <Navigation />

      <main id="main-content" tabIndex={-1} className="flex-1">
        {/* Breadcrumb */}
        <div className="border-b bg-muted/30">
          <div className="container mx-auto px-4 py-3">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
              <span>/</span>
              <Link to="/resources" className="hover:text-foreground transition-colors">Resources</Link>
              <span>/</span>
              <span className="text-foreground font-medium truncate max-w-[200px]">{book.title}</span>
            </nav>
          </div>
        </div>

        {/* Hero section */}
        <section className="container mx-auto px-4 py-12 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Cover */}
            <div className="md:col-span-1">
              <div className="sticky top-24">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[3/4] bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                  {book.cover_image ? (
                    <img
                      src={book.cover_image}
                      alt={`${book.title} book cover`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                  ) : null}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-gradient-to-br from-primary/80 to-purple-800/80 text-white text-center">
                    <BookOpen className="h-16 w-16 mb-4 opacity-80" />
                    <h2 className="text-xl font-bold leading-tight">{book.title}</h2>
                    <p className="text-sm mt-2 opacity-80">{book.subtitle}</p>
                  </div>
                </div>

                {/* Purchase box */}
                <Card className="mt-6 border-primary/20 shadow-lg">
                  <CardContent className="p-5 space-y-4">
                    <div className="flex items-baseline justify-between">
                      <span className="text-3xl font-bold text-primary">${book.price.toFixed(2)}</span>
                      {book.bulk_price && (
                        <span className="text-sm text-muted-foreground">
                          Bulk (5+): <strong>${book.bulk_price.toFixed(2)}/copy</strong>
                        </span>
                      )}
                    </div>

                    <Button className="w-full gap-2 text-base h-11" onClick={handleBuyNow}>
                      <ShoppingCart className="h-4 w-4" />
                      Buy Now — Instant Access
                    </Button>
                    <Button variant="outline" className="w-full gap-2" onClick={handleAddToCart}>
                      Add to Cart
                    </Button>

                    <Separator />

                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                        Instant digital delivery
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                        {book.total_pages} pages of expert content
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                        AI-updated content — always current
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                        Bulk pricing for 5+ copies
                      </div>
                    </div>

                    <Separator />

                    <Button variant="ghost" size="sm" className="w-full gap-2 text-muted-foreground" asChild>
                      <Link to={`/purchase/${book.slug}`}>
                        <Users className="h-4 w-4" />
                        Bulk / Group Orders
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Details */}
            <div className="md:col-span-2 space-y-8">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <Badge variant="secondary" className="capitalize">{book.category}</Badge>
                  {book.tag && <Badge className="bg-primary/10 text-primary border-primary/20">{book.tag}</Badge>}
                </div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{book.title}</h1>
                <p className="text-xl text-muted-foreground mb-4">{book.subtitle}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                  <span className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="ml-1">5.0</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <FileText className="h-4 w-4" />
                    {book.total_pages} pages
                  </span>
                  <span className="flex items-center gap-1">
                    <BookOpen className="h-4 w-4" />
                    {book.chapters.length} chapters
                  </span>
                </div>
                <p className="text-base text-foreground/80 leading-relaxed">{book.description}</p>
              </div>

              {/* Free chapter preview */}
              <Card className="border-primary/20 bg-primary/5">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold">Free Preview — Chapter 1</h2>
                    <Badge variant="outline" className="border-primary/30 text-primary">Free</Badge>
                  </div>
                  <h3 className="font-medium text-foreground mb-3">{firstChapter.chapter_title}</h3>
                  <div
                    className="prose prose-sm max-w-none text-foreground/80 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:mb-1 [&_h3]:font-semibold [&_h3]:mt-4 [&_h3]:mb-2"
                    dangerouslySetInnerHTML={{ __html: firstChapter.content_html }}
                  />
                  <p className="text-xs text-muted-foreground mt-4 italic">
                    Pages {firstChapter.page_start}–{firstChapter.page_end} of {book.total_pages}
                  </p>
                </CardContent>
              </Card>

              {/* Table of Contents */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Table of Contents</h2>
                <div className="space-y-2">
                  {book.chapters.map((chapter) => (
                    <div key={chapter.chapter_number} className="border rounded-lg overflow-hidden">
                      <button
                        className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors"
                        onClick={() =>
                          setExpandedChapter(
                            expandedChapter === chapter.chapter_number ? null : chapter.chapter_number
                          )
                        }
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-mono text-muted-foreground w-6">
                            {String(chapter.chapter_number).padStart(2, "0")}
                          </span>
                          <span className="font-medium">{chapter.chapter_title}</span>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-xs text-muted-foreground hidden sm:block">
                            pp. {chapter.page_start}–{chapter.page_end}
                          </span>
                          {chapter.chapter_number === 1 ? (
                            expandedChapter === 1 ? (
                              <ChevronUp className="h-4 w-4 text-muted-foreground" />
                            ) : (
                              <ChevronDown className="h-4 w-4 text-muted-foreground" />
                            )
                          ) : (
                            <Lock className="h-4 w-4 text-muted-foreground" />
                          )}
                        </div>
                      </button>
                      {expandedChapter === chapter.chapter_number && chapter.chapter_number === 1 && (
                        <div className="px-4 pb-4 pt-1 text-sm text-muted-foreground border-t bg-muted/20">
                          Free preview available above. Purchase to access all chapters.
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-sm text-muted-foreground flex items-center gap-2">
                  <Lock className="h-3.5 w-3.5" />
                  Chapters 2–{book.chapters.length} unlock immediately after purchase.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Related books */}
        {relatedBooks.length > 0 && (
          <section className="bg-muted/30 border-t py-12">
            <div className="container mx-auto px-4 max-w-6xl">
              <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedBooks.map((related) => (
                  <Card key={related.slug} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-5">
                      <div className="flex items-start gap-4">
                        <div className="w-16 h-20 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                          <BookOpen className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-sm leading-tight mb-1 truncate">{related.title}</h3>
                          <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{related.subtitle}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-primary font-bold">${related.price.toFixed(2)}</span>
                            <Button variant="outline" size="sm" asChild>
                              <Link to={`/resources/${related.slug}`}>View</Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Back nav */}
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <Button variant="ghost" asChild className="gap-2">
            <Link to="/resources">
              <ArrowLeft className="h-4 w-4" />
              Back to All Resources
            </Link>
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
