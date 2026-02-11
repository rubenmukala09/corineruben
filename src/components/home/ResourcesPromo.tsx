import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileText, Shield, BookOpen, ArrowRight, Download, Sparkles } from "lucide-react";
import securityProtectionTools from "@/assets/security-protection-tools.jpg";

 const resources = [
   {
     icon: Shield,
     title: "Cyber Insurance",
     description: "Coverage up to $1M for identity theft and cyber fraud.",
     tag: "Popular",
     color: "#F8926A",
     bgGradient: "from-coral-50 to-coral-100",
   },
   {
     icon: FileText,
     title: "Emergency Scripts",
     description: "Free PDF scripts for IRS, tech support, and bank scams.",
     tag: "Free",
     color: "#BB81B5",
     bgGradient: "from-lavender-50 to-lavender-100",
   },
   {
     icon: BookOpen,
     title: "Digital Guides",
     description: "30+ guides on AI, scam prevention, and digital safety.",
     tag: "New",
     color: "#18305A",
     bgGradient: "from-blue-50 to-indigo-100",
   },
 ];

export const ResourcesPromo = () => {
  return (
    <section className="relative py-10 lg:py-14 overflow-hidden dynamic-gradient-overlay" style={{ background: 'linear-gradient(135deg, #ffffff 0%, #faf9f7 50%, #fff5f0 100%)' }} aria-labelledby="resources-heading">

      <div className="container mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border mb-4 shadow-sm bg-coral-50/50 border-coral-200/50 skeuo-badge">
              <Sparkles className="w-4 h-4 text-coral-500" aria-hidden="true" />
              <span className="text-sm font-semibold uppercase tracking-wide text-[#18305A]">Resources</span>
            </div>
            
            <h2 id="resources-heading" className="text-3xl md:text-4xl font-black leading-tight mb-3"
              style={{ fontFamily: "'Lora', 'Rubik', serif" }}>
              <span className="text-[#18305A]">Tools For </span>
              <span className="bg-gradient-to-r from-coral-500 to-lavender-500 bg-clip-text text-transparent">Protection</span>
            </h2>
            
            <p className="text-base text-foreground/70">
              From insurance coverage to free educational materials. Everything you need to stay protected.
            </p>
          </div>
          
          <Button asChild size="lg" 
            className="group h-12 px-6 text-sm font-bold rounded-full shadow-md hover:shadow-lg transition-shadow tactile-button"
            style={{ background: 'linear-gradient(135deg, #F8926A 0%, #BB81B5 100%)' }}>
            <Link to="/resources" className="text-white">
              Browse All
              <ArrowRight className="ml-2 w-4 h-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>

        {/* Two Column Layout - Image + Resources */}
        <div className="grid lg:grid-cols-2 gap-8 mb-10">
          {/* Left - Featured Image with 3D depth */}
          <div className="relative depth-layers micro-tilt-3d subtle-3d-surface">
            <div className="hover-img-zoom rounded-2xl">
              <img 
                src={securityProtectionTools}
                alt="Digital security protection tools and software"
                className="aspect-[4/3] shadow-3d-lg border-3 border-white rounded-2xl w-full h-full object-cover"
                width={600}
                height={450}
                loading="lazy"
                decoding="async"
              />
            </div>
            
            {/* Floating Badge - Widget Premium */}
            <div className="absolute bottom-4 left-4 right-4 widget-premium micro-scale">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-xs font-medium text-foreground/60 mb-0.5">Resources Available</div>
                  <div className="text-2xl font-black text-[#18305A]" style={{ fontFamily: "'Lora', serif" }}>50+</div>
                </div>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-3d"
                  style={{ background: 'linear-gradient(135deg, #F8926A 0%, #BB81B5 100%)' }} aria-hidden="true">
                  <Shield className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Right - Resources Grid with Bento styling */}
          <div className="grid gap-4" role="list" aria-label="Available resources">
          {resources.map((resource, i) => (
            <Link key={resource.title} to="/resources" className="group block" role="listitem">
              <div className="h-full p-4 rounded-xl glass-light shadow-3d hover-depth micro-scale flex items-center gap-4 micro-tilt-3d subtle-3d-surface"
                style={{ borderLeft: `4px solid ${resource.color}` }}>
                <div className="flex-shrink-0">
                  <div className="w-11 h-11 rounded-lg flex items-center justify-center shadow-3d float-3d"
                    style={{ background: `linear-gradient(135deg, ${resource.color} 0%, ${resource.color}dd 100%)` }} aria-hidden="true">
                    <resource.icon className="w-5 h-5 text-white" />
                 </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="text-base font-bold text-[#18305A]" style={{ fontFamily: "'Lora', serif" }}>
                      {resource.title}
                    </h3>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase glass-subtle"
                      style={{ background: `${resource.color}20`, color: resource.color }}>
                      {resource.tag}
                    </span>
                  </div>
                  <p className="text-sm text-foreground/65">{resource.description}</p>
                </div>
                
                <ArrowRight className="w-4 h-4 text-foreground/40 flex-shrink-0 micro-rotate" aria-hidden="true" />
              </div>
            </Link>
          ))}
          </div>
        </div>
        
        {/* Free download banner - Premium */}
        <div className="p-5 rounded-xl border shadow-md flex flex-col md:flex-row items-center justify-between gap-4 bg-gradient-to-r from-white to-coral-50/50 border-coral-200/30 subtle-3d-surface">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center shadow-sm"
              style={{ background: 'linear-gradient(135deg, #F8926A 0%, #BB81B5 100%)' }} aria-hidden="true">
              <Download className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-base font-bold text-[#18305A]">Free Emergency Anti-Scam Scripts</div>
              <div className="text-sm text-foreground/50">IRS • Tech Support • Grandparent • Bank Fraud</div>
            </div>
          </div>
          <Button asChild size="lg"
            className="h-10 px-5 text-sm font-bold rounded-full shadow-md tactile-button"
            style={{ background: 'linear-gradient(135deg, #F8926A 0%, #BB81B5 100%)' }}>
            <Link to="/resources" className="text-white">
              Download Free
              <ArrowRight className="ml-2 w-4 h-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
