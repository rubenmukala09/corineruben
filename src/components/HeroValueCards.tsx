import { Shield, Globe, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

const HeroValueCards = () => {
  const valueProps = [
    {
      icon: Shield,
      title: "24/7 Personal Scam Analysis",
      gradient: "from-primary to-cyan-500"
    },
    {
      icon: Globe,
      title: "Multilingual Support",
      subtitle: "EN • ES • FR",
      gradient: "from-cyan-500 to-accent"
    },
    {
      icon: AlertTriangle,
      title: "Emergency Response",
      gradient: "from-accent to-destructive",
      pulse: true
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
      {valueProps.map((prop, index) => {
        const Icon = prop.icon;
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 + index * 0.2, duration: 0.5 }}
            className={`relative group ${prop.pulse ? 'animate-pulse' : ''}`}
          >
            <div className="relative bg-card/80 backdrop-blur-sm border border-border/50 rounded-xl p-4 hover:bg-card hover:border-primary/50 transition-all duration-300 hover:scale-105 hover:shadow-lg">
              <div className={`absolute inset-0 bg-gradient-to-br ${prop.gradient} opacity-5 group-hover:opacity-10 transition-opacity rounded-xl`} />
              <div className="relative flex flex-col items-center text-center gap-2">
                <div className={`p-3 rounded-full bg-gradient-to-br ${prop.gradient} bg-opacity-10`}>
                  <Icon className="h-6 w-6 text-foreground" />
                </div>
                <h3 className="text-sm font-semibold text-foreground">{prop.title}</h3>
                {prop.subtitle && (
                  <p className="text-xs text-muted-foreground font-medium">{prop.subtitle}</p>
                )}
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default HeroValueCards;
