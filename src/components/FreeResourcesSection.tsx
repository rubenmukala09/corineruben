import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollReveal } from "@/components/ScrollReveal";
import { BookOpen, Calendar, Eye } from "lucide-react";
import { Link } from "react-router-dom";

export function FreeResourcesSection() {
  const { data: articles, isLoading } = useQuery({
    queryKey: ['published-articles'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('status', 'published')
        .order('published_at', { ascending: false })
        .limit(6);
      
      if (error) throw error;
      return data || [];
    },
  });

  if (isLoading) {
    return (
      <section className="py-10 md:py-14 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <Badge className="mb-3 text-base md:text-lg px-4 md:px-6 py-2" variant="secondary">
              <BookOpen className="w-4 h-4 mr-2" />
              Free Resources
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3">
              Latest Security Articles
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="w-full aspect-video" />
                <div className="p-5">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full mb-4" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!articles || articles.length === 0) {
    return null;
  }

  return (
    <section id="free-resources" className="py-10 md:py-14 bg-secondary/20">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-8">
            <Badge className="mb-3 text-base md:text-lg px-4 md:px-6 py-2" variant="secondary">
              <BookOpen className="w-4 h-4 mr-2" />
              Free Resources
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Latest Security Articles
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Expert insights and practical guides to stay safe from scams and cyber threats
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, index) => (
            <ScrollReveal key={article.id} delay={index * 100}>
              <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-105 border-2 border-border/50 hover:border-primary/50">
                {article.featured_image_url && (
                  <div className="aspect-video bg-gradient-to-br from-secondary to-muted overflow-hidden">
                    <img 
                      src={article.featured_image_url} 
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                )}
                
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="secondary" className="text-xs">
                      {article.category}
                    </Badge>
                    {article.tags && article.tags.length > 0 && (
                      <Badge variant="outline" className="text-xs">
                        {article.tags[0]}
                      </Badge>
                    )}
                  </div>

                  <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  
                  {article.excerpt && (
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>
                  )}

                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(article.published_at || article.created_at).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {article.views || 0} views
                    </div>
                  </div>

                  <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors" asChild>
                    <Link to={`/articles/${article.slug}`}>
                      Read Article
                    </Link>
                  </Button>
                </div>
              </Card>
            </ScrollReveal>
          ))}
        </div>

        {articles.length >= 6 && (
          <div className="text-center mt-8">
            <Button variant="outline" size="lg" asChild>
              <Link to="/articles">
                View All Articles
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}