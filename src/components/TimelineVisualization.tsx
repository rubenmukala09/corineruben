import { Card } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

interface TimelineVisualizationProps {
  events: TimelineEvent[];
}

export function TimelineVisualization({ events }: TimelineVisualizationProps) {
  return (
    <div className="relative py-8">
      {/* Vertical gradient line */}
      <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-accent to-primary rounded-full shadow-[0_0_10px_hsl(var(--primary)/0.3)]" />

      <div className="space-y-16 md:space-y-20">
        {events.map((event, index) => (
          <ScrollReveal
            key={event.year}
            delay={index * 100}
            animation="fade-up"
          >
            <div
              className={`relative flex items-center ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
            >
              {/* Timeline marker with glow */}
              <div className="absolute left-8 md:left-1/2 -ml-4 w-8 h-8 rounded-full bg-primary ring-4 ring-background flex items-center justify-center z-10 shadow-[0_0_20px_hsl(var(--primary)/0.6)]">
                <CheckCircle2 className="h-5 w-5 text-primary-foreground" />
              </div>

              {/* Content card with enhanced styling */}
              <Card
                className={`ml-20 md:ml-0 ${index % 2 === 0 ? "md:mr-[calc(50%+4rem)]" : "md:ml-[calc(50%+4rem)]"} p-8 hover:shadow-xl hover:scale-[1.02] transition-all duration-500 border-2 border-border/50 hover:border-primary/30 bg-gradient-to-br from-background to-secondary/20`}
              >
                <div className="flex flex-col md:flex-row items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="text-4xl md:text-5xl font-bold bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent">
                      {event.year}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-foreground mb-3 leading-tight">
                      {event.title}
                    </h3>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
