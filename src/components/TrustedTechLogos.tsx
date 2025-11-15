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
    <div className="fixed bottom-4 left-4 right-80 bg-gradient-to-r from-muted/95 to-background/95 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-border/40 z-40 overflow-hidden">
      <div className="flex items-center gap-3 mb-2">
        <Badge variant="outline" className="flex-shrink-0">
          <Shield className="w-3 h-3 mr-1" />
          Powered By Industry Leaders
        </Badge>
      </div>
      
      {/* Seamless scrolling logos - no gaps, continuous loop */}
      <div className="relative overflow-hidden">
        <div className="flex animate-scroll-left gap-8">
          {/* Triple the logos for ultra-smooth seamless loop */}
          {[...Array(3)].map((_, setIndex) => (
            logos.map((logo, index) => {
              const IconComponent = logo.icon;
              return (
                <div
                  key={`set${setIndex}-${index}`}
                  className="flex-shrink-0 flex items-center gap-2 transition-all duration-300 hover:scale-110"
                >
                  <div className={`${logo.color}`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <div className="flex flex-col">
                    <div className="text-xs font-semibold text-foreground/80 whitespace-nowrap">
                      {logo.name}
                    </div>
                  </div>
                </div>
              );
            })
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrustedTechLogos;
