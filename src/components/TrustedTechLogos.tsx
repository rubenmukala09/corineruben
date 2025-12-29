import { Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const techPartners = [
  "OpenAI",
  "Google AI", 
  "Microsoft Azure",
  "Amazon AWS",
  "IBM Watson",
  "Anthropic",
  "Hugging Face",
  "TensorFlow",
  "Meta AI",
  "NVIDIA",
  "Salesforce Einstein",
  "Adobe Sensei"
];

const TrustedTechLogos = () => {
  return (
    <section className="py-8 bg-gradient-to-b from-muted/50 to-background border-y border-border/30 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-6">
          <Badge variant="outline" className="mb-3 border-primary/30">
            <Shield className="w-3 h-3 mr-1.5 text-primary" />
            Enterprise-Grade Technology
          </Badge>
          <h3 className="text-lg font-semibold text-foreground/90">
            Powered By Industry Leaders
          </h3>
        </div>
        
        {/* Infinite scrolling names */}
        <div className="relative">
          {/* Gradient fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
          
          <div className="flex animate-scroll-left">
            {/* First set */}
            {techPartners.map((name, index) => (
              <div
                key={`set1-${index}`}
                className="flex-shrink-0 mx-6 md:mx-8"
              >
                <span className="text-sm md:text-base font-medium text-muted-foreground/70 hover:text-primary transition-colors duration-300 whitespace-nowrap">
                  {name}
                </span>
              </div>
            ))}
            {/* Duplicate for seamless loop */}
            {techPartners.map((name, index) => (
              <div
                key={`set2-${index}`}
                className="flex-shrink-0 mx-6 md:mx-8"
              >
                <span className="text-sm md:text-base font-medium text-muted-foreground/70 hover:text-primary transition-colors duration-300 whitespace-nowrap">
                  {name}
                </span>
              </div>
            ))}
            {/* Third set for extra smooth loop */}
            {techPartners.map((name, index) => (
              <div
                key={`set3-${index}`}
                className="flex-shrink-0 mx-6 md:mx-8"
              >
                <span className="text-sm md:text-base font-medium text-muted-foreground/70 hover:text-primary transition-colors duration-300 whitespace-nowrap">
                  {name}
                </span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Compliance badges */}
        <div className="text-center mt-6">
          <p className="text-xs text-muted-foreground/60 flex items-center justify-center gap-3">
            <span className="flex items-center gap-1">
              <Shield className="w-3 h-3" />
              SOC 2 Compliant
            </span>
            <span className="text-muted-foreground/30">•</span>
            <span>GDPR Ready</span>
            <span className="text-muted-foreground/30">•</span>
            <span>Bank-Level Encryption</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default TrustedTechLogos;
