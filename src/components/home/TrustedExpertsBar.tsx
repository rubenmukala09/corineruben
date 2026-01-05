import { Star } from "lucide-react";

const avatars = [
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
];

export const TrustedExpertsBar = () => {
  return (
    <section className="py-8 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          {/* Avatar Stack */}
          <div className="flex items-center">
            <div className="flex -space-x-3">
              {avatars.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`Client ${i + 1}`}
                  className="w-10 h-10 rounded-full border-2 border-background object-cover"
                  style={{ zIndex: avatars.length - i }}
                />
              ))}
            </div>
            <div className="ml-4 flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
          </div>
          
          {/* Stats */}
          <div className="flex items-center gap-2 text-muted-foreground">
            <span className="text-2xl font-bold text-foreground">200+</span>
            <span>Satisfied Ohio Families</span>
          </div>
        </div>
      </div>
    </section>
  );
};
