import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";
import testimonialImage from "@/assets/testimonial-1.jpg";
import testimonialImage2 from "@/assets/testimonial-2.jpg";
import testimonialImage3 from "@/assets/testimonial-3.jpg";

const testimonials = [
  {
    quote: "As a busy parent, this scanning service has been a lifesaver! The team is friendly, thorough, and trustworthy. Coming home to a protected home is such a relief. Highly recommend!",
    name: "Mary Anderson",
    location: "Dayton, Ohio",
    image: testimonialImage,
  },
  {
    quote: "InVision Network saved my mother from losing $15,000 to a grandparent scam. Their training helped our whole family recognize the warning signs. We're forever grateful.",
    name: "Robert Johnson",
    location: "Columbus, Ohio",
    image: testimonialImage2,
  },
  {
    quote: "The best investment we've made for our family's digital safety. Professional, patient, and incredibly knowledgeable. They made cybersecurity accessible for my elderly parents.",
    name: "Sarah Williams",
    location: "Cleveland, Ohio",
    image: testimonialImage3,
  },
];

export const TestimonialQuote = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 bg-muted/30 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 right-20 w-40 h-40 rounded-full bg-primary/5" />
      <div className="absolute bottom-10 left-20 w-28 h-28 rounded-full bg-accent/10" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wider mb-4 block">
            Client Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            What Our Clients{" "}
            <span className="text-primary">Have To Say</span>
          </h2>
        </motion.div>

        {/* Testimonial Card */}
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-card rounded-3xl p-8 md:p-12 shadow-lg border border-border">
              <div className="grid md:grid-cols-3 gap-8 items-center">
                {/* Image - Circular */}
                <div className="relative mx-auto md:mx-0">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentIndex}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.4 }}
                      className="relative"
                    >
                      {/* Decorative rings */}
                      <div className="absolute -inset-3 rounded-full border-2 border-primary/20" />
                      <div className="absolute -inset-6 rounded-full border-2 border-accent/10" />
                      
                      {/* Main image */}
                      <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-background shadow-xl">
                        <img
                          src={testimonials[currentIndex].image}
                          alt={testimonials[currentIndex].name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      {/* Decorative dots */}
                      <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-accent" />
                      <div className="absolute bottom-4 -left-4 w-4 h-4 rounded-full bg-primary/50" />
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Content */}
                <div className="md:col-span-2 text-center md:text-left">
                  {/* Quote icon */}
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6 mx-auto md:mx-0">
                    <Quote className="w-6 h-6 text-primary" />
                  </div>
                  
                  {/* Stars */}
                  <div className="flex justify-center md:justify-start gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                    ))}
                  </div>
                  
                  {/* Quote */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentIndex}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.4 }}
                    >
                      <blockquote className="text-lg md:text-xl text-foreground font-medium leading-relaxed mb-6">
                        "{testimonials[currentIndex].quote}"
                      </blockquote>

                      <div>
                        <div className="font-bold text-lg text-foreground">
                          {testimonials[currentIndex].name}
                        </div>
                        <div className="text-primary text-sm">
                          {testimonials[currentIndex].location}
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex justify-center items-center gap-4 mt-8 pt-6 border-t border-border">
                <button
                  onClick={prev}
                  className="w-10 h-10 rounded-full bg-muted hover:bg-primary/10 flex items-center justify-center transition-colors"
                >
                  <ChevronLeft className="w-5 h-5 text-foreground" />
                </button>
                
                <div className="flex gap-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        index === currentIndex ? "bg-primary w-8" : "bg-muted w-2 hover:bg-primary/30"
                      }`}
                    />
                  ))}
                </div>
                
                <button
                  onClick={next}
                  className="w-10 h-10 rounded-full bg-muted hover:bg-primary/10 flex items-center justify-center transition-colors"
                >
                  <ChevronRight className="w-5 h-5 text-foreground" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialQuote;
