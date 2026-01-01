import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar } from "lucide-react";
import heroArticles1 from "@/assets/hero-articles-1.jpg";
import heroArticles2 from "@/assets/hero-articles-2.jpg";
import heroArticles3 from "@/assets/hero-articles-3.jpg";
import { GeometricCorner, DottedPattern, GridPattern, FloatingShapes } from "@/components/ui/GeometricDecorations";

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
    <section className="py-24 bg-muted/30 relative overflow-hidden">
      {/* Grid pattern */}
      <GridPattern className="opacity-50" />
      
      {/* Floating shapes */}
      <FloatingShapes />
      
      {/* Geometric corner accents */}
      <GeometricCorner position="top-right" variant="lines" />
      <GeometricCorner position="bottom-left" variant="dots" />
      
      {/* Diagonal stripe decorations */}
      <div className="absolute top-0 left-0 w-40 h-40 pointer-events-none">
        <div className="absolute inset-0 bg-primary/5 transform -skew-x-12" />
      </div>
      <div className="absolute bottom-0 right-0 w-48 h-48 pointer-events-none">
        <div className="absolute inset-0 bg-accent/5 transform skew-x-12" />
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-primary/5" />
      <div className="absolute bottom-10 right-20 w-24 h-24 rounded-full bg-accent/10" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          {/* Angular badge */}
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
          
          {/* Decorative dotted line */}
          <DottedPattern direction="horizontal" length={8} className="justify-center mt-6" />
        </motion.div>

        {/* Articles Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <Link to="/articles" className="block">
                <div className="bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/30 hover:shadow-xl transition-all duration-300">
                  {/* Image with circular accent */}
                  <div className="relative p-6 pb-0">
                    <div className="relative">
                      {/* Circular image container */}
                      <div className="rounded-full overflow-hidden aspect-square border-4 border-background shadow-lg">
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      {/* Category badge */}
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                        <span className="inline-block px-4 py-1.5 bg-primary text-primary-foreground text-xs font-semibold rounded-full shadow-lg">
                          {article.category}
                        </span>
                      </div>
                      {/* Decorative dot */}
                      <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-accent" />
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
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button asChild variant="outline" size="lg" className="rounded-full px-8">
            <Link to="/articles">
              View All Articles
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogPreview;
