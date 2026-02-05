import { Shield, Star, Award, Lock } from "lucide-react";
import { motion } from "framer-motion";

const HeroFloatingStats = () => {
  const stats = [
    { icon: Shield, text: "500+ Families Protected" },
    { icon: Star, text: "4.9/5 Star Rating" },
    { icon: Award, text: "Cybersecurity Expert-Founded" },
    { icon: Lock, text: "Privacy-First" },
  ];

  return (
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-20 pointer-events-none">
      <motion.div 
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ 
          opacity: 1, 
          y: [0, -6, 0],
          scale: 1,
        }}
        transition={{ 
          opacity: { duration: 0.6, ease: "easeOut" },
          scale: { duration: 0.6, ease: "easeOut" },
          y: { 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.6
          }
        }}
        className="relative rounded-full py-5 px-12 md:px-16 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.12)] overflow-hidden border border-coral-200/50"
        style={{
          background: "linear-gradient(135deg, #ffffff 0%, #faf9f7 50%, #fff5f0 100%)",
        }}
      >
        {/* Subtle gradient accent line at top */}
        <div 
          className="absolute top-0 left-0 right-0 h-[2px]"
          style={{
            background: "linear-gradient(90deg, transparent, hsl(var(--coral-400)), hsl(var(--lavender-500)), transparent)",
          }}
        />
        
        {/* Shimmer sweep effect */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: "linear-gradient(90deg, transparent 0%, rgba(248,146,106,0.15) 50%, transparent 100%)",
            animation: "shimmer 3s ease-in-out infinite",
          }}
        />
        
        <div className="relative flex items-center gap-10 md:gap-14">
          {stats.map((stat, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 15, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 0.5, 
                delay: 0.15 * index + 0.4,
                ease: "easeOut"
              }}
              className="flex items-center gap-3"
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  delay: index * 0.7,
                  ease: "easeInOut"
                }}
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, hsl(var(--coral-100)) 0%, hsl(var(--lavender-100)) 100%)",
                  border: "1px solid hsl(var(--coral-200))",
                }}
              >
                <stat.icon className="w-5 h-5 text-coral-500 flex-shrink-0" strokeWidth={1.5} />
              </motion.div>
              <span 
                className="text-sm font-semibold whitespace-nowrap"
                style={{
                  background: "linear-gradient(135deg, hsl(var(--navy-600)) 0%, hsl(var(--lavender-600)) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {stat.text}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
      
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-150%); }
          100% { transform: translateX(150%); }
        }
      `}</style>
    </div>
  );
};

export default HeroFloatingStats;
