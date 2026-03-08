import { useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

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

  const next = () => setCurrent((c) => (c + 1) % testimonials.length);
  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-16 md:py-28 relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-6 lg:px-12 max-w-5xl relative">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary mb-4">
            Testimonials
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            What Families Are Saying
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            Real stories from Ohio families we've helped protect.
          </p>
        </div>

        <div className="relative rounded-2xl border border-border/50 bg-card shadow-lg overflow-hidden">
          {/* Top gradient bar */}
          <div className="h-1 bg-gradient-to-r from-primary via-accent to-primary" />

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
                      <div className="rounded-2xl overflow-hidden shadow-md">
                        <img
                          src={testimonials[current].avatar}
                          alt={testimonials[current].name}
                          className="w-20 h-20 md:w-28 md:h-28 object-cover"
                        />
                      </div>
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-md">
                        <Quote className="w-3.5 h-3.5 text-primary-foreground" />
                      </div>
                    </div>
                    <span className="inline-flex items-center px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-primary/8 text-primary border border-primary/15">
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
                      <p className="font-bold text-foreground text-lg">{testimonials[current].name}</p>
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
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === current ? "bg-primary w-8" : "bg-border hover:bg-primary/30 w-2"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={prev}
                className="w-9 h-9 rounded-lg border border-border bg-card flex items-center justify-center hover:bg-muted transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-4 h-4 text-foreground" />
              </button>
              <button
                onClick={next}
                className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center hover:bg-primary/90 transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-4 h-4 text-primary-foreground" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
