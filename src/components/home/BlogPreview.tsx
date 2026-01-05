import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar } from "lucide-react";
import heroArticles1 from "@/assets/hero-articles-1.jpg";
import heroArticles2 from "@/assets/hero-articles-2.jpg";
import heroArticles3 from "@/assets/hero-articles-3.jpg";
import { GeometricCorner, GridPattern } from "@/components/ui/GeometricDecorations";

const articles = [
  {
    image: heroArticles1,
    category: "Security Tips",
    title: "The Ultimate Guide to Protecting Your Family From AI Scams",
    date: "Dec 2024",
    featured: true,
  },
  {
    image: heroArticles2,
    category: "AI Awareness",
    title: "How To Recognize AI-Generated Voice Scams",
    date: "Dec 2024",
  },
  {
    image: heroArticles3,
    category: "Prevention",
    title: "Why Do Scam Tactics Keep Evolving?",
    date: "Dec 2024",
  },
];

export const BlogPreview = () => {
  return (
    <section className="py-16 bg-muted/30 relative overflow-hidden">
      {/* Grid pattern */}
      <GridPattern className="opacity-50" />
      
      {/* Geometric corner accents */}
      <GeometricCorner position="top-right" variant="lines" />
      <GeometricCorner position="bottom-left" variant="dots" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div 
            className="inline-flex items-center gap-2 px-5 py-2 bg-primary/10 text-primary text-sm font-semibold uppercase tracking-wider mb-4 border border-primary/20"
            style={{ clipPath: "polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)" }}
          >
            Latest Updates
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Learn From Our{" "}
            <span className="text-primary">Latest Blog</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Stay informed with the latest cybersecurity tips and protection strategies.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <div key={index} className="group">
              <Link to="/articles" className="block">
                <div className="bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/30 hover:shadow-xl transition-all duration-200">
                  {/* Image */}
                  <div className="relative p-6 pb-0">
                    <div className="relative">
                      <div className="rounded-full overflow-hidden aspect-square border-4 border-background shadow-lg">
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                        <span className="inline-block px-4 py-1.5 bg-primary text-primary-foreground text-xs font-semibold rounded-full shadow-lg">
                          {article.category}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6 text-center">
                    <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-3">
                      <Calendar className="w-4 h-4" />
                      <span>{article.date}</span>
                    </div>
                    <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors leading-snug">
                      {article.title}
                    </h3>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button asChild variant="outline" size="lg" className="rounded-full px-8">
            <Link to="/articles">
              View All Articles
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
