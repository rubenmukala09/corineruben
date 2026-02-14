import { FileText, Search, Shield, Smile } from "lucide-react";

const steps = [
  { step: "01", icon: FileText, title: "Share Your Details", description: "Tell us about your security concerns and what you need.", gradient: "from-blue-500 to-cyan-500" },
  { step: "02", icon: Search, title: "Pick a Plan", description: "Our experts recommend the right protection package for your situation.", gradient: "from-purple-500 to-pink-500" },
  { step: "03", icon: Shield, title: "We Assess & Protect", description: "We analyze your digital footprint and close vulnerabilities.", gradient: "from-emerald-500 to-teal-500" },
  { step: "04", icon: Smile, title: "Enjoy Peace of Mind", description: "Rest easy with 24/7 monitoring and ongoing support from our team.", gradient: "from-amber-500 to-orange-500" },
];

export const WorkingProcess = () => {
  return (
    <section className="py-16 lg:py-20" aria-labelledby="process-heading">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 mb-5">
            <span className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-accent" />
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-primary">How It Works</span>
          </div>
          <h2 id="process-heading" className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground leading-tight mb-3">
            Get Protected in{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Four Steps</span>
          </h2>
          <p className="text-muted-foreground text-base max-w-xl mx-auto">
            Our process makes getting protected simple and stress-free.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto" role="list" aria-label="Protection steps">
          {steps.map((step, index) => (
            <div key={index} role="listitem"
              className="group relative bg-card rounded-2xl border border-border/60 p-6 text-center hover:border-primary/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className={`absolute -top-3 right-4 w-8 h-8 bg-gradient-to-br ${step.gradient} text-white rounded-lg flex items-center justify-center font-bold text-xs shadow-md`}>
                {step.step}
              </div>
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-md mx-auto mb-5 group-hover:scale-110 transition-transform`}>
                <step.icon className="w-7 h-7 text-white" strokeWidth={2} />
              </div>
              <h3 className="text-base font-bold text-foreground mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkingProcess;