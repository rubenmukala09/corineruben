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
    <section className="py-24 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span 
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <BookOpen className="w-4 h-4" />
            Latest Updates
          </motion.span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Learn About Our{" "}
            <span className="font-serif italic text-primary">Latest</span>
            <br />
            <span className="text-primary">News</span> From Blog.
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Stay informed with the latest cybersecurity tips and protection strategies.
          </p>
        </motion.div>

        {/* Articles Grid - Bento Style */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Article - Left Side */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:row-span-2"
          >
            <Link to="/articles" className="group block h-full">
              <div className="relative h-full min-h-[500px] rounded-3xl overflow-hidden shadow-2xl border border-border/50 group-hover:border-primary/30 transition-all duration-500">
                <img
                  src={mainArticle.image}
                  alt={mainArticle.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <span className="inline-block px-4 py-2 bg-primary text-primary-foreground text-sm font-semibold rounded-full mb-4">
                    {mainArticle.category}
                  </span>
                  <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4 group-hover:text-accent transition-colors leading-tight">
                    {mainArticle.title}
                  </h3>
                  <div className="flex items-center gap-3 text-white/70 text-sm">
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
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
              >
                <Link to="/articles" className="group block">
                  <div className="flex gap-5 p-5 rounded-2xl bg-card border border-border/50 hover:shadow-xl hover:border-primary/30 transition-all duration-300">
                    {article.image && (
                      <div className="w-28 h-28 rounded-xl overflow-hidden flex-shrink-0 border border-border/50">
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                    )}
                    <div className="flex flex-col justify-center">
                      <h4 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-3 leading-snug">
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
          className="text-center mt-14"
        >
          <Button asChild variant="outline" size="lg" className="group px-8 py-6 text-lg rounded-xl">
            <Link to="/articles">
              View All Articles
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogPreview;
