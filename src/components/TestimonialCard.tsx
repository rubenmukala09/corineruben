import { Star } from "lucide-react";

interface TestimonialCardProps {
  name: string;
  age?: string;
  location: string;
  quote: string;
  image: string;
  rating?: number;
}

const TestimonialCard = ({ name, age, location, quote, image, rating = 5 }: TestimonialCardProps) => {
  return (
    <div className="bg-gradient-card rounded-xl p-4 shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1 relative overflow-hidden border-none group">
      {/* Smaller gradient quote mark background */}
      <div className="absolute -top-2 left-3 text-[60px] font-bold gradient-text-primary opacity-10 leading-none pointer-events-none select-none">
        "
      </div>
      
      <div className="relative z-10">
        <div className="flex gap-0.5 mb-2">
          {[...Array(rating)].map((_, i) => (
            <div key={i} className="w-3.5 h-3.5 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Star className="w-2 h-2 fill-white text-white" />
            </div>
          ))}
        </div>
        
        <p className="text-foreground mb-3 text-sm leading-snug">"{quote}"</p>
        
        <div className="flex items-center gap-2.5 pt-2.5 border-t border-border/50">
          <img
            src={image}
            alt={`${name}'s testimonial`}
            className="w-10 h-10 rounded-full object-cover ring-2 ring-accent/20"
            loading="lazy"
            decoding="async"
          />
          <div>
            <h4 className="font-semibold text-sm text-foreground">
              {name}
              {age && `, ${age}`}
            </h4>
            <p className="text-xs text-muted-foreground">{location}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
