import { useState, useEffect } from "react";
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

// Array of screenshots to cycle through (simulating different pages)
const screenshotPages = [
  { transform: "translateY(0%)", label: "Home" },
  { transform: "translateY(-15%)", label: "Training" },
  { transform: "translateY(-30%)", label: "Resources" },
  { transform: "translateY(-45%)", label: "Business" },
];

export const WorkingProcess = () => {
  const [currentPage, setCurrentPage] = useState(0);

  // Auto-scroll through "pages" in the laptop
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % screenshotPages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 relative overflow-hidden">
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
                {/* Screen */}
                <div className="relative rounded-lg overflow-hidden bg-white h-[280px]">
                  <motion.img 
                    src={workingProcessScreenshot}
                    alt="InVision Network training platform interface"
                    className="w-full object-cover object-top"
                    animate={{ 
                      y: currentPage * -50
                    }}
                    transition={{ 
                      duration: 1.5, 
                      ease: "easeInOut"
                    }}
                    loading="lazy"
                  />
                  {/* Scan line effect */}
                  <motion.div 
                    animate={{ y: ["0%", "100%", "0%"] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent pointer-events-none"
                  />
                </div>
                
                {/* Page indicator dots */}
                <div className="flex justify-center gap-2 mt-2 pb-1">
                  {screenshotPages.map((_, idx) => (
                    <motion.div
                      key={idx}
                      className={`w-1.5 h-1.5 rounded-full transition-colors ${
                        idx === currentPage ? "bg-primary" : "bg-gray-600"
                      }`}
                      animate={{ scale: idx === currentPage ? 1.2 : 1 }}
                    />
                  ))}
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
              className="inline-flex items-center gap-2 px-5 py-2 bg-primary text-primary-foreground text-sm font-semibold uppercase tracking-wider mb-4"
              style={{ clipPath: "polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)" }}
            >
              How It Works
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Get Protected in{" "}
              <span className="text-primary">Four Simple Steps</span>
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
                  
                  <div className="relative w-28 h-28 rounded-3xl bg-white border border-border/50 flex items-center justify-center shadow-lg mx-auto transition-all duration-300 group-hover:translate-y-[-6px] group-hover:shadow-xl overflow-hidden">
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