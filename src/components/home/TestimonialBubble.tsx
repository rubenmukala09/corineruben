import { motion } from "framer-motion";
import { Star } from "lucide-react";

interface TestimonialBubbleProps {
  quote: string;
  author: string;
  location?: string;
  rating?: number;
  className?: string;
}

export const TestimonialBubble = ({ 
  quote, 
  author, 
  location, 
  rating = 5,
  className = "" 
}: TestimonialBubbleProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      className={`bg-white rounded-2xl p-4 shadow-lg border border-border/50 ${className}`}
    >
      {/* Stars */}
      <div className="flex gap-0.5 mb-2">
        {[...Array(rating)].map((_, i) => (
          <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
        ))}
      </div>
      
      {/* Quote */}
      <p className="text-sm text-foreground leading-relaxed mb-3">
        "{quote}"
      </p>
      
      {/* Author */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
          <span className="text-white text-xs font-bold">{author.charAt(0)}</span>
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">{author}</p>
          {location && <p className="text-xs text-muted-foreground">{location}</p>}
        </div>
      </div>
    </motion.div>
  );
};
