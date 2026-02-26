import { useState, useRef } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { motion, AnimatePresence, useInView } from "framer-motion";

import instructorSarah from "@/assets/instructor-sarah.jpg";
import instructorJames from "@/assets/instructor-james.jpg";
import instructorPriya from "@/assets/instructor-priya.jpg";

const testimonials = [
  {
    name: "Robert & Carol S.",
    location: "Dayton, OH",
    quote: "We were about to send $5,000 to someone pretending to be our grandson. InVision's training taught us to use a family safe word — it saved us from devastation.",
    rating: 5,
    avatar: instructorSarah,
    tag: "Grandparent Scam Prevented",
  },
  {
    name: "Maria T.",
    location: "Springfield, OH",
    quote: "As a small business owner, I didn't realize how vulnerable my team was. The workshop was eye-opening. We've since blocked 3 phishing attempts using what we learned.",
    rating: 5,
    avatar: instructorJames,
    tag: "Business Owner",
  },
  {
    name: "David & Linda W.",
    location: "Centerville, OH",
    quote: "The private family session was worth every penny. Our parents now know exactly what to do when they get suspicious calls. We sleep better knowing they're protected.",
    rating: 5,
    avatar: instructorPriya,
    tag: "Family Session",
  },
];

export const TestimonialCarousel = () => {
  const [current, setCurrent] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const next = () => setCurrent((c) => (c + 1) % testimonials.length);
  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-16 md:py-24" ref={ref}>
      <div className="container mx-auto px-4 md:px-6 lg:px-12 max-w-5xl">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary mb-4">
            Testimonials
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            What Families Are Saying
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            Real stories from Ohio families we've helped protect.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          <div className="relative rounded-2xl border border-border/60 bg-card shadow-lg overflow-hidden">
            {/* Decorative gradient */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-accent to-primary" />

            <div className="p-8 md:p-12">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="grid md:grid-cols-[auto_1fr] gap-8 items-center">
                    {/* Avatar */}
                    <div className="flex flex-col items-center gap-3">
                      <div className="relative">
                        <img
                          src={testimonials[current].avatar}
                          alt={testimonials[current].name}
                          className="w-20 h-20 md:w-24 md:h-24 rounded-2xl object-cover shadow-md"
                        />
                        <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-md">
                          <Quote className="w-3.5 h-3.5 text-primary-foreground" />
                        </div>
                      </div>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20">
                        {testimonials[current].tag}
                      </span>
                    </div>

                    {/* Content */}
                    <div>
                      <div className="flex gap-1 mb-4">
                        {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                        ))}
                      </div>
                      <blockquote className="text-lg md:text-xl text-foreground leading-relaxed mb-6 italic">
                        "{testimonials[current].quote}"
                      </blockquote>
                      <div>
                        <p className="font-bold text-foreground">{testimonials[current].name}</p>
                        <p className="text-sm text-muted-foreground">{testimonials[current].location}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between px-8 pb-6">
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      i === current ? "bg-primary w-8" : "bg-border hover:bg-primary/30"
                    }`}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={prev}
                  className="w-10 h-10 rounded-xl border border-border/60 bg-card flex items-center justify-center hover:bg-muted transition-colors shadow-sm"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-5 h-5 text-foreground" />
                </button>
                <button
                  onClick={next}
                  className="w-10 h-10 rounded-xl border border-border/60 bg-primary flex items-center justify-center hover:bg-primary/90 transition-colors shadow-sm"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-5 h-5 text-primary-foreground" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
