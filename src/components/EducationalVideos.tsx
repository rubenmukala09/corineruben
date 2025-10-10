import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, Clock } from "lucide-react";

const educationalVideos = [
  {
    id: "1",
    title: "Spotting AI Voice Clones in 60 Seconds",
    category: "AI Safety",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    duration: "5:30",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: "2",
    title: "Deepfake Detection Guide for Seniors",
    category: "Training",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    duration: "8:15",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: "3",
    title: "The 60-Second Pause Protocol in Action",
    category: "Tutorial",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    duration: "4:45",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: "4",
    title: "Protecting Your Bank Account from Phishing",
    category: "Security",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    duration: "6:20",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
];

const EducationalVideos = () => {
  return (
    <section className="py-20 bg-background relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '7s' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="mb-4">Free Educational Videos</h2>
          <p className="text-xl text-muted-foreground">
            Learn AI safety at your own pace with our video library
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {educationalVideos.map((video, index) => (
            <Card
              key={video.id}
              className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in-up bg-card"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative aspect-video overflow-hidden bg-muted">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:from-black/70 transition-colors duration-300" />
                
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-14 h-14 bg-white/95 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 cursor-pointer">
                    <Play className="w-7 h-7 text-primary ml-1" fill="currentColor" />
                  </div>
                </div>

                <div className="absolute top-2 left-2">
                  <Badge variant="secondary" className="bg-black/60 text-white border-none text-xs">
                    {video.category}
                  </Badge>
                </div>

                <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-black/70 text-white text-xs px-2 py-1 rounded">
                  <Clock className="w-3 h-3" />
                  {video.duration}
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-bold text-base leading-tight group-hover:text-primary transition-colors duration-300">
                  {video.title}
                </h3>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground italic">
            Replace placeholder videos with your actual educational content
          </p>
        </div>
      </div>
    </section>
  );
};

export default EducationalVideos;
