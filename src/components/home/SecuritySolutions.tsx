import { Link } from "react-router-dom";
import heroServices1 from "@/assets/hero-services-1.jpg";
import heroServices2 from "@/assets/hero-services-2.jpg";
import heroServices3 from "@/assets/hero-services-3.jpg";
import heroServices4 from "@/assets/hero-services-4.jpg";
import communityTraining from "@/assets/community-training.jpg";
import securityExpert from "@/assets/professional-portrait.jpg";

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
    <section className="py-16 relative overflow-hidden">
      {/* Simple gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-10 animate-fade-in">
          {/* Angular badge */}
          <div 
            className="inline-flex items-center gap-2 px-5 py-2 bg-primary/10 text-primary text-sm font-semibold uppercase tracking-wider mb-4 border border-primary/20"
            style={{ clipPath: "polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)" }}
          >
            Our Portfolio
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Check Our Portfolio{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">To See Quality</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            See the quality of our work and the trust our clients place in us.
          </p>
        </div>

        {/* Portfolio Grid - Soft Modern with Physical Photo Effect */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {portfolioImages.map((image, index) => (
            <div
              key={index}
              className="group text-center animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <Link to="/about" className="block">
                {/* Image container - Physical Photo Effect */}
                <div className="relative mb-4 mx-auto w-fit">
                  {/* Static decorative ring */}
                  <div className="absolute -inset-3 rounded-2xl border-2 border-primary/20 group-hover:border-primary/40 transition-colors duration-300" />
                  
                  {/* Main image - Soft Modern */}
                  <div className="w-36 h-36 md:w-44 md:h-44 rounded-2xl overflow-hidden border border-white/50 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] transition-all duration-400 ease-out group-hover:translate-y-[-8px] group-hover:scale-[1.02] group-hover:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.12)]">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>
                
                {/* Category label */}
                <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                  {image.category}
                </h3>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SecuritySolutions;
