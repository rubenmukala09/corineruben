import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import shieldLogo from "@/assets/shield-logo.png";

import heroHome1 from "@/assets/hero-home-1.jpg";
import heroHome2 from "@/assets/hero-home-2.jpg";
import heroHome3 from "@/assets/hero-home-3.jpg";
import heroAboutNew from "@/assets/hero-about-new.jpg";
import businessDiverse1 from "@/assets/business-diverse-1.jpg";
import heroTraining1 from "@/assets/hero-training-1.jpg";
import heroResources1 from "@/assets/hero-resources-1.jpg";

const criticalImages = [heroHome1, heroHome2, heroHome3, heroAboutNew, businessDiverse1, heroTraining1, heroResources1];
const preloadedImages = new Set<string>();

const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve) => {
    if (preloadedImages.has(src)) { resolve(); return; }
    const img = new Image();
    img.onload = () => { preloadedImages.add(src); resolve(); };
    img.onerror = () => { preloadedImages.add(src); resolve(); };
    img.fetchPriority = 'high';
    img.src = src;
  });
};

interface InitialLoaderProps {
  onComplete?: () => void;
  minDuration?: number;
}

export const InitialLoader = ({ onComplete, minDuration = 150 }: InitialLoaderProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let isMounted = true;
    const startTime = Date.now();
    
    const preloadCritical = async () => {
      const total = criticalImages.length;
      let loaded = 0;
      
      await Promise.all(criticalImages.map(async (src) => {
        await preloadImage(src);
        loaded++;
        if (isMounted) setProgress((loaded / total) * 100);
      }));
      
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, minDuration - elapsed);
      await new Promise(r => setTimeout(r, remaining));
      
      if (isMounted) { setIsVisible(false); onComplete?.(); }
    };

    preloadCritical();
    return () => { isMounted = false; };
  }, [minDuration, onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-background"
        >
          <div className="relative flex flex-col items-center gap-4">
            <motion.img
              src={shieldLogo}
              alt="InVision Network"
              className="w-14 h-14 object-contain"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.1 }}
            />
            <div className="text-center">
              <h1 className="text-base font-semibold text-foreground">InVision Network</h1>
            </div>
            <div className="w-28">
              <div className="h-0.5 bg-muted rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-primary rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
