import { Shield, Users, Award } from "lucide-react";

export const TeamShowcase = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Our Expert Team</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Dedicated cybersecurity professionals committed to keeping your family safe
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-card rounded-xl p-6 text-center border hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center bg-primary/10">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-semibold text-lg">Security Experts</h3>
            <p className="text-sm text-muted-foreground">Certified professionals protecting families from digital threats</p>
          </div>
          
          <div className="bg-card rounded-xl p-6 text-center border hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center bg-accent/10">
              <Users className="w-8 h-8 text-accent" />
            </div>
            <h3 className="font-semibold text-lg">Training Specialists</h3>
            <p className="text-sm text-muted-foreground">Educators making cybersecurity accessible to everyone</p>
          </div>
          
          <div className="bg-card rounded-xl p-6 text-center border hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center bg-emerald-500/10">
              <Award className="w-8 h-8 text-emerald-600" />
            </div>
            <h3 className="font-semibold text-lg">Community Advocates</h3>
            <p className="text-sm text-muted-foreground">Local team members serving Ohio communities</p>
          </div>
        </div>
      </div>
    </section>
  );
};
