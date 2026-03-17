import { Star, Play } from "lucide-react";

interface TestimonialCardProps {
  name: string;
  age?: string;
  location: string;
  quote: string;
  image: string;
  rating?: number;
  videoUrl?: string;
  onVideoClick?: () => void;
}

const TestimonialCard = ({
  name,
  age,
  location,
  quote,
  image,
  rating = 5,
  videoUrl,
  onVideoClick,
}: TestimonialCardProps) => {
  return (
    <div className="glass-card rounded-2xl card-padding-lg border border-white/30 relative overflow-hidden group transition-all duration-300 hover:scale-[1.02]">
      {/* Large gradient quote mark background */}
      <div className="absolute -top-4 left-6 text-[120px] font-bold gradient-text-primary opacity-10 leading-none pointer-events-none select-none group-hover:opacity-20 transition-opacity duration-500">
        "
      </div>

      <div className="relative z-10">
        <div className="flex gap-1 mb-4">
          {[...Array(rating)].map((_, i) => (
            <div
              key={i}
              className="w-5 h-5 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center group-hover:scale-110 transition-all duration-300"
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              <Star
                className="w-3 h-3 fill-white text-white group-hover:rotate-12 transition-transform duration-300"
                style={{ transitionDelay: `${i * 50}ms` }}
              />
            </div>
          ))}
        </div>

        <p className="text-foreground mb-6 text-lg leading-relaxed">
          "{quote}"
        </p>

        <div className="flex items-center gap-4 pt-4 border-t border-border/50">
          <div className="relative">
            <img
              src={image}
              alt={`${name}'s testimonial`}
              className="w-16 h-16 rounded-full object-cover ring-4 ring-accent/20 group-hover:ring-accent/40 transition-all duration-500 premium-4k-image"
              loading="lazy"
              decoding="async"
            />
            {videoUrl && onVideoClick && (
              <button
                onClick={onVideoClick}
                className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full hover:bg-black/60 transition-all group/play"
                aria-label="Play video testimonial"
              >
                <Play
                  className="w-6 h-6 text-white group-hover/play:scale-110 transition-transform"
                  fill="white"
                />
              </button>
            )}
          </div>
          <div>
            <h4 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors duration-300">
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
