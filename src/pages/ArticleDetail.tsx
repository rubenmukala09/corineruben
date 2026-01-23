import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useArticleBySlug, useFeaturedArticles } from "@/hooks/useArticles";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, Clock, ArrowLeft, ArrowRight, Eye, Share2 } from "lucide-react";
import { motion } from "framer-motion";

function ArticleDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { data: article, isLoading, error } = useArticleBySlug(slug || "");
  const { data: relatedArticles } = useFeaturedArticles(3);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: article?.title,
        text: article?.excerpt || "",
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="container mx-auto px-4 py-16 max-w-4xl">
          <Skeleton className="h-8 w-32 mb-4" />
          <Skeleton className="h-12 w-full mb-4" />
          <Skeleton className="h-6 w-48 mb-8" />
          <Skeleton className="h-96 w-full mb-8" />
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The article you're looking for doesn't exist or has been removed.
          </p>
          <Button asChild>
            <Link to="/articles">
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back to Articles
            </Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  // Filter out current article from related
  const otherArticles = relatedArticles?.filter(a => a.id !== article.id).slice(0, 2);

  return (
    <div className="min-h-screen">
      <Navigation />

      <article className="container mx-auto px-4 py-16 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Back Button */}
          <Button variant="ghost" asChild className="mb-6">
            <Link to="/articles">
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back to Articles
            </Link>
          </Button>

          {/* Header */}
          <header className="mb-8">
            <Badge variant="secondary" className="mb-4">
              {article.category}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              {article.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
              {article.published_at && (
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(article.published_at).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              )}
              {article.views !== null && (
                <span className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  {article.views.toLocaleString()} views
                </span>
              )}
              <Button variant="ghost" size="sm" onClick={handleShare}>
                <Share2 className="w-4 h-4 mr-1" />
                Share
              </Button>
            </div>
          </header>

          {/* Featured Image */}
          {article.featured_image_url && (
            <img
              src={article.featured_image_url}
              alt={article.title}
              className="w-full h-auto rounded-2xl mb-8 object-cover max-h-[500px]"
            />
          )}

          {/* Excerpt */}
          {article.excerpt && (
            <p className="text-xl text-muted-foreground mb-8 font-medium leading-relaxed">
              {article.excerpt}
            </p>
          )}

          {/* Content */}
          <div className="prose prose-lg max-w-none dark:prose-invert">
            {article.content.split("\n\n").map((paragraph, idx) => (
              <p key={idx} className="mb-4 leading-relaxed whitespace-pre-line">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="mt-8 pt-8 border-t">
              <h3 className="text-sm font-medium mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </article>

      {/* Related Articles */}
      {otherArticles && otherArticles.length > 0 && (
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {otherArticles.map((related) => (
                <Card
                  key={related.id}
                  className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => navigate(`/articles/${related.slug}`)}
                >
                  {related.featured_image_url && (
                    <img
                      src={related.featured_image_url}
                      alt={related.title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-6">
                    <Badge variant="secondary" className="mb-2">
                      {related.category}
                    </Badge>
                    <h3 className="text-lg font-semibold mb-2">{related.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {related.excerpt}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <Card className="p-8 max-w-2xl mx-auto bg-gradient-to-r from-primary/10 to-accent/10">
            <h3 className="text-2xl font-bold mb-4">
              Stay Protected from Scams
            </h3>
            <p className="text-muted-foreground mb-6">
              Get expert analysis of suspicious messages, calls, and links with
              ScamShield protection.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="default" size="lg">
                <Link to="/training#scamshield">
                  Learn About ScamShield
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/articles">View More Articles</Link>
              </Button>
            </div>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default ArticleDetail;
