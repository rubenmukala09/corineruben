import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileText, Shield, BookOpen, ArrowRight, Download, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const resources = [
  {
    icon: Shield,
    title: "Cyber Insurance",
    description: "Coverage up to $1M for identity theft and cyber fraud.",
    tag: "Popular",
  },
  {
    icon: FileText,
    title: "Emergency Scripts",
    description: "Free PDF scripts for IRS, tech support, and bank scams.",
    tag: "Free",
  },
  {
    icon: BookOpen,
    title: "Digital Guides",
    description: "30+ guides on AI, scam prevention, and digital safety.",
    tag: "New",
  },
];

export const ResourcesPromo = () => {
  return (
    <section className="relative py-24 lg:py-32 bg-gradient-to-br from-white via-coral-50/30 to-lavender-50/40 overflow-hidden">
      {/* Premium decorative elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] opacity-40 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, hsl(var(--coral-300)) 0%, transparent 60%)',
          filter: 'blur(100px)',
          transform: 'translate(20%, -30%)'
        }}
      />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] opacity-30 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, hsl(var(--lavender-300)) 0%, transparent 60%)',
          filter: 'blur(80px)',
          transform: 'translate(-30%, 30%)'
        }}
      />
      
      {/* Floating accent circles */}
      <motion.div 
        className="absolute top-20 right-[15%] w-16 h-16 rounded-full opacity-60"
        style={{ background: 'linear-gradient(135deg, hsl(var(--coral-400)) 0%, hsl(var(--lavender-400)) 100%)' }}
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-32 left-[8%] w-10 h-10 rounded-full opacity-40"
        style={{ background: 'linear-gradient(135deg, hsl(var(--lavender-400)) 0%, hsl(var(--navy-400)) 100%)' }}
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16"
        >
          <div className="max-w-2xl">
            {/* Premium badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-coral-100 to-lavender-100 border border-coral-200/50 mb-6">
              <Sparkles className="w-4 h-4 text-coral-500" />
              <span className="text-sm font-semibold text-foreground/80 uppercase tracking-wide">Resources</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight mb-6"
              style={{ fontFamily: "'Clash Display', 'DM Sans', sans-serif" }}>
              <span className="text-[#18305A]">Tools For </span>
              <span className="bg-gradient-to-r from-coral-500 to-lavender-500 bg-clip-text text-transparent">Protection</span>
            </h2>
            
            <p className="text-lg text-foreground/60 leading-relaxed">
              From insurance coverage to free educational materials—everything you need to stay protected.
            </p>
          </div>
          
          <Button asChild size="lg" 
            className="group h-14 px-8 text-base font-bold rounded-full shadow-lg shadow-coral-400/30 hover:shadow-xl hover:shadow-coral-400/40 transition-all"
            style={{ background: 'linear-gradient(135deg, #F8926A 0%, #BB81B5 100%)' }}>
            <Link to="/resources" className="text-white">
              Browse All
              <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </Link>
          </Button>
        </motion.div>
        
        {/* Resources Grid - Premium Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {resources.map((resource, i) => (
            <motion.div
              key={resource.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <Link to="/resources" className="group block">
                <div className="h-full p-8 bg-white/80 backdrop-blur-sm rounded-3xl border border-coral-200/30 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg"
                      style={{ background: 'linear-gradient(135deg, hsl(var(--coral-400)) 0%, hsl(var(--lavender-400)) 100%)' }}>
                      <resource.icon className="w-7 h-7 text-white" />
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-coral-100 to-lavender-100 text-coral-600 border border-coral-200/50">
                      {resource.tag}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-black text-[#18305A] mb-3 group-hover:text-coral-500 transition-colors"
                    style={{ fontFamily: "'Clash Display', sans-serif" }}>
                    {resource.title}
                  </h3>
                  
                  <p className="text-foreground/60 leading-relaxed mb-6">{resource.description}</p>
                  
                  <div className="flex items-center gap-2 text-coral-500 group-hover:text-lavender-500 transition-colors">
                    <span className="text-sm font-semibold">Learn more</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        
        {/* Free download banner - Premium */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 p-6 rounded-3xl bg-gradient-to-r from-white to-coral-50/50 border border-coral-200/40 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg"
              style={{ background: 'linear-gradient(135deg, hsl(var(--coral-400)) 0%, hsl(var(--lavender-400)) 100%)' }}>
              <Download className="w-7 h-7 text-white" />
            </div>
            <div>
              <div className="text-lg font-bold text-[#18305A]">Free Emergency Anti-Scam Scripts</div>
              <div className="text-foreground/50 text-sm">IRS • Tech Support • Grandparent • Bank Fraud</div>
            </div>
          </div>
          <Button asChild size="lg"
            className="h-12 px-6 text-base font-bold rounded-full shadow-lg shadow-coral-400/30"
            style={{ background: 'linear-gradient(135deg, #F8926A 0%, #BB81B5 100%)' }}>
            <Link to="/resources" className="text-white">
              Download Free
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};