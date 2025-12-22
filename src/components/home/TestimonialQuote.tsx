import { motion } from "framer-motion";
import { useState } from "react";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";
import testimonialImage from "@/assets/testimonial-1.jpg";

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
    image: testimonialImage,
  },
  {
    quote: "The best investment we've made for our family's digital safety. Professional, patient, and incredibly knowledgeable. They made cybersecurity accessible for my elderly parents.",
    name: "Sarah Williams",
    location: "Cleveland, Ohio",
    image: testimonialImage,
  },
];

export const TestimonialQuote = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-24 bg-gradient-to-b from-muted/30 via-background to-background relative overflow-hidden">
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
          className="text-center mb-16"
        >
          <motion.span 
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6"
            whileHover={{ scale: 1.05 }}
          >
            Client Testimonials
          </motion.span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
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
          <div className="relative">
            {/* Background glow */}
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-[2rem] blur-2xl opacity-60" />
            
            <div className="relative bg-card/95 backdrop-blur-xl rounded-[2rem] p-10 lg:p-14 shadow-2xl border border-border/50">
              {/* Quote icon */}
              <div className="absolute top-8 left-8 w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                <Quote className="w-8 h-8 text-primary" />
              </div>
              
              {/* Content */}
              <div className="text-center pt-12">
                {/* Stars */}
                <div className="flex justify-center gap-1.5 mb-8">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-7 h-7 fill-accent text-accent" />
                  ))}
                </div>
                
                {/* Quote */}
                <motion.blockquote 
                  key={currentIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-xl md:text-2xl lg:text-3xl text-foreground font-medium leading-relaxed mb-10 max-w-3xl mx-auto"
                >
                  "{testimonials[currentIndex].quote}"
                </motion.blockquote>

                {/* Author */}
                <motion.div 
                  key={`author-${currentIndex}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="flex flex-col items-center gap-4"
                >
                  <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-primary/20 shadow-xl">
                    <img
                      src={testimonials[currentIndex].image}
                      alt={testimonials[currentIndex].name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-bold text-xl text-foreground">{testimonials[currentIndex].name}</div>
                    <div className="text-primary font-medium">{testimonials[currentIndex].location}</div>
                  </div>
                </motion.div>

                {/* Navigation */}
                <div className="flex justify-center items-center gap-6 mt-10">
                  <button 
                    onClick={prev}
                    className="w-12 h-12 rounded-full bg-muted hover:bg-primary/10 flex items-center justify-center transition-colors"
                  >
                    <ChevronLeft className="w-6 h-6 text-foreground" />
                  </button>
                  
                  <div className="flex gap-2">
                    {testimonials.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          index === currentIndex ? "bg-primary w-8" : "bg-muted hover:bg-primary/30"
                        }`}
                      />
                    ))}
                  </div>
                  
                  <button 
                    onClick={next}
                    className="w-12 h-12 rounded-full bg-muted hover:bg-primary/10 flex items-center justify-center transition-colors"
                  >
                    <ChevronRight className="w-6 h-6 text-foreground" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialQuote;
