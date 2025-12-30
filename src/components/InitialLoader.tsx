import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import shieldLogo from "@/assets/shield-logo.png";

// Import critical hero images for preloading during splash screen
import heroHome1 from "@/assets/hero-home-1.jpg";
import heroHome2 from "@/assets/hero-home-2.jpg";
import heroHome3 from "@/assets/hero-home-3.jpg";
import heroAboutNew from "@/assets/hero-about-new.jpg";
import businessDiverse1 from "@/assets/business-diverse-1.jpg";
import heroTraining1 from "@/assets/hero-training-1.jpg";
import heroResources1 from "@/assets/hero-resources-1.jpg";

// Critical images to preload during splash screen
const criticalImages = [
  heroHome1,
  heroHome2,
  heroHome3,
  heroAboutNew,
  businessDiverse1,
  heroTraining1,
  heroResources1,
];

// Global preload cache
const preloadedImages = new Set<string>();

const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve) => {
    if (preloadedImages.has(src)) {
      resolve();
      return;
    }
    const img = new Image();
    img.onload = () => {
      preloadedImages.add(src);
      resolve();
    };
    img.onerror = () => {
      preloadedImages.add(src);
      resolve();
    };
    img.fetchPriority = 'high';
    img.src = src;
  });
};

interface InitialLoaderProps {
  onComplete?: () => void;
  minDuration?: number;
}

export const InitialLoader = ({ 
  onComplete, 
  minDuration = 600 
}: InitialLoaderProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let isMounted = true;
    const startTime = Date.now();
    
    // Preload critical images during splash screen
    const preloadCritical = async () => {
      const total = criticalImages.length;
      let loaded = 0;
      
      // Load images in parallel with progress tracking
      await Promise.all(
        criticalImages.map(async (src) => {
          await preloadImage(src);
          loaded++;
          if (isMounted) {
            setProgress((loaded / total) * 100);
          }
        })
      );
      
      // Ensure minimum display time
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, minDuration - elapsed);
      
      await new Promise(r => setTimeout(r, remaining));
      
      if (isMounted) {
        setIsVisible(false);
        onComplete?.();
      }
    };

    preloadCritical();

    return () => {
      isMounted = false;
    };
  }, [minDuration, onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-background"
        >
          {/* Subtle background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
          
          <div className="relative flex flex-col items-center gap-6">
            {/* Elegant logo container with glow */}
            <div className="relative">
              {/* Soft glow behind logo */}
              <motion.div
                className="absolute inset-0 bg-primary/20 rounded-full blur-2xl"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3] 
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                style={{ width: '100px', height: '100px', top: '-10px', left: '-10px' }}
              />
              
              {/* Shield logo with elegant entrance */}
              <motion.img
                src={shieldLogo}
                alt="InVision Network"
                className="relative z-10 w-20 h-20 object-contain drop-shadow-lg"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              />
            </div>

            {/* Brand name with elegant typography */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="text-center"
            >
              <h1 className="text-xl font-semibold tracking-wide text-foreground">
                InVision Network
              </h1>
              <p className="text-xs text-muted-foreground mt-1 tracking-widest uppercase">
                Security Solutions
              </p>
            </motion.div>

            {/* Elegant progress indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col items-center gap-3"
            >
              {/* Minimal progress line */}
              <div className="w-40 h-0.5 bg-muted/50 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary via-primary to-accent rounded-full"
                  style={{ width: `${progress}%` }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                />
              </div>
              
              {/* Subtle loading text */}
              <motion.span 
                className="text-xs text-muted-foreground/70 font-medium tracking-wide"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                Loading
              </motion.span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
