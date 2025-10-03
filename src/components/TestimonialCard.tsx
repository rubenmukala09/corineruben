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
    <div className="bg-gradient-card rounded-2xl p-8 shadow-soft hover:shadow-strong transition-all duration-300 hover:-translate-y-1 relative overflow-hidden border-none">
      {/* Large gradient quote mark background */}
      <div className="absolute -top-4 left-6 text-[120px] font-bold gradient-text-gold opacity-10 leading-none pointer-events-none select-none">
        "
      </div>
      
      <div className="relative z-10">
        <div className="flex gap-1 mb-4">
          {[...Array(rating)].map((_, i) => (
            <div key={i} className="w-5 h-5 rounded-full bg-gradient-to-br from-[hsl(38,92%,50%)] to-[hsl(32,95%,48%)] flex items-center justify-center">
              <Star className="w-3 h-3 fill-white text-white" />
            </div>
          ))}
        </div>
        
        <p className="text-foreground mb-6 text-lg leading-relaxed">"{quote}"</p>
        
        <div className="flex items-center gap-4 pt-4 border-t border-border/50">
          <img
            src={image}
            alt={`${name}'s testimonial`}
            className="w-16 h-16 rounded-full object-cover ring-4 ring-accent/20"
          />
          <div>
            <h4 className="font-bold text-lg text-foreground">
              {name}
              {age && `, ${age}`}
            </h4>
            <p className="text-sm text-muted-foreground">{location}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
