import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileText, Shield, BookOpen, ArrowRight, Sparkles, Download, Lock, Gift } from "lucide-react";
import resourcesHeroDesk from "@/assets/resources-hero-desk.png";

const resources = [
  {
    icon: Shield,
    title: "Cyber Insurance",
    description: "Protection against identity theft and cyber fraud with coverage up to $1M.",
    tag: "Protection",
    color: "from-blue-500 to-indigo-500",
    badge: "Most Popular",
  },
  {
    icon: FileText,
    title: "Emergency Scripts",
    description: "Downloadable PDF scripts to handle scam calls and suspicious contacts.",
    tag: "Free Download",
    color: "from-emerald-500 to-teal-500",
    badge: null,
  },
  {
    icon: BookOpen,
    title: "Free Articles",
    description: "Expert guides on staying safe online, recognizing scams, and protecting your data.",
    tag: "Free Resources",
    color: "from-amber-500 to-orange-500",
    badge: null,
  },
];

const features = [
  { icon: Download, text: "Instant Downloads" },
  { icon: Lock, text: "Secure Access" },
  { icon: Gift, text: "Veteran Discounts" },
];

export const ResourcesPromo = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-muted/30 via-background to-muted/20 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent/10 rounded-2xl border border-accent/20">
              <Sparkles className="w-5 h-5 text-accent" />
              <span className="font-bold text-accent">Resources & Tools</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Tools & Resources for{" "}
              <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">Complete Protection</span>
            </h2>
            
            <p className="text-xl text-muted-foreground leading-relaxed">
              Beyond training, we provide the tools you need to stay protected. From insurance coverage to free educational materials, 
              we've got you covered.
            </p>

            {/* Quick features */}
            <div className="flex flex-wrap gap-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-border/50 shadow-sm">
                  <feature.icon className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">{feature.text}</span>
                </div>
              ))}
            </div>

            {/* Image - Mobile only */}
            <div className="lg:hidden">
              <img
                src={resourcesHeroDesk}
                alt="Security resources and tools"
                className="w-full rounded-3xl shadow-lg"
              />
            </div>

            {/* CTA */}
            <div className="flex flex-wrap gap-4 pt-4">
              <Button asChild size="xl" className="rounded-2xl px-10 shadow-lg shadow-primary/25">
                <Link to="/resources">
                  Browse All Resources
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* Cards Side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-5"
          >
            {resources.map((resource, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="group"
              >
                <Link to="/resources" className="block">
                  <div className="bg-white rounded-3xl p-6 border border-border/50 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.12)] transition-all duration-300 flex items-start gap-5 hover:-translate-y-2 relative overflow-hidden">
                    {/* Badge */}
                    {resource.badge && (
                      <div className="absolute top-4 right-4 px-3 py-1 bg-primary/10 rounded-full">
                        <span className="text-xs font-bold text-primary">{resource.badge}</span>
                      </div>
                    )}
                    
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${resource.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-lg`}>
                      <resource.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-bold text-xl text-foreground group-hover:text-primary transition-colors">
                          {resource.title}
                        </h3>
                        <span className="text-xs px-2.5 py-1 bg-muted rounded-full text-muted-foreground font-medium">
                          {resource.tag}
                        </span>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">{resource.description}</p>
                    </div>
                    <ArrowRight className="w-6 h-6 text-muted-foreground group-hover:text-primary group-hover:translate-x-2 transition-all flex-shrink-0 mt-2" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
