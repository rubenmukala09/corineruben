import { Shield, Star, Award, Lock } from "lucide-react";
import { motion } from "framer-motion";

// Note: These stats should be updated periodically with real metrics
// Consider fetching from database for dynamic updates
const HeroFloatingStats = () => {
  const stats = [
    { icon: Shield, text: "100+ Families Protected", iconBg: "bg-emerald-100", iconColor: "text-emerald-600" },
    { icon: Star, text: "4.9/5 Star Rating", iconBg: "bg-amber-100", iconColor: "text-amber-600" },
    { icon: Award, text: "Cybersecurity Expert-Founded", iconBg: "bg-violet-100", iconColor: "text-violet-600" },
    { icon: Lock, text: "Privacy-First", iconBg: "bg-sky-100", iconColor: "text-sky-600" },
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
        className="relative rounded-full py-6 px-14 md:px-20 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] overflow-hidden border-2 border-white/60"
        style={{
          background: "linear-gradient(135deg, #FFFBF5 0%, #FFF8F0 30%, #FFF5EB 60%, #FFFDF9 100%)",
        }}
      >
        {/* Colorful gradient accent line at top */}
        <div 
          className="absolute top-0 left-0 right-0 h-[3px]"
          style={{
            background: "linear-gradient(90deg, #10B981, #F59E0B, #8B5CF6, #0EA5E9, #10B981)",
          }}
        />
        
        {/* Shimmer sweep effect */}
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            background: "linear-gradient(90deg, transparent 0%, rgba(251,191,36,0.2) 25%, rgba(139,92,246,0.15) 50%, rgba(14,165,233,0.2) 75%, transparent 100%)",
            animation: "shimmer 3s ease-in-out infinite",
          }}
        />
        
        <div className="relative flex items-center gap-12 md:gap-16">
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
              className="flex items-center gap-4"
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
                className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.iconBg} shadow-sm`}
              >
                <stat.icon className={`w-6 h-6 ${stat.iconColor} flex-shrink-0`} strokeWidth={2} />
              </motion.div>
              <span 
                className="text-base md:text-lg font-bold whitespace-nowrap"
                style={{
                  background: "linear-gradient(135deg, #1a1a2e 0%, #4a4a6a 100%)",
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
