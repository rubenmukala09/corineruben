import { BookOpen, Shield, Briefcase } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Link } from "react-router-dom";

const paths = [
  {
    id: 1,
    title: "Learn & Train",
    description: "Live Zoom classes & in-person training. Spot deepfakes, verify identities, handle urgent calls with confidence.",
    pricing: "Starting at $149",
    icon: BookOpen,
    link: "/training",
    cta: "Book Training"
  },
  {
    id: 2,
    title: "Family Scam Shield",
    description: "Forward suspicious emails, texts, links, QR codes. Get expert analysis within 24-48 hours.",
    pricing: "Starting at $49/month",
    icon: Shield,
    featured: true,
    link: "/training",
    cta: "Start Scam Shield"
  },
  {
    id: 3,
    title: "AI for Business",
    description: "Custom AI receptionists, automation, and pre-purchase vetting. Don't waste $5k+ on wrong tools.",
    pricing: "Starting at $5,000",
    icon: Briefcase,
    link: "/business",
    cta: "Talk to an Expert"
  }
];

const ThreePathsForward = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background via-muted/30 to-background relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none opacity-50">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-block mb-4">
            <span className="text-sm font-semibold tracking-wider uppercase text-primary bg-primary/10 px-4 py-2 rounded-full">
              Your Protection Options
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Three Paths Forward
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Choose the protection and empowerment that fits your needs—from personal AI security training to business automation solutions.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {paths.map((path, index) => {
            const Icon = path.icon;
            return (
              <Card
                key={path.id}
                className={`
                  relative p-8 flex flex-col items-center text-center
                  transition-all duration-500 group
                  ${path.featured 
                    ? 'border-2 border-primary shadow-2xl shadow-primary/20 scale-105 bg-gradient-to-b from-card to-card/50 backdrop-blur-sm' 
                    : 'border border-border/50 shadow-lg bg-gradient-to-b from-card to-background hover:shadow-xl hover:shadow-primary/10'}
                  hover:-translate-y-3 hover:border-primary/50
                  animate-fade-in
                  overflow-hidden
                `}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Card Glow Effect */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${path.featured ? 'bg-gradient-to-br from-primary/5 to-accent/5' : 'bg-gradient-to-br from-primary/3 to-transparent'}`} />
                
                {/* Featured Badge */}
                {path.featured && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary via-accent to-primary text-primary-foreground px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg shadow-primary/30 animate-pulse">
                    <span className="relative z-10">Most Popular</span>
                  </div>
                )}

                {/* Icon */}
                <div className={`
                  relative w-20 h-20 rounded-full mb-6
                  flex items-center justify-center
                  ${path.featured 
                    ? 'bg-gradient-to-br from-primary via-accent to-primary shadow-lg shadow-primary/30' 
                    : 'bg-gradient-to-br from-primary/10 to-primary/5'}
                  transition-all duration-500 group-hover:scale-110 group-hover:rotate-6
                  z-10
                `}>
                  {/* Icon Ring Effect */}
                  <div className={`absolute inset-0 rounded-full ${path.featured ? 'border-2 border-primary-foreground/20' : 'border border-primary/20'} group-hover:scale-125 transition-transform duration-500`} />
                  <Icon className={`w-10 h-10 relative z-10 ${path.featured ? 'text-primary-foreground' : 'text-primary'} transition-transform duration-300 group-hover:scale-110`} />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold mb-3 text-foreground relative z-10 group-hover:text-primary transition-colors duration-300">
                  {path.title}
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed flex-grow relative z-10 text-base">
                  {path.description}
                </p>

                {/* Pricing */}
                <div className="relative z-10 mb-6 px-4 py-2 rounded-lg bg-primary/10 border border-primary/20">
                  <p className="text-sm text-muted-foreground uppercase tracking-wide mb-1">Starting at</p>
                  <div className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    {path.pricing.replace('Starting at ', '')}
                  </div>
                </div>

                {/* CTA Button */}
                <Button
                  asChild
                  variant={path.featured ? "default" : "outline"}
                  size="lg"
                  className={`
                    w-full font-semibold relative z-10 group-hover:shadow-lg transition-all duration-300
                    ${path.featured ? 'shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40' : 'hover:border-primary hover:text-primary'}
                  `}
                >
                  <Link to={path.link}>
                    {path.cta}
                  </Link>
                </Button>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ThreePathsForward;
