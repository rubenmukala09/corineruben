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
    link: "/scam-shield",
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

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {paths.map((path, index) => {
            const Icon = path.icon;
            return (
              <Card
                key={path.id}
                className={`
                  relative p-12 flex flex-col items-center text-center
                  transition-all duration-600 ease-out rounded-3xl
                  bg-white
                  ${path.featured 
                    ? 'border-[3px] border-primary shadow-[0_8px_30px_rgba(139,92,246,0.2)]' 
                    : 'border-2 border-border shadow-soft'}
                  hover:-translate-y-4 hover:scale-[1.02] ${path.featured ? 'hover:shadow-[0_16px_50px_rgba(139,92,246,0.3)]' : 'hover:shadow-medium'}
                  hover:border-primary hover:rotate-1
                  animate-fade-in-up
                  before:absolute before:top-0 before:left-0 before:w-full before:h-1 before:rounded-t-3xl
                  before:bg-gradient-to-r before:from-primary before:via-accent before:to-primary
                  before:scale-x-0 before:origin-left before:transition-transform before:duration-500
                  hover:before:scale-x-100
                  after:absolute after:inset-0 after:rounded-3xl after:opacity-0
                  after:bg-gradient-to-br after:from-primary/5 after:to-accent/5
                  hover:after:opacity-100 after:transition-opacity after:duration-500
                `}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Featured Badge */}
                {path.featured && (
                  <div className="absolute -top-[18px] left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-accent text-white px-7 py-2.5 rounded-full text-[13px] font-extrabold tracking-[1.5px] shadow-[0_6px_20px_rgba(139,92,246,0.4)] animate-[badge-float_3s_ease-in-out_infinite]">
                    MOST POPULAR
                  </div>
                )}

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
                  asChild
                  variant={path.featured ? "default" : "outline"}
                  className="w-full text-base font-bold uppercase tracking-wide"
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
