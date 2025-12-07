import { motion } from "framer-motion";

interface EnhancedPageLoaderProps {
  message?: string;
}

export const EnhancedPageLoader = ({ message = "Loading..." }: EnhancedPageLoaderProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
      style={{
        backdropFilter: "blur(2px)",
        WebkitBackdropFilter: "blur(2px)",
      }}
    >
      {/* Blurry gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/70 via-primary/5 to-accent/10" />
      
      {/* Animated floating blobs */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Main large bubble */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle at 30% 30%, hsl(var(--primary) / 0.3), hsl(var(--accent) / 0.15), transparent 70%)",
            filter: "blur(25px)",
          }}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
            x: ["-50%", "-45%", "-50%"],
            y: ["-50%", "-55%", "-50%"],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Secondary bubble top-left */}
        <motion.div
          className="absolute top-[20%] left-[20%] w-[300px] h-[300px] rounded-full"
          style={{
            background: "radial-gradient(circle at 50% 50%, hsl(var(--accent) / 0.2), transparent 70%)",
            filter: "blur(18px)",
          }}
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        />
        
        {/* Third bubble bottom-right */}
        <motion.div
          className="absolute bottom-[20%] right-[20%] w-[250px] h-[250px] rounded-full"
          style={{
            background: "radial-gradient(circle at 50% 50%, hsl(var(--primary) / 0.18), transparent 70%)",
            filter: "blur(15px)",
          }}
          animate={{
            scale: [1, 1.4, 1],
            x: [0, -40, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />

        {/* Small floating particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 rounded-full bg-primary/30"
            style={{
              left: `${20 + i * 12}%`,
              top: `${30 + (i % 3) * 20}%`,
              filter: "blur(1px)",
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      {/* Center content - InVision branding */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Main bubble with logo */}
        <motion.div
          className="relative w-40 h-40 rounded-full flex items-center justify-center"
          style={{
            background: "radial-gradient(circle at 30% 30%, hsl(var(--primary) / 0.3), hsl(var(--primary) / 0.1))",
            boxShadow: "0 0 80px 20px hsl(var(--primary) / 0.2), inset 0 0 60px 10px hsl(var(--background) / 0.3)",
          }}
          animate={{
            scale: [1, 1.05, 1],
            boxShadow: [
              "0 0 80px 20px hsl(var(--primary) / 0.2), inset 0 0 60px 10px hsl(var(--background) / 0.3)",
              "0 0 100px 30px hsl(var(--primary) / 0.3), inset 0 0 80px 15px hsl(var(--background) / 0.4)",
              "0 0 80px 20px hsl(var(--primary) / 0.2), inset 0 0 60px 10px hsl(var(--background) / 0.3)",
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {/* Inner glow ring */}
          <motion.div
            className="absolute inset-4 rounded-full border-2 border-primary/30"
            animate={{
              opacity: [0.3, 0.8, 0.3],
              scale: [0.95, 1, 0.95],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          
          {/* InVision text */}
          <motion.div
            className="text-center"
            animate={{
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <span className="text-2xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent bg-[length:200%_100%] animate-gradient-x">
              InVision
            </span>
          </motion.div>
        </motion.div>

        {/* Loading text */}
        <motion.div
          className="mt-8 flex flex-col items-center gap-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <span className="text-lg font-medium text-foreground/80">
            {message}
          </span>
          
          {/* Animated dots */}
          <div className="flex gap-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-primary to-accent"
                animate={{
                  y: [0, -12, 0],
                  opacity: [0.5, 1, 0.5],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  delay: i * 0.15,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* AI badge */}
        <motion.div
          className="mt-6 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm"
          animate={{
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <span className="text-xs font-medium text-primary flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            AI-Powered Protection
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
};
