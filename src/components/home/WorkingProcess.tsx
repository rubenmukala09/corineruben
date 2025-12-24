import { motion } from "framer-motion";
import { FileText, Search, Shield, Smile, Settings } from "lucide-react";

const steps = [
  {
    step: "01",
    icon: FileText,
    title: "Share Your Details",
    description: "Tell us about your security concerns and requirements.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    step: "02",
    icon: Search,
    title: "Pick A Plan",
    description: "Our experts recommend the best protection package for you.",
    color: "from-violet-500 to-purple-500",
  },
  {
    step: "03",
    icon: Shield,
    title: "We Assess & Protect",
    description: "We analyze your digital footprint and secure vulnerabilities.",
    color: "from-emerald-500 to-teal-500",
  },
  {
    step: "04",
    icon: Smile,
    title: "Enjoy Peace of Mind",
    description: "Rest easy with 24/7 monitoring and ongoing support.",
    color: "from-amber-500 to-orange-500",
  },
];

export const WorkingProcess = () => {
  return (
    <section className="py-32 bg-muted/20 relative overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 opacity-[0.015]">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)',
            backgroundSize: '32px 32px'
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Settings className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-muted-foreground">How It Works</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 tracking-tight">
            Get Protected in
            <br />
            <span className="text-primary">Four Simple Steps</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our streamlined process makes getting protected easy and stress-free.
          </p>
        </motion.div>

        {/* Process Steps */}
        <div className="grid md:grid-cols-4 gap-8 relative">
          {/* Connector line - desktop only */}
          <div className="hidden md:block absolute top-[72px] left-[15%] right-[15%] h-px bg-gradient-to-r from-border via-primary/30 to-border" />
          
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="relative text-center group"
            >
              {/* Icon container */}
              <motion.div
                className="relative inline-block mb-8"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                {/* Main circle */}
                <div className="relative w-36 h-36 rounded-full bg-card border-2 border-border group-hover:border-primary/30 flex items-center justify-center shadow-lg transition-all duration-300">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center`}>
                    <step.icon className="w-8 h-8 text-white" strokeWidth={1.5} />
                  </div>
                </div>
                
                {/* Step number badge */}
                <div className="absolute -top-1 -right-1 w-10 h-10 bg-foreground text-background rounded-full flex items-center justify-center font-bold text-sm shadow-lg">
                  {step.step}
                </div>
              </motion.div>

              <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                {step.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed max-w-[240px] mx-auto">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkingProcess;
