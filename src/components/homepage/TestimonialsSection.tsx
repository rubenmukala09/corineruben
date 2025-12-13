import { Star, Shield, Award, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

const testimonials = [
  {
    quote: "InVision caught a deepfake call pretending to be my grandson. They saved me $15,000.",
    author: "Margaret S.",
    location: "Dayton, OH",
    rating: 5,
  },
  {
    quote: "The training was eye-opening. My parents now feel confident handling suspicious calls.",
    author: "David M.",
    location: "Kettering, OH",
    rating: 5,
  },
  {
    quote: "As a caregiver, I recommend InVision to all families I work with. Essential protection.",
    author: "Sarah L.",
    location: "Centerville, OH",
    rating: 5,
  },
];

const trustBadges = [
  { icon: Shield, label: "Veteran-Owned" },
  { icon: Award, label: "BBB Accredited" },
  { icon: CheckCircle, label: "Ohio-Based" },
];

export const TestimonialsSection = () => {
  return (
    <section className="py-20 md:py-28 bg-muted/30 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
            Real Stories
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            Trusted by Ohio Families
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full border-0 bg-card rounded-2xl p-8 shadow-soft">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                  ))}
                </div>
                <blockquote className="text-lg text-foreground mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap justify-center gap-8"
        >
          {trustBadges.map((badge) => (
            <div
              key={badge.label}
              className="flex items-center gap-3 px-6 py-3 rounded-full bg-card shadow-soft"
            >
              <badge.icon className="w-5 h-5 text-primary" />
              <span className="font-medium text-foreground">{badge.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
