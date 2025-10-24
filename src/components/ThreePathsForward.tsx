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
    <section className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text-primary">
            Three Paths Forward
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
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
                  transition-all duration-300
                  ${path.featured 
                    ? 'border-2 border-primary shadow-lg scale-105 bg-card' 
                    : 'border border-border shadow-sm bg-card hover:shadow-md'}
                  hover:-translate-y-2
                  animate-fade-in
                `}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Featured Badge */}
                {path.featured && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-accent text-primary-foreground px-6 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-md">
                    Most Popular
                  </div>
                )}

                {/* Icon */}
                <div className={`
                  w-16 h-16 rounded-full mb-6
                  flex items-center justify-center
                  ${path.featured 
                    ? 'bg-gradient-to-br from-primary to-accent' 
                    : 'bg-primary/10'}
                  transition-transform duration-300 hover:scale-110
                `}>
                  <Icon className={`w-8 h-8 ${path.featured ? 'text-primary-foreground' : 'text-primary'}`} />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold mb-3 text-foreground">
                  {path.title}
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed flex-grow">
                  {path.description}
                </p>

                {/* Pricing */}
                <div className="text-xl font-bold text-primary mb-6">
                  {path.pricing}
                </div>

                {/* CTA Button */}
                <Button
                  asChild
                  variant={path.featured ? "default" : "outline"}
                  size="lg"
                  className="w-full font-semibold"
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
