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
    <section className="py-20 relative overflow-hidden bg-gradient-to-br from-[hsl(220,14%,98%)] via-[hsl(220,13%,95%)] to-[hsl(220,9%,92%)]">
      {/* Background blobs - subtle neutral */}
      <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] rounded-full bg-gradient-to-br from-[hsl(32,95%,48%)] to-[hsl(38,92%,50%)] opacity-10 blur-[60px] animate-blob-float" />
      <div className="absolute bottom-[-80px] right-[-80px] w-[350px] h-[350px] rounded-full bg-gradient-to-br from-[hsl(38,92%,50%)] to-[hsl(43,96%,56%)] opacity-10 blur-[60px]" style={{ animationDelay: '5s', animation: 'blob-float 30s ease-in-out infinite reverse' }} />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-5xl font-extrabold mb-4 text-[hsl(220,9%,14%)]">
            Three Paths Forward
          </h2>
          <p className="text-xl text-[hsl(215,20%,45%)] max-w-2xl mx-auto">
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
                  bg-white
                  ${path.featured 
                    ? 'border-[3px] border-[hsl(32,95%,48%)] shadow-[0_8px_30px_rgba(245,158,11,0.15)]' 
                    : 'border-2 border-[hsl(220,13%,91%)] shadow-[0_4px_20px_rgba(0,0,0,0.08)]'}
                  hover:-translate-y-3 ${path.featured ? 'hover:shadow-[0_16px_50px_rgba(245,158,11,0.25)]' : 'hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)]'}
                  hover:border-[hsl(32,95%,48%)]
                  animate-fade-in-up
                  before:absolute before:top-0 before:left-0 before:w-full before:h-1
                  before:bg-gradient-to-r before:from-[hsl(32,95%,48%)] before:to-[hsl(38,92%,50%)]
                  before:scale-x-0 before:origin-left before:transition-transform before:duration-400
                  hover:before:scale-x-100
                `}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Featured Badge */}
                {path.featured && (
                  <div className="absolute -top-[18px] left-1/2 -translate-x-1/2 bg-gradient-to-r from-[hsl(32,95%,48%)] to-[hsl(38,92%,50%)] text-white px-7 py-2.5 rounded-full text-[13px] font-extrabold tracking-[1.5px] shadow-[0_6px_20px_rgba(245,158,11,0.4)] animate-pulse">
                    MOST POPULAR
                  </div>
                )}

                {/* Icon Container - blue gradient */}
                <div className="relative w-[100px] h-[100px] rounded-3xl mb-7
                  bg-gradient-to-br from-[hsl(217,91%,60%)] to-[hsl(221,83%,53%)]
                  shadow-[0_8px_24px_rgba(59,130,246,0.35)]
                  flex items-center justify-center
                  transition-all duration-400 hover:scale-110 hover:rotate-[-5deg]
                  hover:shadow-[0_12px_32px_rgba(59,130,246,0.45)]
                  after:absolute after:inset-[-8px] after:rounded-[28px]
                  after:border-2 after:border-[hsl(217,91%,60%)]/30
                  after:animate-pulse-ring
                ">
                  <Icon className="w-14 h-14 text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.15)]" />
                </div>

                {/* Content */}
                <h3 className="text-[28px] font-extrabold mb-4 text-[hsl(220,9%,14%)] tracking-tight">
                  {path.title}
                </h3>
                <p className="text-base text-[hsl(215,16%,47%)] mb-7 flex-grow leading-relaxed">
                  {path.description}
                </p>

                {/* Pricing */}
                <div className="text-xl font-extrabold text-[hsl(32,95%,48%)] mb-6 px-6 py-3 rounded-xl 
                  bg-[hsl(32,95%,48%)]/10
                  border border-[hsl(32,95%,48%)]/20">
                  {path.pricing}
                </div>

                {/* CTA Button */}
                <Button
                  asChild
                  className={`
                    w-full text-base font-bold uppercase tracking-wide
                    transition-all duration-300 hover:-translate-y-0.5
                    relative overflow-hidden group
                    ${path.featured 
                      ? 'bg-gradient-to-r from-[hsl(32,95%,48%)] to-[hsl(38,92%,50%)] hover:from-[hsl(38,92%,50%)] hover:to-[hsl(43,96%,56%)] shadow-[0_4px_16px_rgba(245,158,11,0.35)] hover:shadow-[0_8px_28px_rgba(245,158,11,0.5)] text-[hsl(205,87%,21%)] font-extrabold' 
                      : 'bg-gradient-to-r from-[hsl(205,87%,21%)] to-[hsl(199,89%,48%)] hover:from-[hsl(199,89%,48%)] hover:to-[hsl(205,87%,28%)] shadow-[0_4px_16px_rgba(30,58,95,0.3)] hover:shadow-[0_8px_24px_rgba(30,58,95,0.4)] text-white'}
                    border-0
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
