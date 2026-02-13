import { useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowRight, Loader2, BookOpen } from "lucide-react";
import heroResourcesNew from "@/assets/hero-resources-new.jpg";
import heroResources from "@/assets/hero-resources.jpg";
import heroResourcesMarketplace from "@/assets/hero-resources-marketplace.jpg";
import { useArticles } from "@/hooks/useArticles";
import { SEO } from "@/components/SEO";
import { usePrerenderBlocker } from "@/contexts/PrerenderContext";

function Articles() {
  const [page, setPage] = useState(0);
  const pageSize = 10;

  const {
    data: articles,
    isLoading,
    isError,
    refetch,
  } = useArticles({
    status: "published",
    limit: pageSize,
    offset: page * pageSize,
  });
  usePrerenderBlocker(isLoading);

  const articlesHeroImages = [
    {
      src: heroResourcesNew,
      alt: "Educational resources and learning materials",
    },
    {
      src: heroResources,
      alt: "Community members reading and learning together",
    },
    {
      src: heroResourcesMarketplace,
      alt: "Digital marketplace for safety resources",
    },
  ];

  return (
    <div className="min-h-screen">
      <SEO
        title="Scam Prevention Articles & News"
        description="Read practical guidance on scam prevention, AI threats, and digital safety. Updated articles and resources from InVision Network."
        keywords="scam prevention articles, AI scam news, digital safety guides, cybersecurity tips"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Scam Prevention Articles & News",
          description:
            "Practical guidance on scam prevention, AI threats, and digital safety.",
          url: "https://invisionnetwork.org/articles",
        }}
      />
      <Navigation />

      <Hero
        backgroundImages={articlesHeroImages}
        headline="Scam Prevention Articles & News"
        subheadline="Stay informed about the latest scam threats and protection strategies"
      />

      <TrustBar />

      {/* Articles Grid */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
              <p className="text-muted-foreground">Loading articles...</p>
            </div>
          ) : isError ? (
            <div className="text-center py-16">
              <p className="text-destructive mb-4">Failed to load articles</p>
              <Button onClick={() => refetch()}>Try Again</Button>
            </div>
          ) : !articles || articles.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                <BookOpen className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No Articles Yet</h3>
              <p className="text-muted-foreground">
                Check back soon for new content!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 max-w-4xl mx-auto">
              {articles.map((article) => (
                <Card
                  key={article.id}
                  className="overflow-hidden hover:shadow-strong transition-all duration-500 rounded-2xl"
                >
                  {article.featured_image_url && (
                    <img
                      src={article.featured_image_url}
                      alt={article.title}
                      className="w-full h-64 object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  )}
                  <div className="p-8">
                    <div className="flex items-center gap-4 mb-4">
                      <Badge variant="secondary">{article.category}</Badge>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(
                            article.published_at || article.created_at || "",
                          ).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {Math.ceil((article.content?.length || 0) / 1000)} min
                          read
                        </span>
                      </div>
                    </div>

                    <h2 className="text-3xl font-bold mb-4">{article.title}</h2>

                    <p className="text-muted-foreground text-lg mb-6">
                      {article.excerpt ||
                        article.content?.slice(0, 200) + "..."}
                    </p>

                    <Button asChild variant="default" size="lg">
                      <Link to={`/articles/${article.slug}`}>
                        Read Full Article
                        <ArrowRight className="ml-2 w-4 h-4 arrow-icon" />
                      </Link>
                    </Button>
                  </div>
                </Card>
              ))}

              {articles.length >= pageSize && (
                <div className="text-center pt-8">
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => setPage((p) => p + 1)}
                  >
                    Load More Articles
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* CTA */}
          <div className="text-center mt-16">
            <Card className="p-8 max-w-2xl mx-auto bg-gradient-to-r from-primary/10 to-accent/10">
              <h3 className="text-2xl font-bold mb-4">
                Stay Protected from Scams
              </h3>
              <p className="text-muted-foreground mb-6">
                Get expert analysis of suspicious messages, calls, and links
                with ScamShield protection.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild variant="default" size="lg">
                  <Link to="/training#scamshield">
                    Learn About ScamShield
                    <ArrowRight className="ml-2 w-4 h-4 arrow-icon" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/training#training">View Workshops</Link>
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Articles;
