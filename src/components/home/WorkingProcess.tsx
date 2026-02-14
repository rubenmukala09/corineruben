import { FileText, Search, Shield, Smile } from "lucide-react";

const steps = [
  { step: "01", icon: FileText, title: "Share Your Details", description: "Tell us about your security concerns and what you need." },
  { step: "02", icon: Search, title: "Pick a Plan", description: "Our experts recommend the right protection package for your situation." },
  { step: "03", icon: Shield, title: "We Assess & Protect", description: "We analyze your digital footprint and close vulnerabilities." },
  { step: "04", icon: Smile, title: "Enjoy Peace of Mind", description: "Rest easy with 24/7 monitoring and ongoing support from our team." },
];

export const WorkingProcess = () => {
  return (
    <section className="py-16 lg:py-24 relative overflow-hidden" aria-labelledby="process-heading">
      {/* Background orbs */}
      <div className="absolute -top-20 left-1/4 w-96 h-96 rounded-full bg-gradient-to-br from-primary/5 to-accent/3 blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-20 right-1/4 w-80 h-80 rounded-full bg-gradient-to-br from-accent/4 to-primary/3 blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 max-w-5xl relative z-10">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/8 backdrop-blur-sm border border-primary/15 text-xs font-bold uppercase tracking-[0.2em] text-primary mb-4">How It Works</span>
          <h2 id="process-heading" className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground leading-[1.1] mb-3">
            Get Protected in{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Four Steps</span>
          </h2>
          <p className="text-muted-foreground text-base max-w-xl mx-auto">
            Our process makes getting protected simple and stress-free.
          </p>
        </div>

        {/* Timeline with glass cards */}
        <div className="relative">
          {/* Connecting glass line */}
          <div className="hidden lg:block absolute top-16 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-primary/10 via-accent/20 to-primary/10" />
          <div className="hidden lg:block absolute top-[63px] left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6" role="list" aria-label="Protection steps">
            {steps.map((step, index) => (
              <div key={index} role="listitem" className="group relative text-center">
                {/* Glass step circle */}
                <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center relative z-10 group-hover:scale-110 transition-all duration-300" style={{ boxShadow: '0 8px 30px hsl(var(--primary) / 0.35), 0 0 0 4px hsl(var(--background)), 0 0 0 6px hsl(var(--primary) / 0.15)' }}>
                  <span className="text-xl font-black text-white">{step.step}</span>
                </div>

                {/* Glass card */}
                <div className="relative rounded-2xl overflow-hidden">
                  <div className="backdrop-blur-xl bg-card/60 border border-border/30 rounded-2xl p-5" style={{ boxShadow: 'var(--skeuo-shadow-ombre)' }}>
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{
                      background: 'radial-gradient(circle at 50% 0%, hsl(var(--primary) / 0.08) 0%, transparent 60%)'
                    }} />
                    <div className="absolute top-0 left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />
                    <div className="relative z-10">
                      <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-primary/12 to-accent/8 backdrop-blur-sm border border-primary/10 flex items-center justify-center">
                        <step.icon className="w-6 h-6 text-primary" strokeWidth={2} />
                      </div>
                      <h3 className="text-base font-bold text-foreground mb-2">{step.title}</h3>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkingProcess;
