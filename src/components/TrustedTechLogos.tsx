import { Shield, Zap, Brain, Cloud, Database, Lock, Globe, Cpu } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { TrustIndicator } from "@/components/TrustIndicator";

const logos = [
  { 
    name: "OpenAI", 
    icon: Zap,
    description: "GPT Models",
    color: "text-emerald-600 dark:text-emerald-400"
  },
  { 
    name: "Google AI", 
    icon: Brain,
    description: "Gemini",
    color: "text-blue-600 dark:text-blue-400"
  },
  { 
    name: "Microsoft Azure", 
    icon: Cloud,
    description: "Cloud Infrastructure",
    color: "text-sky-600 dark:text-sky-400"
  },
  { 
    name: "AWS", 
    icon: Database,
    description: "Secure Hosting",
    color: "text-orange-600 dark:text-orange-400"
  },
  { 
    name: "IBM Watson", 
    icon: Cpu,
    description: "Enterprise AI",
    color: "text-indigo-600 dark:text-indigo-400"
  },
  { 
    name: "Anthropic", 
    icon: Lock,
    description: "Claude Models",
    color: "text-amber-600 dark:text-amber-400"
  },
  { 
    name: "Hugging Face", 
    icon: Globe,
    description: "ML Models",
    color: "text-yellow-600 dark:text-yellow-400"
  },
  { 
    name: "TensorFlow", 
    icon: Brain,
    description: "ML Framework",
    color: "text-red-600 dark:text-red-400"
  },
];

const TrustedTechLogos = () => {
  return (
    <section className="section-spacing-tight bg-gradient-to-b from-muted/30 to-background border-y border-border/40 overflow-hidden">
      <div className="container-padding">
        {/* Refined header */}
        <div className="text-center mb-10">
          <Badge variant="outline" className="mb-3">
            <Shield className="w-3 h-3 mr-1" />
            Enterprise-Grade AI
          </Badge>
          <h3 className="text-xl font-semibold text-foreground/90 mb-2">
            Powered By Industry Leaders
          </h3>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            Our AI protection combines the best models from trusted providers to keep you safe
          </p>
        </div>
        
        {/* Floating logos - continuous right to left animation (seamless loop) */}
        <div className="relative">
          <div className="flex animate-scroll-left gap-8">
            {/* First set of logos */}
            {logos.map((logo, index) => {
              const IconComponent = logo.icon;
              return (
                <div
                  key={`set1-${index}`}
                  className="flex-shrink-0 flex flex-col items-center justify-center transition-all duration-300 hover:scale-110"
                >
                  {/* Icon floating in air - no background */}
                  <div className={`mb-2 ${logo.color}`}>
                    <IconComponent className="w-8 h-8" />
                  </div>
                  
                  {/* Logo name */}
                  <div className="text-xs font-semibold text-foreground/80 text-center whitespace-nowrap">
                    {logo.name}
                  </div>
                  
                  {/* Description */}
                  <div className="text-[10px] text-muted-foreground text-center whitespace-nowrap">
                    {logo.description}
                  </div>
                </div>
              );
            })}
            {/* Duplicate set for seamless loop */}
            {logos.map((logo, index) => {
              const IconComponent = logo.icon;
              return (
                <div
                  key={`set2-${index}`}
                  className="flex-shrink-0 flex flex-col items-center justify-center transition-all duration-300 hover:scale-110"
                >
                  {/* Icon floating in air - no background */}
                  <div className={`mb-2 ${logo.color}`}>
                    <IconComponent className="w-8 h-8" />
                  </div>
                  
                  {/* Logo name */}
                  <div className="text-xs font-semibold text-foreground/80 text-center whitespace-nowrap">
                    {logo.name}
                  </div>
                  
                  {/* Description */}
                  <div className="text-[10px] text-muted-foreground text-center whitespace-nowrap">
                    {logo.description}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Trust indicator */}
        <div className="text-center mt-8">
          <p className="text-xs text-muted-foreground flex items-center justify-center gap-2">
            <TrustIndicator type="shield" size="sm" />
            SOC 2 Compliant • GDPR Ready • Bank-Level Encryption
          </p>
        </div>
      </div>
    </section>
  );
};

export default TrustedTechLogos;
