import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Professional Testimonial Component - InnovaAI-inspired
 *
 * Features:
 * - Circular avatar images (66x66px)
 * - Star ratings with SVG icons
 * - User name + company/role
 * - Quote text in clean card format
 * - Embedded in grid (not floating)
 */

interface ProfessionalTestimonialProps {
  quote: string;
  name: string;
  role: string;
  company?: string;
  avatar: string;
  rating: number; // 1-5 stars
  delay?: number;
  variant?: "card" | "minimal";
  className?: string;
}

export const ProfessionalTestimonial = ({
  quote,
  name,
  role,
  company,
  avatar,
  rating,
  delay = 0,
  variant = "card",
  className,
}: ProfessionalTestimonialProps) => {
  // Generate star array
  const stars = Array.from({ length: 5 }, (_, i) => i < rating);

  const cardStyles =
    variant === "card"
      ? "bg-white border border-gray-100 shadow-md hover:shadow-xl p-8 rounded-2xl"
      : "bg-transparent p-6";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      viewport={{ once: true, margin: "-50px" }}
      className={cn(
        "relative transition-all duration-300",
        cardStyles,
        className,
      )}
    >
      {/* Quote Icon */}
      <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-gradient-to-br from-coral-100 to-lavender-100 flex items-center justify-center opacity-50">
        <Quote className="w-5 h-5 text-coral-500" />
      </div>

      {/* Star Rating */}
      <div className="flex items-center gap-1 mb-4">
        {stars.map((filled, index) => (
          <Star
            key={index}
            className={cn(
              "w-5 h-5",
              filled
                ? "text-amber-400 fill-amber-400"
                : "text-gray-300 fill-gray-300",
            )}
          />
        ))}
      </div>

      {/* Quote Text */}
      <p className="font-body text-base md:text-lg text-gray-700 leading-relaxed mb-6 italic">
        "{quote}"
      </p>

      {/* User Info */}
      <div className="flex items-center gap-4">
        {/* Avatar */}
        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-coral-200 shadow-sm flex-shrink-0">
          <img
            src={avatar}
            alt={name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        {/* Name & Role */}
        <div>
          <div className="font-display text-base md:text-lg font-bold text-[#18305A]">
            {name}
          </div>
          <div className="font-body text-sm text-gray-500">
            {role}
            {company && ` • ${company}`}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/**
 * Testimonials Grid Container
 *
 * Responsive grid for testimonial cards
 */

interface TestimonialsGridProps {
  children: React.ReactNode;
  columns?: 2 | 3;
  className?: string;
}

export const TestimonialsGrid = ({
  children,
  columns = 2,
  className,
}: TestimonialsGridProps) => {
  const gridCols =
    columns === 2
      ? "grid-cols-1 md:grid-cols-2"
      : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";

  return (
    <div className={cn("grid gap-8", gridCols, className)}>{children}</div>
  );
};

/**
 * Testimonials Carousel (Alternative)
 *
 * For rotating testimonials like InnovaAI
 */

interface TestimonialsCarouselProps {
  testimonials: Array<{
    quote: string;
    name: string;
    role: string;
    company?: string;
    avatar: string;
    rating: number;
  }>;
  autoplay?: boolean;
  interval?: number;
}

export const TestimonialsCarousel = ({
  testimonials,
  autoplay = true,
  interval = 5000,
}: TestimonialsCarouselProps) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {
    if (!autoplay) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, interval);

    return () => clearInterval(timer);
  }, [autoplay, interval, testimonials.length]);

  const current = testimonials[currentIndex];

  return (
    <div className="relative max-w-4xl mx-auto">
      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.5 }}
        className="bg-white border border-gray-100 shadow-xl rounded-3xl p-12"
      >
        {/* Quote Icon */}
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-coral-100 to-lavender-100 flex items-center justify-center mb-6 mx-auto">
          <Quote className="w-7 h-7 text-coral-500" />
        </div>

        {/* Star Rating */}
        <div className="flex items-center justify-center gap-1 mb-6">
          {Array.from({ length: 5 }, (_, i) => (
            <Star
              key={i}
              className={cn(
                "w-6 h-6",
                i < current.rating
                  ? "text-amber-400 fill-amber-400"
                  : "text-gray-300 fill-gray-300",
              )}
            />
          ))}
        </div>

        {/* Quote */}
        <p className="font-body text-xl md:text-2xl text-gray-700 text-center leading-relaxed mb-8 italic">
          "{current.quote}"
        </p>

        {/* User Info */}
        <div className="flex flex-col items-center gap-4">
          <div className="w-20 h-20 rounded-full overflow-hidden border-3 border-coral-200 shadow-md">
            <img
              src={current.avatar}
              alt={current.name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="text-center">
            <div className="font-display text-lg font-bold text-[#18305A]">
              {current.name}
            </div>
            <div className="font-body text-sm text-gray-500">
              {current.role}
              {current.company && ` • ${current.company}`}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Carousel Indicators */}
      <div className="flex items-center justify-center gap-2 mt-8">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-300",
              index === currentIndex
                ? "bg-coral-500 w-8"
                : "bg-gray-300 hover:bg-gray-400",
            )}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

// Add React import at the top
import * as React from "react";
