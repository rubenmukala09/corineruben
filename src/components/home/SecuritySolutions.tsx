import { motion } from "framer-motion";
import { Link } from "react-router-dom";
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
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-32 h-32 rounded-full bg-primary/5" />
      <div className="absolute bottom-20 left-20 w-24 h-24 rounded-full bg-accent/10" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wider mb-4 block">
            Our Portfolio
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Check Our Portfolio{" "}
            <span className="text-primary">To See Quality</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            See the quality of our work and the trust our clients place in us.
          </p>
        </motion.div>

        {/* Portfolio Grid with Circular Images */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {portfolioImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group text-center"
            >
              <Link to="/about" className="block">
                {/* Circular image container */}
                <div className="relative mb-4 mx-auto w-fit">
                  {/* Decorative rings */}
                  <div className="absolute -inset-2 rounded-full border-2 border-primary/10 group-hover:border-primary/30 transition-colors" />
                  <div className="absolute -inset-4 rounded-full border-2 border-accent/5 group-hover:border-accent/20 transition-colors" />
                  
                  {/* Main image */}
                  <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-background shadow-xl">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  
                  {/* Decorative dots */}
                  <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-accent" />
                  <div className="absolute bottom-2 -left-2 w-3 h-3 rounded-full bg-primary/50" />
                </div>
                
                {/* Category label */}
                <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                  {image.category}
                </h3>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SecuritySolutions;
