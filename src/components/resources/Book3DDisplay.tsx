import { cn } from "@/lib/utils";

interface Book3DDisplayProps {
  title: string;
  coverImage: string;
  tag?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

/**
 * 3D Book Display Component
 * Shows a book with visible spine, front cover, and top edge
 * Features InVision Network branding and proper title display
 */
export function Book3DDisplay({ 
  title, 
  coverImage, 
  tag,
  className,
  size = "md" 
}: Book3DDisplayProps) {
  // Split title for spine display (first 2-3 words)
  const spineTitle = title.split(' ').slice(0, 3).join(' ');
  
  const sizeClasses = {
    sm: "w-[120px] h-[160px]",
    md: "w-[150px] h-[200px]",
    lg: "w-[180px] h-[240px]"
  };

  const spineWidths = {
    sm: "w-[16px]",
    md: "w-[20px]",
    lg: "w-[24px]"
  };

  const topHeights = {
    sm: "h-[8px]",
    md: "h-[10px]",
    lg: "h-[12px]"
  };

  return (
    <div className={cn("relative group perspective-1000", className)}>
      {/* 3D Book Container */}
      <div 
        className="relative transform-style-3d transition-transform duration-500 group-hover:rotate-y-[-8deg] group-hover:rotate-x-[5deg]"
        style={{ 
          transformStyle: 'preserve-3d',
          transform: 'rotateY(-15deg) rotateX(5deg)'
        }}
      >
        {/* Book Spine - Left Side */}
        <div 
          className={cn(
            "absolute left-0 top-0 bottom-0 bg-gradient-to-b from-primary via-primary/90 to-primary/80 rounded-l-sm shadow-lg",
            spineWidths[size]
          )}
          style={{ 
            transform: 'rotateY(90deg) translateZ(0px)',
            transformOrigin: 'left center',
            writingMode: 'vertical-rl',
            textOrientation: 'mixed'
          }}
        >
          {/* Spine Content */}
          <div className="h-full flex flex-col items-center justify-between py-2 px-0.5">
            {/* InVision Logo/Mark */}
            <div className="text-[6px] font-bold text-white/80 tracking-widest rotate-180">
              IN
            </div>
            
            {/* Title on Spine */}
            <div className="flex-1 flex items-center justify-center">
              <span 
                className="text-[8px] font-bold text-white tracking-wide text-center rotate-180 leading-tight"
                style={{ 
                  writingMode: 'vertical-rl',
                  textOrientation: 'mixed',
                  maxHeight: '80%',
                  overflow: 'hidden'
                }}
              >
                {spineTitle}
              </span>
            </div>
            
            {/* Bottom Decoration */}
            <div className="w-1.5 h-1.5 bg-white/40 rounded-full rotate-180" />
          </div>
        </div>

        {/* Front Cover */}
        <div 
          className={cn(
            "relative overflow-hidden rounded-r-sm shadow-2xl bg-gradient-to-br from-secondary to-secondary/80",
            sizeClasses[size]
          )}
          style={{ transform: `translateX(${size === 'sm' ? '16px' : size === 'md' ? '20px' : '24px'})` }}
        >
          {/* Cover Image */}
          <img 
            src={coverImage} 
            alt={title}
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
          />
          
          {/* Title Overlay at Bottom */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-2">
            <h4 className="text-[10px] font-bold text-white leading-tight line-clamp-2 drop-shadow-lg">
              {title}
            </h4>
            <p className="text-[7px] text-white/70 mt-0.5 font-medium">
              InVision Network
            </p>
          </div>

          {/* Tag Badge */}
          {tag && (
            <div className="absolute top-2 right-2 px-1.5 py-0.5 bg-gradient-to-r from-primary to-accent text-white text-[8px] font-bold rounded-sm shadow-lg">
              {tag}
            </div>
          )}

          {/* eBook Badge */}
          <div className="absolute top-2 left-2 px-1.5 py-0.5 bg-primary/90 text-white text-[8px] font-bold rounded-sm shadow-lg flex items-center gap-0.5">
            📘 eBook
          </div>

          {/* Subtle Glare Effect */}
          <div 
            className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          />
        </div>

        {/* Top Edge of Book */}
        <div 
          className={cn(
            "absolute top-0 left-0 right-0 bg-gradient-to-r from-muted via-muted/80 to-muted rounded-t-sm",
            topHeights[size]
          )}
          style={{ 
            transform: 'rotateX(90deg) translateZ(0)',
            transformOrigin: 'top center',
            marginLeft: size === 'sm' ? '16px' : size === 'md' ? '20px' : '24px'
          }}
        >
          {/* Page Lines */}
          <div className="w-full h-full flex gap-px px-1">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="flex-1 bg-muted-foreground/30 rounded-full" />
            ))}
          </div>
        </div>

        {/* Book Shadow */}
        <div 
          className="absolute -bottom-2 left-4 right-0 h-4 bg-gradient-to-r from-foreground/30 to-transparent blur-md rounded-full opacity-50 group-hover:opacity-70 transition-opacity"
          style={{ marginLeft: size === 'sm' ? '16px' : size === 'md' ? '20px' : '24px' }}
        />
      </div>
    </div>
  );
}

export default Book3DDisplay;
