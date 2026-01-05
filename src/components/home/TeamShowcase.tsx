import { Linkedin, Mail } from "lucide-react";

// Static team data with CSS avatar placeholders - no external images
const team = [
  {
    name: "Marcus Chen",
    role: "Security Director",
    initials: "MC",
    color: "bg-primary/20 text-primary",
    bio: "Former FBI cybercrime specialist with 15+ years protecting families."
  },
  {
    name: "Sarah Williams", 
    role: "Training Lead",
    initials: "SW",
    color: "bg-accent/20 text-accent",
    bio: "Educator specializing in senior-friendly security awareness."
  },
  {
    name: "David Park",
    role: "Tech Analyst",
    initials: "DP", 
    color: "bg-emerald-500/20 text-emerald-600",
    bio: "AI and machine learning expert focused on scam detection."
  }
];

export const TeamShowcase = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Meet Our Experts</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Dedicated professionals committed to keeping your family safe
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {team.map((member, i) => (
            <div 
              key={i}
              className="bg-card rounded-xl p-6 text-center border hover:shadow-lg transition-shadow"
            >
              {/* CSS Avatar - no image loading */}
              <div className={`w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center text-xl font-bold ${member.color}`}>
                {member.initials}
              </div>
              
              <h3 className="font-semibold text-lg">{member.name}</h3>
              <p className="text-sm text-primary mb-2">{member.role}</p>
              <p className="text-sm text-muted-foreground">{member.bio}</p>
              
              <div className="flex justify-center gap-3 mt-4">
                <button 
                  className="p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors"
                  aria-label={`View ${member.name}'s LinkedIn profile`}
                >
                  <Linkedin className="w-4 h-4" />
                </button>
                <button 
                  className="p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors"
                  aria-label={`Email ${member.name}`}
                >
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
