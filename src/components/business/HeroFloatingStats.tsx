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
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative rounded-full py-5 px-12 md:px-16 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] overflow-hidden"
        style={{
          background: "linear-gradient(90deg, #5b21b6 0%, #7c3aed 25%, #06b6d4 75%, #22d3ee 100%)",
        }}
      >
        {/* Shimmer effect overlay */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)",
            animation: "shimmer 3s ease-in-out infinite",
          }}
        />
        
        {/* Glow effect */}
        <div 
          className="absolute inset-0 rounded-full"
          style={{
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.3), inset 0 -1px 0 rgba(0,0,0,0.1)",
          }}
        />
        
        <div className="relative flex items-center gap-10 md:gap-14">
          {stats.map((stat, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 * index + 0.3 }}
              className="flex items-center gap-3 text-white"
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.5,
                  ease: "easeInOut"
                }}
              >
                <stat.icon className="w-6 h-6 flex-shrink-0 drop-shadow-sm" strokeWidth={1.5} />
              </motion.div>
              <span className="text-base font-medium whitespace-nowrap drop-shadow-sm">
                {stat.text}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
      
      <style>{`
        @keyframes shimmer {
          0%, 100% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default HeroFloatingStats;
