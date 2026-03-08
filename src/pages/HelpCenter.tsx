import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, BookOpen, ChevronRight, ThumbsUp, ThumbsDown } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { toast } from "sonner";

export default function HelpCenter() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expandedArticle, setExpandedArticle] = useState<string | null>(null);

  const { data: articles } = useQuery({
    queryKey: ["kb-articles"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("knowledge_base_articles")
        .select("*")
        .eq("is_published", true)
        .order("display_order", { ascending: true });
      if (error) throw error;
      return data;
    },
  });

  const categories = [...new Set(articles?.map((a: any) => a.category) || [])];

  const filtered = articles?.filter((a: any) => {
    const matchesSearch = !search || a.title.toLowerCase().includes(search.toLowerCase()) || a.content.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = !selectedCategory || a.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleHelpful = async (id: string, isYes: boolean) => {
    const field = isYes ? "helpful_yes" : "helpful_no";
    const article = articles?.find((a: any) => a.id === id);
    if (!article) return;
    await supabase.from("knowledge_base_articles").update({ [field]: (article as any)[field] + 1 }).eq("id", id);
    toast.success("Thanks for your feedback!");
  };

  const categoryIcons: Record<string, string> = {
    general: "📚", billing: "💳", security: "🔒", account: "👤", training: "🎓", technical: "⚙️",
  };

  return (
    <>
      <Helmet>
        <title>Help Center | InVision Network</title>
        <meta name="description" content="Find answers to common questions about InVision Network services, billing, security, and more." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <div className="bg-primary/5 py-16">
          <div className="container mx-auto max-w-3xl text-center px-4">
            <h1 className="text-4xl font-bold mb-4">Help Center</h1>
            <p className="text-lg text-muted-foreground mb-8">Find answers to your questions</p>
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search for help..."
                className="pl-12 h-12 text-base"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="container mx-auto max-w-4xl py-12 px-4">
          {!search && !selectedCategory && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
              {categories.map((cat) => (
                <Card
                  key={cat}
                  className="cursor-pointer hover:border-primary/30 transition-colors"
                  onClick={() => setSelectedCategory(cat)}
                >
                  <CardContent className="pt-6 text-center">
                    <span className="text-3xl">{categoryIcons[cat] || "📄"}</span>
                    <h3 className="font-medium mt-2 capitalize">{cat}</h3>
                    <p className="text-sm text-muted-foreground">{articles?.filter((a: any) => a.category === cat).length} articles</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {selectedCategory && (
            <div className="mb-6">
              <Button variant="ghost" onClick={() => setSelectedCategory(null)}>← All Categories</Button>
              <h2 className="text-xl font-bold mt-2 capitalize">{selectedCategory}</h2>
            </div>
          )}

          <div className="space-y-3">
            {filtered?.map((article: any) => (
              <Card key={article.id}>
                <CardContent className="py-4">
                  <button
                    className="w-full text-left flex items-center justify-between"
                    onClick={() => setExpandedArticle(expandedArticle === article.id ? null : article.id)}
                  >
                    <div className="flex items-center gap-3">
                      <BookOpen className="h-5 w-5 text-primary flex-shrink-0" />
                      <div>
                        <h3 className="font-medium">{article.title}</h3>
                        {article.excerpt && expandedArticle !== article.id && (
                          <p className="text-sm text-muted-foreground mt-1">{article.excerpt}</p>
                        )}
                      </div>
                    </div>
                    <ChevronRight className={`h-5 w-5 text-muted-foreground transition-transform ${expandedArticle === article.id ? "rotate-90" : ""}`} />
                  </button>

                  {expandedArticle === article.id && (
                    <div className="mt-4 pt-4 border-t">
                      <div className="prose prose-sm max-w-none text-foreground" dangerouslySetInnerHTML={{ __html: article.content }} />
                      <div className="flex items-center gap-4 mt-6 pt-4 border-t">
                        <span className="text-sm text-muted-foreground">Was this helpful?</span>
                        <Button variant="outline" size="sm" onClick={() => handleHelpful(article.id, true)}>
                          <ThumbsUp className="h-4 w-4 mr-1" /> Yes ({article.helpful_yes})
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleHelpful(article.id, false)}>
                          <ThumbsDown className="h-4 w-4 mr-1" /> No ({article.helpful_no})
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
            {filtered?.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <p>No articles found. Try a different search term.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
