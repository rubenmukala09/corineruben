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
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.8, duration: 0.7, type: "spring", stiffness: 90 }}
        className="glass-heavy rounded-full py-4 px-10 shadow-3d-colored"
      >
        <div className="flex items-center gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 + index * 0.12, duration: 0.5, type: "spring" }}
              className="flex items-center gap-2.5 group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/15 to-accent/10 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-md group-hover:shadow-primary/10 shadow-sm">
                <stat.icon className="w-4.5 h-4.5 text-primary" strokeWidth={1.5} />
              </div>
              <span className="text-sm font-bold text-foreground whitespace-nowrap">
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
