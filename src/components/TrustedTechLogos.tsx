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
  "Stripe"
];

const TrustedTechLogos = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Tech Partners Marquee Only */}
      <div className="bg-white py-4 border-y border-border/20">
        <div className="relative overflow-hidden">
          {/* Gradient Edges */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
          
          <div className="flex animate-scroll-left items-center">
            {[...techPartners, ...techPartners, ...techPartners].map((name, index) => (
              <div
                key={index}
                className="flex-shrink-0 mx-8 flex items-center gap-2"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span className="text-sm font-semibold text-slate-800 hover:text-primary transition-colors duration-300 whitespace-nowrap tracking-wide">
                  {name}
                </span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Trust Badge */}
        <div className="text-center mt-3">
          <p className="text-[10px] text-slate-500 tracking-widest uppercase flex items-center justify-center gap-2">
            <Shield className="w-3 h-3" />
            <span>Enterprise Security • SOC 2 • Bank-Level Encryption</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default TrustedTechLogos;
