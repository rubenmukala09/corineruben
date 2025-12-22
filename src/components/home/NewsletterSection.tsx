import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Mail, Sparkles } from "lucide-react";

export const NewsletterSection = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-primary via-primary/95 to-primary/90 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-10 left-10 w-40 h-40 border border-white/10 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute bottom-10 right-10 w-60 h-60 border border-white/5 rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/4 w-20 h-20 border border-accent/20 rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute top-20 right-1/4 w-4 h-4 bg-accent/40 rounded-full blur-sm" />
        <div className="absolute bottom-1/3 left-1/3 w-6 h-6 bg-white/10 rounded-full blur-sm" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <motion.div 
            className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-sm mb-8 border border-white/20"
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            <Mail className="w-10 h-10 text-white" />
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Join Our <span className="font-serif italic text-accent">Newsletter</span>
            <br />
            Stay Up To Date
          </h2>
          
          <p className="text-white/80 text-xl mb-10 max-w-xl mx-auto">
            Get the latest security tips, scam alerts, and protection updates delivered to your inbox.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto"
          >
            <Input
              type="email"
              placeholder="Enter Your Email"
              className="flex-1 h-16 bg-white/10 border-white/20 text-white placeholder:text-white/60 rounded-2xl text-lg px-6 backdrop-blur-sm focus:border-accent focus:ring-accent"
            />
            <Button 
              size="lg" 
              className="h-16 px-10 rounded-2xl text-lg group bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              Subscribe
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>

          <motion.p 
            className="text-white/60 text-sm mt-6 flex items-center justify-center gap-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Sparkles className="w-4 h-4" />
            We respect your privacy. Unsubscribe at any time.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsletterSection;
