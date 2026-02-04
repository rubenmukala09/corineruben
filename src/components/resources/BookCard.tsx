import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Zap, Star, BookOpen } from "lucide-react";

interface BookCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  tag: string;
  author: string;
  onAddToCart: () => void;
  onBuyNow: () => void;
  onClick: () => void;
  className?: string;
}

/**
 * Professional Book Card Component
 * Clean, elegant display with subtle 3D spine effect and smooth animations
 */
export function BookCard({
  id,
  name,
  description,
  price,
  image,
  tag,
  author,
  onAddToCart,
  onBuyNow,
  onClick,
  className
}: BookCardProps) {
  // Create spine title (first 3 words max)
  const spineTitle = name.split(' ').slice(0, 4).join(' ');

  return (
    <div className={cn("group h-full flex flex-col", className)}>
      {/* Book Display Container */}
      <button
        onClick={onClick}
        className="relative w-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg mb-3"
        aria-label={`View ${name} details`}
      >
        <div className="relative book-container">
          {/* Book with Spine */}
          <div className="relative flex">
            {/* Book Spine - Left Edge */}
            <div className="book-spine relative w-4 md:w-5 flex-shrink-0 rounded-l-sm overflow-hidden shadow-md group-hover:shadow-lg transition-shadow duration-300">
              <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary/95 to-primary/85" />
              
              {/* Spine Content */}
              <div className="relative h-full flex flex-col items-center justify-between py-2 px-0.5">
                {/* Top Brand Mark */}
                <div className="text-[5px] md:text-[6px] font-bold text-white/90 tracking-[0.2em]">
                  IN
                </div>
                
                {/* Title - Vertical */}
                <div 
                  className="flex-1 flex items-center justify-center w-full overflow-hidden py-1"
                  style={{ writingMode: 'vertical-rl' }}
                >
                  <span 
                    className="text-[6px] md:text-[7px] font-semibold text-white tracking-wide text-center rotate-180 leading-tight whitespace-nowrap overflow-hidden text-ellipsis"
                    style={{ maxHeight: '85%' }}
                  >
                    {spineTitle}
                  </span>
                </div>
                
                {/* Bottom Decoration */}
                <div className="w-1.5 h-1.5 rounded-full bg-white/50" />
              </div>
            </div>

            {/* Book Cover */}
            <div className="book-cover relative flex-1 aspect-[2.8/4] overflow-hidden rounded-r-sm shadow-lg group-hover:shadow-xl transition-all duration-500">
              {/* Cover Image */}
              <img 
                src={image} 
                alt={name}
                width={260}
                height={371}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
                decoding="async"
              />
              
              {/* Title Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-foreground/95 via-foreground/60 to-transparent p-2 pt-6">
                <h4 className="text-[10px] md:text-xs font-bold text-background leading-tight line-clamp-2">
                  {name}
                </h4>
                <p className="text-[7px] md:text-[8px] text-background/75 mt-0.5 font-medium flex items-center gap-1">
                  <BookOpen className="w-2 h-2" />
                  InVision Network
                </p>
              </div>

              {/* Tag Badge */}
              <div className="absolute top-1.5 right-1.5 px-1.5 py-0.5 bg-gradient-to-r from-primary to-accent text-white text-[7px] md:text-[8px] font-bold rounded shadow-md">
                {tag}
              </div>

              {/* eBook Icon */}
              <div className="absolute top-1.5 left-1.5 px-1.5 py-0.5 bg-primary/90 text-white text-[7px] md:text-[8px] font-bold rounded shadow-md flex items-center gap-0.5">
                📘 eBook
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/15 transition-colors duration-300 flex items-center justify-center pointer-events-none">
                <span className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 bg-background/95 text-foreground text-[10px] md:text-xs px-3 py-1.5 rounded-full font-medium shadow-lg backdrop-blur-sm">
                  View Details
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Shadow for 3D effect */}
          <div className="absolute -bottom-2 left-3 right-1 h-3 bg-foreground/15 blur-sm rounded-full opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
        </div>
      </button>

      {/* Book Info */}
      <div className="px-0.5 flex-1 flex flex-col">
        {/* Rating */}
        <div className="flex items-center gap-0.5 mb-1.5">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-2.5 h-2.5 fill-chart-4 text-chart-4" />
          ))}
          <span className="text-[9px] text-muted-foreground ml-1">5.0</span>
        </div>

        {/* Price Row */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm md:text-base font-bold text-primary">${price.toFixed(2)}</span>
          <span className="text-[7px] md:text-[8px] text-success font-medium bg-success/10 px-1.5 py-0.5 rounded">🎖️ Vets 10%</span>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-1.5 mt-auto">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart();
            }} 
            className="text-[9px] md:text-[10px] h-7 px-1.5"
          >
            <ShoppingCart className="w-3 h-3 mr-0.5" />
            Cart
          </Button>
          <Button 
            size="sm" 
            onClick={(e) => {
              e.stopPropagation();
              onBuyNow();
            }} 
            className="text-[9px] md:text-[10px] h-7 px-1.5"
          >
            <Zap className="w-3 h-3 mr-0.5" />
            Buy
          </Button>
        </div>
      </div>
    </div>
  );
}

export default BookCard;
