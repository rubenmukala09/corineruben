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
        className="relative rounded-full py-5 px-12 md:px-16 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.4)] overflow-hidden"
        style={{
          background: "linear-gradient(90deg, #5b21b6 0%, #7c3aed 25%, #06b6d4 75%, #22d3ee 100%)",
        }}
      >
        {/* Animated gradient overlay */}
        <motion.div 
          className="absolute inset-0 opacity-20"
          animate={{
            background: [
              "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.6) 25%, transparent 50%)",
              "linear-gradient(90deg, transparent 50%, rgba(255,255,255,0.6) 75%, transparent 100%)",
              "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.6) 25%, transparent 50%)",
            ]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Shimmer sweep effect */}
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.5) 50%, transparent 100%)",
            animation: "shimmer 2.5s ease-in-out infinite",
          }}
        />
        
        {/* Glow pulse effect */}
        <motion.div 
          className="absolute inset-0 rounded-full"
          animate={{
            boxShadow: [
              "inset 0 1px 0 rgba(255,255,255,0.3), inset 0 -1px 0 rgba(0,0,0,0.1), 0 0 20px rgba(124,58,237,0.3)",
              "inset 0 1px 0 rgba(255,255,255,0.5), inset 0 -1px 0 rgba(0,0,0,0.1), 0 0 40px rgba(6,182,212,0.4)",
              "inset 0 1px 0 rgba(255,255,255,0.3), inset 0 -1px 0 rgba(0,0,0,0.1), 0 0 20px rgba(124,58,237,0.3)",
            ]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
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
              className="flex items-center gap-3 text-white"
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.15, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  delay: index * 0.7,
                  ease: "easeInOut"
                }}
              >
                <motion.div
                  animate={{
                    filter: [
                      "drop-shadow(0 0 2px rgba(255,255,255,0.3))",
                      "drop-shadow(0 0 8px rgba(255,255,255,0.6))",
                      "drop-shadow(0 0 2px rgba(255,255,255,0.3))",
                    ]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.5,
                    ease: "easeInOut"
                  }}
                >
                  <stat.icon className="w-6 h-6 flex-shrink-0" strokeWidth={1.5} />
                </motion.div>
              </motion.div>
              <motion.span 
                className="text-base font-medium whitespace-nowrap"
                animate={{
                  textShadow: [
                    "0 0 4px rgba(255,255,255,0.2)",
                    "0 0 12px rgba(255,255,255,0.4)",
                    "0 0 4px rgba(255,255,255,0.2)",
                  ]
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  delay: index * 0.3,
                  ease: "easeInOut"
                }}
              >
                {stat.text}
              </motion.span>
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
