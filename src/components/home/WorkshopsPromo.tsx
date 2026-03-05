import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Eye, AlertTriangle, Target } from "lucide-react";
import seniorLearning from "@/assets/protection-training-workshop.jpg";

const services = [
  { icon: AlertTriangle, title: "Scam Prevention", desc: "Spot AI-powered scams before they reach you" },
  { icon: Shield, title: "4-Step Protection", desc: "A proven process for your digital safety" },
  { icon: Target, title: "Protection Tiers", desc: "Security plans sized to your needs" },
  { icon: Eye, title: "Threat Analysis", desc: "Active monitoring with real-time alerts" },
];

export const WorkshopsPromo = () => {
  return (
    <section className="py-16 lg:py-24 relative overflow-hidden" aria-labelledby="workshops-heading">
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-primary/8 to-accent/5 blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-gradient-to-br from-accent/6 to-primary/4 blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 max-w-6xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Media - Left */}
          <div className="relative">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden group">
              <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-br from-white/30 via-white/5 to-white/20 pointer-events-none z-20" style={{ mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', maskComposite: 'xor', WebkitMaskComposite: 'xor', padding: '1px' }} />
              <div className="absolute inset-0 shadow-[0_20px_60px_-15px_hsl(var(--primary)/0.25),0_10px_30px_-10px_hsl(var(--accent)/0.15)] rounded-3xl pointer-events-none z-20" />
              <img src={seniorLearning} alt="Protection Training Workshop" className="w-full h-full object-cover" width={800} height={600} loading="lazy" decoding="async" />
            </div>

            <div className="absolute -bottom-5 -right-3 lg:-right-6 backdrop-blur-xl bg-card/80 rounded-2xl border border-white/40 p-4" style={{ boxShadow: 'var(--skeuo-shadow-ombre)' }}>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-[0_4px_15px_hsl(var(--primary)/0.4)]">
                  <span className="text-white font-black text-sm">99%</span>
                </div>
                <div>
                  <div className="text-sm font-bold text-foreground">Success Rate</div>
                  <div className="text-xs text-muted-foreground">Client Satisfaction</div>
                </div>
              </div>
            </div>
          </div>

          {/* Content - Right */}
          <div className="space-y-8">
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/8 backdrop-blur-sm border border-primary/15 text-xs font-bold uppercase tracking-[0.2em] text-primary mb-4">Learn & Train</span>
              <h2 id="workshops-heading" className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground leading-[1.1] mb-4">
                Why Families Choose Our{" "}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Protection Training</span>
              </h2>
              <p className="text-muted-foreground text-base leading-relaxed">
                Scammers now use deepfakes and voice cloning to target you. Our expert-led workshops show you how to recognize and stop these threats.
              </p>
            </div>

            <div className="flex items-center gap-8 p-5 rounded-2xl backdrop-blur-xl bg-card/60 border border-border/40" style={{ boxShadow: 'var(--skeuo-shadow-ombre)' }}>
              <div>
                <div className="text-4xl font-black bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">100+</div>
                <div className="text-sm text-muted-foreground">Families Protected</div>
              </div>
              <div className="h-12 w-px bg-gradient-to-b from-transparent via-border to-transparent" />
              <div>
                <div className="text-4xl font-black bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">100%</div>
                <div className="text-sm text-muted-foreground">Satisfaction</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3" role="list" aria-label="Services">
              {services.map((service) => (
                <div key={service.title} role="listitem" className="group relative rounded-xl overflow-hidden">
                  <div className="relative p-3 rounded-xl backdrop-blur-sm bg-card/50 border border-border/30 hover:border-primary/30 hover:bg-primary/5 transition-all duration-300">
                    <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{
                      background: 'radial-gradient(circle at 30% 30%, hsl(var(--primary) / 0.08) 0%, transparent 70%)'
                    }} />
                    <div className="flex items-start gap-3 relative z-10">
                      <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary/15 to-accent/10 backdrop-blur-sm border border-primary/10 flex items-center justify-center flex-shrink-0">
                        <service.icon className="w-4.5 h-4.5 text-primary" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-foreground">{service.title}</div>
                        <div className="text-xs text-muted-foreground">{service.desc}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Button asChild size="lg">
              <Link to="/training">
                Start Training <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
