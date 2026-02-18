import { Star, Quote } from "lucide-react";
import { useState } from "react";

const testimonials = [
  {
    name: "Margaret H.",
    role: "Retired Teacher, Dayton",
    quote:
      "After I almost lost $3,000 to a voice cloning scam, InVision taught me exactly what to look for. Now I feel confident answering my phone again.",
    rating: 5,
  },
  {
    name: "Robert & Linda K.",
    role: "Senior Couple, Springfield",
    quote:
      "The Family Plan protects all five of us. Our grandkids even took the workshop and loved it. Worth every penny for the peace of mind.",
    rating: 5,
  },
  {
    name: "James T.",
    role: "Small Business Owner, Centerville",
    quote:
      "InVision ran a security audit on our company and found three vulnerabilities we had no idea about. Their AI automation saved us 15 hours a week.",
    rating: 5,
  },
  {
    name: "Patricia W.",
    role: "Caregiver, Kettering",
    quote:
      "My mother received a deepfake video call pretending to be me. Thanks to ScamShield training, she spotted it right away. This service is essential.",
    rating: 5,
  },
];

export const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6 lg:px-12">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary mb-4">
            Real Stories
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Families Who Trust Us
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            Hear from Ohio families and businesses who stopped AI scams with our help.
          </p>
        </div>

        {/* Featured testimonial */}
        <div className="max-w-3xl mx-auto mb-10">
          <div className="relative rounded-xl border border-border/60 bg-card p-8 md:p-10 transition-all duration-300">
            <Quote className="absolute top-6 right-6 w-10 h-10 text-primary/10" />
            <div className="flex gap-1 mb-4">
              {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-accent text-accent" />
              ))}
            </div>
            <blockquote className="text-lg md:text-xl text-foreground leading-relaxed mb-6 font-medium">
              "{testimonials[activeIndex].quote}"
            </blockquote>
            <div>
              <p className="font-bold text-foreground">
                {testimonials[activeIndex].name}
              </p>
              <p className="text-sm text-muted-foreground">
                {testimonials[activeIndex].role}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation dots */}
        <div className="flex justify-center gap-3">
          {testimonials.map((t, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              aria-label={`View testimonial from ${t.name}`}
              className={`transition-all duration-200 rounded-full ${
                i === activeIndex
                  ? "w-10 h-3 bg-primary"
                  : "w-3 h-3 bg-border hover:bg-primary/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
