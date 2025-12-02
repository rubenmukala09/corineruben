import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ExternalLink, Newspaper } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";

interface ExternalLink {
  id: string;
  title: string;
  description: string | null;
  external_url: string;
  image_url: string | null;
  category: string;
}

export function ExternalSecurityArticles() {
  const { data: articles, isLoading } = useQuery({
    queryKey: ['external-security-articles'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('external_security_links')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true })
        .order('created_at', { ascending: false })
        .limit(10);
      
      if (error) throw error;
      return data as ExternalLink[];
    },
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <Skeleton className="w-full aspect-video" />
            <div className="p-4">
              <Skeleton className="h-5 w-3/4 mb-2" />
              <Skeleton className="h-16 w-full mb-3" />
              <Skeleton className="h-9 w-full" />
            </div>
          </Card>
        ))}
      </div>
    );
  }

  if (!articles || articles.length === 0) {
    return (
      <Card className="p-12">
        <div className="text-center text-muted-foreground">
          <Newspaper className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p className="text-lg font-medium mb-2">No articles available yet</p>
          <p className="text-sm">Check back soon for the latest security news and alerts</p>
        </div>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {articles.map((article, index) => (
        <ScrollReveal key={article.id} delay={index * 50}>
          <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-102 border border-border/50 hover:border-primary/50 flex flex-col h-full">
            {/* Image */}
            <div className="aspect-video bg-gradient-to-br from-secondary to-muted flex items-center justify-center relative overflow-hidden">
              {article.image_url ? (
                <img 
                  src={article.image_url} 
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <Newspaper className="w-16 h-16 text-muted-foreground/30" />
              )}
              <Badge className="absolute top-2 right-2 text-[10px]">
                {article.category}
              </Badge>
            </div>
            
            {/* Content */}
            <div className="p-4 flex flex-col flex-1">
              <h3 className="text-base font-bold mb-2 text-foreground group-hover:text-primary transition-colors line-clamp-2">
                {article.title}
              </h3>
              
              {article.description && (
                <p className="text-xs text-muted-foreground mb-4 line-clamp-3 flex-1">
                  {article.description}
                </p>
              )}
              
              <Button 
                asChild
                variant="outline"
                size="sm"
                className="w-full mt-auto text-xs"
              >
                <a 
                  href={article.external_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2"
                >
                  Read Article
                  <ExternalLink className="w-3 h-3" />
                </a>
              </Button>
            </div>
          </Card>
        </ScrollReveal>
      ))}
    </div>
  );
}