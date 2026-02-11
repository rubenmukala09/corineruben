import { useState, useEffect } from "react";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { GeometricCorner, GridPattern } from "@/components/ui/GeometricDecorations";
import { useTestimonials } from "@/hooks/useTestimonials";
import { Skeleton } from "@/components/ui/skeleton";

export const TestimonialQuote = () => {
  const { data: testimonials, isLoading, error } = useTestimonials(5);
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    if (testimonials && testimonials.length > 0) {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }
  };
  
  const prev = () => {
    if (testimonials && testimonials.length > 0) {
      setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    }
  };

  useEffect(() => {
    if (!testimonials || testimonials.length === 0) return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [testimonials]);

  // Loading state
  if (isLoading) {
    return (
      <section className="py-16 relative overflow-hidden">
        <GridPattern className="opacity-50" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <Skeleton className="h-10 w-48 mx-auto mb-4" />
            <Skeleton className="h-12 w-96 mx-auto" />
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg">
              <div className="grid md:grid-cols-3 gap-8 items-center">
                <Skeleton className="w-40 h-40 md:w-48 md:h-48 rounded-2xl mx-auto" />
                <div className="md:col-span-2 space-y-4">
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-32" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Empty state - no testimonials yet
  if (!testimonials || testimonials.length === 0) {
    return (
      <section className="py-16 relative overflow-hidden">
        <GridPattern className="opacity-50" />
        <GeometricCorner position="top-left" variant="dots" />
        <GeometricCorner position="bottom-right" variant="lines" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div 
              className="inline-flex items-center gap-2 px-5 py-2 bg-primary/10 text-primary text-sm font-semibold uppercase tracking-wider mb-4 border border-primary/20"
              style={{ clipPath: "polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)" }}
            >
              Client Testimonials
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
              What Our Clients{" "}
              <span className="text-primary">Have To Say</span>
            </h2>
          </div>

          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg border border-border/50">
              <Quote className="w-12 h-12 text-primary/30 mx-auto mb-4" />
              <p className="text-lg text-muted-foreground mb-4">
                We're just getting started! Be one of our first clients and share your experience.
              </p>
              <p className="text-sm text-muted-foreground">
                Your feedback helps other families make informed decisions about their digital safety.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-16 relative overflow-hidden">
      {/* Grid pattern */}
      <GridPattern className="opacity-50" />
      
      {/* Geometric corner accents */}
      <GeometricCorner position="top-left" variant="dots" />
      <GeometricCorner position="bottom-right" variant="lines" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div 
            className="inline-flex items-center gap-2 px-5 py-2 bg-primary/10 text-primary text-sm font-semibold uppercase tracking-wider mb-4 border border-primary/20"
            style={{ clipPath: "polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)" }}
          >
            Client Testimonials
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            What Our Clients{" "}
            <span className="text-primary">Have To Say</span>
          </h2>
        </div>

        {/* Testimonial Card - Soft Modern */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] border border-white/50 transition-all duration-400 ease-out hover:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.12)]">
            <div className="grid md:grid-cols-3 gap-8 items-center">
              {/* Image or Avatar - Physical Photo Effect */}
              <div className="relative mx-auto md:mx-0">
                <div className="relative">
                  <div className="absolute -inset-3 rounded-2xl border-2 border-primary/20" />
                  <div className="w-40 h-40 md:w-48 md:h-48 rounded-2xl overflow-hidden border border-white/50 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)]">
                    {currentTestimonial.primary_media_url ? (
                      <img
                        src={currentTestimonial.primary_media_url}
                        alt={currentTestimonial.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                        <span className="text-4xl font-bold text-primary">
                          {currentTestimonial.name.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="md:col-span-2 text-center md:text-left">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 mx-auto md:mx-0">
                  <Quote className="w-6 h-6 text-primary" />
                </div>
                
                {/* Stars */}
                <div className="flex justify-center md:justify-start gap-1 mb-4">
                  {[...Array(currentTestimonial.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                  ))}
                </div>
                
                {/* Quote */}
                <blockquote className="text-lg md:text-xl text-foreground font-medium leading-relaxed mb-6">
                  "{currentTestimonial.story}"
                </blockquote>

                <div>
                  <div className="font-bold text-lg text-foreground">
                    {currentTestimonial.name}
                  </div>
                  {currentTestimonial.location && (
                    <div className="text-primary text-sm">
                      {currentTestimonial.location}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-center items-center gap-4 mt-8 pt-6 border-t border-border/30">
              <button
                onClick={prev}
                className="w-10 h-10 rounded-2xl bg-muted hover:bg-primary/10 flex items-center justify-center transition-all duration-300 hover:-translate-y-1"
                aria-label="Previous testimonial"
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
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
              
              <button
                onClick={next}
                className="w-10 h-10 rounded-2xl bg-muted hover:bg-primary/10 flex items-center justify-center transition-all duration-300 hover:-translate-y-1"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5 text-foreground" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialQuote;
