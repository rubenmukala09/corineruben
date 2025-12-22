import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import testimonialImage from "@/assets/testimonial-1.jpg";

export const TestimonialQuote = () => {
  return (
    <section className="py-20 bg-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
            Client Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            Hear What Our{" "}
            <span className="font-serif italic text-primary">Global</span>
            <br />
            <span className="text-primary">Clients</span> Say
          </h2>
        </motion.div>

        {/* Testimonial Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative bg-card rounded-3xl p-8 lg:p-12 shadow-xl border border-border">
            {/* Quote icon */}
            <Quote className="absolute top-8 left-8 w-12 h-12 text-primary/20" />
            
            {/* Content */}
            <div className="text-center pt-8">
              {/* Stars */}
              <div className="flex justify-center gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-accent text-accent" />
                ))}
              </div>
              
              {/* Quote */}
              <blockquote className="text-xl md:text-2xl text-foreground font-medium leading-relaxed mb-8 max-w-3xl mx-auto">
                "As a busy parent, this scanning service has been a lifesaver! 
                The team is friendly, thorough, and trustworthy. Coming home to 
                a protected home is such a relief. Highly recommend!"
              </blockquote>

              {/* Author */}
              <div className="flex flex-col items-center gap-4">
                <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-primary/20 shadow-lg">
                  <img
                    src={testimonialImage}
                    alt="Mary Anderson"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="font-bold text-lg text-foreground">Mary Anderson</div>
                  <div className="text-primary font-medium">Dayton, Ohio</div>
                </div>
              </div>

              {/* Navigation dots */}
              <div className="flex justify-center gap-2 mt-8">
                <div className="w-3 h-3 rounded-full bg-primary" />
                <div className="w-3 h-3 rounded-full bg-muted" />
                <div className="w-3 h-3 rounded-full bg-muted" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialQuote;
