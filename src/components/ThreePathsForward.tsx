import { BookOpen, Shield, Briefcase, Star, Zap, Award, CheckCircle, Lock, Clock, Users, Heart, TrendingUp } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Link } from "react-router-dom";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { PricingBadge, SecurityBadges, GuaranteeBadge } from "./PricingBadge";

interface PathConfig {
  id: number;
  title: string;
  description: string;
  pricing: string;
  icon: typeof BookOpen;
  featured?: boolean;
  badge?: string;
  badgeType?: 'popular' | 'best-value' | 'premium' | 'veteran' | 'new' | 'hot';
  cta: string;
  link: string;
  basePrice: number;
  highlights?: string[];
  trustBadge?: string;
}

const paths: PathConfig[] = [
  {
    id: 1,
    title: "ScamShield Protection",
    description: "• Live analysis of suspicious messages\n• Monthly Ohio-specific scam alerts\n• Family account protection\n• 'Ask before you click' hotline",
    pricing: "$39-129/month",
    icon: Shield,
    featured: true,
    badgeType: 'popular',
    cta: "Protect My Family",
    link: '/training#scamshield',
    basePrice: 39,
    highlights: ["24/7 Support", "AI-Powered"],
    trustBadge: "100+ Families Trust Us"
  },
  {
    id: 2,
    title: "Learn & Train",
    description: "• In-person Dayton workshops\n• Online courses in 3 languages\n• Family safety sessions\n• Corporate safety workshops",
    pricing: "$79-599",
    icon: BookOpen,
    badge: "10% Veteran Discount",
    badgeType: 'veteran',
    cta: "Start Learning",
    link: '/training#book',
    basePrice: 89,
    highlights: ["Live Instructors", "Certificates"],
    trustBadge: "Expert Trainers"
  },
  {
    id: 3,
    title: "AI for Business",
    description: "• AI Service Insurance\n• Customer protection systems\n• Compliance consulting\n• Custom AI solutions",
    pricing: "Custom Pricing",
    icon: Briefcase,
    badge: "Industry First!",
    badgeType: 'new',
    cta: "Protect My Business",
    link: '/contact?service=business',
    basePrice: 5000,
    highlights: ["Enterprise Ready", "24/7 Monitor"],
    trustBadge: "Fortune 500 Trusted"
  }
];

const ThreePathsForward = () => {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.2 });

  const getAnimationClass = (index: number) => {
    const baseClasses = "transition-all duration-[600ms] ease-out";
    
    if (!isVisible) {
      if (index === 0) return `${baseClasses} opacity-0 -translate-x-[30px]`;
      if (index === 1) return `${baseClasses} opacity-0 translate-y-[30px]`;
      if (index === 2) return `${baseClasses} opacity-0 translate-x-[30px]`;
    }
    
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
        {/* Section Header with Trust Indicators */}
        <div className="text-center mb-12 md:mb-16 animate-fade-in-up px-4">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-success/10 text-success border border-success/20 rounded-full text-sm font-medium">
              <Shield className="w-4 h-4" />
              Trusted by 500+ Ohio Families
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 gradient-text-primary">
            Complete Protection for Every Family
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
            Choose the protection and empowerment that fits your needs - from personal AI security training to business automation solutions.
          </p>
          
          {/* Trust Indicators Row */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <Lock className="w-4 h-4 text-success" />
              Bank-Level Security
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-success" />
              30-Day Guarantee
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-primary" />
              24/7 Support
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Award className="w-4 h-4 text-accent" />
              Expert Team
            </span>
          </div>
        </div>

        {/* Cards Grid */}
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10 pt-6 md:pt-8">
          {paths.map((path, index) => {
            const Icon = path.icon;
            return (
              <div 
                key={path.id} 
                className={`relative ${getAnimationClass(index)}`}
                style={{ transitionDelay: getAnimationDelay(index) }}
              >
                {/* Badge - Above the card */}
                {path.badgeType && (
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-20">
                    <PricingBadge type={path.badgeType} />
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
                  `}
                >
                  {/* Trust Badge Inside Card */}
                  {path.trustBadge && (
                    <div className="absolute top-3 right-3">
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-success/10 text-success text-[10px] font-semibold rounded-full border border-success/20">
                        <CheckCircle className="w-3 h-3" />
                        {path.trustBadge}
                      </span>
                    </div>
                  )}

                  {/* Icon Container */}
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

                  {/* Highlights Tags */}
                  {path.highlights && (
                    <div className="flex flex-wrap items-center justify-center gap-2 mb-3">
                      {path.highlights.map((highlight, idx) => (
                        <span 
                          key={idx}
                          className="inline-flex items-center gap-1 px-2 py-0.5 bg-primary/5 text-primary text-[11px] font-medium rounded-full border border-primary/10"
                        >
                          <Zap className="w-3 h-3" />
                          {highlight}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Content */}
                  <h3 className="text-xl sm:text-2xl md:text-[28px] font-extrabold mb-3 sm:mb-4 text-foreground tracking-tight">
                    {path.title}
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground mb-5 sm:mb-7 flex-grow leading-relaxed whitespace-pre-line">
                    {path.description}
                  </p>

                  {/* Pricing with Visual Enhancement */}
                  <div className="relative text-lg sm:text-xl font-extrabold gradient-text-primary mb-4 sm:mb-6 px-4 sm:px-6 py-2 sm:py-3 rounded-xl 
                    bg-primary/10
                    border border-primary/20
                    transition-all duration-500
                    hover:bg-primary/15 hover:scale-105">
                    <span className="relative z-10">{path.pricing}</span>
                    {path.featured && (
                      <span className="absolute -top-2 -right-2 text-lg">💎</span>
                    )}
                  </div>

                  {/* Security Mini-Badge */}
                  <div className="flex items-center gap-2 mb-4 text-xs text-muted-foreground">
                    <Lock className="w-3.5 h-3.5 text-success" />
                    <span>Secure Checkout</span>
                    <Shield className="w-3.5 h-3.5 text-success" />
                    <span>Money-Back Guarantee</span>
                  </div>

                  {/* CTA Button */}
                  <Button
                    asChild
                    variant={path.featured ? "default" : "outline"}
                    className="w-full text-sm sm:text-base font-bold uppercase tracking-wide transition-transform duration-300 ease-out hover:-translate-y-[2px] hover:shadow-lg active:translate-y-[1px]"
                  >
                    <Link to={path.link}>
                      {path.cta} →
                    </Link>
                  </Button>
                </Card>
              </div>
            );
          })}
        </div>

        {/* Bottom Trust Section */}
        <div className="mt-12 text-center">
          <SecurityBadges />
          <div className="mt-6">
            <GuaranteeBadge />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ThreePathsForward;
