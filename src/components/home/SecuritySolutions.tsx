import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import heroServices1 from "@/assets/hero-services-1.jpg";
import heroServices2 from "@/assets/hero-services-2.jpg";
import heroServices3 from "@/assets/hero-services-3.jpg";
import heroServices4 from "@/assets/hero-services-4.jpg";
import communityTraining from "@/assets/community-training.jpg";
import securityExpert from "@/assets/security-expert.jpg";

const portfolioImages = [
  { src: heroServices1, alt: "Security Assessment", category: "Assessment" },
  { src: heroServices2, alt: "Family Training", category: "Training" },
  { src: heroServices3, alt: "Device Protection", category: "Protection" },
  { src: heroServices4, alt: "Monitoring Services", category: "Monitoring" },
  { src: communityTraining, alt: "Community Workshops", category: "Workshops" },
  { src: securityExpert, alt: "Expert Consultation", category: "Consultation" },
];

export const SecuritySolutions = () => {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Decorative elements */}
      <motion.div 
        className="absolute top-20 right-10 w-32 h-32 rounded-full bg-primary/5"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 5, repeat: Infinity }}
      />
      <motion.div 
        className="absolute bottom-20 left-20 w-24 h-24 rounded-full bg-accent/10"
        animate={{ scale: [1.2, 1, 1.2] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      
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
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">To See Quality</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            See the quality of our work and the trust our clients place in us.
          </p>
        </motion.div>

        {/* Portfolio Grid with Animated Circular Images */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {portfolioImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1, type: "spring" }}
              className="group text-center"
            >
              <Link to="/about" className="block">
                {/* Circular image container with enhanced orbiting rings */}
                <div className="relative mb-4 mx-auto w-fit">
                  {/* Multiple animated orbiting rings with glow */}
                  <motion.div 
                    className="absolute -inset-4 rounded-full border-2 border-primary/30"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 12 + index * 2, repeat: Infinity, ease: "linear" }}
                  />
                  <motion.div 
                    className="absolute -inset-6 rounded-full border border-accent/20"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 18 + index * 2, repeat: Infinity, ease: "linear" }}
                  />
                  <motion.div 
                    className="absolute -inset-8 rounded-full border border-primary/10"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 25 + index * 2, repeat: Infinity, ease: "linear" }}
                  />
                  
                  {/* Main image with hover zoom and glow effect */}
                  <motion.div 
                    className="w-36 h-36 md:w-44 md:h-44 rounded-full overflow-hidden border-4 border-background shadow-xl group-hover:shadow-2xl group-hover:shadow-primary/30 transition-all duration-500"
                    whileHover={{ scale: 1.1 }}
                  >
                    <motion.img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.3 }}
                      transition={{ duration: 0.5 }}
                    />
                  </motion.div>
                  
                  {/* Enhanced animated decorative dots with pulse */}
                  <motion.div 
                    className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-gradient-to-br from-accent to-primary shadow-lg shadow-accent/50"
                    animate={{ 
                      scale: [1, 1.3, 1],
                      opacity: [0.8, 1, 0.8],
                      boxShadow: ["0 0 10px rgba(var(--accent), 0.3)", "0 0 20px rgba(var(--accent), 0.6)", "0 0 10px rgba(var(--accent), 0.3)"]
                    }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                  />
                  <motion.div 
                    className="absolute bottom-0 -left-3 w-4 h-4 rounded-full bg-gradient-to-br from-primary to-accent shadow-lg"
                    animate={{ 
                      scale: [1, 1.4, 1],
                      opacity: [0.6, 1, 0.6]
                    }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.3 }}
                  />
                  <motion.div 
                    className="absolute top-1/2 -right-4 w-3 h-3 rounded-full bg-primary/60"
                    animate={{ 
                      y: [-5, 5, -5],
                      opacity: [0.4, 0.8, 0.4]
                    }}
                    transition={{ duration: 3, repeat: Infinity, delay: index * 0.4 }}
                  />
                </div>
                
                {/* Category label with underline animation */}
                <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors relative inline-block">
                  {image.category}
                  <motion.div 
                    className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary to-accent"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
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
