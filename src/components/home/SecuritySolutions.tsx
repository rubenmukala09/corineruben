import { motion } from "framer-motion";
import { Eye, ZoomIn, Layers } from "lucide-react";
import heroServices1 from "@/assets/hero-services-1.jpg";
import heroServices2 from "@/assets/hero-services-2.jpg";
import heroServices3 from "@/assets/hero-services-3.jpg";
import heroServices4 from "@/assets/hero-services-4.jpg";

const portfolioImages = [
  { src: heroServices1, alt: "Security Assessment", category: "Assessment" },
  { src: heroServices2, alt: "Family Training", category: "Training" },
  { src: heroServices3, alt: "Device Protection", category: "Protection" },
  { src: heroServices4, alt: "Monitoring Services", category: "Monitoring" },
];

export const SecuritySolutions = () => {
  return (
    <section className="py-32 bg-muted/20 relative overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 opacity-[0.015]">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)',
            backgroundSize: '32px 32px'
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Layers className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-muted-foreground">Our Portfolio</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 tracking-tight">
            Check Our Portfolio
            <br />
            <span className="text-primary">To See Quality</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            See the quality of our work and the trust our clients place in us.
          </p>
        </motion.div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {portfolioImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative aspect-[4/5] rounded-2xl overflow-hidden shadow-lg cursor-pointer border border-border/30 hover:border-primary/30 transition-all duration-300"
            >
              {/* Image with magnification effect */}
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-125"
                />
              </div>
              
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <motion.div 
                  className="w-12 h-12 rounded-xl bg-background flex items-center justify-center mb-3 shadow-lg"
                  initial={{ scale: 0.8 }}
                  whileHover={{ scale: 1 }}
                >
                  <ZoomIn className="w-5 h-5 text-primary" />
                </motion.div>
                <span className="text-primary-foreground font-semibold">{image.category}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SecuritySolutions;
