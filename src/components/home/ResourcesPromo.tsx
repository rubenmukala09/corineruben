import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileText, Shield, BookOpen, ArrowRight } from "lucide-react";

const resources = [
  { icon: Shield, title: "Cyber Insurance", description: "Coverage up to $1M for identity theft and cyber fraud.", tag: "Popular" },
  { icon: FileText, title: "Emergency Scripts", description: "Free PDF scripts for IRS, tech support, and bank scams.", tag: "Free" },
  { icon: BookOpen, title: "Digital Guides", description: "30+ guides on AI, scam prevention, and digital safety.", tag: "New" },
];

export const ResourcesPromo = () => {
  return (
    <section className="py-16 lg:py-24 relative overflow-hidden" aria-labelledby="resources-heading">
      {/* Background orbs */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-gradient-to-br from-primary/6 to-accent/4 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-gradient-to-br from-accent/5 to-primary/3 blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 max-w-6xl relative z-10">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left glass gradient column */}
          <div className="lg:row-span-2 relative rounded-3xl overflow-hidden">
            <div className="relative h-full p-8 lg:p-10 flex flex-col justify-between" style={{ background: 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(258 30% 38%) 50%, hsl(var(--accent)) 100%)' }}>
              {/* Glass orbs inside */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-[60px] pointer-events-none" />
              <div className="absolute bottom-10 left-0 w-32 h-32 bg-white/8 rounded-full blur-[40px] pointer-events-none" />
              
              {/* Noise */}
              <div className="absolute inset-0 pointer-events-none opacity-[0.04]" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`
              }} />

              <div className="absolute inset-0 rounded-3xl border border-white/15 pointer-events-none" />
              <div className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

              <div className="relative z-10">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/60 mb-4 block">Resources</span>
                <h2 id="resources-heading" className="text-3xl md:text-4xl font-black leading-[1.1] mb-4 text-white">
                  Tools For Your Protection
                </h2>
                <p className="text-white/70 text-base mb-8">
                  From insurance coverage to free educational materials, everything you need to stay safe online.
                </p>
              </div>
              <div className="relative z-10 space-y-3">
                <div className="text-5xl font-black text-white">50+</div>
                <div className="text-sm font-medium text-white/60">Resources Available</div>
                <Button asChild size="lg" className="h-12 px-8 text-sm font-bold rounded-full bg-white/90 backdrop-blur-sm text-primary hover:bg-white hover:scale-105 active:scale-95 transition-all mt-4 shadow-[0_8px_30px_rgba(255,255,255,0.2)]">
                  <Link to="/resources">Browse All <ArrowRight className="ml-2 w-4 h-4" /></Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Glass resource cards */}
          {resources.map((resource) => (
            <Link key={resource.title} to="/resources" className="group block">
              <div className="relative rounded-2xl overflow-hidden h-full">
                <div className="relative backdrop-blur-xl bg-card/70 border border-border/30 rounded-2xl p-6 h-full hover:border-primary/25 transition-all duration-500 hover:-translate-y-1" style={{ boxShadow: 'var(--skeuo-shadow-ombre)' }}>
                  {/* Hover glow */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{
                    background: 'radial-gradient(circle at 50% 0%, hsl(var(--primary) / 0.08) 0%, transparent 60%)'
                  }} />
                  <div className="absolute top-0 left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/15 to-accent/10 backdrop-blur-sm border border-primary/10 flex items-center justify-center group-hover:scale-110 group-hover:shadow-[0_0_15px_hsl(var(--primary)/0.2)] transition-all duration-300">
                        <resource.icon className="w-6 h-6 text-primary" />
                      </div>
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-primary/10 backdrop-blur-sm text-primary border border-primary/15">{resource.tag}</span>
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2">{resource.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{resource.description}</p>
                    <span className="inline-flex items-center text-sm font-semibold text-primary group-hover:text-accent transition-colors">
                      View Details <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}

          {/* Glass reading banner */}
          <div className="lg:col-span-2">
            <div className="relative rounded-2xl overflow-hidden">
              <div className="backdrop-blur-xl bg-card/60 border border-border/30 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4" style={{ boxShadow: 'var(--skeuo-shadow-ombre)' }}>
                <div className="absolute inset-0 rounded-2xl pointer-events-none" style={{
                  background: 'radial-gradient(ellipse 50% 80% at 0% 50%, hsl(var(--primary) / 0.06) 0%, transparent 50%)'
                }} />
                <div className="flex items-center gap-4 relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0 shadow-[0_4px_15px_hsl(var(--primary)/0.4)]">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-base font-bold text-foreground">Free Emergency Anti-Scam Scripts</div>
                    <div className="text-sm text-muted-foreground">IRS, Tech Support, Grandparent, Bank Fraud</div>
                  </div>
                </div>
                <Button asChild className="relative z-10 rounded-full bg-gradient-to-r from-primary to-accent text-white hover:opacity-90 hover:scale-105 active:scale-95 transition-all flex-shrink-0 shadow-[0_8px_30px_hsl(var(--primary)/0.3)]">
                  <Link to="/resources">Get Free Scripts <ArrowRight className="ml-2 w-4 h-4" /></Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
