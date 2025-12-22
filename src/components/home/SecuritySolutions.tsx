import { motion } from "framer-motion";
import { Eye, ZoomIn } from "lucide-react";
import heroHome from "@/assets/hero-home-1.jpg";
import heroSecurityCamera from "@/assets/hero-security-camera.jpg";
import heroAbout from "@/assets/hero-about-1.jpg";
import heroBusiness from "@/assets/hero-business-1.jpg";

const portfolioImages = [
  { src: heroHome, alt: "Family protection", category: "Residential" },
  { src: heroSecurityCamera, alt: "Security monitoring", category: "Monitoring" },
  { src: heroAbout, alt: "Business security", category: "Business" },
  { src: heroBusiness, alt: "Digital safety", category: "Training" },
];

export const SecuritySolutions = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span 
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Eye className="w-4 h-4" />
            Our Portfolio
          </motion.span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            You Can Check <span className="font-serif italic text-primary">Portfolio</span>
            <br />
            To Check <span className="text-primary">Quality</span>.
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            See the quality of our work and the trust our clients place in us.
          </p>
        </motion.div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {portfolioImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl cursor-pointer border border-border/50 hover:border-primary/30 transition-all duration-500"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <motion.div 
                  className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center mb-4 shadow-xl"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1.1 }}
                >
                  <ZoomIn className="w-7 h-7 text-primary" />
                </motion.div>
                <span className="text-white font-semibold text-lg">{image.category}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SecuritySolutions;
