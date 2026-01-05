import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Briefcase, HelpCircle, MessageCircle, ArrowRight, Users, Heart, Star, Sparkles } from "lucide-react";

const quickLinks = [
  {
    icon: HelpCircle,
    title: "Frequently Asked Questions",
    description: "Get answers to common questions about our services, pricing, and protection methods.",
    cta: "View FAQ",
    link: "/faq",
    color: "from-primary to-accent",
  },
  {
    icon: MessageCircle,
    title: "Contact Us",
    description: "Have a question? Our Ohio-based team is ready to help you with personalized support.",
    cta: "Get in Touch",
    link: "/contact",
    color: "from-accent to-primary",
  },
];

const careerHighlights = [
  { icon: Heart, text: "Veteran-Supporting Company" },
  { icon: Users, text: "Growing Team" },
  { icon: Star, text: "Meaningful Work" },
];

export const QuickLinksSection = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-muted/20 to-background relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Whether you have questions or want to join our team, we're here to help.
          </p>
        </motion.div>

        {/* Quick Links Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* FAQ & Contact Cards */}
          {quickLinks.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={item.link} className="block group">
                <div className="bg-white rounded-3xl p-6 border border-border/50 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-2 h-full">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                    <item.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-bold text-xl text-foreground mb-2 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">{item.description}</p>
                  <div className="flex items-center text-primary font-semibold">
                    {item.cta}
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}

          {/* Careers Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link to="/careers" className="block group">
              <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl p-6 border border-primary/20 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-2 h-full">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                    <Briefcase className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex items-center gap-1 px-3 py-1 bg-primary/10 rounded-full">
                    <Sparkles className="w-3 h-3 text-primary" />
                    <span className="text-xs font-bold text-primary">We're Hiring!</span>
                  </div>
                </div>
                <h3 className="font-bold text-xl text-foreground mb-2 group-hover:text-primary transition-colors">
                  Join Our Team
                </h3>
                <p className="text-muted-foreground mb-4">
                  Be part of a mission-driven team protecting families and businesses from AI threats. We're growing and looking for passionate individuals.
                </p>
                
                {/* Career Highlights */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {careerHighlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 px-2 py-1 bg-white rounded-full border border-border/50">
                      <highlight.icon className="w-3 h-3 text-primary" />
                      <span className="text-xs font-medium">{highlight.text}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center text-primary font-semibold">
                  View Open Positions
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </Link>
          </motion.div>
        </div>

        {/* Bottom Trust Signal */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-10"
        >
          <p className="text-muted-foreground">
            <span className="font-medium">Ohio-Based</span> • <span className="font-medium">Veteran-Supporting</span> • <span className="font-medium">Trusted by 500+ Families</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};
