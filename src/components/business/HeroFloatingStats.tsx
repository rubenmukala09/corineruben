import { Shield, Star, Award, Lock } from "lucide-react";
import { motion } from "framer-motion";

const HeroFloatingStats = () => {
  const stats = [
    { icon: Shield, text: "100+ Families Protected" },
    { icon: Star, text: "Client-Reviewed" },
    { icon: Award, text: "Expert-Founded" },
    { icon: Lock, text: "Privacy-First" },
  ];

  return (
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-20 pointer-events-none hidden lg:block">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6, type: "spring", stiffness: 100 }}
        className="bg-card/95 backdrop-blur-xl rounded-full py-4 px-10 shadow-2xl shadow-primary/10 border border-border/40"
      >
        <div className="flex items-center gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 + index * 0.1, duration: 0.4 }}
              className="flex items-center gap-2.5 group"
            >
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary/15 to-accent/10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                <stat.icon className="w-4.5 h-4.5 text-primary" strokeWidth={1.5} />
              </div>
              <span className="text-sm font-semibold text-foreground whitespace-nowrap">
                {stat.text}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default HeroFloatingStats;
