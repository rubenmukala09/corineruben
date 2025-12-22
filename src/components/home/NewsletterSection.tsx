import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Mail } from "lucide-react";

export const NewsletterSection = () => {
  return (
    <section className="py-20 bg-primary relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-40 h-40 border border-white rounded-full" />
        <div className="absolute bottom-10 right-10 w-60 h-60 border border-white rounded-full" />
        <div className="absolute top-1/2 left-1/4 w-20 h-20 border border-white rounded-full" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 mb-6">
            <Mail className="w-8 h-8 text-white" />
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Join Our <span className="font-serif italic text-accent">Newsletter</span>
            <br />
            Stay Up To Date
          </h2>
          
          <p className="text-white/80 text-lg mb-8">
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
              className="flex-1 h-14 bg-white/10 border-white/20 text-white placeholder:text-white/60 rounded-xl"
            />
            <Button 
              size="lg" 
              variant="secondary" 
              className="h-14 px-8 rounded-xl group"
            >
              Subscribe Now
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>

          <p className="text-white/60 text-sm mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsletterSection;
