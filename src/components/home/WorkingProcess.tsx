import { FileText, Search, Shield, Smile } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";
import peopleStudyingVideo from "@/assets/people-studying-video.mp4";
import { GeometricCorner, GridPattern } from "@/components/ui/GeometricDecorations";

const steps = [
  {
    step: "01",
    icon: FileText,
    title: "Share Your Details",
    description: "Tell us about your security concerns and requirements.",
  },
  {
    step: "02",
    icon: Search,
    title: "Pick A Plan",
    description: "Our experts recommend the best protection package for you.",
  },
  {
    step: "03",
    icon: Shield,
    title: "We Assess & Protect",
    description: "We analyze your digital footprint and secure vulnerabilities.",
  },
  {
    step: "04",
    icon: Smile,
    title: "Enjoy Peace of Mind",
    description: "Rest easy with 24/7 monitoring and ongoing support.",
  },
];

export const WorkingProcess = () => {
  return (
    <section className="py-12 md:py-16 relative overflow-hidden">
      {/* Grid pattern */}
      <GridPattern />
      
      {/* Geometric corner accents - hidden on mobile */}
      <div className="hidden md:block">
        <GeometricCorner position="top-right" variant="lines" />
        <GeometricCorner position="bottom-left" variant="dots" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header with Image - Mobile-first stacking */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 lg:gap-8 items-center mb-8 lg:mb-12">
          {/* Video - Physical Photo Effect */}
          <ScrollReveal animation="fade-up" className="order-1 lg:order-1 w-full">
            <div className="relative rounded-2xl lg:rounded-3xl overflow-hidden shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] border border-white/50 transition-all duration-400 ease-out hover:translate-y-[-4px] lg:hover:translate-y-[-8px] hover:scale-[1.01] lg:hover:scale-[1.02] hover:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.12)]">
              <video 
                src={peopleStudyingVideo} 
                className="w-full h-48 sm:h-64 lg:h-80 object-cover"
                autoPlay
                loop
                muted
                playsInline
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-accent/20 pointer-events-none" />
            </div>
          </ScrollReveal>
          
          {/* Text */}
          <ScrollReveal animation="fade-up" delay={100} className="order-2 lg:order-2">
            <div 
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-1.5 sm:py-2 bg-primary text-primary-foreground text-xs sm:text-sm font-semibold uppercase tracking-wider mb-3 sm:mb-4"
              style={{ clipPath: "polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)" }}
            >
              How It Works
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 sm:mb-4">
              Get Protected in{" "}
              <span className="text-primary">Four Simple Steps</span>
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg">
              Our streamlined process makes getting protected easy and stress-free.
            </p>
          </ScrollReveal>
        </div>

        {/* Process Steps - Soft Modern */}
        <div className="relative">
          {/* Connector line - desktop only */}
          <div className="hidden lg:block absolute top-20 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-primary/20 via-primary to-primary/20" />
          
          {/* Mobile: 2 columns, Desktop: 4 columns */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-10">
            {steps.map((step, index) => (
              <ScrollReveal key={index} animation="fade-up" delay={index * 75} className="relative text-center group">
                {/* Icon container with number - Soft Modern */}
                <div className="relative inline-block mb-4 sm:mb-8">
                  <div className="w-20 h-20 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-2xl lg:rounded-3xl bg-white border border-white/50 flex items-center justify-center shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] mx-auto transition-all duration-400 ease-out group-hover:translate-y-[-4px] lg:group-hover:translate-y-[-8px] group-hover:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.12)]">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-xl lg:rounded-2xl bg-primary/10 flex items-center justify-center">
                      <step.icon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-primary" strokeWidth={1.5} />
                    </div>
                  </div>
                  
                  {/* Step number badge */}
                  <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-7 h-7 sm:w-9 sm:h-9 lg:w-10 lg:h-10 bg-primary text-primary-foreground rounded-xl lg:rounded-2xl flex items-center justify-center font-bold text-xs sm:text-sm shadow-lg">
                    {step.step}
                  </div>
                </div>

                <h3 className="text-sm sm:text-lg lg:text-xl font-bold mb-1 sm:mb-3 text-foreground">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-xs sm:text-sm lg:text-base leading-relaxed">
                  {step.description}
                </p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkingProcess;
