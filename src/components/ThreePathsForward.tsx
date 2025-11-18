import { BookOpen, Shield, Briefcase } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Link } from "react-router-dom";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface PathConfig {
  id: number;
  title: string;
  description: string;
  pricing: string;
  icon: typeof BookOpen;
  featured?: boolean;
  badge?: string;
  cta: string;
  link: string;
  basePrice: number;
}

const paths: PathConfig[] = [
  {
    id: 1,
    title: "ScamShield Protection",
    description: "Live analysis of suspicious messages. Monthly Ohio-specific scam alerts. Family account protection. 'Ask before you click' hotline.",
    pricing: "$39-129/month",
    icon: Shield,
    featured: true,
    cta: "Protect My Family",
    link: '/training#scamshield',
    basePrice: 39,
  },
  {
    id: 2,
    title: "Learn & Train",
    description: "In-person Dayton workshops. Online courses in 3 languages. Family training sessions. Corporate safety programs.",
    pricing: "$89-599",
    icon: BookOpen,
    badge: "Free for Veterans",
    cta: "Start Learning",
    link: '/training#book',
    basePrice: 89,
  },
  {
    id: 3,
    title: "AI for Business",
    description: "AI Service Insurance. Customer protection systems. Compliance consulting. Custom AI solutions.",
    pricing: "Custom Pricing",
    icon: Briefcase,
    badge: "Industry First!",
    cta: "Protect My Business",
    link: '/contact?service=business',
    basePrice: 5000,
  }
];

const ThreePathsForward = () => {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.2 });

  const getAnimationClass = (index: number) => {
    const baseClasses = "transition-all duration-[600ms] ease-out";
    
    if (!isVisible) {
      // Starting state based on card position
      if (index === 0) return `${baseClasses} opacity-0 -translate-x-[30px]`; // from left
      if (index === 1) return `${baseClasses} opacity-0 translate-y-[30px]`; // from bottom
      if (index === 2) return `${baseClasses} opacity-0 translate-x-[30px]`; // from right
    }
    
    // Ending state
    return `${baseClasses} opacity-100 translate-x-0 translate-y-0`;
  };

  const getAnimationDelay = (index: number) => {
    if (index === 1) return '200ms';
    if (index === 2) return '400ms';
    return '0ms';
  };

  return (
    <section className="py-12 md:py-16 lg:py-20 relative overflow-hidden bg-gradient-to-br from-secondary via-card to-teal-100">
      {/* Background blobs */}
      <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full bg-gradient-to-br from-primary to-accent opacity-10 blur-[80px] animate-blob-morph" />
      <div className="absolute bottom-[-80px] right-[-80px] w-[250px] h-[250px] md:w-[350px] md:h-[350px] rounded-full bg-gradient-to-br from-accent to-teal-500 opacity-10 blur-[80px] animate-float-slow" style={{ animationDelay: '5s', animationDirection: 'reverse' }} />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16 animate-fade-in-up px-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 gradient-text-primary">
            Complete Protection for Every Family
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose the protection and empowerment that fits your needs - from personal AI security training to business automation solutions.
          </p>
        </div>

        {/* Cards Grid - Fully responsive with proper mobile stacking */}
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10 pt-6 md:pt-8">
          {paths.map((path, index) => {
            const Icon = path.icon;
            return (
              <div 
                key={path.id} 
                className={`relative ${getAnimationClass(index)}`}
                style={{ transitionDelay: getAnimationDelay(index) }}
              >
                {/* Featured/Badge - Above the card */}
                {path.featured && (
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-accent text-white px-4 sm:px-6 py-1.5 sm:py-2 rounded-full text-xs font-bold tracking-wider shadow-lg z-20">
                    MOST POPULAR
                  </div>
                )}
                {path.badge && !path.featured && (
                  <div className={`absolute -top-5 left-1/2 -translate-x-1/2 px-4 sm:px-6 py-1.5 sm:py-2 rounded-full text-xs font-bold tracking-wider shadow-lg z-20 ${
                    path.badge === "Free for Veterans" 
                      ? "bg-destructive text-white" 
                      : "bg-gradient-to-r from-cyan-500 to-accent text-white"
                  }`}>
                    {path.badge}
                  </div>
                )}
                <Card
                  className={`
                    relative p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col items-center text-center overflow-visible
                    transition-all duration-600 ease-out rounded-3xl
                    bg-white
                    ${path.featured 
                      ? 'border-[3px] border-primary shadow-[0_8px_30px_rgba(139,92,246,0.2)]' 
                      : 'border-2 border-border shadow-soft'}
                    hover:-translate-y-4 hover:scale-[1.02] ${path.featured ? 'hover:shadow-[0_16px_50px_rgba(139,92,246,0.3)]' : 'hover:shadow-medium'}
                    hover:border-primary hover:rotate-1
                    hover:after:opacity-100 after:transition-opacity after:duration-500
                  `}
                >

                {/* Icon Container - purple/teal gradient */}
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-[100px] md:h-[100px] rounded-2xl sm:rounded-3xl mb-5 sm:mb-7
                  bg-gradient-to-br from-primary to-accent
                  shadow-[0_8px_24px_rgba(139,92,246,0.4)]
                  flex items-center justify-center
                  transition-all duration-600 ease-out hover:scale-[1.2] hover:rotate-[-10deg]
                  hover:shadow-[0_12px_35px_rgba(139,92,246,0.6)]
                  after:absolute after:inset-[-6px] sm:after:inset-[-8px] after:rounded-2xl sm:after:rounded-[28px]
                  after:border-2 after:border-primary/40
                  after:animate-[pulse-ring_3s_ease-out_infinite]
                ">
                  <Icon className="w-8 h-8 sm:w-10 sm:h-10 md:w-14 md:h-14 text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.2)] transition-transform duration-500" />
                </div>

                {/* Content */}
                <h3 className="text-xl sm:text-2xl md:text-[28px] font-extrabold mb-3 sm:mb-4 text-foreground tracking-tight transition-colors duration-300 group-hover:text-primary">
                  {path.title}
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground mb-5 sm:mb-7 flex-grow leading-relaxed">
                  {path.description}
                </p>

                {/* Pricing */}
                <div className="text-lg sm:text-xl font-extrabold gradient-text-primary mb-4 sm:mb-6 px-4 sm:px-6 py-2 sm:py-3 rounded-xl 
                  bg-primary/10
                  border border-primary/20
                  transition-all duration-500
                  hover:bg-primary/15 hover:scale-105">
                  {path.pricing}
                </div>

                {/* CTA Button */}
                <Button
                  asChild
                  variant={path.featured ? "default" : "outline"}
                  className="w-full text-sm sm:text-base font-bold uppercase tracking-wide transition-transform duration-300 ease-out hover:-translate-y-[2px] hover:shadow-lg active:translate-y-[1px]"
                >
                  <Link to={path.link}>
                    {path.cta}
                  </Link>
                </Button>
              </Card>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ThreePathsForward;
