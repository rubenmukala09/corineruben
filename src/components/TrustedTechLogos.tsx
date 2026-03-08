import { forwardRef } from "react";
import { Shield } from "lucide-react";

const techPartners = [
  "OpenAI",
  "Google AI",
  "Microsoft Azure",
  "Amazon AWS",
  "IBM Watson",
  "Anthropic",
  "Meta AI",
  "NVIDIA",
  "Cloudflare",
  "Stripe",
];

const TrustedTechLogos = forwardRef<HTMLDivElement>(function TrustedTechLogos(_props, ref) {
  return (
    <section ref={ref} className="relative overflow-hidden">
      {/* Tech Partners Marquee Only */}
      <div className="bg-background py-5 border-y border-border/20">
        <div className="relative overflow-hidden">
          {/* Gradient Edges */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          <div className="flex animate-scroll-left items-center">
            {[...techPartners, ...techPartners, ...techPartners].map(
              (name, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 mx-10 flex items-center gap-2"
                >
                  <span
                    className="text-lg font-black text-foreground hover:text-primary transition-colors duration-300 whitespace-nowrap tracking-tight uppercase"
                    style={{
                      fontFamily:
                        'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                      letterSpacing: "-0.02em",
                      textShadow: "0 1px 2px rgba(0,0,0,0.08)",
                    }}
                  >
                    {name}
                  </span>
                </div>
              ),
            )}
          </div>
        </div>

        {/* Trust Badge */}
        <div className="text-center mt-4">
          <p className="text-[10px] text-muted-foreground tracking-widest uppercase flex items-center justify-center gap-2">
            <Shield className="w-3 h-3" />
            <span>Security-First Practices • Privacy-First Approach</span>
          </p>
        </div>
      </div>
    </section>
  );
});

export default TrustedTechLogos;
