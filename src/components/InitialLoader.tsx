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
  minDuration = 800 
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
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-background"
        >
          <div className="flex flex-col items-center gap-4">
            {/* Simple shield logo with subtle pulse */}
            <motion.img
              src={shieldLogo}
              alt="InVision Network"
              className="w-16 h-16 object-contain"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Progress bar */}
            <div className="w-32 h-1 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-primary rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              />
            </div>

            {/* Simple loading indicator */}
            <div className="flex gap-1.5">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-primary"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    delay: i * 0.15,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
