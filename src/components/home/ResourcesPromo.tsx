import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileText, Shield, BookOpen, ArrowRight, Download } from "lucide-react";
import securityProtectionTools from "@/assets/security-protection-tools.jpg";

const resources = [
  { icon: Shield, title: "Cyber Insurance", description: "Coverage up to $1M for identity theft and cyber fraud.", tag: "Popular", gradient: "from-primary to-accent" },
  { icon: FileText, title: "Emergency Scripts", description: "Free PDF scripts for IRS, tech support, and bank scams.", tag: "Free", gradient: "from-accent to-primary" },
  { icon: BookOpen, title: "Digital Guides", description: "30+ guides on AI, scam prevention, and digital safety.", tag: "New", gradient: "from-primary to-primary" },
];

export const ResourcesPromo = () => {
  return (
    <section className="py-16 lg:py-20" aria-labelledby="resources-heading">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12 max-w-5xl mx-auto">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/20 bg-accent/5 mb-5">
              <span className="w-2 h-2 rounded-full bg-gradient-to-r from-accent to-primary" />
              <span className="text-xs font-bold uppercase tracking-[0.15em] text-primary">Resources</span>
            </div>
            <h2 id="resources-heading" className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground leading-tight mb-3">
              Tools For{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Protection</span>
            </h2>
            <p className="text-muted-foreground text-base">
              From insurance coverage to free educational materials. Everything you need to stay protected.
            </p>
          </div>
          <Button asChild size="lg" className="h-12 px-8 text-sm font-bold rounded-full bg-gradient-to-r from-primary to-accent text-white hover:opacity-90">
            <Link to="/resources">Browse All <ArrowRight className="ml-2 w-4 h-4" /></Link>
          </Button>
        </div>

        {/* Two Column */}
        <div className="grid lg:grid-cols-2 gap-8 mb-10 max-w-5xl mx-auto">
          {/* Image */}
          <div className="relative rounded-2xl overflow-hidden border border-border/60 shadow-lg">
            <img src={securityProtectionTools} alt="Digital security protection tools"
              className="aspect-[4/3] w-full object-cover" width={600} height={450} loading="lazy" decoding="async" />
            <div className="absolute bottom-4 left-4 right-4 bg-card/90 backdrop-blur-sm rounded-xl p-4 border border-border/40">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Resources Available</div>
                  <div className="text-2xl font-black text-foreground">50+</div>
                </div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Resource Cards */}
          <div className="grid gap-4" role="list" aria-label="Available resources">
            {resources.map((resource) => (
              <Link key={resource.title} to="/resources" className="group block" role="listitem">
                <div className="flex items-center gap-4 p-5 rounded-2xl bg-card border border-border/60 hover:border-primary/30 hover:shadow-md transition-all duration-300">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${resource.gradient} flex items-center justify-center flex-shrink-0`}>
                    <resource.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-base font-bold text-foreground">{resource.title}</h3>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-primary/10 text-primary">{resource.tag}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{resource.description}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground/40 flex-shrink-0 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Download Banner */}
        <div className="max-w-5xl mx-auto p-5 rounded-2xl border border-border/60 bg-card flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Download className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-base font-bold text-foreground">Free Emergency Anti-Scam Scripts</div>
              <div className="text-sm text-muted-foreground">IRS • Tech Support • Grandparent • Bank Fraud</div>
            </div>
          </div>
          <Button asChild size="lg" className="h-12 px-6 text-sm font-bold rounded-full bg-gradient-to-r from-primary to-accent text-white hover:opacity-90">
            <Link to="/resources">Download Free <ArrowRight className="ml-2 w-4 h-4" /></Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
