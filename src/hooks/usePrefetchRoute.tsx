import { useEffect, useRef } from "react";
import { preloadRouteImages } from "./useImagePreload";

// Import hero images for preloading
import heroAboutNew from "@/assets/hero-about-new.jpg";
import heroAboutProfessional from "@/assets/hero-about-professional.jpg";
import heroAbout3d from "@/assets/hero-about-3d.jpg";
import heroAbout from "@/assets/hero-about.jpg";
import businessDiverse1 from "@/assets/business-diverse-1.jpg";
import heroBusinessNew from "@/assets/hero-business-new.jpg";
import heroBusinessProfessional from "@/assets/hero-business-professional.jpg";
import heroBusiness3d from "@/assets/hero-business-3d.jpg";
import businessCollaboration from "@/assets/business-collaboration.jpg";
import heroTraining1 from "@/assets/hero-training-1.jpg";
import heroTraining2 from "@/assets/hero-training-2.jpg";
import heroTraining3 from "@/assets/hero-training-3.jpg";
import heroResources1 from "@/assets/hero-resources-1.jpg";
import heroResources2 from "@/assets/hero-resources-2.jpg";
import heroCareers1 from "@/assets/hero-careers-1.jpg";
import heroCareers2 from "@/assets/hero-careers-2.jpg";
import heroContact1 from "@/assets/hero-contact-1.jpg";
import heroContact2 from "@/assets/hero-contact-2.jpg";

// Map routes to their hero images
const routeHeroImages: Record<string, string[]> = {
  "/about": [heroAboutNew, heroAboutProfessional, heroAbout3d, heroAbout],
  "/business": [businessDiverse1, heroBusinessNew, heroBusinessProfessional, businessCollaboration, heroBusiness3d],
  "/training": [heroTraining1, heroTraining2, heroTraining3],
  "/resources": [heroResources1, heroResources2],
  "/careers": [heroCareers1, heroCareers2],
  "/contact": [heroContact1, heroContact2],
};

const prefetchedRoutes = new Set<string>();

export const usePrefetchRoute = (path: string) => {
  const prefetchTimerRef = useRef<NodeJS.Timeout>();

  const prefetch = () => {
    if (prefetchedRoutes.has(path)) return;

    prefetchTimerRef.current = setTimeout(() => {
      // Preload hero images for the route
      const heroImages = routeHeroImages[path];
      if (heroImages) {
        preloadRouteImages(heroImages);
      }

      // Dynamically import the route component
      const routeMap: Record<string, () => Promise<any>> = {
        "/": () => import("../pages/Index"),
        "/training": () => import("../pages/Training"),
        "/business": () => import("../pages/Business"),
        "/about": () => import("../pages/About"),
        "/resources": () => import("../pages/Resources"),
        "/safety-vault": () => import("../pages/SafetyVault"),
        "/articles": () => import("../pages/Articles"),
        "/contact": () => import("../pages/Contact"),
        "/careers": () => import("../pages/Careers"),
        "/faq": () => import("../pages/FAQ"),
      };

      const importFn = routeMap[path];
      if (importFn) {
        importFn().then(() => {
          prefetchedRoutes.add(path);
        });
      }
    }, 100); // Small delay to avoid prefetching on quick hovers
  };

  const cancelPrefetch = () => {
    if (prefetchTimerRef.current) {
      clearTimeout(prefetchTimerRef.current);
    }
  };

  useEffect(() => {
    return () => cancelPrefetch();
  }, []);

  return { prefetch, cancelPrefetch };
};
