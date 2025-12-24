import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, BookOpen } from "lucide-react";
import heroArticles1 from "@/assets/hero-articles-1.jpg";
import heroArticles2 from "@/assets/hero-articles-2.jpg";
import heroArticles3 from "@/assets/hero-articles-3.jpg";

const mainArticle = {
  image: heroArticles1,
  category: "Security Tips",
  title: "The Ultimate Guide to Protecting Your Family From AI Scams",
  excerpt: "Learn the essential steps to keep your loved ones safe in the digital age...",
  author: "InVision Team",
  date: "Dec 2024",
};

const sideArticles = [
  {
    image: heroArticles2,
    title: "How To Recognize AI-Generated Voice Scams",
    date: "Dec 2024",
  },
  {
    image: heroArticles3,
    title: "Why Do Scam Tactics Keep Evolving? Here's What We Know",
    date: "Dec 2024",
  },
  {
    title: "How To Keep Your Smart Home Secure From Hackers",
    date: "Nov 2024",
  },
  {
    title: "Essential Cybersecurity Tips for Seniors",
    date: "Nov 2024",
  },
];

export const BlogPreview = () => {
  return (
    <section className="py-32 bg-background relative overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10 mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <BookOpen className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">Latest Updates</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 tracking-tight">
            Learn From Our
            <br />
            <span className="text-primary">Latest Blog</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Stay informed with the latest cybersecurity tips and protection strategies.
          </p>
        </motion.div>

        {/* Articles Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Article */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:row-span-2"
          >
            <Link to="/articles" className="group block h-full">
              <div className="relative h-full min-h-[500px] rounded-2xl overflow-hidden shadow-lg border border-border/30 group-hover:border-primary/30 group-hover:shadow-xl transition-all duration-300">
                <img
                  src={mainArticle.image}
                  alt={mainArticle.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <span className="inline-block px-3 py-1.5 bg-primary text-primary-foreground text-xs font-semibold rounded-full mb-4">
                    {mainArticle.category}
                  </span>
                  <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors leading-tight">
                    {mainArticle.title}
                  </h3>
                  <div className="flex items-center gap-2 text-muted-foreground text-sm">
                    <Calendar className="w-4 h-4" />
                    <span>{mainArticle.date}</span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Side Articles */}
          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-5">
            {sideArticles.map((article, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <Link to="/articles" className="group block">
                  <div className="flex gap-4 p-4 rounded-xl bg-card border border-border/50 hover:shadow-lg hover:border-primary/20 transition-all duration-300">
                    {article.image && (
                      <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div className="flex flex-col justify-center min-w-0">
                      <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2 leading-snug">
                        {article.title}
                      </h4>
                      <div className="flex items-center gap-2 text-muted-foreground text-sm">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{article.date}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-14"
        >
          <Button asChild variant="outline" size="lg" className="h-14 px-8 text-base font-semibold rounded-xl">
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
