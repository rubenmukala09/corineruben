import { Zap, Brain, Cloud, Database, Cpu, Lock, Globe } from "lucide-react";

const logos = [
  { name: "OpenAI", icon: Zap, color: "text-emerald-500 dark:text-emerald-400" },
  { name: "Google AI", icon: Brain, color: "text-blue-500 dark:text-blue-400" },
  { name: "Azure", icon: Cloud, color: "text-sky-500 dark:text-sky-400" },
  { name: "AWS", icon: Database, color: "text-orange-500 dark:text-orange-400" },
  { name: "IBM", icon: Cpu, color: "text-indigo-500 dark:text-indigo-400" },
  { name: "Anthropic", icon: Lock, color: "text-amber-500 dark:text-amber-400" },
  { name: "Hugging Face", icon: Globe, color: "text-yellow-500 dark:text-yellow-400" },
];

export const FloatingLogos = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 1 }}>
      {logos.map((logo, index) => {
        const IconComponent = logo.icon;
        const positions = [
          { top: "10%", left: "5%", delay: "0s", duration: "25s" },
          { top: "15%", right: "8%", delay: "3s", duration: "30s" },
          { top: "40%", left: "10%", delay: "6s", duration: "28s" },
          { top: "60%", right: "12%", delay: "2s", duration: "32s" },
          { top: "70%", left: "15%", delay: "8s", duration: "27s" },
          { top: "25%", left: "45%", delay: "4s", duration: "29s" },
          { top: "80%", right: "20%", delay: "7s", duration: "26s" },
        ];
        
        const position = positions[index];
        
        return (
          <div
            key={logo.name}
            className="absolute animate-float opacity-[0.07] dark:opacity-[0.05]"
            style={{
              top: position.top,
              left: position.left,
              right: position.right,
              animationDelay: position.delay,
              animationDuration: position.duration,
            }}
          >
            <IconComponent className={`w-16 h-16 md:w-24 md:h-24 ${logo.color}`} />
          </div>
        );
      })}
    </div>
  );
};
