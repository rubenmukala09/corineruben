import { Shield, Award, CheckCircle, Lock, Star, Users, Clock, Zap } from "lucide-react";

const TrustBadges = () => {
  const badges = [
    {
      icon: Shield,
      title: "Privacy Certified",
      description: "100% Privacy-First Protocol",
      emoji: "🔐",
      gradient: "from-primary/20 to-purple-500/20"
    },
    {
      icon: Award,
      title: "HIPAA Compliant",
      description: "Healthcare Data Protected",
      emoji: "🏥",
      gradient: "from-blue-500/20 to-cyan-500/20"
    },
    {
      icon: Star,
      title: "Expert Training",
      description: "Cybersecurity Professional-Led",
      emoji: "⭐",
      gradient: "from-amber-500/20 to-orange-500/20"
    },
    {
      icon: Users,
      title: "Proven Results",
      description: "100+ Families Protected",
      emoji: "👨‍👩‍👧‍👦",
      gradient: "from-success/20 to-emerald-500/20"
    },
    {
      icon: Lock,
      title: "Secure Platform",
      description: "Bank-Level Security",
      emoji: "🔒",
      gradient: "from-accent/20 to-teal-500/20"
    }
  ];

  return (
    <section className="py-16 bg-background/50 backdrop-blur-sm border-y border-border/50 relative overflow-hidden" role="region" aria-label="Trust and certifications">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-20 w-64 h-64 bg-primary/30 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-20 w-72 h-72 bg-accent/30 rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-success/10 text-success border border-success/20 rounded-full text-sm font-medium mb-4">
            <CheckCircle className="w-4 h-4" />
            Verified & Certified
          </div>
          <h2 className="text-3xl font-bold mb-2">Trusted & Certified</h2>
          <p className="text-muted-foreground">Your security and privacy are our top priorities</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 max-w-7xl mx-auto">
          {badges.map((badge, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 rounded-2xl bg-gradient-to-br from-card to-card/50 backdrop-blur-sm border border-border/50 hover:border-accent/50 hover:shadow-strong transition-all duration-500 hover:-translate-y-2 hover:scale-105 group animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${badge.gradient} flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 relative`}>
                <badge.icon className="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-300" aria-hidden="true" />
                <span className="absolute -top-1 -right-1 text-lg">{badge.emoji}</span>
              </div>
              <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors duration-300">{badge.title}</h3>
              <p className="text-sm text-muted-foreground">{badge.description}</p>
              
              {/* Micro trust indicator */}
              <div className="mt-3 flex items-center gap-1 text-[10px] text-success">
                <CheckCircle className="w-3 h-3" />
                <span>Verified</span>
              </div>
            </div>
          ))}
        </div>
        
        {/* Additional Trust Row */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-amber-500" />
            Fast Response
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-primary" />
            24/7 Available
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Shield className="w-4 h-4 text-success" />
            Money-Back Guarantee
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Star className="w-4 h-4 text-amber-500" />
            5-Star Rated
          </span>
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
