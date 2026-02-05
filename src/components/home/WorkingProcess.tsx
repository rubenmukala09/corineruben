import { motion } from "framer-motion";
import { FileText, Search, Shield, Smile } from "lucide-react";
import workingProcessScreenshot from "@/assets/working-process-screenshot.png";
import { GeometricCorner, GridPattern, LightOrbs, IllustrationLines, Sparkles } from "@/components/ui/GeometricDecorations";

const steps = [
  {
    step: "01",
    icon: FileText,
    title: "Share Your Details",
    description: "Tell us about your security concerns and requirements.",
    gradient: "from-blue-500 to-cyan-500",
    bgGlow: "bg-blue-500/20",
  },
  {
    step: "02",
    icon: Search,
    title: "Pick A Plan",
    description: "Our experts recommend the best protection package for you.",
    gradient: "from-purple-500 to-pink-500",
    bgGlow: "bg-purple-500/20",
  },
  {
    step: "03",
    icon: Shield,
    title: "We Assess & Protect",
    description: "We analyze your digital footprint and secure vulnerabilities.",
    gradient: "from-emerald-500 to-teal-500",
    bgGlow: "bg-emerald-500/20",
  },
  {
    step: "04",
    icon: Smile,
    title: "Enjoy Peace of Mind",
    description: "Rest easy with 24/7 monitoring and ongoing support.",
    gradient: "from-amber-500 to-orange-500",
    bgGlow: "bg-amber-500/20",
  },
];

export const WorkingProcess = () => {

   return (
     <section className="py-12 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #ffffff 0%, #faf9f7 50%, #fff5f0 100%)' }}>
       {/* Decorative Gradient Orbs */}
       <div className="absolute top-20 right-[10%] w-[400px] h-[400px] opacity-30 pointer-events-none"
         style={{
           background: 'radial-gradient(circle at center, rgba(248,146,106,0.4) 0%, transparent 60%)',
           filter: 'blur(100px)',
         }}
       />
       <div className="absolute bottom-10 left-[5%] w-[300px] h-[300px] opacity-25 pointer-events-none"
         style={{
           background: 'radial-gradient(circle at center, rgba(187,129,181,0.5) 0%, transparent 60%)',
           filter: 'blur(80px)',
         }}
       />
      {/* Grid pattern */}
      <GridPattern />
      
      {/* Light orbs for ambient glow */}
      <LightOrbs className="opacity-70" />
      
      {/* Sparkle decorations */}
      <Sparkles className="opacity-80" />
      
      {/* Abstract illustration */}
      <IllustrationLines variant="abstract" className="top-10 right-20 opacity-50" />
      
      {/* Geometric corner accents */}
      <GeometricCorner position="top-right" variant="lines" />
      <GeometricCorner position="bottom-left" variant="dots" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header with Image */}
        <div className="grid lg:grid-cols-2 gap-8 items-center mb-12">
          {/* Left - Animated Laptop */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative order-2 lg:order-1"
          >
            {/* Laptop Frame */}
            <div className="relative mx-auto max-w-lg">
              {/* Glow effect behind laptop */}
              <motion.div 
                animate={{ 
                  opacity: [0.3, 0.5, 0.3],
                  scale: [1, 1.02, 1]
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-3xl blur-xl"
              />
              
              {/* Laptop screen bezel */}
              <div className="relative bg-gray-900 rounded-t-xl pt-4 px-4 pb-2 shadow-2xl">
                {/* Camera dot with breathing animation */}
                <motion.div 
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute top-1.5 left-1/2 -translate-x-1/2 w-2 h-2 bg-green-500 rounded-full"
                />
                {/* Screen - Static with subtle glow animation */}
                <div className="relative rounded-lg overflow-hidden bg-white h-[280px]">
                  <motion.div
                    animate={{ 
                      boxShadow: [
                        "inset 0 0 20px rgba(124, 58, 237, 0.1)",
                        "inset 0 0 40px rgba(124, 58, 237, 0.2)",
                        "inset 0 0 20px rgba(124, 58, 237, 0.1)"
                      ]
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 z-10 pointer-events-none"
                  />
                  <img 
                    src={workingProcessScreenshot}
                    alt="InVision Network training platform interface"
                    className="w-full h-full object-cover object-top"
                    loading="lazy"
                  />
                  {/* Subtle ambient glow overlay */}
                  <motion.div 
                    animate={{ 
                      opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-primary/20 to-transparent pointer-events-none"
                  />
                </div>
              </div>
              {/* Laptop base */}
              <div className="relative h-4 bg-gradient-to-b from-gray-800 to-gray-900 rounded-b-xl">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-gray-700 rounded-b" />
              </div>
              {/* Shadow/reflection */}
              <motion.div 
                animate={{ opacity: [0.1, 0.2, 0.1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -bottom-4 left-4 right-4 h-4 bg-black/10 blur-xl rounded-full"
              />
            </div>
          </motion.div>
          
          {/* Right - Text */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2"
          >
            <div 
             className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/80 backdrop-blur-md border border-coral-200/50 shadow-lg text-sm font-semibold uppercase tracking-wider mb-4"
            >
             <span className="w-2 h-2 rounded-full bg-gradient-to-r from-coral-400 to-lavender-500 animate-pulse" />
             <span className="text-[#18305A]">How It Works</span>
            </div>
             <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#18305A] mb-4" style={{ fontFamily: "'Clash Display', 'DM Sans', sans-serif" }}>
               Get Protected in{" "}
               <span className="bg-gradient-to-r from-coral-500 to-lavender-500 bg-clip-text text-transparent">Four Simple Steps</span>
             </h2>
            <p className="text-muted-foreground text-lg">
              Our streamlined process makes getting protected easy and stress-free.
            </p>
          </motion.div>
        </div>

        {/* Process Steps */}
        <div className="relative">
          {/* Connector line - desktop only */}
          <div className="hidden lg:block absolute top-20 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-blue-500/30 via-purple-500/50 via-emerald-500/50 to-amber-500/30" />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative text-center group"
              >
                {/* Icon container */}
                <div className="relative inline-block mb-6">
                  <div className={`absolute inset-0 rounded-3xl ${step.bgGlow} blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-110`} />
                  
                   <div className="relative w-28 h-28 rounded-3xl bg-white/80 backdrop-blur-md border border-white/50 flex items-center justify-center shadow-lg mx-auto transition-all duration-300 group-hover:translate-y-[-6px] group-hover:shadow-2xl overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${step.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                    
                    <div className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}>
                      <step.icon className="w-7 h-7 text-white" strokeWidth={2} />
                    </div>
                  </div>
                  
                  <div className={`absolute -top-2 -right-2 w-9 h-9 bg-gradient-to-br ${step.gradient} text-white rounded-xl flex items-center justify-center font-bold text-sm shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {step.step}
                  </div>
                </div>

                <h3 className="text-lg font-bold mb-2 text-foreground group-hover:text-primary transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-[240px] mx-auto">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkingProcess;