import { Shield, Award, CheckCircle, Lock } from "lucide-react";

const TrustBadges = () => {
  const badges = [
    {
      icon: Shield,
      title: "Privacy Certified",
      description: "100% Privacy-First Protocol"
    },
    {
      icon: Award,
      title: "Expert Training",
      description: "Cybersecurity Professional-Led"
    },
    {
      icon: CheckCircle,
      title: "Proven Results",
      description: "500+ Families Protected"
    },
    {
      icon: Lock,
      title: "Secure Platform",
      description: "Bank-Level Security"
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
          <h2 className="text-3xl font-bold mb-2">Trusted & Certified</h2>
          <p className="text-muted-foreground">Your security and privacy are our top priorities</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {badges.map((badge, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 rounded-2xl bg-gradient-to-br from-card to-card/50 backdrop-blur-sm border border-border/50 hover:border-accent/50 hover:shadow-strong transition-all duration-500 hover:-translate-y-2 hover:scale-105 group animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                <badge.icon className="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-300" aria-hidden="true" />
              </div>
              <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors duration-300">{badge.title}</h3>
              <p className="text-sm text-muted-foreground">{badge.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
