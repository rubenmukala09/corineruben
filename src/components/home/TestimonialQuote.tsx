import { motion } from "framer-motion";
import { useState } from "react";
import { Quote, Star, ChevronLeft, ChevronRight, MessageSquare } from "lucide-react";
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
        {/* Section Header */}
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
            <MessageSquare className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">Client Testimonials</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 tracking-tight">
            What Our Clients
            <br />
            <span className="text-primary">Have To Say</span>
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
          <div className="relative bg-card rounded-3xl p-10 lg:p-14 shadow-xl border border-border/50">
            {/* Quote icon */}
            <div className="absolute top-8 left-8 w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Quote className="w-6 h-6 text-primary" />
            </div>
            
            {/* Content */}
            <div className="text-center pt-10">
              {/* Stars */}
              <div className="flex justify-center gap-1 mb-8">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-accent text-accent" />
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
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary/20 shadow-lg">
                  <img
                    src={testimonials[currentIndex].image}
                    alt={testimonials[currentIndex].name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="font-bold text-lg text-foreground">{testimonials[currentIndex].name}</div>
                  <div className="text-primary text-sm font-medium">{testimonials[currentIndex].location}</div>
                </div>
              </motion.div>

              {/* Navigation */}
              <div className="flex justify-center items-center gap-6 mt-10">
                <button 
                  onClick={prev}
                  className="w-12 h-12 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors"
                >
                  <ChevronLeft className="w-5 h-5 text-foreground" />
                </button>
                
                <div className="flex gap-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        index === currentIndex ? "bg-primary w-8" : "bg-muted w-2 hover:bg-muted-foreground/30"
                      }`}
                    />
                  ))}
                </div>
                
                <button 
                  onClick={next}
                  className="w-12 h-12 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors"
                >
                  <ChevronRight className="w-5 h-5 text-foreground" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialQuote;
