import { Linkedin, Mail } from "lucide-react";

const team = [
  {
    name: "Marcus Chen",
    role: "Security Director",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
    bio: "Former FBI cybercrime specialist with 15+ years protecting families.",
  },
  {
    name: "Sarah Williams",
    role: "Training Lead",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop&crop=face",
    bio: "Educator specializing in senior-friendly security awareness.",
  },
  {
    name: "David Park",
    role: "Tech Analyst",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
    bio: "AI and machine learning expert focused on scam detection.",
  },
];

export const TeamShowcase = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Meet Our Expert Team
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Dedicated professionals committed to protecting Ohio families from digital threats.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {team.map((member) => (
            <div
              key={member.name}
              className="bg-muted/30 rounded-2xl p-6 text-center hover:shadow-lg transition-shadow border border-border/50"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-background shadow-md"
              />
              <h3 className="text-lg font-semibold text-foreground">{member.name}</h3>
              <p className="text-primary text-sm mb-3">{member.role}</p>
              <p className="text-muted-foreground text-sm mb-4">{member.bio}</p>
              <div className="flex justify-center gap-3">
                <button className="p-2 rounded-full bg-background hover:bg-primary hover:text-primary-foreground transition-colors">
                  <Linkedin className="w-4 h-4" />
                </button>
                <button className="p-2 rounded-full bg-background hover:bg-primary hover:text-primary-foreground transition-colors">
                  <Mail className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
