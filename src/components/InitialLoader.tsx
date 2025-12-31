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

export const InitialLoader = ({ onComplete, minDuration = 600 }: InitialLoaderProps) => {
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
          exit={{ opacity: 0, filter: "blur(8px)" }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-background"
        >
          {/* Animated gradient background */}
          <motion.div 
            className="absolute inset-0"
            animate={{ 
              background: [
                'radial-gradient(circle at 30% 30%, hsl(var(--primary) / 0.08) 0%, transparent 50%)',
                'radial-gradient(circle at 70% 70%, hsl(var(--accent) / 0.08) 0%, transparent 50%)',
                'radial-gradient(circle at 30% 30%, hsl(var(--primary) / 0.08) 0%, transparent 50%)',
              ]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          
          <div className="relative flex flex-col items-center gap-8">
            {/* Orbiting rings */}
            <div className="relative w-32 h-32">
              <motion.div
                className="absolute inset-0 rounded-full border border-primary/20"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-3 rounded-full border border-accent/15"
                animate={{ rotate: -360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              />
              
              {/* Pulsing glow */}
              <motion.div
                className="absolute inset-6 rounded-full bg-gradient-to-br from-primary/25 to-accent/15 blur-xl"
                animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.7, 0.4] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              
              {/* Logo */}
              <motion.img
                src={shieldLogo}
                alt="InVision Network"
                className="absolute inset-0 m-auto w-16 h-16 object-contain drop-shadow-lg"
                initial={{ scale: 0.8, opacity: 0, filter: "blur(4px)" }}
                animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>

            {/* Brand */}
            <motion.div
              initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-center"
            >
              <h1 className="text-xl font-semibold tracking-wide text-foreground">InVision Network</h1>
              <p className="text-xs text-muted-foreground mt-1 tracking-widest uppercase">Security Solutions</p>
            </motion.div>

            {/* Progress */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col items-center gap-3"
            >
              <div className="w-48 h-1 bg-muted/30 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary via-accent to-primary rounded-full"
                  style={{ width: `${progress}%` }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                />
              </div>
              
              <motion.span 
                className="text-xs text-muted-foreground/70 font-medium"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
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
