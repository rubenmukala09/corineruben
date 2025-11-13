import { BookOpen, Shield, Briefcase } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { useNavigate } from "react-router-dom";

interface PathConfig {
  id: number;
  title: string;
  description: string;
  pricing: string;
  icon: typeof BookOpen;
  featured?: boolean;
  cta: string;
  serviceType: 'training' | 'scamshield' | 'business';
  basePrice: number;
}

const paths: PathConfig[] = [
  {
    id: 1,
    title: "Learn & Train",
    description: "Live Zoom classes & in-person training. Spot deepfakes, verify identities, handle urgent calls with confidence.",
    pricing: "Starting at $79",
    icon: BookOpen,
    cta: "Book Training",
    serviceType: 'training',
    basePrice: 79,
  },
  {
    id: 2,
    title: "Family Scam Shield",
    description: "Forward suspicious emails, texts, links, QR codes. Get expert analysis within 24-48 hours.",
    pricing: "Starting at $39/month",
    icon: Shield,
    featured: true,
    cta: "Get Protection",
    serviceType: 'scamshield',
    basePrice: 39,
  },
  {
    id: 3,
    title: "AI for Business",
    description: "Custom AI receptionists, automation, and pre-purchase vetting. Don't waste $5k+ on wrong tools.",
    pricing: "Custom Pricing",
    icon: Briefcase,
    cta: "Talk to an Expert",
    serviceType: 'business',
    basePrice: 5000,
  }
];

const ThreePathsForward = () => {
  const navigate = useNavigate();

  const handlePathClick = (path: PathConfig) => {
    switch (path.serviceType) {
      case 'training':
        navigate('/training#training');
        break;
      case 'scamshield':
        navigate('/training#pricing');
        break;
      case 'business':
        navigate('/business');
        break;
    }
  };

  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-br from-[hsl(250,20%,96%)] via-white to-[hsl(180,50%,98%)]">
      {/* Background blobs */}
      <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] rounded-full bg-gradient-to-br from-primary to-accent opacity-10 blur-[80px] animate-blob-morph" />
      <div className="absolute bottom-[-80px] right-[-80px] w-[350px] h-[350px] rounded-full bg-gradient-to-br from-accent to-[hsl(180,75%,50%)] opacity-10 blur-[80px] animate-float-slow" style={{ animationDelay: '5s', animationDirection: 'reverse' }} />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-5xl font-extrabold mb-4 gradient-text-primary">
            Three Paths Forward
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose the protection and empowerment that fits your needs—from personal AI security training to business automation solutions.
          </p>
        </div>

        {/* Cards Grid - With proper spacing for badges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 pt-8">
          {paths.map((path, index) => {
            const Icon = path.icon;
            return (
              <div key={path.id} className="relative">
                {/* Featured Badge - Above the card */}
                {path.featured && (
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-accent text-white px-6 py-2 rounded-full text-xs font-bold tracking-wider shadow-lg z-20">
                    MOST POPULAR
                  </div>
                )}
                <Card
                  className={`
                    relative p-12 flex flex-col items-center text-center overflow-visible
                    transition-all duration-600 ease-out rounded-3xl
                    bg-white
                    ${path.featured 
                      ? 'border-[3px] border-primary shadow-[0_8px_30px_rgba(139,92,246,0.2)]' 
                      : 'border-2 border-border shadow-soft'}
                    hover:-translate-y-4 hover:scale-[1.02] ${path.featured ? 'hover:shadow-[0_16px_50px_rgba(139,92,246,0.3)]' : 'hover:shadow-medium'}
                    hover:border-primary hover:rotate-1
                    animate-fade-in-up
                    hover:after:opacity-100 after:transition-opacity after:duration-500
                  `}
                  style={{ animationDelay: `${index * 150}ms` }}
                >

                {/* Icon Container - purple/teal gradient */}
                <div className="relative w-[100px] h-[100px] rounded-3xl mb-7
                  bg-gradient-to-br from-primary to-accent
                  shadow-[0_8px_24px_rgba(139,92,246,0.4)]
                  flex items-center justify-center
                  transition-all duration-600 ease-out hover:scale-[1.2] hover:rotate-[-10deg]
                  hover:shadow-[0_12px_35px_rgba(139,92,246,0.6)]
                  after:absolute after:inset-[-8px] after:rounded-[28px]
                  after:border-2 after:border-primary/40
                  after:animate-[pulse-ring_3s_ease-out_infinite]
                ">
                  <Icon className="w-14 h-14 text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.2)] transition-transform duration-500" />
                </div>

                {/* Content */}
                <h3 className="text-[28px] font-extrabold mb-4 text-foreground tracking-tight transition-colors duration-300 group-hover:text-primary">
                  {path.title}
                </h3>
                <p className="text-base text-muted-foreground mb-7 flex-grow leading-relaxed">
                  {path.description}
                </p>

                {/* Pricing */}
                <div className="text-xl font-extrabold gradient-text-primary mb-6 px-6 py-3 rounded-xl 
                  bg-primary/10
                  border border-primary/20
                  transition-all duration-500
                  hover:bg-primary/15 hover:scale-105">
                  {path.pricing}
                </div>

                {/* CTA Button */}
                <Button
                  onClick={() => handlePathClick(path)}
                  variant={path.featured ? "default" : "outline"}
                  className="w-full text-base font-bold uppercase tracking-wide"
                >
                  {path.cta}
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
