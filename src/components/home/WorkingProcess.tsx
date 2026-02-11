import { FileText, Search, Shield, Smile } from "lucide-react";

const steps = [
  {
    step: "01",
    icon: FileText,
    title: "Share Your Details",
    description: "Tell us about your security concerns and requirements.",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    step: "02",
    icon: Search,
    title: "Pick A Plan",
    description: "Our experts recommend the best protection package for you.",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    step: "03",
    icon: Shield,
    title: "We Assess & Protect",
    description: "We analyze your digital footprint and secure vulnerabilities.",
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    step: "04",
    icon: Smile,
    title: "Enjoy Peace of Mind",
    description: "Rest easy with 24/7 monitoring and ongoing support.",
    gradient: "from-amber-500 to-orange-500",
  },
];

export const WorkingProcess = () => {
  return (
    <section className="py-10 lg:py-14 dynamic-gradient-overlay" style={{ background: 'linear-gradient(135deg, #ffffff 0%, #faf9f7 50%, #fff5f0 100%)' }} aria-labelledby="process-heading">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-xl border border-white/40 shadow-lg text-sm font-semibold uppercase tracking-wider mb-4 skeuo-badge">
            <span className="w-2 h-2 rounded-full bg-gradient-to-r from-coral-400 to-lavender-500" aria-hidden="true" />
            <span className="text-[#18305A]">How It Works</span>
          </div>
          <h2 id="process-heading" className="text-3xl md:text-4xl font-black text-[#18305A] mb-3" style={{ fontFamily: "'Lora', 'Rubik', serif" }}>
            Get Protected in{" "}
            <span className="bg-gradient-to-r from-coral-500 to-lavender-500 bg-clip-text text-transparent">Four Simple Steps</span>
          </h2>
          <p className="text-foreground/60 text-base max-w-xl mx-auto">
            Our streamlined process makes getting protected easy and stress-free.
          </p>
        </div>

        {/* Process Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5" role="list" aria-label="Protection steps">
          {steps.map((step, index) => (
            <div 
              key={index} 
              role="listitem"
              className="relative text-center bg-white/60 backdrop-blur-xl border border-white/40 rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow micro-tilt-3d subtle-3d-surface"
            >
              {/* Step number badge */}
              <div className={`absolute -top-2 -right-2 w-7 h-7 bg-gradient-to-br ${step.gradient} text-white rounded-lg flex items-center justify-center font-bold text-xs shadow-md`}>
                {step.step}
              </div>

              {/* Icon */}
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-sm mx-auto mb-4`} aria-hidden="true">
                <step.icon className="w-6 h-6 text-white" strokeWidth={2} />
              </div>

              <h3 className="text-base font-bold mb-2 text-foreground">
                {step.title}
              </h3>
              <p className="text-foreground/60 text-sm">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkingProcess;
