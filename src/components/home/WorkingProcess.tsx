import { motion } from "framer-motion";
import { FileText, Search, Shield, Smile } from "lucide-react";

const steps = [
  {
    step: "01",
    icon: FileText,
    title: "Provide Your Details",
    description: "Share your contact info with any specific security concerns or questions you have.",
  },
  {
    step: "02",
    icon: Search,
    title: "Pick A Suitable Plan",
    description: "Our experts recommend the best protection package based on your unique needs.",
  },
  {
    step: "03",
    icon: Shield,
    title: "We Assess Channels",
    description: "We analyze your digital footprint and identify potential vulnerabilities.",
  },
  {
    step: "04",
    icon: Smile,
    title: "You Enjoy & Relax",
    description: "Rest easy knowing your family is protected with 24/7 monitoring and support.",
  },
];

export const WorkingProcess = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-full h-full" 
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, hsl(var(--primary) / 0.1) 0%, transparent 50%),
                              radial-gradient(circle at 75% 75%, hsl(var(--accent) / 0.1) 0%, transparent 50%)`
          }} 
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.span 
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-6"
            whileHover={{ scale: 1.05 }}
          >
            How It Works
          </motion.span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Get Protected in{" "}
            <span className="font-serif italic text-primary">Four</span>{" "}
            <span className="text-primary">Steps</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our simple process makes getting protected easy and stress-free.
          </p>
        </motion.div>

        {/* Process Steps */}
        <div className="grid md:grid-cols-4 gap-8 lg:gap-6 relative">
          {/* Connector line - desktop only */}
          <div className="hidden md:block absolute top-24 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-primary/20 via-accent/40 to-primary/20" />
          
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="relative text-center group"
            >
              {/* Icon container */}
              <motion.div
                className="relative inline-block mb-8"
                whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
              >
                {/* Outer ring */}
                <div className="absolute inset-0 w-24 h-24 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 blur-xl group-hover:blur-2xl transition-all duration-300" />
                
                {/* Main circle */}
                <div className="relative w-24 h-24 rounded-full bg-card border-2 border-border group-hover:border-primary/50 flex items-center justify-center shadow-lg transition-all duration-300">
                  <step.icon className="w-10 h-10 text-primary" />
                </div>
                
                {/* Step number badge */}
                <div className="absolute -top-2 -right-2 w-10 h-10 bg-gradient-to-br from-primary to-accent text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm shadow-lg">
                  {step.step}
                </div>
              </motion.div>

              <h3 className="text-xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors">
                {step.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed max-w-xs mx-auto">
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
