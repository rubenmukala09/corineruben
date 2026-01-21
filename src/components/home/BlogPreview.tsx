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
    <section className="py-16 relative overflow-hidden">
      {/* Grid pattern */}
      <GridPattern className="opacity-50" />
      
      {/* Geometric corner accents */}
      <GeometricCorner position="top-right" variant="lines" />
      <GeometricCorner position="bottom-left" variant="dots" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div 
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary/10 text-primary text-base font-bold uppercase tracking-wider mb-6 border border-primary/20"
            style={{ clipPath: "polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)" }}
          >
            Latest Updates
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Learn From Our{" "}
            <span className="text-primary">Latest Blog</span>
          </h2>
          <p className="text-foreground/80 text-xl md:text-2xl max-w-2xl mx-auto font-medium leading-relaxed">
            Stay informed with the latest cybersecurity tips and protection strategies.
          </p>
        </div>

        {/* Articles Grid - Soft Modern */}
        <div className="grid lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <div key={index} className="group">
              <Link to="/articles" className="block">
                <div className="bg-white rounded-3xl overflow-hidden border border-white/50 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] transition-all duration-400 ease-out hover:translate-y-[-8px] hover:scale-[1.02] hover:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.12)]">
                  {/* Image - Physical Photo Effect */}
                  <div className="relative p-6 pb-0">
                    <div className="relative">
                      <div className="rounded-2xl overflow-hidden aspect-square border border-white/50 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)]">
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
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
                  <div className="p-8 text-center">
                    <div className="flex items-center justify-center gap-2 text-base text-foreground/70 mb-4">
                      <Calendar className="w-5 h-5" />
                      <span className="font-medium">{article.date}</span>
                    </div>
                    <h3 className="font-bold text-xl text-foreground group-hover:text-primary transition-colors leading-snug">
                      {article.title}
                    </h3>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-14">
          <Button asChild variant="outline" size="lg" className="h-14 px-10 text-lg font-bold rounded-2xl border-2">
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
