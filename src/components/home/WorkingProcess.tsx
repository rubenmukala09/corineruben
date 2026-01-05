import { FileText, Search, Shield, Smile } from "lucide-react";
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
    <section className="py-16 bg-background relative overflow-hidden">
      {/* Grid pattern */}
      <GridPattern />
      
      {/* Geometric corner accents */}
      <GeometricCorner position="top-right" variant="lines" />
      <GeometricCorner position="bottom-left" variant="dots" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header with Image */}
        <div className="grid lg:grid-cols-2 gap-8 items-center mb-12">
          {/* Left - Image */}
          <div className="relative order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <video 
                src={peopleStudyingVideo} 
                className="w-full h-80 object-cover"
                autoPlay
                loop
                muted
                playsInline
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-accent/20 pointer-events-none" />
            </div>
          </div>
          
          {/* Right - Text */}
          <div className="order-1 lg:order-2">
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
          </div>
        </div>

        {/* Process Steps */}
        <div className="relative">
          {/* Connector line - desktop only */}
          <div className="hidden lg:block absolute top-20 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-primary/20 via-primary to-primary/20" />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
            {steps.map((step, index) => (
              <div key={index} className="relative text-center">
                {/* Icon container with number */}
                <div className="relative inline-block mb-8">
                  <div className="w-32 h-32 rounded-full bg-card border-2 border-border flex items-center justify-center shadow-lg mx-auto hover:border-primary/50 transition-colors">
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                      <step.icon className="w-7 h-7 text-primary" strokeWidth={1.5} />
                    </div>
                  </div>
                  
                  {/* Step number badge */}
                  <div className="absolute -top-2 -right-2 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm shadow-lg">
                    {step.step}
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-3 text-foreground">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed max-w-[260px] mx-auto">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkingProcess;
