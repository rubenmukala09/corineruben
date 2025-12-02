import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";

export function OhioServiceMap() {
  return (
    <section className="py-8 md:py-12 lg:py-20 xl:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12 lg:mb-16">
          <Badge className="mb-3 md:mb-4 text-sm md:text-base lg:text-lg px-3 md:px-4 lg:px-6 py-1.5 md:py-2" variant="secondary">
            <MapPin className="w-3 h-3 md:w-4 md:h-4 mr-2" />
            Service Areas
          </Badge>
          <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 md:mb-4 lg:mb-6 px-2">
            Proudly Serving Ohio Families
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto mb-6 md:mb-8 lg:mb-12 px-2">
            Based in Cleveland, serving communities across the state
          </p>
        </div>

        {/* Google Maps Embed */}
        <div className="max-w-6xl mx-auto px-2 sm:px-0">
          <div className="relative w-full h-[500px] md:h-[650px] lg:h-[750px] xl:h-[850px] rounded-xl md:rounded-2xl border-2 md:border-4 border-primary/20 shadow-xl md:shadow-2xl overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1489535.8524929!2d-83.5!3d40.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8836e97ab7aeb4c9%3A0x9423c880d8d6dbc0!2sOhio!5e0!3m2!1sen!2sus!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="InVision Network Service Areas in Ohio"
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
