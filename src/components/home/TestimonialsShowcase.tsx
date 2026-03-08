import { Star, Quote } from 'lucide-react';
import { AnimatedSection } from '@/components/AnimatedSection';
import { CustomerAvatar } from '@/components/home/ImagePlaceholders';

const testimonials = [
  {
    name: 'Margaret Thompson',
    role: 'Retired Teacher, Columbus',
    rating: 5,
    text: "I was so worried about scammers targeting seniors. Now I feel confident using my iPad to video call my grandchildren. The training was easy to understand—no confusing computer talk!",
    highlight: 'Finally feel safe online',
  },
  {
    name: 'James Rodriguez',
    role: 'Veteran & Small Business Owner',
    rating: 5,
    text: "As a veteran, I appreciate their no-nonsense approach. They protected my business from a phishing attack that could've cost me thousands. Worth every penny.",
    highlight: 'Saved my business',
  },
  {
    name: 'Susan & Robert Chen',
    role: 'Parents, Cleveland',
    rating: 5,
    text: "We wanted to protect our aging parents from AI scams. The team set everything up and taught them what to watch for. Our whole family feels safer now.",
    highlight: 'Peace of mind for our family',
  },
];

export const TestimonialsShowcase = () => {
  return (
    <section className="section-padding-lg bg-gradient-to-b from-background to-muted/30">
      <div className="center-container">
        {/* Section Header */}
        <AnimatedSection animation="fade-up">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass-widget mb-6">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <span className="text-sm font-semibold text-foreground tracking-wider uppercase">
                What Our Families Say
              </span>
            </div>

            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Real Stories from{' '}
              <span className="gradient-text-primary">Real People</span>
            </h2>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Don't just take our word for it—hear from Ohio families we've helped protect
            </p>
          </div>
        </AnimatedSection>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
          {testimonials.map((testimonial, index) => (
            <AnimatedSection
              key={testimonial.name}
              animation="fade-up"
              delay={index * 100}
            >
              <div className="glass-card rounded-2xl md:rounded-3xl p-6 md:card-padding-xl h-full flex flex-col transition-all duration-300 hover:scale-105 group">
                {/* Quote Icon */}
                <div className="mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Quote className="w-6 h-6 text-primary" />
                  </div>
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                {/* Highlight */}
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold">
                    "{testimonial.highlight}"
                  </span>
                </div>

                {/* Testimonial Text */}
                <p className="text-muted-foreground leading-relaxed mb-6 flex-grow">
                  {testimonial.text}
                </p>

                {/* Author */}
                <div className="flex items-center gap-4 pt-4 border-t border-border/50">
                  <CustomerAvatar name={testimonial.name} className="w-12 h-12" />
                  <div>
                    <div className="font-semibold text-foreground">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Trust Stats */}
        <AnimatedSection animation="scale-up">
          <div className="glass-heavy rounded-2xl md:rounded-3xl p-6 md:card-padding-xl specular-highlight">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-center">
              <div>
                <div className="text-4xl md:text-5xl font-black text-primary mb-2">
                  4.9
                </div>
                <div className="flex justify-center gap-0.5 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <div className="text-sm text-muted-foreground font-medium">
                  Average Rating
                </div>
              </div>

              <div>
                <div className="text-4xl md:text-5xl font-black text-primary mb-2">
                  5,000+
                </div>
                <div className="text-sm text-muted-foreground font-medium">
                  Families Protected
                </div>
              </div>

              <div>
                <div className="text-4xl md:text-5xl font-black text-primary mb-2">
                  10K+
                </div>
                <div className="text-sm text-muted-foreground font-medium">
                  Scams Blocked
                </div>
              </div>

              <div>
                <div className="text-4xl md:text-5xl font-black text-primary mb-2">
                  99%
                </div>
                <div className="text-sm text-muted-foreground font-medium">
                  Success Rate
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};
