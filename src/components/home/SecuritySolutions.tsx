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

import { LightOrbs, Sparkles, IllustrationLines } from "@/components/ui/GeometricDecorations";

export const SecuritySolutions = () => {
  return (
    <section className="py-16 relative overflow-hidden">
      {/* Simple gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
      
      {/* Light orbs */}
      <LightOrbs className="opacity-60" />
      
      {/* Sparkles */}
      <Sparkles className="opacity-70" />
      
      {/* Wave illustration */}
      <IllustrationLines variant="wave" className="bottom-10 left-1/4 opacity-40" />
      
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
                {/* Image container - Physical Photo Effect with Illustrations */}
                <div className="relative mb-4 mx-auto w-fit">
                  {/* Decorative corner accents */}
                  <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-primary/40 rounded-tl-lg opacity-60 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-accent/40 rounded-br-lg opacity-60 group-hover:opacity-100 transition-opacity" />
                  
                  {/* Floating dots */}
                  <div className="absolute -top-3 right-4 w-2 h-2 bg-primary/40 rounded-full group-hover:scale-150 transition-transform" />
                  <div className="absolute top-4 -right-3 w-1.5 h-1.5 bg-accent/50 rounded-full group-hover:scale-150 transition-transform delay-75" />
                  
                  {/* Static decorative ring */}
                  <div className="absolute -inset-3 rounded-2xl border-2 border-primary/20 group-hover:border-primary/40 transition-colors duration-300" />
                  
                  {/* Main image - Soft Modern */}
                  <img 
                    src={image.src}
                    alt={image.alt}
                    className="w-36 h-36 md:w-44 md:h-44 border border-white/50 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] rounded-2xl object-cover"
                    width={176}
                    height={176}
                    loading="lazy"
                    decoding="async"
                  />
                  
                  {/* Small decorative illustration */}
                  <svg className="absolute -bottom-1 -left-1 w-6 h-6 opacity-40 group-hover:opacity-70 transition-opacity" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" fill="none" className="text-primary" strokeDasharray="4 2" />
                  </svg>
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
