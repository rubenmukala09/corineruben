import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar } from "lucide-react";
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
    <section className="py-20 bg-muted/30 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
            Latest Updates
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            Learn About Our{" "}
            <span className="font-serif italic text-primary">Latest</span>
            <br />
            <span className="text-primary">News</span> From Blog.
          </h2>
        </motion.div>

        {/* Articles Grid - Bento Style */}
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Main Article - Left Side */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:row-span-2"
          >
            <Link to="/articles" className="group block h-full">
              <div className="relative h-full min-h-[400px] rounded-2xl overflow-hidden shadow-xl">
                <img
                  src={mainArticle.image}
                  alt={mainArticle.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="inline-block px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full mb-3">
                    {mainArticle.category}
                  </span>
                  <h3 className="text-xl lg:text-2xl font-bold text-white mb-2 group-hover:text-accent transition-colors">
                    {mainArticle.title}
                  </h3>
                  <div className="flex items-center gap-2 text-white/70 text-sm">
                    <Calendar className="w-4 h-4" />
                    <span>{mainArticle.date}</span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Side Articles - Right Side */}
          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-6">
            {sideArticles.map((article, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link to="/articles" className="group block">
                  <div className="flex gap-4 p-4 rounded-xl bg-card border border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    {article.image && (
                      <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                    )}
                    <div className="flex flex-col justify-center">
                      <h4 className="font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2">
                        {article.title}
                      </h4>
                      <div className="flex items-center gap-2 text-muted-foreground text-sm">
                        <Calendar className="w-4 h-4" />
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
          className="text-center mt-12"
        >
          <Button asChild variant="outline" size="lg" className="group">
            <Link to="/articles">
              View All Articles
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogPreview;
