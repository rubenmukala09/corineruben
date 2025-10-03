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
    <section className="py-20 relative overflow-hidden bg-gradient-to-br from-[hsl(199,89%,94%)] via-[hsl(199,89%,87%)] to-[hsl(199,89%,81%)]">
      {/* Background blobs - blue theme */}
      <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] rounded-full bg-gradient-to-br from-[hsl(199,89%,62%)] to-[hsl(217,91%,60%)] opacity-20 blur-[60px] animate-blob-float" />
      <div className="absolute bottom-[-80px] right-[-80px] w-[350px] h-[350px] rounded-full bg-gradient-to-br from-[hsl(199,95%,74%)] to-[hsl(199,89%,77%)] opacity-20 blur-[60px]" style={{ animationDelay: '5s', animation: 'blob-float 30s ease-in-out infinite reverse' }} />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-[hsl(205,87%,21%)] via-[hsl(199,89%,48%)] to-[hsl(199,91%,54%)] bg-clip-text text-transparent">
            Three Paths Forward
          </h2>
          <p className="text-xl text-[hsl(205,87%,21%)] max-w-2xl mx-auto">
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
                  transition-all duration-500
                  bg-gradient-to-br from-white/95 to-[hsl(199,100%,97%)]/95
                  backdrop-blur-sm
                  ${path.featured 
                    ? 'border-2 border-[hsl(199,89%,62%)]/40 shadow-[0_15px_50px_rgba(14,165,233,0.2)]' 
                    : 'border border-[hsl(199,89%,62%)]/20 shadow-[0_10px_40px_rgba(12,74,110,0.12)]'}
                  hover:-translate-y-3 hover:shadow-[0_20px_60px_rgba(12,74,110,0.18)]
                  hover:border-[hsl(199,89%,62%)]/40
                  animate-fade-in-up
                  before:absolute before:top-0 before:left-0 before:w-full before:h-1
                  before:bg-gradient-to-r before:from-[hsl(199,89%,62%)] before:via-[hsl(217,91%,60%)] before:to-[hsl(199,95%,74%)]
                  before:scale-x-0 before:origin-left before:transition-transform before:duration-400
                  hover:before:scale-x-100
                `}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Featured Badge */}
                {path.featured && (
                  <div className="absolute -top-[18px] left-1/2 -translate-x-1/2 bg-gradient-to-r from-[hsl(199,91%,54%)] to-[hsl(199,89%,62%)] text-white px-7 py-2.5 rounded-full text-[13px] font-extrabold tracking-[1.5px] shadow-[0_6px_20px_rgba(14,165,233,0.4)] animate-pulse">
                    MOST POPULAR
                  </div>
                )}

                {/* Icon Container - uniform blue gradient */}
                <div className="relative w-[100px] h-[100px] rounded-3xl mb-7
                  bg-gradient-to-br from-[hsl(199,89%,62%)] to-[hsl(199,91%,54%)]
                  shadow-[0_8px_24px_rgba(14,165,233,0.35)]
                  flex items-center justify-center
                  transition-all duration-400 hover:scale-110 hover:rotate-[-5deg]
                  hover:shadow-[0_12px_32px_rgba(14,165,233,0.45)]
                  after:absolute after:inset-[-8px] after:rounded-[28px]
                  after:border-2 after:border-[hsl(199,89%,62%)]/30
                  after:animate-pulse-ring
                ">
                  <Icon className="w-14 h-14 text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.15)]" />
                </div>

                {/* Content */}
                <h3 className="text-[28px] font-extrabold mb-4 text-[hsl(205,87%,21%)] tracking-tight">
                  {path.title}
                </h3>
                <p className="text-base text-[hsl(215,20%,45%)] mb-7 flex-grow leading-relaxed">
                  {path.description}
                </p>

                {/* Pricing */}
                <div className="text-xl font-extrabold text-[hsl(199,89%,48%)] mb-6 px-6 py-3 rounded-xl 
                  bg-gradient-to-br from-[hsl(199,89%,62%)]/10 to-[hsl(199,97%,85%)]/10
                  border border-[hsl(199,89%,62%)]/20">
                  {path.pricing}
                </div>

                {/* CTA Button - uniform navy-blue gradient */}
                <Button
                  asChild
                  className={`
                    w-full text-base font-bold uppercase tracking-wide
                    transition-all duration-300 hover:-translate-y-0.5
                    relative overflow-hidden group
                    ${path.featured 
                      ? 'bg-gradient-to-r from-[hsl(199,91%,54%)] to-[hsl(199,89%,62%)] hover:from-[hsl(199,89%,62%)] hover:to-[hsl(199,97%,85%)] shadow-[0_4px_16px_rgba(14,165,233,0.35)] hover:shadow-[0_8px_28px_rgba(14,165,233,0.5)]' 
                      : 'bg-gradient-to-r from-[hsl(205,87%,21%)] to-[hsl(199,89%,48%)] hover:from-[hsl(199,89%,48%)] hover:to-[hsl(199,91%,54%)] shadow-[0_4px_16px_rgba(12,74,110,0.3)] hover:shadow-[0_8px_24px_rgba(14,165,233,0.4)]'}
                    text-white border-0
                    rounded-[14px] py-[18px] px-8
                  `}
                >
                  <Link to={path.link}>
                    {/* Shimmer effect */}
                    <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
                    <span className="relative">{path.cta}</span>
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
