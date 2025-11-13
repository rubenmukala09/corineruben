import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Monitor, Smartphone, Tablet, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ArticlePreview() {
  const [searchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<"desktop" | "mobile" | "tablet">("desktop");
  
  // Get article data from localStorage (set by editor)
  const [articleData, setArticleData] = useState<any>(null);

  useEffect(() => {
    const data = localStorage.getItem("article-preview");
    if (data) {
      setArticleData(JSON.parse(data));
    }
  }, []);

  const getViewportWidth = () => {
    switch (viewMode) {
      case "mobile":
        return "375px";
      case "tablet":
        return "768px";
      default:
        return "100%";
    }
  };

  if (!articleData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">No preview available</h2>
          <p className="text-muted-foreground mb-4">Please save your article first</p>
          <Link to="/admin/content/articles/new">
            <Button>Back to Editor</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Preview Mode Banner */}
      <div className="bg-yellow-100 border-b-2 border-yellow-300 px-6 py-3 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="font-semibold text-yellow-900">Preview Mode</span>
            <span className="text-sm text-yellow-700">You're viewing a draft</span>
          </div>
          
          {/* Device Toggle */}
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === "desktop" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("desktop")}
            >
              <Monitor className="h-4 w-4 mr-1" />
              Desktop
            </Button>
            <Button
              variant={viewMode === "tablet" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("tablet")}
            >
              <Tablet className="h-4 w-4 mr-1" />
              Tablet
            </Button>
            <Button
              variant={viewMode === "mobile" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("mobile")}
            >
              <Smartphone className="h-4 w-4 mr-1" />
              Mobile
            </Button>
          </div>

          <Link to="/admin/content/articles/new">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Editor
            </Button>
          </Link>
        </div>
      </div>

      {/* Preview Content */}
      <div className="py-8 flex justify-center">
        <div 
          className={cn(
            "bg-white shadow-lg transition-all duration-300",
            viewMode === "mobile" && "rounded-3xl border-8 border-gray-800",
            viewMode === "tablet" && "rounded-xl border-4 border-gray-600"
          )}
          style={{ width: getViewportWidth() }}
        >
          <div className="p-8 md:p-12 lg:p-16">
            {/* Featured Image */}
            {articleData.featuredImage && (
              <img
                src={articleData.featuredImage}
                alt={articleData.title}
                className="w-full h-64 md:h-96 object-cover rounded-lg mb-8"
              />
            )}

            {/* Article Header */}
            <header className="mb-8">
              {/* Category badges */}
              {articleData.categories && articleData.categories.length > 0 && (
                <div className="flex gap-2 mb-4">
                  {articleData.categories.map((cat: string) => (
                    <span
                      key={cat}
                      className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              )}

              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {articleData.title}
              </h1>

              {/* Meta info */}
              <div className="flex items-center gap-4 text-muted-foreground">
                <span>{articleData.author}</span>
                <span>•</span>
                <span>{new Date().toLocaleDateString()}</span>
                <span>•</span>
                <span>{articleData.readingTime || "5"} min read</span>
              </div>
            </header>

            {/* Excerpt */}
            {articleData.excerpt && (
              <div className="text-lg text-muted-foreground mb-8 italic border-l-4 border-primary pl-4">
                {articleData.excerpt}
              </div>
            )}

            {/* Article Content */}
            <article 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: articleData.content }}
            />

            {/* Tags */}
            {articleData.tags && articleData.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t">
                <h3 className="text-sm font-semibold text-muted-foreground mb-3">
                  TAGS
                </h3>
                <div className="flex flex-wrap gap-2">
                  {articleData.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-muted text-sm rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
