import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileText, Shield, BookOpen, ArrowRight, Download, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
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
    <section className="relative py-12 lg:py-16 overflow-hidden" style={{ background: 'linear-gradient(135deg, #ffffff 0%, #faf9f7 30%, #fff5f0 60%, #faf5fa 100%)' }}>
      {/* Premium decorative elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] opacity-30 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, #F8926A 0%, transparent 60%)',
          filter: 'blur(100px)',
          transform: 'translate(20%, -30%)'
        }}
      />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] opacity-25 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, #BB81B5 0%, transparent 60%)',
          filter: 'blur(80px)',
          transform: 'translate(-30%, 30%)'
        }}
      />
      
      {/* Floating accent circles */}
      <motion.div 
        className="absolute top-20 right-[15%] w-16 h-16 rounded-full opacity-50"
        style={{ background: 'linear-gradient(135deg, #F8926A 0%, #BB81B5 100%)' }}
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-32 left-[8%] w-10 h-10 rounded-full opacity-40"
        style={{ background: 'linear-gradient(135deg, #BB81B5 0%, #18305A 100%)' }}
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      
      {/* Additional decorative elements */}
      <motion.div 
        className="absolute top-40 left-[20%] w-8 h-8 rounded-full opacity-30"
        style={{ background: 'linear-gradient(135deg, #F8926A 0%, #FFB088 100%)' }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />
      <motion.div 
        className="absolute bottom-48 right-[10%] w-6 h-6 rounded-full opacity-35"
        style={{ background: 'linear-gradient(135deg, #BB81B5 0%, #D4A5D1 100%)' }}
        animate={{ y: [0, -8, 0], x: [0, 5, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-6 shadow-sm"
              style={{ 
                background: 'linear-gradient(135deg, #fff5f0 0%, #faf5fa 100%)',
                borderColor: 'rgba(248, 146, 106, 0.3)'
              }}>
              <Sparkles className="w-4 h-4" style={{ color: '#F8926A' }} />
              <span className="text-sm font-semibold uppercase tracking-wide" style={{ color: '#18305A' }}>Resources</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight mb-6"
              style={{ fontFamily: "'Clash Display', 'DM Sans', sans-serif" }}>
              <span className="text-[#18305A]">Tools For </span>
              <span style={{ 
                background: 'linear-gradient(135deg, #F8926A 0%, #BB81B5 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>Protection</span>
            </h2>
            
            <p className="text-lg leading-relaxed" style={{ color: 'rgba(24, 48, 90, 0.7)' }}>
              From insurance coverage to free educational materials. Everything you need to stay protected.
            </p>
          </div>
          
          <Button asChild size="lg" 
            className="group h-14 px-8 text-base font-bold rounded-full shadow-lg hover:shadow-xl transition-all"
            style={{ background: 'linear-gradient(135deg, #F8926A 0%, #BB81B5 100%)' }}>
            <Link to="/resources" className="text-white">
              Browse All
              <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </Link>
          </Button>
        </motion.div>

        {/* Two Column Layout - Image + Resources */}
        <div className="grid lg:grid-cols-2 gap-10 mb-12">
          {/* Left - Featured Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <img 
              src={securityProtectionTools}
              alt="Digital security protection tools and software"
              className="aspect-[4/3] shadow-2xl shadow-coral-400/20 border-4 border-white rounded-[40px] w-full h-full object-cover"
              width={600}
              height={450}
              loading="lazy"
              decoding="async"
            />
            
            {/* Floating Badge */}
            <motion.div 
              className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-xl rounded-2xl p-5 border border-coral-200/50 shadow-xl z-20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-foreground/60 mb-1">Resources Available</div>
                  <div className="text-3xl font-black text-[#18305A]" style={{ fontFamily: "'Clash Display', sans-serif" }}>50+</div>
                </div>
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg"
                  style={{ background: 'linear-gradient(135deg, #F8926A 0%, #BB81B5 100%)' }}>
                  <Shield className="w-7 h-7 text-white" />
                </div>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Right - Resources Grid */}
          <div className="grid gap-5">
          {resources.map((resource, i) => (
            <motion.div
              key={resource.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
            >
             <Link to="/resources" className="group block">
                  <div className="h-full p-6 rounded-2xl border-2 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer flex items-center gap-5"
                   style={{ 
                     background: 'linear-gradient(135deg, #ffffff 0%, #faf9f7 100%)',
                     borderColor: resource.color,
                   }}>
                    <div className="flex-shrink-0">
                      <div className="w-14 h-14 rounded-xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-110"
                       style={{ background: `linear-gradient(135deg, ${resource.color} 0%, ${resource.color}dd 100%)` }}>
                        <resource.icon className="w-7 h-7 text-white" />
                     </div>
                   </div>
                   
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-bold transition-colors group-hover:text-coral-600"
                          style={{ fontFamily: "'Clash Display', sans-serif", color: '#18305A' }}>
                          {resource.title}
                        </h3>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase"
                          style={{ 
                            background: `${resource.color}20`,
                            color: resource.color,
                          }}>
                          {resource.tag}
                        </span>
                      </div>
                      <p className="text-sm leading-relaxed" style={{ color: 'rgba(24, 48, 90, 0.65)' }}>{resource.description}</p>
                    </div>
                    
                    <div className="flex-shrink-0">
                       <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                   </div>
                 </div>
               </Link>
            </motion.div>
          ))}
          </div>
        </div>
        
        {/* Free download banner - Premium */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 p-6 rounded-3xl border shadow-xl flex flex-col md:flex-row items-center justify-between gap-6"
          style={{ 
            background: 'linear-gradient(135deg, #ffffff 0%, #fff5f0 50%, #faf5fa 100%)',
            borderColor: 'rgba(248, 146, 106, 0.3)'
          }}
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-transform hover:scale-110"
              style={{ background: 'linear-gradient(135deg, #F8926A 0%, #BB81B5 100%)' }}>
              <Download className="w-7 h-7 text-white" />
            </div>
            <div>
              <div className="text-lg font-bold text-[#18305A]">Free Emergency Anti-Scam Scripts</div>
              <div className="text-sm" style={{ color: 'rgba(24, 48, 90, 0.5)' }}>IRS • Tech Support • Grandparent • Bank Fraud</div>
            </div>
          </div>
          <Button asChild size="lg"
            className="h-12 px-6 text-base font-bold rounded-full shadow-lg hover:scale-105 transition-transform"
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