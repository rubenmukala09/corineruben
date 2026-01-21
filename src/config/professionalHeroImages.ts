// Professional Hero Images Configuration
// Clean, modern professional images for each page - InVision Network branded

import heroBrandedBusiness from "@/assets/hero-nature-business.jpg";
import heroBrandedTraining from "@/assets/hero-nature-training.jpg";
import heroBrandedResources from "@/assets/hero-branded-resources.jpg";
import heroBrandedAbout from "@/assets/hero-branded-about.jpg";
import heroBrandedCareers from "@/assets/hero-branded-careers.jpg";
import heroBrandedFaq from "@/assets/hero-branded-faq.jpg";
import heroBrandedContact from "@/assets/hero-branded-contact.jpg";

export interface HeroImage {
  src: string;
  alt: string;
}

// Professional branded hero images for each page - InVision Network integrated
export const PROFESSIONAL_HERO_IMAGES: Record<string, HeroImage[]> = {
  business: [
    { src: heroBrandedBusiness, alt: "Diverse professionals united at sunrise overlooking city skyline, embracing new beginnings and ambition with InVision Network" },
  ],
  training: [
    { src: heroBrandedTraining, alt: "Seniors joyfully learning together in sunlit community center, empowered by hope and lifelong growth with InVision Network" },
  ],
  resources: [
    { src: heroBrandedResources, alt: "InVision Network digital knowledge center with security resources and learning materials" },
  ],
  about: [
    { src: heroBrandedAbout, alt: "InVision Network diverse professional team dedicated to protecting Ohio families and businesses" },
  ],
  careers: [
    { src: heroBrandedCareers, alt: "InVision Network creative workspace where mission-driven professionals make a difference" },
  ],
  faq: [
    { src: heroBrandedFaq, alt: "InVision Network friendly customer support team ready to answer your questions" },
  ],
  contact: [
    { src: heroBrandedContact, alt: "InVision Network welcoming Ohio-based team ready to help protect your family" },
  ],
};

// Export individual images for use elsewhere
export {
  heroBrandedBusiness,
  heroBrandedTraining,
  heroBrandedResources,
  heroBrandedAbout,
  heroBrandedCareers,
  heroBrandedFaq,
  heroBrandedContact,
};
